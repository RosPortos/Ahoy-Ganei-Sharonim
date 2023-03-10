"use strict";

document.addEventListener('DOMContentLoaded', function () {
  if ($(window).width() > 991) {
    var promoAcc = function promoAcc() {
      var itemLength = $('.promo-item').length;
      var flex = document.querySelector(':root');
      flex.style.setProperty('--flex', itemLength);
      $('.promo-item').on('click', function () {
        $(this).addClass('promo-item--active').siblings().removeClass('promo-item--active');
      });
    };
    promoAcc();
    setTimeout(function () {
      document.querySelector('.promo').classList.add('anim');
      setTimeout(function () {
        document.querySelector('.promo').classList.add('anim-start');
      }, 1000);
    }, 1500);
  }
  if ($(window).width() <= 991) {
    var anim = function anim() {
      var promoItem = document.querySelectorAll('.promo-item');
      var promoItemFirst = promoItem[0].querySelector('img');
      function pointerNone() {
        promoItem.forEach(function (item) {
          item.classList.add('pointer-non');
          setTimeout(function () {
            return item.classList.remove('pointer-non');
          }, 800);
        });
      }
      promoItem.forEach(function (item, i) {
        item.addEventListener('click', function (e) {
          var img = item.querySelector('img');
          var offsetTopImg = item.offsetTop;
          var imgSrc = img.getAttribute('src');
          var bigSrc = promoItemFirst.getAttribute('src');
          var div = document.createElement('div');
          div.innerHTML = "<img src=\"".concat(imgSrc, "\">");
          div.classList.add('abs-img');
          item.append(div);
          img.setAttribute('src', bigSrc);
          var widthActive = promoItemFirst.clientWidth;
          var heightActive = promoItemFirst.clientHeight;
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
            div.remove();
            promoItemFirst.setAttribute('src', imgSrc);
          }, 800);
        });
      });
    };
    anim();
  }
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

function DynamicAdapt(type) {
  this.type = type;
}
DynamicAdapt.prototype.init = function () {
  var _this2 = this;
  var _this = this;
  // ???????????? ????????????????
  this.??bjects = [];
  this.daClassname = "_dynamic_adapt_";
  // ???????????? DOM-??????????????????
  this.nodes = document.querySelectorAll("[data-da]");

  // ???????????????????? ??bjects ????????????????
  for (var i = 0; i < this.nodes.length; i++) {
    var node = this.nodes[i];
    var data = node.dataset.da.trim();
    var dataArray = data.split(",");
    var ??bject = {};
    ??bject.element = node;
    ??bject.parent = node.parentNode;
    ??bject.destination = document.querySelector(dataArray[0].trim());
    ??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
    ??bject.place = dataArray[2] ? dataArray[2].trim() : "last";
    ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
    this.??bjects.push(??bject);
  }
  this.arraySort(this.??bjects);

  // ???????????? ???????????????????? ??????????-????????????????
  this.mediaQueries = Array.prototype.map.call(this.??bjects, function (item) {
    return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
  }, this);
  this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
    return Array.prototype.indexOf.call(self, item) === index;
  });

  // ?????????????????????? ?????????????????? ???? ??????????-????????????
  // ?? ?????????? ?????????????????????? ?????? ???????????? ??????????????
  var _loop = function _loop() {
    var media = _this2.mediaQueries[_i];
    var mediaSplit = String.prototype.split.call(media, ',');
    var matchMedia = window.matchMedia(mediaSplit[0]);
    var mediaBreakpoint = mediaSplit[1];

    // ???????????? ???????????????? ?? ???????????????????? ????????????????????????
    var ??bjectsFilter = Array.prototype.filter.call(_this2.??bjects, function (item) {
      return item.breakpoint === mediaBreakpoint;
    });
    matchMedia.addListener(function () {
      _this.mediaHandler(matchMedia, ??bjectsFilter);
    });
    _this2.mediaHandler(matchMedia, ??bjectsFilter);
  };
  for (var _i = 0; _i < this.mediaQueries.length; _i++) {
    _loop();
  }
};
DynamicAdapt.prototype.mediaHandler = function (matchMedia, ??bjects) {
  if (matchMedia.matches) {
    for (var i = 0; i < ??bjects.length; i++) {
      var ??bject = ??bjects[i];
      ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
      this.moveTo(??bject.place, ??bject.element, ??bject.destination);
    }
  } else {
    for (var _i2 = 0; _i2 < ??bjects.length; _i2++) {
      var _??bject = ??bjects[_i2];
      if (_??bject.element.classList.contains(this.daClassname)) {
        this.moveBack(_??bject.parent, _??bject.element, _??bject.index);
      }
    }
  }
};

// ?????????????? ??????????????????????
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
  element.classList.add(this.daClassname);
  if (place === 'last' || place >= destination.children.length) {
    destination.insertAdjacentElement('beforeend', element);
    return;
  }
  if (place === 'first') {
    destination.insertAdjacentElement('afterbegin', element);
    return;
  }
  destination.children[place].insertAdjacentElement('beforebegin', element);
};

// ?????????????? ????????????????
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
  element.classList.remove(this.daClassname);
  if (parent.children[index] !== undefined) {
    parent.children[index].insertAdjacentElement('beforebegin', element);
  } else {
    parent.insertAdjacentElement('beforeend', element);
  }
};

// ?????????????? ?????????????????? ?????????????? ???????????? ????????????????
DynamicAdapt.prototype.indexInParent = function (parent, element) {
  var array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
};

// ?????????????? ???????????????????? ?????????????? ???? breakpoint ?? place 
// ???? ?????????????????????? ?????? this.type = min
// ???? ???????????????? ?????? this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
  if (this.type === "min") {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }
        if (a.place === "first" || b.place === "last") {
          return -1;
        }
        if (a.place === "last" || b.place === "first") {
          return 1;
        }
        return a.place - b.place;
      }
      return a.breakpoint - b.breakpoint;
    });
  } else {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }
        if (a.place === "first" || b.place === "last") {
          return 1;
        }
        if (a.place === "last" || b.place === "first") {
          return -1;
        }
        return b.place - a.place;
      }
      return b.breakpoint - a.breakpoint;
    });
    return;
  }
};
var da = new DynamicAdapt("max");
da.init();
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
  speed: 800,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
    draggable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    991: {
      slidesPerView: 'auto'
    },
    300: {
      slidesPerView: 1
    }
  }
});
"use strict";
//# sourceMappingURL=main.js.map
