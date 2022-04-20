const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
app.use(cors());
require("dotenv").config();
app.use(express.json());

const userRouter = require('./routes/user');
const musicRouter = require('./routes/music');
const playlistRouter = require('./routes/playlist');




app.use('/user', userRouter);
app.use('/music', musicRouter);
app.use('/playlist', playlistRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported!' });
});

app.use((err, req, res, next) => {
    console.log("url",req.url)
    if (err.message === 'NOT Found') {
        res.status(404).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Something is wrong! Try later' });
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))