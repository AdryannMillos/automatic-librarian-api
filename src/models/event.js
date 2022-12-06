'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasMany(models.Deck, {
        foreignKey: "eventId",
        as: "decks",
      });
    }
  }
  Event.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    date: DataTypes.STRING,
    numberOfPlayers: DataTypes.STRING,
    url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};