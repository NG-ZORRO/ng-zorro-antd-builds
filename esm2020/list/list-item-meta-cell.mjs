/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/avatar";
import * as i2 from "@angular/common";
export class NzListItemMetaTitleComponent {
}
NzListItemMetaTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaTitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListItemMetaTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemMetaTitleComponent, selector: "nz-list-item-meta-title", exportAs: ["nzListItemMetaTitle"], ngImport: i0, template: `
    <h4 class="ant-list-item-meta-title">
      <ng-content></ng-content>
    </h4>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaTitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-meta-title',
                    exportAs: 'nzListItemMetaTitle',
                    template: `
    <h4 class="ant-list-item-meta-title">
      <ng-content></ng-content>
    </h4>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });
export class NzListItemMetaDescriptionComponent {
}
NzListItemMetaDescriptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaDescriptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListItemMetaDescriptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemMetaDescriptionComponent, selector: "nz-list-item-meta-description", exportAs: ["nzListItemMetaDescription"], ngImport: i0, template: `
    <div class="ant-list-item-meta-description">
      <ng-content></ng-content>
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaDescriptionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-meta-description',
                    exportAs: 'nzListItemMetaDescription',
                    template: `
    <div class="ant-list-item-meta-description">
      <ng-content></ng-content>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });
export class NzListItemMetaAvatarComponent {
}
NzListItemMetaAvatarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaAvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListItemMetaAvatarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemMetaAvatarComponent, selector: "nz-list-item-meta-avatar", inputs: { nzSrc: "nzSrc" }, exportAs: ["nzListItemMetaAvatar"], ngImport: i0, template: `
    <div class="ant-list-item-meta-avatar">
      <nz-avatar *ngIf="nzSrc" [nzSrc]="nzSrc"></nz-avatar>
      <ng-content *ngIf="!nzSrc"></ng-content>
    </div>
  `, isInline: true, components: [{ type: i1.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaAvatarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-meta-avatar',
                    exportAs: 'nzListItemMetaAvatar',
                    template: `
    <div class="ant-list-item-meta-avatar">
      <nz-avatar *ngIf="nzSrc" [nzSrc]="nzSrc"></nz-avatar>
      <ng-content *ngIf="!nzSrc"></ng-content>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { nzSrc: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLW1ldGEtY2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvbGlzdC9saXN0LWl0ZW0tbWV0YS1jZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBWTFFLE1BQU0sT0FBTyw0QkFBNEI7O3lIQUE1Qiw0QkFBNEI7NkdBQTVCLDRCQUE0QixrR0FQN0I7Ozs7R0FJVDsyRkFHVSw0QkFBNEI7a0JBVnhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFOzs7O0dBSVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOztBQWFELE1BQU0sT0FBTyxrQ0FBa0M7OytIQUFsQyxrQ0FBa0M7bUhBQWxDLGtDQUFrQyw4R0FQbkM7Ozs7R0FJVDsyRkFHVSxrQ0FBa0M7a0JBVjlDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtvQkFDekMsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsUUFBUSxFQUFFOzs7O0dBSVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOztBQWNELE1BQU0sT0FBTyw2QkFBNkI7OzBIQUE3Qiw2QkFBNkI7OEdBQTdCLDZCQUE2QixnSUFSOUI7Ozs7O0dBS1Q7MkZBR1UsNkJBQTZCO2tCQVh6QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRTs7Ozs7R0FLVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBRVUsS0FBSztzQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotbGlzdC1pdGVtLW1ldGEtdGl0bGUnLFxuICBleHBvcnRBczogJ256TGlzdEl0ZW1NZXRhVGl0bGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxoNCBjbGFzcz1cImFudC1saXN0LWl0ZW0tbWV0YS10aXRsZVwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvaDQ+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdEl0ZW1NZXRhVGl0bGVDb21wb25lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotbGlzdC1pdGVtLW1ldGEtZGVzY3JpcHRpb24nLFxuICBleHBvcnRBczogJ256TGlzdEl0ZW1NZXRhRGVzY3JpcHRpb24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJhbnQtbGlzdC1pdGVtLW1ldGEtZGVzY3JpcHRpb25cIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTnpMaXN0SXRlbU1ldGFEZXNjcmlwdGlvbkNvbXBvbmVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1saXN0LWl0ZW0tbWV0YS1hdmF0YXInLFxuICBleHBvcnRBczogJ256TGlzdEl0ZW1NZXRhQXZhdGFyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LWxpc3QtaXRlbS1tZXRhLWF2YXRhclwiPlxuICAgICAgPG56LWF2YXRhciAqbmdJZj1cIm56U3JjXCIgW256U3JjXT1cIm56U3JjXCI+PC9uei1hdmF0YXI+XG4gICAgICA8bmctY29udGVudCAqbmdJZj1cIiFuelNyY1wiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTnpMaXN0SXRlbU1ldGFBdmF0YXJDb21wb25lbnQge1xuICBASW5wdXQoKSBuelNyYz86IHN0cmluZztcbn1cbiJdfQ==