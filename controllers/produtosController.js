const produtosModel = require("../models/produtosModel");


let produtos = [];

function cadastroProduto(req, res) {
  res.render('cadastroProduto');
}

async function todosProdutos(req, res) {
  produtos = await produtosModel.todosProdutos();

  res.render('listaProdutos', {produtos});
}

async function efetivarCadastro(req, res) {
  const {nome, descricao, categoria, valor, estoque} = req.body;

  const imagem = req.file.originalname;

  let resp = await produtosModel.cadastroProduto(nome, descricao, valor, estoque, categoria, imagem);
  if (resp.affectedRows > 0) {
      console.log('Você adicionou um novo produto');
      res.redirect('/listaProdutos');
  } else {
      console.log('Falha em cadastrar novo produto');
      res.redirect('/cadastroProduto');
  }
}

async function deleteProduto(req, res) { 
  await produtosModel.deleteProduto(req.params.idProduto);
  res.redirect('/listaProdutos');
}

module.exports = { cadastroProduto, efetivarCadastro, todosProdutos, deleteProduto };