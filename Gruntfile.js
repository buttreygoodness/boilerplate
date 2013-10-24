module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['{app,test}/**/*.js'],
        tasks: ['jshint', 'deps', 'test'],
        options: {
          spawn: true,
        },
      },
    },

    'closure-compiler': {
      frontend: {
       closurePath: 'bin/closure-compiler',
       js: 'bin/auto-man.js',
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

    nodestatic: {
      server: {
        options: {
          dev: true,
          keepalive: true,
          base: '.'
        }
      }
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

      'link': {
        command: [  
          'python app/lib/closure-library/closure/bin/build/closurebuilder.py --root=app --namespace=AutoMan.start --output_mode=script --output_file=bin/auto-man.js' 
        ].join('&&'),
        options: {
          callback: function(err, stdout, stderr) {
            console.log(stderr);
          }
        }
      },

      'deps': {
        command:[
          'python app/lib/closure-library/closure/bin/build/depswriter.py --root=./app/ > app/deps.js' 
        ].join('&&'),
        options: {
          callback: function(err, stdout, stderr) {
            console.log(stderr);
          }
        }
      },

      'mocha-phantomjs': {
        command: 'mocha-phantomjs -R list http://127.0.0.1:8080/test-runner.html',
        options: {
          stdout: true,
          stderr: true
        }
      }
    }
  });
    
  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodestatic');


  // Default task(s).
  grunt.registerTask('setup', ['shell:resolve-build-deps']);
  grunt.registerTask('deps', ['shell:deps']);
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('link', ['shell:link']);
  grunt.registerTask('build', ['link', 'closure-compiler']);
  grunt.registerTask('test', ['shell:mocha-phantomjs']);
  grunt.registerTask('dev', ['nodestatic']);
};