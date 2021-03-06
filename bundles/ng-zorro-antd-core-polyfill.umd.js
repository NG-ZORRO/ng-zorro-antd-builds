(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/polyfill', ['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core.polyfill = {})));
}(this, (function (exports) { 'use strict';

    // tslint:disable: typedef no-invalid-this
    var availablePrefixes = ['moz', 'ms', 'webkit'];
    function requestAnimationFramePolyfill() {
        var lastTime = 0;
        return function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    function getRequestAnimationFrame() {
        if (typeof window === 'undefined') {
            return function () { return 0; };
        }
        if (window.requestAnimationFrame) {
            // https://github.com/vuejs/vue/issues/4465
            return window.requestAnimationFrame.bind(window);
        }
        var prefix = availablePrefixes.filter(function (key) { return key + "RequestAnimationFrame" in window; })[0];
        return prefix ? window[prefix + "RequestAnimationFrame"] : requestAnimationFramePolyfill();
    }
    function cancelRequestAnimationFrame(id) {
        if (typeof window === 'undefined') {
            return null;
        }
        if (window.cancelAnimationFrame) {
            return window.cancelAnimationFrame(id);
        }
        var prefix = availablePrefixes.filter(function (key) { return key + "CancelAnimationFrame" in window || key + "CancelRequestAnimationFrame" in window; })[0];
        return prefix
            ? (window[prefix + "CancelAnimationFrame"] || window[prefix + "CancelRequestAnimationFrame"])
                // @ts-ignore
                .call(this, id)
            : clearTimeout(id);
    }
    var reqAnimFrame = getRequestAnimationFrame();

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.cancelRequestAnimationFrame = cancelRequestAnimationFrame;
    exports.reqAnimFrame = reqAnimFrame;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-polyfill.umd.js.map
