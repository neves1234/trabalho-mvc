const database = require('./database');

class ProdutoModel {
    constructor(idProduto, idUsuario, nome, descricao, valor, estoque, categoria, imagem) {
        this.idProduto = idProduto;
        this.idUsuario = idUsuario;
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
        this.estoque = estoque;
        this.categoria = categoria;
        this.imagem = imagem;
    }

    static async todosProdutos(){
        let sql = `SELECT * FROM produto ORDER BY id_produto DESC`;
        let resp = await database.query(sql);
        return resp;
    }

    static async cadastroProduto(nome, descricao, valor, estoque, categoria, imagem) {
        try {
            let sql = `INSERT INTO produto (nome, descricao, valor, estoque, categoria, imagem) VALUES ('${nome}', '${descricao}', ${valor}, ${estoque}, '${categoria}', '${imagem}')`;
            let resp = await database.query(sql);
            return resp;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async pegarProduto(id){
        let sql = `SELECT * FROM produto WHERE id_produto = '${id}'`;
        let resp = await database.query(sql);
        return resp;
    }



    static async deleteProduto(idProduto) {
        let res = await database.query(`DELETE FROM produto WHERE id_produto = ${idProduto}`);
        return true;
    }
}

module.exports = ProdutoModel;