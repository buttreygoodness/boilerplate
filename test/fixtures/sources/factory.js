goog.provide('AutoMan.test.fixtures.sources.factory');

AutoMan.test.fixtures.sources.factory = function() {};

AutoMan.test.fixtures.sources.factory.create = function() {
  return {
    fetch: function(resource) {
      return {
      	then: function(fulfilled, rejected) {
      		fulfilled("deligate");
      	}
      };
    }
  };
};

AutoMan.test.fixtures.sources.factory.isIdRegistered = function(item) {
  return item === 'registered';
};