/**
 * @namespace AutoMan.common.util
 */
goog.provide('AutoMan.common.util');

/**
 * Generates a UUID.
 *
 * @static
 * @return {!String}
 */
AutoMan.common.util.generateUUID = function() {
  var uuid = AutoMan.common.util.generateUUID.template.replace(/[xy]/g, function(character) {
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
AutoMan.common.util.generateUUID.template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';