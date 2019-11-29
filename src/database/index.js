const mongoose = require('mongoose');

//Conexão com mongodb
const uri = process.env.MONGO_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 }) 
mongoose.Promise = global.Promise;

module.exports = mongoose;