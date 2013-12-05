goog.provide('AutoMan.parsers.content.Object');

goog.require('goog.array');
goog.require('goog.object');

goog.require('AutoMan.parsers.Error');
goog.require('AutoMan.collections.Content');
goog.require('AutoMan.parsers.content.Json');

/**
 * @implements {AutoMan.parsers.content.Json}
 * 
 * @param {!String} parsable
 * @param {options=} options
 */
AutoMan.parsers.content.Object = function(parsable, options) {
  goog.base(this, parsable, options);
};

goog.inherits(AutoMan.parsers.content.Object, AutoMan.parsers.content.Json);

/**
 * Internal parse.
 *
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parsers.content.Object.prototype.parse_ = function () {
  return goog.base(this, 'parse_');
};

/**
 * Check to make sure parsable_ is an object. If so, passes through.
 * 
 * @return {!Boolean}
 */
AutoMan.parsers.content.Object.prototype.decode_ = function() {
  if (!goog.isObject(this.parsable_)){
    return false;
  }
  
  this.json_ = this.parsable_;
  
  return true;
};