$(function () {
    var Controllers = {
        home: function () {
            $('#slogan').typed({
                strings: ['Programmer Extraordinaire', 'Dumbfuck Genius', 'Professional Bullshitter'],
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

        },
        blog: function () {

        }
    };
    function showTab(name) {
        $.get('/' + name).then(function (res) {
            $('#content').html(res);
            Controllers[name]();
        });
    }
    showTab('home');
    $(window).bind('hashchange', function () {
        var hash = location.hash.substring(1);
        showTab(hash === '' ? 'home' : hash);
    });
    
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
});
