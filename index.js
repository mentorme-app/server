require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const app = express();

app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json('Hello from server!');
});

const PORT = process.env.PORT || '9000';

app.listen(PORT, () => {
    console.log(`*** Server listening on port: ${PORT}***`);
});
