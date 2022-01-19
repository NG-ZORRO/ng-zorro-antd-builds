/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChildren, ViewEncapsulation } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/cdk/resize-observer";
import * as i2 from "@angular/common";
export class NzTrMeasureComponent {
    constructor(nzResizeObserver, ngZone) {
        this.nzResizeObserver = nzResizeObserver;
        this.ngZone = ngZone;
        this.listOfMeasureColumn = [];
        this.listOfAutoWidth = new EventEmitter();
        this.destroy$ = new Subject();
    }
    trackByFunc(_, key) {
        return key;
    }
    ngAfterViewInit() {
        this.listOfTdElement.changes
            .pipe(startWith(this.listOfTdElement))
            .pipe(switchMap(list => combineLatest(list.toArray().map((item) => this.nzResizeObserver.observe(item).pipe(map(([entry]) => {
            const { width } = entry.target.getBoundingClientRect();
            return Math.floor(width);
        }))))), debounceTime(16), takeUntil(this.destroy$))
            .subscribe(data => {
            this.ngZone.run(() => {
                this.listOfAutoWidth.next(data);
            });
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTrMeasureComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTrMeasureComponent, deps: [{ token: i1.NzResizeObserver }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
NzTrMeasureComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTrMeasureComponent, selector: "tr[nz-table-measure-row]", inputs: { listOfMeasureColumn: "listOfMeasureColumn" }, outputs: { listOfAutoWidth: "listOfAutoWidth" }, host: { classAttribute: "ant-table-measure-now" }, viewQueries: [{ propertyName: "listOfTdElement", predicate: ["tdElement"], descendants: true }], ngImport: i0, template: `
    <td
      #tdElement
      class="nz-disable-td"
      style="padding: 0px; border: 0px; height: 0px;"
      *ngFor="let th of listOfMeasureColumn; trackBy: trackByFunc"
    ></td>
  `, isInline: true, directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTrMeasureComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'tr[nz-table-measure-row]',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <td
      #tdElement
      class="nz-disable-td"
      style="padding: 0px; border: 0px; height: 0px;"
      *ngFor="let th of listOfMeasureColumn; trackBy: trackByFunc"
    ></td>
  `,
                    host: { class: 'ant-table-measure-now' }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzResizeObserver }, { type: i0.NgZone }]; }, propDecorators: { listOfMeasureColumn: [{
                type: Input
            }], listOfAutoWidth: [{
                type: Output
            }], listOfTdElement: [{
                type: ViewChildren,
                args: ['tdElement']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHItbWVhc3VyZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYmxlL3NyYy90YWJsZS90ci1tZWFzdXJlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCx1REFBdUQ7QUFFdkQsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBRU4sWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBbUJwRixNQUFNLE9BQU8sb0JBQW9CO0lBSy9CLFlBQW9CLGdCQUFrQyxFQUFVLE1BQWM7UUFBMUQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFKckUsd0JBQW1CLEdBQXNCLEVBQUUsQ0FBQztRQUNsQyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFFMUQsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDZ0QsQ0FBQztJQUNsRixXQUFXLENBQUMsQ0FBUyxFQUFFLEdBQVc7UUFDaEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBQ0QsZUFBZTtRQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTzthQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNyQyxJQUFJLENBQ0gsU0FBUyxDQUNQLElBQUksQ0FBQyxFQUFFLENBQ0wsYUFBYSxDQUNYLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFnQixFQUFFLEVBQUUsQ0FDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ3RDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUNkLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDdkQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUNILENBQ0YsQ0FDc0IsQ0FDNUIsRUFDRCxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQ2hCLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ3pCO2FBQ0EsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7O2lIQXRDVSxvQkFBb0I7cUdBQXBCLG9CQUFvQiw2VEFWckI7Ozs7Ozs7R0FPVDsyRkFHVSxvQkFBb0I7a0JBZmhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7R0FPVDtvQkFDRCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUU7aUJBQ3pDOzRIQUVVLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDYSxlQUFlO3NCQUFqQyxNQUFNO2dCQUNvQixlQUFlO3NCQUF6QyxZQUFZO3VCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LXNlbGVjdG9yICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOelJlc2l6ZU9ic2VydmVyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jZGsvcmVzaXplLW9ic2VydmVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHJbbnotdGFibGUtbWVhc3VyZS1yb3ddJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx0ZFxuICAgICAgI3RkRWxlbWVudFxuICAgICAgY2xhc3M9XCJuei1kaXNhYmxlLXRkXCJcbiAgICAgIHN0eWxlPVwicGFkZGluZzogMHB4OyBib3JkZXI6IDBweDsgaGVpZ2h0OiAwcHg7XCJcbiAgICAgICpuZ0Zvcj1cImxldCB0aCBvZiBsaXN0T2ZNZWFzdXJlQ29sdW1uOyB0cmFja0J5OiB0cmFja0J5RnVuY1wiXG4gICAgPjwvdGQ+XG4gIGAsXG4gIGhvc3Q6IHsgY2xhc3M6ICdhbnQtdGFibGUtbWVhc3VyZS1ub3cnIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUck1lYXN1cmVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBsaXN0T2ZNZWFzdXJlQ29sdW1uOiByZWFkb25seSBzdHJpbmdbXSA9IFtdO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbGlzdE9mQXV0b1dpZHRoID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXJbXT4oKTtcbiAgQFZpZXdDaGlsZHJlbigndGRFbGVtZW50JykgbGlzdE9mVGRFbGVtZW50ITogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuelJlc2l6ZU9ic2VydmVyOiBOelJlc2l6ZU9ic2VydmVyLCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7fVxuICB0cmFja0J5RnVuYyhfOiBudW1iZXIsIGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4ga2V5O1xuICB9XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RPZlRkRWxlbWVudC5jaGFuZ2VzXG4gICAgICAucGlwZShzdGFydFdpdGgodGhpcy5saXN0T2ZUZEVsZW1lbnQpKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgICBsaXN0ID0+XG4gICAgICAgICAgICBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICBsaXN0LnRvQXJyYXkoKS5tYXAoKGl0ZW06IEVsZW1lbnRSZWYpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5uelJlc2l6ZU9ic2VydmVyLm9ic2VydmUoaXRlbSkucGlwZShcbiAgICAgICAgICAgICAgICAgIG1hcCgoW2VudHJ5XSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHdpZHRoIH0gPSBlbnRyeS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKHdpZHRoKTtcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIGFzIE9ic2VydmFibGU8bnVtYmVyW10+XG4gICAgICAgICksXG4gICAgICAgIGRlYm91bmNlVGltZSgxNiksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmxpc3RPZkF1dG9XaWR0aC5uZXh0KGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19