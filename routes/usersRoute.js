  const express =require('express')
const { loginuser, registeruser, adminuser, logout } = require('../Controller/userController')


    const userRouter = express.Router()

    userRouter.post('/register', registeruser) 
    userRouter.post('/login', loginuser)
    userRouter.post('/admin', adminuser)
    userRouter.delete('/logout', logout)

    module.exports = userRouter