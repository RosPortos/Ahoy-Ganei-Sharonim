"use strict";

document.addEventListener('DOMContentLoaded', function () {
  function promoAcc() {
    var itemLength = $('.promo-item').length;
    var flex = document.querySelector(':root');
    flex.style.setProperty('--flex', itemLength);
    $('.promo-item').on('click', function () {
      $(this).addClass('promo-item--active').siblings().removeClass('promo-item--active');
    });
  }
  promoAcc();
  function videoBlock() {
    var playButton = document.querySelector(".about-top__video .play-btn");
    var previeBlock = document.querySelector('.about-top-preview');
    var videoId = $('#player').attr('data-video-id');
    var playerVideo;
    window.YT.ready(function () {
      playerVideo = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: videoId,
        events: {
          onReady: onReady,
          onStateChange: onStateChange
        }
      });
    });
    function onReady() {
      var iframe = playerVideo.getIframe();
      var videoTitle = iframe.getAttribute('data-video-title');
      iframe.setAttribute('title', videoTitle);
      playButton.addEventListener('click', function () {
        play();
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

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var anchors = document.querySelectorAll('a.scroll-to');
var _iterator = _createForOfIteratorHelper(anchors),
  _step;
try {
  var _loop = function _loop() {
    var anchor = _step.value;
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var blockID = anchor.getAttribute('href');
      document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    _loop();
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
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
