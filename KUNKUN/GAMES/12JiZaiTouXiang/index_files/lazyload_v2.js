var lazyCookie = {
    setCookie: function() {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + 30);
        document.cookie = "lyWebp=true;expires=" + exdate.toGMTString();
    },
    getCookie: function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    }
};
var hasWebp = (function() {
    // if has webp cookie
    if (lazyCookie.getCookie('lyWebp')) return true;
    // if support webp
    var isSupportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    if (!isSupportWebp) return false;

    // or
    lazyCookie.setCookie();
    return true;
})();


(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global.lozad = factory());
}(this, (function() {
    'use strict';

    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    var defaultConfig = {
        rootMargin: '0px',
        threshold: 0,
        load: function load(element) {
            var origin = element.getAttribute('data-src');
            var src = hasWebp ? origin.replace(/(png|jpg|jpeg)/, 'webp') : origin;

            var img = new Image();
            img.onload = function() {
                element.src = src
            }
            img.onerror = function() {
                element.src = origin
            }
            img.src = src


            //if (element.getAttribute('data-original')) {
            //  element.setAttribute('data-original', src)
            //}

            // if (element.getAttribute('data-srcset')) {
            //   element.srcset = element.getAttribute('data-srcset');
            // }
            // if (element.getAttribute('data-background-image')) {
            //   element.style.backgroundImage = 'url(' + element.getAttribute('data-background-image') + ')';
            // }
        }
    };

    function imgLoadError(ele, img) {
        var src = ele.getAttribute('data-src');
        img.addEventListener('error', function() {
            img.src = src;
        });
        img.removeEventListener('error', imgLoadError);
    }

    function markAsLoaded(element) {
        element.setAttribute('data-loaded', true);
    }

    var isLoaded = function isLoaded(element) {
        return element.getAttribute('data-loaded') === 'true';
    };

    var onIntersection = function onIntersection(load) {
        return function(entries, observer) {

            entries.forEach(function(entry) {
                if (entry.intersectionRatio > 0) {
                    observer.unobserve(entry.target);

                    if (!isLoaded(entry.target)) {
                        load(entry.target);
                        markAsLoaded(entry.target);
                    }
                }
            });
        };
    };

    var getElements = function getElements(selector) {
        if (selector instanceof Element) {
            return [selector];
        }
        if (selector instanceof NodeList) {
            return selector;
        }
        return document.querySelectorAll(selector);
    };

    var lozad = function() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.lozad';
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _defaultConfig$option = _extends({}, defaultConfig, options),
            rootMargin = _defaultConfig$option.rootMargin,
            threshold = _defaultConfig$option.threshold,
            load = _defaultConfig$option.load;

        var observer = void 0;

        if (window.IntersectionObserver) {
            observer = new IntersectionObserver(onIntersection(load), {
                rootMargin: rootMargin,
                threshold: threshold
            });
        }

        return {
            observe: function observe() {
                var elements = getElements(selector);

                for (var i = 0; i < elements.length; i++) {
                    if (isLoaded(elements[i])) {
                        continue;
                    }

                    if (observer) {
                        observer.observe(elements[i]);
                        continue;
                    }
                    load(elements[i]);
                    markAsLoaded(elements[i]);
                }
            },
            triggerLoad: function triggerLoad(element) {
                if (isLoaded(element)) {
                    return;
                }

                load(element);
                markAsLoaded(element);
            }
        };
    };

    return lozad;

})));