const Player = require('../models/Player');

exports.createPlayer = async (req, res) => {
    const { health, strength, attack } = req.body;
    try {
        const player = new Player({ health, strength, attack });
        await player.save();
        res.status(201).json(player);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
