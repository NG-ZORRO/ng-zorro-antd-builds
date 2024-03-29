/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/core/transition-patch";
import * as i3 from "ng-zorro-antd/icon";
export class NzTableSortersComponent {
    constructor() {
        this.sortDirections = ['ascend', 'descend', null];
        this.sortOrder = null;
        this.contentTemplate = null;
        this.isUp = false;
        this.isDown = false;
    }
    ngOnChanges(changes) {
        const { sortDirections } = changes;
        if (sortDirections) {
            this.isUp = this.sortDirections.indexOf('ascend') !== -1;
            this.isDown = this.sortDirections.indexOf('descend') !== -1;
        }
    }
}
NzTableSortersComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableSortersComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTableSortersComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableSortersComponent, selector: "nz-table-sorters", inputs: { sortDirections: "sortDirections", sortOrder: "sortOrder", contentTemplate: "contentTemplate" }, host: { classAttribute: "ant-table-column-sorters" }, usesOnChanges: true, ngImport: i0, template: `
    <span class="ant-table-column-title"><ng-template [ngTemplateOutlet]="contentTemplate"></ng-template></span>
    <span class="ant-table-column-sorter" [class.ant-table-column-sorter-full]="isDown && isUp">
      <span class="ant-table-column-sorter-inner">
        <i
          nz-icon
          nzType="caret-up"
          *ngIf="isUp"
          class="ant-table-column-sorter-up"
          [class.active]="sortOrder === 'ascend'"
        ></i>
        <i
          nz-icon
          nzType="caret-down"
          *ngIf="isDown"
          class="ant-table-column-sorter-down"
          [class.active]="sortOrder === 'descend'"
        ></i>
      </span>
    </span>
  `, isInline: true, directives: [{ type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableSortersComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-table-sorters',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <span class="ant-table-column-title"><ng-template [ngTemplateOutlet]="contentTemplate"></ng-template></span>
    <span class="ant-table-column-sorter" [class.ant-table-column-sorter-full]="isDown && isUp">
      <span class="ant-table-column-sorter-inner">
        <i
          nz-icon
          nzType="caret-up"
          *ngIf="isUp"
          class="ant-table-column-sorter-up"
          [class.active]="sortOrder === 'ascend'"
        ></i>
        <i
          nz-icon
          nzType="caret-down"
          *ngIf="isDown"
          class="ant-table-column-sorter-down"
          [class.active]="sortOrder === 'descend'"
        ></i>
      </span>
    </span>
  `,
                    host: { class: 'ant-table-column-sorters' }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { sortDirections: [{
                type: Input
            }], sortOrder: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYmxlL3NyYy9hZGRvbi9zb3J0ZXJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBSUwsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDOzs7OztBQWtDdkIsTUFBTSxPQUFPLHVCQUF1QjtJQU9sQztRQU5TLG1CQUFjLEdBQXVCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRSxjQUFTLEdBQXFCLElBQUksQ0FBQztRQUNuQyxvQkFBZSxHQUFrQyxJQUFJLENBQUM7UUFDL0QsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLFdBQU0sR0FBRyxLQUFLLENBQUM7SUFFQSxDQUFDO0lBRWhCLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ25DLElBQUksY0FBYyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7O29IQWZVLHVCQUF1Qjt3R0FBdkIsdUJBQXVCLDZPQXZCeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUOzJGQUdVLHVCQUF1QjtrQkE1Qm5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUO29CQUNELElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSwwQkFBMEIsRUFBRTtpQkFDNUM7MEVBRVUsY0FBYztzQkFBdEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IE56VGFibGVTb3J0T3JkZXIgfSBmcm9tICcuLi90YWJsZS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRhYmxlLXNvcnRlcnMnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gY2xhc3M9XCJhbnQtdGFibGUtY29sdW1uLXRpdGxlXCI+PG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiYW50LXRhYmxlLWNvbHVtbi1zb3J0ZXJcIiBbY2xhc3MuYW50LXRhYmxlLWNvbHVtbi1zb3J0ZXItZnVsbF09XCJpc0Rvd24gJiYgaXNVcFwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtdGFibGUtY29sdW1uLXNvcnRlci1pbm5lclwiPlxuICAgICAgICA8aVxuICAgICAgICAgIG56LWljb25cbiAgICAgICAgICBuelR5cGU9XCJjYXJldC11cFwiXG4gICAgICAgICAgKm5nSWY9XCJpc1VwXCJcbiAgICAgICAgICBjbGFzcz1cImFudC10YWJsZS1jb2x1bW4tc29ydGVyLXVwXCJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInNvcnRPcmRlciA9PT0gJ2FzY2VuZCdcIlxuICAgICAgICA+PC9pPlxuICAgICAgICA8aVxuICAgICAgICAgIG56LWljb25cbiAgICAgICAgICBuelR5cGU9XCJjYXJldC1kb3duXCJcbiAgICAgICAgICAqbmdJZj1cImlzRG93blwiXG4gICAgICAgICAgY2xhc3M9XCJhbnQtdGFibGUtY29sdW1uLXNvcnRlci1kb3duXCJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInNvcnRPcmRlciA9PT0gJ2Rlc2NlbmQnXCJcbiAgICAgICAgPjwvaT5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gIGAsXG4gIGhvc3Q6IHsgY2xhc3M6ICdhbnQtdGFibGUtY29sdW1uLXNvcnRlcnMnIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJsZVNvcnRlcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBzb3J0RGlyZWN0aW9uczogTnpUYWJsZVNvcnRPcmRlcltdID0gWydhc2NlbmQnLCAnZGVzY2VuZCcsIG51bGxdO1xuICBASW5wdXQoKSBzb3J0T3JkZXI6IE56VGFibGVTb3J0T3JkZXIgPSBudWxsO1xuICBASW5wdXQoKSBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgaXNVcCA9IGZhbHNlO1xuICBpc0Rvd24gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgc29ydERpcmVjdGlvbnMgfSA9IGNoYW5nZXM7XG4gICAgaWYgKHNvcnREaXJlY3Rpb25zKSB7XG4gICAgICB0aGlzLmlzVXAgPSB0aGlzLnNvcnREaXJlY3Rpb25zLmluZGV4T2YoJ2FzY2VuZCcpICE9PSAtMTtcbiAgICAgIHRoaXMuaXNEb3duID0gdGhpcy5zb3J0RGlyZWN0aW9ucy5pbmRleE9mKCdkZXNjZW5kJykgIT09IC0xO1xuICAgIH1cbiAgfVxufVxuIl19