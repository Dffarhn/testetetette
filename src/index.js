const express = require("express");

const routesapa = require("./Routes/sapa.js");
const routeuser = require("./Routes/User.js");
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/sapa", routesapa);

app.use("/user", routeuser);

app.use(cors())



app.get(
  "/",
  (req, res, next) => {
    console.log("Permintaan Masuk " + Date.now());
    next();
  },
  (req, res) => {
    res.status(200).send("Selamat datang di web kami")
  }
);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
