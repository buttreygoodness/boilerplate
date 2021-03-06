goog.require('AutoMan.sources.types.Ajax');

describe('AutoMan.sources.types.Ajax', function() {
  describe('#getType', function() {
    it('Should return "ajax"', function() {
      AutoMan.sources.types.Ajax.getType().should.equal('ajax');
    });
  });

  describe('#fetch', function() {
    var ajaxSource;

    beforeEach(function() {
      ajaxSource = new AutoMan.sources.types.Ajax();
    });

    it('Should return text content from a resource, if exists.', function(done) {
      var resource = {
        'resource': '../fixtures/sources/test-content.txt'
      };

      ajaxSource.fetch(resource).then(function(content) {
        should.exist(content);
        content.should.equal('im a test');

        done();
      });
    });

    it('Should return AutoMan.common.Error with AutoMan.sources.types.Ajax.Errors.ResourceNotFound on resource not found.', function(done) {
      var resource = {
        'resource': '../fixtures/sources/doesnt-exist.txt'
      };

      ajaxSource.fetch(resource).thenCatch(function(error) {
        should.exist(error);

        error.should.be.instanceOf(AutoMan.common.Error);
        error.getCode().should.equal(AutoMan.sources.types.Ajax.Errors.ResourceNotFound);
        done();
      });
    });
  });
});