var mongoose = require('mongoose');
// 可以加上validation保证数据完整性
var orderSchema = new mongoose.Schema({
    "id":Number,
    "order_no":String,// 订单号
    "user_id":Number,
    "shipping_id":String, // 
    "payment": Number, // 
    "payment_type": {type: Number, enum: [1, 2]}, // 支付类型,1-在线支付 2-货到付款
    "status": {type: Number, enum: [0, 10, 20, 40, 50, 60]}, // 订单状态:0-已取消 10-未付款，20-已付款，40-已发货，50-交易成功，60-交易关闭
    "payment_time": String, // 支付时间
    "send_time": String, 
    "end_time": String, // 交易完成时间
    "close_time": String, // 交易关闭时间
    "create_time": String,
    "update_time": String,
    "postage": Number, // 运费
    "order_item": [{
        "user_id":Number,// 
        "order_no":String,
        "product_id":Number, // 
        "product_image": String,
        "subtitle": String,
        "product_name": {type:String, max:100}, // 
        "current_unit_price": {type:Number, max:1000000}, // 生成订单时的商品单价，单位是元,保留两位小数
        "quantity": {type:Number, max:9999}, // 商品数量
        "total_price": {type:Number, max:10000000}, // 商品总价,单位是元,保留两位小数
        "create_time": String,
        "update_time": String
    }]
});

module.exports = mongoose.model('Order', orderSchema, 'mmall_orders');