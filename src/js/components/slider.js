const swiper = new Swiper(".about-list-swiper", {
    slidesPerView: 'auto',
    speed: 1000,
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    /* breakpoints: {
        1150: {
            slidesPerView: 3,
        },
    }, */
});


