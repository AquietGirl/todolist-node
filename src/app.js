const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router/index.js');

mongoose.connect("mongodb://localhost:27017/todolist").then(() =>
    console.log("db connect success!")
).catch(e => console.log(e.message));

//CORS
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/todolist', router);

app.listen(5000, () => {
    console.log("connect success!")
});
