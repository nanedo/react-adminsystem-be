var mongoose = require('mongoose');
// 可以加上validation保证数据完整性
var payInfoSchema = new mongoose.Schema({
    "id":Number,
    "user_id":Number,// 
    "order_no":String,
    "pay_platform":Boolean, // 支付平台:1-支付宝,2-微信
    "platform_number": String, // 支付宝支付流水号
    "platform_status": String, // 支付宝支付状态
    "create_time": String,
    "update_time": String
});

module.exports = mongoose.model('PayInfo', payInfoSchema, 'mmall_pay_infos');