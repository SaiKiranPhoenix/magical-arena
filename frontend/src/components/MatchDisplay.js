import React, { useState } from 'react';
import PlayerStatus from './PlayerStatus';

const MatchDisplay = ({ playerA, playerB }) => {
    const [matchId, setMatchId] = useState(null);
    const [turnMessage, setTurnMessage] = useState('');

    const startMatch = async () => {
        const response = await fetch('http://localhost:5000/api/matches/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerAId: playerA._id, playerBId: playerB._id })
        });
        const data = await response.json();
        setMatchId(data.matchId);
        setTurnMessage(data.message);
    };

    const attackTurn = async (attackerId) => {
        const response = await fetch('http://localhost:5000/api/matches/attack', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matchId, attackerId })
        });
        const data = await response.json();
        setTurnMessage(data.message);
    };

    return (
        <div className="match-display">
            <h2>Match</h2>
            <button onClick={startMatch}>Start Match</button>
            {matchId && (
                <>
                    <div className="players">
                        <PlayerStatus player={playerA} />
                        <PlayerStatus player={playerB} />
                    </div>
                    <button onClick={() => attackTurn(playerA._id)}>Player A Attacks</button>
                    <button onClick={() => attackTurn(playerB._id)}>Player B Attacks</button>
                    <p>{turnMessage}</p>
                </>
            )}
        </div>
    );
};

export default MatchDisplay;
