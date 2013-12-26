goog.provide('AutoMan.parsers.content.AbstractParser');

goog.require('goog.labs.Promise');

goog.require('AutoMan.collections.Content');

/**
 * @class Base parser all parser should implement.
 * 
 * @abstract
 * @param {!*} parsable 
 * @param {?Object<String, *>} options
 */
AutoMan.parsers.content.AbstractParser = function(parsable, options) {
  
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
 * Internal parse.
 *
 * @abstract
 * @protected
 * @return {?AutoMan.collections.Content}
 */
AutoMan.parsers.content.AbstractParser.prototype.parse_ = goog.abstractMethod;

/**
 * Returns type of parser so it can be bound to factory.
 *
 * @absract
 * @type {!String}
 */
AutoMan.parsers.content.AbstractParser.getType = goog.abstractMethod;

/**
 * Parses content and pushes results into callback.
 *
 * @returns {!goog.labs.Promise}
 */
AutoMan.parsers.content.AbstractParser.prototype.parse = function() {
  return new goog.labs.Promise(function(fulfilled, rejected) {
    if(this.isCached_()) {
      return fulfilled(this.getContent());
    }

    try {
      this.parsed_ = this.parse_();
    } catch (assertionFailed) {
      return rejected(assertionFailed);
    }

    fulfilled(this.getContent());
  }, this);
};

/**
 * Returns parsed content.
 *
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parsers.content.AbstractParser.prototype.getContent = function() {
  return this.parsed_;
};

/**
 * Determines if results are cached so we dont need to parse them again.
 *
 * @private
 * @return {Boolean}
 */
AutoMan.parsers.content.AbstractParser.prototype.isCached_ = function() {
  return this.parsed_ instanceof AutoMan.collections.Content;
};