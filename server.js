const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer= require("multer");
const jwt= require("jsonwebtoken");
const path=require("node:path");
const bcrypt= require("bcrypt");
const dotenv=require("dotenv");
dotenv.config();

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, "uploads");
    },
    filename: (req, file, cb)=>{
        console.log(file);
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage });

 let app=express();
 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded());
 app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(_dirname,"./client/build")));


 let authorize=(req,res,next)=>{
    console.log(req.headers.authorization);
    next();
 };
 app.use(authorize);
 

 let userSchema=new mongoose.Schema({
     firstName:String,
     lastName:String,
     age:Number,
     email:String,
     password:String,
     mobileNo:String,
     profilePic:String,
 });
 
 
 let User = new mongoose.model("user",userSchema,"user");
 
 
 app.post("/signUp",upload.single("profilePic"),async(req,res)=>{
 
     console.log(req.body);
     
     console.log(req.file);
       
 
     try { 
        let hashedPassword=await bcrypt.hash(req.body.password,10);
     let newUser = new User({
  
      firstName:req.body.firstName,
     lastName:req.body.lastName,
     age:req.body.age,
     email:req.body.email,
     password:hashedPassword,
     mobileNo:req.body.mobileNo,
     profilePic:req.file.path,
 
 });

 let userList= await User.find().and({email:req.body.email});

 if(userList.length>0){

    res.json({status:"Failure", msg:"User already exists"});

 }else{
    await User.insertMany([newUser]);
    res.json({status:"Success", msg:"User Created Successfully"});
 }
 }
 catch(err){
     res.json({status:"error", msg:"Unable To Create Account",err:err});
 }
 });

 app.post("/validateLogin",upload.none(),async(req,res)=>{
    console.log("body",req.body);

    let userDetails=await User.find().and({email:req.body.email});
//console.log("iss",userDetails)
    if(userDetails.length>0){
   
      let isPasswordCorrect=await bcrypt.compare(req.body.password,userDetails[0].password)

        if(isPasswordCorrect===true){

            let token=jwt.sign({
                emial:req.body.emial,
                password:req.body.password,
            },
            "MANU111"
        );

            let details={
                firstName:userDetails[0].firstName,
                lastName:userDetails[0].lastName,
                age:userDetails[0].age,
                email:userDetails[0].email,
                password:userDetails[0].password,
                mobileNo:userDetails[0].mobileNo,
                profilePic:userDetails[0].profilePic,
                token:token,

            }
            res.json({status:"Success",data:details});  

        }else{
            res.json({status:"failure",msg:"Invalid Password"});  
        }

    }else{

        res.json({status:"failure",msg:"User Doesnot Exist"});
        
    }

    console.log(userDetails);
   
 });

 app.post("/validateToken",upload.none(),async(req,res)=>{

    console.log(req.body);

    let decryptedToken=jwt.verify(req.body.token,"MANU111");
    console.log(decryptedToken);

    

    let userDetails=await User.find().and({emial:decryptedToken.email});
debugger
    if(userDetails.length>0){

        if(userDetails[0].password==decryptedToken.password){

           

            let details={
                firstName:userDetails[0].firstName,
                lastName:userDetails[0].lastName,
                age:userDetails[0].age,
                email:userDetails[0].email,
                password:userDetails[0].password,
                mobileNo:userDetails[0].mobileNo,
                profilePic:userDetails[0].profilePic,
                

            }
            res.json({status:"Success",data:details});  

        }else{
            res.json({status:"failure",msg:"Invalid Password"});  
        }

    }else{

        res.json({status:"failure",msg:"User Doesnot Exist"});
        
    }

    console.log(userDetails);

 });

app.patch("/editProfile",upload.single("profilePic"),async(req,res)=>{

    console.log(req.body);
    if(req.body.firstName.trim().length>0){
    
      let result= await User.updateMany({email:req.body.email},{firstName:req.body.firstName});
      console.log(result);
    }

    if(req.body.lastName.trim().length>0){
    
        let result= await User.updateMany({email:req.body.email},{lastName:req.body.lastName});
        console.log(result);
      }

      if(req.body.age.trim().length>0){
    
        let result= await User.updateMany({email:req.body.email},{age:req.body.age});
        console.log(result);
      }

      if(req.body.email.trim().length>0){
    
        let result= await User.updateMany({email:req.body.email},{email:req.body.email});
        console.log(result);
      }
      
      if(req.body.mobileNo.trim().length>0){
    
        let result= await User.updateMany({email:req.body.email},{mobileNo:req.body.mobileNo});
        console.log(result);
      }
      
      if(req.file.path){
        let result= await User.updateMany({email:req.body.email},{profilePic:req.file.path});
        console.log(result);

      }
      
    
    res.json({status:"success",msg:"Profile Details updated successfully",});
   
}

);
app.delete("/deleteProfile",upload.none(),async(req,res)=>{
    try{
        let result= await User.deleteMany({email:req.body.email});
        res.json({status:"success",msg:"user deleted successfully"});
    }catch(err){
        res.json({status:"failed",msg:"unable to  delete user"});
    }
  console.log(result);
   
});

 app.listen(process.env.port,()=>{
     console.log("Listening To Port 4545");
 });
 

let connectToMDB=async()=>{
try{

    // await mongoose.connect("mongodb+srv://lakshmi:lakshmi@cluster0.mrs8yyp.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0");

    await mongoose.connect(process.env.mdburl);

    console.log("Successfully connected To MDB");
}catch(err){
    console.log("Unable To connect To MDB");
}
   
}
connectToMDB();