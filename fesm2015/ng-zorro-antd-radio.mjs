import * as i0 from '@angular/core';
import { Directive, Injectable, forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, Optional, Input, ViewChild, NgModule } from '@angular/core';
import { __decorate } from 'tslib';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { ReplaySubject, Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i2 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i1 from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRadioButtonDirective {
}
NzRadioButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioButtonDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzRadioButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzRadioButtonDirective, selector: "[nz-radio-button]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-radio-button]'
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRadioService {
    constructor() {
        this.selected$ = new ReplaySubject(1);
        this.touched$ = new Subject();
        this.disabled$ = new ReplaySubject(1);
        this.name$ = new ReplaySubject(1);
    }
    touch() {
        this.touched$.next();
    }
    select(value) {
        this.selected$.next(value);
    }
    setDisabled(value) {
        this.disabled$.next(value);
    }
    setName(value) {
        this.name$.next(value);
    }
}
NzRadioService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NzRadioService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioService, decorators: [{
            type: Injectable
        }] });

class NzRadioGroupComponent {
    constructor(cdr, nzRadioService, directionality) {
        this.cdr = cdr;
        this.nzRadioService = nzRadioService;
        this.directionality = directionality;
        this.value = null;
        this.destroy$ = new Subject();
        this.onChange = () => { };
        this.onTouched = () => { };
        this.nzDisabled = false;
        this.nzButtonStyle = 'outline';
        this.nzSize = 'default';
        this.nzName = null;
        this.dir = 'ltr';
    }
    ngOnInit() {
        var _a;
        this.nzRadioService.selected$.pipe(takeUntil(this.destroy$)).subscribe(value => {
            if (this.value !== value) {
                this.value = value;
                this.onChange(this.value);
            }
        });
        this.nzRadioService.touched$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            Promise.resolve().then(() => this.onTouched());
        });
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngOnChanges(changes) {
        const { nzDisabled, nzName } = changes;
        if (nzDisabled) {
            this.nzRadioService.setDisabled(this.nzDisabled);
        }
        if (nzName) {
            this.nzRadioService.setName(this.nzName);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    writeValue(value) {
        this.value = value;
        this.nzRadioService.select(value);
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.nzDisabled = isDisabled;
        this.nzRadioService.setDisabled(isDisabled);
        this.cdr.markForCheck();
    }
}
NzRadioGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioGroupComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: NzRadioService }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzRadioGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzRadioGroupComponent, selector: "nz-radio-group", inputs: { nzDisabled: "nzDisabled", nzButtonStyle: "nzButtonStyle", nzSize: "nzSize", nzName: "nzName" }, host: { properties: { "class.ant-radio-group-large": "nzSize === 'large'", "class.ant-radio-group-small": "nzSize === 'small'", "class.ant-radio-group-solid": "nzButtonStyle === 'solid'", "class.ant-radio-group-rtl": "dir === 'rtl'" }, classAttribute: "ant-radio-group" }, providers: [
        NzRadioService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NzRadioGroupComponent),
            multi: true
        }
    ], exportAs: ["nzRadioGroup"], usesOnChanges: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzRadioGroupComponent.prototype, "nzDisabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-radio-group',
                    exportAs: 'nzRadioGroup',
                    preserveWhitespaces: false,
                    template: ` <ng-content></ng-content> `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        NzRadioService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzRadioGroupComponent),
                            multi: true
                        }
                    ],
                    host: {
                        class: 'ant-radio-group',
                        '[class.ant-radio-group-large]': `nzSize === 'large'`,
                        '[class.ant-radio-group-small]': `nzSize === 'small'`,
                        '[class.ant-radio-group-solid]': `nzButtonStyle === 'solid'`,
                        '[class.ant-radio-group-rtl]': `dir === 'rtl'`
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: NzRadioService }, { type: i2.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzDisabled: [{
                type: Input
            }], nzButtonStyle: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzName: [{
                type: Input
            }] } });

class NzRadioComponent {
    constructor(ngZone, elementRef, cdr, focusMonitor, directionality, nzRadioService, nzRadioButtonDirective) {
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.focusMonitor = focusMonitor;
        this.directionality = directionality;
        this.nzRadioService = nzRadioService;
        this.nzRadioButtonDirective = nzRadioButtonDirective;
        this.isNgModel = false;
        this.destroy$ = new Subject();
        this.isChecked = false;
        this.name = null;
        this.isRadioButton = !!this.nzRadioButtonDirective;
        this.onChange = () => { };
        this.onTouched = () => { };
        this.nzValue = null;
        this.nzDisabled = false;
        this.nzAutoFocus = false;
        this.dir = 'ltr';
    }
    focus() {
        this.focusMonitor.focusVia(this.inputElement, 'keyboard');
    }
    blur() {
        this.inputElement.nativeElement.blur();
    }
    setDisabledState(disabled) {
        this.nzDisabled = disabled;
        this.cdr.markForCheck();
    }
    writeValue(value) {
        this.isChecked = value;
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.isNgModel = true;
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    ngOnInit() {
        if (this.nzRadioService) {
            this.nzRadioService.name$.pipe(takeUntil(this.destroy$)).subscribe(name => {
                this.name = name;
                this.cdr.markForCheck();
            });
            this.nzRadioService.disabled$.pipe(takeUntil(this.destroy$)).subscribe(disabled => {
                this.nzDisabled = disabled;
                this.cdr.markForCheck();
            });
            this.nzRadioService.selected$.pipe(takeUntil(this.destroy$)).subscribe(value => {
                this.isChecked = this.nzValue === value;
                this.cdr.markForCheck();
            });
        }
        this.focusMonitor
            .monitor(this.elementRef, true)
            .pipe(takeUntil(this.destroy$))
            .subscribe(focusOrigin => {
            if (!focusOrigin) {
                Promise.resolve().then(() => this.onTouched());
                if (this.nzRadioService) {
                    this.nzRadioService.touch();
                }
            }
        });
        this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.setupClickListener();
    }
    ngAfterViewInit() {
        if (this.nzAutoFocus) {
            this.focus();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.focusMonitor.stopMonitoring(this.elementRef);
    }
    setupClickListener() {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.elementRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                /** prevent label click triggered twice. **/
                event.stopPropagation();
                event.preventDefault();
                if (this.nzDisabled || this.isChecked) {
                    return;
                }
                this.ngZone.run(() => {
                    if (this.nzRadioService) {
                        this.nzRadioService.select(this.nzValue);
                    }
                    if (this.isNgModel) {
                        this.isChecked = true;
                        this.onChange(true);
                    }
                    this.cdr.markForCheck();
                });
            });
        });
    }
}
NzRadioComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.FocusMonitor }, { token: i2.Directionality, optional: true }, { token: NzRadioService, optional: true }, { token: NzRadioButtonDirective, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzRadioComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzRadioComponent, selector: "[nz-radio],[nz-radio-button]", inputs: { nzValue: "nzValue", nzDisabled: "nzDisabled", nzAutoFocus: "nzAutoFocus" }, host: { properties: { "class.ant-radio-wrapper": "!isRadioButton", "class.ant-radio-button-wrapper": "isRadioButton", "class.ant-radio-wrapper-checked": "isChecked && !isRadioButton", "class.ant-radio-button-wrapper-checked": "isChecked && isRadioButton", "class.ant-radio-wrapper-disabled": "nzDisabled && !isRadioButton", "class.ant-radio-button-wrapper-disabled": "nzDisabled && isRadioButton", "class.ant-radio-wrapper-rtl": "!isRadioButton && dir === 'rtl'", "class.ant-radio-button-wrapper-rtl": "isRadioButton && dir === 'rtl'" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NzRadioComponent),
            multi: true
        }
    ], viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["inputElement"], descendants: true }], exportAs: ["nzRadio"], ngImport: i0, template: `
    <span
      [class.ant-radio]="!isRadioButton"
      [class.ant-radio-checked]="isChecked && !isRadioButton"
      [class.ant-radio-disabled]="nzDisabled && !isRadioButton"
      [class.ant-radio-button]="isRadioButton"
      [class.ant-radio-button-checked]="isChecked && isRadioButton"
      [class.ant-radio-button-disabled]="nzDisabled && isRadioButton"
    >
      <input
        #inputElement
        type="radio"
        [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
        [class.ant-radio-input]="!isRadioButton"
        [class.ant-radio-button-input]="isRadioButton"
        [disabled]="nzDisabled"
        [checked]="isChecked"
        [attr.name]="name"
      />
      <span [class.ant-radio-inner]="!isRadioButton" [class.ant-radio-button-inner]="isRadioButton"></span>
    </span>
    <span><ng-content></ng-content></span>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzRadioComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzRadioComponent.prototype, "nzAutoFocus", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-radio],[nz-radio-button]',
                    exportAs: 'nzRadio',
                    preserveWhitespaces: false,
                    template: `
    <span
      [class.ant-radio]="!isRadioButton"
      [class.ant-radio-checked]="isChecked && !isRadioButton"
      [class.ant-radio-disabled]="nzDisabled && !isRadioButton"
      [class.ant-radio-button]="isRadioButton"
      [class.ant-radio-button-checked]="isChecked && isRadioButton"
      [class.ant-radio-button-disabled]="nzDisabled && isRadioButton"
    >
      <input
        #inputElement
        type="radio"
        [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
        [class.ant-radio-input]="!isRadioButton"
        [class.ant-radio-button-input]="isRadioButton"
        [disabled]="nzDisabled"
        [checked]="isChecked"
        [attr.name]="name"
      />
      <span [class.ant-radio-inner]="!isRadioButton" [class.ant-radio-button-inner]="isRadioButton"></span>
    </span>
    <span><ng-content></ng-content></span>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzRadioComponent),
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
                        '[class.ant-radio-wrapper-rtl]': `!isRadioButton && dir === 'rtl'`,
                        '[class.ant-radio-button-wrapper-rtl]': `isRadioButton && dir === 'rtl'`
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.FocusMonitor }, { type: i2.Directionality, decorators: [{
                        type: Optional
                    }] }, { type: NzRadioService, decorators: [{
                        type: Optional
                    }] }, { type: NzRadioButtonDirective, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { inputElement: [{
                type: ViewChild,
                args: ['inputElement', { static: false }]
            }], nzValue: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzAutoFocus: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRadioModule {
}
NzRadioModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzRadioModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioModule, declarations: [NzRadioComponent, NzRadioButtonDirective, NzRadioGroupComponent], imports: [BidiModule, CommonModule, FormsModule], exports: [NzRadioComponent, NzRadioButtonDirective, NzRadioGroupComponent] });
NzRadioModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioModule, imports: [[BidiModule, CommonModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, FormsModule],
                    exports: [NzRadioComponent, NzRadioButtonDirective, NzRadioGroupComponent],
                    declarations: [NzRadioComponent, NzRadioButtonDirective, NzRadioGroupComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzRadioButtonDirective, NzRadioComponent, NzRadioGroupComponent, NzRadioModule, NzRadioService };
//# sourceMappingURL=ng-zorro-antd-radio.mjs.map
