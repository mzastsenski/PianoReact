const jwt = require("jsonwebtoken");

const newAccessToken = (user) => {
  return jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "60m",
  });
};

const auth = (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // console.log(req.body.user + " " + user.name + " " + req.params.user);
    if (err) {
      // console.log("error");
      return res.json(401);
    }
    let exp = (1000 * user.exp - Date.now()) / 1000 / 60;
    if (exp < 20) {
      const newToken = newAccessToken({ name: user.name });
      res.cookie("token", newToken, {
        httpOnly: true,
        maxAge: 21 * 24 * 60 * 60 * 1000,
      });
    }
    next();
  });
};

const getUserFromToken = (req) => {
  // console.log(req.cookies)
  if (req.cookies.token) {
    return jwt.verify(
      req.cookies.token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, user) => user.name
    );
  }
};

module.exports = { auth, newAccessToken, getUserFromToken };
