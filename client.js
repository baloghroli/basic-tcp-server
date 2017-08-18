const net = require('net');
const guid = require('guid');
const client = new net.Socket();

function clientWrite () {
    let message = {
        guid: guid.create(),
        datetime: new Date()
    }
    client.write(JSON.stringify(message));
}

client.connect(1337, '127.0.0.1', () => {
  	console.log('Connected');
    setInterval(clientWrite, 5000);
});


client.on('data', (data) => {
	 console.log('Received: ' + data);
});

client.on('error', (error) => {
  console.log(error);
  client.destroy();
})

client.on('close', () => {
	 console.log('Connection closed');
});
