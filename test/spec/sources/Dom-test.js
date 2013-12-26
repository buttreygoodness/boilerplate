goog.require('AutoMan.sources.types.Dom');

describe('AutoMan.sources.types.Dom', function() {
  describe('#getType', function() {
    it('Should return "dom"', function() {
      AutoMan.sources.types.Dom.getType().should.equal('dom');
    });
  });

  describe('#fetch', function() {
    var domSource;

    beforeEach(function() {
      domSource = new AutoMan.sources.types.Dom();

      $('<div id="test-content">im a test</div>').appendTo($('#fixtures'));
    });

    afterEach(function() {
      $('#test-content').remove();
    });

    it('Should return text content from a dom id, if exists.', function(done) {
      var resource = {
        'location': 'test-content'
      };

      domSource.fetch(resource, function(content) {
        should.exist(content);
        content.should.equal('im a test');

        done();
      });
    });

    it('Should return nothing from a dom id, if it doesnt exist.', function(done) {
      var resource = {
        'location': 'doesnt-exist'
      };

      domSource.fetch(resource, function(content) {
        should.not.exist(content);

        done();
      });
    });
  });
});