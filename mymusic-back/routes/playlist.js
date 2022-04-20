const express = require('express');
const playlistController = require('../controllers/playlistController');
const { isAuth } = require('../middleware/auth');
const router = express.Router();


router.post('/', isAuth, playlistController.save);
router.get('/', isAuth ,playlistController.getSongByUserId);
router.put('/', isAuth ,playlistController.deleteFromList);


module.exports = router;