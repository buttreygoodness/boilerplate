goog.provide('AutoMan.common.abstract.SerializableInterface');

goog.require('AutoMan.common');

/**
 * @interface AutoMan.common.Serializeable
 *
 * Allows object to become serializeable.
 */
AutoMan.common.abstract.SerializableInterface = function() {};

/**
 * Serizalize self as json.
 * 
 * @return {!String}
 */
AutoMan.common.abstract.SerializableInterface.prototype.serialize = AutoMan.common.interfaceMethod;