(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/bidi'), require('@angular/cdk/layout'), require('@angular/cdk/platform'), require('@angular/core'), require('ng-zorro-antd/core/services'), require('rxjs'), require('rxjs/operators'), require('ng-zorro-antd/core/util'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/grid', ['exports', '@angular/cdk/bidi', '@angular/cdk/layout', '@angular/cdk/platform', '@angular/core', 'ng-zorro-antd/core/services', 'rxjs', 'rxjs/operators', 'ng-zorro-antd/core/util', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].grid = {}), global.ng.cdk.bidi, global.ng.cdk.layout, global.ng.cdk.platform, global.ng.core, global['ng-zorro-antd'].core.services, global.rxjs, global.rxjs.operators, global['ng-zorro-antd'].core.util, global.ng.common));
}(this, (function (exports, bidi, layout, platform, core, services, rxjs, operators, util, common) { 'use strict';

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
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
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
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var NzRowDirective = /** @class */ (function () {
        function NzRowDirective(elementRef, renderer, mediaMatcher, ngZone, platform, breakpointService, directionality) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.mediaMatcher = mediaMatcher;
            this.ngZone = ngZone;
            this.platform = platform;
            this.breakpointService = breakpointService;
            this.directionality = directionality;
            this.nzAlign = null;
            this.nzJustify = null;
            this.nzGutter = null;
            this.actualGutter$ = new rxjs.ReplaySubject(1);
            this.dir = 'ltr';
            this.destroy$ = new rxjs.Subject();
            // TODO: move to host after View Engine deprecation
            this.elementRef.nativeElement.classList.add('ant-row');
        }
        NzRowDirective.prototype.getGutter = function () {
            var _this = this;
            var results = [null, null];
            var gutter = this.nzGutter || 0;
            var normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, null];
            normalizedGutter.forEach(function (g, index) {
                if (typeof g === 'object' && g !== null) {
                    results[index] = null;
                    Object.keys(services.gridResponsiveMap).map(function (screen) {
                        var bp = screen;
                        if (_this.mediaMatcher.matchMedia(services.gridResponsiveMap[bp]).matches && g[bp]) {
                            results[index] = g[bp];
                        }
                    });
                }
                else {
                    results[index] = Number(g) || null;
                }
            });
            return results;
        };
        NzRowDirective.prototype.setGutterStyle = function () {
            var _this = this;
            var _b = __read(this.getGutter(), 2), horizontalGutter = _b[0], verticalGutter = _b[1];
            this.actualGutter$.next([horizontalGutter, verticalGutter]);
            var renderGutter = function (name, gutter) {
                var nativeElement = _this.elementRef.nativeElement;
                if (gutter !== null) {
                    _this.renderer.setStyle(nativeElement, name, "-" + gutter / 2 + "px");
                }
            };
            renderGutter('margin-left', horizontalGutter);
            renderGutter('margin-right', horizontalGutter);
            renderGutter('margin-top', verticalGutter);
            renderGutter('margin-bottom', verticalGutter);
        };
        NzRowDirective.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            this.dir = this.directionality.value;
            (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(operators.takeUntil(this.destroy$)).subscribe(function (direction) {
                _this.dir = direction;
            });
            this.setGutterStyle();
        };
        NzRowDirective.prototype.ngOnChanges = function (changes) {
            if (changes.nzGutter) {
                this.setGutterStyle();
            }
        };
        NzRowDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.platform.isBrowser) {
                this.breakpointService
                    .subscribe(services.gridResponsiveMap)
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe(function () {
                    _this.setGutterStyle();
                });
            }
        };
        NzRowDirective.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        return NzRowDirective;
    }());
    NzRowDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[nz-row],nz-row,nz-form-item',
                    exportAs: 'nzRow',
                    host: {
                        '[class.ant-row-top]': "nzAlign === 'top'",
                        '[class.ant-row-middle]': "nzAlign === 'middle'",
                        '[class.ant-row-bottom]': "nzAlign === 'bottom'",
                        '[class.ant-row-start]': "nzJustify === 'start'",
                        '[class.ant-row-end]': "nzJustify === 'end'",
                        '[class.ant-row-center]': "nzJustify === 'center'",
                        '[class.ant-row-space-around]': "nzJustify === 'space-around'",
                        '[class.ant-row-space-between]': "nzJustify === 'space-between'",
                        '[class.ant-row-rtl]': "dir === \"rtl\""
                    }
                },] }
    ];
    NzRowDirective.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: layout.MediaMatcher },
        { type: core.NgZone },
        { type: platform.Platform },
        { type: services.NzBreakpointService },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
    ]; };
    NzRowDirective.propDecorators = {
        nzAlign: [{ type: core.Input }],
        nzJustify: [{ type: core.Input }],
        nzGutter: [{ type: core.Input }]
    };

    var NzColDirective = /** @class */ (function () {
        function NzColDirective(elementRef, nzRowDirective, renderer, directionality) {
            this.elementRef = elementRef;
            this.nzRowDirective = nzRowDirective;
            this.renderer = renderer;
            this.directionality = directionality;
            this.classMap = {};
            this.destroy$ = new rxjs.Subject();
            this.hostFlexStyle = null;
            this.dir = 'ltr';
            this.nzFlex = null;
            this.nzSpan = null;
            this.nzOrder = null;
            this.nzOffset = null;
            this.nzPush = null;
            this.nzPull = null;
            this.nzXs = null;
            this.nzSm = null;
            this.nzMd = null;
            this.nzLg = null;
            this.nzXl = null;
            this.nzXXl = null;
        }
        NzColDirective.prototype.setHostClassMap = function () {
            var _a;
            var hostClassMap = Object.assign((_a = {}, _a['ant-col'] = true, _a["ant-col-" + this.nzSpan] = util.isNotNil(this.nzSpan), _a["ant-col-order-" + this.nzOrder] = util.isNotNil(this.nzOrder), _a["ant-col-offset-" + this.nzOffset] = util.isNotNil(this.nzOffset), _a["ant-col-pull-" + this.nzPull] = util.isNotNil(this.nzPull), _a["ant-col-push-" + this.nzPush] = util.isNotNil(this.nzPush), _a['ant-col-rtl'] = this.dir === 'rtl', _a), this.generateClass());
            for (var i in this.classMap) {
                if (this.classMap.hasOwnProperty(i)) {
                    this.renderer.removeClass(this.elementRef.nativeElement, i);
                }
            }
            this.classMap = Object.assign({}, hostClassMap);
            for (var i in this.classMap) {
                if (this.classMap.hasOwnProperty(i) && this.classMap[i]) {
                    this.renderer.addClass(this.elementRef.nativeElement, i);
                }
            }
        };
        NzColDirective.prototype.setHostFlexStyle = function () {
            this.hostFlexStyle = this.parseFlex(this.nzFlex);
        };
        NzColDirective.prototype.parseFlex = function (flex) {
            if (typeof flex === 'number') {
                return flex + " " + flex + " auto";
            }
            else if (typeof flex === 'string') {
                if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
                    return "0 0 " + flex;
                }
            }
            return flex;
        };
        NzColDirective.prototype.generateClass = function () {
            var _this = this;
            var listOfSizeInputName = ['nzXs', 'nzSm', 'nzMd', 'nzLg', 'nzXl', 'nzXXl'];
            var listClassMap = {};
            listOfSizeInputName.forEach(function (name) {
                var sizeName = name.replace('nz', '').toLowerCase();
                if (util.isNotNil(_this[name])) {
                    if (typeof _this[name] === 'number' || typeof _this[name] === 'string') {
                        listClassMap["ant-col-" + sizeName + "-" + _this[name]] = true;
                    }
                    else {
                        var embedded_1 = _this[name];
                        var prefixArray = ['span', 'pull', 'push', 'offset', 'order'];
                        prefixArray.forEach(function (prefix) {
                            var prefixClass = prefix === 'span' ? '-' : "-" + prefix + "-";
                            listClassMap["ant-col-" + sizeName + prefixClass + embedded_1[prefix]] = embedded_1 && util.isNotNil(embedded_1[prefix]);
                        });
                    }
                }
            });
            return listClassMap;
        };
        NzColDirective.prototype.ngOnInit = function () {
            var _this = this;
            this.dir = this.directionality.value;
            this.directionality.change.pipe(operators.takeUntil(this.destroy$)).subscribe(function (direction) {
                _this.dir = direction;
                _this.setHostClassMap();
            });
            this.setHostClassMap();
            this.setHostFlexStyle();
        };
        NzColDirective.prototype.ngOnChanges = function (changes) {
            this.setHostClassMap();
            var nzFlex = changes.nzFlex;
            if (nzFlex) {
                this.setHostFlexStyle();
            }
        };
        NzColDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.nzRowDirective) {
                this.nzRowDirective.actualGutter$.pipe(operators.takeUntil(this.destroy$)).subscribe(function (_a) {
                    var _b = __read(_a, 2), horizontalGutter = _b[0], verticalGutter = _b[1];
                    var renderGutter = function (name, gutter) {
                        var nativeElement = _this.elementRef.nativeElement;
                        if (gutter !== null) {
                            _this.renderer.setStyle(nativeElement, name, gutter / 2 + "px");
                        }
                    };
                    renderGutter('padding-left', horizontalGutter);
                    renderGutter('padding-right', horizontalGutter);
                    renderGutter('padding-top', verticalGutter);
                    renderGutter('padding-bottom', verticalGutter);
                });
            }
        };
        NzColDirective.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        return NzColDirective;
    }());
    NzColDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[nz-col],nz-col,nz-form-control,nz-form-label',
                    exportAs: 'nzCol',
                    host: {
                        '[style.flex]': 'hostFlexStyle'
                    }
                },] }
    ];
    NzColDirective.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: NzRowDirective, decorators: [{ type: core.Optional }, { type: core.Host }] },
        { type: core.Renderer2 },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
    ]; };
    NzColDirective.propDecorators = {
        nzFlex: [{ type: core.Input }],
        nzSpan: [{ type: core.Input }],
        nzOrder: [{ type: core.Input }],
        nzOffset: [{ type: core.Input }],
        nzPush: [{ type: core.Input }],
        nzPull: [{ type: core.Input }],
        nzXs: [{ type: core.Input }],
        nzSm: [{ type: core.Input }],
        nzMd: [{ type: core.Input }],
        nzLg: [{ type: core.Input }],
        nzXl: [{ type: core.Input }],
        nzXXl: [{ type: core.Input }]
    };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzGridModule = /** @class */ (function () {
        function NzGridModule() {
        }
        return NzGridModule;
    }());
    NzGridModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [NzColDirective, NzRowDirective],
                    exports: [NzColDirective, NzRowDirective],
                    imports: [bidi.BidiModule, common.CommonModule, layout.LayoutModule, platform.PlatformModule]
                },] }
    ];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NzColDirective = NzColDirective;
    exports.NzGridModule = NzGridModule;
    exports.NzRowDirective = NzRowDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-grid.umd.js.map
