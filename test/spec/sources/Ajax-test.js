goog.require('AutoMan.sources.Ajax');

describe('AutoMan.sources.Ajax', function() {
  describe('#getType', function() {
    it('Should return "ajax"', function() {
      AutoMan.sources.Ajax.getType().should.equal('ajax');
    });
  });

  describe('#fetch', function() {
    var ajaxSource;

    beforeEach(function() {
      ajaxSource = new AutoMan.sources.Ajax();
    });

    it('Should return text content from a resource, if exists.', function(done) {
      ajaxSource.fetch('../fixtures/sources/test-content.txt', function(content) {
        should.exist(content);
        content.should.equal('im a test');

        done();
      });
    });

    it('Should return nothing from a Ajax id, if it doesnt exist.', function(done) {
      ajaxSource.fetch('../fixtures/sources/doesnt-exist.txt', function(content) {
        should.not.exist(content);

        done();
      });
    });
  });
});