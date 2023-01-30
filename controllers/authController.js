const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');



const loginUser = async (req, res, next) => {
    
    const {username, password } = req.body;

    try {

        const user = await User.findOne({
           $or: [{email: username}, {mobile: username}] 
        });

        if(user && user._id){
            const isMatch = await bcrypt.compare(password, user.password);

            if(isMatch){

                // create jwt token
                const payload = {
                    user: {
                        id: user.id
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


            } else {
                res.status(300).json({msg: 'Password didn\'t match!'});
            }

        } else {
            res.status(300).json({msg: 'No user found!'});
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: err.message});
    }

}



const getUserByToken = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: err.message});
    }
}


module.exports = {
    loginUser,
    getUserByToken
};