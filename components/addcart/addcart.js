const util = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pdtItem: {
      type: Object,
      value: null,
      observer: function (newVal, oldVal, changedPath){
        this.updateCartNum(newVal, this.data.shopCart);
      }
    },
    shopCart: {
      type: Object,
      value: {},
      observer: function (now, old, changedPath){
        this.updateCartNum(this.data.pdtItem, now);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cartNum: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateCartNum: function(pdt, shopCart){
      let cartNum = 0, pdtCart = shopCart[pdt.pdt_id];
      if (pdtCart) {
        cartNum = pdtCart.num
      }
      this.setData({
        cartNum: cartNum
      });
    },
    reduceCart: function(e){
      this.triggerEvent('reducecart', this.data.pdtItem, {});
    },
    addCart: function(e){
      let detail = Object.assign(this.data.pdtItem);
      detail.nodeId = e.currentTarget.id;
      this.triggerEvent('addcart', detail, {});
    }
  },
  attached: function(){
    
  }
})
