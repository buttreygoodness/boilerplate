goog.require('AutoMan.ui.Builder');

goog.require('AutoMan.tests.fixtures.ui.components');

describe('AutoMan.ui.Builder', function () {
  var badContentFixture = {
    "type": "div",
    "children": [{
      "type":"blop",
      "children": []
    }]
  };

  var contentFixture = {
    "type": "div",
    "data": {
      "attributes": {
        "id": "root"
      }
    },
    "children": [
      {
        "type": "div",
        "data": {
          "attributes": {
            "id": "no-child"
          }
        }
      },
      {
        "type": "div", 
        "data": {
          "attributes": {
          "id": "has-children"
          }
        },
        "children": [
          {
            "type": "div",
            "data": {
              "attributes": {
                "id": "child-1"
              }
            }
          },
          {
            "type": "div",
            "data": {
              "attributes": {
                "id": "child-2"
              }
            }
          }
        ]
      }
    ]
  };

  var TestComponent = AutoMan.tests.fixtures.ui.components.TestComponent;

  var factory = AutoMan.tests.fixtures.ui.components.factory;

  //var builder;

  beforeEach(function() {
    builder = new AutoMan.ui.Builder(contentFixture, factory);
  });

  afterEach(function() {
    builder.dispose();
  });

  describe('#parse', function() {
    it('Should dispatch a ParseStart event on start.', function(done) {
      builder.addEventListener(AutoMan.ui.Builder.EventTypes.ParseStart, function() {
        done();
      });

      builder.parse();
    });

    it('Should dispatch a ParseError event on error.', function(done) {
      var builder = new AutoMan.ui.Builder(badContentFixture, factory);

      builder.addEventListener(AutoMan.ui.Builder.EventTypes.ParseError, function() {
        done();
      });

      builder.parse();
    });

    it('Should dispatch a ParseComplete event on complete.', function(done) {
      builder.addEventListener(AutoMan.ui.Builder.EventTypes.ParseComplete, function() {
        done();
      });

      builder.parse();
    });
  });

  describe('#getComponents', function() {
    it('Should return no components before parse but should be an array.', function() {
      builder.getComponents().should.be.an.array;

      builder.getComponents().should.be.empty;
    });

    it('Should return no components on failed parse.', function(done) {
      var builder = new AutoMan.ui.Builder(badContentFixture, factory);

      builder.addEventListener(AutoMan.ui.Builder.EventTypes.ParseError, function(e) {
        e.target.getComponents().should.be.empty;

        done();
      });

      builder.parse();
    });

    it('Should return components on parse complete.', function(done) {
      builder.addEventListener(AutoMan.ui.Builder.EventTypes.ParseComplete, function(e) {
        e.target.getComponents().should.not.be.empty;

        done();
      });

      builder.parse();
    });

    it('Should return a proper type.', function(done) {
      builder.addEventListener(AutoMan.ui.Builder.EventTypes.ParseComplete, function(e) {
        e.target.getComponents().should.be.instanceOf(TestComponent);

        done();
      });

      builder.parse();
    });

    it('Should return components in proper hierarchy.', function(done) {
      builder.addEventListener(AutoMan.ui.Builder.EventTypes.ParseComplete, function(e) {
        components = e.target.getComponents();

        components.getChildCount().should.equal(2);

        components.getChildAt(0).should.be.instanceOf(TestComponent);

        components.getChildAt(0).getElement().id.should.equal('no-child');

        components.getChildAt(0).getChildCount().should.equal(0);

        components.getChildAt(1).should.be.instanceOf(TestComponent);

        components.getChildAt(1).getElement().id.should.equal('has-children');

        components.getChildAt(1).getChildCount().should.equal(2);

        components.getChildAt(1).getChildAt(0).should.be.instanceOf(TestComponent);

        components.getChildAt(1).getChildAt(0).getElement().id.should.equal('child-1');

        components.getChildAt(1).getChildAt(0).getChildCount().should.equal(0);

        components.getChildAt(1).getChildAt(1).should.be.instanceOf(TestComponent);

        components.getChildAt(1).getChildAt(1).should.be.instanceOf(TestComponent);

        components.getChildAt(1).getChildAt(1).getElement().id.should.equal('child-2');

        components.getChildAt(1).getChildAt(1).getChildCount().should.equal(0);

        done();
      });

      builder.parse();
    });
  });
});