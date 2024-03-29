import { __decorate } from 'tslib';
import { RIGHT_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, forwardRef, Optional, ViewChild, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import * as i3 from 'ng-zorro-antd/core/services';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import * as i2$1 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i6 from 'ng-zorro-antd/tooltip';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

class NzRateItemComponent {
    constructor() {
        this.index = 0;
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
NzRateItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRateItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzRateItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzRateItemComponent, selector: "[nz-rate-item]", inputs: { character: "character", index: "index", allowHalf: "allowHalf" }, outputs: { itemHover: "itemHover", itemClick: "itemClick" }, exportAs: ["nzRateItem"], ngImport: i0, template: `
    <div
      class="ant-rate-star-second"
      (mouseover)="hoverRate(false); $event.stopPropagation()"
      (click)="clickRate(false)"
    >
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>
    <div class="ant-rate-star-first" (mouseover)="hoverRate(true); $event.stopPropagation()" (click)="clickRate(true)">
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>

    <ng-template #defaultCharacter>
      <i nz-icon nzType="star" nzTheme="fill"></i>
    </ng-template>
  `, isInline: true, directives: [{ type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzRateItemComponent.prototype, "allowHalf", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRateItemComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: '[nz-rate-item]',
                    exportAs: 'nzRateItem',
                    template: `
    <div
      class="ant-rate-star-second"
      (mouseover)="hoverRate(false); $event.stopPropagation()"
      (click)="clickRate(false)"
    >
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>
    <div class="ant-rate-star-first" (mouseover)="hoverRate(true); $event.stopPropagation()" (click)="clickRate(true)">
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>

    <ng-template #defaultCharacter>
      <i nz-icon nzType="star" nzTheme="fill"></i>
    </ng-template>
  `
                }]
        }], propDecorators: { character: [{
                type: Input
            }], index: [{
                type: Input
            }], allowHalf: [{
                type: Input
            }], itemHover: [{
                type: Output
            }], itemClick: [{
                type: Output
            }] } });

const NZ_CONFIG_MODULE_NAME = 'rate';
class NzRateComponent {
    constructor(nzConfigService, ngZone, renderer, cdr, directionality, destroy$) {
        this.nzConfigService = nzConfigService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.cdr = cdr;
        this.directionality = directionality;
        this.destroy$ = destroy$;
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
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.cdr.markForCheck());
        this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.ulElement.nativeElement, 'focus')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                this.isFocused = true;
                if (this.nzOnFocus.observers.length) {
                    this.ngZone.run(() => this.nzOnFocus.emit(event));
                }
            });
            fromEvent(this.ulElement.nativeElement, 'blur')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                this.isFocused = false;
                if (this.nzOnBlur.observers.length) {
                    this.ngZone.run(() => this.nzOnBlur.emit(event));
                }
            });
        });
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
NzRateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRateComponent, deps: [{ token: i1.NzConfigService }, { token: i0.NgZone }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i2$1.Directionality, optional: true }, { token: i3.NzDestroyService }], target: i0.ɵɵFactoryTarget.Component });
NzRateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzRateComponent, selector: "nz-rate", inputs: { nzAllowClear: "nzAllowClear", nzAllowHalf: "nzAllowHalf", nzDisabled: "nzDisabled", nzAutoFocus: "nzAutoFocus", nzCharacter: "nzCharacter", nzCount: "nzCount", nzTooltips: "nzTooltips" }, outputs: { nzOnBlur: "nzOnBlur", nzOnFocus: "nzOnFocus", nzOnHoverChange: "nzOnHoverChange", nzOnKeyDown: "nzOnKeyDown" }, providers: [
        NzDestroyService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NzRateComponent),
            multi: true
        }
    ], viewQueries: [{ propertyName: "ulElement", first: true, predicate: ["ulElement"], descendants: true, static: true }], exportAs: ["nzRate"], usesOnChanges: true, ngImport: i0, template: `
    <ul
      #ulElement
      class="ant-rate"
      [class.ant-rate-disabled]="nzDisabled"
      [class.ant-rate-rtl]="dir === 'rtl'"
      [ngClass]="classMap"
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
          [index]="i"
          (itemHover)="onItemHover(i, $event)"
          (itemClick)="onItemClick(i, $event)"
        ></div>
      </li>
    </ul>
  `, isInline: true, components: [{ type: NzRateItemComponent, selector: "[nz-rate-item]", inputs: ["character", "index", "allowHalf"], outputs: ["itemHover", "itemClick"], exportAs: ["nzRateItem"] }], directives: [{ type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig(),
    InputBoolean()
], NzRateComponent.prototype, "nzAllowClear", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzRateComponent.prototype, "nzAllowHalf", void 0);
__decorate([
    InputBoolean()
], NzRateComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzRateComponent.prototype, "nzAutoFocus", void 0);
__decorate([
    InputNumber()
], NzRateComponent.prototype, "nzCount", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRateComponent, decorators: [{
            type: Component,
            args: [{
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
          [index]="i"
          (itemHover)="onItemHover(i, $event)"
          (itemClick)="onItemClick(i, $event)"
        ></div>
      </li>
    </ul>
  `,
                    providers: [
                        NzDestroyService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzRateComponent),
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.NgZone }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i2$1.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i3.NzDestroyService }]; }, propDecorators: { ulElement: [{
                type: ViewChild,
                args: ['ulElement', { static: true }]
            }], nzAllowClear: [{
                type: Input
            }], nzAllowHalf: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzAutoFocus: [{
                type: Input
            }], nzCharacter: [{
                type: Input
            }], nzCount: [{
                type: Input
            }], nzTooltips: [{
                type: Input
            }], nzOnBlur: [{
                type: Output
            }], nzOnFocus: [{
                type: Output
            }], nzOnHoverChange: [{
                type: Output
            }], nzOnKeyDown: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRateModule {
}
NzRateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzRateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRateModule, declarations: [NzRateComponent, NzRateItemComponent], imports: [BidiModule, CommonModule, NzIconModule, NzToolTipModule], exports: [NzRateComponent] });
NzRateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRateModule, imports: [[BidiModule, CommonModule, NzIconModule, NzToolTipModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRateModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [NzRateComponent],
                    declarations: [NzRateComponent, NzRateItemComponent],
                    imports: [BidiModule, CommonModule, NzIconModule, NzToolTipModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzRateComponent, NzRateItemComponent, NzRateModule };
//# sourceMappingURL=ng-zorro-antd-rate.mjs.map
