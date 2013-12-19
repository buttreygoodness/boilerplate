var config = {
  taskName: 'watch',
  scripts: {
    files: ['{app,test,tasks}/**/*.js'],
    tasks: ['jshint', 'deps', 'build-tests'],
    options: {
      spawn: true
    }
  },
  css: {
    files: ['app/sandbox/scss/**/*.scss'],
    tasks: ['compass']
  }
};
        
module.exports = config;