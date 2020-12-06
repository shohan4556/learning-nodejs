const express = require('express');
const http = require('http')
const socket = require('socket.io')

const port = process.env.PORT | 3030;
const host = '127.0.0.1'

const app = express();
const server = http.createServer(app);

// initializing a new instance of socket.io by http server 
const io = socket(server)

//listen connection event  
io.on('connection', (sokt)=>{
    console.log('a user connected :)');
    //send message to all client except  sender
    //neds to capture on client side 
    sokt.broadcast.emit('broadcast', 'a user connected!');
    
    sokt.on('disconnect', ()=>{
        //send message to all client except  sender
        //neds to capture on client side 
        sokt.broadcast.emit('broadcast', 'a user disconnected!');
        console.log('a user disconnected :(');
    });

    //get the message which sent from client
    sokt.on('chat message', (msg)=>{
        //send the message to everyone 
        // capture the chat message on client side 
        io.emit('chat message', msg);
        //console.log(`message : ${msg}`);
    });
});

app.get('/', (req, res)=>{
    res.statusCode = 200;
    res.sendFile(__dirname + '/index.html')
});

server.listen(port, host, ()=>{
    console.log(`server started at http://${host}:${port}`)
})

