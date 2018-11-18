const express = require('express');
const mongoose = require('mongoose');
const config = require('./config')
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)
})

server.listen(config.PORT, () => {
    console.log(":) Server executando na porta 3000");
});