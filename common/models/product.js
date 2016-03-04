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

  });
};
