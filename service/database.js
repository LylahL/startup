const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("editNails");

// Direct collection references
const userCollection = db.collection("users");
const savedDesignsCollection = db.collection("savedDesigns");
const postedDesignsCollection = db.collection("postedDesigns");

async function connectToDb() {
  try {
    await client.connect();
    // Test connection via a ping
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
  await userCollection.insertOne(user);
  return user;
}

// Find user by field
async function findUserByField(field, value) {
  return await userCollection.findOne({ [field]: value });
}

// Update user by field
async function updateUserToken(email, token) {
  return await userCollection.updateOne({ email }, { $set: { token } });
}

//delete token
async function clearUserToken(token) {
  return await userCollection.updateOne({ token }, { $unset: { token: "" } });
}

// Save design to DB
async function saveDesign(design, posted = false) {
  if (posted) {
    return await postedDesignsCollection.insertOne(design);
  } else {
    return await savedDesignsCollection.insertOne(design);
  }
}

async function getPostedDesignById(designId) {
  return await postedDesignsCollection.findOne({ id: designId });
}

async function getUserSavedDesigns(email) {
  return await savedDesignsCollection.find({ owner: email }).toArray();
}

async function getPostedDesigns() {
  return await postedDesignsCollection.find({}).toArray();
}
async function incrementDesignLikes(designId) {
  return await postedDesignsCollection.updateOne(
    { id: designId },
    { $inc: { likes: 1 } }
  );
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
  incrementDesignLikes,
  getPostedDesignById
};
