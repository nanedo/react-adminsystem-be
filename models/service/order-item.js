var mongoose = require('mongoose');
// 可以加上validation保证数据完整性
var orderItemSchema = new mongoose.Schema({
    "id":Number,
    "user_id":Number,// 
    "order_no":String,
    "product_id":Boolean, // 
    "product_name": String, // 
    "current_unit_price": String, // 生成订单时的商品单价，单位是元,保留两位小数
    "quantity": String, // 商品数量
    "total_price": String, // 商品总价,单位是元,保留两位小数
    "create_time": String,
    "update_time": String
});

module.exports = mongoose.model('OrderItem', orderItemSchema, 'mmall_order_items');