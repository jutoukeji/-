var data = {
  "categoryList": [
    {
      "category_id": 0,
      "category_name": "热销"
    },
    {
      "category_id": 1,
      "category_name": "家常菜"
    },
    {
      "category_id": 2,
      "category_name": "飘香干锅"
    },
    {
      "category_id": 3,
      "category_name": "田园时蔬"
    },
    {
      "category_id": 4,
      "category_name": "美味小炒"
    },
    {
      "category_id": 5,
      "category_name": "饮料"
    }
  ],
  "pdtList": [
    {
      "pdt_id": "201811170001",
      "category_id": 0,
      "category_pid": 2,
      "category_name": "热销",
      "name": "剁椒鱼头",
      "price": 12.5,
      "stock": 100,
      "sale_num": 15,
      "likes": 8,
      "img": "0"
    },
    {
      "pdt_id": "201811170002",
      "category_id": 0,
      "category_pid": 2,
      "category_name": "热销",
      "name": "牛腩炖胡萝卜",
      "price": 18,
      "stock": 100,
      "sale_num": 25,
      "likes": 12,
      "img": "1"
    },
    {
      "pdt_id": "201811170007",
      "category_id": 0,
      "category_pid": 5,
      "category_name": "热销",
      "name": "红烧土豆片",
      "price": 14,
      "stock": 100,
      "sale_num": 17,
      "likes": 14,
      "img": "2"
    },
    {
      "pdt_id": "201811170003",
      "category_id": 1,
      "category_name": "家常菜",
      "name": "清炒莴笋丝",
      "price": 11,
      "stock": 100,
      "sale_num": 5,
      "likes": 1,
      "img": "3"
    },
    {
      "pdt_id": "201811170002",
      "category_id": 2,
      "category_name": "飘香干锅",
      "name": "牛腩炖胡萝卜",
      "price": 18,
      "stock": 100,
      "sale_num": 25,
      "likes": 12,
      "img": "4"
    },
    {
      "pdt_id": "201811170001",
      "category_id": 2,
      "category_name": "飘香干锅",
      "name": "剁椒鱼头",
      "price": 12.5,
      "stock": 100,
      "sale_num": 15,
      "likes": 8,
      "img": "5"
    },
    {
      "pdt_id": "201811170005",
      "category_id": 3,
      "category_name": "田园时蔬",
      "name": "西红柿炒鸡蛋",
      "price": 12,
      "stock": 100,
      "sale_num": 65,
      "likes": 23,
      "img": "6"
    },
    {
      "pdt_id": "201811170006",
      "category_id": 4,
      "category_name": "美味小炒",
      "name": "农家小炒肉",
      "price": 23,
      "stock": 100,
      "sale_num": 19,
      "likes": 9,
      "img": "7"
    },
    {
      "pdt_id": "201811170007",
      "category_id": 5,
      "category_name": "饮料",
      "name": "红烧土豆片",
      "price": 14,
      "stock": 100,
      "sale_num": 17,
      "likes": 14,
      "img": "8"
    },
    {
      "pdt_id": "201811170008",
      "category_id": 5,
      "category_name": "饮料",
      "name": "四季豆炒肉",
      "price": 14,
      "stock": 100,
      "sale_num": 55,
      "likes": 19,
      "img": "9"
    },
    {
      "pdt_id": "201811170009",
      "category_id": 5,
      "category_name": "饮料",
      "name": "茄子煲",
      "price": 19,
      "stock": 100,
      "sale_num": 89,
      "likes": 45,
      "img": "10"
    },
    {
      "pdt_id": "201811170010",
      "category_id": 5,
      "category_name": "饮料",
      "name": "丝瓜炒蛋",
      "price": 11,
      "stock": 100,
      "sale_num": 5,
      "likes": 2,
      "img": "11"
    }
  ],
  "orderList": [{
    "order_id": "200812011329001",
    "update_time": "2018-12-02 13:30:28",
    "pdt_list": [{ 
        "pdt_id": "201811170010", "name": "丝瓜炒蛋" 
      }, {
        "pdt_id": "201811170009", "name": "茄子煲" 
      }],
    "price": 30,
    "status": 1
  }, {
      "order_id": "200812011329002",
      "update_time": "2018-12-02 13:30:28",
      "pdt_list": [{
        "pdt_id": "201811170009", "name": "茄子煲"
      }, {
          "pdt_id": "201811170010", "name": "丝瓜炒蛋"
      }],
      "price": 30,
      "status": 2
    }, {
      "order_id": "200812011329003",
      "update_time": "2018-12-02 13:30:28",
      "pdt_list": [{
        "pdt_id": "201811170005", "name": "西红柿炒鸡蛋"
      }, {
        "pdt_id": "201811170010", "name": "丝瓜炒蛋"
      }],
      "price": 30,
      "status": 3
    }]
}

module.exports = data