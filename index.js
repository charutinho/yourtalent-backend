const express = require('express');
const bodyParser = require('body-parser');

// Criação do app
const app = express();

// Usando bodyparser pra requisições JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads'));


/*Rota simples pra testar
app.get('/', (req, res) => { 
    res.send('TA OK');
 });
*/

require('./src/controllers/authController')(app);
require('./src/controllers/projectController')(app);
require('./src/controllers/dataController')(app);
require('./src/controllers/imgController')(app);


//Porta do servidor
app.listen(3000);