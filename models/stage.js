//

"use strict";

const { Events } = require("pg");
const { Model } = require("sequelize");

const { Event } = require("./event");
const { EventStage } = require("./eventstage");

module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event, EventStage }) {
      Stage.belongsToMany(Event, {
        foreignKey: "stage_id",
        as: "event",
        through: EventStage,
      });
    }
  }
  Stage.init(
    {
      stage_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Stage",
      tableName: "stage",
      timestamps: false,
    }
  );
  return Stage;
};
