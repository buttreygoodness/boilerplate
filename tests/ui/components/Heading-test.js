goog.require('AutoMan.ui.components.Heading');

describe('AutoMan.ui.components.Heading', function () {
  var fixtureJson = {
    'type': 'heading',
    'data': {
      'text': 'TestText',
      'classes': ['test1', 'test2'],
      'attributes': {
        'id': 'test_id'
      },
      'styles': {
        'width': '200px'
      }
    }
  };

  var heading;
  
  before(function () {
    heading = new AutoMan.ui.components.Heading(fixtureJson);
  });

  describe('#constructor', function () {
    it('Should return an object that is an instance of AutoMan.ui.components.Heading.', function () {
      heading.should.be.an.instanceof(AutoMan.ui.components.Heading);
    });
  });

  describe('#supportedContent', function () {
    it('Should return a value of "heading".', function () {
      AutoMan.ui.components.Heading.supportedContent().should.equal('heading');
    });
  });

});