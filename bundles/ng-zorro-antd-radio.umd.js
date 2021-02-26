(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/bidi'), require('@angular/forms'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('@angular/cdk/a11y'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/radio', ['exports', '@angular/core', '@angular/cdk/bidi', '@angular/forms', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', '@angular/cdk/a11y', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].radio = {}), global.ng.core, global.ng.cdk.bidi, global.ng.forms, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global.ng.cdk.a11y, global.ng.common));
}(this, (function (exports, core, bidi, forms, util, rxjs, operators, a11y, common) { 'use strict';

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzRadioButtonDirective = /** @class */ (function () {
        function NzRadioButtonDirective() {
        }
        return NzRadioButtonDirective;
    }());
    NzRadioButtonDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[nz-radio-button]'
                },] }
    ];

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
    var NzRadioService = /** @class */ (function () {
        function NzRadioService() {
            this.selected$ = new rxjs.ReplaySubject(1);
            this.touched$ = new rxjs.Subject();
            this.disabled$ = new rxjs.ReplaySubject(1);
            this.name$ = new rxjs.ReplaySubject(1);
        }
        NzRadioService.prototype.touch = function () {
            this.touched$.next();
        };
        NzRadioService.prototype.select = function (value) {
            this.selected$.next(value);
        };
        NzRadioService.prototype.setDisabled = function (value) {
            this.disabled$.next(value);
        };
        NzRadioService.prototype.setName = function (value) {
            this.name$.next(value);
        };
        return NzRadioService;
    }());
    NzRadioService.decorators = [
        { type: core.Injectable }
    ];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzRadioGroupComponent = /** @class */ (function () {
        function NzRadioGroupComponent(cdr, nzRadioService, elementRef, directionality) {
            this.cdr = cdr;
            this.nzRadioService = nzRadioService;
            this.elementRef = elementRef;
            this.directionality = directionality;
            this.value = null;
            this.destroy$ = new rxjs.Subject();
            this.onChange = function () { };
            this.onTouched = function () { };
            this.nzDisabled = false;
            this.nzButtonStyle = 'outline';
            this.nzSize = 'default';
            this.nzName = null;
            this.dir = 'ltr';
            // TODO: move to host after View Engine deprecation
            this.elementRef.nativeElement.classList.add('ant-radio-group');
        }
        NzRadioGroupComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            this.nzRadioService.selected$.pipe(operators.takeUntil(this.destroy$)).subscribe(function (value) {
                if (_this.value !== value) {
                    _this.value = value;
                    _this.onChange(_this.value);
                }
            });
            this.nzRadioService.touched$.pipe(operators.takeUntil(this.destroy$)).subscribe(function () {
                Promise.resolve().then(function () { return _this.onTouched(); });
            });
            (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(operators.takeUntil(this.destroy$)).subscribe(function (direction) {
                _this.dir = direction;
                _this.cdr.detectChanges();
            });
            this.dir = this.directionality.value;
        };
        NzRadioGroupComponent.prototype.ngOnChanges = function (changes) {
            var nzDisabled = changes.nzDisabled, nzName = changes.nzName;
            if (nzDisabled) {
                this.nzRadioService.setDisabled(this.nzDisabled);
            }
            if (nzName) {
                this.nzRadioService.setName(this.nzName);
            }
        };
        NzRadioGroupComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzRadioGroupComponent.prototype.writeValue = function (value) {
            this.value = value;
            this.nzRadioService.select(value);
            this.cdr.markForCheck();
        };
        NzRadioGroupComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        NzRadioGroupComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        NzRadioGroupComponent.prototype.setDisabledState = function (isDisabled) {
            this.nzDisabled = isDisabled;
            this.nzRadioService.setDisabled(isDisabled);
            this.cdr.markForCheck();
        };
        return NzRadioGroupComponent;
    }());
    NzRadioGroupComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'nz-radio-group',
                    exportAs: 'nzRadioGroup',
                    preserveWhitespaces: false,
                    template: "\n    <ng-content></ng-content>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    providers: [
                        NzRadioService,
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: core.forwardRef(function () { return NzRadioGroupComponent; }),
                            multi: true
                        }
                    ],
                    host: {
                        '[class.ant-radio-group-large]': "nzSize === 'large'",
                        '[class.ant-radio-group-small]': "nzSize === 'small'",
                        '[class.ant-radio-group-solid]': "nzButtonStyle === 'solid'",
                        '[class.ant-radio-group-rtl]': "dir === 'rtl'"
                    }
                },] }
    ];
    NzRadioGroupComponent.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: NzRadioService },
        { type: core.ElementRef },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
    ]; };
    NzRadioGroupComponent.propDecorators = {
        nzDisabled: [{ type: core.Input }],
        nzButtonStyle: [{ type: core.Input }],
        nzSize: [{ type: core.Input }],
        nzName: [{ type: core.Input }]
    };
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Object)
    ], NzRadioGroupComponent.prototype, "nzDisabled", void 0);

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzRadioComponent = /** @class */ (function () {
        function NzRadioComponent(elementRef, cdr, focusMonitor, directionality, nzRadioService, nzRadioButtonDirective) {
            this.elementRef = elementRef;
            this.cdr = cdr;
            this.focusMonitor = focusMonitor;
            this.directionality = directionality;
            this.nzRadioService = nzRadioService;
            this.nzRadioButtonDirective = nzRadioButtonDirective;
            this.isNgModel = false;
            this.destroy$ = new rxjs.Subject();
            this.isChecked = false;
            this.name = null;
            this.isRadioButton = !!this.nzRadioButtonDirective;
            this.onChange = function () { };
            this.onTouched = function () { };
            this.nzValue = null;
            this.nzDisabled = false;
            this.nzAutoFocus = false;
            this.dir = 'ltr';
        }
        NzRadioComponent.prototype.onHostClick = function (event) {
            /** prevent label click triggered twice. **/
            event.stopPropagation();
            event.preventDefault();
            if (!this.nzDisabled && !this.isChecked) {
                if (this.nzRadioService) {
                    this.nzRadioService.select(this.nzValue);
                }
                if (this.isNgModel) {
                    this.isChecked = true;
                    this.onChange(true);
                }
            }
        };
        NzRadioComponent.prototype.focus = function () {
            this.focusMonitor.focusVia(this.inputElement, 'keyboard');
        };
        NzRadioComponent.prototype.blur = function () {
            this.inputElement.nativeElement.blur();
        };
        NzRadioComponent.prototype.setDisabledState = function (disabled) {
            this.nzDisabled = disabled;
            this.cdr.markForCheck();
        };
        NzRadioComponent.prototype.writeValue = function (value) {
            this.isChecked = value;
            this.cdr.markForCheck();
        };
        NzRadioComponent.prototype.registerOnChange = function (fn) {
            this.isNgModel = true;
            this.onChange = fn;
        };
        NzRadioComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        NzRadioComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            if (this.nzRadioService) {
                this.nzRadioService.name$.pipe(operators.takeUntil(this.destroy$)).subscribe(function (name) {
                    _this.name = name;
                    _this.cdr.markForCheck();
                });
                this.nzRadioService.disabled$.pipe(operators.takeUntil(this.destroy$)).subscribe(function (disabled) {
                    _this.nzDisabled = disabled;
                    _this.cdr.markForCheck();
                });
                this.nzRadioService.selected$.pipe(operators.takeUntil(this.destroy$)).subscribe(function (value) {
                    _this.isChecked = _this.nzValue === value;
                    _this.cdr.markForCheck();
                });
            }
            this.focusMonitor.monitor(this.elementRef, true).subscribe(function (focusOrigin) {
                if (!focusOrigin) {
                    Promise.resolve().then(function () { return _this.onTouched(); });
                    if (_this.nzRadioService) {
                        _this.nzRadioService.touch();
                    }
                }
            });
            (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(operators.takeUntil(this.destroy$)).subscribe(function (direction) {
                _this.dir = direction;
                _this.cdr.detectChanges();
            });
            this.dir = this.directionality.value;
        };
        NzRadioComponent.prototype.ngAfterViewInit = function () {
            if (this.nzAutoFocus) {
                this.focus();
            }
        };
        NzRadioComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
            this.focusMonitor.stopMonitoring(this.elementRef);
        };
        return NzRadioComponent;
    }());
    NzRadioComponent.decorators = [
        { type: core.Component, args: [{
                    selector: '[nz-radio],[nz-radio-button]',
                    exportAs: 'nzRadio',
                    preserveWhitespaces: false,
                    template: "\n    <span\n      [class.ant-radio]=\"!isRadioButton\"\n      [class.ant-radio-checked]=\"isChecked && !isRadioButton\"\n      [class.ant-radio-disabled]=\"nzDisabled && !isRadioButton\"\n      [class.ant-radio-button]=\"isRadioButton\"\n      [class.ant-radio-button-checked]=\"isChecked && isRadioButton\"\n      [class.ant-radio-button-disabled]=\"nzDisabled && isRadioButton\"\n    >\n      <input\n        #inputElement\n        type=\"radio\"\n        [attr.autofocus]=\"nzAutoFocus ? 'autofocus' : null\"\n        [class.ant-radio-input]=\"!isRadioButton\"\n        [class.ant-radio-button-input]=\"isRadioButton\"\n        [disabled]=\"nzDisabled\"\n        [checked]=\"isChecked\"\n        [attr.name]=\"name\"\n      />\n      <span [class.ant-radio-inner]=\"!isRadioButton\" [class.ant-radio-button-inner]=\"isRadioButton\"></span>\n    </span>\n    <span><ng-content></ng-content></span>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: core.forwardRef(function () { return NzRadioComponent; }),
                            multi: true
                        }
                    ],
                    host: {
                        '[class.ant-radio-wrapper]': '!isRadioButton',
                        '[class.ant-radio-button-wrapper]': 'isRadioButton',
                        '[class.ant-radio-wrapper-checked]': 'isChecked && !isRadioButton',
                        '[class.ant-radio-button-wrapper-checked]': 'isChecked && isRadioButton',
                        '[class.ant-radio-wrapper-disabled]': 'nzDisabled && !isRadioButton',
                        '[class.ant-radio-button-wrapper-disabled]': 'nzDisabled && isRadioButton',
                        '[class.ant-radio-wrapper-rtl]': "!isRadioButton && dir === 'rtl'",
                        '[class.ant-radio-button-wrapper-rtl]': "isRadioButton && dir === 'rtl'",
                        '(click)': 'onHostClick($event)'
                    }
                },] }
    ];
    NzRadioComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: a11y.FocusMonitor },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: NzRadioService, decorators: [{ type: core.Optional }] },
        { type: NzRadioButtonDirective, decorators: [{ type: core.Optional }] }
    ]; };
    NzRadioComponent.propDecorators = {
        inputElement: [{ type: core.ViewChild, args: ['inputElement', { static: false },] }],
        nzValue: [{ type: core.Input }],
        nzDisabled: [{ type: core.Input }],
        nzAutoFocus: [{ type: core.Input }]
    };
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Object)
    ], NzRadioComponent.prototype, "nzDisabled", void 0);
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Object)
    ], NzRadioComponent.prototype, "nzAutoFocus", void 0);

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzRadioModule = /** @class */ (function () {
        function NzRadioModule() {
        }
        return NzRadioModule;
    }());
    NzRadioModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [bidi.BidiModule, common.CommonModule, forms.FormsModule],
                    exports: [NzRadioComponent, NzRadioButtonDirective, NzRadioGroupComponent],
                    declarations: [NzRadioComponent, NzRadioButtonDirective, NzRadioGroupComponent]
                },] }
    ];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NzRadioButtonDirective = NzRadioButtonDirective;
    exports.NzRadioComponent = NzRadioComponent;
    exports.NzRadioGroupComponent = NzRadioGroupComponent;
    exports.NzRadioModule = NzRadioModule;
    exports.NzRadioService = NzRadioService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-radio.umd.js.map
