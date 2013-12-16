var config = {
  taskName: 'connect',
  'default': {
    options: {
      port: 8080,
      cwd: '.'
    }
  },

  'keep-alive' : {
    options: {
      port: 8081,
      cwd: '.',
      keepalive: true
    }
  },

  'test': {
    options: {
      port: '?',
      base: '.',
      hostname: '*'
    }
  }
};

module.exports = config;