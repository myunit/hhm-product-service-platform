/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var loopback = require('loopback');
var ProductIFS = require('../../server/cloud-soap-interface/product-ifs');
var MKTIFS = require('../../server/cloud-soap-interface/mkt-ifs');
var homeConfig = require('../../server/home-config');

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

    //获取推荐类目
    Product.getRecommend = function (data, cb) {
      productIFS.getRecommend(data, function (err, res) {
        if (err) {
          console.log('getRecommend err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getRecommend result err: ' + res.ErrorInfo);
          cb(null, {status: 0, msg: res.ErrorInfo});
        } else {
          var recommend = JSON.parse(res.ResultStr);
          recommend.forEach(function (item, index) {
            if (item.RecommendItems.length > 6) {
              item.RecommendItems.splice(6, item.RecommendItems.length-6);
            }
            item.type = 5;
          });
          cb(null, {status: 1, recommend: recommend, msg: ''});
        }
      });
    };

    Product.remoteMethod(
      'getRecommend',
      {
        description: [
          '获取推荐类目.返回结果-status:操作结果 0 失败 1 成功, count:总数, recommend:推荐信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取推荐类目 {"userId":int, "recommendId":int}',
              'recommendId:推荐类目id, 0全部'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-recommend', verb: 'post'}
      }
    );

    //获取商品详情
    Product.getProductDetail = function (data, cb) {
      productIFS.getProductDetail(data, function (err, res) {
        if (err) {
          console.log('getProductDetail err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getProductDetail result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          var product = res.ItemData;
          if (product.Skus.length > 1) {
            var max = product.Skus[0].Price, min = max;
            product.Skus.forEach(function (sItem, sIndex) {
              if (sItem.Price > max) {
                max = sItem.Price;
              }

              if (sItem.Price < min) {
                min = sItem.Price;
              }
            });
            product.MaxPrice = max;
            product.MinPrice = min;
          }
          cb(null, {status: 1, product: product, msg: ''});
        }
      });
    };

    Product.remoteMethod(
      'getProductDetail',
      {
        description: [
          '获取商品详情.返回结果-status:操作结果 0 失败 1 成功, product:商品信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取商品详情 {"userId":int,"productId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-product-detail', verb: 'post'}
      }
    );

    //获取首页配置信息
    Product.getHomeConfig = function (data, cb) {
      if (!data.project) {
        cb(null, {status: 0, msg: '参数错误'});
        return;
      }

      var home = homeConfig[data.project];
      if (home === undefined) {
        cb(null, {status: 0, msg: '配置不存在'});
      } else {
        productIFS.getRecommend({
          userId: data.userId,
          recommendId: 0
        }, function (err, res) {
          if (err) {
            console.log('getRecommendProduct err: ' + err);
            cb(null, {status: 0, msg: '操作异常'});
            return;
          }

          if (!res.IsSuccess) {
            console.error('getRecommendProduct result err: ' + res.ErrorInfo);
            cb(null, {status: 0, msg: res.ErrorInfo});
          } else {
            var recommend = JSON.parse(res.ResultStr);
            home.recommend = recommend;
            home.recommend.forEach(function (item, index) {
              if (item.RecommendItems.length > 6) {
                item.RecommendItems.splice(6, item.RecommendItems.length-6);
              }
              item.type = 5;
            });
            cb(null, {status: 1, home: home, msg: ''});
          }
        });
      }

    };

    Product.remoteMethod(
      'getHomeConfig',
      {
        description: ['获取首页配置信息.返回结果-status:操作结果 0 成功 -1 失败, home:首页信息, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取首页配置信息 {"userId":int, "project":"string"}',
              'project:项目名, 好好卖是hhm'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-home-config', verb: 'post'}
      }
    );

    //获取推荐类目下商品
    Product.getRecommendProduct = function (data, cb) {
      productIFS.getRecommendProduct(data, function (err, res) {
        if (err) {
          console.log('getRecommendProduct err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getRecommendProduct result err: ' + res.ErrorInfo);
          cb(null, {status: 0, msg: res.ErrorInfo});
        } else {
          var result = JSON.parse(res.ResultStr);
          cb(null, {status: 1, count: result.Total, product: result.ItemDescription, msg: ''});
        }
      });
    };

    Product.remoteMethod(
      'getRecommendProduct',
      {
        description: [
          '获取推荐类目下商品.返回结果-status:操作结果 0 失败 1 成功, count:总数, product:商品信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取推荐类目下商品 {"userId":int, "recommendId":int,"pageId":int, "pageSize":int}',
              'recommendId:推荐类目id, 0全部'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-recommend-product', verb: 'post'}
      }
    );

  });
};
