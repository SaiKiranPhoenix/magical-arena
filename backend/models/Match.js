const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    playerA: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    playerB: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    isActive: { type: Boolean, default: true },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
});

module.exports = mongoose.model('Match', matchSchema);
