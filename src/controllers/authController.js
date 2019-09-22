const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {

        const { email } = req.body;
        if (await User.findOne({ email })){
            return res.status(400).send({ error: "O e-mail já está cadastrado" });
        }

        const user = await User.create(req.body);

        user.senha = undefined;

        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: "Algo deu errado no registro, tente novamente" });
    }
});

module.exports = app => app.use ('/auth', router);