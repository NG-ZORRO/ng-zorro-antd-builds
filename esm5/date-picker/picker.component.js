/**
 * @fileoverview added by tsickle
 * Generated from: picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Inject, Input, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { slideMotion } from 'ng-zorro-antd/core/animation';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePickerService } from './date-picker.service';
import { DateRangePopupComponent } from './date-range-popup.component';
import { PREFIX_CLASS } from './util';
var NzPickerComponent = /** @class */ (function () {
    function NzPickerComponent(elementRef, dateHelper, changeDetector, datePickerService, doc) {
        this.elementRef = elementRef;
        this.dateHelper = dateHelper;
        this.changeDetector = changeDetector;
        this.datePickerService = datePickerService;
        this.noAnimation = false;
        this.isRange = false;
        this.open = undefined;
        this.disabled = false;
        this.popupStyle = null;
        this.focusChange = new EventEmitter();
        this.valueChange = new EventEmitter();
        this.openChange = new EventEmitter(); // Emitted when overlay's open state change
        this.destroy$ = new Subject();
        this.prefixCls = PREFIX_CLASS;
        this.activeBarStyle = { position: 'absolute' };
        this.animationOpenState = false;
        this.overlayOpen = false; // Available when "open"=undefined
        // Available when "open"=undefined
        this.overlayPositions = (/** @type {?} */ ([
            {
                offsetX: -12,
                offsetY: 8,
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                offsetX: -12,
                offsetY: -8,
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                offsetX: 12,
                offsetY: 8,
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                offsetX: 12,
                offsetY: -8,
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            }
        ]));
        this.currentPositionX = 'start';
        this.currentPositionY = 'bottom';
        this.document = doc;
        this.origin = new CdkOverlayOrigin(this.elementRef);
        this.updateInputValue();
    }
    Object.defineProperty(NzPickerComponent.prototype, "realOpenState", {
        get: /**
         * @return {?}
         */
        function () {
            // The value that really decide the open state of overlay
            return this.isOpenHandledByUser() ? !!this.open : this.overlayOpen;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.inputSize = Math.max(10, this.format.length) + 2;
        this.datePickerService.valueChange$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.updateInputValue();
            _this.changeDetector.markForCheck();
        }));
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.autoFocus) {
            this.focus();
        }
        if (this.isRange) {
            fromEvent(window, 'resize')
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.resetInputWidthAndArrowLeft();
            }));
        }
        this.datePickerService.inputPartChange$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} partType
         * @return {?}
         */
        function (partType) {
            var _a;
            if (partType) {
                _this.datePickerService.activeInput = partType;
            }
            _this.datePickerService.arrowPositionStyle = {
                left: _this.datePickerService.activeInput === 'left' ? '0px' : _this.arrowLeft + "px"
            };
            _this.activeBarStyle = __assign(__assign(__assign({}, _this.activeBarStyle), _this.datePickerService.arrowPositionStyle), { width: _this.inputWidth + "px" });
            if (_this.document.activeElement !== _this.getInput(_this.datePickerService.activeInput)) {
                _this.focus();
            }
            (_a = _this.panel) === null || _a === void 0 ? void 0 : _a.cdr.markForCheck();
            _this.changeDetector.markForCheck();
        }));
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzPickerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.open) {
            this.animationStart();
        }
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.resetInputWidthAndArrowLeft = /**
     * @return {?}
     */
    function () {
        var _a, _b, _c;
        this.inputWidth = ((_b = (_a = this.rangePickerInputs) === null || _a === void 0 ? void 0 : _a.first) === null || _b === void 0 ? void 0 : _b.nativeElement.offsetWidth) || 0;
        this.arrowLeft = this.inputWidth + ((_c = this.separatorElement) === null || _c === void 0 ? void 0 : _c.nativeElement.offsetWidth) || 0;
    };
    /**
     * @param {?=} partType
     * @return {?}
     */
    NzPickerComponent.prototype.getInput = /**
     * @param {?=} partType
     * @return {?}
     */
    function (partType) {
        return this.isRange
            ? partType === 'left'
                ? this.rangePickerInputs.first.nativeElement
                : this.rangePickerInputs.last.nativeElement
            : (/** @type {?} */ (this.pickerInput)).nativeElement;
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.getInput(this.datePickerService.activeInput).focus(); // Focus on the first input
    };
    /**
     * @param {?=} partType
     * @return {?}
     */
    NzPickerComponent.prototype.onFocus = /**
     * @param {?=} partType
     * @return {?}
     */
    function (partType) {
        if (partType) {
            this.datePickerService.inputPartChange$.next(partType);
        }
        this.focusChange.emit(true);
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.focusChange.emit(false);
    };
    // Show overlay content
    // Show overlay content
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.showOverlay = 
    // Show overlay content
    /**
     * @return {?}
     */
    function () {
        if (!this.realOpenState) {
            this.resetInputWidthAndArrowLeft();
            this.overlayOpen = true;
            this.animationStart();
            this.focus();
            this.openChange.emit(true);
        }
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.hideOverlay = /**
     * @return {?}
     */
    function () {
        if (this.realOpenState) {
            this.overlayOpen = false;
            this.openChange.emit(false);
            this.focus();
        }
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.showClear = /**
     * @return {?}
     */
    function () {
        return !this.disabled && !this.isEmptyValue(this.datePickerService.value) && !!this.allowClear;
    };
    /**
     * @param {?} event
     * @param {?=} partType
     * @return {?}
     */
    NzPickerComponent.prototype.onClickInputBox = /**
     * @param {?} event
     * @param {?=} partType
     * @return {?}
     */
    function (event, partType) {
        event.stopPropagation();
        if (!this.disabled && !this.isOpenHandledByUser()) {
            this.showOverlay();
        }
        this.onFocus(partType);
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.onClickBackdrop = /**
     * @return {?}
     */
    function () {
        if (this.panel.isAllowed((/** @type {?} */ (this.datePickerService.value)), true)) {
            this.updateInputValue();
            this.datePickerService.emitValue$.next();
        }
        else {
            this.datePickerService.setValue((/** @type {?} */ (this.datePickerService.initialValue)));
            this.hideOverlay();
        }
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.onOverlayDetach = /**
     * @return {?}
     */
    function () {
        this.hideOverlay();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NzPickerComponent.prototype.onOverlayKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.key === 'Escape') {
            this.datePickerService.setValue((/** @type {?} */ (this.datePickerService.initialValue)));
        }
    };
    // NOTE: A issue here, the first time position change, the animation will not be triggered.
    // Because the overlay's "positionChange" event is emitted after the content's full shown up.
    // All other components like "nz-dropdown" which depends on overlay also has the same issue.
    // See: https://github.com/NG-ZORRO/ng-zorro-antd/issues/1429
    // NOTE: A issue here, the first time position change, the animation will not be triggered.
    // Because the overlay's "positionChange" event is emitted after the content's full shown up.
    // All other components like "nz-dropdown" which depends on overlay also has the same issue.
    // See: https://github.com/NG-ZORRO/ng-zorro-antd/issues/1429
    /**
     * @param {?} position
     * @return {?}
     */
    NzPickerComponent.prototype.onPositionChange = 
    // NOTE: A issue here, the first time position change, the animation will not be triggered.
    // Because the overlay's "positionChange" event is emitted after the content's full shown up.
    // All other components like "nz-dropdown" which depends on overlay also has the same issue.
    // See: https://github.com/NG-ZORRO/ng-zorro-antd/issues/1429
    /**
     * @param {?} position
     * @return {?}
     */
    function (position) {
        this.currentPositionX = position.connectionPair.originX;
        this.currentPositionY = position.connectionPair.originY;
        this.changeDetector.detectChanges(); // Take side-effects to position styles
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NzPickerComponent.prototype.onClickClear = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.datePickerService.setValue(this.isRange ? [] : null);
        this.datePickerService.emitValue$.next();
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.updateInputValue = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var newValue = this.datePickerService.value;
        if (this.isRange) {
            this.inputValue = newValue ? ((/** @type {?} */ (newValue))).map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return _this.formatValue(v); })) : ['', ''];
        }
        else {
            this.inputValue = this.formatValue((/** @type {?} */ (newValue)));
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzPickerComponent.prototype.formatValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.dateHelper.format(value && ((/** @type {?} */ (value))).nativeDate, this.format);
    };
    /**
     * @param {?} event
     * @param {?=} emitValue
     * @return {?}
     */
    NzPickerComponent.prototype.onInputKeyup = /**
     * @param {?} event
     * @param {?=} emitValue
     * @return {?}
     */
    function (event, emitValue) {
        if (emitValue === void 0) { emitValue = false; }
        if (!this.realOpenState) {
            this.showOverlay();
            return;
        }
        /** @type {?} */
        var date = this.checkValidInputDate((/** @type {?} */ (((/** @type {?} */ (event))).target)));
        if (this.panel && date) {
            this.panel.changeValueFromSelect(date, emitValue);
        }
    };
    /**
     * @private
     * @param {?} inputTarget
     * @return {?}
     */
    NzPickerComponent.prototype.checkValidInputDate = /**
     * @private
     * @param {?} inputTarget
     * @return {?}
     */
    function (inputTarget) {
        /** @type {?} */
        var input = ((/** @type {?} */ (inputTarget))).value;
        /** @type {?} */
        var date = new CandyDate(this.dateHelper.parseDate(input, this.format));
        if (!date.isValid() || input !== this.dateHelper.format(date.nativeDate, this.format)) {
            return null;
        }
        return date;
    };
    /**
     * @param {?=} partType
     * @return {?}
     */
    NzPickerComponent.prototype.getPlaceholder = /**
     * @param {?=} partType
     * @return {?}
     */
    function (partType) {
        return this.isRange ? this.placeholder[this.datePickerService.getActiveIndex((/** @type {?} */ (partType)))] : ((/** @type {?} */ (this.placeholder)));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzPickerComponent.prototype.isEmptyValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value === null) {
            return true;
        }
        else if (this.isRange) {
            return !value || !Array.isArray(value) || value.every((/**
             * @param {?} val
             * @return {?}
             */
            function (val) { return !val; }));
        }
        else {
            return !value;
        }
    };
    // Whether open state is permanently controlled by user himself
    // Whether open state is permanently controlled by user himself
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.isOpenHandledByUser = 
    // Whether open state is permanently controlled by user himself
    /**
     * @return {?}
     */
    function () {
        return this.open !== undefined;
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.animationStart = /**
     * @return {?}
     */
    function () {
        if (this.realOpenState) {
            this.animationOpenState = true;
        }
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.animationDone = /**
     * @return {?}
     */
    function () {
        if (!this.realOpenState) {
            this.animationOpenState = false;
            this.changeDetector.markForCheck();
        }
    };
    NzPickerComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: '[nz-picker]',
                    exportAs: 'nzPicker',
                    template: "\n    <!-- Content of single picker -->\n    <div *ngIf=\"!isRange\" class=\"{{ prefixCls }}-input\">\n      <input\n        #pickerInput\n        [class.ant-input-disabled]=\"disabled\"\n        [disabled]=\"disabled\"\n        [(ngModel)]=\"inputValue\"\n        placeholder=\"{{ getPlaceholder() }}\"\n        [size]=\"inputSize\"\n        (focus)=\"onFocus()\"\n        (blur)=\"onBlur()\"\n        (input)=\"onInputKeyup($event)\"\n        (keyup.enter)=\"onInputKeyup($event, true)\"\n      />\n      <ng-container *ngTemplateOutlet=\"tplRightRest\"></ng-container>\n    </div>\n\n    <!-- Content of range picker -->\n    <ng-container *ngIf=\"isRange\">\n      <div class=\"{{ prefixCls }}-input\">\n        <ng-container *ngTemplateOutlet=\"tplRangeInput; context: { partType: 'left' }\"></ng-container>\n      </div>\n      <div #separatorElement class=\"{{ prefixCls }}-range-separator\">\n        <span class=\"{{ prefixCls }}-separator\">\n          <ng-container *ngIf=\"separator; else defaultSeparator\">{{ separator }}</ng-container>\n        </span>\n        <ng-template #defaultSeparator>\n          <i nz-icon nzType=\"swap-right\" nzTheme=\"outline\"></i>\n        </ng-template>\n      </div>\n      <div class=\"{{ prefixCls }}-input\">\n        <ng-container *ngTemplateOutlet=\"tplRangeInput; context: { partType: 'right' }\"></ng-container>\n      </div>\n      <ng-container *ngTemplateOutlet=\"tplRightRest\"></ng-container>\n    </ng-container>\n    <!-- Input for Range ONLY -->\n    <ng-template #tplRangeInput let-partType=\"partType\">\n      <input\n        #rangePickerInput\n        [disabled]=\"disabled\"\n        [size]=\"inputSize\"\n        (click)=\"onClickInputBox($event, partType)\"\n        (blur)=\"onBlur()\"\n        (input)=\"onInputKeyup($event)\"\n        (focus)=\"onFocus(partType)\"\n        (keyup.enter)=\"onInputKeyup($event, true)\"\n        [(ngModel)]=\"inputValue[datePickerService.getActiveIndex(partType)]\"\n        placeholder=\"{{ getPlaceholder(partType) }}\"\n      />\n    </ng-template>\n\n    <!-- Right operator icons -->\n    <ng-template #tplRightRest>\n      <div class=\"{{ prefixCls }}-active-bar\" [ngStyle]=\"activeBarStyle\"></div>\n      <span *ngIf=\"showClear()\" class=\"{{ prefixCls }}-clear\" (click)=\"onClickClear($event)\">\n        <i nz-icon nzType=\"close-circle\" nzTheme=\"fill\"></i>\n      </span>\n      <span class=\"{{ prefixCls }}-suffix\">\n        <ng-container *nzStringTemplateOutlet=\"suffixIcon; let suffixIcon\">\n          <i nz-icon [nzType]=\"suffixIcon\"></i>\n        </ng-container>\n      </span>\n    </ng-template>\n\n    <!-- Overlay -->\n    <ng-template\n      cdkConnectedOverlay\n      nzConnectedOverlay\n      [cdkConnectedOverlayOrigin]=\"origin\"\n      [cdkConnectedOverlayOpen]=\"realOpenState\"\n      [cdkConnectedOverlayHasBackdrop]=\"!isOpenHandledByUser()\"\n      [cdkConnectedOverlayPositions]=\"overlayPositions\"\n      [cdkConnectedOverlayTransformOriginOn]=\"'.ant-picker-wrapper'\"\n      (positionChange)=\"onPositionChange($event)\"\n      (backdropClick)=\"onClickBackdrop()\"\n      (detach)=\"onOverlayDetach()\"\n      (overlayKeydown)=\"onOverlayKeydown($event)\"\n    >\n      <div\n        class=\"ant-picker-wrapper\"\n        [nzNoAnimation]=\"noAnimation\"\n        [@slideMotion]=\"'enter'\"\n        (@slideMotion.done)=\"animationDone()\"\n        style=\"position: relative;\"\n      >\n        <div\n          class=\"{{ prefixCls }}-dropdown {{ dropdownClassName }}\"\n          [class.ant-picker-dropdown-placement-bottomLeft]=\"currentPositionY === 'bottom' && currentPositionX === 'start'\"\n          [class.ant-picker-dropdown-placement-topLeft]=\"currentPositionY === 'top' && currentPositionX === 'start'\"\n          [class.ant-picker-dropdown-placement-bottomRight]=\"currentPositionY === 'bottom' && currentPositionX === 'end'\"\n          [class.ant-picker-dropdown-placement-topRight]=\"currentPositionY === 'top' && currentPositionX === 'end'\"\n          [class.ant-picker-dropdown-range]=\"isRange\"\n          [ngStyle]=\"popupStyle\"\n        >\n          <!-- Compatible for overlay that not support offset dynamically and immediately -->\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </ng-template>\n  ",
                    animations: [slideMotion],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    NzPickerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DateHelperService },
        { type: ChangeDetectorRef },
        { type: DatePickerService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    NzPickerComponent.propDecorators = {
        noAnimation: [{ type: Input }],
        isRange: [{ type: Input }],
        open: [{ type: Input }],
        disabled: [{ type: Input }],
        placeholder: [{ type: Input }],
        allowClear: [{ type: Input }],
        autoFocus: [{ type: Input }],
        format: [{ type: Input }],
        separator: [{ type: Input }],
        popupStyle: [{ type: Input }],
        dropdownClassName: [{ type: Input }],
        suffixIcon: [{ type: Input }],
        focusChange: [{ type: Output }],
        valueChange: [{ type: Output }],
        openChange: [{ type: Output }],
        cdkConnectedOverlay: [{ type: ViewChild, args: [CdkConnectedOverlay, { static: false },] }],
        separatorElement: [{ type: ViewChild, args: ['separatorElement', { static: false },] }],
        pickerInput: [{ type: ViewChild, args: ['pickerInput', { static: false },] }],
        rangePickerInputs: [{ type: ViewChildren, args: ['rangePickerInput',] }],
        panel: [{ type: ContentChild, args: [DateRangePopupComponent,] }]
    };
    return NzPickerComponent;
}());
export { NzPickerComponent };
if (false) {
    /** @type {?} */
    NzPickerComponent.prototype.noAnimation;
    /** @type {?} */
    NzPickerComponent.prototype.isRange;
    /** @type {?} */
    NzPickerComponent.prototype.open;
    /** @type {?} */
    NzPickerComponent.prototype.disabled;
    /** @type {?} */
    NzPickerComponent.prototype.placeholder;
    /** @type {?} */
    NzPickerComponent.prototype.allowClear;
    /** @type {?} */
    NzPickerComponent.prototype.autoFocus;
    /** @type {?} */
    NzPickerComponent.prototype.format;
    /** @type {?} */
    NzPickerComponent.prototype.separator;
    /** @type {?} */
    NzPickerComponent.prototype.popupStyle;
    /** @type {?} */
    NzPickerComponent.prototype.dropdownClassName;
    /** @type {?} */
    NzPickerComponent.prototype.suffixIcon;
    /** @type {?} */
    NzPickerComponent.prototype.focusChange;
    /** @type {?} */
    NzPickerComponent.prototype.valueChange;
    /** @type {?} */
    NzPickerComponent.prototype.openChange;
    /** @type {?} */
    NzPickerComponent.prototype.cdkConnectedOverlay;
    /** @type {?} */
    NzPickerComponent.prototype.separatorElement;
    /** @type {?} */
    NzPickerComponent.prototype.pickerInput;
    /** @type {?} */
    NzPickerComponent.prototype.rangePickerInputs;
    /** @type {?} */
    NzPickerComponent.prototype.panel;
    /** @type {?} */
    NzPickerComponent.prototype.origin;
    /** @type {?} */
    NzPickerComponent.prototype.document;
    /** @type {?} */
    NzPickerComponent.prototype.inputSize;
    /** @type {?} */
    NzPickerComponent.prototype.inputWidth;
    /** @type {?} */
    NzPickerComponent.prototype.arrowLeft;
    /** @type {?} */
    NzPickerComponent.prototype.destroy$;
    /** @type {?} */
    NzPickerComponent.prototype.prefixCls;
    /** @type {?} */
    NzPickerComponent.prototype.inputValue;
    /** @type {?} */
    NzPickerComponent.prototype.activeBarStyle;
    /** @type {?} */
    NzPickerComponent.prototype.animationOpenState;
    /** @type {?} */
    NzPickerComponent.prototype.overlayOpen;
    /** @type {?} */
    NzPickerComponent.prototype.overlayPositions;
    /** @type {?} */
    NzPickerComponent.prototype.currentPositionX;
    /** @type {?} */
    NzPickerComponent.prototype.currentPositionY;
    /**
     * @type {?}
     * @private
     */
    NzPickerComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzPickerComponent.prototype.dateHelper;
    /**
     * @type {?}
     * @private
     */
    NzPickerComponent.prototype.changeDetector;
    /** @type {?} */
    NzPickerComponent.prototype.datePickerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvZGF0ZS1waWNrZXIvIiwic291cmNlcyI6WyJwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUtqQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFJTCxNQUFNLEVBQ04sU0FBUyxFQUdULFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsU0FBUyxFQUFtQixNQUFNLHlCQUF5QixDQUFDO0FBRXJFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRXRDO0lBMExFLDJCQUNVLFVBQXNCLEVBQ3RCLFVBQTZCLEVBQzdCLGNBQWlDLEVBQ2xDLGlCQUFvQyxFQUN6QixHQUFjO1FBSnhCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDN0IsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2xDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFqRnBDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsU0FBSSxHQUF3QixTQUFTLENBQUM7UUFDdEMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQU0xQixlQUFVLEdBQTRCLElBQUksQ0FBQztRQUlqQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDMUMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBa0MsQ0FBQztRQUNqRSxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQyxDQUFDLDJDQUEyQztRQWF4RyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN6QixjQUFTLEdBQUcsWUFBWSxDQUFDO1FBR3pCLG1CQUFjLEdBQVcsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUM7UUFDbEQsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLGdCQUFXLEdBQVksS0FBSyxDQUFDLENBQUMsa0NBQWtDOztRQUNoRSxxQkFBZ0IsR0FBNkIsbUJBQUE7WUFDM0M7Z0JBQ0UsT0FBTyxFQUFFLENBQUMsRUFBRTtnQkFDWixPQUFPLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsT0FBTztnQkFDaEIsT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsS0FBSzthQUNoQjtZQUNEO2dCQUNFLE9BQU8sRUFBRSxDQUFDLEVBQUU7Z0JBQ1osT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDWCxPQUFPLEVBQUUsT0FBTztnQkFDaEIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFFBQVEsRUFBRSxRQUFRO2FBQ25CO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFBRSxLQUFLO2FBQ2hCO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDWCxPQUFPLEVBQUUsS0FBSztnQkFDZCxPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsUUFBUTthQUNuQjtTQUNGLEVBQTRCLENBQUM7UUFDOUIscUJBQWdCLEdBQTRCLE9BQU8sQ0FBQztRQUNwRCxxQkFBZ0IsR0FBMEIsUUFBUSxDQUFDO1FBY2pELElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQWZELHNCQUFJLDRDQUFhOzs7O1FBQWpCO1lBQ0UseURBQXlEO1lBQ3pELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JFLENBQUM7OztPQUFBOzs7O0lBY0Qsb0NBQVE7OztJQUFSO1FBQUEsaUJBT0M7UUFOQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7UUFBQztZQUMzRSxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELDJDQUFlOzs7SUFBZjtRQUFBLGlCQThCQztRQTdCQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7aUJBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM5QixTQUFTOzs7WUFBQztnQkFDVCxLQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztZQUNyQyxDQUFDLEVBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsUUFBUTs7WUFDdkYsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osS0FBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7YUFDL0M7WUFDRCxLQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEdBQUc7Z0JBQzFDLElBQUksRUFBRSxLQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBSSxLQUFJLENBQUMsU0FBUyxPQUFJO2FBQ3BGLENBQUM7WUFDRixLQUFJLENBQUMsY0FBYyxrQ0FDZCxLQUFJLENBQUMsY0FBYyxHQUNuQixLQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEtBQzVDLEtBQUssRUFBSyxLQUFJLENBQUMsVUFBVSxPQUFJLEdBQzlCLENBQUM7WUFDRixJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUNyRixLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDZDtZQUNELE1BQUEsS0FBSSxDQUFDLEtBQUssMENBQUUsR0FBRyxDQUFDLFlBQVksR0FBRztZQUMvQixLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELHVDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7OztJQUVELHVDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDaEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzs7OztJQUVELHVEQUEyQjs7O0lBQTNCOztRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBQSxJQUFJLENBQUMsaUJBQWlCLDBDQUFFLEtBQUssMENBQUUsYUFBYSxDQUFDLFdBQVcsS0FBSSxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxVQUFHLElBQUksQ0FBQyxnQkFBZ0IsMENBQUUsYUFBYSxDQUFDLFdBQVcsQ0FBQSxJQUFJLENBQUMsQ0FBQztJQUMzRixDQUFDOzs7OztJQUVELG9DQUFROzs7O0lBQVIsVUFBUyxRQUF3QjtRQUMvQixPQUFPLElBQUksQ0FBQyxPQUFPO1lBQ2pCLENBQUMsQ0FBQyxRQUFRLEtBQUssTUFBTTtnQkFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsYUFBYTtnQkFDNUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUM3QyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFdBQVcsRUFBQyxDQUFDLGFBQWEsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRUQsaUNBQUs7OztJQUFMO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQywyQkFBMkI7SUFDeEYsQ0FBQzs7Ozs7SUFFRCxtQ0FBTzs7OztJQUFQLFVBQVEsUUFBd0I7UUFDOUIsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELGtDQUFNOzs7SUFBTjtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCx1QkFBdUI7Ozs7O0lBQ3ZCLHVDQUFXOzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7OztJQUVELHVDQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtJQUNILENBQUM7Ozs7SUFFRCxxQ0FBUzs7O0lBQVQ7UUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ2pHLENBQUM7Ozs7OztJQUVELDJDQUFlOzs7OztJQUFmLFVBQWdCLEtBQWlCLEVBQUUsUUFBd0I7UUFDekQsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUU7WUFDakQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsMkNBQWU7OztJQUFmO1FBQ0UsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDN0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMxQzthQUFNO1lBQ0wsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxtQkFBQSxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7O0lBRUQsMkNBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsNENBQWdCOzs7O0lBQWhCLFVBQWlCLEtBQW9CO1FBQ25DLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxtQkFBQSxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQztTQUN2RTtJQUNILENBQUM7SUFFRCwyRkFBMkY7SUFDM0YsNkZBQTZGO0lBQzdGLDRGQUE0RjtJQUM1Riw2REFBNkQ7Ozs7Ozs7OztJQUM3RCw0Q0FBZ0I7Ozs7Ozs7OztJQUFoQixVQUFpQixRQUF3QztRQUN2RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7UUFDeEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO1FBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyx1Q0FBdUM7SUFDOUUsQ0FBQzs7Ozs7SUFFRCx3Q0FBWTs7OztJQUFaLFVBQWEsS0FBaUI7UUFDNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRUQsNENBQWdCOzs7SUFBaEI7UUFBQSxpQkFPQzs7WUFOTyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUs7UUFDN0MsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFBLFFBQVEsRUFBZSxDQUFDLENBQUMsR0FBRzs7OztZQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBbkIsQ0FBbUIsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNqRzthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFBLFFBQVEsRUFBYSxDQUFDLENBQUM7U0FDM0Q7SUFDSCxDQUFDOzs7OztJQUVELHVDQUFXOzs7O0lBQVgsVUFBWSxLQUFnQjtRQUMxQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLG1CQUFBLEtBQUssRUFBYSxDQUFDLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2RixDQUFDOzs7Ozs7SUFFRCx3Q0FBWTs7Ozs7SUFBWixVQUFhLEtBQVksRUFBRSxTQUEwQjtRQUExQiwwQkFBQSxFQUFBLGlCQUEwQjtRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsT0FBTztTQUNSOztZQUNLLElBQUksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQUEsQ0FBQyxtQkFBQSxLQUFLLEVBQWlCLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQztRQUN2RSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sK0NBQW1COzs7OztJQUEzQixVQUE0QixXQUF3Qjs7WUFDNUMsS0FBSyxHQUFHLENBQUMsbUJBQUEsV0FBVyxFQUFvQixDQUFDLENBQUMsS0FBSzs7WUFDL0MsSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFekUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDckYsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFFRCwwQ0FBYzs7OztJQUFkLFVBQWUsUUFBd0I7UUFDckMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsbUJBQUEsUUFBUSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxXQUFXLEVBQVUsQ0FBQyxDQUFDO0lBQzFILENBQUM7Ozs7O0lBRUQsd0NBQVk7Ozs7SUFBWixVQUFhLEtBQXNCO1FBQ2pDLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLOzs7O1lBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxDQUFDLEdBQUcsRUFBSixDQUFJLEVBQUMsQ0FBQztTQUNwRTthQUFNO1lBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUNmO0lBQ0gsQ0FBQztJQUVELCtEQUErRDs7Ozs7SUFDL0QsK0NBQW1COzs7OztJQUFuQjtRQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUM7SUFDakMsQ0FBQzs7OztJQUVELDBDQUFjOzs7SUFBZDtRQUNFLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7OztJQUVELHlDQUFhOzs7SUFBYjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7WUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNwQztJQUNILENBQUM7O2dCQTdaRixTQUFTLFNBQUM7b0JBQ1QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFLG90SUFvR1Q7b0JBQ0QsVUFBVSxFQUFFLENBQUMsV0FBVyxDQUFDO29CQUN6QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBdElDLFVBQVU7Z0JBbUJILGlCQUFpQjtnQkF0QnhCLGlCQUFpQjtnQkF5QlYsaUJBQWlCO2dEQW9NckIsTUFBTSxTQUFDLFFBQVE7Ozs4QkFsRmpCLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBQ0wsS0FBSzs0QkFDTCxLQUFLOzZCQUNMLEtBQUs7b0NBQ0wsS0FBSzs2QkFDTCxLQUFLOzhCQUVMLE1BQU07OEJBQ04sTUFBTTs2QkFDTixNQUFNO3NDQUVOLFNBQVMsU0FBQyxtQkFBbUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7bUNBQ2hELFNBQVMsU0FBQyxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7OEJBQy9DLFNBQVMsU0FBQyxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO29DQUMxQyxZQUFZLFNBQUMsa0JBQWtCO3dCQUMvQixZQUFZLFNBQUMsdUJBQXVCOztJQTRSdkMsd0JBQUM7Q0FBQSxBQTlaRCxJQThaQztTQWxUWSxpQkFBaUI7OztJQUM1Qix3Q0FBc0M7O0lBQ3RDLG9DQUFrQzs7SUFDbEMsaUNBQStDOztJQUMvQyxxQ0FBbUM7O0lBQ25DLHdDQUF5Qzs7SUFDekMsdUNBQThCOztJQUM5QixzQ0FBNkI7O0lBQzdCLG1DQUF5Qjs7SUFDekIsc0NBQTRCOztJQUM1Qix1Q0FBb0Q7O0lBQ3BELDhDQUFvQzs7SUFDcEMsdUNBQXNEOztJQUV0RCx3Q0FBNkQ7O0lBQzdELHdDQUFvRjs7SUFDcEYsdUNBQTREOztJQUU1RCxnREFBNkY7O0lBQzdGLDZDQUFnRjs7SUFDaEYsd0NBQXdGOztJQUN4Riw4Q0FBOEY7O0lBQzlGLGtDQUF1RTs7SUFFdkUsbUNBQXlCOztJQUN6QixxQ0FBbUI7O0lBQ25CLHNDQUFtQjs7SUFDbkIsdUNBQW9COztJQUNwQixzQ0FBbUI7O0lBQ25CLHFDQUF5Qjs7SUFDekIsc0NBQXlCOztJQUV6Qix1Q0FBc0I7O0lBQ3RCLDJDQUFrRDs7SUFDbEQsK0NBQTJCOztJQUMzQix3Q0FBNkI7O0lBQzdCLDZDQWlDOEI7O0lBQzlCLDZDQUFvRDs7SUFDcEQsNkNBQW1EOzs7OztJQVFqRCx1Q0FBOEI7Ozs7O0lBQzlCLHVDQUFxQzs7Ozs7SUFDckMsMkNBQXlDOztJQUN6Qyw4Q0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDZGtDb25uZWN0ZWRPdmVybGF5LFxuICBDZGtPdmVybGF5T3JpZ2luLFxuICBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UsXG4gIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIsXG4gIEhvcml6b250YWxDb25uZWN0aW9uUG9zLFxuICBWZXJ0aWNhbENvbm5lY3Rpb25Qb3Ncbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHNsaWRlTW90aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2FuaW1hdGlvbic7XG5cbmltcG9ydCB7IENhbmR5RGF0ZSwgQ29tcGF0aWJsZVZhbHVlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3RpbWUnO1xuaW1wb3J0IHsgTmdTdHlsZUludGVyZmFjZSwgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IERhdGVIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuL2RhdGUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZVJhbmdlUG9wdXBDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtcmFuZ2UtcG9wdXAuY29tcG9uZW50JztcbmltcG9ydCB7IFJhbmdlUGFydFR5cGUgfSBmcm9tICcuL3N0YW5kYXJkLXR5cGVzJztcbmltcG9ydCB7IFBSRUZJWF9DTEFTUyB9IGZyb20gJy4vdXRpbCc7XG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ1tuei1waWNrZXJdJyxcbiAgZXhwb3J0QXM6ICduelBpY2tlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSBDb250ZW50IG9mIHNpbmdsZSBwaWNrZXIgLS0+XG4gICAgPGRpdiAqbmdJZj1cIiFpc1JhbmdlXCIgY2xhc3M9XCJ7eyBwcmVmaXhDbHMgfX0taW5wdXRcIj5cbiAgICAgIDxpbnB1dFxuICAgICAgICAjcGlja2VySW5wdXRcbiAgICAgICAgW2NsYXNzLmFudC1pbnB1dC1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgIFsobmdNb2RlbCldPVwiaW5wdXRWYWx1ZVwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwie3sgZ2V0UGxhY2Vob2xkZXIoKSB9fVwiXG4gICAgICAgIFtzaXplXT1cImlucHV0U2l6ZVwiXG4gICAgICAgIChmb2N1cyk9XCJvbkZvY3VzKClcIlxuICAgICAgICAoYmx1cik9XCJvbkJsdXIoKVwiXG4gICAgICAgIChpbnB1dCk9XCJvbklucHV0S2V5dXAoJGV2ZW50KVwiXG4gICAgICAgIChrZXl1cC5lbnRlcik9XCJvbklucHV0S2V5dXAoJGV2ZW50LCB0cnVlKVwiXG4gICAgICAvPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRwbFJpZ2h0UmVzdFwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBDb250ZW50IG9mIHJhbmdlIHBpY2tlciAtLT5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNSYW5nZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInt7IHByZWZpeENscyB9fS1pbnB1dFwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidHBsUmFuZ2VJbnB1dDsgY29udGV4dDogeyBwYXJ0VHlwZTogJ2xlZnQnIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAjc2VwYXJhdG9yRWxlbWVudCBjbGFzcz1cInt7IHByZWZpeENscyB9fS1yYW5nZS1zZXBhcmF0b3JcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ7eyBwcmVmaXhDbHMgfX0tc2VwYXJhdG9yXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNlcGFyYXRvcjsgZWxzZSBkZWZhdWx0U2VwYXJhdG9yXCI+e3sgc2VwYXJhdG9yIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0U2VwYXJhdG9yPlxuICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwic3dhcC1yaWdodFwiIG56VGhlbWU9XCJvdXRsaW5lXCI+PC9pPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwie3sgcHJlZml4Q2xzIH19LWlucHV0XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0cGxSYW5nZUlucHV0OyBjb250ZXh0OiB7IHBhcnRUeXBlOiAncmlnaHQnIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRwbFJpZ2h0UmVzdFwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwhLS0gSW5wdXQgZm9yIFJhbmdlIE9OTFkgLS0+XG4gICAgPG5nLXRlbXBsYXRlICN0cGxSYW5nZUlucHV0IGxldC1wYXJ0VHlwZT1cInBhcnRUeXBlXCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgI3JhbmdlUGlja2VySW5wdXRcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgW3NpemVdPVwiaW5wdXRTaXplXCJcbiAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2tJbnB1dEJveCgkZXZlbnQsIHBhcnRUeXBlKVwiXG4gICAgICAgIChibHVyKT1cIm9uQmx1cigpXCJcbiAgICAgICAgKGlucHV0KT1cIm9uSW5wdXRLZXl1cCgkZXZlbnQpXCJcbiAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMocGFydFR5cGUpXCJcbiAgICAgICAgKGtleXVwLmVudGVyKT1cIm9uSW5wdXRLZXl1cCgkZXZlbnQsIHRydWUpXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJpbnB1dFZhbHVlW2RhdGVQaWNrZXJTZXJ2aWNlLmdldEFjdGl2ZUluZGV4KHBhcnRUeXBlKV1cIlxuICAgICAgICBwbGFjZWhvbGRlcj1cInt7IGdldFBsYWNlaG9sZGVyKHBhcnRUeXBlKSB9fVwiXG4gICAgICAvPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tIFJpZ2h0IG9wZXJhdG9yIGljb25zIC0tPlxuICAgIDxuZy10ZW1wbGF0ZSAjdHBsUmlnaHRSZXN0PlxuICAgICAgPGRpdiBjbGFzcz1cInt7IHByZWZpeENscyB9fS1hY3RpdmUtYmFyXCIgW25nU3R5bGVdPVwiYWN0aXZlQmFyU3R5bGVcIj48L2Rpdj5cbiAgICAgIDxzcGFuICpuZ0lmPVwic2hvd0NsZWFyKClcIiBjbGFzcz1cInt7IHByZWZpeENscyB9fS1jbGVhclwiIChjbGljayk9XCJvbkNsaWNrQ2xlYXIoJGV2ZW50KVwiPlxuICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImNsb3NlLWNpcmNsZVwiIG56VGhlbWU9XCJmaWxsXCI+PC9pPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ7eyBwcmVmaXhDbHMgfX0tc3VmZml4XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJzdWZmaXhJY29uOyBsZXQgc3VmZml4SWNvblwiPlxuICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJzdWZmaXhJY29uXCI+PC9pPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLSBPdmVybGF5IC0tPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxuICAgICAgbnpDb25uZWN0ZWRPdmVybGF5XG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJvcmlnaW5cIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcGVuXT1cInJlYWxPcGVuU3RhdGVcIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlIYXNCYWNrZHJvcF09XCIhaXNPcGVuSGFuZGxlZEJ5VXNlcigpXCJcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25zXT1cIm92ZXJsYXlQb3NpdGlvbnNcIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlUcmFuc2Zvcm1PcmlnaW5Pbl09XCInLmFudC1waWNrZXItd3JhcHBlcidcIlxuICAgICAgKHBvc2l0aW9uQ2hhbmdlKT1cIm9uUG9zaXRpb25DaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAoYmFja2Ryb3BDbGljayk9XCJvbkNsaWNrQmFja2Ryb3AoKVwiXG4gICAgICAoZGV0YWNoKT1cIm9uT3ZlcmxheURldGFjaCgpXCJcbiAgICAgIChvdmVybGF5S2V5ZG93bik9XCJvbk92ZXJsYXlLZXlkb3duKCRldmVudClcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJhbnQtcGlja2VyLXdyYXBwZXJcIlxuICAgICAgICBbbnpOb0FuaW1hdGlvbl09XCJub0FuaW1hdGlvblwiXG4gICAgICAgIFtAc2xpZGVNb3Rpb25dPVwiJ2VudGVyJ1wiXG4gICAgICAgIChAc2xpZGVNb3Rpb24uZG9uZSk9XCJhbmltYXRpb25Eb25lKClcIlxuICAgICAgICBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIlxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJ7eyBwcmVmaXhDbHMgfX0tZHJvcGRvd24ge3sgZHJvcGRvd25DbGFzc05hbWUgfX1cIlxuICAgICAgICAgIFtjbGFzcy5hbnQtcGlja2VyLWRyb3Bkb3duLXBsYWNlbWVudC1ib3R0b21MZWZ0XT1cImN1cnJlbnRQb3NpdGlvblkgPT09ICdib3R0b20nICYmIGN1cnJlbnRQb3NpdGlvblggPT09ICdzdGFydCdcIlxuICAgICAgICAgIFtjbGFzcy5hbnQtcGlja2VyLWRyb3Bkb3duLXBsYWNlbWVudC10b3BMZWZ0XT1cImN1cnJlbnRQb3NpdGlvblkgPT09ICd0b3AnICYmIGN1cnJlbnRQb3NpdGlvblggPT09ICdzdGFydCdcIlxuICAgICAgICAgIFtjbGFzcy5hbnQtcGlja2VyLWRyb3Bkb3duLXBsYWNlbWVudC1ib3R0b21SaWdodF09XCJjdXJyZW50UG9zaXRpb25ZID09PSAnYm90dG9tJyAmJiBjdXJyZW50UG9zaXRpb25YID09PSAnZW5kJ1wiXG4gICAgICAgICAgW2NsYXNzLmFudC1waWNrZXItZHJvcGRvd24tcGxhY2VtZW50LXRvcFJpZ2h0XT1cImN1cnJlbnRQb3NpdGlvblkgPT09ICd0b3AnICYmIGN1cnJlbnRQb3NpdGlvblggPT09ICdlbmQnXCJcbiAgICAgICAgICBbY2xhc3MuYW50LXBpY2tlci1kcm9wZG93bi1yYW5nZV09XCJpc1JhbmdlXCJcbiAgICAgICAgICBbbmdTdHlsZV09XCJwb3B1cFN0eWxlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDwhLS0gQ29tcGF0aWJsZSBmb3Igb3ZlcmxheSB0aGF0IG5vdCBzdXBwb3J0IG9mZnNldCBkeW5hbWljYWxseSBhbmQgaW1tZWRpYXRlbHkgLS0+XG4gICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGFuaW1hdGlvbnM6IFtzbGlkZU1vdGlvbl0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE56UGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG5vQW5pbWF0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGlzUmFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgb3BlbjogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIhOiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgQElucHV0KCkgYWxsb3dDbGVhcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF1dG9Gb2N1cz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZvcm1hdCE6IHN0cmluZztcbiAgQElucHV0KCkgc2VwYXJhdG9yPzogc3RyaW5nO1xuICBASW5wdXQoKSBwb3B1cFN0eWxlOiBOZ1N0eWxlSW50ZXJmYWNlIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGRyb3Bkb3duQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBASW5wdXQoKSBzdWZmaXhJY29uPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PjtcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgZm9jdXNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FuZHlEYXRlIHwgQ2FuZHlEYXRlW10gfCBudWxsPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTsgLy8gRW1pdHRlZCB3aGVuIG92ZXJsYXkncyBvcGVuIHN0YXRlIGNoYW5nZVxuXG4gIEBWaWV3Q2hpbGQoQ2RrQ29ubmVjdGVkT3ZlcmxheSwgeyBzdGF0aWM6IGZhbHNlIH0pIGNka0Nvbm5lY3RlZE92ZXJsYXk/OiBDZGtDb25uZWN0ZWRPdmVybGF5O1xuICBAVmlld0NoaWxkKCdzZXBhcmF0b3JFbGVtZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pIHNlcGFyYXRvckVsZW1lbnQ/OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdwaWNrZXJJbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KSBwaWNrZXJJbnB1dD86IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD47XG4gIEBWaWV3Q2hpbGRyZW4oJ3JhbmdlUGlja2VySW5wdXQnKSByYW5nZVBpY2tlcklucHV0cyE6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+PjtcbiAgQENvbnRlbnRDaGlsZChEYXRlUmFuZ2VQb3B1cENvbXBvbmVudCkgcGFuZWwhOiBEYXRlUmFuZ2VQb3B1cENvbXBvbmVudDtcblxuICBvcmlnaW46IENka092ZXJsYXlPcmlnaW47XG4gIGRvY3VtZW50OiBEb2N1bWVudDtcbiAgaW5wdXRTaXplPzogbnVtYmVyO1xuICBpbnB1dFdpZHRoPzogbnVtYmVyO1xuICBhcnJvd0xlZnQ/OiBudW1iZXI7XG4gIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJlZml4Q2xzID0gUFJFRklYX0NMQVNTO1xuICAvLyBJbmRleCBzaWduYXR1cmUgaW4gdHlwZSAnc3RyaW5nIHwgc3RyaW5nW10nIG9ubHkgcGVybWl0cyByZWFkaW5nXG4gIGlucHV0VmFsdWU6IE56U2FmZUFueTtcbiAgYWN0aXZlQmFyU3R5bGU6IG9iamVjdCA9IHsgcG9zaXRpb246ICdhYnNvbHV0ZScgfTtcbiAgYW5pbWF0aW9uT3BlblN0YXRlID0gZmFsc2U7XG4gIG92ZXJsYXlPcGVuOiBib29sZWFuID0gZmFsc2U7IC8vIEF2YWlsYWJsZSB3aGVuIFwib3BlblwiPXVuZGVmaW5lZFxuICBvdmVybGF5UG9zaXRpb25zOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10gPSBbXG4gICAge1xuICAgICAgb2Zmc2V0WDogLTEyLFxuICAgICAgb2Zmc2V0WTogOCxcbiAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgfSxcbiAgICB7XG4gICAgICBvZmZzZXRYOiAtMTIsXG4gICAgICBvZmZzZXRZOiAtOCxcbiAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgb3ZlcmxheVk6ICdib3R0b20nXG4gICAgfSxcbiAgICB7XG4gICAgICBvZmZzZXRYOiAxMixcbiAgICAgIG9mZnNldFk6IDgsXG4gICAgICBvcmlnaW5YOiAnZW5kJyxcbiAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgfSxcbiAgICB7XG4gICAgICBvZmZzZXRYOiAxMixcbiAgICAgIG9mZnNldFk6IC04LFxuICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgIG92ZXJsYXlYOiAnZW5kJyxcbiAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgIH1cbiAgXSBhcyBDb25uZWN0aW9uUG9zaXRpb25QYWlyW107XG4gIGN1cnJlbnRQb3NpdGlvblg6IEhvcml6b250YWxDb25uZWN0aW9uUG9zID0gJ3N0YXJ0JztcbiAgY3VycmVudFBvc2l0aW9uWTogVmVydGljYWxDb25uZWN0aW9uUG9zID0gJ2JvdHRvbSc7XG5cbiAgZ2V0IHJlYWxPcGVuU3RhdGUoKTogYm9vbGVhbiB7XG4gICAgLy8gVGhlIHZhbHVlIHRoYXQgcmVhbGx5IGRlY2lkZSB0aGUgb3BlbiBzdGF0ZSBvZiBvdmVybGF5XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuSGFuZGxlZEJ5VXNlcigpID8gISF0aGlzLm9wZW4gOiB0aGlzLm92ZXJsYXlPcGVuO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgZGF0ZUhlbHBlcjogRGF0ZUhlbHBlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGRhdGVQaWNrZXJTZXJ2aWNlOiBEYXRlUGlja2VyU2VydmljZSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2M6IE56U2FmZUFueVxuICApIHtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jO1xuICAgIHRoaXMub3JpZ2luID0gbmV3IENka092ZXJsYXlPcmlnaW4odGhpcy5lbGVtZW50UmVmKTtcbiAgICB0aGlzLnVwZGF0ZUlucHV0VmFsdWUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXRTaXplID0gTWF0aC5tYXgoMTAsIHRoaXMuZm9ybWF0Lmxlbmd0aCkgKyAyO1xuXG4gICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS52YWx1ZUNoYW5nZSQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUlucHV0VmFsdWUoKTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXV0b0ZvY3VzKSB7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNSYW5nZSkge1xuICAgICAgZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZXNldElucHV0V2lkdGhBbmRBcnJvd0xlZnQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRQYXJ0Q2hhbmdlJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKHBhcnRUeXBlID0+IHtcbiAgICAgIGlmIChwYXJ0VHlwZSkge1xuICAgICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmFjdGl2ZUlucHV0ID0gcGFydFR5cGU7XG4gICAgICB9XG4gICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmFycm93UG9zaXRpb25TdHlsZSA9IHtcbiAgICAgICAgbGVmdDogdGhpcy5kYXRlUGlja2VyU2VydmljZS5hY3RpdmVJbnB1dCA9PT0gJ2xlZnQnID8gJzBweCcgOiBgJHt0aGlzLmFycm93TGVmdH1weGBcbiAgICAgIH07XG4gICAgICB0aGlzLmFjdGl2ZUJhclN0eWxlID0ge1xuICAgICAgICAuLi50aGlzLmFjdGl2ZUJhclN0eWxlLFxuICAgICAgICAuLi50aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmFycm93UG9zaXRpb25TdHlsZSxcbiAgICAgICAgd2lkdGg6IGAke3RoaXMuaW5wdXRXaWR0aH1weGBcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0aGlzLmdldElucHV0KHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuYWN0aXZlSW5wdXQpKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFuZWw/LmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMub3Blbikge1xuICAgICAgdGhpcy5hbmltYXRpb25TdGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0SW5wdXRXaWR0aEFuZEFycm93TGVmdCgpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0V2lkdGggPSB0aGlzLnJhbmdlUGlja2VySW5wdXRzPy5maXJzdD8ubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCAwO1xuICAgIHRoaXMuYXJyb3dMZWZ0ID0gdGhpcy5pbnB1dFdpZHRoICsgdGhpcy5zZXBhcmF0b3JFbGVtZW50Py5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIHx8IDA7XG4gIH1cblxuICBnZXRJbnB1dChwYXJ0VHlwZT86IFJhbmdlUGFydFR5cGUpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5pc1JhbmdlXG4gICAgICA/IHBhcnRUeXBlID09PSAnbGVmdCdcbiAgICAgICAgPyB0aGlzLnJhbmdlUGlja2VySW5wdXRzLmZpcnN0Lm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgOiB0aGlzLnJhbmdlUGlja2VySW5wdXRzLmxhc3QubmF0aXZlRWxlbWVudFxuICAgICAgOiB0aGlzLnBpY2tlcklucHV0IS5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5nZXRJbnB1dCh0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmFjdGl2ZUlucHV0KS5mb2N1cygpOyAvLyBGb2N1cyBvbiB0aGUgZmlyc3QgaW5wdXRcbiAgfVxuXG4gIG9uRm9jdXMocGFydFR5cGU/OiBSYW5nZVBhcnRUeXBlKTogdm9pZCB7XG4gICAgaWYgKHBhcnRUeXBlKSB7XG4gICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmlucHV0UGFydENoYW5nZSQubmV4dChwYXJ0VHlwZSk7XG4gICAgfVxuICAgIHRoaXMuZm9jdXNDaGFuZ2UuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIG9uQmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICB9XG5cbiAgLy8gU2hvdyBvdmVybGF5IGNvbnRlbnRcbiAgc2hvd092ZXJsYXkoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlYWxPcGVuU3RhdGUpIHtcbiAgICAgIHRoaXMucmVzZXRJbnB1dFdpZHRoQW5kQXJyb3dMZWZ0KCk7XG4gICAgICB0aGlzLm92ZXJsYXlPcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuYW5pbWF0aW9uU3RhcnQoKTtcbiAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGVPdmVybGF5KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlYWxPcGVuU3RhdGUpIHtcbiAgICAgIHRoaXMub3ZlcmxheU9wZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBzaG93Q2xlYXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmRpc2FibGVkICYmICF0aGlzLmlzRW1wdHlWYWx1ZSh0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnZhbHVlKSAmJiAhIXRoaXMuYWxsb3dDbGVhcjtcbiAgfVxuXG4gIG9uQ2xpY2tJbnB1dEJveChldmVudDogTW91c2VFdmVudCwgcGFydFR5cGU/OiBSYW5nZVBhcnRUeXBlKTogdm9pZCB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMuaXNPcGVuSGFuZGxlZEJ5VXNlcigpKSB7XG4gICAgICB0aGlzLnNob3dPdmVybGF5KCk7XG4gICAgfVxuICAgIHRoaXMub25Gb2N1cyhwYXJ0VHlwZSk7XG4gIH1cblxuICBvbkNsaWNrQmFja2Ryb3AoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFuZWwuaXNBbGxvd2VkKHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UudmFsdWUhLCB0cnVlKSkge1xuICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKCk7XG4gICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmVtaXRWYWx1ZSQubmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnNldFZhbHVlKHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaW5pdGlhbFZhbHVlISk7XG4gICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgfVxuICB9XG5cbiAgb25PdmVybGF5RGV0YWNoKCk6IHZvaWQge1xuICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgfVxuXG4gIG9uT3ZlcmxheUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5zZXRWYWx1ZSh0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmluaXRpYWxWYWx1ZSEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIE5PVEU6IEEgaXNzdWUgaGVyZSwgdGhlIGZpcnN0IHRpbWUgcG9zaXRpb24gY2hhbmdlLCB0aGUgYW5pbWF0aW9uIHdpbGwgbm90IGJlIHRyaWdnZXJlZC5cbiAgLy8gQmVjYXVzZSB0aGUgb3ZlcmxheSdzIFwicG9zaXRpb25DaGFuZ2VcIiBldmVudCBpcyBlbWl0dGVkIGFmdGVyIHRoZSBjb250ZW50J3MgZnVsbCBzaG93biB1cC5cbiAgLy8gQWxsIG90aGVyIGNvbXBvbmVudHMgbGlrZSBcIm56LWRyb3Bkb3duXCIgd2hpY2ggZGVwZW5kcyBvbiBvdmVybGF5IGFsc28gaGFzIHRoZSBzYW1lIGlzc3VlLlxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2lzc3Vlcy8xNDI5XG4gIG9uUG9zaXRpb25DaGFuZ2UocG9zaXRpb246IENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudFBvc2l0aW9uWCA9IHBvc2l0aW9uLmNvbm5lY3Rpb25QYWlyLm9yaWdpblg7XG4gICAgdGhpcy5jdXJyZW50UG9zaXRpb25ZID0gcG9zaXRpb24uY29ubmVjdGlvblBhaXIub3JpZ2luWTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTsgLy8gVGFrZSBzaWRlLWVmZmVjdHMgdG8gcG9zaXRpb24gc3R5bGVzXG4gIH1cblxuICBvbkNsaWNrQ2xlYXIoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5zZXRWYWx1ZSh0aGlzLmlzUmFuZ2UgPyBbXSA6IG51bGwpO1xuICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZW1pdFZhbHVlJC5uZXh0KCk7XG4gIH1cblxuICB1cGRhdGVJbnB1dFZhbHVlKCk6IHZvaWQge1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS52YWx1ZTtcbiAgICBpZiAodGhpcy5pc1JhbmdlKSB7XG4gICAgICB0aGlzLmlucHV0VmFsdWUgPSBuZXdWYWx1ZSA/IChuZXdWYWx1ZSBhcyBDYW5keURhdGVbXSkubWFwKHYgPT4gdGhpcy5mb3JtYXRWYWx1ZSh2KSkgOiBbJycsICcnXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnB1dFZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZShuZXdWYWx1ZSBhcyBDYW5keURhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFZhbHVlKHZhbHVlOiBDYW5keURhdGUpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmRhdGVIZWxwZXIuZm9ybWF0KHZhbHVlICYmICh2YWx1ZSBhcyBDYW5keURhdGUpLm5hdGl2ZURhdGUsIHRoaXMuZm9ybWF0KTtcbiAgfVxuXG4gIG9uSW5wdXRLZXl1cChldmVudDogRXZlbnQsIGVtaXRWYWx1ZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlYWxPcGVuU3RhdGUpIHtcbiAgICAgIHRoaXMuc2hvd092ZXJsYXkoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuY2hlY2tWYWxpZElucHV0RGF0ZSgoZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCkudGFyZ2V0ISk7XG4gICAgaWYgKHRoaXMucGFuZWwgJiYgZGF0ZSkge1xuICAgICAgdGhpcy5wYW5lbC5jaGFuZ2VWYWx1ZUZyb21TZWxlY3QoZGF0ZSwgZW1pdFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNoZWNrVmFsaWRJbnB1dERhdGUoaW5wdXRUYXJnZXQ6IEV2ZW50VGFyZ2V0KTogQ2FuZHlEYXRlIHwgbnVsbCB7XG4gICAgY29uc3QgaW5wdXQgPSAoaW5wdXRUYXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBDYW5keURhdGUodGhpcy5kYXRlSGVscGVyLnBhcnNlRGF0ZShpbnB1dCwgdGhpcy5mb3JtYXQpKTtcblxuICAgIGlmICghZGF0ZS5pc1ZhbGlkKCkgfHwgaW5wdXQgIT09IHRoaXMuZGF0ZUhlbHBlci5mb3JtYXQoZGF0ZS5uYXRpdmVEYXRlLCB0aGlzLmZvcm1hdCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgZ2V0UGxhY2Vob2xkZXIocGFydFR5cGU/OiBSYW5nZVBhcnRUeXBlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc1JhbmdlID8gdGhpcy5wbGFjZWhvbGRlclt0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldEFjdGl2ZUluZGV4KHBhcnRUeXBlISldIDogKHRoaXMucGxhY2Vob2xkZXIgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIGlzRW1wdHlWYWx1ZSh2YWx1ZTogQ29tcGF0aWJsZVZhbHVlKTogYm9vbGVhbiB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNSYW5nZSkge1xuICAgICAgcmV0dXJuICF2YWx1ZSB8fCAhQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUuZXZlcnkodmFsID0+ICF2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gIXZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFdoZXRoZXIgb3BlbiBzdGF0ZSBpcyBwZXJtYW5lbnRseSBjb250cm9sbGVkIGJ5IHVzZXIgaGltc2VsZlxuICBpc09wZW5IYW5kbGVkQnlVc2VyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm9wZW4gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGFuaW1hdGlvblN0YXJ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlYWxPcGVuU3RhdGUpIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uT3BlblN0YXRlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBhbmltYXRpb25Eb25lKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5yZWFsT3BlblN0YXRlKSB7XG4gICAgICB0aGlzLmFuaW1hdGlvbk9wZW5TdGF0ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==