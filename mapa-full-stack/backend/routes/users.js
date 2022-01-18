const { Router } = require('express')
const router = Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')

//TODO: Create users
router.post('/register', async (req, res) => {

    try {

        /* generate new password  */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        /* create new user */
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        /* save user and send response */
        const user = await newUser.save();
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error)
    }

})

//login
router.post('/login', async (req, res) => {
    try {
        /* find user */
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("no se encuentra el usuario!");
        /* validate password */
         const validatePassword = await bcrypt.compare(req.body.password, user.password);
        !validatePassword && res.status(400).json("contraseña incorrecta")
        /* send res */
        res.status(200).json({_id:user._id,username:username})
    } catch (error) {
        res.status(500).json(error)
    }

})


module.exports = router;