require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('../db/mongoose');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: `http://localhost:5173`,
    credentials: true
}));
app.use(express.json());



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})