const http = require('http');
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const express = require('express')
const app = express()
const port = 3000

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

app.get('/', (req, res)=> {
    res.send("Hello")
});

app.get('/send/:number/:msg', (req, res)=> {
    const numberget = req.params.number;
    const msg = req.params.msg;
    // Number where you want to send the message.
    const number = "+"+numberget;
    // Your message.
    const text = msg;
    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = number.substring(1) + "@c.us";
    // Sending message.
    client.sendMessage(chatId, text);
    res.json({"status" : "send"});
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
