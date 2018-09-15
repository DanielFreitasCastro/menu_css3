module.exports = function (grunt) {
  grunt.initConfig({
    // VARIABLES
    paths: {
      src: "src",
      preview: "preview",
      dist: "dist",
      bower: "bower_components",
      nodeModules: "node_modules"
    },
    pkg: grunt.file.readJSON('package.json'),

    // TASKS
    clean: {
      preview: ['<%= paths.preview %>'],
      dist: ['<%= paths.dist %>']
    },

    uglify: {
      preview: {
        options: {
          compress: false,
          beautify: true,
          mangle: false
        },
        files: {
          '<%= paths.preview %>/scripts/<%= pkg.name %>.min.js': [
            '<%= paths.src %>/scripts/**/*.js', '!<%= paths.src %>/scripts/app.js',
            '<%= paths.src %>/scripts/app.js'
          ],
        }
      },
      dist: {
        options: {
          banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          compress: true,
          mangle: true
        },
        files: {
          '<%= paths.dist %>/scripts/<%= pkg.name %>.min.js': [
            '<%= paths.src %>/scripts/**/*.js', '!<%= paths.src %>/scripts/app.js',
            '<%= paths.src %>/scripts/app.js'
          ],
        }
      }
    },

    replace: {
      preview: {
        options: {
          variables: {
            scriptPath: 'scripts/<%= pkg.name %>.min.js',
            stylePath: 'styles/<%= pkg.name %>.min.css',
            scriptLiveReload: '<script src="//localhost:35729/livereload.js"></script>'
          }
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['<%= paths.src %>/index.html'],
            dest: '<%= paths.preview %>/'
          }
        ]
      },
      dist: {
        options: {
          variables: {
            scriptPath: 'scripts/<%= pkg.name %>.min.js',
            stylePath: 'styles/<%= pkg.name %>.min.css',
            scriptLiveReload: ''
          }
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['<%= paths.src %>/index.html'],
            dest: '<%= paths.dist %>/'
          }
        ]
      }
    },

    sass: {
      preview: {
        files: {
          '<%= paths.preview %>/styles/<%= pkg.name %>.min.css': '<%= paths.src %>/styles/app.scss'
        }
      },
      dist: {
        files: {
          '<%= paths.dist %>/styles/<%= pkg.name %>.min.css': '<%= paths.src %>/styles/app.scss'
        }
      }
    },

    postcss: {
      preview: {
        options: {
          processors: [
            require('autoprefixer')({
              browsers: [
                '> 1%',
                'maintained node versions',
                'not dead',
                'last 2 versions'
              ]
            }),
          ]
        },
        files: {
          '<%= paths.preview %>/styles/<%= pkg.name %>.min.css': '<%= paths.preview %>/styles/<%= pkg.name %>.min.css'
        }
      },
      dist: {
        options: {
          processors: [
            require('autoprefixer')({
              browsers: [
                '> 1%',
                'maintained node versions',
                'not dead',
                'last 2 versions'
              ]
            }),
            require('cssnano')()
          ]
        },
        files: {
          '<%= paths.dist %>/styles/<%= pkg.name %>.min.css': '<%= paths.dist %>/styles/<%= pkg.name %>.min.css'
        }
      }
    },

    copy: {
      preview: {
        files: [
          {
            expand: true,
            cwd: '<%= paths.src %>/fonts',
            src: ['**/*'],
            dest: '<%= paths.preview %>/fonts'
          },
          {
            expand: true,
            cwd: '<%= paths.src %>/images',
            src: ['**/*'],
            dest: '<%= paths.preview %>/images'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= paths.src %>/fonts',
            src: ['**/*'],
            dest: '<%= paths.dist %>/fonts'
          },
          {
            expand: true,
            cwd: '<%= paths.src %>/images',
            src: ['**/*'],
            dest: '<%= paths.dist %>/images'
          }
        ]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['<%= paths.src %>/scripts/**/*.js'],
        tasks: ['uglify:preview'],
      },
      styles: {
        files: ['<%= paths.src %>/styles/**/*.scss'],
        tasks: ['sass:preview', 'postcss:preview'],
      },
      html: {
        files: ['<%= paths.src %>/**/*.html'],
        tasks: ['replace:preview'],
      },
      files: {
        files: ['<%= paths.src %>/fonts/*', '<%= paths.src %>/images/*', '<%= paths.src %>/media/*' ],
        tasks: ['copy:preview'],
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'clean:preview',
    'uglify:preview',
    'replace:preview',
    'sass:preview',
    'postcss:preview',
    'copy:preview',
    'watch',
  ]);

  grunt.registerTask('dist', [
    'clean:dist',
    'uglify:dist',
    'replace:dist',
    'sass:dist',
    'postcss:dist',
    'copy:dist'
  ]);
};