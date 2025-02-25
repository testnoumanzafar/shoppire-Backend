const mongooes = require('mongoose')


const Productschema = new mongooes.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: Array, required: true},
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    sizes: {type: Array, required: true},
    popular:{ type: Boolean},
    date:{type:Number, required:true}
})

 const productModel= mongooes.model.product || mongooes.model('product', Productschema)
//  module.exports=   mongooes.model('product', CreateProduct, Products)
module.exports = productModel;