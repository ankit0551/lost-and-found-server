const {Router} = require('express');
const router = Router();
const Item = require('../models/Item');
const verifytoken = require('../middlewares/verifyTokens');


// create new lost item

router.post('/item/lostitem/new',verifytoken,async (req,res)=>{
    const {name,desc,loc,date} = req.body;
    let type = false
    await  Item.create(name,desc,loc,date,req._id,type);
    res.status(200).json("item created successfully");
})

// create new found item

router.post('/item/founditem/new',verifytoken,async (req,res)=>{
    const {name,desc,loc,date} = req.body;
    let type = true
    await  Item.create(name,desc,loc,date,req._id,type);
    res.status(200).json("item created successfully");
})

// fetch items

router.get('/item/items',verifytoken,async (req,res)=>{
    const items = await Item.find();
    res.json(items);
})



// single item page
router.get('/item/:id',verifytoken,async (req, res)=>{
    const item = await Item.findById(req.params.id);
    res.json(item);
})

module.exports = router;