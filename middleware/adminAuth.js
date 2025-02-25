const jwt = require('jsonwebtoken')
const { JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD } = require('../config')


const adminAuth = async (req, res, next)=>{
           try {
                    const {token} = req.headers
                    if(!token){
                        return res.json({success:false, message:"Not Authorized for login Retry"})
                    }
                    const decode_token = jwt.verify(token, JWT_SECRET)
                    if(decode_token !==ADMIN_EMAIL + ADMIN_PASSWORD){
                        return res.json({success:false, message:"Not Authorized for login Retry"})
                    }
                    next()
           } catch (error) {
            res.json({success:false, message:error.message})
           }
}
module.exports = adminAuth