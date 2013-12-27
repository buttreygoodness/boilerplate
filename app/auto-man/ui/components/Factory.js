goog.provide('AutoMan.ui.components.Factory');

goog.require('AutoMan.common.Error');
goog.require('AutoMan.common.patterns.Factory');

/**
 * @class Managages UI components.
 * 
 * @extends {AutoMan.common.patterns.Factory}
 * 
 * @param {?Options} options
 */
AutoMan.ui.components.Factory = function(options) {
  goog.base(this, options);

  this.genericContentType_ = this.options_.genericContentType || AutoMan.ui.components.Factory.GenericContentType;
};

goog.inherits(AutoMan.ui.components.Factory, AutoMan.common.patterns.Factory);

/**
 * Errors that can be thrown by factory.
 * 
 * @enum {String}
 */
AutoMan.ui.components.Factory.Errors = {
  'UnsupportedType': 'Requested component is unsupported.'
};

/**
 * Content type that should be treated as a generic type.
 * 
 * @const
 * @type {String}
 */
AutoMan.ui.components.Factory.GenericContentType = '*';

/**
 * Implements {AutoMan.common.patterns.Factory#getItemId_}
 *
 * @protected
 * @param {!AutoMan.ui.components.AbstractComponent} item
 * @return {!String}
 */
AutoMan.ui.components.Factory.prototype.getItemId_ = function(item) {
  return item.supportedContent();
};

/**
 * Returns a list of supported types. 
 *
 * @alias AutoMan.ui.components.Factory.getRegisteredItems;
 * @return {!Array<String>}
 */
AutoMan.ui.components.Factory.prototype.supportedContents = function() {
  return this.getRegisteredItems();
};

/**
 * Determines if a generic type has been registered.
 * 
 * @return {Boolean}
 */
AutoMan.ui.components.Factory.prototype.isGenericRegistered = function() {
  return this.isIdRegistered(this.GenericContentType);
};

/**
 * Trys to create a component.
 *
 * @override
 * @param  {!String} itemId  [description]
 * @param  {!AutoMan.collections.Content} content
 * @return {?AutoMan.collections.Content}
 */
AutoMan.ui.components.Factory.prototype.create = function(itemId, content) {
  if(this.isIdRegistered(itemId)) {
    return goog.base(this, 'create', itemId, content);
  } else if(this.isGenericRegistered()) {
    return goog.base(this, 'create', this.GenericContentType, content);
  }

  throw new AutoMan.common.Errors(this.Errors.UnsupportedType);
};

/**
 * Easy 'this' access to generic content type.
 * 
 * @alias AutoMan.ui.components.Factory.GenericContentType
 */
AutoMan.ui.components.Factory.prototype.GenericContentType = AutoMan.ui.components.Factory.GenericContentType;

/**
 * Easy 'this' access to Errors.
 * 
 * @alias AutoMan.ui.components.Factory.Errors
 */
AutoMan.ui.components.Factory.prototype.Errors = AutoMan.ui.components.Factory.Errors;