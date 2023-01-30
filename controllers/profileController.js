const Profile = require("../models/Profile");


const createOrUpdateProfile = async (req, res) => {

    const {
        address,
        facebook,
        linkedin,
        instagram,
        github
    } = req.body;

    const ProfileData = {
        user: req.user.id,
        address,
        social_profiles: {facebook, linkedin, instagram, github}
    }
    
    try {
        const profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: ProfileData },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        res.json(profile);

    } catch (err) {
        res.status(500).json({
            errors: err.message,
        });
    }

};


const addEducation = async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });

        // If no profile found
        if(!profile){
            profile = new Profile({user: req.user.id})
            await profile.save();
        }

        profile.education.unshift(req.body);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const deleteEducation = async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id });
        foundProfile.education = foundProfile.education.filter(
          (edu) => edu.id !== req.params.edu_id
        );
        await foundProfile.save();
        return res.status(200).json(foundProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
}


module.exports = {
    createOrUpdateProfile,
    addEducation,
    deleteEducation
};