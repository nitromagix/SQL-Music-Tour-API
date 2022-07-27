// DEPENDENCIES
const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");

// CONFIGURATION / MIDDLEWARE
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CONTROLLERS 
const bandController = require('./controllers/band_controller')
app.use('/bands', bandController)


// ROOT
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Tour API",
  });
});

// LISTEN
app.listen(process.env.PORT, () => {
  console.log(`🎸 Rockin' on port: ${process.env.PORT}`);
});
