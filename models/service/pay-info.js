var mongoose = require('mongoose');
// 可以加上validation保证数据完整性
var payInfoSchema = new mongoose.Schema({
    "id":Number,
    "user_id":Number,// 
    "order_no":Number,
    "pay_platform":{type: Number, enum: [1, 2]}, // 支付平台:1-支付宝,2-微信
    "platform_number": Number, // 支付宝支付流水号
    "platform_status": String, // 支付宝支付状态
    "create_time": String,
    "update_time": String
});

module.exports = mongoose.model('PayInfo', payInfoSchema, 'mmall_pay_infos');