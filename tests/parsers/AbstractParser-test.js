goog.require('AutoMan.tests.fixtures.parsers.content.TestParser');

describe('AutoMan.parsers.content.AbstractParser', function() {
  var parser;

  beforeEach(function() {
    parser = new AutoMan.tests.fixtures.parsers.content.TestParser();
  });

  describe('#parse', function() {
    it('should return parsed in callback.', function(done) {
      parser.parse(function(content) {
        content.should.exist;

        done();
      });
    });

    it('should parse with no callback.', function() {
      goog.bind(parser.parse, parser).should.not.throw();
    });
  });

  describe('#getContent', function() {
    it('should return nothing before parse.', function() {
      should.not.exist(parser.getContent());
    });

    it('should return content after parse.', function(done) {
      parser.parse(function() {
        parser.getContent().should.exist;

        done();
      });
    });

    it('should return content equal to callback value.', function(done) {
      parser.parse(function(content) {
        parser.getContent().should.be.equal(content);

        done();
      });
    });
  });
});