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

    //获取商品分类
    Product.getCategory = function (data, cb) {
      productIFS.getCategory(data, function (err, res) {
        if (err) {
          console.log('getCategory err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getCategory result err: ' + res.ErrorInfo);
          cb(null, {status: 0, msg: res.ErrorInfo});
        } else {
          cb(null, {status: 1, category: JSON.parse(res.ResultStr), msg: ''});
        }
      });
    };

    Product.remoteMethod(
      'getCategory',
      {
        description: [
          '获取商品分类.返回结果-status:操作结果 0 失败 1 成功, category:分类信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取商品分类 {"categoryId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-category', verb: 'post'}
      }
    );

    //获取分类下的商品
    Product.getCategoryProduct = function (data, cb) {
      productIFS.getCategoryProduct(data, function (err, res) {
        if (err) {
          console.log('getCategoryProduct err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getCategoryProduct result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, count: res.Counts, product: res.Datas, msg: ''});
        }
      });
    };

    Product.remoteMethod(
      'getCategoryProduct',
      {
        description: [
          '获取分类下的商品.返回结果-status:操作结果 0 失败 1 成功, count:总数, product:商品信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取分类下的商品 {"userId":int,"categoryId":int,"pageId":int,"pageSize":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-category-product', verb: 'post'}
      }
    );

  });
};
