goog.provide('AutoMan.models.Template');

goog.require('goog.labs.Promise');

goog.require('AutoMan.common');
goog.require('AutoMan.templating.TemplateContext');
goog.require('AutoMan.templating.abstract.TemplateEngineInterface');

/**
 * Performs template operations
 *
 * @implements {AutoMan.templating.abstract.TemplateEngineInterface}
 * 
 * @param {!Object} item
 * @param {!AutoMan.sources.abstract.SourceStrategyInterface} source
 * @param {!AutoMan.templating.abstract.TemplateEngineInterface} templateEngine
 */
AutoMan.models.Template = function(item, source, templateEngine) {
  /**
   * Source used to resolve template.
   * 
   * @protected
   * @type {AutoMan.sources.abstract.SourceStrategyInterface}
   */
  this.source_ = source;

  /**
   * request item used to evalute source.
   *
   * @protected
   * @type {Object}
   */
  this.item_ = item;

  /**
   * Engine used to render template.
   *
   * @protected
   * @type {AutoMan.templating.abstract.TemplateEngineInterface}
   */
  this.templateEngine_ = templateEngine;
};

AutoMan.common.implementsInterface(AutoMan.models.Template, AutoMan.templating.abstract.TemplateEngineInterface);

/**
 * lazy loads template and renders.
 * 
 * @implements {AutoMan.templating.abstract.TemplateEngineInterface}
 * 
 * @param  {!AutoMan.templating.abstract.TemplateContextInterface} view
 * @return {!goo.labs.Promise};
 */
AutoMan.models.Template.prototype.render = function(view) {
  return new goog.labs.Promise(function(fulfilled, rejected) {
    this.source_.fetch(this.item_).then(function(template) {
      var templateContext = new AutoMan.templating.TemplateContext(template, view.getViewData());

      this.templateEngine_.render(templateContext).then(fulfilled, rejected);
    }.bind(this), rejected);
  }, this);
};