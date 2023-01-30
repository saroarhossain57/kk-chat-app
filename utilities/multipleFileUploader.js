const multer = require("multer");
const path = require("path");

const multipleUploader = (subfolder_path, allowed_file_types, max_file_size, max_number_of_files) => {
    // File upload folder
    const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

    // define the storage
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, UPLOADS_FOLDER);
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

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size,
        },
        fileFilter: (req, file, cb) => {
            if (req.files.length > max_number_of_files) {
                cb(`Maximum ${max_number_of_files} files are allowed to upload`);
            } else {
            if (allowed_file_types.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('This file type is not supported'));
            }
            }
        },
    });

    return upload;
};

module.exports = multipleUploader;