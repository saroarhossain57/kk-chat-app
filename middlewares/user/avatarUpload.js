const uploader = require('../../utilities/singleFileUploader');

const avatarUpload = (req, res, next) => {

    const upload = uploader(
        "avatars",
        ["image/jpeg", "image/jpg", "image/png"],
        1000000,
        "Only .jpg, jpeg or .png format allowed!"
    );

    
    // call the middleware function
    upload.any()(req, res, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                errors: err.message,
            });
        } else {
            next();
        }
    });
};


module.exports = avatarUpload;