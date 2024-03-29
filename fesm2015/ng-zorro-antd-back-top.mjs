import { __decorate } from 'tslib';
import * as i5 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, Optional, Input, Output, NgModule } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { fadeMotion } from 'ng-zorro-antd/core/animation';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputNumber } from 'ng-zorro-antd/core/util';
import * as i2 from 'ng-zorro-antd/core/services';
import * as i3 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i4 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i6 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';

const NZ_CONFIG_MODULE_NAME = 'backTop';
class NzBackTopComponent {
    constructor(doc, nzConfigService, scrollSrv, platform, cd, zone, cdr, directionality) {
        this.doc = doc;
        this.nzConfigService = nzConfigService;
        this.scrollSrv = scrollSrv;
        this.platform = platform;
        this.cd = cd;
        this.zone = zone;
        this.cdr = cdr;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.scrollListenerDestroy$ = new Subject();
        this.destroy$ = new Subject();
        this.target = null;
        this.visible = false;
        this.dir = 'ltr';
        this.nzVisibilityHeight = 400;
        this.nzDuration = 450;
        this.nzClick = new EventEmitter();
        this.dir = this.directionality.value;
    }
    ngOnInit() {
        var _a;
        this.registerScrollEvent();
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    clickBackTop() {
        this.scrollSrv.scrollTo(this.getTarget(), 0, { duration: this.nzDuration });
        this.nzClick.emit(true);
    }
    getTarget() {
        return this.target || window;
    }
    handleScroll() {
        if (this.visible === this.scrollSrv.getScroll(this.getTarget()) > this.nzVisibilityHeight) {
            return;
        }
        this.visible = !this.visible;
        this.cd.detectChanges();
    }
    registerScrollEvent() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.scrollListenerDestroy$.next();
        this.handleScroll();
        this.zone.runOutsideAngular(() => {
            fromEvent(this.getTarget(), 'scroll')
                .pipe(debounceTime(50), takeUntil(this.scrollListenerDestroy$))
                .subscribe(() => this.handleScroll());
        });
    }
    ngOnDestroy() {
        this.scrollListenerDestroy$.next();
        this.scrollListenerDestroy$.complete();
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngOnChanges(changes) {
        const { nzTarget } = changes;
        if (nzTarget) {
            this.target = typeof this.nzTarget === 'string' ? this.doc.querySelector(this.nzTarget) : this.nzTarget;
            this.registerScrollEvent();
        }
    }
}
NzBackTopComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBackTopComponent, deps: [{ token: DOCUMENT }, { token: i1.NzConfigService }, { token: i2.NzScrollService }, { token: i3.Platform }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i4.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzBackTopComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzBackTopComponent, selector: "nz-back-top", inputs: { nzTemplate: "nzTemplate", nzVisibilityHeight: "nzVisibilityHeight", nzTarget: "nzTarget", nzDuration: "nzDuration" }, outputs: { nzClick: "nzClick" }, exportAs: ["nzBackTop"], usesOnChanges: true, ngImport: i0, template: `
    <div
      class="ant-back-top"
      [class.ant-back-top-rtl]="dir === 'rtl'"
      (click)="clickBackTop()"
      @fadeMotion
      *ngIf="visible"
    >
      <ng-template #defaultContent>
        <div class="ant-back-top-content">
          <div class="ant-back-top-icon">
            <i nz-icon nzType="vertical-align-top"></i>
          </div>
        </div>
      </ng-template>
      <ng-template [ngTemplateOutlet]="nzTemplate || defaultContent"></ng-template>
    </div>
  `, isInline: true, directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [fadeMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig(),
    InputNumber()
], NzBackTopComponent.prototype, "nzVisibilityHeight", void 0);
__decorate([
    InputNumber()
], NzBackTopComponent.prototype, "nzDuration", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBackTopComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-back-top',
                    exportAs: 'nzBackTop',
                    animations: [fadeMotion],
                    template: `
    <div
      class="ant-back-top"
      [class.ant-back-top-rtl]="dir === 'rtl'"
      (click)="clickBackTop()"
      @fadeMotion
      *ngIf="visible"
    >
      <ng-template #defaultContent>
        <div class="ant-back-top-content">
          <div class="ant-back-top-icon">
            <i nz-icon nzType="vertical-align-top"></i>
          </div>
        </div>
      </ng-template>
      <ng-template [ngTemplateOutlet]="nzTemplate || defaultContent"></ng-template>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false
                }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: i1.NzConfigService }, { type: i2.NzScrollService }, { type: i3.Platform }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i4.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzTemplate: [{
                type: Input
            }], nzVisibilityHeight: [{
                type: Input
            }], nzTarget: [{
                type: Input
            }], nzDuration: [{
                type: Input
            }], nzClick: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzBackTopModule {
}
NzBackTopModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBackTopModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzBackTopModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBackTopModule, declarations: [NzBackTopComponent], imports: [BidiModule, CommonModule, PlatformModule, NzIconModule], exports: [NzBackTopComponent] });
NzBackTopModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBackTopModule, imports: [[BidiModule, CommonModule, PlatformModule, NzIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBackTopModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzBackTopComponent],
                    exports: [NzBackTopComponent],
                    imports: [BidiModule, CommonModule, PlatformModule, NzIconModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzBackTopComponent, NzBackTopModule };
//# sourceMappingURL=ng-zorro-antd-back-top.mjs.map
