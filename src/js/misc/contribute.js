(function () {
	var _promptKey;
	var _writingMode;
	var _uploadUrl = 'http://goodlucksoup.com/dev/php/upload.php';
	var _submitted = false;
	var _imgFile;
	var _placeholderTimeout;
	var _placeholders = ['me','my grandmother','my grandfather','my mother','my father','my cousin(s)','my aunt/uncle','enjoying dinner as a family','food','learning how to ride a bicycle','having difficult conversations about camp','learning how to dance','experience(s) at school','moving to a new home','travelling with my family','my parents childhood','my childhood','growing up with my siblings','my children','my significant other','my childhood after camp','getting my first job','family parties','moving to America','grandchildren','religion','holidays','traditions'];
	var _ideas = ['What brought your family to the United States/Canada?','What did your family do when they first came to the United States/Canada?','For me, being Japanese American/Canadian means...','Have you or a family member ever been discriminated against? Please explain.','Do you have a personal, or family story about the internment camp experience? Please explain.','After the internment camps, I/my...','I identify as...','How do you preserve your Japanese heritage?'];
	var _currentIdea = Math.floor(Math.random() * _ideas.length);
	
	var MB = 2097152;

	var $prompt = $('.prompt');
	var $submit = $('.submit-container .btn');
	var $storyForm = $('.user-story-form');
	var $infoQuestionInput = $('.info-question .answer');
	var $promptTextarea = $('.prompt-textarea');
	var $imageCaption = $('.image-caption');
	var $chooseImage = $('.choose-image');
	var $fileUpload = $('#file-upload');
	var $imageResult = $('.image-result');
	var $message = $('.message');
	var $inputAbout = $('.story-about-input');
	var $ideaButton = $('.user-story-idea .btn');
	var $showIdea = $('.show-idea');

	var init = function() {
		setupEvents();
		randomPlaceholder();
		$inputAbout.focus();
	};

	var setupEvents = function() {
		$submit.on('click', function() {
			if(!_submitted) {
				submitData();	
			} else {
				$message.text('Submission was already succesful. Refresh page to submit another story.');
			}
		});

		$chooseImage.on('click', function() {
			$fileUpload.click();
		});

		$fileUpload.on('change', function() {
			if (typeof FileReader !== 'undefined') {
				_imgFile = $('#file-upload')[0].files[0];
		        
		        if(_imgFile) {
		        	var invalid = invalidImage(_imgFile);
		        	if(invalid) {
		        		$imageResult.text('Your image "' + _imgFile.name + '" ' + invalid).addClass('error').removeClass('success');
		        		_imgFile = null;
		        	} else {
		        		$imageResult.text('Your image "' + _imgFile.name + '" meets criteria.').addClass('success').removeClass('error');
		        	}
		        }
		    }
		});

		$ideaButton.on('click', showIdea );
	};

	var submitData = function() {
		var formData = new FormData();

		$infoQuestionInput.each(function() {
			var val = $(this).val().trim();
			var key = $(this).attr('data-key');
			formData.append(key, val);
		});

		var about = $inputAbout.val().trim();
		formData.append('about', about);

		var val = $promptTextarea.val().trim();
		//cant submit empty story

		if(val.length) {
			var promptVal = addHTML(val);
			formData.append('story_text', promptVal);

			if(_imgFile) {
				var caption = $imageCaption.val().trim();
				formData.append('image_file', _imgFile);
				formData.append('image_caption', caption);	
			}

			$message.text('Submission in progress...').removeClass('success error');
			$.ajax({
				url: _uploadUrl,
				type: 'POST',
				data:  formData,
				contentType: false,
				cache: false,
				processData:false,
				success: function(data){
					_submitted = true;
					$message.text('Success!').addClass('success');
					clearContent();
					setTimeout(function() {
						$message.text('Refresh to submit another story.').removeClass('success error');
					}, 3000);
				},
				error: function(err){
					$message.text('Something went wrong. Please contact [email here].').addClass('error');
					if(console && console.log) {
						console.log('error', err);
					}
				} 
			});
		} else {
			$message.text('You must enter a story before submitting.').addClass('error');
		}
	};

	var addHTML = function(str) {
		var output = '';
		str = str.split('\n');
		str.forEach(function(s) {
			s = s.trim();
			if(s.length) {
				output += '<p>' + s + '</p>'	
			}
		});

		return output;
	};

	var invalidImage = function(imgFile) {
		if(imgFile.size < MB) {
			var t = imgFile.type;
			if(t === 'image/jpg' || t === 'image/jpeg' || t === 'image/png' || t === 'image/gif') {
				return null;
			} else {
				return 'is the wrong file type. It Must be a jpg, png, or gif.'
			}
		} else {
			return 'is too big. It Must be less than 2 mb.'
		}

		return null;
	};

	var clearContent = function() {
		_writingMode = false;
		$imageResult.text('');
		$promptTextarea.val('');
		$prompt.removeClass('hide');
		$infoQuestionInput.each(function() {
			$(this).val('');
		});
	};

	var randomPlaceholder = function() {
		var str = _placeholders[Math.floor(Math.random() * _placeholders.length)];
		$inputAbout.attr('placeholder', str);
		_placeholderTimeout = setTimeout(randomPlaceholder, 4000);
	};

	var showIdea = function() {
		var str = _ideas[_currentIdea] + '<span class="click-again">[click again to get another idea]</span>';

		$showIdea.html(str);

		_currentIdea++;
		if(_currentIdea >= _ideas.length) {
			_currentIdea = 0;
		}
	};

	init();
	
})();