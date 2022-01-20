const express = require("express");
const db = require("./config/db");
const app = express();
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/authRoutes");
const produitRoute = require("./routes/produitRoutes");
const categorieRoute = require("./routes/categorieRoutes");
const commandeRoute = require("./routes/commandeRoutes");

const cors = require('cors');
app.use(cors({ origin: true }));
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoute);
app.use(produitRoute);
app.use("/auth", authRoute);
app.use("/categorie", categorieRoute);
app.use("/commande", commandeRoute);

app.listen(4000, () => {
  console.log(" app is wokring on port 4000");
});
