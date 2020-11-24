import { get, post, put, deletes } from '../utils/network.js'
var app = getApp()

function wechat_message_decrypt(data) {
  return post(`${app.globalData.apiUrl}/api/wechat/message/decrypt`, data)
}

module.exports = {
  wechat_message_decrypt
}
