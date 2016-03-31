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

ProductIFS.prototype.searchProduct = function (obj, callback) {
  var Product = this.DS.models.Product;
  var xml = productObj.searchProductXML(obj);
  Product.ItemForSearch(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ItemForSearchResult));
    } catch (e) {
      console.error('ProductIFS searchProduct Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ProductIFS.prototype.getSalesProduct = function (obj, callback) {
  var Product = this.DS.models.Product;
  var xml = productObj.getSalesProductXML(obj);
  Product.ItemForBargin(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ItemForBarginResult));
    } catch (e) {
      console.error('ProductIFS getSalesProduct Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ProductIFS.prototype.getNewProduct = function (obj, callback) {
  var Product = this.DS.models.Product;
  var xml = productObj.getNewProductXML(obj);
  Product.ItemForList(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ItemForListResult));
    } catch (e) {
      console.error('ProductIFS getNewProduct Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ProductIFS.prototype.getProductDetail = function (obj, callback) {
  var Product = this.DS.models.Product;
  var xml = productObj.getProductDetailXML(obj);
  Product.ItemForDetails(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ItemForDetailsResult));
    } catch (e) {
      console.error('ProductIFS getProductDetail Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ProductIFS.prototype.getRecommend = function (obj, callback) {
  var Product = this.DS.models.Product;
  var xml = productObj.getRecommendXML(obj);
  Product.GetAllColumnsRecommend(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllColumnsRecommendResult));
    } catch (e) {
      console.error('ProductIFS getRecommend Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ProductIFS.prototype.getRecommendProduct = function (obj, callback) {
  var Product = this.DS.models.Product;
  var xml = productObj.getRecommendProductXML(obj);
  Product.GetColumnsRecommendBySysNo(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetColumnsRecommendBySysNoResult));
    } catch (e) {
      console.error('ProductIFS getRecommendProduct Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ProductIFS.prototype.getGroupProduct = function (obj, callback) {
  var Product = this.DS.models.Product;
  var xml = productObj.getGroupProductXML(obj);
  Product.ItemForList(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ItemForListResult));
    } catch (e) {
      console.error('ProductIFS getCategoryProduct Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ProductIFS.prototype.getCombinationSingle = function (obj, callback) {
  var Product = this.DS.models.Product;
  var xml = productObj.getCombinationSingleXML(obj);
  Product.GetSkusByCombinationSkuSysNo(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetSkusByCombinationSkuSysNoResult));
    } catch (e) {
      console.error('ProductIFS getCombinationSingle Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ProductIFS.prototype.isFavoriteProduct = function (obj, callback) {
  var Product = this.DS.models.Product;
  var xml = productObj.isFavoriteProductXML(obj);
  Product.IsFavorieItemByProductSysNo(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.IsFavorieItemByProductSysNoResult));
    } catch (e) {
      console.error('ProductIFS isFavoriteProduct Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};
