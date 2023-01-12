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

//реинит слайдеров по рейсайзу:
const reinitSliders = function(selector) {
    let sliderItems = selector;

    if (sliderItems.length) {
        let slider = sliderItems.parent();

        if ($(window).width() >= 1024 && !slider.hasClass('slick-initialized')) {
            slider.slick('reinit');
        }
    }
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

    //слайдер с отзывами:
    let reviewsSliderItems = $('.reviews__item');

    if (reviewsSliderItems.length) {
        let slider = reviewsSliderItems.parent('.reviews__wrapper');

        slider.slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            prevArrow: slider.closest('.section').find('.slider-arrows__arrow--prev'),
            nextArrow: slider.closest('.section').find('.slider-arrows__arrow--next'),
            responsive: [
                {
                    breakpoint: 1023,
                    settings: 'unslick'
                },
            ]
        });
    }

    //слайдер с улыбками:
    let smilesSliderItems = $('.smiles__item');

    if (smilesSliderItems.length) {
        let slider = smilesSliderItems.parent('.smiles__wrapper');

        slider.slick({
            infinite: false,
            slidesToShow: 6,
            slidesToScroll: 1,
            arrows: false,
            touchThreshold: 30,
            responsive: [
                {
                    breakpoint: 1919,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 1499,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 1023,
                    settings: 'unslick'
                },
            ]
        });
    }
});

$(window).on('load resize', function() {
    let mobileMenu = $('.header__menu-wrapper');

    if ($(window).width() >= 1500) {
        if (mobileMenu.hasClass('header__menu-wrapper--open')) {
            closeMobileMenu();
        }
    }
});

$(window).on('resize orientationChange', function(event) {
    //реинит слайдеров по рейсайзу:
    reinitSliders($('.reviews__item'));
    reinitSliders($('.smiles__item'));
});