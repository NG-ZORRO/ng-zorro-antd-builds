/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { toCssPixel } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "./skeleton-element.component";
import * as i2 from "@angular/common";
export class NzSkeletonComponent {
    constructor(cdr, renderer, elementRef) {
        this.cdr = cdr;
        this.nzActive = false;
        this.nzLoading = true;
        this.nzRound = false;
        this.nzTitle = true;
        this.nzAvatar = false;
        this.nzParagraph = true;
        this.rowsList = [];
        this.widthList = [];
        renderer.addClass(elementRef.nativeElement, 'ant-skeleton');
    }
    toCSSUnit(value = '') {
        return toCssPixel(value);
    }
    getTitleProps() {
        const hasAvatar = !!this.nzAvatar;
        const hasParagraph = !!this.nzParagraph;
        let width = '';
        if (!hasAvatar && hasParagraph) {
            width = '38%';
        }
        else if (hasAvatar && hasParagraph) {
            width = '50%';
        }
        return { width, ...this.getProps(this.nzTitle) };
    }
    getAvatarProps() {
        const shape = !!this.nzTitle && !this.nzParagraph ? 'square' : 'circle';
        const size = 'large';
        return { shape, size, ...this.getProps(this.nzAvatar) };
    }
    getParagraphProps() {
        const hasAvatar = !!this.nzAvatar;
        const hasTitle = !!this.nzTitle;
        const basicProps = {};
        // Width
        if (!hasAvatar || !hasTitle) {
            basicProps.width = '61%';
        }
        // Rows
        if (!hasAvatar && hasTitle) {
            basicProps.rows = 3;
        }
        else {
            basicProps.rows = 2;
        }
        return { ...basicProps, ...this.getProps(this.nzParagraph) };
    }
    getProps(prop) {
        return prop && typeof prop === 'object' ? prop : {};
    }
    getWidthList() {
        const { width, rows } = this.paragraph;
        let widthList = [];
        if (width && Array.isArray(width)) {
            widthList = width;
        }
        else if (width && !Array.isArray(width)) {
            widthList = [];
            widthList[rows - 1] = width;
        }
        return widthList;
    }
    updateProps() {
        this.title = this.getTitleProps();
        this.avatar = this.getAvatarProps();
        this.paragraph = this.getParagraphProps();
        this.rowsList = [...Array(this.paragraph.rows)];
        this.widthList = this.getWidthList();
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.updateProps();
    }
    ngOnChanges(changes) {
        if (changes.nzTitle || changes.nzAvatar || changes.nzParagraph) {
            this.updateProps();
        }
    }
}
NzSkeletonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NzSkeletonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSkeletonComponent, selector: "nz-skeleton", inputs: { nzActive: "nzActive", nzLoading: "nzLoading", nzRound: "nzRound", nzTitle: "nzTitle", nzAvatar: "nzAvatar", nzParagraph: "nzParagraph" }, host: { properties: { "class.ant-skeleton-with-avatar": "!!nzAvatar", "class.ant-skeleton-active": "nzActive", "class.ant-skeleton-round": "!!nzRound" } }, exportAs: ["nzSkeleton"], usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="nzLoading">
      <div class="ant-skeleton-header" *ngIf="!!nzAvatar">
        <nz-skeleton-element
          nzType="avatar"
          [nzSize]="avatar.size || 'default'"
          [nzShape]="avatar.shape || 'circle'"
        ></nz-skeleton-element>
      </div>
      <div class="ant-skeleton-content">
        <h3 *ngIf="!!nzTitle" class="ant-skeleton-title" [style.width]="toCSSUnit(title.width)"></h3>
        <ul *ngIf="!!nzParagraph" class="ant-skeleton-paragraph">
          <li *ngFor="let row of rowsList; let i = index" [style.width]="toCSSUnit(widthList[i])"></li>
        </ul>
      </div>
    </ng-container>
    <ng-container *ngIf="!nzLoading">
      <ng-content></ng-content>
    </ng-container>
  `, isInline: true, components: [{ type: i1.NzSkeletonElementAvatarComponent, selector: "nz-skeleton-element[nzType=\"avatar\"]", inputs: ["nzShape", "nzSize"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NzSkeletonElementDirective, selector: "nz-skeleton-element", inputs: ["nzActive", "nzType", "nzBlock"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-skeleton',
                    exportAs: 'nzSkeleton',
                    host: {
                        '[class.ant-skeleton-with-avatar]': '!!nzAvatar',
                        '[class.ant-skeleton-active]': 'nzActive',
                        '[class.ant-skeleton-round]': '!!nzRound'
                    },
                    template: `
    <ng-container *ngIf="nzLoading">
      <div class="ant-skeleton-header" *ngIf="!!nzAvatar">
        <nz-skeleton-element
          nzType="avatar"
          [nzSize]="avatar.size || 'default'"
          [nzShape]="avatar.shape || 'circle'"
        ></nz-skeleton-element>
      </div>
      <div class="ant-skeleton-content">
        <h3 *ngIf="!!nzTitle" class="ant-skeleton-title" [style.width]="toCSSUnit(title.width)"></h3>
        <ul *ngIf="!!nzParagraph" class="ant-skeleton-paragraph">
          <li *ngFor="let row of rowsList; let i = index" [style.width]="toCSSUnit(widthList[i])"></li>
        </ul>
      </div>
    </ng-container>
    <ng-container *ngIf="!nzLoading">
      <ng-content></ng-content>
    </ng-container>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { nzActive: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzRound: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzAvatar: [{
                type: Input
            }], nzParagraph: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9za2VsZXRvbi9za2VsZXRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBRVQsS0FBSyxFQUtMLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUF5Q3JELE1BQU0sT0FBTyxtQkFBbUI7SUFjOUIsWUFBb0IsR0FBc0IsRUFBRSxRQUFtQixFQUFFLFVBQXNCO1FBQW5FLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBYmpDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFlBQU8sR0FBOEIsSUFBSSxDQUFDO1FBQzFDLGFBQVEsR0FBK0IsS0FBSyxDQUFDO1FBQzdDLGdCQUFXLEdBQWtDLElBQUksQ0FBQztRQUszRCxhQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLGNBQVMsR0FBMkIsRUFBRSxDQUFDO1FBR3JDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsU0FBUyxDQUFDLFFBQXlCLEVBQUU7UUFDbkMsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVPLGFBQWE7UUFDbkIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDbEMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsSUFBSSxZ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ckIsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQzlELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7O2dIQTFGVSxtQkFBbUI7b0dBQW5CLG1CQUFtQixrWkFyQnBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJUOzJGQUVVLG1CQUFtQjtrQkEvQi9CLFNBQVM7bUJBQUM7b0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLElBQUksRUFBRTt3QkFDSixrQ0FBa0MsRUFBRSxZQUFZO3dCQUNoRCw2QkFBNkIsRUFBRSxVQUFVO3dCQUN6Qyw0QkFBNEIsRUFBRSxXQUFXO3FCQUMxQztvQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQlQ7aUJBQ0Y7eUpBRVUsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgdG9Dc3NQaXhlbCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHtcbiAgTnpTa2VsZXRvbkF2YXRhcixcbiAgTnpTa2VsZXRvbkF2YXRhclNoYXBlLFxuICBOelNrZWxldG9uQXZhdGFyU2l6ZSxcbiAgTnpTa2VsZXRvblBhcmFncmFwaCxcbiAgTnpTa2VsZXRvblRpdGxlXG59IGZyb20gJy4vc2tlbGV0b24udHlwZSc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduei1za2VsZXRvbicsXG4gIGV4cG9ydEFzOiAnbnpTa2VsZXRvbicsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1za2VsZXRvbi13aXRoLWF2YXRhcl0nOiAnISFuekF2YXRhcicsXG4gICAgJ1tjbGFzcy5hbnQtc2tlbGV0b24tYWN0aXZlXSc6ICduekFjdGl2ZScsXG4gICAgJ1tjbGFzcy5hbnQtc2tlbGV0b24tcm91bmRdJzogJyEhbnpSb3VuZCdcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibnpMb2FkaW5nXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LXNrZWxldG9uLWhlYWRlclwiICpuZ0lmPVwiISFuekF2YXRhclwiPlxuICAgICAgICA8bnotc2tlbGV0b24tZWxlbWVudFxuICAgICAgICAgIG56VHlwZT1cImF2YXRhclwiXG4gICAgICAgICAgW256U2l6ZV09XCJhdmF0YXIuc2l6ZSB8fCAnZGVmYXVsdCdcIlxuICAgICAgICAgIFtuelNoYXBlXT1cImF2YXRhci5zaGFwZSB8fCAnY2lyY2xlJ1wiXG4gICAgICAgID48L256LXNrZWxldG9uLWVsZW1lbnQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtc2tlbGV0b24tY29udGVudFwiPlxuICAgICAgICA8aDMgKm5nSWY9XCIhIW56VGl0bGVcIiBjbGFzcz1cImFudC1za2VsZXRvbi10aXRsZVwiIFtzdHlsZS53aWR0aF09XCJ0b0NTU1VuaXQodGl0bGUud2lkdGgpXCI+PC9oMz5cbiAgICAgICAgPHVsICpuZ0lmPVwiISFuelBhcmFncmFwaFwiIGNsYXNzPVwiYW50LXNrZWxldG9uLXBhcmFncmFwaFwiPlxuICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgcm93IG9mIHJvd3NMaXN0OyBsZXQgaSA9IGluZGV4XCIgW3N0eWxlLndpZHRoXT1cInRvQ1NTVW5pdCh3aWR0aExpc3RbaV0pXCI+PC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbnpMb2FkaW5nXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpTa2VsZXRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbnpBY3RpdmUgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpMb2FkaW5nID0gdHJ1ZTtcbiAgQElucHV0KCkgbnpSb3VuZCA9IGZhbHNlO1xuICBASW5wdXQoKSBuelRpdGxlOiBOelNrZWxldG9uVGl0bGUgfCBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgbnpBdmF0YXI6IE56U2tlbGV0b25BdmF0YXIgfCBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56UGFyYWdyYXBoOiBOelNrZWxldG9uUGFyYWdyYXBoIHwgYm9vbGVhbiA9IHRydWU7XG5cbiAgdGl0bGUhOiBOelNrZWxldG9uVGl0bGU7XG4gIGF2YXRhciE6IE56U2tlbGV0b25BdmF0YXI7XG4gIHBhcmFncmFwaCE6IE56U2tlbGV0b25QYXJhZ3JhcGg7XG4gIHJvd3NMaXN0OiBudW1iZXJbXSA9IFtdO1xuICB3aWR0aExpc3Q6IEFycmF5PG51bWJlciB8IHN0cmluZz4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhbnQtc2tlbGV0b24nKTtcbiAgfVxuXG4gIHRvQ1NTVW5pdCh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nID0gJycpOiBzdHJpbmcge1xuICAgIHJldHVybiB0b0Nzc1BpeGVsKHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGl0bGVQcm9wcygpOiBOelNrZWxldG9uVGl0bGUge1xuICAgIGNvbnN0IGhhc0F2YXRhciA9ICEhdGhpcy5uekF2YXRhcjtcbiAgICBjb25zdCBoYXNQYXJhZ3JhcGggPSAhIXRoaXMubnpQYXJhZ3JhcGg7XG4gICAgbGV0IHdpZHRoID0gJyc7XG4gICAgaWYgKCFoYXNBdmF0YXIgJiYgaGFzUGFyYWdyYXBoKSB7XG4gICAgICB3aWR0aCA9ICczOCUnO1xuICAgIH0gZWxzZSBpZiAoaGFzQXZhdGFyICYmIGhhc1BhcmFncmFwaCkge1xuICAgICAgd2lkdGggPSAnNTAlJztcbiAgICB9XG4gICAgcmV0dXJuIHsgd2lkdGgsIC4uLnRoaXMuZ2V0UHJvcHModGhpcy5uelRpdGxlKSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBdmF0YXJQcm9wcygpOiBOelNrZWxldG9uQXZhdGFyIHtcbiAgICBjb25zdCBzaGFwZTogTnpTa2VsZXRvbkF2YXRhclNoYXBlID0gISF0aGlzLm56VGl0bGUgJiYgIXRoaXMubnpQYXJhZ3JhcGggPyAnc3F1YXJlJyA6ICdjaXJjbGUnO1xuICAgIGNvbnN0IHNpemU6IE56U2tlbGV0b25BdmF0YXJTaXplID0gJ2xhcmdlJztcbiAgICByZXR1cm4geyBzaGFwZSwgc2l6ZSwgLi4udGhpcy5nZXRQcm9wcyh0aGlzLm56QXZhdGFyKSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXJhZ3JhcGhQcm9wcygpOiBOelNrZWxldG9uUGFyYWdyYXBoIHtcbiAgICBjb25zdCBoYXNBdmF0YXIgPSAhIXRoaXMubnpBdmF0YXI7XG4gICAgY29uc3QgaGFzVGl0bGUgPSAhIXRoaXMubnpUaXRsZTtcbiAgICBjb25zdCBiYXNpY1Byb3BzOiBOelNrZWxldG9uUGFyYWdyYXBoID0ge307XG4gICAgLy8gV2lkdGhcbiAgICBpZiAoIWhhc0F2YXRhciB8fCAhaGFzVGl0bGUpIHtcbiAgICAgIGJhc2ljUHJvcHMud2lkdGggPSAnNjElJztcbiAgICB9XG4gICAgLy8gUm93c1xuICAgIGlmICghaGFzQXZhdGFyICYmIGhhc1RpdGxlKSB7XG4gICAgICBiYXNpY1Byb3BzLnJvd3MgPSAzO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYXNpY1Byb3BzLnJvd3MgPSAyO1xuICAgIH1cbiAgICByZXR1cm4geyAuLi5iYXNpY1Byb3BzLCAuLi50aGlzLmdldFByb3BzKHRoaXMubnpQYXJhZ3JhcGgpIH07XG4gIH1cblxuICBwcml2YXRlIGdldFByb3BzPFQ+KHByb3A6IFQgfCBib29sZWFuIHwgdW5kZWZpbmVkKTogVCB8IHt9IHtcbiAgICByZXR1cm4gcHJvcCAmJiB0eXBlb2YgcHJvcCA9PT0gJ29iamVjdCcgPyBwcm9wIDoge307XG4gIH1cblxuICBwcml2YXRlIGdldFdpZHRoTGlzdCgpOiBBcnJheTxudW1iZXIgfCBzdHJpbmc+IHtcbiAgICBjb25zdCB7IHdpZHRoLCByb3dzIH0gPSB0aGlzLnBhcmFncmFwaDtcbiAgICBsZXQgd2lkdGhMaXN0OiBBcnJheTxzdHJpbmcgfCBudW1iZXI+ID0gW107XG4gICAgaWYgKHdpZHRoICYmIEFycmF5LmlzQXJyYXkod2lkdGgpKSB7XG4gICAgICB3aWR0aExpc3QgPSB3aWR0aDtcbiAgICB9IGVsc2UgaWYgKHdpZHRoICYmICFBcnJheS5pc0FycmF5KHdpZHRoKSkge1xuICAgICAgd2lkdGhMaXN0ID0gW107XG4gICAgICB3aWR0aExpc3Rbcm93cyEgLSAxXSA9IHdpZHRoO1xuICAgIH1cbiAgICByZXR1cm4gd2lkdGhMaXN0O1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVQcm9wcygpOiB2b2lkIHtcbiAgICB0aGlzLnRpdGxlID0gdGhpcy5nZXRUaXRsZVByb3BzKCk7XG4gICAgdGhpcy5hdmF0YXIgPSB0aGlzLmdldEF2YXRhclByb3BzKCk7XG4gICAgdGhpcy5wYXJhZ3JhcGggPSB0aGlzLmdldFBhcmFncmFwaFByb3BzKCk7XG4gICAgdGhpcy5yb3dzTGlzdCA9IFsuLi5BcnJheSh0aGlzLnBhcmFncmFwaC5yb3dzKV07XG4gICAgdGhpcy53aWR0aExpc3QgPSB0aGlzLmdldFdpZHRoTGlzdCgpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVQcm9wcygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLm56VGl0bGUgfHwgY2hhbmdlcy5uekF2YXRhciB8fCBjaGFuZ2VzLm56UGFyYWdyYXBoKSB7XG4gICAgICB0aGlzLnVwZGF0ZVByb3BzKCk7XG4gICAgfVxuICB9XG59XG4iXX0=