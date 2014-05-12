// JavaScript Document


jQuery(document).ready(function(e) {
	'use strict';
	
	var orig_width = $('#copyright-info-container').width();
	$('#copyright-info-container').width(0);
	
    $('#copyright-sign').click(function(e) {
		$(this).hide();
        $('#copyright-info-container').animate({ 'width' : orig_width }, 500);
    });
	
	var cube = $('#cube');
	cube.showTop = function() {
		this.removeClass().addClass('show-top');
	}
	cube.showBottom = function() {
		this.removeClass().addClass('show-bottom');
	}
	cube.showFront = function() {
		this.removeClass().addClass('show-front');
	}
	
	$('.cube-slide-1, .cube-slide-3').click(function(e) {
        cube.showFront();
    });
	
	var transforms3d_supported = true;
	if(!Modernizr.csstransforms3d || $('html').hasClass('no-preserve-3d'))
		transforms3d_supported = false;
	
	/*save email for "notice me"*/
	$('#notice-me').submit(function(e) {
		var form_el = $(this);
		var email = form_el.find('input[name=email]').val();

		if((email == '') || (typeof(email) == 'undefined')) {
			if(transforms3d_supported) {
				cube.find('.cube-slide-3').attr('title', '').html(form_el.data('email-not-set-msg'));
				cube.showBottom();
			}
			else
				cube.find('.return-msg').attr('title', '').html(form_el.data('email-not-set-msg')).fadeIn();
			return false;
		}

		form_el.find('.ajax-loader').fadeIn('fast');
		$.ajax({
			type: form_el.attr('method'),
			url: form_el.attr('action'),
			data: { email: email, ajax: true },
			cache: false,
			async: false,
			dataType: "text"
		})
		.fail(function() {
			form_el.find('.ajax-loader').hide();
			if(transforms3d_supported) {
				cube.find('.cube-slide-3').attr('title', '').html(form_el.data('ajax-fail-msg'));
				cube.showBottom();
			}
			else
				cube.find('.return-msg').attr('title', '').html(form_el.data('ajax-fail-msg')).fadeIn();
		})
		.done(function(message) {
			form_el.find('.ajax-loader').hide();
			if(message == "" || (typeof(message) == 'undefined')) {
				if(transforms3d_supported) {
					cube.find('.cube-slide-1').html(form_el.data('success-msg'));
					cube.showTop();
				}
				else
					cube.find('.return-msg').attr('title', '').html(form_el.data('success-msg')).fadeIn();
			}
			else {
				if(transforms3d_supported) {
					cube.find('.cube-slide-3').attr('title', message).html(form_el.data('opening-error-msg'));
					cube.showBottom();
				}
				else
					cube.find('.return-msg').attr('title', message).html(form_el.data('opening-error-msg')).fadeIn();
			}
		});
		form_el.find('.ajax-loader').fadeOut('fast');
		return false;
	});
	
	
	/*save email for rss subscribe*/
	$('#rss-subscribe').submit(function(e) {
		var form_el = $(this);
		var email = form_el.find('input[name=email]').val();

		if((email == '') || (typeof(email) == 'undefined')) {
			form_el.find('.return-msg').attr('title', '').html(form_el.data('email-not-set-msg')).fadeIn();
			return false;
		}
		
		form_el.find('.ajax-loader').fadeIn('fast');
		$.ajax({
			type: form_el.attr('method'),
			url: form_el.attr('action'),
			data: { email: email, ajax: true },
			cache: false,
			async: false,
			dataType: "text"
		})
		.fail(function() {
			form_el.find('.return-msg').attr('title', '').html(form_el.data('ajax-fail-msg')).fadeIn();
		})
		.done(function(message) {
			form_el.find('.ajax-loader').hide();
			if(message == "" || (typeof(message) == 'undefined')) {
				form_el.find('.return-msg').attr('title', '').html(form_el.data('success-msg')).fadeIn();
			}
			else {
				form_el.find('.return-msg').attr('title', message).html(form_el.data('opening-error-msg')).fadeIn();
			}
		});
		form_el.find('.ajax-loader').fadeOut('fast');
		return false;
	});
	
	
	/*send message on email*/
	$('#send-message').submit(function(e) {
		var form_el = $(this);
		var email = form_el.find('input[name=email]').val();
		var name = form_el.find('input[name=name]').val();
		var message = form_el.find('textarea[name=message]').val();

		if((email == '') || (name == '') || (message == '') || (typeof(email) == 'undefined') || (typeof(name) == 'undefined') || (typeof(message) == 'undefined')) {
			form_el.find('.return-msg').html(form_el.data('all-fields-required-msg')).fadeIn();
			return false;
		}
		
		form_el.find('.ajax-loader').fadeIn('fast');
		$.ajax({
			type: form_el.attr('method'),
			url: form_el.attr('action'),
			data: { email: email, name: name, message: message, ajax: true },
			cache: false,
			async: false,
			dataType: "text"
		})
		.fail(function() {
			form_el.find('.return-msg').html(form_el.data('ajax-fail-msg')).fadeIn();
		})
		.done(function(message) {
			if(message == "" || (typeof(message) == 'undefined')) {
				form_el.find('.return-msg').html(form_el.data('success-msg')).fadeIn();
			}
			else {
				form_el.find('.return-msg').html(message).fadeIn();
			}
		});
		form_el.find('.ajax-loader').fadeOut('fast');
		return false;
	});
	
	$('.return-msg').click(function(e) {
        $(this).fadeOut('fast');
    });
	
	$('.tooltip-trigger').tooltip();
});

jQuery(window).load(function(e) {
	'use strict';
	
	$('#page-loader').fadeOut(500);
	
	var swiper_init = false;
    var mainSwiper = $('#swiper').swiper({
		speed: 600,
		initialSlide: 1,
		onSlideChangeEnd: function (swiper) {
			if(!swiper_init)	//fixes problem with init call 0-index slide in older ie
				return;
			$('.nav-left-container, .nav-right-container').stop().fadeIn();
			if(swiper.activeIndex == 0) {
				$('.nav-left-container').stop().fadeOut();
			}
			else if(swiper.activeIndex == (swiper.slides.length - 1)) {
				$('.nav-right-container').stop().fadeOut();
			}
       	}
	});
	swiper_init = true;
	
	$('.nav-left-link, .nav-right-link').addClass('animated');
	$('.slide-bottom, .slide-head').addClass('animated');
	
	$('.nav-left-link').click(function(e) {
		e.preventDefault();
		mainSwiper.swipePrev();
	});
	$('.nav-right-link').click(function(e) {
		e.preventDefault();
		mainSwiper.swipeNext();
	});
	
	var finish_date = '2014/06/21 12:00:00';	/* format YYYY/MM/DD hh:mm:ss */
	var sec_actual = -1; var min_actual = -1; var hr_actual = -1; var day_actual = -1;
	if(Modernizr.csstransforms && Modernizr.csstransitions) {
		$('#counter').countdown(finish_date, function(event) {
			if(day_actual != event.offset.totalDays) {
				day_actual = event.offset.totalDays;
				var d_prev = $('#counter').find('.days-val.prev');
				var d_current = $('#counter').find('.days-val.current');
				var d_next = $('#counter').find('.days-val.next');
				d_prev.addClass('next').removeClass('prev');
				d_current.addClass('prev').removeClass('current');
				d_next.html(event.strftime('%D')).addClass('current').removeClass('next');
			}
			if(hr_actual != event.offset.hours) {
				hr_actual = event.offset.hours;
				var h_prev = $('#counter').find('.hours-val.prev');
				var h_current = $('#counter').find('.hours-val.current');
				var h_next = $('#counter').find('.hours-val.next');
				h_prev.addClass('next').removeClass('prev');
				h_current.addClass('prev').removeClass('current');
				h_next.html(event.strftime('%H')).addClass('current').removeClass('next');
			}
			if(min_actual != event.offset.minutes) {
				min_actual = event.offset.minutes;
				var m_prev = $('#counter').find('.minutes-val.prev');
				var m_current = $('#counter').find('.minutes-val.current');
				var m_next = $('#counter').find('.minutes-val.next');
				m_prev.addClass('next').removeClass('prev');
				m_current.addClass('prev').removeClass('current');
				m_next.html(event.strftime('%M')).addClass('current').removeClass('next');
			}
			if(sec_actual != event.offset.seconds) {
				sec_actual = event.offset.seconds;
				var s_prev = $('#counter').find('.seconds-val.prev');
				var s_current = $('#counter').find('.seconds-val.current');
				var s_next = $('#counter').find('.seconds-val.next');
				s_prev.addClass('next').removeClass('prev');
				s_current.addClass('prev').removeClass('current');
				s_next.html(event.strftime('%S')).addClass('current').removeClass('next');
			}
		});
	}
	else {		//css transforms, transitions not supported - hide all elements, that are useless
		$('#counter').find('.days-val.prev').hide();
		$('#counter').find('.days-val.next').hide();
		$('#counter').find('.hours-val.prev').hide();
		$('#counter').find('.hours-val.next').hide();
		$('#counter').find('.minutes-val.prev').hide();
		$('#counter').find('.minutes-val.next').hide();
		$('#counter').find('.seconds-val.prev').hide();
		$('#counter').find('.seconds-val.next').hide();
		$('#counter').countdown(finish_date, function(event) {
			if(day_actual != event.offset.totalDays) {
				day_actual = event.offset.totalDays;
				$('#counter').find('.days-val.current').html(event.strftime('%D'));
			}
			if(hr_actual != event.offset.hours) {
				hr_actual = event.offset.hours;
				$('#counter').find('.hours-val.current').html(event.strftime('%H'))
			}
			if(min_actual != event.offset.minutes) {
				min_actual = event.offset.minutes;
				$('#counter').find('.minutes-val.current').html(event.strftime('%M'));
			}
			if(sec_actual != event.offset.seconds) {
				sec_actual = event.offset.seconds;
				$('#counter').find('.seconds-val.current').html(event.strftime('%S'))
			}
		});
	}
});