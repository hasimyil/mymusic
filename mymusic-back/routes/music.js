const express = require('express');
const multer = require('multer');
const musicController = require('../controllers/musicController');
const router = express.Router();

const { isAuth } = require("../middleware/auth");
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      console.log(file.originalname)
      cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
      console.log('storage')
      cb(null, './uploads')
    },
  })
const upload = multer({ storage })
router.post('/', isAuth,upload.single('file'), musicController.save);
router.get('/', isAuth ,musicController.getSongs);


module.exports = router;