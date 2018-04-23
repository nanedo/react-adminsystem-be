var express = require('express');
var fs = require('fs');
var multer = require('multer');
const path = require('path');
var crypto = require('crypto');
var mongoose = require('mongoose');
var router = express.Router();
var Product = require('../../models/service/product');
var Category = require('../../models/service/category');
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
var uploadFolder = '';
if (process.platform === 'win32') {
  uploadFolder = 'public/upload/';
} else {
  uploadFolder = '/home/ubuntu/www/image/imoocmall/public/upload/';
}
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
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // 限定文件大小，，默认是1MB
    files: 3, // 每次最多上传3个文件
    fields: 20 // 每次附带的表的参数对象为20个
  }
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
  let key = {
    name: productName ? "name" : productId ? "id" : '',
    value: productName ? productName : productId ? productId : ''
  };


  let skip = (page-1)*pageSize;
  let params = {
      
  };
  let searchList = Product.find().skip(skip).limit(pageSize).exec();
  let searchList2 = Product.find();
/*   if(key.name === 'id'){
    // id为数值类型
    searchList2 = Product.aggregate([
      { $match : { 'id': parseInt(key.value,10) } },
      {$group:{_id:'"$source',count:{$sum:1}}},
      { $skip: skip},
      { $limit: pageSize }
    ]);
  } else {
    searchList2 = Product.aggregate([
      { $match : { 'name': new RegExp(key.value) } },
      {$group:{_id:'"$source',count:{$sum:1}}},
      { $skip: skip},
      { $limit: pageSize }
    ]);
  } */
  if(key.name === 'id'){
    // id为数值类型
    searchList2 = Product.find({ 'id': parseInt(key.value,10) });
    searchList = Product.find({ 'id': parseInt(key.value,10) }).skip(skip).limit(pageSize).exec();
  } else if(key.name === 'name') {
    searchList2 = Product.find({ 'name': new RegExp(key.value) });
    searchList = Product.find({ 'name': new RegExp(key.value) }).skip(skip).limit(pageSize).exec();
  }
  

  // 要单独获取总的条数
  Promise.all([searchList2,searchList]).then(
    (docArr)=>{
      if(docArr[0].length){
        let total = docArr[0].length;
        let list = [];

        docArr[1].forEach(el => {
          list.push({
            "id":parseInt(el.id, 10),
            "categoryId":parseInt(el.category_id, 10),
            "parentCategoryId":parseInt(el.parentCategoryId, 10),
            "name":el.name,
            "subtitle":el.subtitle,
            "mainImage":el.main_image,
            "status":parseInt(el.status, 10),
            "price":parseInt(el.price,10)
          });
        });

        res.json({
          status: 0,
          msg: '',
          'data': {
            total: total,
            list
          }
        });

      } else{
        res.json({
          status:1,
          msg:'暂无数据'
        });
      }
    },
    (err)=>{
      res.json({
        status: 1,
        msg: err.message
      });
    }
  );
  return
  searchList.skip(skip).limit(pageSize).exec().then(
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
          total: total,
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
// 使用中间件处理错误韩式
var uploader = upload.single('upload_file');
router.post('/upload.do', (req, res, next) => {
  uploader(req, res, (err) => {

  // 不使用中间件
  //router.post('/upload.do', upload.single('upload_file'), (req, res, next) => {
  //
    if(err) {
      console.log('upload error:', err)
      res.json({
        "status": 1,
        "msg": err.message
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

    // 拿到图片路径后，可以考虑压缩优化下
    // https://github.com/zhangyuanwei/node-images

    res.json({
      "status": 0,
      "data": {
          "uri": file.filename,
          "url": '/'+filePath.replace(/\\/g, '/')
      }
    });

  });
});

// 4.产品详情
// productId
router.get('/detail.do', (req, res, next) => {
  console.log(req.query.productId)
  let id = parseInt(req.query.productId, 10);

  Product.findOne({
    id
  }).then(
    (doc) => {
      if(doc){
        if(typeof doc.parentCategoryId==='undefined'){
          doc.parentCategoryId = 0;
        }
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

更新 http://localhost:8080/manage/product/save.do?
categoryId=1
name=三星洗衣机
subtitle=三星大促销
subImages=test.jpg,11.jpg,2.jpg,3.jpg
detail=detailtext
price=1000
stock=100
status=1
id=3 

*/
router.post('/save.do', (req, res, next) => {
  // 当传入的值带有id时，表示是更新
  let reqParam = {
    id: parseInt(req.body.id || 0, 10) || 0,
    category_id: parseInt(req.body.categoryId, 10),
    parentCategoryId: parseInt(req.body.parentCategoryId, 10),
    name: req.body.name,
    subtitle: req.body.subtitle,
    sub_images: req.body.subImages,
    detail: req.body.detail,
    price: parseFloat(req.body.price, 10),
    stock: parseInt(req.body.stock, 10),
    status: parseInt(req.body.status, 10)
  };

  let queryParam = {
    category_id: reqParam.category_id,
    parent_id: reqParam.parentCategoryId
  };

  // 怎样防止恶意篡改其它数据？

  let errorInfo = "";
  if(reqParam.id && reqParam.id > 0){
    queryParam.id = reqParam.id;
  } else if(reqParam.id < 0){
    errorInfo += '产品ID有问题；';
  }

  let isUpdateInfo = queryParam.id ? true : false;

  if(typeof reqParam.category_id !== 'number' || reqParam.category_id < 0){
    errorInfo += '类别ID有问题；';
  }

  if(!reqParam.name){
    errorInfo += "缺少产品名称；";
  }
  if(!reqParam.subtitle){
    errorInfo += "缺少产品副标题；";
  }
  if(!reqParam.sub_images){
    errorInfo += "缺少产品图片；";
  }
  if(!reqParam.detail){
    errorInfo += "缺少产品描述；";
  }
  if(typeof reqParam.price !== 'number' || reqParam.price < 0){
    errorInfo += "产品价格有误；";
  }
  if(typeof reqParam.stock !== 'number' || reqParam.stock < 0){
    errorInfo += "产品库存有误；";
  }
  if(typeof reqParam.status !== 'number' || reqParam.status < 0){
    errorInfo += "产品状态信息有误；";
  }

  if(errorInfo){
    res.json({
      status: 1,
      data: errorInfo,
      msg: errorInfo
    });
  } else {
    let categoryInfo = Category.find({id: queryParam.category_id, parent_id: queryParam.parent_id}).exec();
    let productInfo = isUpdateInfo ? Product.findOne({
      id: reqParam.id
    }).exec() : Product.find().sort({id:-1}).exec();
    reqParam.main_image = reqParam.sub_images.split(',')[0];

    Promise.all([categoryInfo, productInfo]).then(
      (resArr) => {
        let product = resArr[1];
        if(resArr[0].length){
          if(isUpdateInfo){
            if(product) {
              Object.assign(product, reqParam);
              product.update_time = new Date().toISOString();
              product.save().then(
                (doc) => {
                  res.json({
                    status: 0,
                    data: '产品更新成功',
                    msg: '产品更新成功'
                  });
                },
                (err) => {
                  res.json({
                    status: 1,
                    data: err.message,
                    msg: err.message
                  });
                }
              );
            } else {
              res.json({
                status: 1,
                data: '没有对应的产品'
              })
            }
          } else { 
            let ID = 1000000;//初始的id字段
              if(product.length){
                // 原表里有数据
                ID = product[0].id + 1;
              }
              reqParam.id = ID;
              reqParam.create_time = new Date().toISOString();
              reqParam.update_time = new Date().toISOString();
              
              Product.create(reqParam).then(
                (doc) => {
                  res.json({
                    status: 0,
                    data: '产品添加成功',
                    msg: '产品添加成功'
                  });
                },
                (err) => {
                  res.json({
                    status: 1,
                    data: err.message,
                    msg: err.message
                  });
                }
              );
          }
        } else {
          res.json({
            status: 1,
            data: '没有对应的类别'
          })
        }
      }, 
      (errArr) => {
        if(errArr[0]){
          res.json({
            status: 1,
            data: errArr[0].message
          })
        }
      }
    );
  }
  //检查各项信息，不符合规范的返回错误
});


module.exports = router;