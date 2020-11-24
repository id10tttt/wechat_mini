let app = getApp()
import wechat_message_obj from "../../api/wx_message_decrypt.js"
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    werun_data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  parse_werun_step_list: function(stepInfoList) {
    for (let index in stepInfoList) {
      let time_stamp = stepInfoList[index].timestamp
      stepInfoList[index].datetime = util.timestampFormatDate(time_stamp)
    }
    return stepInfoList
  },
  tapHandler: function() {
    let that = this
    wx.login({
      success: function(login_res) {
        wx.getWeRunData({
          success(werun_res) {
            let encryptedData = werun_res.encryptedData;
            let iv = werun_res.iv;
            let payload_data = {
              'encrypted_data': encryptedData,
              'iv': iv,
              'code': login_res.code
            }
            wechat_message_obj.wechat_message_decrypt(payload_data).then(res => {
              let wechat_message = res.wechat_message
              if (wechat_message) {
                that.setData({
                  werun_data: that.parse_werun_step_list(wechat_message.stepInfoList)
                })
              }
            })
          }
        })
      }
    })
  }
})