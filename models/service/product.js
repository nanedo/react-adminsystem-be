var mongoose = require('mongoose');
// 可以加上validation保证数据完整性
var productSchema = new mongoose.Schema({
    "id":Number,
    "category_id":Number,
    "name":String,
    "subtitle":String,
    "main_image": String,
    "sub_images": String,
    "detail": String,
    "price": Number,
    "stock": Number,
    "status": Number,
    "create_time": String,
    "update_time": String
});

module.exports = mongoose.model('Product', productSchema, 'mmall_products');