var config = {
  taskName: 'watch',
  scripts: {
    files: ['{app,test,tasks}/**/*.js'],
    tasks: ['jshint', 'deps', 'build-tests'],
    options: {
      spawn: true
    }
  }
};
        
module.exports = config;