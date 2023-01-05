const express = require("express");
require("dotenv").config();
const router = express.Router();
const { auth, getUserFromToken } = require("./auth_functions.js");

const { MongoClient } = require("mongodb");

router.get("/api/mongo", (req, res) => {
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

router.post("/api/mongo", (req, res) => {
  // console.log(req.body)
  // const user = getUserFromToken(req);
  // console.log(user);
  MongoClient.connect(process.env.MONGO_URI, async (err, db) => {
    if (err) throw err;
    const result = await db
      .db("piano")
      .collection("songs")
      .insertOne(req.body[0]);
    console.log(`${result.insertedId}`);
    res.json(result.insertedId);
    db.close();
    // req.body.forEach((e, i) => {
    //   console.log(e.title)
    //   // db.db("piano")
    //   //   .collection("songs")
    //   //   .insertOne(e);
    // });
  });
});

router.get("/api/songs/:user", (req, res) => {});

router.post("/api/post", auth, (req, res) => {});

router.put("/api/edit", auth, (req, res) => {});

router.delete("/api/delete", auth, (req, res) => {});

module.exports = router;
