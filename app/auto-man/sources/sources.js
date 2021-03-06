/**
 * @namespace AutoMan.sources
 */

goog.provide('AutoMan.sources');

goog.require('AutoMan.sources.Factory');
goog.require('AutoMan.sources.types');

/**
 * Engine specific sources. 
 *
 * @static
 * @type {AutoMan.sources.Factory}
 */
AutoMan.sources.factory = new AutoMan.sources.Factory();

AutoMan.sources.factory.register(AutoMan.sources.types.Dom);
AutoMan.sources.factory.register(AutoMan.sources.types.Ajax);

/**
 * Engine specific source.
 * 
 * @type {AutoMan.sources.Source}
 */
AutoMan.sources.composite = new AutoMan.sources.types.Composite(AutoMan.sources.factory);