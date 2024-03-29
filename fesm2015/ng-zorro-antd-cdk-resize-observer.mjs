import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Directive, Output, Input, NgModule } from '@angular/core';
import { __decorate } from 'tslib';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { coerceElement } from '@angular/cdk/coercion';
import { Observable, Subject } from 'rxjs';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Factory that creates a new ResizeObserver and allows us to stub it out in unit tests.
 */
class NzResizeObserverFactory {
    create(callback) {
        return typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(callback);
    }
}
NzResizeObserverFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverFactory, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NzResizeObserverFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverFactory, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverFactory, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
/** An injectable service that allows watching elements for changes to their content. */
class NzResizeObserver {
    constructor(nzResizeObserverFactory) {
        this.nzResizeObserverFactory = nzResizeObserverFactory;
        /** Keeps track of the existing ResizeObservers so they can be reused. */
        this.observedElements = new Map();
    }
    ngOnDestroy() {
        this.observedElements.forEach((_, element) => this.cleanupObserver(element));
    }
    observe(elementOrRef) {
        const element = coerceElement(elementOrRef);
        return new Observable((observer) => {
            const stream = this.observeElement(element);
            const subscription = stream.subscribe(observer);
            return () => {
                subscription.unsubscribe();
                this.unobserveElement(element);
            };
        });
    }
    /**
     * Observes the given element by using the existing ResizeObserver if available, or creating a
     * new one if not.
     */
    observeElement(element) {
        if (!this.observedElements.has(element)) {
            const stream = new Subject();
            const observer = this.nzResizeObserverFactory.create((mutations) => stream.next(mutations));
            if (observer) {
                observer.observe(element);
            }
            this.observedElements.set(element, { observer, stream, count: 1 });
        }
        else {
            this.observedElements.get(element).count++;
        }
        return this.observedElements.get(element).stream;
    }
    /**
     * Un-observes the given element and cleans up the underlying ResizeObserver if nobody else is
     * observing this element.
     */
    unobserveElement(element) {
        if (this.observedElements.has(element)) {
            this.observedElements.get(element).count--;
            if (!this.observedElements.get(element).count) {
                this.cleanupObserver(element);
            }
        }
    }
    /** Clean up the underlying ResizeObserver for the specified element. */
    cleanupObserver(element) {
        if (this.observedElements.has(element)) {
            const { observer, stream } = this.observedElements.get(element);
            if (observer) {
                observer.disconnect();
            }
            stream.complete();
            this.observedElements.delete(element);
        }
    }
}
NzResizeObserver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserver, deps: [{ token: NzResizeObserverFactory }], target: i0.ɵɵFactoryTarget.Injectable });
NzResizeObserver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: NzResizeObserverFactory }]; } });

class NzResizeObserverDirective {
    constructor(nzResizeObserver, elementRef) {
        this.nzResizeObserver = nzResizeObserver;
        this.elementRef = elementRef;
        this.nzResizeObserve = new EventEmitter();
        this.nzResizeObserverDisabled = false;
        this.currentSubscription = null;
    }
    subscribe() {
        this.unsubscribe();
        this.currentSubscription = this.nzResizeObserver.observe(this.elementRef).subscribe(this.nzResizeObserve);
    }
    unsubscribe() {
        var _a;
        (_a = this.currentSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    ngAfterContentInit() {
        if (!this.currentSubscription && !this.nzResizeObserverDisabled) {
            this.subscribe();
        }
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    ngOnChanges(changes) {
        const { nzResizeObserve } = changes;
        if (nzResizeObserve) {
            if (this.nzResizeObserverDisabled) {
                this.unsubscribe();
            }
            else {
                this.subscribe();
            }
        }
    }
}
NzResizeObserverDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverDirective, deps: [{ token: NzResizeObserver }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NzResizeObserverDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzResizeObserverDirective, selector: "[nzResizeObserver]", inputs: { nzResizeObserverDisabled: "nzResizeObserverDisabled" }, outputs: { nzResizeObserve: "nzResizeObserve" }, usesOnChanges: true, ngImport: i0 });
__decorate([
    InputBoolean()
], NzResizeObserverDirective.prototype, "nzResizeObserverDisabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzResizeObserver]'
                }]
        }], ctorParameters: function () { return [{ type: NzResizeObserver }, { type: i0.ElementRef }]; }, propDecorators: { nzResizeObserve: [{
                type: Output
            }], nzResizeObserverDisabled: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzResizeObserverModule {
}
NzResizeObserverModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzResizeObserverModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverModule, declarations: [NzResizeObserverDirective], exports: [NzResizeObserverDirective] });
NzResizeObserverModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverModule, providers: [NzResizeObserverFactory] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [NzResizeObserverFactory],
                    declarations: [NzResizeObserverDirective],
                    exports: [NzResizeObserverDirective]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzResizeObserver, NzResizeObserverDirective, NzResizeObserverFactory, NzResizeObserverModule };
//# sourceMappingURL=ng-zorro-antd-cdk-resize-observer.mjs.map
