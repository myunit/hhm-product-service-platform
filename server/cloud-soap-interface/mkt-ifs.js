/**
 * @author qianqing
 * @create by 16-3-4
 * @description
 */
var util = require('util');
var mktObj = require('./object/mktObj');

var MKTIFS = function (app) {
  this.DS = app.datasources.MKTSoap;
  Object.call(this);
};
util.inherits(MKTIFS, Object);
exports = module.exports = MKTIFS;

MKTIFS.prototype.getSecKillProduct = function (obj, callback) {
  var MKT = this.DS.models.MKT;
  var xml = mktObj.getSecKillProductXML(obj);
  MKT.GetAllSecKill(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllSecKillResult));
    } catch (e) {
      console.error('MKTIFS getSecKillProduct Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

MKTIFS.prototype.getSecKillProductDetail = function (obj, callback) {
  var MKT = this.DS.models.MKT;
  var xml = mktObj.getSecKillProductDetailXML(obj);
  MKT.GetSecKillBySysNo(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetSecKillBySysNoResult));
    } catch (e) {
      console.error('MKTIFS getSecKillProductDetail Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};
