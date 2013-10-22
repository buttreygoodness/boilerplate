module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['{app,test}/**/*.js'],
        tasks: ['jshint', 'deps', 'simplemocha'],
        options: {
          spawn: true,
        },
      },
    },

    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      },

      all: { src: ['test/**/*-test.js'] }
    },

    'closure-compiler': {
      frontend: {
       closurePath: 'bin/closure-compiler',
       js: 'bin/deps.js',
       jsOutputFile: 'bin/auto-man.min.js',
       options: {
         language_in: 'ECMASCRIPT5_STRICT'
       }
      }
    },

    jshint: {
      files: ['app/*.js'],
      options: {}
    },

    shell: {
      'resolve-build-deps': {
        command: [
          'git clone https://code.google.com/p/closure-compiler/ bin/closure-compiler',
          'cd bin/closure-compiler',
          'ant'
        ].join('&&'),
        options: {
          callback: function(err, stdout) {
            console.log(stdout);
          }
        }
      },

      'deps': {
        command: [
          'python app/components/closure-library/closure/bin/calcdeps.py -i app/auto-man.js -p app/components/closure-library -o script > bin/deps.js' 
        ].join('&&'),
        options: {
          callback: function(err, stdout, stderr) {
            console.log(stderr);
          }
        }
      }
    }
  });
    
  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-shell');


  // Default task(s).
  grunt.registerTask('setupt', ['shell']);
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['simplemocha']);
  grunt.registerTask('deps', ['shell:deps']);
  grunt.registerTask('build', ['deps', 'closure-compiler']);
};