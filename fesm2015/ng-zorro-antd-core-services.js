import { ɵɵdefineInjectable, ɵɵinject, NgZone, RendererFactory2, Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { auditTime, finalize, map, filter, startWith, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'ng-zorro-antd/core/environments';
import { getEventPosition, isTouchEvent } from 'ng-zorro-antd/core/util';
import { DOCUMENT } from '@angular/common';
import { reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import { MediaMatcher } from '@angular/cdk/layout';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NOOP = () => { };
const ɵ0 = NOOP;
class NzResizeService {
    constructor(ngZone, rendererFactory2) {
        this.ngZone = ngZone;
        this.rendererFactory2 = rendererFactory2;
        this.resizeSource$ = new Subject();
        this.listeners = 0;
        this.disposeHandle = NOOP;
        this.handler = () => {
            this.ngZone.run(() => {
                this.resizeSource$.next();
            });
        };
        this.renderer = this.rendererFactory2.createRenderer(null, null);
    }
    subscribe() {
        this.registerListener();
        return this.resizeSource$.pipe(auditTime(16), finalize(() => this.unregisterListener()));
    }
    unsubscribe() {
        this.unregisterListener();
    }
    registerListener() {
        if (this.listeners === 0) {
            this.ngZone.runOutsideAngular(() => {
                this.disposeHandle = this.renderer.listen('window', 'resize', this.handler);
            });
        }
        this.listeners += 1;
    }
    unregisterListener() {
        this.listeners -= 1;
        if (this.listeners === 0) {
            this.disposeHandle();
            this.disposeHandle = NOOP;
        }
    }
}
NzResizeService.ɵprov = ɵɵdefineInjectable({ factory: function NzResizeService_Factory() { return new NzResizeService(ɵɵinject(NgZone), ɵɵinject(RendererFactory2)); }, token: NzResizeService, providedIn: "root" });
NzResizeService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NzResizeService.ctorParameters = () => [
    { type: NgZone },
    { type: RendererFactory2 }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * When running in test, singletons should not be destroyed. So we keep references of singletons
 * in this global variable.
 */
const testSingleRegistry = new Map();
/**
 * Some singletons should have life cycle that is same to Angular's. This service make sure that
 * those singletons get destroyed in HMR.
 */
class NzSingletonService {
    constructor() {
        /**
         * This registry is used to register singleton in dev mode.
         * So that singletons get destroyed when hot module reload happens.
         *
         * This works in prod mode too but with no specific effect.
         */
        this._singletonRegistry = new Map();
    }
    get singletonRegistry() {
        return environment.isTestMode ? testSingleRegistry : this._singletonRegistry;
    }
    registerSingletonWithKey(key, target) {
        const alreadyHave = this.singletonRegistry.has(key);
        const item = alreadyHave ? this.singletonRegistry.get(key) : this.withNewTarget(target);
        if (!alreadyHave) {
            this.singletonRegistry.set(key, item);
        }
    }
    getSingletonWithKey(key) {
        return this.singletonRegistry.has(key) ? this.singletonRegistry.get(key).target : null;
    }
    withNewTarget(target) {
        return {
            target
        };
    }
}
NzSingletonService.ɵprov = ɵɵdefineInjectable({ factory: function NzSingletonService_Factory() { return new NzSingletonService(); }, token: NzSingletonService, providedIn: "root" });
NzSingletonService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function getPagePosition(event) {
    const e = getEventPosition(event);
    return {
        x: e.pageX,
        y: e.pageY
    };
}
/**
 * This module provide a global dragging service to other components.
 */
class NzDragService {
    constructor(rendererFactory2) {
        this.draggingThreshold = 5;
        this.currentDraggingSequence = null;
        this.currentStartingPoint = null;
        this.handleRegistry = new Set();
        this.renderer = rendererFactory2.createRenderer(null, null);
    }
    requestDraggingSequence(event) {
        if (!this.handleRegistry.size) {
            this.registerDraggingHandler(isTouchEvent(event));
        }
        // Complete last dragging sequence if a new target is dragged.
        if (this.currentDraggingSequence) {
            this.currentDraggingSequence.complete();
        }
        this.currentStartingPoint = getPagePosition(event);
        this.currentDraggingSequence = new Subject();
        return this.currentDraggingSequence.pipe(map((e) => {
            return {
                x: e.pageX - this.currentStartingPoint.x,
                y: e.pageY - this.currentStartingPoint.y
            };
        }), filter((e) => Math.abs(e.x) > this.draggingThreshold || Math.abs(e.y) > this.draggingThreshold), finalize(() => this.teardownDraggingSequence()));
    }
    registerDraggingHandler(isTouch) {
        if (isTouch) {
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'touchmove', (e) => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.next(e.touches[0] || e.changedTouches[0]);
                    }
                })
            });
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'touchend', () => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.complete();
                    }
                })
            });
        }
        else {
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'mousemove', e => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.next(e);
                    }
                })
            });
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'mouseup', () => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.complete();
                    }
                })
            });
        }
    }
    teardownDraggingSequence() {
        this.currentDraggingSequence = null;
    }
}
NzDragService.ɵprov = ɵɵdefineInjectable({ factory: function NzDragService_Factory() { return new NzDragService(ɵɵinject(RendererFactory2)); }, token: NzDragService, providedIn: "root" });
NzDragService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NzDragService.ctorParameters = () => [
    { type: RendererFactory2 }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function easeInOutCubic(t, b, c, d) {
    const cc = c - b;
    let tt = t / (d / 2);
    if (tt < 1) {
        return (cc / 2) * tt * tt * tt + b;
    }
    else {
        return (cc / 2) * ((tt -= 2) * tt * tt + 2) + b;
    }
}
class NzScrollService {
    constructor(doc) {
        this.doc = doc;
    }
    /** Set the position of the scroll bar of `el`. */
    setScrollTop(el, topValue = 0) {
        if (el === window) {
            this.doc.body.scrollTop = topValue;
            this.doc.documentElement.scrollTop = topValue;
        }
        else {
            el.scrollTop = topValue;
        }
    }
    /** Get position of `el` against window. */
    getOffset(el) {
        const ret = {
            top: 0,
            left: 0
        };
        if (!el || !el.getClientRects().length) {
            return ret;
        }
        const rect = el.getBoundingClientRect();
        if (rect.width || rect.height) {
            const doc = el.ownerDocument.documentElement;
            ret.top = rect.top - doc.clientTop;
            ret.left = rect.left - doc.clientLeft;
        }
        else {
            ret.top = rect.top;
            ret.left = rect.left;
        }
        return ret;
    }
    /** Get the position of the scoll bar of `el`. */
    // TODO: remove '| Window' as the fallback already happens here
    getScroll(target, top = true) {
        if (typeof window === 'undefined') {
            return 0;
        }
        const method = top ? 'scrollTop' : 'scrollLeft';
        let result = 0;
        if (this.isWindow(target)) {
            result = target[top ? 'pageYOffset' : 'pageXOffset'];
        }
        else if (target instanceof Document) {
            result = target.documentElement[method];
        }
        else if (target) {
            result = target[method];
        }
        if (target && !this.isWindow(target) && typeof result !== 'number') {
            result = (target.ownerDocument || target).documentElement[method];
        }
        return result;
    }
    isWindow(obj) {
        return obj !== null && obj !== undefined && obj === obj.window;
    }
    /**
     * Scroll `el` to some position with animation.
     *
     * @param containerEl container, `window` by default
     * @param y Scroll to `top`, 0 by default
     */
    scrollTo(containerEl, y = 0, options = {}) {
        const target = containerEl ? containerEl : window;
        const scrollTop = this.getScroll(target);
        const startTime = Date.now();
        const { easing, callback, duration = 450 } = options;
        const frameFunc = () => {
            const timestamp = Date.now();
            const time = timestamp - startTime;
            const nextScrollTop = (easing || easeInOutCubic)(time > duration ? duration : time, scrollTop, y, duration);
            if (this.isWindow(target)) {
                target.scrollTo(window.pageXOffset, nextScrollTop);
            }
            else if (target instanceof HTMLDocument || target.constructor.name === 'HTMLDocument') {
                target.documentElement.scrollTop = nextScrollTop;
            }
            else {
                target.scrollTop = nextScrollTop;
            }
            if (time < duration) {
                reqAnimFrame(frameFunc);
            }
            else if (typeof callback === 'function') {
                callback();
            }
        };
        reqAnimFrame(frameFunc);
    }
}
NzScrollService.ɵprov = ɵɵdefineInjectable({ factory: function NzScrollService_Factory() { return new NzScrollService(ɵɵinject(DOCUMENT)); }, token: NzScrollService, providedIn: "root" });
NzScrollService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NzScrollService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
var NzBreakpointEnum;
(function (NzBreakpointEnum) {
    NzBreakpointEnum["xxl"] = "xxl";
    NzBreakpointEnum["xl"] = "xl";
    NzBreakpointEnum["lg"] = "lg";
    NzBreakpointEnum["md"] = "md";
    NzBreakpointEnum["sm"] = "sm";
    NzBreakpointEnum["xs"] = "xs";
})(NzBreakpointEnum || (NzBreakpointEnum = {}));
const gridResponsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
};
const siderResponsiveMap = {
    xs: '(max-width: 479.98px)',
    sm: '(max-width: 575.98px)',
    md: '(max-width: 767.98px)',
    lg: '(max-width: 991.98px)',
    xl: '(max-width: 1199.98px)',
    xxl: '(max-width: 1599.98px)'
};
class NzBreakpointService {
    constructor(resizeService, mediaMatcher) {
        this.resizeService = resizeService;
        this.mediaMatcher = mediaMatcher;
        this.resizeService.subscribe().subscribe(() => { });
    }
    subscribe(breakpointMap, fullMap) {
        if (fullMap) {
            const get = () => this.matchMedia(breakpointMap, true);
            return this.resizeService.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged((x, y) => x[0] === y[0]), map(x => x[1]));
        }
        else {
            const get = () => this.matchMedia(breakpointMap);
            return this.resizeService.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged());
        }
    }
    matchMedia(breakpointMap, fullMap) {
        let bp = NzBreakpointEnum.md;
        const breakpointBooleanMap = {};
        Object.keys(breakpointMap).map(breakpoint => {
            const castBP = breakpoint;
            const matched = this.mediaMatcher.matchMedia(gridResponsiveMap[castBP]).matches;
            breakpointBooleanMap[breakpoint] = matched;
            if (matched) {
                bp = castBP;
            }
        });
        if (fullMap) {
            return [bp, breakpointBooleanMap];
        }
        else {
            return bp;
        }
    }
}
NzBreakpointService.ɵprov = ɵɵdefineInjectable({ factory: function NzBreakpointService_Factory() { return new NzBreakpointService(ɵɵinject(NzResizeService), ɵɵinject(MediaMatcher)); }, token: NzBreakpointService, providedIn: "root" });
NzBreakpointService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NzBreakpointService.ctorParameters = () => [
    { type: NzResizeService },
    { type: MediaMatcher }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzBreakpointEnum, NzBreakpointService, NzDragService, NzResizeService, NzScrollService, NzSingletonService, gridResponsiveMap, siderResponsiveMap, ɵ0 };
//# sourceMappingURL=ng-zorro-antd-core-services.js.map
