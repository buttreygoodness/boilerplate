
var _ = require('underscore');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

/**
 * @param {!Object} context Grunt context as passed to a task.
 * @param {!Object} grunt Grunt global object.
 * @param {String=} optionsKey Object key for find config data in grunt config.
 */
var SpecGlobber = function(context, grunt, optionsKey) {
	this.context_ = context;

  this.grunt_ = grunt;

	this.done_ = this.context_.async();

	this.optionsKey_ = optionsKey || SpecGlobber.defaultOptionsKey;

	this.options_ = SpecGlobber.defaultOptions;

  this.eventEmitter_ = new EventEmitter();

  this.nodes_ = 0;

  this.globs_ = [];

  _.extend(this.options_, this.grunt_.config(this.optionsKey_));
};

/**
 * Default config key.
 *
 * @static
 * @type {String}
 */
SpecGlobber.defaultOptionsKey = 'spec-glob';

/**
 * Default config options.
 *
 * @static
 * @type {Object}
 */
SpecGlobber.defaultOptions = {
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
SpecGlobber.prototype.task = function() {
  var map = this.options_.map;

  this.eventEmitter_.addListener('glob.complete', _.bind(function(){
    this.options_.onComplete(_.map(this.globs_, map));

    this.done_();
  }, this));

  this.glob_(this.options_.location);
};

/**
 * Globs a paths files together.
 *
 * @async
 * @private
 * @param  {!String}   path
 */
SpecGlobber.prototype.glob_ = function(path) {
  var self = this;

  var options = self.options_;

  var glob_ = _.bind(this.glob_, this);

  self.addNode_();

  fs.readdir(path, function(err, files) {
    if(err) {
      throw(err);
    }

    _.each(files, function(file) {
      var node = [path, file].join('/');

      if(fs.lstatSync(node).isDirectory() && options.recursive) {
        glob_(node);
      } else if(options.grep.test(file)) {
        self.globs_.push(node);
      }
    });

    self.removeNode_();
  });
};

/**
 * Adds a node to the counter. this allows us to have some metric on completion of the glob method.
 *
 * @private
 */
SpecGlobber.prototype.addNode_ = function() {
  this.nodes_++;
};

/**
 * Removes a completed node from counter. Will notify when glob reaches 0.
 * 
 * @private
 */
SpecGlobber.prototype.removeNode_ = function() {
  this.nodes_--;

  if(this.nodes_ === 0) {
    this.eventEmitter_.emit('glob.complete');
  }
};

module.exports = function(grunt, optionsKey) {
  return function() {
    var specGlobber = new SpecGlobber(this, grunt, optionsKey);

    return specGlobber.task();
  };
};