/**
 * Created by PederGB on 30.03.2017.
 */

var express = require('express');

var app = express();
console.log("Server listening on port 3000");

app.listen(3000);
app.use(express.static(__dirname));
