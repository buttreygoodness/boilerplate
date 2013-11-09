goog.require('AutoMan.ui.components.Factory');

goog.require('AutoMan.ui.components.AbstractComponent');

goog.require('AutoMan.ui.Builder');

goog.require('AutoMan.ui.components');

var testJsonLocation = '../../app/auto-man/new.json';

describe('AutoMan.ui.Builder', function () {

  describe('#parse', function () {

    var content = {},
    builder = {};

    it('Should begin parsing', function (done) {
      goog.net.XhrIo.send(testJsonLocation, function (xhrio) {
        content = xhrio.target.getResponseJson();
        window.builder = builder = new AutoMan.ui.Builder(content, AutoMan.ui.components.factory);
        done();
      });
    });
    
    it('Should broadcast a ParseStart event.', function (done) {
      builder.parse();
      goog.events.listen(builder, AutoMan.ui.Builder.EventTypes.ParseStart, function (e) {
        done();
      });
    });

    it('Should not broadcast a ParseError event.', function (done){
      builder.parse();
      goog.events.listen(builder, AutoMan.ui.Builder.EventTypes.ParseError, function (e) {
        done(e);
      });
    });
    
    it('Should broadcast a ParseComplete event.', function (done) {
      builder.parse();
      goog.events.listen(builder, AutoMan.ui.Builder.EventTypes.ParseComplete, function (e) {
        done();
      });
    });

  });
});