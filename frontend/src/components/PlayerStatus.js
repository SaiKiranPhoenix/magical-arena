import React from 'react';

const PlayerStatus = ({ player }) => (
    <div className="player-status">
        <h3>Player {player._id}</h3>
        <p>Health: {player.health}</p>
        <p>Strength: {player.strength}</p>
        <p>Attack: {player.attack}</p>
    </div>
);

export default PlayerStatus;
