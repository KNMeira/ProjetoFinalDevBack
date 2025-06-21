const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const fornecedorModel = sequelize.define('Fornecedores', {
    ID_Fornecedor:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeFornecedor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpjFornecedor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailFornecedor: {
        type: DataTypes.STRING,
        allowNull: false,
        Unique: true
    },
    celularFornecedor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    enderecoFornecedor: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    tableName: 'Fornecedores',
    timestamps: false

});

module.exports = {fornecedorModel};