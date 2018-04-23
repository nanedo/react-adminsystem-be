var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../../models/service/user');
var FUser = require('../../models/front/user');
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

// 1.后台管理员登录
// String username,
// String password
router.post('/login.do', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  // 加密密码
  password = crypto.createHmac('sha256', password+'加密因子nanedo').digest('hex')

  // 这里只是简单检查，正常的检查应该还会有一大堆规则
  if(!username || !password){
    res.json({
        'status': 1,
        'msg': '用户名或者密码不正确'
    });
  } else {
      // 用户名可以跟密码一起查询的，没必要先查用户再判断密码
    User.findOne({
      username,
      password
    }, (err, doc) => {
        if(err){
            res.json({
                'status': 1,
                'msg': err.message
            });
        } else {
            if(doc){
                req.session.regenerate((err) => {
                    if(err){
                        res.json({
                            'status': 1,
                            'msg': '登录失败~',
                            'message': err.message
                        });
                    } else {
                        req.session.user = doc;
                        res.json({
                          'status': 0,
                          'msg': '登录成功',
                          'data': {
                              id: doc.id,
                              username: doc.username,
                              email: doc.email,
                              phone: doc.phone,
                              role: doc.role,
                              updateTime: doc.updateTime
                          }
                        });
                    }
                });
                
            } else {
                res.json({
                    'status': 1,
                    'msg': '用户名或者密码不正确~'
                });
            }
            
        }
    });
  }

});

// 后台管理员退出
router.post('/logout.do', (req, res, next) => {
  req.session.destroy((err) => {
    if(err){
        res.json({
            'status': 1,
            'msg': err.message
        });
    } else {
        // 清除 cookie
        res.clearCookie('Nanedo');
        res.json({
            'status': 0,
            'msg': '退出登录'
        });
    }
  });
});

// 2.用户列表
// pageSize(default=10)
// pageNum(default=1)
// key(default='') 查询参数
router.get('/list.do', (req, res, next) => {
  let page = parseInt(req.query.pageNum, 10) || 1;
  let pageSize = parseInt(req.query.pageSize, 10) || 10;
  let key = req.query.key || '';

  let skip = (page-1)*pageSize;
  let params = {
      role: 0
  };
  if(key){
     // 要在mongodb中搜索，需要先建立全文索引

    // 数据量较小时，考虑直接遍历搜索，而不是用全文索引
    // params.$text = {$search:key};
  }

  User.find(params).skip(skip).limit(pageSize).exec().then(
    (docs) =>{
      let list = [];
      if(docs && docs.length){
        // 是否需要过滤掉主用户
        // 需要隐藏信息
        docs.forEach((el, inx) => {
          if(key && el.username.indexOf(key) === -1){
          } else {
            list.push({
              "id":el.id,
              "username":el.username,
              // 前缀1位隐藏
              // 2位隐藏1位
              // 3位隐藏2位
              // 4位以上隐藏3位
              // ======================
              // 暂时只做3位以上的隐藏， 隐藏第2跟3位
              "email":el.email ? el.email.replace(/^(.)(\w{2})([^@]*)(@.*)/,'$1**$3$4') : '',
              "phone":el.phone ? el.phone.replace(/^(\d{3})....(.*)/,'$1****$2') : '',
              "role":el.role,
              "createTime":el.create_time,
              "updateTime":el.update_time
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



module.exports = router;