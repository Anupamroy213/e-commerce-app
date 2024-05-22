const express = require('express')
const router = express.Router()

router.post('/productData',(req,res)=>{
    try{
        // console.log(global.food_items);
      res.send([global.products,global.products_category])
    } catch(error){

        console.log(error.message);
        res.send("server error");
    }
})

module.exports = router;
