var express = require('express');
var router = express.Router();

// 1.产品list
// pageNum(default=1)
// pageSize(default=10)

router.get('/list.do', (req, res, next) => {
  res.json({
    "status": 0,
    "data": {
        "pageNum": 1,
        "pageSize": 10,
        "size": 2,
        "orderBy": null,
        "startRow": 1,
        "endRow": 2,
        "total": 2,
        "pages": 1,
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
        ],
        "firstPage": 1,
        "prePage": 0,
        "nextPage": 0,
        "lastPage": 1,
        "isFirstPage": true,
        "isLastPage": true,
        "hasPreviousPage": false,
        "hasNextPage": false,
        "navigatePages": 8,
        "navigatepageNums": [
            1
        ]
    }
  });
});

// 2.产品搜索
// productName
// productId
// pageNum(default=1)
// pageSize(default=10)
router.get('/search.do', (req, res, next) => {
  res.json({
    "status": 0,
    "data": {
        "pageNum": 1,
        "pageSize": 10,
        "size": 1,
        "orderBy": null,
        "startRow": 1,
        "endRow": 1,
        "total": 1,
        "pages": 1,
        "list": [
            {
                "id": 1,
                "categoryId": 3,
                "name": "iphone7",
                "subtitle": "双十一促销",
                "mainImage": "mainimage.jpg",
                "price": 7199.22
            }
        ],
        "firstPage": 1,
        "prePage": 0,
        "nextPage": 0,
        "lastPage": 1,
        "isFirstPage": true,
        "isLastPage": true,
        "hasPreviousPage": false,
        "hasNextPage": false,
        "navigatePages": 8,
        "navigatepageNums": [
            1
        ]
    }
  });
});

// 3.图片上传
/* 
<form name="form2" action="/manage/product/upload.do" method="post"  enctype="multipart/form-data">
    <input type="file" name="upload_file">
    <input type="submit" value="upload"/>
</form> 
*/
router.post('/upload.do', (req, res, next) => {
  res.json({
    "status": 0,
    "data": {
        "uri": "e6604558-c0ff-41b9-b6e1-30787a1e3412.jpg",
        "url": "http://img.happymmall.com/e6604558-c0ff-41b9-b6e1-30787a1e3412.jpg"
    }
  });
});

// 4.产品详情
// productId
router.get('/detail.do', (req, res, next) => {
  res.json({
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
  });
});

// 5.产品上下架
// productId
// status
router.get('/set_sale_status.do', (req, res, next) => {
  res.json({
    "status": 0,
    "data": "修改产品状态成功"
  });
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