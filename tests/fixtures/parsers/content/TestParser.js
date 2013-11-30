goog.provide('AutoMan.tests.fixtures.parsers.content.TestParser');

goog.require('AutoMan.parsers.content.AbstractParser');
goog.require('AutoMan.collections.Content');

AutoMan.tests.fixtures.parsers.content.TestParser = function(parsable, options) {
  goog.base(this, parsable, options);
};

goog.inherits(AutoMan.tests.fixtures.parsers.content.TestParser, AutoMan.parsers.content.AbstractParser);

AutoMan.tests.fixtures.parsers.content.TestParser.prototype.parse_ = function() {
  return new AutoMan.collections.Content();
};