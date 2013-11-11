goog.require('AutoMan.ui.components.Section');

var fixtureJson = {
  "type": "section",
  "data": {
    "text": "TestText",
    "classes": ["test1", "test2"],
    "attributes": {
      "id": "test_id"
    },
    "styles": {
      "width": "200px"
    }
  }
};

var section = new AutoMan.ui.components.Section(fixtureJson);

describe('AutoMan.ui.components.Section', function () {
  
  describe('#constructor', function() {
    it('Should return an object', function () {
      section.should.be.an('object');
    });
  });

  describe('#render', function () {

    before(function () {
      section.render();
    });

    after(function () {
      section.dispose();
    });

    it('Should render a section element with an id of "test_id"', function () {
      var sec = document.getElementsByTagName('section');
      sec[0].attributes.id.nodeValue.should.equal('test_id');
    });

    it('Should produce a dom element with innerHTML of "TestText"', function () {
      document.getElementById('test_id').innerHTML.should.equal('TestText');
    });
  });
});