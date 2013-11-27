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
AutoMan.parsers.content.AbstractParser.prototype.parse = function(callback) {
  if(!this.isCached_()) {
    this.content_ = this.parse_();
  }

  if(goog.isFunction(callback)) {
    callback(this.getContent());
  }
};

/**
 * Returns parsed content.
 * 
 * @return {!AutoMan.collections.Content} [description]
 */
AutoMan.parsers.content.AbstractParser.prototype.getContent = function() {
  return this.content_;
};

/**
 * Determines if content is cached.
 * 
 * @return {!Boolean}
 */
AutoMan.parsers.content.AbstractParser.prototype.isCached_ = function() {
  return this.content_ instanceof AutoMan.collections.Content;
};

/**
 * Internal parse. Subclasses need to implement.
 *
 * @override
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parsers.content.AbstractParser.prototype.parse_ = goog.abstractMethod;