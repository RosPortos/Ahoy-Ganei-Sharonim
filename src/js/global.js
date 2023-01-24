document.addEventListener('DOMContentLoaded', function () {






    if ($(window).width() > 991) {

        function promoAcc() {
            let itemLength = $('.promo-item').length;

            let flex = document.querySelector(':root');
            flex.style.setProperty('--flex', itemLength);

            $('.promo-item').on('click', function () {
                $(this).addClass('promo-item--active').siblings().removeClass('promo-item--active');
            });

        }

        promoAcc();

        setTimeout(function () {
            document.querySelector('.promo').classList.add('anim');
            setTimeout(function () {
                document.querySelector('.promo').classList.add('anim-start');
            }, 1000);
        }, 1500);
    }


    function videoBlock() {

        let playButton = document.querySelector(".about-top__video .play-btn");
        let previeBlock = document.querySelector('.about-top-preview');
        let videoId = $('#player').attr('data-video-id');

        let playerVideo;
        window.YT.ready(function () {
            playerVideo = new YT.Player('player', {
                height: '360',
                width: '640',
                videoId: videoId,
                events: {
                    onReady: onReady,
                    onStateChange: onStateChange,
                },
            });
        });

        function onReady() {

            let iframe = playerVideo.getIframe();
            let videoTitle = iframe.getAttribute('data-video-title');

            iframe.setAttribute('title', videoTitle);
            playButton.addEventListener('click', () => {
                play()
            });

            function play() {
                playerVideo.playVideo();
                previeBlock.classList.add('hide');
            }
        }

        function onStateChange(e) {
            if (e.data == 2) {
                previeBlock.classList.remove('hide');
            }

            if (e.data == 0) {
                previeBlock.classList.remove('hide');
            }

        }
    }

    videoBlock();




    /* function anim() {
        const promoItem = document.querySelectorAll('.promo-item img')
        const promoItemActive = document.querySelector('.promo-item--active')
        let count = 0;
        const promoItemFirst = promoItem[count];

        console.log(promoItemFirst);

        let widthActive = promoItemFirst.clientWidth;
        let heightActive = promoItemFirst.clientHeight;

        promoItem.forEach((item, i) => {
            item.addEventListener('click', function (e) {

                console.log(e.target);

                let widthItem = item.clientWidth;
                let heightItem = item.clientHeight;

                let img = item.querySelector('img');
                let offsetTopImg = item.offsetTop;

                let imgPromoItemActive = promoItemFirst.querySelector('img');

                gsap.to(promoItemFirst, {
                    duration: 0.5,
                    x: widthActive + 8,
                    width: widthItem,
                    height: heightItem,
                    y: -offsetTopImg
                });

                gsap.to(item, {
                    duration: 0.5,
                    x: -widthActive - 8,
                    width: widthActive,
                    height: heightActive,
                    y: -offsetTopImg
                });

                count = i;

            });
        });

        function removeClass() {
            promoItem.forEach(item => {
                item.classList.remove('promo-item--active')
            });
        }

        removeClass();



    }

    anim(); */

    /* function anim() {
        const promoItem = document.querySelectorAll('.promo-item')
        const promoWrap = document.querySelector('.promo__wrap')

        function removeClass() {
            promoItem.forEach(item => {
                item.querySelector('img').classList.remove('big-img')
            });
        }

        const bigImg = document.querySelector('.big-img')



        promoItem.forEach((item, i) => {
            item.addEventListener('click', function (e) {

                let widthActive = bigImg.clientWidth;
                let heightActive = bigImg.clientHeight;

                let img = item.querySelector('img');
                let offsetTopImg = item.offsetTop;

                let widthItem = img.clientWidth;
                let heightItem = img.clientHeight;

                console.log(bigImg);
                console.log(offsetTopImg);

                gsap.to(bigImg, {
                    duration: 0.5,
                    x: widthActive + 8,
                    width: widthItem,
                    height: heightItem,
                    y: offsetTopImg
                });

                gsap.to(img, {
                    duration: 0.5,
                    x: -widthActive - 8,
                    width: widthActive,
                    height: heightActive,
                    y: -offsetTopImg
                });

                removeClass();
                img.classList.add('big-img')

            });
        });
    }

    anim(); */


    function anim() {
        const promoItem = document.querySelectorAll('.promo-item')
        const promoItemFirst = promoItem[0].querySelector('img');

        function pointerNone() {
            promoItem.forEach(item => {
                item.classList.add('pointer-non')
                setTimeout(() => item.classList.remove('pointer-non'), 800)
            })
        }

        promoItem.forEach((item, i) => {
            item.addEventListener('click', function (e) {

                item.classList.add('opacity')

                let img = item.querySelector('img');
                let offsetTopImg = item.offsetTop;
                let imgSrc = img.getAttribute('src');

                let bigSrc = promoItemFirst.getAttribute('src')

                let div = document.createElement('div')
                div.innerHTML = `<img src="${imgSrc}">`
                div.classList.add('abs-img')
                item.append(div)

                setTimeout(() => img.setAttribute('src', bigSrc), 300)

                let widthActive = promoItemFirst.clientWidth;
                let heightActive = promoItemFirst.clientHeight;

                gsap.to(div, {
                    duration: 0.5,
                    opacity: 1,
                    ease: "power1.out",
                    x: -widthActive - 8,
                    width: widthActive,
                    height: heightActive,
                    y: -offsetTopImg
                });

                pointerNone();

                setTimeout(function () {
                    item.classList.remove('opacity')
                    div.remove()
                    promoItemFirst.setAttribute('src', imgSrc)
                }, 800);


            });
        });
    }

    anim();

});