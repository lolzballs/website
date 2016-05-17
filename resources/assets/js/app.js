$(function () {
    var Controllers = {
        home: function () {
            $('#slogan').typed({
                strings: ['Programmer Extraordinaire', 'Some Random Bullshit', 'Professional Bullshitter'],
                typeSpeed: 10,
                backDelay: 1000,
                loop: true
            });
        },
        about: function () {

        },
        contact: function () {

        },
        portfolio: function () {
            $("#authfid").appendTo("body");
            $("#studyhub").appendTo("body");
            $("#pa").appendTo("body");
        },
        blog: function () {

        }
    };

    function showTab(name) {
        $('#content').removeClass('loaded');
        $.get('/' + name).then(function (res) {
            $('#content').addClass('loaded').html(res);
            Controllers[name]();
        });
    }

    $(window).bind('hashchange', function () {
        var hash = location.hash.substring(1);
        showTab(hash === '' ? 'home' : hash);
    }).trigger('hashchange');

    var lastScrollTop = 0;
    var scrollHidden = false;
    $(window).scroll(function () {
        var st;
        st = $(this).scrollTop();
        if (st > lastScrollTop) {
            if (!scrollHidden) {
                $('#nav').addClass('scroll-hidden');
                scrollHidden = true;
            }
        } else {
            if (scrollHidden) {
                $('#nav').removeClass('scroll-hidden');
                scrollHidden = false;
            }
        }
        return lastScrollTop = st;
    });
    $('#nav').hover(function () {
        $(this).removeClass('scroll-hidden');
    }, function () {
        if (scrollHidden) {
            $(this).addClass('scroll-hidden');
        }
    });

    $('#hamburger').click(function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('#mobile-menu').show();
            return setTimeout(function () {
                return $('#mobile-menu').addClass('active');
            }, 20);
        } else {
            return $('#mobile-menu').removeClass('active').delay(200).hide(1);
        }
    });
    $('#mobile-menu').find('a').click(function () {
        $('#hamburger').removeClass('active');
        return $('#mobile-menu').removeClass('active').delay(200).hide(1);
    });
});
