// pages/orderbuy/orderbuy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    totalPrice: 0,
    payType: 'offline' // 支付方式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dataList = Object.values(wx.getStorageSync("shopCart"));
    let tprice = 0;
    dataList.forEach(item => {
      tprice += item.price * item.num;
    })
    this.setData({
      cartList: dataList,
      totalPrice: tprice
    });
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

  /**
   * 选择支付方式
   */
  checkPayType: function(e){
    this.setData({
      payType: e.currentTarget.dataset.paytype
    });
  }
})