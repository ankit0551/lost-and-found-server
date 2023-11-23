const {Router} = require("express");
const router = Router();
const verifyTokens = require('../middlewares/verifyTokens');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/User');

router.post('/change',verifyTokens,async (req,res)=>{
    const {password} = req.body;
    const salt = await bcrypt.genSalt(5)
    const hashedPassword = await bcrypt.hashSync(password,salt)
    await User.findOneAndUpdate({_Id:req.userId},{password:hashedPassword});
    const user = await User.findOne({_id:req.userId});
    res.clearCookie("token");
    const token = jwt.sign({_id:user._id,name:user.name,email:user.email},process.env.SECRETKEY,{expiresIn:"3d"})
    res.cookie("token",token);
    res.redirect('/user/profile');
})


module.exports = router;