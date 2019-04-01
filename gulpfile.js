var gulp = require('gulp'),
    apidoc = require('gulp-apidoc');
 
gulp.task('apidoc',function(done){
              apidoc({
                  src: "app/",
                  dest: "build/",
                  template: "template/",
                  debug: true,
                  includeFilters: [ ".*\\controller.js$" ]
              },done);
});