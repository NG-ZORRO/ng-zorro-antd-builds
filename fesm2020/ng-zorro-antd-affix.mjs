import { __decorate } from 'tslib';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, Optional, ViewChild, Input, Output, NgModule } from '@angular/core';
import { Subscription, ReplaySubject, Subject, merge, fromEvent } from 'rxjs';
import { takeUntil, map, throttleTime } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { shallowEqual, getStyleAsText, InputNumber } from 'ng-zorro-antd/core/util';
import * as i2 from 'ng-zorro-antd/core/services';
import * as i3 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i4 from 'ng-zorro-antd/cdk/resize-observer';
import * as i5 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
var AffixRespondEvents;
(function (AffixRespondEvents) {
    AffixRespondEvents["resize"] = "resize";
    AffixRespondEvents["scroll"] = "scroll";
    AffixRespondEvents["touchstart"] = "touchstart";
    AffixRespondEvents["touchmove"] = "touchmove";
    AffixRespondEvents["touchend"] = "touchend";
    AffixRespondEvents["pageshow"] = "pageshow";
    AffixRespondEvents["load"] = "LOAD";
})(AffixRespondEvents || (AffixRespondEvents = {}));

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function isTargetWindow(target) {
    return typeof window !== 'undefined' && target === window;
}
function getTargetRect(target) {
    return !isTargetWindow(target)
        ? target.getBoundingClientRect()
        : {
            top: 0,
            left: 0,
            bottom: 0
        };
}

const NZ_CONFIG_MODULE_NAME = 'affix';
const NZ_AFFIX_CLS_PREFIX = 'ant-affix';
const NZ_AFFIX_DEFAULT_SCROLL_TIME = 20;
class NzAffixComponent {
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

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzAffixModule {
}
NzAffixModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAffixModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzAffixModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAffixModule, declarations: [NzAffixComponent], imports: [BidiModule, CommonModule, PlatformModule], exports: [NzAffixComponent] });
NzAffixModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAffixModule, imports: [[BidiModule, CommonModule, PlatformModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAffixModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzAffixComponent],
                    exports: [NzAffixComponent],
                    imports: [BidiModule, CommonModule, PlatformModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzAffixComponent, NzAffixModule };
//# sourceMappingURL=ng-zorro-antd-affix.mjs.map
