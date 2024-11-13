const express = require('express');
const { createPlayer } = require('../controllers/playerController');
const router = express.Router();

router.post('/create', createPlayer);

module.exports = router;
