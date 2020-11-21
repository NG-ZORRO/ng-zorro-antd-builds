(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/core/services'), require('ng-zorro-antd/core/util'), require('ng-zorro-antd/i18n'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@angular/forms'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/select')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/pagination', ['exports', '@angular/core', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/util', 'ng-zorro-antd/i18n', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/forms', 'ng-zorro-antd/icon', 'ng-zorro-antd/select'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].pagination = {}), global.ng.core, global['ng-zorro-antd'].core.services, global['ng-zorro-antd'].core.util, global['ng-zorro-antd'].i18n, global.rxjs, global.rxjs.operators, global.ng.common, global.ng.forms, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].select));
}(this, (function (exports, core, services, util, i18n, rxjs, operators, common, forms, icon, select) { 'use strict';

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

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzPaginationComponent = /** @class */ (function () {
        function NzPaginationComponent(i18n, cdr, breakpointService) {
            this.i18n = i18n;
            this.cdr = cdr;
            this.breakpointService = breakpointService;
            this.nzPageSizeChange = new core.EventEmitter();
            this.nzPageIndexChange = new core.EventEmitter();
            this.nzShowTotal = null;
            this.nzSize = 'default';
            this.nzPageSizeOptions = [10, 20, 30, 40];
            this.nzItemRender = null;
            this.nzDisabled = false;
            this.nzShowSizeChanger = false;
            this.nzHideOnSinglePage = false;
            this.nzShowQuickJumper = false;
            this.nzSimple = false;
            this.nzResponsive = false;
            this.nzTotal = 0;
            this.nzPageIndex = 1;
            this.nzPageSize = 10;
            this.showPagination = true;
            this.size = 'default';
            this.destroy$ = new rxjs.Subject();
            this.total$ = new rxjs.ReplaySubject(1);
        }
        NzPaginationComponent.prototype.validatePageIndex = function (value, lastIndex) {
            if (value > lastIndex) {
                return lastIndex;
            }
            else if (value < 1) {
                return 1;
            }
            else {
                return value;
            }
        };
        NzPaginationComponent.prototype.onPageIndexChange = function (index) {
            var lastIndex = this.getLastIndex(this.nzTotal, this.nzPageSize);
            var validIndex = this.validatePageIndex(index, lastIndex);
            if (validIndex !== this.nzPageIndex && !this.nzDisabled) {
                this.nzPageIndex = validIndex;
                this.nzPageIndexChange.emit(this.nzPageIndex);
            }
        };
        NzPaginationComponent.prototype.onPageSizeChange = function (size) {
            this.nzPageSize = size;
            this.nzPageSizeChange.emit(size);
            var lastIndex = this.getLastIndex(this.nzTotal, this.nzPageSize);
            if (this.nzPageIndex > lastIndex) {
                this.onPageIndexChange(lastIndex);
            }
        };
        NzPaginationComponent.prototype.onTotalChange = function (total) {
            var _this = this;
            var lastIndex = this.getLastIndex(total, this.nzPageSize);
            if (this.nzPageIndex > lastIndex) {
                Promise.resolve().then(function () { return _this.onPageIndexChange(lastIndex); });
            }
        };
        NzPaginationComponent.prototype.getLastIndex = function (total, pageSize) {
            return Math.ceil(total / pageSize);
        };
        NzPaginationComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.i18n.localeChange.pipe(operators.takeUntil(this.destroy$)).subscribe(function () {
                _this.locale = _this.i18n.getLocaleData('Pagination');
                _this.cdr.markForCheck();
            });
            this.total$.pipe(operators.takeUntil(this.destroy$)).subscribe(function (total) {
                _this.onTotalChange(total);
            });
            this.breakpointService
                .subscribe(services.gridResponsiveMap)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function (bp) {
                if (_this.nzResponsive) {
                    _this.size = bp === services.NzBreakpointEnum.xs ? 'small' : 'default';
                    _this.cdr.markForCheck();
                }
            });
        };
        NzPaginationComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzPaginationComponent.prototype.ngOnChanges = function (changes) {
            var nzHideOnSinglePage = changes.nzHideOnSinglePage, nzTotal = changes.nzTotal, nzPageSize = changes.nzPageSize, nzSize = changes.nzSize;
            if (nzTotal) {
                this.total$.next(this.nzTotal);
            }
            if (nzHideOnSinglePage || nzTotal || nzPageSize) {
                this.showPagination = (this.nzHideOnSinglePage && this.nzTotal > this.nzPageSize) || (this.nzTotal > 0 && !this.nzHideOnSinglePage);
            }
            if (nzSize) {
                this.size = nzSize.currentValue;
            }
        };
        return NzPaginationComponent;
    }());
    NzPaginationComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'nz-pagination',
                    exportAs: 'nzPagination',
                    preserveWhitespaces: false,
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    template: "\n    <ng-container *ngIf=\"showPagination\">\n      <ng-container *ngIf=\"nzSimple; else defaultPagination.template\">\n        <ng-template [ngTemplateOutlet]=\"simplePagination.template\"></ng-template>\n      </ng-container>\n    </ng-container>\n    <nz-pagination-simple\n      #simplePagination\n      [disabled]=\"nzDisabled\"\n      [itemRender]=\"nzItemRender\"\n      [locale]=\"locale\"\n      [pageSize]=\"nzPageSize\"\n      [total]=\"nzTotal\"\n      [pageIndex]=\"nzPageIndex\"\n      (pageIndexChange)=\"onPageIndexChange($event)\"\n    ></nz-pagination-simple>\n    <nz-pagination-default\n      #defaultPagination\n      [nzSize]=\"size\"\n      [itemRender]=\"nzItemRender\"\n      [showTotal]=\"nzShowTotal\"\n      [disabled]=\"nzDisabled\"\n      [locale]=\"locale\"\n      [showSizeChanger]=\"nzShowSizeChanger\"\n      [showQuickJumper]=\"nzShowQuickJumper\"\n      [total]=\"nzTotal\"\n      [pageIndex]=\"nzPageIndex\"\n      [pageSize]=\"nzPageSize\"\n      [pageSizeOptions]=\"nzPageSizeOptions\"\n      (pageIndexChange)=\"onPageIndexChange($event)\"\n      (pageSizeChange)=\"onPageSizeChange($event)\"\n    ></nz-pagination-default>\n  ",
                    host: {
                        '[class.ant-pagination]': 'true',
                        '[class.ant-pagination-simple]': 'nzSimple',
                        '[class.ant-pagination-disabled]': 'nzDisabled',
                        '[class.mini]': "!nzSimple && size === 'small'"
                    }
                },] }
    ];
    NzPaginationComponent.ctorParameters = function () { return [
        { type: i18n.NzI18nService },
        { type: core.ChangeDetectorRef },
        { type: services.NzBreakpointService }
    ]; };
    NzPaginationComponent.propDecorators = {
        nzPageSizeChange: [{ type: core.Output }],
        nzPageIndexChange: [{ type: core.Output }],
        nzShowTotal: [{ type: core.Input }],
        nzSize: [{ type: core.Input }],
        nzPageSizeOptions: [{ type: core.Input }],
        nzItemRender: [{ type: core.Input }],
        nzDisabled: [{ type: core.Input }],
        nzShowSizeChanger: [{ type: core.Input }],
        nzHideOnSinglePage: [{ type: core.Input }],
        nzShowQuickJumper: [{ type: core.Input }],
        nzSimple: [{ type: core.Input }],
        nzResponsive: [{ type: core.Input }],
        nzTotal: [{ type: core.Input }],
        nzPageIndex: [{ type: core.Input }],
        nzPageSize: [{ type: core.Input }]
    };
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzDisabled", void 0);
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzShowSizeChanger", void 0);
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzHideOnSinglePage", void 0);
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzShowQuickJumper", void 0);
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzSimple", void 0);
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzResponsive", void 0);
    __decorate([
        util.InputNumber(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzTotal", void 0);
    __decorate([
        util.InputNumber(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzPageIndex", void 0);
    __decorate([
        util.InputNumber(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzPageSize", void 0);

    var NzPaginationDefaultComponent = /** @class */ (function () {
        function NzPaginationDefaultComponent(renderer, elementRef) {
            this.nzSize = 'default';
            this.itemRender = null;
            this.showTotal = null;
            this.disabled = false;
            this.showSizeChanger = false;
            this.showQuickJumper = false;
            this.total = 0;
            this.pageIndex = 1;
            this.pageSize = 10;
            this.pageSizeOptions = [10, 20, 30, 40];
            this.pageIndexChange = new core.EventEmitter();
            this.pageSizeChange = new core.EventEmitter();
            this.ranges = [0, 0];
            this.listOfPageItem = [];
            renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
        }
        NzPaginationDefaultComponent.prototype.jumpPage = function (index) {
            this.onPageIndexChange(index);
        };
        NzPaginationDefaultComponent.prototype.jumpDiff = function (diff) {
            this.jumpPage(this.pageIndex + diff);
        };
        NzPaginationDefaultComponent.prototype.trackByPageItem = function (_, value) {
            return value.type + "-" + value.index;
        };
        NzPaginationDefaultComponent.prototype.onPageIndexChange = function (index) {
            this.pageIndexChange.next(index);
        };
        NzPaginationDefaultComponent.prototype.onPageSizeChange = function (size) {
            this.pageSizeChange.next(size);
        };
        NzPaginationDefaultComponent.prototype.getLastIndex = function (total, pageSize) {
            return Math.ceil(total / pageSize);
        };
        NzPaginationDefaultComponent.prototype.buildIndexes = function () {
            var lastIndex = this.getLastIndex(this.total, this.pageSize);
            this.listOfPageItem = this.getListOfPageItem(this.pageIndex, lastIndex);
        };
        NzPaginationDefaultComponent.prototype.getListOfPageItem = function (pageIndex, lastIndex) {
            var concatWithPrevNext = function (listOfPage) {
                var prevItem = {
                    type: 'prev',
                    disabled: pageIndex === 1
                };
                var nextItem = {
                    type: 'next',
                    disabled: pageIndex === lastIndex
                };
                return __spread([prevItem], listOfPage, [nextItem]);
            };
            var generatePage = function (start, end) {
                var list = [];
                for (var i = start; i <= end; i++) {
                    list.push({
                        index: i,
                        type: 'page'
                    });
                }
                return list;
            };
            if (lastIndex <= 9) {
                return concatWithPrevNext(generatePage(1, lastIndex));
            }
            else {
                var generateRangeItem = function (selected, last) {
                    var listOfRange = [];
                    var prevFiveItem = {
                        type: 'prev_5'
                    };
                    var nextFiveItem = {
                        type: 'next_5'
                    };
                    var firstPageItem = generatePage(1, 1);
                    var lastPageItem = generatePage(lastIndex, lastIndex);
                    if (selected < 4) {
                        listOfRange = __spread(generatePage(2, 5), [nextFiveItem]);
                    }
                    else if (selected < last - 3) {
                        listOfRange = __spread([prevFiveItem], generatePage(selected - 2, selected + 2), [nextFiveItem]);
                    }
                    else {
                        listOfRange = __spread([prevFiveItem], generatePage(last - 4, last - 1));
                    }
                    return __spread(firstPageItem, listOfRange, lastPageItem);
                };
                return concatWithPrevNext(generateRangeItem(pageIndex, lastIndex));
            }
        };
        NzPaginationDefaultComponent.prototype.ngOnChanges = function (changes) {
            var pageIndex = changes.pageIndex, pageSize = changes.pageSize, total = changes.total;
            if (pageIndex || pageSize || total) {
                this.ranges = [(this.pageIndex - 1) * this.pageSize + 1, Math.min(this.pageIndex * this.pageSize, this.total)];
                this.buildIndexes();
            }
        };
        return NzPaginationDefaultComponent;
    }());
    NzPaginationDefaultComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'nz-pagination-default',
                    preserveWhitespaces: false,
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    template: "\n    <ng-template #containerTemplate>\n      <li class=\"ant-pagination-total-text\" *ngIf=\"showTotal\">\n        <ng-template [ngTemplateOutlet]=\"showTotal\" [ngTemplateOutletContext]=\"{ $implicit: total, range: ranges }\"></ng-template>\n      </li>\n      <li\n        *ngFor=\"let page of listOfPageItem; trackBy: trackByPageItem\"\n        nz-pagination-item\n        [locale]=\"locale\"\n        [type]=\"page.type\"\n        [index]=\"page.index\"\n        [disabled]=\"!!page.disabled\"\n        [itemRender]=\"itemRender\"\n        [active]=\"pageIndex === page.index\"\n        (gotoIndex)=\"jumpPage($event)\"\n        (diffIndex)=\"jumpDiff($event)\"\n      ></li>\n      <div\n        nz-pagination-options\n        *ngIf=\"showQuickJumper || showSizeChanger\"\n        [total]=\"total\"\n        [locale]=\"locale\"\n        [disabled]=\"disabled\"\n        [nzSize]=\"nzSize\"\n        [showSizeChanger]=\"showSizeChanger\"\n        [showQuickJumper]=\"showQuickJumper\"\n        [pageIndex]=\"pageIndex\"\n        [pageSize]=\"pageSize\"\n        [pageSizeOptions]=\"pageSizeOptions\"\n        (pageIndexChange)=\"onPageIndexChange($event)\"\n        (pageSizeChange)=\"onPageSizeChange($event)\"\n      ></div>\n    </ng-template>\n  "
                },] }
    ];
    NzPaginationDefaultComponent.ctorParameters = function () { return [
        { type: core.Renderer2 },
        { type: core.ElementRef }
    ]; };
    NzPaginationDefaultComponent.propDecorators = {
        template: [{ type: core.ViewChild, args: ['containerTemplate', { static: true },] }],
        nzSize: [{ type: core.Input }],
        itemRender: [{ type: core.Input }],
        showTotal: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        locale: [{ type: core.Input }],
        showSizeChanger: [{ type: core.Input }],
        showQuickJumper: [{ type: core.Input }],
        total: [{ type: core.Input }],
        pageIndex: [{ type: core.Input }],
        pageSize: [{ type: core.Input }],
        pageSizeOptions: [{ type: core.Input }],
        pageIndexChange: [{ type: core.Output }],
        pageSizeChange: [{ type: core.Output }]
    };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzPaginationItemComponent = /** @class */ (function () {
        function NzPaginationItemComponent() {
            this.active = false;
            this.index = null;
            this.disabled = false;
            this.type = null;
            this.itemRender = null;
            this.diffIndex = new core.EventEmitter();
            this.gotoIndex = new core.EventEmitter();
            this.title = null;
        }
        NzPaginationItemComponent.prototype.clickItem = function () {
            if (!this.disabled) {
                if (this.type === 'page') {
                    this.gotoIndex.emit(this.index);
                }
                else {
                    this.diffIndex.emit({
                        next: 1,
                        prev: -1,
                        prev_5: -5,
                        next_5: 5
                    }[this.type]);
                }
            }
        };
        NzPaginationItemComponent.prototype.ngOnChanges = function (changes) {
            var _a, _b, _c, _d;
            var locale = changes.locale, index = changes.index, type = changes.type;
            if (locale || index || type) {
                this.title = {
                    page: "" + this.index,
                    next: (_a = this.locale) === null || _a === void 0 ? void 0 : _a.next_page,
                    prev: (_b = this.locale) === null || _b === void 0 ? void 0 : _b.prev_page,
                    prev_5: (_c = this.locale) === null || _c === void 0 ? void 0 : _c.prev_5,
                    next_5: (_d = this.locale) === null || _d === void 0 ? void 0 : _d.next_5
                }[this.type];
            }
        };
        return NzPaginationItemComponent;
    }());
    NzPaginationItemComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'li[nz-pagination-item]',
                    preserveWhitespaces: false,
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    template: "\n    <ng-template #renderItemTemplate let-type let-page=\"page\">\n      <ng-container [ngSwitch]=\"type\">\n        <a *ngSwitchCase=\"'page'\">{{ page }}</a>\n        <button [disabled]=\"disabled\" class=\"ant-pagination-item-link\" *ngSwitchCase=\"'prev'\"><i nz-icon nzType=\"left\"></i></button>\n        <button [disabled]=\"disabled\" class=\"ant-pagination-item-link\" *ngSwitchCase=\"'next'\"><i nz-icon nzType=\"right\"></i></button>\n        <ng-container *ngSwitchDefault>\n          <a class=\"ant-pagination-item-link\" [ngSwitch]=\"type\">\n            <div class=\"ant-pagination-item-container\" *ngSwitchDefault>\n              <ng-container [ngSwitch]=\"type\">\n                <i *ngSwitchCase=\"'prev_5'\" nz-icon nzType=\"double-left\" class=\"ant-pagination-item-link-icon\"></i>\n                <i *ngSwitchCase=\"'next_5'\" nz-icon nzType=\"double-right\" class=\"ant-pagination-item-link-icon\"></i>\n              </ng-container>\n              <span class=\"ant-pagination-item-ellipsis\">\u2022\u2022\u2022</span>\n            </div>\n          </a>\n        </ng-container>\n      </ng-container>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"itemRender || renderItemTemplate\"\n      [ngTemplateOutletContext]=\"{ $implicit: type, page: index }\"\n    ></ng-template>\n  ",
                    host: {
                        '[class.ant-pagination-prev]': "type === 'prev'",
                        '[class.ant-pagination-next]': "type === 'next'",
                        '[class.ant-pagination-item]': "type === 'page'",
                        '[class.ant-pagination-jump-prev]': "type === 'prev_5'",
                        '[class.ant-pagination-jump-prev-custom-icon]': "type === 'prev_5'",
                        '[class.ant-pagination-jump-next]': "type === 'next_5'",
                        '[class.ant-pagination-jump-next-custom-icon]': "type === 'next_5'",
                        '[class.ant-pagination-disabled]': 'disabled',
                        '[class.ant-pagination-item-active]]': 'active',
                        '[attr.title]': 'title',
                        '(click)': 'clickItem()'
                    }
                },] }
    ];
    NzPaginationItemComponent.propDecorators = {
        active: [{ type: core.Input }],
        locale: [{ type: core.Input }],
        index: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        type: [{ type: core.Input }],
        itemRender: [{ type: core.Input }],
        diffIndex: [{ type: core.Output }],
        gotoIndex: [{ type: core.Output }]
    };

    var NzPaginationOptionsComponent = /** @class */ (function () {
        function NzPaginationOptionsComponent() {
            this.nzSize = 'default';
            this.disabled = false;
            this.showSizeChanger = false;
            this.showQuickJumper = false;
            this.total = 0;
            this.pageIndex = 1;
            this.pageSize = 10;
            this.pageSizeOptions = [];
            this.pageIndexChange = new core.EventEmitter();
            this.pageSizeChange = new core.EventEmitter();
            this.listOfPageSizeOption = [];
        }
        NzPaginationOptionsComponent.prototype.onPageSizeChange = function (size) {
            if (this.pageSize !== size) {
                this.pageSizeChange.next(size);
            }
        };
        NzPaginationOptionsComponent.prototype.jumpToPageViaInput = function ($event) {
            var target = $event.target;
            var index = Math.floor(util.toNumber(target.value, this.pageIndex));
            this.pageIndexChange.next(index);
            target.value = '';
        };
        NzPaginationOptionsComponent.prototype.trackByOption = function (_, option) {
            return option.value;
        };
        NzPaginationOptionsComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            var pageSize = changes.pageSize, pageSizeOptions = changes.pageSizeOptions, locale = changes.locale;
            if (pageSize || pageSizeOptions || locale) {
                this.listOfPageSizeOption = __spread(new Set(__spread(this.pageSizeOptions, [this.pageSize]))).map(function (item) {
                    return {
                        value: item,
                        label: item + " " + _this.locale.items_per_page
                    };
                });
            }
        };
        return NzPaginationOptionsComponent;
    }());
    NzPaginationOptionsComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'div[nz-pagination-options]',
                    preserveWhitespaces: false,
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    template: "\n    <nz-select\n      class=\"ant-pagination-options-size-changer\"\n      *ngIf=\"showSizeChanger\"\n      [nzDisabled]=\"disabled\"\n      [nzSize]=\"nzSize\"\n      [ngModel]=\"pageSize\"\n      (ngModelChange)=\"onPageSizeChange($event)\"\n    >\n      <nz-option\n        *ngFor=\"let option of listOfPageSizeOption; trackBy: trackByOption\"\n        [nzLabel]=\"option.label\"\n        [nzValue]=\"option.value\"\n      ></nz-option>\n    </nz-select>\n    <div class=\"ant-pagination-options-quick-jumper\" *ngIf=\"showQuickJumper\">\n      {{ locale.jump_to }}\n      <input [disabled]=\"disabled\" (keydown.enter)=\"jumpToPageViaInput($event)\" />\n      {{ locale.page }}\n    </div>\n  ",
                    host: {
                        '[class.ant-pagination-options]': 'true'
                    }
                },] }
    ];
    NzPaginationOptionsComponent.propDecorators = {
        nzSize: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        showSizeChanger: [{ type: core.Input }],
        showQuickJumper: [{ type: core.Input }],
        locale: [{ type: core.Input }],
        total: [{ type: core.Input }],
        pageIndex: [{ type: core.Input }],
        pageSize: [{ type: core.Input }],
        pageSizeOptions: [{ type: core.Input }],
        pageIndexChange: [{ type: core.Output }],
        pageSizeChange: [{ type: core.Output }]
    };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzPaginationSimpleComponent = /** @class */ (function () {
        function NzPaginationSimpleComponent(renderer, elementRef) {
            this.itemRender = null;
            this.disabled = false;
            this.total = 0;
            this.pageIndex = 1;
            this.pageSize = 10;
            this.pageIndexChange = new core.EventEmitter();
            this.lastIndex = 0;
            this.isFirstIndex = false;
            this.isLastIndex = false;
            renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
        }
        NzPaginationSimpleComponent.prototype.jumpToPageViaInput = function ($event) {
            var target = $event.target;
            var index = util.toNumber(target.value, this.pageIndex);
            this.onPageIndexChange(index);
            target.value = "" + this.pageIndex;
        };
        NzPaginationSimpleComponent.prototype.prePage = function () {
            this.onPageIndexChange(this.pageIndex - 1);
        };
        NzPaginationSimpleComponent.prototype.nextPage = function () {
            this.onPageIndexChange(this.pageIndex + 1);
        };
        NzPaginationSimpleComponent.prototype.onPageIndexChange = function (index) {
            this.pageIndexChange.next(index);
        };
        NzPaginationSimpleComponent.prototype.updateBindingValue = function () {
            this.lastIndex = Math.ceil(this.total / this.pageSize);
            this.isFirstIndex = this.pageIndex === 1;
            this.isLastIndex = this.pageIndex === this.lastIndex;
        };
        NzPaginationSimpleComponent.prototype.ngOnChanges = function (changes) {
            var pageIndex = changes.pageIndex, total = changes.total, pageSize = changes.pageSize;
            if (pageIndex || total || pageSize) {
                this.updateBindingValue();
            }
        };
        return NzPaginationSimpleComponent;
    }());
    NzPaginationSimpleComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'nz-pagination-simple',
                    preserveWhitespaces: false,
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    template: "\n    <ng-template #containerTemplate>\n      <li\n        nz-pagination-item\n        [attr.title]=\"locale.prev_page\"\n        [disabled]=\"isFirstIndex\"\n        (click)=\"prePage()\"\n        type=\"prev\"\n        [itemRender]=\"itemRender\"\n      ></li>\n      <li [attr.title]=\"pageIndex + '/' + lastIndex\" class=\"ant-pagination-simple-pager\">\n        <input [disabled]=\"disabled\" [value]=\"pageIndex\" (keydown.enter)=\"jumpToPageViaInput($event)\" size=\"3\" />\n        <span class=\"ant-pagination-slash\">/</span>\n        {{ lastIndex }}\n      </li>\n      <li\n        nz-pagination-item\n        [attr.title]=\"locale?.next_page\"\n        [disabled]=\"isLastIndex\"\n        (click)=\"nextPage()\"\n        type=\"next\"\n        [itemRender]=\"itemRender\"\n      ></li>\n    </ng-template>\n  "
                },] }
    ];
    NzPaginationSimpleComponent.ctorParameters = function () { return [
        { type: core.Renderer2 },
        { type: core.ElementRef }
    ]; };
    NzPaginationSimpleComponent.propDecorators = {
        template: [{ type: core.ViewChild, args: ['containerTemplate', { static: true },] }],
        itemRender: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        locale: [{ type: core.Input }],
        total: [{ type: core.Input }],
        pageIndex: [{ type: core.Input }],
        pageSize: [{ type: core.Input }],
        pageIndexChange: [{ type: core.Output }]
    };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzPaginationModule = /** @class */ (function () {
        function NzPaginationModule() {
        }
        return NzPaginationModule;
    }());
    NzPaginationModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [
                        NzPaginationComponent,
                        NzPaginationSimpleComponent,
                        NzPaginationOptionsComponent,
                        NzPaginationItemComponent,
                        NzPaginationDefaultComponent
                    ],
                    exports: [NzPaginationComponent],
                    imports: [common.CommonModule, forms.FormsModule, select.NzSelectModule, i18n.NzI18nModule, icon.NzIconModule]
                },] }
    ];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NzPaginationComponent = NzPaginationComponent;
    exports.NzPaginationDefaultComponent = NzPaginationDefaultComponent;
    exports.NzPaginationItemComponent = NzPaginationItemComponent;
    exports.NzPaginationModule = NzPaginationModule;
    exports.NzPaginationOptionsComponent = NzPaginationOptionsComponent;
    exports.NzPaginationSimpleComponent = NzPaginationSimpleComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-pagination.umd.js.map
