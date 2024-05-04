const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const User = require('./models/Users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const secret = 'somerandomjwttoken';
app.use(express.json());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
const path = require('path'); 
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 
mongoose.connect(process.env.DB_URI);
app.get('/',(req,res)=>{
    return res.json("Server is Up And Running");
})

app.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body;
        console.log(req.body);
        const userDoc = await User.findOne({username});
        if(!userDoc){
            return res.status(400).json({message:"User Not Registerd",data:[]})
        }
        const passOk=bcrypt.compareSync(password,userDoc.password);
        if(passOk){
            const token =  jwt.sign({username,id:userDoc._id},secret,{});
            res.cookie('token',token);

            return res.status(200).json({message:"Success",data:token});
        }
        return res.status(403).json({message:"Wrong Credentials",data:passOk});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something Went Wrong",data:[]});
        }
})
app.post('/register',async (req,res)=>{
    try{
        console.log("Registering the user");
        const {username,password}=req.body;
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password,salt);
        const user=await User.create({username,
            password:hashedPassword
        });
        return res.status(200).json({message:"Registered Successfully",data:user});
    }catch(error){
        console.log(error);
        if (error.name === 'MongoServerError' && error.code === 11000) {
            return res.status(400).json({message:"Username Already Exists.Try Different User Name",data:[]});
        }
        return res.status(500).json({message:"Something Went Wrong"});
    }
   
})

app.listen(4000);