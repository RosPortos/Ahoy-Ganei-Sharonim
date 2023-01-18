document.addEventListener('DOMContentLoaded', function () {

    function beforeAfter() {
        const sliderImgItem = document.querySelectorAll('.slider-img-item');
        const sliderTrigger = document.querySelectorAll('.slider-trigger');
        const sliderImg = document.querySelector('.slider-img');
        const sliderImgItemBefore = document.querySelectorAll('.slider-img-item__before');
        let isActive = false;

        sliderImgItem.forEach(item => {

            const sliderImgItemBefore = item.querySelector('.slider-img-item__before');
            const sliderTrigger = item.querySelector('.slider-trigger');

            item.addEventListener('mousemove', (e) => {
                if (!isActive) {
                    return;
                }

                let x = e.offsetX;

                sliderTrigger.style.left = x + 'px';
                sliderImgItemBefore.style.width = x + 'px';

                sliderImgItemBefore.classList.remove('tr');
                sliderTrigger.classList.remove('tr');
            });

            item.addEventListener('mousedown', () => {
                isActive = true;
            });

            item.addEventListener('mouseup', () => {
                isActive = false;
                sliderImgItemBefore.classList.add('tr');
                sliderTrigger.classList.add('tr');
            });

            item.addEventListener('touchstart', () => {
                isActive = true;
            });

            item.addEventListener('touchend', () => {
                isActive = false;
                sliderImgItemBefore.classList.add('tr');
                sliderTrigger.classList.add('tr');
            });

            item.addEventListener('touchcancel', () => {
                isActive = false;
                sliderImgItemBefore.classList.add('tr');
                sliderTrigger.classList.add('tr');
            });

            item.addEventListener('touchmove', (e) => {
                if (!isActive) {
                    return;
                }

                let x;
                let i;

                for (i = 0; i < e.changedTouches.length; i++) {
                    x = e.changedTouches[i].pageX;
                }

                sliderTrigger.style.left = x + 'px';
                sliderImgItemBefore.style.width = x + 'px';

                sliderImgItemBefore.classList.remove('tr');
                sliderTrigger.classList.remove('tr');
            });


        });

        document.addEventListener('mouseup', function () {
            isActive = false;
        });


        function returnSlider() {
            sliderTrigger.forEach(item => {
                item.style.left = 60 + '%';
            });
            sliderImgItemBefore.forEach(item => {
                item.style.width = 60 + '%';
            });
        }

        const swiperButtonNext = sliderImg.querySelector('.swiper-button-next');
        const swiperButtonPrev = sliderImg.querySelector('.swiper-button-prev');
        const swiperPagination = sliderImg.querySelector('.swiper-pagination');

        swiperButtonNext.addEventListener('click', function () {
            returnSlider();
        });
        swiperButtonPrev.addEventListener('click', function () {
            returnSlider();
        });
        swiperPagination.addEventListener('click', function () {
            returnSlider();
        });
    }

    if (document.querySelector('.slider-img-item')) {
        beforeAfter();
    }

});