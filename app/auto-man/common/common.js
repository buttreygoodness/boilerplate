/**
 * @namespace AutoMan.common
 */

goog.provide('AutoMan.common');

goog.require('goog.object');

goog.require('AutoMan.common.Error');
goog.require('AutoMan.common.Event');
goog.require('AutoMan.common.patterns.Factory');

/**
 * Common errors used through out application.
 *
 * @enum {String}
 */
AutoMan.common.Errors = {
  'AssertionError': 'Assert failed.'
};

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
 * @param {!Function} classInterface
 */
AutoMan.common.implementInterface = function(constructor, classInterface) {
  goog.object.extend(constructor, goog.object.filter(classInterface, goog.isFunction));
  goog.object.extend(constructor.prototype, goog.object.filter(classInterface.prototype, goog.isFunction));
};

/**
 * Throws a not implemented error.
 * 
 * @throws {Error} If this method isnt overriden in implementing class.
 */
AutoMan.common.interfaceMethod = function() {
  throw new Error('unimplemented interface method');
};

/**
 * Asserts a condition or throws.
 * 
 * @param  {?*} condition
 * @param  {*=} error
 */
AutoMan.common.assert = function(condition, error) {
  if(!condition) {
    throw new AutoMan.common.Error(error || AutoMan.common.Errors.AssertionError);
  }
};