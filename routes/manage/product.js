var express = require('express');
var fs = require('fs');
var multer = require('multer');
const path = require('path');
var crypto = require('crypto');
var mongoose = require('mongoose');
var router = express.Router();
var Product = require('../../models/service/product');
var Util = require('../../models/service/util');

// 创建文件夹
var createFolder = function(folder){
  try{
      // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
      // 如果文件路径不存在将会抛出错误"no such file or directory"
      fs.accessSync(folder); 
  }catch(e){
      // 文件夹不存在，以同步的方式创建文件目录。
      fs.mkdirSync(folder);
  }  
};
var uploadFolder = 'public/upload/';
createFolder(uploadFolder);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, uploadFolder)
  },
  filename: function (req, file, cb) {
      var fileformat = (file.originalname).split('.');
      cb(null, file.fieldname+'-'+Date.now()+'.'+fileformat[fileformat.length-1]);
  }
});

var upload = multer({
  storage: storage
  // dest: uploadFolder
  // fileFilter: '', //限定文件类型
  // limits: 1 * 1024 * 1024 // 限定文件大小，，默认是1MB
});



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

// 1.产品list
// pageNum(default=1)
// pageSize(default=10)

router.get('/list.do', (req, res, next) => {
  let page = parseInt(req.query.pageNum, 10) || 1;
  let pageSize = parseInt(req.query.pageSize, 10) || 10;

  let skip = (page-1)*pageSize;

  Product.find().skip(skip).limit(pageSize).exec().then(
    (docs) =>{
      let list = [];
      if(docs && docs.length){
        // 需要隐藏信息
        docs.forEach((el, inx) => {
            list.push({
              "id":el.id,
              "categoryId":el.category_id,
              "name":el.name,
              "subtitle":el.subtitle,
              "mainImage":el.main_image,
              "status":el.status,
              "price":el.price
            });
        });

      }
      res.json({
        status: 0,
        msg: '',
        'data': {
          total: list.length,
          list
        }
      });
    },
    (err) => {
      res.json({
        'status': 1,
        'msg': err.message
      });
    }
  );

  /* res.json({
    "status": 0,
    "data": {
        "total": 2,
        "list": [
            {
                "id": 1,
                "categoryId": 3,
                "name": "iphone7",
                "subtitle": "双十一促销",
                "mainImage": "mainimage.jpg",
                "status":1,
                "price": 7199.22
            },
            {
                "id": 2,
                "categoryId": 2,
                "name": "oppo R8",
                "subtitle": "oppo促销进行中",
                "mainImage": "mainimage.jpg",
                "status":1,
                "price": 2999.11
            }
        ]
    }
  }); */
});

// 2.产品搜索
// productName
// productId
// pageNum(default=1)
// pageSize(default=10)
router.get('/search.do', (req, res, next) => {
  let page = parseInt(req.query.pageNum, 10) || 1;
  let pageSize = parseInt(req.query.pageSize, 10) || 10;
  let productName = req.query.productName || '';
  let productId = req.query.productId || '';


  let skip = (page-1)*pageSize;
  let params = {
      
  };

  Product.find(params).skip(skip).limit(pageSize).exec().then(
    (docs) =>{
      let list = [];
      if(docs && docs.length){
        // 需要隐藏信息
        docs.forEach((el, inx) => {
          let flag = true;
          // 当搜索参数为productId
          if(productId && String(el.id).indexOf(productId) === -1){
            flag = false;
          }
          // productName
          if(productName && el.name.indexOf(productName) === -1){
            flag = false;
          } 
          if(flag) {
            list.push({
              "id":parseInt(el.id, 10),
              "categoryId":parseInt(el.category_id, 10),
              "name":el.name,
              "subtitle":el.subtitle,
              "mainImage":el.main_image,
              "status":parseInt(el.status, 10),
              "price":parseInt(el.price,10)
            });
          }
        });
      }
      res.json({
        status: 0,
        msg: '',
        'data': {
          total: list.length,
          list
        }
      });
    },
    (err) => {
      res.json({
        'status': 1,
        'msg': err.message
      });
    }
  );
});

// 3.图片上传
/* 
<form name="form2" action="/manage/product/upload.do" method="post"  enctype="multipart/form-data">
    <input type="file" name="upload_file">
    <input type="submit" value="upload"/>
</form> 
*/
// 使用中间件
// var uploader = multer().single('upload_file');
router.post('/upload.do', upload.single('upload_file'), (req, res, next) => {
  //uploader(req, res, (err) => {
    if(!req.file) {
      res.json({
        "status": 1,
        "msg": err.msg
      });
      return ;
    }
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    console.log('文件保存名稱：%s', file.filename);
    let filePath = file.path || '上传失败';
    res.json({
      "status": 0,
      "data": {
          "uri": file.filename,
          "url": '/'+filePath.replace(/\\/g, '/')
      }
    });
  //});
});

// 4.产品详情
// productId
router.get('/detail.do', (req, res, next) => {
  let id = req.body.productId;

  Product.findOne({
    id
  }).then(
    (doc) => {
      if(doc){
        res.json({
          'status':0,
          'msg': '',
          'data': doc
        });
      }else{
        res.json({
          'status': 1,
          'msg': '查无此商品'
        });
      }
    },
    (err) => {
      res.json({
        'status': 1,
        'msg': err.message
      });
    }
  );

  /* res.json({
    "status": 0,
    "data": {
        "id": 2,
        "categoryId": 2,
        "parentCategoryId":1,
        "name": "oppo R8",
        "subtitle": "oppo促销进行中",
        "imageHost": "http://img.happymmall.com/",
        "mainImage": "mainimage.jpg",
        "subImages": "[\"mmall/aa.jpg\",\"mmall/bb.jpg\",\"mmall/cc.jpg\",\"mmall/dd.jpg\",\"mmall/ee.jpg\"]",
        "detail": "richtext",
        "price": 2999.11,
        "stock": 71,
        "status": 1,
        "createTime": "2016-11-20 14:21:53",
        "updateTime": "2016-11-20 14:21:53"
    }
  }); */
});

// 5.产品上下架
// productId
// status
router.post('/set_sale_status.do', (req, res, next) => {
  let id = req.body.productId;
  let status = req.body.status;

  Product.findOne({
    id
  }).exec().then(
    (doc) => {
      if(doc){
        //修改状态然后保存
        doc.status = status;
        doc.save().then(
          () => {
            res.json({
              'status': 0,
              'msg': '修改成功',
              'data': {
                'status': doc.status
              }
            });
          }, (err) => {
            res.json({
              'status': 1,
              'msg': err.message
            });
          }
        );
      } else {
        res.json({
          'status': 1,
          'msg': '查无此商品:'+ id +' : '+ doc
        });
      }
    },
    (err) => {
      res.json({
        'status': 1,
        'msg': err.message
      });
    }
  );
});

// 6.新增OR更新产品
/* 
新增 http://localhost:8080/manage/product/save.do?categoryId=1&name=三星洗衣机&subtitle=三星大促销&subImages=test.jpg,11.jpg,2.jpg,3.jpg&detail=detailtext&price=1000&stock=100&status=1

更新 http://localhost:8080/manage/product/save.do?categoryId=1&name=三星洗衣机&subtitle=三星大促销&subImages=test.jpg&detail=detailtext&price=1000&stock=100&status=1&id=3 
*/
router.post('/save.do', (req, res, next) => {
  res.json({
    "status": 0,
    "data": {
        "id": 12,
        "username": "aaa",
        "email": "aaa@163.com",
        "phone": null,
        "role": 0,
        "createTime": 1479048325000,
        "updateTime": 1479048325000
    }
  });
});

//  7.富文本上传图片
/* 
<form name="form2" action="/manage/product/upload.do" method="post"  enctype="multipart/form-data">
    <input type="file" name="upload_file">
    <input type="submit" value="upload"/>
</form> 
*/
router.post('/richtext_img_upload.do', (req, res, next) => {
  res.json({
    "status": 0,
    "data": {
      "file_path": "http://img.happymmall.com/5fb239f2-0007-40c1-b8e6-0dc11b22779c.jpg",
      "msg": "上传成功",
      "success": true
    }
  });
});


module.exports = router;