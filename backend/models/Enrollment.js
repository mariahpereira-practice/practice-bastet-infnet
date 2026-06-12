const { DataTypes } = require('sequelize');
const db = require('../database/conn');

const Enrollment = db.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cursoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    inscricaoData: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});

module.exports = Enrollment;