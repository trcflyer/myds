//index.js
//获取应用实例
var app = getApp()
const topImagesPathListServlet = require('../../httpconfig').topImagesPathListServlet
const categoryListServlet = require('../../httpconfig').categoryListServlet
const productListByCategoryServlet = require('../../httpconfig').productListByCategoryServlet
const saveCarProductServlet = require('../../httpconfig').saveCarProductServlet
const hostUri = require('../../httpconfig').hostUri
Page({
  data: {
    userInfo: {},
    host: '',//主机网址
    imgUrls: [],//轮播图
    //tab 页面配置
    winWidth: 0,
    winHeight: 0,
    imageHeight: 0,
  },
  //事件处理函数
  prodectTopTap: function (event) {
    let that = this;
    var item = event.currentTarget.dataset.productId;
    if (item.type == '1') {
      wx.navigateTo({ url: '/pages/productdetail/productdetail?pid=' + item.productid })
    } else {
      wx.navigateTo({ url: '/pages/pointcenter/pointcenter' })
    }
  },
  //事件处理函数
  prodectTap: function (event) {
    var pId = event.currentTarget.dataset.productId;
    wx.navigateTo({ url: '/pages/productdetail/productdetail?pid=' + pId })

  },
  
  
  onShow: function () {
    this.setData({
      searchKey: ''
    });
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
  
  onLoad: function (options) {
    var that = this;
    var pageto = options.pageTo;
    if (pageto == 'pointcenter') {
      wx.navigateTo({ url: '/pages/pointcenter/pointcenter' })
      return;
    }
    var fromId = options.fromId;
    if (fromId) {
      console.info("[index][onLoad]是分享进入");
      wx.setStorageSync('fromId', fromId);//存储openid 
    }
    console.log('[index][onLoad]');

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    }),
      //获取系统信息
      wx.getSystemInfo({
        success: function (res) {
          var h = res.windowWidth * 5 / 7;
          that.setData({
            winWidth: res.windowWidth,
            winHeight: res.windowHeight,
            imageHeight: h,
          });
        }
      });
    that.gethttpTopImagesPathListServlet();
 
    that.getVenuesList();
    that.getChoiceList();
  },
  showLoading: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
  },
  cancelLoading: function () {
    wx.hideToast();
  },
  
  //获取顶部轮播图
  gethttpTopImagesPathListServlet: function () {
    let that = this;
    //that.showLoading();
    wx.request({
      url: topImagesPathListServlet,
      method: 'POST',
      success: function (res) {
        console.info("[index][http][topImagesPathListServlet][success]");
        console.log(res);
        that.cancelLoading();
        that.setData({
          host: hostUri,
          imgUrls: res.data.topImagesPathList,
        });
      },
      fail: function ({ errMsg }) {
        that.cancelLoading();
        console.info("[index][http][topImagesPathListServlet][fail]:" + errMsg);
      }
    })
  },
  
  //加入到购物车
  addShopCar: function (event) {
    var pId = event.currentTarget.dataset.productId;
    let that = this;
    var obj = wx.getStorageSync('user');
    that.showLoading();
    wx.request({
      url: saveCarProductServlet,
      method: 'POST',
      data: {
        'productid': pId,
        'amount': "1",
        'userid': obj.id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.info("[index][http][saveCarProductServlet][success]" + res);
        that.cancelLoading();
        wx.showToast({
          title: res.data.massage
        })
        app.setRefreshShopCar(true);//更新购物车
      },
      fail: function ({ errMsg }) {
        that.cancelLoading();
        that.hideModal();
        console.info("[index][http][saveCarProductServlet][fail]:" + errMsg);
      }
    })
  },
  getVenuesList:function(){
    let that = this;
    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/venues/venuesList',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          venuesItems: res.data.data
        })
        setTimeout(function () {
          that.setData({
            loadingHidden: true
          })
        }, 1500)
      }
    })
  },
  getChoiceList: function () {
    let that = this;
    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/goods/choiceList',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          choiceItems: res.data.data.dataList
        })
        setTimeout(function () {
          that.setData({
            loadingHidden: true
          })
        }, 1500)
      }
    })
  }
})
