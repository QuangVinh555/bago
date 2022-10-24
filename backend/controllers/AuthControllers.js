const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthControllers = {
    register: async(req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })

            const user = await newUser.save();

            const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET);
            return res.status(200).json({user, accessToken});
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    login: async(req, res) => {
        try {
            const user = await User.findOne({email: req.body.email});
            if(!user)
                return res.status(404).json("User not found");

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            
            if(!validPassword)
                return res.status(400).json("Wrong password");

            const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET);           
            return res.status(200).json({user, accessToken});

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //[GET] /api/auth
    get: async function(req, res) {
        try {
            const user = await User.findById(req.userId).select('-password');
            if(!user){
                return res.status(404).json("Khong co user")
            }

            return res.json({user});
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = AuthControllers;