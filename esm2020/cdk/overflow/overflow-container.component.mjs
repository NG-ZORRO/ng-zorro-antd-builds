/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Component, ChangeDetectionStrategy, ContentChildren, ContentChild } from '@angular/core';
import { BehaviorSubject, combineLatest, ReplaySubject, Subject } from 'rxjs';
import { filter, map, pairwise, startWith, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzOverflowItemDirective } from './overflow-item.directive';
import { NzOverflowRestDirective } from './overflow-rest.directive';
import { NzOverflowSuffixDirective } from './overflow-suffix.directive';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/cdk/resize-observer";
export class NzOverflowContainerComponent {
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
            this.overflowSuffix?.setSuffixStyle(suffixFixedStart, displayCount);
        });
        combineLatest([this.displayCount$, this.overflowItems$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([displayCount, overflowItems]) => overflowItems.forEach((item, index) => item.setItemStyle(index <= displayCount, index)));
        combineLatest([this.displayRest$, this.displayCount$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([displayRest, displayCount]) => {
            this.overflowRest?.setRestStyle(displayRest, displayRest ? displayCount : Number.MAX_SAFE_INTEGER);
        });
    }
    ngAfterContentInit() {
        this.overflowItems?.changes.pipe(startWith(this.overflowItems)).subscribe(this.overflowItems$);
        this.overflowSuffix?.suffixWidth$.pipe(takeUntil(this.destroy$)).subscribe(this.suffixWidth$);
        this.overflowRest?.restWidth$.pipe(takeUntil(this.destroy$)).subscribe(this.restWidth$);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmZsb3ctY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY2RrL292ZXJmbG93L292ZXJmbG93LWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsZUFBZSxFQU1mLFlBQVksRUFFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBYyxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBVXhFLE1BQU0sT0FBTyw0QkFBNEI7SUFvQ3ZDLFlBQ1UsZ0JBQWtDLEVBQ2xDLFVBQXNCLEVBQ3RCLEdBQXNCO1FBRnRCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXRDaEMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBRW5DLGtCQUFhLEdBQW1ELFNBQVMsQ0FBQztRQUUxRSxtQkFBYyxHQUEwQyxTQUFTLENBQUM7UUFDM0IsaUJBQVksR0FBd0MsU0FBUyxDQUFDO1FBQ3JHLG1CQUFj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QUFJLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUYsSUFBSSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7eUhBL0hVLDRCQUE0Qjs2R0FBNUIsNEJBQTRCLGdEQUg1QixDQUFDLGdCQUFnQixDQUFDLHNFQU9mLHlCQUF5QiwrRUFFekIsdUJBQXVCLG1FQUpwQix1QkFBdUIsNkJBUjlCOzsyREFFK0M7MkZBSTlDLDRCQUE0QjtrQkFSeEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUU7OzJEQUUrQztvQkFDekQsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzdCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDtnS0FJQyxhQUFhO3NCQURaLGVBQWU7dUJBQUMsdUJBQXVCO2dCQUd4QyxjQUFjO3NCQURiLFlBQVk7dUJBQUMseUJBQXlCO2dCQUVBLFlBQVk7c0JBQWxELFlBQVk7dUJBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgT25EZXN0cm95LFxuICBDb250ZW50Q2hpbGQsXG4gIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgcGFpcndpc2UsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlVW50aWwsIHdpdGhMYXRlc3RGcm9tIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOelJlc2l6ZU9ic2VydmVyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jZGsvcmVzaXplLW9ic2VydmVyJztcblxuaW1wb3J0IHsgTnpPdmVyZmxvd0l0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL292ZXJmbG93LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IE56T3ZlcmZsb3dSZXN0RGlyZWN0aXZlIH0gZnJvbSAnLi9vdmVyZmxvdy1yZXN0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOek92ZXJmbG93U3VmZml4RGlyZWN0aXZlIH0gZnJvbSAnLi9vdmVyZmxvdy1zdWZmaXguZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotb3ZlcmZsb3ctY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlthcHBPdmVyZmxvd1Jlc3RdXCI+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlthcHBPdmVyZmxvd1N1ZmZpeF1cIj48L25nLWNvbnRlbnQ+YCxcbiAgcHJvdmlkZXJzOiBbTnpSZXNpemVPYnNlcnZlcl0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE56T3ZlcmZsb3dDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIGNvbnRlbnRJbml0JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIEBDb250ZW50Q2hpbGRyZW4oTnpPdmVyZmxvd0l0ZW1EaXJlY3RpdmUpXG4gIG92ZXJmbG93SXRlbXM6IFF1ZXJ5TGlzdDxOek92ZXJmbG93SXRlbURpcmVjdGl2ZT4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIEBDb250ZW50Q2hpbGQoTnpPdmVyZmxvd1N1ZmZpeERpcmVjdGl2ZSlcbiAgb3ZlcmZsb3dTdWZmaXg6IE56T3ZlcmZsb3dTdWZmaXhEaXJlY3RpdmUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIEBDb250ZW50Q2hpbGQoTnpPdmVyZmxvd1Jlc3REaXJlY3RpdmUpIG92ZXJmbG93UmVzdDogTnpPdmVyZmxvd1Jlc3REaXJlY3RpdmUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIG92ZXJmbG93SXRlbXMkID0gbmV3IFJlcGxheVN1YmplY3Q8UXVlcnlMaXN0PE56T3ZlcmZsb3dJdGVtRGlyZWN0aXZlPj4oMSk7XG4gIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgY29udGFpbmVyV2lkdGgkID0gdGhpcy5uelJlc2l6ZU9ic2VydmVyXG4gICAgLm9ic2VydmUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpXG4gICAgLnBpcGUobWFwKChbaXRlbV0pID0+IGl0ZW0udGFyZ2V0LmNsaWVudFdpZHRoIHx8IDApKTtcbiAgcmVzdFdpZHRoJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgc3VmZml4V2lkdGgkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBzdWZmaXhGaXhlZFN0YXJ0JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGRpc3BsYXlDb3VudCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpO1xuICByZXN0UmVhZHkkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1heFJlc3RXaXRoJCA9IHRoaXMucmVzdFdpZHRoJC5waXBlKFxuICAgIHBhaXJ3aXNlKCksXG4gICAgbWFwKChbcHJldlJlc3RXaWR0aCwgcmVzdFdpZHRoXSkgPT4gTWF0aC5tYXgocHJldlJlc3RXaWR0aCwgcmVzdFdpZHRoKSlcbiAgKTtcbiAgb21pdHRlZEl0ZW1zJCA9IGNvbWJpbmVMYXRlc3QoW3RoaXMub3ZlcmZsb3dJdGVtcyQsIHRoaXMuZGlzcGxheUNvdW50JF0pLnBpcGUoXG4gICAgd2l0aExhdGVzdEZyb20odGhpcy5jb250ZW50SW5pdCQpLFxuICAgIG1hcCgoW1tvdmVyZmxvd0l0ZW1zLCBkaXNwbGF5Q291bnRdXSkgPT4gb3ZlcmZsb3dJdGVtcy50b0FycmF5KCkuc2xpY2UoZGlzcGxheUNvdW50ICsgMSkpXG4gICk7XG4gIGRpc3BsYXlSZXN0JCA9IGNvbWJpbmVMYXRlc3QoW3RoaXMucmVzdFJlYWR5JCwgdGhpcy5vbWl0dGVkSXRlbXMkXSkucGlwZShcbiAgICBtYXAoKFtyZXN0UmVhZHksIG9taXR0ZWRJdGVtc10pID0+IHJlc3RSZWFkeSAmJiAhIW9taXR0ZWRJdGVtcy5sZW5ndGgpXG4gICk7XG5cbiAgdXBkYXRlRGlzcGxheUNvdW50KGNvdW50OiBudW1iZXIsIG5vdFJlYWR5PzogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzcGxheUNvdW50JC5uZXh0KGNvdW50KTtcbiAgICBpZiAodGhpcy5vdmVyZmxvd0l0ZW1zICYmICFub3RSZWFkeSkge1xuICAgICAgdGhpcy5yZXN0UmVhZHkkLm5leHQoY291bnQgPCB0aGlzLm92ZXJmbG93SXRlbXMubGVuZ3RoIC0gMSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuelJlc2l6ZU9ic2VydmVyOiBOelJlc2l6ZU9ic2VydmVyLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IG92ZXJmbG93SXRlbXNXaWR0aCQgPSB0aGlzLm92ZXJmbG93SXRlbXMkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoaXRlbXMgPT4gY29tYmluZUxhdGVzdChpdGVtcy5tYXAoaXRlbSA9PiBpdGVtLml0ZW1XaWR0aCQpKSlcbiAgICApIGFzIE9ic2VydmFibGU8bnVtYmVyW10+O1xuICAgIHRoaXMub3ZlcmZsb3dJdGVtcyQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShvdmVyZmxvd0l0ZW1zID0+IHtcbiAgICAgIGlmICghb3ZlcmZsb3dJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5Q291bnQkLm5leHQoMCk7XG4gICAgICAgIHRoaXMuc3VmZml4Rml4ZWRTdGFydCQubmV4dChudWxsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb21iaW5lTGF0ZXN0KFtvdmVyZmxvd0l0ZW1zV2lkdGgkLCB0aGlzLmNvbnRhaW5lcldpZHRoJCwgdGhpcy5tYXhSZXN0V2l0aCQsIHRoaXMucmVzdFdpZHRoJCwgdGhpcy5zdWZmaXhXaWR0aCRdKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoWywgY29udGFpbmVyV2lkdGgsIG1heFJlc3RXaXRoXSkgPT4gISEoY29udGFpbmVyV2lkdGggJiYgbWF4UmVzdFdpdGgpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChbb3ZlcmZsb3dJdGVtc1dpZHRoLCBjb250YWluZXJXaWR0aCwgbWF4UmVzdFdpdGgsIHJlc3RXaWR0aCwgc3VmZml4V2lkdGhdKSA9PiB7XG4gICAgICAgIGxldCB0b3RhbFdpZHRoID0gc3VmZml4V2lkdGg7XG4gICAgICAgIGNvbnN0IGxlbiA9IG92ZXJmbG93SXRlbXNXaWR0aC5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IGxlbiAtIDE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50SXRlbVdpZHRoID0gb3ZlcmZsb3dJdGVtc1dpZHRoW2ldO1xuICAgICAgICAgIC8vIEJyZWFrIHNpbmNlIGRhdGEgbm90IHJlYWR5XG4gICAgICAgICAgaWYgKGN1cnJlbnRJdGVtV2lkdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5Q291bnQoaSAtIDEsIHRydWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEZpbmQgYmVzdCBtYXRjaFxuICAgICAgICAgICAgdG90YWxXaWR0aCArPSBjdXJyZW50SXRlbVdpZHRoO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIC8vIE9ubHkgb25lIG1lYW5zIGB0b3RhbFdpZHRoYCBpcyB0aGUgZmluYWwgd2lkdGhcbiAgICAgICAgICAgICAgKGxhc3RJbmRleCA9PT0gMCAmJiB0b3RhbFdpZHRoIDw9IGNvbnRhaW5lcldpZHRoKSB8fFxuICAgICAgICAgICAgICAvLyBMYXN0IHR3byB3aWR0aCB3aWxsIGJlIHRoZSBmaW5hbCB3aWR0aFxuICAgICAgICAgICAgICAoaSA9PT0gbGFzdEluZGV4IC0gMSAmJlxuICAgICAgICAgICAgICAgIG92ZXJmbG93SXRlbXNXaWR0aFtsYXN0SW5kZXhdICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICB0b3RhbFdpZHRoICsgb3ZlcmZsb3dJdGVtc1dpZHRoW2xhc3RJbmRleF0hIDw9IGNvbnRhaW5lcldpZHRoKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIC8vIEFkZGl0aW9uYWwgY2hlY2sgaWYgbWF0Y2ggdGhlIGVuZFxuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXlDb3VudChsYXN0SW5kZXgpO1xuICAgICAgICAgICAgICB0aGlzLnN1ZmZpeEZpeGVkU3RhcnQkLm5leHQobnVsbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b3RhbFdpZHRoICsgbWF4UmVzdFdpdGggPiBjb250YWluZXJXaWR0aCkge1xuICAgICAgICAgICAgICAvLyBDYW4gbm90IGhvbGQgYWxsIHRoZSBjb250ZW50IHRvIHNob3cgcmVzdFxuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXlDb3VudChpIC0gMSk7XG4gICAgICAgICAgICAgIHRoaXMuc3VmZml4Rml4ZWRTdGFydCQubmV4dCh0b3RhbFdpZHRoIC0gY3VycmVudEl0ZW1XaWR0aCAtIHN1ZmZpeFdpZHRoICsgcmVzdFdpZHRoKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLm92ZXJmbG93U3VmZml4ICYmXG4gICAgICAgICAgb3ZlcmZsb3dJdGVtc1dpZHRoWzBdICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBvdmVyZmxvd0l0ZW1zV2lkdGhbMF0gKyBzdWZmaXhXaWR0aCA+IGNvbnRhaW5lcldpZHRoXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuc3VmZml4Rml4ZWRTdGFydCQubmV4dChudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pO1xuICAgIGNvbWJpbmVMYXRlc3QoW3RoaXMuc3VmZml4Rml4ZWRTdGFydCQsIHRoaXMuZGlzcGxheUNvdW50JF0pXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKChbc3VmZml4Rml4ZWRTdGFydCwgZGlzcGxheUNvdW50XSkgPT4ge1xuICAgICAgICB0aGlzLm92ZXJmbG93U3VmZml4Py5zZXRTdWZmaXhTdHlsZShzdWZmaXhGaXhlZFN0YXJ0LCBkaXNwbGF5Q291bnQpO1xuICAgICAgfSk7XG4gICAgY29tYmluZUxhdGVzdChbdGhpcy5kaXNwbGF5Q291bnQkLCB0aGlzLm92ZXJmbG93SXRlbXMkXSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtkaXNwbGF5Q291bnQsIG92ZXJmbG93SXRlbXNdKSA9PlxuICAgICAgICBvdmVyZmxvd0l0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiBpdGVtLnNldEl0ZW1TdHlsZShpbmRleCA8PSBkaXNwbGF5Q291bnQsIGluZGV4KSlcbiAgICAgICk7XG4gICAgY29tYmluZUxhdGVzdChbdGhpcy5kaXNwbGF5UmVzdCQsIHRoaXMuZGlzcGxheUNvdW50JF0pXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKChbZGlzcGxheVJlc3QsIGRpc3BsYXlDb3VudF0pID0+IHtcbiAgICAgICAgdGhpcy5vdmVyZmxvd1Jlc3Q/LnNldFJlc3RTdHlsZShkaXNwbGF5UmVzdCwgZGlzcGxheVJlc3QgPyBkaXNwbGF5Q291bnQgOiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUik7XG4gICAgICB9KTtcbiAgfVxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVyZmxvd0l0ZW1zPy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKHRoaXMub3ZlcmZsb3dJdGVtcykpLnN1YnNjcmliZSh0aGlzLm92ZXJmbG93SXRlbXMkKTtcbiAgICB0aGlzLm92ZXJmbG93U3VmZml4Py5zdWZmaXhXaWR0aCQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSh0aGlzLnN1ZmZpeFdpZHRoJCk7XG4gICAgdGhpcy5vdmVyZmxvd1Jlc3Q/LnJlc3RXaWR0aCQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSh0aGlzLnJlc3RXaWR0aCQpO1xuICAgIHRoaXMuY29udGVudEluaXQkLm5leHQoKTtcbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==