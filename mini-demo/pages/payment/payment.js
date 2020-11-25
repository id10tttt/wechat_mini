//payment.js
const util = require('../../utils/util.js');
import QRCode from '../../utils/weapp-qrcode.js'
import wx_mini from "../../api/wx_mini_order.js"
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_amount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  inputHandler: function (e) {
    var value = e.detail.value
    this.setData({
      order_amount: value
    })
  },
  tapHandler: function(){
    let that = this;
    wx.login({
      success: function (login_res) {
        if (login_res.code){
          let order_code = util.randomNumber();
          let order_data = {
            'order_amount': that.data.order_amount,
            'order_code': order_code,
            'subject': '91T平台订单号: ' + order_code,
            'body': '91T平台订单号: ' + order_code,
            'user_id': login_res.code
          }

          wx_mini.get_wx_mini_order_trade(order_data).then(order_res => {
            if (order_res.code == 200){
              let sand_body_data = order_res.sand_data.body
              let sand_head_data = order_res.sand_data.head
              let wechat_credential = sand_body_data.credential
              let wechat_credential_json = JSON.parse(wechat_credential)
              let wechat_credential_params = JSON.parse(wechat_credential_json.params)

              if (wechat_credential_params) {
                wx.requestPayment({
                  timeStamp: wechat_credential_params.timeStamp,
                  nonceStr: wechat_credential_params.nonceStr,
                  package: wechat_credential_params.package,
                  signType: wechat_credential_params.signType,
                  paySign: wechat_credential_params.paySign,
                  success: function (pay_res) {
                    console.log('支付信息: ', pay_res)
                    // 保留当前页面，跳转到应用内某个页面，使用wx.nevigeteBack可以返回原页面
                    wx.navigateTo({
                      url: '../index/index'
                    })
                  },
                })
              }else{
                console.log('支付失败')
              }
            }else{
              console.log('支付失败')
            }
            })
            }
        }
      }
      )
  }
})
