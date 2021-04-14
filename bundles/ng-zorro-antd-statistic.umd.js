(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/core'), require('rxjs'), require('@angular/cdk/bidi'), require('rxjs/operators'), require('@angular/common'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/core/pipe')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/statistic', ['exports', '@angular/cdk/platform', '@angular/core', 'rxjs', '@angular/cdk/bidi', 'rxjs/operators', '@angular/common', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/core/pipe'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].statistic = {}), global.ng.cdk.platform, global.ng.core, global.rxjs, global.ng.cdk.bidi, global.rxjs.operators, global.ng.common, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].core.pipe));
}(this, (function (exports, platform, core, rxjs, bidi, operators, common, outlet, pipe) { 'use strict';

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

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzStatisticComponent = /** @class */ (function () {
        function NzStatisticComponent(cdr, directionality) {
            this.cdr = cdr;
            this.directionality = directionality;
            this.nzValueStyle = {};
            this.dir = 'ltr';
            this.destroy$ = new rxjs.Subject();
        }
        NzStatisticComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(operators.takeUntil(this.destroy$)).subscribe(function (direction) {
                _this.dir = direction;
                _this.cdr.detectChanges();
            });
            this.dir = this.directionality.value;
        };
        NzStatisticComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        return NzStatisticComponent;
    }());
    NzStatisticComponent.decorators = [
        { type: core.Component, args: [{
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    selector: 'nz-statistic',
                    exportAs: 'nzStatistic',
                    template: "\n    <div class=\"ant-statistic\" [class.ant-statistic-rtl]=\"dir === 'rtl'\">\n      <div class=\"ant-statistic-title\">\n        <ng-container *nzStringTemplateOutlet=\"nzTitle\">{{ nzTitle }}</ng-container>\n      </div>\n      <div class=\"ant-statistic-content\" [ngStyle]=\"nzValueStyle\">\n        <span *ngIf=\"nzPrefix\" class=\"ant-statistic-content-prefix\">\n          <ng-container *nzStringTemplateOutlet=\"nzPrefix\">{{ nzPrefix }}</ng-container>\n        </span>\n        <nz-statistic-number [nzValue]=\"nzValue\" [nzValueTemplate]=\"nzValueTemplate\"></nz-statistic-number>\n        <span *ngIf=\"nzSuffix\" class=\"ant-statistic-content-suffix\">\n          <ng-container *nzStringTemplateOutlet=\"nzSuffix\">{{ nzSuffix }}</ng-container>\n        </span>\n      </div>\n    </div>\n  "
                },] }
    ];
    NzStatisticComponent.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
    ]; };
    NzStatisticComponent.propDecorators = {
        nzPrefix: [{ type: core.Input }],
        nzSuffix: [{ type: core.Input }],
        nzTitle: [{ type: core.Input }],
        nzValue: [{ type: core.Input }],
        nzValueStyle: [{ type: core.Input }],
        nzValueTemplate: [{ type: core.Input }]
    };

    var REFRESH_INTERVAL = 1000 / 30;
    var NzCountdownComponent = /** @class */ (function (_super) {
        __extends(NzCountdownComponent, _super);
        function NzCountdownComponent(cdr, ngZone, platform, directionality) {
            var _this = _super.call(this, cdr, directionality) || this;
            _this.ngZone = ngZone;
            _this.platform = platform;
            _this.nzFormat = 'HH:mm:ss';
            _this.nzCountdownFinish = new core.EventEmitter();
            _this.target = 0;
            return _this;
        }
        NzCountdownComponent.prototype.ngOnChanges = function (changes) {
            if (changes.nzValue) {
                this.target = Number(changes.nzValue.currentValue);
                if (!changes.nzValue.isFirstChange()) {
                    this.syncTimer();
                }
            }
        };
        NzCountdownComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            this.syncTimer();
        };
        NzCountdownComponent.prototype.ngOnDestroy = function () {
            this.stopTimer();
        };
        NzCountdownComponent.prototype.syncTimer = function () {
            if (this.target >= Date.now()) {
                this.startTimer();
            }
            else {
                this.stopTimer();
            }
        };
        NzCountdownComponent.prototype.startTimer = function () {
            var _this = this;
            if (this.platform.isBrowser) {
                this.ngZone.runOutsideAngular(function () {
                    _this.stopTimer();
                    _this.updater_ = rxjs.interval(REFRESH_INTERVAL).subscribe(function () {
                        _this.updateValue();
                        _this.cdr.detectChanges();
                    });
                });
            }
        };
        NzCountdownComponent.prototype.stopTimer = function () {
            if (this.updater_) {
                this.updater_.unsubscribe();
                this.updater_ = null;
            }
        };
        /**
         * Update time that should be displayed on the screen.
         */
        NzCountdownComponent.prototype.updateValue = function () {
            this.diff = Math.max(this.target - Date.now(), 0);
            if (this.diff === 0) {
                this.stopTimer();
                this.nzCountdownFinish.emit();
            }
        };
        return NzCountdownComponent;
    }(NzStatisticComponent));
    NzCountdownComponent.decorators = [
        { type: core.Component, args: [{
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    selector: 'nz-countdown',
                    exportAs: 'nzCountdown',
                    template: "\n    <nz-statistic\n      [nzValue]=\"diff\"\n      [nzValueStyle]=\"nzValueStyle\"\n      [nzValueTemplate]=\"nzValueTemplate || countDownTpl\"\n      [nzTitle]=\"nzTitle\"\n      [nzPrefix]=\"nzPrefix\"\n      [nzSuffix]=\"nzSuffix\"\n    ></nz-statistic>\n\n    <ng-template #countDownTpl>{{ diff | nzTimeRange: nzFormat }}</ng-template>\n  "
                },] }
    ];
    NzCountdownComponent.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: core.NgZone },
        { type: platform.Platform },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
    ]; };
    NzCountdownComponent.propDecorators = {
        nzFormat: [{ type: core.Input }],
        nzCountdownFinish: [{ type: core.Output }]
    };

    var NzStatisticNumberComponent = /** @class */ (function () {
        function NzStatisticNumberComponent(locale_id) {
            this.locale_id = locale_id;
            this.displayInt = '';
            this.displayDecimal = '';
        }
        NzStatisticNumberComponent.prototype.ngOnChanges = function () {
            this.formatNumber();
        };
        NzStatisticNumberComponent.prototype.formatNumber = function () {
            var decimalSeparator = typeof this.nzValue === 'number' ? '.' : common.getLocaleNumberSymbol(this.locale_id, common.NumberSymbol.Decimal);
            var value = String(this.nzValue);
            var _a = __read(value.split(decimalSeparator), 2), int = _a[0], decimal = _a[1];
            this.displayInt = int;
            this.displayDecimal = decimal ? "" + decimalSeparator + decimal : '';
        };
        return NzStatisticNumberComponent;
    }());
    NzStatisticNumberComponent.decorators = [
        { type: core.Component, args: [{
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    selector: 'nz-statistic-number',
                    exportAs: 'nzStatisticNumber',
                    template: "\n    <span class=\"ant-statistic-content-value\">\n      <ng-container *ngIf=\"nzValueTemplate\" [ngTemplateOutlet]=\"nzValueTemplate\" [ngTemplateOutletContext]=\"{ $implicit: nzValue }\">\n      </ng-container>\n      <ng-container *ngIf=\"!nzValueTemplate\">\n        <span *ngIf=\"displayInt\" class=\"ant-statistic-content-value-int\">{{ displayInt }}</span>\n        <span *ngIf=\"displayDecimal\" class=\"ant-statistic-content-value-decimal\">{{ displayDecimal }}</span>\n      </ng-container>\n    </span>\n  "
                },] }
    ];
    NzStatisticNumberComponent.ctorParameters = function () { return [
        { type: String, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] }] }
    ]; };
    NzStatisticNumberComponent.propDecorators = {
        nzValue: [{ type: core.Input }],
        nzValueTemplate: [{ type: core.Input }]
    };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzStatisticModule = /** @class */ (function () {
        function NzStatisticModule() {
        }
        return NzStatisticModule;
    }());
    NzStatisticModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [bidi.BidiModule, common.CommonModule, platform.PlatformModule, outlet.NzOutletModule, pipe.NzPipesModule],
                    declarations: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent],
                    exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent]
                },] }
    ];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NzCountdownComponent = NzCountdownComponent;
    exports.NzStatisticComponent = NzStatisticComponent;
    exports.NzStatisticModule = NzStatisticModule;
    exports.NzStatisticNumberComponent = NzStatisticNumberComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-statistic.umd.js.map
