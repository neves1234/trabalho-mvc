const usuarioModel = require('../models/usuarioModel');

function login(req, res) {
    erro = req.query.erro;
    if(erro == 1){
        erro = 'Dados não correspondentes';
    }else if(erro == 2){
        erro = 'Faça login antes de prosseguir';
    }else if(erro == 3){
        erro = 'Usuário cadastrado com sucesso!';
    }else{
        erro = '';
    }
    res.locals.alerta = {
        url: process.env.URL,
        title: "Login"
    };
    res.render('login');
}

function cadastro(req, res) {
    erro = req.query.erro;
    if(erro == 1){
        erro = 'Email já cadastrado';
    }else if(erro == 2){
        erro = 'Senhas não correspondentes';
    }else{
        erro = '';
    }
    res.locals.alerta = {
        url: process.env.URL,
        title: "Cadastro"
    };
    res.render('cadastroProduto');
}

async function autenticar(req, res) {
    const { email, senha } = req.body;
    let resp = await usuarioModel.verificarUsuario(email, senha);
    if(resp !== null && resp.length > 0){
        req.session.usuario = {
            idUsuario: resp[0].idUsuario,
            nome: resp[0].nome,
            email: resp[0].email
        };
        res.locals.alerta = {usuario: req.session.usuario};
        console.log(req.session.usuario);
        res.redirect('/cadastroProduto');
    }else{
        console.log('Usuário não encontrado');
        res.redirect('/login?erro=1');
    }
}

async function cadastrar(req, res) {
  const { nome, email, senha, senha2} = req.body;

  if (senha !== senha2) {
      console.log('Senhas não conferem');
      res.redirect('/cadastro?erro=2');
  } else {
      try {
          const resp = await usuarioModel.cadastrarUsuario(nome, email, senha);

          if (resp === false) {
              console.log('Usuário já existe');
              res.redirect('/cadastro?erro=1');
          } else if (resp instanceof usuarioModel) {
              console.log('Usuário cadastrado');
              res.redirect('/login?erro=3');
          } else {
              console.log('Cadastrado');
              res.redirect('/cadastroProduto');
          }
      } catch (error) {
          console.error('Erro ao cadastrar usuário:', error);
          res.redirect('/cadastro');
      }
  }
}

async function pegarUsuario(req, res, next) {
  if (req.session.usuario) {
    const usuario = req.session.usuario;
    res.locals.usuario = usuario;
  }
  res.render('listaProdutos', { usuario });
}

function logout(req, res){
    delete req.session.usuario;
    res.redirect('/login');
}

module.exports = { login, cadastro, autenticar, cadastrar, pegarUsuario, logout };