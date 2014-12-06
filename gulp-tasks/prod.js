var gulp = require('gulp');
var runSequence = require('run-sequence');

// run all prod tasks to deploy
gulp.task('prod', function() {
	runSequence(
		'clean-prod',
		'html-prod',
	 	'css-prod',
		'js-prod',
		'img-prod',
		'video-prod',
		'audio-prod',
		'smoosh',
		'ftp'
	);
});