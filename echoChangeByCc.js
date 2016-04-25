/*
 *modified from echo-js v1.7.3 | (c) 2016 @toddmotto | https://github.com/toddmotto/echo 
 *by Cc 2016.04.25
 */
window.echoChangeByCc = (function (window, document, undefined) {
    'use strict';

    var echo = {},
        callback = function () { },
        container,
        offset,
        poll,
        delay,
        useDebounce,
        unload,
        isHidden = function (element) {
            return (element.offsetParent === null);
        },
        inView = function (element, view) {
            if (isHidden(element)) {
                return false;
            }

            var box = element.getBoundingClientRect();
            return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b);
        },
        debounceOrThrottle = function () {
            if (!useDebounce && !!poll) {
                return;
            }
            clearTimeout(poll);
            poll = setTimeout(function () {
                echo.render();
                poll = null;
            }, delay);
        };

    echo.init = function (opts) {
        opts = opts || {};
        var offsetAll = opts.offset || 0,
            offsetVertical = opts.offsetVertical || offsetAll,
            offsetHorizontal = opts.offsetHorizontal || offsetAll,
            optionToInt = function (opt, fallback) {
                return parseInt(opt || fallback, 10);
            };

        container = opts.container || document.body;
        offset = {
            t: optionToInt(opts.offsetTop, offsetVertical),
            b: optionToInt(opts.offsetBottom, offsetVertical),
            l: optionToInt(opts.offsetLeft, offsetHorizontal),
            r: optionToInt(opts.offsetRight, offsetHorizontal)
        };
        delay = optionToInt(opts.throttle, 250);
        useDebounce = opts.debounce !== false;
        unload = !!opts.unload;
        callback = opts.callback || callback;
        echo.render();
        if (document.addEventListener) {
            container.addEventListener('scroll', debounceOrThrottle, false);
            document.body.addEventListener('load', debounceOrThrottle, false);
        } else {
            container.attachEvent('onscroll', debounceOrThrottle);
            document.body.attachEvent('onload', debounceOrThrottle);
        }
    };

    echo.render = function () {
        var nodes = document.querySelectorAll('img[data-echo], [data-echo-background]');
        var length = nodes.length;
        var src, elem;
        var view = {
            l: 0 - offset.l,
            t: 0 - offset.t,
            b: (container.clientHeight + offset.b),
            r: (container.clientWidth + offset.r)
        };
        for (var i = 0; i < length; i++) {
            elem = nodes[i];
            if (inView(elem, view)) {

                if (unload) {
                    elem.setAttribute('data-echo-placeholder', elem.src);
                }

                if (elem.getAttribute('data-echo-background') !== null) {
                    elem.style.backgroundImage = "url(" + elem.getAttribute('data-echo-background') + ")";
                }
                else {
                    elem.src = elem.getAttribute('data-echo');
                }

                if (!unload) {
                    elem.removeAttribute('data-echo');
                    elem.removeAttribute('data-echo-background');
                }

                callback(elem, 'load');
            }
            else if (unload && !!(src = elem.getAttribute('data-echo-placeholder'))) {

                if (elem.getAttribute('data-echo-background') !== null) {
                    elem.style.backgroundImage = "url(" + src + ")";
                }
                else {
                    elem.src = src;
                }

                elem.removeAttribute('data-echo-placeholder');
                callback(elem, 'unload');
            }
        }
        if (!length) {
            echo.detach();
        }
    };

    echo.detach = function () {
        if (document.removeEventListener) {
            container.removeEventListener('scroll', debounceOrThrottle);
        } else {
            container.detachEvent('onscroll', debounceOrThrottle);
        }
        clearTimeout(poll);
    };

    return echo;
})(window, document);