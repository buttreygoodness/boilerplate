goog.require('AutoMan.tests.fixtures.parsers.content.TestParser');

describe('AutoMan.parsers.content.AbstractParser', function() {
  var parser;

  beforeEach(function() {
    parser = new AutoMan.tests.fixtures.parsers.content.TestParser("", {pass: true});
  });

  describe('#parse', function() {
    it('should return AutoMan.collections.Content in callback with no AutoMan.parser.Error.', function(done) {
      parser.parse(function(content, error) {
        content.should.exist;
        content.should.be.instanceOf(AutoMan.collections.Content);
        
        should.not.exist(error);  

        done();
      });
    });

    it('should return empty AutoMan.collections.Content and a AutoMan.parser.Error in callback on fail.', function(done){
      parser = new AutoMan.tests.fixtures.parsers.content.TestParser("", {pass: false});

      parser.parse(function(content, error) {
        content.should.exst;
        content.should.be.an.instanceOf(AutoMan.collections.Content);
        content.getChildCount().should.be.equal(0);

        error.should.exist;
        error.should.be.an.instanceOf(AutoMan.parsers.Error);

        done();
      });
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