/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var util = require('util');
var productObj = require('./object/productObj');

var ProductIFS = function (app) {
  this.DS = app.datasources.ProductSoap;
  Object.call(this);
};
util.inherits(ProductIFS, Object);
exports = module.exports = ProductIFS;

ProductIFS.prototype.getCategory = function (obj, callback) {
  var Product = this.DS.models.Product;
  var xml = productObj.getCategoryXML(obj);
  Product.GetCategoryTree(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetCategoryTreeResult));
    } catch (e) {
      console.error('ProductIFS getCategory Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ProductIFS.prototype.getCategoryProduct = function (obj, callback) {
  var Product = this.DS.models.Product;
  var xml = productObj.getCategoryProductXML(obj);
  Product.ItemForList(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ItemForListResult));
    } catch (e) {
      console.error('ProductIFS getCategoryProduct Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};
