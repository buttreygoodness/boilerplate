var _ = require('underscore');
var fs = require('fs');

/**
 * @param {!Object} grunt Grunt global object.
 * @param {String=} optionsKey Object key for find config data in grunt config.
 */
var TestBuilder = function(grunt, optionsKey) {
  this.grunt_ = grunt;

	this.optionsKey_ = optionsKey || TestBuilder.defaultOptionsKey;

	this.options_ = TestBuilder.defaultOptions;

  this.globs_ = [];

  _.extend(this.options_, this.grunt_.config(this.optionsKey_));
};

/**
 * Default config key.
 *
 * @static
 * @type {String}
 */
TestBuilder.defaultOptionsKey = 'test-builder';

/**
 * Default config options.
 *
 * @static
 * @type {Object}
 */
TestBuilder.defaultOptions = {
	location: 'tests',
	grep: /.*-test\.js/,
	recursive: true,
  map: function(value) {return value;},
  onComplete: function(glob) {console.log(glob);}
};

/**
 * Exposed task object that will glob a folder and wait for its completion then run user specified callbacks,
 * 
 * @public
 */
TestBuilder.prototype.task = function() {
  this.glob_(this.options_.location);

  this.options_.onComplete(_.map(this.globs_, this.options_.map));
};

/**
 * Globs a paths files together.
 *
 * @async
 * @private
 * @param  {!String}   path
 */
TestBuilder.prototype.glob_ = function(path) {
  var self = this;

  var options = self.options_;

  var glob_ = _.bind(self.glob_, self);

  var files = fs.readdirSync(path);

  _.each(files, function(file) {
    var node = [path, file].join('/');

    if(fs.lstatSync(node).isDirectory() && options.recursive) {
      glob_(node);
    } else if(options.grep.test(file)) {
      self.globs_.push(node);
    }
  });
};

module.exports = function(grunt, optionsKey) {
  return function() {
    (new TestBuilder(grunt, optionsKey)).task();
  };
};