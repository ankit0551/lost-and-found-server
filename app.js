const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/Users');
const connectDB = require('./connectDB');
const cookieParser = require("cookie-parser")
require('dotenv').config();
const itemRouter = require('./routes/Items');

// DataBase Connection
connectDB();


// middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());




app.use(userRoutes);
app.use(itemRouter);



const PORT = 8001;

app.listen(PORT,()=>{
    console.log(`Server started at port:${PORT}`);
    
})