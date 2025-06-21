const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const clientesModel = sequelize.define('Clientes', {
    ID_Cliente:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpfCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailCliente: {
        type: DataTypes.STRING,
        allowNull: false,
        Unique: true
    },
    celularCliente: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: 'Clientes',
    timestamps: false

});

module.exports = {clientesModel};