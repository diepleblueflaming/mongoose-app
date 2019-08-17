module.exports = {
    'config_header': function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
        next();
    }
};
