module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 8000
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['./**/*.html']
      },
      less: {
        options: {
          livereload: false
        },
        files: ['styles/less/**/*.less'],
        tasks: ['less']
      },
      css: {
        files: ['styles/css/**/*.css']
      },
      js: {
        files: ['scripts/**/*.js']
      }
    },

    less: {
      dev: {
        files: {
          'styles/css/gtrtab.css': 'styles/less/gtrtab.less',
          'styles/css/style.css': 'styles/less/style.less'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('preview', ['less', 'connect', 'watch']);
  grunt.registerTask('default', ['preview']);
};
