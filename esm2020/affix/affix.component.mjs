import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, merge, ReplaySubject, Subject, Subscription } from 'rxjs';
import { map, takeUntil, throttleTime } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { getStyleAsText, InputNumber, shallowEqual } from 'ng-zorro-antd/core/util';
import { AffixRespondEvents } from './respond-events';
import { getTargetRect } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "ng-zorro-antd/core/services";
import * as i3 from "@angular/cdk/platform";
import * as i4 from "ng-zorro-antd/cdk/resize-observer";
import * as i5 from "@angular/cdk/bidi";
const NZ_CONFIG_MODULE_NAME = 'affix';
const NZ_AFFIX_CLS_PREFIX = 'ant-affix';
const NZ_AFFIX_DEFAULT_SCROLL_TIME = 20;
export class NzAffixComponent {
    constructor(el, doc, nzConfigService, scrollSrv, ngZone, platform, renderer, nzResizeObserver, cdr, directionality) {
        this.nzConfigService = nzConfigService;
        this.scrollSrv = scrollSrv;
        this.ngZone = ngZone;
        this.platform = platform;
        this.renderer = renderer;
        this.nzResizeObserver = nzResizeObserver;
        this.cdr = cdr;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzChange = new EventEmitter();
        this.dir = 'ltr';
        this.positionChangeSubscription = Subscription.EMPTY;
        this.offsetChanged$ = new ReplaySubject(1);
        this.destroy$ = new Subject();
        // The wrapper would stay at the original position as a placeholder.
        this.placeholderNode = el.nativeElement;
        this.document = doc;
    }
    get target() {
        const el = this.nzTarget;
        return (typeof el === 'string' ? this.document.querySelector(el) : el) || window;
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.registerListeners();
            this.updatePosition({});
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngOnChanges(changes) {
        const { nzOffsetBottom, nzOffsetTop, nzTarget } = changes;
        if (nzOffsetBottom || nzOffsetTop) {
            this.offsetChanged$.next();
        }
        if (nzTarget) {
            this.registerListeners();
        }
    }
    ngAfterViewInit() {
        this.registerListeners();
    }
    ngOnDestroy() {
        this.removeListeners();
    }
    registerListeners() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.removeListeners();
        const el = this.target === window ? this.document.body : this.target;
        this.positionChangeSubscription = this.ngZone.runOutsideAngular(() => merge(...Object.keys(AffixRespondEvents).map(evName => fromEvent(this.target, evName)), this.offsetChanged$.pipe(map(() => ({}))), this.nzResizeObserver.observe(el))
            .pipe(throttleTime(NZ_AFFIX_DEFAULT_SCROLL_TIME, undefined, { trailing: true }), takeUntil(this.destroy$))
            .subscribe(e => this.updatePosition(e)));
        this.timeout = setTimeout(() => this.updatePosition({}));
    }
    removeListeners() {
        clearTimeout(this.timeout);
        this.positionChangeSubscription.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }
    getOffset(element, target) {
        const elemRect = element.getBoundingClientRect();
        const targetRect = getTargetRect(target);
        const scrollTop = this.scrollSrv.getScroll(target, true);
        const scrollLeft = this.scrollSrv.getScroll(target, false);
        const docElem = this.document.body;
        const clientTop = docElem.clientTop || 0;
        const clientLeft = docElem.clientLeft || 0;
        return {
            top: elemRect.top - targetRect.top + scrollTop - clientTop,
            left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
            width: elemRect.width,
            height: elemRect.height
        };
    }
    setAffixStyle(e, affixStyle) {
        const originalAffixStyle = this.affixStyle;
        const isWindow = this.target === window;
        if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
            return;
        }
        if (shallowEqual(originalAffixStyle, affixStyle)) {
            return;
        }
        const fixed = !!affixStyle;
        const wrapEl = this.fixedEl.nativeElement;
        this.renderer.setStyle(wrapEl, 'cssText', getStyleAsText(affixStyle));
        this.affixStyle = affixStyle;
        if (fixed) {
            wrapEl.classList.add(NZ_AFFIX_CLS_PREFIX);
        }
        else {
            wrapEl.classList.remove(NZ_AFFIX_CLS_PREFIX);
        }
        this.updateRtlClass();
        if ((affixStyle && !originalAffixStyle) || (!affixStyle && originalAffixStyle)) {
            this.nzChange.emit(fixed);
        }
    }
    setPlaceholderStyle(placeholderStyle) {
        const originalPlaceholderStyle = this.placeholderStyle;
        if (shallowEqual(placeholderStyle, originalPlaceholderStyle)) {
            return;
        }
        this.renderer.setStyle(this.placeholderNode, 'cssText', getStyleAsText(placeholderStyle));
        this.placeholderStyle = placeholderStyle;
    }
    syncPlaceholderStyle(e) {
        if (!this.affixStyle) {
            return;
        }
        this.renderer.setStyle(this.placeholderNode, 'cssText', '');
        this.placeholderStyle = undefined;
        const styleObj = {
            width: this.placeholderNode.offsetWidth,
            height: this.fixedEl.nativeElement.offsetHeight
        };
        this.setAffixStyle(e, {
            ...this.affixStyle,
            ...styleObj
        });
        this.setPlaceholderStyle(styleObj);
    }
    updatePosition(e) {
        if (!this.platform.isBrowser) {
            return;
        }
        const targetNode = this.target;
        let offsetTop = this.nzOffsetTop;
        const scrollTop = this.scrollSrv.getScroll(targetNode, true);
        const elemOffset = this.getOffset(this.placeholderNode, targetNode);
        const fixedNode = this.fixedEl.nativeElement;
        const elemSize = {
            width: fixedNode.offsetWidth,
            height: fixedNode.offsetHeight
        };
        const offsetMode = {
            top: false,
            bottom: false
        };
        // Default to `offsetTop=0`.
        if (typeof offsetTop !== 'number' && typeof this.nzOffsetBottom !== 'number') {
            offsetMode.top = true;
            offsetTop = 0;
        }
        else {
            offsetMode.top = typeof offsetTop === 'number';
            offsetMode.bottom = typeof this.nzOffsetBottom === 'number';
        }
        const targetRect = getTargetRect(targetNode);
        const targetInnerHeight = targetNode.innerHeight || targetNode.clientHeight;
        if (scrollTop >= elemOffset.top - offsetTop && offsetMode.top) {
            const width = elemOffset.width;
            const top = targetRect.top + offsetTop;
            this.setAffixStyle(e, {
                position: 'fixed',
                top,
                left: targetRect.left + elemOffset.left,
                width
            });
            this.setPlaceholderStyle({
                width,
                height: elemSize.height
            });
        }
        else if (scrollTop <= elemOffset.top + elemSize.height + this.nzOffsetBottom - targetInnerHeight &&
            offsetMode.bottom) {
            const targetBottomOffset = targetNode === window ? 0 : window.innerHeight - targetRect.bottom;
            const width = elemOffset.width;
            this.setAffixStyle(e, {
                position: 'fixed',
                bottom: targetBottomOffset + this.nzOffsetBottom,
                left: targetRect.left + elemOffset.left,
                width
            });
            this.setPlaceholderStyle({
                width,
                height: elemOffset.height
            });
        }
        else {
            if (e.type === AffixRespondEvents.resize &&
                this.affixStyle &&
                this.affixStyle.position === 'fixed' &&
                this.placeholderNode.offsetWidth) {
                this.setAffixStyle(e, {
                    ...this.affixStyle,
                    width: this.placeholderNode.offsetWidth
                });
            }
            else {
                this.setAffixStyle(e);
            }
            this.setPlaceholderStyle();
        }
        if (e.type === 'resize') {
            this.syncPlaceholderStyle(e);
        }
    }
    updateRtlClass() {
        const wrapEl = this.fixedEl.nativeElement;
        if (this.dir === 'rtl') {
            if (wrapEl.classList.contains(NZ_AFFIX_CLS_PREFIX)) {
                wrapEl.classList.add(`${NZ_AFFIX_CLS_PREFIX}-rtl`);
            }
            else {
                wrapEl.classList.remove(`${NZ_AFFIX_CLS_PREFIX}-rtl`);
            }
        }
        else {
            wrapEl.classList.remove(`${NZ_AFFIX_CLS_PREFIX}-rtl`);
        }
    }
}
NzAffixComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAffixComponent, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }, { token: i1.NzConfigService }, { token: i2.NzScrollService }, { token: i0.NgZone }, { token: i3.Platform }, { token: i0.Renderer2 }, { token: i4.NzResizeObserver }, { token: i0.ChangeDetectorRef }, { token: i5.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzAffixComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzAffixComponent, selector: "nz-affix", inputs: { nzTarget: "nzTarget", nzOffsetTop: "nzOffsetTop", nzOffsetBottom: "nzOffsetBottom" }, outputs: { nzChange: "nzChange" }, viewQueries: [{ propertyName: "fixedEl", first: true, predicate: ["fixedEl"], descendants: true, static: true }], exportAs: ["nzAffix"], usesOnChanges: true, ngImport: i0, template: `
    <div #fixedEl>
      <ng-content></ng-content>
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig(),
    InputNumber(undefined)
], NzAffixComponent.prototype, "nzOffsetTop", void 0);
__decorate([
    WithConfig(),
    InputNumber(undefined)
], NzAffixComponent.prototype, "nzOffsetBottom", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAffixComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-affix',
                    exportAs: 'nzAffix',
                    template: `
    <div #fixedEl>
      <ng-content></ng-content>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.NzConfigService }, { type: i2.NzScrollService }, { type: i0.NgZone }, { type: i3.Platform }, { type: i0.Renderer2 }, { type: i4.NzResizeObserver }, { type: i0.ChangeDetectorRef }, { type: i5.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { fixedEl: [{
                type: ViewChild,
                args: ['fixedEl', { static: true }]
            }], nzTarget: [{
                type: Input
            }], nzOffsetTop: [{
                type: Input
            }], nzOffsetBottom: [{
                type: Input
            }], nzChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZmaXguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9hZmZpeC9hZmZpeC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFLTCxRQUFRLEVBQ1IsTUFBTSxFQUdOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUQsT0FBTyxFQUFnQyxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUdyRixPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVwRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sU0FBUyxDQUFDOzs7Ozs7O0FBRXBELE1BQU0scUJBQXFCLEdBQWdCLE9BQU8sQ0FBQztBQUNuRCxNQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztBQUN4QyxNQUFNLDRCQUE0QixHQUFHLEVBQUUsQ0FBQztBQWF4QyxNQUFNLE9BQU8sZ0JBQWdCO0lBc0MzQixZQUNFLEVBQWMsRUFDSSxHQUFjLEVBQ3pCLGVBQWdDLEVBQy9CLFNBQTBCLEVBQzFCLE1BQWMsRUFDZCxRQUFrQixFQUNsQixRQUFtQixFQUNuQixnQkFBa0MsRUFDbEMsR0FBc0IsRUFDVixjQUE4QjtRQVAzQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDL0IsY0FBUyxHQUFULFNBQVMsQ0FBaUI7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBL0MzQyxrQkFBYSxHQUFnQixxQkFBcUIsQ0FBQztRQWtCekMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFFMUQsUUFBRyxHQUFjLEtBQUssQ0FBQztRQU1mLCtCQUEwQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzlELG1CQUFjLEdBQUcsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFxQnJDLG9FQUFvRTtRQUNwRSxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDdEIsQ0FBQztJQXBCRCxJQUFZLE1BQU07UUFDaEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDO0lBQ25GLENBQUM7SUFtQkQsUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFO1lBQzVGLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBVyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFFMUQsSUFBSSxjQUFjLElBQUksV0FBVyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDNUI7UUFDRCxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU8saUJBQWlCO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUM1QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBRSxJQUFJLENBQUMsTUFBa0IsQ0FBQztRQUNsRixJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FDbkUsS0FBSyxDQUNILEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ2hGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FDbEM7YUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLDRCQUE0QixFQUFFLFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDekcsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFVLENBQUMsQ0FBQyxDQUNuRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTyxlQUFlO1FBQ3JCLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsU0FBUyxDQUFDLE9BQWdCLEVBQUUsTUFBb0M7UUFDOUQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDakQsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLE1BQU8sQ0FBQyxDQUFDO1FBRTFDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFM0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDbkMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDekMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7UUFFM0MsT0FBTztZQUNMLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLFNBQVM7WUFDMUQsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksR0FBRyxVQUFVLEdBQUcsVUFBVTtZQUMvRCxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7WUFDckIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO1NBQ3hCLENBQUM7SUFDSixDQUFDO0lBRU8sYUFBYSxDQUFDLENBQVEsRUFBRSxVQUE2QjtRQUMzRCxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUM7UUFDeEMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxrQkFBa0IsSUFBSSxVQUFVLElBQUksUUFBUSxFQUFFO1lBQ3ZFLE9BQU87U0FDUjtRQUNELElBQUksWUFBWSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxFQUFFO1lBQ2hELE9BQU87U0FDUjtRQUVELE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDM0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLEtBQUssRUFBRTtZQUNULE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFO1lBQzlFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVPLG1CQUFtQixDQUFDLGdCQUFtQztRQUM3RCxNQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2RCxJQUFJLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSx3QkFBd0IsQ0FBQyxFQUFFO1lBQzVELE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0lBQzNDLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxDQUFRO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7UUFDbEMsTUFBTSxRQUFRLEdBQUc7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXO1lBQ3ZDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZO1NBQ2hELENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRTtZQUNwQixHQUFHLElBQUksQ0FBQyxVQUFVO1lBQ2xCLEdBQUcsUUFBUTtTQUNaLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsY0FBYyxDQUFDLENBQVE7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQzVCLE9BQU87U0FDUjtRQUVELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDL0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNqQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFVBQVcsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzdDLE1BQU0sUUFBUSxHQUFHO1lBQ2YsS0FBSyxFQUFFLFNBQVMsQ0FBQyxXQUFXO1lBQzVCLE1BQU0sRUFBRSxTQUFTLENBQUMsWUFBWTtTQUMvQixDQUFDO1FBQ0YsTUFBTSxVQUFVLEdBQUc7WUFDakIsR0FBRyxFQUFFLEtBQUs7WUFDVixNQUFNLEVBQUUsS0FBSztTQUNkLENBQUM7UUFDRiw0QkFBNEI7UUFDNUIsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsY0FBYyxLQUFLLFFBQVEsRUFBRTtZQUM1RSxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztZQUN0QixTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ2Y7YUFBTTtZQUNMLFVBQVUsQ0FBQyxHQUFHLEdBQUcsT0FBTyxTQUFTLEtBQUssUUFBUSxDQUFDO1lBQy9DLFVBQVUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxJQUFJLENBQUMsY0FBYyxLQUFLLFFBQVEsQ0FBQztTQUM3RDtRQUNELE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxVQUFvQixDQUFDLENBQUM7UUFDdkQsTUFBTSxpQkFBaUIsR0FBSSxVQUFxQixDQUFDLFdBQVcsSUFBSyxVQUEwQixDQUFDLFlBQVksQ0FBQztRQUN6RyxJQUFJLFNBQVMsSUFBSSxVQUFVLENBQUMsR0FBRyxHQUFJLFNBQW9CLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUN6RSxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQy9CLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEdBQUksU0FBb0IsQ0FBQztZQUNuRCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRTtnQkFDcEIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLEdBQUc7Z0JBQ0gsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUk7Z0JBQ3ZDLEtBQUs7YUFDTixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsbUJBQW1CLENBQUM7Z0JBQ3ZCLEtBQUs7Z0JBQ0wsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2FBQ3hCLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFDTCxTQUFTLElBQUksVUFBVSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFJLElBQUksQ0FBQyxjQUF5QixHQUFHLGlCQUFpQjtZQUNuRyxVQUFVLENBQUMsTUFBTSxFQUNqQjtZQUNBLE1BQU0sa0JBQWtCLEdBQUcsVUFBVSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxNQUFPLENBQUM7WUFDL0YsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRTtnQkFDcEIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLE1BQU0sRUFBRSxrQkFBa0IsR0FBSSxJQUFJLENBQUMsY0FBeUI7Z0JBQzVELElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJO2dCQUN2QyxLQUFLO2FBQ04sQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDO2dCQUN2QixLQUFLO2dCQUNMLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTTthQUMxQixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFDRSxDQUFDLENBQUMsSUFBSSxLQUFLLGtCQUFrQixDQUFDLE1BQU07Z0JBQ3BDLElBQUksQ0FBQyxVQUFVO2dCQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLE9BQU87Z0JBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUNoQztnQkFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRTtvQkFDcEIsR0FBRyxJQUFJLENBQUMsVUFBVTtvQkFDbEIsS0FBSyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVztpQkFDeEMsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QjtZQUNELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzVCO1FBRUQsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUN2QixJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRU8sY0FBYztRQUNwQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUMxQyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxFQUFFO1lBQ3RCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtnQkFDbEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxtQkFBbUIsTUFBTSxDQUFDLENBQUM7YUFDcEQ7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxtQkFBbUIsTUFBTSxDQUFDLENBQUM7YUFDdkQ7U0FDRjthQUFNO1lBQ0wsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxtQkFBbUIsTUFBTSxDQUFDLENBQUM7U0FDdkQ7SUFDSCxDQUFDOzs2R0EvUVUsZ0JBQWdCLDRDQXdDakIsUUFBUTtpR0F4Q1AsZ0JBQWdCLGlWQVJqQjs7OztHQUlUO0FBZ0JEO0lBRkMsVUFBVSxFQUFpQjtJQUMzQixXQUFXLENBQUMsU0FBUyxDQUFDO3FEQUNLO0FBSzVCO0lBRkMsVUFBVSxFQUFpQjtJQUMzQixXQUFXLENBQUMsU0FBUyxDQUFDO3dEQUNROzJGQWpCcEIsZ0JBQWdCO2tCQVg1QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUsU0FBUztvQkFDbkIsUUFBUSxFQUFFOzs7O0dBSVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN0Qzs7MEJBeUNJLE1BQU07MkJBQUMsUUFBUTs7MEJBUWYsUUFBUTs0Q0EzQ3FDLE9BQU87c0JBQXRELFNBQVM7dUJBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFFN0IsUUFBUTtzQkFBaEIsS0FBSztnQkFLTixXQUFXO3NCQUhWLEtBQUs7Z0JBUU4sY0FBYztzQkFIYixLQUFLO2dCQUthLFFBQVE7c0JBQTFCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlLCBSZXBsYXlTdWJqZWN0LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFrZVVudGlsLCB0aHJvdHRsZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56UmVzaXplT2JzZXJ2ZXIgfSBmcm9tICduZy16b3Jyby1hbnRkL2Nkay9yZXNpemUtb2JzZXJ2ZXInO1xuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgTnpTY3JvbGxTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7IE5nU3R5bGVJbnRlcmZhY2UsIE51bWJlcklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3R5bGVBc1RleHQsIElucHV0TnVtYmVyLCBzaGFsbG93RXF1YWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IEFmZml4UmVzcG9uZEV2ZW50cyB9IGZyb20gJy4vcmVzcG9uZC1ldmVudHMnO1xuaW1wb3J0IHsgZ2V0VGFyZ2V0UmVjdCwgU2ltcGxlUmVjdCB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBOWl9DT05GSUdfTU9EVUxFX05BTUU6IE56Q29uZmlnS2V5ID0gJ2FmZml4JztcbmNvbnN0IE5aX0FGRklYX0NMU19QUkVGSVggPSAnYW50LWFmZml4JztcbmNvbnN0IE5aX0FGRklYX0RFRkFVTFRfU0NST0xMX1RJTUUgPSAyMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotYWZmaXgnLFxuICBleHBvcnRBczogJ256QWZmaXgnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgI2ZpeGVkRWw+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE56QWZmaXhDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek9mZnNldFRvcDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek9mZnNldEJvdHRvbTogTnVtYmVySW5wdXQ7XG5cbiAgQFZpZXdDaGlsZCgnZml4ZWRFbCcsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgZml4ZWRFbCE6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuXG4gIEBJbnB1dCgpIG56VGFyZ2V0Pzogc3RyaW5nIHwgRWxlbWVudCB8IFdpbmRvdztcblxuICBASW5wdXQoKVxuICBAV2l0aENvbmZpZzxudW1iZXIgfCBudWxsPigpXG4gIEBJbnB1dE51bWJlcih1bmRlZmluZWQpXG4gIG56T2Zmc2V0VG9wPzogbnVsbCB8IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBAV2l0aENvbmZpZzxudW1iZXIgfCBudWxsPigpXG4gIEBJbnB1dE51bWJlcih1bmRlZmluZWQpXG4gIG56T2Zmc2V0Qm90dG9tPzogbnVsbCB8IG51bWJlcjtcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcblxuICBwcml2YXRlIHJlYWRvbmx5IHBsYWNlaG9sZGVyTm9kZTogSFRNTEVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSBhZmZpeFN0eWxlPzogTmdTdHlsZUludGVyZmFjZTtcbiAgcHJpdmF0ZSBwbGFjZWhvbGRlclN0eWxlPzogTmdTdHlsZUludGVyZmFjZTtcbiAgcHJpdmF0ZSBwb3NpdGlvbkNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIG9mZnNldENoYW5nZWQkID0gbmV3IFJlcGxheVN1YmplY3QoMSk7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIHRpbWVvdXQ/OiBudW1iZXI7XG4gIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIHByaXZhdGUgZ2V0IHRhcmdldCgpOiBFbGVtZW50IHwgV2luZG93IHtcbiAgICBjb25zdCBlbCA9IHRoaXMubnpUYXJnZXQ7XG4gICAgcmV0dXJuICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnID8gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKSA6IGVsKSB8fCB3aW5kb3c7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbDogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2M6IE56U2FmZUFueSxcbiAgICBwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzY3JvbGxTcnY6IE56U2Nyb2xsU2VydmljZSxcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIG56UmVzaXplT2JzZXJ2ZXI6IE56UmVzaXplT2JzZXJ2ZXIsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5XG4gICkge1xuICAgIC8vIFRoZSB3cmFwcGVyIHdvdWxkIHN0YXkgYXQgdGhlIG9yaWdpbmFsIHBvc2l0aW9uIGFzIGEgcGxhY2Vob2xkZXIuXG4gICAgdGhpcy5wbGFjZWhvbGRlck5vZGUgPSBlbC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2M7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZT8ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycygpO1xuICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbih7fSBhcyBFdmVudCk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuek9mZnNldEJvdHRvbSwgbnpPZmZzZXRUb3AsIG56VGFyZ2V0IH0gPSBjaGFuZ2VzO1xuXG4gICAgaWYgKG56T2Zmc2V0Qm90dG9tIHx8IG56T2Zmc2V0VG9wKSB7XG4gICAgICB0aGlzLm9mZnNldENoYW5nZWQkLm5leHQoKTtcbiAgICB9XG4gICAgaWYgKG56VGFyZ2V0KSB7XG4gICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuICAgIGNvbnN0IGVsID0gdGhpcy50YXJnZXQgPT09IHdpbmRvdyA/IHRoaXMuZG9jdW1lbnQuYm9keSA6ICh0aGlzLnRhcmdldCBhcyBFbGVtZW50KTtcbiAgICB0aGlzLnBvc2l0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cbiAgICAgIG1lcmdlKFxuICAgICAgICAuLi5PYmplY3Qua2V5cyhBZmZpeFJlc3BvbmRFdmVudHMpLm1hcChldk5hbWUgPT4gZnJvbUV2ZW50KHRoaXMudGFyZ2V0LCBldk5hbWUpKSxcbiAgICAgICAgdGhpcy5vZmZzZXRDaGFuZ2VkJC5waXBlKG1hcCgoKSA9PiAoe30pKSksXG4gICAgICAgIHRoaXMubnpSZXNpemVPYnNlcnZlci5vYnNlcnZlKGVsKVxuICAgICAgKVxuICAgICAgICAucGlwZSh0aHJvdHRsZVRpbWUoTlpfQUZGSVhfREVGQVVMVF9TQ1JPTExfVElNRSwgdW5kZWZpbmVkLCB7IHRyYWlsaW5nOiB0cnVlIH0pLCB0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoZSA9PiB0aGlzLnVwZGF0ZVBvc2l0aW9uKGUgYXMgRXZlbnQpKVxuICAgICk7XG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZVBvc2l0aW9uKHt9IGFzIEV2ZW50KSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUxpc3RlbmVycygpOiB2b2lkIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB0aGlzLnBvc2l0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgZ2V0T2Zmc2V0KGVsZW1lbnQ6IEVsZW1lbnQsIHRhcmdldDogRWxlbWVudCB8IFdpbmRvdyB8IHVuZGVmaW5lZCk6IFNpbXBsZVJlY3Qge1xuICAgIGNvbnN0IGVsZW1SZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB0YXJnZXRSZWN0ID0gZ2V0VGFyZ2V0UmVjdCh0YXJnZXQhKTtcblxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuc2Nyb2xsU3J2LmdldFNjcm9sbCh0YXJnZXQsIHRydWUpO1xuICAgIGNvbnN0IHNjcm9sbExlZnQgPSB0aGlzLnNjcm9sbFNydi5nZXRTY3JvbGwodGFyZ2V0LCBmYWxzZSk7XG5cbiAgICBjb25zdCBkb2NFbGVtID0gdGhpcy5kb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IGNsaWVudFRvcCA9IGRvY0VsZW0uY2xpZW50VG9wIHx8IDA7XG4gICAgY29uc3QgY2xpZW50TGVmdCA9IGRvY0VsZW0uY2xpZW50TGVmdCB8fCAwO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogZWxlbVJlY3QudG9wIC0gdGFyZ2V0UmVjdC50b3AgKyBzY3JvbGxUb3AgLSBjbGllbnRUb3AsXG4gICAgICBsZWZ0OiBlbGVtUmVjdC5sZWZ0IC0gdGFyZ2V0UmVjdC5sZWZ0ICsgc2Nyb2xsTGVmdCAtIGNsaWVudExlZnQsXG4gICAgICB3aWR0aDogZWxlbVJlY3Qud2lkdGgsXG4gICAgICBoZWlnaHQ6IGVsZW1SZWN0LmhlaWdodFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHNldEFmZml4U3R5bGUoZTogRXZlbnQsIGFmZml4U3R5bGU/OiBOZ1N0eWxlSW50ZXJmYWNlKTogdm9pZCB7XG4gICAgY29uc3Qgb3JpZ2luYWxBZmZpeFN0eWxlID0gdGhpcy5hZmZpeFN0eWxlO1xuICAgIGNvbnN0IGlzV2luZG93ID0gdGhpcy50YXJnZXQgPT09IHdpbmRvdztcbiAgICBpZiAoZS50eXBlID09PSAnc2Nyb2xsJyAmJiBvcmlnaW5hbEFmZml4U3R5bGUgJiYgYWZmaXhTdHlsZSAmJiBpc1dpbmRvdykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc2hhbGxvd0VxdWFsKG9yaWdpbmFsQWZmaXhTdHlsZSwgYWZmaXhTdHlsZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBmaXhlZCA9ICEhYWZmaXhTdHlsZTtcbiAgICBjb25zdCB3cmFwRWwgPSB0aGlzLmZpeGVkRWwubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHdyYXBFbCwgJ2Nzc1RleHQnLCBnZXRTdHlsZUFzVGV4dChhZmZpeFN0eWxlKSk7XG4gICAgdGhpcy5hZmZpeFN0eWxlID0gYWZmaXhTdHlsZTtcbiAgICBpZiAoZml4ZWQpIHtcbiAgICAgIHdyYXBFbC5jbGFzc0xpc3QuYWRkKE5aX0FGRklYX0NMU19QUkVGSVgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cmFwRWwuY2xhc3NMaXN0LnJlbW92ZShOWl9BRkZJWF9DTFNfUFJFRklYKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVSdGxDbGFzcygpO1xuICAgIGlmICgoYWZmaXhTdHlsZSAmJiAhb3JpZ2luYWxBZmZpeFN0eWxlKSB8fCAoIWFmZml4U3R5bGUgJiYgb3JpZ2luYWxBZmZpeFN0eWxlKSkge1xuICAgICAgdGhpcy5uekNoYW5nZS5lbWl0KGZpeGVkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFBsYWNlaG9sZGVyU3R5bGUocGxhY2Vob2xkZXJTdHlsZT86IE5nU3R5bGVJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBjb25zdCBvcmlnaW5hbFBsYWNlaG9sZGVyU3R5bGUgPSB0aGlzLnBsYWNlaG9sZGVyU3R5bGU7XG4gICAgaWYgKHNoYWxsb3dFcXVhbChwbGFjZWhvbGRlclN0eWxlLCBvcmlnaW5hbFBsYWNlaG9sZGVyU3R5bGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wbGFjZWhvbGRlck5vZGUsICdjc3NUZXh0JywgZ2V0U3R5bGVBc1RleHQocGxhY2Vob2xkZXJTdHlsZSkpO1xuICAgIHRoaXMucGxhY2Vob2xkZXJTdHlsZSA9IHBsYWNlaG9sZGVyU3R5bGU7XG4gIH1cblxuICBwcml2YXRlIHN5bmNQbGFjZWhvbGRlclN0eWxlKGU6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmFmZml4U3R5bGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBsYWNlaG9sZGVyTm9kZSwgJ2Nzc1RleHQnLCAnJyk7XG4gICAgdGhpcy5wbGFjZWhvbGRlclN0eWxlID0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHN0eWxlT2JqID0ge1xuICAgICAgd2lkdGg6IHRoaXMucGxhY2Vob2xkZXJOb2RlLm9mZnNldFdpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmZpeGVkRWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHRcbiAgICB9O1xuICAgIHRoaXMuc2V0QWZmaXhTdHlsZShlLCB7XG4gICAgICAuLi50aGlzLmFmZml4U3R5bGUsXG4gICAgICAuLi5zdHlsZU9ialxuICAgIH0pO1xuICAgIHRoaXMuc2V0UGxhY2Vob2xkZXJTdHlsZShzdHlsZU9iaik7XG4gIH1cblxuICB1cGRhdGVQb3NpdGlvbihlOiBFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXROb2RlID0gdGhpcy50YXJnZXQ7XG4gICAgbGV0IG9mZnNldFRvcCA9IHRoaXMubnpPZmZzZXRUb3A7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxTcnYuZ2V0U2Nyb2xsKHRhcmdldE5vZGUsIHRydWUpO1xuICAgIGNvbnN0IGVsZW1PZmZzZXQgPSB0aGlzLmdldE9mZnNldCh0aGlzLnBsYWNlaG9sZGVyTm9kZSwgdGFyZ2V0Tm9kZSEpO1xuICAgIGNvbnN0IGZpeGVkTm9kZSA9IHRoaXMuZml4ZWRFbC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGVsZW1TaXplID0ge1xuICAgICAgd2lkdGg6IGZpeGVkTm9kZS5vZmZzZXRXaWR0aCxcbiAgICAgIGhlaWdodDogZml4ZWROb2RlLm9mZnNldEhlaWdodFxuICAgIH07XG4gICAgY29uc3Qgb2Zmc2V0TW9kZSA9IHtcbiAgICAgIHRvcDogZmFsc2UsXG4gICAgICBib3R0b206IGZhbHNlXG4gICAgfTtcbiAgICAvLyBEZWZhdWx0IHRvIGBvZmZzZXRUb3A9MGAuXG4gICAgaWYgKHR5cGVvZiBvZmZzZXRUb3AgIT09ICdudW1iZXInICYmIHR5cGVvZiB0aGlzLm56T2Zmc2V0Qm90dG9tICE9PSAnbnVtYmVyJykge1xuICAgICAgb2Zmc2V0TW9kZS50b3AgPSB0cnVlO1xuICAgICAgb2Zmc2V0VG9wID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgb2Zmc2V0TW9kZS50b3AgPSB0eXBlb2Ygb2Zmc2V0VG9wID09PSAnbnVtYmVyJztcbiAgICAgIG9mZnNldE1vZGUuYm90dG9tID0gdHlwZW9mIHRoaXMubnpPZmZzZXRCb3R0b20gPT09ICdudW1iZXInO1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXRSZWN0ID0gZ2V0VGFyZ2V0UmVjdCh0YXJnZXROb2RlIGFzIFdpbmRvdyk7XG4gICAgY29uc3QgdGFyZ2V0SW5uZXJIZWlnaHQgPSAodGFyZ2V0Tm9kZSBhcyBXaW5kb3cpLmlubmVySGVpZ2h0IHx8ICh0YXJnZXROb2RlIGFzIEhUTUxFbGVtZW50KS5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKHNjcm9sbFRvcCA+PSBlbGVtT2Zmc2V0LnRvcCAtIChvZmZzZXRUb3AgYXMgbnVtYmVyKSAmJiBvZmZzZXRNb2RlLnRvcCkge1xuICAgICAgY29uc3Qgd2lkdGggPSBlbGVtT2Zmc2V0LndpZHRoO1xuICAgICAgY29uc3QgdG9wID0gdGFyZ2V0UmVjdC50b3AgKyAob2Zmc2V0VG9wIGFzIG51bWJlcik7XG4gICAgICB0aGlzLnNldEFmZml4U3R5bGUoZSwge1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgdG9wLFxuICAgICAgICBsZWZ0OiB0YXJnZXRSZWN0LmxlZnQgKyBlbGVtT2Zmc2V0LmxlZnQsXG4gICAgICAgIHdpZHRoXG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXJTdHlsZSh7XG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGVsZW1TaXplLmhlaWdodFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHNjcm9sbFRvcCA8PSBlbGVtT2Zmc2V0LnRvcCArIGVsZW1TaXplLmhlaWdodCArICh0aGlzLm56T2Zmc2V0Qm90dG9tIGFzIG51bWJlcikgLSB0YXJnZXRJbm5lckhlaWdodCAmJlxuICAgICAgb2Zmc2V0TW9kZS5ib3R0b21cbiAgICApIHtcbiAgICAgIGNvbnN0IHRhcmdldEJvdHRvbU9mZnNldCA9IHRhcmdldE5vZGUgPT09IHdpbmRvdyA/IDAgOiB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0YXJnZXRSZWN0LmJvdHRvbSE7XG4gICAgICBjb25zdCB3aWR0aCA9IGVsZW1PZmZzZXQud2lkdGg7XG4gICAgICB0aGlzLnNldEFmZml4U3R5bGUoZSwge1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgYm90dG9tOiB0YXJnZXRCb3R0b21PZmZzZXQgKyAodGhpcy5uek9mZnNldEJvdHRvbSBhcyBudW1iZXIpLFxuICAgICAgICBsZWZ0OiB0YXJnZXRSZWN0LmxlZnQgKyBlbGVtT2Zmc2V0LmxlZnQsXG4gICAgICAgIHdpZHRoXG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXJTdHlsZSh7XG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGVsZW1PZmZzZXQuaGVpZ2h0XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICBlLnR5cGUgPT09IEFmZml4UmVzcG9uZEV2ZW50cy5yZXNpemUgJiZcbiAgICAgICAgdGhpcy5hZmZpeFN0eWxlICYmXG4gICAgICAgIHRoaXMuYWZmaXhTdHlsZS5wb3NpdGlvbiA9PT0gJ2ZpeGVkJyAmJlxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTm9kZS5vZmZzZXRXaWR0aFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc2V0QWZmaXhTdHlsZShlLCB7XG4gICAgICAgICAgLi4udGhpcy5hZmZpeFN0eWxlLFxuICAgICAgICAgIHdpZHRoOiB0aGlzLnBsYWNlaG9sZGVyTm9kZS5vZmZzZXRXaWR0aFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0QWZmaXhTdHlsZShlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXJTdHlsZSgpO1xuICAgIH1cblxuICAgIGlmIChlLnR5cGUgPT09ICdyZXNpemUnKSB7XG4gICAgICB0aGlzLnN5bmNQbGFjZWhvbGRlclN0eWxlKGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUnRsQ2xhc3MoKTogdm9pZCB7XG4gICAgY29uc3Qgd3JhcEVsID0gdGhpcy5maXhlZEVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuZGlyID09PSAncnRsJykge1xuICAgICAgaWYgKHdyYXBFbC5jbGFzc0xpc3QuY29udGFpbnMoTlpfQUZGSVhfQ0xTX1BSRUZJWCkpIHtcbiAgICAgICAgd3JhcEVsLmNsYXNzTGlzdC5hZGQoYCR7TlpfQUZGSVhfQ0xTX1BSRUZJWH0tcnRsYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cmFwRWwuY2xhc3NMaXN0LnJlbW92ZShgJHtOWl9BRkZJWF9DTFNfUFJFRklYfS1ydGxgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgd3JhcEVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7TlpfQUZGSVhfQ0xTX1BSRUZJWH0tcnRsYCk7XG4gICAgfVxuICB9XG59XG4iXX0=