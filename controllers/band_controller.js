//

// DEPENDENCIES
const express = require("express");
const db = require("../models");
const { Op } = require("sequelize");

const bands = express.Router();

const { Band, MeetGreet, Event, EventStage, Stage, SetTime } = db;

// FIND ALL BANDS

bands.get("/", async (req, res) => {
  const query = req.query;
  try {
    const foundBands = await Band.findAll({
      order: [["name", "ASC"]],
      where: {
        name: { [Op.like]: query.name ? `%${query.name}%` : "%" },
      },
    });
    res.status(200).json(foundBands);
  } catch (error) {
    res.status(500).json(error);
  }
});

// FIND ONE BAND
bands.get("/:name", async (req, res) => {
  const params = req.params;
  const query = req.query;
  console.log(params.name);
  // console.log(query.event);
  try {
    const foundBand = await Band.findOne({
      attributes: ["name"],
      where: { name: params.name },
      include: [
        {
          model: MeetGreet,
          attributes: ["meet_start", "meet_end"],
          as: "meet_greets",
          include: {
            model: Event,
            attributes: ["name", "date"],
            as: "event",
            where: {
              name: { [Op.like]: query.event ? `%${query.event}%` : "%" },
            },
          },
        },
        {
          model: SetTime,
          attributes: ["set_start_time"],
          as: "set_times",
          include: {
            model: EventStage,
            attributes: ["event_id"],
            as: "event_stages",
            include: [
              {
                model: Event,
                attributes: ["name", "date"],
                as: "event",
                where: {
                  name: { [Op.like]: query.event ? `%${query.event}%` : "%" },
                },
              },
              { model: Stage, as: "stage", attributes: ["name"] },
            ],
          },
        },
      ],
      order: [
        ["meet_greets", "event", "date", "ASC"],
        ["set_times", "event_stages", "event", "date", "ASC"],
      ],
    });
    res.status(200).json(foundBand);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE A BAND
bands.post("/", async (req, res) => {
  try {
    const newBand = await Band.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new band",
      data: newBand,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE A BAND
bands.put("/:id", async (req, res) => {
  const params = req.params;
  try {
    const updatedBand = await Band.update(req.body, {
      where: {
        band_id: params.id,
      },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedBand} band(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE A BAND
bands.delete("/:id", async (req, res) => {
  const params = req.params;
  try {
    const deletedBand = await Band.destroy({
      where: {
        band_id: params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedBand} band(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// EXPORT
module.exports = bands;
