const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require("crypto");
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/user');

router.get('/novasenha/:email', async (req, res) => {
    const email = req.params.email;

    const nome = await User.findOne({ email }).select('nome')
    if (nome == null) {
        return res.send({ message: 'Nenhum usuário com esse e-mail cadastrado' })
    }


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAILEMAIL,
            pass: process.env.EMAILSENHA
        },
        tls: { rejectUnauthorized: false }
    });

    const senha = await crypto.randomBytes(3).toString('hex').toUpperCase()
    const novasenha = await bcrypt.hash(senha, 15);

    const filter = { email };

    await User.updateOne(filter, { senha: novasenha })

    const mailOptions = {
        from: 'grupomaislindodaetec@gmail.com',
        to: email,
        subject: 'Sua nova senha do aplicativo YourTalent',
        html: `<style>*{font-family: 'Arial'}h1{color: #4a148c;}.container{text-align: center}</style><div class='container'><h1>Olá ${nome.nome}, a sua nova senha é ${senha}</h1></div>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err)
        }
        console.log(info)
        return res.send({ message: 'E-mail enviado com sucesso!' })
    })
})

module.exports = app => app.use(router);
