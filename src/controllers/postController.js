const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');

const router = express.Router();
const Post = require('../models/post');

router.post('/novopost', multer(multerConfig).single('img'), async (req, res) => {
    const file = req.file;
    const idUser = req.headers.iduser;
    const desc = req.headers.desc;
    const imgName = req.file.filename;

    console.log(idUser);
    console.log(desc);
    console.log(file);

    if (!file) {
        return res.status(404).send({ error: "Nenhum arquivo selecionado" });
    } else {
        try {
            await Post.create({ idUsuario: idUser, descricao: desc, conteudo: imgName });

            res.send({
                idUser,
                desc,
                file
            });

        } catch (err) {
            return res.status(400).send({ error: "Algo deu errado" });
        }
    }
});

router.get('/listarposts', async (req, res) => {
    Post.find({}).then(function (posts) {
        res.send(posts);
    });
});

module.exports = app => app.use(router);
