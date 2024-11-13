const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    health: { type: Number, required: true },
    strength: { type: Number, required: true },
    attack: { type: Number, required: true }
});

module.exports = mongoose.model('Player', playerSchema);
