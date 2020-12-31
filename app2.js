const { static } = require('express');
const express = require('express'); // Importing Express Modules
const { request } = require('http');
const app = express(); // Assigning Module to App
const path = require('path'); // Importing Path Module
const port = 80; // Assigning Port Value to Variable
const fs = require('fs');

// Importing Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Dance', {useNewUrlParser: true, useUnifiedTopology: true});

// Creating Connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// Creating Schema
const contactSchema = new mongoose.Schema({
    name: String,
    gender: String,
    // address: String, - If You dont give this field, It wont take it & No error displayed (No Catch Promise)
    about: String
});

// Compiling Schema & Finalizing Collection "contact"
const contact = mongoose.model('contact', contactSchema);

app.use(express.urlencoded()); //IMP - While using Post method in forms & in app.post

app.set('view engine', 'pug'); //Importing PUB Engine
app.set('views', path.join(__dirname, 'views')); //Setting Template or View Location (We are using this folder to store pug files)

app.use('/static', express.static('static')); // Setting Static or Public Directory (We are usign this folder to store css & js files)

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/contact', (req, res)=>{
    res.render('contact');
});

app.post('/contact', (req, res)=>{
    let success = {'status':"Information Submited Successfully"};
    let failed = {'status':"Error While Saving Data"};
    var data = new contact(req.body);
    data.save().then(function(){
        res.render('contact', success);
    }).catch(function(){
        res.render('contact', failed);
    });
});

app.listen(port, () => {
    console.log("Express App has been started at localhost:80");
}); // Starting the server