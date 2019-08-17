"use strict";
const User = require(__base + 'app/model/user');
const bcrypt = require('bcrypt');

// const
module.exports = {
  login : async (req, res, next) => {
      try {
          let {name, password} = req.body;
          let user = await User.findOne({ name : name });
          if(!user){
              res.status(400).end('username is invalid');
          }
          let isEqual = await bcrypt.compare(password, user.password);
          if(isEqual){
              let token = await user.generateAuthToken();
              res.header({'x-auth': token});
              res.status(200).end('login successfully !!!');
          }else {
              res.status(400).end('password is invalid');
          }
      } catch (e){
          e.status = 400;
          next(e);
      }
  },

  logout: (req, res, next) => {

  }
};
