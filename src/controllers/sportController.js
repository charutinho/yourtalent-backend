const express = require('express');
const router = express.Router();
const Sport = require('../models/sport');

router.get('/criar/:categoria/:nomeEsporte', async (req, res) => {

    var categoria = req.params.categoria;
    // console.log(categoria);
    var nome = req.params.nomeEsporte;
    //console.log(nome);

    // console.log(req.params);

    if (await Sport.findOne({ nomeEsporte: nome })) {
        console.log("Esporte já cadastrado");
        return res.send({ error: "Este esporte já existe" });
    }

    switch (categoria) {
        case 'esporte':
            console.log("Esporte");
            break;
        case 'esport':
            console.log("eSport");
            break;
        default:
            return res.render({ message: "Esta categoria não existe" })
    }

    await Sport.create( req.params );

    res.send({
        message: "Esporte criado com sucesso",
        nome,
        categoria
    })
    
})


//Listar esportes
router.get('/listaresportes', async (req, res) => {
    Sport.find({ categoria: "esporte" }).then(function (esportesLista) {
        res.send(esportesLista);
    });
});

//Listar eSports
router.get('/listaresports', async (req, res) => {
    Sport.find({ categoria: "esport" }).then(function (eSportLista) {
        res.send(eSportLista);
    });
});

router.get('/listartodos', async (req, res) => {
    Sport.find({}).then(function (Listar) {
        res.send(Listar);
    });
});

module.exports = app => app.use('/esportes', router);
