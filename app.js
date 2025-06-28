const express = require("express");


// IMPORTAÇÃO DE ROTAS

const {rotasClientes} = require('./src/routes/clientesRoutes');

//APP

const app = express(); // Cria uma instância do Express, armazenando todos métodos e 
//funcionalidades em 'app'.

const PORT = 8081; //Define a porta em que o servidor irá escutar as requisições 

app.use(express.json()); // COnfigura o body-parser para interpretar corpos de requisição
// no formato JSON.

app.use("/clientes", rotasClientes);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})