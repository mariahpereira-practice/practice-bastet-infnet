const {Squelize, DataTypes} = require('sequelize');

const db = require('../database/conn');

const TravelPackage = db.define('TravelPackage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date:
    {
        type: DataTypes.DATE,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    maxParticipants: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    remainingVacancies: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = TravelPackage;