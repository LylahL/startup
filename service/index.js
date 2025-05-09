const port = process.argv.length > 2 ? process.argv[2] : 4000;
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const fetch = require('node-fetch');
const app = express();
const database = require('./database');
const { peerProxy } = require('./peerProxy');


const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
// Serve the frontend (static files in public folder)
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

// WebSocket Server
const httpServer = require('http').createServer(app);
const wsServer = peerProxy(httpServer);

// Create a new user account
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;
  if (await findUser('email', email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(email, password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// Log in an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser('email', email);
  if (user && await bcrypt.compare(password, user.password)) {
    const newToken = uuid.v4();
    user.token = newToken;
    await database.updateUserToken(email, newToken);
    setAuthCookie(res, newToken);
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Log out the current user
apiRouter.delete('/auth/logout', async (req, res) => {
  const token = req.cookies[authCookieName];
  const user = await findUser('token', token);
  if (user) {
    await database.clearUserToken(token);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware: Verify authentication for restricted endpoints
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user; // Attach user data to request
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Given a hex code, proxy to the color API
apiRouter.get('/color', async (req, res) => {
  const randomHex = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')
    .toUpperCase();
  try {
    const response = await fetch(`https://www.thecolorapi.com/id?hex=${randomHex}&format=json`);
    const colorData = await response.json();
    // Include the generated hex (without the #) in the response
    colorData.hex.clean = randomHex;
    res.send(colorData);
  } catch (error) {
    res.status(500).send({ msg: 'Error contacting Color API', error: error.message });
  }
});

// Save a new design for the logged–in user
apiRouter.post('/designs/saved', verifyAuth, async (req, res) => {
  const { color } = req.body;
  if (!color || !/^[A-Fa-f0-9]{6}$/.test(color)) {
    return res.status(400).send({ msg: 'Invalid or missing color value' });
  }
  const design = {
    id: uuid.v4(),
    color: color.toUpperCase(),
    timestamp: Date.now(),
    owner: req.user.email,
  };
  await database.saveDesign(design, false);
  res.send({ msg: 'Design saved successfully', design });
});

// Get saved designs for the logged–in user
apiRouter.get('/designs/saved', verifyAuth, async (req, res) => {
  const userDesigns = await database.getUserSavedDesigns(req.user.email);
  res.send(userDesigns);
});


// Post a design publicly (requires authentication)
apiRouter.post('/designs/posted', verifyAuth, async (req, res) => {
  const { color } = req.body;
  if (!color || !/^[A-Fa-f0-9]{6}$/.test(color)) {
    return res.status(400).send({ msg: 'Invalid or missing color value' });
  }
  const design = {
    id: uuid.v4(),
    color: color.toUpperCase(),
    timestamp: Date.now(),
    owner: req.user.email,
    likes: 0, // initialize likes count
  };
  await database.saveDesign(design, true);
  res.send({ msg: 'Design posted successfully', design });
});

apiRouter.post('/designs/like', async (req, res) => {
  const { designId, likedBy } = req.body;
  console.log("Received like request for design:", designId);
  try {
    const result = await database.incrementDesignLikes(designId);
    const design = await database.getPostedDesignById(designId);

    if (result.modifiedCount > 0 && design) {
      const message = `${likedBy} liked a nail design!`;

      const wsServer = req.app.get('wsServer');
      if (wsServer) {
        wsServer.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(message);
          }
        });
      } else {
        console.warn('WebSocket server not available');
      }

      res.send({ msg: 'Like added successfully' });
    } else {
      res.status(404).send({ msg: 'Design not found' });
    }
  } catch (err) {
    res.status(500).send({ msg: 'Error adding like', error: err.message });
  }
});


// Get all publicly posted designs
apiRouter.get('/designs/posted', async (req, res) => {
  const postedDesigns = await database.getPostedDesigns();
  res.send(postedDesigns);
});

/* --- Example Protected Endpoint --- */
apiRouter.get('/protected', verifyAuth, async (req, res) => {
  res.send({ msg: `Hello, ${req.user.email}. You have access to protected data.` });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).send({ type: err.name, message: err.message });
});


database.connectToDb().then(() => {
  const server = require('http').createServer(app);
  const wsServer = peerProxy(server); 

  server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  app.set('wsServer', wsServer);
}).catch((err) => {
  console.error('Database connection failed:', err);
  process.exit(1);
  
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const userObj = {
    email,
    password: passwordHash,
    token: uuid.v4()
  };
  await database.createUser(userObj);
  return userObj;
}

async function findUser(field, value) {
  if (!value) return null;
  return await database.findUserByField(field, value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}
