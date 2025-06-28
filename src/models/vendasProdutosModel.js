const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const { vendasModel } = require('./vendasModel');
const { produtosModel } = require('./produtosModel');

// Definindo o modelo da tabela de junção
const vendasProdutosModel = sequelize.define('VendasProdutos', {
    ID_ProdutoVP: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: produtosModel,
            key: 'ID_ProdutoVP',
        },
        allowNull: false
    },
    ID_VendaVP: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: vendasModel,
            key: 'ID_VendaVP',
        },
        allowNull: false
    }
}, {
    tableName: 'VendasProdutos', // Nome da tabela no banco de dados
    timestamps: false // Desabilitar timestamps, pois a tabela não tem colunas createdAt/updatedAt
});

// Definindo as associações many-to-many
produtosModel.belongsToMany(vendasModel, {
    through: vendasProdutosModel,
    foreignKey: 'ID_ProdutoVP',
    as: 'produtosVendas'
});

vendasModel.belongsToMany(produtosModel, {
    through: vendasProdutosModel,
    foreignKey: 'ID_VendaVP',
    as: 'vendasProdutos'
});

module.exports = { vendasProdutosModel };