"use strict";

document.addEventListener('DOMContentLoaded', function () {});
"use strict";

//Default pop-up | pop-up for video
$(document).ready(function () {
  $(".modal").css("display", "block");
  $(".modal-content").click(function (e) {
    return e.stopPropagation();
  });
  $(".modal").click(function (e) {
    hideModal($(this));
    $(".video-modal .modal-video").html('<div id="modal-video-iframe"></div>');
  });
  $(".modal-close, .js-modal-close").click(function (e) {
    e.preventDefault();
    hideModal($(this).closest(".modal"));
    $(".video-modal .modal-video").html('<div id="modal-video-iframe"></div>');
  });
  $("[data-modal]").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    hideModal(".modal");
    if ($(this).data("modal-tab") != undefined) {
      goToTab($(this).data("modal-tab"));
    }
    showModal($(this).data("modal"));
  });
  $("[data-video-modal]").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var videoId = $(this).data("video-modal");
    var videoType = $(this).data("video-type");
    if (videoType == "youtube") {
      $("#modal-video-iframe").removeClass("vimeo youtube").addClass("youtube").append('<div class="video-iframe" id="' + videoId + '"></div>');
      createVideo(videoId, videoId);
    } else if (videoType == "vimeo") {
      $("#modal-video-iframe").removeClass("vimeo youtube").addClass("vimeo").html('<iframe class="video-iframe" allow="autoplay" src="https://player.vimeo.com/video/' + videoId + '?playsinline=1&autoplay=1&transparent=1&app_id=122963">');
    } else if (videoType == "mp4" || videoType == "drive") {
      $("#modal-video-iframe").removeClass("vimeo youtube").addClass("video").html("\n                      <video controls autoplay playisline>\n                          <source src=\"".concat(videoId, "\">\n                      </video>   \n                  "));
    }
    hideModal(".modal");
    showModal("#video-modal");
  });
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
        allowsInlineMediaPlayback: true
      },
      events: {
        onReady: function onReady(e) {
          // e.target.mute();
          // if ($(window).width() > 991) {
          setTimeout(function () {
            e.target.playVideo();
          }, 200);
          // }
        }
      }
    });
  }
});

function getScrollWidth() {
  // create element with scroll
  var div = document.createElement("div");
  div.style.overflowY = "scroll";
  div.style.width = "0px";
  div.style.height = "0px";
  document.body.append(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
}
var bodyScrolled = 0;
function showModal(modal) {
  $(modal).addClass("visible");
  bodyScrolled = $(window).scrollTop();
  $("body").addClass("active").scrollTop(bodyScrolled).css("padding-right", getScrollWidth());
}
function hideModal(modal) {
  $(modal).removeClass("visible");
  bodyScrolled = $(window).scrollTop();
  $("body").removeClass("active").scrollTop(bodyScrolled).css("padding-right", 0);
}
"use strict";

var swiper = new Swiper(".about-list-swiper", {
  slidesPerView: 'auto',
  speed: 1000,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
    draggable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
  /* breakpoints: {
      1150: {
          slidesPerView: 3,
      },
  }, */
});
"use strict";
//# sourceMappingURL=main.js.map
