const { pool } = require("../config");
const { request, response } = require("express");

const getProdutoras = (request, response) => {
    pool.query("select * from produtora order by codigo", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar as produtoras: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

module.exports.getProdutoras = getProdutoras;

const addProdutora = (request, response) => {
    const { nome} = request.body

    pool.query(
        'insert into produtora (nome) values ($1)',
        [nome],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir a produtora: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'produtora criada.' })
        }        
    )
}

module.exports.addProdutora = addProdutora;


const updateProdutora = (request, response) => {
    const { codigo, nome} = request.body

    pool.query(
        'update produtora set nome = $1 where codigo = $2',
        [nome, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar a produtora: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'produtora atualizada.' })
        }        
    )
}

module.exports.updateProdutora = updateProdutora;

const deleteProdutora = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'delete from produtora where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível remover a produtora: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'produtora removida.' })
        }        
    )
}

module.exports.deleteProdutora = deleteProdutora;

const getProdutoraPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select * from produtora where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar a produtora: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

module.exports.getProdutoraPorCodigo = getProdutoraPorCodigo;