const express =require('express')
const { addProduct, singleProduct, removeProduct, listProduct } = require('../Controller/productcontroller')
const { upload } = require('../middleware/multer')
const adminAuth = require('../middleware/adminAuth')
 
const ProductRoute=express.Router()

ProductRoute.post('/add', adminAuth,
     upload.fields([{name:'image1', maxCount:1},
        {name:'image2', maxCount:1},
        {name:'image3', maxCount:1},
        {name:'image4', maxCount:1}]),
      addProduct)
ProductRoute.get('/list',listProduct)
ProductRoute.delete('/remove', removeProduct)
ProductRoute.post('/single',singleProduct)

module.exports = ProductRoute