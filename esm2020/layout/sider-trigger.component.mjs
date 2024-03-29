/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/icon";
export class NzSiderTriggerComponent {
    constructor() {
        this.nzCollapsed = false;
        this.nzReverseArrow = false;
        this.nzZeroTrigger = null;
        this.nzTrigger = undefined;
        this.matchBreakPoint = false;
        this.nzCollapsedWidth = null;
        this.siderWidth = null;
        this.nzBreakpoint = null;
        this.isZeroTrigger = false;
        this.isNormalTrigger = false;
    }
    updateTriggerType() {
        this.isZeroTrigger =
            this.nzCollapsedWidth === 0 && ((this.nzBreakpoint && this.matchBreakPoint) || !this.nzBreakpoint);
        this.isNormalTrigger = this.nzCollapsedWidth !== 0;
    }
    ngOnInit() {
        this.updateTriggerType();
    }
    ngOnChanges() {
        this.updateTriggerType();
    }
}
NzSiderTriggerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSiderTriggerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzSiderTriggerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSiderTriggerComponent, selector: "[nz-sider-trigger]", inputs: { nzCollapsed: "nzCollapsed", nzReverseArrow: "nzReverseArrow", nzZeroTrigger: "nzZeroTrigger", nzTrigger: "nzTrigger", matchBreakPoint: "matchBreakPoint", nzCollapsedWidth: "nzCollapsedWidth", siderWidth: "siderWidth", nzBreakpoint: "nzBreakpoint" }, host: { properties: { "class.ant-layout-sider-trigger": "isNormalTrigger", "style.width": "isNormalTrigger ? siderWidth : null", "class.ant-layout-sider-zero-width-trigger": "isZeroTrigger", "class.ant-layout-sider-zero-width-trigger-right": "isZeroTrigger && nzReverseArrow", "class.ant-layout-sider-zero-width-trigger-left": "isZeroTrigger && !nzReverseArrow" } }, exportAs: ["nzSiderTrigger"], usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="isZeroTrigger">
      <ng-template [ngTemplateOutlet]="nzZeroTrigger || defaultZeroTrigger"></ng-template>
    </ng-container>
    <ng-container *ngIf="isNormalTrigger">
      <ng-template [ngTemplateOutlet]="nzTrigger || defaultTrigger"></ng-template>
    </ng-container>
    <ng-template #defaultTrigger>
      <i nz-icon [nzType]="nzCollapsed ? 'right' : 'left'" *ngIf="!nzReverseArrow"></i>
      <i nz-icon [nzType]="nzCollapsed ? 'left' : 'right'" *ngIf="nzReverseArrow"></i>
    </ng-template>
    <ng-template #defaultZeroTrigger>
      <i nz-icon nzType="bars"></i>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSiderTriggerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-sider-trigger]',
                    exportAs: 'nzSiderTrigger',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-container *ngIf="isZeroTrigger">
      <ng-template [ngTemplateOutlet]="nzZeroTrigger || defaultZeroTrigger"></ng-template>
    </ng-container>
    <ng-container *ngIf="isNormalTrigger">
      <ng-template [ngTemplateOutlet]="nzTrigger || defaultTrigger"></ng-template>
    </ng-container>
    <ng-template #defaultTrigger>
      <i nz-icon [nzType]="nzCollapsed ? 'right' : 'left'" *ngIf="!nzReverseArrow"></i>
      <i nz-icon [nzType]="nzCollapsed ? 'left' : 'right'" *ngIf="nzReverseArrow"></i>
    </ng-template>
    <ng-template #defaultZeroTrigger>
      <i nz-icon nzType="bars"></i>
    </ng-template>
  `,
                    host: {
                        '[class.ant-layout-sider-trigger]': 'isNormalTrigger',
                        '[style.width]': 'isNormalTrigger ? siderWidth : null',
                        '[class.ant-layout-sider-zero-width-trigger]': 'isZeroTrigger',
                        '[class.ant-layout-sider-zero-width-trigger-right]': 'isZeroTrigger && nzReverseArrow',
                        '[class.ant-layout-sider-zero-width-trigger-left]': 'isZeroTrigger && !nzReverseArrow'
                    }
                }]
        }], propDecorators: { nzCollapsed: [{
                type: Input
            }], nzReverseArrow: [{
                type: Input
            }], nzZeroTrigger: [{
                type: Input
            }], nzTrigger: [{
                type: Input
            }], matchBreakPoint: [{
                type: Input
            }], nzCollapsedWidth: [{
                type: Input
            }], siderWidth: [{
                type: Input
            }], nzBreakpoint: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXItdHJpZ2dlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2xheW91dC9zaWRlci10cmlnZ2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBSUwsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDOzs7O0FBaUN2QixNQUFNLE9BQU8sdUJBQXVCO0lBN0JwQztRQThCVyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixrQkFBYSxHQUE2QixJQUFJLENBQUM7UUFDL0MsY0FBUyxHQUF5QyxTQUFTLENBQUM7UUFDNUQsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIscUJBQWdCLEdBQWtCLElBQUksQ0FBQztRQUN2QyxlQUFVLEdBQWtCLElBQUksQ0FBQztRQUNqQyxpQkFBWSxHQUEyQixJQUFJLENBQUM7UUFDckQsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7S0FZekI7SUFYQyxpQkFBaUI7UUFDZixJQUFJLENBQUMsYUFBYTtZQUNoQixJQUFJLENBQUMsZ0JBQWdCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNELFFBQVE7UUFDTixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7O29IQXJCVSx1QkFBdUI7d0dBQXZCLHVCQUF1QixndUJBdkJ4Qjs7Ozs7Ozs7Ozs7Ozs7R0FjVDsyRkFTVSx1QkFBdUI7a0JBN0JuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztHQWNUO29CQUNELElBQUksRUFBRTt3QkFDSixrQ0FBa0MsRUFBRSxpQkFBaUI7d0JBQ3JELGVBQWUsRUFBRSxxQ0FBcUM7d0JBQ3RELDZDQUE2QyxFQUFFLGVBQWU7d0JBQzlELG1EQUFtRCxFQUFFLGlDQUFpQzt3QkFDdEYsa0RBQWtELEVBQUUsa0NBQWtDO3FCQUN2RjtpQkFDRjs4QkFFVSxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOekJyZWFrcG9pbnRLZXkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvc2VydmljZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbnotc2lkZXItdHJpZ2dlcl0nLFxuICBleHBvcnRBczogJ256U2lkZXJUcmlnZ2VyJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1plcm9UcmlnZ2VyXCI+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpaZXJvVHJpZ2dlciB8fCBkZWZhdWx0WmVyb1RyaWdnZXJcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc05vcm1hbFRyaWdnZXJcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJuelRyaWdnZXIgfHwgZGVmYXVsdFRyaWdnZXJcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRyaWdnZXI+XG4gICAgICA8aSBuei1pY29uIFtuelR5cGVdPVwibnpDb2xsYXBzZWQgPyAncmlnaHQnIDogJ2xlZnQnXCIgKm5nSWY9XCIhbnpSZXZlcnNlQXJyb3dcIj48L2k+XG4gICAgICA8aSBuei1pY29uIFtuelR5cGVdPVwibnpDb2xsYXBzZWQgPyAnbGVmdCcgOiAncmlnaHQnXCIgKm5nSWY9XCJuelJldmVyc2VBcnJvd1wiPjwvaT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFplcm9UcmlnZ2VyPlxuICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJiYXJzXCI+PC9pPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1sYXlvdXQtc2lkZXItdHJpZ2dlcl0nOiAnaXNOb3JtYWxUcmlnZ2VyJyxcbiAgICAnW3N0eWxlLndpZHRoXSc6ICdpc05vcm1hbFRyaWdnZXIgPyBzaWRlcldpZHRoIDogbnVsbCcsXG4gICAgJ1tjbGFzcy5hbnQtbGF5b3V0LXNpZGVyLXplcm8td2lkdGgtdHJpZ2dlcl0nOiAnaXNaZXJvVHJpZ2dlcicsXG4gICAgJ1tjbGFzcy5hbnQtbGF5b3V0LXNpZGVyLXplcm8td2lkdGgtdHJpZ2dlci1yaWdodF0nOiAnaXNaZXJvVHJpZ2dlciAmJiBuelJldmVyc2VBcnJvdycsXG4gICAgJ1tjbGFzcy5hbnQtbGF5b3V0LXNpZGVyLXplcm8td2lkdGgtdHJpZ2dlci1sZWZ0XSc6ICdpc1plcm9UcmlnZ2VyICYmICFuelJldmVyc2VBcnJvdydcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelNpZGVyVHJpZ2dlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KCkgbnpDb2xsYXBzZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpSZXZlcnNlQXJyb3cgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpaZXJvVHJpZ2dlcjogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpUcmlnZ2VyOiBUZW1wbGF0ZVJlZjx2b2lkPiB8IHVuZGVmaW5lZCB8IG51bGwgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG1hdGNoQnJlYWtQb2ludCA9IGZhbHNlO1xuICBASW5wdXQoKSBuekNvbGxhcHNlZFdpZHRoOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgc2lkZXJXaWR0aDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56QnJlYWtwb2ludDogTnpCcmVha3BvaW50S2V5IHwgbnVsbCA9IG51bGw7XG4gIGlzWmVyb1RyaWdnZXIgPSBmYWxzZTtcbiAgaXNOb3JtYWxUcmlnZ2VyID0gZmFsc2U7XG4gIHVwZGF0ZVRyaWdnZXJUeXBlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNaZXJvVHJpZ2dlciA9XG4gICAgICB0aGlzLm56Q29sbGFwc2VkV2lkdGggPT09IDAgJiYgKCh0aGlzLm56QnJlYWtwb2ludCAmJiB0aGlzLm1hdGNoQnJlYWtQb2ludCkgfHwgIXRoaXMubnpCcmVha3BvaW50KTtcbiAgICB0aGlzLmlzTm9ybWFsVHJpZ2dlciA9IHRoaXMubnpDb2xsYXBzZWRXaWR0aCAhPT0gMDtcbiAgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVRyaWdnZXJUeXBlKCk7XG4gIH1cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVUcmlnZ2VyVHlwZSgpO1xuICB9XG59XG4iXX0=