import { __decorate, __metadata } from 'tslib';
import { Directionality, BidiModule } from '@angular/cdk/bidi';
import { RIGHT_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, forwardRef, Renderer2, ChangeDetectorRef, Optional, ViewChild, Input, Output, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_CONFIG_MODULE_NAME = 'rate';
class NzRateComponent {
    constructor(nzConfigService, renderer, cdr, directionality) {
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
        this.nzOnBlur = new EventEmitter();
        this.nzOnFocus = new EventEmitter();
        this.nzOnHoverChange = new EventEmitter();
        this.nzOnKeyDown = new EventEmitter();
        this.classMap = {};
        this.starArray = [];
        this.starStyleArray = [];
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        this.hasHalf = false;
        this.hoverValue = 0;
        this.isFocused = false;
        this._value = 0;
        this.onChange = () => null;
        this.onTouched = () => null;
    }
    get nzValue() {
        return this._value;
    }
    set nzValue(input) {
        if (this._value === input) {
            return;
        }
        this._value = input;
        this.hasHalf = !Number.isInteger(input);
        this.hoverValue = Math.ceil(input);
    }
    ngOnChanges(changes) {
        const { nzAutoFocus, nzCount, nzValue } = changes;
        if (nzAutoFocus && !nzAutoFocus.isFirstChange()) {
            const el = this.ulElement.nativeElement;
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
    }
    ngOnInit() {
        var _a;
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.cdr.markForCheck());
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    onItemClick(index, isHalf) {
        if (this.nzDisabled) {
            return;
        }
        this.hoverValue = index + 1;
        const actualValue = isHalf ? index + 0.5 : index + 1;
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
    }
    onItemHover(index, isHalf) {
        if (this.nzDisabled || (this.hoverValue === index + 1 && isHalf === this.hasHalf)) {
            return;
        }
        this.hoverValue = index + 1;
        this.hasHalf = isHalf;
        this.nzOnHoverChange.emit(this.hoverValue);
        this.updateStarStyle();
    }
    onRateLeave() {
        this.hasHalf = !Number.isInteger(this.nzValue);
        this.hoverValue = Math.ceil(this.nzValue);
        this.updateStarStyle();
    }
    onFocus(e) {
        this.isFocused = true;
        this.nzOnFocus.emit(e);
    }
    onBlur(e) {
        this.isFocused = false;
        this.nzOnBlur.emit(e);
    }
    focus() {
        this.ulElement.nativeElement.focus();
    }
    blur() {
        this.ulElement.nativeElement.blur();
    }
    onKeyDown(e) {
        const oldVal = this.nzValue;
        if (e.keyCode === RIGHT_ARROW && this.nzValue < this.nzCount) {
            this.nzValue += this.nzAllowHalf ? 0.5 : 1;
        }
        else if (e.keyCode === LEFT_ARROW && this.nzValue > 0) {
            this.nzValue -= this.nzAllowHalf ? 0.5 : 1;
        }
        if (oldVal !== this.nzValue) {
            this.onChange(this.nzValue);
            this.nzOnKeyDown.emit(e);
            this.updateStarStyle();
            this.cdr.markForCheck();
        }
    }
    updateStarArray() {
        this.starArray = Array(this.nzCount)
            .fill(0)
            .map((_, i) => i);
        this.updateStarStyle();
    }
    updateStarStyle() {
        this.starStyleArray = this.starArray.map(i => {
            const prefix = 'ant-rate-star';
            const value = i + 1;
            return {
                [`${prefix}-full`]: value < this.hoverValue || (!this.hasHalf && value === this.hoverValue),
                [`${prefix}-half`]: this.hasHalf && value === this.hoverValue,
                [`${prefix}-active`]: this.hasHalf && value === this.hoverValue,
                [`${prefix}-zero`]: value > this.hoverValue,
                [`${prefix}-focused`]: this.hasHalf && value === this.hoverValue && this.isFocused
            };
        });
    }
    writeValue(value) {
        this.nzValue = value || 0;
        this.updateStarArray();
        this.cdr.markForCheck();
    }
    setDisabledState(isDisabled) {
        this.nzDisabled = isDisabled;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
NzRateComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-rate',
                exportAs: 'nzRate',
                preserveWhitespaces: false,
                template: `
    <ul
      #ulElement
      class="ant-rate"
      [class.ant-rate-disabled]="nzDisabled"
      [class.ant-rate-rtl]="dir === 'rtl'"
      [ngClass]="classMap"
      (blur)="onBlur($event)"
      (focus)="onFocus($event)"
      (keydown)="onKeyDown($event); $event.preventDefault()"
      (mouseleave)="onRateLeave(); $event.stopPropagation()"
      [tabindex]="nzDisabled ? -1 : 1"
    >
      <li
        *ngFor="let star of starArray; let i = index"
        class="ant-rate-star"
        [ngClass]="starStyleArray[i] || ''"
        nz-tooltip
        [nzTooltipTitle]="nzTooltips[i]"
      >
        <div
          nz-rate-item
          [allowHalf]="nzAllowHalf"
          [character]="nzCharacter"
          (itemHover)="onItemHover(i, $event)"
          (itemClick)="onItemClick(i, $event)"
        ></div>
      </li>
    </ul>
  `,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NzRateComponent),
                        multi: true
                    }
                ]
            },] }
];
NzRateComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: Directionality, decorators: [{ type: Optional }] }
];
NzRateComponent.propDecorators = {
    ulElement: [{ type: ViewChild, args: ['ulElement', { static: false },] }],
    nzAllowClear: [{ type: Input }],
    nzAllowHalf: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzAutoFocus: [{ type: Input }],
    nzCharacter: [{ type: Input }],
    nzCount: [{ type: Input }],
    nzTooltips: [{ type: Input }],
    nzOnBlur: [{ type: Output }],
    nzOnFocus: [{ type: Output }],
    nzOnHoverChange: [{ type: Output }],
    nzOnKeyDown: [{ type: Output }]
};
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzRateComponent.prototype, "nzAllowClear", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzRateComponent.prototype, "nzAllowHalf", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzRateComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzRateComponent.prototype, "nzAutoFocus", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Number)
], NzRateComponent.prototype, "nzCount", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRateItemComponent {
    constructor() {
        this.allowHalf = false;
        this.itemHover = new EventEmitter();
        this.itemClick = new EventEmitter();
    }
    hoverRate(isHalf) {
        this.itemHover.next(isHalf && this.allowHalf);
    }
    clickRate(isHalf) {
        this.itemClick.next(isHalf && this.allowHalf);
    }
}
NzRateItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: '[nz-rate-item]',
                exportAs: 'nzRateItem',
                template: `
    <div class="ant-rate-star-second" (mouseover)="hoverRate(false); $event.stopPropagation()" (click)="clickRate(false)">
      <ng-template [ngTemplateOutlet]="character || defaultCharacter"></ng-template>
    </div>
    <div class="ant-rate-star-first" (mouseover)="hoverRate(true); $event.stopPropagation()" (click)="clickRate(true)">
      <ng-template [ngTemplateOutlet]="character || defaultCharacter"></ng-template>
    </div>

    <ng-template #defaultCharacter>
      <i nz-icon nzType="star" nzTheme="fill"></i>
    </ng-template>
  `
            },] }
];
NzRateItemComponent.propDecorators = {
    character: [{ type: Input }],
    allowHalf: [{ type: Input }],
    itemHover: [{ type: Output }],
    itemClick: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzRateItemComponent.prototype, "allowHalf", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRateModule {
}
NzRateModule.decorators = [
    { type: NgModule, args: [{
                exports: [NzRateComponent],
                declarations: [NzRateComponent, NzRateItemComponent],
                imports: [BidiModule, CommonModule, NzIconModule, NzToolTipModule]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzRateComponent, NzRateItemComponent, NzRateModule };
//# sourceMappingURL=ng-zorro-antd-rate.js.map
