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





});