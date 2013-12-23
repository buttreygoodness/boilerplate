goog.provide('AutoMan.sources.SourceFactoryItemInterface');

goog.require('AutoMan.common');

/**
 * @class Should be implemented by all sources that will be used in factories.
 * 
 * @interface
 */
AutoMan.sources.SourceFactoryItemInterface = function() {};

/**
 * Returns type of item.
 *
 * @static
 * @return {!String}
 */
AutoMan.sources.SourceFactoryItemInterface.getType = AutoMan.common.interfaceMethod;