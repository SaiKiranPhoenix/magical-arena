const Player = require('../models/Player');
const Match = require('../models/Match');
const { rollDice } = require('../utils/dice');

exports.startMatch = async (req, res) => {
    const { playerAId, playerBId } = req.body;
    try {
        const playerA = await Player.findById(playerAId);
        const playerB = await Player.findById(playerBId);

        const match = new Match({ playerA: playerA._id, playerB: playerB._id });
        await match.save();

        res.status(201).json({ matchId: match._id, message: "Match started" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.attackTurn = async (req, res) => {
    const { matchId, attackerId } = req.body;
    try {
        const match = await Match.findById(matchId);
        if (!match || !match.isActive) return res.status(400).json({ message: 'Match not found or ended' });

        const [attacker, defender] = match.playerA.equals(attackerId) 
            ? [await Player.findById(match.playerA), await Player.findById(match.playerB)]
            : [await Player.findById(match.playerB), await Player.findById(match.playerA)];

        const attackRoll = rollDice();
        const defenseRoll = rollDice();

        const attackDamage = attacker.attack * attackRoll;
        const defensePower = defender.strength * defenseRoll;
        const netDamage = Math.max(0, attackDamage - defensePower);

        defender.health -= netDamage;
        await defender.save();

        if (defender.health <= 0) {
            match.isActive = false;
            match.winner = attacker._id;
            await match.save();
            return res.json({ message: `Game over. Winner is player ${attackerId}` });
        }

        res.json({ message: `Turn completed`, defenderHealth: defender.health });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
