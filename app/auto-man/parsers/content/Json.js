goog.provide('AutoMan.parsers.content.Json');

goog.require('goog.array');
goog.require('goog.object');

goog.require('AutoMan.parsers.Error');
goog.require('AutoMan.collections.Content');
goog.require('AutoMan.parsers.content.AbstractParser');

/**
 * @class Handles parsing of Json type content fragments.
 * 
 * @implements {AutoMan.parsers.content.AbstractParser}
 * 
 * @param {!String} parsable
 * @param {options=} options
 */
AutoMan.parsers.content.Json = function(parsable, options) {
  goog.base(this, parsable, options);

  /**
   * Decoded parsing context.
   *
   * @protected
   * @type {?Object}
   */
  this.parsableObject_ = null;
};

goog.inherits(AutoMan.parsers.content.Json, AutoMan.parsers.content.AbstractParser);

/**
 * Error support.
 * 
 * @type {Object}
 */
AutoMan.parsers.content.Json.Errors = {
  'Unparsable' : 'Content.Unparsable',
  'NoContent'  : 'Content.NoContent'
};

/**
 * Implements {AutoMan.parsers.content.AbstractParser#getType}
 * 
 * @return {!String}
 */
AutoMan.parsers.content.Json.getType = function() {
  return 'json';
};

/**
 * Trys to decode parsable.
 *
 * @private
 * @return {!Boolean} Could we decode the json?
 */
AutoMan.parsers.content.Json.prototype.decode_ = function() {
  try {
    this.parsableObject_ = JSON.parse(this.parsable_);
  } catch (e) {}
};

/**
 * Starts recursive parse.
 * 
 * @protected
 * @throws {AutoMan.parsers.content.Json.Errors.Unparsable} If json cannot be decoded.
 * @throws {AutoMan.parsers.content.Json.Errors.NoContent} If there is no content node.
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parsers.content.Json.prototype.parse_ = function() {
  this.decode_();

  this.assert_(this.parsableObject_, this.Errors.Unparsable);
  
  this.assert_(this.parsableObject_.content, this.Errors.NoContent);
    
  return this.recursiveParse_(this.parsableObject_.content);
};

/**
 * Recursivly walks json structure and parses nodes.
 * 
 * @param  {?Object} jsonNode Current json node.
 * @param  {?AutoMan.collections.Content} contentNode Current content node.
 * @return {?AutoMan.collections.Content}
 */
AutoMan.parsers.content.Json.prototype.recursiveParse_ = function(jsonNode, contentNode) {
  if(!jsonNode) {
    return contentNode;
  }

  var children, nodeValue, node;

  children = jsonNode.children || [];

  nodeValue = goog.object.filter(jsonNode, function(value, key) {
    return key !== 'children';
  });

  node = new AutoMan.collections.Content(nodeValue);

  if(contentNode) {
    contentNode.addChild(node);
  } else {
    contentNode = node;
  }

  goog.array.forEach(children, function(child) {
    this.recursiveParse_.bind(this)(child, node);
  }.bind(this));

  return contentNode;
};

/**
 * This access to errors.
 * 
 * @alias AutoMan.parsers.content.Json.Errors
 */
AutoMan.parsers.content.Json.prototype.Errors = AutoMan.parsers.content.Json.Errors;