const { Router } = require('express')
const router = Router();
const Pin = require('../models/Pin')

//create pin
router.post('/', async(req,res)=>{
  
    const newPin = await new Pin(req.body);
  try {
    const response =  await newPin.save();
    res.json({
        response
    })
  } catch (error) {
      console.log(error);
  }
})

//Get pin 
router.get('/',async(req,res)=>{
   const pins = await Pin.find();
   try {
       res.status(200).json(
           pins
       )
   } catch (error) {
       res.status(500).json({
           error
       })
   }
})


module.exports = router;