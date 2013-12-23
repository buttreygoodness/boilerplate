goog.provide('AutoMan.common.Event');

goog.require('goog.events.Event');

/**
 * Event object that allows for extra data to be passed.
 *
 * @extends {goog.evet.Event}
 *
 * @param {!String} event
 * @param {!goog.event.EventTarget} target
 * @param {?Object<String, *>} data
 */
AutoMan.common.Event = function(event, target, data) {
  goog.base(this, event, target);

  /**
   * Data that will be passed to subscriber.
   *
   * @private
   * @type {Object<String, *>}
   */
  this.data_ = data || {};
};

goog.inherits(AutoMan.common.Event, goog.events.Event);

/**
 * Retrieves the data stored on this event.
 * 
 * @return {!Object<String, *>}
 */
AutoMan.common.Event.prototype.getData = function() {
  return this.data_;
};