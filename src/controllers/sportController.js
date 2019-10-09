const express = require('express');
const router = express.Router();
const Sport = require('../models/sport');

// Executar isso somente uma vez para inserir os esportes no mongodb
router.post('/criaresportes', async (req, res) => {

    const esportes = [
        //Esportes
        { nomeEsporte: "Futebol", categoria: "Esporte" },
        { nomeEsporte: "Basquete", categoria: "Esporte" },
        //eSports
        { nomeEsporte: "CS:GO", categoria: "eSport" },
        { nomeEsporte: "LoL", categoria: "eSport" }];

    await Sport.collection.insert(esportes, function (err, docs) {
        if (err) {
            return console.error(err);
        } else {
            res.send({
                message: "Esportes inseridos com sucesso!"
            })
        }
    });
});


//Listar esportes
router.get('/listaresportes', async (req, res) => {
    Sport.find({ categoria: "Esporte" }).then(function (esportesLista){
        res.send(esportesLista);
    });
});

//Listar eSports
router.get('/listaresports', async (req, res) => {
    Sport.find({ categoria: "eSport" }).then(function (eSportLista){
        res.send(eSportLista);
    });
});

router.get('/listartodos', async (req, res) => {
    Sport.find({}).then(function (Listar){
        res.send(Listar);
    });
});

module.exports = app => app.use('/esportes', router);
