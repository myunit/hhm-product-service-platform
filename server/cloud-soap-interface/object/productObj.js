/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var xml = require('xml');

exports.getCategoryXML = function (obj) {
  var xmlObj = [{
    GetCategoryTree: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        categorySysNo: obj.categoryId
      }
    ]
  }];

  return xml(xmlObj, true);
};
