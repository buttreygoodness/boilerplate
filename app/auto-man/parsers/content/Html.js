goog.provide('AutoMan.parsers.content.HTML');

goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.dom.DomHelper');

goog.require('AutoMan.parsers.Error');
goog.require('AutoMan.collections.Content');
goog.require('AutoMan.parsers.content.AbstractParser');

/**
 * @implements {AutoMan.parsers.content.AbstractParser}
 * 
 * @param {!String} parsable
 * @param {options=} options
 */
AutoMan.parsers.content.HTML = function(parsable, options) {
  goog.base(this, parsable, options);
};

goog.inherits(AutoMan.parsers.content.HTML, AutoMan.parsers.content.AbstractParser);

/**
 * Determines if parsable can be decoded. if so parse.
 * 
 * @return {!Boolean} Could we decode the json?
 */
AutoMan.parsers.content.HTML.prototype.decode_ = function() {
  var tmpDom = document.createElement('body');
  tmpDom.innerHTML = this.parsable_;

  if (tmpDom.children.length > 0) {
    this.html_ = tmpDom;
    this.domHelper_ = new goog.dom.DomHelper(this.html_);

    tmpDom = null;
    
    return true;
  }
  
  tmpDom = null;

  return false;
};

AutoMan.parsers.content.HTML.prototype.hasContent_ = function () {
  return this.domHelper_.getElementsByTagNameAndClass('div', 'content').length > 0;
};

/**
 * Starts recursive parse.
 *  
 * @throws {AutoMan.parsers.content.HTML.Errors.Unparsable} If HTML cannot be decoded.
 * @throws {AutoMan.parsers.content.HTML.Errors.NoContent} If there is no content node.
 *
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parsers.content.HTML.prototype.parse_ = function() {
  this
    .assert_(this.decode_(), AutoMan.parsers.content.HTML.Errors.Unparsable)
    .assert_(this.hasContent_(), AutoMan.parsers.content.HTML.Errors.NoContent);

  return this.recursiveParse_(this.html_.firstChild) || new AutoMan.collections.Content();
};

/**
 * Recursivly walks HTML structure and parses nodes.
 * 
 * @param  {?Object} htmlNode Current HTML node.
 * @param  {?AutoMan.collections.Content} contentNode Current content node.
 * @return {?AutoMan.collections.Content}
 */
AutoMan.parsers.content.HTML.prototype.recursiveParse_ = function (htmlNode, contentNode) {
  var self = this;
  
  if (htmlNode) {
    var children = htmlNode.children || [];

    var attributes = {};

    goog.object.filter(htmlNode.attributes, function(value) {
      if (typeof value === 'object') {
        attributes[value.name] = value.value;
        return true;
      }
    });

    var nodeValue = {
      type: htmlNode.tagName.toLowerCase(),
      data: {
        classes: htmlNode.className.split(' '),
        text: htmlNode.text,
        attributes: attributes
      }
    };

    var node = new AutoMan.collections.Content(nodeValue);

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
AutoMan.parsers.content.HTML.Errors = {
  'Unparsable' : 'Content.Unparsable',
  'NoContent'  : 'Content.NoContent'
};