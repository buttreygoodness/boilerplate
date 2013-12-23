goog.provide('AutoMan.parser.content.Object');

goog.require('AutoMan.parser.Error');
goog.require('AutoMan.collections.Content');
goog.require('AutoMan.parser.content.Json');

/**
 * @class Handles parsing of Object type content fragments.
 * 
 * @extends {AutoMan.parser.content.Json}
 * 
 * @param {!String} parsable
 * @param {options=} options
 */
AutoMan.parser.content.Object = function(parsable, options) {
  goog.base(this, parsable, options);
};

goog.inherits(AutoMan.parser.content.Object, AutoMan.parser.content.Json);

/**
 * Implements {AutoMan.parser.content.AbstractParser#getType}
 * 
 * @return {!String}
 */
AutoMan.parser.content.Object.getType = function() {
  return 'object';
};

/**
 * Check to make sure parsable_ is an object. If so, passes through.
 *
 * @private
 */
AutoMan.parser.content.Object.prototype.decode_ = function() {
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
AutoMan.parser.content.Object.prototype.parse_ = function () {
  return goog.base(this, 'parse_');
};