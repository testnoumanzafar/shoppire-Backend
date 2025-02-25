const Usermodel = require("../models/usermodel")

// add to cart
const addTocart = async (req,res)=>{
         
    console.log(req.body);
    try {
        const {userId, itemId, size}=req.body
        const userData= await Usermodel.findById(userId)
        const cartData= await userData.cartData;
 
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] +=1
            }else{
                cartData[itemId][size] =1
            }

        }else{
               cartData[itemId] = {}
               cartData[itemId][size]=1 
        }
        await Usermodel.findByIdAndUpdate(userId, cartData)
        res.json({success:true, message:"Add to Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

const updatecart = async (req,res)=>{
try {

    const {userId, itemId, size,quantity}=req.body
    const userData= await Usermodel.findById(userId)
    const cartData= await userData.cartData;

  cartData[itemId][size]= quantity

  await Usermodel.findByIdAndUpdate(userId, {cartData})
  res.json({success:true, message:"Cart Update"})
} catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
}

}

const getUserCart = async (req,res)=>{

    try {
             const {userId}= req.body
             const userData= await Usermodel.findById(userId)
             const cartData = userData.cartData
             res.json({success:true, cartData})
    } catch (error) {
       
        console.log(error);

        res.json({success:false, message:error.message})
    }

     
}

module.exports = {addTocart, updatecart, getUserCart}