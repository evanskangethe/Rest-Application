const mongoose = require('mongoose');
const userSchema = require('./users.model');

//assign a function to the static object of my UserSchema
userSchema.statics = {

    create: (data, cb) => {
        const user = new this(data);
        user.save(cb);
    },

    get: (query,cb) => {
        this.find(query,cb);
    },

    getOne: (query, cb) => {
        this.findOne(query,cb);
    },

    update: (query,cb) => {
        this.findOneAndUpdate(query,{$set:updateData},{new: true},cb);
    },

    remove: (query,cb) => {
        this.findOneAndDelete(query,cb);
    }
}

const Users = mongoose.model('User', userSchema);
module.exports = Users