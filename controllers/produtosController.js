const produtosModel = require("../models/produtosModel");


let produtos = [];

function cadastroProduto(req, res) {

  res.render('cadastroProduto');
}

async function todosProdutos(req, res) {
  produtos = await produtosModel.todosProdutos();
  for (const produto of produtos) {
      let categoria = await produtosModel.pegarCategoria(produto.id_categoria);
      if (categoria && categoria.length > 0) {
          produto.categoria = categoria[0].nome;
      }
  }
  res.rendirect('listaProdutos', {produtos});
}

async function efetivarCadastro(req, res) {
  const {nome, descricao, categoria, valor, estoque} = req.body;

  const imagem = req.file.originalname;

  let idUsuario = req.session.usuario.id_usuario;
  console.log(req.body);


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
  if(await produtosModel.deleteProduto(req.params.id_produto)){
      res.redirect('/listaProdutos');
  }else{
      res.redirect('/listaProdutos');
  }
}

module.exports = { cadastroProduto, efetivarCadastro, todosProdutos, deleteProduto };