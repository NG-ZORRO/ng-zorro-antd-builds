/**
 * @fileoverview added by tsickle
 * Generated from: date-picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __decorate, __metadata } from "tslib";
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
const POPUP_STYLE_PATCH = { position: 'relative' };
// Aim to override antd's style to support overlay's position strategy (position:absolute will cause it not working beacuse the overlay can't get the height/width of it's content)
/** @type {?} */
const NZ_CONFIG_COMPONENT_NAME = 'datePicker';
/**
 * The base picker for all common APIs
 */
export class NzDatePickerComponent {
    // Use picker's real open state to let re-render the picker's content when shown up
    /**
     * @param {?} nzConfigService
     * @param {?} datePickerService
     * @param {?} i18n
     * @param {?} cdr
     * @param {?} renderer
     * @param {?} elementRef
     * @param {?} dateHelper
     * @param {?=} noAnimation
     */
    constructor(nzConfigService, datePickerService, i18n, cdr, renderer, elementRef, dateHelper, noAnimation) {
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
        () => void 0);
        this.onTouchedFn = (/**
         * @return {?}
         */
        () => void 0);
    }
    /**
     * @return {?}
     */
    get nzShowTime() {
        return this.showTime;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzShowTime(value) {
        this.showTime = typeof value === 'object' ? value : toBoolean(value);
    }
    /**
     * @return {?}
     */
    get realOpenState() {
        return this.picker.animationOpenState;
    } // Use picker's real open state to let re-render the picker's content when shown up
    /**
     * @return {?}
     */
    ngOnInit() {
        // Subscribe the every locale change if the nzLocale is not handled by user
        if (!this.nzLocale) {
            this.i18n.localeChange.pipe(takeUntil(this.destroyed$)).subscribe((/**
             * @return {?}
             */
            () => this.setLocale()));
        }
        // Default value
        this.datePickerService.isRange = this.isRange;
        this.datePickerService.initValue();
        this.datePickerService.emitValue$.pipe(takeUntil(this.destroyed$)).subscribe((/**
         * @param {?} _
         * @return {?}
         */
        _ => {
            /** @type {?} */
            const value = this.datePickerService.value;
            this.datePickerService.initialValue = cloneDate(value);
            if (this.isRange) {
                /** @type {?} */
                const vAsRange = (/** @type {?} */ (value));
                if (vAsRange.length) {
                    this.onChangeFn([vAsRange[0].nativeDate, vAsRange[1].nativeDate]);
                }
                else {
                    this.onChangeFn([]);
                }
            }
            else {
                if (value) {
                    this.onChangeFn(((/** @type {?} */ (value))).nativeDate);
                }
                else {
                    this.onChangeFn(null);
                }
            }
            this.onTouchedFn();
            // When value emitted, overlay will be closed
            this.picker.hideOverlay();
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
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.nzPopupStyle) {
            // Always assign the popup style patch
            this.nzPopupStyle = this.nzPopupStyle ? Object.assign(Object.assign({}, this.nzPopupStyle), POPUP_STYLE_PATCH) : POPUP_STYLE_PATCH;
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
            warnDeprecation(`'nzStyle' in DatePicker is going to be removed in 10.0.0. Please use CSS style attribute like <nz-date-picker style="..."></nz-date-picker> instead.`);
        }
        if (changes.nzClassName) {
            warnDeprecation(`'nzClassName' in DatePicker is going to be removed in 10.0.0. Please use CSS class attribute like <nz-date-picker class="..."></nz-date-picker> instead.`);
        }
        if (changes.nzMode) {
            this.setPanelMode();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    /**
     * @return {?}
     */
    setPanelMode() {
        if (!this.nzMode) {
            this.nzMode = this.isRange ? ['date', 'date'] : 'date';
        }
    }
    /**
     * Triggered when overlayOpen changes (different with realOpenState)
     * @param {?} open The overlayOpen in picker component
     * @return {?}
     */
    onOpenChange(open) {
        this.nzOnOpenChange.emit(open);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.setValue(value);
        this.cdr.markForCheck();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeFn = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedFn = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.nzDisabled = isDisabled;
        this.cdr.markForCheck();
    }
    // ------------------------------------------------------------------------
    // | Internal methods
    // ------------------------------------------------------------------------
    // Reload locale from i18n with side effects
    /**
     * @private
     * @return {?}
     */
    setLocale() {
        this.nzLocale = this.i18n.getLocaleData('DatePicker', {});
        this.setDefaultPlaceHolder();
        this.cdr.markForCheck();
    }
    /**
     * @private
     * @return {?}
     */
    setDefaultPlaceHolder() {
        if (!this.isCustomPlaceHolder && this.nzLocale) {
            this.nzPlaceHolder = this.isRange ? ((/** @type {?} */ (this.nzLocale.lang.rangePlaceholder))) : (/** @type {?} */ (this.nzLocale.lang.placeholder));
        }
    }
    // Safe way of setting value with default
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
        /** @type {?} */
        const newValue = this.datePickerService.makeValue(value);
        this.datePickerService.setValue(newValue);
        this.datePickerService.initialValue = newValue;
    }
    /**
     * @return {?}
     */
    get realShowToday() {
        // Range only support in single date picker
        return this.nzMode === 'date' && this.nzShowToday;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onFocusChange(value) {
        this.focused = value;
        // TODO: avoid autoFocus cause change after checked error
        if (this.focused) {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-picker-focused');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-picker-focused');
        }
    }
    /**
     * @param {?} panelMode
     * @return {?}
     */
    onPanelModeChange(panelMode) {
        // this.nzMode = panelMode;
        this.nzOnPanelChange.emit(panelMode);
    }
    // Emit nzOnCalendarChange when select date by nz-range-picker
    /**
     * @param {?} value
     * @return {?}
     */
    onCalendarChange(value) {
        if (this.isRange && Array.isArray(value)) {
            /** @type {?} */
            const rangeValue = value.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => x instanceof CandyDate)).map((/**
             * @param {?} x
             * @return {?}
             */
            x => (/** @type {?} */ (x)).nativeDate));
            this.nzOnCalendarChange.emit(rangeValue);
        }
    }
    // Emitted when done with date selecting
    /**
     * @return {?}
     */
    onResultOk() {
        if (this.isRange) {
            /** @type {?} */
            const value = (/** @type {?} */ (this.datePickerService.value));
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
    }
}
NzDatePickerComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'nz-date-picker,nz-week-picker,nz-month-picker,nz-year-picker,nz-range-picker',
                exportAs: 'nzDatePicker',
                template: `
    <div
      nz-picker
      [isRange]="isRange"
      [open]="nzOpen"
      [separator]="nzSeparator"
      [disabled]="nzDisabled"
      [format]="nzFormat"
      [allowClear]="nzAllowClear"
      [autoFocus]="nzAutoFocus"
      [placeholder]="nzPlaceHolder"
      [ngClass]="nzClassName"
      style="display: inherit; align-items: center; width: 100%;"
      [ngStyle]="nzStyle"
      [dropdownClassName]="nzDropdownClassName"
      [popupStyle]="nzPopupStyle"
      [noAnimation]="!!noAnimation?.nzNoAnimation"
      [suffixIcon]="nzSuffixIcon"
      (openChange)="onOpenChange($event)"
      (focusChange)="onFocusChange($event)"
    >
      <date-range-popup
        *ngIf="realOpenState"
        [isRange]="isRange"
        [defaultPickerValue]="nzDefaultPickerValue"
        [showWeek]="showWeek"
        [panelMode]="nzMode"
        (panelModeChange)="onPanelModeChange($event)"
        (calendarChange)="onCalendarChange($event)"
        [locale]="nzLocale?.lang!"
        [showToday]="realShowToday"
        [showTime]="nzShowTime"
        [format]="nzFormat"
        [dateRender]="nzDateRender"
        [disabledDate]="nzDisabledDate"
        [disabledTime]="nzDisabledTime"
        [placeholder]="nzPlaceHolder"
        [extraFooter]="extraFooter"
        [ranges]="nzRanges"
        (resultOk)="onResultOk()"
      ></date-range-popup>
    </div>
  `,
                host: {
                    '[class.ant-picker]': `true`,
                    '[class.ant-picker-range]': `isRange`,
                    '[class.ant-picker-large]': `nzSize === 'large'`,
                    '[class.ant-picker-small]': `nzSize === 'small'`,
                    '[class.ant-picker-disabled]': `nzDisabled`,
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
                        () => NzDatePickerComponent))
                    }
                ]
            }] }
];
/** @nocollapse */
NzDatePickerComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: DatePickerService },
    { type: NzI18nService },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: ElementRef },
    { type: DateHelperService },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC9kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImRhdGUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLElBQUksRUFDSixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBR1QsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFtQixNQUFNLHlCQUF5QixDQUFDO0FBRWhGLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckYsT0FBTyxFQUFFLGlCQUFpQixFQUE2QixhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztNQUdqRCxpQkFBaUIsR0FBRyxFQUFFLFFBQVEs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NENBQXFEOztJQUNyRCx1Q0FBb0Q7O0lBQ3BELHlDQUFpQzs7SUFDakMscURBQTREOztJQUM1RCw0Q0FBZ0Y7O0lBQ2hGLDZDQUEwRzs7SUFHMUcsZ0RBQXVHOztJQUN2RyxtREFBK0U7O0lBQy9FLHVDQUFzRTs7SUFDdEUsK0NBQWdFOztJQUVoRSx1Q0FBMkU7O0lBK0gzRSwyQ0FBd0M7O0lBQ3hDLDRDQUEwQzs7SUFqSHhDLGdEQUF1Qzs7SUFDdkMsa0RBQTJDOzs7OztJQUMzQyxxQ0FBNkI7Ozs7O0lBQzdCLG9DQUFnQzs7Ozs7SUFDaEMseUNBQTJCOzs7OztJQUMzQiwyQ0FBOEI7Ozs7O0lBQzlCLDJDQUF1Qzs7SUFDdkMsNENBQStEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyB3YXJuRGVwcmVjYXRpb24gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbG9nZ2VyJztcbmltcG9ydCB7IE56Tm9BbmltYXRpb25EaXJlY3RpdmUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcbmltcG9ydCB7IENhbmR5RGF0ZSwgY2xvbmVEYXRlLCBDb21wYXRpYmxlVmFsdWUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdGltZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIEZ1bmN0aW9uUHJvcCwgTnpTYWZlQW55LCBPbkNoYW5nZVR5cGUsIE9uVG91Y2hlZFR5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuLCB0b0Jvb2xlYW4sIHZhbHVlRnVuY3Rpb25Qcm9wIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgRGF0ZUhlbHBlclNlcnZpY2UsIE56RGF0ZVBpY2tlckkxOG5JbnRlcmZhY2UsIE56STE4blNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuL2RhdGUtcGlja2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IE56UGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENvbXBhdGlibGVEYXRlLCBEaXNhYmxlZFRpbWVGbiwgTnpEYXRlTW9kZSwgUHJlc2V0UmFuZ2VzLCBTdXBwb3J0VGltZU9wdGlvbnMgfSBmcm9tICcuL3N0YW5kYXJkLXR5cGVzJztcblxuY29uc3QgUE9QVVBfU1RZTEVfUEFUQ0ggPSB7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH07IC8vIEFpbSB0byBvdmVycmlkZSBhbnRkJ3Mgc3R5bGUgdG8gc3VwcG9ydCBvdmVybGF5J3MgcG9zaXRpb24gc3RyYXRlZ3kgKHBvc2l0aW9uOmFic29sdXRlIHdpbGwgY2F1c2UgaXQgbm90IHdvcmtpbmcgYmVhY3VzZSB0aGUgb3ZlcmxheSBjYW4ndCBnZXQgdGhlIGhlaWdodC93aWR0aCBvZiBpdCdzIGNvbnRlbnQpXG5jb25zdCBOWl9DT05GSUdfQ09NUE9ORU5UX05BTUUgPSAnZGF0ZVBpY2tlcic7XG5cbi8qKlxuICogVGhlIGJhc2UgcGlja2VyIGZvciBhbGwgY29tbW9uIEFQSXNcbiAqL1xuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ256LWRhdGUtcGlja2VyLG56LXdlZWstcGlja2VyLG56LW1vbnRoLXBpY2tlcixuei15ZWFyLXBpY2tlcixuei1yYW5nZS1waWNrZXInLFxuICBleHBvcnRBczogJ256RGF0ZVBpY2tlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgbnotcGlja2VyXG4gICAgICBbaXNSYW5nZV09XCJpc1JhbmdlXCJcbiAgICAgIFtvcGVuXT1cIm56T3BlblwiXG4gICAgICBbc2VwYXJhdG9yXT1cIm56U2VwYXJhdG9yXCJcbiAgICAgIFtkaXNhYmxlZF09XCJuekRpc2FibGVkXCJcbiAgICAgIFtmb3JtYXRdPVwibnpGb3JtYXRcIlxuICAgICAgW2FsbG93Q2xlYXJdPVwibnpBbGxvd0NsZWFyXCJcbiAgICAgIFthdXRvRm9jdXNdPVwibnpBdXRvRm9jdXNcIlxuICAgICAgW3BsYWNlaG9sZGVyXT1cIm56UGxhY2VIb2xkZXJcIlxuICAgICAgW25nQ2xhc3NdPVwibnpDbGFzc05hbWVcIlxuICAgICAgc3R5bGU9XCJkaXNwbGF5OiBpbmhlcml0OyBhbGlnbi1pdGVtczogY2VudGVyOyB3aWR0aDogMTAwJTtcIlxuICAgICAgW25nU3R5bGVdPVwibnpTdHlsZVwiXG4gICAgICBbZHJvcGRvd25DbGFzc05hbWVdPVwibnpEcm9wZG93bkNsYXNzTmFtZVwiXG4gICAgICBbcG9wdXBTdHlsZV09XCJuelBvcHVwU3R5bGVcIlxuICAgICAgW25vQW5pbWF0aW9uXT1cIiEhbm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb25cIlxuICAgICAgW3N1ZmZpeEljb25dPVwibnpTdWZmaXhJY29uXCJcbiAgICAgIChvcGVuQ2hhbmdlKT1cIm9uT3BlbkNoYW5nZSgkZXZlbnQpXCJcbiAgICAgIChmb2N1c0NoYW5nZSk9XCJvbkZvY3VzQ2hhbmdlKCRldmVudClcIlxuICAgID5cbiAgICAgIDxkYXRlLXJhbmdlLXBvcHVwXG4gICAgICAgICpuZ0lmPVwicmVhbE9wZW5TdGF0ZVwiXG4gICAgICAgIFtpc1JhbmdlXT1cImlzUmFuZ2VcIlxuICAgICAgICBbZGVmYXVsdFBpY2tlclZhbHVlXT1cIm56RGVmYXVsdFBpY2tlclZhbHVlXCJcbiAgICAgICAgW3Nob3dXZWVrXT1cInNob3dXZWVrXCJcbiAgICAgICAgW3BhbmVsTW9kZV09XCJuek1vZGVcIlxuICAgICAgICAocGFuZWxNb2RlQ2hhbmdlKT1cIm9uUGFuZWxNb2RlQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAoY2FsZW5kYXJDaGFuZ2UpPVwib25DYWxlbmRhckNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgW2xvY2FsZV09XCJuekxvY2FsZT8ubGFuZyFcIlxuICAgICAgICBbc2hvd1RvZGF5XT1cInJlYWxTaG93VG9kYXlcIlxuICAgICAgICBbc2hvd1RpbWVdPVwibnpTaG93VGltZVwiXG4gICAgICAgIFtmb3JtYXRdPVwibnpGb3JtYXRcIlxuICAgICAgICBbZGF0ZVJlbmRlcl09XCJuekRhdGVSZW5kZXJcIlxuICAgICAgICBbZGlzYWJsZWREYXRlXT1cIm56RGlzYWJsZWREYXRlXCJcbiAgICAgICAgW2Rpc2FibGVkVGltZV09XCJuekRpc2FibGVkVGltZVwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJuelBsYWNlSG9sZGVyXCJcbiAgICAgICAgW2V4dHJhRm9vdGVyXT1cImV4dHJhRm9vdGVyXCJcbiAgICAgICAgW3Jhbmdlc109XCJuelJhbmdlc1wiXG4gICAgICAgIChyZXN1bHRPayk9XCJvblJlc3VsdE9rKClcIlxuICAgICAgPjwvZGF0ZS1yYW5nZS1wb3B1cD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXBpY2tlcl0nOiBgdHJ1ZWAsXG4gICAgJ1tjbGFzcy5hbnQtcGlja2VyLXJhbmdlXSc6IGBpc1JhbmdlYCxcbiAgICAnW2NsYXNzLmFudC1waWNrZXItbGFyZ2VdJzogYG56U2l6ZSA9PT0gJ2xhcmdlJ2AsXG4gICAgJ1tjbGFzcy5hbnQtcGlja2VyLXNtYWxsXSc6IGBuelNpemUgPT09ICdzbWFsbCdgLFxuICAgICdbY2xhc3MuYW50LXBpY2tlci1kaXNhYmxlZF0nOiBgbnpEaXNhYmxlZGAsXG4gICAgJyhjbGljayknOiAncGlja2VyLm9uQ2xpY2tJbnB1dEJveCgkZXZlbnQpJ1xuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICBEYXRlUGlja2VyU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnpEYXRlUGlja2VyQ29tcG9uZW50KVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOekRhdGVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekFsbG93Q2xlYXI6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256QXV0b0ZvY3VzOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek9wZW46IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd1RvZGF5OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek1vZGU6IE56RGF0ZU1vZGUgfCBOekRhdGVNb2RlW10gfCBzdHJpbmcgfCBzdHJpbmdbXSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dUaW1lOiBCb29sZWFuSW5wdXQgfCBTdXBwb3J0VGltZU9wdGlvbnMgfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gIGlzUmFuZ2U6IGJvb2xlYW4gPSBmYWxzZTsgLy8gSW5kaWNhdGUgd2hldGhlciB0aGUgdmFsdWUgaXMgYSByYW5nZSB2YWx1ZVxuICBzaG93V2VlazogYm9vbGVhbiA9IGZhbHNlOyAvLyBTaG91bGQgc2hvdyBhcyB3ZWVrIHBpY2tlclxuICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG4gIGV4dHJhRm9vdGVyPzogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IHN0cmluZztcblxuICBwcm90ZWN0ZWQgZGVzdHJveWVkJDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG4gIHByb3RlY3RlZCBpc0N1c3RvbVBsYWNlSG9sZGVyOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgc2hvd1RpbWU6IFN1cHBvcnRUaW1lT3B0aW9ucyB8IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyAtLS0gQ29tbW9uIEFQSVxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpBbGxvd0NsZWFyOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56QXV0b0ZvY3VzOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek9wZW4/OiBib29sZWFuO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgMTAuMC4wLiBUaGlzIGlzIGRlcHJlY2F0ZWQgYW5kIGdvaW5nIHRvIGJlIHJlbW92ZWQgaW4gMTAuMC4wLlxuICAgKi9cbiAgQElucHV0KCkgbnpDbGFzc05hbWU6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBuekRpc2FibGVkRGF0ZT86IChkOiBEYXRlKSA9PiBib29sZWFuO1xuICBASW5wdXQoKSBuekxvY2FsZSE6IE56RGF0ZVBpY2tlckkxOG5JbnRlcmZhY2U7XG4gIEBJbnB1dCgpIG56UGxhY2VIb2xkZXI6IHN0cmluZyB8IFtzdHJpbmcsIHN0cmluZ10gPSAnJztcbiAgQElucHV0KCkgbnpQb3B1cFN0eWxlOiBvYmplY3QgPSBQT1BVUF9TVFlMRV9QQVRDSDtcbiAgQElucHV0KCkgbnpEcm9wZG93bkNsYXNzTmFtZT86IHN0cmluZztcbiAgQElucHV0KCkgbnpTaXplOiAnbGFyZ2UnIHwgJ3NtYWxsJyB8ICdkZWZhdWx0JyA9ICdkZWZhdWx0JztcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIDEwLjAuMC4gVGhpcyBpcyBkZXByZWNhdGVkIGFuZCBnb2luZyB0byBiZSByZW1vdmVkIGluIDEwLjAuMC5cbiAgICovXG4gIEBJbnB1dCgpIG56U3R5bGU6IG9iamVjdCB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekZvcm1hdCE6IHN0cmluZztcbiAgQElucHV0KCkgbnpEYXRlUmVuZGVyPzogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IHN0cmluZyB8IEZ1bmN0aW9uUHJvcDxUZW1wbGF0ZVJlZjxEYXRlPiB8IHN0cmluZz47XG4gIEBJbnB1dCgpIG56RGlzYWJsZWRUaW1lPzogRGlzYWJsZWRUaW1lRm47XG4gIEBJbnB1dCgpIG56UmVuZGVyRXh0cmFGb290ZXI/OiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgc3RyaW5nIHwgRnVuY3Rpb25Qcm9wPFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBzdHJpbmc+O1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93VG9kYXk6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBuek1vZGU6IE56RGF0ZU1vZGUgfCBOekRhdGVNb2RlW10gPSAnZGF0ZSc7XG4gIEBJbnB1dCgpIG56UmFuZ2VzPzogUHJlc2V0UmFuZ2VzO1xuICBASW5wdXQoKSBuekRlZmF1bHRQaWNrZXJWYWx1ZTogQ29tcGF0aWJsZURhdGUgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoTlpfQ09ORklHX0NPTVBPTkVOVF9OQU1FKSBuelNlcGFyYXRvcj86IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoTlpfQ09ORklHX0NPTVBPTkVOVF9OQU1FKSBuelN1ZmZpeEljb246IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gPSAnY2FsZW5kYXInO1xuXG4gIC8vIFRPRE8oQHdlbnFpNzMpIFRoZSBQYW5lbE1vZGUgbmVlZCBuYW1lZCBmb3IgZWFjaCBwaWNrZXJzIGFuZCBleHBvcnRcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25QYW5lbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpEYXRlTW9kZSB8IE56RGF0ZU1vZGVbXSB8IHN0cmluZyB8IHN0cmluZ1tdPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkNhbGVuZGFyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxEYXRlIHwgbnVsbD4+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uT2sgPSBuZXcgRXZlbnRFbWl0dGVyPENvbXBhdGlibGVEYXRlIHwgbnVsbD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25PcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBWaWV3Q2hpbGQoTnpQaWNrZXJDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pIHBpY2tlciE6IE56UGlja2VyQ29tcG9uZW50O1xuXG4gIEBJbnB1dCgpIGdldCBuelNob3dUaW1lKCk6IFN1cHBvcnRUaW1lT3B0aW9ucyB8IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNob3dUaW1lO1xuICB9XG5cbiAgc2V0IG56U2hvd1RpbWUodmFsdWU6IFN1cHBvcnRUaW1lT3B0aW9ucyB8IGJvb2xlYW4pIHtcbiAgICB0aGlzLnNob3dUaW1lID0gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyA/IHZhbHVlIDogdG9Cb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIGdldCByZWFsT3BlblN0YXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tlci5hbmltYXRpb25PcGVuU3RhdGU7XG4gIH0gLy8gVXNlIHBpY2tlcidzIHJlYWwgb3BlbiBzdGF0ZSB0byBsZXQgcmUtcmVuZGVyIHRoZSBwaWNrZXIncyBjb250ZW50IHdoZW4gc2hvd24gdXBcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgcHVibGljIGRhdGVQaWNrZXJTZXJ2aWNlOiBEYXRlUGlja2VyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgaTE4bjogTnpJMThuU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCBkYXRlSGVscGVyOiBEYXRlSGVscGVyU2VydmljZSxcbiAgICBASG9zdCgpIEBPcHRpb25hbCgpIHB1YmxpYyBub0FuaW1hdGlvbj86IE56Tm9BbmltYXRpb25EaXJlY3RpdmVcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIFN1YnNjcmliZSB0aGUgZXZlcnkgbG9jYWxlIGNoYW5nZSBpZiB0aGUgbnpMb2NhbGUgaXMgbm90IGhhbmRsZWQgYnkgdXNlclxuICAgIGlmICghdGhpcy5uekxvY2FsZSkge1xuICAgICAgdGhpcy5pMThuLmxvY2FsZUNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRMb2NhbGUoKSk7XG4gICAgfVxuXG4gICAgLy8gRGVmYXVsdCB2YWx1ZVxuICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaXNSYW5nZSA9IHRoaXMuaXNSYW5nZTtcbiAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmluaXRWYWx1ZSgpO1xuICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZW1pdFZhbHVlJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpKS5zdWJzY3JpYmUoXyA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UudmFsdWU7XG4gICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmluaXRpYWxWYWx1ZSA9IGNsb25lRGF0ZSh2YWx1ZSk7XG4gICAgICBpZiAodGhpcy5pc1JhbmdlKSB7XG4gICAgICAgIGNvbnN0IHZBc1JhbmdlID0gdmFsdWUgYXMgQ2FuZHlEYXRlW107XG4gICAgICAgIGlmICh2QXNSYW5nZS5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLm9uQ2hhbmdlRm4oW3ZBc1JhbmdlWzBdLm5hdGl2ZURhdGUsIHZBc1JhbmdlWzFdLm5hdGl2ZURhdGVdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uQ2hhbmdlRm4oW10pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLm9uQ2hhbmdlRm4oKHZhbHVlIGFzIENhbmR5RGF0ZSkubmF0aXZlRGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vbkNoYW5nZUZuKG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLm9uVG91Y2hlZEZuKCk7XG4gICAgICAvLyBXaGVuIHZhbHVlIGVtaXR0ZWQsIG92ZXJsYXkgd2lsbCBiZSBjbG9zZWRcbiAgICAgIHRoaXMucGlja2VyLmhpZGVPdmVybGF5KCk7XG4gICAgfSk7XG5cbiAgICAvLyBEZWZhdWx0IGZvcm1hdCB3aGVuIGl0J3MgZW1wdHlcbiAgICBpZiAoIXRoaXMubnpGb3JtYXQpIHtcbiAgICAgIGlmICh0aGlzLnNob3dXZWVrKSB7XG4gICAgICAgIHRoaXMubnpGb3JtYXQgPSAneXl5eS13dyc7IC8vIEZvcm1hdCBmb3Igd2Vla1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uekZvcm1hdCA9IHRoaXMubnpTaG93VGltZSA/ICd5eXl5LU1NLWRkIEhIOm1tOnNzJyA6ICd5eXl5LU1NLWRkJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMubnpQb3B1cFN0eWxlKSB7XG4gICAgICAvLyBBbHdheXMgYXNzaWduIHRoZSBwb3B1cCBzdHlsZSBwYXRjaFxuICAgICAgdGhpcy5uelBvcHVwU3R5bGUgPSB0aGlzLm56UG9wdXBTdHlsZSA/IHsgLi4udGhpcy5uelBvcHVwU3R5bGUsIC4uLlBPUFVQX1NUWUxFX1BBVENIIH0gOiBQT1BVUF9TVFlMRV9QQVRDSDtcbiAgICB9XG5cbiAgICAvLyBNYXJrIGFzIGN1c3RvbWl6ZWQgcGxhY2Vob2xkZXIgYnkgdXNlciBvbmNlIG56UGxhY2VIb2xkZXIgYXNzaWduZWQgYXQgdGhlIGZpcnN0IHRpbWVcbiAgICBpZiAoY2hhbmdlcy5uelBsYWNlSG9sZGVyICYmIGNoYW5nZXMubnpQbGFjZUhvbGRlci5maXJzdENoYW5nZSAmJiB0eXBlb2YgdGhpcy5uelBsYWNlSG9sZGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5pc0N1c3RvbVBsYWNlSG9sZGVyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5uekxvY2FsZSkge1xuICAgICAgLy8gVGhlIG56TG9jYWxlIGlzIGN1cnJlbnRseSBoYW5kbGVkIGJ5IHVzZXJcbiAgICAgIHRoaXMuc2V0RGVmYXVsdFBsYWNlSG9sZGVyKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMubnpSZW5kZXJFeHRyYUZvb3Rlcikge1xuICAgICAgdGhpcy5leHRyYUZvb3RlciA9IHZhbHVlRnVuY3Rpb25Qcm9wKHRoaXMubnpSZW5kZXJFeHRyYUZvb3RlciEpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLm56U3R5bGUpIHtcbiAgICAgIHdhcm5EZXByZWNhdGlvbihcbiAgICAgICAgYCduelN0eWxlJyBpbiBEYXRlUGlja2VyIGlzIGdvaW5nIHRvIGJlIHJlbW92ZWQgaW4gMTAuMC4wLiBQbGVhc2UgdXNlIENTUyBzdHlsZSBhdHRyaWJ1dGUgbGlrZSA8bnotZGF0ZS1waWNrZXIgc3R5bGU9XCIuLi5cIj48L256LWRhdGUtcGlja2VyPiBpbnN0ZWFkLmBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMubnpDbGFzc05hbWUpIHtcbiAgICAgIHdhcm5EZXByZWNhdGlvbihcbiAgICAgICAgYCduekNsYXNzTmFtZScgaW4gRGF0ZVBpY2tlciBpcyBnb2luZyB0byBiZSByZW1vdmVkIGluIDEwLjAuMC4gUGxlYXNlIHVzZSBDU1MgY2xhc3MgYXR0cmlidXRlIGxpa2UgPG56LWRhdGUtcGlja2VyIGNsYXNzPVwiLi4uXCI+PC9uei1kYXRlLXBpY2tlcj4gaW5zdGVhZC5gXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLm56TW9kZSkge1xuICAgICAgdGhpcy5zZXRQYW5lbE1vZGUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveWVkJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgc2V0UGFuZWxNb2RlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5uek1vZGUpIHtcbiAgICAgIHRoaXMubnpNb2RlID0gdGhpcy5pc1JhbmdlID8gWydkYXRlJywgJ2RhdGUnXSA6ICdkYXRlJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcmVkIHdoZW4gb3ZlcmxheU9wZW4gY2hhbmdlcyAoZGlmZmVyZW50IHdpdGggcmVhbE9wZW5TdGF0ZSlcbiAgICogQHBhcmFtIG9wZW4gVGhlIG92ZXJsYXlPcGVuIGluIHBpY2tlciBjb21wb25lbnRcbiAgICovXG4gIG9uT3BlbkNoYW5nZShvcGVuOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5uek9uT3BlbkNoYW5nZS5lbWl0KG9wZW4pO1xuICB9XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIHwgQ29udHJvbCB2YWx1ZSBhY2Nlc3NvciBpbXBsZW1lbnRzXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIE5PVEU6IG9uQ2hhbmdlRm4vb25Ub3VjaGVkRm4gd2lsbCBub3QgYmUgYXNzaWduZWQgaWYgdXNlciBub3QgdXNlIGFzIG5nTW9kZWxcbiAgb25DaGFuZ2VGbjogT25DaGFuZ2VUeXBlID0gKCkgPT4gdm9pZCAwO1xuICBvblRvdWNoZWRGbjogT25Ub3VjaGVkVHlwZSA9ICgpID0+IHZvaWQgMDtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBDb21wYXRpYmxlRGF0ZSk6IHZvaWQge1xuICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogT25DaGFuZ2VUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZUZuID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogT25Ub3VjaGVkVHlwZSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkRm4gPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubnpEaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gfCBJbnRlcm5hbCBtZXRob2RzXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJlbG9hZCBsb2NhbGUgZnJvbSBpMThuIHdpdGggc2lkZSBlZmZlY3RzXG4gIHByaXZhdGUgc2V0TG9jYWxlKCk6IHZvaWQge1xuICAgIHRoaXMubnpMb2NhbGUgPSB0aGlzLmkxOG4uZ2V0TG9jYWxlRGF0YSgnRGF0ZVBpY2tlcicsIHt9KTtcbiAgICB0aGlzLnNldERlZmF1bHRQbGFjZUhvbGRlcigpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXREZWZhdWx0UGxhY2VIb2xkZXIoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzQ3VzdG9tUGxhY2VIb2xkZXIgJiYgdGhpcy5uekxvY2FsZSkge1xuICAgICAgdGhpcy5uelBsYWNlSG9sZGVyID0gdGhpcy5pc1JhbmdlID8gKHRoaXMubnpMb2NhbGUubGFuZy5yYW5nZVBsYWNlaG9sZGVyIGFzIFtzdHJpbmcsIHN0cmluZ10pIDogdGhpcy5uekxvY2FsZS5sYW5nLnBsYWNlaG9sZGVyITtcbiAgICB9XG4gIH1cblxuICAvLyBTYWZlIHdheSBvZiBzZXR0aW5nIHZhbHVlIHdpdGggZGVmYXVsdFxuICBwcml2YXRlIHNldFZhbHVlKHZhbHVlOiBDb21wYXRpYmxlRGF0ZSk6IHZvaWQge1xuICAgIGNvbnN0IG5ld1ZhbHVlOiBDb21wYXRpYmxlVmFsdWUgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLm1ha2VWYWx1ZSh2YWx1ZSk7XG4gICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5zZXRWYWx1ZShuZXdWYWx1ZSk7XG4gICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5pbml0aWFsVmFsdWUgPSBuZXdWYWx1ZTtcbiAgfVxuXG4gIGdldCByZWFsU2hvd1RvZGF5KCk6IGJvb2xlYW4ge1xuICAgIC8vIFJhbmdlIG9ubHkgc3VwcG9ydCBpbiBzaW5nbGUgZGF0ZSBwaWNrZXJcbiAgICByZXR1cm4gdGhpcy5uek1vZGUgPT09ICdkYXRlJyAmJiB0aGlzLm56U2hvd1RvZGF5O1xuICB9XG5cbiAgb25Gb2N1c0NoYW5nZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNlZCA9IHZhbHVlO1xuICAgIC8vIFRPRE86IGF2b2lkIGF1dG9Gb2N1cyBjYXVzZSBjaGFuZ2UgYWZ0ZXIgY2hlY2tlZCBlcnJvclxuICAgIGlmICh0aGlzLmZvY3VzZWQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhbnQtcGlja2VyLWZvY3VzZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC1waWNrZXItZm9jdXNlZCcpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFuZWxNb2RlQ2hhbmdlKHBhbmVsTW9kZTogTnpEYXRlTW9kZSB8IE56RGF0ZU1vZGVbXSk6IHZvaWQge1xuICAgIC8vIHRoaXMubnpNb2RlID0gcGFuZWxNb2RlO1xuICAgIHRoaXMubnpPblBhbmVsQ2hhbmdlLmVtaXQocGFuZWxNb2RlKTtcbiAgfVxuXG4gIC8vIEVtaXQgbnpPbkNhbGVuZGFyQ2hhbmdlIHdoZW4gc2VsZWN0IGRhdGUgYnkgbnotcmFuZ2UtcGlja2VyXG4gIG9uQ2FsZW5kYXJDaGFuZ2UodmFsdWU6IENvbXBhdGlibGVWYWx1ZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzUmFuZ2UgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGNvbnN0IHJhbmdlVmFsdWUgPSB2YWx1ZS5maWx0ZXIoeCA9PiB4IGluc3RhbmNlb2YgQ2FuZHlEYXRlKS5tYXAoeCA9PiB4IS5uYXRpdmVEYXRlKTtcbiAgICAgIHRoaXMubnpPbkNhbGVuZGFyQ2hhbmdlLmVtaXQocmFuZ2VWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gRW1pdHRlZCB3aGVuIGRvbmUgd2l0aCBkYXRlIHNlbGVjdGluZ1xuICBvblJlc3VsdE9rKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzUmFuZ2UpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS52YWx1ZSBhcyBDYW5keURhdGVbXTtcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5uek9uT2suZW1pdChbdmFsdWVbMF0ubmF0aXZlRGF0ZSwgdmFsdWVbMV0ubmF0aXZlRGF0ZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uek9uT2suZW1pdChbXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnZhbHVlKSB7XG4gICAgICAgIHRoaXMubnpPbk9rLmVtaXQoKHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UudmFsdWUgYXMgQ2FuZHlEYXRlKS5uYXRpdmVEYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubnpPbk9rLmVtaXQobnVsbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZW1pdFZhbHVlJC5uZXh0KCk7XG4gIH1cbn1cbiJdfQ==