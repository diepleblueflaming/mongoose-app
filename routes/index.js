module.exports = function (express, app) {
    // user router
    const user = require('./users')(express);
    app.use('/users', user);

    const credential = require('./credential')(express);
    app.use('/', credential);
};
