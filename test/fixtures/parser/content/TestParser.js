goog.provide('AutoMan.test.fixtures.parser.content.TestParser');

goog.require('AutoMan.parser.Error');
goog.require('AutoMan.parser.content.AbstractParser');
goog.require('AutoMan.collections.Content');

AutoMan.test.fixtures.parser.content.TestParser = function(parsable, options) {
  goog.base(this, parsable, options);
};

goog.inherits(AutoMan.test.fixtures.parser.content.TestParser, AutoMan.parser.content.AbstractParser);

AutoMan.test.fixtures.parser.content.TestParser.prototype.parse_ = function() {
  if(this.options_.pass) {
    return new AutoMan.collections.Content();
  } else {
    this.assert_(false);
  }
};