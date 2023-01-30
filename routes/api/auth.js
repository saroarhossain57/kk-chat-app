const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const auth = require('../../middlewares/auth');
const {
    loginUserValidationChecks,
    loginUserValidator
} = require('../../middlewares/user/loginUserValidator');


// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/', loginUserValidationChecks, loginUserValidator, authController.loginUser);


// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, authController.getUserByToken);



module.exports = router;