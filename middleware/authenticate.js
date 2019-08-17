const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  let token = req.header('x-auth');
  try {
      jwt.verify(token, 'my-authentication');
      next();
  }catch (e){
      e.status = 401;
      next(e);
  }
}

module.exports = {
    authenticate
};
