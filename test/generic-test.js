var chai = require('chai');
chai.should();

var jsdom = require("jsdom").jsdom;
var window = jsdom().parentWindow;
var document = window.document;

var AutoMan = require('../bin/deps.js');

describe('AutoMan', function () {
  describe('#sayHello', function () {
    it('one should equal one.', function () {
      (1).should.equal(1);
    });
    it('Should say hello.', function () {
      var am = new AutoMan.main();
      (am.sayHello()).should.equal(1);
    });

    it('Should include components', function() {
      console.log(AutoMan);
    });
  });
});
