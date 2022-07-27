// DEPENDENCIES
const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");

const bandController = require("./controllers/band_controller");
const eventsController = require("./controllers/event_controller");
const stagesController = require("./controllers/stage_controller");

// CONFIGURATION / MIDDLEWARE
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CONTROLLERS
app.use("/bands", bandController);
app.use("/events", eventsController);
app.use("/stages", stagesController);

// ROOT
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Tour API",
  });
});

// LISTEN
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});
