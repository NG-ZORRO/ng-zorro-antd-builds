import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { EventEmitter, Directive, Optional, ViewChild, TemplateRef, Host, Input, Output, Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule } from '@angular/core';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { isPresetColor } from 'ng-zorro-antd/core/color';
import { toBoolean, isNotNil, InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import * as i4 from 'ng-zorro-antd/core/overlay';
import { DEFAULT_TOOLTIP_POSITIONS, POSITION_MAP, getPlacementName, NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import * as i1 from 'ng-zorro-antd/core/no-animation';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import * as i2 from 'ng-zorro-antd/core/config';
import * as i3 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i3$1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i6 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

class NzTooltipBaseDirective {
    constructor(elementRef, hostView, resolver, renderer, noAnimation, nzConfigService) {
        this.elementRef = elementRef;
        this.hostView = hostView;
        this.resolver = resolver;
        this.renderer = renderer;
        this.noAnimation = noAnimation;
        this.nzConfigService = nzConfigService;
        this.visibleChange = new EventEmitter();
        this.internalVisible = false;
        this.destroy$ = new Subject();
        this.triggerDisposables = [];
    }
    /**
     * This true title that would be used in other parts on this component.
     */
    get _title() {
        return this.title || this.directiveTitle || null;
    }
    get _content() {
        return this.content || this.directiveContent || null;
    }
    get _trigger() {
        return typeof this.trigger !== 'undefined' ? this.trigger : 'hover';
    }
    get _placement() {
        const p = this.placement;
        return Array.isArray(p) && p.length > 0 ? p : typeof p === 'string' && p ? [p] : ['top'];
    }
    get _visible() {
        return (typeof this.visible !== 'undefined' ? this.visible : this.internalVisible) || false;
    }
    get _mouseEnterDelay() {
        return this.mouseEnterDelay || 0.15;
    }
    get _mouseLeaveDelay() {
        return this.mouseLeaveDelay || 0.1;
    }
    get _overlayClassName() {
        return this.overlayClassName || null;
    }
    get _overlayStyle() {
        return this.overlayStyle || null;
    }
    getProxyPropertyMap() {
        return {
            noAnimation: ['noAnimation', () => !!this.noAnimation]
        };
    }
    ngOnChanges(changes) {
        const { trigger } = changes;
        if (trigger && !trigger.isFirstChange()) {
            this.registerTriggers();
        }
        if (this.component) {
            this.updatePropertiesByChanges(changes);
        }
    }
    ngAfterViewInit() {
        this.createComponent();
        this.registerTriggers();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        // Clear toggling timer. Issue #3875 #4317 #4386
        this.clearTogglingTimer();
        this.removeTriggerListeners();
    }
    show() {
        var _a;
        (_a = this.component) === null || _a === void 0 ? void 0 : _a.show();
    }
    hide() {
        var _a;
        (_a = this.component) === null || _a === void 0 ? void 0 : _a.hide();
    }
    /**
     * Force the component to update its position.
     */
    updatePosition() {
        if (this.component) {
            this.component.updatePosition();
        }
    }
    /**
     * Create a dynamic tooltip component. This method can be override.
     */
    createComponent() {
        const componentRef = this.componentRef;
        this.component = componentRef.instance;
        // Remove the component's DOM because it should be in the overlay container.
        this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), componentRef.location.nativeElement);
        this.component.setOverlayOrigin(this.origin || this.elementRef);
        this.initProperties();
        this.component.nzVisibleChange
            .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
            .subscribe((visible) => {
            this.internalVisible = visible;
            this.visibleChange.emit(visible);
        });
    }
    registerTriggers() {
        // When the method gets invoked, all properties has been synced to the dynamic component.
        // After removing the old API, we can just check the directive's own `nzTrigger`.
        const el = this.elementRef.nativeElement;
        const trigger = this.trigger;
        this.removeTriggerListeners();
        if (trigger === 'hover') {
            let overlayElement;
            this.triggerDisposables.push(this.renderer.listen(el, 'mouseenter', () => {
                this.delayEnterLeave(true, true, this._mouseEnterDelay);
            }));
            this.triggerDisposables.push(this.renderer.listen(el, 'mouseleave', () => {
                var _a;
                this.delayEnterLeave(true, false, this._mouseLeaveDelay);
                if (((_a = this.component) === null || _a === void 0 ? void 0 : _a.overlay.overlayRef) && !overlayElement) {
                    overlayElement = this.component.overlay.overlayRef.overlayElement;
                    this.triggerDisposables.push(this.renderer.listen(overlayElement, 'mouseenter', () => {
                        this.delayEnterLeave(false, true, this._mouseEnterDelay);
                    }));
                    this.triggerDisposables.push(this.renderer.listen(overlayElement, 'mouseleave', () => {
                        this.delayEnterLeave(false, false, this._mouseLeaveDelay);
                    }));
                }
            }));
        }
        else if (trigger === 'focus') {
            this.triggerDisposables.push(this.renderer.listen(el, 'focusin', () => this.show()));
            this.triggerDisposables.push(this.renderer.listen(el, 'focusout', () => this.hide()));
        }
        else if (trigger === 'click') {
            this.triggerDisposables.push(this.renderer.listen(el, 'click', (e) => {
                e.preventDefault();
                this.show();
            }));
        }
        // Else do nothing because user wants to control the visibility programmatically.
    }
    updatePropertiesByChanges(changes) {
        this.updatePropertiesByKeys(Object.keys(changes));
    }
    updatePropertiesByKeys(keys) {
        var _a;
        const mappingProperties = Object.assign({ 
            // common mappings
            title: ['nzTitle', () => this._title], directiveTitle: ['nzTitle', () => this._title], content: ['nzContent', () => this._content], directiveContent: ['nzContent', () => this._content], trigger: ['nzTrigger', () => this._trigger], placement: ['nzPlacement', () => this._placement], visible: ['nzVisible', () => this._visible], mouseEnterDelay: ['nzMouseEnterDelay', () => this._mouseEnterDelay], mouseLeaveDelay: ['nzMouseLeaveDelay', () => this._mouseLeaveDelay], overlayClassName: ['nzOverlayClassName', () => this._overlayClassName], overlayStyle: ['nzOverlayStyle', () => this._overlayStyle], arrowPointAtCenter: ['nzArrowPointAtCenter', () => this.arrowPointAtCenter] }, this.getProxyPropertyMap());
        (keys || Object.keys(mappingProperties).filter(key => !key.startsWith('directive'))).forEach((property) => {
            if (mappingProperties[property]) {
                const [name, valueFn] = mappingProperties[property];
                this.updateComponentValue(name, valueFn());
            }
        });
        (_a = this.component) === null || _a === void 0 ? void 0 : _a.updateByDirective();
    }
    initProperties() {
        this.updatePropertiesByKeys();
    }
    updateComponentValue(key, value) {
        if (typeof value !== 'undefined') {
            // @ts-ignore
            this.component[key] = value;
        }
    }
    delayEnterLeave(isOrigin, isEnter, delay = -1) {
        if (this.delayTimer) {
            this.clearTogglingTimer();
        }
        else if (delay > 0) {
            this.delayTimer = setTimeout(() => {
                this.delayTimer = undefined;
                isEnter ? this.show() : this.hide();
            }, delay * 1000);
        }
        else {
            // `isOrigin` is used due to the tooltip will not hide immediately
            // (may caused by the fade-out animation).
            isEnter && isOrigin ? this.show() : this.hide();
        }
    }
    removeTriggerListeners() {
        this.triggerDisposables.forEach(dispose => dispose());
        this.triggerDisposables.length = 0;
    }
    clearTogglingTimer() {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = undefined;
        }
    }
}
NzTooltipBaseDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTooltipBaseDirective, deps: [{ token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }, { token: i0.Renderer2 }, { token: i1.NzNoAnimationDirective }, { token: i2.NzConfigService }], target: i0.ɵɵFactoryTarget.Directive });
NzTooltipBaseDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTooltipBaseDirective, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTooltipBaseDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }, { type: i0.Renderer2 }, { type: i1.NzNoAnimationDirective }, { type: i2.NzConfigService }]; } });
// eslint-disable-next-line @angular-eslint/directive-class-suffix
class NzTooltipBaseComponent {
    constructor(cdr, directionality, noAnimation) {
        this.cdr = cdr;
        this.directionality = directionality;
        this.noAnimation = noAnimation;
        this.nzTitle = null;
        this.nzContent = null;
        this.nzArrowPointAtCenter = false;
        this.nzOverlayStyle = {};
        this.nzBackdrop = false;
        this.nzVisibleChange = new Subject();
        this._visible = false;
        this._trigger = 'hover';
        this.preferredPlacement = 'top';
        this.dir = 'ltr';
        this._classMap = {};
        this._prefix = 'ant-tooltip';
        this._positions = [...DEFAULT_TOOLTIP_POSITIONS];
        this.destroy$ = new Subject();
    }
    set nzVisible(value) {
        const visible = toBoolean(value);
        if (this._visible !== visible) {
            this._visible = visible;
            this.nzVisibleChange.next(visible);
        }
    }
    get nzVisible() {
        return this._visible;
    }
    set nzTrigger(value) {
        this._trigger = value;
    }
    get nzTrigger() {
        return this._trigger;
    }
    set nzPlacement(value) {
        const preferredPosition = value.map(placement => POSITION_MAP[placement]);
        this._positions = [...preferredPosition, ...DEFAULT_TOOLTIP_POSITIONS];
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
        this.nzVisibleChange.complete();
        this.destroy$.next();
        this.destroy$.complete();
    }
    show() {
        if (this.nzVisible) {
            return;
        }
        if (!this.isEmpty()) {
            this.nzVisible = true;
            this.nzVisibleChange.next(true);
            this.cdr.detectChanges();
        }
        // for ltr for overlay to display tooltip in correct placement in rtl direction.
        if (this.origin && this.overlay && this.overlay.overlayRef && this.overlay.overlayRef.getDirection() === 'rtl') {
            this.overlay.overlayRef.setDirection('ltr');
        }
    }
    hide() {
        if (!this.nzVisible) {
            return;
        }
        this.nzVisible = false;
        this.nzVisibleChange.next(false);
        this.cdr.detectChanges();
    }
    updateByDirective() {
        this.updateStyles();
        this.cdr.detectChanges();
        Promise.resolve().then(() => {
            this.updatePosition();
            this.updateVisibilityByTitle();
        });
    }
    /**
     * Force the component to update its position.
     */
    updatePosition() {
        if (this.origin && this.overlay && this.overlay.overlayRef) {
            this.overlay.overlayRef.updatePosition();
        }
    }
    onPositionChange(position) {
        this.preferredPlacement = getPlacementName(position);
        this.updateStyles();
        // We have to trigger immediate change detection or the element would blink.
        this.cdr.detectChanges();
    }
    setOverlayOrigin(origin) {
        this.origin = origin;
        this.cdr.markForCheck();
    }
    onClickOutside(event) {
        if (!this.origin.nativeElement.contains(event.target) && this.nzTrigger !== null) {
            this.hide();
        }
    }
    /**
     * Hide the component while the content is empty.
     */
    updateVisibilityByTitle() {
        if (this.isEmpty()) {
            this.hide();
        }
    }
    updateStyles() {
        this._classMap = {
            [this.nzOverlayClassName]: true,
            [`${this._prefix}-placement-${this.preferredPlacement}`]: true
        };
    }
}
NzTooltipBaseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTooltipBaseComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i3.Directionality, optional: true }, { token: i1.NzNoAnimationDirective }], target: i0.ɵɵFactoryTarget.Directive });
NzTooltipBaseComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTooltipBaseComponent, viewQueries: [{ propertyName: "overlay", first: true, predicate: ["overlay"], descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTooltipBaseComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i3.Directionality, decorators: [{
                        type: Optional
                    }] }, { type: i1.NzNoAnimationDirective }];
    }, propDecorators: { overlay: [{
                type: ViewChild,
                args: ['overlay', { static: false }]
            }] } });
function isTooltipEmpty(value) {
    return value instanceof TemplateRef ? false : value === '' || !isNotNil(value);
}

class NzTooltipDirective extends NzTooltipBaseDirective {
    constructor(elementRef, hostView, resolver, renderer, noAnimation) {
        super(elementRef, hostView, resolver, renderer, noAnimation);
        this.titleContext = null;
        this.trigger = 'hover';
        this.placement = 'top';
        // eslint-disable-next-line @angular-eslint/no-output-rename
        this.visibleChange = new EventEmitter();
        this.componentRef = this.hostView.createComponent(NzToolTipComponent);
    }
    getProxyPropertyMap() {
        return Object.assign(Object.assign({}, super.getProxyPropertyMap()), { nzTooltipColor: ['nzColor', () => this.nzTooltipColor], nzTooltipTitleContext: ['nzTitleContext', () => this.titleContext] });
    }
}
NzTooltipDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTooltipDirective, deps: [{ token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }, { token: i0.Renderer2 }, { token: i1.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzTooltipDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTooltipDirective, selector: "[nz-tooltip]", inputs: { title: ["nzTooltipTitle", "title"], titleContext: ["nzTooltipTitleContext", "titleContext"], directiveTitle: ["nz-tooltip", "directiveTitle"], trigger: ["nzTooltipTrigger", "trigger"], placement: ["nzTooltipPlacement", "placement"], origin: ["nzTooltipOrigin", "origin"], visible: ["nzTooltipVisible", "visible"], mouseEnterDelay: ["nzTooltipMouseEnterDelay", "mouseEnterDelay"], mouseLeaveDelay: ["nzTooltipMouseLeaveDelay", "mouseLeaveDelay"], overlayClassName: ["nzTooltipOverlayClassName", "overlayClassName"], overlayStyle: ["nzTooltipOverlayStyle", "overlayStyle"], arrowPointAtCenter: ["nzTooltipArrowPointAtCenter", "arrowPointAtCenter"], nzTooltipColor: "nzTooltipColor" }, outputs: { visibleChange: "nzTooltipVisibleChange" }, host: { properties: { "class.ant-tooltip-open": "visible" } }, exportAs: ["nzTooltip"], usesInheritance: true, ngImport: i0 });
__decorate([
    InputBoolean()
], NzTooltipDirective.prototype, "arrowPointAtCenter", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-tooltip]',
                    exportAs: 'nzTooltip',
                    host: {
                        '[class.ant-tooltip-open]': 'visible'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }, { type: i0.Renderer2 }, { type: i1.NzNoAnimationDirective, decorators: [{
                        type: Host
                    }, {
                        type: Optional
                    }] }];
    }, propDecorators: { title: [{
                type: Input,
                args: ['nzTooltipTitle']
            }], titleContext: [{
                type: Input,
                args: ['nzTooltipTitleContext']
            }], directiveTitle: [{
                type: Input,
                args: ['nz-tooltip']
            }], trigger: [{
                type: Input,
                args: ['nzTooltipTrigger']
            }], placement: [{
                type: Input,
                args: ['nzTooltipPlacement']
            }], origin: [{
                type: Input,
                args: ['nzTooltipOrigin']
            }], visible: [{
                type: Input,
                args: ['nzTooltipVisible']
            }], mouseEnterDelay: [{
                type: Input,
                args: ['nzTooltipMouseEnterDelay']
            }], mouseLeaveDelay: [{
                type: Input,
                args: ['nzTooltipMouseLeaveDelay']
            }], overlayClassName: [{
                type: Input,
                args: ['nzTooltipOverlayClassName']
            }], overlayStyle: [{
                type: Input,
                args: ['nzTooltipOverlayStyle']
            }], arrowPointAtCenter: [{
                type: Input,
                args: ['nzTooltipArrowPointAtCenter']
            }], nzTooltipColor: [{
                type: Input
            }], visibleChange: [{
                type: Output,
                args: ['nzTooltipVisibleChange']
            }] } });
class NzToolTipComponent extends NzTooltipBaseComponent {
    constructor(cdr, directionality, noAnimation) {
        super(cdr, directionality, noAnimation);
        this.nzTitle = null;
        this.nzTitleContext = null;
        this._contentStyleMap = {};
    }
    isEmpty() {
        return isTooltipEmpty(this.nzTitle);
    }
    updateStyles() {
        const isColorPreset = this.nzColor && isPresetColor(this.nzColor);
        this._classMap = {
            [this.nzOverlayClassName]: true,
            [`${this._prefix}-placement-${this.preferredPlacement}`]: true,
            [`${this._prefix}-${this.nzColor}`]: isColorPreset
        };
        this._contentStyleMap = {
            backgroundColor: !!this.nzColor && !isColorPreset ? this.nzColor : null
        };
    }
}
NzToolTipComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzToolTipComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i3.Directionality, optional: true }, { token: i1.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzToolTipComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzToolTipComponent, selector: "nz-tooltip", exportAs: ["nzTooltipComponent"], usesInheritance: true, ngImport: i0, template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayPush]="true"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="ant-tooltip"
        [class.ant-tooltip-rtl]="dir === 'rtl'"
        [ngClass]="_classMap"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-tooltip-content">
          <div class="ant-tooltip-arrow">
            <span class="ant-tooltip-arrow-content" [ngStyle]="_contentStyleMap"></span>
          </div>
          <div class="ant-tooltip-inner" [ngStyle]="_contentStyleMap">
            <ng-container *nzStringTemplateOutlet="nzTitle; context: nzTitleContext">{{ nzTitle }}</ng-container>
          </div>
        </div>
      </div>
    </ng-template>
  `, isInline: true, directives: [{ type: i3$1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { type: i4.NzConnectedOverlayDirective, selector: "[cdkConnectedOverlay][nzConnectedOverlay]", inputs: ["nzArrowPointAtCenter"], exportAs: ["nzConnectedOverlay"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }, { type: i6.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], animations: [zoomBigMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzToolTipComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tooltip',
                    exportAs: 'nzTooltipComponent',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    animations: [zoomBigMotion],
                    template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayPush]="true"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="ant-tooltip"
        [class.ant-tooltip-rtl]="dir === 'rtl'"
        [ngClass]="_classMap"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-tooltip-content">
          <div class="ant-tooltip-arrow">
            <span class="ant-tooltip-arrow-content" [ngStyle]="_contentStyleMap"></span>
          </div>
          <div class="ant-tooltip-inner" [ngStyle]="_contentStyleMap">
            <ng-container *nzStringTemplateOutlet="nzTitle; context: nzTitleContext">{{ nzTitle }}</ng-container>
          </div>
        </div>
      </div>
    </ng-template>
  `,
                    preserveWhitespaces: false
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i3.Directionality, decorators: [{
                        type: Optional
                    }] }, { type: i1.NzNoAnimationDirective, decorators: [{
                        type: Host
                    }, {
                        type: Optional
                    }] }];
    } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzToolTipModule {
}
NzToolTipModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzToolTipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzToolTipModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzToolTipModule, declarations: [NzToolTipComponent, NzTooltipDirective], imports: [BidiModule, CommonModule, OverlayModule, NzOutletModule, NzOverlayModule, NzNoAnimationModule], exports: [NzToolTipComponent, NzTooltipDirective] });
NzToolTipModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzToolTipModule, imports: [[BidiModule, CommonModule, OverlayModule, NzOutletModule, NzOverlayModule, NzNoAnimationModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzToolTipModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzToolTipComponent, NzTooltipDirective],
                    exports: [NzToolTipComponent, NzTooltipDirective],
                    entryComponents: [NzToolTipComponent],
                    imports: [BidiModule, CommonModule, OverlayModule, NzOutletModule, NzOverlayModule, NzNoAnimationModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzToolTipComponent, NzToolTipModule, NzTooltipBaseComponent, NzTooltipBaseDirective, NzTooltipDirective, isTooltipEmpty };
//# sourceMappingURL=ng-zorro-antd-tooltip.mjs.map
