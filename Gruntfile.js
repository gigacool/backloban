/**
 * Grunt file used to build/package/test/etc. the project.
 */
module.exports = function (grunt) {

    var nodePackage = grunt.file.readJSON('./package.json');
    var stemPackage = grunt.file.readJSON('./stem.json');
    if (stemPackage.version !== nodePackage.version){
        stemPackage.version = nodePackage.version;
        stemPackage.build = 0;
    }
    var version = nodePackage.version + '.' + stemPackage.build++;
    grunt.file.write('./stem.json', JSON.stringify(stemPackage));
    console.log('Build #' + version);
    // grunt task definitions
    grunt.initConfig({
        pkg: nodePackage,
        version: version,
        banner: '/*! <%= pkg.name %>@<%= version %> by <%= pkg.author %> on <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        // test server (usage to be defined
        connect: {
            test: {
                port: 8764,
                base: 'testRoot'
            }
        },
        // clean directories
        clean: {
            public: ['public/js/stem'],
            tests: ['test/public/js']
        },
        // coffeescript compilation tasks
        coffee: {
            // compile stem project first
            stem: {
                options: {
                    join: true
                },
                files: {
                    "public/js/stem/stem.js": [
                        "sources/stem/Bus.coffee",
                        "sources/stem/Core.coffee",
                        "sources/stem/stem.coffee"
                    ]
                }

            },
            server: {
                options: {
                    bare: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'sources/server/',
                        src: ['**/*.coffee'],
                        dest: 'server/',
                        ext: '.js'
                    }
                ]
            },
            client: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/js/',
                        src: ['**/*.coffee'],
                        dest: 'public/js/',
                        ext: '.js'
                    }
                ]
            }

        },
        uglify: {
            options: {
                banner: "<%= banner %>"

            },
            minify: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/js/stem/',
                        src: ['**/*.js'],
                        dest: 'public/js/stem/',
                        ext: '.min.js'
                    }
                ]
            }
        },
        compass: {
            override: {
                options: {
                    sassDir: 'stylesheets',
                    cssDir: 'public/css',
                    environment: 'production'
                }
            }
        },
        watch: {
            coffee: {
                files: ['src/cast/**/*.coffee'],
                tasks: ['coffee:compile', 'jasmine:testWithRequire'],
                options: {
                    debounceDelay: 500 // check only twice a second
                    //,event: ['all', 'changed', 'added', 'deleted'] // filter by events
                }
            }
        },
        copy: {
            tests: {
                files: [
                    {expand: false, src: ['public/js/**/*'], dest: 'test/'}
                ]
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'version',
                            replacement: '<%= version %>'
                        }
                    ]
                },
                files: [
                    {expand: false, src: ['public/js/**/*.js'], dest: './'},
                    {expand: false, src: ['server/**/*.js'], dest: './'}
                ]
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'build/<%= pkg.name %>.<%= version() %>.zip'
                },
                files: [
                    {expand: true, cwd: 'build/src/', src: ['**'], dest: '<%= pkg.name %>.<%= version() %>/'} // makes all src relative to cwd
                ]
            }
        }
    });

    // setup environment - task dependencies
    grunt.loadNpmTasks('grunt-contrib-uglify'); // minifier tool
    grunt.loadNpmTasks('grunt-contrib-coffee'); // coffeescript compiler
    grunt.loadNpmTasks('grunt-contrib-compass'); // compass sass compiler
    grunt.loadNpmTasks('grunt-contrib-watch'); // watch tasks
    grunt.loadNpmTasks('grunt-contrib-clean'); // clean tasks
    grunt.loadNpmTasks('grunt-contrib-copy'); // clean tasks
    grunt.loadNpmTasks('grunt-contrib-compress'); // zip tasks
    grunt.loadNpmTasks('grunt-replace'); // grep tasks

    // register default task
    grunt.registerTask('reset', ['clean']);
    grunt.registerTask('tests', ['clean:tests', 'coffee:stem', 'copy:tests']);
    grunt.registerTask('release', []);
    grunt.registerTask('default', ['clean:public', 'coffee', 'replace:dist', 'uglify:minify', 'compass:override']);


};