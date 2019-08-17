const credential = require(__base + 'app/controller/credential');

module.exports = function (express) {
    const route = express.Router();
    route.post('/login', credential.login);
    return route;
};
