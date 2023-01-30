const { unlink } = require("fs");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const path = require("path");

const registerUser = async (req, res) => {
    
    const {username, email, mobile, password } = req.body;

    try {

        const newUser = new User({
            username,
            email,
            mobile,
            password
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        // create jwt token
        const payload = {
            user: {
                id: newUser.id
            }
        };

        // Create token
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
                expiresIn: '5 days'
            },
            (err, token) => {
                if(err){
                    throw err;
                } else {
                    res.json({ token });
                }
            }
        )

    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: err.message});
    }

}

const updateUser = async (req, res) => {
    const {username, email, mobile, password } = req.body;

    const userData = {};

    if(username){
        userData.username = username;
    }
    if(email){
        userData.email = email;
    }
    if(mobile){
        userData.mobile = mobile;
    }
    if(password){
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(password, salt);
    }
    if (req.files && req.files.length > 0) {
        userData.avatar = req.files[0].filename;

        const user = await User.findById(req.user.id).exec();
        if(user.avatar){
            unlink(
                path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
                (err) => {
                  if (err) console.log(err);
                }
            );
        }
        // Remove the old photo is exists in uploads folder

    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: userData },
            { new: true }
        )
        
        res.json(updatedUser);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            errors: err.message,
        });
    }

}

module.exports = {
    registerUser,
    updateUser
};