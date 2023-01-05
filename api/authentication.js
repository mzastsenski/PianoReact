require("dotenv").config();
const router = require("express").Router();
const { auth, newAccessToken } = require("./auth_functions");
const { MongoClient } = require("mongodb");
const defaultSong = require("./defaultSong");

router.post("/api/checkUser", auth, (req, res) => {
  res.json(200);
});

router.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json(200);
});

router.post("/api/login", (req, res) => {
  const user = req.body.user;
  const pass = btoa(req.body.pass);
  MongoClient.connect(process.env.MONGO_URI, async (err, db) => {
    if (err) throw err;
    const users = db.db("piano").collection("users");
    const find = await users.findOne({ user, pass });
    db.close();
    if (find) {
      const accessToken = newAccessToken({ name: req.body.user });
      res.cookie("token", accessToken, {
        httpOnly: true,
        maxAge: 21 * 24 * 60 * 60 * 1000,
      });
      res.json(200);
    } else {
      res.json(401);
    }
  });
});

router.post("/api/signUp", (req, res) => {
  const user = req.body.user;
  const pass = btoa(req.body.pass);
  MongoClient.connect(process.env.MONGO_URI, async (err, db) => {
    if (err) throw err;
    const users = db.db("piano").collection("users");
    const find = await users.findOne({ user });
    if (find) {
      res.json(401);
    } else {
      await users.insertOne({ user, pass });
      const songs = db.db("piano").collection("songs");
      await songs.insertOne({
        id: Date.now(),
        user,
        title: "Elise",
        song: defaultSong,
      });
      res.json(200);
    }
    db.close();
  });
});

module.exports = router;
