var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = require('../../models/service/order');
var OrderItem = require('../../models/service/order-item');
var Shipping = require('../../models/service/shipping-info');
var User = require('../../models/service/user');
var FUser = require('../../models/front/user');

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

// 1.订单List
// pageSize(default=10)
// pageNum(default=1)
// orderNo
router.get('/list.do', (req, res, next) => {
  let page = parseInt(req.query.pageNum, 10) || 1;
  let pageSize = parseInt(req.query.pageSize, 10) || 10;
  let order_no = parseInt(req.query.orderNo, 10) || '';
  let params = {
      
  };
  let skip = (page-1)*pageSize;
  let searchList, searchList2;

  if(order_no){
    params = {
      order_no
    };
  }

  searchList = Order.find(params,{
    "id":1,
    "order_no":1,// 订单号
    "user_id":1,
    "shipping_id":1, // 类别状态true-正常,false-已废弃
    "status": 1, // 订单状态:0-已取消-10-未付款，20-已付款，40-已发货，50-交易成功，60-交易关闭
    "payment": 1,
    "create_time": 1,
    "update_time": 1
  }).skip(skip).limit(pageSize).exec();
  searchList2 = Order.find(params);

  Promise.all([searchList,searchList2 ]).then(
    (docArr) => {
      if(docArr[0].length){
        res.json({
          status: 0,
          msg: '',
          data: {
            total: docArr[1].length,
            list: docArr[0]
          }
        });
      } else {
        res.json({
          status: 1,
          msg: '沒有相关订单信息',
          data: ''
        });
      }
    }
  ).catch(
    (err) => {
      res.json({
        status: 1,
        err: err.message,
        data: ''
      });
    }
  );

});

// 2.按订单号查询
// orderNo
router.get('/search.do', (req, res, next) => {
  res.json({
    "status": 0,
    "data": {
      "pageNum": 1,
      "pageSize": 3,
      "size": 3,
      "orderBy": null,
      "startRow": 1,
      "endRow": 3,
      "total": 16,
      "pages": 6,
      "list": [
        {
          "orderNo": 1485158676346,
          "payment": 2999.11,
          "paymentType": 1,
          "paymentTypeDesc": "在线支付",
          "postage": 0,
          "status": 10,
          "statusDesc": "未支付",
          "paymentTime": "2017-02-11 12:27:18",
          "sendTime": "2017-02-11 12:27:18",
          "endTime": "2017-02-11 12:27:18",
          "closeTime": "2017-02-11 12:27:18",
          "createTime": "2017-01-23 16:04:36",
          "orderItemVoList": [
            {
              "orderNo": 1485158676346,
              "productId": 2,
              "productName": "oppo R8",
              "productImage": "mainimage.jpg",
              "currentUnitPrice": 2999.11,
              "quantity": 1,
              "totalPrice": 2999.11,
              "createTime": "2017-01-23 16:04:36"
            }
          ],
          "imageHost": "http://img.happymmall.com/",
          "shippingId": 5,
          "shippingVo": null
        },
        {
          "orderNo": 1485158675516,
          "payment": 2999.11,
          "paymentType": 1,
          "paymentTypeDesc": "在线支付",
          "postage": 0,
          "status": 10,
          "statusDesc": "未支付",
          "paymentTime": "2017-02-11 12:27:18",
          "sendTime": "2017-02-11 12:27:18",
          "endTime": "2017-02-11 12:27:18",
          "closeTime": "2017-02-11 12:27:18",
          "createTime": "2017-01-23 16:04:35",
          "orderItemVoList": [
            {
              "orderNo": 1485158675516,
              "productId": 2,
              "productName": "oppo R8",
              "productImage": "mainimage.jpg",
              "currentUnitPrice": 2999.11,
              "quantity": 1,
              "totalPrice": 2999.11,
              "createTime": "2017-01-23 16:04:35"
            }
          ],
          "imageHost": "http://img.happymmall.com/",
          "shippingId": 5,
          "receiverName": "geely",
          "shippingVo": null
        },
        {
          "orderNo": 1485158675316,
          "payment": 2999.11,
          "paymentType": 1,
          "paymentTypeDesc": "在线支付",
          "postage": 0,
          "status": 10,
          "statusDesc": "未支付",
          "paymentTime": "2017-02-11 12:27:18",
          "sendTime": "2017-02-11 12:27:18",
          "endTime": "2017-02-11 12:27:18",
          "closeTime": "2017-02-11 12:27:18",
          "createTime": "2017-01-23 16:04:35",
          "orderItemVoList": [
            {
              "orderNo": 1485158675316,
              "productId": 2,
              "productName": "oppo R8",
              "productImage": "mainimage.jpg",
              "currentUnitPrice": 2999.11,
              "quantity": 1,
              "totalPrice": 2999.11,
              "createTime": "2017-01-23 16:04:35"
            }
          ],
          "imageHost": "http://img.happymmall.com/",
          "shippingId": 5,
          "receiverName": "geely",
          "shippingVo": null
        }
      ],
      "firstPage": 1,
      "prePage": 0,
      "nextPage": 2,
      "lastPage": 6,
      "isFirstPage": true,
      "isLastPage": false,
      "hasPreviousPage": false,
      "hasNextPage": true,
      "navigatePages": 8,
      "navigatepageNums": [
        1,
        2,
        3,
        4,
        5,
        6
      ]
    }
  });
});

// 3.订单详情
// orderNo
router.get('/detail.do', (req, res, next) => {
  let order_no = req.query.orderNo;

  if(order_no){
    Order.findOne({
      order_no
    }).exec().then(
      (doc1) => {
        if(doc1){
          // 获取数据引用
          var doc = doc1._doc;
          return FUser.findOne({
            "addressList.id": doc.shipping_id
          }).exec().then((_doc)=>{
            if(_doc && _doc.addressList[0]){
              doc.ship = _doc.addressList[0];
              res.json({
                status: 0,
                msg: '',
                data: doc
              });
            } else {
              return Promise.reject('没有这个订单的地址信息');
            }
            
          });
        } else {
          return Promise.reject('没有这个订单1');
        }
      }
    ).catch(err => {
      res.json({
        status: 1,
        msg: err.message || err,
        data: ''
      });
    });
  } else {
    res.json({
      status: 1,
      msg: '没有这个订单',
      data: ''
    });
  }
});

/* .then(
      (doc) => {
        return OrderItem.find({
          order_no: doc.order_no
        }).exec().then(docs => {
          if(docs.length){
            doc.orderItem = docs;
            res.json({
              status: 0,
              msg: '',
              data: doc
            });
          } else {
            return Promise.reject('没有这个订单的商品信息');
          }
        });
      }
    ) */

// orderNo
router.post('/send_goods.do', (req, res, next) => {
  let order_no = parseInt(req.body.orderNo, 10) || 0;
  if(order_no){
    Order.findOne({
      order_no
    }).exec().then(
      (doc) => {
        if(doc){
          if(doc.status===20){
            doc.status = 40;
            doc.save().then(
              () => {
                res.json({
                  status: 0,
                  msg: ''
                });
              },
              (err) => {
                res.json({
                  status: 1,
                  msg: err.message,
                  data: ''
                });
              }
            );
          } else {
            res.json({
              status: 1,
              msg: '设置异常，当前状态为： ' + doc.status,
              data: ''
            });
          }
        } else {
          res.json({
            status: 1,
            msg: '没有这个订单',
            data: ''
          });
        }
      },
      (err) => {
        res.json({
          status: 1,
          msg: err.msg,
          data: ''
        });
      }
    );
  } else {
    res.json({
      status: 1,
      msg: '没有这个订单',
      data: ''
    });
  }
});
module.exports = router;