import React, { useState } from 'react';

const CreatePlayerForm = ({ onPlayerCreated }) => {
    const [health, setHealth] = useState('');
    const [strength, setStrength] = useState('');
    const [attack, setAttack] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/players/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ health, strength, attack })
        });
        const player = await response.json();
        onPlayerCreated(player);
        setHealth('');
        setStrength('');
        setAttack('');
    };

    return (
        <form className="create-player-form" onSubmit={handleSubmit}>
            <h2>Create New Player</h2>
            <input type="number" placeholder="Health" value={health} onChange={e => setHealth(e.target.value)} required />
            <input type="number" placeholder="Strength" value={strength} onChange={e => setStrength(e.target.value)} required />
            <input type="number" placeholder="Attack" value={attack} onChange={e => setAttack(e.target.value)} required />
            <button type="submit">Create Player</button>
        </form>
    );
};

export default CreatePlayerForm;
