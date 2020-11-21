(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('date-fns/addMonths'), require('date-fns/addYears'), require('date-fns/differenceInCalendarDays'), require('date-fns/differenceInCalendarMonths'), require('date-fns/differenceInCalendarYears'), require('date-fns/differenceInHours'), require('date-fns/differenceInMinutes'), require('date-fns/differenceInSeconds'), require('date-fns/isFirstDayOfMonth'), require('date-fns/isLastDayOfMonth'), require('date-fns/isSameDay'), require('date-fns/isSameHour'), require('date-fns/isSameMinute'), require('date-fns/isSameMonth'), require('date-fns/isSameSecond'), require('date-fns/isSameYear'), require('date-fns/isToday'), require('date-fns/isValid'), require('date-fns/setDay'), require('date-fns/setMonth'), require('date-fns/setYear'), require('date-fns/startOfMonth'), require('date-fns/startOfWeek'), require('ng-zorro-antd/core/logger'), require('@angular/common'), require('ng-zorro-antd/core/util')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/time', ['exports', 'date-fns/addMonths', 'date-fns/addYears', 'date-fns/differenceInCalendarDays', 'date-fns/differenceInCalendarMonths', 'date-fns/differenceInCalendarYears', 'date-fns/differenceInHours', 'date-fns/differenceInMinutes', 'date-fns/differenceInSeconds', 'date-fns/isFirstDayOfMonth', 'date-fns/isLastDayOfMonth', 'date-fns/isSameDay', 'date-fns/isSameHour', 'date-fns/isSameMinute', 'date-fns/isSameMonth', 'date-fns/isSameSecond', 'date-fns/isSameYear', 'date-fns/isToday', 'date-fns/isValid', 'date-fns/setDay', 'date-fns/setMonth', 'date-fns/setYear', 'date-fns/startOfMonth', 'date-fns/startOfWeek', 'ng-zorro-antd/core/logger', '@angular/common', 'ng-zorro-antd/core/util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core.time = {}), global.addMonths, global.addYears, global.differenceInCalendarDays, global.differenceInCalendarMonths, global.differenceInCalendarYears, global.differenceInHours, global.differenceInMinutes, global.differenceInSeconds, global.isFirstDayOfMonth, global.isLastDayOfMonth, global.isSameDay, global.isSameHour, global.isSameMinute, global.isSameMonth, global.isSameSecond, global.isSameYear, global.isToday, global.isValid, global.setDay, global.setMonth, global.setYear, global.startOfMonth, global.startOfWeek, global['ng-zorro-antd'].core.logger, global.ng.common, global['ng-zorro-antd'].core.util));
}(this, (function (exports, addMonths, addYears, differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears, differenceInHours, differenceInMinutes, differenceInSeconds, isFirstDayOfMonth, isLastDayOfMonth, isSameDay, isSameHour, isSameMinute, isSameMonth, isSameSecond, isSameYear, isToday, isValid, setDay, setMonth, setYear, startOfMonth, startOfWeek, logger, common, util) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var addMonths__default = /*#__PURE__*/_interopDefaultLegacy(addMonths);
    var addYears__default = /*#__PURE__*/_interopDefaultLegacy(addYears);
    var differenceInCalendarDays__default = /*#__PURE__*/_interopDefaultLegacy(differenceInCalendarDays);
    var differenceInCalendarMonths__default = /*#__PURE__*/_interopDefaultLegacy(differenceInCalendarMonths);
    var differenceInCalendarYears__default = /*#__PURE__*/_interopDefaultLegacy(differenceInCalendarYears);
    var differenceInHours__default = /*#__PURE__*/_interopDefaultLegacy(differenceInHours);
    var differenceInMinutes__default = /*#__PURE__*/_interopDefaultLegacy(differenceInMinutes);
    var differenceInSeconds__default = /*#__PURE__*/_interopDefaultLegacy(differenceInSeconds);
    var isFirstDayOfMonth__default = /*#__PURE__*/_interopDefaultLegacy(isFirstDayOfMonth);
    var isLastDayOfMonth__default = /*#__PURE__*/_interopDefaultLegacy(isLastDayOfMonth);
    var isSameDay__default = /*#__PURE__*/_interopDefaultLegacy(isSameDay);
    var isSameHour__default = /*#__PURE__*/_interopDefaultLegacy(isSameHour);
    var isSameMinute__default = /*#__PURE__*/_interopDefaultLegacy(isSameMinute);
    var isSameMonth__default = /*#__PURE__*/_interopDefaultLegacy(isSameMonth);
    var isSameSecond__default = /*#__PURE__*/_interopDefaultLegacy(isSameSecond);
    var isSameYear__default = /*#__PURE__*/_interopDefaultLegacy(isSameYear);
    var isToday__default = /*#__PURE__*/_interopDefaultLegacy(isToday);
    var isValid__default = /*#__PURE__*/_interopDefaultLegacy(isValid);
    var setDay__default = /*#__PURE__*/_interopDefaultLegacy(setDay);
    var setMonth__default = /*#__PURE__*/_interopDefaultLegacy(setMonth);
    var setYear__default = /*#__PURE__*/_interopDefaultLegacy(setYear);
    var startOfMonth__default = /*#__PURE__*/_interopDefaultLegacy(startOfMonth);
    var startOfWeek__default = /*#__PURE__*/_interopDefaultLegacy(startOfWeek);

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
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
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
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
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

    function wrongSortOrder(rangeValue) {
        var _a = __read(rangeValue, 2), start = _a[0], end = _a[1];
        return !!start && !!end && end.isBeforeDay(start);
    }
    function normalizeRangeValue(value, allowSameInTwoPanel, type) {
        if (type === void 0) { type = 'month'; }
        var _a = __read(value, 2), start = _a[0], end = _a[1];
        var newStart = start || new CandyDate();
        var newEnd = end || new CandyDate();
        if (start && !end) {
            newStart = start;
            newEnd = start.add(1, type);
        }
        else if (!start && end) {
            newStart = end.add(-1, type);
            newEnd = end;
        }
        if (newEnd.isSame(newStart, type) && !allowSameInTwoPanel) {
            newEnd = newStart.add(1, type);
        }
        return [newStart, newEnd];
    }
    function cloneDate(value) {
        if (Array.isArray(value)) {
            return value.map(function (v) { return (v instanceof CandyDate ? v.clone() : null); });
        }
        else {
            return value instanceof CandyDate ? value.clone() : null;
        }
    }
    /**
     * Wrapping kind APIs for date operating and unify
     * NOTE: every new API return new CandyDate object without side effects to the former Date object
     * NOTE: most APIs are based on local time other than customized locale id (this needs tobe support in future)
     * TODO: support format() against to angular's core API
     */
    var CandyDate = /** @class */ (function () {
        // locale: string; // Custom specified locale ID
        function CandyDate(date) {
            if (date) {
                if (date instanceof Date) {
                    this.nativeDate = date;
                }
                else if (typeof date === 'string' || typeof date === 'number') {
                    logger.warn('The string type is not recommended for date-picker, use "Date" type');
                    this.nativeDate = new Date(date);
                }
                else {
                    throw new Error('The input date type is not supported ("Date" is now recommended)');
                }
            }
            else {
                this.nativeDate = new Date();
            }
        }
        CandyDate.prototype.calendarStart = function (options) {
            return new CandyDate(startOfWeek__default['default'](startOfMonth__default['default'](this.nativeDate), options));
        };
        // ---------------------------------------------------------------------
        // | Native shortcuts
        // -----------------------------------------------------------------------------\
        CandyDate.prototype.getYear = function () {
            return this.nativeDate.getFullYear();
        };
        CandyDate.prototype.getMonth = function () {
            return this.nativeDate.getMonth();
        };
        CandyDate.prototype.getDay = function () {
            return this.nativeDate.getDay();
        };
        CandyDate.prototype.getTime = function () {
            return this.nativeDate.getTime();
        };
        CandyDate.prototype.getDate = function () {
            return this.nativeDate.getDate();
        };
        CandyDate.prototype.getHours = function () {
            return this.nativeDate.getHours();
        };
        CandyDate.prototype.getMinutes = function () {
            return this.nativeDate.getMinutes();
        };
        CandyDate.prototype.getSeconds = function () {
            return this.nativeDate.getSeconds();
        };
        CandyDate.prototype.getMilliseconds = function () {
            return this.nativeDate.getMilliseconds();
        };
        // ---------------------------------------------------------------------
        // | New implementing APIs
        // ---------------------------------------------------------------------
        CandyDate.prototype.clone = function () {
            return new CandyDate(new Date(this.nativeDate));
        };
        CandyDate.prototype.setHms = function (hour, minute, second) {
            return new CandyDate(this.nativeDate.setHours(hour, minute, second));
        };
        CandyDate.prototype.setYear = function (year) {
            return new CandyDate(setYear__default['default'](this.nativeDate, year));
        };
        CandyDate.prototype.addYears = function (amount) {
            return new CandyDate(addYears__default['default'](this.nativeDate, amount));
        };
        // NOTE: month starts from 0
        // NOTE: Don't use the native API for month manipulation as it not restrict the date when it overflows, eg. (new Date('2018-7-31')).setMonth(1) will be date of 2018-3-03 instead of 2018-2-28
        CandyDate.prototype.setMonth = function (month) {
            return new CandyDate(setMonth__default['default'](this.nativeDate, month));
        };
        CandyDate.prototype.addMonths = function (amount) {
            return new CandyDate(addMonths__default['default'](this.nativeDate, amount));
        };
        CandyDate.prototype.setDay = function (day, options) {
            return new CandyDate(setDay__default['default'](this.nativeDate, day, options));
        };
        CandyDate.prototype.setDate = function (amount) {
            var date = new Date(this.nativeDate);
            date.setDate(amount);
            return new CandyDate(date);
        };
        CandyDate.prototype.addDays = function (amount) {
            return this.setDate(this.getDate() + amount);
        };
        CandyDate.prototype.add = function (amount, mode) {
            switch (mode) {
                case 'decade':
                    return this.addYears(amount * 10);
                    break;
                case 'year':
                    return this.addYears(amount);
                    break;
                case 'month':
                    return this.addMonths(amount);
                    break;
                default:
                    return this.addMonths(amount);
                    break;
            }
        };
        CandyDate.prototype.isSame = function (date, grain) {
            if (grain === void 0) { grain = 'day'; }
            var fn;
            switch (grain) {
                case 'decade':
                    fn = function (pre, next) { return Math.abs(pre.getFullYear() - next.getFullYear()) < 11; };
                    break;
                case 'year':
                    fn = isSameYear__default['default'];
                    break;
                case 'month':
                    fn = isSameMonth__default['default'];
                    break;
                case 'day':
                    fn = isSameDay__default['default'];
                    break;
                case 'hour':
                    fn = isSameHour__default['default'];
                    break;
                case 'minute':
                    fn = isSameMinute__default['default'];
                    break;
                case 'second':
                    fn = isSameSecond__default['default'];
                    break;
                default:
                    fn = isSameDay__default['default'];
                    break;
            }
            return fn(this.nativeDate, this.toNativeDate(date));
        };
        CandyDate.prototype.isSameYear = function (date) {
            return this.isSame(date, 'year');
        };
        CandyDate.prototype.isSameMonth = function (date) {
            return this.isSame(date, 'month');
        };
        CandyDate.prototype.isSameDay = function (date) {
            return this.isSame(date, 'day');
        };
        CandyDate.prototype.isSameHour = function (date) {
            return this.isSame(date, 'hour');
        };
        CandyDate.prototype.isSameMinute = function (date) {
            return this.isSame(date, 'minute');
        };
        CandyDate.prototype.isSameSecond = function (date) {
            return this.isSame(date, 'second');
        };
        CandyDate.prototype.isBefore = function (date, grain) {
            if (grain === void 0) { grain = 'day'; }
            if (date === null) {
                return false;
            }
            var fn;
            switch (grain) {
                case 'year':
                    fn = differenceInCalendarYears__default['default'];
                    break;
                case 'month':
                    fn = differenceInCalendarMonths__default['default'];
                    break;
                case 'day':
                    fn = differenceInCalendarDays__default['default'];
                    break;
                case 'hour':
                    fn = differenceInHours__default['default'];
                    break;
                case 'minute':
                    fn = differenceInMinutes__default['default'];
                    break;
                case 'second':
                    fn = differenceInSeconds__default['default'];
                    break;
                default:
                    fn = differenceInCalendarDays__default['default'];
                    break;
            }
            return fn(this.nativeDate, this.toNativeDate(date)) < 0;
        };
        CandyDate.prototype.isBeforeYear = function (date) {
            return this.isBefore(date, 'year');
        };
        CandyDate.prototype.isBeforeMonth = function (date) {
            return this.isBefore(date, 'month');
        };
        CandyDate.prototype.isBeforeDay = function (date) {
            return this.isBefore(date, 'day');
        };
        // Equal to today accurate to "day"
        CandyDate.prototype.isToday = function () {
            return isToday__default['default'](this.nativeDate);
        };
        CandyDate.prototype.isValid = function () {
            return isValid__default['default'](this.nativeDate);
        };
        CandyDate.prototype.isFirstDayOfMonth = function () {
            return isFirstDayOfMonth__default['default'](this.nativeDate);
        };
        CandyDate.prototype.isLastDayOfMonth = function () {
            return isLastDayOfMonth__default['default'](this.nativeDate);
        };
        CandyDate.prototype.toNativeDate = function (date) {
            return date instanceof CandyDate ? date.nativeDate : date;
        };
        return CandyDate;
    }());

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var timeUnits = [
        ['Y', 1000 * 60 * 60 * 24 * 365],
        ['M', 1000 * 60 * 60 * 24 * 30],
        ['D', 1000 * 60 * 60 * 24],
        ['H', 1000 * 60 * 60],
        ['m', 1000 * 60],
        ['s', 1000],
        ['S', 1] // million seconds
    ];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NgTimeParser = /** @class */ (function () {
        function NgTimeParser(format, localeId) {
            this.format = format;
            this.localeId = localeId;
            this.regex = null;
            this.matchMap = {
                hour: null,
                minute: null,
                second: null,
                periodNarrow: null,
                periodWide: null,
                periodAbbreviated: null
            };
            this.genRegexp();
        }
        NgTimeParser.prototype.toDate = function (str) {
            var result = this.getTimeResult(str);
            var time = new Date();
            if (util.isNotNil(result === null || result === void 0 ? void 0 : result.hour)) {
                time.setHours(result.hour);
            }
            if (util.isNotNil(result === null || result === void 0 ? void 0 : result.minute)) {
                time.setMinutes(result.minute);
            }
            if (util.isNotNil(result === null || result === void 0 ? void 0 : result.second)) {
                time.setSeconds(result.second);
            }
            if ((result === null || result === void 0 ? void 0 : result.period) === 1 && time.getHours() < 12) {
                time.setHours(time.getHours() + 12);
            }
            return time;
        };
        NgTimeParser.prototype.getTimeResult = function (str) {
            var match = this.regex.exec(str);
            var period = null;
            if (match) {
                if (util.isNotNil(this.matchMap.periodNarrow)) {
                    period = common.getLocaleDayPeriods(this.localeId, common.FormStyle.Format, common.TranslationWidth.Narrow).indexOf(match[this.matchMap.periodNarrow + 1]);
                }
                if (util.isNotNil(this.matchMap.periodWide)) {
                    period = common.getLocaleDayPeriods(this.localeId, common.FormStyle.Format, common.TranslationWidth.Wide).indexOf(match[this.matchMap.periodWide + 1]);
                }
                if (util.isNotNil(this.matchMap.periodAbbreviated)) {
                    period = common.getLocaleDayPeriods(this.localeId, common.FormStyle.Format, common.TranslationWidth.Abbreviated).indexOf(match[this.matchMap.periodAbbreviated + 1]);
                }
                return {
                    hour: util.isNotNil(this.matchMap.hour) ? Number.parseInt(match[this.matchMap.hour + 1], 10) : null,
                    minute: util.isNotNil(this.matchMap.minute) ? Number.parseInt(match[this.matchMap.minute + 1], 10) : null,
                    second: util.isNotNil(this.matchMap.second) ? Number.parseInt(match[this.matchMap.second + 1], 10) : null,
                    period: period
                };
            }
            else {
                return null;
            }
        };
        NgTimeParser.prototype.genRegexp = function () {
            var _this = this;
            var regexStr = this.format.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$&');
            var hourRegex = /h{1,2}/i;
            var minuteRegex = /m{1,2}/;
            var secondRegex = /s{1,2}/;
            var periodNarrow = /aaaaa/;
            var periodWide = /aaaa/;
            var periodAbbreviated = /a{1,3}/;
            var hourMatch = hourRegex.exec(this.format);
            var minuteMatch = minuteRegex.exec(this.format);
            var secondMatch = secondRegex.exec(this.format);
            var periodNarrowMatch = periodNarrow.exec(this.format);
            var periodWideMatch = null;
            var periodAbbreviatedMatch = null;
            if (!periodNarrowMatch) {
                periodWideMatch = periodWide.exec(this.format);
            }
            if (!periodWideMatch && !periodNarrowMatch) {
                periodAbbreviatedMatch = periodAbbreviated.exec(this.format);
            }
            var matchs = [hourMatch, minuteMatch, secondMatch, periodNarrowMatch, periodWideMatch, periodAbbreviatedMatch]
                .filter(function (m) { return !!m; })
                .sort(function (a, b) { return a.index - b.index; });
            matchs.forEach(function (match, index) {
                switch (match) {
                    case hourMatch:
                        _this.matchMap.hour = index;
                        regexStr = regexStr.replace(hourRegex, '(\\d{1,2})');
                        break;
                    case minuteMatch:
                        _this.matchMap.minute = index;
                        regexStr = regexStr.replace(minuteRegex, '(\\d{1,2})');
                        break;
                    case secondMatch:
                        _this.matchMap.second = index;
                        regexStr = regexStr.replace(secondRegex, '(\\d{1,2})');
                        break;
                    case periodNarrowMatch:
                        _this.matchMap.periodNarrow = index;
                        var periodsNarrow = common.getLocaleDayPeriods(_this.localeId, common.FormStyle.Format, common.TranslationWidth.Narrow).join('|');
                        regexStr = regexStr.replace(periodNarrow, "(" + periodsNarrow + ")");
                        break;
                    case periodWideMatch:
                        _this.matchMap.periodWide = index;
                        var periodsWide = common.getLocaleDayPeriods(_this.localeId, common.FormStyle.Format, common.TranslationWidth.Wide).join('|');
                        regexStr = regexStr.replace(periodWide, "(" + periodsWide + ")");
                        break;
                    case periodAbbreviatedMatch:
                        _this.matchMap.periodAbbreviated = index;
                        var periodsAbbreviated = common.getLocaleDayPeriods(_this.localeId, common.FormStyle.Format, common.TranslationWidth.Abbreviated).join('|');
                        regexStr = regexStr.replace(periodAbbreviated, "(" + periodsAbbreviated + ")");
                        break;
                }
            });
            this.regex = new RegExp(regexStr);
        };
        return NgTimeParser;
    }());

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CandyDate = CandyDate;
    exports.cloneDate = cloneDate;
    exports.normalizeRangeValue = normalizeRangeValue;
    exports.timeUnits = timeUnits;
    exports.wrongSortOrder = wrongSortOrder;
    exports.ɵNgTimeParser = NgTimeParser;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-time.umd.js.map
