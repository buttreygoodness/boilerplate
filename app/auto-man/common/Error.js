goog.provide('AutoMan.common.Error');

/**
 * @class Base error class.
 * 
 * @param {Object | String} options
 */
AutoMan.common.Error = function(options) {
  this.options_ = options || {};

  if(goog.isString(options)) {
    this.options_ = {
      code: options
    };
  }

  this.code_ = this.options_.code || 0;

  this.message_ = this.options_.message || '';
};

/**
 * Returns error code.
 *
 * @return {!*}
 */
AutoMan.common.Error.prototype.getCode = function() {
  return this.code_;
};

/**
 * Returns message.
 *
 * @return {!String}
 */
AutoMan.common.Error.prototype.getMessage = function() {
  return this.message_;
};

/**
 * String magic method.
 *
 * @return {!String}
 */
AutoMan.common.Error.prototype.toString = function() {
  var stringBuilder = ['Code:', this.getCode()];
  
  if(this.getMessage()) {
    stringBuilder = stringBuilder.concat(['Message:', this.getMessage()]);
  }

  return stringBuilder.join(' ');
};