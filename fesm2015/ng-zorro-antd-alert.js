import { __decorate, __metadata } from 'tslib';
import { Directionality, BidiModule } from '@angular/cdk/bidi';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Optional, Input, Output, NgModule } from '@angular/core';
import { slideAlertMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_CONFIG_MODULE_NAME = 'alert';
class NzAlertComponent {
    constructor(nzConfigService, cdr, directionality) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzCloseText = null;
        this.nzIconType = null;
        this.nzMessage = null;
        this.nzDescription = null;
        this.nzType = 'info';
        this.nzCloseable = false;
        this.nzShowIcon = false;
        this.nzBanner = false;
        this.nzNoAnimation = false;
        this.nzOnClose = new EventEmitter();
        this.closed = false;
        this.iconTheme = 'fill';
        this.inferredIconType = 'info-circle';
        this.dir = 'ltr';
        this.isTypeSet = false;
        this.isShowIconSet = false;
        this.destroy$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    ngOnInit() {
        var _a;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    closeAlert() {
        this.closed = true;
    }
    onFadeAnimationDone() {
        if (this.closed) {
            this.nzOnClose.emit(true);
        }
    }
    ngOnChanges(changes) {
        const { nzShowIcon, nzDescription, nzType, nzBanner } = changes;
        if (nzShowIcon) {
            this.isShowIconSet = true;
        }
        if (nzType) {
            this.isTypeSet = true;
            switch (this.nzType) {
                case 'error':
                    this.inferredIconType = 'close-circle';
                    break;
                case 'success':
                    this.inferredIconType = 'check-circle';
                    break;
                case 'info':
                    this.inferredIconType = 'info-circle';
                    break;
                case 'warning':
                    this.inferredIconType = 'exclamation-circle';
                    break;
            }
        }
        if (nzDescription) {
            this.iconTheme = this.nzDescription ? 'outline' : 'fill';
        }
        if (nzBanner) {
            if (!this.isTypeSet) {
                this.nzType = 'warning';
            }
            if (!this.isShowIconSet) {
                this.nzShowIcon = true;
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzAlertComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-alert',
                exportAs: 'nzAlert',
                animations: [slideAlertMotion],
                template: `
    <div
      *ngIf="!closed"
      class="ant-alert"
      [class.ant-alert-rtl]="dir === 'rtl'"
      [class.ant-alert-success]="nzType === 'success'"
      [class.ant-alert-info]="nzType === 'info'"
      [class.ant-alert-warning]="nzType === 'warning'"
      [class.ant-alert-error]="nzType === 'error'"
      [class.ant-alert-no-icon]="!nzShowIcon"
      [class.ant-alert-banner]="nzBanner"
      [class.ant-alert-closable]="nzCloseable"
      [class.ant-alert-with-description]="!!nzDescription"
      [@.disabled]="nzNoAnimation"
      [@slideAlertMotion]
      (@slideAlertMotion.done)="onFadeAnimationDone()"
    >
      <ng-container *ngIf="nzShowIcon">
        <i nz-icon class="ant-alert-icon" [nzType]="nzIconType || inferredIconType" [nzTheme]="iconTheme"></i>
      </ng-container>
      <div class="ant-alert-content" *ngIf="nzMessage || nzDescription">
        <span class="ant-alert-message" *ngIf="nzMessage">
          <ng-container *nzStringTemplateOutlet="nzMessage">{{ nzMessage }}</ng-container>
        </span>
        <span class="ant-alert-description" *ngIf="nzDescription">
          <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
        </span>
      </div>
      <button type="button" tabindex="0" *ngIf="nzCloseable || nzCloseText" class="ant-alert-close-icon" (click)="closeAlert()">
        <ng-template #closeDefaultTemplate>
          <i nz-icon nzType="close"></i>
        </ng-template>
        <ng-container *ngIf="nzCloseText; else closeDefaultTemplate">
          <ng-container *nzStringTemplateOutlet="nzCloseText">
            <span class="ant-alert-close-text">{{ nzCloseText }}</span>
          </ng-container>
        </ng-container>
      </button>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false
            },] }
];
NzAlertComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ChangeDetectorRef },
    { type: Directionality, decorators: [{ type: Optional }] }
];
NzAlertComponent.propDecorators = {
    nzCloseText: [{ type: Input }],
    nzIconType: [{ type: Input }],
    nzMessage: [{ type: Input }],
    nzDescription: [{ type: Input }],
    nzType: [{ type: Input }],
    nzCloseable: [{ type: Input }],
    nzShowIcon: [{ type: Input }],
    nzBanner: [{ type: Input }],
    nzNoAnimation: [{ type: Input }],
    nzOnClose: [{ type: Output }]
};
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzAlertComponent.prototype, "nzCloseable", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzAlertComponent.prototype, "nzShowIcon", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzAlertComponent.prototype, "nzBanner", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzAlertComponent.prototype, "nzNoAnimation", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzAlertModule {
}
NzAlertModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzAlertComponent],
                exports: [NzAlertComponent],
                imports: [BidiModule, CommonModule, NzIconModule, NzOutletModule]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzAlertComponent, NzAlertModule };
//# sourceMappingURL=ng-zorro-antd-alert.js.map
