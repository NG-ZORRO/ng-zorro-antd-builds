/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, Optional, Output, QueryList, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { EMPTY, merge, of, Subject } from 'rxjs';
import { delay, map, mergeMap, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { NzThAddOnComponent } from '../cell/th-addon.component';
import { NzTableDataService } from '../table-data.service';
import { NzTableStyleService } from '../table-style.service';
import { NzTrDirective } from './tr.directive';
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
NzTheadComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
NzTheadComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NzTableStyleService, decorators: [{ type: Optional }] },
    { type: NzTableDataService, decorators: [{ type: Optional }] }
];
NzTheadComponent.propDecorators = {
    templateRef: [{ type: ViewChild, args: ['contentTemplate', { static: true },] }],
    listOfNzTrDirective: [{ type: ContentChildren, args: [NzTrDirective, { descendants: true },] }],
    listOfNzThAddOnComponent: [{ type: ContentChildren, args: [NzThAddOnComponent, { descendants: true },] }],
    nzSortOrderChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy90YWJsZS9zcmMvdGFibGUvdGhlYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUNILHVDQUF1QztBQUN2QyxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFHWixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFlL0MsTUFBTSxPQUFPLGdCQUFnQjtJQVEzQixZQUNVLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ1AsbUJBQXdDLEVBQ3hDLGtCQUFzQztRQUhsRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDUCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFYcEQsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDdkMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFJSCxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBNEMsQ0FBQztRQVFsRyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDbEQsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDMUQsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUNuQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNILENBQUM7WUFDL0IsTUFBTSxxQkFBcUIsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUMvQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUN6RixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUN6QixDQUFDO1lBQ0YscUJBQXFCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BGLDREQUE0RDtZQUM1RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCO2lCQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNwRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDOUIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUUsTUFBTSw2QkFBNkIsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUN2RCxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUMvRSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUN6QixDQUFDO1lBQ0YsTUFBTSw4QkFBOEIsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUN4RCxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNoRixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUN6QixDQUFDO1lBQ0YsNkJBQTZCLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQzlELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQyxDQUFDO1lBQ0gsOEJBQThCLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLEVBQUU7Z0JBQ2hFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQy9FLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBRXhHLENBQUM7WUFDRixNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUNwQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFDeEYsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDekIsQ0FBQztZQUNGLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUF3QixFQUFFLEVBQUU7Z0JBQ2pELE1BQU0sU0FBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO29CQUNsRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO2lCQUM1RjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxtQkFBbUIsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUM1QyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDZixLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFxQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUM3SCxFQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUNULElBQUk7aUJBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7aUJBQ3BELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDVixNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUM7Z0JBQzdGLE9BQU87b0JBQ0wsR0FBRyxFQUFFLFdBQVc7b0JBQ2hCLE1BQU0sRUFBRSxRQUFRO29CQUNoQixZQUFZLEVBQUUsY0FBYztvQkFDNUIsU0FBUyxFQUFFLFNBQVU7b0JBQ3JCLFFBQVEsRUFBRSxVQUFXO29CQUNyQixXQUFXLEVBQUUsYUFBYTtpQkFDM0IsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUNMO1lBQ0QsaUNBQWlDO1lBQ2pDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDUixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUN6QixDQUFDO1lBQ0YsbUJBQW1CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNuSDtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQXhIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7R0FPVDthQUNGOzs7WUFqQ0MsVUFBVTtZQU9WLFNBQVM7WUFXRixtQkFBbUIsdUJBMkJ2QixRQUFRO1lBNUJKLGtCQUFrQix1QkE2QnRCLFFBQVE7OzswQkFUVixTQUFTLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2tDQUM3QyxlQUFlLFNBQUMsYUFBYSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTt1Q0FDcEQsZUFBZSxTQUFDLGtCQUFrQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtnQ0FDekQsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG4vKiB0c2xpbnQ6ZGlzYWJsZTpjb21wb25lbnQtc2VsZWN0b3IgKi9cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgRU1QVFksIG1lcmdlLCBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVsYXksIG1hcCwgbWVyZ2VNYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOelRoQWRkT25Db21wb25lbnQgfSBmcm9tICcuLi9jZWxsL3RoLWFkZG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRhYmxlRGF0YVNlcnZpY2UgfSBmcm9tICcuLi90YWJsZS1kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgTnpUYWJsZVN0eWxlU2VydmljZSB9IGZyb20gJy4uL3RhYmxlLXN0eWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTnpUckRpcmVjdGl2ZSB9IGZyb20gJy4vdHIuZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGhlYWQ6bm90KC5hbnQtdGFibGUtdGhlYWQpJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNjb250ZW50VGVtcGxhdGU+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzSW5zaWRlVGFibGVcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50VGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56VGhlYWRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBpc0luc2lkZVRhYmxlID0gZmFsc2U7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnRUZW1wbGF0ZScsIHsgc3RhdGljOiB0cnVlIH0pIHRlbXBsYXRlUmVmITogVGVtcGxhdGVSZWY8TnpTYWZlQW55PjtcbiAgQENvbnRlbnRDaGlsZHJlbihOelRyRGlyZWN0aXZlLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGxpc3RPZk56VHJEaXJlY3RpdmUhOiBRdWVyeUxpc3Q8TnpUckRpcmVjdGl2ZT47XG4gIEBDb250ZW50Q2hpbGRyZW4oTnpUaEFkZE9uQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGxpc3RPZk56VGhBZGRPbkNvbXBvbmVudCE6IFF1ZXJ5TGlzdDxOelRoQWRkT25Db21wb25lbnQ+O1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpTb3J0T3JkZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsga2V5OiBOelNhZmVBbnk7IHZhbHVlOiBzdHJpbmcgfCBudWxsIH0+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG56VGFibGVTdHlsZVNlcnZpY2U6IE56VGFibGVTdHlsZVNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuelRhYmxlRGF0YVNlcnZpY2U6IE56VGFibGVEYXRhU2VydmljZVxuICApIHtcbiAgICB0aGlzLmlzSW5zaWRlVGFibGUgPSAhIXRoaXMubnpUYWJsZVN0eWxlU2VydmljZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56VGFibGVTdHlsZVNlcnZpY2UpIHtcbiAgICAgIHRoaXMubnpUYWJsZVN0eWxlU2VydmljZS5zZXRUaGVhZFRlbXBsYXRlKHRoaXMudGVtcGxhdGVSZWYpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlKSB7XG4gICAgICBjb25zdCBmaXJzdFRhYmxlUm93JCA9IHRoaXMubGlzdE9mTnpUckRpcmVjdGl2ZS5jaGFuZ2VzLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh0aGlzLmxpc3RPZk56VHJEaXJlY3RpdmUpLFxuICAgICAgICBtYXAoaXRlbSA9PiBpdGVtICYmIGl0ZW0uZmlyc3QpXG4gICAgICApIGFzIE9ic2VydmFibGU8TnpUckRpcmVjdGl2ZT47XG4gICAgICBjb25zdCBsaXN0T2ZDb2x1bW5zQ2hhbmdlcyQgPSBmaXJzdFRhYmxlUm93JC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoZmlyc3RUYWJsZVJvdyA9PiAoZmlyc3RUYWJsZVJvdyA/IGZpcnN0VGFibGVSb3cubGlzdE9mQ29sdW1uc0NoYW5nZXMkIDogRU1QVFkpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApO1xuICAgICAgbGlzdE9mQ29sdW1uc0NoYW5nZXMkLnN1YnNjcmliZShkYXRhID0+IHRoaXMubnpUYWJsZVN0eWxlU2VydmljZS5zZXRMaXN0T2ZUaChkYXRhKSk7XG4gICAgICAvKiogVE9ETzogbmVlZCByZXNldCB0aGUgbWVhc3VyZSByb3cgd2hlbiBzY3JvbGxYIGNoYW5nZSAqKi9cbiAgICAgIHRoaXMubnpUYWJsZVN0eWxlU2VydmljZS5lbmFibGVBdXRvTWVhc3VyZSRcbiAgICAgICAgLnBpcGUoc3dpdGNoTWFwKGVuYWJsZSA9PiAoZW5hYmxlID8gbGlzdE9mQ29sdW1uc0NoYW5nZXMkIDogb2YoW10pKSkpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHRoaXMubnpUYWJsZVN0eWxlU2VydmljZS5zZXRMaXN0T2ZNZWFzdXJlQ29sdW1uKGRhdGEpKTtcbiAgICAgIGNvbnN0IGxpc3RPZkZpeGVkTGVmdENvbHVtbkNoYW5nZXMkID0gZmlyc3RUYWJsZVJvdyQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGZpcnN0VHIgPT4gKGZpcnN0VHIgPyBmaXJzdFRyLmxpc3RPZkZpeGVkTGVmdENvbHVtbkNoYW5nZXMkIDogRU1QVFkpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApO1xuICAgICAgY29uc3QgbGlzdE9mRml4ZWRSaWdodENvbHVtbkNoYW5nZXMkID0gZmlyc3RUYWJsZVJvdyQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGZpcnN0VHIgPT4gKGZpcnN0VHIgPyBmaXJzdFRyLmxpc3RPZkZpeGVkUmlnaHRDb2x1bW5DaGFuZ2VzJCA6IEVNUFRZKSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKTtcbiAgICAgIGxpc3RPZkZpeGVkTGVmdENvbHVtbkNoYW5nZXMkLnN1YnNjcmliZShsaXN0T2ZGaXhlZExlZnRDb2x1bW4gPT4ge1xuICAgICAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2Uuc2V0SGFzRml4TGVmdChsaXN0T2ZGaXhlZExlZnRDb2x1bW4ubGVuZ3RoICE9PSAwKTtcbiAgICAgIH0pO1xuICAgICAgbGlzdE9mRml4ZWRSaWdodENvbHVtbkNoYW5nZXMkLnN1YnNjcmliZShsaXN0T2ZGaXhlZFJpZ2h0Q29sdW1uID0+IHtcbiAgICAgICAgdGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlLnNldEhhc0ZpeFJpZ2h0KGxpc3RPZkZpeGVkUmlnaHRDb2x1bW4ubGVuZ3RoICE9PSAwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5uelRhYmxlRGF0YVNlcnZpY2UpIHtcbiAgICAgIGNvbnN0IGxpc3RPZkNvbHVtbiQgPSB0aGlzLmxpc3RPZk56VGhBZGRPbkNvbXBvbmVudC5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKHRoaXMubGlzdE9mTnpUaEFkZE9uQ29tcG9uZW50KSkgYXMgT2JzZXJ2YWJsZTxcbiAgICAgICAgUXVlcnlMaXN0PE56VGhBZGRPbkNvbXBvbmVudD5cbiAgICAgID47XG4gICAgICBjb25zdCBtYW51YWxTb3J0JCA9IGxpc3RPZkNvbHVtbiQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IG1lcmdlKC4uLnRoaXMubGlzdE9mTnpUaEFkZE9uQ29tcG9uZW50Lm1hcCh0aCA9PiB0aC5tYW51YWxDbGlja09yZGVyJCkpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApO1xuICAgICAgbWFudWFsU29ydCQuc3Vic2NyaWJlKChkYXRhOiBOelRoQWRkT25Db21wb25lbnQpID0+IHtcbiAgICAgICAgY29uc3QgZW1pdFZhbHVlID0geyBrZXk6IGRhdGEubnpDb2x1bW5LZXksIHZhbHVlOiBkYXRhLnNvcnRPcmRlciB9O1xuICAgICAgICB0aGlzLm56U29ydE9yZGVyQ2hhbmdlLmVtaXQoZW1pdFZhbHVlKTtcbiAgICAgICAgaWYgKGRhdGEubnpTb3J0Rm4gJiYgZGF0YS5uelNvcnRQcmlvcml0eSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLmxpc3RPZk56VGhBZGRPbkNvbXBvbmVudC5maWx0ZXIodGggPT4gdGggIT09IGRhdGEpLmZvckVhY2godGggPT4gdGguY2xlYXJTb3J0T3JkZXIoKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY29uc3QgbGlzdE9mQ2FsY09wZXJhdG9yJCA9IGxpc3RPZkNvbHVtbiQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGxpc3QgPT5cbiAgICAgICAgICBtZXJnZSguLi5bbGlzdE9mQ29sdW1uJCwgLi4ubGlzdC5tYXAoKGM6IE56VGhBZGRPbkNvbXBvbmVudCkgPT4gYy5jYWxjT3BlcmF0b3JDaGFuZ2UkKV0pLnBpcGUobWVyZ2VNYXAoKCkgPT4gbGlzdE9mQ29sdW1uJCkpXG4gICAgICAgICksXG4gICAgICAgIG1hcChsaXN0ID0+XG4gICAgICAgICAgbGlzdFxuICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+ICEhaXRlbS5uelNvcnRGbiB8fCAhIWl0ZW0ubnpGaWx0ZXJGbilcbiAgICAgICAgICAgIC5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgbnpTb3J0Rm4sIHNvcnRPcmRlciwgbnpGaWx0ZXJGbiwgbnpGaWx0ZXJWYWx1ZSwgbnpTb3J0UHJpb3JpdHksIG56Q29sdW1uS2V5IH0gPSBpdGVtO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGtleTogbnpDb2x1bW5LZXksXG4gICAgICAgICAgICAgICAgc29ydEZuOiBuelNvcnRGbixcbiAgICAgICAgICAgICAgICBzb3J0UHJpb3JpdHk6IG56U29ydFByaW9yaXR5LFxuICAgICAgICAgICAgICAgIHNvcnRPcmRlcjogc29ydE9yZGVyISxcbiAgICAgICAgICAgICAgICBmaWx0ZXJGbjogbnpGaWx0ZXJGbiEsXG4gICAgICAgICAgICAgICAgZmlsdGVyVmFsdWU6IG56RmlsdGVyVmFsdWVcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIC8vIFRPRE86IGFmdGVyIGNoZWNrZWQgZXJyb3IgaGVyZVxuICAgICAgICBkZWxheSgwKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApO1xuICAgICAgbGlzdE9mQ2FsY09wZXJhdG9yJC5zdWJzY3JpYmUobGlzdCA9PiB7XG4gICAgICAgIHRoaXMubnpUYWJsZURhdGFTZXJ2aWNlLmxpc3RPZkNhbGNPcGVyYXRvciQubmV4dChsaXN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCksIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==