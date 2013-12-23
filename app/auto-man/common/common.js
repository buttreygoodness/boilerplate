goog.provide('AutoMan.common');

goog.require('goog.object');

goog.require('AutoMan.common.Error');
goog.require('AutoMan.common.AbstractFactory');

/**
 * Generates a UUID.
 *
 * @return {!String}
 */
AutoMan.common.generateUUID = function() {
  var uuid = AutoMan.common.generateUUID.template.replace(/[xy]/g, function(character) {
    var value = (Math.random() * 16) | 0;

    if(character === 'y') {
      value = value & 0x03 | 0x08;
    }

    return value.toString(16);
  });

  return uuid;
};

/**
 * Template used by uuid generater.
 *
 * @const
 * @type {String}
 */
AutoMan.common.generateUUID.template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

/**
 * Adds an interface implementation to an object constructor prototype.
 * 
 * @param {!Function} constructor
 * @param {!Function} interface
 */
AutoMan.common.addImplementation = function(constructor, interface) {
  goog.object.extend(constructor, goog.object.filter(interface, goog.isFunction));
  goog.object.extend(constructor.prototype, goog.object.filter(interface.prototype, goog.isFunction));
};

/**
 * Throws a not implemented error.
 * 
 * @throws {Error} If this method isnt overriden in implementing class.
 */
AutoMan.common.interfaceMethod = function() {
  throw Error('unimplemented interface method');
};