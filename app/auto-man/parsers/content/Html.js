goog.provide('AutoMan.parsers.content.Html');

goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.string');
goog.require('goog.dom.DomHelper');

goog.require('AutoMan.parsers.Error');
goog.require('AutoMan.collections.Content');
goog.require('AutoMan.parsers.content.AbstractParser');

/**
 * @class Handles parsing of HTML content fragments.
 * 
 * @extends {AutoMan.parsers.content.AbstractParser}
 * 
 * @param {!String} parsable
 * @param {options=} options
 */
AutoMan.parsers.content.Html = function(parsable, options) {
  goog.base(this, parsable, options);
};

goog.inherits(AutoMan.parsers.content.Html, AutoMan.parsers.content.AbstractParser);

/**
 * Error support.
 * 
 * @type {Object}
 */
AutoMan.parsers.content.Html.Errors = {
  'Unparsable' : 'Content.Unparsable',
  'NoContent'  : 'Content.NoContent'
};

/**
 * Determines if parsable can be decoded. if so parse.
 * 
 * @return {!Boolean} Could we decode the json?
 */
AutoMan.parsers.content.Html.prototype.decode_ = function() {
  var tmpDom = document.createElement('div');
  tmpDom.id = 'root';
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

AutoMan.parsers.content.Html.prototype.hasContent_ = function () {
  return this.domHelper_.getElementsByTagNameAndClass('div', 'content').length > 0;
};

/**
 * Starts recursive parse.
 *  
 * @throws {AutoMan.parsers.content.Html.Errors.Unparsable} If HTML cannot be decoded.
 * @throws {AutoMan.parsers.content.Html.Errors.NoContent} If there is no content node.
 *
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parsers.content.Html.prototype.parse_ = function() {
  this
    .assert_(this.decode_(), AutoMan.parsers.content.Html.Errors.Unparsable)
    .assert_(this.hasContent_(), AutoMan.parsers.content.Html.Errors.NoContent);

  return this.recursiveParse_(this.html_) || new AutoMan.collections.Content();
};

/**
 * Recursivly walks HTML structure and parses nodes.
 * 
 * @param  {?Object} htmlNode Current HTML node.
 * @param  {?AutoMan.collections.Content} contentNode Current content node.
 * @return {?AutoMan.collections.Content}
 */
AutoMan.parsers.content.Html.prototype.recursiveParse_ = function (htmlNode, contentNode) {
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
        text: htmlNode.text,
        attributes: attributes
      }
    };

    var classes = htmlNode.className.split(' ');
    if (classes.length > 0 && classes[0] !== '') {
      nodeValue.data.classes = classes;
    }

    if (htmlNode.childNodes) {
      if (htmlNode.childNodes[0]) {
        // This is for replacing the javascript-safe single quotes. 
        // It should be removed later or turned into a more robust 'scrubber' for text.
        if (typeof htmlNode.childNodes[0].data === 'string') {
          nodeValue.data.text = htmlNode.childNodes[0].data.replace(/\\'/ig, '\'');
        }
      }
    }

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
 * Easy 'this' reference for Errors.
 * 
 * @type {Object}
 */
AutoMan.parsers.content.Html.prototype.Errors = AutoMan.parsers.content.Html.Errors;