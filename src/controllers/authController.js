const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const router = express.Router();

router.post('/verificaremail', async(req,res) => {
    const { email } = req.body;

    if(await User.findOne({ email })){
        return res.send({ error: 'O e-mail já está cadastrado' })
    } else {
        return res.send({ message: 'O e-mail esta disponível' })
    }
})

router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);

        user.senha = undefined;

        return res.send({
            user,
        });
    } catch (err) {
        return res.status(400).send({ error: "Algo deu errado no registro, tente novamente" });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, senha } = req.body;

    const user = await User.findOne({ email }).select('+senha');

    if (!user)
        return res.status(400).send({ error: "E-mail não encontrado" });

    if (!await bcrypt.compare(senha, user.senha))
        return res.status(400).send({ error: "Senha incorreta" });

    user.senha = undefined;

    res.send({
        user,
        login: 1
    });
});

module.exports = app => app.use('/auth', router);
