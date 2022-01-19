import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Directive, Optional, Self, Input, Component, ViewEncapsulation, ChangeDetectionStrategy, ContentChildren, isDevMode, ContentChild, NgModule } from '@angular/core';
import { Subject, merge, EMPTY } from 'rxjs';
import { filter, takeUntil, startWith, switchMap, mergeMap, map } from 'rxjs/operators';
import { InputBoolean, isNotNil } from 'ng-zorro-antd/core/util';
import * as i1 from '@angular/forms';
import * as i2 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i1$1 from '@angular/cdk/a11y';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2$1 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i3 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i1$2 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i2$2 from 'ng-zorro-antd/core/services';

class NzInputDirective {
    constructor(ngControl, renderer, elementRef, directionality) {
        this.ngControl = ngControl;
        this.directionality = directionality;
        this.nzBorderless = false;
        this.nzSize = 'default';
        this._disabled = false;
        this.disabled$ = new Subject();
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        renderer.addClass(elementRef.nativeElement, 'ant-input');
    }
    get disabled() {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value != null && `${value}` !== 'false';
    }
    ngOnInit() {
        var _a, _b;
        if (this.ngControl) {
            (_a = this.ngControl.statusChanges) === null || _a === void 0 ? void 0 : _a.pipe(filter(() => this.ngControl.disabled !== null), takeUntil(this.destroy$)).subscribe(() => {
                this.disabled$.next(this.ngControl.disabled);
            });
        }
        this.dir = this.directionality.value;
        (_b = this.directionality.change) === null || _b === void 0 ? void 0 : _b.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
    }
    ngOnChanges(changes) {
        const { disabled } = changes;
        if (disabled) {
            this.disabled$.next(this.disabled);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzInputDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputDirective, deps: [{ token: i1.NgControl, optional: true, self: true }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzInputDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: { nzBorderless: "nzBorderless", nzSize: "nzSize", disabled: "disabled" }, host: { properties: { "class.ant-input-disabled": "disabled", "class.ant-input-borderless": "nzBorderless", "class.ant-input-lg": "nzSize === 'large'", "class.ant-input-sm": "nzSize === 'small'", "attr.disabled": "disabled || null", "class.ant-input-rtl": "dir=== 'rtl'" } }, exportAs: ["nzInput"], usesOnChanges: true, ngImport: i0 });
__decorate([
    InputBoolean()
], NzInputDirective.prototype, "nzBorderless", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[nz-input],textarea[nz-input]',
                    exportAs: 'nzInput',
                    host: {
                        '[class.ant-input-disabled]': 'disabled',
                        '[class.ant-input-borderless]': 'nzBorderless',
                        '[class.ant-input-lg]': `nzSize === 'large'`,
                        '[class.ant-input-sm]': `nzSize === 'small'`,
                        '[attr.disabled]': 'disabled || null',
                        '[class.ant-input-rtl]': `dir=== 'rtl'`
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i1.NgControl, decorators: [{
                        type: Optional
                    }, {
                        type: Self
                    }] }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i2.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzBorderless: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzInputGroupSlotComponent {
    constructor() {
        this.icon = null;
        this.type = null;
        this.template = null;
    }
}
NzInputGroupSlotComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputGroupSlotComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzInputGroupSlotComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzInputGroupSlotComponent, selector: "[nz-input-group-slot]", inputs: { icon: "icon", type: "type", template: "template" }, host: { properties: { "class.ant-input-group-addon": "type === 'addon'", "class.ant-input-prefix": "type === 'prefix'", "class.ant-input-suffix": "type === 'suffix'" } }, ngImport: i0, template: `
    <i nz-icon [nzType]="icon" *ngIf="icon"></i>
    <ng-container *nzStringTemplateOutlet="template">{{ template }}</ng-container>
  `, isInline: true, directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2$1.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i3.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputGroupSlotComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-input-group-slot]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <i nz-icon [nzType]="icon" *ngIf="icon"></i>
    <ng-container *nzStringTemplateOutlet="template">{{ template }}</ng-container>
  `,
                    host: {
                        '[class.ant-input-group-addon]': `type === 'addon'`,
                        '[class.ant-input-prefix]': `type === 'prefix'`,
                        '[class.ant-input-suffix]': `type === 'suffix'`
                    }
                }]
        }], propDecorators: { icon: [{
                type: Input
            }], type: [{
                type: Input
            }], template: [{
                type: Input
            }] } });

class NzInputGroupWhitSuffixOrPrefixDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
NzInputGroupWhitSuffixOrPrefixDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputGroupWhitSuffixOrPrefixDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NzInputGroupWhitSuffixOrPrefixDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzInputGroupWhitSuffixOrPrefixDirective, selector: "nz-input-group[nzSuffix], nz-input-group[nzPrefix]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputGroupWhitSuffixOrPrefixDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: `nz-input-group[nzSuffix], nz-input-group[nzPrefix]`
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
class NzInputGroupComponent {
    constructor(focusMonitor, elementRef, cdr, directionality) {
        this.focusMonitor = focusMonitor;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.directionality = directionality;
        this.nzAddOnBeforeIcon = null;
        this.nzAddOnAfterIcon = null;
        this.nzPrefixIcon = null;
        this.nzSuffixIcon = null;
        this.nzSize = 'default';
        this.nzSearch = false;
        this.nzCompact = false;
        this.isLarge = false;
        this.isSmall = false;
        this.isAffix = false;
        this.isAddOn = false;
        this.focused = false;
        this.disabled = false;
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    updateChildrenInputSize() {
        if (this.listOfNzInputDirective) {
            this.listOfNzInputDirective.forEach(item => (item.nzSize = this.nzSize));
        }
    }
    ngOnInit() {
        var _a;
        this.focusMonitor
            .monitor(this.elementRef, true)
            .pipe(takeUntil(this.destroy$))
            .subscribe(focusOrigin => {
            this.focused = !!focusOrigin;
            this.cdr.markForCheck();
        });
        this.dir = this.directionality.value;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
    }
    ngAfterContentInit() {
        this.updateChildrenInputSize();
        const listOfInputChange$ = this.listOfNzInputDirective.changes.pipe(startWith(this.listOfNzInputDirective));
        listOfInputChange$
            .pipe(switchMap(list => merge(...[listOfInputChange$, ...list.map((input) => input.disabled$)])), mergeMap(() => listOfInputChange$), map(list => list.some((input) => input.disabled)), takeUntil(this.destroy$))
            .subscribe(disabled => {
            this.disabled = disabled;
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzSize, nzSuffix, nzPrefix, nzPrefixIcon, nzSuffixIcon, nzAddOnAfter, nzAddOnBefore, nzAddOnAfterIcon, nzAddOnBeforeIcon } = changes;
        if (nzSize) {
            this.updateChildrenInputSize();
            this.isLarge = this.nzSize === 'large';
            this.isSmall = this.nzSize === 'small';
        }
        if (nzSuffix || nzPrefix || nzPrefixIcon || nzSuffixIcon) {
            this.isAffix = !!(this.nzSuffix || this.nzPrefix || this.nzPrefixIcon || this.nzSuffixIcon);
        }
        if (nzAddOnAfter || nzAddOnBefore || nzAddOnAfterIcon || nzAddOnBeforeIcon) {
            this.isAddOn = !!(this.nzAddOnAfter || this.nzAddOnBefore || this.nzAddOnAfterIcon || this.nzAddOnBeforeIcon);
        }
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef);
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzInputGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputGroupComponent, deps: [{ token: i1$1.FocusMonitor }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzInputGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzInputGroupComponent, selector: "nz-input-group", inputs: { nzAddOnBeforeIcon: "nzAddOnBeforeIcon", nzAddOnAfterIcon: "nzAddOnAfterIcon", nzPrefixIcon: "nzPrefixIcon", nzSuffixIcon: "nzSuffixIcon", nzAddOnBefore: "nzAddOnBefore", nzAddOnAfter: "nzAddOnAfter", nzPrefix: "nzPrefix", nzSuffix: "nzSuffix", nzSize: "nzSize", nzSearch: "nzSearch", nzCompact: "nzCompact" }, host: { properties: { "class.ant-input-group-compact": "nzCompact", "class.ant-input-search-enter-button": "nzSearch", "class.ant-input-search": "nzSearch", "class.ant-input-search-rtl": "dir === 'rtl'", "class.ant-input-search-sm": "nzSearch && isSmall", "class.ant-input-search-large": "nzSearch && isLarge", "class.ant-input-group-wrapper": "isAddOn", "class.ant-input-group-wrapper-rtl": "dir === 'rtl'", "class.ant-input-group-wrapper-lg": "isAddOn && isLarge", "class.ant-input-group-wrapper-sm": "isAddOn && isSmall", "class.ant-input-affix-wrapper": "isAffix && !isAddOn", "class.ant-input-affix-wrapper-rtl": "dir === 'rtl'", "class.ant-input-affix-wrapper-focused": "isAffix && focused", "class.ant-input-affix-wrapper-disabled": "isAffix && disabled", "class.ant-input-affix-wrapper-lg": "isAffix && !isAddOn && isLarge", "class.ant-input-affix-wrapper-sm": "isAffix && !isAddOn && isSmall", "class.ant-input-group": "!isAffix && !isAddOn", "class.ant-input-group-rtl": "dir === 'rtl'", "class.ant-input-group-lg": "!isAffix && !isAddOn && isLarge", "class.ant-input-group-sm": "!isAffix && !isAddOn && isSmall" } }, queries: [{ propertyName: "listOfNzInputDirective", predicate: NzInputDirective }], exportAs: ["nzInputGroup"], usesOnChanges: true, ngImport: i0, template: `
    <span class="ant-input-wrapper ant-input-group" *ngIf="isAddOn; else noAddOnTemplate">
      <span
        *ngIf="nzAddOnBefore || nzAddOnBeforeIcon"
        nz-input-group-slot
        type="addon"
        [icon]="nzAddOnBeforeIcon"
        [template]="nzAddOnBefore"
      ></span>
      <span
        *ngIf="isAffix; else contentTemplate"
        class="ant-input-affix-wrapper"
        [class.ant-input-affix-wrapper-sm]="isSmall"
        [class.ant-input-affix-wrapper-lg]="isLarge"
      >
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </span>
      <span
        *ngIf="nzAddOnAfter || nzAddOnAfterIcon"
        nz-input-group-slot
        type="addon"
        [icon]="nzAddOnAfterIcon"
        [template]="nzAddOnAfter"
      ></span>
    </span>
    <ng-template #noAddOnTemplate>
      <ng-template [ngIf]="isAffix" [ngIfElse]="contentTemplate">
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </ng-template>
    </ng-template>
    <ng-template #affixTemplate>
      <span
        *ngIf="nzPrefix || nzPrefixIcon"
        nz-input-group-slot
        type="prefix"
        [icon]="nzPrefixIcon"
        [template]="nzPrefix"
      ></span>
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      <span
        *ngIf="nzSuffix || nzSuffixIcon"
        nz-input-group-slot
        type="suffix"
        [icon]="nzSuffixIcon"
        [template]="nzSuffix"
      ></span>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `, isInline: true, components: [{ type: NzInputGroupSlotComponent, selector: "[nz-input-group-slot]", inputs: ["icon", "type", "template"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzInputGroupComponent.prototype, "nzSearch", void 0);
__decorate([
    InputBoolean()
], NzInputGroupComponent.prototype, "nzCompact", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-input-group',
                    exportAs: 'nzInputGroup',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <span class="ant-input-wrapper ant-input-group" *ngIf="isAddOn; else noAddOnTemplate">
      <span
        *ngIf="nzAddOnBefore || nzAddOnBeforeIcon"
        nz-input-group-slot
        type="addon"
        [icon]="nzAddOnBeforeIcon"
        [template]="nzAddOnBefore"
      ></span>
      <span
        *ngIf="isAffix; else contentTemplate"
        class="ant-input-affix-wrapper"
        [class.ant-input-affix-wrapper-sm]="isSmall"
        [class.ant-input-affix-wrapper-lg]="isLarge"
      >
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </span>
      <span
        *ngIf="nzAddOnAfter || nzAddOnAfterIcon"
        nz-input-group-slot
        type="addon"
        [icon]="nzAddOnAfterIcon"
        [template]="nzAddOnAfter"
      ></span>
    </span>
    <ng-template #noAddOnTemplate>
      <ng-template [ngIf]="isAffix" [ngIfElse]="contentTemplate">
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </ng-template>
    </ng-template>
    <ng-template #affixTemplate>
      <span
        *ngIf="nzPrefix || nzPrefixIcon"
        nz-input-group-slot
        type="prefix"
        [icon]="nzPrefixIcon"
        [template]="nzPrefix"
      ></span>
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      <span
        *ngIf="nzSuffix || nzSuffixIcon"
        nz-input-group-slot
        type="suffix"
        [icon]="nzSuffixIcon"
        [template]="nzSuffix"
      ></span>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
                    host: {
                        '[class.ant-input-group-compact]': `nzCompact`,
                        '[class.ant-input-search-enter-button]': `nzSearch`,
                        '[class.ant-input-search]': `nzSearch`,
                        '[class.ant-input-search-rtl]': `dir === 'rtl'`,
                        '[class.ant-input-search-sm]': `nzSearch && isSmall`,
                        '[class.ant-input-search-large]': `nzSearch && isLarge`,
                        '[class.ant-input-group-wrapper]': `isAddOn`,
                        '[class.ant-input-group-wrapper-rtl]': `dir === 'rtl'`,
                        '[class.ant-input-group-wrapper-lg]': `isAddOn && isLarge`,
                        '[class.ant-input-group-wrapper-sm]': `isAddOn && isSmall`,
                        '[class.ant-input-affix-wrapper]': `isAffix && !isAddOn`,
                        '[class.ant-input-affix-wrapper-rtl]': `dir === 'rtl'`,
                        '[class.ant-input-affix-wrapper-focused]': `isAffix && focused`,
                        '[class.ant-input-affix-wrapper-disabled]': `isAffix && disabled`,
                        '[class.ant-input-affix-wrapper-lg]': `isAffix && !isAddOn && isLarge`,
                        '[class.ant-input-affix-wrapper-sm]': `isAffix && !isAddOn && isSmall`,
                        '[class.ant-input-group]': `!isAffix && !isAddOn`,
                        '[class.ant-input-group-rtl]': `dir === 'rtl'`,
                        '[class.ant-input-group-lg]': `!isAffix && !isAddOn && isLarge`,
                        '[class.ant-input-group-sm]': `!isAffix && !isAddOn && isSmall`
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i1$1.FocusMonitor }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { listOfNzInputDirective: [{
                type: ContentChildren,
                args: [NzInputDirective]
            }], nzAddOnBeforeIcon: [{
                type: Input
            }], nzAddOnAfterIcon: [{
                type: Input
            }], nzPrefixIcon: [{
                type: Input
            }], nzSuffixIcon: [{
                type: Input
            }], nzAddOnBefore: [{
                type: Input
            }], nzAddOnAfter: [{
                type: Input
            }], nzPrefix: [{
                type: Input
            }], nzSuffix: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzSearch: [{
                type: Input
            }], nzCompact: [{
                type: Input
            }] } });

class NzAutosizeDirective {
    constructor(elementRef, ngZone, platform, resizeService) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.platform = platform;
        this.resizeService = resizeService;
        this.autosize = false;
        this.el = this.elementRef.nativeElement;
        this.maxHeight = null;
        this.minHeight = null;
        this.destroy$ = new Subject();
        this.inputGap = 10;
    }
    set nzAutosize(value) {
        const isAutoSizeType = (data) => typeof data !== 'string' && typeof data !== 'boolean' && (!!data.maxRows || !!data.minRows);
        if (typeof value === 'string' || value === true) {
            this.autosize = true;
        }
        else if (isAutoSizeType(value)) {
            this.autosize = true;
            this.minRows = value.minRows;
            this.maxRows = value.maxRows;
            this.maxHeight = this.setMaxHeight();
            this.minHeight = this.setMinHeight();
        }
    }
    resizeToFitContent(force = false) {
        this.cacheTextareaLineHeight();
        // If we haven't determined the line-height yet, we know we're still hidden and there's no point
        // in checking the height of the textarea.
        if (!this.cachedLineHeight) {
            return;
        }
        const textarea = this.el;
        const value = textarea.value;
        // Only resize if the value or minRows have changed since these calculations can be expensive.
        if (!force && this.minRows === this.previousMinRows && value === this.previousValue) {
            return;
        }
        const placeholderText = textarea.placeholder;
        // Reset the textarea height to auto in order to shrink back to its default size.
        // Also temporarily force overflow:hidden, so scroll bars do not interfere with calculations.
        // Long placeholders that are wider than the textarea width may lead to a bigger scrollHeight
        // value. To ensure that the scrollHeight is not bigger than the content, the placeholders
        // need to be removed temporarily.
        textarea.classList.add('nz-textarea-autosize-measuring');
        textarea.placeholder = '';
        let height = Math.round((textarea.scrollHeight - this.inputGap) / this.cachedLineHeight) * this.cachedLineHeight +
            this.inputGap;
        if (this.maxHeight !== null && height > this.maxHeight) {
            height = this.maxHeight;
        }
        if (this.minHeight !== null && height < this.minHeight) {
            height = this.minHeight;
        }
        // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
        textarea.style.height = `${height}px`;
        textarea.classList.remove('nz-textarea-autosize-measuring');
        textarea.placeholder = placeholderText;
        // On Firefox resizing the textarea will prevent it from scrolling to the caret position.
        // We need to re-set the selection in order for it to scroll to the proper position.
        if (typeof requestAnimationFrame !== 'undefined') {
            this.ngZone.runOutsideAngular(() => requestAnimationFrame(() => {
                const { selectionStart, selectionEnd } = textarea;
                // IE will throw an "Unspecified error" if we try to set the selection range after the
                // element has been removed from the DOM. Assert that the directive hasn't been destroyed
                // between the time we requested the animation frame and when it was executed.
                // Also note that we have to assert that the textarea is focused before we set the
                // selection range. Setting the selection range on a non-focused textarea will cause
                // it to receive focus on IE and Edge.
                if (!this.destroy$.isStopped && document.activeElement === textarea) {
                    textarea.setSelectionRange(selectionStart, selectionEnd);
                }
            }));
        }
        this.previousValue = value;
        this.previousMinRows = this.minRows;
    }
    cacheTextareaLineHeight() {
        if (this.cachedLineHeight >= 0 || !this.el.parentNode) {
            return;
        }
        // Use a clone element because we have to override some styles.
        const textareaClone = this.el.cloneNode(false);
        textareaClone.rows = 1;
        // Use `position: absolute` so that this doesn't cause a browser layout and use
        // `visibility: hidden` so that nothing is rendered. Clear any other styles that
        // would affect the height.
        textareaClone.style.position = 'absolute';
        textareaClone.style.visibility = 'hidden';
        textareaClone.style.border = 'none';
        textareaClone.style.padding = '0';
        textareaClone.style.height = '';
        textareaClone.style.minHeight = '';
        textareaClone.style.maxHeight = '';
        // In Firefox it happens that textarea elements are always bigger than the specified amount
        // of rows. This is because Firefox tries to add extra space for the horizontal scrollbar.
        // As a workaround that removes the extra space for the scrollbar, we can just set overflow
        // to hidden. This ensures that there is no invalid calculation of the line height.
        // See Firefox bug report: https://bugzilla.mozilla.org/show_bug.cgi?id=33654
        textareaClone.style.overflow = 'hidden';
        this.el.parentNode.appendChild(textareaClone);
        this.cachedLineHeight = textareaClone.clientHeight - this.inputGap;
        this.el.parentNode.removeChild(textareaClone);
        // Min and max heights have to be re-calculated if the cached line height changes
        this.maxHeight = this.setMaxHeight();
        this.minHeight = this.setMinHeight();
    }
    setMinHeight() {
        const minHeight = this.minRows && this.cachedLineHeight ? this.minRows * this.cachedLineHeight + this.inputGap : null;
        if (minHeight !== null) {
            this.el.style.minHeight = `${minHeight}px`;
        }
        return minHeight;
    }
    setMaxHeight() {
        const maxHeight = this.maxRows && this.cachedLineHeight ? this.maxRows * this.cachedLineHeight + this.inputGap : null;
        if (maxHeight !== null) {
            this.el.style.maxHeight = `${maxHeight}px`;
        }
        return maxHeight;
    }
    noopInputHandler() {
        // no-op handler that ensures we're running change detection on input events.
    }
    ngAfterViewInit() {
        if (this.autosize && this.platform.isBrowser) {
            this.resizeToFitContent();
            this.resizeService
                .subscribe()
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.resizeToFitContent(true));
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngDoCheck() {
        if (this.autosize && this.platform.isBrowser) {
            this.resizeToFitContent();
        }
    }
}
NzAutosizeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAutosizeDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i1$2.Platform }, { token: i2$2.NzResizeService }], target: i0.ɵɵFactoryTarget.Directive });
NzAutosizeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzAutosizeDirective, selector: "textarea[nzAutosize]", inputs: { nzAutosize: "nzAutosize" }, host: { attributes: { "rows": "1" }, listeners: { "input": "noopInputHandler()" } }, exportAs: ["nzAutosize"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAutosizeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'textarea[nzAutosize]',
                    exportAs: 'nzAutosize',
                    host: {
                        // Textarea elements that have the directive applied should have a single row by default.
                        // Browsers normally show two rows by default and therefore this limits the minRows binding.
                        rows: '1',
                        '(input)': 'noopInputHandler()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i1$2.Platform }, { type: i2$2.NzResizeService }]; }, propDecorators: { nzAutosize: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTextareaCountComponent {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.nzMaxCharacterCount = 0;
        this.nzComputeCharacterCount = v => v.length;
        this.nzFormatter = (c, m) => `${c}${m > 0 ? `/${m}` : ``}`;
        this.configChange$ = new Subject();
        this.destroy$ = new Subject();
    }
    ngAfterContentInit() {
        if (!this.nzInputDirective && isDevMode()) {
            throw new Error('[nz-textarea-count]: Could not find matching textarea[nz-input] child.');
        }
        if (this.nzInputDirective.ngControl) {
            const valueChanges = this.nzInputDirective.ngControl.valueChanges || EMPTY;
            merge(valueChanges, this.configChange$)
                .pipe(takeUntil(this.destroy$), map(() => this.nzInputDirective.ngControl.value), startWith(this.nzInputDirective.ngControl.value))
                .subscribe(value => {
                this.setDataCount(value);
            });
        }
    }
    setDataCount(value) {
        const inputValue = isNotNil(value) ? String(value) : '';
        const currentCount = this.nzComputeCharacterCount(inputValue);
        const dataCount = this.nzFormatter(currentCount, this.nzMaxCharacterCount);
        this.renderer.setAttribute(this.elementRef.nativeElement, 'data-count', dataCount);
    }
    ngOnDestroy() {
        this.configChange$.complete();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTextareaCountComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTextareaCountComponent, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NzTextareaCountComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTextareaCountComponent, selector: "nz-textarea-count", inputs: { nzMaxCharacterCount: "nzMaxCharacterCount", nzComputeCharacterCount: "nzComputeCharacterCount", nzFormatter: "nzFormatter" }, host: { classAttribute: "ant-input-textarea-show-count" }, queries: [{ propertyName: "nzInputDirective", first: true, predicate: NzInputDirective, descendants: true, static: true }], ngImport: i0, template: ` <ng-content select="textarea[nz-input]"></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTextareaCountComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-textarea-count',
                    template: ` <ng-content select="textarea[nz-input]"></ng-content> `,
                    host: {
                        class: 'ant-input-textarea-show-count'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { nzInputDirective: [{
                type: ContentChild,
                args: [NzInputDirective, { static: true }]
            }], nzMaxCharacterCount: [{
                type: Input
            }], nzComputeCharacterCount: [{
                type: Input
            }], nzFormatter: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzInputModule {
}
NzInputModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzInputModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputModule, declarations: [NzTextareaCountComponent,
        NzInputDirective,
        NzInputGroupComponent,
        NzAutosizeDirective,
        NzInputGroupSlotComponent,
        NzInputGroupWhitSuffixOrPrefixDirective], imports: [BidiModule, CommonModule, NzIconModule, PlatformModule, NzOutletModule], exports: [NzTextareaCountComponent,
        NzInputDirective,
        NzInputGroupComponent,
        NzAutosizeDirective,
        NzInputGroupWhitSuffixOrPrefixDirective] });
NzInputModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputModule, imports: [[BidiModule, CommonModule, NzIconModule, PlatformModule, NzOutletModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NzTextareaCountComponent,
                        NzInputDirective,
                        NzInputGroupComponent,
                        NzAutosizeDirective,
                        NzInputGroupSlotComponent,
                        NzInputGroupWhitSuffixOrPrefixDirective
                    ],
                    exports: [
                        NzTextareaCountComponent,
                        NzInputDirective,
                        NzInputGroupComponent,
                        NzAutosizeDirective,
                        NzInputGroupWhitSuffixOrPrefixDirective
                    ],
                    imports: [BidiModule, CommonModule, NzIconModule, PlatformModule, NzOutletModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzAutosizeDirective, NzInputDirective, NzInputGroupComponent, NzInputGroupSlotComponent, NzInputGroupWhitSuffixOrPrefixDirective, NzInputModule, NzTextareaCountComponent };
//# sourceMappingURL=ng-zorro-antd-input.mjs.map
