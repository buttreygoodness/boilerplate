goog.provide('AutoMan.parsers.content.AbstractParser');

goog.require('AutoMan.collections.Content');

/**
 * @param {!String} parsable 
 * @param {Options=} options
 */
AutoMan.parsers.content.AbstractParser = function(parsable, options) {
  this.parsable_ = parsable || "";

  this.options_ = options || {};

  this.content_ = undefined;
};

/**
 * Parses content and pushes results into callback.
 * 
 * @param  {Function} callback [description]
 */
AutoMan.parsers.content.AbstractParser.parse = function(callback) {
  this.content_ = this.parse_();

  if(goog.isFunction(callback)) {
    callback(this.getContent());
  } 
};

/**
 * Returns parsed content.
 * 
 * @return {!AutoMan.collections.Content} [description]
 */
AutoMan.parsers.content.AbstractParser.getContent = function() {
  return this.content_;
};

/**
 * Internal parse. Subclasses need to implement.
 *
 * @override
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parsers.content.AbstractParser.parse_ = goog.abstractMethod;