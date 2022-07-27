//

// DEPENDENCIES
const express = require("express");
const bands = express.Router();
const db = require("../models");
const { Band } = db;

// FIND ALL BANDS
bands.get("/", async (req, res) => {
  try {
    const foundBands = await Band.findAll();
    res.status(200).json(foundBands);
  } catch (error) {
    res.status(500).json(error);
  }
});

// FIND ONE BAND
bands.get("/:id", async (req, res) => {
  try {
    const bandId = req.params.id;
    const foundBand = await Band.findOne({ where: { band_id: bandId } });
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
  try {
    const updatedBand = await Band.update(req.body, {
      where: {
        band_id: req.params.id,
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
  try {
    const deletedBand = await Band.destroy({
      where: {
        band_id: req.params.id,
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
