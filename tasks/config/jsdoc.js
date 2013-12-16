var config = {
  taskName: 'jsdoc',
  dist : {
    src: ['app/auto-man/**/*.js'],
    options: {
      destination : 'doc'
    }
  }
};

module.exports = config;