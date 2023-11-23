const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./connectDB');
const cookieParser = require("cookie-parser")
require('dotenv').config();
// const multer = require('multer');

// routers
const userRoutes = require('./routes/Users');
const itemRouter = require('./routes/Items');
const passwordRoutes = require('./routes/Password');


// DataBase Connection
connectDB();


// middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());



// routes
app.use(userRoutes);
app.use(itemRouter);
app.use("/password",passwordRoutes);



const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server started at port:${PORT}`);
    
})