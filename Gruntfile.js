const grunt = require('grunt');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    
  'create-windows-installer': {
    ia32: {
    appDirectory: '/Users/vincentking/Desktop/packagedApps/Gre-win32-ia32',
    outputDirectory: '/Users/vincentking/Desktop/installApps',
    authors: 'VeritasSmith',
    exe: 'Gre.exe'
  }
}



  });

  // Load the plugin that provides the "uglify" task.
 // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-electron-installer')

  // Default task(s).
  grunt.registerTask('default', ['create-windows-installer']);

};




