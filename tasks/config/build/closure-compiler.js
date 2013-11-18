var config = {
  configName:'closure-compiler',
  frontend: {
   closurePath: 'bin/closure-compiler',
   js: 'bin/auto-man.js',
   jsOutputFile: 'bin/auto-man.min.js',
   options: {
     language_in: 'ECMASCRIPT5_STRICT'
   }
  }
};

module.exports = config;