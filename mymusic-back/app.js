const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
app.use(cors());
app.use(express.json());
const userRouter = require('./routes/user');




app.use('/user', userRouter);

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