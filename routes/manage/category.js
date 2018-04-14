var express = require('express');
var router = express.Router();

// 1.获取品类子节点(平级)
// categoryId(default=0)
router.post('/get_category.do', (req, res, next) => {
  res.json({
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
  });
});

// 2.增加节点
// parentId(default=0)
// categoryName
router.post('/add_category.do', (req, res, next) => {
  res.json({
    "status": 0,
    "msg": "添加品类成功"
  });
});

// 3.修改品类名字
/* 
categoryId
categoryName
 */
router.post('/set_category_name.do', (req, res, next) => {
  res.json({
    "status": 0,
    "msg": "更新品类名字成功"
  });
});

// 4.获取当前分类id及递归子节点categoryId
// categoryId
router.post('/get_deep_category.do', (req, res, next) => {
  res.json({
    "status": 0,
    "data": [
        100009,
        100010,
        100001,
        100006,
        100007,
        100008
    ]
  });
});

module.exports = router;