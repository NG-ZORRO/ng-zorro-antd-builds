import * as i0 from '@angular/core';
import { Directive, Component, ChangeDetectionStrategy, ContentChildren, ContentChild, NgModule } from '@angular/core';
import * as i1 from 'ng-zorro-antd/cdk/resize-observer';
import { NzResizeObserver, NzResizeObserverModule } from 'ng-zorro-antd/cdk/resize-observer';
import { Subject, ReplaySubject, BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, startWith, tap, pairwise, withLatestFrom, switchMap, takeUntil, filter } from 'rxjs/operators';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOverflowItemDirective {
    constructor(nzResizeObserver, elementRef, cdr) {
        this.nzResizeObserver = nzResizeObserver;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.overflowStyle = undefined;
        this.itemWidth$ = this.nzResizeObserver.observe(this.elementRef.nativeElement).pipe(map(([item]) => item.target.offsetWidth), distinctUntilChanged(), startWith(undefined), tap(width => {
            this.itemWidth = width;
        }));
        this.itemWidth = undefined;
    }
    setItemStyle(display, order) {
        const mergedHidden = !display;
        this.overflowStyle = {
            opacity: mergedHidden ? 0 : 1,
            height: mergedHidden ? 0 : undefined,
            overflowY: mergedHidden ? 'hidden' : undefined,
            order: order,
            pointerEvents: mergedHidden ? 'none' : undefined,
            position: mergedHidden ? 'absolute' : undefined
        };
        this.cdr.detectChanges();
    }
}
NzOverflowItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowItemDirective, deps: [{ token: i1.NzResizeObserver }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
NzOverflowItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzOverflowItemDirective, selector: "[nzOverflowItem]", host: { properties: { "style": "overflowStyle" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzOverflowItem]',
                    host: {
                        '[style]': 'overflowStyle'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzResizeObserver }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOverflowRestDirective {
    constructor(nzResizeObserver, elementRef, cdr) {
        this.nzResizeObserver = nzResizeObserver;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.restStyle = undefined;
        this.restWidth$ = this.nzResizeObserver.observe(this.elementRef.nativeElement).pipe(map(([item]) => item.target.offsetWidth), startWith(0), tap(width => (this.restWidth = width)));
        this.restWidth = 0;
    }
    setRestStyle(display, order) {
        const mergedHidden = !display;
        this.restStyle = {
            opacity: mergedHidden ? 0 : 1,
            height: mergedHidden ? 0 : undefined,
            overflowY: mergedHidden ? 'hidden' : undefined,
            order: order,
            pointerEvents: mergedHidden ? 'none' : undefined,
            position: mergedHidden ? 'absolute' : undefined
        };
        this.cdr.detectChanges();
    }
}
NzOverflowRestDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowRestDirective, deps: [{ token: i1.NzResizeObserver }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
NzOverflowRestDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzOverflowRestDirective, selector: "[nzOverflowRest]", host: { properties: { "style": "restStyle" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowRestDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzOverflowRest]',
                    host: {
                        '[style]': 'restStyle'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzResizeObserver }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOverflowSuffixDirective {
    constructor(nzResizeObserver, elementRef, cdr) {
        this.nzResizeObserver = nzResizeObserver;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.suffixStyle = {};
        this.suffixWidth$ = this.nzResizeObserver.observe(this.elementRef.nativeElement).pipe(map(([item]) => item.target.offsetWidth), tap(width => (this.suffixWidth = width)));
        this.suffixWidth = 0;
    }
    setSuffixStyle(start, order) {
        if (start !== null) {
            this.suffixStyle = {
                position: 'absolute',
                left: `${start}px`,
                top: 0,
                opacity: 1,
                order: order
            };
        }
        else {
            this.suffixStyle = {
                opacity: 1,
                order: order
            };
        }
        this.cdr.detectChanges();
    }
}
NzOverflowSuffixDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowSuffixDirective, deps: [{ token: i1.NzResizeObserver }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
NzOverflowSuffixDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzOverflowSuffixDirective, selector: "[nzOverflowSuffix]", host: { properties: { "style": "suffixStyle" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowSuffixDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzOverflowSuffix]',
                    host: {
                        '[style]': 'suffixStyle'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzResizeObserver }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOverflowContainerComponent {
    constructor(nzResizeObserver, elementRef, cdr) {
        this.nzResizeObserver = nzResizeObserver;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.contentInit$ = new Subject();
        this.overflowItems = undefined;
        this.overflowSuffix = undefined;
        this.overflowRest = undefined;
        this.overflowItems$ = new ReplaySubject(1);
        this.destroy$ = new Subject();
        this.containerWidth$ = this.nzResizeObserver
            .observe(this.elementRef.nativeElement)
            .pipe(map(([item]) => item.target.clientWidth || 0));
        this.restWidth$ = new BehaviorSubject(0);
        this.suffixWidth$ = new BehaviorSubject(0);
        this.suffixFixedStart$ = new BehaviorSubject(null);
        this.displayCount$ = new BehaviorSubject(Number.MAX_SAFE_INTEGER);
        this.restReady$ = new BehaviorSubject(false);
        this.maxRestWith$ = this.restWidth$.pipe(pairwise(), map(([prevRestWidth, restWidth]) => Math.max(prevRestWidth, restWidth)));
        this.omittedItems$ = combineLatest([this.overflowItems$, this.displayCount$]).pipe(withLatestFrom(this.contentInit$), map(([[overflowItems, displayCount]]) => overflowItems.toArray().slice(displayCount + 1)));
        this.displayRest$ = combineLatest([this.restReady$, this.omittedItems$]).pipe(map(([restReady, omittedItems]) => restReady && !!omittedItems.length));
    }
    updateDisplayCount(count, notReady) {
        this.displayCount$.next(count);
        if (this.overflowItems && !notReady) {
            this.restReady$.next(count < this.overflowItems.length - 1);
        }
    }
    ngOnInit() {
        const overflowItemsWidth$ = this.overflowItems$.pipe(switchMap(items => combineLatest(items.map(item => item.itemWidth$))));
        this.overflowItems$.pipe(takeUntil(this.destroy$)).subscribe(overflowItems => {
            if (!overflowItems.length) {
                this.displayCount$.next(0);
                this.suffixFixedStart$.next(null);
            }
        });
        combineLatest([overflowItemsWidth$, this.containerWidth$, this.maxRestWith$, this.restWidth$, this.suffixWidth$])
            .pipe(filter(([, containerWidth, maxRestWith]) => !!(containerWidth && maxRestWith)), takeUntil(this.destroy$))
            .subscribe(([overflowItemsWidth, containerWidth, maxRestWith, restWidth, suffixWidth]) => {
            let totalWidth = suffixWidth;
            const len = overflowItemsWidth.length;
            const lastIndex = len - 1;
            for (let i = 0; i < len; i += 1) {
                const currentItemWidth = overflowItemsWidth[i];
                // Break since data not ready
                if (currentItemWidth === undefined) {
                    this.updateDisplayCount(i - 1, true);
                    break;
                }
                else {
                    // Find best match
                    totalWidth += currentItemWidth;
                    if (
                    // Only one means `totalWidth` is the final width
                    (lastIndex === 0 && totalWidth <= containerWidth) ||
                        // Last two width will be the final width
                        (i === lastIndex - 1 &&
                            overflowItemsWidth[lastIndex] !== undefined &&
                            totalWidth + overflowItemsWidth[lastIndex] <= containerWidth)) {
                        // Additional check if match the end
                        this.updateDisplayCount(lastIndex);
                        this.suffixFixedStart$.next(null);
                        break;
                    }
                    else if (totalWidth + maxRestWith > containerWidth) {
                        // Can not hold all the content to show rest
                        this.updateDisplayCount(i - 1);
                        this.suffixFixedStart$.next(totalWidth - currentItemWidth - suffixWidth + restWidth);
                        break;
                    }
                    this.cdr.detectChanges();
                }
            }
            if (this.overflowSuffix &&
                overflowItemsWidth[0] !== undefined &&
                overflowItemsWidth[0] + suffixWidth > containerWidth) {
                this.suffixFixedStart$.next(null);
            }
            this.cdr.detectChanges();
        });
        combineLatest([this.suffixFixedStart$, this.displayCount$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([suffixFixedStart, displayCount]) => {
            var _a;
            (_a = this.overflowSuffix) === null || _a === void 0 ? void 0 : _a.setSuffixStyle(suffixFixedStart, displayCount);
        });
        combineLatest([this.displayCount$, this.overflowItems$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([displayCount, overflowItems]) => overflowItems.forEach((item, index) => item.setItemStyle(index <= displayCount, index)));
        combineLatest([this.displayRest$, this.displayCount$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([displayRest, displayCount]) => {
            var _a;
            (_a = this.overflowRest) === null || _a === void 0 ? void 0 : _a.setRestStyle(displayRest, displayRest ? displayCount : Number.MAX_SAFE_INTEGER);
        });
    }
    ngAfterContentInit() {
        var _a, _b, _c;
        (_a = this.overflowItems) === null || _a === void 0 ? void 0 : _a.changes.pipe(startWith(this.overflowItems)).subscribe(this.overflowItems$);
        (_b = this.overflowSuffix) === null || _b === void 0 ? void 0 : _b.suffixWidth$.pipe(takeUntil(this.destroy$)).subscribe(this.suffixWidth$);
        (_c = this.overflowRest) === null || _c === void 0 ? void 0 : _c.restWidth$.pipe(takeUntil(this.destroy$)).subscribe(this.restWidth$);
        this.contentInit$.next();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzOverflowContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowContainerComponent, deps: [{ token: i1.NzResizeObserver }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzOverflowContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzOverflowContainerComponent, selector: "nz-overflow-container", providers: [NzResizeObserver], queries: [{ propertyName: "overflowSuffix", first: true, predicate: NzOverflowSuffixDirective, descendants: true }, { propertyName: "overflowRest", first: true, predicate: NzOverflowRestDirective, descendants: true }, { propertyName: "overflowItems", predicate: NzOverflowItemDirective }], ngImport: i0, template: ` <ng-content></ng-content>
    <ng-content select="[appOverflowRest]"></ng-content>
    <ng-content select="[appOverflowSuffix]"></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-overflow-container',
                    template: ` <ng-content></ng-content>
    <ng-content select="[appOverflowRest]"></ng-content>
    <ng-content select="[appOverflowSuffix]"></ng-content>`,
                    providers: [NzResizeObserver],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.NzResizeObserver }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { overflowItems: [{
                type: ContentChildren,
                args: [NzOverflowItemDirective]
            }], overflowSuffix: [{
                type: ContentChild,
                args: [NzOverflowSuffixDirective]
            }], overflowRest: [{
                type: ContentChild,
                args: [NzOverflowRestDirective]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOverflowModule {
}
NzOverflowModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzOverflowModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowModule, declarations: [NzOverflowContainerComponent,
        NzOverflowItemDirective,
        NzOverflowRestDirective,
        NzOverflowSuffixDirective], imports: [NzResizeObserverModule], exports: [NzOverflowContainerComponent, NzOverflowItemDirective, NzOverflowRestDirective, NzOverflowSuffixDirective] });
NzOverflowModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowModule, imports: [[NzResizeObserverModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzResizeObserverModule],
                    declarations: [
                        NzOverflowContainerComponent,
                        NzOverflowItemDirective,
                        NzOverflowRestDirective,
                        NzOverflowSuffixDirective
                    ],
                    exports: [NzOverflowContainerComponent, NzOverflowItemDirective, NzOverflowRestDirective, NzOverflowSuffixDirective]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzOverflowContainerComponent, NzOverflowItemDirective, NzOverflowModule, NzOverflowRestDirective, NzOverflowSuffixDirective };
//# sourceMappingURL=ng-zorro-antd-cdk-overflow.mjs.map
