goog.provide('AutoMan.parsers.content.Json');

goog.require('goog.array');
goog.require('goog.object');

goog.require('AutoMan.parsers.Error');
goog.require('AutoMan.collections.Content');
goog.require('AutoMan.parsers.content.AbstractParser');

/**
 * @implements {AutoMan.parsers.content.AbstractParser}
 * 
 * @param {!String} parsable
 * @param {options=} options
 */
AutoMan.parsers.content.Json = function(parsable, options) {
  goog.base(this, parsable, options);
};

goog.inherits(AutoMan.parsers.content.Json, AutoMan.parsers.content.AbstractParser);

/**
 * Determines if parsable can be decoded. if so parse.
 * 
 * @return {!Boolean} Could we decode the json?
 */
AutoMan.parsers.content.Json.prototype.decode_ = function() {
  try {
    this.json_ = JSON.parse(this.parsable_);
  } catch (e) {
    return false;
  }

  return true;
};

/**
 * Starts recursive parse.
 *  
 * @throws {AutoMan.parsers.content.Json.Errors.Unparsable} If json cannot be decoded.
 * @throws {AutoMan.parsers.content.Json.Errors.NoContent} If there is no content node.
 *
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parsers.content.Json.prototype.parse_ = function() {
  this
    .assert_(this.decode_(), AutoMan.parsers.content.Json.Errors.Unparsable)
    .assert_(this.json_.content, AutoMan.parsers.content.Json.Errors.NoContent);
    
  return this.recursiveParse_(this.json_.content) || new AutoMan.collections.Content();
};

/**
 * Recursivly walks json structure and parses nodes.
 * 
 * @param  {?Object} jsonNode Current json node.
 * @param  {?AutoMan.collections.Content} contentNode Current content node.
 * @return {?AutoMan.collections.Content}
 */
AutoMan.parsers.content.Json.prototype.recursiveParse_ = function(jsonNode, contentNode) {
  var self = this;

  if(jsonNode) {
    var children = jsonNode.children || [];

    var nodeValue = goog.object.filter(jsonNode, function(value, key) {
      return key !== 'children';
    });

    var node = new AutoMan.collections.Content(nodeValue.id, nodeValue);

    if(contentNode) {
      contentNode.addChild(node);
    } else {
      contentNode = node;
    }

    goog.array.forEach(children, function(child) {
      self.recursiveParse_.bind(self)(child, node);
    });
  }

  return contentNode;
};

/**
 * Error support.
 * 
 * @type {Object}
 */
AutoMan.parsers.content.Json.Errors = {
  'Unparsable' : 'Content.Unparsable',
  'NoContent'  : 'Content.NoContent'
};