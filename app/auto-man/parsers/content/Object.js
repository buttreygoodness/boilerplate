goog.provide('AutoMan.parsers.content.Object');

goog.require('AutoMan.parsers.Error');
goog.require('AutoMan.collections.Content');
goog.require('AutoMan.parsers.content.Json');

/**
 * @class Handles parsing of Object type content fragments.
 * 
 * @extends {AutoMan.parsers.content.Json}
 * 
 * @param {!String} parsable
 * @param {options=} options
 */
AutoMan.parsers.content.Object = function(parsable, options) {
  goog.base(this, parsable, options);
};

goog.inherits(AutoMan.parsers.content.Object, AutoMan.parsers.content.Json);

/**
 * Implements {AutoMan.parsers.content.AbstractParser#getType}
 * 
 * @return {!String}
 */
AutoMan.parsers.content.Object.getType = function() {
  return 'object';
};

/**
 * Check to make sure parsable_ is an object. If so, passes through.
 *
 * @private
 */
AutoMan.parsers.content.Object.prototype.decode_ = function() {
  if (goog.isObject(this.parsable_)){
    this.parsableObject_ = this.parsable_;
  }
};

/**
 * Internal parse.
 * 
 * @private
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parsers.content.Object.prototype.parse_ = function () {
  return goog.base(this, 'parse_');
};