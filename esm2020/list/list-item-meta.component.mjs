/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzListItemMetaDescriptionComponent as DescriptionComponent, NzListItemMetaTitleComponent as TitleComponent } from './list-item-meta-cell';
import * as i0 from "@angular/core";
import * as i1 from "./list-item-meta-cell";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/core/outlet";
export class NzListItemMetaComponent {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.avatarStr = '';
        this.renderer.addClass(elementRef.nativeElement, 'ant-list-item-meta');
    }
    set nzAvatar(value) {
        if (value instanceof TemplateRef) {
            this.avatarStr = '';
            this.avatarTpl = value;
        }
        else {
            this.avatarStr = value;
        }
    }
}
NzListItemMetaComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NzListItemMetaComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemMetaComponent, selector: "nz-list-item-meta, [nz-list-item-meta]", inputs: { nzAvatar: "nzAvatar", nzTitle: "nzTitle", nzDescription: "nzDescription" }, queries: [{ propertyName: "descriptionComponent", first: true, predicate: DescriptionComponent, descendants: true }, { propertyName: "titleComponent", first: true, predicate: TitleComponent, descendants: true }], exportAs: ["nzListItemMeta"], ngImport: i0, template: `
    <!--Old API Start-->
    <nz-list-item-meta-avatar *ngIf="avatarStr" [nzSrc]="avatarStr"></nz-list-item-meta-avatar>
    <nz-list-item-meta-avatar *ngIf="avatarTpl">
      <ng-container [ngTemplateOutlet]="avatarTpl"></ng-container>
    </nz-list-item-meta-avatar>
    <!--Old API End-->

    <ng-content select="nz-list-item-meta-avatar"></ng-content>

    <div *ngIf="nzTitle || nzDescription || descriptionComponent || titleComponent" class="ant-list-item-meta-content">
      <!--Old API Start-->
      <nz-list-item-meta-title *ngIf="nzTitle && !titleComponent">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </nz-list-item-meta-title>
      <nz-list-item-meta-description *ngIf="nzDescription && !descriptionComponent">
        <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
      </nz-list-item-meta-description>
      <!--Old API End-->

      <ng-content select="nz-list-item-meta-title"></ng-content>
      <ng-content select="nz-list-item-meta-description"></ng-content>
    </div>
  `, isInline: true, components: [{ type: i1.NzListItemMetaAvatarComponent, selector: "nz-list-item-meta-avatar", inputs: ["nzSrc"], exportAs: ["nzListItemMetaAvatar"] }, { type: i1.NzListItemMetaTitleComponent, selector: "nz-list-item-meta-title", exportAs: ["nzListItemMetaTitle"] }, { type: i1.NzListItemMetaDescriptionComponent, selector: "nz-list-item-meta-description", exportAs: ["nzListItemMetaDescription"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-meta, [nz-list-item-meta]',
                    exportAs: 'nzListItemMeta',
                    template: `
    <!--Old API Start-->
    <nz-list-item-meta-avatar *ngIf="avatarStr" [nzSrc]="avatarStr"></nz-list-item-meta-avatar>
    <nz-list-item-meta-avatar *ngIf="avatarTpl">
      <ng-container [ngTemplateOutlet]="avatarTpl"></ng-container>
    </nz-list-item-meta-avatar>
    <!--Old API End-->

    <ng-content select="nz-list-item-meta-avatar"></ng-content>

    <div *ngIf="nzTitle || nzDescription || descriptionComponent || titleComponent" class="ant-list-item-meta-content">
      <!--Old API Start-->
      <nz-list-item-meta-title *ngIf="nzTitle && !titleComponent">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </nz-list-item-meta-title>
      <nz-list-item-meta-description *ngIf="nzDescription && !descriptionComponent">
        <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
      </nz-list-item-meta-description>
      <!--Old API End-->

      <ng-content select="nz-list-item-meta-title"></ng-content>
      <ng-content select="nz-list-item-meta-description"></ng-content>
    </div>
  `,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { nzAvatar: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzDescription: [{
                type: Input
            }], descriptionComponent: [{
                type: ContentChild,
                args: [DescriptionComponent]
            }], titleComponent: [{
                type: ContentChild,
                args: [TitleComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLW1ldGEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9saXN0L2xpc3QtaXRlbS1tZXRhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBRVosS0FBSyxFQUVMLFdBQVcsRUFDWCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNMLGtDQUFrQyxJQUFJLG9CQUFvQixFQUMxRCw0QkFBNEIsSUFBSSxjQUFjLEVBQy9DLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBaUMvQixNQUFNLE9BQU8sdUJBQXVCO0lBb0JsQyxZQUFtQixVQUFzQixFQUFVLFFBQW1CO1FBQW5ELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBbkJ0RSxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBb0JiLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBbEJELElBQ0ksUUFBUSxDQUFDLEtBQWlDO1FBQzVDLElBQUksS0FBSyxZQUFZLFdBQVcsRUFBRTtZQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUN4QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDeEI7SUFDSCxDQUFDOztvSEFaVSx1QkFBdUI7d0dBQXZCLHVCQUF1QixzTkFrQnBCLG9CQUFvQixpRkFDcEIsY0FBYyw4RUEvQ2xCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDsyRkFLVSx1QkFBdUI7a0JBL0JuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3Q0FBd0M7b0JBQ2xELFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7b0JBQ0QsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN0Qzt5SEFNSyxRQUFRO3NCQURYLEtBQUs7Z0JBVUcsT0FBTztzQkFBZixLQUFLO2dCQUVHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBRThCLG9CQUFvQjtzQkFBdkQsWUFBWTt1QkFBQyxvQkFBb0I7Z0JBQ0osY0FBYztzQkFBM0MsWUFBWTt1QkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIE56TGlzdEl0ZW1NZXRhRGVzY3JpcHRpb25Db21wb25lbnQgYXMgRGVzY3JpcHRpb25Db21wb25lbnQsXG4gIE56TGlzdEl0ZW1NZXRhVGl0bGVDb21wb25lbnQgYXMgVGl0bGVDb21wb25lbnRcbn0gZnJvbSAnLi9saXN0LWl0ZW0tbWV0YS1jZWxsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotbGlzdC1pdGVtLW1ldGEsIFtuei1saXN0LWl0ZW0tbWV0YV0nLFxuICBleHBvcnRBczogJ256TGlzdEl0ZW1NZXRhJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tT2xkIEFQSSBTdGFydC0tPlxuICAgIDxuei1saXN0LWl0ZW0tbWV0YS1hdmF0YXIgKm5nSWY9XCJhdmF0YXJTdHJcIiBbbnpTcmNdPVwiYXZhdGFyU3RyXCI+PC9uei1saXN0LWl0ZW0tbWV0YS1hdmF0YXI+XG4gICAgPG56LWxpc3QtaXRlbS1tZXRhLWF2YXRhciAqbmdJZj1cImF2YXRhclRwbFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJhdmF0YXJUcGxcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L256LWxpc3QtaXRlbS1tZXRhLWF2YXRhcj5cbiAgICA8IS0tT2xkIEFQSSBFbmQtLT5cblxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LWxpc3QtaXRlbS1tZXRhLWF2YXRhclwiPjwvbmctY29udGVudD5cblxuICAgIDxkaXYgKm5nSWY9XCJuelRpdGxlIHx8IG56RGVzY3JpcHRpb24gfHwgZGVzY3JpcHRpb25Db21wb25lbnQgfHwgdGl0bGVDb21wb25lbnRcIiBjbGFzcz1cImFudC1saXN0LWl0ZW0tbWV0YS1jb250ZW50XCI+XG4gICAgICA8IS0tT2xkIEFQSSBTdGFydC0tPlxuICAgICAgPG56LWxpc3QtaXRlbS1tZXRhLXRpdGxlICpuZ0lmPVwibnpUaXRsZSAmJiAhdGl0bGVDb21wb25lbnRcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56VGl0bGVcIj57eyBuelRpdGxlIH19PC9uZy1jb250YWluZXI+XG4gICAgICA8L256LWxpc3QtaXRlbS1tZXRhLXRpdGxlPlxuICAgICAgPG56LWxpc3QtaXRlbS1tZXRhLWRlc2NyaXB0aW9uICpuZ0lmPVwibnpEZXNjcmlwdGlvbiAmJiAhZGVzY3JpcHRpb25Db21wb25lbnRcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56RGVzY3JpcHRpb25cIj57eyBuekRlc2NyaXB0aW9uIH19PC9uZy1jb250YWluZXI+XG4gICAgICA8L256LWxpc3QtaXRlbS1tZXRhLWRlc2NyaXB0aW9uPlxuICAgICAgPCEtLU9sZCBBUEkgRW5kLS0+XG5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LWxpc3QtaXRlbS1tZXRhLXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotbGlzdC1pdGVtLW1ldGEtZGVzY3JpcHRpb25cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBOekxpc3RJdGVtTWV0YUNvbXBvbmVudCB7XG4gIGF2YXRhclN0ciA9ICcnO1xuICBhdmF0YXJUcGw/OiBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICBASW5wdXQoKVxuICBzZXQgbnpBdmF0YXIodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIHRoaXMuYXZhdGFyU3RyID0gJyc7XG4gICAgICB0aGlzLmF2YXRhclRwbCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmF2YXRhclN0ciA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIG56VGl0bGU/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICBASW5wdXQoKSBuekRlc2NyaXB0aW9uPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG5cbiAgQENvbnRlbnRDaGlsZChEZXNjcmlwdGlvbkNvbXBvbmVudCkgZGVzY3JpcHRpb25Db21wb25lbnQ/OiBEZXNjcmlwdGlvbkNvbXBvbmVudDtcbiAgQENvbnRlbnRDaGlsZChUaXRsZUNvbXBvbmVudCkgdGl0bGVDb21wb25lbnQ/OiBUaXRsZUNvbXBvbmVudDtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYW50LWxpc3QtaXRlbS1tZXRhJyk7XG4gIH1cbn1cbiJdfQ==