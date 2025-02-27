;
(function(window, document, $, undefined) {

    $.swipebox = function(elem, options) {
        var ui, defaults = {
                useCSS: true,
                useSVG: false,
                initialIndexOnArray: 0,
                hideBarsDelay: 1000,
                vimeoColor: 'cccccc',
                download: '保存图片',
                loopAtEnd: false,
            },
            plugin = this,
            elements = [],
            $elem, selector = elem.selector,
            $selector = $(selector),
            isMobile = navigator.userAgent.match(
                /(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i),
            isTouch = isMobile !== null || document.createTouch !== undefined || ('ontouchstart' in window) || (
                'onmsgesturechange' in window) || navigator.msMaxTouchPoints,
            winWidth = window.innerWidth ? window.innerWidth : $(window).width(),
            winHeight = window.innerHeight ? window.innerHeight : $(window).height(),
            screenRatio = winWidth / winHeight,
            currentX = 0,
            nextPageUrl = $('.m-page a:last').attr('href'),
            html =
            '<div id="swipebox-overlay" class="overlay">\
						<div id="swipebox-container">\
							<div id="swipebox-slider">\
							</div>\
						</div>\
						<a id="swipebox-close"></a>\
						<div id="bottom_box">\
						<a id="swipebox-download"></a>\
						<a id="btn_pd" href="https://m.woyaogexing.com/about/pd.html">APP查看图</a>\
						</div>\
					</div>';
 
        plugin.settings = {};
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            if ($.isArray(elem)) {
                elements = elem;
                ui.target = $(window);
                ui.init(plugin.settings.initialIndexOnArray);
            } else {
                $(document).on('click', selector, function(event) {
                    if (event.target.parentNode.className === 'slide current') {
                        return false;
                    }
                    if (!$.isArray(elem)) {
                        $elem = $(selector);
                        ui.actions();
                    }
                    elements = [];
                    var index, relType, relVal;
                    $elem = $(selector);
                    $elem.each(function() {
                        var title = null,
                            href = null;
                        if ($(this).find('img')) {
                            href = $(this).find('img').attr('data-src');
                            downloadUrl = $(this).find('img').attr('data-src');
                        }
                        elements.push({
                            href: href,
                            downloadUrl: downloadUrl
                        });
                    });
                    index = $elem.index($(this));
                    event.preventDefault();
                    event.stopPropagation();
                    ui.target = $(event.target);
                    ui.init(index);
                });
            }
        };
        ui = {
            toast: false,
            init: function(index) {
                $.swipebox.isOpen = true;
                this.build();
                this.openSlide(index);
                this.openMedia(index);
                this.preloadMedia(index + 1);
                this.preloadMedia(index - 1);
            },
            build: function() {
                var $this = this,
                    bg;
                $('body').append(html);
                elements.length = elements.length + 1;
                $('#swipebox-slider').css({
                    width: elements.length * winWidth + 'px'
                })
                $.each(elements, function() {
                    $('#swipebox-slider').append('<div class="slide" style="width:' + winWidth + 'px;height:' + winHeight +
                        'px;"></div>');
                });
                if (isTouch) {
                    $this.gesture();
                }
                $this.actions()
                $(".slide:last").html(lastPage)
                $('.lastPage').css({
                    marginTop: (winHeight / 2 - 75 / 2) + 'px'
                })
                // $this.initOpenBtn()
            },
            supportTransition: function() {
                var prefixes = 'transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition'.split(' '),
                    i;
                for (i = 0; i < prefixes.length; i++) {
                    if (document.createElement('div').style[prefixes[i]] !== undefined) {
                        return prefixes[i];
                    }
                }
                return false;
            },
            doCssTrans: function() {
                if (plugin.settings.useCSS && this.supportTransition()) {
                    return true;
                }
            },
            gesture: function() {
                var $this = this,
                    index, hDistance, vDistance, hDistanceLast, vDistanceLast, hDistancePercent, vSwipe = false,
                    hSwipe = false,
                    hSwipMinDistance = 10,
                    vSwipMinDistance = 50,
                    startCoords = {},
                    endCoords = {},
                    slider = $('#swipebox-slider');
                var time;
                $('#swipebox-slider').bind('touchstart', function(event) {
                    $(this).addClass('touching');
                    index = $('#swipebox-slider .slide').index($('#swipebox-slider .slide.current'));
                    endCoords = event.originalEvent.targetTouches[0];
                    startCoords.pageX = event.originalEvent.targetTouches[0].pageX;
                    startCoords.pageY = event.originalEvent.targetTouches[0].pageY;
                    $('#swipebox-slider').css({
                        '-webkit-transform': 'translate3d(' + currentX * winWidth + 'px, 0, 0)',
                        'transform': 'translate3d(' + currentX * winWidth + 'px, 0, 0)'
                    });
                    $('.touching').bind('touchmove', function(event) {
                        endCoords = event.originalEvent.targetTouches[0];
                        if (!hSwipe) {
                            vDistanceLast = vDistance;
                            vDistance = endCoords.pageY - startCoords.pageY;
                            if (Math.abs(vDistance) >= vSwipMinDistance || vSwipe) {
                                var opacity = 0.75 - Math.abs(vDistance) / slider.height();
                                slider.css({
                                    'top': vDistance + 'px'
                                });
                                slider.css({
                                    'opacity': opacity
                                });
                                vSwipe = true;
                            }
                        }
                        hDistanceLast = hDistance;
                        hDistance = endCoords.pageX - startCoords.pageX;
                        hDistancePercent = hDistance * 100 / winWidth;
                        if (!hSwipe && !vSwipe && Math.abs(hDistance) >= hSwipMinDistance) {
                            $('#swipebox-slider').css({
                                '-webkit-transition': '',
                                'transition': ''
                            });
                            hSwipe = true;
                        }
                        if (hSwipe) {
                            if (0 < hDistance) {
                                if (0 === index) {
                                    $('#swipebox-overlay').addClass('leftSpringTouch');
                                } else {
                                    $('#swipebox-overlay').removeClass('leftSpringTouch').removeClass('rightSpringTouch');
                                    $('#swipebox-slider').css({
                                        '-webkit-transform': 'translate3d(' + (currentX) * winWidth + 'px, 0, 0)',
                                        'transform': 'translate3d(' + (currentX) * winWidth + 'px, 0, 0)'
                                    });
                                }
                            } else if (0 > hDistance) {
                                if (elements.length === index + 1) {
                                    $('#swipebox-overlay').addClass('rightSpringTouch');
                                } else {
                                    $('#swipebox-overlay').removeClass('leftSpringTouch').removeClass('rightSpringTouch');
                                    $('#swipebox-slider').css({
                                        '-webkit-transform': 'translate3d(' + (currentX) * winWidth + 'px, 0, 0)',
                                        'transform': 'translate3d(' + (currentX) * winWidth + 'px, 0, 0)'
                                    });
                                }
                            }
                        }
                        return false;
                    });
                }).bind('touchend', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var target = event.target
                    $('#swipebox-slider').css({
                        '-webkit-transition': '-webkit-transform 0.4s ease',
                        'transition': 'transform 0.4s ease'
                    });
                    vDistance = endCoords.pageY - startCoords.pageY;
                    hDistance = endCoords.pageX - startCoords.pageX;
                    hDistancePercent = hDistance * 100 / winWidth;
                    if (vSwipe) {
                        vSwipe = false;
                        if (Math.abs(vDistance) >= 2 * vSwipMinDistance && Math.abs(vDistance) > Math.abs(vDistanceLast)) {
                            var vOffset = vDistance > 0 ? slider.height() : -slider.height();
                            slider.animate({
                                top: vOffset + 'px',
                                'opacity': 0
                            }, 300, function() {
                                $this.closeSlide();
                            });
                        } else {
                            slider.animate({
                                top: 0,
                                'opacity': 1
                            }, 300);
                        }
                    } else if (hSwipe) {
                        hSwipe = false;
                        if (hDistance >= hSwipMinDistance && hDistance >= hDistanceLast) {
                            $this.getPrev();
                        } else if (hDistance <= -hSwipMinDistance && hDistance <= hDistanceLast) {
                            $this.getNext();
                        }
                    } else {
                        if (index == elements.length - 1 && event.target.nodeName == "IMG") {
                            window.location.href = "//m.woyaogexing.com/about/pd.html"
                        } else {
                            $this.toggleBars()
                        }
                    }
                    $('#swipebox-slider').css({
                        '-webkit-transform': 'translate3d(' + currentX * winWidth + 'px, 0, 0)',
                        'transform': 'translate3d(' + currentX * winWidth + 'px, 0, 0)'
                    });
                    $('#swipebox-overlay').removeClass('leftSpringTouch').removeClass('rightSpringTouch');
                    $('.touching').off('touchmove').removeClass('touching');
                });
            },
            actions: function() {
                var $this = this,
                    action = 'click';
                $('#swipebox-close').bind(action, function() {
                    $this.closeSlide();
                });
            },
            closeSlide: function() {
                $('html').removeClass('swipebox-html').removeClass('swipebox-touch');
                $('#swipebox-overlay').removeClass('overlay-in')
                $("#swipebox-download").remove()
                this.destroy();
            },
            download: function(index) {
                var _self = this
                if (index < elements.length - 1) {
                    plugin.settings.download = defaults.download;
                    $('#swipebox-download').attr('href', 'javascript:void(0)');
                    $("#swipebox-download").click(function(e) {
                        if (!_self.toast) {
                            _self.toastShow("长按图片保存")
                        }
                        e.preventDefault()
                    })
                } else {
                    plugin.settings.download = '下一组';
                    $('#swipebox-download').attr('href', nextPageUrl).unbind();
                }
                $('#swipebox-download').html(plugin.settings.download);
            },
            toggleBars: function() {
                $("#bottom_box").fadeToggle("fast")
                $("#swipebox-close").fadeToggle("fast")
            },
            buildToast: function(msg) {
                $("#swipebox-overlay").append("<div id='tip-toast' class='toast-box'><span>" + msg + "</span></div>");
            },
            toastShow: function(msg) {
                this.buildToast(msg)
                $("#tip-toast").addClass("toast-show")
                this.toast = true
                this.toastAutoHide()
            },
            toastAutoHide: function() {
                var _self = this
                setTimeout(function() {
                    _self.toastHide()
                    _self.toast = false
                }, 1500)
            },
            toastHide: function() {
                $("#tip-toast").remove()
            },
            setSlide: function(index, isFirst) {
                isFirst = isFirst || false;
                var slider = $('#swipebox-slider');
                currentX = -index;
                if (this.doCssTrans()) {
                    slider.css({
                        '-webkit-transform': 'translate3d(' + (-index * winWidth) + 'px, 0, 0)',
                        'transform': 'translate3d(' + (-index * winWidth) + 'px, 0, 0)'
                    });
                } else {
                    slider.animate({
                        left: (-index * winWidth) + 'px'
                    });
                }
                $('#swipebox-slider .slide').removeClass('current');
                $('#swipebox-slider .slide').eq(index).addClass('current');
                if (isFirst) {
                    slider.fadeIn();
                }
                this.download(index);
            },
            openSlide: function(index) {
                $('html').addClass('swipebox-html');
                if (isTouch) {
                    $('html').addClass('swipebox-touch');
                }
                this.setSlide(index, true);
                $('#swipebox-overlay').addClass('overlay-in')
            },
            preloadMedia: function(index) {
                var $this = this,
                    src = null;
                if (elements[index] !== undefined) {
                    src = elements[index].href;
                }
                setTimeout(function() {
                    $this.openMedia(index);
                }, 1000);
            },
            openMedia: function(index) {
                var $this = this,
                    src, slide;
                if (elements[index] !== undefined) {
                    src = elements[index].href;
                }
                if (index < 0 || index > elements.length) {
                    return false;
                }
                slide = $('#swipebox-slider .slide').eq(index);
                if (src !== undefined) {
                    $this.loadMedia(src, function() {
                        slide.html(this);
                        if ($(this).height() > winHeight) {
                            $(this).height(winHeight)
                        }
                        $(this).css({
                            marginTop: (winHeight / 2 - $(this).height() / 2) + 'px'
                        });
                    });
                }
            },
            loadMedia: function(src, callback) {
                var img = $('<img>').on('load', function(src) {
                    callback.call(img);
                });
                img.attr('src', src);
            },
            getNext: function() {
                var $this = this,
                    src, index = $('#swipebox-slider .slide').index($('#swipebox-slider .slide.current'));
                if (index + 1 < elements.length) {
                    index++;
                    $this.setSlide(index);
                    $this.preloadMedia(index + 1);
                } else {
                    if (plugin.settings.loopAtEnd === true) {
                        index = 0;
                        $this.preloadMedia(index);
                        $this.setSlide(index);
                        $this.preloadMedia(index + 1);
                    } else {
                        $('#swipebox-overlay').addClass('rightSpring');
                        setTimeout(function() {
                            $('#swipebox-overlay').removeClass('rightSpring');
                        }, 500);
                    }
                }
            },
            getPrev: function() {
                var index = $('#swipebox-slider .slide').index($('#swipebox-slider .slide.current')),
                    src;
                var $this = this;
                if (index == 0) {
                    this.toastShow("向左滑查看更多图片")
                }
                if (index > 0) {
                    index--;
                    this.setSlide(index);
                    this.preloadMedia(index - 1);
                } else {
                    $('#swipebox-overlay').addClass('leftSpring');
                    setTimeout(function() {
                        $('#swipebox-overlay').removeClass('leftSpring');
                    }, 500);
                }
            },
            destroy: function() {
                $(window).unbind('keyup');
                $('body').unbind('touchstart');
                $('body').unbind('touchmove');
                $('body').unbind('touchend');
                $('#swipebox-slider').unbind();
                setTimeout(function() {
                    $('#swipebox-overlay').remove();
                }, 300)
                if (!$.isArray(elem)) {
                    elem.removeData('_swipebox');
                }
                if (this.target) {
                    this.target.trigger('swipebox-destroy');
                }
                $.swipebox.isOpen = false;
            },
            initOpenBtn: function() {
                var u = navigator.userAgent;
                var isIOS = /(iPhone|iPad|iPod|IOS)/i.test(u);
                var isWeixin = u.toLowerCase().indexOf('micromessenger') !== -1; // 微信内
                var isToutiao = u.toLowerCase().indexOf('newsarticle') !== -1; // 头条内
                var down = document.getElementById("btn_pd");

                if (isIOS) {
                    down.href = "wygxw://";
                } else {
                    if (isToutiao) {
                        down.href = "market://details?id=com.example.wygxw";
                    } else {
                        down.href = "wygxw://app/splash?type=main";
                    }
                }

                var d = new Date();
                var t0 = d.getTime();

                //跳转下载
                down.addEventListener("click", function() {
                    if (isWeixin) {
                        alert('请在浏览器上打开');
                    } else if (isIOS) {
                        setTimeout(function() {
                            let hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden || window.document
                                .webkitHidden
                            if (typeof hidden == "undefined" || hidden == false) {
                                window.location.href = "https://itunes.apple.com/cn/app/id1398722668";
                            }
                        }, isIOS ? 2000 : 2000);
                    } else {
                        if (isToutiao) {
                            window.location.href = "market://details?id=com.example.wygxw";
                        } else {
                            setTimeout(function() {
                                let hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden || window.document
                                    .webkitHidden
                                if (typeof hidden == "undefined" || hidden == false) {
                                    window.location.href = "https://m.woyaogexing.com/app/wygxw.apk";
                                }
                            }, isIOS ? 2000 : 2000);
                        }
                    }
                });
            }
        };

        plugin.init();
    };
    $.fn.swipebox = function(options) {
        if (!$.data(this, '_swipebox')) {
            var swipebox = new $.swipebox(this, options);
            this.data('_swipebox', swipebox);
        }
        return this.data('_swipebox');
    };
}(window, document, jQuery));