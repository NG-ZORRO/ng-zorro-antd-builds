/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NzTableContentComponent {
    constructor() {
        this.tableLayout = 'auto';
        this.theadTemplate = null;
        this.contentTemplate = null;
        this.listOfColWidth = [];
        this.scrollX = null;
    }
}
NzTableContentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTableContentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableContentComponent, selector: "table[nz-table-content]", inputs: { tableLayout: "tableLayout", theadTemplate: "theadTemplate", contentTemplate: "contentTemplate", listOfColWidth: "listOfColWidth", scrollX: "scrollX" }, host: { properties: { "style.table-layout": "tableLayout", "class.ant-table-fixed": "scrollX", "style.width": "scrollX", "style.min-width": "scrollX ? '100%': null" } }, ngImport: i0, template: `
    <col [style.width]="width" [style.minWidth]="width" *ngFor="let width of listOfColWidth" />
    <thead class="ant-table-thead" *ngIf="theadTemplate">
      <ng-template [ngTemplateOutlet]="theadTemplate"></ng-template>
    </thead>
    <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    <ng-content></ng-content>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableContentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'table[nz-table-content]',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <col [style.width]="width" [style.minWidth]="width" *ngFor="let width of listOfColWidth" />
    <thead class="ant-table-thead" *ngIf="theadTemplate">
      <ng-template [ngTemplateOutlet]="theadTemplate"></ng-template>
    </thead>
    <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    <ng-content></ng-content>
  `,
                    host: {
                        '[style.table-layout]': 'tableLayout',
                        '[class.ant-table-fixed]': 'scrollX',
                        '[style.width]': 'scrollX',
                        '[style.min-width]': `scrollX ? '100%': null`
                    }
                }]
        }], propDecorators: { tableLayout: [{
                type: Input
            }], theadTemplate: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }], listOfColWidth: [{
                type: Input
            }], scrollX: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYmxlL3NyYy90YWJsZS90YWJsZS1jb250ZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBeUIxRyxNQUFNLE9BQU8sdUJBQXVCO0lBbkJwQztRQW9CVyxnQkFBVyxHQUFrQixNQUFNLENBQUM7UUFDcEMsa0JBQWEsR0FBa0MsSUFBSSxDQUFDO1FBQ3BELG9CQUFlLEdBQWtDLElBQUksQ0FBQztRQUN0RCxtQkFBYyxHQUFpQyxFQUFFLENBQUM7UUFDbEQsWUFBTyxHQUFrQixJQUFJLENBQUM7S0FDeEM7O29IQU5ZLHVCQUF1Qjt3R0FBdkIsdUJBQXVCLDJZQWZ4Qjs7Ozs7OztHQU9UOzJGQVFVLHVCQUF1QjtrQkFuQm5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7R0FPVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osc0JBQXNCLEVBQUUsYUFBYTt3QkFDckMseUJBQXlCLEVBQUUsU0FBUzt3QkFDcEMsZUFBZSxFQUFFLFNBQVM7d0JBQzFCLG1CQUFtQixFQUFFLHdCQUF3QjtxQkFDOUM7aUJBQ0Y7OEJBRVUsV0FBVztzQkFBbkIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IE56VGFibGVMYXlvdXQgfSBmcm9tICcuLi90YWJsZS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RhYmxlW256LXRhYmxlLWNvbnRlbnRdJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGNvbCBbc3R5bGUud2lkdGhdPVwid2lkdGhcIiBbc3R5bGUubWluV2lkdGhdPVwid2lkdGhcIiAqbmdGb3I9XCJsZXQgd2lkdGggb2YgbGlzdE9mQ29sV2lkdGhcIiAvPlxuICAgIDx0aGVhZCBjbGFzcz1cImFudC10YWJsZS10aGVhZFwiICpuZ0lmPVwidGhlYWRUZW1wbGF0ZVwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRoZWFkVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvdGhlYWQ+XG4gICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tzdHlsZS50YWJsZS1sYXlvdXRdJzogJ3RhYmxlTGF5b3V0JyxcbiAgICAnW2NsYXNzLmFudC10YWJsZS1maXhlZF0nOiAnc2Nyb2xsWCcsXG4gICAgJ1tzdHlsZS53aWR0aF0nOiAnc2Nyb2xsWCcsXG4gICAgJ1tzdHlsZS5taW4td2lkdGhdJzogYHNjcm9sbFggPyAnMTAwJSc6IG51bGxgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJsZUNvbnRlbnRDb21wb25lbnQge1xuICBASW5wdXQoKSB0YWJsZUxheW91dDogTnpUYWJsZUxheW91dCA9ICdhdXRvJztcbiAgQElucHV0KCkgdGhlYWRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbGlzdE9mQ29sV2lkdGg6IFJlYWRvbmx5QXJyYXk8c3RyaW5nIHwgbnVsbD4gPSBbXTtcbiAgQElucHV0KCkgc2Nyb2xsWDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG59XG4iXX0=