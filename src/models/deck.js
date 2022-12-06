"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Deck.belongsTo(models.Event, {
        foreignKey: "eventId",
        as: "event",
      });
    }
  }
  Deck.init(
    {
      eventId: DataTypes.STRING,
      commander: DataTypes.STRING,
      decklist: DataTypes.STRING,
      position: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Deck",
    }
  );
  return Deck;
};
