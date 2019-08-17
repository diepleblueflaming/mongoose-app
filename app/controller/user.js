"use strict";
// require user model
const User = require(__base + 'app/model/user');

/**
 * get all users
 * HttpMethod : GETs
 * @return {undefined}
 */
exports.getUsers = (req, res) => {
    User.getUsers((err, users) => {
        if(err) {
            // pass error to middleware handling error
            next(err);
            return;
        }
        if(users.length <= 0) {
            res.status(204).end("User not found !!!!");
        }else {
            res.status(200).json(users);
        }
    });
};


/**
 * get an user by id
 * @param req
 * @param res
 * @param next
 * @return {undefined}
 */
exports.getUserById = (req, res, next)=> {
    let id = parseInt(req.params.id);
    if(id === 0){
        // status code : no-content
        res.status(204).end();
        return;
    }
    User.findOne({'_id' : id}).
    then(async user => {
        if(!user){
            res.status(404).end("User not found !!!!");
        }else {
            // return user to  client
            res.status(200).json(user);
        }
    }).
    catch(err => {
        // pass error to middleware handling error
        next(err);
    });
};

/**
 * get an user by name
 * @param req
 * @param res
 * @param next
 * @return {undefined}
 */
exports.getUserByName = (req, res, next) => {
    let name = req.params.name;
    let user = new User({name : name});
    user.findByName(function (err, users) {
       if(err){
           // pass err to next middleware
           next(err);
           return;
       }
       // if not user found
       if(users.length <= 0){
           res.status(404).end("User not found");
       }else {
           // if everything is ok
           res.status(200).json(users);
       }
    });
};

/**
 * fnc get users by address
 * @param req
 * @param res
 * @param next
 */
exports.getUserByAddress = (req, res, next) => {
    let address = req.params.address;
    let user = new User({address : address});
    user.findByAddress((err, users) => {
        if(err){
            // pass err to next middleware
            next(err);
            return;
        }
        // if not user found
        if(!users.length){
            res.status(404).end("User not found");
        }else {
            // if everything is ok
            res.status(200).json(users);
        }
    });
};

/**
 * fnc update an user by Id
 * @param req
 * @param res
 * @param next
 * @return {undefined}
 */
exports.updateUser = (req, res, next) => {
    let user_update = req.body;
    let id = req.params.id;

    // Cách 1 nếu bạn không cần lấy  về bản ghi đã được cập nhật
    // User.findByIdAndUpdate(id, user_update, function (err, user) {
    //     if(err){
    //         next(err);
    //     }
    //     res.status(200);
    //     // user trả về chưa được update
    //     res.json(user).end();
    // });

    // Cách 2 nếu bạn muốn lấy về bản ghi đã được cập nhật
    User.findById(id, (err, user) => {
       if(err){
           next(err);
           return;
       }
       user.set(user_update);
       user.save((err, user_updated) => {
           if(err){
               next(err);
           }else {
               res.status(200);
               // user trả về đã được update
               res.json(user_updated).end();
           }
       });
    });
};

/**
 * fnc add new an user
 * @param req
 * @param res
 * @param next
 * @return {undefined}
 */
exports.addUser = async (req, res, next) => {
    // get user obj from req.body obj
    let user = req.body;
    user = new User(user);
    try {
        let result = await User.find({name : req.body.name});
        if(result.length > 0){
            res.status(400).end('Username already exists');
            return;
        }
        // if user already exists
        // step 1 : get id of latest  document
        let {id} = await User.getLastId();
        // step 2 set new _id for user
        user.set({'_id' : 1 + +id});
        // step 3 add new user to model
        await user.save();
        res.status(201).end("New user is created");
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Delete an user by ID
 * @param req
 * @param res
 * @param next
 * @return {undefined}
 */
exports.deleteUser = (req, res, next) => {
    let id = +req.params.id;
    if(0){
        res.status(400).end("Bad requested !!!!!");
        return;
    }
    let user = new User({_id : id});
    user.deleteUserById(function(err){
       if(err){
           next(err);
       }else {
           res.status(200).json({'messageText': 'User is deleted'});
       }
    });
};
