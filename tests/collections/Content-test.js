goog.require('AutoMan.collections.Content');

describe('AutoMan.collections.Content', function() {
  describe('#Content', function() {
    it('Should use key if one is provided', function() {
      var content = new AutoMan.collections.Content('key!!!');

      content.getKey().should.equal('key!!!');

    });

    it('Should create a unique key if one is not provided.', function() {
      var content = new AutoMan.collections.Content();

      content.getKey().should.not.be.null;
      content.getKey().should.not.be.undefined;

      var contentOther = new AutoMan.collections.Content();

      contentOther.getKey().should.not.equal(content.getKey());
    });
  });
});