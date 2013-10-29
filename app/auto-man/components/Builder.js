goog.provide('AutoMan.Builder');

goog.require('goog.events.EventTarget');
goog.require('goog.structs.TreeNode');
goog.require('goog.array');

AutoMan.Builder = function(content, factory) {
	goog.base(this);

	this.factory_ = factory;

	this.content_ = content || [];

	this.parseing_ = false;

	this.components_ = [];
}

goog.inherits(AutoMan.Builder, goog.events.EventTarget);

AutoMan.Builder.prototype.parse = function() {
	if(!this.parseing_) {
		this.parseing_ = true;

		this.bindEvents_();

		setTimeout(this.parse_.bind(this), 0);
	}
}

AutoMan.Builder.prototype.parse_ = function() {
	this.dispatchEvent(AutoMan.Builder.EventTypes.ParseComplete);
}

AutoMan.Builder.prototype.bindEvents_ = function() {
	this.listenOnce(AutoMan.Builder.EventTypes.ParseComplete, this.handleParseComplete_.bind(this));
	this.listenOnce(AutoMan.Builder.EventTypes.ParseError, this.handleParseError_.bind(this));
}

AutoMan.Builder.prototype.handleParseComplete_ = function() {
	this.parseing_ = false;
}

AutoMan.Builder.prototype.handleParseError_ = function() {
	this.parseing_ = false;
}

AutoMan.Builder.prototype.isParsing = function() {
	return this.parseing_;
}

AutoMan.Builder.prototype.getComponents = function() {
	return this.components_;
}

AutoMan.Builder.EventTypes = {
	'ParseComplete'	: 'ParseComplete',
	'ParseError' 	: 'ParseError',
	'ParseStart' 	: 'ParseStart'
}