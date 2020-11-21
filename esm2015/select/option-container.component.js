/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
export class NzOptionContainerComponent {
    constructor() {
        this.notFoundContent = undefined;
        this.menuItemSelectedIcon = null;
        this.dropdownRender = null;
        this.activatedValue = null;
        this.listOfSelectedValue = [];
        this.mode = 'default';
        this.matchWidth = true;
        this.itemSize = 32;
        this.maxItemLength = 8;
        this.listOfContainerItem = [];
        this.itemClick = new EventEmitter();
        this.scrollToBottom = new EventEmitter();
        this.scrolledIndex = 0;
    }
    onItemClick(value) {
        this.itemClick.emit(value);
    }
    onItemHover(value) {
        // TODO: keydown.enter won't activate this value
        this.activatedValue = value;
    }
    trackValue(_index, option) {
        return option.key;
    }
    onScrolledIndexChange(index) {
        this.scrolledIndex = index;
        if (index === this.listOfContainerItem.length - this.maxItemLength) {
            this.scrollToBottom.emit();
        }
    }
    scrollToActivatedValue() {
        const index = this.listOfContainerItem.findIndex(item => this.compareWith(item.key, this.activatedValue));
        if (index < this.scrolledIndex || index >= this.scrolledIndex + this.maxItemLength) {
            this.cdkVirtualScrollViewport.scrollToIndex(index || 0);
        }
    }
    ngOnChanges(changes) {
        const { listOfContainerItem, activatedValue } = changes;
        if (listOfContainerItem || activatedValue) {
            this.scrollToActivatedValue();
        }
    }
    ngAfterViewInit() {
        setTimeout(() => this.scrollToActivatedValue());
    }
}
NzOptionContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-option-container',
                exportAs: 'nzOptionContainer',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                template: `
    <div>
      <div *ngIf="listOfContainerItem.length === 0" class="ant-select-item-empty">
        <nz-embed-empty nzComponentName="select" [specificContent]="notFoundContent!"></nz-embed-empty>
      </div>
      <cdk-virtual-scroll-viewport
        [class.full-width]="!matchWidth"
        [itemSize]="itemSize"
        [maxBufferPx]="itemSize * maxItemLength"
        [minBufferPx]="itemSize * maxItemLength"
        (scrolledIndexChange)="onScrolledIndexChange($event)"
        [style.height.px]="listOfContainerItem.length * itemSize"
        [style.max-height.px]="itemSize * maxItemLength"
      >
        <ng-template
          cdkVirtualFor
          [cdkVirtualForOf]="listOfContainerItem"
          [cdkVirtualForTrackBy]="trackValue"
          [cdkVirtualForTemplateCacheSize]="0"
          let-item
        >
          <ng-container [ngSwitch]="item.type">
            <nz-option-item-group *ngSwitchCase="'group'" [nzLabel]="item.groupLabel"></nz-option-item-group>
            <nz-option-item
              *ngSwitchCase="'item'"
              [icon]="menuItemSelectedIcon"
              [customContent]="item.nzCustomContent"
              [template]="item.template"
              [grouped]="!!item.groupLabel"
              [disabled]="item.nzDisabled"
              [showState]="mode === 'tags' || mode === 'multiple'"
              [label]="item.nzLabel"
              [compareWith]="compareWith"
              [activatedValue]="activatedValue"
              [listOfSelectedValue]="listOfSelectedValue"
              [value]="item.nzValue"
              (itemHover)="onItemHover($event)"
              (itemClick)="onItemClick($event)"
            ></nz-option-item>
          </ng-container>
        </ng-template>
      </cdk-virtual-scroll-viewport>
      <ng-template [ngTemplateOutlet]="dropdownRender"></ng-template>
    </div>
  `,
                host: {
                    '[class.ant-select-dropdown]': 'true'
                }
            },] }
];
NzOptionContainerComponent.propDecorators = {
    notFoundContent: [{ type: Input }],
    menuItemSelectedIcon: [{ type: Input }],
    dropdownRender: [{ type: Input }],
    activatedValue: [{ type: Input }],
    listOfSelectedValue: [{ type: Input }],
    compareWith: [{ type: Input }],
    mode: [{ type: Input }],
    matchWidth: [{ type: Input }],
    itemSize: [{ type: Input }],
    maxItemLength: [{ type: Input }],
    listOfContainerItem: [{ type: Input }],
    itemClick: [{ type: Output }],
    scrollToBottom: [{ type: Output }],
    cdkVirtualScrollViewport: [{ type: ViewChild, args: [CdkVirtualScrollViewport, { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3NlbGVjdC8iLCJzb3VyY2VzIjpbIm9wdGlvbi1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUdOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUEyRHZCLE1BQU0sT0FBTywwQkFBMEI7SUF2RHZDO1FBd0RXLG9CQUFlLEdBQWdELFNBQVMsQ0FBQztRQUN6RSx5QkFBb0IsR0FBa0MsSUFBSSxDQUFDO1FBQzNELG1CQUFjLEdBQWtDLElBQUksQ0FBQztRQUNyRCxtQkFBYyxHQUFxQixJQUFJLENBQUM7UUFDeEMsd0JBQW1CLEdBQWdCLEVBQUUsQ0FBQztRQUV0QyxTQUFJLEdBQXFCLFNBQVMsQ0FBQztRQUNuQyxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQix3QkFBbUIsR0FBNEIsRUFBRSxDQUFDO1FBQ3hDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBYSxDQUFDO1FBQzFDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUVyRCxrQkFBYSxHQUFHLENBQUMsQ0FBQztJQXNDNUIsQ0FBQztJQXBDQyxXQUFXLENBQUMsS0FBZ0I7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFnQjtRQUMxQixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFjLEVBQUUsTUFBNkI7UUFDdEQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxLQUFhO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNsRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVELHNCQUFzQjtRQUNwQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQzFHLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNsRixJQUFJLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN6RDtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxFQUFFLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUN4RCxJQUFJLG1CQUFtQixJQUFJLGNBQWMsRUFBRTtZQUN6QyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUMvQjtJQUNILENBQUM7SUFDRCxlQUFlO1FBQ2IsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7O1lBM0dGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q1Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLDZCQUE2QixFQUFFLE1BQU07aUJBQ3RDO2FBQ0Y7Ozs4QkFFRSxLQUFLO21DQUNMLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLO2tDQUNMLEtBQUs7MEJBQ0wsS0FBSzttQkFDTCxLQUFLO3lCQUNMLEtBQUs7dUJBQ0wsS0FBSzs0QkFDTCxLQUFLO2tDQUNMLEtBQUs7d0JBQ0wsTUFBTTs2QkFDTixNQUFNO3VDQUNOLFNBQVMsU0FBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOelNlbGVjdEl0ZW1JbnRlcmZhY2UsIE56U2VsZWN0TW9kZVR5cGUgfSBmcm9tICcuL3NlbGVjdC50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LW9wdGlvbi1jb250YWluZXInLFxuICBleHBvcnRBczogJ256T3B0aW9uQ29udGFpbmVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8ZGl2ICpuZ0lmPVwibGlzdE9mQ29udGFpbmVySXRlbS5sZW5ndGggPT09IDBcIiBjbGFzcz1cImFudC1zZWxlY3QtaXRlbS1lbXB0eVwiPlxuICAgICAgICA8bnotZW1iZWQtZW1wdHkgbnpDb21wb25lbnROYW1lPVwic2VsZWN0XCIgW3NwZWNpZmljQ29udGVudF09XCJub3RGb3VuZENvbnRlbnQhXCI+PC9uei1lbWJlZC1lbXB0eT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydFxuICAgICAgICBbY2xhc3MuZnVsbC13aWR0aF09XCIhbWF0Y2hXaWR0aFwiXG4gICAgICAgIFtpdGVtU2l6ZV09XCJpdGVtU2l6ZVwiXG4gICAgICAgIFttYXhCdWZmZXJQeF09XCJpdGVtU2l6ZSAqIG1heEl0ZW1MZW5ndGhcIlxuICAgICAgICBbbWluQnVmZmVyUHhdPVwiaXRlbVNpemUgKiBtYXhJdGVtTGVuZ3RoXCJcbiAgICAgICAgKHNjcm9sbGVkSW5kZXhDaGFuZ2UpPVwib25TY3JvbGxlZEluZGV4Q2hhbmdlKCRldmVudClcIlxuICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImxpc3RPZkNvbnRhaW5lckl0ZW0ubGVuZ3RoICogaXRlbVNpemVcIlxuICAgICAgICBbc3R5bGUubWF4LWhlaWdodC5weF09XCJpdGVtU2l6ZSAqIG1heEl0ZW1MZW5ndGhcIlxuICAgICAgPlxuICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICBjZGtWaXJ0dWFsRm9yXG4gICAgICAgICAgW2Nka1ZpcnR1YWxGb3JPZl09XCJsaXN0T2ZDb250YWluZXJJdGVtXCJcbiAgICAgICAgICBbY2RrVmlydHVhbEZvclRyYWNrQnldPVwidHJhY2tWYWx1ZVwiXG4gICAgICAgICAgW2Nka1ZpcnR1YWxGb3JUZW1wbGF0ZUNhY2hlU2l6ZV09XCIwXCJcbiAgICAgICAgICBsZXQtaXRlbVxuICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiaXRlbS50eXBlXCI+XG4gICAgICAgICAgICA8bnotb3B0aW9uLWl0ZW0tZ3JvdXAgKm5nU3dpdGNoQ2FzZT1cIidncm91cCdcIiBbbnpMYWJlbF09XCJpdGVtLmdyb3VwTGFiZWxcIj48L256LW9wdGlvbi1pdGVtLWdyb3VwPlxuICAgICAgICAgICAgPG56LW9wdGlvbi1pdGVtXG4gICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCInaXRlbSdcIlxuICAgICAgICAgICAgICBbaWNvbl09XCJtZW51SXRlbVNlbGVjdGVkSWNvblwiXG4gICAgICAgICAgICAgIFtjdXN0b21Db250ZW50XT1cIml0ZW0ubnpDdXN0b21Db250ZW50XCJcbiAgICAgICAgICAgICAgW3RlbXBsYXRlXT1cIml0ZW0udGVtcGxhdGVcIlxuICAgICAgICAgICAgICBbZ3JvdXBlZF09XCIhIWl0ZW0uZ3JvdXBMYWJlbFwiXG4gICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpdGVtLm56RGlzYWJsZWRcIlxuICAgICAgICAgICAgICBbc2hvd1N0YXRlXT1cIm1vZGUgPT09ICd0YWdzJyB8fCBtb2RlID09PSAnbXVsdGlwbGUnXCJcbiAgICAgICAgICAgICAgW2xhYmVsXT1cIml0ZW0ubnpMYWJlbFwiXG4gICAgICAgICAgICAgIFtjb21wYXJlV2l0aF09XCJjb21wYXJlV2l0aFwiXG4gICAgICAgICAgICAgIFthY3RpdmF0ZWRWYWx1ZV09XCJhY3RpdmF0ZWRWYWx1ZVwiXG4gICAgICAgICAgICAgIFtsaXN0T2ZTZWxlY3RlZFZhbHVlXT1cImxpc3RPZlNlbGVjdGVkVmFsdWVcIlxuICAgICAgICAgICAgICBbdmFsdWVdPVwiaXRlbS5uelZhbHVlXCJcbiAgICAgICAgICAgICAgKGl0ZW1Ib3Zlcik9XCJvbkl0ZW1Ib3ZlcigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgKGl0ZW1DbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgID48L256LW9wdGlvbi1pdGVtPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQ+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiZHJvcGRvd25SZW5kZXJcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LWRyb3Bkb3duXSc6ICd0cnVlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56T3B0aW9uQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgbm90Rm91bmRDb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBtZW51SXRlbVNlbGVjdGVkSWNvbjogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBkcm9wZG93blJlbmRlcjogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBhY3RpdmF0ZWRWYWx1ZTogTnpTYWZlQW55IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGxpc3RPZlNlbGVjdGVkVmFsdWU6IE56U2FmZUFueVtdID0gW107XG4gIEBJbnB1dCgpIGNvbXBhcmVXaXRoITogKG8xOiBOelNhZmVBbnksIG8yOiBOelNhZmVBbnkpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpIG1vZGU6IE56U2VsZWN0TW9kZVR5cGUgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIG1hdGNoV2lkdGggPSB0cnVlO1xuICBASW5wdXQoKSBpdGVtU2l6ZSA9IDMyO1xuICBASW5wdXQoKSBtYXhJdGVtTGVuZ3RoID0gODtcbiAgQElucHV0KCkgbGlzdE9mQ29udGFpbmVySXRlbTogTnpTZWxlY3RJdGVtSW50ZXJmYWNlW10gPSBbXTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGl0ZW1DbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TnpTYWZlQW55PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgc2Nyb2xsVG9Cb3R0b20gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBWaWV3Q2hpbGQoQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LCB7IHN0YXRpYzogdHJ1ZSB9KSBjZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQhOiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG4gIHByaXZhdGUgc2Nyb2xsZWRJbmRleCA9IDA7XG5cbiAgb25JdGVtQ2xpY2sodmFsdWU6IE56U2FmZUFueSk6IHZvaWQge1xuICAgIHRoaXMuaXRlbUNsaWNrLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgb25JdGVtSG92ZXIodmFsdWU6IE56U2FmZUFueSk6IHZvaWQge1xuICAgIC8vIFRPRE86IGtleWRvd24uZW50ZXIgd29uJ3QgYWN0aXZhdGUgdGhpcyB2YWx1ZVxuICAgIHRoaXMuYWN0aXZhdGVkVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHRyYWNrVmFsdWUoX2luZGV4OiBudW1iZXIsIG9wdGlvbjogTnpTZWxlY3RJdGVtSW50ZXJmYWNlKTogTnpTYWZlQW55IHtcbiAgICByZXR1cm4gb3B0aW9uLmtleTtcbiAgfVxuXG4gIG9uU2Nyb2xsZWRJbmRleENoYW5nZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zY3JvbGxlZEluZGV4ID0gaW5kZXg7XG4gICAgaWYgKGluZGV4ID09PSB0aGlzLmxpc3RPZkNvbnRhaW5lckl0ZW0ubGVuZ3RoIC0gdGhpcy5tYXhJdGVtTGVuZ3RoKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQm90dG9tLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBzY3JvbGxUb0FjdGl2YXRlZFZhbHVlKCk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5saXN0T2ZDb250YWluZXJJdGVtLmZpbmRJbmRleChpdGVtID0+IHRoaXMuY29tcGFyZVdpdGgoaXRlbS5rZXksIHRoaXMuYWN0aXZhdGVkVmFsdWUpKTtcbiAgICBpZiAoaW5kZXggPCB0aGlzLnNjcm9sbGVkSW5kZXggfHwgaW5kZXggPj0gdGhpcy5zY3JvbGxlZEluZGV4ICsgdGhpcy5tYXhJdGVtTGVuZ3RoKSB7XG4gICAgICB0aGlzLmNka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydC5zY3JvbGxUb0luZGV4KGluZGV4IHx8IDApO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IGxpc3RPZkNvbnRhaW5lckl0ZW0sIGFjdGl2YXRlZFZhbHVlIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChsaXN0T2ZDb250YWluZXJJdGVtIHx8IGFjdGl2YXRlZFZhbHVlKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQWN0aXZhdGVkVmFsdWUoKTtcbiAgICB9XG4gIH1cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zY3JvbGxUb0FjdGl2YXRlZFZhbHVlKCkpO1xuICB9XG59XG4iXX0=