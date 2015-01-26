var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

//jshint and uglify js files
gulp.task('prod-js', function() {
	return gulp.src('src/js/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(gulp.dest('.tmp/assets/js'))
});