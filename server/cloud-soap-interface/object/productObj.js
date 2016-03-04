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

exports.getCategoryProductXML = function (obj) {
  var request = {};
  request.FCId = obj.categoryId;
  request.CId = obj.categoryId;
  request.ChildCId = obj.categoryId;
  request.Page = obj.pageId;
  request.PageSize = obj.pageSize;
  request.priceFrom = -1;
  request.priceTo = -1;
  request.UId = obj.userId;
  var xmlObj = [{
    ItemForList: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        request: JSON.stringify(request)
      }
    ]
  }];

  return xml(xmlObj, true);
};
