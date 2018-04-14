var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 创建表结构
var utilsSchema = new Schema({
    "regisiter": {
        "regisiterDay": Number,
        "regisiterNum": Number
    }
})

module.exports = mongoose.model('Util', utilsSchema);