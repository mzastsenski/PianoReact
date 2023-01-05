const express = require("express");
require("dotenv").config();
const router = express.Router();
const { auth, getUserFromToken } = require("./auth_functions.js");

const { MongoClient } = require("mongodb");

router.get("/api/get", (req, res) => {
  MongoClient.connect(process.env.MONGO_URI, (err, db) => {
    if (err) throw err;
    db.db("piano")
      .collection("songs")
      .find({})
      .toArray((err, result) => {
        if (err) console.log(err);
        db.close();
        res.json(result);
        console.log(result);
      });
  });
});

router.post("/api/post", (req, res) => {
  // const user = getUserFromToken(req);
  MongoClient.connect(process.env.MONGO_URI, async (err, db) => {
    if (err) throw err;
    const result = await db.db("piano").collection("songs").insertOne(req.body);
    // console.log(`${result.insertedId}`);
    res.json(result.insertedId);
    db.close();
  });
});

router.put("/api/edit", (req, res) => {
  MongoClient.connect(process.env.MONGO_URI, async (err, db) => {
    if (err) throw err;
    const result = await db
      .db("piano")
      .collection("songs")
      .updateOne({ id: req.body.id }, { $set: { title: req.body.title } });
    // console.log(`${result.insertedId}`);
    res.json(result.insertedId);
    db.close();
  });
});

router.delete("/api/delete", (req, res) => {
  console.log(req.body.id);
  MongoClient.connect(process.env.MONGO_URI, async (err, db) => {
    if (err) throw err;
    const result = await db
      .db("piano")
      .collection("songs")
      .deleteOne({ id: req.body.id });
    console.log(`${result.insertedId}`);
    res.json(result.insertedId);
    db.close();
  });
});

router.get("/api/songs/:user", (req, res) => {});

module.exports = router;
