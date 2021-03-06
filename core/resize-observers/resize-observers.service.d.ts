/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ElementRef, OnDestroy } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';
import { Observable } from 'rxjs';
/**
 * Factory that creates a new ResizeObserver and allows us to stub it out in unit tests.
 */
export declare class NzResizeObserverFactory {
    create(callback: ResizeObserverCallback): ResizeObserver | null;
}
/** An injectable service that allows watching elements for changes to their content. */
export declare class NzResizeObserver implements OnDestroy {
    private nzResizeObserverFactory;
    /** Keeps track of the existing ResizeObservers so they can be reused. */
    private observedElements;
    constructor(nzResizeObserverFactory: NzResizeObserverFactory);
    ngOnDestroy(): void;
    observe(elementOrRef: Element | ElementRef<Element>): Observable<ResizeObserverEntry[]>;
    /**
     * Observes the given element by using the existing ResizeObserver if available, or creating a
     * new one if not.
     */
    private observeElement;
    /**
     * Un-observes the given element and cleans up the underlying ResizeObserver if nobody else is
     * observing this element.
     */
    private unobserveElement;
    /** Clean up the underlying ResizeObserver for the specified element. */
    private cleanupObserver;
}
