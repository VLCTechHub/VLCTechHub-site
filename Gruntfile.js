module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ["css"]
        },
        files: {
          "css/style.css": "css/all.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', ['less:development']);
};