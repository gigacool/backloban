/**
 * Grunt file used to build/package/test/etc. the project.
 */
module.exports = function (grunt) {

    var nodePackage = grunt.file.readJSON('./package.json');
    // grunt task definitions
    grunt.initConfig({
        pkg: nodePackage,
        // coffeescript compilation tasks
        coffee: {

        },
        uglify: {
            minify: {
                files: [
                    {
                        expand: true,
                        cwd: 'front-office/js/backloban',
                        src: ['**/*.js'],
                        dest: 'front-office/js/backloban',
                        ext: '.min.js'
                    }
                ]
            }
        },
        watch: {
            coffee: {
                files: ['front-office/js/backlogan/**/*.coffee', 'back-office/**/*.coffee'],
                tasks: ['coffee:compile'],
                options: {
                    debounceDelay: 500 // check only twice a second
                    //,event: ['all', 'changed', 'added', 'deleted'] // filter by events
                }
            }
        }
    });

    // setup environment - task dependencies
    grunt.loadNpmTasks('grunt-contrib-uglify'); // minifier tool
    grunt.loadNpmTasks('grunt-contrib-coffee'); // coffeescript compiler
    grunt.loadNpmTasks('grunt-contrib-watch'); // watch tasks

    // register default task
    grunt.registerTask('release', ['coffee', 'uglify:minify']);
    grunt.registerTask('default', ['coffee']);


};