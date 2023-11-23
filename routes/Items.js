const {Router} = require('express');
const router = Router();
const Item = require('../models/Item');
const verifytoken = require('../middlewares/verifyTokens');


router.get('/item/lostitem/new',verifytoken,(req,res)=>{
    res.render('newLostItem',{req});
})

router.get('/item/founditem/new',verifytoken,(req,res)=>{
    res.render('newFoundItem',{req});
})

// create new lost item

router.post('/item/lostitem/new',verifytoken,async (req,res)=>{
    const {name,desc,loc,date} = req.body;
    let ty = false;
    let user = req.userId;
    await  Item.create({name,desc,loc,date,user,ty});
    res.status(200).redirect('/item/allitems');
})

// create new found item

router.post('/item/founditem/new',verifytoken,async (req,res)=>{
    const {name,desc,loc,date} = req.body;
    let ty = true;
    let user = req.userId;
    await  Item.create({name,desc,loc,date,user,ty});
    res.status(200).redirect('/item/allitems');
})

// fetch items

router.get('/item/allitems',async (req,res)=>{
    const items = await Item.find();
    res.render('item',{items,req});
})



// single item page
router.get('/item/:id',verifytoken,async (req, res)=>{
    const item = await Item.findById(req.params.id);
    res.json(item);
})

module.exports = router;