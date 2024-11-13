const express = require('express');
const mongoose = require('mongoose');
const playerRoutes = require('./routes/playerRoutes');
const matchRoutes = require('./routes/matchRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/magicalArena')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Database connection error:", err));

app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
