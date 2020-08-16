var express = require('express');
var app = express();
var path = require('path');
var port = 8000;

const DIRNAME = "";
const PRERENDER_TOKEN = "G9xWvf6Z7xh9Yzq4oDmb";

app.use(express.static(path.join(__dirname, DIRNAME)));

console.log("We will configure prerender middleware");

//app.use(require('prerender-node').set('prerenderServiceUrl', 'http://localhost:3000')
//.set('prerenderToken', PRERENDER_TOKEN));
//prerender middleware that connects to prerender service 

app.listen(port, function(){
   console.log('Listening on port ' + port)
})