const { pool } = require("../config");
const { request, response } = require("express");

const getJogos = (request, response) => {
    pool.query("select l.codigo as codigo, l.nome as nome, l.genero as genero, \
    l.produtora as produtora, e.nome as produtora_nome \
    from jogo l \
    join produtora e on e.codigo = l.produtora order by l.codigo", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar o jogo: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

module.exports.getJogos = getJogos;

const addJogo = (request, response) => {
    const { nome , genero, produtora } = request.body

    pool.query(
        'insert into jogo ( nome , genero, produtora ) values ($1, $2, $3)',
        [ nome , genero, produtora ],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir o jogo: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Jogo criado.' })
        }        
    )
}

module.exports.addJogo = addJogo;


const updateJogo = (request, response) => {
    const { codigo, nome , genero, produtora } = request.body

    pool.query(
        'update jogo set nome = $1, genero = $2, produtora = $3 where codigo = $4',
        [nome , genero, produtora, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar o jogo: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Jogo atualizado.' })
        }        
    )
}

module.exports.updateJogo = updateJogo;

const deleteJogo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'delete from jogo where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível remover o jogo: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'jogo removido.' })
        }        
    )
}

module.exports.deleteJogo = deleteJogo;

const getJogoPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select l.codigo as codigo, l.nome as nome, l.genero as genero, \
        l.produtora as produtora, e.nome as produtora_nome \
        from jogo l \
        join produtora e on e.codigo = l.produtora where l.codigo = $1 order by l.codigo ',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar o jogo: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

module.exports.getJogoPorCodigo = getJogoPorCodigo;