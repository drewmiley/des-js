/* global module, require */

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            srcFiles: [
                'src/**/*'
            ],
            srcJsFiles: [
                'src/des.js',
                'src/chart/**/*.js',
                'src/util/**/*.js',
                'src/form/**/*.js',
                'src/onestep/**/*.js'
            ],
            ourJsFiles: [
                'Gruntfile.js',
                '<%= meta.srcJsFiles %>'
            ],
            coverageDir: 'coverage'
        },

        jscs: {
            options: {
                config: '.jscsrc'
            },
            failOnError: {
                files: {
                    src: ['<%= meta.ourJsFiles %>']
                }
            },
            warnOnly: {
                options: {
                    force: true
                },
                files: {
                    src: ['<%= meta.ourJsFiles %>']
                }
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            failOnError: {
                files: {
                    src: ['<%= meta.ourJsFiles %>']
                }
            },
            warnOnly: {
                options: {
                    force: true
                },
                files: {
                    src: ['<%= meta.ourJsFiles %>']
                }
            }
        },

        uglify: {
            components: {
                files: {
                    'dist/des-js.min.js': ['dist/des-js.js']
                }
            }
        },

        concat: {
            development: {
                src: ['<%= meta.srcJsFiles %>'],
                dest: 'dist/des-js.js',
                options: {
                    sourceMap: true
                }
            },
            production: {
                src: ['<%= meta.srcJsFiles %>'],
                dest: 'dist/des-js.js',
                options: {
                    sourceMap: false
                }
            }
        }

    });

    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*']
    });

    grunt.registerTask('default', ['build']);

    grunt.registerTask('build', ['jshint:failOnError', 'jscs:failOnError', 'concat:production', 'uglify:components']);

};