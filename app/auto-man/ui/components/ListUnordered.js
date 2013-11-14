goog.provide('AutoMan.ui.components.ListUnordered');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * ListUnordered Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.ListUnordered = function(options) {
  goog.base(this, options);
};

goog.object.extend(AutoMan.ui.components.ListUnordered, AutoMan.ui.components.AbstractComponent);

goog.inherits(AutoMan.ui.components.ListUnordered, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'list-unordered'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.ListUnordered.supportedContent = function() {
  return 'list-unordered';
};

AutoMan.ui.components.ListUnordered.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('ul'));
};

// Exapmle override for childnodes. Ditch when understood.
// AutoMan.ui.components.ListUnordered.prototype.addChild = function (child, opt_render) {
//   if(!(child instanceof AutoMan.ui.components.LineItem) ) {
//     console.log(child);
//   } else {
//     goog.base(this, 'addChild', child, opt_render);
//   }
// };