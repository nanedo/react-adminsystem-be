var express = require('express');
var router = express.Router();

const statistic = require('./statistic');
const order = require('./order');
const product = require('./product');
const user = require('./user');
const category = require('./category');

// 统计接口
router.use("/statistic", statistic);
// 订单接口
router.use("/order", order);
// 产品接口
router.use("/product", product);
// 用户接口
router.use("/user", user);
// 品类接口
router.use("/category", category);

module.exports = router;