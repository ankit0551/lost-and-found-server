const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const verifytoken = require("../middlewares/verifyTokens");



router.get('/',verifytoken,(req, res)=>{
    res.render('index');
})



router.get('/signup', async (req, res)=>{
    const token = req.cookies.token
    if(!token){
        return res.render('signup');
    }
    res.redirect("/");
})


router.post('/signup', async (req, res)=>{
    const {name , email, password} = req.body;
    const salt = await bcrypt.genSalt(5)
    const hashedPassword = await bcrypt.hashSync(password,salt)
    const newUser = await User.create({name,email,password:hashedPassword});
    res.redirect('/login')
})



router.get('/login', async (req, res)=>{
    const token = req.cookies.token

    if(!token){
        return res.render('login');
    }

    res.redirect("/");
    
})


router.post('/login', async (req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json("User not found!")
        }
        const match = await bcrypt.compare(req.body.password,user.password)
        if(!match){
            return res.status(401).json("Wrong credentails!")
        }
        const token = jwt.sign({_id:user._id,name:user.name,email:user.email},process.env.SECRETKEY,{expiresIn:"3d"})
        res.cookie("token",token);
        res.redirect("/")

    }
    catch(err){
        res.status(500).json(err);
    }
})

// logout route

router.get('/logout',verifytoken,(req,res)=>{
    res.clearCookie("token")
    res.redirect('/login')
    res.end()
})


module.exports = router;