var _ = require('underscore');

/**
 * @param {!Object} grunt Grunt global object.
 * @param {String=} optionsKey Object key for find config data in grunt config.
 */
var SuperGlob = function(grunt, optionsKey, task) {
  this.grunt_ = grunt;

  this.task_ = task;

  this.optionsKey_ = optionsKey || SuperGlob.defaultOptionsKey;

  this.options_ = SuperGlob.defaultOptions;

  _.extend(this.options_, this.grunt_.config(this.optionsKey_));
};

/**
 * Returns task options.
 *
 * @public
 * @return {!Object}
 */
SuperGlob.prototype.getOptions = function() {
  return this.options_;
};

/**
 * Default config key.
 *
 * @static
 * @type {String}
 */
SuperGlob.defaultOptionsKey = 'super-glob';

/**
 * Default config options.
 *
 * @static
 * @type {Object}
 */
SuperGlob.defaultOptions = {
  match: '**/**.js',
  cwd: process.cwd(),
  map: function(value) {
    return value;
  },
  onComplete: function(glob, done) {
    console.log(glob);
    done();
  }
};

/**
 * Exposed task object that will glob a folder and wait for its completion then run user specified callbacks,
 * 
 * @public
 */
SuperGlob.prototype.task = function() {
  var done = this.task_.async();

  var onComplete = this.options_.onComplete.bind(this.options_);

  var map = this.options_.map.bind(this.options_);

  onComplete(_.map(this.glob_(), map), done);
};

/**
 * Globs files together by options.
 * 
 * @return {!Array<String>}
 */
SuperGlob.prototype.glob_ = function() {
  return this.grunt_.file.expand(this.options_, this.options_.match);
};

module.exports = function(grunt, optionsKey) {
  return function() {
    (new SuperGlob(grunt, optionsKey, this)).task();
  };
};