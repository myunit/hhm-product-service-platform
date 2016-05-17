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
  request.CId = obj.CId;
  request.ChildCId = obj.ChildCId;
  request.Page = obj.pageId;
  request.PageSize = obj.pageSize;
  request.priceFrom = -1;
  request.priceTo = -1;
  request.UId = obj.userId;
  request.PCDCode = obj.pcdCode;
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

exports.searchProductXML = function (obj) {
  var xmlObj = [{
    ItemForSearch: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        keyWord: obj.key
      },
      {
        uId: obj.userId
      },
      {
        page: obj.pageId
      },
      {
        pageSize: obj.pageSize
      },
      {
        PCDCode: obj.pcdCode
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getSalesProductXML = function (obj) {
  var xmlObj = [{
    ItemForBargin: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        cid: 0
      },
      {
        uId: obj.userId
      },
      {
        page: obj.pageId
      },
      {
        pageSize: obj.pageSize
      },
      {
        PCDCode: obj.pcdCode
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getNewProductXML = function (obj) {
  var request = {};
  request.Page = obj.pageId;
  request.PageSize = obj.pageSize;
  request.priceFrom = -1;
  request.priceTo = -1;
  request.UId = obj.userId;
  request.SearchType = 1;
  request.PCDCode = obj.pcdCode;
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

exports.getProductDetailXML = function (obj) {
  var xmlObj = [{
    ItemForDetails: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        productSysNo: obj.productId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getRecommendXML = function (obj) {
  var xmlObj = [{
    GetAllColumnsRecommend: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        recId: obj.recommendId
      },
      {
        recName: ''
      },
      {
        recStatus: 2
      },
      {
        PCDCode: obj.pcdCode
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getCarouselXML = function (obj) {
  var xmlObj = [{
    GetAllCarouselPictureList: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        recId: obj.carouselId || 0
      },
      {
        recName: ''
      },
      {
        recStatus: 2
      },
      {
        PCDCode: obj.pcdCode
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getRecommendProductXML = function (obj) {
  var xmlObj = [{
    GetColumnsRecommendBySysNo: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        currentPage: obj.pageId
      },
      {
        pageSize: obj.pageSize
      },
      {
        recId: obj.recommendId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getGroupProductXML = function (obj) {
  var request = {};
  request.CId = 0;
  request.ChildCId = 0;
  request.Page = obj.pageId;
  request.PageSize = obj.pageSize;
  request.priceFrom = -1;
  request.priceTo = -1;
  request.UId = obj.userId;
  request.isCombineProduct = true;
  request.PCDCode = obj.pcdCode;
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

exports.getCombinationSingleXML = function (obj) {
  var xmlObj = [{
    GetSkusByCombinationSkuSysNo: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        skuSysNo: obj.skuId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.isFavoriteProductXML = function (obj) {
  var xmlObj = [{
    IsFavorieItemByProductSysNo: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerNo: obj.userId
      },
      {
        productSysNo: obj.productId
      }
    ]
  }];

  return xml(xmlObj, true);
};
