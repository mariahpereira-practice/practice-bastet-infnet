const {Squelize, DataTypes} = require('sequelize');

const db = require('../database/conn');

const User = require('./User');
const TravelPackage = require('./TravelPackage');

const Enrollment = db.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
});

Enrollment.belongsTo(User);
Enrollment.belongsTo(TravelPackage);

module.exports = Enrollment;