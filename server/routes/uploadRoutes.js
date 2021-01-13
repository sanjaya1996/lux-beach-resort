const express = require('express');
const multer = require('multer');
const path = require('path');

const { checkAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); //accept a file
  } else {
    cb(new Error('Images only!'), false); // reject a file
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

router.post('/roomimages', checkAdmin, (req, res, next) => {
  upload.array('roomImages', 5)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A multer error occurred when uploading like fileFilter thrown error
      next(err);
    } else if (err) {
      // An unknown error occured while uploading

      next(err);
    } else if (req.files.length === 0) {
      // when no file was choosen while uploading

      const error = new Error('please choose files');
      res.status(400);
      next(error);
    } else {
      //success upload
      const imagesPath = req.files.map((file) => '/' + file.path);
      res.send(imagesPath);
    }
  });
});

router.post('/meal', checkAdmin, (req, res, next) => {
  upload.single('mealImage')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A multer error occurred when uploading like fileFilter thrown error
      next(err);
    } else if (err) {
      // An unknown error occured while uploading

      next(err);
    } else if (!req.file) {
      // when no file was choosen while uploading

      const error = new Error('please choose file');
      res.status(400);
      next(error);
    } else {
      //success upload
      res.send(`/${req.file.path}`);
    }
  });
});

module.exports = router;
