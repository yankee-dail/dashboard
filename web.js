/**
 * Created by osemchyshyn on 11/25/2015.
 */

var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.use('/bower_components', express.static("" + __dirname + '/bower_components'));
app.use(function (req, res) {
  res.sendfile("" + __dirname + '/dist/index.html');
});
app.listen(process.env.PORT || 5000);
