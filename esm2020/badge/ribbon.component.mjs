/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { badgePresetColors } from './preset-colors';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/outlet";
export class NzRibbonComponent {
    constructor() {
        this.nzPlacement = 'end';
        this.nzText = null;
        this.presetColor = null;
    }
    ngOnChanges(changes) {
        const { nzColor } = changes;
        if (nzColor) {
            this.presetColor = this.nzColor && badgePresetColors.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
        }
    }
}
NzRibbonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRibbonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzRibbonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzRibbonComponent, selector: "nz-ribbon", inputs: { nzColor: "nzColor", nzPlacement: "nzPlacement", nzText: "nzText" }, host: { classAttribute: "ant-ribbon-wrapper" }, exportAs: ["nzRibbon"], usesOnChanges: true, ngImport: i0, template: `
    <ng-content></ng-content>
    <div
      class="ant-ribbon"
      [class]="presetColor && 'ant-ribbon-color-' + presetColor"
      [class.ant-ribbon-placement-end]="nzPlacement === 'end'"
      [class.ant-ribbon-placement-start]="nzPlacement === 'start'"
      [style.background-color]="!presetColor && nzColor"
    >
      <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      <div class="ant-ribbon-corner" [style.color]="!presetColor && nzColor"></div>
    </div>
  `, isInline: true, directives: [{ type: i1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRibbonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-ribbon',
                    exportAs: 'nzRibbon',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-content></ng-content>
    <div
      class="ant-ribbon"
      [class]="presetColor && 'ant-ribbon-color-' + presetColor"
      [class.ant-ribbon-placement-end]="nzPlacement === 'end'"
      [class.ant-ribbon-placement-start]="nzPlacement === 'start'"
      [style.background-color]="!presetColor && nzColor"
    >
      <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      <div class="ant-ribbon-corner" [style.color]="!presetColor && nzColor"></div>
    </div>
  `,
                    host: { class: 'ant-ribbon-wrapper' }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzColor: [{
                type: Input
            }], nzPlacement: [{
                type: Input
            }], nzText: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmliYm9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvYmFkZ2UvcmliYm9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBSUwsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUF1QnBELE1BQU0sT0FBTyxpQkFBaUI7SUFNNUI7UUFKUyxnQkFBVyxHQUFvQixLQUFLLENBQUM7UUFDckMsV0FBTSxHQUFzQyxJQUFJLENBQUM7UUFDMUQsZ0JBQVcsR0FBa0IsSUFBSSxDQUFDO0lBRW5CLENBQUM7SUFFaEIsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDNUIsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ3pHO0lBQ0gsQ0FBQzs7OEdBYlUsaUJBQWlCO2tHQUFqQixpQkFBaUIsNE5BZmxCOzs7Ozs7Ozs7Ozs7R0FZVDsyRkFHVSxpQkFBaUI7a0JBckI3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsVUFBVTtvQkFDcEIsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztHQVlUO29CQUNELElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRTtpQkFDdEM7MEVBRVUsT0FBTztzQkFBZixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBiYWRnZVByZXNldENvbG9ycyB9IGZyb20gJy4vcHJlc2V0LWNvbG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXJpYmJvbicsXG4gIGV4cG9ydEFzOiAnbnpSaWJib24nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwiYW50LXJpYmJvblwiXG4gICAgICBbY2xhc3NdPVwicHJlc2V0Q29sb3IgJiYgJ2FudC1yaWJib24tY29sb3ItJyArIHByZXNldENvbG9yXCJcbiAgICAgIFtjbGFzcy5hbnQtcmliYm9uLXBsYWNlbWVudC1lbmRdPVwibnpQbGFjZW1lbnQgPT09ICdlbmQnXCJcbiAgICAgIFtjbGFzcy5hbnQtcmliYm9uLXBsYWNlbWVudC1zdGFydF09XCJuelBsYWNlbWVudCA9PT0gJ3N0YXJ0J1wiXG4gICAgICBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCIhcHJlc2V0Q29sb3IgJiYgbnpDb2xvclwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56VGV4dFwiPnt7IG56VGV4dCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1yaWJib24tY29ybmVyXCIgW3N0eWxlLmNvbG9yXT1cIiFwcmVzZXRDb2xvciAmJiBuekNvbG9yXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHsgY2xhc3M6ICdhbnQtcmliYm9uLXdyYXBwZXInIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpSaWJib25Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBuekNvbG9yOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG56UGxhY2VtZW50OiAnc3RhcnQnIHwgJ2VuZCcgPSAnZW5kJztcbiAgQElucHV0KCkgbnpUZXh0OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuICBwcmVzZXRDb2xvcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56Q29sb3IgfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56Q29sb3IpIHtcbiAgICAgIHRoaXMucHJlc2V0Q29sb3IgPSB0aGlzLm56Q29sb3IgJiYgYmFkZ2VQcmVzZXRDb2xvcnMuaW5kZXhPZih0aGlzLm56Q29sb3IpICE9PSAtMSA/IHRoaXMubnpDb2xvciA6IG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=