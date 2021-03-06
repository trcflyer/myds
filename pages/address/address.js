// page/component/new-pages/user/address/address.js
var app = getApp()
const getUserByUserIdServlet = require('../../httpconfig').getUserByUserIdServlet
const updateUserInformationServlet = require('../../httpconfig').updateUserInformationServlet
Page({
  data:{
    pageFrom:'',
    address:{
      point: '',
      name:'',
      phone:'',
      detail:'',
      currentInput:0
      
    }
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;
    this.setData({
      pageFrom: options.from,
    });
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function (res) {
        self.setData({
          address: res.data
        })
      }
    })
  },

  formSubmit(){
    var self = this;
    if(self.data.address.name && self.data.address.phone && self.data.address.detail){
      // wx.setStorage({
      //   key: 'address',
      //   data: self.data.address,
      //   success(){
      //     wx.navigateBack();
      //   }
      // })
      self.updateUserByUserIdServlet();
    }else{
      wx.showModal({
        title:'提示',
        content:'请填写完整资料',
        showCancel:false
      })
    }
  },
  bindName(e){
    this.setData({
      'address.name' : e.detail.value,
      currentInput:1,
    })
  },
  bindPhone(e){
    this.setData({
      'address.phone' : e.detail.value,
      currentInput:2
    })
  },
  bindDetail(e){
    this.setData({
      'address.detail' : e.detail.value,
      currentInput:3
    })
  },
  bindFocusName(e){
    this.setData({
      currentInput: 1
    })
  },
  bindFocusPhone(e) {
    this.setData({
      currentInput: 2
    })
  },
  bindFocusDetail(e) {
    this.setData({
      currentInput: 3
    })
  },
  /**
   * 更新用户保存的地址数据
   */
  updateUserByUserIdServlet: function () {
    let that = this;
    if ('my' != that.data.pageFrom){
      wx.setStorage({
        key: 'address',
        data: that.data.address,
        success() {
          wx.navigateBack();
        }
      })
    }else{
      var obj = wx.getStorageSync('user');
      wx.request({
        url: updateUserInformationServlet,
        method: 'POST',
        data: {
          'userid': obj.id,
          'name': that.data.address.name,
          'phone': that.data.address.phone,
          'address': that.data.address.detail
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          console.info("[address][http][updateUserInformationServlet][success]");
          wx.setStorage({
            key: 'address',
            data: that.data.address,
            success() {
              wx.navigateBack();
            }
          })
        },
        fail: function ({ errMsg }) {
          console.info("[address][http][updateUserInformationServlet][fail]:" + errMsg);
        }
      })
    }
   
  },
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function () {
    var obj = wx.getStorageSync('user');
    return {
      title: '哇，发现一个好玩的应用，赶快来体验吧',
      path: '/pages/index/index?fromId=' + obj.openid,
      imageUrl: '../../image/shareImage.jpg'
    }
  },
})