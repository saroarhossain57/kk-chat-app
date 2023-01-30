const { check, validationResult } = require('express-validator');

const addEducationValidationChecks = [
    check('institute').notEmpty().withMessage('Institute is required').trim().escape(),
    check('degree').notEmpty().withMessage('degree is required').trim().escape(),
    check('subject').notEmpty().withMessage('Subject is required').trim().escape(),
    check('passing_year').notEmpty().withMessage('Passing year is required').trim().escape()
];

const addEducationValidator = (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    next();
}


module.exports = {
    addEducationValidationChecks,
    addEducationValidator
};