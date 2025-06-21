const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const {funcionarioModel} = require('./funcionariosModel');
const {fornecedorModel} = require('./fornecedoresModel');


const produtoModel = sequelize.define('Produto', {
    ID_Produto:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeProduto:{
        type: DataTypes.STRING,
        allowNull: false
    },
    categoriaProduto:{
        type: DataTypes.STRING,
        allowNull: false
    },
    qtdMin:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    qtdAtual:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataCadastro:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dataVencimento:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    codigoSku:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    idFuncionarioProduto:{
        type: DataTypes.INTEGER,
        references:{
            model: funcionarioModel,
            key: 'ID_Funcionario'
        },
        allowNull: false
    },
    idFornecedorProduto:{
        type: DataTypes.INTEGER,
        references:{
            model: fornecedorModel,
            key: 'ID_Fornecedor'
        },
        allowNull: false
    }

}, {
    tableName: 'Produtos',
    timestamps: false
});

// Associações entre Produto e Funcionário
funcionarioModel.hasMany(produtoModel, {foreignKey: 'idFuncionarioProduto',
    as: 'Funcionario' // Um funcionário pode ter muitos produtos
});
produtoModel.belongsTo(funcionarioModel, {
    foreignKey: 'idFuncionarioProduto',
    as: 'Funcionario' // Um produto pertence a um funcionário
});

// Associações entre Produto e Fornecedor
fornecedorModel.hasMany(produtoModel, {
    foreignKey: 'idFornecedorProduto',
    as: 'Fornecedor' // Um fornecedor pode ter muitos produtos
});
produtoModel.belongsTo(fornecedorModel, {
    foreignKey: 'idFornecedorProduto',
    as: 'Fornecedor' // Um produto pertence a um fornecedor
});

module.exports = {produtoModel};