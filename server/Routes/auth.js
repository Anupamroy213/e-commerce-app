const express = require('express');
const router = express.Router();
const User = require("../models/UserSchema");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = 'habahbahahahuaimkmekmenejne';
router.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            work: req.body.work,
            password: req.body.password, // You should hash this password before saving
            cpassword: req.body.cpassword
        });
        await newUser.save();
        res.json({ success: true, message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, error: 'An error occurred while registering user.' });
    }
});

router.post("/loginuser",
[ body('email').isEmail(),
body('password', 'incorrect password').isLength({ min: 5 })
],async (req,res)=> {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email= req.body.email;
    try {
  let userData= await User.findOne({email});
         if(!userData){
            return res.status(400).json({ errors: "try logging with correct credentials" });
        }
        const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
        if(!pwdCompare){
             return res.status(400).json({ errors: "try logging with correct credentials" });
             
            }

                  const data = {
                    user:{
                        id:userData.id
                    }
                  }
                  const authToken =jwt.sign(data,jwtSecret)
            return res.json({success:true, authToken:authToken})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Error creating user' });
    }
})



module.exports = router;




