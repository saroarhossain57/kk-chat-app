const { check, validationResult } = require('express-validator');

const loginUserValidationChecks = [
    check('username').notEmpty().withMessage('Username is required').trim().escape(),

    check("password")
        .notEmpty()
        .withMessage(
          "Password is required"
        )
];

const loginUserValidator = (req, res, next) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    next();
}


module.exports = {
    loginUserValidationChecks,
    loginUserValidator
};