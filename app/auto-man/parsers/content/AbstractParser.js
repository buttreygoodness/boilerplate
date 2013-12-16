goog.provide('AutoMan.parsers.content.AbstractParser');

goog.require('goog.functions');

goog.require('AutoMan.collections.Content');
goog.require('AutoMan.parsers.Error');

/**
 * @class Base Parser.
 * 
 * @param {!*} parsable 
 * @param {Options=} options
 */
AutoMan.parsers.content.AbstractParser = function(parsable, options) {
  this.parsable_ = parsable;

  this.options_ = options || {};

  this.content_ = undefined;

  this.parseFail_ = false;
};

/**
 * Possible Parser Errors.
 *
 * @static
 * @type {Object}
 */
AutoMan.parsers.content.AbstractParser.Errors = {
  'AssertFailed': 'Assert.Failed'
};

/**
 * Parses content and pushes results into callback.
 *
 * @public 
 * @param  {Function(!AutoMan.collections.Content, ?AutoMan.parsers.Error)} callback
 */
AutoMan.parsers.content.AbstractParser.prototype.parse = function(callback) {
  if(!this.isCached_()) {
    setTimeout(function() {
      var content;
      var error;

      try {
        content = this.parse_();
      } catch (e) {
        error = e;
      }
      
      this.content_ = content ? content : new AutoMan.collections.Content();

      this.parseFail_ = error ? true : false;

      callback(this.getContent(), error);

    }.bind(this), 1);
  } else {
    callback(this.getContent());
  }
};

/**
 * Returns parsed content.
 *
 * @public
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
  goog.asserts.assert(condition, error || AutoMan.parsers.content.AbstractParser.Errors.AssertFail);

  return this;
};

/**
 * Internal parse. Subclasses need to implement.
 *
 * @override
 * @protected
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parsers.content.AbstractParser.prototype.parse_ = goog.abstractMethod;

/**
 * Easy 'this' access to Errors.
 *
 * @public
 * @type {Object}
 */
AutoMan.parsers.content.AbstractParser.prototype.Errors = AutoMan.parsers.content.AbstractParser.Errors;