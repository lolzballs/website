$(function () {
    function showTab(name) {
        $.get('/templates/' + name + '.html').then(function (res) {
            $('#content').html(res);
            if (name === 'home') {
                $('#slogan').typed({
                    strings: ['Programmer Extraordinaire', 'Dumbfuck Genius', 'Professional Bullshitter'],
                    typeSpeed: 10,
                    backDelay: 1000,
                    loop: true
                });
            }
        });
    }

    var pages = ['home', 'about', 'contact', 'portfolio', 'blog'];
    pages.forEach(function (page) {
        $('#' + page).hide();
        $('#nav-' + page).click(function () {
            showTab(page);
        })
    });
    showTab('home');

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
    $('#nav').hover(function() {
        $(this).removeClass('scroll-hidden');
    }, function() {
        if (scrollHidden) {
            $(this).addClass('scroll-hidden');
        }
    });
});
