/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NzCardLoadingComponent {
    constructor() {
        this.listOfLoading = [
            ['ant-col-22'],
            ['ant-col-8', 'ant-col-15'],
            ['ant-col-6', 'ant-col-18'],
            ['ant-col-13', 'ant-col-9'],
            ['ant-col-4', 'ant-col-3', 'ant-col-16'],
            ['ant-col-8', 'ant-col-6', 'ant-col-8']
        ];
    }
}
NzCardLoadingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardLoadingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzCardLoadingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCardLoadingComponent, selector: "nz-card-loading", host: { classAttribute: "ant-card-loading-content" }, exportAs: ["nzCardLoading"], ngImport: i0, template: `
    <div class="ant-card-loading-content">
      <div class="ant-row" style="margin-left: -4px; margin-right: -4px;" *ngFor="let listOfClassName of listOfLoading">
        <div
          *ngFor="let className of listOfClassName"
          [ngClass]="className"
          style="padding-left: 4px; padding-right: 4px;"
        >
          <div class="ant-card-loading-block"></div>
        </div>
      </div>
    </div>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardLoadingComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-card-loading',
                    exportAs: 'nzCardLoading',
                    template: `
    <div class="ant-card-loading-content">
      <div class="ant-row" style="margin-left: -4px; margin-right: -4px;" *ngFor="let listOfClassName of listOfLoading">
        <div
          *ngFor="let className of listOfClassName"
          [ngClass]="className"
          style="padding-left: 4px; padding-right: 4px;"
        >
          <div class="ant-card-loading-block"></div>
        </div>
      </div>
    </div>
  `,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: { class: 'ant-card-loading-content' }
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC1sb2FkaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvY2FyZC9jYXJkLWxvYWRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQXVCdEYsTUFBTSxPQUFPLHNCQUFzQjtJQVNqQztRQVJBLGtCQUFhLEdBQWU7WUFDMUIsQ0FBQyxZQUFZLENBQUM7WUFDZCxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUM7WUFDM0IsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDO1lBQzNCLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQztZQUMzQixDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDO1lBQ3hDLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUM7U0FDeEMsQ0FBQztJQUNhLENBQUM7O21IQVRMLHNCQUFzQjt1R0FBdEIsc0JBQXNCLDBJQWxCdkI7Ozs7Ozs7Ozs7OztHQVlUOzJGQU1VLHNCQUFzQjtrQkFyQmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0dBWVQ7b0JBQ0QsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsMEJBQTBCLEVBQUU7aUJBQzVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotY2FyZC1sb2FkaW5nJyxcbiAgZXhwb3J0QXM6ICduekNhcmRMb2FkaW5nJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LWNhcmQtbG9hZGluZy1jb250ZW50XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LXJvd1wiIHN0eWxlPVwibWFyZ2luLWxlZnQ6IC00cHg7IG1hcmdpbi1yaWdodDogLTRweDtcIiAqbmdGb3I9XCJsZXQgbGlzdE9mQ2xhc3NOYW1lIG9mIGxpc3RPZkxvYWRpbmdcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBjbGFzc05hbWUgb2YgbGlzdE9mQ2xhc3NOYW1lXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJjbGFzc05hbWVcIlxuICAgICAgICAgIHN0eWxlPVwicGFkZGluZy1sZWZ0OiA0cHg7IHBhZGRpbmctcmlnaHQ6IDRweDtcIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1jYXJkLWxvYWRpbmctYmxvY2tcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7IGNsYXNzOiAnYW50LWNhcmQtbG9hZGluZy1jb250ZW50JyB9XG59KVxuZXhwb3J0IGNsYXNzIE56Q2FyZExvYWRpbmdDb21wb25lbnQge1xuICBsaXN0T2ZMb2FkaW5nOiBzdHJpbmdbXVtdID0gW1xuICAgIFsnYW50LWNvbC0yMiddLFxuICAgIFsnYW50LWNvbC04JywgJ2FudC1jb2wtMTUnXSxcbiAgICBbJ2FudC1jb2wtNicsICdhbnQtY29sLTE4J10sXG4gICAgWydhbnQtY29sLTEzJywgJ2FudC1jb2wtOSddLFxuICAgIFsnYW50LWNvbC00JywgJ2FudC1jb2wtMycsICdhbnQtY29sLTE2J10sXG4gICAgWydhbnQtY29sLTgnLCAnYW50LWNvbC02JywgJ2FudC1jb2wtOCddXG4gIF07XG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbiJdfQ==