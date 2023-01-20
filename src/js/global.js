document.addEventListener('DOMContentLoaded', function () {


    function promoAcc() {
        let itemLength = $('.promo-item').length;

        let flex = document.querySelector(':root');
        flex.style.setProperty('--flex', itemLength);

        $('.promo-item').on('click', function () {
            $(this).addClass('promo-item--active').siblings().removeClass('promo-item--active');
        });

    }

    promoAcc();


    function videoBlock() {

        var player;
        function createVideo(videoBlockId, videoId) {
            player = new YT.Player(videoBlockId, {
                videoId: videoId,
                playerVars: {
                    autohide: 1,
                    showinfo: 0,
                    rel: 0,
                    loop: 1,
                    playsinline: 1,
                    fs: 1,
                    allowsInlineMediaPlayback: true,
                },
                events: {
                    onReady: function (e) {
                        setTimeout(function () {
                            e.target.playVideo();
                        }, 200);
                    },
                },
            });
        }

        $("[data-video-modal]").click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            let videoId = $(this).data("video-modal");
            let videoType = $(this).data("video-type");

            if (videoType == "youtube") {
                $(".about-top__video")
                    .removeClass("vimeo youtube")
                    .addClass("youtube")
                    .append('<div class="video-iframe" id="' + videoId + '"></div>');
                createVideo(videoId, videoId);
                $('.about-top-preview').addClass('hide')
            } else if (videoType == "vimeo") {
                $(".about-top__video")
                    .removeClass("vimeo youtube")
                    .addClass("vimeo")
                    .html(
                        '<iframe class="video-iframe" allow="autoplay" src="https://player.vimeo.com/video/' +
                        videoId +
                        '?playsinline=1&autoplay=1&transparent=1&app_id=122963">'
                    );
                $('.about-top-preview').addClass('hide')
            } else if (videoType == "mp4" || videoType == "drive") {
                $(".about-top__video")
                    .removeClass("vimeo youtube")
                    .addClass("video")
                    .html(`
                        <video controls autoplay playisline>
                            <source src="${videoId}">
                        </video>   
                `);
                $('.about-top-preview').addClass('hide')
            }
        });
    }

    videoBlock();

});