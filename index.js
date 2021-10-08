const express = require('express')
const cors = require('cors')
const { pool } = require('./config')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

const controleProdutora = require('./controladores/produtora')
const controleJogo = require('./controladores/jogo')

app
    .route('/produtora')
    .get(controleProdutora.getProdutoras)
    .post(controleProdutora.addProdutora)
    .put(controleProdutora.updateProdutora)

app
    .route('/produtora/:codigo')
    .get(controleProdutora.getProdutoraPorCodigo)
    .delete(controleProdutora.deleteProdutora)


app
    .route('/jogo')
    .get(controleJogo.getJogos)
    .post(controleJogo.addJogo)
    .put(controleJogo.updateJogo)

app
    .route('/jogo/:codigo')
    .get(controleJogo.getJogoPorCodigo)
    .delete(controleJogo.deleteJogo)    

    
app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor rodando na porta 3002')
})



