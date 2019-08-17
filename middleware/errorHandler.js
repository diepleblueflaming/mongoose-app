function badRequestHandler(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function errorHandler(err, req, res, next) {
    let env = req.app.get('env');
    // set locals, only providing error in development
    if(env === "development"){
        console.error('Error: ', err);
    }
    // res.locals.message = err.message;
    // res.locals.error = env === 'development' ? err : {};
    // res.status(err.status || 500);
    // res.json(err);
  next();
}

module.exports = {
    badRequestHandler,
    errorHandler
};
