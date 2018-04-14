var express = require('express');
var router = express.Router();

// 1.订单List
// pageSize(default=10)
// pageNum(default=1)
router.get('/list.do', (req, res, next) => {
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
  res.json({
    "status": 0,
    "data": {
      "orderNo": 1480515829406,
      "payment": 30000.00,
      "paymentType": 1,
      "paymentTypeDesc": "在线支付",
      "postage": 0,
      "status": 10,
      "statusDesc": "未支付",
      "paymentTime": "",
      "sendTime": "",
      "endTime": "",
      "closeTime": "",
      "createTime": "2016-11-30 22:23:49",
      "orderItemVoList": [
        {
          "orderNo": 1480515829406,
          "productId": 1,
          "productName": "iphone7",
          "productImage": "mainimage.jpg",
          "currentUnitPrice": 10000.00,
          "quantity": 1,
          "totalPrice": 10000.00,
          "createTime": "2016-11-30 22:23:49"
        },
        {
          "orderNo": 1480515829406,
          "productId": 2,
          "productName": "oppo R8",
          "productImage": "mainimage.jpg",
          "currentUnitPrice": 20000.00,
          "quantity": 1,
          "totalPrice": 20000.00,
          "createTime": "2016-11-30 22:23:49"
        }
      ],
      "imageHost": "http://img.happymmall.com/",
      "shippingId": 3,
      "receiverName": "geely",
      "shippingVo": {
        "receiverName": "geely",
        "receiverPhone": "0100",
        "receiverMobile": "186",
        "receiverProvince": "北京",
        "receiverCity": "北京",
        "receiverDistrict": "昌平区",
        "receiverAddress": "矩阵小区",
        "receiverZip": "100000"
      }
    }
  });
});

// orderNo
router.post('/send_goods.do', (req, res, next) => {
  res.json({
    "status": 0,
    "data": "发货成功"
  });
});
module.exports = router;