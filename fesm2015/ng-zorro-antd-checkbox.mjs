import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Output, forwardRef, Optional, ViewChild, Input, NgModule } from '@angular/core';
import * as i4 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i2 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import * as i3 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i4$1 from '@angular/common';
import { CommonModule } from '@angular/common';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCheckboxWrapperComponent {
    constructor(renderer, elementRef) {
        this.nzOnChange = new EventEmitter();
        this.checkboxList = [];
        renderer.addClass(elementRef.nativeElement, 'ant-checkbox-group');
    }
    addCheckbox(value) {
        this.checkboxList.push(value);
    }
    removeCheckbox(value) {
        this.checkboxList.splice(this.checkboxList.indexOf(value), 1);
    }
    onChange() {
        const listOfCheckedValue = this.checkboxList.filter(item => item.nzChecked).map(item => item.nzValue);
        this.nzOnChange.emit(listOfCheckedValue);
    }
}
NzCheckboxWrapperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCheckboxWrapperComponent, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NzCheckboxWrapperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCheckboxWrapperComponent, selector: "nz-checkbox-wrapper", outputs: { nzOnChange: "nzOnChange" }, exportAs: ["nzCheckboxWrapper"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCheckboxWrapperComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-checkbox-wrapper',
                    exportAs: 'nzCheckboxWrapper',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: ` <ng-content></ng-content> `
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { nzOnChange: [{
                type: Output
            }] } });

class NzCheckboxComponent {
    constructor(ngZone, elementRef, nzCheckboxWrapperComponent, cdr, focusMonitor, directionality) {
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.nzCheckboxWrapperComponent = nzCheckboxWrapperComponent;
        this.cdr = cdr;
        this.focusMonitor = focusMonitor;
        this.directionality = directionality;
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        this.onChange = () => { };
        this.onTouched = () => { };
        this.nzCheckedChange = new EventEmitter();
        this.nzValue = null;
        this.nzAutoFocus = false;
        this.nzDisabled = false;
        this.nzIndeterminate = false;
        this.nzChecked = false;
        this.nzId = null;
    }
    innerCheckedChange(checked) {
        if (!this.nzDisabled) {
            this.nzChecked = checked;
            this.onChange(this.nzChecked);
            this.nzCheckedChange.emit(this.nzChecked);
            if (this.nzCheckboxWrapperComponent) {
                this.nzCheckboxWrapperComponent.onChange();
            }
        }
    }
    writeValue(value) {
        this.nzChecked = value;
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this.nzDisabled = disabled;
        this.cdr.markForCheck();
    }
    focus() {
        this.focusMonitor.focusVia(this.inputElement, 'keyboard');
    }
    blur() {
        this.inputElement.nativeElement.blur();
    }
    ngOnInit() {
        this.focusMonitor
            .monitor(this.elementRef, true)
            .pipe(takeUntil(this.destroy$))
            .subscribe(focusOrigin => {
            if (!focusOrigin) {
                Promise.resolve().then(() => this.onTouched());
            }
        });
        if (this.nzCheckboxWrapperComponent) {
            this.nzCheckboxWrapperComponent.addCheckbox(this);
        }
        this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.elementRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                event.preventDefault();
                this.focus();
                if (this.nzDisabled) {
                    return;
                }
                this.ngZone.run(() => {
                    this.innerCheckedChange(!this.nzChecked);
                    this.cdr.markForCheck();
                });
            });
            fromEvent(this.inputElement.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => event.stopPropagation());
        });
    }
    ngAfterViewInit() {
        if (this.nzAutoFocus) {
            this.focus();
        }
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef);
        if (this.nzCheckboxWrapperComponent) {
            this.nzCheckboxWrapperComponent.removeCheckbox(this);
        }
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzCheckboxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCheckboxComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: NzCheckboxWrapperComponent, optional: true }, { token: i0.ChangeDetectorRef }, { token: i2.FocusMonitor }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzCheckboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCheckboxComponent, selector: "[nz-checkbox]", inputs: { nzValue: "nzValue", nzAutoFocus: "nzAutoFocus", nzDisabled: "nzDisabled", nzIndeterminate: "nzIndeterminate", nzChecked: "nzChecked", nzId: "nzId" }, outputs: { nzCheckedChange: "nzCheckedChange" }, host: { properties: { "class.ant-checkbox-wrapper-checked": "nzChecked", "class.ant-checkbox-rtl": "dir === 'rtl'" }, classAttribute: "ant-checkbox-wrapper" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NzCheckboxComponent),
            multi: true
        }
    ], viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["inputElement"], descendants: true, static: true }], exportAs: ["nzCheckbox"], ngImport: i0, template: `
    <span
      class="ant-checkbox"
      [class.ant-checkbox-checked]="nzChecked && !nzIndeterminate"
      [class.ant-checkbox-disabled]="nzDisabled"
      [class.ant-checkbox-indeterminate]="nzIndeterminate"
    >
      <input
        #inputElement
        type="checkbox"
        class="ant-checkbox-input"
        [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
        [attr.id]="nzId"
        [checked]="nzChecked"
        [ngModel]="nzChecked"
        [disabled]="nzDisabled"
        (ngModelChange)="innerCheckedChange($event)"
      />
      <span class="ant-checkbox-inner"></span>
    </span>
    <span><ng-content></ng-content></span>
  `, isInline: true, directives: [{ type: i4.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzCheckboxComponent.prototype, "nzAutoFocus", void 0);
__decorate([
    InputBoolean()
], NzCheckboxComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzCheckboxComponent.prototype, "nzIndeterminate", void 0);
__decorate([
    InputBoolean()
], NzCheckboxComponent.prototype, "nzChecked", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCheckboxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-checkbox]',
                    exportAs: 'nzCheckbox',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <span
      class="ant-checkbox"
      [class.ant-checkbox-checked]="nzChecked && !nzIndeterminate"
      [class.ant-checkbox-disabled]="nzDisabled"
      [class.ant-checkbox-indeterminate]="nzIndeterminate"
    >
      <input
        #inputElement
        type="checkbox"
        class="ant-checkbox-input"
        [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
        [attr.id]="nzId"
        [checked]="nzChecked"
        [ngModel]="nzChecked"
        [disabled]="nzDisabled"
        (ngModelChange)="innerCheckedChange($event)"
      />
      <span class="ant-checkbox-inner"></span>
    </span>
    <span><ng-content></ng-content></span>
  `,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzCheckboxComponent),
                            multi: true
                        }
                    ],
                    host: {
                        class: 'ant-checkbox-wrapper',
                        '[class.ant-checkbox-wrapper-checked]': 'nzChecked',
                        '[class.ant-checkbox-rtl]': `dir === 'rtl'`
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: NzCheckboxWrapperComponent, decorators: [{
                        type: Optional
                    }] }, { type: i0.ChangeDetectorRef }, { type: i2.FocusMonitor }, { type: i3.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { inputElement: [{
                type: ViewChild,
                args: ['inputElement', { static: true }]
            }], nzCheckedChange: [{
                type: Output
            }], nzValue: [{
                type: Input
            }], nzAutoFocus: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzIndeterminate: [{
                type: Input
            }], nzChecked: [{
                type: Input
            }], nzId: [{
                type: Input
            }] } });

class NzCheckboxGroupComponent {
    constructor(elementRef, focusMonitor, cdr, directionality) {
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.cdr = cdr;
        this.directionality = directionality;
        this.onChange = () => { };
        this.onTouched = () => { };
        this.options = [];
        this.nzDisabled = false;
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    trackByOption(_, option) {
        return option.value;
    }
    onCheckedChange(option, checked) {
        option.checked = checked;
        this.onChange(this.options);
    }
    ngOnInit() {
        var _a;
        this.focusMonitor
            .monitor(this.elementRef, true)
            .pipe(takeUntil(this.destroy$))
            .subscribe(focusOrigin => {
            if (!focusOrigin) {
                Promise.resolve().then(() => this.onTouched());
            }
        });
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef);
        this.destroy$.next();
        this.destroy$.complete();
    }
    writeValue(value) {
        this.options = value;
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this.nzDisabled = disabled;
        this.cdr.markForCheck();
    }
}
NzCheckboxGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCheckboxGroupComponent, deps: [{ token: i0.ElementRef }, { token: i2.FocusMonitor }, { token: i0.ChangeDetectorRef }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzCheckboxGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCheckboxGroupComponent, selector: "nz-checkbox-group", inputs: { nzDisabled: "nzDisabled" }, host: { properties: { "class.ant-checkbox-group-rtl": "dir === 'rtl'" }, classAttribute: "ant-checkbox-group" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NzCheckboxGroupComponent),
            multi: true
        }
    ], exportAs: ["nzCheckboxGroup"], ngImport: i0, template: `
    <label
      nz-checkbox
      class="ant-checkbox-group-item"
      *ngFor="let o of options; trackBy: trackByOption"
      [nzDisabled]="o.disabled || nzDisabled"
      [nzChecked]="o.checked!"
      (nzCheckedChange)="onCheckedChange(o, $event)"
    >
      <span>{{ o.label }}</span>
    </label>
  `, isInline: true, components: [{ type: NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }], directives: [{ type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzCheckboxGroupComponent.prototype, "nzDisabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCheckboxGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-checkbox-group',
                    exportAs: 'nzCheckboxGroup',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <label
      nz-checkbox
      class="ant-checkbox-group-item"
      *ngFor="let o of options; trackBy: trackByOption"
      [nzDisabled]="o.disabled || nzDisabled"
      [nzChecked]="o.checked!"
      (nzCheckedChange)="onCheckedChange(o, $event)"
    >
      <span>{{ o.label }}</span>
    </label>
  `,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzCheckboxGroupComponent),
                            multi: true
                        }
                    ],
                    host: {
                        class: 'ant-checkbox-group',
                        '[class.ant-checkbox-group-rtl]': `dir === 'rtl'`
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i2.FocusMonitor }, { type: i0.ChangeDetectorRef }, { type: i3.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzDisabled: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCheckboxModule {
}
NzCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCheckboxModule, declarations: [NzCheckboxComponent, NzCheckboxGroupComponent, NzCheckboxWrapperComponent], imports: [BidiModule, CommonModule, FormsModule, A11yModule], exports: [NzCheckboxComponent, NzCheckboxGroupComponent, NzCheckboxWrapperComponent] });
NzCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCheckboxModule, imports: [[BidiModule, CommonModule, FormsModule, A11yModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, FormsModule, A11yModule],
                    declarations: [NzCheckboxComponent, NzCheckboxGroupComponent, NzCheckboxWrapperComponent],
                    exports: [NzCheckboxComponent, NzCheckboxGroupComponent, NzCheckboxWrapperComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCheckboxComponent, NzCheckboxGroupComponent, NzCheckboxModule, NzCheckboxWrapperComponent };
//# sourceMappingURL=ng-zorro-antd-checkbox.mjs.map
