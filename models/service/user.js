var mongoose = require('mongoose');
// 可以加上validation保证数据完整性
var userSchema = new mongoose.Schema({
    "id":String,
    "username":String,
    "password":String,
    "email":String,
    "phone": String,
    "question": String,
    "answer": String,
    "role": Number,
    "create_time": Number,
    "update_time": Number
});

module.exports = mongoose.model('User', userSchema, 'mmall_users');