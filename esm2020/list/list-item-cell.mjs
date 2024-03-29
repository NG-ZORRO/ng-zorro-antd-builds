/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ContentChildren, Input, TemplateRef, ViewChild } from '@angular/core';
import { defer, merge, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NzListItemExtraComponent {
    constructor() { }
}
NzListItemExtraComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemExtraComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListItemExtraComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemExtraComponent, selector: "nz-list-item-extra, [nz-list-item-extra]", host: { classAttribute: "ant-list-item-extra" }, exportAs: ["nzListItemExtra"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemExtraComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-extra, [nz-list-item-extra]',
                    exportAs: 'nzListItemExtra',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'ant-list-item-extra'
                    }
                }]
        }], ctorParameters: function () { return []; } });
export class NzListItemActionComponent {
    constructor() { }
}
NzListItemActionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemActionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListItemActionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemActionComponent, selector: "nz-list-item-action", viewQueries: [{ propertyName: "templateRef", first: true, predicate: TemplateRef, descendants: true }], exportAs: ["nzListItemAction"], ngImport: i0, template: ` <ng-template><ng-content></ng-content></ng-template> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemActionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-action',
                    exportAs: 'nzListItemAction',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <ng-template><ng-content></ng-content></ng-template> `
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { templateRef: [{
                type: ViewChild,
                args: [TemplateRef]
            }] } });
export class NzListItemActionsComponent {
    constructor(ngZone, cdr) {
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.nzActions = [];
        this.actions = [];
        this.destroy$ = new Subject();
        this.inputActionChanges$ = new Subject();
        this.contentChildrenChanges$ = defer(() => {
            if (this.nzListItemActions) {
                return of(null);
            }
            return this.ngZone.onStable.asObservable().pipe(take(1), switchMap(() => this.contentChildrenChanges$));
        });
        merge(this.contentChildrenChanges$, this.inputActionChanges$)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            if (this.nzActions.length) {
                this.actions = this.nzActions;
            }
            else {
                this.actions = this.nzListItemActions.map(action => action.templateRef);
            }
            this.cdr.detectChanges();
        });
    }
    ngOnChanges() {
        this.inputActionChanges$.next(null);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzListItemActionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemActionsComponent, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzListItemActionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemActionsComponent, selector: "ul[nz-list-item-actions]", inputs: { nzActions: "nzActions" }, host: { classAttribute: "ant-list-item-action" }, queries: [{ propertyName: "nzListItemActions", predicate: NzListItemActionComponent }], exportAs: ["nzListItemActions"], usesOnChanges: true, ngImport: i0, template: `
    <li *ngFor="let i of actions; let last = last">
      <ng-template [ngTemplateOutlet]="i"></ng-template>
      <em *ngIf="!last" class="ant-list-item-action-split"></em>
    </li>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemActionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ul[nz-list-item-actions]',
                    exportAs: 'nzListItemActions',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <li *ngFor="let i of actions; let last = last">
      <ng-template [ngTemplateOutlet]="i"></ng-template>
      <em *ngIf="!last" class="ant-list-item-action-split"></em>
    </li>
  `,
                    host: {
                        class: 'ant-list-item-action'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { nzActions: [{
                type: Input
            }], nzListItemActions: [{
                type: ContentChildren,
                args: [NzListItemActionComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLWNlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2xpc3QvbGlzdC1pdGVtLWNlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUNmLEtBQUssRUFLTCxXQUFXLEVBQ1gsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQVc1RCxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLGdCQUFlLENBQUM7O3FIQURMLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLGdLQUx6Qiw2QkFBNkI7MkZBSzVCLHdCQUF3QjtrQkFUcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxxQkFBcUI7cUJBQzdCO2lCQUNGOztBQVdELE1BQU0sT0FBTyx5QkFBeUI7SUFFcEMsZ0JBQWUsQ0FBQzs7c0hBRkwseUJBQXlCOzBHQUF6Qix5QkFBeUIsd0dBQ3pCLFdBQVcsZ0ZBSFosd0RBQXdEOzJGQUV2RCx5QkFBeUI7a0JBTnJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSx3REFBd0Q7aUJBQ25FOzBFQUV5QixXQUFXO3NCQUFsQyxTQUFTO3VCQUFDLFdBQVc7O0FBa0J4QixNQUFNLE9BQU8sMEJBQTBCO0lBaUJyQyxZQUFvQixNQUFjLEVBQVUsR0FBc0I7UUFBOUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBaEJ6RCxjQUFTLEdBQTZCLEVBQUUsQ0FBQztRQUdsRCxZQUFPLEdBQTZCLEVBQUUsQ0FBQztRQUMvQixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN6Qix3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQzFDLDRCQUF1QixHQUFxQixLQUFLLENBQUMsR0FBRyxFQUFFO1lBQzdELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUMxQixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQjtZQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUM3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUM5QyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFHRCxLQUFLLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQzthQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQy9CO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFZLENBQUMsQ0FBQzthQUMxRTtZQUNELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7dUhBckNVLDBCQUEwQjsyR0FBMUIsMEJBQTBCLHdMQUVwQix5QkFBeUIsbUZBWmhDOzs7OztHQUtUOzJGQUtVLDBCQUEwQjtrQkFkdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOzs7OztHQUtUO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsc0JBQXNCO3FCQUM5QjtpQkFDRjs2SEFFVSxTQUFTO3NCQUFqQixLQUFLO2dCQUNzQyxpQkFBaUI7c0JBQTVELGVBQWU7dUJBQUMseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlZmVyLCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1saXN0LWl0ZW0tZXh0cmEsIFtuei1saXN0LWl0ZW0tZXh0cmFdJyxcbiAgZXhwb3J0QXM6ICduekxpc3RJdGVtRXh0cmEnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtbGlzdC1pdGVtLWV4dHJhJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdEl0ZW1FeHRyYUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge31cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotbGlzdC1pdGVtLWFjdGlvbicsXG4gIGV4cG9ydEFzOiAnbnpMaXN0SXRlbUFjdGlvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYCA8bmctdGVtcGxhdGU+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvbmctdGVtcGxhdGU+IGBcbn0pXG5leHBvcnQgY2xhc3MgTnpMaXN0SXRlbUFjdGlvbkNvbXBvbmVudCB7XG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlUmVmPzogVGVtcGxhdGVSZWY8dm9pZD47XG4gIGNvbnN0cnVjdG9yKCkge31cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndWxbbnotbGlzdC1pdGVtLWFjdGlvbnNdJyxcbiAgZXhwb3J0QXM6ICduekxpc3RJdGVtQWN0aW9ucycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsaSAqbmdGb3I9XCJsZXQgaSBvZiBhY3Rpb25zOyBsZXQgbGFzdCA9IGxhc3RcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJpXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxlbSAqbmdJZj1cIiFsYXN0XCIgY2xhc3M9XCJhbnQtbGlzdC1pdGVtLWFjdGlvbi1zcGxpdFwiPjwvZW0+XG4gICAgPC9saT5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LWxpc3QtaXRlbS1hY3Rpb24nXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpMaXN0SXRlbUFjdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG56QWN0aW9uczogQXJyYXk8VGVtcGxhdGVSZWY8dm9pZD4+ID0gW107XG4gIEBDb250ZW50Q2hpbGRyZW4oTnpMaXN0SXRlbUFjdGlvbkNvbXBvbmVudCkgbnpMaXN0SXRlbUFjdGlvbnMhOiBRdWVyeUxpc3Q8TnpMaXN0SXRlbUFjdGlvbkNvbXBvbmVudD47XG5cbiAgYWN0aW9uczogQXJyYXk8VGVtcGxhdGVSZWY8dm9pZD4+ID0gW107XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIGlucHV0QWN0aW9uQ2hhbmdlcyQgPSBuZXcgU3ViamVjdDxudWxsPigpO1xuICBwcml2YXRlIGNvbnRlbnRDaGlsZHJlbkNoYW5nZXMkOiBPYnNlcnZhYmxlPG51bGw+ID0gZGVmZXIoKCkgPT4ge1xuICAgIGlmICh0aGlzLm56TGlzdEl0ZW1BY3Rpb25zKSB7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKS5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmNvbnRlbnRDaGlsZHJlbkNoYW5nZXMkKVxuICAgICk7XG4gIH0pO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIG1lcmdlKHRoaXMuY29udGVudENoaWxkcmVuQ2hhbmdlcyQsIHRoaXMuaW5wdXRBY3Rpb25DaGFuZ2VzJClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5uekFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5hY3Rpb25zID0gdGhpcy5uekFjdGlvbnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5hY3Rpb25zID0gdGhpcy5uekxpc3RJdGVtQWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbi50ZW1wbGF0ZVJlZiEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dEFjdGlvbkNoYW5nZXMkLm5leHQobnVsbCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==