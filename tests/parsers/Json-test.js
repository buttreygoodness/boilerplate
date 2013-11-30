goog.require('AutoMan.parsers.content.Json');

describe('AutoMan.parsers.content.Json', function() {
  var noContent = JSON.stringify({});

  var badContent = 'bad-content';

  var goodContent = JSON.stringify({
    'type': 'div',
    'data': {
      'attributes': {
        'id': 'root'
      }
    },
    'children': [
      {
        'type': 'div',
        'data': {
          'attributes': {
            'id': 'no-child'
          }
        }
      },
      {
        'type': 'div',
        'data': {
          'attributes': {
            'id': 'has-children'
          }
        },
        'children': [
          {
            'type': 'div',
            'data': {
              'attributes': {
                'id': 'child-1'
              }
            }
          },
          {
            'type': 'div',
            'data': {
              'attributes': {
                'id': 'child-2'
              }
            }
          }
        ]
      }
    ]
  });

  describe('#parse', function() {
    it('should throw an AutoMan.parsers.content.Json.Errors.NoContent on no content nodes.', function() {
      var parser = new AutoMan.parsers.content.Json(noContent);

      parser.parse(function() {
        console.log(':)');
      });
    });
  });
});