goog.require('AutoMan.ui.components.Heading');

var fixtureJson = {
  "type": "heading",
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
}

var heading;

describe('AutoMan.ui.components.Heading', function () {

  before(function () {
    heading = new AutoMan.ui.components.Heading(fixtureJson);
  });

  describe('#constructor', function () {
    
    it('Should return an object that is an instance of AutoMan.ui.components.Heading', function () {
      heading.should.be.an.instanceof(AutoMan.ui.components.Heading);
    });

  });

  describe('#render', function () {
    
    before(function () {
      heading.render();
    });

    after(function () {
      heading.dispose();
    });

    it('Should render an h1 element with the id of "test_id"', function () {
      var head = document.getElementById('test_id');
      head.nodeName.should.equal('H1');
    });

    it('Should have an innerHTML value of "TestText"', function () {
      var head = document.getElementById('test_id');
      head.innerHTML.should.equal('TestText');
    });

  });
});