(function(closure) {
  var provide = closure.provide;

  var require = closure.require;

  closure.provide = function(lib) {
    try {
      provide(lib);
    } catch (e) {};
  };

  closure.require = function(lib) {
    try {
      require(lib);
    } catch (e) {};
  }
})(goog);