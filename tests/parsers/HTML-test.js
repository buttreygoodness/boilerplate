goog.require('AutoMan.parsers.content.HTML');

describe('AutoMan.parsers.content.HTML', function () {

  var noContent = '<div></div>';

  var badContent = 'bad-content';

  var goodContent = '<div class="content anotherClass" data-test="test"><a href="#" id="id1">anchor</a><div id="id2" class="fake"></div></div>';

  describe('#parse', function () {
    it('Should return an AutoMan.parsers.content.HTML.Errors.NoContent on no content nodes.', function (done) {
      var parser = new AutoMan.parsers.content.HTML(noContent);

      parser.parse(function (content, error) {
        error.should.exist;
        error.getCode().should.equal(AutoMan.parsers.content.Json.Errors.NoContent);
        
        done();
      });
    });

    it('Should return an AutoMan.parsers.content.HTML.Errors.Unparsable on bad content nodes.', function (done) {
      var parser = new AutoMan.parsers.content.HTML(badContent);

      parser.parse(function (content, error) {
        error.should.exist;
        error.getCode().should.equal(AutoMan.parsers.content.Json.Errors.Unparsable);
        
        done();
      });
    });

    it('Should parse valid data and return a proper AutoMan.collections.content.', function (done) {
      var parser = new AutoMan.parsers.content.HTML(goodContent);

      parser.parse(function (htmlContent) {

        // It wrapped wrapped in a 'root' div node...
        htmlContent.getValue().type.should.equal('div');
        htmlContent.getValue().data.attributes.id.should.equal('root');

        htmlContent.getChildAt(0).getValue().type.should.equal('div');
        htmlContent.getChildAt(0).getValue().data.classes.should.contain('content');
        htmlContent.getChildAt(0).getChildCount().should.equal(2);

        htmlContent.getChildAt(0).getChildAt(0).getValue().type.should.equal('a');
        htmlContent.getChildAt(0).getChildAt(0).getValue().data.attributes.id.should.equal('id1');
        htmlContent.getChildAt(0).getChildAt(0).getValue().data.attributes.href.should.equal('#');
        htmlContent.getChildAt(0).getChildAt(0).getValue().data.text.should.equal('anchor');
        htmlContent.getChildAt(0).getChildAt(0).getChildCount().should.equal(0);

        htmlContent.getChildAt(0).getChildAt(1).getValue().type.should.equal('div');
        htmlContent.getChildAt(0).getChildAt(1).getValue().data.classes.should.contain('fake');
        htmlContent.getChildAt(0).getChildAt(1).getValue().data.attributes.id.should.equal('id2');
        htmlContent.getChildAt(0).getChildAt(1).getChildCount().should.equal(0);

        done();
      });
    });

  });
});
