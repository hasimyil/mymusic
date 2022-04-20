const { genericResponse } = require("../models/genericResponseModel")
const jwt = require('jsonwebtoken');
const User = require('../models/user');
exports.isAuth = (req, res, next) => {
  
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode)
            const user = User.findById(decode.userId);
            if (!user) {
                return res.json(genericResponse(false, 'Token is not valid!', -1))
            }

            req.user = user;
            next();
        }   catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.json({ success: false, message: 'unauthorized access!' });
              }
              if (error.name === 'TokenExpiredError') {
                return res.json({
                  success: false,
                  message: 'sesson expired try sign in!',
                });
              }
        
              res.res.json({ success: false, message: 'Internal server error!' });
            }
           
        }else{
           return res.json(genericResponse(false,'Unauthorized access!', -1))
        }
    }