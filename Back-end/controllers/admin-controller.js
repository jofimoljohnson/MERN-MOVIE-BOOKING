const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')

// add admin(admin signup )
const addAdminSignUp = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already Exist" });
    }
    let admin;
    const hashedPassword = bcrypt.hashSync(password);
    try {
        admin = new Admin({ email, password:hashedPassword });
        admin = await admin.save();
    } catch (error) {
        return console.log(error);
    }
    if(!admin){
        return res.status(500).json({message:"Unable to store admin"})
    }
    return res.status(201).json({admin})
};

// admin login

const adminLogin=async(req,res,next)=>{
     const { email, password } = req.body;
    if (!email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    let existingAdmin;
    try {
        existingAdmin=await Admin.findOne({email})
        
    } catch (error) {
        return console.log(error)
        
    }
   if(!existingAdmin){
    return res.status(400).json({message:"Admin not found"})
   }
   const isPasswordCorrect = bcrypt.compareSync(password,existingAdmin.password)

   if(!isPasswordCorrect){
   return res.status(400).json({message:"Incorrect Password"})
   }

   const token = jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{
    expiresIn:"7d"
   })



   return res.status(200).json({message:"Authentication Completed",token,id:existingAdmin._id})
    }

const getAdmin=async(req,res,next)=>{
        let admins;
        try {
            admins=await Admin.find()
        } catch (error) {
            return console.log(error)
            
        }
        if(!admins){
            return res.status(500).json({message:"Internal Server Error"})
        }
return res.status(200).json({admins})
    }

    const getAdminById=async(req,res,next)=>{
        const id=req.params.id 
        let admin;
try {
    admin=await Admin.findById(id).populate("addedMovies")
    
} catch (error) {
    return console.log(error)
    
}
if(!admin){
    return console.log("Cannot find Admin")
}
return res.status(200).json({admin})

    }


exports.addAdminSignUp = addAdminSignUp;
exports.adminLogin=adminLogin
exports.getAdmin=getAdmin
exports.getAdminById=getAdminById