goog.provide('AutoMan.sources.abstract.SourceFactoryItemInterface');

goog.require('AutoMan.common');

/**
 * @class Should be implemented by all sources that will be used in factories.
 * 
 * @interface
 */
AutoMan.sources.abstract.SourceFactoryItemInterface = function() {};

/**
 * Returns type of item.
 *
 * @static
 * @return {!String}
 */
AutoMan.sources.abstract.SourceFactoryItemInterface.getType = AutoMan.common.interfaceMethod;