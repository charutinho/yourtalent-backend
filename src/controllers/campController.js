const express = require('express');

const router = express.Router();

const Camp = require('../models/camp');

router.post('/novocampeonato', async (req, res) => {
    await Camp.create( req.body );
    return res.send({ message: 'Campeonato adicionado com sucesso!' })
});

router.get('/getcampeonatos/:id', async (req,res) => {

    await Camp.find({ idParticipante: req.params.id })
        .sort([['createdAt', 'descending']])
        .exec()
        .then(camp => {
            if(camp == ''){
                return res.send({ message: 'Nenhum campeonato encontrado' })
            }
            return res.send({
                camp
            })
        })
});

router.get('/delcampeonato/:id', async (req,res) => {
    Camp.find({ _id: req.params.id })
    .remove()
    .exec()
    console.log('Ok')

})

module.exports = app => app.use('/camp', router);
