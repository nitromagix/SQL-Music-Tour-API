//

// DEPENDENCIES
const express = require("express");
const db = require("../models");
const { Op } = require("sequelize");

const bands = express.Router();
const { Band, MeetGreet, Event, EventStage, Stage, SetTime } = db;

// FIND ALL BANDS

// bands.get("/", async (req, res) => {
//   try {
//     const foundBands = await Band.findAll();
//     res.status(200).json(foundBands);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// bands.get("/", async (req, res) => {
//   try {
//     const foundBands = await Band.findAll({
//       order: [["available_start_time", "DESC"]],
//     });
//     res.status(200).json(foundBands);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

bands.get("/", async (req, res) => {
  const query = req.query;
  try {
    const foundBands = await Band.findAll({
      order: [["name", "ASC"]],
      where: { band_id: query.id },
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
  // console.log(query.event);
  try {
    const foundBand = await Band.findOne({
      where: { name: params.name },
      include: [
        {
          model: MeetGreet,
          as: "meet_greets",
          include: {
            model: Event,
            as: "event",
            where: {
              name: { [Op.like]: query.event ? `%${query.event}%` : "%" },
            },
          },
        },
        {
          model: SetTime,
          as: "set_times",
          include: {
            model: EventStage,
            as: "event_stages",
            include: [{ model: Event, as: "event" }, { model: Stage, as: "stage" }],
            
          },
        },
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
