var slideWidth = null;
var slideIndex = null;
var aMoreBit = 0;



$(document).ready(function() {
    slideWidth = $('.card').outerWidth(true);
    slideIndex = 2;
    $('.slider-container').css('transform', 'translateX(' + ((-slideWidth + aMoreBit) * slideIndex) + 'px)');
    
    
    $('.next').click(function() {
        if (slideIndex < $('.card').length - 1) {
            slideIndex++;
            $('.slider-container').css('transform', 'translateX(' + ((-slideWidth - aMoreBit) * slideIndex) + 'px)');
        }
    });
    
    $('.prev').click(function() {
        if (slideIndex > 0) {
            slideIndex--;
            $('.slider-container').css('transform', 'translateX(' + (-slideWidth * slideIndex) + 'px)');
        }
    });
});

$(window).resize(function() {
    slideWidth = $('.card').outerWidth();
    aMoreBit = $(window).width() < 585 ? 30 : 0;
    aMoreBit = $(window).width() < 400 ? 35 : 0;
    $('.slider-container').css('transform', 'translateX(' + ((-slideWidth - aMoreBit) * slideIndex) + 'px)');
    
});

