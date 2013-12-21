goog.provide('AutoMan.parsers.content.AbstractParser');

goog.require('goog.functions');

goog.require('AutoMan.collections.Content');
goog.require('AutoMan.parsers.Error');

/**
 * @class Base parser all parsers should implement.
 * 
 * @abstract
 * @param {!*} parsable 
 * @param {Options<String, *>=} options
 */
AutoMan.parsers.content.AbstractParser = function(parsable, options) {
  
  /**
   * Preparsed context
   * 
   * @protected
   * @type {*}
   */
  this.parsable_ = parsable;

  /**
   * Any options applied to parser.
   *
   * @protected
   * @type {Object<String, *>}
   */
  this.options_ = options || {};

  /**
   * Parsed content
   * 
   * @protected
   * @type {?AutoMan.collections.Content}
   */
  this.content_ = null;
};

/**
 * Possible Parser Errors.
 *
 * @enum {String}
 */
AutoMan.parsers.content.AbstractParser.Errors = {
  'AssertFailed': 'Assert.Failed'
};

/**
 * Returns type supported by parser.
 * 
 * @abstract
 * @return {!String} 
 */
AutoMan.parsers.content.AbstractParser.getType = goog.abstractMethod;

/**
 * Parses content and pushes results into callback.
 *
 * @param  {Function(!AutoMan.collections.Content, ?AutoMan.parsers.Error)} callback
 */
AutoMan.parsers.content.AbstractParser.prototype.parse = function(callback) {
  var callback_ = callback || function() {};

  if(this.isCached_()) {
    return callback_(this.getContent);
  }

  var content, error;

  try {
    content = this.parse_();
  } catch (e) {
    error = e;
  }
  
  this.content_ = content || new AutoMan.collections.Content();

  callback_(this.getContent(), error);
};

/**
 * Returns parsed content.
 *
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parsers.content.AbstractParser.prototype.getContent = function() {
  return this.content_;
};

/**
 * Determines if content is cached.
 *
 * @private
 * @return {!Boolean}
 */
AutoMan.parsers.content.AbstractParser.prototype.isCached_ = function() {
  return this.content_ instanceof AutoMan.collections.Content;
};

/**
 * Asserts a condition or throws error.
 *
 * @protected
 * @param  {!Boolean} condition
 * @param  {String=} error
 * @return {self}
 */
AutoMan.parsers.content.AbstractParser.prototype.assert_ = function(condition, error) {
  if(!condition) {
    throw new AutoMan.parsers.Error(error || this.Errors.AssertFailed);
  }

  return this;
};

/**
 * Internal parse. Subclasses need to implement.
 *
 * @abstract
 * @protected
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parsers.content.AbstractParser.prototype.parse_ = goog.abstractMethod;

/**
 * Easy 'this' access to Errors.
 *
 * @type {Object}
 */
AutoMan.parsers.content.AbstractParser.prototype.Errors = AutoMan.parsers.content.AbstractParser.Errors;