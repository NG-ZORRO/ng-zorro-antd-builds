(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/highlight', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core.highlight = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: highlight.pipe.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Regular Expressions for parsing tags and attributes
    /** @type {?} */
    var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    // ! to ~ is the ASCII range.
    /** @type {?} */
    var NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;
    /**
     * Escapes all potentially dangerous characters, so that the
     * resulting string can be safely inserted into attribute or
     * element text.
     * @param {?} value
     * @return {?}
     */
    function encodeEntities(value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(SURROGATE_PAIR_REGEXP, (/**
         * @param {?} match
         * @return {?}
         */
        function (match) {
            /** @type {?} */
            var hi = match.charCodeAt(0);
            /** @type {?} */
            var low = match.charCodeAt(1);
            return "&#" + ((hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000) + ";";
        }))
            .replace(NON_ALPHANUMERIC_REGEXP, (/**
         * @param {?} match
         * @return {?}
         */
        function (match) { return "&#" + match.charCodeAt(0) + ";"; }))
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
    var NzHighlightPipe = /** @class */ (function () {
        function NzHighlightPipe() {
            this.UNIQUE_WRAPPERS = ['##==-open_tag-==##', '##==-close_tag-==##'];
        }
        /**
         * @param {?} value
         * @param {?} highlightValue
         * @param {?=} flags
         * @param {?=} klass
         * @return {?}
         */
        NzHighlightPipe.prototype.transform = /**
         * @param {?} value
         * @param {?} highlightValue
         * @param {?=} flags
         * @param {?=} klass
         * @return {?}
         */
        function (value, highlightValue, flags, klass) {
            if (!highlightValue) {
                return value;
            }
            // Escapes regex keyword to interpret these characters literally
            /** @type {?} */
            var searchValue = new RegExp(highlightValue.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$&'), flags);
            /** @type {?} */
            var wrapValue = value.replace(searchValue, this.UNIQUE_WRAPPERS[0] + "$&" + this.UNIQUE_WRAPPERS[1]);
            return encodeEntities(wrapValue)
                .replace(new RegExp(this.UNIQUE_WRAPPERS[0], 'g'), klass ? "<span class=\"" + klass + "\">" : '<span>')
                .replace(new RegExp(this.UNIQUE_WRAPPERS[1], 'g'), '</span>');
        };
        NzHighlightPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'nzHighlight',
                        pure: true
                    },] }
        ];
        return NzHighlightPipe;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzHighlightPipe.prototype.UNIQUE_WRAPPERS;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: highlight.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzHighlightModule = /** @class */ (function () {
        function NzHighlightModule() {
        }
        NzHighlightModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        exports: [NzHighlightPipe],
                        declarations: [NzHighlightPipe]
                    },] }
        ];
        return NzHighlightModule;
    }());

    exports.NzHighlightModule = NzHighlightModule;
    exports.NzHighlightPipe = NzHighlightPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-highlight.umd.js.map
