goog.require('AutoMan.sources.Dom');

describe('AutoMan.sources.Dom', function() {
  describe('#getType', function() {
    it('Should return "dom"', function() {
      AutoMan.sources.Dom.getType().should.equal('dom');
    });
  });

  describe('#fetch', function() {
    var domSource;

    beforeEach(function() {
      domSource = new AutoMan.sources.Dom();

      $('<div id="test-content">im a test</div>').appendTo($('#fixtures'));
    });

    afterEach(function() {
      $('#test-content').remove();
    });

    it('Should return text content from a dom id, if exists.', function(done) {
      domSource.fetch('test-content', function(content) {
        should.exist(content);
        content.should.equal('im a test');

        done();
      });
    });

    it('Should return nothing from a dom id, if it doesnt exist.', function(done) {
      domSource.fetch('doesnt-exist', function(content) {
        should.not.exist(content);

        done();
      });
    });
  });
});