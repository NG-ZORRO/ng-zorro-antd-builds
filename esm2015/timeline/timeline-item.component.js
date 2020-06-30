/**
 * @fileoverview added by tsickle
 * Generated from: timeline-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { TimelineService } from './timeline.service';
/** @type {?} */
const TimelineTimeDefaultColors = (/** @type {?} */ (['red', 'blue', 'green', 'grey', 'gray']));
/**
 * @param {?=} color
 * @return {?}
 */
function isDefaultColor(color) {
    return TimelineTimeDefaultColors.findIndex((/**
     * @param {?} i
     * @return {?}
     */
    i => i === color)) !== -1;
}
export class NzTimelineItemComponent {
    /**
     * @param {?} cdr
     * @param {?} timelineService
     */
    constructor(cdr, timelineService) {
        this.cdr = cdr;
        this.timelineService = timelineService;
        this.nzColor = 'blue';
        this.isLast = false;
        this.borderColor = null;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.timelineService.markForCheck();
        if (changes.nzColor) {
            this.updateCustomColor();
        }
    }
    /**
     * @return {?}
     */
    detectChanges() {
        this.cdr.detectChanges();
    }
    /**
     * @private
     * @return {?}
     */
    updateCustomColor() {
        this.borderColor = isDefaultColor(this.nzColor) ? null : this.nzColor;
    }
}
NzTimelineItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                selector: 'nz-timeline-item, [nz-timeline-item]',
                exportAs: 'nzTimelineItem',
                template: `
    <ng-template #template>
      <li
        class="ant-timeline-item"
        [class.ant-timeline-item-right]="position === 'right'"
        [class.ant-timeline-item-left]="position === 'left'"
        [class.ant-timeline-item-last]="isLast"
      >
        <div class="ant-timeline-item-tail"></div>
        <div
          class="ant-timeline-item-head"
          [class.ant-timeline-item-head-red]="nzColor === 'red'"
          [class.ant-timeline-item-head-blue]="nzColor === 'blue'"
          [class.ant-timeline-item-head-green]="nzColor === 'green'"
          [class.ant-timeline-item-head-gray]="nzColor === 'gray'"
          [class.ant-timeline-item-head-custom]="!!nzDot"
          [style.border-color]="borderColor"
        >
          <ng-container *nzStringTemplateOutlet="nzDot">{{ nzDot }}</ng-container>
        </div>
        <div class="ant-timeline-item-content">
          <ng-content></ng-content>
        </div>
      </li>
    </ng-template>
  `
            }] }
];
/** @nocollapse */
NzTimelineItemComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: TimelineService }
];
NzTimelineItemComponent.propDecorators = {
    template: [{ type: ViewChild, args: ['template', { static: false },] }],
    nzColor: [{ type: Input }],
    nzDot: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NzTimelineItemComponent.prototype.template;
    /** @type {?} */
    NzTimelineItemComponent.prototype.nzColor;
    /** @type {?} */
    NzTimelineItemComponent.prototype.nzDot;
    /** @type {?} */
    NzTimelineItemComponent.prototype.isLast;
    /** @type {?} */
    NzTimelineItemComponent.prototype.borderColor;
    /** @type {?} */
    NzTimelineItemComponent.prototype.position;
    /**
     * @type {?}
     * @private
     */
    NzTimelineItemComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzTimelineItemComponent.prototype.timelineService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkL3RpbWVsaW5lLyIsInNvdXJjZXMiOlsidGltZWxpbmUtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFHTCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O01BRS9DLHlCQUF5QixHQUFHLG1CQUFBLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFTOzs7OztBQUduRixTQUFTLGNBQWMsQ0FBQyxLQUFjO0lBQ3BDLE9BQU8seUJBQXlCLENBQUMsU0FBUzs7OztJQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLENBQUM7QUFtQ0QsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7SUFVbEMsWUFBb0IsR0FBc0IsRUFBVSxlQUFnQztRQUFoRSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVAzRSxZQUFPLEdBQXdCLE1BQU0sQ0FBQztRQUcvQyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsZ0JBQVcsR0FBa0IsSUFBSSxDQUFDO0lBR3FELENBQUM7Ozs7O0lBRXhGLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7Ozs7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7OztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4RSxDQUFDOzs7WUExREYsU0FBUyxTQUFDO2dCQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJUO2FBQ0Y7Ozs7WUFwREMsaUJBQWlCO1lBV1YsZUFBZTs7O3VCQTJDckIsU0FBUyxTQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7c0JBRXZDLEtBQUs7b0JBQ0wsS0FBSzs7OztJQUhOLDJDQUF1RTs7SUFFdkUsMENBQStDOztJQUMvQyx3Q0FBNEM7O0lBRTVDLHlDQUFlOztJQUNmLDhDQUFrQzs7SUFDbEMsMkNBQXFDOzs7OztJQUV6QixzQ0FBOEI7Ozs7O0lBQUUsa0RBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOelRpbWVsaW5lTW9kZSB9IGZyb20gJy4vdGltZWxpbmUuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVsaW5lU2VydmljZSB9IGZyb20gJy4vdGltZWxpbmUuc2VydmljZSc7XG5cbmNvbnN0IFRpbWVsaW5lVGltZURlZmF1bHRDb2xvcnMgPSBbJ3JlZCcsICdibHVlJywgJ2dyZWVuJywgJ2dyZXknLCAnZ3JheSddIGFzIGNvbnN0O1xuZXhwb3J0IHR5cGUgTnpUaW1lbGluZUl0ZW1Db2xvciA9IHR5cGVvZiBUaW1lbGluZVRpbWVEZWZhdWx0Q29sb3JzW251bWJlcl07XG5cbmZ1bmN0aW9uIGlzRGVmYXVsdENvbG9yKGNvbG9yPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBUaW1lbGluZVRpbWVEZWZhdWx0Q29sb3JzLmZpbmRJbmRleChpID0+IGkgPT09IGNvbG9yKSAhPT0gLTE7XG59XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHNlbGVjdG9yOiAnbnotdGltZWxpbmUtaXRlbSwgW256LXRpbWVsaW5lLWl0ZW1dJyxcbiAgZXhwb3J0QXM6ICduelRpbWVsaW5lSXRlbScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICN0ZW1wbGF0ZT5cbiAgICAgIDxsaVxuICAgICAgICBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtXCJcbiAgICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1pdGVtLXJpZ2h0XT1cInBvc2l0aW9uID09PSAncmlnaHQnXCJcbiAgICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1pdGVtLWxlZnRdPVwicG9zaXRpb24gPT09ICdsZWZ0J1wiXG4gICAgICAgIFtjbGFzcy5hbnQtdGltZWxpbmUtaXRlbS1sYXN0XT1cImlzTGFzdFwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtdGltZWxpbmUtaXRlbS10YWlsXCI+PC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtLWhlYWRcIlxuICAgICAgICAgIFtjbGFzcy5hbnQtdGltZWxpbmUtaXRlbS1oZWFkLXJlZF09XCJuekNvbG9yID09PSAncmVkJ1wiXG4gICAgICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1pdGVtLWhlYWQtYmx1ZV09XCJuekNvbG9yID09PSAnYmx1ZSdcIlxuICAgICAgICAgIFtjbGFzcy5hbnQtdGltZWxpbmUtaXRlbS1oZWFkLWdyZWVuXT1cIm56Q29sb3IgPT09ICdncmVlbidcIlxuICAgICAgICAgIFtjbGFzcy5hbnQtdGltZWxpbmUtaXRlbS1oZWFkLWdyYXldPVwibnpDb2xvciA9PT0gJ2dyYXknXCJcbiAgICAgICAgICBbY2xhc3MuYW50LXRpbWVsaW5lLWl0ZW0taGVhZC1jdXN0b21dPVwiISFuekRvdFwiXG4gICAgICAgICAgW3N0eWxlLmJvcmRlci1jb2xvcl09XCJib3JkZXJDb2xvclwiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpEb3RcIj57eyBuekRvdCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtLWNvbnRlbnRcIj5cbiAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9saT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56VGltZWxpbmVJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQFZpZXdDaGlsZCgndGVtcGxhdGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgdGVtcGxhdGUhOiBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICBASW5wdXQoKSBuekNvbG9yOiBOelRpbWVsaW5lSXRlbUNvbG9yID0gJ2JsdWUnO1xuICBASW5wdXQoKSBuekRvdD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuXG4gIGlzTGFzdCA9IGZhbHNlO1xuICBib3JkZXJDb2xvcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIHBvc2l0aW9uOiBOelRpbWVsaW5lTW9kZSB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgdGltZWxpbmVTZXJ2aWNlOiBUaW1lbGluZVNlcnZpY2UpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudGltZWxpbmVTZXJ2aWNlLm1hcmtGb3JDaGVjaygpO1xuICAgIGlmIChjaGFuZ2VzLm56Q29sb3IpIHtcbiAgICAgIHRoaXMudXBkYXRlQ3VzdG9tQ29sb3IoKTtcbiAgICB9XG4gIH1cblxuICBkZXRlY3RDaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ3VzdG9tQ29sb3IoKTogdm9pZCB7XG4gICAgdGhpcy5ib3JkZXJDb2xvciA9IGlzRGVmYXVsdENvbG9yKHRoaXMubnpDb2xvcikgPyBudWxsIDogdGhpcy5uekNvbG9yO1xuICB9XG59XG4iXX0=