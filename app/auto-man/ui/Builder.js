goog.provide('AutoMan.ui.Builder');

goog.require('goog.events.EventTarget');
goog.require('goog.structs.TreeNode');
goog.require('goog.array');

AutoMan.ui.Builder = function(content, factory) {
	goog.base(this);

	this.factory_ = factory;

	this.content_ = content || [];

	this.parseing_ = false;

	this.components_ = [];
}

goog.inherits(AutoMan.ui.Builder, goog.events.EventTarget);

AutoMan.ui.Builder.prototype.parse = function() {
	if(!this.parseing_) {
		this.parseing_ = true;

		this.bindEvents_();

		setTimeout(this.parse_.bind(this), 0);
	}
}

AutoMan.ui.Builder.prototype.parse_ = function() {

	var recursiveParser = function(content, factory, current) {

		goog.array.forEach(content, function(element) {

			var component = factory.create(element.type, element);

			if(!component) {
				console.log(element);
			}

			current.addChild(component);

			if(goog.isArray(element.content)) {
				recursiveParser(element.content, factory, component);
			}
		});

		return current;
	}

	this.components_ = recursiveParser(this.content_, this.factory_, this.factory_.create('root')); //move this out... root should be defined in markup

	this.dispatchEvent(AutoMan.ui.Builder.EventTypes.ParseComplete);
}

AutoMan.ui.Builder.prototype.bindEvents_ = function() {
	this.listenOnce(AutoMan.ui.Builder.EventTypes.ParseComplete, this.handleParseComplete_.bind(this));
	this.listenOnce(AutoMan.ui.Builder.EventTypes.ParseError, this.handleParseError_.bind(this));
}

AutoMan.ui.Builder.prototype.handleParseComplete_ = function() {
	this.parseing_ = false;
}

AutoMan.ui.Builder.prototype.handleParseError_ = function() {
	this.parseing_ = false;
}

AutoMan.ui.Builder.prototype.isParsing = function() {
	return this.parseing_;
}

AutoMan.ui.Builder.prototype.getComponents = function() {
	return this.components_;
}

AutoMan.ui.Builder.EventTypes = {
	'ParseComplete'	: 'ParseComplete',
	'ParseError' 	: 'ParseError',
	'ParseStart' 	: 'ParseStart'
}