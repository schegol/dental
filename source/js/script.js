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

//модалки:
let modalTrigger = $('.header__appoint-link'),
    appointModal = $('.modal--form'),
    successAppointModal = $('.modal--form-success'),
    header = $('header');

const openAppointModal = function() {
    closeMobileMenu();
    body.addClass('fixed');
    overlay.addClass('overlay--active');
    appointModal.addClass('modal--open');
    header.css('z-index', 100);
}

const closeAppointModal = function() {
    body.removeClass('fixed');
    overlay.removeClass('overlay--active');
    appointModal.removeClass('modal--open');
    header.css('z-index', 100001);
}

const openAppointSuccessModal = function() {
    closeAppointModal();
    body.addClass('fixed');
    overlay.addClass('overlay--active');
    successAppointModal.addClass('modal--open');
    header.css('z-index', 100);
}

const closeAppointSuccessModal = function() {
    body.removeClass('fixed');
    overlay.removeClass('overlay--active');
    successAppointModal.removeClass('modal--open');
    header.css('z-index', 100001);
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
        closeAppointModal();
        closeAppointSuccessModal();
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
            touchThreshold: 30,
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

    //слайдер с врачами:
    let doctorsSliderItems = $('.doctors__item');

    if (doctorsSliderItems.length) {
        let slider = doctorsSliderItems.parent('.doctors__wrapper');

        slider.slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: slider.closest('.section').find('.slider-arrows__arrow--prev'),
            nextArrow: slider.closest('.section').find('.slider-arrows__arrow--next'),
            touchThreshold: 30,
            responsive: [
                {
                    breakpoint: 1499,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1023,
                    settings: 'unslick'
                },
            ]
        });

        slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            let lastSlideIndex = slick.slideCount - 1;

            if ($(slick.$slides[lastSlideIndex]).hasClass('slick-active') && nextSlide > currentSlide) {
                return false;
            }
        });
    }

    //переключение вкладок с контактами:
    let contactsToggles = $('.contacts__menu-link');

    if (contactsToggles.length) {
        contactsToggles.each(function() {
            let toggle = $(this);

            toggle.on('click', function(e) {
                e.preventDefault();

                if (toggle.hasClass('contacts__menu-link--selected')) {
                    return;
                }

                let toggleId = toggle.data('id'),
                    contactsBlocks = $('.contacts__item'),
                    contactsBlockToShow = contactsBlocks.filter('[data-id="'+toggleId+'"]');

                contactsToggles.removeClass('contacts__menu-link--selected');
                toggle.addClass('contacts__menu-link--selected');
                contactsBlocks.hide();
                contactsBlockToShow.show();
            });
        });
    }

    //кастомные кнопки у видео:
    let playButtons = $('.video-about__video-play-btn');

    playButtons.each(function() {
        let btn = $(this),
            video = btn.prev('video');

        if (video.length) {
            btn.on('click', function() {
                if (video[0].paused == true) {
                    video[0].play();
                    btn.addClass('video-about__video-play-btn--playing');
                } else {
                    video[0].pause();
                    btn.removeClass('video-about__video-play-btn--playing');
                }

                btn.blur();
            });
        }
    });

    //основной слайдер на главной:
    let indexSliderItems = $('.index-slider__item');

    if (indexSliderItems.length) {
        let slider = indexSliderItems.parent('.index-slider__items');

        if ($(window).width() >= 1024) {
            slider.on('init', function (slick) {
                setTimeout(function() {
                    let controls = slider.closest('.section').find('.index-slider__controls'),
                        slide = slider.find('.slick-current');
                        slideHeight = slide.offset().top + slide.outerHeight(),
                        btn = slide.find('.index-slider__item-link'),
                        btnOffsetTop = btn.offset().top,
                        btnOffsetBottom = btnOffsetTop + btn.outerHeight(),
                        btnMargin = slideHeight - btnOffsetBottom;

                    if (slideHeight == btnOffsetBottom) {
                        controls.css('top', '-60px');
                    } else if (Math.abs(btnMargin) > 0) {
                        controls.css('top', -btnMargin - 60);
                    }
                }, 300);  
            });
        }

        slider.slick({
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            speed: 500,
            cssEase: 'ease-out',
            draggable: false,
            swipe: false,
            swipeToSlide: false,
            touchMove: false,
            dots: true,
            dotsClass: 'index-slider__controls-dots-list',
            appendDots: slider.closest('.index-slider').find('.index-slider__controls-dots'),
            prevArrow: slider.closest('.index-slider').find('.slider-arrows__arrow--prev'),
            nextArrow: slider.closest('.index-slider').find('.slider-arrows__arrow--next'),
        });

        if ($(window).width() >= 1024) {
            slider.on('afterChange', function (event, slick, currentSlide) {
                let controls = slider.closest('.section').find('.index-slider__controls'),
                    slide = $(slick.$slides[currentSlide]),
                    slideHeight = slide.offset().top + slide.outerHeight(),
                    btn = slide.find('.index-slider__item-link'),
                    btnOffsetTop = btn.offset().top,
                    btnOffsetBottom = btnOffsetTop + btn.outerHeight(),
                    btnMargin = slideHeight - btnOffsetBottom;

                if (slideHeight == btnOffsetBottom) {
                    controls.css('top', '-60px');
                } else if (Math.abs(btnMargin) > 0) {
                    controls.css('top', -btnMargin - 60);
                }
            });
        }
    }

    //фильтры:
    let filterBtns = $('.filter__btn');

    if (filterBtns.length) {
        filterBtns.each(function() {
            let btn = $(this);

            btn.on('click', function() {
                let id = btn.data('filter'),
                    clicked = btn.hasClass('filter__btn--selected'),
                    sections = body.find('[data-filter-section]'),
                    relatedSection = sections.filter('[data-filter-section="'+id+'"]');
    
                if (clicked) {
                    sections.show();
                    btn.removeClass('filter__btn--selected');
                    btn.blur();
                } else {
                    filterBtns.removeClass('filter__btn--selected');
                    btn.addClass('filter__btn--selected');
                    sections.hide();
                    relatedSection.show();
                }
            });
        });
    }

    //модалки: (УДАЛИТЬ ПРИ НАТЯЖКЕ!!!)
    modalTrigger.on('click', function(e) {
        e.preventDefault();
        
        openAppointModal();
    });

    let closeModalBtn = body.find('.modal__close, .modal__ok-btn'),
        modalFormSubmit = body.find('.modal--form .form__submit');
    
    closeModalBtn.on('click', function() {
        closeAppointModal();
        closeAppointSuccessModal();
    });

    modalFormSubmit.on('click', function(e) {
        e.preventDefault();
        openAppointSuccessModal();
    });

    //слайдер с работами:
    let worksSliderItems = $('.works__item');

    if (worksSliderItems.length) {
        let slider = worksSliderItems.parent('.works__wrapper');

        slider.slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: slider.closest('.section').find('.slider-arrows__arrow--prev'),
            nextArrow: slider.closest('.section').find('.slider-arrows__arrow--next'),
            touchThreshold: 30,
            responsive: [
                {
                    breakpoint: 1499,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1023,
                    settings: 'unslick'
                },
            ]
        });

        slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            let lastSlideIndex = slick.slideCount - 1;

            if ($(slick.$slides[lastSlideIndex]).hasClass('slick-active') && nextSlide > currentSlide) {
                return false;
            }
        });
    }

    //слайдер с лицензиями:
    let licensesSliderItems = $('.licenses__item');

    if (licensesSliderItems.length) {
        let slider = licensesSliderItems.parent('.licenses__wrapper');

        slider.slick({
            infinite: false,
            slidesToShow: 6,
            slidesToScroll: 1,
            prevArrow: slider.closest('.section').find('.slider-arrows__arrow--prev'),
            nextArrow: slider.closest('.section').find('.slider-arrows__arrow--next'),
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

        slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            let lastSlideIndex = slick.slideCount - 1;

            if ($(slick.$slides[lastSlideIndex]).hasClass('slick-active') && nextSlide > currentSlide) {
                return false;
            }
        });
    }

    //readmore в segmented-text:
    let segmentedTexts = $('.segmented-text__item-text');

    if (segmentedTexts.length && $(window).width() < 1024) {
        segmentedTexts.readmore({
            speed: 300,
            collapsedHeight: 208,
            heightMargin: 10,
            moreLink: '<a class="segmented-text__expand-btn segmented-text__expand-btn--closed" href="javascipt:;">Читать полностью</a>',
            lessLink: '<a class="segmented-text__expand-btn segmented-text__expand-btn--open" href="javascipt:;">Свернуть</a>',
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
    reinitSliders($('.doctors__item'));
    reinitSliders($('.works__item'));
    reinitSliders($('.licenses__item'));

    //readmore:
    let segmentedTexts = $('.segmented-text__item-text');

    if (segmentedTexts.length) {
        if ($(window).width() >= 1024) {
            segmentedTexts.readmore('destroy');
        } else {
            segmentedTexts.readmore({
                speed: 300,
                collapsedHeight: 208,
                heightMargin: 10,
                moreLink: '<a class="segmented-text__expand-btn segmented-text__expand-btn--closed" href="javascipt:;">Читать полностью</a>',
                lessLink: '<a class="segmented-text__expand-btn segmented-text__expand-btn--open" href="javascipt:;">Свернуть</a>',
            });
        }
    }
});