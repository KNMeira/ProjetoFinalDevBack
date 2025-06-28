const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const {produtoModel} = require('./produtosModel');

const movimentacaoModel = sequelize.define('Movimentacoes', {
    ID_Movimentacao:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipoMovimentacao:{
        type: DataTypes.STRING,
        allowNull: false
    },
    qtdMovimentacao:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataMovimentacao:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    idProdutoMovimentacao:{
        type: DataTypes.INTEGER,
        references:{
            model: produtoModel,
            key: 'ID_Produto'
        },
        allowNull: false
    }

}, {
    tableName: 'Movimentacoes',
    timestamps: false

});

module.exports = {movimentacaoModel};

// Associação: Um produto pode ter várias movimentações
produtoModel.hasMany(movimentacaoModel, {
    foreignKey: 'idProdutoMovimentacao',
    as: 'produtoMovimentacao' // Alias para acessar as movimentações de um produto
});

// Associação: Uma movimentação pertence a um produto
movimentacaoModel.belongsTo(produtoModel, {
    foreignKey: 'idProdutoMovimentacao',
    as: 'movimentacaoProduto' // Alias para acessar o produto de uma movimentação
});