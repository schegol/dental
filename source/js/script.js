//моб. меню:
let body = $('body'),
    menuOpenBtn = $('.header__menu-toggle--open'),
    menuCloseBtn = $('.header__menu-toggle--close'),
    overlay = $('.overlay'),
    mobileMenu = $('.header__menu-wrapper'),
    submenuToggles = $('.header__menu-item--parent .header__menu-link'),
    submenus = $('.header__submenu');

const openMobileMenu = function() {
    body.addClass('fixed');
    overlay.addClass('overlay--active');
    mobileMenu.addClass('header__menu-wrapper--open');
}

const closeMobileMenu = function() {
    body.removeClass('fixed');
    overlay.removeClass('overlay--active');
    mobileMenu.removeClass('header__menu-wrapper--open');
    submenus.hide();
    submenuToggles.removeClass('header__menu-link--submenu-open');
}

$(function() {
    //кнопка "наверх":
    let toTopBtn = $('.to-top-btn');

    toTopBtn.on('click', function () {
        $('html, body').animate({scrollTop: 0}, 1500);
    });

    menuOpenBtn.on('click', function() {
        openMobileMenu();
    });

    menuCloseBtn.on('click', function() {
        closeMobileMenu();
    });

    overlay.on('click', function() {
        closeMobileMenu();  
    });

    submenuToggles.on('click', function(e) {
        if ($(window).width() < 1500) {
            e.preventDefault();
            
            let toggle = $(this),
                submenu = toggle.next('.header__submenu');

            toggle.toggleClass('header__menu-link--submenu-open');
            submenu.slideToggle();
        }
    });

    //сброс фокуса со стрелок слайдеров:
    let sliderBtns = $('.slider-arrows__arrow');

    sliderBtns.on('click', function() {
        $(this).blur();
    });
});

$(window).on('load resize', function() {
    let mobileMenu = $('.header__menu-wrapper');

    if ($(window).width() >= 1500) {
        if (mobileMenu.hasClass('header__menu-wrapper--open')) {
            closeMobileMenu();
        }
    }
});