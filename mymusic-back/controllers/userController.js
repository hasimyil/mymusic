const User = require("../models/user");
const { genericResponse } = require('../models/genericResponseModel');
const jwt = require('jsonwebtoken');

exports.getUsers = (req, res, next) => {
    res.status(200).json(fetchAll);
}

exports.getUserById = (req, res, next) => {
    res.status(200).json(User.findById(req.params.UserId));
}

exports.save = (req, res, next) => {
    const user = req.body;
    console.log(user.email)
    const isExist = User.findByEmail(user.email)
    if(isExist){
        return res.json(genericResponse(false, 'Email already registered',200))
    }
    const savedUser = new User(null, user.first_name, user.last_name,user.email, user.password, user.liked).save();
    return res.json(genericResponse(true, 'User Added Successfully',200, savedUser))
}

exports.update = (req, res, next) => {
    const user = req.body;
    const updatedUser = new User(req.params.userId, User.first_name, user.last_name, user.email, user.password, user.liked).update();
    res.status(200).json(updatedUser);
}

exports.deleteById = (req, res, next) => {
    User.deleteById(req.params.UserId);
    res.status(200).end();
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    
    if(!email || !password)return  res.json(genericResponse(false, 'Plase fill all creadintials', -1))
    const user = User.login(email, password)
    if (!user) return res.json(genericResponse(false, 'User not found', -1))

    if(password == user.password){
       
       const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
      return  res.json(genericResponse(true, 'success', 200,user,token))
    }
    


    res.json(genericResponse(true, 'Successfully logged in!', 200))
}
exports.userLogout = async (req, res) => {
    const { email, password } = req.body
    
    
    const user = User.login(email, password)
    if (!user) return res.json(genericResponse(false, 'User not found', -1))

    if(password == user.password){
       
       const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
      return  res.json(genericResponse(true, 'success', 200,user,token))
    }
    


    res.json(genericResponse(true, 'Successfully logged in!', 200))
}

