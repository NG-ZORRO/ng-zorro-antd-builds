(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/core'), require('@angular/common'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/services'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('@angular/cdk/bidi'), require('ng-zorro-antd/affix')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/anchor', ['exports', '@angular/cdk/platform', '@angular/core', '@angular/common', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', '@angular/cdk/bidi', 'ng-zorro-antd/affix'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].anchor = {}), global.ng.cdk.platform, global.ng.core, global.ng.common, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.services, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global.ng.cdk.bidi, global['ng-zorro-antd'].affix));
}(this, (function (exports, platform, core, common, config, services, util, rxjs, operators, bidi, affix) { 'use strict';

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
    function getOffsetTop(element, container) {
        if (!element || !element.getClientRects().length) {
            return 0;
        }
        var rect = element.getBoundingClientRect();
        if (rect.width || rect.height) {
            if (container === window) {
                var documentElement = element.ownerDocument.documentElement;
                return rect.top - documentElement.clientTop;
            }
            return rect.top - container.getBoundingClientRect().top;
        }
        return rect.top;
    }

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NZ_CONFIG_MODULE_NAME = 'anchor';
    var sharpMatcherRegx = /#([^#]+)$/;
    var NzAnchorComponent = /** @class */ (function () {
        function NzAnchorComponent(doc, nzConfigService, scrollSrv, cdr, platform, zone, renderer) {
            this.doc = doc;
            this.nzConfigService = nzConfigService;
            this.scrollSrv = scrollSrv;
            this.cdr = cdr;
            this.platform = platform;
            this.zone = zone;
            this.renderer = renderer;
            this._nzModuleName = NZ_CONFIG_MODULE_NAME;
            this.nzAffix = true;
            this.nzShowInkInFixed = false;
            this.nzBounds = 5;
            this.nzOffsetTop = undefined;
            this.nzClick = new core.EventEmitter();
            this.nzScroll = new core.EventEmitter();
            this.visible = false;
            this.wrapperStyle = { 'max-height': '100vh' };
            this.links = [];
            this.animating = false;
            this.destroy$ = new rxjs.Subject();
            this.handleScrollTimeoutID = -1;
        }
        NzAnchorComponent.prototype.registerLink = function (link) {
            this.links.push(link);
        };
        NzAnchorComponent.prototype.unregisterLink = function (link) {
            this.links.splice(this.links.indexOf(link), 1);
        };
        NzAnchorComponent.prototype.getContainer = function () {
            return this.container || window;
        };
        NzAnchorComponent.prototype.ngAfterViewInit = function () {
            this.registerScrollEvent();
        };
        NzAnchorComponent.prototype.ngOnDestroy = function () {
            clearTimeout(this.handleScrollTimeoutID);
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzAnchorComponent.prototype.registerScrollEvent = function () {
            var _this = this;
            if (!this.platform.isBrowser) {
                return;
            }
            this.destroy$.next();
            this.zone.runOutsideAngular(function () {
                rxjs.fromEvent(_this.getContainer(), 'scroll')
                    .pipe(operators.throttleTime(50), operators.takeUntil(_this.destroy$))
                    .subscribe(function () { return _this.handleScroll(); });
            });
            // Browser would maintain the scrolling position when refreshing.
            // So we have to delay calculation in avoid of getting a incorrect result.
            this.handleScrollTimeoutID = setTimeout(function () { return _this.handleScroll(); });
        };
        NzAnchorComponent.prototype.handleScroll = function () {
            var _this = this;
            if (typeof document === 'undefined' || this.animating) {
                return;
            }
            var sections = [];
            var scope = (this.nzOffsetTop || 0) + this.nzBounds;
            this.links.forEach(function (comp) {
                var sharpLinkMatch = sharpMatcherRegx.exec(comp.nzHref.toString());
                if (!sharpLinkMatch) {
                    return;
                }
                var target = _this.doc.getElementById(sharpLinkMatch[1]);
                if (target) {
                    var top = getOffsetTop(target, _this.getContainer());
                    if (top < scope) {
                        sections.push({
                            top: top,
                            comp: comp
                        });
                    }
                }
            });
            this.visible = !!sections.length;
            if (!this.visible) {
                this.clearActive();
                this.cdr.detectChanges();
            }
            else {
                var maxSection = sections.reduce(function (prev, curr) { return (curr.top > prev.top ? curr : prev); });
                this.handleActive(maxSection.comp);
            }
            this.setVisible();
        };
        NzAnchorComponent.prototype.clearActive = function () {
            this.links.forEach(function (i) {
                i.unsetActive();
            });
        };
        NzAnchorComponent.prototype.handleActive = function (comp) {
            this.clearActive();
            comp.setActive();
            var linkNode = comp.getLinkTitleElement();
            this.ink.nativeElement.style.top = linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5 + "px";
            this.visible = true;
            this.setVisible();
            this.nzScroll.emit(comp);
        };
        NzAnchorComponent.prototype.setVisible = function () {
            var visible = this.visible;
            var visibleClassname = 'visible';
            if (this.ink) {
                if (visible) {
                    this.renderer.addClass(this.ink.nativeElement, visibleClassname);
                }
                else {
                    this.renderer.removeClass(this.ink.nativeElement, visibleClassname);
                }
            }
        };
        NzAnchorComponent.prototype.handleScrollTo = function (linkComp) {
            var _this = this;
            var el = this.doc.querySelector(linkComp.nzHref);
            if (!el) {
                return;
            }
            this.animating = true;
            var containerScrollTop = this.scrollSrv.getScroll(this.getContainer());
            var elOffsetTop = getOffsetTop(el, this.getContainer());
            var targetScrollTop = containerScrollTop + elOffsetTop - (this.nzOffsetTop || 0);
            this.scrollSrv.scrollTo(this.getContainer(), targetScrollTop, {
                callback: function () {
                    _this.animating = false;
                    _this.handleActive(linkComp);
                }
            });
            this.nzClick.emit(linkComp.nzHref);
        };
        NzAnchorComponent.prototype.ngOnChanges = function (changes) {
            var nzOffsetTop = changes.nzOffsetTop, nzContainer = changes.nzContainer;
            if (nzOffsetTop) {
                this.wrapperStyle = {
                    'max-height': "calc(100vh - " + this.nzOffsetTop + "px)"
                };
            }
            if (nzContainer) {
                var container = this.nzContainer;
                this.container = typeof container === 'string' ? this.doc.querySelector(container) : container;
                this.registerScrollEvent();
            }
        };
        return NzAnchorComponent;
    }());
    NzAnchorComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'nz-anchor',
                    exportAs: 'nzAnchor',
                    preserveWhitespaces: false,
                    template: "\n    <nz-affix *ngIf=\"nzAffix; else content\" [nzOffsetTop]=\"nzOffsetTop\" [nzTarget]=\"container\">\n      <ng-template [ngTemplateOutlet]=\"content\"></ng-template>\n    </nz-affix>\n    <ng-template #content>\n      <div class=\"ant-anchor-wrapper\" [ngStyle]=\"wrapperStyle\">\n        <div class=\"ant-anchor\" [ngClass]=\"{ fixed: !nzAffix && !nzShowInkInFixed }\">\n          <div class=\"ant-anchor-ink\">\n            <div class=\"ant-anchor-ink-ball\" #ink></div>\n          </div>\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </ng-template>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    NzAnchorComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
        { type: config.NzConfigService },
        { type: services.NzScrollService },
        { type: core.ChangeDetectorRef },
        { type: platform.Platform },
        { type: core.NgZone },
        { type: core.Renderer2 }
    ]; };
    NzAnchorComponent.propDecorators = {
        ink: [{ type: core.ViewChild, args: ['ink', { static: false },] }],
        nzAffix: [{ type: core.Input }],
        nzShowInkInFixed: [{ type: core.Input }],
        nzBounds: [{ type: core.Input }],
        nzOffsetTop: [{ type: core.Input }],
        nzContainer: [{ type: core.Input }],
        nzClick: [{ type: core.Output }],
        nzScroll: [{ type: core.Output }]
    };
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Object)
    ], NzAnchorComponent.prototype, "nzAffix", void 0);
    __decorate([
        config.WithConfig(),
        util.InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzAnchorComponent.prototype, "nzShowInkInFixed", void 0);
    __decorate([
        config.WithConfig(),
        util.InputNumber(),
        __metadata("design:type", Number)
    ], NzAnchorComponent.prototype, "nzBounds", void 0);
    __decorate([
        util.InputNumber(undefined),
        config.WithConfig(),
        __metadata("design:type", Number)
    ], NzAnchorComponent.prototype, "nzOffsetTop", void 0);

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzAnchorLinkComponent = /** @class */ (function () {
        function NzAnchorLinkComponent(elementRef, anchorComp, platform, renderer) {
            this.elementRef = elementRef;
            this.anchorComp = anchorComp;
            this.platform = platform;
            this.renderer = renderer;
            this.nzHref = '#';
            this.titleStr = '';
            this.renderer.addClass(elementRef.nativeElement, 'ant-anchor-link');
        }
        Object.defineProperty(NzAnchorLinkComponent.prototype, "nzTitle", {
            set: function (value) {
                if (value instanceof core.TemplateRef) {
                    this.titleStr = null;
                    this.titleTpl = value;
                }
                else {
                    this.titleStr = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        NzAnchorLinkComponent.prototype.ngOnInit = function () {
            this.anchorComp.registerLink(this);
        };
        NzAnchorLinkComponent.prototype.getLinkTitleElement = function () {
            return this.linkTitle.nativeElement;
        };
        NzAnchorLinkComponent.prototype.setActive = function () {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-anchor-link-active');
        };
        NzAnchorLinkComponent.prototype.unsetActive = function () {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-anchor-link-active');
        };
        NzAnchorLinkComponent.prototype.goToClick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.platform.isBrowser) {
                this.anchorComp.handleScrollTo(this);
            }
        };
        NzAnchorLinkComponent.prototype.ngOnDestroy = function () {
            this.anchorComp.unregisterLink(this);
        };
        return NzAnchorLinkComponent;
    }());
    NzAnchorLinkComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'nz-link',
                    exportAs: 'nzLink',
                    preserveWhitespaces: false,
                    template: "\n    <a #linkTitle (click)=\"goToClick($event)\" href=\"{{ nzHref }}\" class=\"ant-anchor-link-title\" title=\"{{ titleStr }}\">\n      <span *ngIf=\"titleStr; else titleTpl || nzTemplate\">{{ titleStr }}</span>\n    </a>\n    <ng-content></ng-content>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    NzAnchorLinkComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: NzAnchorComponent },
        { type: platform.Platform },
        { type: core.Renderer2 }
    ]; };
    NzAnchorLinkComponent.propDecorators = {
        nzHref: [{ type: core.Input }],
        nzTitle: [{ type: core.Input }],
        nzTemplate: [{ type: core.ContentChild, args: ['nzTemplate', { static: false },] }],
        linkTitle: [{ type: core.ViewChild, args: ['linkTitle',] }]
    };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzAnchorModule = /** @class */ (function () {
        function NzAnchorModule() {
        }
        return NzAnchorModule;
    }());
    NzAnchorModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [NzAnchorComponent, NzAnchorLinkComponent],
                    exports: [NzAnchorComponent, NzAnchorLinkComponent],
                    imports: [bidi.BidiModule, common.CommonModule, affix.NzAffixModule, platform.PlatformModule]
                },] }
    ];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NzAnchorComponent = NzAnchorComponent;
    exports.NzAnchorLinkComponent = NzAnchorLinkComponent;
    exports.NzAnchorModule = NzAnchorModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-anchor.umd.js.map
