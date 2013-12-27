goog.require('AutoMan.sources.Source');
goog.require('AutoMan.common.Error');

goog.require('AutoMan.test.fixtures.sources');

describe('AutoMan.sources.Source', function() {
  describe('#getType', function() {
    it('Should return "*".', function() {
      should.exist(AutoMan.sources.Source.getType);

      AutoMan.sources.Source.getType().should.equal('*');
    });
  });

  describe('#fetch', function() {   
    var source;

    beforeEach(function() {
      source = new AutoMan.sources.Source(AutoMan.test.fixtures.sources.factory);
    });

    it('Should only return an AutoMan.sources.Source.Errors.NoResourceresource error on no resource provided.', function(done) {
      source.fetch({
        type: 'registered'
      }).then(function(){}, function(error) {
        should.exist(error);

        error.should.be.instanceOf(AutoMan.common.Error);
        error.getCode().should.equal(source.Errors.NoResourceresource);

        done();
      });
    });

    it('Should only return an AutoMan.sources.Source.Errors.NoResourceType on no type provided.', function(done) {
      source.fetch({
        resource: 'space'
      }).then(function() {}, function(error) {
        should.exist(error);

        error.should.be.instanceOf(AutoMan.common.Error);
        error.getCode().should.equal(source.Errors.NoResourceType);

        done();
      });
    });

    it('Should only return AutoMan.sources.Source.Errors.ResourceTypeNotSupported on none suported types.', function(done) {
      source.fetch({
        resource: 'space',
        type    :  'icecream'
      }).then(function(){}, function(error) {
        should.exist(error);

        error.should.be.instanceOf(AutoMan.common.Error);
        error.getCode().should.equal(source.Errors.ResourceTypeNotSupported);

        done();
      });
    });

    it('Should proxy fetch.', function(done) {
      source.fetch({
        type: 'registered',
        resource: 'space'
      }).then(function(body) {
        should.exist(body);
        body.should.equal('deligate');

        done();
      });
    });
  });
});