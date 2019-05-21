var gulp = require('gulp');
var gls = require('gulp-live-server');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('start', function() {
	var server = gls.new('./bin/www');
	server.start();  //启动
	//监视样式表、监视js文件、监视模版文件
	gulp.watch(['public/**/*.css', 'pyblic/**/*.js', 'views/**/*.jade'], function (file) {
		server.notify.apply(server, [file]);
	}); 
	gulp.watch(['app.js', 'routes/**/*.js'], function() {
		server.start.bind(server)()
	}); //

});

gulp.task('server', ["start"], function() {
	var files = [
         'app.js',
         'routes/**/*.js',
         'views/**/*.jade',
         'public/**/*.*'
    ]; 

     browserSync.init(files, {
         proxy: 'http://localhost:3000',
         port: 3001
     });
     gulp.watch(files).on("change", reload); 
});

gulp.task('default', ['server']);