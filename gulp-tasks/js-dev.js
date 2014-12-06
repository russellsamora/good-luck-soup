var gulp = require('gulp');
var browserSync = require('browser-sync');

//just move the js files
gulp.task('js-dev', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(gulp.dest('dev/assets/js'))
		.pipe(browserSync.reload({stream:true}));
});