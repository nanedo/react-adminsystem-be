var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Category = require('../../models/service/category');
var Util = require('../../models/service/util');
var crypto = require('crypto');

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

// 1.获取品类子节点(平级)
// categoryId(default=0)
router.post('/get_category.do', (req, res, next) => {
  let categoryId = req.body.categoryId || 0;

  let param = {
    parent_id: categoryId
  };

  Category.find(param).exec().then(
    (docs) => {
      res.json({
        'status': 0,
        'msg': '',
        'data': docs
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
    "data": [
        {
            "id": 2,
            "parentId": 1,
            "name": "手机",
            "status": true,
            "sortOrder": 3,
            "createTime": 1479622913000,
            "updateTime": 1479622913000
        },
        {
            "id": 4,
            "parentId": 1,
            "name": "移动座机",
            "status": true,
            "sortOrder": 5,
            "createTime": 1480059936000,
            "updateTime": 1480491941000
        }
    ]
  }); */
});

// 2.增加节点
// parentId(default=0)
// categoryName
router.post('/add_category.do', (req, res, next) => {
  let parent_id = req.body.parentId || 0;
  let name = req.body.categoryName;
  let now = new Date().toISOString();

  // 是否存在已有的名称
  let getCategory = Category.find({
    name,
    parent_id
  }).exec();
  // 是否有对应的父类
  let getPareintId = Category.find({
    id: parent_id
  }).exec();
  // 查询当前的id 1升序， -1为降序
  let allCategory = Category.find().sort({'id': -1}).exec();

  Promise.all([getCategory, getPareintId, allCategory]).then(
    (docs) => {
      let hasCategory = docs[0].length;
      let hasParentId = docs[1].length;
      let pid = docs[2][0].id; // 获取到最大的id值

      if(hasCategory){
        res.json({
          'status': 1,
          'msg': '已存在相应的类别'
        });
      } else if (parent_id!==0 && !hasParentId) {
        res.json({
          'status': 1,
          'msg': '不存在对应的父级类别'
        });
      } else {
        Category.create({
          id: pid + 1,
          parent_id,
          name,
          status: true,
          sort_order: '',
          create_time: now,
          update_time: now,
        }).then(
          (doc) => {
            res.json({
              'status': 0,
              'msg': ''
            });
          },
          (err) => {
            res.json({
              'status': 1,
              'msg': err.message
            });
          }
        );
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

// 3.修改品类名字
/* 
categoryId
categoryName
 */
router.post('/set_category_name.do', (req, res, next) => {
  let id = req.body.categoryId;
  let name = req.body.categoryName;
  let now = new Date();

  // 是否存在已有的名称
  let getCategory = Category.findOne({
    id
  }).exec();

  getCategory.then(
    (doc) => {
      if(doc){
        // 先找找同级下有没有同名称的
        let parent_id = doc.parent_id;
        Category.find({
          parent_id,
          name
        }).then(
          (docs) => {
            if(docs.length){
              res.json({
                'status': 1,
                'msg': '同父级下已存在相同名称'
              });
            }else{
              doc.name = name;
              doc.status = doc.status === 'TRUE' ? true : false;
              doc.save().then(
                () => {
                  res.json({
                    'status': 0,
                    'msg': ''
                  });
                },
                (err) => {
                  res.json({
                    'status': 1,
                    'msg': err.message
                  });
                }
              );
            }
          },
          (err) => {
            res.json({
              'status': 1,
              'msg': err.message
            });
          }
        );
      } else {
        res.json({
          'status': 1,
          'msg': '无此类别'
        });
      }
    }
  ).catch((err) => {
    res.json({
      'status': 1,
      'msg': err.message
    });
  });
});

// 4.获取当前分类id及递归子节点categoryId
// categoryId
router.post('/get_deep_category.do', (req, res, next) => {
  let id = parseInt(req.body.categoryId, 10) || 0;

  Category.find({
    $or: [
      {id},{parent_id:id}
    ]
  }, {
    "id":1,
    "parent_id":1,// 父类别id当id=0时说明是根节点,一级类别
    "name":1,
    "status":1, // 类别状态true-正常,false-已废弃
    "sort_order": 1
  }).then(
    (docs) => {
      if(docs.length){
        res.json({
          status: 0,
          msg: '',
          data: docs
        });
      } else {
        res.json({
          status: 1,
          msg: '没找到对应的ID信息~',
          data: ''
        });
      }
    }
  ).catch(
    (err) => {
      res.json({
        status: 1,
        msg: err.message,
        data: ''
      });
    }
  );
});

module.exports = router;