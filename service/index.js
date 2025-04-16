const port = process.argv.length > 2 ? process.argv[2] : 4000;
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const fetch = require('node-fetch');
const app = express();
const database = require('./database');

const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
// Serve the frontend (static files in public folder)
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

database.connectToDb()

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

// MVerify authentication for restricted endpoints
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
    owner: req.user.email
  };
  savedDesigns.push(design);
  res.send({ msg: 'Design saved successfully', design });
});

// Get saved designs for the logged–in user
apiRouter.get('/designs/saved', verifyAuth, async (req, res) => {
  const userDesigns = savedDesigns.filter(design => design.owner === req.user.email);
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
    owner: req.user.email
  };
  postedDesigns.push(design);
  res.send({ msg: 'Design posted successfully', design });
});

// Get all publicly posted designs
apiRouter.get('/designs/posted', async (req, res) => {
  res.send(postedDesigns);
});

/* --- Example Protected Endpoint --- */
apiRouter.get('/protected', verifyAuth, async (req, res) => {
  res.send({ msg: `Hello, ${req.user.email}. You have access to protected data.` });
});


// Send the frontend index.html for any other routes (client-side routing support)
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).send({ type: err.name, message: err.message });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email,
    password: passwordHash,
    token: uuid.v4()
  };
  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return users.find(u => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}
