goog.provide('AutoMan.templating.abstract.TemplateContextInterface');

/**
 * All templating engines must implement this method to be used in the templating models.
 *
 * @interface
 */
AutoMan.templating.abstract.TemplateEngineInterface = function() {};

/**
 * Evaluate a template context.
 * 
 * @param {!AutoMan.templating.abstract.TemplateEngineInterface} view
 * @return {goog.labs.Promise}
 */
AutoMan.templating.abstract.TemplateEngineInterface.prototype.evaluate = AutoMan.common.interfaceMethod;