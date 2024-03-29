/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./table-content.component";
export class NzTableInnerDefaultComponent {
    constructor() {
        this.tableLayout = 'auto';
        this.listOfColWidth = [];
        this.theadTemplate = null;
        this.contentTemplate = null;
    }
}
NzTableInnerDefaultComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableInnerDefaultComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTableInnerDefaultComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableInnerDefaultComponent, selector: "nz-table-inner-default", inputs: { tableLayout: "tableLayout", listOfColWidth: "listOfColWidth", theadTemplate: "theadTemplate", contentTemplate: "contentTemplate" }, host: { classAttribute: "ant-table-container" }, ngImport: i0, template: `
    <div class="ant-table-content">
      <table
        nz-table-content
        [contentTemplate]="contentTemplate"
        [tableLayout]="tableLayout"
        [listOfColWidth]="listOfColWidth"
        [theadTemplate]="theadTemplate"
      ></table>
    </div>
  `, isInline: true, components: [{ type: i1.NzTableContentComponent, selector: "table[nz-table-content]", inputs: ["tableLayout", "theadTemplate", "contentTemplate", "listOfColWidth", "scrollX"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableInnerDefaultComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-table-inner-default',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <div class="ant-table-content">
      <table
        nz-table-content
        [contentTemplate]="contentTemplate"
        [tableLayout]="tableLayout"
        [listOfColWidth]="listOfColWidth"
        [theadTemplate]="theadTemplate"
      ></table>
    </div>
  `,
                    host: { class: 'ant-table-container' }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { tableLayout: [{
                type: Input
            }], listOfColWidth: [{
                type: Input
            }], theadTemplate: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaW5uZXItZGVmYXVsdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYmxlL3NyYy90YWJsZS90YWJsZS1pbm5lci1kZWZhdWx0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBdUIxRyxNQUFNLE9BQU8sNEJBQTRCO0lBTXZDO1FBTFMsZ0JBQVcsR0FBa0IsTUFBTSxDQUFDO1FBQ3BDLG1CQUFjLEdBQWlDLEVBQUUsQ0FBQztRQUNsRCxrQkFBYSxHQUFrQyxJQUFJLENBQUM7UUFDcEQsb0JBQWUsR0FBa0MsSUFBSSxDQUFDO0lBRWhELENBQUM7O3lIQU5MLDRCQUE0Qjs2R0FBNUIsNEJBQTRCLDZQQWI3Qjs7Ozs7Ozs7OztHQVVUOzJGQUdVLDRCQUE0QjtrQkFqQnhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7R0FVVDtvQkFDRCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUU7aUJBQ3ZDOzBFQUVVLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IE56VGFibGVMYXlvdXQgfSBmcm9tICcuLi90YWJsZS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRhYmxlLWlubmVyLWRlZmF1bHQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LXRhYmxlLWNvbnRlbnRcIj5cbiAgICAgIDx0YWJsZVxuICAgICAgICBuei10YWJsZS1jb250ZW50XG4gICAgICAgIFtjb250ZW50VGVtcGxhdGVdPVwiY29udGVudFRlbXBsYXRlXCJcbiAgICAgICAgW3RhYmxlTGF5b3V0XT1cInRhYmxlTGF5b3V0XCJcbiAgICAgICAgW2xpc3RPZkNvbFdpZHRoXT1cImxpc3RPZkNvbFdpZHRoXCJcbiAgICAgICAgW3RoZWFkVGVtcGxhdGVdPVwidGhlYWRUZW1wbGF0ZVwiXG4gICAgICA+PC90YWJsZT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDogeyBjbGFzczogJ2FudC10YWJsZS1jb250YWluZXInIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJsZUlubmVyRGVmYXVsdENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHRhYmxlTGF5b3V0OiBOelRhYmxlTGF5b3V0ID0gJ2F1dG8nO1xuICBASW5wdXQoKSBsaXN0T2ZDb2xXaWR0aDogUmVhZG9ubHlBcnJheTxzdHJpbmcgfCBudWxsPiA9IFtdO1xuICBASW5wdXQoKSB0aGVhZFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbiJdfQ==