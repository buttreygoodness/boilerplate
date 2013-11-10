goog.provide('AutoMan.ui.components.Section');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Section Component
 * 
 * @param {?Object} options
 */ 
AutoMan.ui.components.Section = function(options) {
  goog.base(this, options);
};

goog.object.extend(AutoMan.ui.components.Section, AutoMan.ui.components.AbstractComponent);

goog.inherits(AutoMan.ui.components.Section, AutoMan.ui.components.AbstractComponent);

AutoMan.ui.components.Section.supportedContent = function() {
  return 'section';
};

AutoMan.ui.components.Section.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('section'));
};