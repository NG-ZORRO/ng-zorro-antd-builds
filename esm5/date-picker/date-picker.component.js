/**
 * @fileoverview added by tsickle
 * Generated from: date-picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __decorate, __metadata } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Host, Input, Optional, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { CandyDate, cloneDate } from 'ng-zorro-antd/core/time';
import { InputBoolean, toBoolean, valueFunctionProp } from 'ng-zorro-antd/core/util';
import { DateHelperService, NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePickerService } from './date-picker.service';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzPickerComponent } from './picker.component';
/** @type {?} */
var POPUP_STYLE_PATCH = { position: 'relative' };
// Aim to override antd's style to support overlay's position strategy (position:absolute will cause it not working beacuse the overlay can't get the height/width of it's content)
/** @type {?} */
var NZ_CONFIG_COMPONENT_NAME = 'datePicker';
/**
 * The base picker for all common APIs
 */
var NzDatePickerComponent = /** @class */ (function () {
    function NzDatePickerComponent(nzConfigService, datePickerService, i18n, cdr, renderer, elementRef, dateHelper, noAnimation) {
        this.nzConfigService = nzConfigService;
        this.datePickerService = datePickerService;
        this.i18n = i18n;
        this.cdr = cdr;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.dateHelper = dateHelper;
        this.noAnimation = noAnimation;
        this.isRange = false; // Indicate whether the value is a range value
        // Indicate whether the value is a range value
        this.showWeek = false; // Should show as week picker
        // Should show as week picker
        this.focused = false;
        this.destroyed$ = new Subject();
        this.isCustomPlaceHolder = false;
        this.showTime = false;
        // --- Common API
        this.nzAllowClear = true;
        this.nzAutoFocus = false;
        this.nzDisabled = false;
        /**
         * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
         */
        this.nzClassName = '';
        this.nzPlaceHolder = '';
        this.nzPopupStyle = POPUP_STYLE_PATCH;
        this.nzSize = 'default';
        /**
         * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
         */
        this.nzStyle = null;
        this.nzShowToday = true;
        this.nzMode = 'date';
        this.nzDefaultPickerValue = null;
        this.nzSeparator = undefined;
        this.nzSuffixIcon = 'calendar';
        // TODO(@wenqi73) The PanelMode need named for each pickers and export
        this.nzOnPanelChange = new EventEmitter();
        this.nzOnCalendarChange = new EventEmitter();
        this.nzOnOk = new EventEmitter();
        this.nzOnOpenChange = new EventEmitter();
        // ------------------------------------------------------------------------
        // | Control value accessor implements
        // ------------------------------------------------------------------------
        // NOTE: onChangeFn/onTouchedFn will not be assigned if user not use as ngModel
        this.onChangeFn = (/**
         * @return {?}
         */
        function () { return void 0; });
        this.onTouchedFn = (/**
         * @return {?}
         */
        function () { return void 0; });
    }
    Object.defineProperty(NzDatePickerComponent.prototype, "nzShowTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this.showTime;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.showTime = typeof value === 'object' ? value : toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDatePickerComponent.prototype, "realOpenState", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.animationOpenState;
        } // Use picker's real open state to let re-render the picker's content when shown up
        ,
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzDatePickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Subscribe the every locale change if the nzLocale is not handled by user
        if (!this.nzLocale) {
            this.i18n.localeChange.pipe(takeUntil(this.destroyed$)).subscribe((/**
             * @return {?}
             */
            function () { return _this.setLocale(); }));
        }
        // Default value
        this.datePickerService.isRange = this.isRange;
        this.datePickerService.initValue();
        this.datePickerService.emitValue$.pipe(takeUntil(this.destroyed$)).subscribe((/**
         * @param {?} _
         * @return {?}
         */
        function (_) {
            /** @type {?} */
            var value = _this.datePickerService.value;
            _this.datePickerService.initialValue = cloneDate(value);
            if (_this.isRange) {
                /** @type {?} */
                var vAsRange = (/** @type {?} */ (value));
                if (vAsRange.length) {
                    _this.onChangeFn([vAsRange[0].nativeDate, vAsRange[1].nativeDate]);
                }
                else {
                    _this.onChangeFn([]);
                }
            }
            else {
                if (value) {
                    _this.onChangeFn(((/** @type {?} */ (value))).nativeDate);
                }
                else {
                    _this.onChangeFn(null);
                }
            }
            _this.onTouchedFn();
            // When value emitted, overlay will be closed
            _this.picker.hideOverlay();
        }));
        // Default format when it's empty
        if (!this.nzFormat) {
            if (this.showWeek) {
                this.nzFormat = 'yyyy-ww'; // Format for week
            }
            else {
                this.nzFormat = this.nzShowTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd';
            }
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzDatePickerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.nzPopupStyle) {
            // Always assign the popup style patch
            this.nzPopupStyle = this.nzPopupStyle ? __assign(__assign({}, this.nzPopupStyle), POPUP_STYLE_PATCH) : POPUP_STYLE_PATCH;
        }
        // Mark as customized placeholder by user once nzPlaceHolder assigned at the first time
        if (changes.nzPlaceHolder && changes.nzPlaceHolder.firstChange && typeof this.nzPlaceHolder !== 'undefined') {
            this.isCustomPlaceHolder = true;
        }
        if (changes.nzLocale) {
            // The nzLocale is currently handled by user
            this.setDefaultPlaceHolder();
        }
        if (changes.nzRenderExtraFooter) {
            this.extraFooter = valueFunctionProp((/** @type {?} */ (this.nzRenderExtraFooter)));
        }
        if (changes.nzStyle) {
            warnDeprecation("'nzStyle' in DatePicker is going to be removed in 10.0.0. Please use CSS style attribute like <nz-date-picker style=\"...\"></nz-date-picker> instead.");
        }
        if (changes.nzClassName) {
            warnDeprecation("'nzClassName' in DatePicker is going to be removed in 10.0.0. Please use CSS class attribute like <nz-date-picker class=\"...\"></nz-date-picker> instead.");
        }
        if (changes.nzMode) {
            this.setPanelMode();
        }
    };
    /**
     * @return {?}
     */
    NzDatePickerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed$.next();
        this.destroyed$.complete();
    };
    /**
     * @return {?}
     */
    NzDatePickerComponent.prototype.setPanelMode = /**
     * @return {?}
     */
    function () {
        if (!this.nzMode) {
            this.nzMode = this.isRange ? ['date', 'date'] : 'date';
        }
    };
    /**
     * Triggered when overlayOpen changes (different with realOpenState)
     * @param open The overlayOpen in picker component
     */
    /**
     * Triggered when overlayOpen changes (different with realOpenState)
     * @param {?} open The overlayOpen in picker component
     * @return {?}
     */
    NzDatePickerComponent.prototype.onOpenChange = /**
     * Triggered when overlayOpen changes (different with realOpenState)
     * @param {?} open The overlayOpen in picker component
     * @return {?}
     */
    function (open) {
        this.nzOnOpenChange.emit(open);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzDatePickerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.setValue(value);
        this.cdr.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NzDatePickerComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeFn = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NzDatePickerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedFn = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NzDatePickerComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.nzDisabled = isDisabled;
        this.cdr.markForCheck();
    };
    // ------------------------------------------------------------------------
    // | Internal methods
    // ------------------------------------------------------------------------
    // Reload locale from i18n with side effects
    // ------------------------------------------------------------------------
    // | Internal methods
    // ------------------------------------------------------------------------
    // Reload locale from i18n with side effects
    /**
     * @private
     * @return {?}
     */
    NzDatePickerComponent.prototype.setLocale = 
    // ------------------------------------------------------------------------
    // | Internal methods
    // ------------------------------------------------------------------------
    // Reload locale from i18n with side effects
    /**
     * @private
     * @return {?}
     */
    function () {
        this.nzLocale = this.i18n.getLocaleData('DatePicker', {});
        this.setDefaultPlaceHolder();
        this.cdr.markForCheck();
    };
    /**
     * @private
     * @return {?}
     */
    NzDatePickerComponent.prototype.setDefaultPlaceHolder = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.isCustomPlaceHolder && this.nzLocale) {
            this.nzPlaceHolder = this.isRange ? ((/** @type {?} */ (this.nzLocale.lang.rangePlaceholder))) : (/** @type {?} */ (this.nzLocale.lang.placeholder));
        }
    };
    // Safe way of setting value with default
    // Safe way of setting value with default
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    NzDatePickerComponent.prototype.setValue = 
    // Safe way of setting value with default
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var newValue = this.datePickerService.makeValue(value);
        this.datePickerService.setValue(newValue);
        this.datePickerService.initialValue = newValue;
    };
    Object.defineProperty(NzDatePickerComponent.prototype, "realShowToday", {
        get: /**
         * @return {?}
         */
        function () {
            // Range only support in single date picker
            return this.nzMode === 'date' && this.nzShowToday;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    NzDatePickerComponent.prototype.onFocusChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.focused = value;
        // TODO: avoid autoFocus cause change after checked error
        if (this.focused) {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-picker-focused');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-picker-focused');
        }
    };
    /**
     * @param {?} panelMode
     * @return {?}
     */
    NzDatePickerComponent.prototype.onPanelModeChange = /**
     * @param {?} panelMode
     * @return {?}
     */
    function (panelMode) {
        // this.nzMode = panelMode;
        this.nzOnPanelChange.emit(panelMode);
    };
    // Emit nzOnCalendarChange when select date by nz-range-picker
    // Emit nzOnCalendarChange when select date by nz-range-picker
    /**
     * @param {?} value
     * @return {?}
     */
    NzDatePickerComponent.prototype.onCalendarChange = 
    // Emit nzOnCalendarChange when select date by nz-range-picker
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isRange && Array.isArray(value)) {
            /** @type {?} */
            var rangeValue = value.filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x instanceof CandyDate; })).map((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return (/** @type {?} */ (x)).nativeDate; }));
            this.nzOnCalendarChange.emit(rangeValue);
        }
    };
    // Emitted when done with date selecting
    // Emitted when done with date selecting
    /**
     * @return {?}
     */
    NzDatePickerComponent.prototype.onResultOk = 
    // Emitted when done with date selecting
    /**
     * @return {?}
     */
    function () {
        if (this.isRange) {
            /** @type {?} */
            var value = (/** @type {?} */ (this.datePickerService.value));
            if (value.length) {
                this.nzOnOk.emit([value[0].nativeDate, value[1].nativeDate]);
            }
            else {
                this.nzOnOk.emit([]);
            }
        }
        else {
            if (this.datePickerService.value) {
                this.nzOnOk.emit(((/** @type {?} */ (this.datePickerService.value))).nativeDate);
            }
            else {
                this.nzOnOk.emit(null);
            }
        }
        this.datePickerService.emitValue$.next();
    };
    NzDatePickerComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-date-picker,nz-week-picker,nz-month-picker,nz-year-picker,nz-range-picker',
                    exportAs: 'nzDatePicker',
                    template: "\n    <div\n      nz-picker\n      [isRange]=\"isRange\"\n      [open]=\"nzOpen\"\n      [separator]=\"nzSeparator\"\n      [disabled]=\"nzDisabled\"\n      [format]=\"nzFormat\"\n      [allowClear]=\"nzAllowClear\"\n      [autoFocus]=\"nzAutoFocus\"\n      [placeholder]=\"nzPlaceHolder\"\n      [ngClass]=\"nzClassName\"\n      style=\"display: inherit; align-items: center; width: 100%;\"\n      [ngStyle]=\"nzStyle\"\n      [dropdownClassName]=\"nzDropdownClassName\"\n      [popupStyle]=\"nzPopupStyle\"\n      [noAnimation]=\"!!noAnimation?.nzNoAnimation\"\n      [suffixIcon]=\"nzSuffixIcon\"\n      (openChange)=\"onOpenChange($event)\"\n      (focusChange)=\"onFocusChange($event)\"\n    >\n      <date-range-popup\n        *ngIf=\"realOpenState\"\n        [isRange]=\"isRange\"\n        [defaultPickerValue]=\"nzDefaultPickerValue\"\n        [showWeek]=\"showWeek\"\n        [panelMode]=\"nzMode\"\n        (panelModeChange)=\"onPanelModeChange($event)\"\n        (calendarChange)=\"onCalendarChange($event)\"\n        [locale]=\"nzLocale?.lang!\"\n        [showToday]=\"realShowToday\"\n        [showTime]=\"nzShowTime\"\n        [format]=\"nzFormat\"\n        [dateRender]=\"nzDateRender\"\n        [disabledDate]=\"nzDisabledDate\"\n        [disabledTime]=\"nzDisabledTime\"\n        [placeholder]=\"nzPlaceHolder\"\n        [extraFooter]=\"extraFooter\"\n        [ranges]=\"nzRanges\"\n        (resultOk)=\"onResultOk()\"\n      ></date-range-popup>\n    </div>\n  ",
                    host: {
                        '[class.ant-picker]': "true",
                        '[class.ant-picker-range]': "isRange",
                        '[class.ant-picker-large]': "nzSize === 'large'",
                        '[class.ant-picker-small]': "nzSize === 'small'",
                        '[class.ant-picker-disabled]': "nzDisabled",
                        '(click)': 'picker.onClickInputBox($event)'
                    },
                    providers: [
                        DatePickerService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return NzDatePickerComponent; }))
                        }
                    ]
                }] }
    ];
    /** @nocollapse */
    NzDatePickerComponent.ctorParameters = function () { return [
        { type: NzConfigService },
        { type: DatePickerService },
        { type: NzI18nService },
        { type: ChangeDetectorRef },
        { type: Renderer2 },
        { type: ElementRef },
        { type: DateHelperService },
        { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
    ]; };
    NzDatePickerComponent.propDecorators = {
        nzAllowClear: [{ type: Input }],
        nzAutoFocus: [{ type: Input }],
        nzDisabled: [{ type: Input }],
        nzOpen: [{ type: Input }],
        nzClassName: [{ type: Input }],
        nzDisabledDate: [{ type: Input }],
        nzLocale: [{ type: Input }],
        nzPlaceHolder: [{ type: Input }],
        nzPopupStyle: [{ type: Input }],
        nzDropdownClassName: [{ type: Input }],
        nzSize: [{ type: Input }],
        nzStyle: [{ type: Input }],
        nzFormat: [{ type: Input }],
        nzDateRender: [{ type: Input }],
        nzDisabledTime: [{ type: Input }],
        nzRenderExtraFooter: [{ type: Input }],
        nzShowToday: [{ type: Input }],
        nzMode: [{ type: Input }],
        nzRanges: [{ type: Input }],
        nzDefaultPickerValue: [{ type: Input }],
        nzSeparator: [{ type: Input }],
        nzSuffixIcon: [{ type: Input }],
        nzOnPanelChange: [{ type: Output }],
        nzOnCalendarChange: [{ type: Output }],
        nzOnOk: [{ type: Output }],
        nzOnOpenChange: [{ type: Output }],
        picker: [{ type: ViewChild, args: [NzPickerComponent, { static: true },] }],
        nzShowTime: [{ type: Input }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDatePickerComponent.prototype, "nzAllowClear", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDatePickerComponent.prototype, "nzAutoFocus", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDatePickerComponent.prototype, "nzDisabled", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDatePickerComponent.prototype, "nzOpen", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDatePickerComponent.prototype, "nzShowToday", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME),
        __metadata("design:type", String)
    ], NzDatePickerComponent.prototype, "nzSeparator", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME),
        __metadata("design:type", Object)
    ], NzDatePickerComponent.prototype, "nzSuffixIcon", void 0);
    return NzDatePickerComponent;
}());
export { NzDatePickerComponent };
if (false) {
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzAllowClear;
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzAutoFocus;
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzDisabled;
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzOpen;
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzShowToday;
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzMode;
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzShowTime;
    /** @type {?} */
    NzDatePickerComponent.prototype.isRange;
    /** @type {?} */
    NzDatePickerComponent.prototype.showWeek;
    /** @type {?} */
    NzDatePickerComponent.prototype.focused;
    /** @type {?} */
    NzDatePickerComponent.prototype.extraFooter;
    /**
     * @type {?}
     * @protected
     */
    NzDatePickerComponent.prototype.destroyed$;
    /**
     * @type {?}
     * @protected
     */
    NzDatePickerComponent.prototype.isCustomPlaceHolder;
    /**
     * @type {?}
     * @private
     */
    NzDatePickerComponent.prototype.showTime;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzAllowClear;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzAutoFocus;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzDisabled;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzOpen;
    /**
     * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
     * @type {?}
     */
    NzDatePickerComponent.prototype.nzClassName;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzDisabledDate;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzLocale;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzPlaceHolder;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzPopupStyle;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzDropdownClassName;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzSize;
    /**
     * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
     * @type {?}
     */
    NzDatePickerComponent.prototype.nzStyle;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzFormat;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzDateRender;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzDisabledTime;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzRenderExtraFooter;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzShowToday;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzMode;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzRanges;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzDefaultPickerValue;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzSeparator;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzSuffixIcon;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzOnPanelChange;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzOnCalendarChange;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzOnOk;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzOnOpenChange;
    /** @type {?} */
    NzDatePickerComponent.prototype.picker;
    /** @type {?} */
    NzDatePickerComponent.prototype.onChangeFn;
    /** @type {?} */
    NzDatePickerComponent.prototype.onTouchedFn;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzConfigService;
    /** @type {?} */
    NzDatePickerComponent.prototype.datePickerService;
    /**
     * @type {?}
     * @protected
     */
    NzDatePickerComponent.prototype.i18n;
    /**
     * @type {?}
     * @protected
     */
    NzDatePickerComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzDatePickerComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NzDatePickerComponent.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    NzDatePickerComponent.prototype.dateHelper;
    /** @type {?} */
    NzDatePickerComponent.prototype.noAnimation;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC9kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImRhdGUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLElBQUksRUFDSixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBR1QsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFtQixNQUFNLHlCQUF5QixDQUFDO0FBRWhGLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckYsT0FBTyxFQUFFLGlCQUFpQixFQUE2QixhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztJQUdqRCxpQkFBaUIsR0FBRyxFQUFFLFFBQVEs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QUF5Qjs7SUFDekIseUNBQTBCOztJQUMxQix3Q0FBeUI7O0lBQ3pCLDRDQUE4Qzs7Ozs7SUFFOUMsMkNBQW9EOzs7OztJQUNwRCxvREFBK0M7Ozs7O0lBQy9DLHlDQUF1RDs7SUFHdkQsNkNBQXNEOztJQUN0RCw0Q0FBc0Q7O0lBQ3RELDJDQUFxRDs7SUFDckQsdUNBQTBDOzs7OztJQUkxQyw0Q0FBa0M7O0lBQ2xDLCtDQUErQzs7SUFDL0MseUNBQThDOztJQUM5Qyw4Q0FBdUQ7O0lBQ3ZELDZDQUFrRDs7SUFDbEQsb0RBQXNDOztJQUN0Qyx1Q0FBMkQ7Ozs7O0lBSTNELHdDQUF1Qzs7SUFDdkMseUNBQTJCOztJQUMzQiw2Q0FBbUc7O0lBQ25HLCtDQUF5Qzs7SUFDekMsb0RBQStHOztJQUMvRyw0Q0FBcUQ7O0lBQ3JELHVDQUFvRDs7SUFDcEQseUNBQWlDOztJQUNqQyxxREFBNEQ7O0lBQzVELDRDQUFnRjs7SUFDaEYsNkNBQTBHOztJQUcxRyxnREFBdUc7O0lBQ3ZHLG1EQUErRTs7SUFDL0UsdUNBQXNFOztJQUN0RSwrQ0FBZ0U7O0lBRWhFLHVDQUEyRTs7SUErSDNFLDJDQUF3Qzs7SUFDeEMsNENBQTBDOztJQWpIeEMsZ0RBQXVDOztJQUN2QyxrREFBMkM7Ozs7O0lBQzNDLHFDQUE2Qjs7Ozs7SUFDN0Isb0NBQWdDOzs7OztJQUNoQyx5Q0FBMkI7Ozs7O0lBQzNCLDJDQUE4Qjs7Ozs7SUFDOUIsMkNBQXVDOztJQUN2Qyw0Q0FBK0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IHdhcm5EZXByZWNhdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgQ2FuZHlEYXRlLCBjbG9uZURhdGUsIENvbXBhdGlibGVWYWx1ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90aW1lJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgRnVuY3Rpb25Qcm9wLCBOelNhZmVBbnksIE9uQ2hhbmdlVHlwZSwgT25Ub3VjaGVkVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIHRvQm9vbGVhbiwgdmFsdWVGdW5jdGlvblByb3AgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBEYXRlSGVscGVyU2VydmljZSwgTnpEYXRlUGlja2VySTE4bkludGVyZmFjZSwgTnpJMThuU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEYXRlUGlja2VyU2VydmljZSB9IGZyb20gJy4vZGF0ZS1waWNrZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgTnpQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL3BpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tcGF0aWJsZURhdGUsIERpc2FibGVkVGltZUZuLCBOekRhdGVNb2RlLCBQcmVzZXRSYW5nZXMsIFN1cHBvcnRUaW1lT3B0aW9ucyB9IGZyb20gJy4vc3RhbmRhcmQtdHlwZXMnO1xuXG5jb25zdCBQT1BVUF9TVFlMRV9QQVRDSCA9IHsgcG9zaXRpb246ICdyZWxhdGl2ZScgfTsgLy8gQWltIHRvIG92ZXJyaWRlIGFudGQncyBzdHlsZSB0byBzdXBwb3J0IG92ZXJsYXkncyBwb3NpdGlvbiBzdHJhdGVneSAocG9zaXRpb246YWJzb2x1dGUgd2lsbCBjYXVzZSBpdCBub3Qgd29ya2luZyBiZWFjdXNlIHRoZSBvdmVybGF5IGNhbid0IGdldCB0aGUgaGVpZ2h0L3dpZHRoIG9mIGl0J3MgY29udGVudClcbmNvbnN0IE5aX0NPTkZJR19DT01QT05FTlRfTkFNRSA9ICdkYXRlUGlja2VyJztcblxuLyoqXG4gKiBUaGUgYmFzZSBwaWNrZXIgZm9yIGFsbCBjb21tb24gQVBJc1xuICovXG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnbnotZGF0ZS1waWNrZXIsbnotd2Vlay1waWNrZXIsbnotbW9udGgtcGlja2VyLG56LXllYXItcGlja2VyLG56LXJhbmdlLXBpY2tlcicsXG4gIGV4cG9ydEFzOiAnbnpEYXRlUGlja2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBuei1waWNrZXJcbiAgICAgIFtpc1JhbmdlXT1cImlzUmFuZ2VcIlxuICAgICAgW29wZW5dPVwibnpPcGVuXCJcbiAgICAgIFtzZXBhcmF0b3JdPVwibnpTZXBhcmF0b3JcIlxuICAgICAgW2Rpc2FibGVkXT1cIm56RGlzYWJsZWRcIlxuICAgICAgW2Zvcm1hdF09XCJuekZvcm1hdFwiXG4gICAgICBbYWxsb3dDbGVhcl09XCJuekFsbG93Q2xlYXJcIlxuICAgICAgW2F1dG9Gb2N1c109XCJuekF1dG9Gb2N1c1wiXG4gICAgICBbcGxhY2Vob2xkZXJdPVwibnpQbGFjZUhvbGRlclwiXG4gICAgICBbbmdDbGFzc109XCJuekNsYXNzTmFtZVwiXG4gICAgICBzdHlsZT1cImRpc3BsYXk6IGluaGVyaXQ7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IHdpZHRoOiAxMDAlO1wiXG4gICAgICBbbmdTdHlsZV09XCJuelN0eWxlXCJcbiAgICAgIFtkcm9wZG93bkNsYXNzTmFtZV09XCJuekRyb3Bkb3duQ2xhc3NOYW1lXCJcbiAgICAgIFtwb3B1cFN0eWxlXT1cIm56UG9wdXBTdHlsZVwiXG4gICAgICBbbm9BbmltYXRpb25dPVwiISFub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvblwiXG4gICAgICBbc3VmZml4SWNvbl09XCJuelN1ZmZpeEljb25cIlxuICAgICAgKG9wZW5DaGFuZ2UpPVwib25PcGVuQ2hhbmdlKCRldmVudClcIlxuICAgICAgKGZvY3VzQ2hhbmdlKT1cIm9uRm9jdXNDaGFuZ2UoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPGRhdGUtcmFuZ2UtcG9wdXBcbiAgICAgICAgKm5nSWY9XCJyZWFsT3BlblN0YXRlXCJcbiAgICAgICAgW2lzUmFuZ2VdPVwiaXNSYW5nZVwiXG4gICAgICAgIFtkZWZhdWx0UGlja2VyVmFsdWVdPVwibnpEZWZhdWx0UGlja2VyVmFsdWVcIlxuICAgICAgICBbc2hvd1dlZWtdPVwic2hvd1dlZWtcIlxuICAgICAgICBbcGFuZWxNb2RlXT1cIm56TW9kZVwiXG4gICAgICAgIChwYW5lbE1vZGVDaGFuZ2UpPVwib25QYW5lbE1vZGVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgIChjYWxlbmRhckNoYW5nZSk9XCJvbkNhbGVuZGFyQ2hhbmdlKCRldmVudClcIlxuICAgICAgICBbbG9jYWxlXT1cIm56TG9jYWxlPy5sYW5nIVwiXG4gICAgICAgIFtzaG93VG9kYXldPVwicmVhbFNob3dUb2RheVwiXG4gICAgICAgIFtzaG93VGltZV09XCJuelNob3dUaW1lXCJcbiAgICAgICAgW2Zvcm1hdF09XCJuekZvcm1hdFwiXG4gICAgICAgIFtkYXRlUmVuZGVyXT1cIm56RGF0ZVJlbmRlclwiXG4gICAgICAgIFtkaXNhYmxlZERhdGVdPVwibnpEaXNhYmxlZERhdGVcIlxuICAgICAgICBbZGlzYWJsZWRUaW1lXT1cIm56RGlzYWJsZWRUaW1lXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cIm56UGxhY2VIb2xkZXJcIlxuICAgICAgICBbZXh0cmFGb290ZXJdPVwiZXh0cmFGb290ZXJcIlxuICAgICAgICBbcmFuZ2VzXT1cIm56UmFuZ2VzXCJcbiAgICAgICAgKHJlc3VsdE9rKT1cIm9uUmVzdWx0T2soKVwiXG4gICAgICA+PC9kYXRlLXJhbmdlLXBvcHVwPlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtcGlja2VyXSc6IGB0cnVlYCxcbiAgICAnW2NsYXNzLmFudC1waWNrZXItcmFuZ2VdJzogYGlzUmFuZ2VgLFxuICAgICdbY2xhc3MuYW50LXBpY2tlci1sYXJnZV0nOiBgbnpTaXplID09PSAnbGFyZ2UnYCxcbiAgICAnW2NsYXNzLmFudC1waWNrZXItc21hbGxdJzogYG56U2l6ZSA9PT0gJ3NtYWxsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtcGlja2VyLWRpc2FibGVkXSc6IGBuekRpc2FibGVkYCxcbiAgICAnKGNsaWNrKSc6ICdwaWNrZXIub25DbGlja0lucHV0Qm94KCRldmVudCknXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIERhdGVQaWNrZXJTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOekRhdGVQaWNrZXJDb21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE56RGF0ZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256QWxsb3dDbGVhcjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpBdXRvRm9jdXM6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256T3BlbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93VG9kYXk6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TW9kZTogTnpEYXRlTW9kZSB8IE56RGF0ZU1vZGVbXSB8IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd1RpbWU6IEJvb2xlYW5JbnB1dCB8IFN1cHBvcnRUaW1lT3B0aW9ucyB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbiAgaXNSYW5nZTogYm9vbGVhbiA9IGZhbHNlOyAvLyBJbmRpY2F0ZSB3aGV0aGVyIHRoZSB2YWx1ZSBpcyBhIHJhbmdlIHZhbHVlXG4gIHNob3dXZWVrOiBib29sZWFuID0gZmFsc2U7IC8vIFNob3VsZCBzaG93IGFzIHdlZWsgcGlja2VyXG4gIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZXh0cmFGb290ZXI/OiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBkZXN0cm95ZWQkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJvdGVjdGVkIGlzQ3VzdG9tUGxhY2VIb2xkZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBzaG93VGltZTogU3VwcG9ydFRpbWVPcHRpb25zIHwgYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIC0tLSBDb21tb24gQVBJXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekFsbG93Q2xlYXI6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpBdXRvRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56T3Blbj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCAxMC4wLjAuIFRoaXMgaXMgZGVwcmVjYXRlZCBhbmQgZ29pbmcgdG8gYmUgcmVtb3ZlZCBpbiAxMC4wLjAuXG4gICAqL1xuICBASW5wdXQoKSBuekNsYXNzTmFtZTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIG56RGlzYWJsZWREYXRlPzogKGQ6IERhdGUpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpIG56TG9jYWxlITogTnpEYXRlUGlja2VySTE4bkludGVyZmFjZTtcbiAgQElucHV0KCkgbnpQbGFjZUhvbGRlcjogc3RyaW5nIHwgW3N0cmluZywgc3RyaW5nXSA9ICcnO1xuICBASW5wdXQoKSBuelBvcHVwU3R5bGU6IG9iamVjdCA9IFBPUFVQX1NUWUxFX1BBVENIO1xuICBASW5wdXQoKSBuekRyb3Bkb3duQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBASW5wdXQoKSBuelNpemU6ICdsYXJnZScgfCAnc21hbGwnIHwgJ2RlZmF1bHQnID0gJ2RlZmF1bHQnO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgMTAuMC4wLiBUaGlzIGlzIGRlcHJlY2F0ZWQgYW5kIGdvaW5nIHRvIGJlIHJlbW92ZWQgaW4gMTAuMC4wLlxuICAgKi9cbiAgQElucHV0KCkgbnpTdHlsZTogb2JqZWN0IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56Rm9ybWF0ITogc3RyaW5nO1xuICBASW5wdXQoKSBuekRhdGVSZW5kZXI/OiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgc3RyaW5nIHwgRnVuY3Rpb25Qcm9wPFRlbXBsYXRlUmVmPERhdGU+IHwgc3RyaW5nPjtcbiAgQElucHV0KCkgbnpEaXNhYmxlZFRpbWU/OiBEaXNhYmxlZFRpbWVGbjtcbiAgQElucHV0KCkgbnpSZW5kZXJFeHRyYUZvb3Rlcj86IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBzdHJpbmcgfCBGdW5jdGlvblByb3A8VGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IHN0cmluZz47XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dUb2RheTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIG56TW9kZTogTnpEYXRlTW9kZSB8IE56RGF0ZU1vZGVbXSA9ICdkYXRlJztcbiAgQElucHV0KCkgbnpSYW5nZXM/OiBQcmVzZXRSYW5nZXM7XG4gIEBJbnB1dCgpIG56RGVmYXVsdFBpY2tlclZhbHVlOiBDb21wYXRpYmxlRGF0ZSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZyhOWl9DT05GSUdfQ09NUE9ORU5UX05BTUUpIG56U2VwYXJhdG9yPzogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZyhOWl9DT05GSUdfQ09NUE9ORU5UX05BTUUpIG56U3VmZml4SWNvbjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PiA9ICdjYWxlbmRhcic7XG5cbiAgLy8gVE9ETyhAd2VucWk3MykgVGhlIFBhbmVsTW9kZSBuZWVkIG5hbWVkIGZvciBlYWNoIHBpY2tlcnMgYW5kIGV4cG9ydFxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPblBhbmVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOekRhdGVNb2RlIHwgTnpEYXRlTW9kZVtdIHwgc3RyaW5nIHwgc3RyaW5nW10+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uQ2FsZW5kYXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PERhdGUgfCBudWxsPj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25PayA9IG5ldyBFdmVudEVtaXR0ZXI8Q29tcGF0aWJsZURhdGUgfCBudWxsPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbk9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgQFZpZXdDaGlsZChOelBpY2tlckNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSkgcGlja2VyITogTnpQaWNrZXJDb21wb25lbnQ7XG5cbiAgQElucHV0KCkgZ2V0IG56U2hvd1RpbWUoKTogU3VwcG9ydFRpbWVPcHRpb25zIHwgYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd1RpbWU7XG4gIH1cblxuICBzZXQgbnpTaG93VGltZSh2YWx1ZTogU3VwcG9ydFRpbWVPcHRpb25zIHwgYm9vbGVhbikge1xuICAgIHRoaXMuc2hvd1RpbWUgPSB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8gdmFsdWUgOiB0b0Jvb2xlYW4odmFsdWUpO1xuICB9XG5cbiAgZ2V0IHJlYWxPcGVuU3RhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VyLmFuaW1hdGlvbk9wZW5TdGF0ZTtcbiAgfSAvLyBVc2UgcGlja2VyJ3MgcmVhbCBvcGVuIHN0YXRlIHRvIGxldCByZS1yZW5kZXIgdGhlIHBpY2tlcidzIGNvbnRlbnQgd2hlbiBzaG93biB1cFxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBwdWJsaWMgZGF0ZVBpY2tlclNlcnZpY2U6IERhdGVQaWNrZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBpMThuOiBOekkxOG5TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIGRhdGVIZWxwZXI6IERhdGVIZWxwZXJTZXJ2aWNlLFxuICAgIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gU3Vic2NyaWJlIHRoZSBldmVyeSBsb2NhbGUgY2hhbmdlIGlmIHRoZSBuekxvY2FsZSBpcyBub3QgaGFuZGxlZCBieSB1c2VyXG4gICAgaWYgKCF0aGlzLm56TG9jYWxlKSB7XG4gICAgICB0aGlzLmkxOG4ubG9jYWxlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldExvY2FsZSgpKTtcbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IHZhbHVlXG4gICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5pc1JhbmdlID0gdGhpcy5pc1JhbmdlO1xuICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaW5pdFZhbHVlKCk7XG4gICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5lbWl0VmFsdWUkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCkpLnN1YnNjcmliZShfID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS52YWx1ZTtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaW5pdGlhbFZhbHVlID0gY2xvbmVEYXRlKHZhbHVlKTtcbiAgICAgIGlmICh0aGlzLmlzUmFuZ2UpIHtcbiAgICAgICAgY29uc3QgdkFzUmFuZ2UgPSB2YWx1ZSBhcyBDYW5keURhdGVbXTtcbiAgICAgICAgaWYgKHZBc1JhbmdlLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMub25DaGFuZ2VGbihbdkFzUmFuZ2VbMF0ubmF0aXZlRGF0ZSwgdkFzUmFuZ2VbMV0ubmF0aXZlRGF0ZV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub25DaGFuZ2VGbihbXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMub25DaGFuZ2VGbigodmFsdWUgYXMgQ2FuZHlEYXRlKS5uYXRpdmVEYXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uQ2hhbmdlRm4obnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMub25Ub3VjaGVkRm4oKTtcbiAgICAgIC8vIFdoZW4gdmFsdWUgZW1pdHRlZCwgb3ZlcmxheSB3aWxsIGJlIGNsb3NlZFxuICAgICAgdGhpcy5waWNrZXIuaGlkZU92ZXJsYXkoKTtcbiAgICB9KTtcblxuICAgIC8vIERlZmF1bHQgZm9ybWF0IHdoZW4gaXQncyBlbXB0eVxuICAgIGlmICghdGhpcy5uekZvcm1hdCkge1xuICAgICAgaWYgKHRoaXMuc2hvd1dlZWspIHtcbiAgICAgICAgdGhpcy5uekZvcm1hdCA9ICd5eXl5LXd3JzsgLy8gRm9ybWF0IGZvciB3ZWVrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm56Rm9ybWF0ID0gdGhpcy5uelNob3dUaW1lID8gJ3l5eXktTU0tZGQgSEg6bW06c3MnIDogJ3l5eXktTU0tZGQnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5uelBvcHVwU3R5bGUpIHtcbiAgICAgIC8vIEFsd2F5cyBhc3NpZ24gdGhlIHBvcHVwIHN0eWxlIHBhdGNoXG4gICAgICB0aGlzLm56UG9wdXBTdHlsZSA9IHRoaXMubnpQb3B1cFN0eWxlID8geyAuLi50aGlzLm56UG9wdXBTdHlsZSwgLi4uUE9QVVBfU1RZTEVfUEFUQ0ggfSA6IFBPUFVQX1NUWUxFX1BBVENIO1xuICAgIH1cblxuICAgIC8vIE1hcmsgYXMgY3VzdG9taXplZCBwbGFjZWhvbGRlciBieSB1c2VyIG9uY2UgbnpQbGFjZUhvbGRlciBhc3NpZ25lZCBhdCB0aGUgZmlyc3QgdGltZVxuICAgIGlmIChjaGFuZ2VzLm56UGxhY2VIb2xkZXIgJiYgY2hhbmdlcy5uelBsYWNlSG9sZGVyLmZpcnN0Q2hhbmdlICYmIHR5cGVvZiB0aGlzLm56UGxhY2VIb2xkZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmlzQ3VzdG9tUGxhY2VIb2xkZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLm56TG9jYWxlKSB7XG4gICAgICAvLyBUaGUgbnpMb2NhbGUgaXMgY3VycmVudGx5IGhhbmRsZWQgYnkgdXNlclxuICAgICAgdGhpcy5zZXREZWZhdWx0UGxhY2VIb2xkZXIoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5uelJlbmRlckV4dHJhRm9vdGVyKSB7XG4gICAgICB0aGlzLmV4dHJhRm9vdGVyID0gdmFsdWVGdW5jdGlvblByb3AodGhpcy5uelJlbmRlckV4dHJhRm9vdGVyISk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMubnpTdHlsZSkge1xuICAgICAgd2FybkRlcHJlY2F0aW9uKFxuICAgICAgICBgJ256U3R5bGUnIGluIERhdGVQaWNrZXIgaXMgZ29pbmcgdG8gYmUgcmVtb3ZlZCBpbiAxMC4wLjAuIFBsZWFzZSB1c2UgQ1NTIHN0eWxlIGF0dHJpYnV0ZSBsaWtlIDxuei1kYXRlLXBpY2tlciBzdHlsZT1cIi4uLlwiPjwvbnotZGF0ZS1waWNrZXI+IGluc3RlYWQuYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5uekNsYXNzTmFtZSkge1xuICAgICAgd2FybkRlcHJlY2F0aW9uKFxuICAgICAgICBgJ256Q2xhc3NOYW1lJyBpbiBEYXRlUGlja2VyIGlzIGdvaW5nIHRvIGJlIHJlbW92ZWQgaW4gMTAuMC4wLiBQbGVhc2UgdXNlIENTUyBjbGFzcyBhdHRyaWJ1dGUgbGlrZSA8bnotZGF0ZS1waWNrZXIgY2xhc3M9XCIuLi5cIj48L256LWRhdGUtcGlja2VyPiBpbnN0ZWFkLmBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMubnpNb2RlKSB7XG4gICAgICB0aGlzLnNldFBhbmVsTW9kZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveWVkJC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95ZWQkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBzZXRQYW5lbE1vZGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm56TW9kZSkge1xuICAgICAgdGhpcy5uek1vZGUgPSB0aGlzLmlzUmFuZ2UgPyBbJ2RhdGUnLCAnZGF0ZSddIDogJ2RhdGUnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyZWQgd2hlbiBvdmVybGF5T3BlbiBjaGFuZ2VzIChkaWZmZXJlbnQgd2l0aCByZWFsT3BlblN0YXRlKVxuICAgKiBAcGFyYW0gb3BlbiBUaGUgb3ZlcmxheU9wZW4gaW4gcGlja2VyIGNvbXBvbmVudFxuICAgKi9cbiAgb25PcGVuQ2hhbmdlKG9wZW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm56T25PcGVuQ2hhbmdlLmVtaXQob3Blbik7XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gfCBDb250cm9sIHZhbHVlIGFjY2Vzc29yIGltcGxlbWVudHNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gTk9URTogb25DaGFuZ2VGbi9vblRvdWNoZWRGbiB3aWxsIG5vdCBiZSBhc3NpZ25lZCBpZiB1c2VyIG5vdCB1c2UgYXMgbmdNb2RlbFxuICBvbkNoYW5nZUZuOiBPbkNoYW5nZVR5cGUgPSAoKSA9PiB2b2lkIDA7XG4gIG9uVG91Y2hlZEZuOiBPblRvdWNoZWRUeXBlID0gKCkgPT4gdm9pZCAwO1xuXG4gIHdyaXRlVmFsdWUodmFsdWU6IENvbXBhdGlibGVEYXRlKTogdm9pZCB7XG4gICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBPbkNoYW5nZVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlRm4gPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBPblRvdWNoZWRUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRGbiA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5uekRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyB8IEludGVybmFsIG1ldGhvZHNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gUmVsb2FkIGxvY2FsZSBmcm9tIGkxOG4gd2l0aCBzaWRlIGVmZmVjdHNcbiAgcHJpdmF0ZSBzZXRMb2NhbGUoKTogdm9pZCB7XG4gICAgdGhpcy5uekxvY2FsZSA9IHRoaXMuaTE4bi5nZXRMb2NhbGVEYXRhKCdEYXRlUGlja2VyJywge30pO1xuICAgIHRoaXMuc2V0RGVmYXVsdFBsYWNlSG9sZGVyKCk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIHNldERlZmF1bHRQbGFjZUhvbGRlcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNDdXN0b21QbGFjZUhvbGRlciAmJiB0aGlzLm56TG9jYWxlKSB7XG4gICAgICB0aGlzLm56UGxhY2VIb2xkZXIgPSB0aGlzLmlzUmFuZ2UgPyAodGhpcy5uekxvY2FsZS5sYW5nLnJhbmdlUGxhY2Vob2xkZXIgYXMgW3N0cmluZywgc3RyaW5nXSkgOiB0aGlzLm56TG9jYWxlLmxhbmcucGxhY2Vob2xkZXIhO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNhZmUgd2F5IG9mIHNldHRpbmcgdmFsdWUgd2l0aCBkZWZhdWx0XG4gIHByaXZhdGUgc2V0VmFsdWUodmFsdWU6IENvbXBhdGlibGVEYXRlKTogdm9pZCB7XG4gICAgY29uc3QgbmV3VmFsdWU6IENvbXBhdGlibGVWYWx1ZSA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UubWFrZVZhbHVlKHZhbHVlKTtcbiAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnNldFZhbHVlKG5ld1ZhbHVlKTtcbiAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmluaXRpYWxWYWx1ZSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgZ2V0IHJlYWxTaG93VG9kYXkoKTogYm9vbGVhbiB7XG4gICAgLy8gUmFuZ2Ugb25seSBzdXBwb3J0IGluIHNpbmdsZSBkYXRlIHBpY2tlclxuICAgIHJldHVybiB0aGlzLm56TW9kZSA9PT0gJ2RhdGUnICYmIHRoaXMubnpTaG93VG9kYXk7XG4gIH1cblxuICBvbkZvY3VzQ2hhbmdlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c2VkID0gdmFsdWU7XG4gICAgLy8gVE9ETzogYXZvaWQgYXV0b0ZvY3VzIGNhdXNlIGNoYW5nZSBhZnRlciBjaGVja2VkIGVycm9yXG4gICAgaWYgKHRoaXMuZm9jdXNlZCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC1waWNrZXItZm9jdXNlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYW50LXBpY2tlci1mb2N1c2VkJyk7XG4gICAgfVxuICB9XG5cbiAgb25QYW5lbE1vZGVDaGFuZ2UocGFuZWxNb2RlOiBOekRhdGVNb2RlIHwgTnpEYXRlTW9kZVtdKTogdm9pZCB7XG4gICAgLy8gdGhpcy5uek1vZGUgPSBwYW5lbE1vZGU7XG4gICAgdGhpcy5uek9uUGFuZWxDaGFuZ2UuZW1pdChwYW5lbE1vZGUpO1xuICB9XG5cbiAgLy8gRW1pdCBuek9uQ2FsZW5kYXJDaGFuZ2Ugd2hlbiBzZWxlY3QgZGF0ZSBieSBuei1yYW5nZS1waWNrZXJcbiAgb25DYWxlbmRhckNoYW5nZSh2YWx1ZTogQ29tcGF0aWJsZVZhbHVlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNSYW5nZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgY29uc3QgcmFuZ2VWYWx1ZSA9IHZhbHVlLmZpbHRlcih4ID0+IHggaW5zdGFuY2VvZiBDYW5keURhdGUpLm1hcCh4ID0+IHghLm5hdGl2ZURhdGUpO1xuICAgICAgdGhpcy5uek9uQ2FsZW5kYXJDaGFuZ2UuZW1pdChyYW5nZVZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBFbWl0dGVkIHdoZW4gZG9uZSB3aXRoIGRhdGUgc2VsZWN0aW5nXG4gIG9uUmVzdWx0T2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNSYW5nZSkge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnZhbHVlIGFzIENhbmR5RGF0ZVtdO1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCkge1xuICAgICAgICB0aGlzLm56T25Pay5lbWl0KFt2YWx1ZVswXS5uYXRpdmVEYXRlLCB2YWx1ZVsxXS5uYXRpdmVEYXRlXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm56T25Pay5lbWl0KFtdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UudmFsdWUpIHtcbiAgICAgICAgdGhpcy5uek9uT2suZW1pdCgodGhpcy5kYXRlUGlja2VyU2VydmljZS52YWx1ZSBhcyBDYW5keURhdGUpLm5hdGl2ZURhdGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uek9uT2suZW1pdChudWxsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5lbWl0VmFsdWUkLm5leHQoKTtcbiAgfVxufVxuIl19