var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/app', express.static(__dirname + '/app'));

app.get('/app', function (req, res) {
    res.redirect('/app/index.html');
});

https.createServer({
    key: fs.readFileSync('./certificates/localhost-key.pem'),
    cert: fs.readFileSync('./certificates/localhost-cert.pem')
}, app).listen(4040);

console.log("Simple static server showing /app listening at https://localhost:%s", '4040');