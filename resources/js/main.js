function getGalleryWidth(){
	var totalWidth = 0;
	$('.gallery li').each(function() {
		totalWidth += $(this).outerWidth(true);
	});
	return totalWidth;
};

function amendGalleryWidth(){
	var totalWidth = getGalleryWidth();
	$('.gallery ul').width(totalWidth);
};

function scrollToSection(){
	$('.scrollToTrigger').click(function(event) {
		var lookingFor = $(this).data('scroll');
		$('html, body').animate({
            scrollTop: $('.'+lookingFor).offset().top
        }, 500);
	});
	// if($(window).width() < 815){
	// 	$('.scrollToTrigger').click(function(event){
	// 		menuToggle();
	// 	});
	// };
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
		$nav.toggleClass('active');
		$nav.hasClass('active') ? $overlay.addClass('active') : $overlay.removeClass('active');
	});
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

$(document).ready(function(){
	getGalleryWidth();
	amendGalleryWidth();
	$('.gallery').attachDragger();
	scrollToSection();
	wordTicker();
	// menuToggle();
	menuToggle($('.toggleMenu, #toggleOverlay, .scrollToTrigger'));
});