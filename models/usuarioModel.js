const database = require("./database");
const md5 = require("md5");

class UsuarioModel {
  constructor(idUsuario, nome, email, senha) {
    this.idUsuario = idUsuario;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  static async verificarUsuario(email, senha) {
    console.log("Verificando usuário");
    let sql = `SELECT * FROM usuario WHERE email = '${email}' AND senha = '${md5(senha)}'`;
    let resp = await database.query(sql);
    
    if (resp.length > 0) {
        return resp;
    } else {
        return null;
    }
  }

  static async verificarEmail(email) {
    let sql = `SELECT * FROM usuario WHERE email = '${email}'`;
    let resp = await database.query(sql);
    return resp;
  }

  static async cadastrarUsuario(nome, email, senha) {
    let sql = `INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${md5(senha)}')`;
    let resp = await database.query(sql);
    if (resp.insertId) {
        return resp;
    } else {
        return null;
    }
  }
}

module.exports = UsuarioModel;
