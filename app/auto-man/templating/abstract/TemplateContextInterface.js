goog.provide('AutoMan.templating.abstract.TemplateContextInterface');

/**
 * Anything that will be used as an argument on AutoMan.templating.abstract.TemplateEngineInterface should implement.
 *
 * @interface
 */
AutoMan.templating.abstract.TemplateContextInterface = function() {};

/**
 * Gets template string.
 * 
 * @type {!String}
 */
AutoMan.templating.abstract.TemplateContextInterface.prototype.getViewTemplate = AutoMan.common.interfaceMethod;

/**
 * Gets view data.
 * 
 * @type {!Object<String, *>}
 */
AutoMan.templating.abstract.TemplateContextInterface.prototype.getViewData = AutoMan.common.interfaceMethod;