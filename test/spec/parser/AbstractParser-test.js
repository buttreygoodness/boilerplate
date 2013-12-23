goog.require('AutoMan.test.fixtures.parser.content.TestParser');

describe('AutoMan.parser.content.AbstractParser', function() {
  var parser;

  beforeEach(function() {
    parser = new AutoMan.test.fixtures.parser.content.TestParser('', {pass: true});
  });

  describe('#parse', function() {
    it('Should return AutoMan.collections.Content on success.', function(done) {
      parser.parse(function(content, error) {
        content.should.exist;
        content.should.be.instanceOf(AutoMan.collections.Content);
        
        done();
      });
    });

    it('Should not return error on success.', function(done) {
      parser.parse(function(content, error) {
        console.log(error);
        should.not.exist(error);
        
        done();
      });
    });

    it('Should return empty AutoMan.collections.Content and a AutoMan.parser.Error in callback on fail.', function(done){
      parser = new AutoMan.test.fixtures.parser.content.TestParser('', {pass: false});

      parser.parse(function(content, error) {
        content.should.exst;
        content.should.be.an.instanceOf(AutoMan.collections.Content);
        content.getChildCount().should.be.equal(0);

        error.should.exist;
        error.should.be.an.instanceOf(AutoMan.parser.Error);

        done();
      });
    });
  });

  describe('#getContent', function() {
    it('Should return nothing before parse.', function() {
      should.not.exist(parser.getContent());
    });

    it('Should return content after parse.', function(done) {
      parser.parse(function() {
        parser.getContent().should.exist;

        done();
      });
    });

    it('Should return content equal to callback value.', function(done) {
      parser.parse(function(content) {
        parser.getContent().should.be.equal(content);

        done();
      });
    });
  });
});