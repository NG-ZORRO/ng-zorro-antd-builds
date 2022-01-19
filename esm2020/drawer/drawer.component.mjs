import { __decorate } from "tslib";
import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Inject, Injector, Input, Optional, Output, TemplateRef, Type, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean, toCssPixel } from 'ng-zorro-antd/core/util';
import { NzDrawerContentDirective } from './drawer-content.directive';
import { NzDrawerRef } from './drawer-ref';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/cdk/overlay";
import * as i3 from "@angular/cdk/a11y";
import * as i4 from "@angular/cdk/bidi";
import * as i5 from "ng-zorro-antd/core/no-animation";
import * as i6 from "@angular/common";
import * as i7 from "ng-zorro-antd/core/outlet";
import * as i8 from "ng-zorro-antd/icon";
import * as i9 from "@angular/cdk/portal";
export const DRAWER_ANIMATE_DURATION = 300;
const NZ_CONFIG_MODULE_NAME = 'drawer';
export class NzDrawerComponent extends NzDrawerRef {
    constructor(cdr, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    document, nzConfigService, renderer, overlay, injector, changeDetectorRef, focusTrapFactory, viewContainerRef, overlayKeyboardDispatcher, directionality) {
        super();
        this.cdr = cdr;
        this.document = document;
        this.nzConfigService = nzConfigService;
        this.renderer = renderer;
        this.overlay = overlay;
        this.injector = injector;
        this.changeDetectorRef = changeDetectorRef;
        this.focusTrapFactory = focusTrapFactory;
        this.viewContainerRef = viewContainerRef;
        this.overlayKeyboardDispatcher = overlayKeyboardDispatcher;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzCloseIcon = 'close';
        this.nzClosable = true;
        this.nzMaskClosable = true;
        this.nzMask = true;
        this.nzCloseOnNavigation = true;
        this.nzNoAnimation = false;
        this.nzKeyboard = true;
        this.nzPlacement = 'right';
        this.nzMaskStyle = {};
        this.nzBodyStyle = {};
        this.nzWidth = 256;
        this.nzHeight = 256;
        this.nzZIndex = 1000;
        this.nzOffsetX = 0;
        this.nzOffsetY = 0;
        this.componentInstance = null;
        this.nzOnViewInit = new EventEmitter();
        this.nzOnClose = new EventEmitter();
        this.nzVisibleChange = new EventEmitter();
        this.destroy$ = new Subject();
        this.placementChanging = false;
        this.placementChangeTimeoutId = -1;
        this.isOpen = false;
        this.inAnimation = false;
        this.templateContext = {
            $implicit: undefined,
            drawerRef: this
        };
        this.nzAfterOpen = new Subject();
        this.nzAfterClose = new Subject();
        // from service config
        this.nzDirection = undefined;
        this.dir = 'ltr';
    }
    set nzVisible(value) {
        this.isOpen = value;
    }
    get nzVisible() {
        return this.isOpen;
    }
    get offsetTransform() {
        if (!this.isOpen || this.nzOffsetX + this.nzOffsetY === 0) {
            return null;
        }
        switch (this.nzPlacement) {
            case 'left':
                return `translateX(${this.nzOffsetX}px)`;
            case 'right':
                return `translateX(-${this.nzOffsetX}px)`;
            case 'top':
                return `translateY(${this.nzOffsetY}px)`;
            case 'bottom':
                return `translateY(-${this.nzOffsetY}px)`;
        }
    }
    get transform() {
        if (this.isOpen) {
            return null;
        }
        switch (this.nzPlacement) {
            case 'left':
                return `translateX(-100%)`;
            case 'right':
                return `translateX(100%)`;
            case 'top':
                return `translateY(-100%)`;
            case 'bottom':
                return `translateY(100%)`;
        }
    }
    get width() {
        return this.isLeftOrRight ? toCssPixel(this.nzWidth) : null;
    }
    get height() {
        return !this.isLeftOrRight ? toCssPixel(this.nzHeight) : null;
    }
    get isLeftOrRight() {
        return this.nzPlacement === 'left' || this.nzPlacement === 'right';
    }
    get afterOpen() {
        return this.nzAfterOpen.asObservable();
    }
    get afterClose() {
        return this.nzAfterClose.asObservable();
    }
    isTemplateRef(value) {
        return value instanceof TemplateRef;
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.nzDirection || this.directionality.value;
        this.attachOverlay();
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.templateContext = { $implicit: this.nzContentParams, drawerRef: this };
        this.changeDetectorRef.detectChanges();
    }
    ngAfterViewInit() {
        this.attachBodyContent();
        // The `setTimeout` triggers change detection. There's no sense to schedule the DOM timer if anyone is
        // listening to the `nzOnViewInit` event inside the template, for instance `<nz-drawer (nzOnViewInit)="...">`.
        if (this.nzOnViewInit.observers.length) {
            setTimeout(() => {
                this.nzOnViewInit.emit();
            });
        }
    }
    ngOnChanges(changes) {
        const { nzPlacement, nzVisible } = changes;
        if (nzVisible) {
            const value = changes.nzVisible.currentValue;
            if (value) {
                this.open();
            }
            else {
                this.close();
            }
        }
        if (nzPlacement && !nzPlacement.isFirstChange()) {
            this.triggerPlacementChangeCycleOnce();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        clearTimeout(this.placementChangeTimeoutId);
        this.disposeOverlay();
    }
    getAnimationDuration() {
        return this.nzNoAnimation ? 0 : DRAWER_ANIMATE_DURATION;
    }
    // Disable the transition animation temporarily when the placement changing
    triggerPlacementChangeCycleOnce() {
        if (!this.nzNoAnimation) {
            this.placementChanging = true;
            this.changeDetectorRef.markForCheck();
            clearTimeout(this.placementChangeTimeoutId);
            this.placementChangeTimeoutId = setTimeout(() => {
                this.placementChanging = false;
                this.changeDetectorRef.markForCheck();
            }, this.getAnimationDuration());
        }
    }
    close(result) {
        this.isOpen = false;
        this.inAnimation = true;
        this.nzVisibleChange.emit(false);
        this.updateOverlayStyle();
        this.overlayKeyboardDispatcher.remove(this.overlayRef);
        this.changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.updateBodyOverflow();
            this.restoreFocus();
            this.inAnimation = false;
            this.nzAfterClose.next(result);
            this.nzAfterClose.complete();
            this.componentInstance = null;
        }, this.getAnimationDuration());
    }
    open() {
        this.attachOverlay();
        this.isOpen = true;
        this.inAnimation = true;
        this.nzVisibleChange.emit(true);
        this.overlayKeyboardDispatcher.add(this.overlayRef);
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.savePreviouslyFocusedElement();
        this.trapFocus();
        this.changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.inAnimation = false;
            this.changeDetectorRef.detectChanges();
            this.nzAfterOpen.next();
        }, this.getAnimationDuration());
    }
    getContentComponent() {
        return this.componentInstance;
    }
    closeClick() {
        this.nzOnClose.emit();
    }
    maskClick() {
        if (this.nzMaskClosable && this.nzMask) {
            this.nzOnClose.emit();
        }
    }
    attachBodyContent() {
        this.bodyPortalOutlet.dispose();
        if (this.nzContent instanceof Type) {
            const childInjector = Injector.create({
                parent: this.injector,
                providers: [{ provide: NzDrawerRef, useValue: this }]
            });
            const componentPortal = new ComponentPortal(this.nzContent, null, childInjector);
            const componentRef = this.bodyPortalOutlet.attachComponentPortal(componentPortal);
            this.componentInstance = componentRef.instance;
            Object.assign(componentRef.instance, this.nzContentParams);
            componentRef.changeDetectorRef.detectChanges();
        }
    }
    attachOverlay() {
        if (!this.overlayRef) {
            this.portal = new TemplatePortal(this.drawerTemplate, this.viewContainerRef);
            this.overlayRef = this.overlay.create(this.getOverlayConfig());
        }
        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef.attach(this.portal);
            this.overlayRef.keydownEvents()
                .pipe(takeUntil(this.destroy$))
                .subscribe((event) => {
                if (event.keyCode === ESCAPE && this.isOpen && this.nzKeyboard) {
                    this.nzOnClose.emit();
                }
            });
            this.overlayRef
                .detachments()
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.disposeOverlay();
            });
        }
    }
    disposeOverlay() {
        this.overlayRef?.dispose();
        this.overlayRef = null;
    }
    getOverlayConfig() {
        return new OverlayConfig({
            disposeOnNavigation: this.nzCloseOnNavigation,
            positionStrategy: this.overlay.position().global(),
            scrollStrategy: this.overlay.scrollStrategies.block()
        });
    }
    updateOverlayStyle() {
        if (this.overlayRef && this.overlayRef.overlayElement) {
            this.renderer.setStyle(this.overlayRef.overlayElement, 'pointer-events', this.isOpen ? 'auto' : 'none');
        }
    }
    updateBodyOverflow() {
        if (this.overlayRef) {
            if (this.isOpen) {
                this.overlayRef.getConfig().scrollStrategy.enable();
            }
            else {
                this.overlayRef.getConfig().scrollStrategy.disable();
            }
        }
    }
    savePreviouslyFocusedElement() {
        if (this.document && !this.previouslyFocusedElement) {
            this.previouslyFocusedElement = this.document.activeElement;
            // We need the extra check, because IE's svg element has no blur method.
            if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.blur === 'function') {
                this.previouslyFocusedElement.blur();
            }
        }
    }
    trapFocus() {
        if (!this.focusTrap && this.overlayRef && this.overlayRef.overlayElement) {
            this.focusTrap = this.focusTrapFactory.create(this.overlayRef.overlayElement);
            this.focusTrap.focusInitialElement();
        }
    }
    restoreFocus() {
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.focus === 'function') {
            this.previouslyFocusedElement.focus();
        }
        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    }
}
NzDrawerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDrawerComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: DOCUMENT, optional: true }, { token: i1.NzConfigService }, { token: i0.Renderer2 }, { token: i2.Overlay }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }, { token: i3.FocusTrapFactory }, { token: i0.ViewContainerRef }, { token: i2.OverlayKeyboardDispatcher }, { token: i4.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzDrawerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzDrawerComponent, selector: "nz-drawer", inputs: { nzContent: "nzContent", nzCloseIcon: "nzCloseIcon", nzClosable: "nzClosable", nzMaskClosable: "nzMaskClosable", nzMask: "nzMask", nzCloseOnNavigation: "nzCloseOnNavigation", nzNoAnimation: "nzNoAnimation", nzKeyboard: "nzKeyboard", nzTitle: "nzTitle", nzFooter: "nzFooter", nzPlacement: "nzPlacement", nzMaskStyle: "nzMaskStyle", nzBodyStyle: "nzBodyStyle", nzWrapClassName: "nzWrapClassName", nzWidth: "nzWidth", nzHeight: "nzHeight", nzZIndex: "nzZIndex", nzOffsetX: "nzOffsetX", nzOffsetY: "nzOffsetY", nzVisible: "nzVisible" }, outputs: { nzOnViewInit: "nzOnViewInit", nzOnClose: "nzOnClose", nzVisibleChange: "nzVisibleChange" }, queries: [{ propertyName: "contentFromContentChild", first: true, predicate: NzDrawerContentDirective, descendants: true, read: TemplateRef, static: true }], viewQueries: [{ propertyName: "drawerTemplate", first: true, predicate: ["drawerTemplate"], descendants: true, static: true }, { propertyName: "bodyPortalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true }], exportAs: ["nzDrawer"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
    <ng-template #drawerTemplate>
      <div
        class="ant-drawer"
        [nzNoAnimation]="nzNoAnimation"
        [class.ant-drawer-rtl]="dir === 'rtl'"
        [class.ant-drawer-open]="isOpen"
        [class.no-mask]="!nzMask"
        [class.ant-drawer-top]="nzPlacement === 'top'"
        [class.ant-drawer-bottom]="nzPlacement === 'bottom'"
        [class.ant-drawer-right]="nzPlacement === 'right'"
        [class.ant-drawer-left]="nzPlacement === 'left'"
        [style.transform]="offsetTransform"
        [style.transition]="placementChanging ? 'none' : null"
        [style.zIndex]="nzZIndex"
      >
        <div class="ant-drawer-mask" (click)="maskClick()" *ngIf="nzMask" [ngStyle]="nzMaskStyle"></div>
        <div
          class="ant-drawer-content-wrapper {{ nzWrapClassName }}"
          [style.width]="width"
          [style.height]="height"
          [style.transform]="transform"
          [style.transition]="placementChanging ? 'none' : null"
        >
          <div class="ant-drawer-content">
            <div class="ant-drawer-wrapper-body" [style.height]="isLeftOrRight ? '100%' : null">
              <div
                *ngIf="nzTitle || nzClosable"
                class="ant-drawer-header"
                [class.ant-drawer-header-close-only]="!nzTitle"
              >
                <div class="ant-drawer-header-title">
                  <button
                    *ngIf="nzClosable"
                    (click)="closeClick()"
                    aria-label="Close"
                    class="ant-drawer-close"
                    style="--scroll-bar: 0px;"
                  >
                    <ng-container *nzStringTemplateOutlet="nzCloseIcon; let closeIcon">
                      <i nz-icon [nzType]="closeIcon"></i>
                    </ng-container>
                  </button>
                  <div *ngIf="nzTitle" class="ant-drawer-title">
                    <ng-container *nzStringTemplateOutlet="nzTitle">
                      <div [innerHTML]="nzTitle"></div>
                    </ng-container>
                  </div>
                </div>
              </div>
              <div class="ant-drawer-body" [ngStyle]="nzBodyStyle">
                <ng-template cdkPortalOutlet></ng-template>
                <ng-container *ngIf="nzContent; else contentElseTemp">
                  <ng-container *ngIf="isTemplateRef(nzContent)">
                    <ng-container *ngTemplateOutlet="$any(nzContent); context: templateContext"></ng-container>
                  </ng-container>
                </ng-container>
                <ng-template #contentElseTemp>
                  <ng-container *ngIf="contentFromContentChild && (isOpen || inAnimation)">
                    <ng-template [ngTemplateOutlet]="contentFromContentChild"></ng-template>
                  </ng-container>
                </ng-template>
              </div>
              <div *ngIf="nzFooter" class="ant-drawer-footer">
                <ng-container *nzStringTemplateOutlet="nzFooter">
                  <div [innerHTML]="nzFooter"></div>
                </ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `, isInline: true, directives: [{ type: i5.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i7.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i8.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i9.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }, { type: i6.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    InputBoolean()
], NzDrawerComponent.prototype, "nzClosable", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzDrawerComponent.prototype, "nzMaskClosable", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzDrawerComponent.prototype, "nzMask", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzDrawerComponent.prototype, "nzCloseOnNavigation", void 0);
__decorate([
    InputBoolean()
], NzDrawerComponent.prototype, "nzNoAnimation", void 0);
__decorate([
    InputBoolean()
], NzDrawerComponent.prototype, "nzKeyboard", void 0);
__decorate([
    WithConfig()
], NzDrawerComponent.prototype, "nzDirection", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDrawerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-drawer',
                    exportAs: 'nzDrawer',
                    template: `
    <ng-template #drawerTemplate>
      <div
        class="ant-drawer"
        [nzNoAnimation]="nzNoAnimation"
        [class.ant-drawer-rtl]="dir === 'rtl'"
        [class.ant-drawer-open]="isOpen"
        [class.no-mask]="!nzMask"
        [class.ant-drawer-top]="nzPlacement === 'top'"
        [class.ant-drawer-bottom]="nzPlacement === 'bottom'"
        [class.ant-drawer-right]="nzPlacement === 'right'"
        [class.ant-drawer-left]="nzPlacement === 'left'"
        [style.transform]="offsetTransform"
        [style.transition]="placementChanging ? 'none' : null"
        [style.zIndex]="nzZIndex"
      >
        <div class="ant-drawer-mask" (click)="maskClick()" *ngIf="nzMask" [ngStyle]="nzMaskStyle"></div>
        <div
          class="ant-drawer-content-wrapper {{ nzWrapClassName }}"
          [style.width]="width"
          [style.height]="height"
          [style.transform]="transform"
          [style.transition]="placementChanging ? 'none' : null"
        >
          <div class="ant-drawer-content">
            <div class="ant-drawer-wrapper-body" [style.height]="isLeftOrRight ? '100%' : null">
              <div
                *ngIf="nzTitle || nzClosable"
                class="ant-drawer-header"
                [class.ant-drawer-header-close-only]="!nzTitle"
              >
                <div class="ant-drawer-header-title">
                  <button
                    *ngIf="nzClosable"
                    (click)="closeClick()"
                    aria-label="Close"
                    class="ant-drawer-close"
                    style="--scroll-bar: 0px;"
                  >
                    <ng-container *nzStringTemplateOutlet="nzCloseIcon; let closeIcon">
                      <i nz-icon [nzType]="closeIcon"></i>
                    </ng-container>
                  </button>
                  <div *ngIf="nzTitle" class="ant-drawer-title">
                    <ng-container *nzStringTemplateOutlet="nzTitle">
                      <div [innerHTML]="nzTitle"></div>
                    </ng-container>
                  </div>
                </div>
              </div>
              <div class="ant-drawer-body" [ngStyle]="nzBodyStyle">
                <ng-template cdkPortalOutlet></ng-template>
                <ng-container *ngIf="nzContent; else contentElseTemp">
                  <ng-container *ngIf="isTemplateRef(nzContent)">
                    <ng-container *ngTemplateOutlet="$any(nzContent); context: templateContext"></ng-container>
                  </ng-container>
                </ng-container>
                <ng-template #contentElseTemp>
                  <ng-container *ngIf="contentFromContentChild && (isOpen || inAnimation)">
                    <ng-template [ngTemplateOutlet]="contentFromContentChild"></ng-template>
                  </ng-container>
                </ng-template>
              </div>
              <div *ngIf="nzFooter" class="ant-drawer-footer">
                <ng-container *nzStringTemplateOutlet="nzFooter">
                  <div [innerHTML]="nzFooter"></div>
                </ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.NzConfigService }, { type: i0.Renderer2 }, { type: i2.Overlay }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }, { type: i3.FocusTrapFactory }, { type: i0.ViewContainerRef }, { type: i2.OverlayKeyboardDispatcher }, { type: i4.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzContent: [{
                type: Input
            }], nzCloseIcon: [{
                type: Input
            }], nzClosable: [{
                type: Input
            }], nzMaskClosable: [{
                type: Input
            }], nzMask: [{
                type: Input
            }], nzCloseOnNavigation: [{
                type: Input
            }], nzNoAnimation: [{
                type: Input
            }], nzKeyboard: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzFooter: [{
                type: Input
            }], nzPlacement: [{
                type: Input
            }], nzMaskStyle: [{
                type: Input
            }], nzBodyStyle: [{
                type: Input
            }], nzWrapClassName: [{
                type: Input
            }], nzWidth: [{
                type: Input
            }], nzHeight: [{
                type: Input
            }], nzZIndex: [{
                type: Input
            }], nzOffsetX: [{
                type: Input
            }], nzOffsetY: [{
                type: Input
            }], nzVisible: [{
                type: Input
            }], nzOnViewInit: [{
                type: Output
            }], nzOnClose: [{
                type: Output
            }], nzVisibleChange: [{
                type: Output
            }], drawerTemplate: [{
                type: ViewChild,
                args: ['drawerTemplate', { static: true }]
            }], bodyPortalOutlet: [{
                type: ViewChild,
                args: [CdkPortalOutlet, { static: false }]
            }], contentFromContentChild: [{
                type: ContentChild,
                args: [NzDrawerContentDirective, { static: true, read: TemplateRef }]
            }], nzDirection: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL2RyYXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQVcsYUFBYSxFQUF5QyxNQUFNLHNCQUFzQixDQUFDO0FBQ3JHLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUlMLFFBQVEsRUFDUixNQUFNLEVBR04sV0FBVyxFQUNYLElBQUksRUFDSixTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFnQyxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRixPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRW5FLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXRFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7Ozs7O0FBRTNDLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQztBQUUzQyxNQUFNLHFCQUFxQixHQUFnQixRQUFRLENBQUM7QUFrRnBELE1BQU0sT0FBTyxpQkFDWCxTQUFRLFdBQWlCO0lBa0l6QixZQUNVLEdBQXNCO0lBQzlC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QUFXO3NCQUFuQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBSUYsU0FBUztzQkFEWixLQUFLO2dCQVNhLFlBQVk7c0JBQTlCLE1BQU07Z0JBQ1ksU0FBUztzQkFBM0IsTUFBTTtnQkFDWSxlQUFlO3NCQUFqQyxNQUFNO2dCQUV3QyxjQUFjO3NCQUE1RCxTQUFTO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDRSxnQkFBZ0I7c0JBQTlELFNBQVM7dUJBQUMsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFFN0MsdUJBQXVCO3NCQUR0QixZQUFZO3VCQUFDLHdCQUF3QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO2dCQStFN0QsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEZvY3VzVHJhcCwgRm9jdXNUcmFwRmFjdG9yeSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheUNvbmZpZywgT3ZlcmxheUtleWJvYXJkRGlzcGF0Y2hlciwgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENka1BvcnRhbE91dGxldCwgQ29tcG9uZW50UG9ydGFsLCBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE5nU3R5bGVJbnRlcmZhY2UsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIHRvQ3NzUGl4ZWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56RHJhd2VyQ29udGVudERpcmVjdGl2ZSB9IGZyb20gJy4vZHJhd2VyLWNvbnRlbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56RHJhd2VyT3B0aW9uc09mQ29tcG9uZW50LCBOekRyYXdlclBsYWNlbWVudCB9IGZyb20gJy4vZHJhd2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgTnpEcmF3ZXJSZWYgfSBmcm9tICcuL2RyYXdlci1yZWYnO1xuXG5leHBvcnQgY29uc3QgRFJBV0VSX0FOSU1BVEVfRFVSQVRJT04gPSAzMDA7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnZHJhd2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotZHJhd2VyJyxcbiAgZXhwb3J0QXM6ICduekRyYXdlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNkcmF3ZXJUZW1wbGF0ZT5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJhbnQtZHJhd2VyXCJcbiAgICAgICAgW256Tm9BbmltYXRpb25dPVwibnpOb0FuaW1hdGlvblwiXG4gICAgICAgIFtjbGFzcy5hbnQtZHJhd2VyLXJ0bF09XCJkaXIgPT09ICdydGwnXCJcbiAgICAgICAgW2NsYXNzLmFudC1kcmF3ZXItb3Blbl09XCJpc09wZW5cIlxuICAgICAgICBbY2xhc3Mubm8tbWFza109XCIhbnpNYXNrXCJcbiAgICAgICAgW2NsYXNzLmFudC1kcmF3ZXItdG9wXT1cIm56UGxhY2VtZW50ID09PSAndG9wJ1wiXG4gICAgICAgIFtjbGFzcy5hbnQtZHJhd2VyLWJvdHRvbV09XCJuelBsYWNlbWVudCA9PT0gJ2JvdHRvbSdcIlxuICAgICAgICBbY2xhc3MuYW50LWRyYXdlci1yaWdodF09XCJuelBsYWNlbWVudCA9PT0gJ3JpZ2h0J1wiXG4gICAgICAgIFtjbGFzcy5hbnQtZHJhd2VyLWxlZnRdPVwibnpQbGFjZW1lbnQgPT09ICdsZWZ0J1wiXG4gICAgICAgIFtzdHlsZS50cmFuc2Zvcm1dPVwib2Zmc2V0VHJhbnNmb3JtXCJcbiAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25dPVwicGxhY2VtZW50Q2hhbmdpbmcgPyAnbm9uZScgOiBudWxsXCJcbiAgICAgICAgW3N0eWxlLnpJbmRleF09XCJuelpJbmRleFwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtZHJhd2VyLW1hc2tcIiAoY2xpY2spPVwibWFza0NsaWNrKClcIiAqbmdJZj1cIm56TWFza1wiIFtuZ1N0eWxlXT1cIm56TWFza1N0eWxlXCI+PC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImFudC1kcmF3ZXItY29udGVudC13cmFwcGVyIHt7IG56V3JhcENsYXNzTmFtZSB9fVwiXG4gICAgICAgICAgW3N0eWxlLndpZHRoXT1cIndpZHRoXCJcbiAgICAgICAgICBbc3R5bGUuaGVpZ2h0XT1cImhlaWdodFwiXG4gICAgICAgICAgW3N0eWxlLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIlxuICAgICAgICAgIFtzdHlsZS50cmFuc2l0aW9uXT1cInBsYWNlbWVudENoYW5naW5nID8gJ25vbmUnIDogbnVsbFwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LWRyYXdlci1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LWRyYXdlci13cmFwcGVyLWJvZHlcIiBbc3R5bGUuaGVpZ2h0XT1cImlzTGVmdE9yUmlnaHQgPyAnMTAwJScgOiBudWxsXCI+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAqbmdJZj1cIm56VGl0bGUgfHwgbnpDbG9zYWJsZVwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJhbnQtZHJhd2VyLWhlYWRlclwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmFudC1kcmF3ZXItaGVhZGVyLWNsb3NlLW9ubHldPVwiIW56VGl0bGVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1kcmF3ZXItaGVhZGVyLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwibnpDbG9zYWJsZVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjbG9zZUNsaWNrKClcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiQ2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImFudC1kcmF3ZXItY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIi0tc2Nyb2xsLWJhcjogMHB4O1wiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekNsb3NlSWNvbjsgbGV0IGNsb3NlSWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJjbG9zZUljb25cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwibnpUaXRsZVwiIGNsYXNzPVwiYW50LWRyYXdlci10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpUaXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgW2lubmVySFRNTF09XCJuelRpdGxlXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LWRyYXdlci1ib2R5XCIgW25nU3R5bGVdPVwibnpCb2R5U3R5bGVcIj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgY2RrUG9ydGFsT3V0bGV0PjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56Q29udGVudDsgZWxzZSBjb250ZW50RWxzZVRlbXBcIj5cbiAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RlbXBsYXRlUmVmKG56Q29udGVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIiRhbnkobnpDb250ZW50KTsgY29udGV4dDogdGVtcGxhdGVDb250ZXh0XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnRFbHNlVGVtcD5cbiAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb250ZW50RnJvbUNvbnRlbnRDaGlsZCAmJiAoaXNPcGVuIHx8IGluQW5pbWF0aW9uKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudEZyb21Db250ZW50Q2hpbGRcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJuekZvb3RlclwiIGNsYXNzPVwiYW50LWRyYXdlci1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpGb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgW2lubmVySFRNTF09XCJuekZvb3RlclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOekRyYXdlckNvbXBvbmVudDxUID0gTnpTYWZlQW55LCBSID0gTnpTYWZlQW55LCBEID0gTnpTYWZlQW55PlxuICBleHRlbmRzIE56RHJhd2VyUmVmPFQsIFI+XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgTnpEcmF3ZXJPcHRpb25zT2ZDb21wb25lbnRcbntcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNsb3NhYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek1hc2tDbG9zYWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpNYXNrOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek5vQW5pbWF0aW9uOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uektleWJvYXJkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNsb3NlT25OYXZpZ2F0aW9uOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgbnpDb250ZW50ITogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IEQ7IGRyYXdlclJlZjogTnpEcmF3ZXJSZWY8Uj4gfT4gfCBUeXBlPFQ+O1xuICBASW5wdXQoKSBuekNsb3NlSWNvbjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gPSAnY2xvc2UnO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpDbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0Qm9vbGVhbigpIG56TWFza0Nsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXRCb29sZWFuKCkgbnpNYXNrOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXRCb29sZWFuKCkgbnpDbG9zZU9uTmF2aWdhdGlvbjogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek5vQW5pbWF0aW9uID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuektleWJvYXJkOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgbnpUaXRsZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHt9PjtcbiAgQElucHV0KCkgbnpGb290ZXI/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx7fT47XG4gIEBJbnB1dCgpIG56UGxhY2VtZW50OiBOekRyYXdlclBsYWNlbWVudCA9ICdyaWdodCc7XG4gIEBJbnB1dCgpIG56TWFza1N0eWxlOiBOZ1N0eWxlSW50ZXJmYWNlID0ge307XG4gIEBJbnB1dCgpIG56Qm9keVN0eWxlOiBOZ1N0eWxlSW50ZXJmYWNlID0ge307XG4gIEBJbnB1dCgpIG56V3JhcENsYXNzTmFtZT86IHN0cmluZztcbiAgQElucHV0KCkgbnpXaWR0aDogbnVtYmVyIHwgc3RyaW5nID0gMjU2O1xuICBASW5wdXQoKSBuekhlaWdodDogbnVtYmVyIHwgc3RyaW5nID0gMjU2O1xuICBASW5wdXQoKSBuelpJbmRleCA9IDEwMDA7XG4gIEBJbnB1dCgpIG56T2Zmc2V0WCA9IDA7XG4gIEBJbnB1dCgpIG56T2Zmc2V0WSA9IDA7XG4gIHByaXZhdGUgY29tcG9uZW50SW5zdGFuY2U6IFQgfCBudWxsID0gbnVsbDtcblxuICBASW5wdXQoKVxuICBzZXQgbnpWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5pc09wZW4gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBuelZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuO1xuICB9XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25WaWV3SW5pdCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25DbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56VmlzaWJsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBAVmlld0NoaWxkKCdkcmF3ZXJUZW1wbGF0ZScsIHsgc3RhdGljOiB0cnVlIH0pIGRyYXdlclRlbXBsYXRlITogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBWaWV3Q2hpbGQoQ2RrUG9ydGFsT3V0bGV0LCB7IHN0YXRpYzogZmFsc2UgfSkgYm9keVBvcnRhbE91dGxldD86IENka1BvcnRhbE91dGxldDtcbiAgQENvbnRlbnRDaGlsZChOekRyYXdlckNvbnRlbnREaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlLCByZWFkOiBUZW1wbGF0ZVJlZiB9KVxuICBjb250ZW50RnJvbUNvbnRlbnRDaGlsZD86IFRlbXBsYXRlUmVmPE56U2FmZUFueT47XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudD86IEhUTUxFbGVtZW50O1xuICBwbGFjZW1lbnRDaGFuZ2luZyA9IGZhbHNlO1xuICBwbGFjZW1lbnRDaGFuZ2VUaW1lb3V0SWQgPSAtMTtcbiAgbnpDb250ZW50UGFyYW1zPzogRDsgLy8gb25seSBzZXJ2aWNlXG4gIG92ZXJsYXlSZWY/OiBPdmVybGF5UmVmIHwgbnVsbDtcbiAgcG9ydGFsPzogVGVtcGxhdGVQb3J0YWw7XG4gIGZvY3VzVHJhcD86IEZvY3VzVHJhcDtcbiAgaXNPcGVuID0gZmFsc2U7XG4gIGluQW5pbWF0aW9uID0gZmFsc2U7XG4gIHRlbXBsYXRlQ29udGV4dDogeyAkaW1wbGljaXQ6IEQgfCB1bmRlZmluZWQ7IGRyYXdlclJlZjogTnpEcmF3ZXJSZWY8Uj4gfSA9IHtcbiAgICAkaW1wbGljaXQ6IHVuZGVmaW5lZCxcbiAgICBkcmF3ZXJSZWY6IHRoaXMgYXMgTnpEcmF3ZXJSZWY8Uj5cbiAgfTtcblxuICBnZXQgb2Zmc2V0VHJhbnNmb3JtKCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICghdGhpcy5pc09wZW4gfHwgdGhpcy5uek9mZnNldFggKyB0aGlzLm56T2Zmc2V0WSA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHN3aXRjaCAodGhpcy5uelBsYWNlbWVudCkge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHJldHVybiBgdHJhbnNsYXRlWCgke3RoaXMubnpPZmZzZXRYfXB4KWA7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHJldHVybiBgdHJhbnNsYXRlWCgtJHt0aGlzLm56T2Zmc2V0WH1weClgO1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgcmV0dXJuIGB0cmFuc2xhdGVZKCR7dGhpcy5uek9mZnNldFl9cHgpYDtcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIHJldHVybiBgdHJhbnNsYXRlWSgtJHt0aGlzLm56T2Zmc2V0WX1weClgO1xuICAgIH1cbiAgfVxuXG4gIGdldCB0cmFuc2Zvcm0oKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMubnpQbGFjZW1lbnQpIHtcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICByZXR1cm4gYHRyYW5zbGF0ZVgoLTEwMCUpYDtcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgcmV0dXJuIGB0cmFuc2xhdGVYKDEwMCUpYDtcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIHJldHVybiBgdHJhbnNsYXRlWSgtMTAwJSlgO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgcmV0dXJuIGB0cmFuc2xhdGVZKDEwMCUpYDtcbiAgICB9XG4gIH1cblxuICBnZXQgd2lkdGgoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuaXNMZWZ0T3JSaWdodCA/IHRvQ3NzUGl4ZWwodGhpcy5ueldpZHRoKSA6IG51bGw7XG4gIH1cblxuICBnZXQgaGVpZ2h0KCk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiAhdGhpcy5pc0xlZnRPclJpZ2h0ID8gdG9Dc3NQaXhlbCh0aGlzLm56SGVpZ2h0KSA6IG51bGw7XG4gIH1cblxuICBnZXQgaXNMZWZ0T3JSaWdodCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uelBsYWNlbWVudCA9PT0gJ2xlZnQnIHx8IHRoaXMubnpQbGFjZW1lbnQgPT09ICdyaWdodCc7XG4gIH1cblxuICBuekFmdGVyT3BlbiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIG56QWZ0ZXJDbG9zZSA9IG5ldyBTdWJqZWN0PFI+KCk7XG5cbiAgZ2V0IGFmdGVyT3BlbigpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5uekFmdGVyT3Blbi5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBhZnRlckNsb3NlKCk6IE9ic2VydmFibGU8Uj4ge1xuICAgIHJldHVybiB0aGlzLm56QWZ0ZXJDbG9zZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGlzVGVtcGxhdGVSZWYodmFsdWU6IHt9KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XG4gIH1cblxuICAvLyBmcm9tIHNlcnZpY2UgY29uZmlnXG4gIEBXaXRoQ29uZmlnKCkgbnpEaXJlY3Rpb24/OiBEaXJlY3Rpb24gPSB1bmRlZmluZWQ7XG5cbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBOelNhZmVBbnksXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBmb2N1c1RyYXBGYWN0b3J5OiBGb2N1c1RyYXBGYWN0b3J5LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIG92ZXJsYXlLZXlib2FyZERpc3BhdGNoZXI6IE92ZXJsYXlLZXlib2FyZERpc3BhdGNoZXIsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHlcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5kaXIgPSB0aGlzLm56RGlyZWN0aW9uIHx8IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG5cbiAgICB0aGlzLmF0dGFjaE92ZXJsYXkoKTtcbiAgICB0aGlzLnVwZGF0ZU92ZXJsYXlTdHlsZSgpO1xuICAgIHRoaXMudXBkYXRlQm9keU92ZXJmbG93KCk7XG4gICAgdGhpcy50ZW1wbGF0ZUNvbnRleHQgPSB7ICRpbXBsaWNpdDogdGhpcy5uekNvbnRlbnRQYXJhbXMsIGRyYXdlclJlZjogdGhpcyBhcyBOekRyYXdlclJlZjxSPiB9O1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYXR0YWNoQm9keUNvbnRlbnQoKTtcbiAgICAvLyBUaGUgYHNldFRpbWVvdXRgIHRyaWdnZXJzIGNoYW5nZSBkZXRlY3Rpb24uIFRoZXJlJ3Mgbm8gc2Vuc2UgdG8gc2NoZWR1bGUgdGhlIERPTSB0aW1lciBpZiBhbnlvbmUgaXNcbiAgICAvLyBsaXN0ZW5pbmcgdG8gdGhlIGBuek9uVmlld0luaXRgIGV2ZW50IGluc2lkZSB0aGUgdGVtcGxhdGUsIGZvciBpbnN0YW5jZSBgPG56LWRyYXdlciAobnpPblZpZXdJbml0KT1cIi4uLlwiPmAuXG4gICAgaWYgKHRoaXMubnpPblZpZXdJbml0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLm56T25WaWV3SW5pdC5lbWl0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuelBsYWNlbWVudCwgbnpWaXNpYmxlIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuelZpc2libGUpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY2hhbmdlcy5uelZpc2libGUuY3VycmVudFZhbHVlO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobnpQbGFjZW1lbnQgJiYgIW56UGxhY2VtZW50LmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy50cmlnZ2VyUGxhY2VtZW50Q2hhbmdlQ3ljbGVPbmNlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnBsYWNlbWVudENoYW5nZVRpbWVvdXRJZCk7XG4gICAgdGhpcy5kaXNwb3NlT3ZlcmxheSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBbmltYXRpb25EdXJhdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm56Tm9BbmltYXRpb24gPyAwIDogRFJBV0VSX0FOSU1BVEVfRFVSQVRJT047XG4gIH1cblxuICAvLyBEaXNhYmxlIHRoZSB0cmFuc2l0aW9uIGFuaW1hdGlvbiB0ZW1wb3JhcmlseSB3aGVuIHRoZSBwbGFjZW1lbnQgY2hhbmdpbmdcbiAgcHJpdmF0ZSB0cmlnZ2VyUGxhY2VtZW50Q2hhbmdlQ3ljbGVPbmNlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5uek5vQW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLnBsYWNlbWVudENoYW5naW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5wbGFjZW1lbnRDaGFuZ2VUaW1lb3V0SWQpO1xuICAgICAgdGhpcy5wbGFjZW1lbnRDaGFuZ2VUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5wbGFjZW1lbnRDaGFuZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSwgdGhpcy5nZXRBbmltYXRpb25EdXJhdGlvbigpKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZShyZXN1bHQ/OiBSKTogdm9pZCB7XG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLmluQW5pbWF0aW9uID0gdHJ1ZTtcbiAgICB0aGlzLm56VmlzaWJsZUNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZU92ZXJsYXlTdHlsZSgpO1xuICAgIHRoaXMub3ZlcmxheUtleWJvYXJkRGlzcGF0Y2hlci5yZW1vdmUodGhpcy5vdmVybGF5UmVmISk7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUJvZHlPdmVyZmxvdygpO1xuICAgICAgdGhpcy5yZXN0b3JlRm9jdXMoKTtcbiAgICAgIHRoaXMuaW5BbmltYXRpb24gPSBmYWxzZTtcbiAgICAgIHRoaXMubnpBZnRlckNsb3NlLm5leHQocmVzdWx0KTtcbiAgICAgIHRoaXMubnpBZnRlckNsb3NlLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlID0gbnVsbDtcbiAgICB9LCB0aGlzLmdldEFuaW1hdGlvbkR1cmF0aW9uKCkpO1xuICB9XG5cbiAgb3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLmF0dGFjaE92ZXJsYXkoKTtcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgdGhpcy5pbkFuaW1hdGlvbiA9IHRydWU7XG4gICAgdGhpcy5uelZpc2libGVDaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICB0aGlzLm92ZXJsYXlLZXlib2FyZERpc3BhdGNoZXIuYWRkKHRoaXMub3ZlcmxheVJlZiEpO1xuICAgIHRoaXMudXBkYXRlT3ZlcmxheVN0eWxlKCk7XG4gICAgdGhpcy51cGRhdGVCb2R5T3ZlcmZsb3coKTtcbiAgICB0aGlzLnNhdmVQcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQoKTtcbiAgICB0aGlzLnRyYXBGb2N1cygpO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pbkFuaW1hdGlvbiA9IGZhbHNlO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLm56QWZ0ZXJPcGVuLm5leHQoKTtcbiAgICB9LCB0aGlzLmdldEFuaW1hdGlvbkR1cmF0aW9uKCkpO1xuICB9XG5cbiAgZ2V0Q29udGVudENvbXBvbmVudCgpOiBUIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50SW5zdGFuY2U7XG4gIH1cblxuICBjbG9zZUNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMubnpPbkNsb3NlLmVtaXQoKTtcbiAgfVxuXG4gIG1hc2tDbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uek1hc2tDbG9zYWJsZSAmJiB0aGlzLm56TWFzaykge1xuICAgICAgdGhpcy5uek9uQ2xvc2UuZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoQm9keUNvbnRlbnQoKTogdm9pZCB7XG4gICAgdGhpcy5ib2R5UG9ydGFsT3V0bGV0IS5kaXNwb3NlKCk7XG5cbiAgICBpZiAodGhpcy5uekNvbnRlbnQgaW5zdGFuY2VvZiBUeXBlKSB7XG4gICAgICBjb25zdCBjaGlsZEluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgICAgcGFyZW50OiB0aGlzLmluamVjdG9yLFxuICAgICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE56RHJhd2VyUmVmLCB1c2VWYWx1ZTogdGhpcyB9XVxuICAgICAgfSk7XG4gICAgICBjb25zdCBjb21wb25lbnRQb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsPFQ+KHRoaXMubnpDb250ZW50LCBudWxsLCBjaGlsZEluamVjdG9yKTtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuYm9keVBvcnRhbE91dGxldCEuYXR0YWNoQ29tcG9uZW50UG9ydGFsKGNvbXBvbmVudFBvcnRhbCk7XG4gICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgICAgT2JqZWN0LmFzc2lnbihjb21wb25lbnRSZWYuaW5zdGFuY2UsIHRoaXMubnpDb250ZW50UGFyYW1zKTtcbiAgICAgIGNvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hPdmVybGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLnBvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbCh0aGlzLmRyYXdlclRlbXBsYXRlLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh0aGlzLmdldE92ZXJsYXlDb25maWcoKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3ZlcmxheVJlZiAmJiAhdGhpcy5vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5hdHRhY2godGhpcy5wb3J0YWwpO1xuICAgICAgdGhpcy5vdmVybGF5UmVmIS5rZXlkb3duRXZlbnRzKClcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdGhpcy5pc09wZW4gJiYgdGhpcy5uektleWJvYXJkKSB7XG4gICAgICAgICAgICB0aGlzLm56T25DbG9zZS5lbWl0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIHRoaXMub3ZlcmxheVJlZlxuICAgICAgICAuZGV0YWNobWVudHMoKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZGlzcG9zZU92ZXJsYXkoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkaXNwb3NlT3ZlcmxheSgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXlSZWY/LmRpc3Bvc2UoKTtcbiAgICB0aGlzLm92ZXJsYXlSZWYgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPdmVybGF5Q29uZmlnKCk6IE92ZXJsYXlDb25maWcge1xuICAgIHJldHVybiBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICBkaXNwb3NlT25OYXZpZ2F0aW9uOiB0aGlzLm56Q2xvc2VPbk5hdmlnYXRpb24sXG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKSxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZU92ZXJsYXlTdHlsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQsICdwb2ludGVyLWV2ZW50cycsIHRoaXMuaXNPcGVuID8gJ2F1dG8nIDogJ25vbmUnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUJvZHlPdmVyZmxvdygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpLnNjcm9sbFN0cmF0ZWd5IS5lbmFibGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5nZXRDb25maWcoKS5zY3JvbGxTdHJhdGVneSEuZGlzYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNhdmVQcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZG9jdW1lbnQgJiYgIXRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50KSB7XG4gICAgICB0aGlzLnByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA9IHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgIC8vIFdlIG5lZWQgdGhlIGV4dHJhIGNoZWNrLCBiZWNhdXNlIElFJ3Mgc3ZnIGVsZW1lbnQgaGFzIG5vIGJsdXIgbWV0aG9kLlxuICAgICAgaWYgKHRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50ICYmIHR5cGVvZiB0aGlzLnByZXZpb3VzbHlGb2N1c2VkRWxlbWVudC5ibHVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50LmJsdXIoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyYXBGb2N1cygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZm9jdXNUcmFwICYmIHRoaXMub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuZm9jdXNUcmFwID0gdGhpcy5mb2N1c1RyYXBGYWN0b3J5LmNyZWF0ZSh0aGlzLm92ZXJsYXlSZWYhLm92ZXJsYXlFbGVtZW50KTtcbiAgICAgIHRoaXMuZm9jdXNUcmFwLmZvY3VzSW5pdGlhbEVsZW1lbnQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc3RvcmVGb2N1cygpOiB2b2lkIHtcbiAgICAvLyBXZSBuZWVkIHRoZSBleHRyYSBjaGVjaywgYmVjYXVzZSBJRSBjYW4gc2V0IHRoZSBgYWN0aXZlRWxlbWVudGAgdG8gbnVsbCBpbiBzb21lIGNhc2VzLlxuICAgIGlmICh0aGlzLnByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCAmJiB0eXBlb2YgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQuZm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmZvY3VzVHJhcCkge1xuICAgICAgdGhpcy5mb2N1c1RyYXAuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxufVxuIl19