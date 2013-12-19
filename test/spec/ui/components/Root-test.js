goog.require('AutoMan.ui.components.Root');

goog.require('AutoMan.test.fixtures.collections.Content');

describe('AutoMan.ui.components.Root', function() {
  describe('#constructor', function() {
    it('Should be a subclass of AutoMan.ui.components.AbstractComponent.', function() {
      var root = new AutoMan.ui.components.Root(new AutoMan.test.fixtures.collections.Content);

      root.constructor.should.contain.key('superClass_');
      
      root.constructor.superClass_.should.be.equal(AutoMan.ui.components.AbstractComponent.prototype);
    });
  });

  describe('#supportedContent', function() {
    it('Should return a "root" content.', function() {
      AutoMan.ui.components.Root.supportedContent().should.be.equal('root');
    });
  });

  describe('#tag', function() {
    it('Should return a "div" element.', function() {
      AutoMan.ui.components.Root.tag().should.be.equal('div');
    });
  });
});