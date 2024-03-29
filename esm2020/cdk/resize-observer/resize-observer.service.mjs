/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { coerceElement } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Factory that creates a new ResizeObserver and allows us to stub it out in unit tests.
 */
export class NzResizeObserverFactory {
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
export class NzResizeObserver {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLW9ic2VydmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2Nkay9yZXNpemUtb2JzZXJ2ZXIvcmVzaXplLW9ic2VydmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBYyxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBWSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBRXJEOztHQUVHO0FBRUgsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxNQUFNLENBQUMsUUFBZ0M7UUFDckMsT0FBTyxPQUFPLGNBQWMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckYsQ0FBQzs7b0hBSFUsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FEVixNQUFNOzJGQUNuQix1QkFBdUI7a0JBRG5DLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOztBQU9sQyx3RkFBd0Y7QUFFeEYsTUFBTSxPQUFPLGdCQUFnQjtJQVczQixZQUFvQix1QkFBZ0Q7UUFBaEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQVZwRSx5RUFBeUU7UUFDakUscUJBQWdCLEdBQUcsSUFBSSxHQUFHLEVBTy9CLENBQUM7SUFFbUUsQ0FBQztJQUV4RSxXQUFXO1FBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsT0FBTyxDQUFDLFlBQTJDO1FBQ2pELE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU1QyxPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsUUFBeUMsRUFBRSxFQUFFO1lBQ2xFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUMsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVoRCxPQUFPLEdBQUcsRUFBRTtnQkFDVixZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSyxjQUFjLENBQUMsT0FBZ0I7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQXlCLENBQUM7WUFDcEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQWdDLEVBQUUsRUFBRSxDQUN4RixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUN2QixDQUFDO1lBQ0YsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMzQjtZQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwRTthQUFNO1lBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUM3QztRQUNELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUUsQ0FBQyxNQUFNLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGdCQUFnQixDQUFDLE9BQWdCO1FBQ3ZDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBRSxDQUFDLEtBQUssRUFBRTtnQkFDOUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMvQjtTQUNGO0lBQ0gsQ0FBQztJQUVELHdFQUF3RTtJQUNoRSxlQUFlLENBQUMsT0FBZ0I7UUFDdEMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3RDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUUsQ0FBQztZQUNqRSxJQUFJLFFBQVEsRUFBRTtnQkFDWixRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDdkI7WUFDRCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7OzZHQTFFVSxnQkFBZ0Isa0JBV2tCLHVCQUF1QjtpSEFYekQsZ0JBQWdCLGNBREgsTUFBTTsyRkFDbkIsZ0JBQWdCO2tCQUQ1QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTswREFZYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBjb2VyY2VFbGVtZW50IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBGYWN0b3J5IHRoYXQgY3JlYXRlcyBhIG5ldyBSZXNpemVPYnNlcnZlciBhbmQgYWxsb3dzIHVzIHRvIHN0dWIgaXQgb3V0IGluIHVuaXQgdGVzdHMuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTnpSZXNpemVPYnNlcnZlckZhY3Rvcnkge1xuICBjcmVhdGUoY2FsbGJhY2s6IFJlc2l6ZU9ic2VydmVyQ2FsbGJhY2spOiBSZXNpemVPYnNlcnZlciB8IG51bGwge1xuICAgIHJldHVybiB0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IG5ldyBSZXNpemVPYnNlcnZlcihjYWxsYmFjayk7XG4gIH1cbn1cblxuLyoqIEFuIGluamVjdGFibGUgc2VydmljZSB0aGF0IGFsbG93cyB3YXRjaGluZyBlbGVtZW50cyBmb3IgY2hhbmdlcyB0byB0aGVpciBjb250ZW50LiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBOelJlc2l6ZU9ic2VydmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqIEtlZXBzIHRyYWNrIG9mIHRoZSBleGlzdGluZyBSZXNpemVPYnNlcnZlcnMgc28gdGhleSBjYW4gYmUgcmV1c2VkLiAqL1xuICBwcml2YXRlIG9ic2VydmVkRWxlbWVudHMgPSBuZXcgTWFwPFxuICAgIEVsZW1lbnQsXG4gICAge1xuICAgICAgb2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyIHwgbnVsbDtcbiAgICAgIHN0cmVhbTogU3ViamVjdDxSZXNpemVPYnNlcnZlckVudHJ5W10+O1xuICAgICAgY291bnQ6IG51bWJlcjtcbiAgICB9XG4gID4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG56UmVzaXplT2JzZXJ2ZXJGYWN0b3J5OiBOelJlc2l6ZU9ic2VydmVyRmFjdG9yeSkge31cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm9ic2VydmVkRWxlbWVudHMuZm9yRWFjaCgoXywgZWxlbWVudCkgPT4gdGhpcy5jbGVhbnVwT2JzZXJ2ZXIoZWxlbWVudCkpO1xuICB9XG5cbiAgb2JzZXJ2ZShlbGVtZW50T3JSZWY6IEVsZW1lbnQgfCBFbGVtZW50UmVmPEVsZW1lbnQ+KTogT2JzZXJ2YWJsZTxSZXNpemVPYnNlcnZlckVudHJ5W10+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gY29lcmNlRWxlbWVudChlbGVtZW50T3JSZWYpO1xuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8UmVzaXplT2JzZXJ2ZXJFbnRyeVtdPikgPT4ge1xuICAgICAgY29uc3Qgc3RyZWFtID0gdGhpcy5vYnNlcnZlRWxlbWVudChlbGVtZW50KTtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHN0cmVhbS5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy51bm9ic2VydmVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPYnNlcnZlcyB0aGUgZ2l2ZW4gZWxlbWVudCBieSB1c2luZyB0aGUgZXhpc3RpbmcgUmVzaXplT2JzZXJ2ZXIgaWYgYXZhaWxhYmxlLCBvciBjcmVhdGluZyBhXG4gICAqIG5ldyBvbmUgaWYgbm90LlxuICAgKi9cbiAgcHJpdmF0ZSBvYnNlcnZlRWxlbWVudChlbGVtZW50OiBFbGVtZW50KTogU3ViamVjdDxSZXNpemVPYnNlcnZlckVudHJ5W10+IHtcbiAgICBpZiAoIXRoaXMub2JzZXJ2ZWRFbGVtZW50cy5oYXMoZWxlbWVudCkpIHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBTdWJqZWN0PFJlc2l6ZU9ic2VydmVyRW50cnlbXT4oKTtcbiAgICAgIGNvbnN0IG9ic2VydmVyID0gdGhpcy5uelJlc2l6ZU9ic2VydmVyRmFjdG9yeS5jcmVhdGUoKG11dGF0aW9uczogUmVzaXplT2JzZXJ2ZXJFbnRyeVtdKSA9PlxuICAgICAgICBzdHJlYW0ubmV4dChtdXRhdGlvbnMpXG4gICAgICApO1xuICAgICAgaWYgKG9ic2VydmVyKSB7XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLm9ic2VydmVkRWxlbWVudHMuc2V0KGVsZW1lbnQsIHsgb2JzZXJ2ZXIsIHN0cmVhbSwgY291bnQ6IDEgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub2JzZXJ2ZWRFbGVtZW50cy5nZXQoZWxlbWVudCkhLmNvdW50Kys7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9ic2VydmVkRWxlbWVudHMuZ2V0KGVsZW1lbnQpIS5zdHJlYW07XG4gIH1cblxuICAvKipcbiAgICogVW4tb2JzZXJ2ZXMgdGhlIGdpdmVuIGVsZW1lbnQgYW5kIGNsZWFucyB1cCB0aGUgdW5kZXJseWluZyBSZXNpemVPYnNlcnZlciBpZiBub2JvZHkgZWxzZSBpc1xuICAgKiBvYnNlcnZpbmcgdGhpcyBlbGVtZW50LlxuICAgKi9cbiAgcHJpdmF0ZSB1bm9ic2VydmVFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlZEVsZW1lbnRzLmhhcyhlbGVtZW50KSkge1xuICAgICAgdGhpcy5vYnNlcnZlZEVsZW1lbnRzLmdldChlbGVtZW50KSEuY291bnQtLTtcbiAgICAgIGlmICghdGhpcy5vYnNlcnZlZEVsZW1lbnRzLmdldChlbGVtZW50KSEuY291bnQpIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwT2JzZXJ2ZXIoZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIENsZWFuIHVwIHRoZSB1bmRlcmx5aW5nIFJlc2l6ZU9ic2VydmVyIGZvciB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuICovXG4gIHByaXZhdGUgY2xlYW51cE9ic2VydmVyKGVsZW1lbnQ6IEVsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlZEVsZW1lbnRzLmhhcyhlbGVtZW50KSkge1xuICAgICAgY29uc3QgeyBvYnNlcnZlciwgc3RyZWFtIH0gPSB0aGlzLm9ic2VydmVkRWxlbWVudHMuZ2V0KGVsZW1lbnQpITtcbiAgICAgIGlmIChvYnNlcnZlcikge1xuICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9XG4gICAgICBzdHJlYW0uY29tcGxldGUoKTtcbiAgICAgIHRoaXMub2JzZXJ2ZWRFbGVtZW50cy5kZWxldGUoZWxlbWVudCk7XG4gICAgfVxuICB9XG59XG4iXX0=