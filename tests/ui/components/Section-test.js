goog.require('AutoMan.ui.components.Section');

describe('AutoMan.ui.components.Section', function () {
  var fixtureJson = {
    'type': 'section',
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

  var section = new AutoMan.ui.components.Section(fixtureJson);

  describe('#constructor', function() {
    it('Should return an object that is an instance of AutoMan.ui.components.Section', function () {
      section.should.be.an.instanceof(AutoMan.ui.components.Section);
    });
  });

  describe('#supportedContent', function () {
    it ('Should return "section"', function () {
      AutoMan.ui.components.Section.supportedContent().should.equal('section');
    });
  });
});