var mongoose = require('mongoose');
// 可以加上validation保证数据完整性
var productSchema = new mongoose.Schema({
    "id":Number,
    "category_id":Number,
    "parentCategoryId":Number,
    "name":{type:String, max:100},
    "subtitle":{type:String, max:300},
    "main_image": {type:String, max:1000},
    "sub_images": {type:String, max:10000},
    "detail": {type:String, max:10000},
    "price": {type:Number, max:1000000},
    "stock": {type:Number, max:10000},
    "status": Number, //1-在售 2-下架 3-删除
    "create_time": String,
    "update_time": String
});

module.exports = mongoose.model('Product', productSchema, 'mmall_products');