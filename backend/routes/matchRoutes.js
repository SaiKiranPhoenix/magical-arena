const express = require('express');
const { startMatch, attackTurn } = require('../controllers/matchController');
const router = express.Router();

router.post('/start', startMatch);
router.post('/attack', attackTurn);

module.exports = router;
