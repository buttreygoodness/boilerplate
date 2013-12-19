goog.require('AutoMan.ui.components.Image');

goog.require('AutoMan.test.fixtures.collections.Content');

describe('AutoMan.ui.components.Image', function() {
  var image;

  beforeEach(function() {
    image = new AutoMan.ui.components.Image(new AutoMan.test.fixtures.collections.Content);
  });

  afterEach(function() {
    image.dispose();
  });

  describe('#constructor', function() {
    it('Should be a subclass of AutoMan.ui.components.AbstractComponent.', function() {
      image.constructor.should.contain.key('superClass_');
      
      image.constructor.superClass_.should.be.equal(AutoMan.ui.components.AbstractComponent.prototype);
    });
  });

  describe('#supportedContent', function() {
    it('Should return a "image" content.', function() {
      AutoMan.ui.components.Image.supportedContent().should.be.equal('image');
    });
  });

  describe('#tag', function() {
    it('Should return a "img" element.', function() {
      AutoMan.ui.components.Image.tag().should.be.equal('img');
    });
  });

  describe('#createDom', function() {
    it('Should create a dom element with no innerHTML.', function() {
      image.getModel().getData().should.have.property('text');

      image.createDom();

      should.exist(image.getElement());

      image.getElement().innerHTML.should.be.empty;
    });
  });
});