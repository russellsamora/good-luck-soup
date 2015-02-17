'use strict';
G.intro = (function () {

	var _filepath = {
		img: 'assets/img/intro/',
		audio: 'assets/audio/intro/'
	};
	var _loaded = false;

	var preload = function(cb) {
		var loadAllImages = function(i, callback) {
			loadImage(_filepath.img + G.data.intro.img[i], function() {
				i++;
				if(i < G.data.intro.img.length) {
					loadAllImages(i, callback);
				} else {
					callback();
				}
			});
		};

		var loadAllAudio = function(i, callback) {
			callback();
		};

		loadAllImages(0, function() {
			loadAllAudio(0, function() {
				_loaded = true;
				cb();
			});
		});
	};

	var self = {
		init: function() {
			preload(function() {
				G.ui.showIntro();
			});
		},
		loaded: function() {
			return _loaded;
		}
	};

	return self;

})();