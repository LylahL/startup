const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db;

//get collections
function getUsersCollection() {
  return db.collection("users");
}

function getSavedDesignsCollection() {
  return db.collection("savedDesigns");
}

function getPostedDesignsCollection() {
  return db.collection("postedDesigns");
}

async function connectToDb() {
    try {
      await client.connect();
      db = client.db('editNails');
      await db.command({ ping: 1 });
      console.log(`Connected to database: ${url}`);
    } catch (err) {
      console.error(`Unable to connect to database with ${url} because ${err.message}`);
      process.exit(1);
    }
  }

// Create new user
async function createUser(user) {
    await getUsersCollection().insertOne(user);
    return user;
  }
