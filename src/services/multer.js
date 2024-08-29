const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname);
    cb(null, `${req.user.id}-${Date.now()}${extName}`);
  },
});

const uploadDisk = multer({
  storage: diskStorage,
});

const uploadMemory = multer({
  storage: multer.memoryStorage(),
});

module.exports = { uploadDisk, uploadMemory };
