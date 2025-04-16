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
    db = client.db("editNails");
    await db.command({ ping: 1 });
    console.log(`Connected to database: ${url}`);
  } catch (err) {
    console.error(
      `Unable to connect to database with ${url} because ${err.message}`
    );
    process.exit(1);
  }
}

// Create new user
async function createUser(user) {
  await getUsersCollection().insertOne(user);
  return user;
}

// Find user by field
async function findUserByField(field, value) {
  return await getUsersCollection().findOne({ [field]: value });
}

// Update user by field
async function updateUserToken(email, token) {
  return await getUsersCollection().updateOne({ email }, { $set: { token } });
}

//delete token
async function clearUserToken(token) {
  return await getUsersCollection().updateOne(
    { token },
    { $unset: { token: "" } }
  );
}

// Save design to DB
async function saveDesign(design, posted = false) {
  if (posted) {
    return await getPostedDesignsCollection().insertOne(design);
  } else {
    return await getSavedDesignsCollection().insertOne(design);
  }
}

async function getUserSavedDesigns(email) {
  return await getSavedDesignsCollection().find({ owner: email }).toArray();
}

async function getPostedDesigns() {
  return await getPostedDesignsCollection().find({}).toArray();
}

module.exports = {
  connectToDb,
  createUser,
  findUserByField,
  updateUserToken,
  clearUserToken,
  saveDesign,
  getUserSavedDesigns,
  getPostedDesigns,
};
