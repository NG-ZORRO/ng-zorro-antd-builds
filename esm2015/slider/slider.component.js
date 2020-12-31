/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { arraysEqual, ensureNumberInRange, getElementOffset, getPercent, getPrecision, InputBoolean, InputNumber, silentEvent } from 'ng-zorro-antd/core/util';
import { fromEvent, merge, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck, takeUntil, tap } from 'rxjs/operators';
import { NzSliderHandleComponent } from './handle.component';
import { NzSliderService } from './slider.service';
export class NzSliderComponent {
    constructor(sliderService, cdr, platform, directionality) {
        this.sliderService = sliderService;
        this.cdr = cdr;
        this.platform = platform;
        this.directionality = directionality;
        this.nzDisabled = false;
        this.nzDots = false;
        this.nzIncluded = true;
        this.nzRange = false;
        this.nzVertical = false;
        this.nzReverse = false;
        this.nzMarks = null;
        this.nzMax = 100;
        this.nzMin = 0;
        this.nzStep = 1;
        this.nzTooltipVisible = 'default';
        this.nzTooltipPlacement = 'top';
        this.nzOnAfterChange = new EventEmitter();
        this.value = null;
        this.cacheSliderStart = null;
        this.cacheSliderLength = null;
        this.activeValueIndex = undefined; // Current activated handle's index ONLY for range=true
        this.track = { offset: null, length: null }; // Track's offset and length
        this.handles = []; // Handles' offset
        this.marksArray = null; // "steps" in array type with more data & FILTER out the invalid mark
        this.bounds = { lower: null, upper: null }; // now for nz-slider-step
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        var _a;
        this.dir = this.directionality.value;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
            this.updateTrackAndHandles();
            this.onValueChange(this.getValue(true));
        });
        this.handles = generateHandlers(this.nzRange ? 2 : 1);
        this.marksArray = this.nzMarks ? this.generateMarkItems(this.nzMarks) : null;
        this.bindDraggingHandlers();
        this.toggleDragDisabled(this.nzDisabled);
        if (this.getValue() === null) {
            this.setValue(this.formatValue(null));
        }
    }
    ngOnChanges(changes) {
        const { nzDisabled, nzMarks, nzRange } = changes;
        if (nzDisabled && !nzDisabled.firstChange) {
            this.toggleDragDisabled(nzDisabled.currentValue);
        }
        else if (nzMarks && !nzMarks.firstChange) {
            this.marksArray = this.nzMarks ? this.generateMarkItems(this.nzMarks) : null;
        }
        else if (nzRange && !nzRange.firstChange) {
            this.setValue(this.formatValue(null));
        }
    }
    ngOnDestroy() {
        this.unsubscribeDrag();
        this.destroy$.next();
        this.destroy$.complete();
    }
    writeValue(val) {
        this.setValue(val, true);
    }
    onValueChange(_value) { }
    onTouched() { }
    registerOnChange(fn) {
        this.onValueChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.nzDisabled = isDisabled;
        this.toggleDragDisabled(isDisabled);
    }
    /**
     * Event handler is only triggered when a slider handler is focused.
     */
    onKeyDown(e) {
        const code = e.keyCode;
        const isIncrease = code === RIGHT_ARROW || code === UP_ARROW;
        const isDecrease = code === LEFT_ARROW || code === DOWN_ARROW;
        if (!(isIncrease || isDecrease)) {
            return;
        }
        e.preventDefault();
        let step = (isDecrease ? -this.nzStep : this.nzStep) * (this.nzReverse ? -1 : 1);
        step = this.dir === 'rtl' ? step * -1 : step;
        const newVal = this.nzRange ? this.value[this.activeValueIndex] + step : this.value + step;
        this.setActiveValue(ensureNumberInRange(newVal, this.nzMin, this.nzMax));
    }
    setValue(value, isWriteValue = false) {
        if (isWriteValue) {
            this.value = this.formatValue(value);
            this.updateTrackAndHandles();
        }
        else if (!valuesEqual(this.value, value)) {
            this.value = value;
            this.updateTrackAndHandles();
            this.onValueChange(this.getValue(true));
        }
    }
    getValue(cloneAndSort = false) {
        if (cloneAndSort && this.value && isValueRange(this.value)) {
            return [...this.value].sort((a, b) => a - b);
        }
        return this.value;
    }
    /**
     * Clone & sort current value and convert them to offsets, then return the new one.
     */
    getValueToOffset(value) {
        let normalizedValue = value;
        if (typeof normalizedValue === 'undefined') {
            normalizedValue = this.getValue(true);
        }
        return isValueRange(normalizedValue) ? normalizedValue.map(val => this.valueToOffset(val)) : this.valueToOffset(normalizedValue);
    }
    /**
     * Find the closest value to be activated.
     */
    setActiveValueIndex(pointerValue) {
        const value = this.getValue();
        if (isValueRange(value)) {
            let minimal = null;
            let gap;
            let activeIndex = -1;
            value.forEach((val, index) => {
                gap = Math.abs(pointerValue - val);
                if (minimal === null || gap < minimal) {
                    minimal = gap;
                    activeIndex = index;
                }
            });
            this.activeValueIndex = activeIndex;
            this.handlerComponents.toArray()[activeIndex].focus();
        }
        else {
            this.handlerComponents.toArray()[0].focus();
        }
    }
    setActiveValue(pointerValue) {
        if (isValueRange(this.value)) {
            const newValue = [...this.value];
            newValue[this.activeValueIndex] = pointerValue;
            this.setValue(newValue);
        }
        else {
            this.setValue(pointerValue);
        }
    }
    /**
     * Update track and handles' position and length.
     */
    updateTrackAndHandles() {
        const value = this.getValue();
        const offset = this.getValueToOffset(value);
        const valueSorted = this.getValue(true);
        const offsetSorted = this.getValueToOffset(valueSorted);
        const boundParts = isValueRange(valueSorted) ? valueSorted : [0, valueSorted];
        const trackParts = isValueRange(offsetSorted) ? [offsetSorted[0], offsetSorted[1] - offsetSorted[0]] : [0, offsetSorted];
        this.handles.forEach((handle, index) => {
            handle.offset = isValueRange(offset) ? offset[index] : offset;
            handle.value = isValueRange(value) ? value[index] : value || 0;
        });
        [this.bounds.lower, this.bounds.upper] = boundParts;
        [this.track.offset, this.track.length] = trackParts;
        this.cdr.markForCheck();
    }
    onDragStart(value) {
        this.toggleDragMoving(true);
        this.cacheSliderProperty();
        this.setActiveValueIndex(this.getLogicalValue(value));
        this.setActiveValue(this.getLogicalValue(value));
        this.showHandleTooltip(this.nzRange ? this.activeValueIndex : 0);
    }
    onDragMove(value) {
        this.setActiveValue(this.getLogicalValue(value));
        this.cdr.markForCheck();
    }
    getLogicalValue(value) {
        if (this.nzReverse) {
            if (!this.nzVertical && this.dir === 'rtl') {
                return value;
            }
            return this.nzMax - value + this.nzMin;
        }
        if (!this.nzVertical && this.dir === 'rtl') {
            return this.nzMax - value + this.nzMin;
        }
        return value;
    }
    onDragEnd() {
        this.nzOnAfterChange.emit(this.getValue(true));
        this.toggleDragMoving(false);
        this.cacheSliderProperty(true);
        this.hideAllHandleTooltip();
        this.cdr.markForCheck();
    }
    /**
     * Create user interactions handles.
     */
    bindDraggingHandlers() {
        if (!this.platform.isBrowser) {
            return;
        }
        const sliderDOM = this.slider.nativeElement;
        const orientField = this.nzVertical ? 'pageY' : 'pageX';
        const mouse = {
            start: 'mousedown',
            move: 'mousemove',
            end: 'mouseup',
            pluckKey: [orientField]
        };
        const touch = {
            start: 'touchstart',
            move: 'touchmove',
            end: 'touchend',
            pluckKey: ['touches', '0', orientField],
            filter: (e) => e instanceof TouchEvent
        };
        [mouse, touch].forEach(source => {
            const { start, move, end, pluckKey, filter: filterFunc = () => true } = source;
            source.startPlucked$ = fromEvent(sliderDOM, start).pipe(filter(filterFunc), tap(silentEvent), pluck(...pluckKey), map((position) => this.findClosestValue(position)));
            source.end$ = fromEvent(document, end);
            source.moveResolved$ = fromEvent(document, move).pipe(filter(filterFunc), tap(silentEvent), pluck(...pluckKey), distinctUntilChanged(), map((position) => this.findClosestValue(position)), distinctUntilChanged(), takeUntil(source.end$));
        });
        this.dragStart$ = merge(mouse.startPlucked$, touch.startPlucked$);
        this.dragMove$ = merge(mouse.moveResolved$, touch.moveResolved$);
        this.dragEnd$ = merge(mouse.end$, touch.end$);
    }
    subscribeDrag(periods = ['start', 'move', 'end']) {
        if (periods.indexOf('start') !== -1 && this.dragStart$ && !this.dragStart_) {
            this.dragStart_ = this.dragStart$.subscribe(this.onDragStart.bind(this));
        }
        if (periods.indexOf('move') !== -1 && this.dragMove$ && !this.dragMove_) {
            this.dragMove_ = this.dragMove$.subscribe(this.onDragMove.bind(this));
        }
        if (periods.indexOf('end') !== -1 && this.dragEnd$ && !this.dragEnd_) {
            this.dragEnd_ = this.dragEnd$.subscribe(this.onDragEnd.bind(this));
        }
    }
    unsubscribeDrag(periods = ['start', 'move', 'end']) {
        if (periods.indexOf('start') !== -1 && this.dragStart_) {
            this.dragStart_.unsubscribe();
            this.dragStart_ = null;
        }
        if (periods.indexOf('move') !== -1 && this.dragMove_) {
            this.dragMove_.unsubscribe();
            this.dragMove_ = null;
        }
        if (periods.indexOf('end') !== -1 && this.dragEnd_) {
            this.dragEnd_.unsubscribe();
            this.dragEnd_ = null;
        }
    }
    toggleDragMoving(movable) {
        const periods = ['move', 'end'];
        if (movable) {
            this.sliderService.isDragging = true;
            this.subscribeDrag(periods);
        }
        else {
            this.sliderService.isDragging = false;
            this.unsubscribeDrag(periods);
        }
    }
    toggleDragDisabled(disabled) {
        if (disabled) {
            this.unsubscribeDrag();
        }
        else {
            this.subscribeDrag(['start']);
        }
    }
    findClosestValue(position) {
        const sliderStart = this.getSliderStartPosition();
        const sliderLength = this.getSliderLength();
        const ratio = ensureNumberInRange((position - sliderStart) / sliderLength, 0, 1);
        const val = (this.nzMax - this.nzMin) * (this.nzVertical ? 1 - ratio : ratio) + this.nzMin;
        const points = this.nzMarks === null
            ? []
            : Object.keys(this.nzMarks)
                .map(parseFloat)
                .sort((a, b) => a - b);
        if (this.nzStep !== 0 && !this.nzDots) {
            const closestOne = Math.round(val / this.nzStep) * this.nzStep;
            points.push(closestOne);
        }
        const gaps = points.map(point => Math.abs(val - point));
        const closest = points[gaps.indexOf(Math.min(...gaps))];
        // return parseFloat(closest.toFixed(getPrecision(this.nzStep)));
        return this.nzStep === 0 ? closest : parseFloat(closest.toFixed(getPrecision(this.nzStep)));
    }
    valueToOffset(value) {
        return getPercent(this.nzMin, this.nzMax, value);
    }
    getSliderStartPosition() {
        if (this.cacheSliderStart !== null) {
            return this.cacheSliderStart;
        }
        const offset = getElementOffset(this.slider.nativeElement);
        return this.nzVertical ? offset.top : offset.left;
    }
    getSliderLength() {
        if (this.cacheSliderLength !== null) {
            return this.cacheSliderLength;
        }
        const sliderDOM = this.slider.nativeElement;
        return this.nzVertical ? sliderDOM.clientHeight : sliderDOM.clientWidth;
    }
    /**
     * Cache DOM layout/reflow operations for performance (may not necessary?)
     */
    cacheSliderProperty(remove = false) {
        this.cacheSliderStart = remove ? null : this.getSliderStartPosition();
        this.cacheSliderLength = remove ? null : this.getSliderLength();
    }
    formatValue(value) {
        if (!value) {
            return this.nzRange ? [this.nzMin, this.nzMax] : this.nzMin;
        }
        else if (assertValueValid(value, this.nzRange)) {
            return isValueRange(value)
                ? value.map(val => ensureNumberInRange(val, this.nzMin, this.nzMax))
                : ensureNumberInRange(value, this.nzMin, this.nzMax);
        }
        else {
            return this.nzDefaultValue ? this.nzDefaultValue : this.nzRange ? [this.nzMin, this.nzMax] : this.nzMin;
        }
    }
    /**
     * Show one handle's tooltip and hide others'.
     */
    showHandleTooltip(handleIndex = 0) {
        this.handles.forEach((handle, index) => {
            handle.active = index === handleIndex;
        });
    }
    hideAllHandleTooltip() {
        this.handles.forEach(handle => (handle.active = false));
    }
    generateMarkItems(marks) {
        const marksArray = [];
        for (const key in marks) {
            const mark = marks[key];
            const val = typeof key === 'number' ? key : parseFloat(key);
            if (val >= this.nzMin && val <= this.nzMax) {
                marksArray.push({ value: val, offset: this.valueToOffset(val), config: mark });
            }
        }
        return marksArray.length ? marksArray : null;
    }
}
NzSliderComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-slider',
                exportAs: 'nzSlider',
                preserveWhitespaces: false,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NzSliderComponent),
                        multi: true
                    },
                    NzSliderService
                ],
                host: {
                    '(keydown)': 'onKeyDown($event)'
                },
                template: `
    <div
      #slider
      class="ant-slider"
      [class.ant-slider-rtl]="dir === 'rtl'"
      [class.ant-slider-disabled]="nzDisabled"
      [class.ant-slider-vertical]="nzVertical"
      [class.ant-slider-with-marks]="marksArray"
    >
      <div class="ant-slider-rail"></div>
      <nz-slider-track
        [vertical]="nzVertical"
        [included]="nzIncluded"
        [offset]="track.offset!"
        [length]="track.length!"
        [reverse]="nzReverse"
        [dir]="dir"
      ></nz-slider-track>
      <nz-slider-step
        *ngIf="marksArray"
        [vertical]="nzVertical"
        [lowerBound]="$any(bounds.lower)"
        [upperBound]="$any(bounds.upper)"
        [marksArray]="marksArray"
        [included]="nzIncluded"
      ></nz-slider-step>
      <nz-slider-handle
        *ngFor="let handle of handles"
        [vertical]="nzVertical"
        [reverse]="nzReverse"
        [offset]="handle.offset!"
        [value]="handle.value!"
        [active]="handle.active"
        [tooltipFormatter]="nzTipFormatter"
        [tooltipVisible]="nzTooltipVisible"
        [tooltipPlacement]="nzTooltipPlacement"
        [dir]="dir"
      ></nz-slider-handle>
      <nz-slider-marks
        *ngIf="marksArray"
        [vertical]="nzVertical"
        [min]="nzMin"
        [max]="nzMax"
        [lowerBound]="$any(bounds.lower)"
        [upperBound]="$any(bounds.upper)"
        [marksArray]="marksArray"
        [included]="nzIncluded"
      ></nz-slider-marks>
    </div>
  `
            },] }
];
NzSliderComponent.ctorParameters = () => [
    { type: NzSliderService },
    { type: ChangeDetectorRef },
    { type: Platform },
    { type: Directionality, decorators: [{ type: Optional }] }
];
NzSliderComponent.propDecorators = {
    slider: [{ type: ViewChild, args: ['slider', { static: true },] }],
    handlerComponents: [{ type: ViewChildren, args: [NzSliderHandleComponent,] }],
    nzDisabled: [{ type: Input }],
    nzDots: [{ type: Input }],
    nzIncluded: [{ type: Input }],
    nzRange: [{ type: Input }],
    nzVertical: [{ type: Input }],
    nzReverse: [{ type: Input }],
    nzDefaultValue: [{ type: Input }],
    nzMarks: [{ type: Input }],
    nzMax: [{ type: Input }],
    nzMin: [{ type: Input }],
    nzStep: [{ type: Input }],
    nzTooltipVisible: [{ type: Input }],
    nzTooltipPlacement: [{ type: Input }],
    nzTipFormatter: [{ type: Input }],
    nzOnAfterChange: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSliderComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzSliderComponent.prototype, "nzDots", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzSliderComponent.prototype, "nzIncluded", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzSliderComponent.prototype, "nzRange", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzSliderComponent.prototype, "nzVertical", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzSliderComponent.prototype, "nzReverse", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Object)
], NzSliderComponent.prototype, "nzMax", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Object)
], NzSliderComponent.prototype, "nzMin", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Object)
], NzSliderComponent.prototype, "nzStep", void 0);
function getValueTypeNotMatchError() {
    return new Error(`The "nzRange" can't match the "ngModel"'s type, please check these properties: "nzRange", "ngModel", "nzDefaultValue".`);
}
function isValueRange(value) {
    if (value instanceof Array) {
        return value.length === 2;
    }
    else {
        return false;
    }
}
function generateHandlers(amount) {
    return Array(amount)
        .fill(0)
        .map(() => ({ offset: null, value: null, active: false }));
}
/**
 * Check if value is valid and throw error if value-type/range not match.
 */
function assertValueValid(value, isRange) {
    if ((!isValueRange(value) && isNaN(value)) || (isValueRange(value) && value.some(v => isNaN(v)))) {
        return false;
    }
    return assertValueTypeMatch(value, isRange);
}
/**
 * Assert that if `this.nzRange` is `true`, value is also a range, vice versa.
 */
function assertValueTypeMatch(value, isRange = false) {
    if (isValueRange(value) !== isRange) {
        throw getValueTypeNotMatchError();
    }
    return true;
}
function valuesEqual(valA, valB) {
    if (typeof valA !== typeof valB) {
        return false;
    }
    return isValueRange(valA) && isValueRange(valB) ? arraysEqual(valA, valB) : valA === valB;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9jb21wb25lbnRzL3NsaWRlci8iLCJzb3VyY2VzIjpbInNsaWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFBYSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBRVQsU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFDTCxXQUFXLEVBQ1gsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixXQUFXLEVBRVgsV0FBVyxFQUNaLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUMzRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXdFbkQs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QUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNoRyxPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsT0FBTyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxvQkFBb0IsQ0FBQyxLQUFvQixFQUFFLFVBQW1CLEtBQUs7SUFDMUUsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssT0FBTyxFQUFFO1FBQ25DLE1BQU0seUJBQXlCLEVBQUUsQ0FBQztLQUNuQztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLElBQW1CLEVBQUUsSUFBbUI7SUFDM0QsSUFBSSxPQUFPLElBQUksS0FBSyxPQUFPLElBQUksRUFBRTtRQUMvQixPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQVMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDO0FBQ3BHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgRE9XTl9BUlJPVywgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnVtYmVySW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHtcbiAgYXJyYXlzRXF1YWwsXG4gIGVuc3VyZU51bWJlckluUmFuZ2UsXG4gIGdldEVsZW1lbnRPZmZzZXQsXG4gIGdldFBlcmNlbnQsXG4gIGdldFByZWNpc2lvbixcbiAgSW5wdXRCb29sZWFuLFxuICBJbnB1dE51bWJlcixcbiAgTW91c2VUb3VjaE9ic2VydmVyQ29uZmlnLFxuICBzaWxlbnRFdmVudFxufSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCwgcGx1Y2ssIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOelNsaWRlckhhbmRsZUNvbXBvbmVudCB9IGZyb20gJy4vaGFuZGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelNsaWRlclNlcnZpY2UgfSBmcm9tICcuL3NsaWRlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTnpFeHRlbmRlZE1hcmssIE56TWFya3MsIE56U2xpZGVySGFuZGxlciwgTnpTbGlkZXJTaG93VG9vbHRpcCwgTnpTbGlkZXJWYWx1ZSB9IGZyb20gJy4vdHlwaW5ncyc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduei1zbGlkZXInLFxuICBleHBvcnRBczogJ256U2xpZGVyJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnpTbGlkZXJDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9LFxuICAgIE56U2xpZGVyU2VydmljZVxuICBdLFxuICBob3N0OiB7XG4gICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KSdcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICAjc2xpZGVyXG4gICAgICBjbGFzcz1cImFudC1zbGlkZXJcIlxuICAgICAgW2NsYXNzLmFudC1zbGlkZXItcnRsXT1cImRpciA9PT0gJ3J0bCdcIlxuICAgICAgW2NsYXNzLmFudC1zbGlkZXItZGlzYWJsZWRdPVwibnpEaXNhYmxlZFwiXG4gICAgICBbY2xhc3MuYW50LXNsaWRlci12ZXJ0aWNhbF09XCJuelZlcnRpY2FsXCJcbiAgICAgIFtjbGFzcy5hbnQtc2xpZGVyLXdpdGgtbWFya3NdPVwibWFya3NBcnJheVwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1zbGlkZXItcmFpbFwiPjwvZGl2PlxuICAgICAgPG56LXNsaWRlci10cmFja1xuICAgICAgICBbdmVydGljYWxdPVwibnpWZXJ0aWNhbFwiXG4gICAgICAgIFtpbmNsdWRlZF09XCJuekluY2x1ZGVkXCJcbiAgICAgICAgW29mZnNldF09XCJ0cmFjay5vZmZzZXQhXCJcbiAgICAgICAgW2xlbmd0aF09XCJ0cmFjay5sZW5ndGghXCJcbiAgICAgICAgW3JldmVyc2VdPVwibnpSZXZlcnNlXCJcbiAgICAgICAgW2Rpcl09XCJkaXJcIlxuICAgICAgPjwvbnotc2xpZGVyLXRyYWNrPlxuICAgICAgPG56LXNsaWRlci1zdGVwXG4gICAgICAgICpuZ0lmPVwibWFya3NBcnJheVwiXG4gICAgICAgIFt2ZXJ0aWNhbF09XCJuelZlcnRpY2FsXCJcbiAgICAgICAgW2xvd2VyQm91bmRdPVwiJGFueShib3VuZHMubG93ZXIpXCJcbiAgICAgICAgW3VwcGVyQm91bmRdPVwiJGFueShib3VuZHMudXBwZXIpXCJcbiAgICAgICAgW21hcmtzQXJyYXldPVwibWFya3NBcnJheVwiXG4gICAgICAgIFtpbmNsdWRlZF09XCJuekluY2x1ZGVkXCJcbiAgICAgID48L256LXNsaWRlci1zdGVwPlxuICAgICAgPG56LXNsaWRlci1oYW5kbGVcbiAgICAgICAgKm5nRm9yPVwibGV0IGhhbmRsZSBvZiBoYW5kbGVzXCJcbiAgICAgICAgW3ZlcnRpY2FsXT1cIm56VmVydGljYWxcIlxuICAgICAgICBbcmV2ZXJzZV09XCJuelJldmVyc2VcIlxuICAgICAgICBbb2Zmc2V0XT1cImhhbmRsZS5vZmZzZXQhXCJcbiAgICAgICAgW3ZhbHVlXT1cImhhbmRsZS52YWx1ZSFcIlxuICAgICAgICBbYWN0aXZlXT1cImhhbmRsZS5hY3RpdmVcIlxuICAgICAgICBbdG9vbHRpcEZvcm1hdHRlcl09XCJuelRpcEZvcm1hdHRlclwiXG4gICAgICAgIFt0b29sdGlwVmlzaWJsZV09XCJuelRvb2x0aXBWaXNpYmxlXCJcbiAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwibnpUb29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgW2Rpcl09XCJkaXJcIlxuICAgICAgPjwvbnotc2xpZGVyLWhhbmRsZT5cbiAgICAgIDxuei1zbGlkZXItbWFya3NcbiAgICAgICAgKm5nSWY9XCJtYXJrc0FycmF5XCJcbiAgICAgICAgW3ZlcnRpY2FsXT1cIm56VmVydGljYWxcIlxuICAgICAgICBbbWluXT1cIm56TWluXCJcbiAgICAgICAgW21heF09XCJuek1heFwiXG4gICAgICAgIFtsb3dlckJvdW5kXT1cIiRhbnkoYm91bmRzLmxvd2VyKVwiXG4gICAgICAgIFt1cHBlckJvdW5kXT1cIiRhbnkoYm91bmRzLnVwcGVyKVwiXG4gICAgICAgIFttYXJrc0FycmF5XT1cIm1hcmtzQXJyYXlcIlxuICAgICAgICBbaW5jbHVkZWRdPVwibnpJbmNsdWRlZFwiXG4gICAgICA+PC9uei1zbGlkZXItbWFya3M+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpTbGlkZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRvdHM6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256SW5jbHVkZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256UmFuZ2U6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256VmVydGljYWw6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TWF4OiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TWluOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U3RlcDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelJldmVyc2U6IEJvb2xlYW5JbnB1dDtcblxuICBAVmlld0NoaWxkKCdzbGlkZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBzbGlkZXIhOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcbiAgQFZpZXdDaGlsZHJlbihOelNsaWRlckhhbmRsZUNvbXBvbmVudCkgaGFuZGxlckNvbXBvbmVudHMhOiBRdWVyeUxpc3Q8TnpTbGlkZXJIYW5kbGVDb21wb25lbnQ+O1xuXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRvdHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56SW5jbHVkZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpSYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpWZXJ0aWNhbDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpSZXZlcnNlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56RGVmYXVsdFZhbHVlPzogTnpTbGlkZXJWYWx1ZTtcbiAgQElucHV0KCkgbnpNYXJrczogTnpNYXJrcyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBASW5wdXROdW1iZXIoKSBuek1heCA9IDEwMDtcbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgbnpNaW4gPSAwO1xuICBASW5wdXQoKSBASW5wdXROdW1iZXIoKSBuelN0ZXAgPSAxO1xuICBASW5wdXQoKSBuelRvb2x0aXBWaXNpYmxlOiBOelNsaWRlclNob3dUb29sdGlwID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBuelRvb2x0aXBQbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnO1xuICBASW5wdXQoKSBuelRpcEZvcm1hdHRlcj86IG51bGwgfCAoKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZyk7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25BZnRlckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpTbGlkZXJWYWx1ZT4oKTtcblxuICB2YWx1ZTogTnpTbGlkZXJWYWx1ZSB8IG51bGwgPSBudWxsO1xuICBjYWNoZVNsaWRlclN0YXJ0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgY2FjaGVTbGlkZXJMZW5ndGg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBhY3RpdmVWYWx1ZUluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7IC8vIEN1cnJlbnQgYWN0aXZhdGVkIGhhbmRsZSdzIGluZGV4IE9OTFkgZm9yIHJhbmdlPXRydWVcbiAgdHJhY2s6IHsgb2Zmc2V0OiBudWxsIHwgbnVtYmVyOyBsZW5ndGg6IG51bGwgfCBudW1iZXIgfSA9IHsgb2Zmc2V0OiBudWxsLCBsZW5ndGg6IG51bGwgfTsgLy8gVHJhY2sncyBvZmZzZXQgYW5kIGxlbmd0aFxuICBoYW5kbGVzOiBOelNsaWRlckhhbmRsZXJbXSA9IFtdOyAvLyBIYW5kbGVzJyBvZmZzZXRcbiAgbWFya3NBcnJheTogTnpFeHRlbmRlZE1hcmtbXSB8IG51bGwgPSBudWxsOyAvLyBcInN0ZXBzXCIgaW4gYXJyYXkgdHlwZSB3aXRoIG1vcmUgZGF0YSAmIEZJTFRFUiBvdXQgdGhlIGludmFsaWQgbWFya1xuICBib3VuZHM6IHsgbG93ZXI6IE56U2xpZGVyVmFsdWUgfCBudWxsOyB1cHBlcjogTnpTbGlkZXJWYWx1ZSB8IG51bGwgfSA9IHsgbG93ZXI6IG51bGwsIHVwcGVyOiBudWxsIH07IC8vIG5vdyBmb3Igbnotc2xpZGVyLXN0ZXBcbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcblxuICBwcml2YXRlIGRyYWdTdGFydCQ/OiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIHByaXZhdGUgZHJhZ01vdmUkPzogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBwcml2YXRlIGRyYWdFbmQkPzogT2JzZXJ2YWJsZTxFdmVudD47XG4gIHByaXZhdGUgZHJhZ1N0YXJ0Xz86IFN1YnNjcmlwdGlvbiB8IG51bGw7XG4gIHByaXZhdGUgZHJhZ01vdmVfPzogU3Vic2NyaXB0aW9uIHwgbnVsbDtcbiAgcHJpdmF0ZSBkcmFnRW5kXz86IFN1YnNjcmlwdGlvbiB8IG51bGw7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2xpZGVyU2VydmljZTogTnpTbGlkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLnVwZGF0ZVRyYWNrQW5kSGFuZGxlcygpO1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlKHRoaXMuZ2V0VmFsdWUodHJ1ZSkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5oYW5kbGVzID0gZ2VuZXJhdGVIYW5kbGVycyh0aGlzLm56UmFuZ2UgPyAyIDogMSk7XG4gICAgdGhpcy5tYXJrc0FycmF5ID0gdGhpcy5uek1hcmtzID8gdGhpcy5nZW5lcmF0ZU1hcmtJdGVtcyh0aGlzLm56TWFya3MpIDogbnVsbDtcbiAgICB0aGlzLmJpbmREcmFnZ2luZ0hhbmRsZXJzKCk7XG4gICAgdGhpcy50b2dnbGVEcmFnRGlzYWJsZWQodGhpcy5uekRpc2FibGVkKTtcblxuICAgIGlmICh0aGlzLmdldFZhbHVlKCkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy5mb3JtYXRWYWx1ZShudWxsKSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpEaXNhYmxlZCwgbnpNYXJrcywgbnpSYW5nZSB9ID0gY2hhbmdlcztcblxuICAgIGlmIChuekRpc2FibGVkICYmICFuekRpc2FibGVkLmZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLnRvZ2dsZURyYWdEaXNhYmxlZChuekRpc2FibGVkLmN1cnJlbnRWYWx1ZSk7XG4gICAgfSBlbHNlIGlmIChuek1hcmtzICYmICFuek1hcmtzLmZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLm1hcmtzQXJyYXkgPSB0aGlzLm56TWFya3MgPyB0aGlzLmdlbmVyYXRlTWFya0l0ZW1zKHRoaXMubnpNYXJrcykgOiBudWxsO1xuICAgIH0gZWxzZSBpZiAobnpSYW5nZSAmJiAhbnpSYW5nZS5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmZvcm1hdFZhbHVlKG51bGwpKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlRHJhZygpO1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsOiBOelNsaWRlclZhbHVlIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VmFsdWUodmFsLCB0cnVlKTtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2UoX3ZhbHVlOiBOelNsaWRlclZhbHVlKTogdm9pZCB7fVxuXG4gIG9uVG91Y2hlZCgpOiB2b2lkIHt9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBOelNsaWRlclZhbHVlKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblZhbHVlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm56RGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMudG9nZ2xlRHJhZ0Rpc2FibGVkKGlzRGlzYWJsZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgaXMgb25seSB0cmlnZ2VyZWQgd2hlbiBhIHNsaWRlciBoYW5kbGVyIGlzIGZvY3VzZWQuXG4gICAqL1xuICBvbktleURvd24oZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGNvZGUgPSBlLmtleUNvZGU7XG4gICAgY29uc3QgaXNJbmNyZWFzZSA9IGNvZGUgPT09IFJJR0hUX0FSUk9XIHx8IGNvZGUgPT09IFVQX0FSUk9XO1xuICAgIGNvbnN0IGlzRGVjcmVhc2UgPSBjb2RlID09PSBMRUZUX0FSUk9XIHx8IGNvZGUgPT09IERPV05fQVJST1c7XG5cbiAgICBpZiAoIShpc0luY3JlYXNlIHx8IGlzRGVjcmVhc2UpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbGV0IHN0ZXAgPSAoaXNEZWNyZWFzZSA/IC10aGlzLm56U3RlcCA6IHRoaXMubnpTdGVwKSAqICh0aGlzLm56UmV2ZXJzZSA/IC0xIDogMSk7XG4gICAgc3RlcCA9IHRoaXMuZGlyID09PSAncnRsJyA/IHN0ZXAgKiAtMSA6IHN0ZXA7XG4gICAgY29uc3QgbmV3VmFsID0gdGhpcy5uelJhbmdlID8gKHRoaXMudmFsdWUgYXMgbnVtYmVyW10pW3RoaXMuYWN0aXZlVmFsdWVJbmRleCFdICsgc3RlcCA6ICh0aGlzLnZhbHVlIGFzIG51bWJlcikgKyBzdGVwO1xuICAgIHRoaXMuc2V0QWN0aXZlVmFsdWUoZW5zdXJlTnVtYmVySW5SYW5nZShuZXdWYWwsIHRoaXMubnpNaW4sIHRoaXMubnpNYXgpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VmFsdWUodmFsdWU6IE56U2xpZGVyVmFsdWUgfCBudWxsLCBpc1dyaXRlVmFsdWU6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmIChpc1dyaXRlVmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmZvcm1hdFZhbHVlKHZhbHVlKTtcbiAgICAgIHRoaXMudXBkYXRlVHJhY2tBbmRIYW5kbGVzKCk7XG4gICAgfSBlbHNlIGlmICghdmFsdWVzRXF1YWwodGhpcy52YWx1ZSEsIHZhbHVlISkpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMudXBkYXRlVHJhY2tBbmRIYW5kbGVzKCk7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UodGhpcy5nZXRWYWx1ZSh0cnVlKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRWYWx1ZShjbG9uZUFuZFNvcnQ6IGJvb2xlYW4gPSBmYWxzZSk6IE56U2xpZGVyVmFsdWUge1xuICAgIGlmIChjbG9uZUFuZFNvcnQgJiYgdGhpcy52YWx1ZSAmJiBpc1ZhbHVlUmFuZ2UodGhpcy52YWx1ZSkpIHtcbiAgICAgIHJldHVybiBbLi4udGhpcy52YWx1ZV0uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy52YWx1ZSE7XG4gIH1cblxuICAvKipcbiAgICogQ2xvbmUgJiBzb3J0IGN1cnJlbnQgdmFsdWUgYW5kIGNvbnZlcnQgdGhlbSB0byBvZmZzZXRzLCB0aGVuIHJldHVybiB0aGUgbmV3IG9uZS5cbiAgICovXG4gIHByaXZhdGUgZ2V0VmFsdWVUb09mZnNldCh2YWx1ZT86IE56U2xpZGVyVmFsdWUpOiBOelNsaWRlclZhbHVlIHtcbiAgICBsZXQgbm9ybWFsaXplZFZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodHlwZW9mIG5vcm1hbGl6ZWRWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG5vcm1hbGl6ZWRWYWx1ZSA9IHRoaXMuZ2V0VmFsdWUodHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzVmFsdWVSYW5nZShub3JtYWxpemVkVmFsdWUpID8gbm9ybWFsaXplZFZhbHVlLm1hcCh2YWwgPT4gdGhpcy52YWx1ZVRvT2Zmc2V0KHZhbCkpIDogdGhpcy52YWx1ZVRvT2Zmc2V0KG5vcm1hbGl6ZWRWYWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgY2xvc2VzdCB2YWx1ZSB0byBiZSBhY3RpdmF0ZWQuXG4gICAqL1xuICBwcml2YXRlIHNldEFjdGl2ZVZhbHVlSW5kZXgocG9pbnRlclZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICBpZiAoaXNWYWx1ZVJhbmdlKHZhbHVlKSkge1xuICAgICAgbGV0IG1pbmltYWw6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAgICAgbGV0IGdhcDogbnVtYmVyO1xuICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gLTE7XG4gICAgICB2YWx1ZS5mb3JFYWNoKCh2YWwsIGluZGV4KSA9PiB7XG4gICAgICAgIGdhcCA9IE1hdGguYWJzKHBvaW50ZXJWYWx1ZSAtIHZhbCk7XG4gICAgICAgIGlmIChtaW5pbWFsID09PSBudWxsIHx8IGdhcCA8IG1pbmltYWwhKSB7XG4gICAgICAgICAgbWluaW1hbCA9IGdhcDtcbiAgICAgICAgICBhY3RpdmVJbmRleCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuYWN0aXZlVmFsdWVJbmRleCA9IGFjdGl2ZUluZGV4O1xuICAgICAgdGhpcy5oYW5kbGVyQ29tcG9uZW50cy50b0FycmF5KClbYWN0aXZlSW5kZXhdLmZvY3VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFuZGxlckNvbXBvbmVudHMudG9BcnJheSgpWzBdLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRBY3RpdmVWYWx1ZShwb2ludGVyVmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpc1ZhbHVlUmFuZ2UodGhpcy52YWx1ZSEpKSB7XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IFsuLi4odGhpcy52YWx1ZSBhcyBudW1iZXJbXSldO1xuICAgICAgbmV3VmFsdWVbdGhpcy5hY3RpdmVWYWx1ZUluZGV4IV0gPSBwb2ludGVyVmFsdWU7XG4gICAgICB0aGlzLnNldFZhbHVlKG5ld1ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRWYWx1ZShwb2ludGVyVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdHJhY2sgYW5kIGhhbmRsZXMnIHBvc2l0aW9uIGFuZCBsZW5ndGguXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVRyYWNrQW5kSGFuZGxlcygpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLmdldFZhbHVlVG9PZmZzZXQodmFsdWUpO1xuICAgIGNvbnN0IHZhbHVlU29ydGVkID0gdGhpcy5nZXRWYWx1ZSh0cnVlKTtcbiAgICBjb25zdCBvZmZzZXRTb3J0ZWQgPSB0aGlzLmdldFZhbHVlVG9PZmZzZXQodmFsdWVTb3J0ZWQpO1xuICAgIGNvbnN0IGJvdW5kUGFydHMgPSBpc1ZhbHVlUmFuZ2UodmFsdWVTb3J0ZWQpID8gdmFsdWVTb3J0ZWQgOiBbMCwgdmFsdWVTb3J0ZWRdO1xuICAgIGNvbnN0IHRyYWNrUGFydHMgPSBpc1ZhbHVlUmFuZ2Uob2Zmc2V0U29ydGVkKSA/IFtvZmZzZXRTb3J0ZWRbMF0sIG9mZnNldFNvcnRlZFsxXSAtIG9mZnNldFNvcnRlZFswXV0gOiBbMCwgb2Zmc2V0U29ydGVkXTtcblxuICAgIHRoaXMuaGFuZGxlcy5mb3JFYWNoKChoYW5kbGUsIGluZGV4KSA9PiB7XG4gICAgICBoYW5kbGUub2Zmc2V0ID0gaXNWYWx1ZVJhbmdlKG9mZnNldCkgPyBvZmZzZXRbaW5kZXhdIDogb2Zmc2V0O1xuICAgICAgaGFuZGxlLnZhbHVlID0gaXNWYWx1ZVJhbmdlKHZhbHVlKSA/IHZhbHVlW2luZGV4XSA6IHZhbHVlIHx8IDA7XG4gICAgfSk7XG5cbiAgICBbdGhpcy5ib3VuZHMubG93ZXIsIHRoaXMuYm91bmRzLnVwcGVyXSA9IGJvdW5kUGFydHM7XG4gICAgW3RoaXMudHJhY2sub2Zmc2V0LCB0aGlzLnRyYWNrLmxlbmd0aF0gPSB0cmFja1BhcnRzO1xuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIG9uRHJhZ1N0YXJ0KHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnRvZ2dsZURyYWdNb3ZpbmcodHJ1ZSk7XG4gICAgdGhpcy5jYWNoZVNsaWRlclByb3BlcnR5KCk7XG4gICAgdGhpcy5zZXRBY3RpdmVWYWx1ZUluZGV4KHRoaXMuZ2V0TG9naWNhbFZhbHVlKHZhbHVlKSk7XG4gICAgdGhpcy5zZXRBY3RpdmVWYWx1ZSh0aGlzLmdldExvZ2ljYWxWYWx1ZSh2YWx1ZSkpO1xuICAgIHRoaXMuc2hvd0hhbmRsZVRvb2x0aXAodGhpcy5uelJhbmdlID8gdGhpcy5hY3RpdmVWYWx1ZUluZGV4IDogMCk7XG4gIH1cblxuICBwcml2YXRlIG9uRHJhZ01vdmUodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2V0QWN0aXZlVmFsdWUodGhpcy5nZXRMb2dpY2FsVmFsdWUodmFsdWUpKTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TG9naWNhbFZhbHVlKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm56UmV2ZXJzZSkge1xuICAgICAgaWYgKCF0aGlzLm56VmVydGljYWwgJiYgdGhpcy5kaXIgPT09ICdydGwnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLm56TWF4IC0gdmFsdWUgKyB0aGlzLm56TWluO1xuICAgIH1cbiAgICBpZiAoIXRoaXMubnpWZXJ0aWNhbCAmJiB0aGlzLmRpciA9PT0gJ3J0bCcpIHtcbiAgICAgIHJldHVybiB0aGlzLm56TWF4IC0gdmFsdWUgKyB0aGlzLm56TWluO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgb25EcmFnRW5kKCk6IHZvaWQge1xuICAgIHRoaXMubnpPbkFmdGVyQ2hhbmdlLmVtaXQodGhpcy5nZXRWYWx1ZSh0cnVlKSk7XG4gICAgdGhpcy50b2dnbGVEcmFnTW92aW5nKGZhbHNlKTtcbiAgICB0aGlzLmNhY2hlU2xpZGVyUHJvcGVydHkodHJ1ZSk7XG4gICAgdGhpcy5oaWRlQWxsSGFuZGxlVG9vbHRpcCgpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSB1c2VyIGludGVyYWN0aW9ucyBoYW5kbGVzLlxuICAgKi9cbiAgcHJpdmF0ZSBiaW5kRHJhZ2dpbmdIYW5kbGVycygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2xpZGVyRE9NID0gdGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBvcmllbnRGaWVsZCA9IHRoaXMubnpWZXJ0aWNhbCA/ICdwYWdlWScgOiAncGFnZVgnO1xuICAgIGNvbnN0IG1vdXNlOiBNb3VzZVRvdWNoT2JzZXJ2ZXJDb25maWcgPSB7XG4gICAgICBzdGFydDogJ21vdXNlZG93bicsXG4gICAgICBtb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICAgIGVuZDogJ21vdXNldXAnLFxuICAgICAgcGx1Y2tLZXk6IFtvcmllbnRGaWVsZF1cbiAgICB9O1xuICAgIGNvbnN0IHRvdWNoOiBNb3VzZVRvdWNoT2JzZXJ2ZXJDb25maWcgPSB7XG4gICAgICBzdGFydDogJ3RvdWNoc3RhcnQnLFxuICAgICAgbW92ZTogJ3RvdWNobW92ZScsXG4gICAgICBlbmQ6ICd0b3VjaGVuZCcsXG4gICAgICBwbHVja0tleTogWyd0b3VjaGVzJywgJzAnLCBvcmllbnRGaWVsZF0sXG4gICAgICBmaWx0ZXI6IChlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4gZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnRcbiAgICB9O1xuXG4gICAgW21vdXNlLCB0b3VjaF0uZm9yRWFjaChzb3VyY2UgPT4ge1xuICAgICAgY29uc3QgeyBzdGFydCwgbW92ZSwgZW5kLCBwbHVja0tleSwgZmlsdGVyOiBmaWx0ZXJGdW5jID0gKCkgPT4gdHJ1ZSB9ID0gc291cmNlO1xuXG4gICAgICBzb3VyY2Uuc3RhcnRQbHVja2VkJCA9IGZyb21FdmVudChzbGlkZXJET00sIHN0YXJ0KS5waXBlKFxuICAgICAgICBmaWx0ZXIoZmlsdGVyRnVuYyksXG4gICAgICAgIHRhcChzaWxlbnRFdmVudCksXG4gICAgICAgIHBsdWNrPEV2ZW50LCBudW1iZXI+KC4uLnBsdWNrS2V5KSxcbiAgICAgICAgbWFwKChwb3NpdGlvbjogbnVtYmVyKSA9PiB0aGlzLmZpbmRDbG9zZXN0VmFsdWUocG9zaXRpb24pKVxuICAgICAgKTtcbiAgICAgIHNvdXJjZS5lbmQkID0gZnJvbUV2ZW50KGRvY3VtZW50LCBlbmQpO1xuICAgICAgc291cmNlLm1vdmVSZXNvbHZlZCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsIG1vdmUpLnBpcGUoXG4gICAgICAgIGZpbHRlcihmaWx0ZXJGdW5jKSxcbiAgICAgICAgdGFwKHNpbGVudEV2ZW50KSxcbiAgICAgICAgcGx1Y2s8RXZlbnQsIG51bWJlcj4oLi4ucGx1Y2tLZXkpLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICBtYXAoKHBvc2l0aW9uOiBudW1iZXIpID0+IHRoaXMuZmluZENsb3Nlc3RWYWx1ZShwb3NpdGlvbikpLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICB0YWtlVW50aWwoc291cmNlLmVuZCQpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kcmFnU3RhcnQkID0gbWVyZ2UobW91c2Uuc3RhcnRQbHVja2VkJCEsIHRvdWNoLnN0YXJ0UGx1Y2tlZCQhKTtcbiAgICB0aGlzLmRyYWdNb3ZlJCA9IG1lcmdlKG1vdXNlLm1vdmVSZXNvbHZlZCQhLCB0b3VjaC5tb3ZlUmVzb2x2ZWQkISk7XG4gICAgdGhpcy5kcmFnRW5kJCA9IG1lcmdlKG1vdXNlLmVuZCQhLCB0b3VjaC5lbmQkISk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZURyYWcocGVyaW9kczogc3RyaW5nW10gPSBbJ3N0YXJ0JywgJ21vdmUnLCAnZW5kJ10pOiB2b2lkIHtcbiAgICBpZiAocGVyaW9kcy5pbmRleE9mKCdzdGFydCcpICE9PSAtMSAmJiB0aGlzLmRyYWdTdGFydCQgJiYgIXRoaXMuZHJhZ1N0YXJ0Xykge1xuICAgICAgdGhpcy5kcmFnU3RhcnRfID0gdGhpcy5kcmFnU3RhcnQkLnN1YnNjcmliZSh0aGlzLm9uRHJhZ1N0YXJ0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGlmIChwZXJpb2RzLmluZGV4T2YoJ21vdmUnKSAhPT0gLTEgJiYgdGhpcy5kcmFnTW92ZSQgJiYgIXRoaXMuZHJhZ01vdmVfKSB7XG4gICAgICB0aGlzLmRyYWdNb3ZlXyA9IHRoaXMuZHJhZ01vdmUkLnN1YnNjcmliZSh0aGlzLm9uRHJhZ01vdmUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgaWYgKHBlcmlvZHMuaW5kZXhPZignZW5kJykgIT09IC0xICYmIHRoaXMuZHJhZ0VuZCQgJiYgIXRoaXMuZHJhZ0VuZF8pIHtcbiAgICAgIHRoaXMuZHJhZ0VuZF8gPSB0aGlzLmRyYWdFbmQkLnN1YnNjcmliZSh0aGlzLm9uRHJhZ0VuZC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlRHJhZyhwZXJpb2RzOiBzdHJpbmdbXSA9IFsnc3RhcnQnLCAnbW92ZScsICdlbmQnXSk6IHZvaWQge1xuICAgIGlmIChwZXJpb2RzLmluZGV4T2YoJ3N0YXJ0JykgIT09IC0xICYmIHRoaXMuZHJhZ1N0YXJ0Xykge1xuICAgICAgdGhpcy5kcmFnU3RhcnRfLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmRyYWdTdGFydF8gPSBudWxsO1xuICAgIH1cblxuICAgIGlmIChwZXJpb2RzLmluZGV4T2YoJ21vdmUnKSAhPT0gLTEgJiYgdGhpcy5kcmFnTW92ZV8pIHtcbiAgICAgIHRoaXMuZHJhZ01vdmVfLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmRyYWdNb3ZlXyA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHBlcmlvZHMuaW5kZXhPZignZW5kJykgIT09IC0xICYmIHRoaXMuZHJhZ0VuZF8pIHtcbiAgICAgIHRoaXMuZHJhZ0VuZF8udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuZHJhZ0VuZF8gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlRHJhZ01vdmluZyhtb3ZhYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgcGVyaW9kcyA9IFsnbW92ZScsICdlbmQnXTtcbiAgICBpZiAobW92YWJsZSkge1xuICAgICAgdGhpcy5zbGlkZXJTZXJ2aWNlLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5zdWJzY3JpYmVEcmFnKHBlcmlvZHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNsaWRlclNlcnZpY2UuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy51bnN1YnNjcmliZURyYWcocGVyaW9kcyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVEcmFnRGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVEcmFnKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlRHJhZyhbJ3N0YXJ0J10pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZENsb3Nlc3RWYWx1ZShwb3NpdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBzbGlkZXJTdGFydCA9IHRoaXMuZ2V0U2xpZGVyU3RhcnRQb3NpdGlvbigpO1xuICAgIGNvbnN0IHNsaWRlckxlbmd0aCA9IHRoaXMuZ2V0U2xpZGVyTGVuZ3RoKCk7XG4gICAgY29uc3QgcmF0aW8gPSBlbnN1cmVOdW1iZXJJblJhbmdlKChwb3NpdGlvbiAtIHNsaWRlclN0YXJ0KSAvIHNsaWRlckxlbmd0aCwgMCwgMSk7XG4gICAgY29uc3QgdmFsID0gKHRoaXMubnpNYXggLSB0aGlzLm56TWluKSAqICh0aGlzLm56VmVydGljYWwgPyAxIC0gcmF0aW8gOiByYXRpbykgKyB0aGlzLm56TWluO1xuICAgIGNvbnN0IHBvaW50cyA9XG4gICAgICB0aGlzLm56TWFya3MgPT09IG51bGxcbiAgICAgICAgPyBbXVxuICAgICAgICA6IE9iamVjdC5rZXlzKHRoaXMubnpNYXJrcylcbiAgICAgICAgICAgIC5tYXAocGFyc2VGbG9hdClcbiAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG5cbiAgICBpZiAodGhpcy5uelN0ZXAgIT09IDAgJiYgIXRoaXMubnpEb3RzKSB7XG4gICAgICBjb25zdCBjbG9zZXN0T25lID0gTWF0aC5yb3VuZCh2YWwgLyB0aGlzLm56U3RlcCkgKiB0aGlzLm56U3RlcDtcbiAgICAgIHBvaW50cy5wdXNoKGNsb3Nlc3RPbmUpO1xuICAgIH1cblxuICAgIGNvbnN0IGdhcHMgPSBwb2ludHMubWFwKHBvaW50ID0+IE1hdGguYWJzKHZhbCAtIHBvaW50KSk7XG4gICAgY29uc3QgY2xvc2VzdCA9IHBvaW50c1tnYXBzLmluZGV4T2YoTWF0aC5taW4oLi4uZ2FwcykpXTtcblxuICAgIC8vIHJldHVybiBwYXJzZUZsb2F0KGNsb3Nlc3QudG9GaXhlZChnZXRQcmVjaXNpb24odGhpcy5uelN0ZXApKSk7XG4gICAgcmV0dXJuIHRoaXMubnpTdGVwID09PSAwID8gY2xvc2VzdCA6IHBhcnNlRmxvYXQoY2xvc2VzdC50b0ZpeGVkKGdldFByZWNpc2lvbih0aGlzLm56U3RlcCkpKTtcbiAgfVxuXG4gIHByaXZhdGUgdmFsdWVUb09mZnNldCh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZ2V0UGVyY2VudCh0aGlzLm56TWluLCB0aGlzLm56TWF4LCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGdldFNsaWRlclN0YXJ0UG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5jYWNoZVNsaWRlclN0YXJ0ICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVNsaWRlclN0YXJ0O1xuICAgIH1cbiAgICBjb25zdCBvZmZzZXQgPSBnZXRFbGVtZW50T2Zmc2V0KHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHJldHVybiB0aGlzLm56VmVydGljYWwgPyBvZmZzZXQudG9wIDogb2Zmc2V0LmxlZnQ7XG4gIH1cblxuICBwcml2YXRlIGdldFNsaWRlckxlbmd0aCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmNhY2hlU2xpZGVyTGVuZ3RoICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVNsaWRlckxlbmd0aDtcbiAgICB9XG4gICAgY29uc3Qgc2xpZGVyRE9NID0gdGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudDtcbiAgICByZXR1cm4gdGhpcy5uelZlcnRpY2FsID8gc2xpZGVyRE9NLmNsaWVudEhlaWdodCA6IHNsaWRlckRPTS5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWNoZSBET00gbGF5b3V0L3JlZmxvdyBvcGVyYXRpb25zIGZvciBwZXJmb3JtYW5jZSAobWF5IG5vdCBuZWNlc3Nhcnk/KVxuICAgKi9cbiAgcHJpdmF0ZSBjYWNoZVNsaWRlclByb3BlcnR5KHJlbW92ZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5jYWNoZVNsaWRlclN0YXJ0ID0gcmVtb3ZlID8gbnVsbCA6IHRoaXMuZ2V0U2xpZGVyU3RhcnRQb3NpdGlvbigpO1xuICAgIHRoaXMuY2FjaGVTbGlkZXJMZW5ndGggPSByZW1vdmUgPyBudWxsIDogdGhpcy5nZXRTbGlkZXJMZW5ndGgoKTtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0VmFsdWUodmFsdWU6IE56U2xpZGVyVmFsdWUgfCBudWxsKTogTnpTbGlkZXJWYWx1ZSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMubnpSYW5nZSA/IFt0aGlzLm56TWluLCB0aGlzLm56TWF4XSA6IHRoaXMubnpNaW47XG4gICAgfSBlbHNlIGlmIChhc3NlcnRWYWx1ZVZhbGlkKHZhbHVlLCB0aGlzLm56UmFuZ2UpKSB7XG4gICAgICByZXR1cm4gaXNWYWx1ZVJhbmdlKHZhbHVlKVxuICAgICAgICA/IHZhbHVlLm1hcCh2YWwgPT4gZW5zdXJlTnVtYmVySW5SYW5nZSh2YWwsIHRoaXMubnpNaW4sIHRoaXMubnpNYXgpKVxuICAgICAgICA6IGVuc3VyZU51bWJlckluUmFuZ2UodmFsdWUsIHRoaXMubnpNaW4sIHRoaXMubnpNYXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5uekRlZmF1bHRWYWx1ZSA/IHRoaXMubnpEZWZhdWx0VmFsdWUgOiB0aGlzLm56UmFuZ2UgPyBbdGhpcy5uek1pbiwgdGhpcy5uek1heF0gOiB0aGlzLm56TWluO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IG9uZSBoYW5kbGUncyB0b29sdGlwIGFuZCBoaWRlIG90aGVycycuXG4gICAqL1xuICBwcml2YXRlIHNob3dIYW5kbGVUb29sdGlwKGhhbmRsZUluZGV4OiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVzLmZvckVhY2goKGhhbmRsZSwgaW5kZXgpID0+IHtcbiAgICAgIGhhbmRsZS5hY3RpdmUgPSBpbmRleCA9PT0gaGFuZGxlSW5kZXg7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGhpZGVBbGxIYW5kbGVUb29sdGlwKCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlcy5mb3JFYWNoKGhhbmRsZSA9PiAoaGFuZGxlLmFjdGl2ZSA9IGZhbHNlKSk7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlTWFya0l0ZW1zKG1hcmtzOiBOek1hcmtzKTogTnpFeHRlbmRlZE1hcmtbXSB8IG51bGwge1xuICAgIGNvbnN0IG1hcmtzQXJyYXk6IE56RXh0ZW5kZWRNYXJrW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBtYXJrcykge1xuICAgICAgY29uc3QgbWFyayA9IG1hcmtzW2tleV07XG4gICAgICBjb25zdCB2YWwgPSB0eXBlb2Yga2V5ID09PSAnbnVtYmVyJyA/IGtleSA6IHBhcnNlRmxvYXQoa2V5KTtcbiAgICAgIGlmICh2YWwgPj0gdGhpcy5uek1pbiAmJiB2YWwgPD0gdGhpcy5uek1heCkge1xuICAgICAgICBtYXJrc0FycmF5LnB1c2goeyB2YWx1ZTogdmFsLCBvZmZzZXQ6IHRoaXMudmFsdWVUb09mZnNldCh2YWwpLCBjb25maWc6IG1hcmsgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXJrc0FycmF5Lmxlbmd0aCA/IG1hcmtzQXJyYXkgOiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFZhbHVlVHlwZU5vdE1hdGNoRXJyb3IoKTogRXJyb3Ige1xuICByZXR1cm4gbmV3IEVycm9yKFxuICAgIGBUaGUgXCJuelJhbmdlXCIgY2FuJ3QgbWF0Y2ggdGhlIFwibmdNb2RlbFwiJ3MgdHlwZSwgcGxlYXNlIGNoZWNrIHRoZXNlIHByb3BlcnRpZXM6IFwibnpSYW5nZVwiLCBcIm5nTW9kZWxcIiwgXCJuekRlZmF1bHRWYWx1ZVwiLmBcbiAgKTtcbn1cblxuZnVuY3Rpb24gaXNWYWx1ZVJhbmdlKHZhbHVlOiBOelNsaWRlclZhbHVlKTogdmFsdWUgaXMgbnVtYmVyW10ge1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPT09IDI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlSGFuZGxlcnMoYW1vdW50OiBudW1iZXIpOiBOelNsaWRlckhhbmRsZXJbXSB7XG4gIHJldHVybiBBcnJheShhbW91bnQpXG4gICAgLmZpbGwoMClcbiAgICAubWFwKCgpID0+ICh7IG9mZnNldDogbnVsbCwgdmFsdWU6IG51bGwsIGFjdGl2ZTogZmFsc2UgfSkpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHZhbHVlIGlzIHZhbGlkIGFuZCB0aHJvdyBlcnJvciBpZiB2YWx1ZS10eXBlL3JhbmdlIG5vdCBtYXRjaC5cbiAqL1xuZnVuY3Rpb24gYXNzZXJ0VmFsdWVWYWxpZCh2YWx1ZTogTnpTbGlkZXJWYWx1ZSwgaXNSYW5nZT86IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgaWYgKCghaXNWYWx1ZVJhbmdlKHZhbHVlKSAmJiBpc05hTih2YWx1ZSkpIHx8IChpc1ZhbHVlUmFuZ2UodmFsdWUpICYmIHZhbHVlLnNvbWUodiA9PiBpc05hTih2KSkpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBhc3NlcnRWYWx1ZVR5cGVNYXRjaCh2YWx1ZSwgaXNSYW5nZSk7XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgaWYgYHRoaXMubnpSYW5nZWAgaXMgYHRydWVgLCB2YWx1ZSBpcyBhbHNvIGEgcmFuZ2UsIHZpY2UgdmVyc2EuXG4gKi9cbmZ1bmN0aW9uIGFzc2VydFZhbHVlVHlwZU1hdGNoKHZhbHVlOiBOelNsaWRlclZhbHVlLCBpc1JhbmdlOiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcbiAgaWYgKGlzVmFsdWVSYW5nZSh2YWx1ZSkgIT09IGlzUmFuZ2UpIHtcbiAgICB0aHJvdyBnZXRWYWx1ZVR5cGVOb3RNYXRjaEVycm9yKCk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHZhbHVlc0VxdWFsKHZhbEE6IE56U2xpZGVyVmFsdWUsIHZhbEI6IE56U2xpZGVyVmFsdWUpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiB2YWxBICE9PSB0eXBlb2YgdmFsQikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gaXNWYWx1ZVJhbmdlKHZhbEEpICYmIGlzVmFsdWVSYW5nZSh2YWxCKSA/IGFycmF5c0VxdWFsPG51bWJlcj4odmFsQSwgdmFsQikgOiB2YWxBID09PSB2YWxCO1xufVxuIl19