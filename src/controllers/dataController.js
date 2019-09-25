const express = require('express');


const User = require('../models/user');

const router = express.Router();

router.post('/data', async (req, res) => {
    const { _id } = req.body;

    const user = await User.findOne({ _id });

    if (!user)
        return res.status(404).send({ error: "Usuário não encontrado" });

    user.senha = undefined;

    res.send({
        user,
    });
});

router.post('/listData', async (req, res) => {

    const { nivel } = req.body;

    const user = await User.find({ nivel: 3 });    

    user.senha = undefined;

    res.send({
        user,
    });
})

module.exports = app => app.use(router);