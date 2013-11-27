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
  var callback_ = goog.isFunction(callback) ? callback : goog.function.constant();

  if(!this.isCached_()) {
    setTimeout(function() {
      this.content_ = this.parse_();

      callback(this.getContent());
    }.bind(this), 0);
  } else {
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
 * Asserts a condition or throws error.
 * 
 * @param  {!Boolean} condition
 * @param  {String=} error
 * @return {self}
 */
AutoMan.parsers.content.AbstractParser.prototype.assert_ = function(condition, error) {
  if(!condition) {
    throw (error || AutoMan.parsers.content.AbstractParser.Errors.AssertFail);
  }

  return this;
};

/**
 * Internal parse. Subclasses need to implement.
 *
 * @override
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parsers.content.AbstractParser.prototype.parse_ = goog.abstractMethod;

/**
 * Possible Parser Errors.
 * 
 * @type {Object}
 */
AutoMan.parsers.content.AbstractParser.Errors = {
  'AssertFailed': 'Assert.Failed'
};