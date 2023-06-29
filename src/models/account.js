const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { timeStamp } = require('console');

function hash(password) {
    return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

const Account = new Schema({
    profile: {
        username: String,
        thumbnail: { type: String, default: '/static/images/default_thumbnail.png' }
    },
    email: {type: String},
    social: {
        facebook: {
            id: String,
            accessToken: String
        },
        google: {
            id: String,
            accessToken: String
        }
    },
    password: String,
    thoughtCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

Account.statics.findByUserName = function(username) {
    return this.findOne({'profile.username': username}).exec();
};

Account.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

Account.statics.findByEmailOrUsername = function({ username, email }) {
    return this.findOne({
        $or: [
            { 'profile.username': username },
            { email }
        ]
    }).exec();
};

Account.statics.localRegister = function({ username, email, password }) {
    const account = new this({
        profile: {
            username
        },
        email,
        password: hash(password)
    });

    return account.save();
};

Account.methods.validatePassword = function(password) {
    const hashed = hash(password);
    return this.password === hashed;
};

module.exports = mongoose.model('Acocunt', Account);