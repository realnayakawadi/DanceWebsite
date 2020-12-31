const { static } = require('express');
const express = require('express'); // Importing Express Modules
const { request } = require('http');
const app = express(); // Assigning Module to App
const path = require('path'); // Importing Path Module
const port = 80; // Assigning Port Value to Variable
const fs = require('fs');

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
    let success = {'success':"Information Submited Successfully"};
    res.render('contact', success);
    let name = req.body.name;
    let gender = req.body.gender;
    let address = req.body.address;
    let about = req.body.about;
    let info = `Customer Details Name : ${name}, Gender : ${gender}, Address : ${address}, About : ${about}`; 
    console.log(info);
    fs.writeFileSync('Details.txt',info);
});

app.listen(port, () => {
    console.log("Express App has been started at localhost:80");
}); // Starting the server