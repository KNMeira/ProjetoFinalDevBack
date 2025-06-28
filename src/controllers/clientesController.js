const { clientesModel } = require('../models/clientesModel');
const { Op } = require('sequelize')


const clientesController = {

    listarClientes: async (req, res) => {

        try {

            let { ID_Cliente, nomeCliente } = req.query;

            let conditions = {};

            if (ID_Cliente) {
                conditions.ID_Cliente = ID_Cliente;
            }

            if (nomeCliente) {
                conditions.nomeCliente = nomeCliente;
            }

            let clientes = await clientesModel.findAll({
                where: {
                    [Op.or]: [
                        { ID_Cliente: { [Op.eq]: conditions.ID_Cliente } },
                        { nomeCliente: { [Op.substring]: conditions.nomeCliente } }
                    ]
                }
            });

            return res.status(200).json(clientes)

        } catch (error) {
            console.error("Erro ao listar cliente:", error)
            return res.status(500).json({ message: "Erro ao listar clientes" });
        }
    },

    cadastrarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente, emailCliente, celularCliente } = req.body;

            // Validação para garantir que todos os campos obrigatórios sejam fornecidos
            if (!nomeCliente || !cpfCliente || !emailCliente || !celularCliente) {
                return res.status(400).json({ message: "Campos obrigatórios não preenchidos" })
            }

            let cliente = await clientesModel.findOne({
                where: {
                    [Op.or]: [
                        { cpfCliente },
                        { emailCliente }
                    ]
                }
            });

            if (cliente) {
                return res.status(409).json({ message: "Cliente já cadastrado!" })
            }

            await clientesModel.create({ nomeCliente, cpfCliente, emailCliente, celularCliente });
            return res.status(201).json({ message: "Cliente cadastrado com sucesso!" });


        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            return res.status(500).json({ message: "Erro ao cadastrar cliente" })
        }
    },

    atualizarCliente: async (req, res) => {

        try {
            const { ID_Cliente } = req.params;
            const { nomeCliente, cpfCliente, emailCliente, celularCliente } = req.body;

            let cliente = await clientesModel.findByPK(ID_Cliente);

            if (!cliente) {
                return res.status(404).json({ message: "Cliente não encontrado" })
            }

            if (cpfCliente || emailCliente) {
                aluno = await alunoModel.findOne({
                    where: {
                        [Op.or]: [
                            { cpfCliente },
                            { emailCliente }
                        ]
                    }
                });

                if (cliente) {
                    return res.status(409).json({ message: "Email ou CPF já cadastrados" })
                }
            }
            let dadosAtulizados = { nomeCliente, cpfCliente, emailCliente, celularCliente };

            await clientesModel.update(dadosAtulizados, { where: { ID_Cliente } });

            aluno = await clientesModel.findByPK(ID_Cliente);

            return res.status(200).json({ message: "Cliente atualizado com sucesso:", Cliente: cliente });

        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            return res.status(500).json({ message: "Erro ao atualizar cliente" });
        }
    },

    deletarCliente: async (req, res) => {
        try {
            const { ID_Cliente } = req.params;

            let cliente = await clientesModel.findByPK(ID_Cliente);

            if (!cliente) {
            return res.status(404).json({message: "Cliente não encontrado"})
        }

        let nomeCliente = cliente.nomeCliente;

        let result = await alunoModel.destroy({where: {ID_Cliente}});

        if (result > 0) {
            return res.status(200).json({message: `${nomeCliente} foi excluído com sucesso!`})
        } else {
            return res.status(404).json({ message: "Erro ao excluir Cliente!"});
        }

        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        return res.status(500).json({ message: "Erro ao excluir cliente"});
        }
}};

module.exports = {clientesController};