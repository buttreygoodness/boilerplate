goog.provide('AutoMan.common.SerializableInterface');

goog.require('AutoMan.common');

/**
 * @interface AutoMan.common.Serializeable
 *
 * Allows object to become serializeable.
 */
AutoMan.common.SerializableInterface = function() {};

/**
 * Serizalize self as json.
 * 
 * @return {!String}
 */
AutoMan.common.SerializableInterface.prototype.serialize = AutoMan.common.interfaceMethod;