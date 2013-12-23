goog.require('AutoMan.parsers.content.Json');

describe('AutoMan.parsers.content.Json', function() {
  var noContent, badContent, goodContent;

  noContent = JSON.stringify({});

  badContent = 'bad-content';

  goodContent = JSON.stringify({
    'content' : {
      'type': 'a',
      'data': {
        'attributes': {
          'id': 'root'
        }
      },
      'children': [
        {
          'type': 'b',
          'data': {
            'attributes': {
              'id': 'no-child'
            }
          }
        },
        {
          'type': 'c',
          'data': {
            'attributes': {
              'id': 'has-children'
            }
          },
          'children': [
            {
              'type': 'd',
              'data': {
                'attributes': {
                  'id': 'child-1'
                }
              }
            },
            {
              'type': 'e',
              'data': {
                'attributes': {
                  'id': 'child-2'
                }
              }
            }
          ]
        }
      ]
    }
  });

  describe('#parse', function() {
    it('Should return an AutoMan.parsers.content.Json.Errors.NoContent on no content nodes.', function(done) {
      var parser = new AutoMan.parsers.content.Json(noContent);

      parser.parse(function(content, error) {
        error.should.exist;
        error.getCode().should.equal(parser.Errors.NoContent);

        done();
      });
    });

    it('Should return a AutoMan.parsers.content.Json.Errors.Unparsable on unparsable content.', function(done) {
      var parser = new AutoMan.parsers.content.Json(badContent);

      parser.parse(function(content, error) {
        error.should.exist;
        console.log(error.constructor);
        error.getCode().should.equal(parser.Errors.Unparsable);

        done();
      });
    });

    it('Should not return errors on correct parse.', function(done) {
      var parser = new AutoMan.parsers.content.Json(goodContent);

      parser.parse(function(content, error) {
        should.not.exist(error);

        done();
      });
    });

    it('Should parse valid data and return a proper AutoMan.collections.content.', function(done) {
      var parser = new AutoMan.parsers.content.Json(goodContent);

      parser.parse(function(content) {
        content.getValue().type.should.equal('a');
        content.getValue().data.attributes.id.should.equal('root');
        content.getChildCount().should.equal(2);

        content.getChildAt(0).getValue().type.should.equal('b');
        content.getChildAt(0).getValue().data.attributes.id.should.equal('no-child');
        content.getChildAt(0).getChildCount().should.equal(0);

        content.getChildAt(1).getValue().type.should.equal('c');
        content.getChildAt(1).getValue().data.attributes.id.should.equal('has-children');
        content.getChildAt(1).getChildCount().should.equal(2);

        content.getChildAt(1).getChildAt(0).getValue().type.should.equal('d');
        content.getChildAt(1).getChildAt(0).getValue().data.attributes.id.should.equal('child-1');
        content.getChildAt(1).getChildAt(0).getChildCount().should.equal(0);

        content.getChildAt(1).getChildAt(1).getValue().type.should.equal('e');
        content.getChildAt(1).getChildAt(1).getValue().data.attributes.id.should.equal('child-2');
        content.getChildAt(1).getChildAt(1).getChildCount().should.equal(0);

        done();
      });
    });
  });
});