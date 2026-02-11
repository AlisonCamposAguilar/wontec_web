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

    // Inicializar el formulario de contacto (AJAX)
    function initContactForm() {
        var form = document.getElementById('contactForm');
        var alertBox = document.getElementById('contactAlert');
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!alertBox) return;
            alertBox.innerHTML = '';
            var formData = new FormData(form);
            // basic client-side validation
            var name = formData.get('name') || '';
            var email = formData.get('email') || '';
            var message = formData.get('message') || '';
            if (!name.trim() || !email.trim() || !message.trim()) {
                alertBox.innerHTML = '<div class="alert alert-danger">Por favor completa los campos requeridos.</div>';
                return;
            }
            // Determine endpoint: data-endpoint on form or fallback to PHP handler
            var endpoint = form.dataset.endpoint || '/contact-form-handler.php';
            var fetchOptions = { method: 'POST', body: formData };
            // If using Formspree, request JSON response
            var headers = {};
            if (endpoint.indexOf('formspree.io') !== -1 || endpoint.indexOf('formspree.com') !== -1) {
                headers['Accept'] = 'application/json';
                fetchOptions.headers = headers;
            }

            fetch(endpoint, fetchOptions).then(function (res) {
                // If Formspree returns 200 with empty body, treat as success
                var ct = res.headers.get('content-type') || '';
                if (ct.indexOf('application/json') !== -1) return res.json();
                return res.text().then(function (t) { return { success: res.ok, message: t }; });
            }).then(function (data) {
                if (data && data.success) {
                    alertBox.innerHTML = '<div class="alert alert-success">' + (data.message || 'Mensaje enviado correctamente.') + '</div>';
                    form.reset();
                } else {
                    alertBox.innerHTML = '<div class="alert alert-danger">' + (data.message || 'Error al enviar el mensaje.') + '</div>';
                }
            }).catch(function (err) {
                alertBox.innerHTML = '<div class="alert alert-danger">Error en la comunicación con el servidor.</div>';
            });
        });
    }

    // Intentar inicializar el formulario ahora y cuando carguen los partials
    initContactForm();
    document.addEventListener('partialsLoaded', function () {
        initContactForm();
    });


    // Active nav state based on current page/hash
    function setActiveNavLink() {
        var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        if (!navLinks.length) return;

        navLinks.forEach(function (link) {
            link.classList.remove('active');
        });

        var path = window.location.pathname || '';
        var hash = window.location.hash || '';
        var isIndex = path === '/' || path.endsWith('/index.html');

        // If on subpages (like /pages/*), default to Services
        if (!isIndex && path.indexOf('/pages/') !== -1) {
            hash = '#services';
            path = '/index.html';
        }

        var matched = false;
        navLinks.forEach(function (link) {
            var url = new URL(link.getAttribute('href'), window.location.origin);
            var linkPath = url.pathname;
            var linkHash = url.hash || '';

            if (isIndex && hash && linkPath.endsWith('/index.html') && linkHash === hash) {
                link.classList.add('active');
                matched = true;
            } else if (!hash && linkPath === path) {
                link.classList.add('active');
                matched = true;
            }
        });

        // Fallback to Home on index without hash
        if (!matched && isIndex && !hash) {
            navLinks.forEach(function (link) {
                var url = new URL(link.getAttribute('href'), window.location.origin);
                if (url.pathname.endsWith('/index.html') && !url.hash) {
                    link.classList.add('active');
                }
            });
        }
    }

    setActiveNavLink();
    document.addEventListener('partialsLoaded', function () {
        setActiveNavLink();
    });
    window.addEventListener('hashchange', function () {
        setActiveNavLink();
    });


    // Case Description Modal
    function initCaseDescriptionModal() {
        // Asegurar que todos los modales estén ocultos al inicializar
        var modals = document.querySelectorAll('.case-description-modal');
        modals.forEach(function(modal) {
            modal.classList.remove('show');
        });
        
        // Agregar hover functionality al case-item
        var caseItems = document.querySelectorAll('.case-item');
        caseItems.forEach(function(item) {
            var modal = item.querySelector('.case-description-modal');
            if (!modal) return;
            
            item.addEventListener('mouseenter', function() {
                modal.classList.add('show');
            });
            
            item.addEventListener('mouseleave', function() {
                modal.classList.remove('show');
            });
        });
        
        // Cerrar modal con botón close
        var closeButtons = document.querySelectorAll('.close-description');
        closeButtons.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var modal = btn.closest('.case-description-modal');
                if (modal) {
                    modal.classList.remove('show');
                }
            });
        });
        
        // Cerrar modal al hacer clic fuera de la card
        modals.forEach(function(modal) {
            modal.addEventListener('click', function(e) {
                // Solo cerrar si se hace clic en el fondo (modal), no en la card
                if (e.target === modal) {
                    e.preventDefault();
                    modal.classList.remove('show');
                }
            });
        });
    }
    
    // Inicializar modal inmediatamente y cuando carguen los partials
    initCaseDescriptionModal();
    document.addEventListener('partialsLoaded', function () {
        initCaseDescriptionModal();
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

