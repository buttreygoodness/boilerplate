goog.provide('AutoMan.parsers.content.HTML');

goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.string.html.HtmlParser');
goog.require('goog.string.html.HtmlSaxHandler');
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
    return true;
  }
  
  return false;
};

AutoMan.parsers.content.HTML.prototype.hasContent_ = function () {
  return this.domHelper_.getElementsByTagNameAndClass('div', 'content').length > 0
}

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
    
  //return this.saxParse_(this.html_) || new AutoMan.collections.Content();

  return this.recursiveParse_(this.html_.firstChild) || new AutoMan.collections.Content();
};

AutoMan.parsers.content.HTML.prototype.recursiveParse_ = function (htmlNode, contentNode) {
  var self = this;
  
  if (htmlNode) {
    var children = htmlNode.children || [];

    var attributes = {};

    var nodeAttributes = goog.object.filter(htmlNode.attributes, function(value, key) {
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


   return contentNode;
  }
};

/**
 * SAX parse the document.
 */
AutoMan.parsers.content.HTML.prototype.saxParse_ = function (htmlString, contentNode) {

  var html_parser = new goog.string.html.HtmlParser();
  var html_handler = new goog.string.html.HtmlSaxHandler();
  var node;
  var contentDepth = -1;
  var previousDepth = -1;

  html_handler.pcdata = function (text) {
    node.value_.data.text = text;
  };

  html_handler.rcdata = function (text) {
    node.value_.data.text = text;
  };

  html_handler.cdata = function (text) {
    node.value_.data.text = text;
  };

  html_handler.startTag = function (name, attributes) {
    console.log(attributes);
    var attrs = attributes || [];

    node = new AutoMan.collections.Content({
      type: name,
      data: {
        attributes: attrs
      }
    });

    if (contentDepth === previousDepth) {
      contentNode.addChild(node);
    } else {
      contentNode.getChildAt(contentDepth).addChild(node);
      previousDepth = contentDepth;
    }

    contentDepth++;
  };

  html_handler.endTag = function () {
    contentDepth --;
  };

  html_handler.startDoc = function () {
    contentNode = new AutoMan.collections.Content({
      type: 'div',
      data: {
        attributes: {
          id: 'root'
        }
      }
    });
  };

  html_handler.endDoc = function () {
    window.htmlContent = contentNode;
  };
    
  html_parser.parse(html_handler, htmlString);

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