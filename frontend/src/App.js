import React, { useState } from 'react';
import CreatePlayerForm from './components/CreatePlayerForm';
import MatchDisplay from './components/MatchDisplay';
import './index.css';

function App() {
    const [playerA, setPlayerA] = useState(null);
    const [playerB, setPlayerB] = useState(null);

    return (
        <div className="App">
            <h1>Magical Arena</h1>
            <CreatePlayerForm onPlayerCreated={(player) => !playerA ? setPlayerA(player) : setPlayerB(player)} />
            {playerA && playerB && <MatchDisplay playerA={playerA} playerB={playerB} />}
        </div>
    );
}

export default App;
