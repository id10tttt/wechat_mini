//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Ce\'st la vain',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onShow: function() {

  },
  switchTab: function(url, callback) {
    if (callback) {
      callback();
    }
    // 调用微信的switchTab切换tabbar
    wx.switchTab({
      url: url
    });
  },

  onClick(event) {
    wx.showToast({
      title: `点击标签 ${event.detail + 1}`,
      icon: 'none',
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../payment/payment'
    })
  },
  bindViewMottoTap: function() {
    wx.navigateTo({
      url: '../bonjour/bonjour'
    })
  },
  bindViewCityTap: function() {
    wx.navigateTo({
      url: '../camera/camera'
    })
  },
  bindViewProvinceTap: function() {
    wx.navigateTo({
      url: '../werun/werun'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})