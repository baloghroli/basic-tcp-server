const net = require('net');
const mongoose = require('mongoose');
let ClientReq = require('./models/ClientReq');
const result = {
    status: 'ok',
    error: null
}

//Database setup
const db  = 'mongodb://localhost:27017/tcp-db';
mongoose.connect(db, {useMongoClient: true});

//Server setup
const server = net.createServer((socket) => {
    socket.write('Connection established');
  	socket.pipe(socket);

//Saving incoming data to DB and send a response to the client
    socket.on('data', (data) => {
        let JSONdata = JSON.parse(data);

        let newClientReq = new ClientReq({
            guid: JSONdata.guid,
            datetime: JSONdata.datetime,
        })

        newClientReq.save().then((clientReq) => {
            console.log('Data saved to DB.');
        }).catch((err) => {
            result.error = err;
            console.log(err);
        })
        socket.write(JSON.stringify(result))
    })

    socket.on('error', (error) => {
        console.log(error);
        socket.destroy();
    })

    socket.on('close', (exception) => {
        console.log('Socket closed');
    })
})

server.listen(1337, '127.0.0.1');
console.log('TCP Server is listening');
