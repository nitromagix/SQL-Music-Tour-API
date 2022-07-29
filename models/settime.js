//

"use strict";

const { Model } = require("sequelize");

const { Band } = require("./band");
const { EventStage } = require("./eventstage");

module.exports = (sequelize, DataTypes) => {
  class SetTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SetTime.belongsTo(Band, {
        foreignKey: "band_id",
        as: "band",
      });

      SetTime.belongsTo(EventStage, {
        foreignKey: "event_stage_id",
        as: "event_stage",
      });


    }
  }
  SetTime.init(
    {
      set_time_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      event_stage_id: { type: DataTypes.INTEGER, allowNull: false },
      band_id: { type: DataTypes.INTEGER, allowNull: false },
      set_start_time: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "SetTime",
      tableName: "set_time",
      timestamps: false,
    }
  );
  return SetTime;
};
