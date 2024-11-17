const multer  = require('multer')
const crypto = require("crypto");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (_, _, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (_, file, cb) {
        crypto.randomBytes(12, (_, bytes) => {
            const fn = bytes.toString("hex") + path.extname(file.originalname)
            cb(null, fn)
        })
    }
  })

const upload = multer({ storage: storage });
module.exports = upload;