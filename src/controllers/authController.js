const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const authConfig = require('../config/auth.json');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    try {

        const { email } = req.body;
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: "O e-mail já está cadastrado" });
        }

        const user = await User.create(req.body);

        user.senha = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
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
        token: generateToken({ id: user.id }),
    });
});

module.exports = app => app.use('/auth', router);
