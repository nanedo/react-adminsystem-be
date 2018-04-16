var mongoose = require('mongoose');
// 可以加上validation保证数据完整性
var orderSchema = new mongoose.Schema({
    "id":Number,
    "order_no":Number,// 订单号
    "user_id":String,
    "shipping_id":Boolean, // 类别状态true-正常,false-已废弃
    "payment": String, // 排序编号,同类展示顺序,数值相等则自然排序
    "payment_type": String, // 支付类型,1-在线支付 2-货到付款
    "status": String, // 订单状态:0-已取消-10-未付款，20-已付款，40-已发货，50-交易成功，60-交易关闭
    "payment_time": String, // 支付时间
    "send_time": String, 
    "end_time": String, // 交易完成时间
    "close_time": String, // 交易关闭时间
    "create_time": String,
    "update_time": String,
    "postage": String // 运费
});

module.exports = mongoose.model('Order', orderSchema, 'mmall_orders');