const express = require("express");
require("dotenv").config();
const router = express.Router();
const { auth } = require("./auth_functions");

const { MongoClient } = require("mongodb");
const projection = { projection: { _id: 0 } };

router.post("/api/post", auth, (req, res) => {
  MongoClient.connect(process.env.MONGO_URI, async (err, db) => {
    if (err) throw err;
    const result = await db.db("piano").collection("songs").insertOne(req.body);
    // console.log(`${result.insertedId}`);
    res.json(result.insertedId);
    db.close();
  });
});

router.put("/api/edit", auth, (req, res) => {
  MongoClient.connect(process.env.MONGO_URI, async (err, db) => {
    if (err) throw err;
    const songs = db.db("piano").collection("songs");
    const result = await songs.updateOne(
      { id: req.body.id },
      { $set: { title: req.body.title } }
    );
    res.json(result.insertedId);
    db.close();
  });
});

router.delete("/api/delete", auth, (req, res) => {
  MongoClient.connect(process.env.MONGO_URI, async (err, db) => {
    if (err) throw err;
    const songs = db.db("piano").collection("songs");
    const result = await songs.deleteOne({ id: req.body.id });
    // console.log(`${result.insertedId}`);
    res.json(result.insertedId);
    db.close();
  });
});

router.get("/api/getSongs/:user", auth, (req, res) => {
  const user = req.params.user;
  MongoClient.connect(process.env.MONGO_URI, async (err, db) => {
    if (err) throw err;
    const songs = db.db("piano").collection("songs");
    songs.find({ user }, projection).toArray((err, result) => {
      if (err) throw err;
      db.close();
      res.json(result);
    });
  });
});

module.exports = router;
