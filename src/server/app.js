/*eslint no-console: 0*/

'use strict';

var express = require('express');
var path    = require('path');
var app     = express();
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '../../../dist/'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '../../../dist/index.html'));
});

app.listen(port, function () {
    console.log('App running on port ' + port + '...');
});
