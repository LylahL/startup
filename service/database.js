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
