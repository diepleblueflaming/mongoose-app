let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let app = express();
// define base_dir
global.__base = __dirname +'/';

require(__base + 'app/model/connection');
const config = require(`${__base}/config/config`);
const {badRequestHandler, errorHandler} = require(`${__base}middleware/errorHandler`);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// application/json
app.use(bodyParser.json());
// x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());

app.use(config.config_header);

require(__base + '/routes/index')(express, app);

// catch error
app.use(function(req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
);
app.use(errorHandler);
app.use(function () {
  debugger;
});
module.exports = app;
