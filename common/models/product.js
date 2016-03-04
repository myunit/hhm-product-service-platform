/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var loopback = require('loopback');
var ProductIFS = require('../../server/cloud-soap-interface/product-ifs');

module.exports = function (Product) {
  Product.getApp(function (err, app) {

    var productIFS = new ProductIFS(app);


  });
};
