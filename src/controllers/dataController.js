const express = require('express');


const User = require('../models/user');

const router = express.Router();

router.get('/data/:id', async (req, res) => {
    
    const idUser = req.params.id;

    const user = await User.findOne({ _id: idUser });

    if (!user)
        return res.status(404).send({ error: "Usuário não encontrado" });

    user.senha = undefined;

    res.send({
        user,
    });
});

router.post('/listData', async (req, res) => {

    const { nivel } = req.body;

    const user = await User.find({ nivel: 1 });    

    user.senha = undefined;

    res.send({
        user,
    });
});

router.post('/updateData', async (req, res) => {
    
    const id = req.body.id;
    const nome = req.body.nome;

    try {
        await User.findByIdAndUpdate(id, { $set: req.body });
        return res.send({
            message: `Usuário ${nome} atualizado com sucesso!`
        })
    } catch (err){
        if(err){
            return res.status(400).send({ error: 'Algo de errado ao atualizar as informações' })
        }
    }

});


module.exports = app => app.use(router);