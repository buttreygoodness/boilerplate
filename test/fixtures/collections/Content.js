goog.provide('AutoMan.test.fixtures.collections.Content');

goog.require('AutoMan.collections.Content');

AutoMan.test.fixtures.collections.Content = function() {
  goog.base(this, {
    'type': 'div',
    'data': {
      'attributes': {
        'id': 'root'
      }
    }
  });

  this.addChild(new AutoMan.collections.Content({
    'type': 'div',
    'data': {
      'attributes': {
        'id': 'no-child'
      }
    }
  }));

  this.addChild(new AutoMan.collections.Content({
    'type': 'div',
    'data': {
      'attributes': {
        'id': 'has-children'
      }
    }
  }));

  this.getChildAt(1).addChild(new AutoMan.collections.Content({
    'type': 'div',
    'data': {
      'attributes': {
        'id': 'child-1'
      }
    }
  }));

  this.getChildAt(1).addChild(new AutoMan.collections.Content({
    'type': 'div',
    'data': {
      'attributes': {
        'id': 'child-2'
      }
    }
  }));
};

goog.inherits(AutoMan.test.fixtures.collections.Content, AutoMan.collections.Content);