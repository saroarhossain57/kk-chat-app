const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

const userDataValidationChecks = [

    
    check('username').notEmpty().withMessage('Username is required').trim().escape(),
    check('email').isEmail().withMessage('Invalid email address').trim().custom( async (value) => {
        try {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error('User is already exists with this email!');
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }),
    check("mobile")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Mobile number must be a valid Bangladeshi mobile number")
        .custom(async (value) => {
            try {
                const user = await User.findOne({ mobile: value });
                if (user) {
                throw new Error("Mobile already is use!");
                }
            } catch (err) {
                throw new Error(err.message);
            }
        }),

    check("password")
        .isStrongPassword()
        .withMessage(
          "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
        )
];

const userDataValidator = (req, res, next) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    next();
}


module.exports = {
    userDataValidationChecks,
    userDataValidator
};