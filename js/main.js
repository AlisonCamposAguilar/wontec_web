(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();

    // Función para inicializar Swiper del carrusel de partners
    function initBrandSwiper() {
        if (typeof Swiper === 'undefined') return;
        var el = document.querySelector('.brand__slider');
        if (!el) return;
        // Evitar inicializar varias veces
        if (el.swiper) return;
        new Swiper('.brand__slider', {
            loop: true,
            slidesPerView: 5,
            spaceBetween: 24,
            speed: 800,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            navigation: {
                nextEl: '.brand__slider .swiper-button-next',
                prevEl: '.brand__slider .swiper-button-prev'
            },
            breakpoints: {
                0: { slidesPerView: 2 },
                576: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                992: { slidesPerView: 5 }
            },
            grabCursor: true
        });
    }

    // Intentar inicializar inmediatamente (por si los partials ya están en el DOM)
    initBrandSwiper();

    // Escuchar evento cuando los partials hayan sido cargados dinámicamente
    document.addEventListener('partialsLoaded', function () {
        initBrandSwiper();
    });


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
})(jQuery);

