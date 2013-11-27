goog.provide('AutoMan.ui.Builder');

goog.require('goog.events.EventTarget');
goog.require('goog.array');

/**
 * @constructor
 *
 * @extends {goog.events.EventTarget}
 * 
 * @param {!Object} content
 * @param {!AutoMan.ui.components.Factory} factory
 */
AutoMan.ui.Builder = function(content, factory) {
  goog.base(this);

  this.factory_ = factory;

  this.content_ = content || {};

  this.parseing_ = false;

  this.components_ = [];
};

goog.inherits(AutoMan.ui.Builder, goog.events.EventTarget);

/**
 * Async parse of content.
 */
AutoMan.ui.Builder.prototype.parse = function() {
  if(!this.parseing_) {
    this.parseing_ = true;

    this.bindEvents_();

    setTimeout(goog.bind(this.parse_, this), 1);
  }
};

/**
 * Returns parsed component.
 * 
 * @return {?AutoMan.ui.components.Abstractcomponent}
 */
AutoMan.ui.Builder.prototype.getComponents = function() {
  return this.components_;
};

/**
 * Emits events and starts parse.
 */
AutoMan.ui.Builder.prototype.parse_ = function() {
  this.dispatchEvent(AutoMan.ui.Builder.EventTypes.ParseStart);

  var initial = this.factory_.create(this.content_.type, this.content_);

  if(!initial) {
    this.dispatchEvent(AutoMan.ui.Builder.EventTypes.ParseError);

    return;
  }

  if(this.content_.children) {
    try {
      this.components_ = this.parseChildren_(this.content_.children, this.factory_, initial);
    } catch (e) {
      this.dispatchEvent(AutoMan.ui.Builder.EventTypes.ParseError);
    }
    
  }

  this.dispatchEvent(AutoMan.ui.Builder.EventTypes.ParseComplete);
};

/**
 * Recursive parse of children.
 * 
 * @param  {!Object} content
 * @param  {!AutoMan.ui.components.Factory} factory
 * @param  {!AutoMan.ui.components.AbstractComponent} current
 * @return {!AutoMan.ui.components.AbstractComponent}
 */
AutoMan.ui.Builder.prototype.parseChildren_ = function(content, factory, current) {
  var self = this;

  goog.array.forEach(content, function(element) {
    var component = factory.create(element.type, element);

    self
      .assert_(component)
      .assert_(current);

    current.addChild(component, true);
 
    if(goog.isArray(element.children)) {
      goog.bind(self.parseChildren_, self)(element.children, factory, component);
    }
  });

  return current;
};

/**
 * Binds internal events.
 */
AutoMan.ui.Builder.prototype.bindEvents_ = function() {
  this.listenOnce(AutoMan.ui.Builder.EventTypes.ParseComplete, goog.bind(this.handleParseComplete_, this));
  this.listenOnce(AutoMan.ui.Builder.EventTypes.ParseError, goog.bind(this.handleParseError_, this));
};

/**
 * Handels parse complete. Unlocks parse.
 */
AutoMan.ui.Builder.prototype.handleParseComplete_ = function() {
  this.parseing_ = false;
};

/**
 * Handels parse error. Unlocks parse.
 */
AutoMan.ui.Builder.prototype.handleParseError_ = function() {
  this.parseing_ = false;
};

/**
 * Asserts a condition or blows up. 
 * 
 * @param  {!Boolean} condition [description]
 * @param  {Object?} options   Event arguments to pass.
 * @return {?this} Used to chain assertions.
 */
AutoMan.ui.Builder.prototype.assert_ = function(condition, options) {
  if(!condition) {
    throw(AutoMan.ui.Builder.ErrorType.AssertFailed);
  }

  return this;
};

/**
 * Enum of event types for the parser function
 *
 * @type {Object}
 */
AutoMan.ui.Builder.EventTypes = {
  'ParseComplete' : 'Parse.Complete',
  'ParseError'    : 'Parse.Error',
  'ParseStart'    : 'Parse.Start'
};

/**
 * Error types.
 * 
 * @type {Object}
 */
AutoMan.ui.Builder.ErrorType = {
  'AssertFailed' : 'Assert.Failed'
};