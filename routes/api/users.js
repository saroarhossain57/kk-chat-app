const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const avatarUpload = require('../../middlewares/user/avatarUpload');
const {
    userDataValidationChecks,
    userDataValidator
} = require('../../middlewares/user/userDataValidator');
const {
    updateUserValidationChecks,
    updateUserValidator
} = require('../../middlewares/user/updateUserValidator');
const authChecking = require('../../middlewares/auth');


// @route    POST api/users
// @desc     Register a user
// @access   Public
router.post('/',
    userDataValidationChecks,
    userDataValidator, 
    usersController.registerUser
);

router.put('/', authChecking, updateUserValidationChecks, updateUserValidator, avatarUpload, usersController.updateUser)

module.exports = router;