const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'uploads' , 'profile'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'uploads' , 'profile'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                let extArray = file.mimetype.split("/");
                let extension = extArray[extArray.length - 1];
                const fileName = `${hash.toString("hex")}.${extension}`;

                cb(null, fileName);
            });
        }
    }),
    limits: {
        fileSize: 50 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
            'video/mp4',
            'video/x-msvideo',
            'video/mpeg',
            'video/ogg',
            'video/webm'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Isto não é uma foto."));
        }

    }
}