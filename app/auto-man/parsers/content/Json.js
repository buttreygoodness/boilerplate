goog.provide('AutoMan.parsers.content.Json');

goog.require('AutoMan.parsers.content.AbstractParser');
goog.require('AutoMan.collections.Content');

AutoMan.parsers.content.Json = function(parseable, options) {
  goog.base(this, parseable, options);
};

goog.inherits(AutoMan.parsers.content.Json, AutoMan.parsers.content.AbstractParser);

AutoMan.parsers.content.Json.prototype.parse_ = function() {
  return new AutoMan.collections.Content();
}