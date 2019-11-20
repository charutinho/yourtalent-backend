const express = require('express');
const MercadoPago = require('mercadopago');

const router = express.Router();

const getFullUrl = (req) => {
    const url = req.protocol + '://' + req.get('host');
    console.log(url)
    return url;
}

router.get('/checkout/:id/:email', async (req, res) => {
    console.log(process.env)
    MercadoPago.configure({
        sandbox: process.env.SANDBOX == 'true' ? true : false,
        access_token: process.env.MP_ACCESS_TOKEN
    });

    const { id, email } = req.params;

    const purchaseOrder = {
        items: [
            item = {
                id: id,
                title: 'YourTalent Premium',
                description: 'Premium para olheiro YourTalent',
                quantity: 1,
                currency_id: 'BRL',
                unit_price: 15
            }
        ],
        payer: {
            email: email
        },
        auto_return: "all",
        external_reference: id,
        back_urls: {
            success: getFullUrl(req) + "/success",
            pending: getFullUrl(req) + "/pending",
            failure: getFullUrl(req) + "/failure",
        }
    }

    //Generate init_point to checkout
    try {
        const preference = await MercadoPago.preferences.create(purchaseOrder);
        return res.redirect(`${preference.body.init_point}`);
    } catch (err) {
        return res.send(err.message);
    }
})

router.get('/success', (req, res) => {
    return res.render('success_screen')
})

router.get('/pending', (req, res) => {
    return res.render('pending_screen')
})

router.get('/failure', (req, res) => {
    return res.render('failure_screen')
})

module.exports = app => app.use(router);
