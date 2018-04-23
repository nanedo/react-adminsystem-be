var mongoose = require('mongoose');
// 可以加上validation保证数据完整性
var userSchema = new mongoose.Schema({
    "userId":Number,
    "userName":String,
    "userPwd":String,
    "orderList":Array,
    "cartList":[
      {
        "productId":String,
        "productName":String,
        'subtitle':String,
        "salePrice":Number,
        "productImage":String,
        "checked":String,
        "productNum":Number
      }
    ],
    "addressList":[
      {
        "id":Number,
        "user_id":Number,// 
        "receiver_name":String,
        "receiver_phone":String, // 收货固定电话
        "receiver_mobile": String, // 收货移动电话
        "receiver_province": String,
        "receiver_city": String,
        "receiver_district": String,
        "receiver_address": String,
        "receiver_zip": String, // 邮编
        "create_time": String,
        "update_time": String,
        "isDefault": Boolean
      }
    ]
});

module.exports = mongoose.model('FUser', userSchema, 'users');