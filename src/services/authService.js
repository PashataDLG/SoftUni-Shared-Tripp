const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/constants');

exports.register = async (userData) => {
    const createdUser = await User.create(userData);

    return createdUser; 
};

exports.login = async (email, password) => {
    let user = await User.findOne({ email });

    console.log(user);

    if (!user) {
        throw {
            message: 'Invalid username or password'
        };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw {
            message: 'Invalid username or password'
        };
    }

    let payload = { _id: user._id, username: user.username };

    let result = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });

    return result;
};