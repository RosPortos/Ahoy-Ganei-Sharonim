const swiper = new Swiper(".about-list-swiper", {
    slidesPerView: 'auto',
    speed: 800,
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        991: {
            slidesPerView: 'auto',
        },
        300: {
            slidesPerView: 1,
        },
    },
});


