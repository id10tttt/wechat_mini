import { get, post, put, deletes } from '../utils/network.js'
var app = getApp()

function get_wx_mini_order_trade(data) {
  return post(`${app.globalData.apiUrl}/api/sand/wechat/order/pay`, data)
}

module.exports = {
  get_wx_mini_order_trade
}
