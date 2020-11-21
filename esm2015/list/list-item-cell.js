/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, NgZone, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { defer, merge, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
export class NzListItemExtraComponent {
    constructor() { }
}
NzListItemExtraComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-list-item-extra, [nz-list-item-extra]',
                exportAs: 'nzListItemExtra',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: ` <ng-content></ng-content> `,
                host: {
                    class: 'ant-list-item-extra'
                }
            },] }
];
NzListItemExtraComponent.ctorParameters = () => [];
export class NzListItemActionComponent {
    constructor() { }
}
NzListItemActionComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-list-item-action',
                exportAs: 'nzListItemAction',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: ` <ng-template><ng-content></ng-content></ng-template> `
            },] }
];
NzListItemActionComponent.ctorParameters = () => [];
NzListItemActionComponent.propDecorators = {
    templateRef: [{ type: ViewChild, args: [TemplateRef,] }]
};
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
NzListItemActionsComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
NzListItemActionsComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ChangeDetectorRef }
];
NzListItemActionsComponent.propDecorators = {
    nzActions: [{ type: Input }],
    nzListItemActions: [{ type: ContentChildren, args: [NzListItemActionComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLWNlbGwuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2xpc3QvIiwic291cmNlcyI6WyJsaXN0LWl0ZW0tY2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLEtBQUssRUFDTCxNQUFNLEVBR04sU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVc1RCxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLGdCQUFlLENBQUM7OztZQVZqQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBDQUEwQztnQkFDcEQsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUscUJBQXFCO2lCQUM3QjthQUNGOzs7QUFXRCxNQUFNLE9BQU8seUJBQXlCO0lBRXBDLGdCQUFlLENBQUM7OztZQVJqQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRSx3REFBd0Q7YUFDbkU7Ozs7MEJBRUUsU0FBUyxTQUFDLFdBQVc7O0FBa0J4QixNQUFNLE9BQU8sMEJBQTBCO0lBaUJyQyxZQUFvQixNQUFjLEVBQVUsR0FBc0I7UUFBOUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBaEJ6RCxjQUFTLEdBQTZCLEVBQUUsQ0FBQztRQUdsRCxZQUFPLEdBQTZCLEVBQUUsQ0FBQztRQUMvQixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN6Qix3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQzFDLDRCQUF1QixHQUFxQixLQUFLLENBQUMsR0FBRyxFQUFFO1lBQzdELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUMxQixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQjtZQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUM3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUM5QyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFHRCxLQUFLLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQzthQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQy9CO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFZLENBQUMsQ0FBQzthQUMxRTtZQUNELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBbkRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7OztHQUtUO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsc0JBQXNCO2lCQUM5QjthQUNGOzs7WUEvQ0MsTUFBTTtZQUpOLGlCQUFpQjs7O3dCQXFEaEIsS0FBSztnQ0FDTCxlQUFlLFNBQUMseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlZmVyLCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1saXN0LWl0ZW0tZXh0cmEsIFtuei1saXN0LWl0ZW0tZXh0cmFdJyxcbiAgZXhwb3J0QXM6ICduekxpc3RJdGVtRXh0cmEnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtbGlzdC1pdGVtLWV4dHJhJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdEl0ZW1FeHRyYUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge31cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotbGlzdC1pdGVtLWFjdGlvbicsXG4gIGV4cG9ydEFzOiAnbnpMaXN0SXRlbUFjdGlvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYCA8bmctdGVtcGxhdGU+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvbmctdGVtcGxhdGU+IGBcbn0pXG5leHBvcnQgY2xhc3MgTnpMaXN0SXRlbUFjdGlvbkNvbXBvbmVudCB7XG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlUmVmPzogVGVtcGxhdGVSZWY8dm9pZD47XG4gIGNvbnN0cnVjdG9yKCkge31cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndWxbbnotbGlzdC1pdGVtLWFjdGlvbnNdJyxcbiAgZXhwb3J0QXM6ICduekxpc3RJdGVtQWN0aW9ucycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsaSAqbmdGb3I9XCJsZXQgaSBvZiBhY3Rpb25zOyBsZXQgbGFzdCA9IGxhc3RcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJpXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxlbSAqbmdJZj1cIiFsYXN0XCIgY2xhc3M9XCJhbnQtbGlzdC1pdGVtLWFjdGlvbi1zcGxpdFwiPjwvZW0+XG4gICAgPC9saT5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LWxpc3QtaXRlbS1hY3Rpb24nXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpMaXN0SXRlbUFjdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG56QWN0aW9uczogQXJyYXk8VGVtcGxhdGVSZWY8dm9pZD4+ID0gW107XG4gIEBDb250ZW50Q2hpbGRyZW4oTnpMaXN0SXRlbUFjdGlvbkNvbXBvbmVudCkgbnpMaXN0SXRlbUFjdGlvbnMhOiBRdWVyeUxpc3Q8TnpMaXN0SXRlbUFjdGlvbkNvbXBvbmVudD47XG5cbiAgYWN0aW9uczogQXJyYXk8VGVtcGxhdGVSZWY8dm9pZD4+ID0gW107XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIGlucHV0QWN0aW9uQ2hhbmdlcyQgPSBuZXcgU3ViamVjdDxudWxsPigpO1xuICBwcml2YXRlIGNvbnRlbnRDaGlsZHJlbkNoYW5nZXMkOiBPYnNlcnZhYmxlPG51bGw+ID0gZGVmZXIoKCkgPT4ge1xuICAgIGlmICh0aGlzLm56TGlzdEl0ZW1BY3Rpb25zKSB7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKS5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmNvbnRlbnRDaGlsZHJlbkNoYW5nZXMkKVxuICAgICk7XG4gIH0pO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIG1lcmdlKHRoaXMuY29udGVudENoaWxkcmVuQ2hhbmdlcyQsIHRoaXMuaW5wdXRBY3Rpb25DaGFuZ2VzJClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5uekFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5hY3Rpb25zID0gdGhpcy5uekFjdGlvbnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5hY3Rpb25zID0gdGhpcy5uekxpc3RJdGVtQWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbi50ZW1wbGF0ZVJlZiEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dEFjdGlvbkNoYW5nZXMkLm5leHQobnVsbCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==