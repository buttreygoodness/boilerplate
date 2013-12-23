goog.provide('AutoMan.sources.SourceStrategyInterface');

goog.require('AutoMan.common');

/**
 * @class Strategy interface for sources.
 * 
 * @interface
 */
AutoMan.sources.SourceStrategyInterface = function() {};

/**
 * fetches an item.
 * 
 * @param {!String} item
 * @param {!Function(item)} callback
 */
AutoMan.sources.SourceStrategyInterface.prototype.fetch = AutoMan.common.interfaceMethod;