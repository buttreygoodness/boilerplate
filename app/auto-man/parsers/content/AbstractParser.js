goog.provide('AutoMan.parser.content.AbstractParser');

goog.require('AutoMan.collections.Content');
goog.require('AutoMan.parser.Error');

/**
 * @class Base parser all parser should implement.
 * 
 * @abstract
 * @param {!*} parsable 
 * @param {?Object<String, *>} options
 */
AutoMan.parser.content.AbstractParser = function(parsable, options) {
  
  /**
   * Instance options.
   * 
   * @type {Object<String, *>}
   */
  this.options_ = options || {};

  /**
   * Preparsed context
   * 
   * @protected
   * @type {*}
   */
  this.parsable_ = parsable;

  /**
   * Parsed content
   * 
   * @protected
   * @type {?AutoMan.collections.Content}
   */
  this.parsed_ = null;
};

/**
 * Possible Parser Errors.
 *
 * @enum {String}
 */
AutoMan.parser.content.AbstractParser.Errors = {
  'AssertFailed': 'Assert.Failed' /** thrown on assertion failure **/
};

/**
 * Internal parse.
 *
 * @abstract
 * @protected
 * @return {?AutoMan.collections.Content}
 */
AutoMan.parser.content.AbstractParser.prototype.parse_ = goog.abstractMethod;

/**
 * Returns type of parser so it can be bound to factory.
 *
 * @absract
 * @type {!String}
 */
AutoMan.parser.content.AbstractParser.getType = goog.abstractMethod;

/**
 * Parses content and pushes results into callback.
 *
 * @param {?Function(!AutoMan.collections.Content, ?AutoMan.parser.Error)} callback
 */
AutoMan.parser.content.AbstractParser.prototype.parse = function(callback) {
  var callback_ = callback || function() {};

  if(this.isCached_()) {
    return callback_(this.getContent());
  }

  var parsed, error;

  try {
    parsed = this.parse_();
  } catch (e) {
    error = e;
  }
  
  this.parsed_ = parsed || new AutoMan.collections.Content();

  callback_(this.getContent(), error);
};

/**
 * Returns parsed content.
 *
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parser.content.AbstractParser.prototype.getContent = function() {
  return this.parsed_;
};

/**
 * Determines if results are cached so we dont need to parse them again.
 *
 * @private
 * @return {Boolean}
 */
AutoMan.parser.content.AbstractParser.prototype.isCached_ = function() {
  return this.parsed_ instanceof AutoMan.collections.Content;
};

/**
 * Asserts a condition or throws error.
 *
 * @protected
 * @param  {!Boolean} condition
 * @param  {String=} error
 * @return {self}
 */
AutoMan.parser.content.AbstractParser.prototype.assert_ = function(condition, error) {
  if(!condition) {
    throw new AutoMan.parser.Error(error || this.Errors.AssertFailed);
  }

  return this;
};

/**
 * Easy 'this' access to Errors.
 *
 * @type {Object}
 */
AutoMan.parser.content.AbstractParser.prototype.Errors = AutoMan.parser.content.AbstractParser.Errors;