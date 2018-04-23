var mongoose = require('mongoose');
// 可以加上validation保证数据完整性
var orderItemSchema = new mongoose.Schema({
    "id":Number,
    "user_id":Number,// 
    "order_no":Number,
    "product_id":Number, // 
    "product_name": {type:String, max:100}, // 
    "current_unit_price": {type:Number, max:1000000}, // 生成订单时的商品单价，单位是元,保留两位小数
    "quantity": {type:Number, max:9999}, // 商品数量
    "total_price": {type:Number, max:10000000}, // 商品总价,单位是元,保留两位小数
    "create_time": String,
    "update_time": String
});

module.exports = mongoose.model('OrderItem', orderItemSchema, 'mmall_order_items');