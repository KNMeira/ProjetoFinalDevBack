const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const {clienteModel} = require('./clientesModel');
const {produtoModel, produtoModel} = require('./produtosModel');
const { funcionarioModel } = require('./funcionariosModel');

const vendaModel = sequelize.define('Vendas', {
    ID_Venda:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    formaPagamento:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dataCompra:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    valorTotal:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    idFuncionarioVenda:{
        type: DataTypes.INTEGER,
        references:{
            model: funcionarioModel,
            key: 'ID_Funcionario'
        },
        allowNull: false
    },
    idClienteVenda:{
        type: DataTypes.INTEGER,
        references:{
            model: clienteModel,
            key: 'ID_Cliente'
        },
        allowNull: false
    },
    idProdutoVenda:{
        type: DataTypes.INTEGER,
        references:{
            model: produtoModel,
            key: 'ID_Produto'
        },
        allowNull: false
    }

}, {
    tableName: 'Vendas',
    timestamps: false

});

funcionarioModel.hasMany(vendaModel, {
    foreignKey: 'idFuncionarioVenda',
    as: 'funcionarioVenda'});

// Associação: Um cliente pode ter várias vendas
clienteModel.hasMany(vendaModel, {
    foreignKey: 'idClienteVenda',
    as: 'clienteVenda' // Alias para acessar as vendas de um cliente
});

vendaModel.belongsTo(funcionarioModel, {
    foreignKey: 'idFuncionarioVenda',
    as: 'vendaFuncionario' // Alias para acessar o produto de uma venda
});

// Associação: Uma venda pertence a um produto
vendaModel.belongsTo(clienteModel, {
    foreignKey: 'idClienteVenda',
    as: 'vendaCliente' // Alias para acessar o produto de uma venda
});


module.exports = {vendasModel};