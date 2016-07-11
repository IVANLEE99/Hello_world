var FSRW = require('./Rwfilefs.js'); 
var expect = require('chai').expect;
var testtext = [
    {
        "name": "zhangsan",
        "sex": "man",
        "address": "hangzhou",
        "home": "http://www.zhangsan.com"
    },
    {
        "name": "lisi",
        "sex": "wumen",
        "address": "beijing",
        "home": "http://www.lisi.coms"
    }
];
var lee = {'lee':'ivan'};
var ivan =[{"name":"zhangsan","sex":"man","address":"hangzhou","home":"http://www.zhangsan.com"},{"name":"lisi","sex":"wumen","address":"beijing","home":"http://www.lisi.coms"},{"lee":"ivan"}];
describe('测试文件读取', function() {
  it('文件应该可读', function(done) {
    FSRW.read('lee.json', function (data) {
      console.log(data);
      expect(data.toString()).to.be.equal(testtext.toString());
      done();
    });
  });
});

describe('测试文件写入', function () {
    it('文件应该可写', function (done) {
    FSRW.write('lee2.json', testtext, function (data) {
      expect(data.toString()).to.be.equal(testtext.toString());
      done();
    })
  });
});

describe('测试文件追加', function () {
    it('文件应该可追加数据', function (done) {
    FSRW.append('lee3.json', lee, function (data) {
      expect(JSON.stringify(data)).to.be.equal(JSON.stringify(ivan));
      done();
    })
  });
});