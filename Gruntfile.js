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
      css: {
        files: ['styles/**/*.css']
      },
      js: {
        files: ['scripts/**/*.js']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('preview', ['connect', 'watch']);
  grunt.registerTask('default', ['preview']);
};
