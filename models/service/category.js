var mongoose = require('mongoose');
// 可以加上validation保证数据完整性
var categorySchema = new mongoose.Schema({
    "id":Number,
    "parent_id":Number,// 父类别id当id=0时说明是根节点,一级类别
    "name":String,
    "status":Boolean, // 类别状态true-正常,false-已废弃
    "sort_order": String, // 排序编号,同类展示顺序,数值相等则自然排序
    "create_time": String,
    "update_time": String
});

module.exports = mongoose.model('Category', categorySchema, 'mmall_categorys');