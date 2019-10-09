const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');

const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

router.post('/novopost', multer(multerConfig).single('img'), async (req, res) => {
    console.log(req.file);
    const file = req.file;
    const desc = req.headers.desc;
    const imgName = req.file.filename;


    var autor = {
        idUsuario: req.headers.iduser,
        nomeUsuario: req.headers.nomeusuario
    }

    try {
        if (!file) {
            return res.status(404).send({ error: "Nenhum arquivo selecionado" });
        } else {
            try {
                await Post.create({ descricao: desc, conteudoPost: imgName, autor: autor });

                res.send({
                    message: "Post criado com sucesso",
                    Post
                });

            } catch (err) {
                return res.status(400).send({ error: "Algo deu errado" });
            }
        }
    } catch (err) {
        return res.status(400).send({ error: "Algo deu errado" });
    }


});

router.get('/listarposts', async (req, res) => {
    Post.find({}).then(function (posts) {
        res.send(posts);
    });
});

module.exports = app => app.use(router);
