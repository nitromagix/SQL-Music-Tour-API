//

// DEPENDENCIES
const express = require("express");
const db = require("../models");
const { Op } = require("sequelize");

const events = express.Router();
const { Event } = db;

// FIND ALL EVENTS

events.get("/", async (req, res) => {
  const query = req.query;
  try {
    const foundEvents = await Event.findAll({
      order: [
        ["date", "ASC"],
        ["start_time", "ASC"],
      ],
      where: {
        name: { [Op.like]: query.name ? `%${query.name}%` : "%" },
      },
    });
    res.status(200).json(foundEvents);
  } catch (error) {
    res.status(500).json(error);
  }
});

// FIND ONE EVENT
events.get("/:id", async (req, res) => {
  const params = req.params;
  try {
    const foundEvent = await Event.findOne({ where: { event_id: params.id } });
    res.status(200).json(foundEvent);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE A EVENT
events.post("/", async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new event",
      data: newEvent,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE A EVENT
events.put("/:id", async (req, res) => {
  const params = req.params;
  try {
    const updatedEvent = await Event.update(req.body, {
      where: {
        event_id: params.id,
      },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedEvent} event(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE A EVENT
events.delete("/:id", async (req, res) => {
  const params = req.params;
  try {
    const deletedEvent = await Event.destroy({
      where: {
        event_id: params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedEvent} events(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// EXPORT
module.exports = events;
