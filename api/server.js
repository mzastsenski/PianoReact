const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/frontend"));
app.use((req, res, next) => {
  const allowedDomains = ["http://localhost:3030"];
  if (allowedDomains.indexOf(req.headers.origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cookieParser());

app.use(require("./requests.js"));
app.use(require("./authentication.js"));

app.get("*", (req, res) => res.redirect("/"));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
