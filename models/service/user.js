//http://mongoosejs.com/docs/2.7.x/docs/schematypes.html
var mongoose = require('mongoose');
// 可以加上validation保证数据完整性
var userSchema = new mongoose.Schema({
    "id":Number,
    "username":String,
    "password":String,
    "email":String,
    "phone": String,
    "question": {type:String, max:1000},
    "answer": {type:String, max:1000},
    "role": {type:Number, enum:[0,1]},
    "create_time": String,
    "update_time": String
});

module.exports = mongoose.model('User', userSchema, 'mmall_users');