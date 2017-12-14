// pages/logistics/logistics.js
const getCarrieInfoServlet = require('../../httpconfig').getCarrieInfoServlet
const hostUri = require('../../httpconfig').hostUri
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      number: 111,
      name: "华为P9手机",
      count: 23,
      status: '未支付',
      money: 67.99,
      btnName: "去付款",
      thumb: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1409687278,979007170&fm=26&gp=0.jpg'
    },
    indentid:'',//物流订单id
      logisticsList:[{},{},{}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      indentid: options.indent,
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
    this.getHttpCarrieInfoServlet();
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
  //获取物流
  getHttpCarrieInfoServlet: function () {
    let that = this;
    console.info(that.data.indentid);
    wx.request({
      url: getCarrieInfoServlet,
      method: 'POST',
      data: {
        'indentid': that.data.indentid
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.info(res.data);
        console.info("[logistics][http][getHttpCarrieInfoServlet][success]");
        that.setData({
          host: hostUri,
        });
      },
      fail: function ({ errMsg }) {
        console.info("[logistics][http][getHttpCarrieInfoServlet][fail]:" + errMsg);
      }
    })
  }
})