 
const Usermodel = require("../models/usermodel")
 const jwt = require('jsonwebtoken')
const bycrypt =require('bcrypt')
const { JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD } = require("../config")

const createToken= (id)=>{
    return    jwt.sign({id}, JWT_SECRET)
}

const loginuser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await Usermodel.findOne({ email });
console.log(user ,"User milgaya");

        if (!user) {
         return   res.status(404).json({ success: false, message: "User doesn't exist" })
        }
        const ismatch = await bycrypt.compare(password, user.password);
        if (ismatch) {
            const token = createToken(user._id);
            return res.status(200).json({ success: true, token, message: "User login Successfully", userId:user._id }); // ✅ Use 'return'
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });  
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });  
    }
};

const registeruser = async (req, res)=>{

    try {
        const {name, email, password} = req.body
        console.log(req.body);
        
           const exist = await Usermodel.findOne({email})
           if(exist){
               return res.status(409).json({success: false, message: 'Email already exist'})
           }
           if(password.length < 6){
            return res.status(400).json({success:false, message:'Enter Strong password'})
           }
       
           const Hashpassword = await bycrypt.hash(password, 10)  
           const newUser= new Usermodel({
            name,
            email,
            password:Hashpassword
           })
          const User = await newUser.save()
          const token = createToken(User._id)
          res.status(201).json({success:true, token ,message:"User Register Successfully"})

    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

 

const logout = async (req, res) => {
    try {
        const userId = req.headers.userid;  

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }
        const deletedUser = await Usermodel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const adminuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "5m" }); // Token expires in 10 minutes
            res.status(200).json({ success: true, token, message: "Admin login successfully" });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {loginuser, registeruser, adminuser ,logout}