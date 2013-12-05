goog.require('AutoMan.parsers.content.HTML');

describe('AutoMan.parsers.content.HTML', function () {

  var noContent = '<div></div>';

  var badContent = 'bad-content';

  var goodContent = '<div class="content"><a href="#">anchor</a><div id="new" class="fake"></div></div>';

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

      parser.parse(function (content) {
        console.log(content);
        done();
      });
    });

  });
});

// describe('AutoMan.parsers.content.HTML', function () {
//   var noContent = '';
 
//   describe('#parse', function () {
//     it('Should return an AutoMan.parsers.content.HTML.Errors.NoContent on no content nodes.', function () {
//       var parser = new AutoMan.parsers.content.HTML(noContent);

//       parser.parse(function (content, error) {
//         error.should.exist;
//         error.getCode().should.equal(AutoMan.parsers.content.HTML.Errors.NoContent);

//         done();
//       });

//     });
//   });
// });