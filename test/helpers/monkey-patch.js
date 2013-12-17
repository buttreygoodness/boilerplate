// monkey patches things that break tests/coverage.
(function(_window, closure, $) {
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

  _window.setTimeout = function(fn, time) {
    fn();
  };
})(window, goog, jQuery);