/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { EMPTY, merge, of, Subject } from 'rxjs';
import { delay, map, mergeMap, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { NzThAddOnComponent } from '../cell/th-addon.component';
import { NzTrDirective } from './tr.directive';
import * as i0 from "@angular/core";
import * as i1 from "../table-style.service";
import * as i2 from "../table-data.service";
import * as i3 from "@angular/common";
export class NzTheadComponent {
    constructor(elementRef, renderer, nzTableStyleService, nzTableDataService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.nzTableStyleService = nzTableStyleService;
        this.nzTableDataService = nzTableDataService;
        this.destroy$ = new Subject();
        this.isInsideTable = false;
        this.nzSortOrderChange = new EventEmitter();
        this.isInsideTable = !!this.nzTableStyleService;
    }
    ngOnInit() {
        if (this.nzTableStyleService) {
            this.nzTableStyleService.setTheadTemplate(this.templateRef);
        }
    }
    ngAfterContentInit() {
        if (this.nzTableStyleService) {
            const firstTableRow$ = this.listOfNzTrDirective.changes.pipe(startWith(this.listOfNzTrDirective), map(item => item && item.first));
            const listOfColumnsChanges$ = firstTableRow$.pipe(switchMap(firstTableRow => (firstTableRow ? firstTableRow.listOfColumnsChanges$ : EMPTY)), takeUntil(this.destroy$));
            listOfColumnsChanges$.subscribe(data => this.nzTableStyleService.setListOfTh(data));
            /** TODO: need reset the measure row when scrollX change **/
            this.nzTableStyleService.enableAutoMeasure$
                .pipe(switchMap(enable => (enable ? listOfColumnsChanges$ : of([]))))
                .pipe(takeUntil(this.destroy$))
                .subscribe(data => this.nzTableStyleService.setListOfMeasureColumn(data));
            const listOfFixedLeftColumnChanges$ = firstTableRow$.pipe(switchMap(firstTr => (firstTr ? firstTr.listOfFixedLeftColumnChanges$ : EMPTY)), takeUntil(this.destroy$));
            const listOfFixedRightColumnChanges$ = firstTableRow$.pipe(switchMap(firstTr => (firstTr ? firstTr.listOfFixedRightColumnChanges$ : EMPTY)), takeUntil(this.destroy$));
            listOfFixedLeftColumnChanges$.subscribe(listOfFixedLeftColumn => {
                this.nzTableStyleService.setHasFixLeft(listOfFixedLeftColumn.length !== 0);
            });
            listOfFixedRightColumnChanges$.subscribe(listOfFixedRightColumn => {
                this.nzTableStyleService.setHasFixRight(listOfFixedRightColumn.length !== 0);
            });
        }
        if (this.nzTableDataService) {
            const listOfColumn$ = this.listOfNzThAddOnComponent.changes.pipe(startWith(this.listOfNzThAddOnComponent));
            const manualSort$ = listOfColumn$.pipe(switchMap(() => merge(...this.listOfNzThAddOnComponent.map(th => th.manualClickOrder$))), takeUntil(this.destroy$));
            manualSort$.subscribe((data) => {
                const emitValue = { key: data.nzColumnKey, value: data.sortOrder };
                this.nzSortOrderChange.emit(emitValue);
                if (data.nzSortFn && data.nzSortPriority === false) {
                    this.listOfNzThAddOnComponent.filter(th => th !== data).forEach(th => th.clearSortOrder());
                }
            });
            const listOfCalcOperator$ = listOfColumn$.pipe(switchMap(list => merge(...[listOfColumn$, ...list.map((c) => c.calcOperatorChange$)]).pipe(mergeMap(() => listOfColumn$))), map(list => list
                .filter(item => !!item.nzSortFn || !!item.nzFilterFn)
                .map(item => {
                const { nzSortFn, sortOrder, nzFilterFn, nzFilterValue, nzSortPriority, nzColumnKey } = item;
                return {
                    key: nzColumnKey,
                    sortFn: nzSortFn,
                    sortPriority: nzSortPriority,
                    sortOrder: sortOrder,
                    filterFn: nzFilterFn,
                    filterValue: nzFilterValue
                };
            })), 
            // TODO: after checked error here
            delay(0), takeUntil(this.destroy$));
            listOfCalcOperator$.subscribe(list => {
                this.nzTableDataService.listOfCalcOperator$.next(list);
            });
        }
    }
    ngAfterViewInit() {
        if (this.nzTableStyleService) {
            this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTheadComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTheadComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.NzTableStyleService, optional: true }, { token: i2.NzTableDataService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTheadComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTheadComponent, selector: "thead:not(.ant-table-thead)", outputs: { nzSortOrderChange: "nzSortOrderChange" }, queries: [{ propertyName: "listOfNzTrDirective", predicate: NzTrDirective, descendants: true }, { propertyName: "listOfNzThAddOnComponent", predicate: NzThAddOnComponent, descendants: true }], viewQueries: [{ propertyName: "templateRef", first: true, predicate: ["contentTemplate"], descendants: true, static: true }], ngImport: i0, template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
    <ng-container *ngIf="!isInsideTable">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </ng-container>
  `, isInline: true, directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTheadComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'thead:not(.ant-table-thead)',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
    <ng-container *ngIf="!isInsideTable">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </ng-container>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NzTableStyleService, decorators: [{
                    type: Optional
                }] }, { type: i2.NzTableDataService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { templateRef: [{
                type: ViewChild,
                args: ['contentTemplate', { static: true }]
            }], listOfNzTrDirective: [{
                type: ContentChildren,
                args: [NzTrDirective, { descendants: true }]
            }], listOfNzThAddOnComponent: [{
                type: ContentChildren,
                args: [NzThAddOnComponent, { descendants: true }]
            }], nzSortOrderChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy90YWJsZS9zcmMvdGFibGUvdGhlYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILHVEQUF1RDtBQUN2RCxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUdaLFFBQVEsRUFDUixNQUFNLEVBSU4sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdELE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXZGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFlL0MsTUFBTSxPQUFPLGdCQUFnQjtJQVUzQixZQUNVLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ1AsbUJBQXdDLEVBQ3hDLGtCQUF5QztRQUhyRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDUCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBdUI7UUFidkQsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDdkMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFNSCxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBNEMsQ0FBQztRQVFsRyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENB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QUFFLENBQUM7SUFDM0IsQ0FBQzs7NkdBL0dVLGdCQUFnQjtpR0FBaEIsZ0JBQWdCLDRKQUlWLGFBQWEsOEVBQ2Isa0JBQWtCLDhLQWR6Qjs7Ozs7OztHQU9UOzJGQUVVLGdCQUFnQjtrQkFiNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRTs7Ozs7OztHQU9UO2lCQUNGOzswQkFjSSxRQUFROzswQkFDUixRQUFROzRDQVhxQyxXQUFXO3NCQUExRCxTQUFTO3VCQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDUyxtQkFBbUI7c0JBQXpFLGVBQWU7dUJBQUMsYUFBYSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtnQkFDTyx3QkFBd0I7c0JBQW5GLGVBQWU7dUJBQUMsa0JBQWtCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2dCQUd2QyxpQkFBaUI7c0JBQW5DLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LXNlbGVjdG9yICovXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVNUFRZLCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCBtYXAsIG1lcmdlTWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBOelRoQWRkT25Db21wb25lbnQgfSBmcm9tICcuLi9jZWxsL3RoLWFkZG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRhYmxlRGF0YVNlcnZpY2UgfSBmcm9tICcuLi90YWJsZS1kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgTnpUYWJsZVN0eWxlU2VydmljZSB9IGZyb20gJy4uL3RhYmxlLXN0eWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTnpUckRpcmVjdGl2ZSB9IGZyb20gJy4vdHIuZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGhlYWQ6bm90KC5hbnQtdGFibGUtdGhlYWQpJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNjb250ZW50VGVtcGxhdGU+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzSW5zaWRlVGFibGVcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50VGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56VGhlYWRDb21wb25lbnQ8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBpc0luc2lkZVRhYmxlID0gZmFsc2U7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnRUZW1wbGF0ZScsIHsgc3RhdGljOiB0cnVlIH0pIHRlbXBsYXRlUmVmITogVGVtcGxhdGVSZWY8TnpTYWZlQW55PjtcbiAgQENvbnRlbnRDaGlsZHJlbihOelRyRGlyZWN0aXZlLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGxpc3RPZk56VHJEaXJlY3RpdmUhOiBRdWVyeUxpc3Q8TnpUckRpcmVjdGl2ZT47XG4gIEBDb250ZW50Q2hpbGRyZW4oTnpUaEFkZE9uQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGxpc3RPZk56VGhBZGRPbkNvbXBvbmVudCE6IFF1ZXJ5TGlzdDxcbiAgICBOelRoQWRkT25Db21wb25lbnQ8VD5cbiAgPjtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56U29ydE9yZGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7IGtleTogTnpTYWZlQW55OyB2YWx1ZTogc3RyaW5nIHwgbnVsbCB9PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuelRhYmxlU3R5bGVTZXJ2aWNlOiBOelRhYmxlU3R5bGVTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbnpUYWJsZURhdGFTZXJ2aWNlOiBOelRhYmxlRGF0YVNlcnZpY2U8VD5cbiAgKSB7XG4gICAgdGhpcy5pc0luc2lkZVRhYmxlID0gISF0aGlzLm56VGFibGVTdHlsZVNlcnZpY2U7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlKSB7XG4gICAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2Uuc2V0VGhlYWRUZW1wbGF0ZSh0aGlzLnRlbXBsYXRlUmVmKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpUYWJsZVN0eWxlU2VydmljZSkge1xuICAgICAgY29uc3QgZmlyc3RUYWJsZVJvdyQgPSB0aGlzLmxpc3RPZk56VHJEaXJlY3RpdmUuY2hhbmdlcy5waXBlKFxuICAgICAgICBzdGFydFdpdGgodGhpcy5saXN0T2ZOelRyRGlyZWN0aXZlKSxcbiAgICAgICAgbWFwKGl0ZW0gPT4gaXRlbSAmJiBpdGVtLmZpcnN0KVxuICAgICAgKSBhcyBPYnNlcnZhYmxlPE56VHJEaXJlY3RpdmU+O1xuICAgICAgY29uc3QgbGlzdE9mQ29sdW1uc0NoYW5nZXMkID0gZmlyc3RUYWJsZVJvdyQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGZpcnN0VGFibGVSb3cgPT4gKGZpcnN0VGFibGVSb3cgPyBmaXJzdFRhYmxlUm93Lmxpc3RPZkNvbHVtbnNDaGFuZ2VzJCA6IEVNUFRZKSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKTtcbiAgICAgIGxpc3RPZkNvbHVtbnNDaGFuZ2VzJC5zdWJzY3JpYmUoZGF0YSA9PiB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2Uuc2V0TGlzdE9mVGgoZGF0YSkpO1xuICAgICAgLyoqIFRPRE86IG5lZWQgcmVzZXQgdGhlIG1lYXN1cmUgcm93IHdoZW4gc2Nyb2xsWCBjaGFuZ2UgKiovXG4gICAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2UuZW5hYmxlQXV0b01lYXN1cmUkXG4gICAgICAgIC5waXBlKHN3aXRjaE1hcChlbmFibGUgPT4gKGVuYWJsZSA/IGxpc3RPZkNvbHVtbnNDaGFuZ2VzJCA6IG9mKFtdKSkpKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2Uuc2V0TGlzdE9mTWVhc3VyZUNvbHVtbihkYXRhKSk7XG4gICAgICBjb25zdCBsaXN0T2ZGaXhlZExlZnRDb2x1bW5DaGFuZ2VzJCA9IGZpcnN0VGFibGVSb3ckLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChmaXJzdFRyID0+IChmaXJzdFRyID8gZmlyc3RUci5saXN0T2ZGaXhlZExlZnRDb2x1bW5DaGFuZ2VzJCA6IEVNUFRZKSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGxpc3RPZkZpeGVkUmlnaHRDb2x1bW5DaGFuZ2VzJCA9IGZpcnN0VGFibGVSb3ckLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChmaXJzdFRyID0+IChmaXJzdFRyID8gZmlyc3RUci5saXN0T2ZGaXhlZFJpZ2h0Q29sdW1uQ2hhbmdlcyQgOiBFTVBUWSkpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgICk7XG4gICAgICBsaXN0T2ZGaXhlZExlZnRDb2x1bW5DaGFuZ2VzJC5zdWJzY3JpYmUobGlzdE9mRml4ZWRMZWZ0Q29sdW1uID0+IHtcbiAgICAgICAgdGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlLnNldEhhc0ZpeExlZnQobGlzdE9mRml4ZWRMZWZ0Q29sdW1uLmxlbmd0aCAhPT0gMCk7XG4gICAgICB9KTtcbiAgICAgIGxpc3RPZkZpeGVkUmlnaHRDb2x1bW5DaGFuZ2VzJC5zdWJzY3JpYmUobGlzdE9mRml4ZWRSaWdodENvbHVtbiA9PiB7XG4gICAgICAgIHRoaXMubnpUYWJsZVN0eWxlU2VydmljZS5zZXRIYXNGaXhSaWdodChsaXN0T2ZGaXhlZFJpZ2h0Q29sdW1uLmxlbmd0aCAhPT0gMCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMubnpUYWJsZURhdGFTZXJ2aWNlKSB7XG4gICAgICBjb25zdCBsaXN0T2ZDb2x1bW4kID0gdGhpcy5saXN0T2ZOelRoQWRkT25Db21wb25lbnQuY2hhbmdlcy5waXBlKFxuICAgICAgICBzdGFydFdpdGgodGhpcy5saXN0T2ZOelRoQWRkT25Db21wb25lbnQpXG4gICAgICApIGFzIE9ic2VydmFibGU8UXVlcnlMaXN0PE56VGhBZGRPbkNvbXBvbmVudDxUPj4+O1xuICAgICAgY29uc3QgbWFudWFsU29ydCQgPSBsaXN0T2ZDb2x1bW4kLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiBtZXJnZSguLi50aGlzLmxpc3RPZk56VGhBZGRPbkNvbXBvbmVudC5tYXAodGggPT4gdGgubWFudWFsQ2xpY2tPcmRlciQpKSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKTtcbiAgICAgIG1hbnVhbFNvcnQkLnN1YnNjcmliZSgoZGF0YTogTnpUaEFkZE9uQ29tcG9uZW50PFQ+KSA9PiB7XG4gICAgICAgIGNvbnN0IGVtaXRWYWx1ZSA9IHsga2V5OiBkYXRhLm56Q29sdW1uS2V5LCB2YWx1ZTogZGF0YS5zb3J0T3JkZXIgfTtcbiAgICAgICAgdGhpcy5uelNvcnRPcmRlckNoYW5nZS5lbWl0KGVtaXRWYWx1ZSk7XG4gICAgICAgIGlmIChkYXRhLm56U29ydEZuICYmIGRhdGEubnpTb3J0UHJpb3JpdHkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5saXN0T2ZOelRoQWRkT25Db21wb25lbnQuZmlsdGVyKHRoID0+IHRoICE9PSBkYXRhKS5mb3JFYWNoKHRoID0+IHRoLmNsZWFyU29ydE9yZGVyKCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGxpc3RPZkNhbGNPcGVyYXRvciQgPSBsaXN0T2ZDb2x1bW4kLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChsaXN0ID0+XG4gICAgICAgICAgbWVyZ2UoLi4uW2xpc3RPZkNvbHVtbiQsIC4uLmxpc3QubWFwKChjOiBOelRoQWRkT25Db21wb25lbnQ8VD4pID0+IGMuY2FsY09wZXJhdG9yQ2hhbmdlJCldKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4gbGlzdE9mQ29sdW1uJClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIG1hcChsaXN0ID0+XG4gICAgICAgICAgbGlzdFxuICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+ICEhaXRlbS5uelNvcnRGbiB8fCAhIWl0ZW0ubnpGaWx0ZXJGbilcbiAgICAgICAgICAgIC5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgbnpTb3J0Rm4sIHNvcnRPcmRlciwgbnpGaWx0ZXJGbiwgbnpGaWx0ZXJWYWx1ZSwgbnpTb3J0UHJpb3JpdHksIG56Q29sdW1uS2V5IH0gPSBpdGVtO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGtleTogbnpDb2x1bW5LZXksXG4gICAgICAgICAgICAgICAgc29ydEZuOiBuelNvcnRGbixcbiAgICAgICAgICAgICAgICBzb3J0UHJpb3JpdHk6IG56U29ydFByaW9yaXR5LFxuICAgICAgICAgICAgICAgIHNvcnRPcmRlcjogc29ydE9yZGVyISxcbiAgICAgICAgICAgICAgICBmaWx0ZXJGbjogbnpGaWx0ZXJGbiEsXG4gICAgICAgICAgICAgICAgZmlsdGVyVmFsdWU6IG56RmlsdGVyVmFsdWVcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIC8vIFRPRE86IGFmdGVyIGNoZWNrZWQgZXJyb3IgaGVyZVxuICAgICAgICBkZWxheSgwKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApO1xuICAgICAgbGlzdE9mQ2FsY09wZXJhdG9yJC5zdWJzY3JpYmUobGlzdCA9PiB7XG4gICAgICAgIHRoaXMubnpUYWJsZURhdGFTZXJ2aWNlLmxpc3RPZkNhbGNPcGVyYXRvciQubmV4dChsaXN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCksIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==