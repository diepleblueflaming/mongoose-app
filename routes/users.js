"use strict";
const {authenticate} = require(__base + 'middleware/authenticate');

module.exports = function (express) {
    let router = express.Router();
    let User = require(__base + '/app/controller/user');

    router.use(authenticate);
    // router get all users
    router.get('/', User.getUsers);
    // router get an user by id
    router.get('/:id(\\d+)', User.getUserById);
    // router get users by name
    router.get('/name/:name', User.getUserByName);
    // router users by address
    router.get('/address/:address', User.getUserByAddress);
    // router update user by id
    router.put('/:id(\\d+)', User.updateUser);
    //router add new user
    router.post('/', User.addUser);
    //router delete an user by ID
    router.delete('/:id(\\d+)', User.deleteUser);
    return router;
};
