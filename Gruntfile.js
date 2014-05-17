/**
 * Grunt file used to build/package/test/etc. the project.
 */
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        coffee: {
            backoffice: {
                expand: true,
                flatten: true,
                cwd: 'back-office/',
                src: ['**/*.coffee'],
                dest: 'back-office/',
                ext: '.js'
            },
            frontoffice: {
                expand: true,
                flatten: true,
                cwd: 'front-office/js',
                src: ['**/*.coffee'],
                dest: 'front-office/js',
                ext: '.js'
            }
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