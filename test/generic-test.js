var chai = require('chai');

var expect = chai.expect;
chai.should();

describe('Class', function () {
  describe('#method', function () {
    it('should do something', function () {
      (1).should.equal(1);
    });
  });
});