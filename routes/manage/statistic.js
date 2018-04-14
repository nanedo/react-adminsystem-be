var express = require('express');
var router = express.Router();

// 1.统计用户、商品、订单数量
router.get('/base_count.do', (req, res, next) => {
  res.json({
    "status": 0,
    "data": {
        userCount: 123,
        productCount: 456,
        orderCount: 789
    }
  });
});

module.exports = router;