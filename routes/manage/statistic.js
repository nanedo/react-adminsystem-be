var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../../models/service/user');
var Product = require('../../models/service/product');
var Order = require('../../models/service/order');


mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on('connected', () => {
    console.log('connected')
});

mongoose.connection.on('error', () => {
    console.log('error')
});

mongoose.connection.on('disconnected', () => {
    console.log('disconnected')
});

// 1.统计用户、商品、订单数量
router.get('/base_count.do', (req, res, next) => {
  let queryUser = User.find({
    role: 0
  }).exec();
  // 只统计非管理员类型
  let queryProduct = Product.find().exec();
  let queryOrder = Order.find().exec();

  Promise.all([queryUser, queryProduct, queryOrder]).then(
    (docsArr) => {
      let product = {};
      let order = {};
      let findUser = docsArr[0];
      let findProduct = docsArr[1];
      let findOrder = docsArr[2];
      // 查询产品各个状态的数量
      findProduct.forEach((el, index) => {
        if(!product[el.status]){
          product[el.status] = 1;
        } else {
          product[el.status] += 1;
        }
      });
      // 查询订单各个状态的数量
      findOrder.forEach((el, index) => {
        if(!order[el.status]){
          order[el.status] = 1;
        } else {
          order[el.status] += 1;
        }
      });

      res.json({
        "status": 0,
        "data": {
            userCount: findUser.length,
            productCount: findProduct.length,
            orderCount: findOrder.length,
            product: product,
            order: order
        }
      });
    }
  ).catch(
    (err) => {
      console.log(err)
      res.json({
        status: 1,
        msg: err.message || err,
        data: ''
      });
    }
  );

  
});

module.exports = router;