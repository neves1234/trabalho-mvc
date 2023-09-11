const express = require('express'); 
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const multer = require('multer');

const usuarioController = require('./controllers/usuarioController');
const produtosController = require('./controllers/produtosController');
const produtosModel = require('./models/produtosModel');

const port = 3000;

app.use(session({secret: 'neves'}));
app.use(expressLayouts);
app.set('layout', './layouts/default/login');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/uploads/') 
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname)
  }
});

const upload = multer({
  storage: storage
});

app.use((req, res, next) => {
    if (req.session.usuario) {
        console.log('Login efetuado com sucesso');
        res.locals.alerta ={
            usuario: req.session.usuario
        };
        next();
    } else {
        console.log('Não logado');
        if (req.url == '/' || req.url == '/listaProdutos' || req.url == '/cadastroProduto') {
            res.redirect('/login?erro=2');
        } else {
            res.locals.alerta ={
                usuario: req.session.usuario
            };
            next();
        }
    }
});

app.use((req, res, next) => {
  if (req.session.usuario) {
    res.locals.usuario = req.session.usuario;
  } else {
    res.locals.usuario = null;
  }
  next();
});


app.get('/login', (req, res) => {
    app.set('layout', './layouts/default/login');
    usuarioController.login(req, res);
});

app.post('/login', (req, res) => {
    usuarioController.autenticar(req, res);
});

app.get('/cadastro', (req, res) => {
    app.set('layout', './layouts/default/login');
    usuarioController.cadastro(req, res);
});

app.post('/cadastro', (req, res) => {
    usuarioController.cadastrar(req, res);
});

app.get('/cadastroProduto', (req, res) => {
    app.set('layout');
    produtosController.cadastroProduto(req, res);
});

app.post('/cadastroProduto', upload.single('imagem'), (req, res) => {
    produtosController.efetivarCadastro(req, res);
});

app.get('/listaProdutos', (req, res) => {
    app.set('layout', './listaProdutos');
    //produtosController.todosProdutos(req, res);
});




app.get('/cadastroProduto/delete/:id_produto', (req, res) => {
  produtosController.deleteProduto(req, res);
});

app.delete('/cadastroProduto', produtosController.deleteProduto);

app.listen(port, () => { 
    console.log(`Escutando na porta: ${port}`);
});