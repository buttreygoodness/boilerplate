// monkey patches things that break tests/coverage.
(function(closure) {
  var provide = closure.provide;

  closure.provide = function(lib) {
    if(closure.isProvided_(lib)) {
      return;
    }

    try {
      provide(lib);
    } catch (e) {};
  };
})(goog);