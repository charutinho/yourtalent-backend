const moongose = require('mongoose');

//Conexão com mongodb
mongoose.createConnection('mongodb://localhost/yourtalent', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;