const express = require('express');
const router = express.Router();

const profileController = require('../../controllers/profileController');
const authChecking = require('../../middlewares/auth');
const {addEducationValidationChecks, addEducationValidator} = require('../../middlewares/profile/addEducationValidator');


// @route    POST api/profile
// @desc     Create a profile or update profile
// @access   Private
router.post('/', authChecking, profileController.createOrUpdateProfile);


// @route    PUT api/profile/education
// @desc     Add education to profile
// @access   Private
router.put('/education', authChecking, addEducationValidationChecks, addEducationValidator, profileController.addEducation);

// @route    DELETE api/profile/education
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:edu_id', authChecking, profileController.deleteEducation);

module.exports = router;