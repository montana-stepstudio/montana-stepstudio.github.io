function getGalleryWidth(){
	var defineWidth = 0;
	$('.gallery li').each(function(index) {
		defineWidth += $(this).outerWidth(true);
	});
	$('.gallery ul').width(Math.ceil(defineWidth));
};

function galleryNav(el, distance){
	var  scrollDistance = $(window).width();
	$(el).on('click', function(event) {
		var yScroll = $('.galleryInner').scrollLeft();
		$('.galleryInner').animate({
			scrollLeft: yScroll + distance,
		}, 500);
	});
}

function scrollToSection(){
	$('.scrollToTrigger').click(function(event) {
		var lookingFor = $(this).data('scroll');
		$('html, body').animate({
            scrollTop: $('.'+lookingFor).offset().top
        }, 500);
	});
};

function wordTicker(){
	var clients = [
		'artists',
		'creators',
		'designers',
		'producers',
		'visionaries',
		'you',
	];
	var count= 0;
	setInterval(function(){
		count++;
		$('.wordTicker').fadeOut(400, function(){
			$(this).text(clients[count % clients.length]).fadeIn(400);
		});
	}, 5000)
};

function menuToggle(el){
	$(el).click(function(event) {
		event.preventDefault();
		var $nav = $('.primary'),
			$overlay = $('#toggleOverlay');
		if($(window).width() <= 800){
			console.log($(window).width());
			$nav.toggleClass('active');
			$nav.hasClass('active') ? $overlay.addClass('active') : $overlay.removeClass('active');
		}
	});
};

function revealMore(){
	$('.intro_p').on('click', '.revealTrigger', function(event) {
		event.preventDefault();
		$('.revealTrigger').fadeOut();
		$('.hidden').each(function(index, el) {
			var $item = $(this);
		    setTimeout(function() { 
		      $item.show().addClass('fadeInUp animated-fast');
		    }, 500*i);
		});
	});
};

function scrollTop(){
	$('#scrollTop').on('click', function(event) {
		event.preventDefault();
		$('html, body').animate({
            scrollTop: $('body').offset().top
        }, 500);
	});
};

var loaderPage = function() {
	$(".pageLoader").fadeOut("slow");
};

$.fn.attachDragger = function(){
    var attachment = false, lastPosition, position, difference;
    $( $(this).selector ).on("mousedown mouseup mousemove",function(e){
        if( e.type == "mousedown" ) attachment = true, lastPosition = [e.clientX, e.clientY];
        if( e.type == "mouseup" ) attachment = false;
        if( e.type == "mousemove" && attachment == true ){
            position = [e.clientX, e.clientY];
            difference = [ (position[0]-lastPosition[0]), (position[1]-lastPosition[1]) ];
            $(this).scrollLeft( $(this).scrollLeft() - difference[0] );
            $(this).scrollTop( $(this).scrollTop() - difference[1] );
            lastPosition = [e.clientX, e.clientY];
        }
    });
    $(window).on("mouseup", function(){
        attachment = false;
    });
}

var contentWayPoint = function() {
		var i = 0;

			$('.animate-box').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
					
					i++;

					$(this.element).addClass('item-animate');
					setTimeout(function(){

						$('body .animate-box.item-animate').each(function(k){
							var el = $(this);
							setTimeout( function () {
								var effect = el.data('animate-effect');
								if ( effect === 'fadeIn') {
									el.addClass('fadeIn animated-fast');
								} else if ( effect === 'fadeInLeft') {
									el.addClass('fadeInLeft animated-fast');
								} else if ( effect === 'fadeInRight') {
									el.addClass('fadeInRight animated-fast');
								} else {
									el.addClass('fadeInUp animated-fast');
								}

								el.removeClass('item-animate');
							},  k * 200, 'easeInOutExpo' );
						});
						
					}, 100);
					
				}

			} , { offset: '60%' } );
	};

$(document).ready(function(){
	loaderPage();
	getGalleryWidth();
	galleryNav('.next', $(window).width());
	galleryNav('.prev', -$(window).width());
	$('.gallery').attachDragger();
	contentWayPoint();
	scrollToSection();
	wordTicker();
	menuToggle($('.toggleMenu, #toggleOverlay, .scrollToTrigger'));
	revealMore();
	scrollTop()
});