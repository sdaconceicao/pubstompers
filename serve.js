var express = require('express');
var path = require('path');

var app = express();
var port = 4142;

app.use(express.static(path.join(__dirname, './dist')));

app.listen(port);

console.log('Server started on port: ', port);
