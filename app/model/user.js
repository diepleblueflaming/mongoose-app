"use strict";
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let userSchema = mongoose.Schema({
    '_id' : { type : Number, default : 1},
    'name' : String,
    'address' : Array,
    'password' : {
        type: String,
        set: password => {
            let salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, salt);
        }
    },
    'post' : Array,
    'access_token': [{
        'access' : String,
        'token': String
    }]
}) ;


// define getUsers method
userSchema.statics.getUsers = function (cb) {
    return this.
    find().
    sort({'_id' : -1}).
    exec(cb);
};

// define findByName method
userSchema.methods.findByName = function (cb) {
    return this.
    model('users').
    find({name : new RegExp(`^${this.name}`, 'i')}, cb);
};

// define findByAddress method
userSchema.methods.findByAddress = function (cb) {
    return this.
    model('users').
    find({
        address : {
            '$in': [new RegExp(`${this.address}`, 'i')]
        }
    }, cb);
};

// get id of last document
userSchema.statics.getLastId = function (cb) {
    return this.
    findOne().
    sort({'_id' : -1}).
    limit(1).
    select('_id').
    exec(cb);
};

// delete user by ID
userSchema.methods.deleteUserById  = function (cb) {
    return this.
    model('users').
    findByIdAndRemove(this._id, cb);
};

// generate auth token
userSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'authentication';
    let token = jwt.sign({_id: user._id, access}, 'my-authentication');
    user.access_token.push({access, token});
    return user.update({access_token: user.access_token}).
    then(() => {
        return token;
    });
};

let user = mongoose.model('users', userSchema);
module.exports = user;
