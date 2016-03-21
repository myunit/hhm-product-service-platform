/**
 * @author qianqing
 * @create by 16-3-4
 * @description
 */
var xml = require('xml');

exports.getSecKillProductXML = function (obj) {
  var xmlObj = [{
    GetAllSecKill: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerSysNo: obj.userId
      },
      {
        categorySysNo: -1
      },
      {
        productName: ''
      },
      {
        productGroupCode: ''
      },
      {
        skuCode: ''
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getSecKillProductDetailXML = function (obj) {
  var xmlObj = [{
    GetSecKillBySysNo: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerSysNo: obj.userId
      },
      {
        seckillSysNo: obj.productId
      }
    ]
  }];

  return xml(xmlObj, true);
};
