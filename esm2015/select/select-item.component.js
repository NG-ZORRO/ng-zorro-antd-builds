/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
export class NzSelectItemComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.disabled = false;
        this.label = null;
        this.deletable = false;
        this.removeIcon = null;
        this.contentTemplateOutletContext = null;
        this.contentTemplateOutlet = null;
        this.delete = new EventEmitter();
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-select-selection-item');
    }
    onDelete(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.disabled) {
            this.delete.next(e);
        }
    }
}
NzSelectItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-select-item',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-container *nzStringTemplateOutlet="contentTemplateOutlet; context: { $implicit: contentTemplateOutletContext }">
      <div class="ant-select-selection-item-content" *ngIf="deletable; else labelTemplate">{{ label }}</div>
      <ng-template #labelTemplate>{{ label }}</ng-template>
    </ng-container>
    <span *ngIf="deletable && !disabled" class="ant-select-selection-item-remove" (click)="onDelete($event)">
      <i nz-icon nzType="close" *ngIf="!removeIcon; else removeIcon"></i>
    </span>
  `,
                host: {
                    '[attr.title]': 'label',
                    '[class.ant-select-selection-item-disabled]': 'disabled'
                }
            },] }
];
NzSelectItemComponent.ctorParameters = () => [
    { type: ElementRef }
];
NzSelectItemComponent.propDecorators = {
    disabled: [{ type: Input }],
    label: [{ type: Input }],
    deletable: [{ type: Input }],
    removeIcon: [{ type: Input }],
    contentTemplateOutletContext: [{ type: Input }],
    contentTemplateOutlet: [{ type: Input }],
    delete: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFlLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBcUI1SSxNQUFNLE9BQU8scUJBQXFCO0lBU2hDLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFSakMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixVQUFLLEdBQXVDLElBQUksQ0FBQztRQUNqRCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBa0MsSUFBSSxDQUFDO1FBQ2pELGlDQUE0QixHQUFxQixJQUFJLENBQUM7UUFDdEQsMEJBQXFCLEdBQTJDLElBQUksQ0FBQztRQUMzRCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUd6RCxtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxRQUFRLENBQUMsQ0FBYTtRQUNwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7O1lBdENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7R0FRVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osY0FBYyxFQUFFLE9BQU87b0JBQ3ZCLDRDQUE0QyxFQUFFLFVBQVU7aUJBQ3pEO2FBQ0Y7OztZQXBCNEMsVUFBVTs7O3VCQXNCcEQsS0FBSztvQkFDTCxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSzsyQ0FDTCxLQUFLO29DQUNMLEtBQUs7cUJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1zZWxlY3QtaXRlbScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVPdXRsZXQ7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBjb250ZW50VGVtcGxhdGVPdXRsZXRDb250ZXh0IH1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtc2VsZWN0LXNlbGVjdGlvbi1pdGVtLWNvbnRlbnRcIiAqbmdJZj1cImRlbGV0YWJsZTsgZWxzZSBsYWJlbFRlbXBsYXRlXCI+e3sgbGFiZWwgfX08L2Rpdj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjbGFiZWxUZW1wbGF0ZT57eyBsYWJlbCB9fTwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPHNwYW4gKm5nSWY9XCJkZWxldGFibGUgJiYgIWRpc2FibGVkXCIgY2xhc3M9XCJhbnQtc2VsZWN0LXNlbGVjdGlvbi1pdGVtLXJlbW92ZVwiIChjbGljayk9XCJvbkRlbGV0ZSgkZXZlbnQpXCI+XG4gICAgICA8aSBuei1pY29uIG56VHlwZT1cImNsb3NlXCIgKm5nSWY9XCIhcmVtb3ZlSWNvbjsgZWxzZSByZW1vdmVJY29uXCI+PC9pPlxuICAgIDwvc3Bhbj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbYXR0ci50aXRsZV0nOiAnbGFiZWwnLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC1zZWxlY3Rpb24taXRlbS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpTZWxlY3RJdGVtQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQgPSBudWxsO1xuICBASW5wdXQoKSBkZWxldGFibGUgPSBmYWxzZTtcbiAgQElucHV0KCkgcmVtb3ZlSWNvbjogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjb250ZW50VGVtcGxhdGVPdXRsZXRDb250ZXh0OiBOelNhZmVBbnkgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgY29udGVudFRlbXBsYXRlT3V0bGV0OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBPdXRwdXQoKSByZWFkb25seSBkZWxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgLy8gVE9ETzogbW92ZSB0byBob3N0IGFmdGVyIFZpZXcgRW5naW5lIGRlcHJlY2F0aW9uXG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYW50LXNlbGVjdC1zZWxlY3Rpb24taXRlbScpO1xuICB9XG5cbiAgb25EZWxldGUoZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5kZWxldGUubmV4dChlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==