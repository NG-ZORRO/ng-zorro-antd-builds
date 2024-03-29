import { __decorate } from 'tslib';
import * as i8 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Directive, Host, Optional, Input, Output, ElementRef, Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, ViewChildren, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import * as i2 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzTooltipBaseDirective, NzToolTipComponent, NzToolTipModule } from 'ng-zorro-antd/tooltip';
import * as i1 from 'ng-zorro-antd/core/no-animation';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import * as i3 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i4 from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as i5 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import * as i6 from 'ng-zorro-antd/core/overlay';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import * as i7 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import * as i9 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i10 from 'ng-zorro-antd/core/transition-patch';
import * as i11 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i12 from 'ng-zorro-antd/core/wave';
import * as i13 from 'ng-zorro-antd/i18n';
import { NzI18nModule } from 'ng-zorro-antd/i18n';

const NZ_CONFIG_MODULE_NAME = 'popconfirm';
class NzPopconfirmDirective extends NzTooltipBaseDirective {
    constructor(elementRef, hostView, resolver, renderer, noAnimation, nzConfigService) {
        super(elementRef, hostView, resolver, renderer, noAnimation, nzConfigService);
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.trigger = 'click';
        this.placement = 'top';
        this.nzCondition = false;
        this.nzPopconfirmShowArrow = true;
        this.nzPopconfirmBackdrop = false;
        this.nzAutofocus = null;
        this.nzOnCancel = new EventEmitter();
        this.nzOnConfirm = new EventEmitter();
        this.componentRef = this.hostView.createComponent(NzPopconfirmComponent);
    }
    getProxyPropertyMap() {
        return Object.assign({ nzOkText: ['nzOkText', () => this.nzOkText], nzOkType: ['nzOkType', () => this.nzOkType], nzOkDanger: ['nzOkDanger', () => this.nzOkDanger], nzCancelText: ['nzCancelText', () => this.nzCancelText], nzCondition: ['nzCondition', () => this.nzCondition], nzIcon: ['nzIcon', () => this.nzIcon], nzPopconfirmShowArrow: ['nzPopconfirmShowArrow', () => this.nzPopconfirmShowArrow], nzPopconfirmBackdrop: ['nzBackdrop', () => this.nzPopconfirmBackdrop], nzAutoFocus: ['nzAutoFocus', () => this.nzAutofocus] }, super.getProxyPropertyMap());
    }
    /**
     * @override
     */
    createComponent() {
        super.createComponent();
        this.component.nzOnCancel.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.nzOnCancel.emit();
        });
        this.component.nzOnConfirm.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.nzOnConfirm.emit();
        });
    }
}
NzPopconfirmDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmDirective, deps: [{ token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }, { token: i0.Renderer2 }, { token: i1.NzNoAnimationDirective, host: true, optional: true }, { token: i2.NzConfigService }], target: i0.ɵɵFactoryTarget.Directive });
NzPopconfirmDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzPopconfirmDirective, selector: "[nz-popconfirm]", inputs: { arrowPointAtCenter: ["nzPopconfirmArrowPointAtCenter", "arrowPointAtCenter"], title: ["nzPopconfirmTitle", "title"], directiveTitle: ["nz-popconfirm", "directiveTitle"], trigger: ["nzPopconfirmTrigger", "trigger"], placement: ["nzPopconfirmPlacement", "placement"], origin: ["nzPopconfirmOrigin", "origin"], mouseEnterDelay: ["nzPopconfirmMouseEnterDelay", "mouseEnterDelay"], mouseLeaveDelay: ["nzPopconfirmMouseLeaveDelay", "mouseLeaveDelay"], overlayClassName: ["nzPopconfirmOverlayClassName", "overlayClassName"], overlayStyle: ["nzPopconfirmOverlayStyle", "overlayStyle"], visible: ["nzPopconfirmVisible", "visible"], nzOkText: "nzOkText", nzOkType: "nzOkType", nzOkDanger: "nzOkDanger", nzCancelText: "nzCancelText", nzIcon: "nzIcon", nzCondition: "nzCondition", nzPopconfirmShowArrow: "nzPopconfirmShowArrow", nzPopconfirmBackdrop: "nzPopconfirmBackdrop", nzAutofocus: "nzAutofocus" }, outputs: { nzOnCancel: "nzOnCancel", nzOnConfirm: "nzOnConfirm" }, host: { properties: { "class.ant-popover-open": "visible" } }, exportAs: ["nzPopconfirm"], usesInheritance: true, ngImport: i0 });
__decorate([
    InputBoolean()
], NzPopconfirmDirective.prototype, "arrowPointAtCenter", void 0);
__decorate([
    InputBoolean()
], NzPopconfirmDirective.prototype, "nzCondition", void 0);
__decorate([
    InputBoolean()
], NzPopconfirmDirective.prototype, "nzPopconfirmShowArrow", void 0);
__decorate([
    WithConfig()
], NzPopconfirmDirective.prototype, "nzPopconfirmBackdrop", void 0);
__decorate([
    WithConfig()
], NzPopconfirmDirective.prototype, "nzAutofocus", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-popconfirm]',
                    exportAs: 'nzPopconfirm',
                    host: {
                        '[class.ant-popover-open]': 'visible'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }, { type: i0.Renderer2 }, { type: i1.NzNoAnimationDirective, decorators: [{
                        type: Host
                    }, {
                        type: Optional
                    }] }, { type: i2.NzConfigService }];
    }, propDecorators: { arrowPointAtCenter: [{
                type: Input,
                args: ['nzPopconfirmArrowPointAtCenter']
            }], title: [{
                type: Input,
                args: ['nzPopconfirmTitle']
            }], directiveTitle: [{
                type: Input,
                args: ['nz-popconfirm']
            }], trigger: [{
                type: Input,
                args: ['nzPopconfirmTrigger']
            }], placement: [{
                type: Input,
                args: ['nzPopconfirmPlacement']
            }], origin: [{
                type: Input,
                args: ['nzPopconfirmOrigin']
            }], mouseEnterDelay: [{
                type: Input,
                args: ['nzPopconfirmMouseEnterDelay']
            }], mouseLeaveDelay: [{
                type: Input,
                args: ['nzPopconfirmMouseLeaveDelay']
            }], overlayClassName: [{
                type: Input,
                args: ['nzPopconfirmOverlayClassName']
            }], overlayStyle: [{
                type: Input,
                args: ['nzPopconfirmOverlayStyle']
            }], visible: [{
                type: Input,
                args: ['nzPopconfirmVisible']
            }], nzOkText: [{
                type: Input
            }], nzOkType: [{
                type: Input
            }], nzOkDanger: [{
                type: Input
            }], nzCancelText: [{
                type: Input
            }], nzIcon: [{
                type: Input
            }], nzCondition: [{
                type: Input
            }], nzPopconfirmShowArrow: [{
                type: Input
            }], nzPopconfirmBackdrop: [{
                type: Input
            }], nzAutofocus: [{
                type: Input
            }], nzOnCancel: [{
                type: Output
            }], nzOnConfirm: [{
                type: Output
            }] } });
class NzPopconfirmComponent extends NzToolTipComponent {
    constructor(cdr, elementRef, directionality, document, noAnimation) {
        super(cdr, directionality, noAnimation);
        this.elementRef = elementRef;
        this.nzCondition = false;
        this.nzPopconfirmShowArrow = true;
        this.nzOkType = 'primary';
        this.nzOkDanger = false;
        this.nzAutoFocus = null;
        this.nzOnCancel = new Subject();
        this.nzOnConfirm = new Subject();
        this._trigger = 'click';
        this.elementFocusedBeforeModalWasOpened = null;
        this._prefix = 'ant-popover';
        this.document = document;
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.nzOnCancel.complete();
        this.nzOnConfirm.complete();
    }
    /**
     * @override
     */
    show() {
        if (!this.nzCondition) {
            this.capturePreviouslyFocusedElement();
            super.show();
        }
        else {
            this.onConfirm();
        }
    }
    hide() {
        super.hide();
        this.restoreFocus();
    }
    onCancel() {
        this.nzOnCancel.next();
        super.hide();
    }
    onConfirm() {
        this.nzOnConfirm.next();
        super.hide();
    }
    capturePreviouslyFocusedElement() {
        if (this.document) {
            this.elementFocusedBeforeModalWasOpened = this.document.activeElement;
        }
    }
    restoreFocus() {
        const toFocus = this.elementFocusedBeforeModalWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            const activeElement = this.document.activeElement;
            const element = this.elementRef.nativeElement;
            if (!activeElement ||
                activeElement === this.document.body ||
                activeElement === element ||
                element.contains(activeElement)) {
                toFocus.focus();
            }
        }
    }
}
NzPopconfirmComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i3.Directionality, optional: true }, { token: DOCUMENT, optional: true }, { token: i1.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzPopconfirmComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzPopconfirmComponent, selector: "nz-popconfirm", viewQueries: [{ propertyName: "okBtn", predicate: ["okBtn"], descendants: true, read: ElementRef }, { propertyName: "cancelBtn", predicate: ["cancelBtn"], descendants: true, read: ElementRef }], exportAs: ["nzPopconfirmComponent"], usesInheritance: true, ngImport: i0, template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPush]="true"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
    >
      <div
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="nzAutoFocus !== null"
        class="ant-popover"
        [ngClass]="_classMap"
        [class.ant-popover-rtl]="dir === 'rtl'"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-popover-content">
          <div class="ant-popover-arrow" *ngIf="nzPopconfirmShowArrow">
            <span class="ant-popover-arrow-content"></span>
          </div>
          <div class="ant-popover-inner">
            <div>
              <div class="ant-popover-inner-content">
                <div class="ant-popover-message">
                  <ng-container *nzStringTemplateOutlet="nzTitle">
                    <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
                      <i nz-icon [nzType]="icon || 'exclamation-circle'" nzTheme="fill"></i>
                    </ng-container>
                    <div class="ant-popover-message-title">{{ nzTitle }}</div>
                  </ng-container>
                </div>
                <div class="ant-popover-buttons">
                  <button
                    nz-button
                    #cancelBtn
                    [nzSize]="'small'"
                    (click)="onCancel()"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'cancel' || null"
                  >
                    <ng-container *ngIf="nzCancelText">{{ nzCancelText }}</ng-container>
                    <ng-container *ngIf="!nzCancelText">{{ 'Modal.cancelText' | nzI18n }}</ng-container>
                  </button>
                  <button
                    nz-button
                    #okBtn
                    [nzSize]="'small'"
                    [nzType]="nzOkType !== 'danger' ? nzOkType : 'primary'"
                    [nzDanger]="nzOkDanger || nzOkType === 'danger'"
                    (click)="onConfirm()"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'ok' || null"
                  >
                    <ng-container *ngIf="nzOkText">{{ nzOkText }}</ng-container>
                    <ng-container *ngIf="!nzOkText">{{ 'Modal.okText' | nzI18n }}</ng-container>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `, isInline: true, components: [{ type: i4.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }], directives: [{ type: i5.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { type: i6.NzConnectedOverlayDirective, selector: "[cdkConnectedOverlay][nzConnectedOverlay]", inputs: ["nzArrowPointAtCenter"], exportAs: ["nzConnectedOverlay"] }, { type: i7.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { type: i8.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i8.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i9.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i10.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i11.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i12.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }], pipes: { "nzI18n": i13.NzI18nPipe }, animations: [zoomBigMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-popconfirm',
                    exportAs: 'nzPopconfirmComponent',
                    preserveWhitespaces: false,
                    animations: [zoomBigMotion],
                    template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPush]="true"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
    >
      <div
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="nzAutoFocus !== null"
        class="ant-popover"
        [ngClass]="_classMap"
        [class.ant-popover-rtl]="dir === 'rtl'"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-popover-content">
          <div class="ant-popover-arrow" *ngIf="nzPopconfirmShowArrow">
            <span class="ant-popover-arrow-content"></span>
          </div>
          <div class="ant-popover-inner">
            <div>
              <div class="ant-popover-inner-content">
                <div class="ant-popover-message">
                  <ng-container *nzStringTemplateOutlet="nzTitle">
                    <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
                      <i nz-icon [nzType]="icon || 'exclamation-circle'" nzTheme="fill"></i>
                    </ng-container>
                    <div class="ant-popover-message-title">{{ nzTitle }}</div>
                  </ng-container>
                </div>
                <div class="ant-popover-buttons">
                  <button
                    nz-button
                    #cancelBtn
                    [nzSize]="'small'"
                    (click)="onCancel()"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'cancel' || null"
                  >
                    <ng-container *ngIf="nzCancelText">{{ nzCancelText }}</ng-container>
                    <ng-container *ngIf="!nzCancelText">{{ 'Modal.cancelText' | nzI18n }}</ng-container>
                  </button>
                  <button
                    nz-button
                    #okBtn
                    [nzSize]="'small'"
                    [nzType]="nzOkType !== 'danger' ? nzOkType : 'primary'"
                    [nzDanger]="nzOkDanger || nzOkType === 'danger'"
                    (click)="onConfirm()"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'ok' || null"
                  >
                    <ng-container *ngIf="nzOkText">{{ nzOkText }}</ng-container>
                    <ng-container *ngIf="!nzOkText">{{ 'Modal.okText' | nzI18n }}</ng-container>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i3.Directionality, decorators: [{
                        type: Optional
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: i1.NzNoAnimationDirective, decorators: [{
                        type: Host
                    }, {
                        type: Optional
                    }] }];
    }, propDecorators: { okBtn: [{
                type: ViewChildren,
                args: ['okBtn', { read: ElementRef }]
            }], cancelBtn: [{
                type: ViewChildren,
                args: ['cancelBtn', { read: ElementRef }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzPopconfirmModule {
}
NzPopconfirmModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzPopconfirmModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmModule, declarations: [NzPopconfirmComponent, NzPopconfirmDirective], imports: [BidiModule,
        CommonModule,
        NzButtonModule,
        OverlayModule,
        NzI18nModule,
        NzIconModule,
        NzOutletModule,
        NzOverlayModule,
        NzNoAnimationModule,
        NzToolTipModule,
        A11yModule], exports: [NzPopconfirmComponent, NzPopconfirmDirective] });
NzPopconfirmModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmModule, imports: [[
            BidiModule,
            CommonModule,
            NzButtonModule,
            OverlayModule,
            NzI18nModule,
            NzIconModule,
            NzOutletModule,
            NzOverlayModule,
            NzNoAnimationModule,
            NzToolTipModule,
            A11yModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzPopconfirmComponent, NzPopconfirmDirective],
                    exports: [NzPopconfirmComponent, NzPopconfirmDirective],
                    entryComponents: [NzPopconfirmComponent],
                    imports: [
                        BidiModule,
                        CommonModule,
                        NzButtonModule,
                        OverlayModule,
                        NzI18nModule,
                        NzIconModule,
                        NzOutletModule,
                        NzOverlayModule,
                        NzNoAnimationModule,
                        NzToolTipModule,
                        A11yModule
                    ]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzPopconfirmComponent, NzPopconfirmDirective, NzPopconfirmModule };
//# sourceMappingURL=ng-zorro-antd-popconfirm.mjs.map
