const { MongoClient } = require("mongodb");
require("dotenv").config();

exports.getUser = async (req, res) => {
  const { userId } = req.params;

  const uri = process.env.MONGODB_URL;
  const client = new MongoClient(uri);

  const db = client.db("co-group");
  const collection = db.collection("user");

  const user = await collection.findOne({ userId: userId });
  
  res.send(`Get user route ${user.name}`);
};

exports.updateUser = (req, res) => {
  const { userId } = req.params;
  const { name, age } = req.body;

  res.send(`Update user route ${userId} ${name} ${age}`);
};
