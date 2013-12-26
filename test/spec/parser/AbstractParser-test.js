goog.require('AutoMan.test.fixtures.parsers.content.TestParser');

describe('AutoMan.parsers.content.AbstractParser', function() {
  var parser;

  beforeEach(function() {
    parser = new AutoMan.test.fixtures.parsers.content.TestParser('', {pass: true});
  });

  describe('#parse', function() {
    it('Should return AutoMan.collections.Content on success.', function(done) {
      parser.parse().then(function(content) {
        content.should.exist;
        content.should.be.instanceOf(AutoMan.collections.Content);
        
        done();
      });
    });

    it('Should return error on failure.', function(done){
      parser = new AutoMan.test.fixtures.parsers.content.TestParser('', {pass: false});

      parser.parse().thenCatch(function(error) {
        error.should.exist;
        error.should.be.an.instanceOf(AutoMan.common.Error);

        done();
      });
    });
  });

  describe('#getContent', function() {
    it('Should return nothing before parse.', function() {
      should.not.exist(parser.getContent());
    });

    it('Should return content after parse.', function(done) {
      parser.parse().then(function(content) {
        parser.getContent().should.exist;

        done();
      });
    });

    it('Should return content equal to callback value.', function(done) {
      parser.parse().then(function(content) {
        parser.getContent().should.be.equal(content);

        done();
      });
    });
  });
});