import { __decorate } from 'tslib';
import { LEFT_ARROW, RIGHT_ARROW, SPACE, ENTER } from '@angular/cdk/keycodes';
import * as i0 from '@angular/core';
import { forwardRef, Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, ViewChild, Input, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i2 from '@angular/cdk/a11y';
import * as i3 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i4 from 'ng-zorro-antd/core/wave';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i6 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i7 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

const NZ_CONFIG_MODULE_NAME = 'switch';
class NzSwitchComponent {
    constructor(nzConfigService, host, ngZone, cdr, focusMonitor, directionality) {
        this.nzConfigService = nzConfigService;
        this.host = host;
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.focusMonitor = focusMonitor;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.isChecked = false;
        this.onChange = () => { };
        this.onTouched = () => { };
        this.nzLoading = false;
        this.nzDisabled = false;
        this.nzControl = false;
        this.nzCheckedChildren = null;
        this.nzUnCheckedChildren = null;
        this.nzSize = 'default';
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    updateValue(value) {
        if (this.isChecked !== value) {
            this.isChecked = value;
            this.onChange(this.isChecked);
        }
    }
    focus() {
        this.focusMonitor.focusVia(this.switchElement.nativeElement, 'keyboard');
    }
    blur() {
        this.switchElement.nativeElement.blur();
    }
    ngOnInit() {
        this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.host.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                event.preventDefault();
                if (this.nzControl || this.nzDisabled || this.nzLoading) {
                    return;
                }
                this.ngZone.run(() => {
                    this.updateValue(!this.isChecked);
                    this.cdr.markForCheck();
                });
            });
            fromEvent(this.switchElement.nativeElement, 'keydown')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                if (this.nzControl || this.nzDisabled || this.nzLoading) {
                    return;
                }
                const { keyCode } = event;
                if (keyCode !== LEFT_ARROW && keyCode !== RIGHT_ARROW && keyCode !== SPACE && keyCode !== ENTER) {
                    return;
                }
                event.preventDefault();
                this.ngZone.run(() => {
                    if (keyCode === LEFT_ARROW) {
                        this.updateValue(false);
                    }
                    else if (keyCode === RIGHT_ARROW) {
                        this.updateValue(true);
                    }
                    else if (keyCode === SPACE || keyCode === ENTER) {
                        this.updateValue(!this.isChecked);
                    }
                    this.cdr.markForCheck();
                });
            });
        });
    }
    ngAfterViewInit() {
        this.focusMonitor
            .monitor(this.switchElement.nativeElement, true)
            .pipe(takeUntil(this.destroy$))
            .subscribe(focusOrigin => {
            if (!focusOrigin) {
                /** https://github.com/angular/angular/issues/17793 **/
                Promise.resolve().then(() => this.onTouched());
            }
        });
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.switchElement.nativeElement);
        this.destroy$.next();
        this.destroy$.complete();
    }
    writeValue(value) {
        this.isChecked = value;
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
NzSwitchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSwitchComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i2.FocusMonitor }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzSwitchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSwitchComponent, selector: "nz-switch", inputs: { nzLoading: "nzLoading", nzDisabled: "nzDisabled", nzControl: "nzControl", nzCheckedChildren: "nzCheckedChildren", nzUnCheckedChildren: "nzUnCheckedChildren", nzSize: "nzSize" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NzSwitchComponent),
            multi: true
        }
    ], viewQueries: [{ propertyName: "switchElement", first: true, predicate: ["switchElement"], descendants: true, static: true }], exportAs: ["nzSwitch"], ngImport: i0, template: `
    <button
      nz-wave
      type="button"
      class="ant-switch"
      #switchElement
      [disabled]="nzDisabled"
      [class.ant-switch-checked]="isChecked"
      [class.ant-switch-loading]="nzLoading"
      [class.ant-switch-disabled]="nzDisabled"
      [class.ant-switch-small]="nzSize === 'small'"
      [class.ant-switch-rtl]="dir === 'rtl'"
      [nzWaveExtraNode]="true"
    >
      <span class="ant-switch-handle">
        <i *ngIf="nzLoading" nz-icon nzType="loading" class="ant-switch-loading-icon"></i>
      </span>
      <span class="ant-switch-inner">
        <ng-container *ngIf="isChecked; else uncheckTemplate">
          <ng-container *nzStringTemplateOutlet="nzCheckedChildren">{{ nzCheckedChildren }}</ng-container>
        </ng-container>
        <ng-template #uncheckTemplate>
          <ng-container *nzStringTemplateOutlet="nzUnCheckedChildren">{{ nzUnCheckedChildren }}</ng-container>
        </ng-template>
      </span>
      <div class="ant-click-animating-node"></div>
    </button>
  `, isInline: true, directives: [{ type: i4.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i7.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzSwitchComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean()
], NzSwitchComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzSwitchComponent.prototype, "nzControl", void 0);
__decorate([
    WithConfig()
], NzSwitchComponent.prototype, "nzSize", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSwitchComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-switch',
                    exportAs: 'nzSwitch',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzSwitchComponent),
                            multi: true
                        }
                    ],
                    template: `
    <button
      nz-wave
      type="button"
      class="ant-switch"
      #switchElement
      [disabled]="nzDisabled"
      [class.ant-switch-checked]="isChecked"
      [class.ant-switch-loading]="nzLoading"
      [class.ant-switch-disabled]="nzDisabled"
      [class.ant-switch-small]="nzSize === 'small'"
      [class.ant-switch-rtl]="dir === 'rtl'"
      [nzWaveExtraNode]="true"
    >
      <span class="ant-switch-handle">
        <i *ngIf="nzLoading" nz-icon nzType="loading" class="ant-switch-loading-icon"></i>
      </span>
      <span class="ant-switch-inner">
        <ng-container *ngIf="isChecked; else uncheckTemplate">
          <ng-container *nzStringTemplateOutlet="nzCheckedChildren">{{ nzCheckedChildren }}</ng-container>
        </ng-container>
        <ng-template #uncheckTemplate>
          <ng-container *nzStringTemplateOutlet="nzUnCheckedChildren">{{ nzUnCheckedChildren }}</ng-container>
        </ng-template>
      </span>
      <div class="ant-click-animating-node"></div>
    </button>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i2.FocusMonitor }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { switchElement: [{
                type: ViewChild,
                args: ['switchElement', { static: true }]
            }], nzLoading: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzControl: [{
                type: Input
            }], nzCheckedChildren: [{
                type: Input
            }], nzUnCheckedChildren: [{
                type: Input
            }], nzSize: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSwitchModule {
}
NzSwitchModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSwitchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzSwitchModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSwitchModule, declarations: [NzSwitchComponent], imports: [BidiModule, CommonModule, NzWaveModule, NzIconModule, NzOutletModule], exports: [NzSwitchComponent] });
NzSwitchModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSwitchModule, imports: [[BidiModule, CommonModule, NzWaveModule, NzIconModule, NzOutletModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSwitchModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [NzSwitchComponent],
                    declarations: [NzSwitchComponent],
                    imports: [BidiModule, CommonModule, NzWaveModule, NzIconModule, NzOutletModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzSwitchComponent, NzSwitchModule };
//# sourceMappingURL=ng-zorro-antd-switch.mjs.map
