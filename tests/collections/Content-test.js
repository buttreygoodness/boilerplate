goog.require('AutoMan.collections.Content');

describe('AutoMan.collections.Content', function() {
  describe('#Content', function() {
    it('Should return proper object type', function() {
      var content = new AutoMan.collections.Content();

      content.should.be.instanceOf(AutoMan.collections.Content);
    });

    it('Should use key if one is provided', function() {
      var content = new AutoMan.collections.Content({id:'key!!!'});

      content.getKey().should.equal('key!!!');
    });

    it('Should create a unique key if one is not provided.', function() {
      var content = new AutoMan.collections.Content();

      content.getKey().should.exist;

      var contentOther = new AutoMan.collections.Content();

      contentOther.getKey().should.not.equal(content.getKey());
    });
  });
});