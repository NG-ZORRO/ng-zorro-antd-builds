import { Directive, EventEmitter, Optional, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DEFAULT_TOOLTIP_POSITIONS, getPlacementName, POSITION_MAP } from 'ng-zorro-antd/core/overlay';
import { isNotNil, toBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/no-animation";
import * as i2 from "ng-zorro-antd/core/config";
import * as i3 from "@angular/cdk/bidi";
export class NzTooltipBaseDirective {
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
        this.component?.show();
    }
    hide() {
        this.component?.hide();
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
                this.delayEnterLeave(true, false, this._mouseLeaveDelay);
                if (this.component?.overlay.overlayRef && !overlayElement) {
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
        const mappingProperties = {
            // common mappings
            title: ['nzTitle', () => this._title],
            directiveTitle: ['nzTitle', () => this._title],
            content: ['nzContent', () => this._content],
            directiveContent: ['nzContent', () => this._content],
            trigger: ['nzTrigger', () => this._trigger],
            placement: ['nzPlacement', () => this._placement],
            visible: ['nzVisible', () => this._visible],
            mouseEnterDelay: ['nzMouseEnterDelay', () => this._mouseEnterDelay],
            mouseLeaveDelay: ['nzMouseLeaveDelay', () => this._mouseLeaveDelay],
            overlayClassName: ['nzOverlayClassName', () => this._overlayClassName],
            overlayStyle: ['nzOverlayStyle', () => this._overlayStyle],
            arrowPointAtCenter: ['nzArrowPointAtCenter', () => this.arrowPointAtCenter],
            ...this.getProxyPropertyMap()
        };
        (keys || Object.keys(mappingProperties).filter(key => !key.startsWith('directive'))).forEach((property) => {
            if (mappingProperties[property]) {
                const [name, valueFn] = mappingProperties[property];
                this.updateComponentValue(name, valueFn());
            }
        });
        this.component?.updateByDirective();
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
export class NzTooltipBaseComponent {
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
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
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
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i1.NzNoAnimationDirective }]; }, propDecorators: { overlay: [{
                type: ViewChild,
                args: ['overlay', { static: false }]
            }] } });
export function isTooltipEmpty(value) {
    return value instanceof TemplateRef ? false : value === '' || !isNotNil(value);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdG9vbHRpcC9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFLTCxTQUFTLEVBRVQsWUFBWSxFQUlaLFFBQVEsRUFHUixXQUFXLEVBQ1gsU0FBUyxFQUVWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSWpFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQWlCLE1BQU0sNEJBQTRCLENBQUM7QUFFdEgsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUFTOUQsTUFBTSxPQUFnQixzQkFBc0I7SUE2RTFDLFlBQ1MsVUFBc0IsRUFDbkIsUUFBMEIsRUFDMUIsUUFBa0MsRUFDbEMsUUFBbUIsRUFDbkIsV0FBb0MsRUFDcEMsZUFBaUM7UUFMcEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUMxQixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUNwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFwRTdDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQStDcEMsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFVYixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUMvQix1QkFBa0IsR0FBc0IsRUFBRSxDQUFDO0lBVzNELENBQUM7SUE5REo7O09BRUc7SUFDSCxJQUFjLE1BQU07UUFDbEIsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxjQUFjLElB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QUFHO1lBQ2YsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxJQUFJO1lBQy9CLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxjQUFjLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEVBQUUsSUFBSTtTQUMvRCxDQUFDO0lBQ0osQ0FBQzs7bUhBaEttQixzQkFBc0I7dUdBQXRCLHNCQUFzQjsyRkFBdEIsc0JBQXNCO2tCQUYzQyxTQUFTOzswQkFnRUwsUUFBUTtpRkExRDhCLE9BQU87c0JBQS9DLFNBQVM7dUJBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7QUFvS3pDLE1BQU0sVUFBVSxjQUFjLENBQUMsS0FBd0M7SUFDckUsT0FBTyxLQUFLLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBDZGtDb25uZWN0ZWRPdmVybGF5LCBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UsIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpDb25maWdTZXJ2aWNlLCBQb3BDb25maXJtQ29uZmlnLCBQb3BvdmVyQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBOek5vQW5pbWF0aW9uRGlyZWN0aXZlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL25vLWFuaW1hdGlvbic7XG5pbXBvcnQgeyBERUZBVUxUX1RPT0xUSVBfUE9TSVRJT05TLCBnZXRQbGFjZW1lbnROYW1lLCBQT1NJVElPTl9NQVAsIFBPU0lUSU9OX1RZUEUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3ZlcmxheSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE5nQ2xhc3NJbnRlcmZhY2UsIE5nU3R5bGVJbnRlcmZhY2UsIE56U2FmZUFueSwgTnpUU1R5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgaXNOb3ROaWwsIHRvQm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBQcm9wZXJ0eU1hcHBpbmcge1xuICBba2V5OiBzdHJpbmddOiBbc3RyaW5nLCAoKSA9PiB1bmtub3duXTtcbn1cblxuZXhwb3J0IHR5cGUgTnpUb29sdGlwVHJpZ2dlciA9ICdjbGljaycgfCAnZm9jdXMnIHwgJ2hvdmVyJyB8IG51bGw7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE56VG9vbHRpcEJhc2VEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIGFycm93UG9pbnRBdENlbnRlcj86IGJvb2xlYW47XG4gIGNvbmZpZz86IFJlcXVpcmVkPFBvcG92ZXJDb25maWcgfCBQb3BDb25maXJtQ29uZmlnPjtcbiAgZGlyZWN0aXZlVGl0bGU/OiBOelRTVHlwZSB8IG51bGw7XG4gIGRpcmVjdGl2ZUNvbnRlbnQ/OiBOelRTVHlwZSB8IG51bGw7XG4gIHRpdGxlPzogTnpUU1R5cGUgfCBudWxsO1xuICBjb250ZW50PzogTnpUU1R5cGUgfCBudWxsO1xuICB0cmlnZ2VyPzogTnpUb29sdGlwVHJpZ2dlcjtcbiAgcGxhY2VtZW50Pzogc3RyaW5nIHwgc3RyaW5nW107XG4gIG9yaWdpbj86IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICB2aXNpYmxlPzogYm9vbGVhbjtcbiAgbW91c2VFbnRlckRlbGF5PzogbnVtYmVyO1xuICBtb3VzZUxlYXZlRGVsYXk/OiBudW1iZXI7XG4gIG92ZXJsYXlDbGFzc05hbWU/OiBzdHJpbmc7XG4gIG92ZXJsYXlTdHlsZT86IE5nU3R5bGVJbnRlcmZhY2U7XG4gIHZpc2libGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIEZvciBjcmVhdGUgdG9vbHRpcCBkeW5hbWljYWxseS4gVGhpcyBzaG91bGQgYmUgb3ZlcnJpZGUgZm9yIGVhY2ggZGlmZmVyZW50IGNvbXBvbmVudC5cbiAgICovXG4gIHByb3RlY3RlZCBjb21wb25lbnRSZWYhOiBDb21wb25lbnRSZWY8TnpUb29sdGlwQmFzZUNvbXBvbmVudD47XG5cbiAgLyoqXG4gICAqIFRoaXMgdHJ1ZSB0aXRsZSB0aGF0IHdvdWxkIGJlIHVzZWQgaW4gb3RoZXIgcGFydHMgb24gdGhpcyBjb21wb25lbnQuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0IF90aXRsZSgpOiBOelRTVHlwZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnRpdGxlIHx8IHRoaXMuZGlyZWN0aXZlVGl0bGUgfHwgbnVsbDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgX2NvbnRlbnQoKTogTnpUU1R5cGUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50IHx8IHRoaXMuZGlyZWN0aXZlQ29udGVudCB8fCBudWxsO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBfdHJpZ2dlcigpOiBOelRvb2x0aXBUcmlnZ2VyIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMudHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCcgPyB0aGlzLnRyaWdnZXIgOiAnaG92ZXInO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBfcGxhY2VtZW50KCk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBwID0gdGhpcy5wbGFjZW1lbnQ7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocCkgJiYgcC5sZW5ndGggPiAwID8gcCA6IHR5cGVvZiBwID09PSAnc3RyaW5nJyAmJiBwID8gW3BdIDogWyd0b3AnXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgX3Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0eXBlb2YgdGhpcy52aXNpYmxlICE9PSAndW5kZWZpbmVkJyA/IHRoaXMudmlzaWJsZSA6IHRoaXMuaW50ZXJuYWxWaXNpYmxlKSB8fCBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgX21vdXNlRW50ZXJEZWxheSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm1vdXNlRW50ZXJEZWxheSB8fCAwLjE1O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBfbW91c2VMZWF2ZURlbGF5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubW91c2VMZWF2ZURlbGF5IHx8IDAuMTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgX292ZXJsYXlDbGFzc05hbWUoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheUNsYXNzTmFtZSB8fCBudWxsO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBfb3ZlcmxheVN0eWxlKCk6IE5nU3R5bGVJbnRlcmZhY2UgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5U3R5bGUgfHwgbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgaW50ZXJuYWxWaXNpYmxlID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIGdldFByb3h5UHJvcGVydHlNYXAoKTogUHJvcGVydHlNYXBwaW5nIHtcbiAgICByZXR1cm4ge1xuICAgICAgbm9BbmltYXRpb246IFsnbm9BbmltYXRpb24nLCAoKSA9PiAhIXRoaXMubm9BbmltYXRpb25dXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudD86IE56VG9vbHRpcEJhc2VDb21wb25lbnQ7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRyaWdnZXJEaXNwb3NhYmxlczogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcblxuICBwcml2YXRlIGRlbGF5VGltZXI/OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIGhvc3RWaWV3OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByb3RlY3RlZCByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByb3RlY3RlZCBub0FuaW1hdGlvbj86IE56Tm9BbmltYXRpb25EaXJlY3RpdmUsXG4gICAgcHJvdGVjdGVkIG56Q29uZmlnU2VydmljZT86IE56Q29uZmlnU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgdHJpZ2dlciB9ID0gY2hhbmdlcztcblxuICAgIGlmICh0cmlnZ2VyICYmICF0cmlnZ2VyLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5yZWdpc3RlclRyaWdnZXJzKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICB0aGlzLnVwZGF0ZVByb3BlcnRpZXNCeUNoYW5nZXMoY2hhbmdlcyk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY3JlYXRlQ29tcG9uZW50KCk7XG4gICAgdGhpcy5yZWdpc3RlclRyaWdnZXJzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG5cbiAgICAvLyBDbGVhciB0b2dnbGluZyB0aW1lci4gSXNzdWUgIzM4NzUgIzQzMTcgIzQzODZcbiAgICB0aGlzLmNsZWFyVG9nZ2xpbmdUaW1lcigpO1xuICAgIHRoaXMucmVtb3ZlVHJpZ2dlckxpc3RlbmVycygpO1xuICB9XG5cbiAgc2hvdygpOiB2b2lkIHtcbiAgICB0aGlzLmNvbXBvbmVudD8uc2hvdygpO1xuICB9XG5cbiAgaGlkZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbXBvbmVudD8uaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlIHRoZSBjb21wb25lbnQgdG8gdXBkYXRlIGl0cyBwb3NpdGlvbi5cbiAgICovXG4gIHVwZGF0ZVBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbXBvbmVudCkge1xuICAgICAgdGhpcy5jb21wb25lbnQudXBkYXRlUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgZHluYW1pYyB0b29sdGlwIGNvbXBvbmVudC4gVGhpcyBtZXRob2QgY2FuIGJlIG92ZXJyaWRlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZUNvbXBvbmVudCgpOiB2b2lkIHtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmNvbXBvbmVudFJlZjtcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZSBhcyBOelRvb2x0aXBCYXNlQ29tcG9uZW50O1xuXG4gICAgLy8gUmVtb3ZlIHRoZSBjb21wb25lbnQncyBET00gYmVjYXVzZSBpdCBzaG91bGQgYmUgaW4gdGhlIG92ZXJsYXkgY29udGFpbmVyLlxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoXG4gICAgICB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLFxuICAgICAgY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRcbiAgICApO1xuICAgIHRoaXMuY29tcG9uZW50LnNldE92ZXJsYXlPcmlnaW4odGhpcy5vcmlnaW4gfHwgdGhpcy5lbGVtZW50UmVmKTtcblxuICAgIHRoaXMuaW5pdFByb3BlcnRpZXMoKTtcblxuICAgIHRoaXMuY29tcG9uZW50Lm56VmlzaWJsZUNoYW5nZVxuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgodmlzaWJsZTogYm9vbGVhbikgPT4ge1xuICAgICAgICB0aGlzLmludGVybmFsVmlzaWJsZSA9IHZpc2libGU7XG4gICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KHZpc2libGUpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVnaXN0ZXJUcmlnZ2VycygpOiB2b2lkIHtcbiAgICAvLyBXaGVuIHRoZSBtZXRob2QgZ2V0cyBpbnZva2VkLCBhbGwgcHJvcGVydGllcyBoYXMgYmVlbiBzeW5jZWQgdG8gdGhlIGR5bmFtaWMgY29tcG9uZW50LlxuICAgIC8vIEFmdGVyIHJlbW92aW5nIHRoZSBvbGQgQVBJLCB3ZSBjYW4ganVzdCBjaGVjayB0aGUgZGlyZWN0aXZlJ3Mgb3duIGBuelRyaWdnZXJgLlxuICAgIGNvbnN0IGVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgdHJpZ2dlciA9IHRoaXMudHJpZ2dlcjtcblxuICAgIHRoaXMucmVtb3ZlVHJpZ2dlckxpc3RlbmVycygpO1xuXG4gICAgaWYgKHRyaWdnZXIgPT09ICdob3ZlcicpIHtcbiAgICAgIGxldCBvdmVybGF5RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgICB0aGlzLnRyaWdnZXJEaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kZWxheUVudGVyTGVhdmUodHJ1ZSwgdHJ1ZSwgdGhpcy5fbW91c2VFbnRlckRlbGF5KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICB0aGlzLnRyaWdnZXJEaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kZWxheUVudGVyTGVhdmUodHJ1ZSwgZmFsc2UsIHRoaXMuX21vdXNlTGVhdmVEZWxheSk7XG4gICAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50Py5vdmVybGF5Lm92ZXJsYXlSZWYgJiYgIW92ZXJsYXlFbGVtZW50KSB7XG4gICAgICAgICAgICBvdmVybGF5RWxlbWVudCA9IHRoaXMuY29tcG9uZW50Lm92ZXJsYXkub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckRpc3Bvc2FibGVzLnB1c2goXG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKG92ZXJsYXlFbGVtZW50LCAnbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGF5RW50ZXJMZWF2ZShmYWxzZSwgdHJ1ZSwgdGhpcy5fbW91c2VFbnRlckRlbGF5KTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJEaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihvdmVybGF5RWxlbWVudCwgJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxheUVudGVyTGVhdmUoZmFsc2UsIGZhbHNlLCB0aGlzLl9tb3VzZUxlYXZlRGVsYXkpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodHJpZ2dlciA9PT0gJ2ZvY3VzJykge1xuICAgICAgdGhpcy50cmlnZ2VyRGlzcG9zYWJsZXMucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2ZvY3VzaW4nLCAoKSA9PiB0aGlzLnNob3coKSkpO1xuICAgICAgdGhpcy50cmlnZ2VyRGlzcG9zYWJsZXMucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2ZvY3Vzb3V0JywgKCkgPT4gdGhpcy5oaWRlKCkpKTtcbiAgICB9IGVsc2UgaWYgKHRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgIHRoaXMudHJpZ2dlckRpc3Bvc2FibGVzLnB1c2goXG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAnY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIEVsc2UgZG8gbm90aGluZyBiZWNhdXNlIHVzZXIgd2FudHMgdG8gY29udHJvbCB0aGUgdmlzaWJpbGl0eSBwcm9ncmFtbWF0aWNhbGx5LlxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVQcm9wZXJ0aWVzQnlDaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVByb3BlcnRpZXNCeUtleXMoT2JqZWN0LmtleXMoY2hhbmdlcykpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVQcm9wZXJ0aWVzQnlLZXlzKGtleXM/OiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGNvbnN0IG1hcHBpbmdQcm9wZXJ0aWVzOiBQcm9wZXJ0eU1hcHBpbmcgPSB7XG4gICAgICAvLyBjb21tb24gbWFwcGluZ3NcbiAgICAgIHRpdGxlOiBbJ256VGl0bGUnLCAoKSA9PiB0aGlzLl90aXRsZV0sXG4gICAgICBkaXJlY3RpdmVUaXRsZTogWyduelRpdGxlJywgKCkgPT4gdGhpcy5fdGl0bGVdLFxuICAgICAgY29udGVudDogWyduekNvbnRlbnQnLCAoKSA9PiB0aGlzLl9jb250ZW50XSxcbiAgICAgIGRpcmVjdGl2ZUNvbnRlbnQ6IFsnbnpDb250ZW50JywgKCkgPT4gdGhpcy5fY29udGVudF0sXG4gICAgICB0cmlnZ2VyOiBbJ256VHJpZ2dlcicsICgpID0+IHRoaXMuX3RyaWdnZXJdLFxuICAgICAgcGxhY2VtZW50OiBbJ256UGxhY2VtZW50JywgKCkgPT4gdGhpcy5fcGxhY2VtZW50XSxcbiAgICAgIHZpc2libGU6IFsnbnpWaXNpYmxlJywgKCkgPT4gdGhpcy5fdmlzaWJsZV0sXG4gICAgICBtb3VzZUVudGVyRGVsYXk6IFsnbnpNb3VzZUVudGVyRGVsYXknLCAoKSA9PiB0aGlzLl9tb3VzZUVudGVyRGVsYXldLFxuICAgICAgbW91c2VMZWF2ZURlbGF5OiBbJ256TW91c2VMZWF2ZURlbGF5JywgKCkgPT4gdGhpcy5fbW91c2VMZWF2ZURlbGF5XSxcbiAgICAgIG92ZXJsYXlDbGFzc05hbWU6IFsnbnpPdmVybGF5Q2xhc3NOYW1lJywgKCkgPT4gdGhpcy5fb3ZlcmxheUNsYXNzTmFtZV0sXG4gICAgICBvdmVybGF5U3R5bGU6IFsnbnpPdmVybGF5U3R5bGUnLCAoKSA9PiB0aGlzLl9vdmVybGF5U3R5bGVdLFxuICAgICAgYXJyb3dQb2ludEF0Q2VudGVyOiBbJ256QXJyb3dQb2ludEF0Q2VudGVyJywgKCkgPT4gdGhpcy5hcnJvd1BvaW50QXRDZW50ZXJdLFxuICAgICAgLi4udGhpcy5nZXRQcm94eVByb3BlcnR5TWFwKClcbiAgICB9O1xuXG4gICAgKGtleXMgfHwgT2JqZWN0LmtleXMobWFwcGluZ1Byb3BlcnRpZXMpLmZpbHRlcihrZXkgPT4gIWtleS5zdGFydHNXaXRoKCdkaXJlY3RpdmUnKSkpLmZvckVhY2goXG4gICAgICAocHJvcGVydHk6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICBpZiAobWFwcGluZ1Byb3BlcnRpZXNbcHJvcGVydHldKSB7XG4gICAgICAgICAgY29uc3QgW25hbWUsIHZhbHVlRm5dID0gbWFwcGluZ1Byb3BlcnRpZXNbcHJvcGVydHldO1xuICAgICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50VmFsdWUobmFtZSwgdmFsdWVGbigpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLmNvbXBvbmVudD8udXBkYXRlQnlEaXJlY3RpdmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFByb3BlcnRpZXMoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVQcm9wZXJ0aWVzQnlLZXlzKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNvbXBvbmVudFZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogTnpTYWZlQW55KTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRoaXMuY29tcG9uZW50W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlbGF5RW50ZXJMZWF2ZShpc09yaWdpbjogYm9vbGVhbiwgaXNFbnRlcjogYm9vbGVhbiwgZGVsYXk6IG51bWJlciA9IC0xKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGVsYXlUaW1lcikge1xuICAgICAgdGhpcy5jbGVhclRvZ2dsaW5nVGltZXIoKTtcbiAgICB9IGVsc2UgaWYgKGRlbGF5ID4gMCkge1xuICAgICAgdGhpcy5kZWxheVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZGVsYXlUaW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgaXNFbnRlciA/IHRoaXMuc2hvdygpIDogdGhpcy5oaWRlKCk7XG4gICAgICB9LCBkZWxheSAqIDEwMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBgaXNPcmlnaW5gIGlzIHVzZWQgZHVlIHRvIHRoZSB0b29sdGlwIHdpbGwgbm90IGhpZGUgaW1tZWRpYXRlbHlcbiAgICAgIC8vIChtYXkgY2F1c2VkIGJ5IHRoZSBmYWRlLW91dCBhbmltYXRpb24pLlxuICAgICAgaXNFbnRlciAmJiBpc09yaWdpbiA/IHRoaXMuc2hvdygpIDogdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVUcmlnZ2VyTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIHRoaXMudHJpZ2dlckRpc3Bvc2FibGVzLmZvckVhY2goZGlzcG9zZSA9PiBkaXNwb3NlKCkpO1xuICAgIHRoaXMudHJpZ2dlckRpc3Bvc2FibGVzLmxlbmd0aCA9IDA7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyVG9nZ2xpbmdUaW1lcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kZWxheVRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5kZWxheVRpbWVyKTtcbiAgICAgIHRoaXMuZGVsYXlUaW1lciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cblxuQERpcmVjdGl2ZSgpXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1jbGFzcy1zdWZmaXhcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOelRvb2x0aXBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpWaXNpYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekFycm93UG9pbnRBdENlbnRlcjogQm9vbGVhbklucHV0O1xuXG4gIEBWaWV3Q2hpbGQoJ292ZXJsYXknLCB7IHN0YXRpYzogZmFsc2UgfSkgb3ZlcmxheSE6IENka0Nvbm5lY3RlZE92ZXJsYXk7XG5cbiAgbnpUaXRsZTogTnpUU1R5cGUgfCBudWxsID0gbnVsbDtcbiAgbnpDb250ZW50OiBOelRTVHlwZSB8IG51bGwgPSBudWxsO1xuICBuekFycm93UG9pbnRBdENlbnRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBuek92ZXJsYXlDbGFzc05hbWUhOiBzdHJpbmc7XG4gIG56T3ZlcmxheVN0eWxlOiBOZ1N0eWxlSW50ZXJmYWNlID0ge307XG4gIG56QmFja2Ryb3AgPSBmYWxzZTtcbiAgbnpNb3VzZUVudGVyRGVsYXk/OiBudW1iZXI7XG4gIG56TW91c2VMZWF2ZURlbGF5PzogbnVtYmVyO1xuXG4gIG56VmlzaWJsZUNoYW5nZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgc2V0IG56VmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IHZpc2libGUgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICAgIGlmICh0aGlzLl92aXNpYmxlICE9PSB2aXNpYmxlKSB7XG4gICAgICB0aGlzLl92aXNpYmxlID0gdmlzaWJsZTtcbiAgICAgIHRoaXMubnpWaXNpYmxlQ2hhbmdlLm5leHQodmlzaWJsZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG56VmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgfVxuXG4gIF92aXNpYmxlID0gZmFsc2U7XG5cbiAgc2V0IG56VHJpZ2dlcih2YWx1ZTogTnpUb29sdGlwVHJpZ2dlcikge1xuICAgIHRoaXMuX3RyaWdnZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBuelRyaWdnZXIoKTogTnpUb29sdGlwVHJpZ2dlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RyaWdnZXI7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3RyaWdnZXI6IE56VG9vbHRpcFRyaWdnZXIgPSAnaG92ZXInO1xuXG4gIHNldCBuelBsYWNlbWVudCh2YWx1ZTogUE9TSVRJT05fVFlQRVtdKSB7XG4gICAgY29uc3QgcHJlZmVycmVkUG9zaXRpb24gPSB2YWx1ZS5tYXAocGxhY2VtZW50ID0+IFBPU0lUSU9OX01BUFtwbGFjZW1lbnRdKTtcbiAgICB0aGlzLl9wb3NpdGlvbnMgPSBbLi4ucHJlZmVycmVkUG9zaXRpb24sIC4uLkRFRkFVTFRfVE9PTFRJUF9QT1NJVElPTlNdO1xuICB9XG5cbiAgcHJlZmVycmVkUGxhY2VtZW50OiBzdHJpbmcgPSAndG9wJztcblxuICBvcmlnaW4hOiBFbGVtZW50UmVmPE56U2FmZUFueT47XG5cbiAgcHVibGljIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG5cbiAgX2NsYXNzTWFwOiBOZ0NsYXNzSW50ZXJmYWNlID0ge307XG5cbiAgX3ByZWZpeCA9ICdhbnQtdG9vbHRpcCc7XG5cbiAgX3Bvc2l0aW9uczogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdID0gWy4uLkRFRkFVTFRfVE9PTFRJUF9QT1NJVElPTlNdO1xuXG4gIHByb3RlY3RlZCBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHksXG4gICAgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubnpWaXNpYmxlQ2hhbmdlLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgc2hvdygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uelZpc2libGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaXNFbXB0eSgpKSB7XG4gICAgICB0aGlzLm56VmlzaWJsZSA9IHRydWU7XG4gICAgICB0aGlzLm56VmlzaWJsZUNoYW5nZS5uZXh0KHRydWUpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIC8vIGZvciBsdHIgZm9yIG92ZXJsYXkgdG8gZGlzcGxheSB0b29sdGlwIGluIGNvcnJlY3QgcGxhY2VtZW50IGluIHJ0bCBkaXJlY3Rpb24uXG4gICAgaWYgKHRoaXMub3JpZ2luICYmIHRoaXMub3ZlcmxheSAmJiB0aGlzLm92ZXJsYXkub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXkub3ZlcmxheVJlZi5nZXREaXJlY3Rpb24oKSA9PT0gJ3J0bCcpIHtcbiAgICAgIHRoaXMub3ZlcmxheS5vdmVybGF5UmVmLnNldERpcmVjdGlvbignbHRyJyk7XG4gICAgfVxuICB9XG5cbiAgaGlkZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpWaXNpYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5uelZpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLm56VmlzaWJsZUNoYW5nZS5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICB1cGRhdGVCeURpcmVjdGl2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVN0eWxlcygpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcblxuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgdGhpcy51cGRhdGVWaXNpYmlsaXR5QnlUaXRsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlIHRoZSBjb21wb25lbnQgdG8gdXBkYXRlIGl0cyBwb3NpdGlvbi5cbiAgICovXG4gIHVwZGF0ZVBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9yaWdpbiAmJiB0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5Lm92ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMub3ZlcmxheS5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgb25Qb3NpdGlvbkNoYW5nZShwb3NpdGlvbjogQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlKTogdm9pZCB7XG4gICAgdGhpcy5wcmVmZXJyZWRQbGFjZW1lbnQgPSBnZXRQbGFjZW1lbnROYW1lKHBvc2l0aW9uKSE7XG4gICAgdGhpcy51cGRhdGVTdHlsZXMoKTtcblxuICAgIC8vIFdlIGhhdmUgdG8gdHJpZ2dlciBpbW1lZGlhdGUgY2hhbmdlIGRldGVjdGlvbiBvciB0aGUgZWxlbWVudCB3b3VsZCBibGluay5cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBzZXRPdmVybGF5T3JpZ2luKG9yaWdpbjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pOiB2b2lkIHtcbiAgICB0aGlzLm9yaWdpbiA9IG9yaWdpbjtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG9uQ2xpY2tPdXRzaWRlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9yaWdpbi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgJiYgdGhpcy5uelRyaWdnZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIHRoZSBjb21wb25lbnQgd2hpbGUgdGhlIGNvbnRlbnQgaXMgZW1wdHkuXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVZpc2liaWxpdHlCeVRpdGxlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzRW1wdHkoKSkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZVN0eWxlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9jbGFzc01hcCA9IHtcbiAgICAgIFt0aGlzLm56T3ZlcmxheUNsYXNzTmFtZV06IHRydWUsXG4gICAgICBbYCR7dGhpcy5fcHJlZml4fS1wbGFjZW1lbnQtJHt0aGlzLnByZWZlcnJlZFBsYWNlbWVudH1gXTogdHJ1ZVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRW1wdHkgY29tcG9uZW50IGNhbm5vdCBiZSBvcGVuZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgaXNFbXB0eSgpOiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUb29sdGlwRW1wdHkodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCk6IGJvb2xlYW4ge1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZiA/IGZhbHNlIDogdmFsdWUgPT09ICcnIHx8ICFpc05vdE5pbCh2YWx1ZSk7XG59XG4iXX0=