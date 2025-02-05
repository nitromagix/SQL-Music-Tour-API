//

// DEPENDENCIES
const express = require("express");
const db = require("../models");
const { Op } = require("sequelize");

const stages = express.Router();
const { Stage, Event, EventStage, SetTime, Band } = db;

// FIND ALL STAGES

stages.get("/", async (req, res) => {
  const query = req.query;
  try {
    const foundStages = await Stage.findAll({
      order: [["name", "ASC"]],
      where: {
        name: { [Op.like]: query.name ? `%${query.name}%` : "%" },
      },
    });
    res.status(200).json(foundStages);
  } catch (error) {
    res.status(500).json(error);
  }
});

// FIND ONE STAGE
stages.get("/:name", async (req, res) => {
  const params = req.params;
  try {
    const foundStage = await Stage.findOne({
      attributes: ["name"],
      where: { name: params.name },
      include: [
        {
          model: Event,
          attributes: ["name", "date", "start_time", "end_time"],
          as: "events",
          through: { attributes: [] },
        },
        {
          model: EventStage,
          attributes: ["stage_id"],
          as: "event_stage",
          include: [
            {
              model: SetTime,
              attributes: ["set_start_time"],
              as: "set_times",
              include: {
                model: Band,
                as: "band",
                attributes: ["name"],
              },
            },
          ],
        },
      ],
    });
    res.status(200).json(foundStage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE A STAGE
stages.post("/", async (req, res) => {
  try {
    const newStage = await Stage.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new event",
      data: newStage,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE A STAGE
stages.put("/:id", async (req, res) => {
  const params = req.params;
  try {
    const updatedStage = await Stage.update(req.body, {
      where: {
        stage_id: params.id,
      },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedStage} event(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE A STAGE
stages.delete("/:id", async (req, res) => {
  const params = req.params;
  try {
    const deletedStage = await Stage.destroy({
      where: {
        stage_id: params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedStage} event(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// EXPORT
module.exports = stages;
