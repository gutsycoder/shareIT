const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const User = require('./models/Users');
app.use(express.json());
app.use(cors());
const path = require('path'); 
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 
mongoose.connect(process.env.DB_URI);
app.get('/',(req,res)=>{
    return res.json("Server is Up And Running");
})
app.post('/register',async (req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await User.create({username,password});
        return res.status(200).json({message:"Success",data:user});
    }catch(error){
        console.log(error.name);
        if (error.name === 'MongoServerError' && error.code === 11000) {
            return res.status(400).json({message:"Username Already Exists",data:[]});
        }
        return res.status(500).json({message:"Something Went Wrong"});
    }
   
})

app.listen(4000);