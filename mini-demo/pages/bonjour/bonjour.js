//bonjour.js
const util = require('../../utils/util.js');
import QRCode from '../../utils/weapp-qrcode.js'
import precreate_order_api from "../../api/precreate_order.js"
const app = getApp();

Page({
  data: {
    order_amount: 0
  },
  onLoad: function () {
    
  },

  inputHandler: function (e) {
    var value = e.detail.value
    this.setData({
      order_amount: value
    })
  },
  tapHandler: function(){
    let order_code = util.randomNumber();;
    let order_data = {
      'pay_tool': '0403',
      'order_amount': this.data.order_amount,
      'order_code': order_code,
      'subject': '91T平台订单: ' + order_code,
      'body': '91T平台订单: ' + order_code
    }
    precreate_order_api.get_precreate_code_qrcode(order_data).then(res=>{
      let sand_qrcode = res.sand_data.body.qrCode;
      new QRCode('payment_qrcode', {
        text: sand_qrcode,
        width: 200,
        height: 200,
        padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
        correctLevel: QRCode.CorrectLevel.H, // 二维码可辨识度
        callback: (res) => {
          console.log(res.path)
        }
      })
    })
  }
})
