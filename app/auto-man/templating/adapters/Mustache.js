goog.provide('AutoMan.templating.adapters.Mustache');

goog.require('goog.labs.Promise');

goog.require('AutoMan.common');
goog.require('AutoMan.templating.abstract.TemplateEngineInterface');

/**
 * Performs template operations using mustache
 *
 * @implements {AutoMan.templating.abstract.TemplateEngineInterface}
 * 
 * @param {!Object} item
 * @param {!Mustache} mustache
**/
AutoMan.templating.adapters.Mustache = function(mustache) {
  this.mustache_ = mustache;
};

AutoMan.common.implementsInterface(AutoMan.templating.adapters.Mustache, AutoMan.templating.abstract.TemplateEngineInterface);

/**
 * Renders the view.
 *
 * @implements {AutoMan.templating.abstract.TemplateEngineInterface}
 * 
 * @param  {!AutoMan.templating.abstract.TemplateContextInterface} view
 * @return {!goog.labs.Promise}
 */
AutoMan.templating.adapters.Mustache.prototype.render = function(view) {
  return new goog.labs.Promise(function(fulfiled) {
    fulfiled(this.mustache_.render(view.getViewTemplate(), view.getViewData()));
  }, this);
};