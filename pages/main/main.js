// pages/main/main.js
const app = getApp()
const data = require('../../data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: data.categoryList,
    curCategoryId: 0,
    dataList: [],
    curCategoryName: "热销",
    scrollTimer: null,
    lastScrollTime: 0,
    isShowCart: false,
    beforHidden: false, // 延迟关闭购物车详情前添加淡出样式
    delayHiddenCart: true, // 延迟关闭购物车详情
    scrollPostion: 'list_0',
    zoomIn: '', // 购物车动画class名称
    shopCartNum: 0, //购物车商品数量
    shopCartPrice: 0, //购物车商品总价格
    shopCart: {}, //购物车商品列表对象key为商品ID，value商品信息
    carts:[],
    hiddenList: {},
    isRunning: false,
    dynamicStyle: '',
    headHeight: 100,
    categoryNum: {}, // 购物车各类数量
    pdtDetail: {},
    delayHiddenDetail: true,
    flyImg: '',
    menuIsOpen: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setWatcher(this);
    var _this = this;
    let pdtList = data.pdtList;
    let list = [];
    let typeObj = {};
    pdtList.forEach(function (item) {
      if (!typeObj[item.category_id]) {
        item.isNewType = true;
        typeObj[item.category_id] = true;
      }
      item.unique = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      list.push(item);
    })
    _this.setData({
      dataList: list,
      shopCart: wx.getStorageSync("shopCart")
    });
    wx.createSelectorQuery().select(".header").boundingClientRect(rect => {
      _this.setData({
        headHeight: rect.height
      });
    }).exec();
  },

  watch: {
    shopCart: {
      handler(obj) {
        let shopCartNum = 0, shopCartPrice = 0, hiddenList = {};
        let cartList = Object.values(obj);
        let cateogryNumObj = {};
        cartList.forEach(item => {
          shopCartNum += item.num;
          shopCartPrice += item.price * item.num;
          hiddenList[item.pdt_id] = item.num > 0 ? true : false;
          if (!cateogryNumObj[item.category_id]){
            cateogryNumObj[item.category_id] = 0;
          }
          cateogryNumObj[item.category_id] += item.num;
        });
        this.setData({
          shopCartNum: shopCartNum,
          shopCartPrice: shopCartPrice,
          hiddenList: hiddenList,
          carts: cartList,
          isShowCart: cartList.length == 0 ? false : this.data.isShowCart,
          cateogryNum: cateogryNumObj
        });
        wx.setStorageSync("shopCart", obj);
      },
      deep: false
    },
    isShowCart: function(val, oldVal){
      if(val === oldVal) return;
      let that = this;
      if (!val){
        that.setData({ beforHidden: true});
        setTimeout(function(){
          that.setData({
            delayHiddenCart: !val,
            beforHidden: false
          });
        }, 300);
      } else {
        that.setData({delayHiddenCart: !val});
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isShowCart: false,
      delayHiddenCart: true,
      delayHiddenDetail: true
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  switchType: function(event){
    let dataset = event.currentTarget.dataset;
    this.setData({
      scrollPostion: "list_" + dataset.cid,
      curCategoryId: dataset.cid,
      curCategoryName: dataset.cname
    })
  },
  /**
   * 监控列表滚动
   */
  scrollEvent: function (event){
    let that = this;
    // scroll 节流
    let nowTime = new Date().getTime();
    if (that.data.scrollTimer) {
      clearTimeout(that.data.scrollTimer);
      that.data.scrollTimer = null;
    }
    if (that.data.lastScrollTime) {
      let diff = 200 - (nowTime - that.data.lastScrollTime);
      if (diff >= 0) {
        that.data.scrollTimer = setTimeout(function () {
          that.execScroll(event.detail);
        }, diff);
      } else {
        that.execScroll(event.detail);
      }
    } else {
      that.execScroll(event.detail);
    }
  },
  execScroll: function(detail){
    let that = this;
    that.setData({
      lastScrollTime: new Date().getTime()
    });
    const query = wx.createSelectorQuery();
    let cItemList = query.selectAll(".category-title");
    cItemList.boundingClientRect(rects => {
      for(let i = 0; i < rects.length; i++){
        if (rects[i].top > this.data.headHeight) {
          let temp = i == 0 ? rects[i] : rects[i - 1];
          that.setData({
            curCategoryId: temp.dataset.cid,
            curCategoryName: temp.dataset.cname
          })
          break;
        }
      }
    }).exec();
  },
  /**
   * 添加购物车
   */
  addCart: function(e){
    let that = this;
    let dataset = e.currentTarget.dataset;
    let cart = this.data.shopCart;
    let pId = dataset.pid;
    if (cart[pId]) {
      cart[pId]['num']++;
    } else {
      cart[pId] = {
        "num": 1,
        "pdt_id": pId,
        "category_id": dataset.cid,
        "name": dataset.name,
        "price": dataset.price
      };
    }
    that.setData({
      shopCart: cart,
      zoomIn: 'zoomIn animated'
    });
    setTimeout(function(){
      that.setData({
        zoomIn: ''
      });
    }, 300);
  },
  /**
   * 添加购物车动画效果
   */
  addCartFly: function (e) { 
    let that = this;
    const query = wx.createSelectorQuery();
    let curEle = query.select("#" + e.currentTarget.id);
    curEle.boundingClientRect(rect => {
      if (that.data.isRunning == false) {
        // 购物车图形出现与初始定位
        let dynamicStyle = 'display:block;left:' + rect.left + 'px;top:' + (rect.top + rect.height/2) + 'px';
        that.setData({
          dynamicStyle: dynamicStyle,
          isRunning: true,
          flyImg: e.currentTarget.dataset.pid
        });
        let cycleEle = query.select(".cycle");
        cycleEle.boundingClientRect(rt => {
          let offsetX = '-' + (rect.left - rt.left - rt.width / 2) + 'px';
          let offsetY = (rt.top - rect.top + 8) +'px';
          setTimeout(function () {
            that.setData({
              offsetX: offsetX,
              offsetY: offsetY
            });
          }, 50);
          setTimeout(function () {
            that.setData({
              dynamicStyle: '',
              offsetX: '0',
              offsetY: '0',
              isRunning: false
            });
            that.addCart(e);
          }, 510);
        }).exec();
      }
    }).exec();
  },
  /**
   * 删除购物车
   */
  reduceCart: function(e){
    let dataset = e.currentTarget.dataset;
    let cart = this.data.shopCart;
    let pId = dataset.pid;
    if (cart && cart[pId]) {
      if (cart[pId]['num'] > 0) {
        cart[pId]['num']--;
      }
      if (cart[pId]['num'] <= 0) {
        //商品数量为0，则清空当前商品的信息
        delete cart[pId];
      }
      this.setData({
        shopCart: cart
      });
    }
  },
  /**
   * 显示/隐藏购物车详情
   */
  showCartList: function(){
    if (this.data.shopCartNum <= 0 || !this.data.delayHiddenDetail){
      return;
    }
    this.setData({
      isShowCart: !this.data.isShowCart
    });
  },
  clearShopCart: function(){
    this.setData({
      shopCart: {}
    });
  },
  /**
   * 查看购产品详情
   */
  showPdtDetail: function(e){
    let pdtDetail = this.data.dataList[e.currentTarget.dataset.index];
    this.setData({
      delayHiddenDetail: false,
      pdtDetail: pdtDetail
    });
  },
  /**
   * 关闭购产品详情
   */
  closePdtDetail: function () {
    let that = this;
    that.setData({ beforHidden: true });
    setTimeout(function () {
      that.setData({
        delayHiddenDetail: true,
        beforHidden: false
      });
    }, 300);
  },
  /**
   * 下单购买
   */
  orderBuy:function(){
    if(this.data.shopCartNum <= 0) return;
    wx.navigateTo({
      url: '../orderbuy/orderbuy?id=1'
    })
  },
  /**
   * 打开、关闭悬浮菜单
   */
  openMenu: function(){
    this.setData({
      menuIsOpen: !this.data.menuIsOpen
    });
  }
})