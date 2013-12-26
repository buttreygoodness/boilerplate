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
        'location': '../fixtures/sources/test-content.txt'
      };

      ajaxSource.fetch(resource, function(content) {
        should.exist(content);
        content.should.equal('im a test');

        done();
      });
    });

    it('Should return nothing from a Ajax id, if it doesnt exist.', function(done) {
      var resource = {
        'location': '../fixtures/sources/doesnt-exist.txt'
      };

      ajaxSource.fetch(resource, function(content) {
        should.not.exist(content);

        done();
      });
    });
  });
});