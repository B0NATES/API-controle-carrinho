const express = require ('express');
const rotas = express();
const vendas = require ('./controladores/vendas')



rotas.get('/' , vendas.teste);
rotas.get('/produtos', vendas.exibirProdutos);
rotas.post ('/produtos', vendas.vendas );

module.exports = rotas