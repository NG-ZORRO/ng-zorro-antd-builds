import * as i0 from '@angular/core';
import { LOCALE_ID, Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, Input, Optional, EventEmitter, Output, NgModule } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i1$1 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i1 from '@angular/common';
import { getLocaleNumberSymbol, NumberSymbol, CommonModule } from '@angular/common';
import * as i3 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i1$2 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i4 from 'ng-zorro-antd/core/pipe';
import { NzPipesModule } from 'ng-zorro-antd/core/pipe';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzStatisticNumberComponent {
    constructor(locale_id) {
        this.locale_id = locale_id;
        this.displayInt = '';
        this.displayDecimal = '';
    }
    ngOnChanges() {
        this.formatNumber();
    }
    formatNumber() {
        const decimalSeparator = typeof this.nzValue === 'number' ? '.' : getLocaleNumberSymbol(this.locale_id, NumberSymbol.Decimal);
        const value = String(this.nzValue);
        const [int, decimal] = value.split(decimalSeparator);
        this.displayInt = int;
        this.displayDecimal = decimal ? `${decimalSeparator}${decimal}` : '';
    }
}
NzStatisticNumberComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStatisticNumberComponent, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Component });
NzStatisticNumberComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzStatisticNumberComponent, selector: "nz-statistic-number", inputs: { nzValue: "nzValue", nzValueTemplate: "nzValueTemplate" }, exportAs: ["nzStatisticNumber"], usesOnChanges: true, ngImport: i0, template: `
    <span class="ant-statistic-content-value">
      <ng-container
        *ngIf="nzValueTemplate"
        [ngTemplateOutlet]="nzValueTemplate"
        [ngTemplateOutletContext]="{ $implicit: nzValue }"
      ></ng-container>
      <ng-container *ngIf="!nzValueTemplate">
        <span *ngIf="displayInt" class="ant-statistic-content-value-int">{{ displayInt }}</span>
        <span *ngIf="displayDecimal" class="ant-statistic-content-value-decimal">{{ displayDecimal }}</span>
      </ng-container>
    </span>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStatisticNumberComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    selector: 'nz-statistic-number',
                    exportAs: 'nzStatisticNumber',
                    template: `
    <span class="ant-statistic-content-value">
      <ng-container
        *ngIf="nzValueTemplate"
        [ngTemplateOutlet]="nzValueTemplate"
        [ngTemplateOutletContext]="{ $implicit: nzValue }"
      ></ng-container>
      <ng-container *ngIf="!nzValueTemplate">
        <span *ngIf="displayInt" class="ant-statistic-content-value-int">{{ displayInt }}</span>
        <span *ngIf="displayDecimal" class="ant-statistic-content-value-decimal">{{ displayDecimal }}</span>
      </ng-container>
    </span>
  `
                }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [LOCALE_ID]
                    }] }];
    }, propDecorators: { nzValue: [{
                type: Input
            }], nzValueTemplate: [{
                type: Input
            }] } });

class NzStatisticComponent {
    constructor(cdr, directionality) {
        this.cdr = cdr;
        this.directionality = directionality;
        this.nzValueStyle = {};
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        var _a;
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
}
NzStatisticComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStatisticComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzStatisticComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzStatisticComponent, selector: "nz-statistic", inputs: { nzPrefix: "nzPrefix", nzSuffix: "nzSuffix", nzTitle: "nzTitle", nzValue: "nzValue", nzValueStyle: "nzValueStyle", nzValueTemplate: "nzValueTemplate" }, exportAs: ["nzStatistic"], ngImport: i0, template: `
    <div class="ant-statistic" [class.ant-statistic-rtl]="dir === 'rtl'">
      <div class="ant-statistic-title">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </div>
      <div class="ant-statistic-content" [ngStyle]="nzValueStyle">
        <span *ngIf="nzPrefix" class="ant-statistic-content-prefix">
          <ng-container *nzStringTemplateOutlet="nzPrefix">{{ nzPrefix }}</ng-container>
        </span>
        <nz-statistic-number [nzValue]="nzValue" [nzValueTemplate]="nzValueTemplate"></nz-statistic-number>
        <span *ngIf="nzSuffix" class="ant-statistic-content-suffix">
          <ng-container *nzStringTemplateOutlet="nzSuffix">{{ nzSuffix }}</ng-container>
        </span>
      </div>
    </div>
  `, isInline: true, components: [{ type: NzStatisticNumberComponent, selector: "nz-statistic-number", inputs: ["nzValue", "nzValueTemplate"], exportAs: ["nzStatisticNumber"] }], directives: [{ type: i3.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStatisticComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-statistic',
                    exportAs: 'nzStatistic',
                    template: `
    <div class="ant-statistic" [class.ant-statistic-rtl]="dir === 'rtl'">
      <div class="ant-statistic-title">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </div>
      <div class="ant-statistic-content" [ngStyle]="nzValueStyle">
        <span *ngIf="nzPrefix" class="ant-statistic-content-prefix">
          <ng-container *nzStringTemplateOutlet="nzPrefix">{{ nzPrefix }}</ng-container>
        </span>
        <nz-statistic-number [nzValue]="nzValue" [nzValueTemplate]="nzValueTemplate"></nz-statistic-number>
        <span *ngIf="nzSuffix" class="ant-statistic-content-suffix">
          <ng-container *nzStringTemplateOutlet="nzSuffix">{{ nzSuffix }}</ng-container>
        </span>
      </div>
    </div>
  `
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1$1.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzPrefix: [{
                type: Input
            }], nzSuffix: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzValue: [{
                type: Input
            }], nzValueStyle: [{
                type: Input
            }], nzValueTemplate: [{
                type: Input
            }] } });

const REFRESH_INTERVAL = 1000 / 30;
class NzCountdownComponent extends NzStatisticComponent {
    constructor(cdr, ngZone, platform, directionality) {
        super(cdr, directionality);
        this.ngZone = ngZone;
        this.platform = platform;
        this.nzFormat = 'HH:mm:ss';
        this.nzCountdownFinish = new EventEmitter();
        this.target = 0;
    }
    ngOnChanges(changes) {
        if (changes.nzValue) {
            this.target = Number(changes.nzValue.currentValue);
            if (!changes.nzValue.isFirstChange()) {
                this.syncTimer();
            }
        }
    }
    ngOnInit() {
        super.ngOnInit();
        this.syncTimer();
    }
    ngOnDestroy() {
        this.stopTimer();
    }
    syncTimer() {
        if (this.target >= Date.now()) {
            this.startTimer();
        }
        else {
            this.stopTimer();
        }
    }
    startTimer() {
        if (this.platform.isBrowser) {
            this.ngZone.runOutsideAngular(() => {
                this.stopTimer();
                this.updater_ = interval(REFRESH_INTERVAL).subscribe(() => {
                    this.updateValue();
                    this.cdr.detectChanges();
                });
            });
        }
    }
    stopTimer() {
        if (this.updater_) {
            this.updater_.unsubscribe();
            this.updater_ = null;
        }
    }
    /**
     * Update time that should be displayed on the screen.
     */
    updateValue() {
        this.diff = Math.max(this.target - Date.now(), 0);
        if (this.diff === 0) {
            this.stopTimer();
            if (this.nzCountdownFinish.observers.length) {
                this.ngZone.run(() => this.nzCountdownFinish.emit());
            }
        }
    }
}
NzCountdownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCountdownComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i1$2.Platform }, { token: i1$1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzCountdownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCountdownComponent, selector: "nz-countdown", inputs: { nzFormat: "nzFormat" }, outputs: { nzCountdownFinish: "nzCountdownFinish" }, exportAs: ["nzCountdown"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
    <nz-statistic
      [nzValue]="diff"
      [nzValueStyle]="nzValueStyle"
      [nzValueTemplate]="nzValueTemplate || countDownTpl"
      [nzTitle]="nzTitle"
      [nzPrefix]="nzPrefix"
      [nzSuffix]="nzSuffix"
    ></nz-statistic>

    <ng-template #countDownTpl>{{ diff | nzTimeRange: nzFormat }}</ng-template>
  `, isInline: true, components: [{ type: NzStatisticComponent, selector: "nz-statistic", inputs: ["nzPrefix", "nzSuffix", "nzTitle", "nzValue", "nzValueStyle", "nzValueTemplate"], exportAs: ["nzStatistic"] }], pipes: { "nzTimeRange": i4.NzTimeRangePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCountdownComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-countdown',
                    exportAs: 'nzCountdown',
                    template: `
    <nz-statistic
      [nzValue]="diff"
      [nzValueStyle]="nzValueStyle"
      [nzValueTemplate]="nzValueTemplate || countDownTpl"
      [nzTitle]="nzTitle"
      [nzPrefix]="nzPrefix"
      [nzSuffix]="nzSuffix"
    ></nz-statistic>

    <ng-template #countDownTpl>{{ diff | nzTimeRange: nzFormat }}</ng-template>
  `
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i1$2.Platform }, { type: i1$1.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzFormat: [{
                type: Input
            }], nzCountdownFinish: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzStatisticModule {
}
NzStatisticModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStatisticModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzStatisticModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStatisticModule, declarations: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent], imports: [BidiModule, CommonModule, PlatformModule, NzOutletModule, NzPipesModule], exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent] });
NzStatisticModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStatisticModule, imports: [[BidiModule, CommonModule, PlatformModule, NzOutletModule, NzPipesModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStatisticModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, PlatformModule, NzOutletModule, NzPipesModule],
                    declarations: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent],
                    exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCountdownComponent, NzStatisticComponent, NzStatisticModule, NzStatisticNumberComponent };
//# sourceMappingURL=ng-zorro-antd-statistic.mjs.map
