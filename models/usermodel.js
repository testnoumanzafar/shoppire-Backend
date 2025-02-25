const mongooes = require('mongoose')

const Userschema = new mongooes.Schema({
    name :{type:String , required: true},
    email :{type:String , required: true},
    password :{type:String , required: true},
    cartData :{type:Object , default:{}},
}, {minimize:false})

const Usermodel = mongooes.model('user',Userschema)
module.exports = Usermodel