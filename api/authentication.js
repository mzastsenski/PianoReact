require("dotenv").config();
const router = require("express").Router();
const { auth, newAccessToken } = require("./auth_functions");
const { MongoClient } = require("mongodb");
const defaultSong = require("./defaultSong");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/api/checkUser", auth, (req, res) => {
  res.json(200);
});

router.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json(200);
});

router.post("/api/login", async (req, res) => {
  const user = req.body.user;
  const bodyPass = req.body.pass;
  const client = new MongoClient(process.env.MONGO_URI);
  const users = client.db("piano").collection("users");
  const finded = await users.findOne({ user });
  if (!finded) res.json(401);
  else {
    const checked = await bcrypt.compare(bodyPass, finded.pass);
    if (!checked) res.json(401);
    else {
      const accessToken = newAccessToken({ name: req.body.user });
      res.cookie("token", accessToken, {
        httpOnly: true,
        maxAge: 21 * 24 * 60 * 60 * 1000,
      });
      res.json(200);
    }
  }
  client.close();
});

router.post("/api/signUp", async (req, res) => {
  const user = req.body.user;
  const bodyPass = req.body.pass;
  const client = new MongoClient(process.env.MONGO_URI);
  const users = client.db("piano").collection("users");
  const find = await users.findOne({ user });
  // console.log(find);
  if (find) res.json(401);
  else {
    const pass = await bcrypt.hash(bodyPass, saltRounds);
    await users.insertOne({ user, pass });
    const songs = client.db("piano").collection("songs");
    await songs.insertOne({
      id: Date.now(),
      user,
      title: "Elise",
      song: defaultSong,
    });
    res.json(200);
  }
  client.close();
});

module.exports = router;
