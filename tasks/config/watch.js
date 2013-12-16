var config = {
  taskName: 'watch',
  scripts: {
    files: ['{app,test}/**/*.js', 'tasks/**/*.js', '!app/auto-man/deps.js'],
    tasks: ['jshint', 'deps'],
    options: {
      spawn: true
    }
  }
};
        
module.exports = config;