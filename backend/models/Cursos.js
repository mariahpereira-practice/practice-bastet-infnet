const {Squelize, DataTypes} = require('sequelize');

const db = require('../database/conn');

const Curso = db.define('Curso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    capa: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    inscricoes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

module.exports = Curso;