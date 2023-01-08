$(function() {
    //кнопка "наверх":
    let toTopBtn = $('.to-top-btn');

    toTopBtn.on('click', function () {
        $('html, body').animate({scrollTop: 0}, 1500);
    });

    //моб. меню:
    let menuOpenBtn = $('.header__menu-toggle');

    const openMobileMenu = function() {

    }

    const closeMobileMenu = function() {

    }

    menuOpenBtn.on('click', function() {
        if ($(this).hasClass('header__menu-toggle--open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
});