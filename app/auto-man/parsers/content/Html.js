goog.provide('AutoMan.parsers.content.HTML');

goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.string');
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

  return this.recursiveParse_(this.html_) || new AutoMan.collections.Content();
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
      type: AutoMan.parsers.content.HTML.TypeMap[htmlNode.tagName.toLowerCase()] || htmlNode.tagName.toLowerCase(),
      data: {
        text: htmlNode.text,
        attributes: attributes
      }
    };

    if (htmlNode.className.split(' ') > 0) {
      nodeValue.data.classes = htmlNode.className.split(' ');
    }

    if (htmlNode.childNodes) {
      if (htmlNode.childNodes[0]) {
        // This is for replacing the javascript-safe single quotes. 
        // It should be removed later or turned into a more robust 'scrubber' for text.
        if (typeof htmlNode.childNodes[0].data === 'string') {
          nodeValue.data.text = htmlNode.childNodes[0].data.replace(/\\'/ig, "'");
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
 * Error support.
 * 
 * @type {Object}
 */
AutoMan.parsers.content.HTML.Errors = {
  'Unparsable' : 'Content.Unparsable',
  'NoContent'  : 'Content.NoContent'
};

/**
 * Type mapping for html elements (temporary).
 * 
 * @type {Object}
 */
AutoMan.parsers.content.HTML.TypeMap = {
  'a'   : 'anchor',
  'h1'  : 'title',
  'h2'  : 'heading',
  'h3'  : 'heading2',
  'img' : 'image',
  'li'  : 'lineitem',
  'ol'  : 'list-ordered',
  'p'   : 'paragraph',
  'ul'  : 'list-unordered'
};

