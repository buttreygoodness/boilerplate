var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var Mustache = require('mustache');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['{app,tests}/**/*.js', 'tasks/**/*.js', '!app/deps.js'],
        tasks: ['jshint', 'deps' ,'tests'],
        options: {
          spawn: true
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
      all: ['app/(!lib)**/*.js', 'Gruntfile.js', 'tests/**/*.js', 'tasks'],
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

    'spec-glob': {
      map: function(script) {
        return '/' + script;        
      },
      onComplete: function(scripts) {
        var template = fs.readFileSync('tasks/test-runner-template.html').toString();
        
        var view = {'scripts' : scripts};

        _.each(scripts, function(script) {
          var out = path.dirname('./' + script) + '/' + path.basename(script, path.extname(script)) + '.html';
          
          fs.writeFileSync(out, Mustache.render(template, {'scripts': [script]}));
        });

        fs.writeFileSync('tests/test-runner.html', Mustache.render(template, view));
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

      'bower': {
        command: [
          'bower install'
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
      }
    },

    mocha_phantomjs: {
      all: {
        options: {
          urls: ['http://localhost:8080/tests/test-runner.html']
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
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

  grunt.registerTask('setup', ['shell:resolve-build-deps', 'shell:bower']);
  grunt.registerTask('deps', ['shell:deps']);
  grunt.registerTask('link', ['shell:link']);
  grunt.registerTask('build', ['link', 'closure-compiler']);
  grunt.registerTask('dev', ['nodestatic']);
  grunt.registerTask('test', ['mocha_phantomjs']);

  grunt.registerTask('spec-glob', require('./tasks/spec-glob.js')(grunt));

  grunt.registerTask('default', ['watch']);
};