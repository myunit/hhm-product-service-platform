/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var loopback = require('loopback');
var ProductIFS = require('../../server/cloud-soap-interface/product-ifs');
var MKTIFS = require('../../server/cloud-soap-interface/mkt-ifs');

module.exports = function (Product) {
  Product.getApp(function (err, app) {

    var productIFS = new ProductIFS(app);
    var mktIFS = new MKTIFS(app);

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
          var product = res.Datas;
          product.forEach(function (item, index) {
            if (item.SkuList.length > 1) {
              var max = item.SkuList[0].Price, min = max;
              item.SkuList.forEach(function (sItem, sIndex) {
                if (sItem.Price > max) {
                  max = sItem.Price;
                }

                if (sItem.Price < min) {
                  min = sItem.Price;
                }
              });
              item.MaxPrice = max;
              item.MinPrice = min;
            }
          });
          cb(null, {status: 1, count: res.Counts, product: product, msg: ''});
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
              '获取分类下的商品 {"userId":int,"CId":int,"ChildCId":int,"pageId":int,"pageSize":int}',
              'CId:父类Id, ChildCId:子类Id'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-category-product', verb: 'post'}
      }
    );

    //搜索商品
    Product.searchProduct = function (data, cb) {
      productIFS.searchProduct(data, function (err, res) {
        if (err) {
          console.log('searchProduct err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('searchProduct result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, count: res.Counts, product: res.Datas, msg: ''});
        }
      });
    };

    Product.remoteMethod(
      'searchProduct',
      {
        description: [
          '搜索商品.返回结果-status:操作结果 0 失败 1 成功, count:总数, product:商品信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '搜索商品 {"userId":int,"key":"string","pageId":int,"pageSize":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/search-product', verb: 'post'}
      }
    );

    //获取特卖商品
    Product.getSalesProduct = function (data, cb) {
      productIFS.getSalesProduct(data, function (err, res) {
        if (err) {
          console.log('getSalesProduct err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getSalesProduct result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, count: res.Counts, product: res.Datas, msg: ''});
        }
      });
    };

    Product.remoteMethod(
      'getSalesProduct',
      {
        description: [
          '获取特卖商品.返回结果-status:操作结果 0 失败 1 成功, count:总数, product:商品信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取特卖商品 {"userId":int,"pageId":int,"pageSize":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-sales-product', verb: 'post'}
      }
    );

    //获取新品商品
    Product.getNewProduct = function (data, cb) {
      productIFS.getNewProduct(data, function (err, res) {
        if (err) {
          console.log('getNewProduct err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getNewProduct result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, count: res.Counts, product: res.Datas, msg: ''});
        }
      });
    };

    Product.remoteMethod(
      'getNewProduct',
      {
        description: [
          '获取新品商品.返回结果-status:操作结果 0 失败 1 成功, count:总数, product:商品信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取新品商品 {"userId":int,"pageId":int,"pageSize":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-new-product', verb: 'post'}
      }
    );

    //获取秒杀商品
    Product.getSecKillProduct = function (data, cb) {
      mktIFS.getSecKillProduct(data, function (err, res) {
        if (err) {
          console.log('getSecKillProduct err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getSecKillProduct result err: ' + res.ErrorInfo);
          cb(null, {status: 0, msg: res.ErrorInfo});
        } else {
          var product = JSON.parse(res.ResultStr);
          cb(null, {status: 1, count: product.length, product: product, msg: ''});
        }
      });
    };

    Product.remoteMethod(
      'getSecKillProduct',
      {
        description: [
          '获取秒杀商品.返回结果-status:操作结果 0 失败 1 成功, count:总数, product:商品信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取秒杀商品 {"userId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-secKill-product', verb: 'post'}
      }
    );

  });
};
