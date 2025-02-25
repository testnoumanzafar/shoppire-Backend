const express = require('express')
const { addTocart, getUserCart, updatecart } = require("../Controller/cartController")

const AuthUser = require("../middleware/auth")

const cartRouter= express.Router()

cartRouter.post('/add',   addTocart)
cartRouter.post('/add', AuthUser, updatecart)
cartRouter.post('/add', AuthUser, getUserCart)

module.exports =cartRouter