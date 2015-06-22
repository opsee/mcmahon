module.exports = function(grunt) {

  var load = require('load-grunt-tasks')(grunt)
  var fs = require('fs');
  // , rewrite = require( "connect-modrewrite" )
  ;

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell:{
      jekyll:{
        command:'jekyll build --source _jekyll --destination blog --config _config.yml'
      },
      npm:{
        command:'npm install'
      },
      bower:{
        command:'bower cache clean && bower install'
      },
      seedling:{
        command:'bower update seedling'
      },
    },
    jekyll:{
      server:{
        options:{
          src: '_jekyll',
          config: '_config.yml',
          dest:'blog'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          hostname:'localhost',
          open:true,
          // middleware: function(connect, options, middlewares) {
          //   var rules = [
          //       "!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.woff|\\.tiff|\\.gif$ /index.html"
          //   ];
          //   middlewares.unshift( rewrite( rules ) );
          //   return middlewares;
          // }
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
            'angular-aria/angular-aria.min',
            'angular-touch/angular-touch.min',
            'fastclick/lib/fastclick',
            'moment/moment',
            'angular-moment/angular-moment.min'
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
      jekyll:{
        files:['_jekyll/**/*'],
        tasks:['jekyll']
      },
      blog:{
        options:{
          livereload:true
        },
        files:['blog/**/*'],
      },
      srcScripts:{
        options:{
           livereload:true
         },
        files:['js/public/js/**/*.js'],
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
      npmBower:['shell:npm','shell:bower'],
    },
    revision:{
      options:{
        property: 'meta.revision',
        ref: 'HEAD',
        short:false
      }
    }
  });


  grunt.registerTask('packageCache', 'Generate packageCache file to avoid unnecessary npm install and bower install', function(){
    var done = this.async();
    var bower = grunt.file.readJSON('bower.json');
    var npm = grunt.file.readJSON('package.json');
    var combined = JSON.stringify({npm:npm,bower:bower});
    function runThem(){
      grunt.file.write('packageCache.json',combined);
      grunt.task.run(['concurrent:npmBower','uglify:deps']);
      return done();
    }
    try{
      var cache = grunt.file.read('packageCache.json');
      if(combined != cache){
        return runThem();
      }
    }catch(err){
      runThem();
    }
    if(cache){
      grunt.log.ok('package.json and bower.json up to date.');
      done();
      return true;
    }
  });

  grunt.registerTask('init', ['packageCache','shell:seedling','jekyll']);
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('annotate', ['ngAnnotate','uglify:annotated','clean:annotated']);
  grunt.registerTask('prod', ['concurrent:setup','concurrent:build','annotate']);
  grunt.registerTask('docker', ['install', 'compass', 'build', 'shell:docker']);
  grunt.registerTask('default', ['init','compass','connect','watch']);

};
