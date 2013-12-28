goog.provide('AutoMan.templating.abstract.TemplateEngineInterface');

/**
 * All templating engines must implement this method to be used in the templating models.
 *
 * @interface
 */
AutoMan.templating.abstract.TemplateEngineInterface = function() {};

/**
 * render a template context.
 * 
 * @param {!AutoMan.templating.abstract.TemplateEngineInterface} view
 * @return {goog.labs.Promise}
 */
AutoMan.templating.abstract.TemplateEngineInterface.prototype.render = AutoMan.common.interfaceMethod;