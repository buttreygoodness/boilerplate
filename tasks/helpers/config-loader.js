var _ = require('underscore');
var path = require('path');

'use strict';

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
    var configPath = path.resolve([this.options_.cwd, file].join('/'));

    var config = require(path.resolve(configPath));

    if(!config.taskName) {
      throw new Error(['Missing', this.options_.taskName, 'in', configPath].join(' '));
    }

    this.grunt_.config(config.taskName, _.omit(config, this.options_.taskName));
  } else if(_.isArray(file)) {
    _.each(file, this.load.bind(this));
  }
};

/**
 * Resolves and loads all configs based of globing parameters.
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
  match: ['**/**.js'],
  taskName: 'taskName'
};

module.exports = ConfigLoader;