angular.module('app', []);

$(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() == 0) {
            $("#nav").addClass("top");
        } else {
            $("#nav").removeClass("top");
        }
    });

    $("#nav").mouseenter(function() {
        $("#nav").addClass("hover");
    }).mouseleave(function() {
        $("#nav").removeClass("hover");
    });

    $('html').animate({
        scrollTop: 0
    }, function(){
        $("#nav").addClass("top");
    });
});
