module.exports = function(grunt) {

  var load = require('load-grunt-tasks')(grunt)
  , fs = require('fs')
  ;

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell:{
      npm:{
        command:'npm install'
      },
      bower:{
        command:'bower cache clean && bower install'
      },
      seedling:{
        command:'bower update seedling'
      },
      bundle:{
        command:'bundle'
      }
    },
    jekyll:{
      blog:{
        options:{
          src: '_site',
          config: '_config.yml',
          dest:'dist'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          livereload:35728,
          base:'dist'
        }
      }
    },
    open:{
      dev:{
        path:'http://localhost:8080'
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
    compress:{
      main:{
        options:{
          mode:'gzip'
        },
        expand:true,
        cwd:'dist/',
        src:['**/*'],
        dest:'production/'
      }
    },
    aws_s3: {
      options: {
        accessKeyId: process.env.AWS_ACCESS_KEY, // Use the variables
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // You can also use env variables
        region: 'us-west-1',
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      staging: {
        options: {
          bucket: 'mcmahon-testing',
          differential: true, // Only uploads the files that have changed
          gzipRename: 'ext' // when uploading a gz file, keep the original extension
        },
        files: [
          // {dest: 'app/', cwd: 'backup/staging/', action: 'download'},
          // {src: 'app/', cwd: 'copy/', action: 'copy'},
          {expand: true, cwd: 'dist/', src: ['**'], dest: '/'},
          // {expand: true, cwd: 'dist/staging/styles/', src: ['**'], dest: 'app/styles/'},
          // {dest: 'src/app', action: 'delete'},
        ]
      },
      prod: {
        options: {
          bucket: 'opsee.com',
          params: {
            ContentEncoding: 'gzip' // applies to all the files!
          },
          mime: {
            'production/assets/production/LICENCE': 'text/plain'
          }
        },
        files: [
          {expand: true, cwd: 'production/', src: ['**'], dest: '/', stream: true}, // enable stream to allow large files
          {expand: true, cwd: 'production/public/', src: ['**'], dest: '/public', params: {CacheControl: '2000'}},
          // CacheControl only applied to the assets folder
          // LICENCE inside that folder will have ContentType equal to 'text/plain'
        ]
      },
    },
    uglify:{
      deps:{
        options:{
          mangle:false,
          compress:false
        },
        files:{
          '_site/public/js/deps.min.js':[
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
            return '_site/public/bower_components/'+f+'.js';
          })
        }
      },
      annotated: {
        options:{
          mangle:false,
          compress:false
        },
        files:{
          '_site/public/js/opsee.min.js':['_site/public/js/deps.min.js','js/src/app.app.js','js/src/**/*.annotated.js']
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
          src:['js/src/**/*.js'],
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
          src:['js/src/app.js'],
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
      jekyllBlog:{
        files:['_site/**/*'],
        tasks:['jekyll:blog']
      },
      jekyllPages:{
        files:['_pages/**/*'],
        tasks:['jekyll:pages']
      },
      blog:{
        options:{
          livereload:true
        },
        files:['blog/**/*'],
      },
      srcScripts:{
        files:['js/src/**/*.js'],
        tasks:['uglify:annotated']
      },
      sass:{
        options:{
          livereload:true
        },
        files:['scss/**/*.scss'],
        tasks:['compass:dist'],
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
          cssDir:'_site/public/css',
          sassDir:'scss',
          imagesDir:'public/img',
          fontsPath:'fonts',
          require:['breakpoint','sass-css-importer', 'compass-flexbox'],
          httpPath:'',
          relativeAssets:true,
          noLineComments:true,
          outputStyle:'compressed'
        }
      }
    },
    concurrent:{
      npmBowerBundle:['shell:npm','shell:bower','shell:bundle'],
      uglify:['uglify:deps'],
      build:['compass:dist','annotate']
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
    var gemfile = grunt.file.read('Gemfile');
    var combined = JSON.stringify({npm:npm,bower:bower,gemfile:gemfile});
    function runThem(){
      grunt.file.write('packageCache.json',combined);
      grunt.task.run(['concurrent:npmBowerBundle','uglify:deps']);
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
      grunt.log.ok('package.json, bower.json, and Gemfile are up to date.');
      done();
      return true;
    }
  });

  grunt.registerTask('init', ['concurrent:npmBowerBundle','concurrent:uglify', 'concurrent:build', 'jekyll']);
  grunt.registerTask('serve', ['connect', 'open', 'watch']);
  grunt.registerTask('annotate', ['ngAnnotate','uglify:annotated','clean:annotated']);
  grunt.registerTask('prod', ['init', 'compress', 'aws_s3:prod']);
  grunt.registerTask('docker', ['install', 'compass', 'build', 'shell:docker']);
  grunt.registerTask('default', ['init','serve']);

};
