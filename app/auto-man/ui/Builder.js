goog.provide('AutoMan.ui.Builder');

goog.require('goog.net.XhrIo')
goog.require('goog.events.EventTarget');
goog.require('goog.array');

/**
 * [Builder description]
 */
AutoMan.ui.Builder = function(content, factory) {
	goog.base(this);

	this.factory_ = factory;

	this.content_ = content.content || {};

	this.parseing_ = false;

	this.components_ = [];
}

goog.inherits(AutoMan.ui.Builder, goog.events.EventTarget);

/*
 * Parses the json content that was passed into the Builder constructor
 * and invokes the private parse_ function asynchronously
 */
AutoMan.ui.Builder.prototype.parse = function() {
	if(!this.parseing_) {
		this.parseing_ = true;

		this.bindEvents_();

		setTimeout(this.parse_.bind(this), 1);
	}
}

/*
 * Returns components that have been created
 *
 * @return {Object}
 */
AutoMan.ui.Builder.prototype.getComponents = function() {
	return this.components_;
}

/*
 * Private function to parse the internal json content
 */
AutoMan.ui.Builder.prototype.parse_ = function() {
	this.dispatchEvent(AutoMan.ui.Builder.EventTypes.ParseStart);

	var initial = this.factory_.create(this.content_.type, this.content_);

	if(!initial) {
		this.dispatchEvent(AutoMan.ui.Builder.EventTypes.ParseError);

		return;
	}

	if(this.content_.children) {
		this.components_ = this.parseChildren_(this.content_.children, this.factory_, initial); //move this out... root should be defined in markup
	}

	this.dispatchEvent(AutoMan.ui.Builder.EventTypes.ParseComplete);
}

/*
 * Private function that recursively parses internal json content
 *
 * @param {Object} content
 * @param {Object} factory
 * @param {!Object} current
 * @return {?AutoMan.ui.components.Component}
 */
AutoMan.ui.Builder.prototype.parseChildren_ = function(content, factory, current) {
	var self = this;

	goog.array.forEach(content, function(element) {
		var component = factory.create(element.type, element);

		if(!component) {
			console.log('error', element);
		}

		current.addChild(component);

		if(goog.isArray(element.children)) {
			self.parseChildren_.bind(self)(element.children, factory, component);
		}
	});

	return current;
}

/*
 * Private internal function that binds events to the asynchronous parser
 */
AutoMan.ui.Builder.prototype.bindEvents_ = function() {
	this.listenOnce(AutoMan.ui.Builder.EventTypes.ParseComplete, this.handleParseComplete_.bind(this));
	this.listenOnce(AutoMan.ui.Builder.EventTypes.ParseError, this.handleParseError_.bind(this));
}

/*
 * Handles ParseComplete event type
 */
AutoMan.ui.Builder.prototype.handleParseComplete_ = function() {
	this.parseing_ = false;
}

/*
 * Handles ParseError event type
 */
AutoMan.ui.Builder.prototype.handleParseError_ = function() {
	this.parseing_ = false;
}

/*
 * Enum of event types for the parser function
 */
AutoMan.ui.Builder.EventTypes = {
	'ParseComplete'	: 'ParseComplete',
	'ParseError' 	: 'ParseError',
	'ParseStart' 	: 'ParseStart'
}