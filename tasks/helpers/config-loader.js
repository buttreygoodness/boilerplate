var _ = require('underscore');
var path = require('path');

/**
 * @param {!Object} options
 * @param {!Grunt} grunt
 */
function ConfigLoader(options, grunt) {
  this.grunt_ = grunt;

  this.options_ = ConfigLoader.defaultOptions;

  _.extend(this.options_, options);
}

/**
 * Loads a config or a list of configs and registers their exports in grunt config.
 * 
 * @param  {!Array<String> | !String} file
 */
ConfigLoader.prototype.load = function(file) {
  if(_.isString(file)) {
    var config = require(path.resolve([this.options_.cwd, file].join('/')));

    this.grunt_.config(config.configName || 'config-loader' , _.omit(config, 'configName'));
  } else if(_isArray(file)) {
    _.each(file, this.load.bind(this));
  }
};

/**
 * Resolves and loads all configs based of globing parameters.
 * 
 * @return {[type]} [description]
 */
ConfigLoader.prototype.loadAll = function() {
  _.each(this.glob_(), this.load.bind(this));
};

/**
 * Globs files based of options.
 *
 * @private
 * @return {!Array<String>}
 */
ConfigLoader.prototype.glob_ = function() {
  return this.grunt_.file.expand(this.options_, this.options_.match);
};

/**
 * Default options.
 * 
 * @type {Object}
 */
ConfigLoader.defaultOptions = {
  cwd: 'tasks',
  match: ['**/**.js', '!helpers/**']
};

module.exports = ConfigLoader;