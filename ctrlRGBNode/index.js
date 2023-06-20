const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");
const { SerialPort, ReadlineParser } = require('serialport');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const volt = 5; // 5 -> Arduino UNO | 3.3 -> Raspberry Pi Pico
const baud = 9600; // 9600 -> Arduino UNO | 115200 -> Raspberry Pi Pico

const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: baud }, function (err) {
    if (err) {
        return console.log('Error: ', err.message)
    }
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


io.on('connection', (socket) => {
    let colorDato = {
        r: 0,
        g: 0,
        b: 0
    };
    console.log('a user connected');
    parser.on('data', (data) => {
        let rgb = JSON.parse(data);
        colorDato.r = Math.round(scale(rgb.r, 0, volt, 0, 255));
        colorDato.g = Math.round(scale(rgb.g, 0, volt, 0, 255));
        colorDato.b = Math.round(scale(rgb.b, 0, volt, 0, 255));
        console.log(colorDato);
        socket.emit('color', colorDato);
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
