require('rrssb/scss/rrssb.scss');
require('normalize.css/normalize.css');
require('./styles.scss');

var typed = require('typed.js')
var RModal = require('rmodal');

$(function() {
    $(window).bind('hashchange', function() {
        var hash = location.hash.substring();
        hash = hash === '' ? '#home' : hash;
        $($('body').data('page')).hide();
        $(hash).show();
        $('body').data('page', hash);
    });

    if (window.location.pathname === '/') {
        $('.container').children().each(function() {
            if (!$(this).is('#home')) {
                $('body').data('page', '#home');
                $(this).hide();
            }
        });
        $("#slogan").typed({
            strings: ['Programmer Extraordinaire', 'Software Developer'],
            typeSpeed: 10,
            backDelay: 1000,
            loop: true
        });


        $('a[data-target]').each(function() {
            $(this).click(function(e) {
                e.preventDefault();
                modals[$(this).data('target')].open();
            })
        });

        var modals = {};
        $('.modal').each(function() {
            modals[$(this).attr('id')] = new RModal(this);
            console.log(modals);
            $(this).find('.btn').each(function() {
                $(this).click(function() {
                    modals[$(this).data('close')].close();
                });
            });
        });
        $(window).trigger('hashchange');
    }
});
