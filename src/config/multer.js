const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'uploads' , 'posts'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'uploads' , 'posts'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, async(err, hash) => {
                if (err) cb(err);

                let extArray = await file.mimetype.split("/");
                let extension = await extArray[extArray.length - 1];
                const fileName = await `${hash.toString("hex")}.${extension}`;

                cb(null, fileName);
            });
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: async (req, file, cb) => {
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