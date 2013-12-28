goog.provide('AutoMan.templating.TemplateContext');

goog.require('AutoMan.common');
goog.require('AutoMan.templating.abstract.TemplateContextInterface');

/**
 * Minimal implemnation of AutoMan.templating.abstract.TemplateContextInterface to be used as a data transport.
 *
 * @implements {AutoMan.templating.abstract.TemplateContextInterface}
 *
 * @param {?String} template
 * @param {?Object<String, *>} view
 */
AutoMan.templating.TemplateContext = function(template, view) {
  
  /**
   * Template string.
   * 
   * @private
   * @type {String}
   */
  this.template_ = template || '';

  /**
   * Template view data.
   *
   * @private
   * @type {Object}
   */
  this.view_ = view || {};
};

AutoMan.common.implementsInterface(AutoMan.templating.TemplateContext, AutoMan.templating.abstract.TemplateContextInterface);


/**
 * returns view template.
 * 
 * @implements {AutoMan.templating.abstract.TemplateContextInterface}
 * 
 * @return {!String}
 */
AutoMan.templating.TemplateContext.prototype.getViewTemplate = function() {
  return this.template_;
};

/**
 * Returns view data.
 *
 * @implements {AutoMan.templating.abstract.TemplateContextInterface}
 * 
 * @return {!Object<String, *>}
 */
AutoMan.templating.TemplateContext.prototype.getViewData = function() {
  return this.view_;
};
