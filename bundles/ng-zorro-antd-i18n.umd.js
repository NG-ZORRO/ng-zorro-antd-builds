(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/core/logger'), require('rxjs'), require('@angular/common'), require('date-fns/format'), require('date-fns/getISOWeek'), require('date-fns/parse')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/i18n', ['exports', '@angular/core', 'ng-zorro-antd/core/logger', 'rxjs', '@angular/common', 'date-fns/format', 'date-fns/getISOWeek', 'date-fns/parse'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].i18n = {}), global.ng.core, global['ng-zorro-antd'].core.logger, global.rxjs, global.ng.common, global.fnsFormat, global.fnsGetISOWeek, global.fnsParse));
}(this, (function (exports, core, logger, rxjs, common, fnsFormat, fnsGetISOWeek, fnsParse) { 'use strict';

    fnsFormat = fnsFormat && Object.prototype.hasOwnProperty.call(fnsFormat, 'default') ? fnsFormat['default'] : fnsFormat;
    fnsGetISOWeek = fnsGetISOWeek && Object.prototype.hasOwnProperty.call(fnsGetISOWeek, 'default') ? fnsGetISOWeek['default'] : fnsGetISOWeek;
    fnsParse = fnsParse && Object.prototype.hasOwnProperty.call(fnsParse, 'default') ? fnsParse['default'] : fnsParse;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/zh_CN.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var zh_CN = {
        locale: 'zh-cn',
        Pagination: {
            items_per_page: '条/页',
            jump_to: '跳至',
            jump_to_confirm: '确定',
            page: '页',
            prev_page: '上一页',
            next_page: '下一页',
            prev_5: '向前 5 页',
            next_5: '向后 5 页',
            prev_3: '向前 3 页',
            next_3: '向后 3 页'
        },
        DatePicker: {
            lang: {
                placeholder: '请选择日期',
                yearPlaceholder: '请选择年份',
                quarterPlaceholder: '请选择季度',
                monthPlaceholder: '请选择月份',
                weekPlaceholder: '请选择周',
                rangePlaceholder: ['开始日期', '结束日期'],
                rangeYearPlaceholder: ['开始年份', '结束年份'],
                rangeMonthPlaceholder: ['开始月份', '结束月份'],
                rangeWeekPlaceholder: ['开始周', '结束周'],
                locale: 'zh_CN',
                today: '今天',
                now: '此刻',
                backToToday: '返回今天',
                ok: '确定',
                timeSelect: '选择时间',
                dateSelect: '选择日期',
                weekSelect: '选择周',
                clear: '清除',
                month: '月',
                year: '年',
                previousMonth: '上个月 (翻页上键)',
                nextMonth: '下个月 (翻页下键)',
                monthSelect: '选择月份',
                yearSelect: '选择年份',
                decadeSelect: '选择年代',
                yearFormat: 'YYYY年',
                dayFormat: 'D日',
                dateFormat: 'YYYY年M月D日',
                dateTimeFormat: 'YYYY年M月D日 HH时mm分ss秒',
                previousYear: '上一年 (Control键加左方向键)',
                nextYear: '下一年 (Control键加右方向键)',
                previousDecade: '上一年代',
                nextDecade: '下一年代',
                previousCentury: '上一世纪',
                nextCentury: '下一世纪'
            },
            timePickerLocale: {
                placeholder: '请选择时间',
                rangePlaceholder: ['开始时间', '结束时间']
            }
        },
        TimePicker: {
            placeholder: '请选择时间',
            rangePlaceholder: ['开始时间', '结束时间']
        },
        Calendar: {
            lang: {
                placeholder: '请选择日期',
                yearPlaceholder: '请选择年份',
                quarterPlaceholder: '请选择季度',
                monthPlaceholder: '请选择月份',
                weekPlaceholder: '请选择周',
                rangePlaceholder: ['开始日期', '结束日期'],
                rangeYearPlaceholder: ['开始年份', '结束年份'],
                rangeMonthPlaceholder: ['开始月份', '结束月份'],
                rangeWeekPlaceholder: ['开始周', '结束周'],
                locale: 'zh_CN',
                today: '今天',
                now: '此刻',
                backToToday: '返回今天',
                ok: '确定',
                timeSelect: '选择时间',
                dateSelect: '选择日期',
                weekSelect: '选择周',
                clear: '清除',
                month: '月',
                year: '年',
                previousMonth: '上个月 (翻页上键)',
                nextMonth: '下个月 (翻页下键)',
                monthSelect: '选择月份',
                yearSelect: '选择年份',
                decadeSelect: '选择年代',
                yearFormat: 'YYYY年',
                dayFormat: 'D日',
                dateFormat: 'YYYY年M月D日',
                dateTimeFormat: 'YYYY年M月D日 HH时mm分ss秒',
                previousYear: '上一年 (Control键加左方向键)',
                nextYear: '下一年 (Control键加右方向键)',
                previousDecade: '上一年代',
                nextDecade: '下一年代',
                previousCentury: '上一世纪',
                nextCentury: '下一世纪'
            },
            timePickerLocale: {
                placeholder: '请选择时间',
                rangePlaceholder: ['开始时间', '结束时间']
            }
        },
        global: {
            placeholder: '请选择'
        },
        Table: {
            filterTitle: '筛选',
            filterConfirm: '确定',
            filterReset: '重置',
            selectAll: '全选当页',
            selectInvert: '反选当页',
            selectionAll: '全选所有',
            sortTitle: '排序',
            expand: '展开行',
            collapse: '关闭行',
            triggerDesc: '点击降序',
            triggerAsc: '点击升序',
            cancelSort: '取消排序'
        },
        Modal: {
            okText: '确定',
            cancelText: '取消',
            justOkText: '知道了'
        },
        Popconfirm: {
            cancelText: '取消',
            okText: '确定'
        },
        Transfer: {
            searchPlaceholder: '请输入搜索内容',
            itemUnit: '项',
            itemsUnit: '项'
        },
        Upload: {
            uploading: '文件上传中',
            removeFile: '删除文件',
            uploadError: '上传错误',
            previewFile: '预览文件',
            downloadFile: '下载文件'
        },
        Empty: {
            description: '暂无数据'
        },
        Icon: {
            icon: '图标'
        },
        Text: {
            edit: '编辑',
            copy: '复制',
            copied: '复制成功',
            expand: '展开'
        },
        PageHeader: {
            back: '返回'
        },
        Form: {
            defaultValidateMessages: {
                default: '字段验证错误${label}',
                required: '请输入${label}',
                enum: '${label}必须是其中一个[${enum}]',
                whitespace: '${label}不能为空字符',
                date: {
                    format: '${label}日期格式无效',
                    parse: '${label}不能转换为日期',
                    invalid: '${label}是一个无效日期'
                },
                types: {
                    string: '${label}不是一个有效的${type}',
                    method: '${label}不是一个有效的${type}',
                    array: '${label}不是一个有效的${type}',
                    object: '${label}不是一个有效的${type}',
                    number: '${label}不是一个有效的${type}',
                    date: '${label}不是一个有效的${type}',
                    boolean: '${label}不是一个有效的${type}',
                    integer: '${label}不是一个有效的${type}',
                    float: '${label}不是一个有效的${type}',
                    regexp: '${label}不是一个有效的${type}',
                    email: '${label}不是一个有效的${type}',
                    url: '${label}不是一个有效的${type}',
                    hex: '${label}不是一个有效的${type}'
                },
                string: {
                    len: '${label}须为${len}个字符',
                    min: '${label}最少${min}个字符',
                    max: '${label}最多${max}个字符',
                    range: '${label}须在${min}-${max}字符之间'
                },
                number: {
                    len: '${label}必须等于${len}',
                    min: '${label}最小值为${min}',
                    max: '${label}最大值为${max}',
                    range: '${label}须在${min}-${max}之间'
                },
                array: {
                    len: '须为${len}个${label}',
                    min: '最少${min}个${label}',
                    max: '最多${max}个${label}',
                    range: '${label}数量须在${min}-${max}之间'
                },
                pattern: {
                    mismatch: '${label}与模式不匹配${pattern}'
                }
            }
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: nz-i18n.token.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_I18N = new core.InjectionToken('nz-i18n');
    /**
     * Locale for date operations, should import from date-fns, see example: https://github.com/date-fns/date-fns/blob/v1.30.1/src/locale/zh_cn/index.js
     * @type {?}
     */
    var NZ_DATE_LOCALE = new core.InjectionToken('nz-date-locale');

    /**
     * @fileoverview added by tsickle
     * Generated from: nz-i18n.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzI18nService = /** @class */ (function () {
        function NzI18nService(locale, dateLocale) {
            this._change = new rxjs.BehaviorSubject(this._locale);
            this.setLocale(locale || zh_CN);
            this.setDateLocale(dateLocale || null);
        }
        Object.defineProperty(NzI18nService.prototype, "localeChange", {
            get: /**
             * @return {?}
             */
            function () {
                return this._change.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        // [NOTE] Performance issue: this method may called by every change detections
        // TODO: cache more deeply paths for performance
        // [NOTE] Performance issue: this method may called by every change detections
        // TODO: cache more deeply paths for performance
        /**
         * @param {?} path
         * @param {?=} data
         * @return {?}
         */
        NzI18nService.prototype.translate = 
        // [NOTE] Performance issue: this method may called by every change detections
        // TODO: cache more deeply paths for performance
        /**
         * @param {?} path
         * @param {?=} data
         * @return {?}
         */
        function (path, data) {
            // this._logger.debug(`[NzI18nService] Translating(${this._locale.locale}): ${path}`);
            /** @type {?} */
            var content = (/** @type {?} */ (this._getObjectPath(this._locale, path)));
            if (typeof content === 'string') {
                if (data) {
                    Object.keys(data).forEach((/**
                     * @param {?} key
                     * @return {?}
                     */
                    function (key) { return (content = content.replace(new RegExp("%" + key + "%", 'g'), data[key])); }));
                }
                return content;
            }
            return path;
        };
        /**
         * Set/Change current locale globally throughout the WHOLE application
         * NOTE: If called at runtime, rendered interface may not change along with the locale change,
         * because this do not trigger another render schedule.
         *
         * @param locale The translating letters
         */
        /**
         * Set/Change current locale globally throughout the WHOLE application
         * NOTE: If called at runtime, rendered interface may not change along with the locale change,
         * because this do not trigger another render schedule.
         *
         * @param {?} locale The translating letters
         * @return {?}
         */
        NzI18nService.prototype.setLocale = /**
         * Set/Change current locale globally throughout the WHOLE application
         * NOTE: If called at runtime, rendered interface may not change along with the locale change,
         * because this do not trigger another render schedule.
         *
         * @param {?} locale The translating letters
         * @return {?}
         */
        function (locale) {
            if (this._locale && this._locale.locale === locale.locale) {
                return;
            }
            this._locale = locale;
            this._change.next(locale);
        };
        /**
         * @return {?}
         */
        NzI18nService.prototype.getLocale = /**
         * @return {?}
         */
        function () {
            return this._locale;
        };
        /**
         * @return {?}
         */
        NzI18nService.prototype.getLocaleId = /**
         * @return {?}
         */
        function () {
            return this._locale ? this._locale.locale : '';
        };
        /**
         * @param {?} dateLocale
         * @return {?}
         */
        NzI18nService.prototype.setDateLocale = /**
         * @param {?} dateLocale
         * @return {?}
         */
        function (dateLocale) {
            this.dateLocale = dateLocale;
        };
        /**
         * @return {?}
         */
        NzI18nService.prototype.getDateLocale = /**
         * @return {?}
         */
        function () {
            return this.dateLocale;
        };
        /**
         * Get locale data
         * @param path dot paths for finding exist value from locale data, eg. "a.b.c"
         * @param defaultValue default value if the result is not "truthy"
         */
        /**
         * Get locale data
         * @param {?} path dot paths for finding exist value from locale data, eg. "a.b.c"
         * @param {?=} defaultValue default value if the result is not "truthy"
         * @return {?}
         */
        NzI18nService.prototype.getLocaleData = /**
         * Get locale data
         * @param {?} path dot paths for finding exist value from locale data, eg. "a.b.c"
         * @param {?=} defaultValue default value if the result is not "truthy"
         * @return {?}
         */
        function (path, defaultValue) {
            /** @type {?} */
            var result = path ? this._getObjectPath(this._locale, path) : this._locale;
            if (!result && !defaultValue) {
                logger.warn("Missing translations for \"" + path + "\" in language \"" + this._locale.locale + "\".\nYou can use \"NzI18nService.setLocale\" as a temporary fix.\nWelcome to submit a pull request to help us optimize the translations!\nhttps://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CONTRIBUTING.md");
            }
            return result || defaultValue || {};
        };
        /**
         * @private
         * @param {?} obj
         * @param {?} path
         * @return {?}
         */
        NzI18nService.prototype._getObjectPath = /**
         * @private
         * @param {?} obj
         * @param {?} path
         * @return {?}
         */
        function (obj, path) {
            /** @type {?} */
            var res = obj;
            /** @type {?} */
            var paths = path.split('.');
            /** @type {?} */
            var depth = paths.length;
            /** @type {?} */
            var index = 0;
            while (res && index < depth) {
                res = res[paths[index++]];
            }
            return index === depth ? res : null;
        };
        NzI18nService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        NzI18nService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [NZ_I18N,] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [NZ_DATE_LOCALE,] }] }
        ]; };
        /** @nocollapse */ NzI18nService.ɵprov = core.ɵɵdefineInjectable({ factory: function NzI18nService_Factory() { return new NzI18nService(core.ɵɵinject(NZ_I18N, 8), core.ɵɵinject(NZ_DATE_LOCALE, 8)); }, token: NzI18nService, providedIn: "root" });
        return NzI18nService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzI18nService.prototype._locale;
        /**
         * @type {?}
         * @private
         */
        NzI18nService.prototype._change;
        /**
         * @type {?}
         * @private
         */
        NzI18nService.prototype.dateLocale;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: nz-i18n.pipe.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzI18nPipe = /** @class */ (function () {
        function NzI18nPipe(_locale) {
            this._locale = _locale;
        }
        /**
         * @param {?} path
         * @param {?=} keyValue
         * @return {?}
         */
        NzI18nPipe.prototype.transform = /**
         * @param {?} path
         * @param {?=} keyValue
         * @return {?}
         */
        function (path, keyValue) {
            return this._locale.translate(path, keyValue);
        };
        NzI18nPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'nzI18n'
                    },] }
        ];
        /** @nocollapse */
        NzI18nPipe.ctorParameters = function () { return [
            { type: NzI18nService }
        ]; };
        return NzI18nPipe;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzI18nPipe.prototype._locale;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: nz-i18n.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzI18nModule = /** @class */ (function () {
        function NzI18nModule() {
        }
        NzI18nModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NzI18nPipe],
                        exports: [NzI18nPipe]
                    },] }
        ];
        return NzI18nModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: date-config.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function NzDateConfig() { }
    if (false) {
        /**
         * Customize the first day of a week
         * @type {?|undefined}
         */
        NzDateConfig.prototype.firstDayOfWeek;
    }
    /** @type {?} */
    var NZ_DATE_CONFIG = new core.InjectionToken('date-config');
    /** @type {?} */
    var NZ_DATE_CONFIG_DEFAULT = {
        firstDayOfWeek: undefined
    };
    /**
     * @deprecated Will be removed in 10.0.0, please update to date-fns v2 format
     * @type {?}
     */
    var NZ_DATE_FNS_COMPATIBLE = new core.InjectionToken('date-format-convert');
    /**
     * @param {?} config
     * @return {?}
     */
    function mergeDateConfig(config) {
        return __assign(__assign({}, NZ_DATE_CONFIG_DEFAULT), config);
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: nz-i18n.interface.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function NzPaginationI18nInterface() { }
    if (false) {
        /** @type {?} */
        NzPaginationI18nInterface.prototype.items_per_page;
        /** @type {?} */
        NzPaginationI18nInterface.prototype.jump_to;
        /** @type {?} */
        NzPaginationI18nInterface.prototype.jump_to_confirm;
        /** @type {?} */
        NzPaginationI18nInterface.prototype.page;
        /** @type {?} */
        NzPaginationI18nInterface.prototype.prev_page;
        /** @type {?} */
        NzPaginationI18nInterface.prototype.next_page;
        /** @type {?} */
        NzPaginationI18nInterface.prototype.prev_5;
        /** @type {?} */
        NzPaginationI18nInterface.prototype.next_5;
        /** @type {?} */
        NzPaginationI18nInterface.prototype.prev_3;
        /** @type {?} */
        NzPaginationI18nInterface.prototype.next_3;
    }
    /**
     * @record
     */
    function NzGlobalI18nInterface() { }
    if (false) {
        /** @type {?} */
        NzGlobalI18nInterface.prototype.placeholder;
    }
    /**
     * @record
     */
    function NzDatePickerI18nInterface() { }
    if (false) {
        /** @type {?} */
        NzDatePickerI18nInterface.prototype.lang;
        /** @type {?} */
        NzDatePickerI18nInterface.prototype.timePickerLocale;
    }
    /**
     * @record
     */
    function NzCalendarI18nInterface() { }
    if (false) {
        /** @type {?} */
        NzCalendarI18nInterface.prototype.today;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.now;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.backToToday;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.ok;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.clear;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.month;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.year;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.timeSelect;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.dateSelect;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.monthSelect;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.yearSelect;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.decadeSelect;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.yearFormat;
        /** @type {?|undefined} */
        NzCalendarI18nInterface.prototype.monthFormat;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.dateFormat;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.dayFormat;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.dateTimeFormat;
        /** @type {?|undefined} */
        NzCalendarI18nInterface.prototype.monthBeforeYear;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.previousMonth;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.nextMonth;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.previousYear;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.nextYear;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.previousDecade;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.nextDecade;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.previousCentury;
        /** @type {?} */
        NzCalendarI18nInterface.prototype.nextCentury;
    }
    /**
     * @record
     */
    function NzDatePickerLangI18nInterface() { }
    if (false) {
        /** @type {?|undefined} */
        NzDatePickerLangI18nInterface.prototype.placeholder;
        /** @type {?|undefined} */
        NzDatePickerLangI18nInterface.prototype.yearPlaceholder;
        /** @type {?|undefined} */
        NzDatePickerLangI18nInterface.prototype.quarterPlaceholder;
        /** @type {?|undefined} */
        NzDatePickerLangI18nInterface.prototype.monthPlaceholder;
        /** @type {?|undefined} */
        NzDatePickerLangI18nInterface.prototype.weekPlaceholder;
        /** @type {?|undefined} */
        NzDatePickerLangI18nInterface.prototype.rangePlaceholder;
        /** @type {?|undefined} */
        NzDatePickerLangI18nInterface.prototype.rangeYearPlaceholder;
        /** @type {?|undefined} */
        NzDatePickerLangI18nInterface.prototype.rangeMonthPlaceholder;
        /** @type {?|undefined} */
        NzDatePickerLangI18nInterface.prototype.rangeWeekPlaceholder;
    }
    /**
     * @record
     */
    function NzTimePickerI18nInterface() { }
    if (false) {
        /** @type {?|undefined} */
        NzTimePickerI18nInterface.prototype.placeholder;
        /** @type {?|undefined} */
        NzTimePickerI18nInterface.prototype.rangePlaceholder;
    }
    /**
     * @record
     */
    function NzFormValidateMessages() { }
    if (false) {
        /** @type {?|undefined} */
        NzFormValidateMessages.prototype.default;
        /** @type {?|undefined} */
        NzFormValidateMessages.prototype.required;
        /** @type {?|undefined} */
        NzFormValidateMessages.prototype.enum;
        /** @type {?|undefined} */
        NzFormValidateMessages.prototype.whitespace;
        /** @type {?|undefined} */
        NzFormValidateMessages.prototype.date;
        /** @type {?|undefined} */
        NzFormValidateMessages.prototype.types;
        /** @type {?|undefined} */
        NzFormValidateMessages.prototype.string;
        /** @type {?|undefined} */
        NzFormValidateMessages.prototype.number;
        /** @type {?|undefined} */
        NzFormValidateMessages.prototype.array;
        /** @type {?|undefined} */
        NzFormValidateMessages.prototype.pattern;
    }
    /**
     * @record
     */
    function NzTableI18nInterface() { }
    if (false) {
        /** @type {?|undefined} */
        NzTableI18nInterface.prototype.filterTitle;
        /** @type {?|undefined} */
        NzTableI18nInterface.prototype.filterConfirm;
        /** @type {?|undefined} */
        NzTableI18nInterface.prototype.filterReset;
        /** @type {?|undefined} */
        NzTableI18nInterface.prototype.selectAll;
        /** @type {?|undefined} */
        NzTableI18nInterface.prototype.selectInvert;
        /** @type {?|undefined} */
        NzTableI18nInterface.prototype.selectionAll;
        /** @type {?|undefined} */
        NzTableI18nInterface.prototype.sortTitle;
        /** @type {?|undefined} */
        NzTableI18nInterface.prototype.expand;
        /** @type {?|undefined} */
        NzTableI18nInterface.prototype.collapse;
        /** @type {?|undefined} */
        NzTableI18nInterface.prototype.triggerDesc;
        /** @type {?|undefined} */
        NzTableI18nInterface.prototype.triggerAsc;
        /** @type {?|undefined} */
        NzTableI18nInterface.prototype.cancelSort;
    }
    /**
     * @record
     */
    function NzModalI18nInterface() { }
    if (false) {
        /** @type {?} */
        NzModalI18nInterface.prototype.okText;
        /** @type {?} */
        NzModalI18nInterface.prototype.cancelText;
        /** @type {?} */
        NzModalI18nInterface.prototype.justOkText;
    }
    /**
     * @record
     */
    function NzPopconfirmI18nInterface() { }
    if (false) {
        /** @type {?} */
        NzPopconfirmI18nInterface.prototype.okText;
        /** @type {?} */
        NzPopconfirmI18nInterface.prototype.cancelText;
    }
    /**
     * @record
     */
    function NzTransferI18nInterface() { }
    if (false) {
        /** @type {?|undefined} */
        NzTransferI18nInterface.prototype.titles;
        /** @type {?|undefined} */
        NzTransferI18nInterface.prototype.searchPlaceholder;
        /** @type {?|undefined} */
        NzTransferI18nInterface.prototype.itemUnit;
        /** @type {?|undefined} */
        NzTransferI18nInterface.prototype.itemsUnit;
    }
    /**
     * @record
     */
    function NzUploadI18nInterface() { }
    if (false) {
        /** @type {?|undefined} */
        NzUploadI18nInterface.prototype.uploading;
        /** @type {?|undefined} */
        NzUploadI18nInterface.prototype.removeFile;
        /** @type {?|undefined} */
        NzUploadI18nInterface.prototype.uploadError;
        /** @type {?|undefined} */
        NzUploadI18nInterface.prototype.previewFile;
        /** @type {?|undefined} */
        NzUploadI18nInterface.prototype.downloadFile;
    }
    /**
     * @record
     */
    function NzEmptyI18nInterface() { }
    if (false) {
        /** @type {?} */
        NzEmptyI18nInterface.prototype.description;
    }
    /**
     * @record
     */
    function NzTextI18nInterface() { }
    if (false) {
        /** @type {?} */
        NzTextI18nInterface.prototype.edit;
        /** @type {?} */
        NzTextI18nInterface.prototype.copy;
        /** @type {?} */
        NzTextI18nInterface.prototype.copied;
        /** @type {?} */
        NzTextI18nInterface.prototype.expand;
    }
    /**
     * @record
     */
    function NzI18nInterface() { }
    if (false) {
        /** @type {?} */
        NzI18nInterface.prototype.locale;
        /** @type {?} */
        NzI18nInterface.prototype.Pagination;
        /** @type {?} */
        NzI18nInterface.prototype.DatePicker;
        /** @type {?} */
        NzI18nInterface.prototype.TimePicker;
        /** @type {?} */
        NzI18nInterface.prototype.Calendar;
        /** @type {?|undefined} */
        NzI18nInterface.prototype.global;
        /** @type {?} */
        NzI18nInterface.prototype.Table;
        /** @type {?} */
        NzI18nInterface.prototype.Modal;
        /** @type {?} */
        NzI18nInterface.prototype.Popconfirm;
        /** @type {?} */
        NzI18nInterface.prototype.Transfer;
        /** @type {?} */
        NzI18nInterface.prototype.Upload;
        /** @type {?} */
        NzI18nInterface.prototype.Empty;
        /** @type {?|undefined} */
        NzI18nInterface.prototype.Text;
        /** @type {?|undefined} */
        NzI18nInterface.prototype.Form;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: convert-tokens.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function TokensMap() { }
    /** @type {?} */
    var tokensMap = {
        M: 'L',
        Mo: 'Mo',
        MM: 'LL',
        MMM: 'LLL',
        MMMM: 'LLLL',
        Q: 'q',
        Qo: 'qo',
        D: 'd',
        Do: 'do',
        DD: 'dd',
        DDD: 'D',
        DDDo: 'Do',
        DDDD: 'DDD',
        d: 'i',
        do: 'io',
        dd: 'iiiiii',
        ddd: 'iii',
        dddd: 'iiii',
        A: 'a',
        a: 'a',
        aa: 'aaaa',
        E: 'i',
        W: 'I',
        Wo: 'Io',
        WW: 'II',
        YY: 'yy',
        YYYY: 'yyyy',
        GG: 'RR',
        GGGG: 'RRRR',
        H: 'H',
        HH: 'HH',
        h: 'h',
        hh: 'hh',
        m: 'm',
        mm: 'mm',
        s: 's',
        ss: 'ss',
        S: 'S',
        SS: 'SS',
        SSS: 'SSS',
        Z: 'xxx',
        ZZ: 'xx',
        X: 't',
        x: 'T'
    };
    /** @type {?} */
    var v1tokens = Object.keys(tokensMap).sort().reverse();
    // tslint:disable-next-line:prefer-template
    /** @type {?} */
    var tokensRegExp = new RegExp('(\\[[^\\[]*\\])|(\\\\)?' + '(' + v1tokens.join('|') + '|.)', 'g');
    /**
     * @record
     */
    function TokensBuffer() { }
    if (false) {
        /** @type {?} */
        TokensBuffer.prototype.formatBuffer;
        /** @type {?} */
        TokensBuffer.prototype.textBuffer;
    }
    /**
     * @param {?} format
     * @return {?}
     */
    function convertTokens(format) {
        logger.warnDeprecation("'NZ_DATE_FNS_COMPATIBLE' will be removed in 10.0.0, please update to date-fns v2 format.");
        /** @type {?} */
        var tokensCaptures = format.match(tokensRegExp);
        if (tokensCaptures) {
            return tokensCaptures
                .reduce((/**
             * @param {?} acc
             * @param {?} tokenString
             * @param {?} index
             * @return {?}
             */
            function (acc, tokenString, index) {
                /** @type {?} */
                var v2token = tokensMap[tokenString];
                if (!v2token) {
                    /** @type {?} */
                    var escapedCaptures = tokenString.match(/^\[(.+)\]$/);
                    if (escapedCaptures) {
                        acc.textBuffer.push(escapedCaptures[1]);
                    }
                    else {
                        acc.textBuffer.push(tokenString);
                    }
                }
                /** @type {?} */
                var endOfString = index === tokensCaptures.length - 1;
                if (acc.textBuffer.length && (v2token || endOfString)) {
                    acc.formatBuffer.push("'" + acc.textBuffer.join('') + "'");
                    acc.textBuffer = [];
                }
                if (v2token) {
                    acc.formatBuffer.push(v2token);
                }
                return acc;
            }), (/** @type {?} */ ({ formatBuffer: [], textBuffer: [] })))
                .formatBuffer.join('');
        }
        else {
            return format;
        }
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: date-helper.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} injector
     * @param {?} config
     * @param {?} convertFormat
     * @return {?}
     */
    function DATE_HELPER_SERVICE_FACTORY(injector, config, convertFormat) {
        /** @type {?} */
        var i18n = injector.get(NzI18nService);
        return i18n.getDateLocale()
            ? new DateHelperByDateFns(i18n, config, convertFormat)
            : new DateHelperByDatePipe(i18n, config, convertFormat);
    }
    /**
     * Abstract DateHelperService(Token via Class)
     * Compatibility: compact for original usage by default which using DatePipe
     * @abstract
     */
    var DateHelperService = /** @class */ (function () {
        function DateHelperService(i18n, config, convertFormat) {
            this.i18n = i18n;
            this.config = config;
            this.convertFormat = convertFormat;
            this.config = mergeDateConfig(this.config);
        }
        DateHelperService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root',
                        useFactory: DATE_HELPER_SERVICE_FACTORY,
                        deps: [core.Injector, [new core.Optional(), NZ_DATE_CONFIG], [new core.Optional(), NZ_DATE_FNS_COMPATIBLE]]
                    },] }
        ];
        /** @nocollapse */
        DateHelperService.ctorParameters = function () { return [
            { type: NzI18nService },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [NZ_DATE_CONFIG,] }] },
            { type: Boolean, decorators: [{ type: core.Optional }, { type: core.Inject, args: [NZ_DATE_FNS_COMPATIBLE,] }] }
        ]; };
        /** @nocollapse */ DateHelperService.ɵprov = core.ɵɵdefineInjectable({ factory: function DateHelperService_Factory() { return DATE_HELPER_SERVICE_FACTORY(core.ɵɵinject(core.INJECTOR), core.ɵɵinject(NZ_DATE_CONFIG, 8), core.ɵɵinject(NZ_DATE_FNS_COMPATIBLE, 8)); }, token: DateHelperService, providedIn: "root" });
        return DateHelperService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        DateHelperService.prototype.i18n;
        /**
         * @type {?}
         * @protected
         */
        DateHelperService.prototype.config;
        /**
         * @type {?}
         * @protected
         */
        DateHelperService.prototype.convertFormat;
        /**
         * @abstract
         * @param {?} date
         * @return {?}
         */
        DateHelperService.prototype.getISOWeek = function (date) { };
        /**
         * @abstract
         * @return {?}
         */
        DateHelperService.prototype.getFirstDayOfWeek = function () { };
        /**
         * @abstract
         * @param {?} date
         * @param {?} formatStr
         * @return {?}
         */
        DateHelperService.prototype.format = function (date, formatStr) { };
        /**
         * @abstract
         * @param {?} text
         * @param {?=} formatStr
         * @return {?}
         */
        DateHelperService.prototype.parseDate = function (text, formatStr) { };
        /**
         * @abstract
         * @param {?} text
         * @param {?=} formatStr
         * @return {?}
         */
        DateHelperService.prototype.parseTime = function (text, formatStr) { };
    }
    /**
     * DateHelper that handles date formats with date-fns
     */
    var DateHelperByDateFns = /** @class */ (function (_super) {
        __extends(DateHelperByDateFns, _super);
        function DateHelperByDateFns() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} date
         * @return {?}
         */
        DateHelperByDateFns.prototype.getISOWeek = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return fnsGetISOWeek(date);
        };
        // Use date-fns's "weekStartsOn" to support different locale when "config.firstDayOfWeek" is null
        // https://github.com/date-fns/date-fns/blob/v2.0.0-alpha.27/src/locale/en-US/index.js#L23
        // Use date-fns's "weekStartsOn" to support different locale when "config.firstDayOfWeek" is null
        // https://github.com/date-fns/date-fns/blob/v2.0.0-alpha.27/src/locale/en-US/index.js#L23
        /**
         * @return {?}
         */
        DateHelperByDateFns.prototype.getFirstDayOfWeek = 
        // Use date-fns's "weekStartsOn" to support different locale when "config.firstDayOfWeek" is null
        // https://github.com/date-fns/date-fns/blob/v2.0.0-alpha.27/src/locale/en-US/index.js#L23
        /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var defaultWeekStartsOn;
            try {
                defaultWeekStartsOn = (/** @type {?} */ ((/** @type {?} */ (this.i18n.getDateLocale().options)).weekStartsOn));
            }
            catch (e) {
                defaultWeekStartsOn = 1;
            }
            return this.config.firstDayOfWeek == null ? defaultWeekStartsOn : this.config.firstDayOfWeek;
        };
        /**
         * Format a date
         * @see https://date-fns.org/docs/format#description
         * @param date Date
         * @param formatStr format string
         */
        /**
         * Format a date
         * @see https://date-fns.org/docs/format#description
         * @param {?} date Date
         * @param {?} formatStr format string
         * @return {?}
         */
        DateHelperByDateFns.prototype.format = /**
         * Format a date
         * @see https://date-fns.org/docs/format#description
         * @param {?} date Date
         * @param {?} formatStr format string
         * @return {?}
         */
        function (date, formatStr) {
            /** @type {?} */
            var mergedStr = this.convertFormat ? convertTokens(formatStr) : formatStr;
            return date ? fnsFormat(date, mergedStr, { locale: this.i18n.getDateLocale() }) : '';
        };
        /**
         * @param {?} text
         * @param {?} formatStr
         * @return {?}
         */
        DateHelperByDateFns.prototype.parseDate = /**
         * @param {?} text
         * @param {?} formatStr
         * @return {?}
         */
        function (text, formatStr) {
            /** @type {?} */
            var mergedStr = this.convertFormat ? convertTokens(formatStr) : formatStr;
            return fnsParse(text, mergedStr, new Date(), {
                locale: this.i18n.getDateLocale(),
                weekStartsOn: this.getFirstDayOfWeek()
            });
        };
        /**
         * @param {?} text
         * @param {?} formatStr
         * @return {?}
         */
        DateHelperByDateFns.prototype.parseTime = /**
         * @param {?} text
         * @param {?} formatStr
         * @return {?}
         */
        function (text, formatStr) {
            return this.parseDate(text, formatStr);
        };
        /** @nocollapse */ DateHelperByDateFns.ɵprov = core.ɵɵdefineInjectable({ factory: function DateHelperByDateFns_Factory() { return DATE_HELPER_SERVICE_FACTORY(core.ɵɵinject(core.INJECTOR), core.ɵɵinject(NZ_DATE_CONFIG, 8), core.ɵɵinject(NZ_DATE_FNS_COMPATIBLE, 8)); }, token: DateHelperByDateFns, providedIn: "root" });
        return DateHelperByDateFns;
    }(DateHelperService));
    /**
     * DateHelper that handles date formats with angular's date-pipe
     *
     * @see https://github.com/NG-ZORRO/ng-zorro-antd/issues/2406 - DatePipe may cause non-standard week bug, see:
     *
     */
    var DateHelperByDatePipe = /** @class */ (function (_super) {
        __extends(DateHelperByDatePipe, _super);
        function DateHelperByDatePipe() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} date
         * @return {?}
         */
        DateHelperByDatePipe.prototype.getISOWeek = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return +this.format(date, 'w');
        };
        /**
         * @return {?}
         */
        DateHelperByDatePipe.prototype.getFirstDayOfWeek = /**
         * @return {?}
         */
        function () {
            if (this.config.firstDayOfWeek === undefined) {
                /** @type {?} */
                var locale = this.i18n.getLocaleId();
                return locale && ['zh-cn', 'zh-tw'].indexOf(locale.toLowerCase()) > -1 ? 1 : 0;
            }
            return this.config.firstDayOfWeek;
        };
        /**
         * @param {?} date
         * @param {?} formatStr
         * @return {?}
         */
        DateHelperByDatePipe.prototype.format = /**
         * @param {?} date
         * @param {?} formatStr
         * @return {?}
         */
        function (date, formatStr) {
            return date ? (/** @type {?} */ (common.formatDate(date, formatStr, this.i18n.getLocaleId()))) : '';
        };
        /**
         * @param {?} text
         * @return {?}
         */
        DateHelperByDatePipe.prototype.parseDate = /**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            return new Date(text);
        };
        /**
         * @param {?} text
         * @return {?}
         */
        DateHelperByDatePipe.prototype.parseTime = /**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            if (!text) {
                return;
            }
            return new Date(Date.parse("1970-01-01 " + text));
        };
        /** @nocollapse */ DateHelperByDatePipe.ɵprov = core.ɵɵdefineInjectable({ factory: function DateHelperByDatePipe_Factory() { return DATE_HELPER_SERVICE_FACTORY(core.ɵɵinject(core.INJECTOR), core.ɵɵinject(NZ_DATE_CONFIG, 8), core.ɵɵinject(NZ_DATE_FNS_COMPATIBLE, 8)); }, token: DateHelperByDatePipe, providedIn: "root" });
        return DateHelperByDatePipe;
    }(DateHelperService));

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/ar_EG.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var ar_EG = {
        locale: 'ar',
        Pagination: {
            items_per_page: '/ الصفحة',
            jump_to: 'الذهاب إلى',
            jump_to_confirm: 'تأكيد',
            page: '',
            prev_page: 'الصفحة السابقة',
            next_page: 'الصفحة التالية',
            prev_5: 'خمس صفحات سابقة',
            next_5: 'خمس صفحات تالية',
            prev_3: 'ثلاث صفحات سابقة',
            next_3: 'ثلاث صفحات تالية'
        },
        DatePicker: {
            lang: {
                placeholder: 'اختيار التاريخ',
                rangePlaceholder: ['البداية', 'النهاية'],
                locale: 'ar_EG',
                today: 'اليوم',
                now: 'الأن',
                backToToday: 'العودة إلى اليوم',
                ok: 'تأكيد',
                clear: 'مسح',
                month: 'الشهر',
                year: 'السنة',
                timeSelect: 'اختيار الوقت',
                dateSelect: 'اختيار التاريخ',
                monthSelect: 'اختيار الشهر',
                yearSelect: 'اختيار السنة',
                decadeSelect: 'اختيار العقد',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'الشهر السابق (PageUp)',
                nextMonth: 'الشهر التالى(PageDown)',
                previousYear: 'العام السابق (Control + left)',
                nextYear: 'العام التالى (Control + right)',
                previousDecade: 'العقد السابق',
                nextDecade: 'العقد التالى',
                previousCentury: 'القرن السابق',
                nextCentury: 'القرن التالى'
            },
            timePickerLocale: {
                placeholder: 'اختيار الوقت'
            },
            dateFormat: 'DD-MM-YYYY',
            monthFormat: 'MM-YYYY',
            dateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
            weekFormat: 'wo-YYYY'
        },
        TimePicker: {
            placeholder: 'اختيار الوقت'
        },
        Calendar: {
            lang: {
                placeholder: 'اختيار التاريخ',
                rangePlaceholder: ['البداية', 'النهاية'],
                locale: 'ar_EG',
                today: 'اليوم',
                now: 'الأن',
                backToToday: 'العودة إلى اليوم',
                ok: 'تأكيد',
                clear: 'مسح',
                month: 'الشهر',
                year: 'السنة',
                timeSelect: 'اختيار الوقت',
                dateSelect: 'اختيار التاريخ',
                monthSelect: 'اختيار الشهر',
                yearSelect: 'اختيار السنة',
                decadeSelect: 'اختيار العقد',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'الشهر السابق (PageUp)',
                nextMonth: 'الشهر التالى(PageDown)',
                previousYear: 'العام السابق (Control + left)',
                nextYear: 'العام التالى (Control + right)',
                previousDecade: 'العقد السابق',
                nextDecade: 'العقد التالى',
                previousCentury: 'القرن السابق',
                nextCentury: 'القرن التالى'
            },
            timePickerLocale: {
                placeholder: 'اختيار الوقت'
            },
            dateFormat: 'DD-MM-YYYY',
            monthFormat: 'MM-YYYY',
            dateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
            weekFormat: 'wo-YYYY'
        },
        Table: {
            filterTitle: 'الفلاتر',
            filterConfirm: 'تأكيد',
            filterReset: 'إعادة ضبط',
            selectAll: 'اختيار الكل',
            selectInvert: 'إلغاء الاختيار'
        },
        Modal: {
            okText: 'تأكيد',
            cancelText: 'إلغاء',
            justOkText: 'تأكيد'
        },
        Popconfirm: {
            okText: 'تأكيد',
            cancelText: 'إلغاء'
        },
        Transfer: {
            searchPlaceholder: 'ابحث هنا',
            itemUnit: 'عنصر',
            itemsUnit: 'عناصر'
        },
        Upload: {
            uploading: 'جاري الرفع...',
            removeFile: 'احذف الملف',
            uploadError: 'مشكلة فى الرفع',
            previewFile: 'استعرض الملف',
            downloadFile: 'تحميل الملف'
        },
        Empty: {
            description: 'لا توجد بيانات'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/bg_BG.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var bg_BG = {
        locale: 'bg',
        Pagination: {
            items_per_page: '/ страница',
            jump_to: 'Към',
            jump_to_confirm: 'потвърждавам',
            page: '',
            prev_page: 'Предишна страница',
            next_page: 'Следваща страница',
            prev_5: 'Предишни 5 страници',
            next_5: 'Следващи 5 страници',
            prev_3: 'Предишни 3 страници',
            next_3: 'Следващи 3 страници'
        },
        DatePicker: {
            lang: {
                placeholder: 'Избор на дата',
                rangePlaceholder: ['Начална', 'Крайна'],
                locale: 'bg_BG',
                today: 'Днес',
                now: 'Сега',
                backToToday: 'Към днес',
                ok: 'Добре',
                clear: 'Изчистване',
                month: 'Месец',
                year: 'Година',
                timeSelect: 'Избор на час',
                dateSelect: 'Избор на дата',
                monthSelect: 'Избор на месец',
                yearSelect: 'Избор на година',
                decadeSelect: 'Десетилетие',
                yearFormat: 'YYYY',
                dateFormat: 'D M YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D M YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Предишен месец (PageUp)',
                nextMonth: 'Следващ месец (PageDown)',
                previousYear: 'Последна година (Control + left)',
                nextYear: 'Следваща година (Control + right)',
                previousDecade: 'Предишно десетилетие',
                nextDecade: 'Следващо десетилетие',
                previousCentury: 'Последен век',
                nextCentury: 'Следващ век'
            },
            timePickerLocale: {
                placeholder: 'Избор на час'
            }
        },
        TimePicker: {
            placeholder: 'Избор на час'
        },
        Calendar: {
            lang: {
                placeholder: 'Избор на дата',
                rangePlaceholder: ['Начална', 'Крайна'],
                locale: 'bg_BG',
                today: 'Днес',
                now: 'Сега',
                backToToday: 'Към днес',
                ok: 'Добре',
                clear: 'Изчистване',
                month: 'Месец',
                year: 'Година',
                timeSelect: 'Избор на час',
                dateSelect: 'Избор на дата',
                monthSelect: 'Избор на месец',
                yearSelect: 'Избор на година',
                decadeSelect: 'Десетилетие',
                yearFormat: 'YYYY',
                dateFormat: 'D M YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D M YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Предишен месец (PageUp)',
                nextMonth: 'Следващ месец (PageDown)',
                previousYear: 'Последна година (Control + left)',
                nextYear: 'Следваща година (Control + right)',
                previousDecade: 'Предишно десетилетие',
                nextDecade: 'Следващо десетилетие',
                previousCentury: 'Последен век',
                nextCentury: 'Следващ век'
            },
            timePickerLocale: {
                placeholder: 'Избор на час'
            }
        },
        Table: {
            filterTitle: 'Филтриране',
            filterConfirm: 'Добре',
            filterReset: 'Нулриане',
            selectAll: 'Избор на текуща страница',
            selectInvert: 'Обръщане'
        },
        Modal: {
            okText: 'Добре',
            cancelText: 'Отказ',
            justOkText: 'Добре'
        },
        Popconfirm: {
            okText: 'Добре',
            cancelText: 'Отказ'
        },
        Transfer: {
            searchPlaceholder: 'Търсене',
            itemUnit: 'избор',
            itemsUnit: 'избори'
        },
        Upload: {
            uploading: 'Качване...',
            removeFile: 'Премахване',
            uploadError: 'Грешка при качването',
            previewFile: 'Преглед',
            downloadFile: 'Свали файл'
        },
        Empty: {
            description: 'Няма данни'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/ca_ES.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var ca_ES = {
        locale: 'ca',
        Pagination: {
            items_per_page: '/ pàgina',
            jump_to: 'Anar a',
            jump_to_confirm: 'Confirma',
            page: '',
            prev_page: 'Pàgina prèvia',
            next_page: 'Pàgina següent',
            prev_5: '5 pàgines prèvies',
            next_5: '5 pàgines següents',
            prev_3: '3 pàgines prèvies',
            next_3: '3 pàgines següents'
        },
        DatePicker: {
            lang: {
                placeholder: 'Seleccionar data',
                rangePlaceholder: ['Data inicial', 'Data final'],
                locale: 'ca_ES',
                today: 'Avui',
                now: 'Ara',
                backToToday: 'Tornar a avui',
                ok: 'Acceptar',
                clear: 'Netejar',
                month: 'Mes',
                year: 'Any',
                timeSelect: 'Seleccionar hora',
                dateSelect: 'Seleccionar data',
                monthSelect: 'Escollir un mes',
                yearSelect: 'Escollir un any',
                decadeSelect: 'Escollir una dècada',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Mes anterior (PageUp)',
                nextMonth: 'Mes següent (PageDown)',
                previousYear: 'Any anterior (Control + left)',
                nextYear: 'Mes següent (Control + right)',
                previousDecade: 'Dècada anterior',
                nextDecade: 'Dècada següent',
                previousCentury: 'Segle anterior',
                nextCentury: 'Segle següent'
            },
            timePickerLocale: {
                placeholder: 'Seleccionar hora'
            }
        },
        TimePicker: {
            placeholder: 'Seleccionar hora'
        },
        Calendar: {
            lang: {
                placeholder: 'Seleccionar data',
                rangePlaceholder: ['Data inicial', 'Data final'],
                locale: 'ca_ES',
                today: 'Avui',
                now: 'Ara',
                backToToday: 'Tornar a avui',
                ok: 'Acceptar',
                clear: 'Netejar',
                month: 'Mes',
                year: 'Any',
                timeSelect: 'Seleccionar hora',
                dateSelect: 'Seleccionar data',
                monthSelect: 'Escollir un mes',
                yearSelect: 'Escollir un any',
                decadeSelect: 'Escollir una dècada',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Mes anterior (PageUp)',
                nextMonth: 'Mes següent (PageDown)',
                previousYear: 'Any anterior (Control + left)',
                nextYear: 'Mes següent (Control + right)',
                previousDecade: 'Dècada anterior',
                nextDecade: 'Dècada següent',
                previousCentury: 'Segle anterior',
                nextCentury: 'Segle següent'
            },
            timePickerLocale: {
                placeholder: 'Seleccionar hora'
            }
        },
        Table: {
            filterTitle: 'Filtrar Menu',
            filterConfirm: 'OK',
            filterReset: 'Restablir'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Cancel·lar',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Cancel·lar'
        },
        Transfer: {
            searchPlaceholder: 'Cercar aquí',
            itemUnit: 'item',
            itemsUnit: 'items'
        },
        Upload: {
            uploading: 'Carregant...',
            removeFile: 'Elimina el fitxer',
            uploadError: 'Error de càrrega',
            previewFile: 'Vista prèvia del fitxer',
            downloadFile: "Descarrega l'arxiu"
        },
        Empty: {
            description: 'Sense dades'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/cs_CZ.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var cs_CZ = {
        locale: 'cs',
        Pagination: {
            items_per_page: '/ strana',
            jump_to: 'Přejít',
            jump_to_confirm: 'potvrdit',
            page: '',
            prev_page: 'Předchozí strana',
            next_page: 'Následující strana',
            prev_5: 'Předchozích 5 stran',
            next_5: 'Následujících 5 stran',
            prev_3: 'Předchozí 3 strany',
            next_3: 'Následující 3 strany'
        },
        DatePicker: {
            lang: {
                placeholder: 'Vybrat datum',
                rangePlaceholder: ['Od', 'Do'],
                locale: 'cs_CZ',
                today: 'Dnes',
                now: 'Nyní',
                backToToday: 'Zpět na dnešek',
                ok: 'Ok',
                clear: 'Vymazat',
                month: 'Měsíc',
                year: 'Rok',
                timeSelect: 'Vybrat čas',
                dateSelect: 'Vybrat datum',
                monthSelect: 'Vyberte měsíc',
                yearSelect: 'Vyberte rok',
                decadeSelect: 'Vyberte dekádu',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Předchozí měsíc (PageUp)',
                nextMonth: 'Následující (PageDown)',
                previousYear: 'Předchozí rok (Control + left)',
                nextYear: 'Následující rok (Control + right)',
                previousDecade: 'Předchozí dekáda',
                nextDecade: 'Následující dekáda',
                previousCentury: 'Předchozí století',
                nextCentury: 'Následující století'
            },
            timePickerLocale: {
                placeholder: 'Vybrat čas'
            }
        },
        TimePicker: {
            placeholder: 'Vybrat čas'
        },
        Calendar: {
            lang: {
                placeholder: 'Vybrat datum',
                rangePlaceholder: ['Od', 'Do'],
                locale: 'cs_CZ',
                today: 'Dnes',
                now: 'Nyní',
                backToToday: 'Zpět na dnešek',
                ok: 'Ok',
                clear: 'Vymazat',
                month: 'Měsíc',
                year: 'Rok',
                timeSelect: 'Vybrat čas',
                dateSelect: 'Vybrat datum',
                monthSelect: 'Vyberte měsíc',
                yearSelect: 'Vyberte rok',
                decadeSelect: 'Vyberte dekádu',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Předchozí měsíc (PageUp)',
                nextMonth: 'Následující (PageDown)',
                previousYear: 'Předchozí rok (Control + left)',
                nextYear: 'Následující rok (Control + right)',
                previousDecade: 'Předchozí dekáda',
                nextDecade: 'Následující dekáda',
                previousCentury: 'Předchozí století',
                nextCentury: 'Následující století'
            },
            timePickerLocale: {
                placeholder: 'Vybrat čas'
            }
        },
        Table: {
            filterTitle: 'Filtr',
            filterConfirm: 'Potvrdit',
            filterReset: 'Obnovit'
        },
        Modal: {
            okText: 'Ok',
            cancelText: 'Storno',
            justOkText: 'Ok'
        },
        Popconfirm: {
            okText: 'Ok',
            cancelText: 'Storno'
        },
        Transfer: {
            searchPlaceholder: 'Vyhledávání',
            itemUnit: 'položka',
            itemsUnit: 'položek'
        },
        Upload: {
            uploading: 'Nahrávání...',
            removeFile: 'Odstranit soubor',
            uploadError: 'Chyba při nahrávání',
            previewFile: 'Zobrazit soubor',
            downloadFile: 'Stáhnout soubor'
        },
        Empty: {
            description: 'Žádná data'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/da_DK.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var da_DK = {
        locale: 'da',
        DatePicker: {
            lang: {
                placeholder: 'Vælg dato',
                rangePlaceholder: ['Startdato', 'Slutdato'],
                locale: 'da_DK',
                today: 'I dag',
                now: 'Nu',
                backToToday: 'Gå til i dag',
                ok: 'Ok',
                clear: 'Ryd',
                month: 'Måned',
                year: 'År',
                timeSelect: 'Vælg tidspunkt',
                dateSelect: 'Vælg dato',
                monthSelect: 'Vælg måned',
                yearSelect: 'Vælg år',
                decadeSelect: 'Vælg årti',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Forrige måned (Page Up)',
                nextMonth: 'Næste måned (Page Down)',
                previousYear: 'Forrige år (Ctrl-venstre pil)',
                nextYear: 'Næste år (Ctrl-højre pil)',
                previousDecade: 'Forrige årti',
                nextDecade: 'Næste årti',
                previousCentury: 'Forrige århundrede',
                nextCentury: 'Næste århundrede'
            },
            timePickerLocale: {
                placeholder: 'Vælg tid'
            }
        },
        TimePicker: {
            placeholder: 'Vælg tid'
        },
        Calendar: {
            lang: {
                placeholder: 'Vælg dato',
                rangePlaceholder: ['Startdato', 'Slutdato'],
                locale: 'da_DK',
                today: 'I dag',
                now: 'Nu',
                backToToday: 'Gå til i dag',
                ok: 'Ok',
                clear: 'Ryd',
                month: 'Måned',
                year: 'År',
                timeSelect: 'Vælg tidspunkt',
                dateSelect: 'Vælg dato',
                monthSelect: 'Vælg måned',
                yearSelect: 'Vælg år',
                decadeSelect: 'Vælg årti',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Forrige måned (Page Up)',
                nextMonth: 'Næste måned (Page Down)',
                previousYear: 'Forrige år (Ctrl-venstre pil)',
                nextYear: 'Næste år (Ctrl-højre pil)',
                previousDecade: 'Forrige årti',
                nextDecade: 'Næste årti',
                previousCentury: 'Forrige århundrede',
                nextCentury: 'Næste århundrede'
            },
            timePickerLocale: {
                placeholder: 'Vælg tid'
            }
        },
        Pagination: {
            items_per_page: '/ side',
            jump_to: 'Gå til',
            jump_to_confirm: 'bekræft',
            page: '',
            prev_page: 'Forrige Side',
            next_page: 'Næste Side',
            prev_5: 'Forrige 5 Sider',
            next_5: 'Næste 5 Sider',
            prev_3: 'Forrige 3 Sider',
            next_3: 'Næste 3 Sider'
        },
        Table: {
            filterTitle: 'Filtermenu',
            filterConfirm: 'OK',
            filterReset: 'Nulstil',
            selectAll: 'Vælg alle',
            selectInvert: 'Inverter valg'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Afbryd',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Afbryd'
        },
        Transfer: {
            searchPlaceholder: 'Søg her',
            itemUnit: 'element',
            itemsUnit: 'elementer'
        },
        Upload: {
            uploading: 'Uploader...',
            removeFile: 'Fjern fil',
            uploadError: 'Fejl ved upload',
            previewFile: 'Forhåndsvisning',
            downloadFile: 'Download fil'
        },
        Empty: {
            description: 'Ingen data'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/de_DE.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var de_DE = {
        locale: 'de',
        Pagination: {
            items_per_page: '/ Seite',
            jump_to: 'Gehe zu',
            jump_to_confirm: 'bestätigen',
            page: '',
            prev_page: 'Vorherige Seite',
            next_page: 'Nächste Seite',
            prev_5: '5 Seiten zurück',
            next_5: '5 Seiten vor',
            prev_3: '3 Seiten zurück',
            next_3: '3 Seiten vor'
        },
        DatePicker: {
            lang: {
                placeholder: 'Datum auswählen',
                rangePlaceholder: ['Startdatum', 'Enddatum'],
                locale: 'de_DE',
                today: 'Heute',
                now: 'Jetzt',
                backToToday: 'Zurück zu Heute',
                ok: 'OK',
                clear: 'Zurücksetzen',
                month: 'Monat',
                year: 'Jahr',
                timeSelect: 'Zeit wählen',
                dateSelect: 'Datum wählen',
                monthSelect: 'Wähle einen Monat',
                yearSelect: 'Wähle ein Jahr',
                decadeSelect: 'Wähle ein Jahrzehnt',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Vorheriger Monat (PageUp)',
                nextMonth: 'Nächster Monat (PageDown)',
                previousYear: 'Vorheriges Jahr (Ctrl + left)',
                nextYear: 'Nächstes Jahr (Ctrl + right)',
                previousDecade: 'Vorheriges Jahrzehnt',
                nextDecade: 'Nächstes Jahrzehnt',
                previousCentury: 'Vorheriges Jahrhundert',
                nextCentury: 'Nächstes Jahrhundert'
            },
            timePickerLocale: {
                placeholder: 'Zeit auswählen'
            }
        },
        TimePicker: {
            placeholder: 'Zeit auswählen'
        },
        Calendar: {
            lang: {
                placeholder: 'Datum auswählen',
                rangePlaceholder: ['Startdatum', 'Enddatum'],
                locale: 'de_DE',
                today: 'Heute',
                now: 'Jetzt',
                backToToday: 'Zurück zu Heute',
                ok: 'OK',
                clear: 'Zurücksetzen',
                month: 'Monat',
                year: 'Jahr',
                timeSelect: 'Zeit wählen',
                dateSelect: 'Datum wählen',
                monthSelect: 'Wähle einen Monat',
                yearSelect: 'Wähle ein Jahr',
                decadeSelect: 'Wähle ein Jahrzehnt',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Vorheriger Monat (PageUp)',
                nextMonth: 'Nächster Monat (PageDown)',
                previousYear: 'Vorheriges Jahr (Ctrl + left)',
                nextYear: 'Nächstes Jahr (Ctrl + right)',
                previousDecade: 'Vorheriges Jahrzehnt',
                nextDecade: 'Nächstes Jahrzehnt',
                previousCentury: 'Vorheriges Jahrhundert',
                nextCentury: 'Nächstes Jahrhundert'
            },
            timePickerLocale: {
                placeholder: 'Zeit auswählen'
            }
        },
        global: {
            placeholder: 'Bitte auswählen'
        },
        Table: {
            filterTitle: 'Filter-Menü',
            filterConfirm: 'OK',
            filterReset: 'Zurücksetzen',
            selectAll: 'Selektiere Alle',
            selectInvert: 'Selektion Invertieren',
            selectionAll: 'Wählen Sie alle Daten aus',
            sortTitle: 'Sortieren',
            expand: 'Zeile erweitern',
            collapse: 'Zeile reduzieren'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Abbrechen',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Abbrechen'
        },
        Transfer: {
            searchPlaceholder: 'Suchen',
            itemUnit: 'Eintrag',
            itemsUnit: 'Einträge'
        },
        Upload: {
            uploading: 'Hochladen...',
            removeFile: 'Datei entfernen',
            uploadError: 'Fehler beim Hochladen',
            previewFile: 'Dateivorschau',
            downloadFile: 'Download-Datei'
        },
        Empty: {
            description: 'Keine Daten'
        },
        Text: {
            edit: 'Bearbeiten',
            copy: 'Kopieren',
            copied: 'Kopiert',
            expand: 'Erweitern'
        },
        PageHeader: {
            back: 'Zurück'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/el_GR.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var el_GR = {
        locale: 'el',
        Pagination: {
            items_per_page: '/ σελίδα',
            jump_to: 'Μετάβαση',
            jump_to_confirm: 'επιβεβαιώνω',
            page: '',
            prev_page: 'Προηγούμενη Σελίδα',
            next_page: 'Επόμενη Σελίδα',
            prev_5: 'Προηγούμενες 5 Σελίδες',
            next_5: 'Επόμενες 5 σελίδες',
            prev_3: 'Προηγούμενες 3 Σελίδες',
            next_3: 'Επόμενες 3 Σελίδες'
        },
        DatePicker: {
            lang: {
                placeholder: 'Επιλέξτε ημερομηνία',
                rangePlaceholder: ['Αρχική ημερομηνία', 'Τελική ημερομηνία'],
                locale: 'el_GR',
                today: 'Σήμερα',
                now: 'Τώρα',
                backToToday: 'Πίσω στη σημερινή μέρα',
                ok: 'Ok',
                clear: 'Καθαρισμός',
                month: 'Μήνας',
                year: 'Έτος',
                timeSelect: 'Επιλογή ώρας',
                dateSelect: 'Επιλογή ημερομηνίας',
                monthSelect: 'Επιλογή μήνα',
                yearSelect: 'Επιλογή έτους',
                decadeSelect: 'Επιλογή δεκαετίας',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Προηγούμενος μήνας (PageUp)',
                nextMonth: 'Επόμενος μήνας (PageDown)',
                previousYear: 'Προηγούμενο έτος (Control + αριστερά)',
                nextYear: 'Επόμενο έτος (Control + δεξιά)',
                previousDecade: 'Προηγούμενη δεκαετία',
                nextDecade: 'Επόμενη δεκαετία',
                previousCentury: 'Προηγούμενος αιώνας',
                nextCentury: 'Επόμενος αιώνας'
            },
            timePickerLocale: {
                placeholder: 'Επιλέξτε ώρα'
            }
        },
        TimePicker: {
            placeholder: 'Επιλέξτε ώρα'
        },
        Calendar: {
            lang: {
                placeholder: 'Επιλέξτε ημερομηνία',
                rangePlaceholder: ['Αρχική ημερομηνία', 'Τελική ημερομηνία'],
                locale: 'el_GR',
                today: 'Σήμερα',
                now: 'Τώρα',
                backToToday: 'Πίσω στη σημερινή μέρα',
                ok: 'Ok',
                clear: 'Καθαρισμός',
                month: 'Μήνας',
                year: 'Έτος',
                timeSelect: 'Επιλογή ώρας',
                dateSelect: 'Επιλογή ημερομηνίας',
                monthSelect: 'Επιλογή μήνα',
                yearSelect: 'Επιλογή έτους',
                decadeSelect: 'Επιλογή δεκαετίας',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Προηγούμενος μήνας (PageUp)',
                nextMonth: 'Επόμενος μήνας (PageDown)',
                previousYear: 'Προηγούμενο έτος (Control + αριστερά)',
                nextYear: 'Επόμενο έτος (Control + δεξιά)',
                previousDecade: 'Προηγούμενη δεκαετία',
                nextDecade: 'Επόμενη δεκαετία',
                previousCentury: 'Προηγούμενος αιώνας',
                nextCentury: 'Επόμενος αιώνας'
            },
            timePickerLocale: {
                placeholder: 'Επιλέξτε ώρα'
            }
        },
        Table: {
            filterTitle: 'Μενού φίλτρων',
            filterConfirm: 'ΟΚ',
            filterReset: 'Επαναφορά',
            selectAll: 'Επιλογή τρέχουσας σελίδας',
            selectInvert: 'Αντιστροφή τρέχουσας σελίδας'
        },
        Modal: {
            okText: 'ΟΚ',
            cancelText: 'Άκυρο',
            justOkText: 'ΟΚ'
        },
        Popconfirm: {
            okText: 'ΟΚ',
            cancelText: 'Άκυρο'
        },
        Transfer: {
            searchPlaceholder: 'Αναζήτηση',
            itemUnit: 'αντικείμενο',
            itemsUnit: 'αντικείμενα'
        },
        Upload: {
            uploading: 'Μεταφόρτωση...',
            removeFile: 'Αφαίρεση αρχείου',
            uploadError: 'Σφάλμα μεταφόρτωσης',
            previewFile: 'Προεπισκόπηση αρχείου',
            downloadFile: 'Λήψη αρχείου'
        },
        Empty: {
            description: 'Δεν υπάρχουν δεδομένα'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/en_GB.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var en_GB = {
        locale: 'en-gb',
        Pagination: {
            items_per_page: '/ page',
            jump_to: 'Go to',
            jump_to_confirm: 'confirm',
            page: '',
            prev_page: 'Previous Page',
            next_page: 'Next Page',
            prev_5: 'Previous 5 Pages',
            next_5: 'Next 5 Pages',
            prev_3: 'Previous 3 Pages',
            next_3: 'Next 3 Pages'
        },
        DatePicker: {
            lang: {
                placeholder: 'Select date',
                rangePlaceholder: ['Start date', 'End date'],
                locale: 'en_GB',
                today: 'Today',
                now: 'Now',
                backToToday: 'Back to today',
                ok: 'Ok',
                clear: 'Clear',
                month: 'Month',
                year: 'Year',
                timeSelect: 'Select time',
                dateSelect: 'Select date',
                monthSelect: 'Choose a month',
                yearSelect: 'Choose a year',
                decadeSelect: 'Choose a decade',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Previous month (PageUp)',
                nextMonth: 'Next month (PageDown)',
                previousYear: 'Last year (Control + left)',
                nextYear: 'Next year (Control + right)',
                previousDecade: 'Last decade',
                nextDecade: 'Next decade',
                previousCentury: 'Last century',
                nextCentury: 'Next century'
            },
            timePickerLocale: {
                placeholder: 'Select time'
            }
        },
        TimePicker: {
            placeholder: 'Select time'
        },
        Calendar: {
            lang: {
                placeholder: 'Select date',
                rangePlaceholder: ['Start date', 'End date'],
                locale: 'en_GB',
                today: 'Today',
                now: 'Now',
                backToToday: 'Back to today',
                ok: 'Ok',
                clear: 'Clear',
                month: 'Month',
                year: 'Year',
                timeSelect: 'Select time',
                dateSelect: 'Select date',
                monthSelect: 'Choose a month',
                yearSelect: 'Choose a year',
                decadeSelect: 'Choose a decade',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Previous month (PageUp)',
                nextMonth: 'Next month (PageDown)',
                previousYear: 'Last year (Control + left)',
                nextYear: 'Next year (Control + right)',
                previousDecade: 'Last decade',
                nextDecade: 'Next decade',
                previousCentury: 'Last century',
                nextCentury: 'Next century'
            },
            timePickerLocale: {
                placeholder: 'Select time'
            }
        },
        Table: {
            filterTitle: 'Filter menu',
            filterConfirm: 'OK',
            filterReset: 'Reset',
            selectAll: 'Select current page',
            selectInvert: 'Invert current page'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Cancel',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Cancel'
        },
        Transfer: {
            searchPlaceholder: 'Search here',
            itemUnit: 'item',
            itemsUnit: 'items'
        },
        Upload: {
            uploading: 'Uploading...',
            removeFile: 'Remove file',
            uploadError: 'Upload error',
            previewFile: 'Preview file',
            downloadFile: 'Download file'
        },
        Empty: {
            description: 'No data'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/en_US.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var en_US = {
        locale: 'en',
        Pagination: {
            items_per_page: '/ page',
            jump_to: 'Go to',
            jump_to_confirm: 'confirm',
            page: '',
            prev_page: 'Previous Page',
            next_page: 'Next Page',
            prev_5: 'Previous 5 Pages',
            next_5: 'Next 5 Pages',
            prev_3: 'Previous 3 Pages',
            next_3: 'Next 3 Pages'
        },
        DatePicker: {
            lang: {
                placeholder: 'Select date',
                yearPlaceholder: 'Select year',
                quarterPlaceholder: 'Select quarter',
                monthPlaceholder: 'Select month',
                weekPlaceholder: 'Select week',
                rangePlaceholder: ['Start date', 'End date'],
                rangeYearPlaceholder: ['Start year', 'End year'],
                rangeMonthPlaceholder: ['Start month', 'End month'],
                rangeWeekPlaceholder: ['Start week', 'End week'],
                locale: 'en_US',
                today: 'Today',
                now: 'Now',
                backToToday: 'Back to today',
                ok: 'Ok',
                clear: 'Clear',
                month: 'Month',
                year: 'Year',
                timeSelect: 'select time',
                dateSelect: 'select date',
                weekSelect: 'Choose a week',
                monthSelect: 'Choose a month',
                yearSelect: 'Choose a year',
                decadeSelect: 'Choose a decade',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Previous month (PageUp)',
                nextMonth: 'Next month (PageDown)',
                previousYear: 'Last year (Control + left)',
                nextYear: 'Next year (Control + right)',
                previousDecade: 'Last decade',
                nextDecade: 'Next decade',
                previousCentury: 'Last century',
                nextCentury: 'Next century'
            },
            timePickerLocale: {
                placeholder: 'Select time',
                rangePlaceholder: ['Start time', 'End time']
            }
        },
        TimePicker: {
            placeholder: 'Select time',
            rangePlaceholder: ['Start time', 'End time']
        },
        Calendar: {
            lang: {
                placeholder: 'Select date',
                yearPlaceholder: 'Select year',
                quarterPlaceholder: 'Select quarter',
                monthPlaceholder: 'Select month',
                weekPlaceholder: 'Select week',
                rangePlaceholder: ['Start date', 'End date'],
                rangeYearPlaceholder: ['Start year', 'End year'],
                rangeMonthPlaceholder: ['Start month', 'End month'],
                rangeWeekPlaceholder: ['Start week', 'End week'],
                locale: 'en_US',
                today: 'Today',
                now: 'Now',
                backToToday: 'Back to today',
                ok: 'Ok',
                clear: 'Clear',
                month: 'Month',
                year: 'Year',
                timeSelect: 'select time',
                dateSelect: 'select date',
                weekSelect: 'Choose a week',
                monthSelect: 'Choose a month',
                yearSelect: 'Choose a year',
                decadeSelect: 'Choose a decade',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Previous month (PageUp)',
                nextMonth: 'Next month (PageDown)',
                previousYear: 'Last year (Control + left)',
                nextYear: 'Next year (Control + right)',
                previousDecade: 'Last decade',
                nextDecade: 'Next decade',
                previousCentury: 'Last century',
                nextCentury: 'Next century'
            },
            timePickerLocale: {
                placeholder: 'Select time',
                rangePlaceholder: ['Start time', 'End time']
            }
        },
        global: {
            placeholder: 'Please select'
        },
        Table: {
            filterTitle: 'Filter menu',
            filterConfirm: 'OK',
            filterReset: 'Reset',
            selectAll: 'Select current page',
            selectInvert: 'Invert current page',
            selectionAll: 'Select all data',
            sortTitle: 'Sort',
            expand: 'Expand row',
            collapse: 'Collapse row',
            triggerDesc: 'Click sort by descend',
            triggerAsc: 'Click sort by ascend',
            cancelSort: 'Click to cancel sort'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Cancel',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Cancel'
        },
        Transfer: {
            titles: ['', ''],
            searchPlaceholder: 'Search here',
            itemUnit: 'item',
            itemsUnit: 'items'
        },
        Upload: {
            uploading: 'Uploading...',
            removeFile: 'Remove file',
            uploadError: 'Upload error',
            previewFile: 'Preview file',
            downloadFile: 'Download file'
        },
        Empty: {
            description: 'No Data'
        },
        Icon: {
            icon: 'icon'
        },
        Text: {
            edit: 'Edit',
            copy: 'Copy',
            copied: 'Copied',
            expand: 'Expand'
        },
        PageHeader: {
            back: 'Back'
        },
        Form: {
            defaultValidateMessages: {
                default: 'Field validation error ${label}',
                required: 'Please enter ${label}',
                enum: '${label} must be one of [${enum}]',
                whitespace: '${label} cannot be a blank character',
                date: {
                    format: '${label} date format is invalid',
                    parse: '${label} cannot be converted to a date',
                    invalid: '${label} is an invalid date'
                },
                types: {
                    string: '${label} is not a valid ${type}',
                    method: '${label} is not a valid ${type}',
                    array: '${label} is not a valid ${type}',
                    object: '${label} is not a valid ${type}',
                    number: '${label} is not a valid ${type}',
                    date: '${label} is not a valid ${type}',
                    boolean: '${label} is not a valid ${type}',
                    integer: '${label} is not a valid ${type}',
                    float: '${label} is not a valid ${type}',
                    regexp: '${label} is not a valid ${type}',
                    email: '${label} is not a valid ${type}',
                    url: '${label} is not a valid ${type}',
                    hex: '${label} is not a valid ${type}'
                },
                string: {
                    len: '${label} must be ${len} characters',
                    min: '${label} at least ${min} characters',
                    max: '${label} up to ${max} characters',
                    range: '${label} must be between ${min}-${max} characters'
                },
                number: {
                    len: '${label} must be equal to ${len}',
                    min: '${label} minimum value is ${min}',
                    max: '${label} maximum value is ${max}',
                    range: '${label} must be between ${min}-${max}'
                },
                array: {
                    len: 'Must be ${len} ${label}',
                    min: 'At least ${min} ${label}',
                    max: 'At most ${max} ${label}',
                    range: 'The amount of ${label} must be between ${min}-${max}'
                },
                pattern: {
                    mismatch: '${label} does not match the pattern ${pattern}'
                }
            }
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/es_ES.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var es_ES = {
        locale: 'es',
        Pagination: {
            items_per_page: '/ página',
            jump_to: 'Ir a',
            jump_to_confirm: 'confirmar',
            page: '',
            prev_page: 'Página anterior',
            next_page: 'Página siguiente',
            prev_5: '5 páginas previas',
            next_5: '5 páginas siguientes',
            prev_3: '3 páginas previas',
            next_3: '3 páginas siguientes'
        },
        DatePicker: {
            lang: {
                placeholder: 'Seleccionar fecha',
                rangePlaceholder: ['Fecha inicial', 'Fecha final'],
                locale: 'es_ES',
                today: 'Hoy',
                now: 'Ahora',
                backToToday: 'Volver a hoy',
                ok: 'Aceptar',
                clear: 'Limpiar',
                month: 'Mes',
                year: 'Año',
                timeSelect: 'Seleccionar hora',
                dateSelect: 'Seleccionar fecha',
                monthSelect: 'Elegir un mes',
                yearSelect: 'Elegir un año',
                decadeSelect: 'Elegir una década',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Mes anterior (PageUp)',
                nextMonth: 'Mes siguiente (PageDown)',
                previousYear: 'Año anterior (Control + left)',
                nextYear: 'Año siguiente (Control + right)',
                previousDecade: 'Década anterior',
                nextDecade: 'Década siguiente',
                previousCentury: 'Siglo anterior',
                nextCentury: 'Siglo siguiente'
            },
            timePickerLocale: {
                placeholder: 'Seleccionar hora'
            }
        },
        TimePicker: {
            placeholder: 'Seleccionar hora'
        },
        Calendar: {
            lang: {
                placeholder: 'Seleccionar fecha',
                rangePlaceholder: ['Fecha inicial', 'Fecha final'],
                locale: 'es_ES',
                today: 'Hoy',
                now: 'Ahora',
                backToToday: 'Volver a hoy',
                ok: 'Aceptar',
                clear: 'Limpiar',
                month: 'Mes',
                year: 'Año',
                timeSelect: 'Seleccionar hora',
                dateSelect: 'Seleccionar fecha',
                monthSelect: 'Elegir un mes',
                yearSelect: 'Elegir un año',
                decadeSelect: 'Elegir una década',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Mes anterior (PageUp)',
                nextMonth: 'Mes siguiente (PageDown)',
                previousYear: 'Año anterior (Control + left)',
                nextYear: 'Año siguiente (Control + right)',
                previousDecade: 'Década anterior',
                nextDecade: 'Década siguiente',
                previousCentury: 'Siglo anterior',
                nextCentury: 'Siglo siguiente'
            },
            timePickerLocale: {
                placeholder: 'Seleccionar hora'
            }
        },
        global: {
            placeholder: 'Seleccione'
        },
        Table: {
            filterTitle: 'Filtrar menú',
            filterConfirm: 'Aceptar',
            filterReset: 'Reiniciar',
            selectAll: 'Seleccionar todo',
            selectInvert: 'Invertir selección',
            sortTitle: 'Ordenar'
        },
        Modal: {
            okText: 'Aceptar',
            cancelText: 'Cancelar',
            justOkText: 'Aceptar'
        },
        Popconfirm: {
            okText: 'Aceptar',
            cancelText: 'Cancelar'
        },
        Transfer: {
            searchPlaceholder: 'Buscar aquí',
            itemUnit: 'elemento',
            itemsUnit: 'elementos'
        },
        Upload: {
            uploading: 'Subiendo...',
            removeFile: 'Eliminar archivo',
            uploadError: 'Error al subir el archivo',
            previewFile: 'Vista previa',
            downloadFile: 'Descargar archivo'
        },
        Empty: {
            description: 'No hay datos'
        },
        Icon: {
            icon: 'ícono'
        },
        Text: {
            edit: 'editar',
            copy: 'copiar',
            copied: 'copiado',
            expand: 'expandir'
        },
        PageHeader: {
            back: 'volver'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/et_EE.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var et_EE = {
        locale: 'et',
        Pagination: {
            items_per_page: '/ leheküljel',
            jump_to: 'Hüppa',
            jump_to_confirm: 'Kinnitage',
            page: '',
            prev_page: 'Eelmine leht',
            next_page: 'Järgmine leht',
            prev_5: 'Eelmised 5 lehekülge',
            next_5: 'Järgmised 5 lehekülge',
            prev_3: 'Eelmised 3 lehekülge',
            next_3: 'Järgmised 3 lehekülge'
        },
        DatePicker: {
            lang: {
                placeholder: 'Vali kuupäev',
                rangePlaceholder: ['Algus kuupäev', 'Lõpu kuupäev'],
                locale: 'et_EE',
                today: 'Täna',
                now: 'Praegu',
                backToToday: 'Tagasi tänase juurde',
                ok: 'Ok',
                clear: 'Tühista',
                month: 'Kuu',
                year: 'Aasta',
                timeSelect: 'Vali aeg',
                dateSelect: 'Vali kuupäev',
                monthSelect: 'Vali kuu',
                yearSelect: 'Vali aasta',
                decadeSelect: 'Vali dekaad',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Eelmine kuu (PageUp)',
                nextMonth: 'Järgmine kuu (PageDown)',
                previousYear: 'Eelmine aasta (Control + left)',
                nextYear: 'Järgmine aasta (Control + right)',
                previousDecade: 'Eelmine dekaad',
                nextDecade: 'Järgmine dekaad',
                previousCentury: 'Eelmine sajand',
                nextCentury: 'Järgmine sajand'
            },
            timePickerLocale: {
                placeholder: 'Vali aeg'
            }
        },
        TimePicker: {
            placeholder: 'Vali aeg'
        },
        Calendar: {
            lang: {
                placeholder: 'Vali kuupäev',
                rangePlaceholder: ['Algus kuupäev', 'Lõpu kuupäev'],
                locale: 'et_EE',
                today: 'Täna',
                now: 'Praegu',
                backToToday: 'Tagasi tänase juurde',
                ok: 'Ok',
                clear: 'Tühista',
                month: 'Kuu',
                year: 'Aasta',
                timeSelect: 'Vali aeg',
                dateSelect: 'Vali kuupäev',
                monthSelect: 'Vali kuu',
                yearSelect: 'Vali aasta',
                decadeSelect: 'Vali dekaad',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Eelmine kuu (PageUp)',
                nextMonth: 'Järgmine kuu (PageDown)',
                previousYear: 'Eelmine aasta (Control + left)',
                nextYear: 'Järgmine aasta (Control + right)',
                previousDecade: 'Eelmine dekaad',
                nextDecade: 'Järgmine dekaad',
                previousCentury: 'Eelmine sajand',
                nextCentury: 'Järgmine sajand'
            },
            timePickerLocale: {
                placeholder: 'Vali aeg'
            }
        },
        Table: {
            filterTitle: 'Filtri menüü',
            filterConfirm: 'OK',
            filterReset: 'Nulli',
            selectAll: 'Vali kõik',
            selectInvert: 'Inverteeri valik'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Tühista',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Tühista'
        },
        Transfer: {
            searchPlaceholder: 'Otsi siit',
            itemUnit: 'kogus',
            itemsUnit: 'kogus'
        },
        Upload: {
            uploading: 'Üleslaadimine...',
            removeFile: 'Eemalda fail',
            uploadError: 'Üleslaadimise tõrge',
            previewFile: 'Faili eelvaade',
            downloadFile: 'Laadige fail alla'
        },
        Empty: {
            description: 'Andmed puuduvad'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/fa_IR.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var fa_IR = {
        locale: 'fa',
        Pagination: {
            items_per_page: '/ صفحه',
            jump_to: 'برو به',
            jump_to_confirm: 'تایید',
            page: '',
            prev_page: 'صفحه قبلی',
            next_page: 'صفحه بعدی',
            prev_5: '۵ صفحه قبلی',
            next_5: '۵ صفحه بعدی',
            prev_3: '۳ صفحه قبلی',
            next_3: '۳ صفحه بعدی'
        },
        DatePicker: {
            lang: {
                placeholder: 'انتخاب تاریخ',
                rangePlaceholder: ['تاریخ شروع', 'تاریخ پایان'],
                locale: 'fa_IR',
                today: 'امروز',
                now: 'اکنون',
                backToToday: 'بازگشت به روز',
                ok: 'باشه',
                clear: 'پاک کردن',
                month: 'ماه',
                year: 'سال',
                timeSelect: 'انتخاب زمان',
                dateSelect: 'انتخاب تاریخ',
                monthSelect: 'یک ماه را انتخاب کنید',
                yearSelect: 'یک سال را انتخاب کنید',
                decadeSelect: 'یک دهه را انتخاب کنید',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'ماه قبل (PageUp)',
                nextMonth: 'ماه بعد (PageDown)',
                previousYear: 'سال قبل (Control + left)',
                nextYear: 'سال بعد (Control + right)',
                previousDecade: 'دهه قبل',
                nextDecade: 'دهه بعد',
                previousCentury: 'قرن قبل',
                nextCentury: 'قرن بعد'
            },
            timePickerLocale: {
                placeholder: 'انتخاب زمان'
            }
        },
        TimePicker: {
            placeholder: 'انتخاب زمان'
        },
        Calendar: {
            lang: {
                placeholder: 'انتخاب تاریخ',
                rangePlaceholder: ['تاریخ شروع', 'تاریخ پایان'],
                locale: 'fa_IR',
                today: 'امروز',
                now: 'اکنون',
                backToToday: 'بازگشت به روز',
                ok: 'باشه',
                clear: 'پاک کردن',
                month: 'ماه',
                year: 'سال',
                timeSelect: 'انتخاب زمان',
                dateSelect: 'انتخاب تاریخ',
                monthSelect: 'یک ماه را انتخاب کنید',
                yearSelect: 'یک سال را انتخاب کنید',
                decadeSelect: 'یک دهه را انتخاب کنید',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'ماه قبل (PageUp)',
                nextMonth: 'ماه بعد (PageDown)',
                previousYear: 'سال قبل (Control + left)',
                nextYear: 'سال بعد (Control + right)',
                previousDecade: 'دهه قبل',
                nextDecade: 'دهه بعد',
                previousCentury: 'قرن قبل',
                nextCentury: 'قرن بعد'
            },
            timePickerLocale: {
                placeholder: 'انتخاب زمان'
            }
        },
        Table: {
            filterTitle: 'منوی فیلتر',
            filterConfirm: 'تایید',
            filterReset: 'پاک کردن',
            selectAll: 'انتخاب صفحه‌ی کنونی',
            selectInvert: 'معکوس کردن انتخاب‌ها در صفحه ی کنونی',
            selectionAll: 'انتخاب همه داده‌ها',
            sortTitle: 'مرتب سازی',
            expand: 'باز شدن ردیف',
            collapse: 'بستن ردیف',
            triggerDesc: 'ترتیب نزولی',
            triggerAsc: 'ترتیب صعودی',
            cancelSort: 'لغوِ ترتیبِ داده شده'
        },
        Modal: {
            okText: 'تایید',
            cancelText: 'لغو',
            justOkText: 'تایید'
        },
        Popconfirm: {
            okText: 'تایید',
            cancelText: 'لغو'
        },
        Transfer: {
            titles: ['', ''],
            searchPlaceholder: 'جستجو',
            itemUnit: '',
            itemsUnit: ''
        },
        Upload: {
            uploading: 'در حال آپلود...',
            removeFile: 'حذف فایل',
            uploadError: 'خطا در آپلود',
            previewFile: 'مشاهده‌ی فایل',
            downloadFile: 'دریافت فایل'
        },
        Empty: {
            description: 'داده‌ای موجود نیست'
        },
        Icon: {
            icon: 'آیکن'
        },
        Text: {
            edit: 'ویرایش',
            copy: 'کپس',
            copied: 'کپی شد',
            expand: 'توسعه'
        },
        PageHeader: {
            back: 'برگشت'
        },
        Form: {
            defaultValidateMessages: {
                default: 'خطا در ${label}',
                required: 'فیلد ${label} اجباریست',
                enum: '${label} باید یکی از [${enum}] باشد',
                whitespace: '${label} نمیتواند خالی باشد',
                date: {
                    format: 'ساختار تاریخ در ${label} نامعتبر است',
                    parse: '${label} قابل تبدیل به تاریخ نیست',
                    invalid: '${label} تاریخی نا معتبر است'
                },
                types: {
                    string: '${label} از نوع ${type} معتبر نیست',
                    method: '${label} از نوع ${type} معتبر نیست',
                    array: '${label} از نوع ${type} معتبر نیست',
                    object: '${label} از نوع ${type} معتبر نیست',
                    number: '${label} از نوع ${type} معتبر نیست',
                    date: '${label} از نوع ${type} معتبر نیست',
                    boolean: '${label} از نوع ${type} معتبر نیست',
                    integer: '${label} از نوع ${type} معتبر نیست',
                    float: '${label} از نوع ${type} معتبر نیست',
                    regexp: '${label} از نوع ${type} معتبر نیست',
                    email: '${label} از نوع ${type} معتبر نیست',
                    url: '${label} از نوع ${type} معتبر نیست',
                    hex: '${label} از نوع ${type} معتبر نیست'
                },
                string: {
                    len: '${label} باید ${len} کاراکتر باشد',
                    min: '${label} باید حداقل ${min} کاراکتر باشد',
                    max: '${label} باید حداکثر ${max} کاراکتر باشد',
                    range: '${label} باید بین ${min}-${max} کاراکتر باشد'
                },
                number: {
                    len: '${label} باید برابر ${len}',
                    min: '${label} حداقل میتواند ${min} باشد',
                    max: '${label} حداکثر میتواند ${max} باشد',
                    range: '${label} باید بین ${min}-${max} باشد'
                },
                array: {
                    len: 'تعداد ${label} باید ${len} باشد.',
                    min: 'تعداد ${lable} حداقل باید ${min} باشد',
                    max: 'تعداد ${lable} حداکثر باید ${max} باشد',
                    range: 'مقدار ${label} باید بین ${min}-${max} باشد'
                },
                pattern: {
                    mismatch: 'الگوی ${label} با ${pattern} برابری نمی‌کند'
                }
            }
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/fi_FI.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var fi_FI = {
        locale: 'fi',
        Pagination: {
            items_per_page: '/ sivu',
            jump_to: 'Mene',
            jump_to_confirm: 'Potvrdite',
            page: '',
            prev_page: 'Edellinen sivu',
            next_page: 'Seuraava sivu',
            prev_5: 'Edelliset 5 sivua',
            next_5: 'Seuraavat 5 sivua',
            prev_3: 'Edelliset 3 sivua',
            next_3: 'Seuraavat 3 sivua'
        },
        DatePicker: {
            lang: {
                placeholder: 'Valitse päivä',
                rangePlaceholder: ['Alku päivä', 'Loppu päivä'],
                locale: 'fi_FI',
                today: 'Tänään',
                now: 'Nyt',
                backToToday: 'Tämä päivä',
                ok: 'Ok',
                clear: 'Tyhjennä',
                month: 'Kuukausi',
                year: 'Vuosi',
                timeSelect: 'Valise aika',
                dateSelect: 'Valitse päivä',
                monthSelect: 'Valitse kuukausi',
                yearSelect: 'Valitse vuosi',
                decadeSelect: 'Valitse vuosikymmen',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Edellinen kuukausi (PageUp)',
                nextMonth: 'Seuraava kuukausi (PageDown)',
                previousYear: 'Edellinen vuosi (Control + left)',
                nextYear: 'Seuraava vuosi (Control + right)',
                previousDecade: 'Edellinen vuosikymmen',
                nextDecade: 'Seuraava vuosikymmen',
                previousCentury: 'Edellinen vuosisata',
                nextCentury: 'Seuraava vuosisata'
            },
            timePickerLocale: {
                placeholder: 'Valitse aika'
            }
        },
        TimePicker: {
            placeholder: 'Valitse aika'
        },
        Calendar: {
            lang: {
                placeholder: 'Valitse päivä',
                rangePlaceholder: ['Alku päivä', 'Loppu päivä'],
                locale: 'fi_FI',
                today: 'Tänään',
                now: 'Nyt',
                backToToday: 'Tämä päivä',
                ok: 'Ok',
                clear: 'Tyhjennä',
                month: 'Kuukausi',
                year: 'Vuosi',
                timeSelect: 'Valise aika',
                dateSelect: 'Valitse päivä',
                monthSelect: 'Valitse kuukausi',
                yearSelect: 'Valitse vuosi',
                decadeSelect: 'Valitse vuosikymmen',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Edellinen kuukausi (PageUp)',
                nextMonth: 'Seuraava kuukausi (PageDown)',
                previousYear: 'Edellinen vuosi (Control + left)',
                nextYear: 'Seuraava vuosi (Control + right)',
                previousDecade: 'Edellinen vuosikymmen',
                nextDecade: 'Seuraava vuosikymmen',
                previousCentury: 'Edellinen vuosisata',
                nextCentury: 'Seuraava vuosisata'
            },
            timePickerLocale: {
                placeholder: 'Valitse aika'
            }
        },
        Table: {
            filterTitle: 'Suodatus valikko',
            filterConfirm: 'OK',
            filterReset: 'Tyhjennä',
            selectAll: 'Valitse kaikki',
            selectInvert: 'Valitse päinvastoin',
            sortTitle: 'Lajittele'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Peruuta',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Peruuta'
        },
        Transfer: {
            searchPlaceholder: 'Etsi täältä',
            itemUnit: 'kohde',
            itemsUnit: 'kohdetta'
        },
        Upload: {
            uploading: 'Lähetetään...',
            removeFile: 'Poista tiedosto',
            uploadError: 'Virhe lähetyksessä',
            previewFile: 'Esikatsele tiedostoa',
            downloadFile: 'Lataa tiedosto'
        },
        Empty: {
            description: 'Ei kohteita'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/fr_BE.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var fr_BE = {
        locale: 'fr',
        Pagination: {
            items_per_page: '/ page',
            jump_to: 'Aller à',
            jump_to_confirm: 'confirmer',
            page: '',
            prev_page: 'Page précédente',
            next_page: 'Page suivante',
            prev_5: '5 Pages précédentes',
            next_5: '5 Pages suivantes',
            prev_3: '3 Pages précédentes',
            next_3: '3 Pages suivantes'
        },
        DatePicker: {
            lang: {
                placeholder: 'Sélectionner une date',
                rangePlaceholder: ['Date de début', 'Date de fin'],
                locale: 'fr_BE',
                today: "Aujourd'hui",
                now: 'Maintenant',
                backToToday: "Aujourd'hui",
                ok: 'Ok',
                clear: 'Rétablir',
                month: 'Mois',
                year: 'Année',
                timeSelect: "Sélectionner l'heure",
                dateSelect: "Sélectionner l'heure",
                monthSelect: 'Choisissez un mois',
                yearSelect: 'Choisissez une année',
                decadeSelect: 'Choisissez une décennie',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Mois précédent (PageUp)',
                nextMonth: 'Mois suivant (PageDown)',
                previousYear: 'Année précédente (Ctrl + gauche)',
                nextYear: 'Année prochaine (Ctrl + droite)',
                previousDecade: 'Décennie précédente',
                nextDecade: 'Décennie suivante',
                previousCentury: 'Siècle précédent',
                nextCentury: 'Siècle suivant'
            },
            timePickerLocale: {
                placeholder: "Sélectionner l'heure"
            }
        },
        TimePicker: {
            placeholder: "Sélectionner l'heure"
        },
        Calendar: {
            lang: {
                placeholder: 'Sélectionner une date',
                rangePlaceholder: ['Date de début', 'Date de fin'],
                locale: 'fr_BE',
                today: "Aujourd'hui",
                now: 'Maintenant',
                backToToday: "Aujourd'hui",
                ok: 'Ok',
                clear: 'Rétablir',
                month: 'Mois',
                year: 'Année',
                timeSelect: "Sélectionner l'heure",
                dateSelect: "Sélectionner l'heure",
                monthSelect: 'Choisissez un mois',
                yearSelect: 'Choisissez une année',
                decadeSelect: 'Choisissez une décennie',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Mois précédent (PageUp)',
                nextMonth: 'Mois suivant (PageDown)',
                previousYear: 'Année précédente (Ctrl + gauche)',
                nextYear: 'Année prochaine (Ctrl + droite)',
                previousDecade: 'Décennie précédente',
                nextDecade: 'Décennie suivante',
                previousCentury: 'Siècle précédent',
                nextCentury: 'Siècle suivant'
            },
            timePickerLocale: {
                placeholder: "Sélectionner l'heure"
            }
        },
        Table: {
            filterTitle: 'Filtrer',
            filterConfirm: 'OK',
            filterReset: 'Réinitialiser'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Annuler',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Annuler'
        },
        Transfer: {
            searchPlaceholder: 'Recherche',
            itemUnit: 'élément',
            itemsUnit: 'éléments'
        },
        Upload: {
            uploading: 'Téléchargement...',
            removeFile: 'Effacer le fichier',
            uploadError: 'Erreur de téléchargement',
            previewFile: 'Fichier de prévisualisation',
            downloadFile: 'Télécharger un fichier'
        },
        Empty: {
            description: 'Aucune donnée'
        },
        Text: {
            edit: 'éditer',
            copy: 'copier',
            copied: 'copie effectuée',
            expand: 'développer'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/fr_FR.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var fr_FR = {
        locale: 'fr',
        Pagination: {
            items_per_page: '/ page',
            jump_to: 'Aller à',
            jump_to_confirm: 'confirmer',
            page: '',
            prev_page: 'Page précédente',
            next_page: 'Page suivante',
            prev_5: '5 Pages précédentes',
            next_5: '5 Pages suivantes',
            prev_3: '3 Pages précédentes',
            next_3: '3 Pages suivantes'
        },
        DatePicker: {
            lang: {
                placeholder: 'Sélectionner une date',
                yearPlaceholder: 'Sélectionner une année',
                quarterPlaceholder: 'Sélectionner un trimestre',
                monthPlaceholder: 'Sélectionner un mois',
                weekPlaceholder: 'Sélectionner une semaine',
                rangePlaceholder: ['Date de début', 'Date de fin'],
                rangeYearPlaceholder: ['Année de début', 'Année de fin'],
                rangeMonthPlaceholder: ['Mois de début', 'Mois de fin'],
                rangeWeekPlaceholder: ['Semaine de début', 'Semaine de fin'],
                locale: 'fr_FR',
                today: "Aujourd'hui",
                now: 'Maintenant',
                backToToday: "Aujourd'hui",
                ok: 'Ok',
                clear: 'Rétablir',
                month: 'Mois',
                year: 'Année',
                timeSelect: "Sélectionner l'heure",
                dateSelect: 'Sélectionner la date',
                monthSelect: 'Choisissez un mois',
                yearSelect: 'Choisissez une année',
                decadeSelect: 'Choisissez une décennie',
                yearFormat: 'YYYY',
                dateFormat: 'DD/MM/YYYY',
                dayFormat: 'DD',
                dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Mois précédent (PageUp)',
                nextMonth: 'Mois suivant (PageDown)',
                previousYear: 'Année précédente (Ctrl + gauche)',
                nextYear: 'Année prochaine (Ctrl + droite)',
                previousDecade: 'Décennie précédente',
                nextDecade: 'Décennie suivante',
                previousCentury: 'Siècle précédent',
                nextCentury: 'Siècle suivant'
            },
            timePickerLocale: {
                placeholder: "Sélectionner l'heure",
                rangePlaceholder: ['Heure de début', 'Heure de fin']
            }
        },
        TimePicker: {
            placeholder: "Sélectionner l'heure",
            rangePlaceholder: ['Heure de début', 'Heure de fin']
        },
        Calendar: {
            lang: {
                placeholder: 'Sélectionner une date',
                yearPlaceholder: 'Sélectionner une année',
                quarterPlaceholder: 'Sélectionner un trimestre',
                monthPlaceholder: 'Sélectionner un mois',
                weekPlaceholder: 'Sélectionner une semaine',
                rangePlaceholder: ['Date de début', 'Date de fin'],
                rangeYearPlaceholder: ['Année de début', 'Année de fin'],
                rangeMonthPlaceholder: ['Mois de début', 'Mois de fin'],
                rangeWeekPlaceholder: ['Semaine de début', 'Semaine de fin'],
                locale: 'fr_FR',
                today: "Aujourd'hui",
                now: 'Maintenant',
                backToToday: "Aujourd'hui",
                ok: 'Ok',
                clear: 'Rétablir',
                month: 'Mois',
                year: 'Année',
                timeSelect: "Sélectionner l'heure",
                dateSelect: 'Sélectionner la date',
                monthSelect: 'Choisissez un mois',
                yearSelect: 'Choisissez une année',
                decadeSelect: 'Choisissez une décennie',
                yearFormat: 'YYYY',
                dateFormat: 'DD/MM/YYYY',
                dayFormat: 'DD',
                dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Mois précédent (PageUp)',
                nextMonth: 'Mois suivant (PageDown)',
                previousYear: 'Année précédente (Ctrl + gauche)',
                nextYear: 'Année prochaine (Ctrl + droite)',
                previousDecade: 'Décennie précédente',
                nextDecade: 'Décennie suivante',
                previousCentury: 'Siècle précédent',
                nextCentury: 'Siècle suivant'
            },
            timePickerLocale: {
                placeholder: "Sélectionner l'heure",
                rangePlaceholder: ['Heure de début', 'Heure de fin']
            }
        },
        Table: {
            filterTitle: 'Filtrer',
            filterConfirm: 'OK',
            filterReset: 'Réinitialiser'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Annuler',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Annuler'
        },
        Transfer: {
            searchPlaceholder: 'Recherche',
            itemUnit: 'élément',
            itemsUnit: 'éléments'
        },
        Empty: {
            description: 'Aucune donnée'
        },
        Upload: {
            uploading: 'Téléchargement...',
            removeFile: 'Effacer le fichier',
            uploadError: 'Erreur de téléchargement',
            previewFile: 'Fichier de prévisualisation',
            downloadFile: 'Télécharger un fichier'
        },
        Text: {
            edit: 'éditer',
            copy: 'copier',
            copied: 'copie effectuée',
            expand: 'développer'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/he_IL.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var he_IL = {
        locale: 'he',
        Pagination: {
            items_per_page: '/ עמוד',
            jump_to: 'עבור אל',
            jump_to_confirm: 'אישור',
            page: '',
            prev_page: 'העמוד הקודם',
            next_page: 'העמוד הבא',
            prev_5: '5 עמודים קודמים',
            next_5: '5 עמודים הבאים',
            prev_3: '3 עמודים קודמים',
            next_3: '3 עמודים הבאים'
        },
        DatePicker: {
            lang: {
                placeholder: 'בחר תאריך',
                rangePlaceholder: ['תאריך התחלה', 'תאריך סיום'],
                locale: 'he_IL',
                today: 'היום',
                now: 'עכשיו',
                backToToday: 'חזור להיום',
                ok: 'אישור',
                clear: 'איפוס',
                month: 'חודש',
                year: 'שנה',
                timeSelect: 'בחר שעה',
                dateSelect: 'בחר תאריך',
                weekSelect: 'בחר שבוע',
                monthSelect: 'בחר חודש',
                yearSelect: 'בחר שנה',
                decadeSelect: 'בחר עשור',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'חודש קודם (PageUp)',
                nextMonth: 'חודש הבא (PageDown)',
                previousYear: 'שנה שעברה (Control + left)',
                nextYear: 'שנה הבאה (Control + right)',
                previousDecade: 'העשור הקודם',
                nextDecade: 'העשור הבא',
                previousCentury: 'המאה הקודמת',
                nextCentury: 'המאה הבאה'
            },
            timePickerLocale: {
                placeholder: 'בחר שעה'
            }
        },
        TimePicker: {
            placeholder: 'בחר שעה'
        },
        Calendar: {
            lang: {
                placeholder: 'בחר תאריך',
                rangePlaceholder: ['תאריך התחלה', 'תאריך סיום'],
                locale: 'he_IL',
                today: 'היום',
                now: 'עכשיו',
                backToToday: 'חזור להיום',
                ok: 'אישור',
                clear: 'איפוס',
                month: 'חודש',
                year: 'שנה',
                timeSelect: 'בחר שעה',
                dateSelect: 'בחר תאריך',
                weekSelect: 'בחר שבוע',
                monthSelect: 'בחר חודש',
                yearSelect: 'בחר שנה',
                decadeSelect: 'בחר עשור',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'חודש קודם (PageUp)',
                nextMonth: 'חודש הבא (PageDown)',
                previousYear: 'שנה שעברה (Control + left)',
                nextYear: 'שנה הבאה (Control + right)',
                previousDecade: 'העשור הקודם',
                nextDecade: 'העשור הבא',
                previousCentury: 'המאה הקודמת',
                nextCentury: 'המאה הבאה'
            },
            timePickerLocale: {
                placeholder: 'בחר שעה'
            }
        },
        global: {
            placeholder: 'אנא בחר'
        },
        Table: {
            filterTitle: 'תפריט סינון',
            filterConfirm: 'אישור',
            filterReset: 'איפוס',
            selectAll: 'בחר הכל',
            selectInvert: 'הפוך בחירה',
            selectionAll: 'בחר את כל הנתונים',
            sortTitle: 'מיון',
            expand: 'הרחב שורה',
            collapse: 'צמצם שורהw',
            triggerDesc: 'לחץ על מיון לפי סדר יורד',
            triggerAsc: 'לחץ על מיון לפי סדר עולה',
            cancelSort: 'לחץ כדי לבטל את המיון'
        },
        Modal: {
            okText: 'אישור',
            cancelText: 'ביטול',
            justOkText: 'אישור'
        },
        Popconfirm: {
            okText: 'אישור',
            cancelText: 'ביטול'
        },
        Transfer: {
            searchPlaceholder: 'חפש כאן',
            itemUnit: 'פריט',
            itemsUnit: 'פריטים'
        },
        Upload: {
            uploading: 'מעלה...',
            removeFile: 'הסר קובץ',
            uploadError: 'שגיאת העלאה',
            previewFile: 'הצג קובץ',
            downloadFile: 'הורד קובץ'
        },
        Empty: {
            description: 'אין מידע'
        },
        Icon: {
            icon: 'סמל'
        },
        Text: {
            edit: 'ערוך',
            copy: 'העתק',
            copied: 'הועתק',
            expand: 'הרחב'
        },
        PageHeader: {
            back: 'חזרה'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/hi_IN.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var hi_IN = {
        locale: 'hi',
        Pagination: {
            items_per_page: '/ पृष्ठ',
            jump_to: 'इस पर चलें',
            jump_to_confirm: 'पुष्टि करें',
            page: '',
            prev_page: 'पिछला पृष्ठ',
            next_page: 'अगला पृष्ठ',
            prev_5: 'पिछले 5 पृष्ठ',
            next_5: 'अगले 5 पृष्ठ',
            prev_3: 'पिछले 3 पृष्ठ',
            next_3: 'अगले 3 पेज'
        },
        DatePicker: {
            lang: {
                placeholder: 'तारीख़ चुनें',
                rangePlaceholder: ['प्रारंभ तिथि', 'समाप्ति तिथि'],
                locale: 'hi_IN',
                today: 'आज',
                now: 'अभी',
                backToToday: 'आज तक',
                ok: 'ठीक',
                clear: 'स्पष्ट',
                month: 'महीना',
                year: 'साल',
                timeSelect: 'समय का चयन करें',
                dateSelect: 'तारीख़ चुनें',
                weekSelect: 'एक सप्ताह चुनें',
                monthSelect: 'एक महीना चुनें',
                yearSelect: 'एक वर्ष चुनें',
                decadeSelect: 'एक दशक चुनें',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'पिछला महीना (पेजअप)',
                nextMonth: 'अगले महीने (पेजडाउन)',
                previousYear: 'पिछले साल (Ctrl + बाएं)',
                nextYear: 'अगले साल (Ctrl + दाहिना)',
                previousDecade: 'पिछला दशक',
                nextDecade: 'अगले दशक',
                previousCentury: 'पीछ्ली शताब्दी',
                nextCentury: 'अगली सदी'
            },
            timePickerLocale: {
                placeholder: 'समय का चयन करें'
            }
        },
        TimePicker: {
            placeholder: 'समय का चयन करें'
        },
        Calendar: {
            lang: {
                placeholder: 'तारीख़ चुनें',
                rangePlaceholder: ['प्रारंभ तिथि', 'समाप्ति तिथि'],
                locale: 'hi_IN',
                today: 'आज',
                now: 'अभी',
                backToToday: 'आज तक',
                ok: 'ठीक',
                clear: 'स्पष्ट',
                month: 'महीना',
                year: 'साल',
                timeSelect: 'समय का चयन करें',
                dateSelect: 'तारीख़ चुनें',
                weekSelect: 'एक सप्ताह चुनें',
                monthSelect: 'एक महीना चुनें',
                yearSelect: 'एक वर्ष चुनें',
                decadeSelect: 'एक दशक चुनें',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'पिछला महीना (पेजअप)',
                nextMonth: 'अगले महीने (पेजडाउन)',
                previousYear: 'पिछले साल (Ctrl + बाएं)',
                nextYear: 'अगले साल (Ctrl + दाहिना)',
                previousDecade: 'पिछला दशक',
                nextDecade: 'अगले दशक',
                previousCentury: 'पीछ्ली शताब्दी',
                nextCentury: 'अगली सदी'
            },
            timePickerLocale: {
                placeholder: 'समय का चयन करें'
            }
        },
        global: {
            placeholder: 'कृपया चुनें'
        },
        Table: {
            filterTitle: 'सूची बंद करें',
            filterConfirm: 'अच्छी तरह से',
            filterReset: 'रीसेट',
            emptyText: 'कोई जानकारी नहीं',
            selectAll: 'वर्तमान पृष्ठ का चयन करें',
            selectInvert: 'वर्तमान पृष्ठ घुमाएं',
            sortTitle: 'द्वारा क्रमबद्ध करें'
        },
        Modal: {
            okText: 'अच्छी तरह से',
            cancelText: 'रद्द करना',
            justOkText: 'अच्छी तरह से'
        },
        Popconfirm: {
            okText: 'अच्छी तरह से',
            cancelText: 'रद्द करना'
        },
        Transfer: {
            titles: ['', ''],
            notFoundContent: 'नहीं मिला',
            searchPlaceholder: 'यहां खोजें',
            itemUnit: 'तत्त्व',
            itemsUnit: 'विषय-वस्तु'
        },
        Select: {
            notFoundContent: 'नहीं मिला'
        },
        Upload: {
            uploading: 'अपलोडिंग...',
            removeFile: 'फ़ाइल निकालें',
            uploadError: 'अपलोड में त्रुटि',
            previewFile: 'फ़ाइल पूर्वावलोकन',
            downloadFile: 'फ़ाइल डाउनलोड करें'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/hr_HR.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var hr_HR = {
        locale: 'hr',
        Pagination: {
            items_per_page: '/ str',
            jump_to: 'Idi na',
            jump_to_confirm: 'potvrdi',
            page: '',
            prev_page: 'Prijašnja stranica',
            next_page: 'Sljedeća stranica',
            prev_5: 'Prijašnjih 5 stranica',
            next_5: 'Sljedećih 5 stranica',
            prev_3: 'Prijašnje 3 stranice',
            next_3: 'Sljedeće 3 stranice'
        },
        DatePicker: {
            lang: {
                placeholder: 'Odaberite datum',
                rangePlaceholder: ['Početni datum', 'Završni datum'],
                locale: 'hr_HR',
                today: 'Danas',
                now: 'Sad',
                backToToday: 'Natrag na danas',
                ok: 'Ok',
                clear: 'Očisti',
                month: 'Mjesec',
                year: 'Godina',
                timeSelect: 'odaberite vrijeme',
                dateSelect: 'odaberite datum',
                weekSelect: 'Odaberite tjedan',
                monthSelect: 'Odaberite mjesec',
                yearSelect: 'Odaberite godinu',
                decadeSelect: 'Odaberite desetljeće',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Prošli mjesec (PageUp)',
                nextMonth: 'Sljedeći mjesec (PageDown)',
                previousYear: 'Prošla godina (Control + left)',
                nextYear: 'Sljedeća godina (Control + right)',
                previousDecade: 'Prošlo desetljeće',
                nextDecade: 'Sljedeće desetljeće',
                previousCentury: 'Prošlo stoljeće',
                nextCentury: 'Sljedeće stoljeće'
            },
            timePickerLocale: {
                placeholder: 'Odaberite vrijeme'
            }
        },
        TimePicker: {
            placeholder: 'Odaberite vrijeme'
        },
        Calendar: {
            lang: {
                placeholder: 'Odaberite datum',
                rangePlaceholder: ['Početni datum', 'Završni datum'],
                locale: 'hr_HR',
                today: 'Danas',
                now: 'Sad',
                backToToday: 'Natrag na danas',
                ok: 'Ok',
                clear: 'Očisti',
                month: 'Mjesec',
                year: 'Godina',
                timeSelect: 'odaberite vrijeme',
                dateSelect: 'odaberite datum',
                weekSelect: 'Odaberite tjedan',
                monthSelect: 'Odaberite mjesec',
                yearSelect: 'Odaberite godinu',
                decadeSelect: 'Odaberite desetljeće',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Prošli mjesec (PageUp)',
                nextMonth: 'Sljedeći mjesec (PageDown)',
                previousYear: 'Prošla godina (Control + left)',
                nextYear: 'Sljedeća godina (Control + right)',
                previousDecade: 'Prošlo desetljeće',
                nextDecade: 'Sljedeće desetljeće',
                previousCentury: 'Prošlo stoljeće',
                nextCentury: 'Sljedeće stoljeće'
            },
            timePickerLocale: {
                placeholder: 'Odaberite vrijeme'
            }
        },
        global: {
            placeholder: 'Molimo označite'
        },
        Table: {
            filterTitle: 'Filter meni',
            filterConfirm: 'OK',
            filterReset: 'Reset',
            selectAll: 'Označi trenutnu stranicu',
            selectInvert: 'Invertiraj trenutnu stranicu',
            sortTitle: 'Sortiraj'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Odustani',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Odustani'
        },
        Transfer: {
            titles: ['', ''],
            searchPlaceholder: 'Pretraži ovdje',
            itemUnit: 'stavka',
            itemsUnit: 'stavke'
        },
        Upload: {
            uploading: 'Upload u tijeku...',
            removeFile: 'Makni datoteku',
            uploadError: 'Greška kod uploada',
            previewFile: 'Pogledaj datoteku',
            downloadFile: 'Preuzmi datoteku'
        },
        Empty: {
            description: 'Nema podataka'
        },
        Icon: {
            icon: 'ikona'
        },
        Text: {
            edit: 'uredi',
            copy: 'kopiraj',
            copied: 'kopiranje uspješno',
            expand: 'proširi'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/hu_HU.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var hu_HU = {
        locale: 'hu',
        Pagination: {
            items_per_page: '/ oldal',
            jump_to: 'Ugrás',
            jump_to_confirm: 'megerősít',
            page: '',
            prev_page: 'Előző oldal',
            next_page: 'Következő oldal',
            prev_5: 'Előző 5 oldal',
            next_5: 'Következő 5 oldal',
            prev_3: 'Előző 3 oldal',
            next_3: 'Következő 3 oldal'
        },
        DatePicker: {
            lang: {
                placeholder: 'Válasszon dátumot',
                rangePlaceholder: ['Kezdő dátum', 'Befejezés dátuma'],
                locale: 'hu_HU',
                today: 'Ma',
                now: 'Most',
                backToToday: 'Vissza a mai napra',
                ok: 'Ok',
                clear: 'Törlés',
                month: 'Hónap',
                year: 'Év',
                timeSelect: 'Időpont kiválasztása',
                dateSelect: 'Dátum kiválasztása',
                monthSelect: 'Hónap kiválasztása',
                yearSelect: 'Év kiválasztása',
                decadeSelect: 'Évtized kiválasztása',
                yearFormat: 'YYYY',
                dateFormat: 'YYYY/MM/DD',
                dayFormat: 'DD',
                dateTimeFormat: 'YYYY/MM/DD HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Előző hónap (PageUp)',
                nextMonth: 'Következő hónap (PageDown)',
                previousYear: 'Múlt év (Control + left)',
                nextYear: 'Jövő év (Control + right)',
                previousDecade: 'Előző évtized',
                nextDecade: 'Következő évtized',
                previousCentury: 'Múlt évszázad',
                nextCentury: 'Jövő évszázad'
            },
            timePickerLocale: {
                placeholder: 'Válasszon időt'
            }
        },
        TimePicker: {
            placeholder: 'Válasszon időt'
        },
        Calendar: {
            lang: {
                placeholder: 'Válasszon dátumot',
                rangePlaceholder: ['Kezdő dátum', 'Befejezés dátuma'],
                locale: 'hu_HU',
                today: 'Ma',
                now: 'Most',
                backToToday: 'Vissza a mai napra',
                ok: 'Ok',
                clear: 'Törlés',
                month: 'Hónap',
                year: 'Év',
                timeSelect: 'Időpont kiválasztása',
                dateSelect: 'Dátum kiválasztása',
                monthSelect: 'Hónap kiválasztása',
                yearSelect: 'Év kiválasztása',
                decadeSelect: 'Évtized kiválasztása',
                yearFormat: 'YYYY',
                dateFormat: 'YYYY/MM/DD',
                dayFormat: 'DD',
                dateTimeFormat: 'YYYY/MM/DD HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Előző hónap (PageUp)',
                nextMonth: 'Következő hónap (PageDown)',
                previousYear: 'Múlt év (Control + left)',
                nextYear: 'Jövő év (Control + right)',
                previousDecade: 'Előző évtized',
                nextDecade: 'Következő évtized',
                previousCentury: 'Múlt évszázad',
                nextCentury: 'Jövő évszázad'
            },
            timePickerLocale: {
                placeholder: 'Válasszon időt'
            }
        },
        Table: {
            filterTitle: 'Szűrők',
            filterConfirm: 'Alkalmazás',
            filterReset: 'Visszaállítás',
            selectAll: 'Jelenlegi oldal kiválasztása',
            selectInvert: 'Jelenlegi oldal inverze',
            sortTitle: 'Rendezés'
        },
        Modal: {
            okText: 'Alkalmazás',
            cancelText: 'Visszavonás',
            justOkText: 'Alkalmazás'
        },
        Popconfirm: {
            okText: 'Alkalmazás',
            cancelText: 'Visszavonás'
        },
        Transfer: {
            searchPlaceholder: 'Keresés',
            itemUnit: 'elem',
            itemsUnit: 'elemek'
        },
        Upload: {
            uploading: 'Feltöltés...',
            removeFile: 'Fájl eltávolítása',
            uploadError: 'Feltöltési hiba',
            previewFile: 'Fájl előnézet',
            downloadFile: 'Fájl letöltése'
        },
        Empty: {
            description: 'Nincs adat'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/id_ID.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var id_ID = {
        locale: 'id',
        Pagination: {
            items_per_page: '/ halaman',
            jump_to: 'Menuju',
            jump_to_confirm: 'konfirmasi',
            page: '',
            prev_page: 'Halaman Sebelumnya',
            next_page: 'Halaman Berikutnya',
            prev_5: '5 Halaman Sebelumnya',
            next_5: '5 Halaman Berikutnya',
            prev_3: '3 Halaman Sebelumnya',
            next_3: '3 Halaman Berikutnya'
        },
        DatePicker: {
            lang: {
                placeholder: 'Pilih tanggal',
                rangePlaceholder: ['Mulai tanggal', 'Tanggal akhir'],
                locale: 'id_ID',
                today: 'Hari ini',
                now: 'Sekarang',
                backToToday: 'Kembali ke hari ini',
                ok: 'Baik',
                clear: 'Bersih',
                month: 'Bulan',
                year: 'Tahun',
                timeSelect: 'pilih waktu',
                dateSelect: 'pilih tanggal',
                weekSelect: 'Pilih satu minggu',
                monthSelect: 'Pilih satu bulan',
                yearSelect: 'Pilih satu tahun',
                decadeSelect: 'Pilih satu dekade',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Bulan sebelumnya (PageUp)',
                nextMonth: 'Bulan selanjutnya (PageDown)',
                previousYear: 'Tahun lalu (Control + kiri)',
                nextYear: 'Tahun selanjutnya (Kontrol + kanan)',
                previousDecade: 'Dekade terakhir',
                nextDecade: 'Dekade berikutnya',
                previousCentury: 'Abad terakhir',
                nextCentury: 'Abad berikutnya'
            },
            timePickerLocale: {
                placeholder: 'Pilih waktu'
            }
        },
        TimePicker: {
            placeholder: 'Pilih waktu'
        },
        Calendar: {
            lang: {
                placeholder: 'Pilih tanggal',
                rangePlaceholder: ['Mulai tanggal', 'Tanggal akhir'],
                locale: 'id_ID',
                today: 'Hari ini',
                now: 'Sekarang',
                backToToday: 'Kembali ke hari ini',
                ok: 'Baik',
                clear: 'Bersih',
                month: 'Bulan',
                year: 'Tahun',
                timeSelect: 'pilih waktu',
                dateSelect: 'pilih tanggal',
                weekSelect: 'Pilih satu minggu',
                monthSelect: 'Pilih satu bulan',
                yearSelect: 'Pilih satu tahun',
                decadeSelect: 'Pilih satu dekade',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Bulan sebelumnya (PageUp)',
                nextMonth: 'Bulan selanjutnya (PageDown)',
                previousYear: 'Tahun lalu (Control + kiri)',
                nextYear: 'Tahun selanjutnya (Kontrol + kanan)',
                previousDecade: 'Dekade terakhir',
                nextDecade: 'Dekade berikutnya',
                previousCentury: 'Abad terakhir',
                nextCentury: 'Abad berikutnya'
            },
            timePickerLocale: {
                placeholder: 'Pilih waktu'
            }
        },
        Table: {
            filterTitle: 'Saring',
            filterConfirm: 'OK',
            filterReset: 'Hapus',
            selectAll: 'Pilih semua di halaman ini',
            selectInvert: 'Balikkan pilihan di halaman ini',
            sortTitle: 'Urutkan'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Batal',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Batal'
        },
        Transfer: {
            titles: ['', ''],
            searchPlaceholder: 'Cari',
            itemUnit: 'item',
            itemsUnit: 'item'
        },
        Upload: {
            uploading: 'Mengunggah...',
            removeFile: 'Hapus file',
            uploadError: 'Kesalahan pengunggahan',
            previewFile: 'File pratinjau',
            downloadFile: 'Unduh berkas'
        },
        Empty: {
            description: 'Tidak ada data'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/is_IS.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var is_IS = {
        locale: 'is',
        Pagination: {
            items_per_page: '/ síðu',
            jump_to: 'Síða',
            jump_to_confirm: 'staðfest',
            page: '',
            prev_page: 'Fyrri síða',
            next_page: 'Næsta síða',
            prev_5: 'Til baka 5 síður',
            next_5: 'Áfram 5 síður',
            prev_3: 'Til baka 3 síður',
            next_3: 'Áfram 3 síður'
        },
        DatePicker: {
            lang: {
                placeholder: 'Veldu dag',
                rangePlaceholder: ['Upphafsdagur', 'Lokadagur'],
                locale: 'is_IS',
                today: 'Í dag',
                now: 'Núna',
                backToToday: 'Til baka til dagsins í dag',
                ok: 'Í lagi',
                clear: 'Hreinsa',
                month: 'Mánuður',
                year: 'Ár',
                timeSelect: 'Velja tíma',
                dateSelect: 'Velja dag',
                monthSelect: 'Velja mánuð',
                yearSelect: 'Velja ár',
                decadeSelect: 'Velja áratug',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Fyrri mánuður (PageUp)',
                nextMonth: 'Næsti mánuður (PageDown)',
                previousYear: 'Fyrra ár (Control + left)',
                nextYear: 'Næsta ár (Control + right)',
                previousDecade: 'Fyrri áratugur',
                nextDecade: 'Næsti áratugur',
                previousCentury: 'Fyrri öld',
                nextCentury: 'Næsta öld'
            },
            timePickerLocale: {
                placeholder: 'Velja tíma'
            }
        },
        TimePicker: {
            placeholder: 'Velja tíma'
        },
        Calendar: {
            lang: {
                placeholder: 'Veldu dag',
                rangePlaceholder: ['Upphafsdagur', 'Lokadagur'],
                locale: 'is_IS',
                today: 'Í dag',
                now: 'Núna',
                backToToday: 'Til baka til dagsins í dag',
                ok: 'Í lagi',
                clear: 'Hreinsa',
                month: 'Mánuður',
                year: 'Ár',
                timeSelect: 'Velja tíma',
                dateSelect: 'Velja dag',
                monthSelect: 'Velja mánuð',
                yearSelect: 'Velja ár',
                decadeSelect: 'Velja áratug',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Fyrri mánuður (PageUp)',
                nextMonth: 'Næsti mánuður (PageDown)',
                previousYear: 'Fyrra ár (Control + left)',
                nextYear: 'Næsta ár (Control + right)',
                previousDecade: 'Fyrri áratugur',
                nextDecade: 'Næsti áratugur',
                previousCentury: 'Fyrri öld',
                nextCentury: 'Næsta öld'
            },
            timePickerLocale: {
                placeholder: 'Velja tíma'
            }
        },
        Table: {
            filterTitle: 'Afmarkanir',
            filterConfirm: 'Staðfesta',
            filterReset: 'Núllstilla',
            selectAll: 'Velja allt',
            selectInvert: 'Viðsnúa vali'
        },
        Modal: {
            okText: 'Áfram',
            cancelText: 'Hætta við',
            justOkText: 'Í lagi'
        },
        Popconfirm: {
            okText: 'Áfram',
            cancelText: 'Hætta við'
        },
        Transfer: {
            searchPlaceholder: 'Leita hér',
            itemUnit: 'færsla',
            itemsUnit: 'færslur'
        },
        Upload: {
            uploading: 'Hleð upp...',
            removeFile: 'Fjarlægja skrá',
            uploadError: 'Villa við að hlaða upp',
            previewFile: 'Forskoða skrá',
            downloadFile: 'Hlaða niður skrá'
        },
        Empty: {
            description: 'Engin gögn'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/it_IT.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var it_IT = {
        locale: 'it',
        Pagination: {
            items_per_page: '/ pagina',
            jump_to: 'vai a',
            jump_to_confirm: 'Conferma',
            page: '',
            prev_page: 'Pagina precedente',
            next_page: 'Pagina successiva',
            prev_5: 'Precedente 5 pagine',
            next_5: 'Prossime 5 pagine',
            prev_3: 'Precedente 3 pagine',
            next_3: 'Prossime 3 pagine'
        },
        DatePicker: {
            lang: {
                placeholder: 'Selezionare la data',
                rangePlaceholder: ["Data d'inizio", 'Data di fine'],
                locale: 'it_IT',
                today: 'Oggi',
                now: 'Adesso',
                backToToday: 'Torna ad oggi',
                ok: 'Ok',
                clear: 'Cancella',
                month: 'Mese',
                year: 'Anno',
                timeSelect: "Seleziona l'ora",
                dateSelect: 'Seleziona la data',
                monthSelect: 'Seleziona il mese',
                yearSelect: "Seleziona l'anno",
                decadeSelect: 'Seleziona il decennio',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Il mese scorso (PageUp)',
                nextMonth: 'Il prossimo mese (PageDown)',
                previousYear: "L'anno scorso (Control + sinistra)",
                nextYear: "L'anno prossimo (Control + destra)",
                previousDecade: 'Ultimo decennio',
                nextDecade: 'Prossimo decennio',
                previousCentury: 'Secolo precedente',
                nextCentury: 'Prossimo secolo'
            },
            timePickerLocale: {
                placeholder: "Selezionare l'orario"
            }
        },
        TimePicker: {
            placeholder: "Selezionare l'orario"
        },
        Calendar: {
            lang: {
                placeholder: 'Selezionare la data',
                rangePlaceholder: ["Data d'inizio", 'Data di fine'],
                locale: 'it_IT',
                today: 'Oggi',
                now: 'Adesso',
                backToToday: 'Torna ad oggi',
                ok: 'Ok',
                clear: 'Cancella',
                month: 'Mese',
                year: 'Anno',
                timeSelect: "Seleziona l'ora",
                dateSelect: 'Seleziona la data',
                monthSelect: 'Seleziona il mese',
                yearSelect: "Seleziona l'anno",
                decadeSelect: 'Seleziona il decennio',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Il mese scorso (PageUp)',
                nextMonth: 'Il prossimo mese (PageDown)',
                previousYear: "L'anno scorso (Control + sinistra)",
                nextYear: "L'anno prossimo (Control + destra)",
                previousDecade: 'Ultimo decennio',
                nextDecade: 'Prossimo decennio',
                previousCentury: 'Secolo precedente',
                nextCentury: 'Prossimo secolo'
            },
            timePickerLocale: {
                placeholder: "Selezionare l'orario"
            }
        },
        global: {
            placeholder: 'Selezionare'
        },
        Table: {
            filterTitle: 'Menù Filtro',
            filterConfirm: 'OK',
            filterReset: 'Reset',
            selectAll: 'Seleziona pagina corrente',
            selectInvert: 'Inverti selezione nella pagina corrente',
            sortTitle: 'Ordina'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Annulla',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Annulla'
        },
        Transfer: {
            searchPlaceholder: 'Cerca qui',
            itemUnit: 'elemento',
            itemsUnit: 'elementi'
        },
        Upload: {
            uploading: 'Caricamento...',
            removeFile: 'Rimuovi il file',
            uploadError: 'Errore di caricamento',
            previewFile: 'Anteprima file',
            downloadFile: 'Download file'
        },
        Empty: {
            description: 'Nessun dato'
        },
        Icon: {
            icon: 'icona'
        },
        Text: {
            edit: 'modifica',
            copy: 'copia',
            copied: 'copia effettuata',
            expand: 'espandi'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/ja_JP.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var ja_JP = {
        locale: 'ja',
        Pagination: {
            items_per_page: '/ ページ',
            jump_to: '移動',
            jump_to_confirm: '確認する',
            page: 'ページ',
            prev_page: '前のページ',
            next_page: '次のページ',
            prev_5: '前 5ページ',
            next_5: '次 5ページ',
            prev_3: '前 3ページ',
            next_3: '次 3ページ'
        },
        DatePicker: {
            lang: {
                placeholder: '日付を選択',
                rangePlaceholder: ['開始日付', '終了日付'],
                locale: 'ja_JP',
                today: '今日',
                now: '現在時刻',
                backToToday: '今日に戻る',
                ok: '決定',
                timeSelect: '時間を選択',
                dateSelect: '日時を選択',
                weekSelect: '週を選択',
                clear: 'クリア',
                month: '月',
                year: '年',
                previousMonth: '前月 (ページアップキー)',
                nextMonth: '翌月 (ページダウンキー)',
                monthSelect: '月を選択',
                yearSelect: '年を選択',
                decadeSelect: '年代を選択',
                yearFormat: 'YYYY年',
                dayFormat: 'D日',
                dateFormat: 'YYYY年M月D日',
                dateTimeFormat: 'YYYY年M月D日 HH時mm分ss秒',
                previousYear: '前年 (Controlを押しながら左キー)',
                nextYear: '翌年 (Controlを押しながら右キー)',
                previousDecade: '前の年代',
                nextDecade: '次の年代',
                previousCentury: '前の世紀',
                nextCentury: '次の世紀'
            },
            timePickerLocale: {
                placeholder: '時刻を選択'
            }
        },
        TimePicker: {
            placeholder: '時刻を選択'
        },
        Calendar: {
            lang: {
                placeholder: '日付を選択',
                rangePlaceholder: ['開始日付', '終了日付'],
                locale: 'ja_JP',
                today: '今日',
                now: '現在時刻',
                backToToday: '今日に戻る',
                ok: '決定',
                timeSelect: '時間を選択',
                dateSelect: '日時を選択',
                weekSelect: '週を選択',
                clear: 'クリア',
                month: '月',
                year: '年',
                previousMonth: '前月 (ページアップキー)',
                nextMonth: '翌月 (ページダウンキー)',
                monthSelect: '月を選択',
                yearSelect: '年を選択',
                decadeSelect: '年代を選択',
                yearFormat: 'YYYY年',
                dayFormat: 'D日',
                dateFormat: 'YYYY年M月D日',
                dateTimeFormat: 'YYYY年M月D日 HH時mm分ss秒',
                previousYear: '前年 (Controlを押しながら左キー)',
                nextYear: '翌年 (Controlを押しながら右キー)',
                previousDecade: '前の年代',
                nextDecade: '次の年代',
                previousCentury: '前の世紀',
                nextCentury: '次の世紀'
            },
            timePickerLocale: {
                placeholder: '時刻を選択'
            }
        },
        Table: {
            filterTitle: 'メニューをフィルター',
            filterConfirm: 'OK',
            filterReset: 'リセット',
            selectAll: 'すべてを選択',
            selectInvert: '選択を反転'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'キャンセル',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'キャンセル'
        },
        Transfer: {
            searchPlaceholder: 'ここを検索',
            itemUnit: 'アイテム',
            itemsUnit: 'アイテム'
        },
        Upload: {
            uploading: 'アップロード中...',
            removeFile: 'ファイルを削除',
            uploadError: 'アップロードエラー',
            previewFile: 'ファイルをプレビュー',
            downloadFile: 'ダウンロードファイル'
        },
        Empty: {
            description: 'データがありません'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/ka_GE.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var ka_GE = {
        locale: 'ka',
        Pagination: {
            // Options.jsx
            items_per_page: '/ გვ.',
            jump_to: 'გადასვლა',
            jump_to_confirm: 'დადასტურება',
            page: '',
            // Pagination.jsx
            prev_page: 'წინა გვერდი',
            next_page: 'შემდეგი გვერდი',
            prev_5: 'წინა 5 გვერდი',
            next_5: 'შემდეგი 5 გვერდი',
            prev_3: 'წინა 3 გვერდი',
            next_3: 'შემდეგი 3 გვერდი'
        },
        DatePicker: {
            lang: {
                today: 'დღეს',
                now: 'ახლა',
                backToToday: 'მიმდინარე თარიღი',
                ok: 'დიახ',
                clear: 'გასუფთავება',
                month: 'თვე',
                year: 'წელი',
                timeSelect: 'აირჩიეთ დრო',
                dateSelect: 'აირჩიეთ თარიღი',
                weekSelect: 'აირჩიეთ კვირა',
                monthSelect: 'აირჩიეთ თვე',
                yearSelect: 'აირჩიეთ წელი',
                decadeSelect: 'აირჩიე ათწლეული',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'წინა თვე (PageUp)',
                nextMonth: 'შემდეგი თვე (PageDown)',
                previousYear: 'წინა წელი (Control + left)',
                nextYear: 'შემდეგი წელი (Control + right)',
                previousDecade: 'წინა ათწლეული',
                nextDecade: 'შემდეგი ათწლეული',
                previousCentury: 'წინა საუკუნე',
                nextCentury: 'შემდეგი საუკუნე'
            },
            timePickerLocale: {
                placeholder: 'აირჩიეთ დრო'
            }
        },
        TimePicker: {
            placeholder: 'აირჩიეთ დრო'
        },
        Calendar: {
            lang: {
                today: 'დღეს',
                now: 'ახლა',
                backToToday: 'მიმდინარე თარიღი',
                ok: 'დიახ',
                clear: 'გასუფთავება',
                month: 'თვე',
                year: 'წელი',
                timeSelect: 'აირჩიეთ დრო',
                dateSelect: 'აირჩიეთ თარიღი',
                weekSelect: 'აირჩიეთ კვირა',
                monthSelect: 'აირჩიეთ თვე',
                yearSelect: 'აირჩიეთ წელი',
                decadeSelect: 'აირჩიე ათწლეული',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'წინა თვე (PageUp)',
                nextMonth: 'შემდეგი თვე (PageDown)',
                previousYear: 'წინა წელი (Control + left)',
                nextYear: 'შემდეგი წელი (Control + right)',
                previousDecade: 'წინა ათწლეული',
                nextDecade: 'შემდეგი ათწლეული',
                previousCentury: 'წინა საუკუნე',
                nextCentury: 'შემდეგი საუკუნე'
            },
            timePickerLocale: {
                placeholder: 'აირჩიეთ დრო'
            }
        },
        global: {
            placeholder: 'აირჩიეთ'
        },
        Table: {
            filterTitle: 'ფილტრი',
            filterConfirm: 'დიახ',
            filterReset: 'განულება',
            selectAll: 'აირჩიეთ მიმდინარე გვერდი',
            selectInvert: 'გვერდის მიმართულების შეცვლა',
            sortTitle: 'სორტირება'
        },
        Modal: {
            okText: 'დიახ',
            cancelText: 'გაუქმება',
            justOkText: 'დიახ'
        },
        Popconfirm: {
            okText: 'დიახ',
            cancelText: 'გაუქმება'
        },
        Transfer: {
            titles: ['', ''],
            searchPlaceholder: 'ძიება',
            itemUnit: 'ელემ.',
            itemsUnit: 'ელემ.'
        },
        Upload: {
            uploading: 'იტვირტება...',
            removeFile: 'ფაილის წაშლა',
            uploadError: 'ატვირთვის შეცდომა',
            previewFile: 'ფაილის გადახედვა'
        },
        Empty: {
            description: 'მონაცემი არ არის'
        },
        Icon: {
            icon: 'ხატულა'
        },
        Text: {
            edit: 'რედაქტირება',
            copy: 'კოპირება',
            copied: 'წარმატებით დაკოპირდა',
            expand: 'გახსნა'
        },
        PageHeader: {
            back: 'უკან'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/kn_IN.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var kn_IN = {
        locale: 'kn',
        Pagination: {
            items_per_page: '/ ಪುಟ',
            jump_to: 'ಜಿಗಿತವನ್ನು',
            jump_to_confirm: 'ಖಚಿತಪಡಿಸಲು ಜಿಗಿತವನ್ನು',
            page: '',
            prev_page: 'ಹಿಂದಿನ ಪುಟ',
            next_page: 'ಮುಂದಿನ ಪುಟ',
            prev_5: 'ಹಿಂದಿನ 5 ಪುಟಗಳು',
            next_5: 'ಮುಂದಿನ 5 ಪುಟಗಳು',
            prev_3: 'ಹಿಂದಿನ 3 ಪುಟಗಳು',
            next_3: 'ಮುಂದಿನ 3 ಪುಟಗಳು'
        },
        DatePicker: {
            lang: {
                placeholder: 'ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ',
                rangePlaceholder: ['ಪ್ರಾರಂಭ ದಿನಾಂಕ', 'ಅಂತಿಮ ದಿನಾಂಕ'],
                locale: 'kn_IN',
                today: 'ಇಂದು',
                now: 'ಈಗ',
                backToToday: 'ಇಂದು ಹಿಂದಿರುಗಿ',
                ok: 'ಸರಿ',
                clear: 'ಸ್ಪಷ್ಟ',
                month: 'ತಿಂಗಳು',
                year: 'ವರ್ಷ',
                timeSelect: 'ಸಮಯ ಆಯ್ಕೆಮಾಡಿ',
                dateSelect: 'ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
                weekSelect: 'ಒಂದು ವಾರದ ಆರಿಸಿ',
                monthSelect: 'ಒಂದು ತಿಂಗಳು ಆಯ್ಕೆಮಾಡಿ',
                yearSelect: 'ಒಂದು ವರ್ಷ ಆರಿಸಿ',
                decadeSelect: 'ಒಂದು ದಶಕದ ಆಯ್ಕೆಮಾಡಿ',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'ಹಿಂದಿನ ತಿಂಗಳು (ಪೇಜ್ಅಪ್)',
                nextMonth: 'ಮುಂದಿನ ತಿಂಗಳು (ಪೇಜ್ಡೌನ್)',
                previousYear: 'ಕಳೆದ ವರ್ಷ (Ctrl + ಎಡ)',
                nextYear: 'ಮುಂದಿನ ವರ್ಷ (Ctrl + ಬಲ)',
                previousDecade: 'ಕಳೆದ ದಶಕ',
                nextDecade: 'ಮುಂದಿನ ದಶಕ',
                previousCentury: 'ಕಳೆದ ಶತಮಾನ',
                nextCentury: 'ಮುಂದಿನ ಶತಮಾನ'
            },
            timePickerLocale: {
                placeholder: 'ಸಮಯ ಆಯ್ಕೆಮಾಡಿ'
            }
        },
        TimePicker: {
            placeholder: 'ಸಮಯ ಆಯ್ಕೆಮಾಡಿ'
        },
        Calendar: {
            lang: {
                placeholder: 'ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ',
                rangePlaceholder: ['ಪ್ರಾರಂಭ ದಿನಾಂಕ', 'ಅಂತಿಮ ದಿನಾಂಕ'],
                locale: 'kn_IN',
                today: 'ಇಂದು',
                now: 'ಈಗ',
                backToToday: 'ಇಂದು ಹಿಂದಿರುಗಿ',
                ok: 'ಸರಿ',
                clear: 'ಸ್ಪಷ್ಟ',
                month: 'ತಿಂಗಳು',
                year: 'ವರ್ಷ',
                timeSelect: 'ಸಮಯ ಆಯ್ಕೆಮಾಡಿ',
                dateSelect: 'ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
                weekSelect: 'ಒಂದು ವಾರದ ಆರಿಸಿ',
                monthSelect: 'ಒಂದು ತಿಂಗಳು ಆಯ್ಕೆಮಾಡಿ',
                yearSelect: 'ಒಂದು ವರ್ಷ ಆರಿಸಿ',
                decadeSelect: 'ಒಂದು ದಶಕದ ಆಯ್ಕೆಮಾಡಿ',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'ಹಿಂದಿನ ತಿಂಗಳು (ಪೇಜ್ಅಪ್)',
                nextMonth: 'ಮುಂದಿನ ತಿಂಗಳು (ಪೇಜ್ಡೌನ್)',
                previousYear: 'ಕಳೆದ ವರ್ಷ (Ctrl + ಎಡ)',
                nextYear: 'ಮುಂದಿನ ವರ್ಷ (Ctrl + ಬಲ)',
                previousDecade: 'ಕಳೆದ ದಶಕ',
                nextDecade: 'ಮುಂದಿನ ದಶಕ',
                previousCentury: 'ಕಳೆದ ಶತಮಾನ',
                nextCentury: 'ಮುಂದಿನ ಶತಮಾನ'
            },
            timePickerLocale: {
                placeholder: 'ಸಮಯ ಆಯ್ಕೆಮಾಡಿ'
            }
        },
        global: {
            placeholder: 'ದಯವಿಟ್ಟು ಆರಿಸಿ'
        },
        Table: {
            filterTitle: 'ಪಟ್ಟಿ ಸೋಸಿ',
            filterConfirm: 'ಸರಿ',
            filterReset: 'ಮರುಹೊಂದಿಸಿ',
            emptyText: 'ಮಾಹಿತಿ ಇಲ್ಲ',
            selectAll: 'ಪ್ರಸ್ತುತ ಪುಟವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
            selectInvert: 'ಪ್ರಸ್ತುತ ಪುಟವನ್ನು ತಿರುಗಿಸಿ',
            sortTitle: 'ವಿಂಗಡಿಸಿ'
        },
        Modal: {
            okText: 'ಸರಿ',
            cancelText: 'ರದ್ದು',
            justOkText: 'ಸರಿ'
        },
        Popconfirm: {
            okText: 'ಸರಿ',
            cancelText: 'ರದ್ದು'
        },
        Transfer: {
            titles: ['', ''],
            notFoundContent: 'ದೊರೆತಿಲ್ಲ',
            searchPlaceholder: 'ಇಲ್ಲಿ ಹುಡುಕಿ',
            itemUnit: 'ವಿಷಯ',
            itemsUnit: 'ವಿಷಯಗಳು'
        },
        Select: {
            notFoundContent: 'ದೊರೆತಿಲ್ಲ'
        },
        Upload: {
            uploading: 'ಏರಿಸಿ...',
            removeFile: 'ಫೈಲ್ ತೆಗೆದುಹಾಕಿ',
            uploadError: 'ಏರಿಸುವ ದೋಷ',
            previewFile: 'ಫೈಲ್ ಮುನ್ನೋಟ',
            downloadFile: 'ಫೈಲ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/ko_KR.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var ko_KR = {
        locale: 'ko',
        Pagination: {
            items_per_page: '/ 쪽',
            jump_to: '이동하기',
            jump_to_confirm: '확인하다',
            page: '',
            prev_page: '이전 페이지',
            next_page: '다음 페이지',
            prev_5: '이전 5 페이지',
            next_5: '다음 5 페이지',
            prev_3: '이전 3 페이지',
            next_3: '다음 3 페이지'
        },
        DatePicker: {
            lang: {
                placeholder: '날짜 선택',
                rangePlaceholder: ['시작일', '종료일'],
                locale: 'ko_KR',
                today: '오늘',
                now: '현재 시각',
                backToToday: '오늘로 돌아가기',
                ok: '확인',
                clear: '지우기',
                month: '월',
                year: '년',
                timeSelect: '시간 선택',
                dateSelect: '날짜 선택',
                monthSelect: '달 선택',
                yearSelect: '연 선택',
                decadeSelect: '연대 선택',
                yearFormat: 'YYYY년',
                dateFormat: 'YYYY-MM-DD',
                dayFormat: 'Do',
                dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
                monthBeforeYear: false,
                previousMonth: '이전 달 (PageUp)',
                nextMonth: '다음 달 (PageDown)',
                previousYear: '이전 해 (Control + left)',
                nextYear: '다음 해 (Control + right)',
                previousDecade: '이전 연대',
                nextDecade: '다음 연대',
                previousCentury: '이전 세기',
                nextCentury: '다음 세기'
            },
            timePickerLocale: {
                placeholder: '날짜 선택'
            }
        },
        TimePicker: {
            placeholder: '날짜 선택'
        },
        Calendar: {
            lang: {
                placeholder: '날짜 선택',
                rangePlaceholder: ['시작일', '종료일'],
                locale: 'ko_KR',
                today: '오늘',
                now: '현재 시각',
                backToToday: '오늘로 돌아가기',
                ok: '확인',
                clear: '지우기',
                month: '월',
                year: '년',
                timeSelect: '시간 선택',
                dateSelect: '날짜 선택',
                monthSelect: '달 선택',
                yearSelect: '연 선택',
                decadeSelect: '연대 선택',
                yearFormat: 'YYYY년',
                dateFormat: 'YYYY-MM-DD',
                dayFormat: 'Do',
                dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
                monthBeforeYear: false,
                previousMonth: '이전 달 (PageUp)',
                nextMonth: '다음 달 (PageDown)',
                previousYear: '이전 해 (Control + left)',
                nextYear: '다음 해 (Control + right)',
                previousDecade: '이전 연대',
                nextDecade: '다음 연대',
                previousCentury: '이전 세기',
                nextCentury: '다음 세기'
            },
            timePickerLocale: {
                placeholder: '날짜 선택'
            }
        },
        Table: {
            filterTitle: '필터 메뉴',
            filterConfirm: '확인',
            filterReset: '초기화',
            selectAll: '모두 선택',
            selectInvert: '선택 반전'
        },
        Modal: {
            okText: '확인',
            cancelText: '취소',
            justOkText: '확인'
        },
        Popconfirm: {
            okText: '확인',
            cancelText: '취소'
        },
        Transfer: {
            searchPlaceholder: '여기에 검색하세요',
            itemUnit: '개',
            itemsUnit: '개'
        },
        Upload: {
            uploading: '업로드 중...',
            removeFile: '파일 삭제',
            uploadError: '업로드 실패',
            previewFile: '파일 미리보기',
            downloadFile: '파일 다운로드'
        },
        Empty: {
            description: '데이터 없음'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/ku_IQ.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var ku_IQ = {
        locale: 'ku-iq',
        Pagination: {
            items_per_page: '/ rûpel',
            jump_to: 'Biçe',
            jump_to_confirm: 'piştrast bike',
            page: '',
            prev_page: 'Rûpelê Pêş',
            next_page: 'Rûpelê Paş',
            prev_5: '5 Rûpelên Pêş',
            next_5: '5 Rûpelên Paş',
            prev_3: '3 Rûpelên Pêş',
            next_3: '3 Rûpelên Paş'
        },
        DatePicker: {
            lang: {
                placeholder: 'Dîrok hilbijêre',
                rangePlaceholder: ['Dîroka destpêkê', 'Dîroka dawîn'],
                locale: 'ku_IQ',
                today: 'Îro',
                now: 'Niha',
                backToToday: 'Vegere îro',
                ok: 'Temam',
                clear: 'Paqij bike',
                month: 'Meh',
                year: 'Sal',
                timeSelect: 'Demê hilbijêre',
                dateSelect: 'Dîrok hilbijêre',
                monthSelect: 'Meh hilbijêre',
                yearSelect: 'Sal hilbijêre',
                decadeSelect: 'Dehsal hilbijêre',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Meha peş (PageUp))',
                nextMonth: 'Meha paş (PageDown)',
                previousYear: 'Sala peş (Control + şep)',
                nextYear: 'Sala paş (Control + rast)',
                previousDecade: 'Dehsalen peş',
                nextDecade: 'Dehsalen paş',
                previousCentury: 'Sedsalen peş',
                nextCentury: 'Sedsalen paş'
            },
            timePickerLocale: {
                placeholder: 'Demê hilbijêre'
            }
        },
        TimePicker: {
            placeholder: 'Demê hilbijêre'
        },
        Calendar: {
            lang: {
                placeholder: 'Dîrok hilbijêre',
                rangePlaceholder: ['Dîroka destpêkê', 'Dîroka dawîn'],
                locale: 'ku_IQ',
                today: 'Îro',
                now: 'Niha',
                backToToday: 'Vegere îro',
                ok: 'Temam',
                clear: 'Paqij bike',
                month: 'Meh',
                year: 'Sal',
                timeSelect: 'Demê hilbijêre',
                dateSelect: 'Dîrok hilbijêre',
                monthSelect: 'Meh hilbijêre',
                yearSelect: 'Sal hilbijêre',
                decadeSelect: 'Dehsal hilbijêre',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Meha peş (PageUp))',
                nextMonth: 'Meha paş (PageDown)',
                previousYear: 'Sala peş (Control + şep)',
                nextYear: 'Sala paş (Control + rast)',
                previousDecade: 'Dehsalen peş',
                nextDecade: 'Dehsalen paş',
                previousCentury: 'Sedsalen peş',
                nextCentury: 'Sedsalen paş'
            },
            timePickerLocale: {
                placeholder: 'Demê hilbijêre'
            }
        },
        Table: {
            filterTitle: 'Menuê peldanka',
            filterConfirm: 'Temam',
            filterReset: 'Jê bibe',
            selectAll: 'Hemî hilbijêre',
            selectInvert: 'Hilbijartinan veguhere'
        },
        Modal: {
            okText: 'Temam',
            cancelText: 'Betal ke',
            justOkText: 'Temam'
        },
        Popconfirm: {
            okText: 'Temam',
            cancelText: 'Betal ke'
        },
        Transfer: {
            searchPlaceholder: 'Lêgerîn',
            itemUnit: 'tişt',
            itemsUnit: 'tişt'
        },
        Upload: {
            uploading: 'Bardike...',
            removeFile: 'Pelê rabike',
            uploadError: 'Xeta barkirine',
            previewFile: 'Pelê pêşbibîne',
            downloadFile: 'Pelê dakêşin'
        },
        Empty: {
            description: 'Agahî tune'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/lv_LV.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var lv_LV = {
        locale: 'lv',
        Pagination: {
            items_per_page: '/ lappuse',
            jump_to: 'iet uz',
            jump_to_confirm: 'apstiprināt',
            page: '',
            prev_page: 'Iepriekšējā lapa',
            next_page: 'Nākamā lapaspuse',
            prev_5: 'Iepriekšējās 5 lapas',
            next_5: 'Nākamās 5 lapas',
            prev_3: 'Iepriekšējās 3 lapas',
            next_3: 'Nākamās 3 lapas'
        },
        DatePicker: {
            lang: {
                placeholder: 'Izvēlieties datumu',
                rangePlaceholder: ['Sākuma datums', 'Beigu datums'],
                locale: 'lv_LV',
                today: 'Šodien',
                now: 'Tagad',
                backToToday: 'Atpakaļ pie šodienas',
                ok: 'Ok',
                clear: 'Skaidrs',
                month: 'Mēnesis',
                year: 'Gads',
                timeSelect: 'Izvēlieties laiku',
                dateSelect: 'Izvēlieties datumu',
                monthSelect: 'Izvēlieties mēnesi',
                yearSelect: 'Izvēlieties gadu',
                decadeSelect: 'Izvēlieties desmit gadus',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Iepriekšējais mēnesis (PageUp)',
                nextMonth: 'Nākammēnes (PageDown)',
                previousYear: 'Pagājušais gads (Control + left)',
                nextYear: 'Nākamgad (Control + right)',
                previousDecade: 'Pēdējā desmitgadē',
                nextDecade: 'Nākamā desmitgade',
                previousCentury: 'Pagājušajā gadsimtā',
                nextCentury: 'Nākamajā gadsimtā'
            },
            timePickerLocale: {
                placeholder: 'Izvēlieties laiku'
            }
        },
        TimePicker: {
            placeholder: 'Izvēlieties laiku'
        },
        Calendar: {
            lang: {
                placeholder: 'Izvēlieties datumu',
                rangePlaceholder: ['Sākuma datums', 'Beigu datums'],
                locale: 'lv_LV',
                today: 'Šodien',
                now: 'Tagad',
                backToToday: 'Atpakaļ pie šodienas',
                ok: 'Ok',
                clear: 'Skaidrs',
                month: 'Mēnesis',
                year: 'Gads',
                timeSelect: 'Izvēlieties laiku',
                dateSelect: 'Izvēlieties datumu',
                monthSelect: 'Izvēlieties mēnesi',
                yearSelect: 'Izvēlieties gadu',
                decadeSelect: 'Izvēlieties desmit gadus',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Iepriekšējais mēnesis (PageUp)',
                nextMonth: 'Nākammēnes (PageDown)',
                previousYear: 'Pagājušais gads (Control + left)',
                nextYear: 'Nākamgad (Control + right)',
                previousDecade: 'Pēdējā desmitgadē',
                nextDecade: 'Nākamā desmitgade',
                previousCentury: 'Pagājušajā gadsimtā',
                nextCentury: 'Nākamajā gadsimtā'
            },
            timePickerLocale: {
                placeholder: 'Izvēlieties laiku'
            }
        },
        Table: {
            filterTitle: 'Filtrēšanas izvēlne',
            filterConfirm: 'OK',
            filterReset: 'Atiestatīt',
            selectAll: 'Atlasiet pašreizējo lapu',
            selectInvert: 'Pārvērst pašreizējo lapu'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Atcelt',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Atcelt'
        },
        Transfer: {
            searchPlaceholder: 'Meklēt šeit',
            itemUnit: 'vienumu',
            itemsUnit: 'vienumus'
        },
        Upload: {
            uploading: 'Augšupielāde...',
            removeFile: 'Noņemt failu',
            uploadError: 'Augšupielādes kļūda',
            previewFile: 'Priekšskatiet failu',
            downloadFile: 'Lejupielādēt failu'
        },
        Empty: {
            description: 'Nav datu'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/mn_MN.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var mn_MN = {
        locale: 'mn-mn',
        Pagination: {
            items_per_page: '/ хуудас',
            jump_to: 'Шилжих',
            jump_to_confirm: 'сонгох',
            page: '',
            prev_page: 'Өмнөх хуудас',
            next_page: 'Дараагийн хуудас',
            prev_5: 'Дараагийн 5 хуудас',
            next_5: 'Дараагийн 5 хуудас',
            prev_3: 'Дараагийн 3 хуудас',
            next_3: 'Дараагийн 3 хуудас'
        },
        DatePicker: {
            lang: {
                placeholder: 'Огноо сонгох',
                rangePlaceholder: ['Эхлэх огноо', 'Дуусах огноо'],
                locale: 'mn_MN',
                today: 'Өнөөдөр',
                now: 'Одоо',
                backToToday: 'Өнөөдөрлүү буцах',
                ok: 'Ok',
                clear: 'Цэвэрлэх',
                month: 'Сар',
                year: 'Жил',
                timeSelect: 'Цаг сонгох',
                dateSelect: 'Огноо сонгох',
                weekSelect: '7 хоног сонгох',
                monthSelect: 'Сар сонгох',
                yearSelect: 'Жил сонгох',
                decadeSelect: 'Арван сонгох',
                yearFormat: 'YYYY',
                dateFormat: 'YYYY/MM/DD',
                dayFormat: 'DD',
                dateTimeFormat: 'YYYY/MM/DD HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Өмнөх сар (PageUp)',
                nextMonth: 'Дараа сар (PageDown)',
                previousYear: 'Өмнөх жил (Control + left)',
                nextYear: 'Дараа жил (Control + right)',
                previousDecade: 'Өмнөх арван',
                nextDecade: 'Дараа арван',
                previousCentury: 'Өмнөх зуун',
                nextCentury: 'Дараа зуун'
            },
            timePickerLocale: {
                placeholder: 'Цаг сонгох'
            }
        },
        TimePicker: {
            placeholder: 'Цаг сонгох'
        },
        Calendar: {
            lang: {
                placeholder: 'Огноо сонгох',
                rangePlaceholder: ['Эхлэх огноо', 'Дуусах огноо'],
                locale: 'mn_MN',
                today: 'Өнөөдөр',
                now: 'Одоо',
                backToToday: 'Өнөөдөрлүү буцах',
                ok: 'Ok',
                clear: 'Цэвэрлэх',
                month: 'Сар',
                year: 'Жил',
                timeSelect: 'Цаг сонгох',
                dateSelect: 'Огноо сонгох',
                weekSelect: '7 хоног сонгох',
                monthSelect: 'Сар сонгох',
                yearSelect: 'Жил сонгох',
                decadeSelect: 'Арван сонгох',
                yearFormat: 'YYYY',
                dateFormat: 'YYYY/MM/DD',
                dayFormat: 'DD',
                dateTimeFormat: 'YYYY/MM/DD HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Өмнөх сар (PageUp)',
                nextMonth: 'Дараа сар (PageDown)',
                previousYear: 'Өмнөх жил (Control + left)',
                nextYear: 'Дараа жил (Control + right)',
                previousDecade: 'Өмнөх арван',
                nextDecade: 'Дараа арван',
                previousCentury: 'Өмнөх зуун',
                nextCentury: 'Дараа зуун'
            },
            timePickerLocale: {
                placeholder: 'Цаг сонгох'
            }
        },
        Table: {
            filterTitle: 'Хайх цэс',
            filterConfirm: 'OK',
            filterReset: 'Цэвэрлэх',
            selectAll: 'Бүгдийг сонгох',
            selectInvert: 'Бусдыг сонгох'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Цуцлах',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Цуцлах'
        },
        Transfer: {
            searchPlaceholder: 'Хайх',
            itemUnit: 'Зүйл',
            itemsUnit: 'Зүйлүүд'
        },
        Upload: {
            uploading: 'Хуулж байна...',
            removeFile: 'Файл устгах',
            uploadError: 'Хуулахад алдаа гарлаа',
            previewFile: 'Файлыг түргэн үзэх',
            downloadFile: 'Файлыг татах'
        },
        Empty: {
            description: 'Мэдээлэл байхгүй байна'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/ms_MY.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var ms_MY = {
        locale: 'ms-my',
        Pagination: {
            items_per_page: '/ halaman',
            jump_to: 'Lompat ke',
            jump_to_confirm: 'Sahkan',
            page: '',
            prev_page: 'Halaman sebelumnya',
            next_page: 'Halam seterusnya',
            prev_5: '5 halaman sebelum',
            next_5: '5 halaman seterusnya',
            prev_3: '3 halaman sebelumnya',
            next_3: '3 halaman seterusnya'
        },
        DatePicker: {
            lang: {
                placeholder: 'Pilih tarikh',
                rangePlaceholder: ['Tarikh mula', 'Tarikh akhir'],
                locale: 'ms_MY',
                today: 'Hari ini',
                now: 'Sekarang',
                backToToday: 'Kembali ke hari ini',
                ok: 'Ok',
                timeSelect: 'Pilih masa',
                dateSelect: 'Pilih tarikh',
                weekSelect: 'Pilih minggu',
                clear: 'Padam',
                month: 'Bulan',
                year: 'Tahun',
                previousMonth: 'Bulan lepas',
                nextMonth: 'Bulan depan',
                monthSelect: 'Pilih bulan',
                yearSelect: 'Pilih tahun',
                decadeSelect: 'Pilih dekad',
                yearFormat: 'YYYY',
                dayFormat: 'D',
                dateFormat: 'M/D/YYYY',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                previousYear: 'Tahun lepas (Ctrl+left)',
                nextYear: 'Tahun depan (Ctrl+right)',
                previousDecade: 'Dekad lepas',
                nextDecade: 'Dekad depan',
                previousCentury: 'Abad lepas',
                nextCentury: 'Abad depan'
            },
            timePickerLocale: {
                placeholder: 'Sila pilih masa'
            }
        },
        TimePicker: {
            placeholder: 'Sila pilih masa'
        },
        Calendar: {
            lang: {
                placeholder: 'Pilih tarikh',
                rangePlaceholder: ['Tarikh mula', 'Tarikh akhir'],
                locale: 'ms_MY',
                today: 'Hari ini',
                now: 'Sekarang',
                backToToday: 'Kembali ke hari ini',
                ok: 'Ok',
                timeSelect: 'Pilih masa',
                dateSelect: 'Pilih tarikh',
                weekSelect: 'Pilih minggu',
                clear: 'Padam',
                month: 'Bulan',
                year: 'Tahun',
                previousMonth: 'Bulan lepas',
                nextMonth: 'Bulan depan',
                monthSelect: 'Pilih bulan',
                yearSelect: 'Pilih tahun',
                decadeSelect: 'Pilih dekad',
                yearFormat: 'YYYY',
                dayFormat: 'D',
                dateFormat: 'M/D/YYYY',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                previousYear: 'Tahun lepas (Ctrl+left)',
                nextYear: 'Tahun depan (Ctrl+right)',
                previousDecade: 'Dekad lepas',
                nextDecade: 'Dekad depan',
                previousCentury: 'Abad lepas',
                nextCentury: 'Abad depan'
            },
            timePickerLocale: {
                placeholder: 'Sila pilih masa'
            }
        },
        global: {
            placeholder: 'Sila pilih'
        },
        PageHeader: {
            back: 'Kembali'
        },
        Text: {
            edit: 'Sunting',
            copy: 'Salin',
            copied: 'Berjaya menyalin',
            expand: 'Kembang'
        },
        Empty: {
            description: 'Tiada data'
        },
        Table: {
            filterTitle: 'Cari dengan tajuk',
            filterConfirm: 'Ok',
            filterReset: 'Menetapkan semula',
            emptyText: 'Tiada data',
            selectAll: 'Pilih semua',
            selectInvert: 'Terbalikkan'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Batal',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Batal'
        },
        Transfer: {
            notFoundContent: 'Tidak dijumpai',
            searchPlaceholder: 'Carian di sini',
            itemUnit: 'item',
            itemsUnit: 'item'
        },
        Icon: {
            icon: 'ikon'
        },
        Select: {
            notFoundContent: 'Tidak Dijumpai'
        },
        Upload: {
            uploading: 'Sedang memuat naik...',
            removeFile: 'Buang fail',
            uploadError: 'Masalah muat naik',
            previewFile: 'Tengok fail',
            downloadFile: 'Muat turun fail'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/nb_NO.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var nb_NO = {
        locale: 'nb',
        DatePicker: {
            lang: {
                placeholder: 'Velg dato',
                rangePlaceholder: ['Startdato', 'Sluttdato'],
                locale: 'nb_NO',
                today: 'I dag',
                now: 'Nå',
                backToToday: 'Gå til i dag',
                ok: 'Ok',
                clear: 'Annuller',
                month: 'Måned',
                year: 'År',
                timeSelect: 'Velg tidspunkt',
                dateSelect: 'Velg dato',
                monthSelect: 'Velg måned',
                yearSelect: 'Velg år',
                decadeSelect: 'Velg årti',
                yearFormat: 'YYYY',
                dateFormat: 'DD.MM.YYYY',
                dayFormat: 'DD',
                dateTimeFormat: 'DD.MM.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Forrige måned(PageUp)',
                nextMonth: 'Neste måned (PageDown)',
                previousYear: 'Forrige år (Control + left)',
                nextYear: 'Neste år (Control + right)',
                previousDecade: 'Forrige tiår',
                nextDecade: 'Neste tiår',
                previousCentury: 'Forrige århundre',
                nextCentury: 'Neste århundre'
            },
            timePickerLocale: {
                placeholder: 'Velg tid'
            }
        },
        TimePicker: {
            placeholder: 'Velg tid'
        },
        Calendar: {
            lang: {
                placeholder: 'Velg dato',
                rangePlaceholder: ['Startdato', 'Sluttdato'],
                locale: 'nb_NO',
                today: 'I dag',
                now: 'Nå',
                backToToday: 'Gå til i dag',
                ok: 'Ok',
                clear: 'Annuller',
                month: 'Måned',
                year: 'År',
                timeSelect: 'Velg tidspunkt',
                dateSelect: 'Velg dato',
                monthSelect: 'Velg måned',
                yearSelect: 'Velg år',
                decadeSelect: 'Velg årti',
                yearFormat: 'YYYY',
                dateFormat: 'DD.MM.YYYY',
                dayFormat: 'DD',
                dateTimeFormat: 'DD.MM.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Forrige måned(PageUp)',
                nextMonth: 'Neste måned (PageDown)',
                previousYear: 'Forrige år (Control + left)',
                nextYear: 'Neste år (Control + right)',
                previousDecade: 'Forrige tiår',
                nextDecade: 'Neste tiår',
                previousCentury: 'Forrige århundre',
                nextCentury: 'Neste århundre'
            },
            timePickerLocale: {
                placeholder: 'Velg tid'
            }
        },
        Pagination: {
            items_per_page: '/ side',
            jump_to: 'Gå til side',
            page: '',
            prev_page: 'Forrige side',
            next_page: 'Neste side',
            prev_5: '5 forrige',
            next_5: '5 neste',
            prev_3: '3 forrige',
            next_3: '3 neste'
        },
        Table: {
            filterTitle: 'Filtermeny',
            filterConfirm: 'OK',
            filterReset: 'Nullstill',
            selectAll: 'Velg alle',
            selectInvert: 'Inverter valg'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Avbryt',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Avbryt'
        },
        Transfer: {
            searchPlaceholder: 'Søk her',
            itemUnit: 'element',
            itemsUnit: 'elementer'
        },
        Upload: {
            uploading: 'Laster opp...',
            removeFile: 'Fjern fil',
            uploadError: 'Feil ved opplastning',
            previewFile: 'Forhåndsvisning',
            downloadFile: 'Last ned fil'
        },
        Empty: {
            description: 'Ingen data'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/ne_NP.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var ne_NP = {
        locale: 'ne-np',
        Pagination: {
            items_per_page: '/ page',
            jump_to: 'Go to',
            jump_to_confirm: 'confirm',
            page: '',
            prev_page: 'Previous Page',
            next_page: 'Next Page',
            prev_5: 'Previous 5 Pages',
            next_5: 'Next 5 Pages',
            prev_3: 'Previous 3 Pages',
            next_3: 'Next 3 Pages'
        },
        DatePicker: {
            lang: {
                placeholder: 'Select date',
                yearPlaceholder: 'Select year',
                quarterPlaceholder: 'Select quarter',
                monthPlaceholder: 'Select month',
                weekPlaceholder: 'Select week',
                rangePlaceholder: ['Start date', 'End date'],
                rangeYearPlaceholder: ['Start year', 'End year'],
                rangeMonthPlaceholder: ['Start month', 'End month'],
                rangeWeekPlaceholder: ['Start week', 'End week'],
                locale: 'en_US',
                today: 'Today',
                now: 'Now',
                backToToday: 'Back to today',
                ok: 'Ok',
                clear: 'Clear',
                month: 'Month',
                year: 'Year',
                timeSelect: 'select time',
                dateSelect: 'select date',
                weekSelect: 'Choose a week',
                monthSelect: 'Choose a month',
                yearSelect: 'Choose a year',
                decadeSelect: 'Choose a decade',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Previous month (PageUp)',
                nextMonth: 'Next month (PageDown)',
                previousYear: 'Last year (Control + left)',
                nextYear: 'Next year (Control + right)',
                previousDecade: 'Last decade',
                nextDecade: 'Next decade',
                previousCentury: 'Last century',
                nextCentury: 'Next century'
            },
            timePickerLocale: {
                placeholder: 'Select time',
                rangePlaceholder: ['Start time', 'End time']
            }
        },
        TimePicker: {
            placeholder: 'Select time',
            rangePlaceholder: ['Start time', 'End time']
        },
        Calendar: {
            lang: {
                placeholder: 'Select date',
                yearPlaceholder: 'Select year',
                quarterPlaceholder: 'Select quarter',
                monthPlaceholder: 'Select month',
                weekPlaceholder: 'Select week',
                rangePlaceholder: ['Start date', 'End date'],
                rangeYearPlaceholder: ['Start year', 'End year'],
                rangeMonthPlaceholder: ['Start month', 'End month'],
                rangeWeekPlaceholder: ['Start week', 'End week'],
                locale: 'en_US',
                today: 'Today',
                now: 'Now',
                backToToday: 'Back to today',
                ok: 'Ok',
                clear: 'Clear',
                month: 'Month',
                year: 'Year',
                timeSelect: 'select time',
                dateSelect: 'select date',
                weekSelect: 'Choose a week',
                monthSelect: 'Choose a month',
                yearSelect: 'Choose a year',
                decadeSelect: 'Choose a decade',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Previous month (PageUp)',
                nextMonth: 'Next month (PageDown)',
                previousYear: 'Last year (Control + left)',
                nextYear: 'Next year (Control + right)',
                previousDecade: 'Last decade',
                nextDecade: 'Next decade',
                previousCentury: 'Last century',
                nextCentury: 'Next century'
            },
            timePickerLocale: {
                placeholder: 'Select time',
                rangePlaceholder: ['Start time', 'End time']
            }
        },
        Table: {
            filterTitle: 'फिल्टर मेनु',
            filterConfirm: 'हो',
            filterReset: 'रीसेट',
            selectAll: 'सबै छान्नुुहोस्',
            selectInvert: 'छनौट उल्टाउनुहोस'
        },
        Modal: {
            okText: 'हो',
            cancelText: 'होईन',
            justOkText: 'हो'
        },
        Popconfirm: {
            okText: 'हो',
            cancelText: 'होईन'
        },
        Transfer: {
            titles: ['', ''],
            searchPlaceholder: 'यहाँ खोज्नुहोस्',
            itemUnit: 'वस्तु',
            itemsUnit: 'वस्तुहरू'
        },
        Upload: {
            uploading: 'अपलोड गर्दै...',
            removeFile: 'फाइल हटाउनुहोस्',
            uploadError: 'अप्लोडमा समस्या भयो',
            previewFile: 'फाइल पूर्वावलोकन गर्नुहोस्',
            downloadFile: 'डाउनलोड फाइल'
        },
        Empty: {
            description: 'डाटा छैन'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/nl_BE.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var nl_BE = {
        locale: 'nl-be',
        Pagination: {
            items_per_page: '/ pagina',
            jump_to: 'Ga naar',
            jump_to_confirm: 'bevestigen',
            page: '',
            prev_page: 'Vorige pagina',
            next_page: 'Volgende pagina',
            prev_5: "Vorige 5 pagina's",
            next_5: "Volgende 5 pagina's",
            prev_3: "Vorige 3 pagina's",
            next_3: "Volgende 3 pagina's"
        },
        DatePicker: {
            lang: {
                placeholder: 'Selecteer datum',
                rangePlaceholder: ['Begin datum', 'Eind datum'],
                locale: 'nl_BE',
                today: 'Vandaag',
                now: 'Nu',
                backToToday: 'Terug naar vandaag',
                ok: 'Ok',
                clear: 'Reset',
                month: 'Maand',
                year: 'Jaar',
                timeSelect: 'Selecteer tijd',
                dateSelect: 'Selecteer datum',
                monthSelect: 'Kies een maand',
                yearSelect: 'Kies een jaar',
                decadeSelect: 'Kies een decennium',
                yearFormat: 'YYYY',
                dateFormat: 'D-M-YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D-M-YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Vorige maand (PageUp)',
                nextMonth: 'Volgende maand (PageDown)',
                previousYear: 'Vorig jaar (Control + left)',
                nextYear: 'Volgend jaar (Control + right)',
                previousDecade: 'Vorig decennium',
                nextDecade: 'Volgend decennium',
                previousCentury: 'Vorige eeuw',
                nextCentury: 'Volgende eeuw'
            },
            timePickerLocale: {
                placeholder: 'Selecteer tijd'
            }
        },
        TimePicker: {
            placeholder: 'Selecteer tijd'
        },
        Calendar: {
            lang: {
                placeholder: 'Selecteer datum',
                rangePlaceholder: ['Begin datum', 'Eind datum'],
                locale: 'nl_BE',
                today: 'Vandaag',
                now: 'Nu',
                backToToday: 'Terug naar vandaag',
                ok: 'Ok',
                clear: 'Reset',
                month: 'Maand',
                year: 'Jaar',
                timeSelect: 'Selecteer tijd',
                dateSelect: 'Selecteer datum',
                monthSelect: 'Kies een maand',
                yearSelect: 'Kies een jaar',
                decadeSelect: 'Kies een decennium',
                yearFormat: 'YYYY',
                dateFormat: 'D-M-YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D-M-YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Vorige maand (PageUp)',
                nextMonth: 'Volgende maand (PageDown)',
                previousYear: 'Vorig jaar (Control + left)',
                nextYear: 'Volgend jaar (Control + right)',
                previousDecade: 'Vorig decennium',
                nextDecade: 'Volgend decennium',
                previousCentury: 'Vorige eeuw',
                nextCentury: 'Volgende eeuw'
            },
            timePickerLocale: {
                placeholder: 'Selecteer tijd'
            }
        },
        Table: {
            filterTitle: 'FilterMenu',
            filterConfirm: 'OK',
            filterReset: 'Reset',
            selectAll: 'Selecteer huidige pagina',
            selectInvert: 'Selecteer huidige pagina'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Annuleer',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Annuleer'
        },
        Transfer: {
            searchPlaceholder: 'Zoek hier',
            itemUnit: 'item',
            itemsUnit: 'items'
        },
        Upload: {
            uploading: 'Uploaden...',
            removeFile: 'Bestand verwijderen',
            uploadError: 'Upload fout',
            previewFile: 'Preview bestand',
            downloadFile: 'Download bestand'
        },
        Empty: {
            description: 'Geen gegevens'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/nl_NL.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var nl_NL = {
        locale: 'nl',
        Pagination: {
            items_per_page: '/ pagina',
            jump_to: 'Ga naar',
            jump_to_confirm: 'bevestigen',
            page: '',
            prev_page: 'Vorige pagina',
            next_page: 'Volgende pagina',
            prev_5: "Vorige 5 pagina's",
            next_5: "Volgende 5 pagina's",
            prev_3: "Vorige 3 pagina's",
            next_3: "Volgende 3 pagina's"
        },
        DatePicker: {
            lang: {
                placeholder: 'Selecteer datum',
                rangePlaceholder: ['Begin datum', 'Eind datum'],
                locale: 'nl_NL',
                today: 'Vandaag',
                now: 'Nu',
                backToToday: 'Terug naar vandaag',
                ok: 'Ok',
                clear: 'Reset',
                month: 'Maand',
                year: 'Jaar',
                timeSelect: 'Selecteer tijd',
                dateSelect: 'Selecteer datum',
                monthSelect: 'Kies een maand',
                yearSelect: 'Kies een jaar',
                decadeSelect: 'Kies een decennium',
                yearFormat: 'YYYY',
                dateFormat: 'D-M-YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D-M-YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Vorige maand (PageUp)',
                nextMonth: 'Volgende maand (PageDown)',
                previousYear: 'Vorig jaar (Control + left)',
                nextYear: 'Volgend jaar (Control + right)',
                previousDecade: 'Vorig decennium',
                nextDecade: 'Volgend decennium',
                previousCentury: 'Vorige eeuw',
                nextCentury: 'Volgende eeuw'
            },
            timePickerLocale: {
                placeholder: 'Selecteer tijd'
            }
        },
        TimePicker: {
            placeholder: 'Selecteer tijd'
        },
        Calendar: {
            lang: {
                placeholder: 'Selecteer datum',
                rangePlaceholder: ['Begin datum', 'Eind datum'],
                locale: 'nl_NL',
                today: 'Vandaag',
                now: 'Nu',
                backToToday: 'Terug naar vandaag',
                ok: 'Ok',
                clear: 'Reset',
                month: 'Maand',
                year: 'Jaar',
                timeSelect: 'Selecteer tijd',
                dateSelect: 'Selecteer datum',
                monthSelect: 'Kies een maand',
                yearSelect: 'Kies een jaar',
                decadeSelect: 'Kies een decennium',
                yearFormat: 'YYYY',
                dateFormat: 'D-M-YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D-M-YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Vorige maand (PageUp)',
                nextMonth: 'Volgende maand (PageDown)',
                previousYear: 'Vorig jaar (Control + left)',
                nextYear: 'Volgend jaar (Control + right)',
                previousDecade: 'Vorig decennium',
                nextDecade: 'Volgend decennium',
                previousCentury: 'Vorige eeuw',
                nextCentury: 'Volgende eeuw'
            },
            timePickerLocale: {
                placeholder: 'Selecteer tijd'
            }
        },
        global: {
            placeholder: 'Maak een selectie'
        },
        Table: {
            filterTitle: 'Filteren',
            filterConfirm: 'OK',
            filterReset: 'Reset',
            selectAll: 'Selecteer huidige pagina',
            selectInvert: 'Deselecteer huidige pagina',
            sortTitle: 'Sorteren',
            expand: 'Rij uitklappen',
            collapse: 'Rij inklappen'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Annuleren',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Annuleren'
        },
        Transfer: {
            titles: ['', ''],
            searchPlaceholder: 'Zoeken',
            itemUnit: 'item',
            itemsUnit: 'items'
        },
        Upload: {
            uploading: 'Uploaden...',
            removeFile: 'Verwijder bestand',
            uploadError: 'Fout tijdens uploaden',
            previewFile: 'Bekijk bestand',
            downloadFile: 'Downloaden bestand'
        },
        Empty: {
            description: 'Geen gegevens'
        },
        Icon: {
            icon: 'icoon'
        },
        Text: {
            edit: 'Bewerken',
            copy: 'Kopieren',
            copied: 'Gekopieerd',
            expand: 'Uitklappen'
        },
        PageHeader: {
            back: 'Terug'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/pl_PL.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var pl_PL = {
        locale: 'pl',
        Pagination: {
            items_per_page: '/ stronę',
            jump_to: 'Idź do',
            jump_to_confirm: 'potwierdzać',
            page: '',
            prev_page: 'Poprzednia strona',
            next_page: 'Następna strona',
            prev_5: 'Poprzednie 5 stron',
            next_5: 'Następne 5 stron',
            prev_3: 'Poprzednie 3 strony',
            next_3: 'Następne 3 strony'
        },
        DatePicker: {
            lang: {
                placeholder: 'Wybierz datę',
                rangePlaceholder: ['Data początkowa', 'Data końcowa'],
                locale: 'pl_PL',
                today: 'Dzisiaj',
                now: 'Teraz',
                backToToday: 'Ustaw dzisiaj',
                ok: 'Ok',
                clear: 'Wyczyść',
                month: 'Miesiąc',
                year: 'Rok',
                timeSelect: 'Ustaw czas',
                dateSelect: 'Ustaw datę',
                monthSelect: 'Wybierz miesiąc',
                yearSelect: 'Wybierz rok',
                decadeSelect: 'Wybierz dekadę',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Poprzedni miesiąc (PageUp)',
                nextMonth: 'Następny miesiąc (PageDown)',
                previousYear: 'Ostatni rok (Ctrl + left)',
                nextYear: 'Następny rok (Ctrl + right)',
                previousDecade: 'Ostatnia dekada',
                nextDecade: 'Następna dekada',
                previousCentury: 'Ostatni wiek',
                nextCentury: 'Następny wiek'
            },
            timePickerLocale: {
                placeholder: 'Wybierz godzinę'
            }
        },
        TimePicker: {
            placeholder: 'Wybierz godzinę'
        },
        Calendar: {
            lang: {
                placeholder: 'Wybierz datę',
                rangePlaceholder: ['Data początkowa', 'Data końcowa'],
                locale: 'pl_PL',
                today: 'Dzisiaj',
                now: 'Teraz',
                backToToday: 'Ustaw dzisiaj',
                ok: 'Ok',
                clear: 'Wyczyść',
                month: 'Miesiąc',
                year: 'Rok',
                timeSelect: 'Ustaw czas',
                dateSelect: 'Ustaw datę',
                monthSelect: 'Wybierz miesiąc',
                yearSelect: 'Wybierz rok',
                decadeSelect: 'Wybierz dekadę',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Poprzedni miesiąc (PageUp)',
                nextMonth: 'Następny miesiąc (PageDown)',
                previousYear: 'Ostatni rok (Ctrl + left)',
                nextYear: 'Następny rok (Ctrl + right)',
                previousDecade: 'Ostatnia dekada',
                nextDecade: 'Następna dekada',
                previousCentury: 'Ostatni wiek',
                nextCentury: 'Następny wiek'
            },
            timePickerLocale: {
                placeholder: 'Wybierz godzinę'
            }
        },
        Table: {
            filterTitle: 'Menu filtra',
            filterConfirm: 'OK',
            filterReset: 'Wyczyść',
            selectAll: 'Zaznacz bieżącą stronę',
            selectInvert: 'Odwróć zaznaczenie'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Anuluj',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Anuluj'
        },
        Transfer: {
            searchPlaceholder: 'Szukaj',
            itemUnit: 'obiekt',
            itemsUnit: 'obiekty'
        },
        Upload: {
            uploading: 'Wysyłanie...',
            removeFile: 'Usuń plik',
            uploadError: 'Błąd wysyłania',
            previewFile: 'Podejrzyj plik',
            downloadFile: 'Pobieranie pliku'
        },
        Empty: {
            description: 'Brak danych'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/pt_BR.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var pt_BR = {
        locale: 'pt-br',
        Pagination: {
            items_per_page: '/ página',
            jump_to: 'Vá até',
            jump_to_confirm: 'confirme',
            page: '',
            prev_page: 'Página anterior',
            next_page: 'Próxima página',
            prev_5: '5 páginas anteriores',
            next_5: '5 próximas páginas',
            prev_3: '3 páginas anteriores',
            next_3: '3 próximas páginas'
        },
        DatePicker: {
            lang: {
                placeholder: 'Selecionar data',
                rangePlaceholder: ['Data inicial', 'Data final'],
                locale: 'pt_BR',
                today: 'Hoje',
                now: 'Agora',
                backToToday: 'Voltar para hoje',
                ok: 'Ok',
                clear: 'Limpar',
                month: 'Mês',
                year: 'Ano',
                timeSelect: 'Selecionar hora',
                dateSelect: 'Selecionar data',
                monthSelect: 'Escolher mês',
                yearSelect: 'Escolher ano',
                decadeSelect: 'Escolher década',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: false,
                previousMonth: 'Mês anterior (PageUp)',
                nextMonth: 'Próximo mês (PageDown)',
                previousYear: 'Ano anterior (Control + esquerda)',
                nextYear: 'Próximo ano (Control + direita)',
                previousDecade: 'Década anterior',
                nextDecade: 'Próxima década',
                previousCentury: 'Século anterior',
                nextCentury: 'Próximo século'
            },
            timePickerLocale: {
                placeholder: 'Hora'
            }
        },
        TimePicker: {
            placeholder: 'Hora'
        },
        Calendar: {
            lang: {
                placeholder: 'Selecionar data',
                rangePlaceholder: ['Data inicial', 'Data final'],
                locale: 'pt_BR',
                today: 'Hoje',
                now: 'Agora',
                backToToday: 'Voltar para hoje',
                ok: 'Ok',
                clear: 'Limpar',
                month: 'Mês',
                year: 'Ano',
                timeSelect: 'Selecionar hora',
                dateSelect: 'Selecionar data',
                monthSelect: 'Escolher mês',
                yearSelect: 'Escolher ano',
                decadeSelect: 'Escolher década',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: false,
                previousMonth: 'Mês anterior (PageUp)',
                nextMonth: 'Próximo mês (PageDown)',
                previousYear: 'Ano anterior (Control + esquerda)',
                nextYear: 'Próximo ano (Control + direita)',
                previousDecade: 'Década anterior',
                nextDecade: 'Próxima década',
                previousCentury: 'Século anterior',
                nextCentury: 'Próximo século'
            },
            timePickerLocale: {
                placeholder: 'Hora'
            }
        },
        Table: {
            filterTitle: 'Filtro',
            filterConfirm: 'OK',
            filterReset: 'Resetar',
            selectAll: 'Selecionar página atual',
            selectInvert: 'Inverter seleção'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Cancelar',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Cancelar'
        },
        Transfer: {
            searchPlaceholder: 'Procurar',
            itemUnit: 'item',
            itemsUnit: 'items'
        },
        Upload: {
            uploading: 'Enviando...',
            removeFile: 'Remover arquivo',
            uploadError: 'Erro no envio',
            previewFile: 'Visualizar arquivo',
            downloadFile: 'Baixar arquivo'
        },
        Empty: {
            description: 'Não há dados'
        },
        Text: {
            edit: 'editar',
            copy: 'copiar',
            copied: 'copiado',
            expand: 'expandir'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/pt_PT.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var pt_PT = {
        locale: 'pt',
        Pagination: {
            items_per_page: '/ página',
            jump_to: 'Saltar',
            jump_to_confirm: 'confirmar',
            page: '',
            prev_page: 'Página Anterior',
            next_page: 'Página Seguinte',
            prev_5: 'Recuar 5 Páginas',
            next_5: 'Avançar 5 Páginas',
            prev_3: 'Recuar 3 Páginas',
            next_3: 'Avançar 3 Páginas'
        },
        DatePicker: {
            lang: {
                locale: 'pt_PT',
                today: 'Hoje',
                now: 'Agora',
                backToToday: 'Hoje',
                ok: 'Ok',
                clear: 'Limpar',
                month: 'Mês',
                year: 'Ano',
                timeSelect: 'Hora',
                dateSelect: 'Selecionar data',
                monthSelect: 'Selecionar mês',
                yearSelect: 'Selecionar ano',
                decadeSelect: 'Selecionar década',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: false,
                previousMonth: 'Mês anterior (PageUp)',
                nextMonth: 'Mês seguinte (PageDown)',
                previousYear: 'Ano anterior (Control + left)',
                nextYear: 'Ano seguinte (Control + right)',
                previousDecade: 'Última década',
                nextDecade: 'Próxima década',
                previousCentury: 'Último século',
                nextCentury: 'Próximo século',
                placeholder: 'Data',
                rangePlaceholder: ['Data inicial', 'Data final'],
                monthFormat: 'MMMM'
            },
            timePickerLocale: {
                placeholder: 'Hora'
            }
        },
        TimePicker: {
            placeholder: 'Hora'
        },
        Calendar: {
            lang: {
                locale: 'pt_PT',
                today: 'Hoje',
                now: 'Agora',
                backToToday: 'Hoje',
                ok: 'Ok',
                clear: 'Limpar',
                month: 'Mês',
                year: 'Ano',
                timeSelect: 'Hora',
                dateSelect: 'Selecionar data',
                monthSelect: 'Selecionar mês',
                yearSelect: 'Selecionar ano',
                decadeSelect: 'Selecionar década',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: false,
                previousMonth: 'Mês anterior (PageUp)',
                nextMonth: 'Mês seguinte (PageDown)',
                previousYear: 'Ano anterior (Control + left)',
                nextYear: 'Ano seguinte (Control + right)',
                previousDecade: 'Última década',
                nextDecade: 'Próxima década',
                previousCentury: 'Último século',
                nextCentury: 'Próximo século',
                placeholder: 'Data',
                rangePlaceholder: ['Data inicial', 'Data final'],
                monthFormat: 'MMMM'
            },
            timePickerLocale: {
                placeholder: 'Hora'
            }
        },
        Table: {
            filterTitle: 'Filtro',
            filterConfirm: 'Aplicar',
            filterReset: 'Reiniciar',
            selectAll: 'Selecionar página atual',
            selectInvert: 'Inverter seleção',
            sortTitle: 'Ordenação'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Cancelar',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Cancelar'
        },
        Transfer: {
            searchPlaceholder: 'Procurar...',
            itemUnit: 'item',
            itemsUnit: 'itens'
        },
        Upload: {
            uploading: 'A carregar...',
            removeFile: 'Remover',
            uploadError: 'Erro ao carregar',
            previewFile: 'Pré-visualizar',
            downloadFile: 'Baixar'
        },
        Empty: {
            description: 'Sem resultados'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/ro_RO.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var ro_RO = {
        locale: 'ro',
        Pagination: {
            items_per_page: '/ pagină',
            jump_to: 'Mergi la',
            jump_to_confirm: 'confirm',
            page: '',
            prev_page: 'Pagina Anterioară',
            next_page: 'Pagina Următoare',
            prev_5: '5 Pagini Anterioare',
            next_5: '5 Pagini Următoare',
            prev_3: '3 Pagini Anterioare',
            next_3: '3 Pagini Următoare'
        },
        DatePicker: {
            lang: {
                placeholder: 'Selectează data',
                rangePlaceholder: ['Data start', 'Data sfârșit'],
                locale: 'ro_RO',
                today: 'Azi',
                now: 'Acum',
                backToToday: 'Înapoi la azi',
                ok: 'Ok',
                clear: 'Șterge',
                month: 'Lună',
                year: 'An',
                timeSelect: 'selectează timpul',
                dateSelect: 'selectează data',
                weekSelect: 'Alege o săptămână',
                monthSelect: 'Alege o lună',
                yearSelect: 'Alege un an',
                decadeSelect: 'Alege un deceniu',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Luna anterioară (PageUp)',
                nextMonth: 'Luna următoare (PageDown)',
                previousYear: 'Anul anterior (Control + stânga)',
                nextYear: 'Anul următor (Control + dreapta)',
                previousDecade: 'Deceniul anterior',
                nextDecade: 'Deceniul următor',
                previousCentury: 'Secolul anterior',
                nextCentury: 'Secolul următor'
            },
            timePickerLocale: {
                placeholder: 'Selectează ora'
            }
        },
        TimePicker: {
            placeholder: 'Selectează ora'
        },
        Calendar: {
            lang: {
                placeholder: 'Selectează data',
                rangePlaceholder: ['Data start', 'Data sfârșit'],
                locale: 'ro_RO',
                today: 'Azi',
                now: 'Acum',
                backToToday: 'Înapoi la azi',
                ok: 'Ok',
                clear: 'Șterge',
                month: 'Lună',
                year: 'An',
                timeSelect: 'selectează timpul',
                dateSelect: 'selectează data',
                weekSelect: 'Alege o săptămână',
                monthSelect: 'Alege o lună',
                yearSelect: 'Alege un an',
                decadeSelect: 'Alege un deceniu',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Luna anterioară (PageUp)',
                nextMonth: 'Luna următoare (PageDown)',
                previousYear: 'Anul anterior (Control + stânga)',
                nextYear: 'Anul următor (Control + dreapta)',
                previousDecade: 'Deceniul anterior',
                nextDecade: 'Deceniul următor',
                previousCentury: 'Secolul anterior',
                nextCentury: 'Secolul următor'
            },
            timePickerLocale: {
                placeholder: 'Selectează ora'
            }
        },
        global: {
            placeholder: 'Selectează'
        },
        Table: {
            filterTitle: 'Filtrează',
            filterConfirm: 'OK',
            filterReset: 'Resetează',
            selectAll: 'Selectează pagina curentă',
            selectInvert: 'Inversează pagina curentă',
            sortTitle: 'Ordonează',
            expand: 'Extinde rândul',
            collapse: 'Micșorează rândul'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Anulare',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Anulare'
        },
        Transfer: {
            titles: ['', ''],
            searchPlaceholder: 'Căutare',
            itemUnit: 'element',
            itemsUnit: 'elemente'
        },
        Upload: {
            uploading: 'Se transferă...',
            removeFile: 'Înlătură fișierul',
            uploadError: 'Eroare la upload',
            previewFile: 'Previzualizare fișier',
            downloadFile: 'Descărcare fișier'
        },
        Empty: {
            description: 'Fără date'
        },
        Icon: {
            icon: 'icon'
        },
        Text: {
            edit: 'editează',
            copy: 'copiază',
            copied: 'copiat',
            expand: 'extinde'
        },
        PageHeader: {
            back: 'înapoi'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/ru_RU.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var ru_RU = {
        locale: 'ru',
        Pagination: {
            items_per_page: '/ стр.',
            jump_to: 'Перейти',
            jump_to_confirm: 'подтвердить',
            page: '',
            prev_page: 'Назад',
            next_page: 'Вперед',
            prev_5: 'Предыдущие 5',
            next_5: 'Следующие 5',
            prev_3: 'Предыдущие 3',
            next_3: 'Следующие 3'
        },
        DatePicker: {
            lang: {
                placeholder: 'Выберите дату',
                rangePlaceholder: ['Начальная дата', 'Конечная дата'],
                locale: 'ru_RU',
                today: 'Сегодня',
                now: 'Сейчас',
                backToToday: 'Текущая дата',
                ok: 'Ok',
                clear: 'Очистить',
                month: 'Месяц',
                year: 'Год',
                timeSelect: 'Выбрать время',
                dateSelect: 'Выбрать дату',
                monthSelect: 'Выбрать месяц',
                yearSelect: 'Выбрать год',
                decadeSelect: 'Выбрать десятилетие',
                yearFormat: 'YYYY',
                dateFormat: 'D-M-YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D-M-YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Предыдущий месяц (PageUp)',
                nextMonth: 'Следующий месяц (PageDown)',
                previousYear: 'Предыдущий год (Control + left)',
                nextYear: 'Следующий год (Control + right)',
                previousDecade: 'Предыдущее десятилетие',
                nextDecade: 'Следущее десятилетие',
                previousCentury: 'Предыдущий век',
                nextCentury: 'Следующий век'
            },
            timePickerLocale: {
                placeholder: 'Выберите время'
            }
        },
        TimePicker: {
            placeholder: 'Выберите время'
        },
        Calendar: {
            lang: {
                placeholder: 'Выберите дату',
                rangePlaceholder: ['Начальная дата', 'Конечная дата'],
                locale: 'ru_RU',
                today: 'Сегодня',
                now: 'Сейчас',
                backToToday: 'Текущая дата',
                ok: 'Ok',
                clear: 'Очистить',
                month: 'Месяц',
                year: 'Год',
                timeSelect: 'Выбрать время',
                dateSelect: 'Выбрать дату',
                monthSelect: 'Выбрать месяц',
                yearSelect: 'Выбрать год',
                decadeSelect: 'Выбрать десятилетие',
                yearFormat: 'YYYY',
                dateFormat: 'D-M-YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D-M-YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Предыдущий месяц (PageUp)',
                nextMonth: 'Следующий месяц (PageDown)',
                previousYear: 'Предыдущий год (Control + left)',
                nextYear: 'Следующий год (Control + right)',
                previousDecade: 'Предыдущее десятилетие',
                nextDecade: 'Следущее десятилетие',
                previousCentury: 'Предыдущий век',
                nextCentury: 'Следующий век'
            },
            timePickerLocale: {
                placeholder: 'Выберите время'
            }
        },
        global: {
            placeholder: 'Пожалуйста выберите'
        },
        Table: {
            filterTitle: 'Фильтр',
            filterConfirm: 'OK',
            filterReset: 'Сбросить',
            selectAll: 'Выбрать всё',
            selectInvert: 'Инвертировать выбор',
            sortTitle: 'Сортировка',
            expand: 'Развернуть строку',
            collapse: 'Свернуть строку',
            triggerDesc: 'Нажмите для сортировки по убыванию',
            triggerAsc: 'Нажмите для сортировки по возрастанию',
            cancelSort: 'Нажмите, чтобы отменить сортировку'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Отмена',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Отмена'
        },
        Transfer: {
            searchPlaceholder: 'Поиск',
            itemUnit: 'элем.',
            itemsUnit: 'элем.'
        },
        Upload: {
            uploading: 'Загрузка...',
            removeFile: 'Удалить файл',
            uploadError: 'При загрузке произошла ошибка',
            previewFile: 'Предпросмотр файла',
            downloadFile: 'Загрузить файл'
        },
        Empty: {
            description: 'Нет данных'
        },
        Icon: {
            icon: 'иконка'
        },
        Text: {
            edit: 'редактировать',
            copy: 'копировать',
            copied: 'скопировано',
            expand: 'раскрыть'
        },
        PageHeader: {
            back: 'назад'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/sk_SK.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var sk_SK = {
        locale: 'sk',
        Pagination: {
            items_per_page: '/ strana',
            jump_to: 'Choď na',
            jump_to_confirm: 'potvrdit',
            page: '',
            prev_page: 'Predchádzajúca strana',
            next_page: 'Nasledujúca strana',
            prev_5: 'Predchádzajúcich 5 strán',
            next_5: 'Nasledujúcich 5 strán',
            prev_3: 'Predchádzajúce 3 strany',
            next_3: 'Nasledujúce 3 strany'
        },
        DatePicker: {
            lang: {
                placeholder: 'Vybrať dátum',
                rangePlaceholder: ['Od', 'Do'],
                locale: 'sk_SK',
                today: 'Dnes',
                now: 'Teraz',
                backToToday: 'Späť na dnes',
                ok: 'Ok',
                clear: 'Vymazať',
                month: 'Mesiac',
                year: 'Rok',
                timeSelect: 'Vybrať čas',
                dateSelect: 'Vybrať dátum',
                monthSelect: 'Vybrať mesiac',
                yearSelect: 'Vybrať rok',
                decadeSelect: 'Vybrať dekádu',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Predchádzajúci mesiac (PageUp)',
                nextMonth: 'Nasledujúci mesiac (PageDown)',
                previousYear: 'Predchádzajúci rok (Control + left)',
                nextYear: 'Nasledujúci rok (Control + right)',
                previousDecade: 'Predchádzajúca dekáda',
                nextDecade: 'Nasledujúca dekáda',
                previousCentury: 'Predchádzajúce storočie',
                nextCentury: 'Nasledujúce storočie'
            },
            timePickerLocale: {
                placeholder: 'Vybrať čas'
            }
        },
        TimePicker: {
            placeholder: 'Vybrať čas'
        },
        Calendar: {
            lang: {
                placeholder: 'Vybrať dátum',
                rangePlaceholder: ['Od', 'Do'],
                locale: 'sk_SK',
                today: 'Dnes',
                now: 'Teraz',
                backToToday: 'Späť na dnes',
                ok: 'Ok',
                clear: 'Vymazať',
                month: 'Mesiac',
                year: 'Rok',
                timeSelect: 'Vybrať čas',
                dateSelect: 'Vybrať dátum',
                monthSelect: 'Vybrať mesiac',
                yearSelect: 'Vybrať rok',
                decadeSelect: 'Vybrať dekádu',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Predchádzajúci mesiac (PageUp)',
                nextMonth: 'Nasledujúci mesiac (PageDown)',
                previousYear: 'Predchádzajúci rok (Control + left)',
                nextYear: 'Nasledujúci rok (Control + right)',
                previousDecade: 'Predchádzajúca dekáda',
                nextDecade: 'Nasledujúca dekáda',
                previousCentury: 'Predchádzajúce storočie',
                nextCentury: 'Nasledujúce storočie'
            },
            timePickerLocale: {
                placeholder: 'Vybrať čas'
            }
        },
        global: {
            placeholder: 'Prosím vyberte'
        },
        Table: {
            filterTitle: 'Filter',
            filterConfirm: 'OK',
            filterReset: 'Obnoviť',
            selectAll: 'Vybrať všetko',
            selectInvert: 'Vybrať opačné',
            sortTitle: 'Zoradiť',
            expand: 'Rozbaliť riadok',
            collapse: 'Zbaliť riadok'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Zrušiť',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Zrušiť'
        },
        Transfer: {
            titles: ['', ''],
            searchPlaceholder: 'Vyhľadávanie',
            itemUnit: 'položka',
            itemsUnit: 'položiek'
        },
        Upload: {
            uploading: 'Nahrávanie...',
            removeFile: 'Odstrániť súbor',
            uploadError: 'Chyba pri nahrávaní',
            previewFile: 'Zobraziť súbor',
            downloadFile: 'Stiahnuť súbor'
        },
        Empty: {
            description: 'Žiadne dáta'
        },
        Icon: {
            icon: 'ikona'
        },
        Text: {
            edit: 'Upraviť',
            copy: 'Kopírovať',
            copied: 'Skopírované',
            expand: 'Zväčšiť'
        },
        PageHeader: {
            back: 'Späť'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/sl_SI.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var sl_SI = {
        locale: 'sl',
        Pagination: {
            items_per_page: '/ strani',
            jump_to: 'Pojdi na',
            jump_to_confirm: 'potrdi',
            page: '',
            prev_page: 'Prejšnja stran',
            next_page: 'Naslednja stran',
            prev_5: 'Prejšnjih 5 strani',
            next_5: 'Naslednjih 5 strani',
            prev_3: 'Prejšnje 3 strani',
            next_3: 'Naslednje 3 strani'
        },
        DatePicker: {
            lang: {
                locale: 'sl',
                placeholder: 'Izberite datum',
                rangePlaceholder: ['Začetni datum', 'Končni datum'],
                today: 'Danes',
                now: 'Trenutno',
                backToToday: 'Nazaj na trenutni datum',
                ok: 'Ok',
                clear: 'Počisti',
                month: 'Mesec',
                year: 'Leto',
                timeSelect: 'Izberi čas',
                dateSelect: 'Izberi datum',
                monthSelect: 'Izberite mesec',
                yearSelect: 'Izberite leto',
                decadeSelect: 'Izberite desetletje',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthFormat: 'MMMM',
                monthBeforeYear: true,
                previousMonth: 'Prejšnji mesec (PageUp)',
                nextMonth: 'Naslednji mesec (PageDown)',
                previousYear: 'Lansko leto (Control + left)',
                nextYear: 'Naslednje leto (Control + right)',
                previousDecade: 'Prejšnje desetletje',
                nextDecade: 'Naslednje desetletje',
                previousCentury: 'Zadnje stoletje',
                nextCentury: 'Naslednje stoletje'
            },
            timePickerLocale: {
                placeholder: 'Izberite čas'
            }
        },
        TimePicker: {
            placeholder: 'Izberite čas'
        },
        Calendar: {
            lang: {
                locale: 'sl',
                placeholder: 'Izberite datum',
                rangePlaceholder: ['Začetni datum', 'Končni datum'],
                today: 'Danes',
                now: 'Trenutno',
                backToToday: 'Nazaj na trenutni datum',
                ok: 'Ok',
                clear: 'Počisti',
                month: 'Mesec',
                year: 'Leto',
                timeSelect: 'Izberi čas',
                dateSelect: 'Izberi datum',
                monthSelect: 'Izberite mesec',
                yearSelect: 'Izberite leto',
                decadeSelect: 'Izberite desetletje',
                yearFormat: 'YYYY',
                dateFormat: 'D.M.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D.M.YYYY HH:mm:ss',
                monthFormat: 'MMMM',
                monthBeforeYear: true,
                previousMonth: 'Prejšnji mesec (PageUp)',
                nextMonth: 'Naslednji mesec (PageDown)',
                previousYear: 'Lansko leto (Control + left)',
                nextYear: 'Naslednje leto (Control + right)',
                previousDecade: 'Prejšnje desetletje',
                nextDecade: 'Naslednje desetletje',
                previousCentury: 'Zadnje stoletje',
                nextCentury: 'Naslednje stoletje'
            },
            timePickerLocale: {
                placeholder: 'Izberite čas'
            }
        },
        Table: {
            filterTitle: 'Filter',
            filterConfirm: 'Filtriraj',
            filterReset: 'Pobriši filter',
            selectAll: 'Izberi vse na trenutni strani',
            selectInvert: 'Obrni izbor na trenutni strani'
        },
        Modal: {
            okText: 'V redu',
            cancelText: 'Prekliči',
            justOkText: 'V redu'
        },
        Popconfirm: {
            okText: 'v redu',
            cancelText: 'Prekliči'
        },
        Transfer: {
            searchPlaceholder: 'Išči tukaj',
            itemUnit: 'Objekt',
            itemsUnit: 'Objektov'
        },
        Upload: {
            uploading: 'Nalaganje...',
            removeFile: 'Odstrani datoteko',
            uploadError: 'Napaka pri nalaganju',
            previewFile: 'Predogled datoteke',
            downloadFile: 'Prenos datoteke'
        },
        Empty: {
            description: 'Ni podatkov'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/sr_RS.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var sr_RS = {
        locale: 'sr',
        Pagination: {
            items_per_page: '/ strani',
            jump_to: 'Idi na',
            page: '',
            prev_page: 'Prethodna strana',
            next_page: 'Sledeća strana',
            prev_5: 'Prethodnih 5 Strana',
            next_5: 'Sledećih 5 Strana',
            prev_3: 'Prethodnih 3 Strane',
            next_3: 'Sledećih 3 Strane'
        },
        DatePicker: {
            lang: {
                placeholder: 'Izaberite datum',
                rangePlaceholder: ['Početni datum', 'Krajnji datum'],
                locale: 'sr_RS',
                today: 'Danas',
                now: 'Sada',
                backToToday: 'Vrati se na danas',
                ok: 'U redu',
                clear: 'Obriši',
                month: 'Mesec',
                year: 'Godina',
                timeSelect: 'Izaberi vreme',
                dateSelect: 'Izaberi datum',
                monthSelect: 'Izaberi mesec',
                yearSelect: 'Izaberi godinu',
                decadeSelect: 'Izaberi deceniju',
                yearFormat: 'YYYY',
                dateFormat: 'DD.MM.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'DD.MM.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Prethodni mesec (PageUp)',
                nextMonth: 'Sledeći mesec (PageDown)',
                previousYear: 'Prethodna godina (Control + left)',
                nextYear: 'Sledeća godina (Control + right)',
                previousDecade: 'Prethodna decenija',
                nextDecade: 'Sledeća decenija',
                previousCentury: 'Prethodni vek',
                nextCentury: 'Sledeći vek'
            },
            timePickerLocale: {
                placeholder: 'Izaberite vreme'
            }
        },
        TimePicker: {
            placeholder: 'Izaberite vreme'
        },
        Calendar: {
            lang: {
                placeholder: 'Izaberite datum',
                rangePlaceholder: ['Početni datum', 'Krajnji datum'],
                locale: 'sr_RS',
                today: 'Danas',
                now: 'Sada',
                backToToday: 'Vrati se na danas',
                ok: 'U redu',
                clear: 'Obriši',
                month: 'Mesec',
                year: 'Godina',
                timeSelect: 'Izaberi vreme',
                dateSelect: 'Izaberi datum',
                monthSelect: 'Izaberi mesec',
                yearSelect: 'Izaberi godinu',
                decadeSelect: 'Izaberi deceniju',
                yearFormat: 'YYYY',
                dateFormat: 'DD.MM.YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'DD.MM.YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Prethodni mesec (PageUp)',
                nextMonth: 'Sledeći mesec (PageDown)',
                previousYear: 'Prethodna godina (Control + left)',
                nextYear: 'Sledeća godina (Control + right)',
                previousDecade: 'Prethodna decenija',
                nextDecade: 'Sledeća decenija',
                previousCentury: 'Prethodni vek',
                nextCentury: 'Sledeći vek'
            },
            timePickerLocale: {
                placeholder: 'Izaberite vreme'
            }
        },
        Table: {
            filterTitle: 'Filter',
            filterConfirm: 'Primeni filter',
            filterReset: 'Resetuj filter',
            selectAll: 'Obeleži sve na trenutnoj strani',
            selectInvert: 'Obrni selekciju na trenutnoj stranici'
        },
        Modal: {
            okText: 'U redu',
            cancelText: 'Otkaži',
            justOkText: 'U redu'
        },
        Popconfirm: {
            okText: 'U redu',
            cancelText: 'Otkaži'
        },
        Transfer: {
            searchPlaceholder: 'Pretražite ovde',
            itemUnit: 'stavka',
            itemsUnit: 'stavki'
        },
        Upload: {
            uploading: 'Slanje...',
            removeFile: 'Ukloni fajl',
            uploadError: 'Greška prilikom slanja',
            previewFile: 'Pogledaj fajl',
            downloadFile: 'Preuzmi datoteku'
        },
        Empty: {
            description: 'Nema podataka'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/sv_SE.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var sv_SE = {
        locale: 'sv',
        Pagination: {
            items_per_page: '/ sida',
            jump_to: 'Gå till',
            jump_to_confirm: 'bekräfta',
            page: '',
            prev_page: 'Föreg sida',
            next_page: 'Nästa sida',
            prev_5: 'Föreg 5 sidor',
            next_5: 'Nästa 5 sidor',
            prev_3: 'Föreg 3 sidor',
            next_3: 'Nästa 3 sidor'
        },
        DatePicker: {
            lang: {
                placeholder: 'Välj datum',
                rangePlaceholder: ['Startdatum', 'Slutdatum'],
                locale: 'sv_SE',
                today: 'I dag',
                now: 'Nu',
                backToToday: 'Till idag',
                ok: 'Ok',
                clear: 'Avbryt',
                month: 'Månad',
                year: 'År',
                timeSelect: 'Välj tidpunkt',
                dateSelect: 'Välj datum',
                monthSelect: 'Välj månad',
                yearSelect: 'Välj år',
                decadeSelect: 'Välj årtionde',
                yearFormat: 'YYYY',
                dateFormat: 'YYYY-MM-DD',
                dayFormat: 'D',
                dateTimeFormat: 'YYYY-MM-DD H:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Förra månaden (PageUp)',
                nextMonth: 'Nästa månad (PageDown)',
                previousYear: 'Föreg år (Control + left)',
                nextYear: 'Nästa år (Control + right)',
                previousDecade: 'Föreg årtionde',
                nextDecade: 'Nästa årtionde',
                previousCentury: 'Föreg århundrade',
                nextCentury: 'Nästa århundrade'
            },
            timePickerLocale: {
                placeholder: 'Välj tid'
            }
        },
        TimePicker: {
            placeholder: 'Välj tid'
        },
        Calendar: {
            lang: {
                placeholder: 'Välj datum',
                rangePlaceholder: ['Startdatum', 'Slutdatum'],
                locale: 'sv_SE',
                today: 'I dag',
                now: 'Nu',
                backToToday: 'Till idag',
                ok: 'Ok',
                clear: 'Avbryt',
                month: 'Månad',
                year: 'År',
                timeSelect: 'Välj tidpunkt',
                dateSelect: 'Välj datum',
                monthSelect: 'Välj månad',
                yearSelect: 'Välj år',
                decadeSelect: 'Välj årtionde',
                yearFormat: 'YYYY',
                dateFormat: 'YYYY-MM-DD',
                dayFormat: 'D',
                dateTimeFormat: 'YYYY-MM-DD H:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Förra månaden (PageUp)',
                nextMonth: 'Nästa månad (PageDown)',
                previousYear: 'Föreg år (Control + left)',
                nextYear: 'Nästa år (Control + right)',
                previousDecade: 'Föreg årtionde',
                nextDecade: 'Nästa årtionde',
                previousCentury: 'Föreg århundrade',
                nextCentury: 'Nästa århundrade'
            },
            timePickerLocale: {
                placeholder: 'Välj tid'
            }
        },
        Table: {
            filterTitle: 'Filtermeny',
            filterConfirm: 'OK',
            filterReset: 'Rensa'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Avbryt',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Avbryt'
        },
        Transfer: {
            searchPlaceholder: 'Sök',
            itemUnit: 'element',
            itemsUnit: 'element'
        },
        Empty: {
            description: 'Ingen information'
        },
        Text: {
            edit: 'editera',
            copy: 'kopiera',
            copied: 'kopierad',
            expand: 'expandera'
        },
        Upload: {
            uploading: 'Uppladdning...',
            removeFile: 'Ta bort fil',
            uploadError: 'Uppladdningsfel',
            previewFile: 'Förhandsgranska filen',
            downloadFile: 'Nedladdning fil'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/ta_IN.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var ta_IN = {
        locale: 'ta',
        Pagination: {
            items_per_page: '/ பக்கம்',
            jump_to: 'அடுத்த',
            jump_to_confirm: 'உறுதிப்படுத்தவும்',
            page: '',
            prev_page: 'முந்தைய பக்கம்',
            next_page: 'அடுத்த பக்கம்',
            prev_5: 'முந்தைய 5 பக்கங்கள்',
            next_5: 'அடுத்த 5 பக்கங்கள்',
            prev_3: 'முந்தைய 3 பக்கங்கள்',
            next_3: 'அடுத்த 3 பக்கங்கள்'
        },
        DatePicker: {
            lang: {
                placeholder: 'தேதியைத் தேர்ந்தெடுக்கவும்',
                rangePlaceholder: ['தொடக்க தேதி', 'கடைசி தேதி'],
                locale: 'ta_IN',
                today: 'இன்று',
                now: 'இப்போது',
                backToToday: 'இன்றுக்கு திரும்பு',
                ok: 'சரி',
                clear: 'அழி',
                month: 'மாதம்',
                year: 'வருடம்',
                timeSelect: 'நேரத்தைத் தேர்ந்தெடு',
                dateSelect: 'தேதியைத் தேர்ந்தெடு',
                weekSelect: 'வாரத்தைத் தேர்வுசெய்க',
                monthSelect: 'மாதத்தைத் தேர்வுசெய்க',
                yearSelect: 'வருடத்தைத் தேர்வுசெய்க',
                decadeSelect: 'தசாப்தத்தைத் தேர்வுசெய்க',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'முந்தைய மாதம் (PageUp)',
                nextMonth: 'அடுத்த மாதம் (PageDown)',
                previousYear: 'முந்தைய வருடம் (Control + left)',
                nextYear: 'அடுத்த வருடம் (Control + right)',
                previousDecade: 'முந்தைய தசாப்தம்',
                nextDecade: 'அடுத்த தசாப்தம்',
                previousCentury: 'முந்தைய நூற்றாண்டு',
                nextCentury: 'அடுத்த நூற்றாண்டு'
            },
            timePickerLocale: {
                placeholder: 'நேரத்தைத் தேர்ந்தெடுக்கவும்'
            }
        },
        TimePicker: {
            placeholder: 'நேரத்தைத் தேர்ந்தெடுக்கவும்'
        },
        Calendar: {
            lang: {
                placeholder: 'தேதியைத் தேர்ந்தெடுக்கவும்',
                rangePlaceholder: ['தொடக்க தேதி', 'கடைசி தேதி'],
                locale: 'ta_IN',
                today: 'இன்று',
                now: 'இப்போது',
                backToToday: 'இன்றுக்கு திரும்பு',
                ok: 'சரி',
                clear: 'அழி',
                month: 'மாதம்',
                year: 'வருடம்',
                timeSelect: 'நேரத்தைத் தேர்ந்தெடு',
                dateSelect: 'தேதியைத் தேர்ந்தெடு',
                weekSelect: 'வாரத்தைத் தேர்வுசெய்க',
                monthSelect: 'மாதத்தைத் தேர்வுசெய்க',
                yearSelect: 'வருடத்தைத் தேர்வுசெய்க',
                decadeSelect: 'தசாப்தத்தைத் தேர்வுசெய்க',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'முந்தைய மாதம் (PageUp)',
                nextMonth: 'அடுத்த மாதம் (PageDown)',
                previousYear: 'முந்தைய வருடம் (Control + left)',
                nextYear: 'அடுத்த வருடம் (Control + right)',
                previousDecade: 'முந்தைய தசாப்தம்',
                nextDecade: 'அடுத்த தசாப்தம்',
                previousCentury: 'முந்தைய நூற்றாண்டு',
                nextCentury: 'அடுத்த நூற்றாண்டு'
            },
            timePickerLocale: {
                placeholder: 'நேரத்தைத் தேர்ந்தெடுக்கவும்'
            }
        },
        global: {
            placeholder: 'தேதியைத் தேர்ந்தெடுக்கவும்'
        },
        Table: {
            filterTitle: 'பட்டியலை மூடு',
            filterConfirm: 'சரி',
            filterReset: 'மீட்டமை',
            emptyText: 'தகவல் இல்லை',
            selectAll: 'அனைத்தையும் தேர்வுசெய்',
            selectInvert: 'தலைகீழாக மாற்று',
            sortTitle: 'தலைப்பை வரிசைப்படுத்தவும்'
        },
        Modal: {
            okText: 'சரி',
            cancelText: 'ரத்து செய்யவும்',
            justOkText: 'பரவாயில்லை, சரி'
        },
        Popconfirm: {
            okText: 'சரி',
            cancelText: 'ரத்து செய்யவும்'
        },
        Transfer: {
            titles: ['', ''],
            notFoundContent: 'உள்ளடக்கம் கிடைக்கவில்லை',
            searchPlaceholder: 'இங்கு தேடவும்',
            itemUnit: 'தகவல்',
            itemsUnit: 'தகவல்கள்'
        },
        Upload: {
            uploading: 'பதிவேற்றுகிறது...',
            removeFile: 'கோப்பை அகற்று',
            uploadError: 'பதிவேற்றுவதில் பிழை',
            previewFile: 'கோப்பை முன்னோட்டமிடுங்கள்',
            downloadFile: 'பதிவிறக்க கோப்பு'
        },
        Empty: {
            description: 'தகவல் இல்லை'
        },
        Icon: {
            icon: 'உருவம்'
        },
        Text: {
            edit: 'திருத்து',
            copy: 'நகல் எடு',
            copied: 'நகல் எடுக்கப்பட்டது',
            expand: 'விரிவாக்கவும்'
        },
        PageHeader: {
            back: 'பின் செல்லவும்'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/th_TH.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var th_TH = {
        locale: 'th',
        Pagination: {
            items_per_page: '/ หน้า',
            jump_to: 'ไปยัง',
            jump_to_confirm: 'ยืนยัน',
            page: '',
            prev_page: 'หน้าก่อนหน้า',
            next_page: 'หน้าถัดไป',
            prev_5: 'ย้อนกลับ 5 หน้า',
            next_5: 'ถัดไป 5 หน้า',
            prev_3: 'ย้อนกลับ 3 หน้า',
            next_3: 'ถัดไป 3 หน้า'
        },
        DatePicker: {
            lang: {
                placeholder: 'เลือกวันที่',
                rangePlaceholder: ['วันเริ่มต้น', 'วันสิ้นสุด'],
                locale: 'th_TH',
                today: 'วันนี้',
                now: 'ตอนนี้',
                backToToday: 'กลับไปยังวันนี้',
                ok: 'ตกลง',
                clear: 'ลบล้าง',
                month: 'เดือน',
                year: 'ปี',
                timeSelect: 'เลือกเวลา',
                dateSelect: 'เลือกวัน',
                monthSelect: 'เลือกเดือน',
                yearSelect: 'เลือกปี',
                decadeSelect: 'เลือกทศวรรษ',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'เดือนก่อนหน้า (PageUp)',
                nextMonth: 'เดือนถัดไป (PageDown)',
                previousYear: 'ปีก่อนหน้า (Control + left)',
                nextYear: 'ปีถัดไป (Control + right)',
                previousDecade: 'ทศวรรษก่อนหน้า',
                nextDecade: 'ทศวรรษถัดไป',
                previousCentury: 'ศตวรรษก่อนหน้า',
                nextCentury: 'ศตวรรษถัดไป'
            },
            timePickerLocale: {
                placeholder: 'เลือกเวลา'
            }
        },
        TimePicker: {
            placeholder: 'เลือกเวลา'
        },
        Calendar: {
            lang: {
                placeholder: 'เลือกวันที่',
                rangePlaceholder: ['วันเริ่มต้น', 'วันสิ้นสุด'],
                locale: 'th_TH',
                today: 'วันนี้',
                now: 'ตอนนี้',
                backToToday: 'กลับไปยังวันนี้',
                ok: 'ตกลง',
                clear: 'ลบล้าง',
                month: 'เดือน',
                year: 'ปี',
                timeSelect: 'เลือกเวลา',
                dateSelect: 'เลือกวัน',
                monthSelect: 'เลือกเดือน',
                yearSelect: 'เลือกปี',
                decadeSelect: 'เลือกทศวรรษ',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'เดือนก่อนหน้า (PageUp)',
                nextMonth: 'เดือนถัดไป (PageDown)',
                previousYear: 'ปีก่อนหน้า (Control + left)',
                nextYear: 'ปีถัดไป (Control + right)',
                previousDecade: 'ทศวรรษก่อนหน้า',
                nextDecade: 'ทศวรรษถัดไป',
                previousCentury: 'ศตวรรษก่อนหน้า',
                nextCentury: 'ศตวรรษถัดไป'
            },
            timePickerLocale: {
                placeholder: 'เลือกเวลา'
            }
        },
        global: {
            placeholder: 'กรุณาเลือก'
        },
        Table: {
            filterTitle: 'ตัวกรอง',
            filterConfirm: 'ยืนยัน',
            filterReset: 'รีเซ็ต',
            selectAll: 'เลือกทั้งหมดในหน้านี้',
            selectInvert: 'เลือกสถานะตรงกันข้าม',
            sortTitle: 'เรียง',
            expand: 'แสดงแถวข้อมูล',
            collapse: 'ย่อแถวข้อมูล'
        },
        Modal: {
            okText: 'ตกลง',
            cancelText: 'ยกเลิก',
            justOkText: 'ตกลง'
        },
        Popconfirm: {
            okText: 'ตกลง',
            cancelText: 'ยกเลิก'
        },
        Transfer: {
            titles: ['', ''],
            searchPlaceholder: 'ค้นหา',
            itemUnit: 'ชิ้น',
            itemsUnit: 'ชิ้น'
        },
        Upload: {
            uploading: 'กำลังอัปโหลด...',
            removeFile: 'ลบไฟล์',
            uploadError: 'เกิดข้อผิดพลาดในการอัปโหลด',
            previewFile: 'ดูตัวอย่างไฟล์',
            downloadFile: 'ดาวน์โหลดไฟล์'
        },
        Empty: {
            description: 'ไม่มีข้อมูล'
        },
        Icon: {
            icon: 'ไอคอน'
        },
        Text: {
            edit: 'แก้ไข',
            copy: 'คัดลอก',
            copied: 'คัดลอกแล้ว',
            expand: 'ขยาย'
        },
        PageHeader: {
            back: 'ย้อนกลับ'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/tr_TR.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var tr_TR = {
        locale: 'tr',
        Pagination: {
            items_per_page: '/ sayfa',
            jump_to: 'Git',
            jump_to_confirm: 'onayla',
            page: '',
            prev_page: 'Önceki Sayfa',
            next_page: 'Sonraki Sayfa',
            prev_5: 'Önceki 5 Sayfa',
            next_5: 'Sonraki 5 Sayfa',
            prev_3: 'Önceki 3 Sayfa',
            next_3: 'Sonraki 3 Sayfa'
        },
        DatePicker: {
            lang: {
                placeholder: 'Tarih Seç',
                rangePlaceholder: ['Başlangıç Tarihi', 'Bitiş Tarihi'],
                locale: 'tr_TR',
                today: 'Bugün',
                now: 'Şimdi',
                backToToday: 'Bugüne Geri Dön',
                ok: 'tamam',
                clear: 'Temizle',
                month: 'Ay',
                year: 'Yıl',
                timeSelect: 'Zaman Seç',
                dateSelect: 'Tarih Seç',
                monthSelect: 'Ay Seç',
                yearSelect: 'Yıl Seç',
                decadeSelect: 'On Yıl Seç',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Önceki Ay (PageUp)',
                nextMonth: 'Sonraki Ay (PageDown)',
                previousYear: 'Önceki Yıl (Control + Sol)',
                nextYear: 'Sonraki Yıl (Control + Sağ)',
                previousDecade: 'Önceki On Yıl',
                nextDecade: 'Sonraki On Yıl',
                previousCentury: 'Önceki Yüzyıl',
                nextCentury: 'Sonraki Yüzyıl'
            },
            timePickerLocale: {
                placeholder: 'Zaman Seç'
            }
        },
        TimePicker: {
            placeholder: 'Zaman Seç'
        },
        Calendar: {
            lang: {
                placeholder: 'Tarih Seç',
                rangePlaceholder: ['Başlangıç Tarihi', 'Bitiş Tarihi'],
                locale: 'tr_TR',
                today: 'Bugün',
                now: 'Şimdi',
                backToToday: 'Bugüne Geri Dön',
                ok: 'tamam',
                clear: 'Temizle',
                month: 'Ay',
                year: 'Yıl',
                timeSelect: 'Zaman Seç',
                dateSelect: 'Tarih Seç',
                monthSelect: 'Ay Seç',
                yearSelect: 'Yıl Seç',
                decadeSelect: 'On Yıl Seç',
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Önceki Ay (PageUp)',
                nextMonth: 'Sonraki Ay (PageDown)',
                previousYear: 'Önceki Yıl (Control + Sol)',
                nextYear: 'Sonraki Yıl (Control + Sağ)',
                previousDecade: 'Önceki On Yıl',
                nextDecade: 'Sonraki On Yıl',
                previousCentury: 'Önceki Yüzyıl',
                nextCentury: 'Sonraki Yüzyıl'
            },
            timePickerLocale: {
                placeholder: 'Zaman Seç'
            }
        },
        global: {
            placeholder: 'Lütfen seçiniz'
        },
        Table: {
            filterTitle: 'Menü Filtrele',
            filterConfirm: 'Tamam',
            filterReset: 'Sıfırla',
            selectAll: 'Hepsini Seç',
            selectInvert: 'Tersini Seç',
            sortTitle: 'Sırala'
        },
        Modal: {
            okText: 'Tamam',
            cancelText: 'İptal',
            justOkText: 'Tamam'
        },
        Popconfirm: {
            okText: 'Tamam',
            cancelText: 'İptal'
        },
        Transfer: {
            titles: ['', ''],
            searchPlaceholder: 'Arama',
            itemUnit: 'Öğe',
            itemsUnit: 'Öğeler'
        },
        Upload: {
            uploading: 'Yükleniyor...',
            removeFile: 'Dosyayı kaldır',
            uploadError: 'Yükleme Hatası',
            previewFile: 'Dosyayı Önizle',
            downloadFile: 'Dosyayı indir'
        },
        Empty: {
            description: 'Veri Yok'
        },
        Icon: {
            icon: 'icon'
        },
        Text: {
            edit: 'düzenle',
            copy: 'kopyala',
            copied: 'kopyalandı',
            expand: 'genişlet'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/uk_UA.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var uk_UA = {
        locale: 'uk',
        Pagination: {
            items_per_page: '/ сторінці',
            jump_to: 'Перейти',
            jump_to_confirm: 'підтвердити',
            page: '',
            prev_page: 'Попередня сторінка',
            next_page: 'Наступна сторінка',
            prev_5: 'Попередні 5 сторінок',
            next_5: 'Наступні 5 сторінок',
            prev_3: 'Попередні 3 сторінки',
            next_3: 'Наступні 3 сторінки'
        },
        DatePicker: {
            lang: {
                placeholder: 'Оберіть дату',
                rangePlaceholder: ['Початкова дата', 'Кінцева дата'],
                locale: 'uk_UA',
                today: 'Сьогодні',
                now: 'Зараз',
                backToToday: 'Поточна дата',
                ok: 'Ok',
                clear: 'Очистити',
                month: 'Місяць',
                year: 'Рік',
                timeSelect: 'Обрати час',
                dateSelect: 'Обрати дату',
                monthSelect: 'Обрати місяць',
                yearSelect: 'Обрати рік',
                decadeSelect: 'Обрати десятиріччя',
                yearFormat: 'YYYY',
                dateFormat: 'D-M-YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D-M-YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Попередній місяць (PageUp)',
                nextMonth: 'Наступний місяць (PageDown)',
                previousYear: 'Попередній рік (Control + left)',
                nextYear: 'Наступний рік (Control + right)',
                previousDecade: 'Попереднє десятиріччя',
                nextDecade: 'Наступне десятиріччя',
                previousCentury: 'Попереднє століття',
                nextCentury: 'Наступне століття'
            },
            timePickerLocale: {
                placeholder: 'Оберіть час'
            }
        },
        TimePicker: {
            placeholder: 'Оберіть час'
        },
        Calendar: {
            lang: {
                placeholder: 'Оберіть дату',
                rangePlaceholder: ['Початкова дата', 'Кінцева дата'],
                locale: 'uk_UA',
                today: 'Сьогодні',
                now: 'Зараз',
                backToToday: 'Поточна дата',
                ok: 'Ok',
                clear: 'Очистити',
                month: 'Місяць',
                year: 'Рік',
                timeSelect: 'Обрати час',
                dateSelect: 'Обрати дату',
                monthSelect: 'Обрати місяць',
                yearSelect: 'Обрати рік',
                decadeSelect: 'Обрати десятиріччя',
                yearFormat: 'YYYY',
                dateFormat: 'D-M-YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D-M-YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Попередній місяць (PageUp)',
                nextMonth: 'Наступний місяць (PageDown)',
                previousYear: 'Попередній рік (Control + left)',
                nextYear: 'Наступний рік (Control + right)',
                previousDecade: 'Попереднє десятиріччя',
                nextDecade: 'Наступне десятиріччя',
                previousCentury: 'Попереднє століття',
                nextCentury: 'Наступне століття'
            },
            timePickerLocale: {
                placeholder: 'Оберіть час'
            }
        },
        Table: {
            filterTitle: 'Фільтрувати',
            filterConfirm: 'OK',
            filterReset: 'Скинути',
            selectAll: 'Обрати всі',
            selectInvert: 'Інвертувати вибір'
        },
        Modal: {
            okText: 'Гаразд',
            cancelText: 'Скасувати',
            justOkText: 'Гаразд'
        },
        Popconfirm: {
            okText: 'Гаразд',
            cancelText: 'Скасувати'
        },
        Transfer: {
            searchPlaceholder: 'Введіть текст для пошуку',
            itemUnit: 'item',
            itemsUnit: 'items'
        },
        Upload: {
            uploading: 'Завантаження ...',
            removeFile: 'Видалити файл',
            uploadError: 'Помилка завантаження',
            previewFile: 'Попередній перегляд файлу',
            downloadFile: 'Завантажити файл'
        },
        Empty: {
            description: 'Даних немає'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/vi_VN.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var vi_VN = {
        locale: 'vi',
        Pagination: {
            items_per_page: '/ trang',
            jump_to: 'Đến',
            jump_to_confirm: 'xác nhận',
            page: '',
            prev_page: 'Trang Trước',
            next_page: 'Trang Kế',
            prev_5: 'Về 5 Trang Trước',
            next_5: 'Đến 5 Trang Kế',
            prev_3: 'Về 3 Trang Trước',
            next_3: 'Đến 3 Trang Kế'
        },
        DatePicker: {
            lang: {
                placeholder: 'Chọn thời điểm',
                rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc'],
                locale: 'vi_VN',
                today: 'Hôm nay',
                now: 'Bây giờ',
                backToToday: 'Trở về hôm nay',
                ok: 'Ok',
                clear: 'Xóa',
                month: 'Tháng',
                year: 'Năm',
                timeSelect: 'Chọn thời gian',
                dateSelect: 'Chọn ngày',
                weekSelect: 'Chọn tuần',
                monthSelect: 'Chọn tháng',
                yearSelect: 'Chọn năm',
                decadeSelect: 'Chọn thập kỷ',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Tháng trước (PageUp)',
                nextMonth: 'Tháng sau (PageDown)',
                previousYear: 'Năm trước (Control + left)',
                nextYear: 'Năm sau (Control + right)',
                previousDecade: 'Thập kỷ trước',
                nextDecade: 'Thập kỷ sau',
                previousCentury: 'Thế kỷ trước',
                nextCentury: 'Thế kỷ sau'
            },
            timePickerLocale: {
                placeholder: 'Chọn thời gian'
            }
        },
        TimePicker: {
            placeholder: 'Chọn thời gian'
        },
        Calendar: {
            lang: {
                placeholder: 'Chọn thời điểm',
                rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc'],
                locale: 'vi_VN',
                today: 'Hôm nay',
                now: 'Bây giờ',
                backToToday: 'Trở về hôm nay',
                ok: 'Ok',
                clear: 'Xóa',
                month: 'Tháng',
                year: 'Năm',
                timeSelect: 'Chọn thời gian',
                dateSelect: 'Chọn ngày',
                weekSelect: 'Chọn tuần',
                monthSelect: 'Chọn tháng',
                yearSelect: 'Chọn năm',
                decadeSelect: 'Chọn thập kỷ',
                yearFormat: 'YYYY',
                dateFormat: 'D/M/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'D/M/YYYY HH:mm:ss',
                monthBeforeYear: true,
                previousMonth: 'Tháng trước (PageUp)',
                nextMonth: 'Tháng sau (PageDown)',
                previousYear: 'Năm trước (Control + left)',
                nextYear: 'Năm sau (Control + right)',
                previousDecade: 'Thập kỷ trước',
                nextDecade: 'Thập kỷ sau',
                previousCentury: 'Thế kỷ trước',
                nextCentury: 'Thế kỷ sau'
            },
            timePickerLocale: {
                placeholder: 'Chọn thời gian'
            }
        },
        Table: {
            filterTitle: 'Bộ ',
            filterConfirm: 'OK',
            filterReset: 'Tạo Lại',
            selectAll: 'Chọn Tất Cả',
            selectInvert: 'Chọn Ngược Lại'
        },
        Modal: {
            okText: 'OK',
            cancelText: 'Huỷ',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: 'OK',
            cancelText: 'Huỷ'
        },
        Transfer: {
            searchPlaceholder: 'Tìm ở đây',
            itemUnit: 'mục',
            itemsUnit: 'mục'
        },
        Upload: {
            uploading: 'Đang tải lên...',
            removeFile: 'Gỡ bỏ tập tin',
            uploadError: 'Lỗi tải lên',
            previewFile: 'Xem thử tập tin',
            downloadFile: 'Tải tập tin'
        },
        Empty: {
            description: 'Trống'
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: languages/zh_TW.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var zh_TW = {
        locale: 'zh-tw',
        Pagination: {
            items_per_page: '條/頁',
            jump_to: '跳至',
            jump_to_confirm: '確定',
            page: '頁',
            prev_page: '上一頁',
            next_page: '下一頁',
            prev_5: '向前 5 頁',
            next_5: '向後 5 頁',
            prev_3: '向前 3 頁',
            next_3: '向後 3 頁'
        },
        DatePicker: {
            lang: {
                placeholder: '請選擇日期',
                rangePlaceholder: ['開始日期', '結束日期'],
                locale: 'zh_TW',
                today: '今天',
                now: '此刻',
                backToToday: '返回今天',
                ok: '確定',
                timeSelect: '選擇時間',
                dateSelect: '選擇日期',
                weekSelect: '選擇周',
                clear: '清除',
                month: '月',
                year: '年',
                previousMonth: '上個月 (翻頁上鍵)',
                nextMonth: '下個月 (翻頁下鍵)',
                monthSelect: '選擇月份',
                yearSelect: '選擇年份',
                decadeSelect: '選擇年代',
                yearFormat: 'YYYY年',
                dayFormat: 'D日',
                dateFormat: 'YYYY年M月D日',
                dateTimeFormat: 'YYYY年M月D日 HH時mm分ss秒',
                previousYear: '上一年 (Control鍵加左方向鍵)',
                nextYear: '下一年 (Control鍵加右方向鍵)',
                previousDecade: '上一年代',
                nextDecade: '下一年代',
                previousCentury: '上一世紀',
                nextCentury: '下一世紀'
            },
            timePickerLocale: {
                placeholder: '請選擇時間'
            }
        },
        TimePicker: {
            placeholder: '請選擇時間'
        },
        Calendar: {
            lang: {
                placeholder: '請選擇日期',
                rangePlaceholder: ['開始日期', '結束日期'],
                locale: 'zh_TW',
                today: '今天',
                now: '此刻',
                backToToday: '返回今天',
                ok: '確定',
                timeSelect: '選擇時間',
                dateSelect: '選擇日期',
                weekSelect: '選擇周',
                clear: '清除',
                month: '月',
                year: '年',
                previousMonth: '上個月 (翻頁上鍵)',
                nextMonth: '下個月 (翻頁下鍵)',
                monthSelect: '選擇月份',
                yearSelect: '選擇年份',
                decadeSelect: '選擇年代',
                yearFormat: 'YYYY年',
                dayFormat: 'D日',
                dateFormat: 'YYYY年M月D日',
                dateTimeFormat: 'YYYY年M月D日 HH時mm分ss秒',
                previousYear: '上一年 (Control鍵加左方向鍵)',
                nextYear: '下一年 (Control鍵加右方向鍵)',
                previousDecade: '上一年代',
                nextDecade: '下一年代',
                previousCentury: '上一世紀',
                nextCentury: '下一世紀'
            },
            timePickerLocale: {
                placeholder: '請選擇時間'
            }
        },
        Table: {
            filterTitle: '篩選器',
            filterConfirm: '確 定',
            filterReset: '重 置',
            selectAll: '全部選取',
            selectInvert: '反向選取'
        },
        Modal: {
            okText: '確 定',
            cancelText: '取 消',
            justOkText: 'OK'
        },
        Popconfirm: {
            okText: '確 定',
            cancelText: '取 消'
        },
        Transfer: {
            searchPlaceholder: '搜尋資料',
            itemUnit: '項目',
            itemsUnit: '項目'
        },
        Upload: {
            uploading: '正在上傳...',
            removeFile: '刪除檔案',
            uploadError: '上傳失敗',
            previewFile: '檔案預覽',
            downloadFile: '下载文件'
        },
        Empty: {
            description: '無此資料'
        },
        PageHeader: {
            back: '返回'
        }
    };

    exports.DATE_HELPER_SERVICE_FACTORY = DATE_HELPER_SERVICE_FACTORY;
    exports.DateHelperByDateFns = DateHelperByDateFns;
    exports.DateHelperByDatePipe = DateHelperByDatePipe;
    exports.DateHelperService = DateHelperService;
    exports.NZ_DATE_CONFIG = NZ_DATE_CONFIG;
    exports.NZ_DATE_CONFIG_DEFAULT = NZ_DATE_CONFIG_DEFAULT;
    exports.NZ_DATE_FNS_COMPATIBLE = NZ_DATE_FNS_COMPATIBLE;
    exports.NZ_DATE_LOCALE = NZ_DATE_LOCALE;
    exports.NZ_I18N = NZ_I18N;
    exports.NzI18nModule = NzI18nModule;
    exports.NzI18nPipe = NzI18nPipe;
    exports.NzI18nService = NzI18nService;
    exports.ar_EG = ar_EG;
    exports.bg_BG = bg_BG;
    exports.ca_ES = ca_ES;
    exports.convertTokens = convertTokens;
    exports.cs_CZ = cs_CZ;
    exports.da_DK = da_DK;
    exports.de_DE = de_DE;
    exports.el_GR = el_GR;
    exports.en_GB = en_GB;
    exports.en_US = en_US;
    exports.es_ES = es_ES;
    exports.et_EE = et_EE;
    exports.fa_IR = fa_IR;
    exports.fi_FI = fi_FI;
    exports.fr_BE = fr_BE;
    exports.fr_FR = fr_FR;
    exports.he_IL = he_IL;
    exports.hi_IN = hi_IN;
    exports.hr_HR = hr_HR;
    exports.hu_HU = hu_HU;
    exports.id_ID = id_ID;
    exports.is_IS = is_IS;
    exports.it_IT = it_IT;
    exports.ja_JP = ja_JP;
    exports.ka_GE = ka_GE;
    exports.kn_IN = kn_IN;
    exports.ko_KR = ko_KR;
    exports.ku_IQ = ku_IQ;
    exports.lv_LV = lv_LV;
    exports.mergeDateConfig = mergeDateConfig;
    exports.mn_MN = mn_MN;
    exports.ms_MY = ms_MY;
    exports.nb_NO = nb_NO;
    exports.ne_NP = ne_NP;
    exports.nl_BE = nl_BE;
    exports.nl_NL = nl_NL;
    exports.pl_PL = pl_PL;
    exports.pt_BR = pt_BR;
    exports.pt_PT = pt_PT;
    exports.ro_RO = ro_RO;
    exports.ru_RU = ru_RU;
    exports.sk_SK = sk_SK;
    exports.sl_SI = sl_SI;
    exports.sr_RS = sr_RS;
    exports.sv_SE = sv_SE;
    exports.ta_IN = ta_IN;
    exports.th_TH = th_TH;
    exports.tr_TR = tr_TR;
    exports.uk_UA = uk_UA;
    exports.vi_VN = vi_VN;
    exports.zh_CN = zh_CN;
    exports.zh_TW = zh_TW;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-i18n.umd.js.map
