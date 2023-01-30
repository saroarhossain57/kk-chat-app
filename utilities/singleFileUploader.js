const multer = require("multer");
const path = require("path");

const singleUploader = (subfolder_path, allowed_file_types, max_file_size, error_msg) => {

    // Upload path
    const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

    // define the storage
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, UPLOAD_FOLDER);
        },
        filename: (req, file, cb) => {

            const fileExt = path.extname(file.originalname);
            const fileName =
                file.originalname
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") +
                "-" +
                Date.now();

            cb(null, fileName + fileExt);
        },
    });


    // preapre the final multer upload object
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size,
        },
        fileFilter: (req, file, cb) => {
            if (allowed_file_types.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('This file type is not supported'));
            }
        },
    });


    return upload;

};

module.exports = singleUploader;