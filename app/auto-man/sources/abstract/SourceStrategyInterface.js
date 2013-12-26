goog.provide('AutoMan.sources.abstract.SourceStrategyInterface');

goog.require('AutoMan.common');

/**
 * @class Strategy interface for sources.
 * 
 * @interface
 */
AutoMan.sources.abstract.SourceStrategyInterface = function() {};

/**
 * Trys to resolve query.
 * 
 * @param {!Object} item
 * @param {!Function(?item)} callback
 */
AutoMan.sources.abstract.SourceStrategyInterface.prototype.fetch = AutoMan.common.interfaceMethod;