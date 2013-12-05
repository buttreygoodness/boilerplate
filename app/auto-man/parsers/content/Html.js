goog.provide('AutoMan.parsers.content.HTML');

goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.string.html.HtmlParser');
goog.require('goog.string.html.HtmlSaxHandler');

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
  if (/<[a-z][\s\S]*>/i.test(this.parsable_)) {
    this.html_ = this.parsable_;
    return true;
  }
  
  return false;
};

/**
 * Starts recursive parse.
 *  
 * @throws {AutoMan.parsers.content.Json.Errors.Unparsable} If json cannot be decoded.
 * @throws {AutoMan.parsers.content.Json.Errors.NoContent} If there is no content node.
 *
 * @return {!AutoMan.collections.Content}
 */
AutoMan.parsers.content.HTML.prototype.parse_ = function() {
  this
    .assert_(this.decode_(), AutoMan.parsers.content.HTML.Errors.Unparsable)
    .assert_(/content/i.test(this.html_), AutoMan.parsers.content.HTML.Errors.NoContent);
    
  return this.recursiveParse_(this.html_) || new AutoMan.collections.Content();
};

AutoMan.parsers.content.HTML.prototype.recursiveParse_ = function (htmlString, contentNode) {

  var html_parser = new goog.string.html.HtmlParser();
  var html_handler = new goog.string.html.HtmlSaxHandler();

  html_handler.pcdata = function (text) {
    console.log('pcdata', text);
  }

  html_handler.rcdata = function (text) {
    console.log('rcdata', text);
  }

  html_handler.cdata = function (text) {
    console.log('cdata', text);
  }

  html_handler.startTag = function (name, attributes) {
    console.log('startTag', name, attributes);
  }

  html_handler.endTag = function (name, attributes) {
    console.log('endTag', name);
  }

  html_handler.startDoc = function (name, attributes) {
    console.log('startDoc');
  }

  html_handler.endDoc = function (name, attributes) {
    console.log('endDoc');
  }
      
  var parsed = html_parser.parse(html_handler, htmlString);

  return parsed;
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