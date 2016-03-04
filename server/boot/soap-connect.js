/**
 * @author qianqing
 * @create by 16-3-1
 * @description
 */
module.exports = function (app) {
  app.datasources.ProductSoap.once('connected', function () {
    console.log('Product interface is connected');
    app.datasources.ProductSoap.createModel('Product', {});
  });
};
