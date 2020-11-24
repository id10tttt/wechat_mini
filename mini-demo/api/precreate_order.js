import { get, post, put, deletes } from '../utils/network.js'
var app = getApp()

function get_precreate_code_qrcode(data){
  return post(`${app.globalData.apiUrl}/api/sand/pay/order/create`, data)
}

module.exports = {
  get_precreate_code_qrcode
}
