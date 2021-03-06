const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multerUser');

const router = express.Router();
const User = require('../models/user');

router.post('/uploadimg', multer(multerConfig).single('img'), async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(404).send({ error: "Nenhum arquivo selecionado" });
    } else {

        const imgName = req.file.filename;
        const idUser = req.headers.iduser;

        await User.findByIdAndUpdate(idUser, { $set: { fotoPerfil: imgName } });

        console.log(imgName);

        res.send({
            file
        })

    }
});

router.post('/uploadimgcapa', multer(multerConfig).single('img'), async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send({ error: "Foto não enviada" });
    } else {

        const imgName = req.file.filename;
        const idUser = req.headers.iduser;

        await User.findByIdAndUpdate(idUser, { $set: { fotoCapa: imgName } });

        console.log(imgName);

        res.send({
            file
        })

    }
});

module.exports = app => app.use(router);
