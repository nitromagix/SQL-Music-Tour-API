//

"use strict";

const { Model } = require("sequelize");

const db = require("../models");

const { MeetGreet, EventStage, Stage } = db;

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Stage, EventStage, MeetGreet }) {
      Event.belongsToMany(Stage, {
        foreignKey: "event_id",
        as: "stages",
        through: EventStage,
      });

      Event.hasMany(EventStage, {
        foreignKey: "event_id",
        as: "event_stages",
      });

      Event.hasMany(MeetGreet, {
        foreignKey: "event_id",
        as: "meet_greets",
      });
    }
  }
  Event.init(
    {
      event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      start_time: { type: DataTypes.DATE, allowNull: false },
      end_time: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "event",
      timestamps: false,
    }
  );
  return Event;
};
