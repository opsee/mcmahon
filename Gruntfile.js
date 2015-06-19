module.exports = function(grunt) {

  var load = require('load-grunt-tasks')(grunt)
  , rewrite = require( "connect-modrewrite" )
  ;

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell:{
      jekyll:{
        command:'jekyll build --source _site --destination blog --config _config.yml'
      },
      npm:{
        command:'npm install'
      },
      bower:{
        command:'bower install'
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          hostname:'localhost',
          base: '',
          open:true,
          middleware: function(connect, options, middlewares) {
            var rules = [
                "!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.woff|\\.tiff|\\.gif$ /index.html"
            ];
            middlewares.unshift( rewrite( rules ) );
            return middlewares;
          }
        }
      }
    },
    copy:{
      html:{
        files:[
        {
          src:'dist/index.html',
          dest:'index.html',
          filter:'isFile'
        }
        ]
      }
    },
    uglify:{
      deps:{
        options:{
          mangle:false,
          compress:false
        },
        files:{
          'public/js/dist/deps.min.js':[
            'angular/angular.min',
            'angular-bootstrap/ui-bootstrap-tpls',
            'lodash/lodash.min',
            'angulartics/dist/angulartics.min',
            'angulartics/dist/angulartics-ga.min',
            'angular-animate/angular-animate.min',
            'angular-ui-router/release/angular-ui-router',
            'angular-aria/angular-aria.min',
            'angular-touch/angular-touch.min',
            'fastclick/lib/fastclick'
          ].map(function(f){
            return 'public/lib/'+f+'.js';
          })
        }
      },
      annotated: {
        options:{
          mangle:false,
          compress:false
        },
        files:{
          'public/js/dist/opsee.min.js':['public/js/dist/deps.min.js','public/js/src/app.app.js','public/**/*.annotated.js']
        }
      },
    },
    clean:{
      annotated:['**/*.annotated.js','**/*.app.js'],
    },
    autoprefixer:{
      single_file:{
        options:{
          browsers:['last 2 versions']
        },
        src:'css/src/style.css',
        dest:'css/dist/style.min.css'
      }
    },
    ngAnnotate:{
      options:{
        add:true,
        remove:true
      },
      all:{
        files:[
        {
          expand:true,
          src:['public/js/src/**/*.js'],
          ext:'.annotated.js',
          extDot:'last'
        }
        ]
      },
      //we have two annotate tasks because the app.js needs 
      //to load in before all the other modules
      app:{
        files:[
        {
          expand:true,
          src:['public/js/src/app.js'],
          ext:'.app.js',
          extDot:'last'
        }
        ]
      },
    },
    watch:{
      grunt:{
        files:['Gruntfile.js'],
        tasks:['uglify:deps']
      },
      j:{
        options:{
          livereload:true
        },
        files:['_site/**/*.**'],
        tasks:['shell:jekyll','copy']
      },
      srcScripts:{
        options:{
           livereload:true
         },
        files:['js/public/**/*.js'],
      },
      sass:{
        files:['scss/**/*.scss'],
        tasks:['compass:dist']
      },
      css:{
        options:{
          livereload:true
        },
        files:['public/css/**/*.css']
      },
      pages:{
        options:{
          livereload:true
        },
        files:['public/**/*.html']
      }
    },
    compass:{
      dist:{
        options:{
          cssDir:'public/css/src',
          sassDir:'scss',
          imagesDir:'public/img',
          fontsPath:'fonts',
          require:['breakpoint','sass-css-importer', 'compass-flexbox'],
          httpPath:'',
          relativeAssets:true,
          noLineComments:true,
          outputStyle:'compact'
        }
      }
    },
    concurrent:{
      setup:['shell:npm','shell:bower'],
      build:['uglify:deps','buildJekyll','compass:dist']
    },
  });


  grunt.registerTask('buildJekyll', ['shell:jekyll','copy']);
  grunt.registerTask('init', ['concurrent:setup','concurrent:build']);
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('annotate', ['ngAnnotate','uglify:annotated','clean:annotated']);
  grunt.registerTask('prod', ['concurrent:setup','concurrent:build','annotate']);
  grunt.registerTask('docker', ['install', 'compass', 'build', 'shell:docker']);
  grunt.registerTask('default', ['init','serve']);

};
