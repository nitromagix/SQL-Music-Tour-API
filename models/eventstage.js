//

"use strict";

const { Model } = require("sequelize");

const db = require("../models");

const { Event, Stage, SetTime } = db;

module.exports = (sequelize, DataTypes) => {
  class EventStage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate({ SetTime, Stage, Event }) {
      EventStage.hasMany(SetTime, {
        foreignKey: "set_time_id",
        as: "set_times",
      });

      EventStage.belongsTo(Stage, {
        foreignKey: "stage_id",
        as: "stage",
      });

      EventStage.belongsTo(Event, {
        foreignKey: "event_id",
        as: "event",
      });
    }
  }
  EventStage.init(
    {
      event_stage_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      event_id: { type: DataTypes.INTEGER, allowNull: false },
      stage_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "EventStage",
      tableName: "event_stage",
      timestamps: false,
    }
  );
  return EventStage;
};
