(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/bidi'), require('@angular/cdk/keycodes'), require('@angular/core'), require('@angular/forms'), require('ng-zorro-antd/core/config'), require('rxjs'), require('rxjs/operators'), require('ng-zorro-antd/core/util'), require('@angular/common'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/tooltip')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/rate', ['exports', '@angular/cdk/bidi', '@angular/cdk/keycodes', '@angular/core', '@angular/forms', 'ng-zorro-antd/core/config', 'rxjs', 'rxjs/operators', 'ng-zorro-antd/core/util', '@angular/common', 'ng-zorro-antd/icon', 'ng-zorro-antd/tooltip'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].rate = {}), global.ng.cdk.bidi, global.ng.cdk.keycodes, global.ng.core, global.ng.forms, global['ng-zorro-antd'].core.config, global.rxjs, global.rxjs.operators, global['ng-zorro-antd'].core.util, global.ng.common, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].tooltip));
}(this, (function (exports, bidi, keycodes, core, forms, config, rxjs, operators, util, common, icon, tooltip) { 'use strict';

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
    var NZ_CONFIG_MODULE_NAME = 'rate';
    var NzRateComponent = /** @class */ (function () {
        function NzRateComponent(nzConfigService, renderer, cdr, directionality) {
            this.nzConfigService = nzConfigService;
            this.renderer = renderer;
            this.cdr = cdr;
            this.directionality = directionality;
            this._nzModuleName = NZ_CONFIG_MODULE_NAME;
            this.nzAllowClear = true;
            this.nzAllowHalf = false;
            this.nzDisabled = false;
            this.nzAutoFocus = false;
            this.nzCount = 5;
            this.nzTooltips = [];
            this.nzOnBlur = new core.EventEmitter();
            this.nzOnFocus = new core.EventEmitter();
            this.nzOnHoverChange = new core.EventEmitter();
            this.nzOnKeyDown = new core.EventEmitter();
            this.classMap = {};
            this.starArray = [];
            this.starStyleArray = [];
            this.dir = 'ltr';
            this.destroy$ = new rxjs.Subject();
            this.hasHalf = false;
            this.hoverValue = 0;
            this.isFocused = false;
            this._value = 0;
            this.onChange = function () { return null; };
            this.onTouched = function () { return null; };
        }
        Object.defineProperty(NzRateComponent.prototype, "nzValue", {
            get: function () {
                return this._value;
            },
            set: function (input) {
                if (this._value === input) {
                    return;
                }
                this._value = input;
                this.hasHalf = !Number.isInteger(input);
                this.hoverValue = Math.ceil(input);
            },
            enumerable: false,
            configurable: true
        });
        NzRateComponent.prototype.ngOnChanges = function (changes) {
            var nzAutoFocus = changes.nzAutoFocus, nzCount = changes.nzCount, nzValue = changes.nzValue;
            if (nzAutoFocus && !nzAutoFocus.isFirstChange()) {
                var el = this.ulElement.nativeElement;
                if (this.nzAutoFocus && !this.nzDisabled) {
                    this.renderer.setAttribute(el, 'autofocus', 'autofocus');
                }
                else {
                    this.renderer.removeAttribute(el, 'autofocus');
                }
            }
            if (nzCount) {
                this.updateStarArray();
            }
            if (nzValue) {
                this.updateStarStyle();
            }
        };
        NzRateComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            this.nzConfigService
                .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function () { return _this.cdr.markForCheck(); });
            (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(operators.takeUntil(this.destroy$)).subscribe(function (direction) {
                _this.dir = direction;
                _this.cdr.detectChanges();
            });
            this.dir = this.directionality.value;
        };
        NzRateComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzRateComponent.prototype.onItemClick = function (index, isHalf) {
            if (this.nzDisabled) {
                return;
            }
            this.hoverValue = index + 1;
            var actualValue = isHalf ? index + 0.5 : index + 1;
            if (this.nzValue === actualValue) {
                if (this.nzAllowClear) {
                    this.nzValue = 0;
                    this.onChange(this.nzValue);
                }
            }
            else {
                this.nzValue = actualValue;
                this.onChange(this.nzValue);
            }
            this.updateStarStyle();
        };
        NzRateComponent.prototype.onItemHover = function (index, isHalf) {
            if (this.nzDisabled || (this.hoverValue === index + 1 && isHalf === this.hasHalf)) {
                return;
            }
            this.hoverValue = index + 1;
            this.hasHalf = isHalf;
            this.nzOnHoverChange.emit(this.hoverValue);
            this.updateStarStyle();
        };
        NzRateComponent.prototype.onRateLeave = function () {
            this.hasHalf = !Number.isInteger(this.nzValue);
            this.hoverValue = Math.ceil(this.nzValue);
            this.updateStarStyle();
        };
        NzRateComponent.prototype.onFocus = function (e) {
            this.isFocused = true;
            this.nzOnFocus.emit(e);
        };
        NzRateComponent.prototype.onBlur = function (e) {
            this.isFocused = false;
            this.nzOnBlur.emit(e);
        };
        NzRateComponent.prototype.focus = function () {
            this.ulElement.nativeElement.focus();
        };
        NzRateComponent.prototype.blur = function () {
            this.ulElement.nativeElement.blur();
        };
        NzRateComponent.prototype.onKeyDown = function (e) {
            var oldVal = this.nzValue;
            if (e.keyCode === keycodes.RIGHT_ARROW && this.nzValue < this.nzCount) {
                this.nzValue += this.nzAllowHalf ? 0.5 : 1;
            }
            else if (e.keyCode === keycodes.LEFT_ARROW && this.nzValue > 0) {
                this.nzValue -= this.nzAllowHalf ? 0.5 : 1;
            }
            if (oldVal !== this.nzValue) {
                this.onChange(this.nzValue);
                this.nzOnKeyDown.emit(e);
                this.updateStarStyle();
                this.cdr.markForCheck();
            }
        };
        NzRateComponent.prototype.updateStarArray = function () {
            this.starArray = Array(this.nzCount)
                .fill(0)
                .map(function (_, i) { return i; });
            this.updateStarStyle();
        };
        NzRateComponent.prototype.updateStarStyle = function () {
            var _this = this;
            this.starStyleArray = this.starArray.map(function (i) {
                var _b;
                var prefix = 'ant-rate-star';
                var value = i + 1;
                return _b = {},
                    _b[prefix + "-full"] = value < _this.hoverValue || (!_this.hasHalf && value === _this.hoverValue),
                    _b[prefix + "-half"] = _this.hasHalf && value === _this.hoverValue,
                    _b[prefix + "-active"] = _this.hasHalf && value === _this.hoverValue,
                    _b[prefix + "-zero"] = value > _this.hoverValue,
                    _b[prefix + "-focused"] = _this.hasHalf && value === _this.hoverValue && _this.isFocused,
                    _b;
            });
        };
        NzRateComponent.prototype.writeValue = function (value) {
            this.nzValue = value || 0;
            this.updateStarArray();
            this.cdr.markForCheck();
        };
        NzRateComponent.prototype.setDisabledState = function (isDisabled) {
            this.nzDisabled = isDisabled;
        };
        NzRateComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        NzRateComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        return NzRateComponent;
    }());
    NzRateComponent.decorators = [
        { type: core.Component, args: [{
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    selector: 'nz-rate',
                    exportAs: 'nzRate',
                    preserveWhitespaces: false,
                    template: "\n    <ul\n      #ulElement\n      class=\"ant-rate\"\n      [class.ant-rate-disabled]=\"nzDisabled\"\n      [class.ant-rate-rtl]=\"dir === 'rtl'\"\n      [ngClass]=\"classMap\"\n      (blur)=\"onBlur($event)\"\n      (focus)=\"onFocus($event)\"\n      (keydown)=\"onKeyDown($event); $event.preventDefault()\"\n      (mouseleave)=\"onRateLeave(); $event.stopPropagation()\"\n      [tabindex]=\"nzDisabled ? -1 : 1\"\n    >\n      <li\n        *ngFor=\"let star of starArray; let i = index\"\n        class=\"ant-rate-star\"\n        [ngClass]=\"starStyleArray[i] || ''\"\n        nz-tooltip\n        [nzTooltipTitle]=\"nzTooltips[i]\"\n      >\n        <div\n          nz-rate-item\n          [allowHalf]=\"nzAllowHalf\"\n          [character]=\"nzCharacter\"\n          (itemHover)=\"onItemHover(i, $event)\"\n          (itemClick)=\"onItemClick(i, $event)\"\n        ></div>\n      </li>\n    </ul>\n  ",
                    providers: [
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: core.forwardRef(function () { return NzRateComponent; }),
                            multi: true
                        }
                    ]
                },] }
    ];
    NzRateComponent.ctorParameters = function () { return [
        { type: config.NzConfigService },
        { type: core.Renderer2 },
        { type: core.ChangeDetectorRef },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
    ]; };
    NzRateComponent.propDecorators = {
        ulElement: [{ type: core.ViewChild, args: ['ulElement', { static: false },] }],
        nzAllowClear: [{ type: core.Input }],
        nzAllowHalf: [{ type: core.Input }],
        nzDisabled: [{ type: core.Input }],
        nzAutoFocus: [{ type: core.Input }],
        nzCharacter: [{ type: core.Input }],
        nzCount: [{ type: core.Input }],
        nzTooltips: [{ type: core.Input }],
        nzOnBlur: [{ type: core.Output }],
        nzOnFocus: [{ type: core.Output }],
        nzOnHoverChange: [{ type: core.Output }],
        nzOnKeyDown: [{ type: core.Output }]
    };
    __decorate([
        config.WithConfig(),
        util.InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzRateComponent.prototype, "nzAllowClear", void 0);
    __decorate([
        config.WithConfig(),
        util.InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzRateComponent.prototype, "nzAllowHalf", void 0);
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzRateComponent.prototype, "nzDisabled", void 0);
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzRateComponent.prototype, "nzAutoFocus", void 0);
    __decorate([
        util.InputNumber(),
        __metadata("design:type", Number)
    ], NzRateComponent.prototype, "nzCount", void 0);

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzRateItemComponent = /** @class */ (function () {
        function NzRateItemComponent() {
            this.allowHalf = false;
            this.itemHover = new core.EventEmitter();
            this.itemClick = new core.EventEmitter();
        }
        NzRateItemComponent.prototype.hoverRate = function (isHalf) {
            this.itemHover.next(isHalf && this.allowHalf);
        };
        NzRateItemComponent.prototype.clickRate = function (isHalf) {
            this.itemClick.next(isHalf && this.allowHalf);
        };
        return NzRateItemComponent;
    }());
    NzRateItemComponent.decorators = [
        { type: core.Component, args: [{
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    selector: '[nz-rate-item]',
                    exportAs: 'nzRateItem',
                    template: "\n    <div class=\"ant-rate-star-second\" (mouseover)=\"hoverRate(false); $event.stopPropagation()\" (click)=\"clickRate(false)\">\n      <ng-template [ngTemplateOutlet]=\"character || defaultCharacter\"></ng-template>\n    </div>\n    <div class=\"ant-rate-star-first\" (mouseover)=\"hoverRate(true); $event.stopPropagation()\" (click)=\"clickRate(true)\">\n      <ng-template [ngTemplateOutlet]=\"character || defaultCharacter\"></ng-template>\n    </div>\n\n    <ng-template #defaultCharacter>\n      <i nz-icon nzType=\"star\" nzTheme=\"fill\"></i>\n    </ng-template>\n  "
                },] }
    ];
    NzRateItemComponent.propDecorators = {
        character: [{ type: core.Input }],
        allowHalf: [{ type: core.Input }],
        itemHover: [{ type: core.Output }],
        itemClick: [{ type: core.Output }]
    };
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzRateItemComponent.prototype, "allowHalf", void 0);

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzRateModule = /** @class */ (function () {
        function NzRateModule() {
        }
        return NzRateModule;
    }());
    NzRateModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [NzRateComponent],
                    declarations: [NzRateComponent, NzRateItemComponent],
                    imports: [bidi.BidiModule, common.CommonModule, icon.NzIconModule, tooltip.NzToolTipModule]
                },] }
    ];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NzRateComponent = NzRateComponent;
    exports.NzRateItemComponent = NzRateItemComponent;
    exports.NzRateModule = NzRateModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-rate.umd.js.map
