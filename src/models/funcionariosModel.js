const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const funcionarioModel = sequelize.define('Funcionarios', {
    ID_Funcionario:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeFuncionario:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nivelAcesso:{
        type: DataTypes.STRING,
        allowNull: true
    },
    emailFuncionario:{
        type: DataTypes.STRING,
        allowNull: false,
        Unique: true
    },
    senhaFuncionario:{
        type: DataTypes.STRING,
        allowNull: true
    },
    
}, {
    tableName: 'Funcionarios',
    timestamps: false

});

module.exports = {funcionarioModel};