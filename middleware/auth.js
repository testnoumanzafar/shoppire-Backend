const { JWT_SECRET } = require("../config")

const AuthUser = async(req, res, next)=>{
      const {token} = req.headers
      if(!token){
        return res.json({success:false  , message: "Not Authorized PLz login"})
      }
      try {
        const token_decode = jwt.verfiy(token, JWT_SECRET)
        req.body.userId= token_decode.id
        next()
      } catch (error) {
        res.json({success:false, message:error.message})
      }
}
module.exports= AuthUser