module.exports = function(grunt) {
 
  // 任务配置,所有插件的配置信息
  grunt.initConfig({

    //获取 package.json 的信息
    pkg: grunt.file.readJSON('package.json'),
    cfg:{
          path:"public",
          js:"boundle",
          css:"style"
    },
    browserify: {
        options: {
            debug: true,
            extensions: ['.jsx'],
            transform: ['reactify']
        },
        build: {
            src: '<%=cfg.path%>/src/jsx/app.jsx',
            dest: '<%=cfg.path%>/js/app.js'
        }
    },
    // uglify插件的配置信息
    uglify: {
      options: {
        stripBanners: true,
        banner: '/*! <%=pkg.name%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%=cfg.path%>/dist/js/<%=cfg.js%>.js',
        dest: '<%=cfg.path%>/dist/js/<%=cfg.js%>.min.js'
      }
    },

    //cssmin插件的配置信息
    cssmin: {
      options: {
        stripBanners: true,
        banner: '/*! <%=pkg.name%>.css <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%=cfg.path%>/src/css/<%=pkg.name%>.css',
        dest: '<%=cfg.path%>/dist/css/<%=pkg.name%>.min.css'
      }
    },
    //jshint插件的配置信息'
    jshint:{
      build: [ 'Gruntfile.js', 'src/js/*.js' ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    //concat插件的配置信息
    concat: {
      // css:{
      //   src: 'src/css/*.css',
      //   dest: 'src/css/<%=pkg.name%>.css'
      // },
      js:{
        src: '<%=cfg.path%>/src/js/*.js',
        dest: '<%=cfg.path%>/dist/js/<%=cfg.js%>.js'
      }
    },

    //sass 
    sass: {
        dist: {
            files: {
                '<%=cfg.path%>/src/css/<%=cfg.css%>.css': '<%=cfg.path%>/src/scss/style.scss'
            },
            options: {
                style: 'compressed',
            }
        }
    },
    //copy插件的配置信息
    copy: {
      main: {
        files:[
          //js
          {
            expand: true, 
            flatten: true,
            src: ['<%=cfg.path%>/dist/js/<%=cfg.js%>.js'],
            dest: '<%=cfg.path%>/js/',
            filter: 'isFile'
          },         
          //css
          {
            expand: true, 
            flatten: true,
            src: ['<%=cfg.path%>/src/css/style.css'],
            dest: '<%=cfg.path%>/css/', 
            filter: 'isFile'
          }
        ]
      }
    },
    // watch插件的配置信息
    watch: { 
      js: { 
        files: [
          '<%=cfg.path%>/src/js/*.js'
        ], 
        tasks: [
          //'jshint',
          'concat',
          'uglify',
          'copy'
        ], 
        options: { spawn: false}
      },
      css:{
        files: [
          '<%=cfg.path%>/src/scss/*.scss'
        ], 
        tasks: [
          'sass', 
          // 'concat',          
          //'cssmin',
          'copy'
        ], 
        options: { spawn: false}
      },
      jsx:{
        files:[
          '<%=cfg.path%>/src/jsx/*.jsx',
          '<%=cfg.path%>/src/jsx/view/*.jsx',
          '<%=cfg.path%>/src/jsx/view/part/*.jsx'
        ],
        tasks: [
          'browserify'
        ], 
        options: { spawn: false}
      }
    }

  });
 
  // 告诉grunt我们将使用插件
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch'); 
  // 告诉grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）
  grunt.registerTask('default', [
    //注意下面注册任务时的前后顺序
    'sass',
    'concat',
    //'jshint',
    'uglify', 
    //'cssmin',
    'copy',
    'browserify',
    'watch'
  ]);
};