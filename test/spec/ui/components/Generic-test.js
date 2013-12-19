goog.require('AutoMan.ui.components.Generic');

goog.require('AutoMan.test.fixtures.collections.Content');

describe('AutoMan.ui.components.Generic', function() {

  var generic, content;

  beforeEach(function() {
    content = new AutoMan.test.fixtures.collections.Content();

    generic = new AutoMan.ui.components.Generic(content);
  });

  afterEach(function() {
    generic.dispose();
  });

  describe('#constructor', function() {
    it('Should be a subclass of AutoMan.ui.components.AbstractComponent.', function() {
      generic.constructor.should.contain.key('superClass_');

      generic.constructor.superClass_.should.be.equal(AutoMan.ui.components.AbstractComponent.prototype);
    });
  });

  describe('#supportedContent', function() {
    it('Should return a "*" content.', function() {
      AutoMan.ui.components.Generic.supportedContent().should.be.equal('*');
    });
  });

  describe('#tag', function() {
    it('Should return a "*" element as static.', function() {
      AutoMan.ui.components.Generic.tag().should.be.equal('*');
    });

    it('Should return whatever element the content model is set to.', function() {
      generic.tag().should.be.equal('div');

      content = new AutoMan.test.fixtures.collections.Content();

      generic = new AutoMan.ui.components.Generic(content. getChildAt(0));

      generic.tag().should.be.equal('img');
    });
  });
});