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
var TimelineTimeDefaultColors = (/** @type {?} */ (['red', 'blue', 'green', 'grey', 'gray']));
/**
 * @param {?=} color
 * @return {?}
 */
function isDefaultColor(color) {
    return TimelineTimeDefaultColors.findIndex((/**
     * @param {?} i
     * @return {?}
     */
    function (i) { return i === color; })) !== -1;
}
var NzTimelineItemComponent = /** @class */ (function () {
    function NzTimelineItemComponent(cdr, timelineService) {
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
    NzTimelineItemComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.timelineService.markForCheck();
        if (changes.nzColor) {
            this.updateCustomColor();
        }
    };
    /**
     * @return {?}
     */
    NzTimelineItemComponent.prototype.detectChanges = /**
     * @return {?}
     */
    function () {
        this.cdr.detectChanges();
    };
    /**
     * @private
     * @return {?}
     */
    NzTimelineItemComponent.prototype.updateCustomColor = /**
     * @private
     * @return {?}
     */
    function () {
        this.borderColor = isDefaultColor(this.nzColor) ? null : this.nzColor;
    };
    NzTimelineItemComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    selector: 'nz-timeline-item, [nz-timeline-item]',
                    exportAs: 'nzTimelineItem',
                    template: "\n    <ng-template #template>\n      <li\n        class=\"ant-timeline-item\"\n        [class.ant-timeline-item-right]=\"position === 'right'\"\n        [class.ant-timeline-item-left]=\"position === 'left'\"\n        [class.ant-timeline-item-last]=\"isLast\"\n      >\n        <div class=\"ant-timeline-item-tail\"></div>\n        <div\n          class=\"ant-timeline-item-head\"\n          [class.ant-timeline-item-head-red]=\"nzColor === 'red'\"\n          [class.ant-timeline-item-head-blue]=\"nzColor === 'blue'\"\n          [class.ant-timeline-item-head-green]=\"nzColor === 'green'\"\n          [class.ant-timeline-item-head-gray]=\"nzColor === 'gray'\"\n          [class.ant-timeline-item-head-custom]=\"!!nzDot\"\n          [style.border-color]=\"borderColor\"\n        >\n          <ng-container *nzStringTemplateOutlet=\"nzDot\">{{ nzDot }}</ng-container>\n        </div>\n        <div class=\"ant-timeline-item-content\">\n          <ng-content></ng-content>\n        </div>\n      </li>\n    </ng-template>\n  "
                }] }
    ];
    /** @nocollapse */
    NzTimelineItemComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: TimelineService }
    ]; };
    NzTimelineItemComponent.propDecorators = {
        template: [{ type: ViewChild, args: ['template', { static: false },] }],
        nzColor: [{ type: Input }],
        nzDot: [{ type: Input }]
    };
    return NzTimelineItemComponent;
}());
export { NzTimelineItemComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkL3RpbWVsaW5lLyIsInNvdXJjZXMiOlsidGltZWxpbmUtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFHTCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0lBRS9DLHlCQUF5QixHQUFHLG1CQUFBLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFTOzs7OztBQUduRixTQUFTLGNBQWMsQ0FBQyxLQUFjO0lBQ3BDLE9BQU8seUJBQXlCLENBQUMsU0FBUzs7OztJQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLEtBQUssRUFBWCxDQUFXLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN0RSxDQUFDO0FBRUQ7SUEyQ0UsaUNBQW9CLEdBQXNCLEVBQVUsZUFBZ0M7UUFBaEUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFQM0UsWUFBTyxHQUF3QixNQUFNLENBQUM7UUFHL0MsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGdCQUFXLEdBQWtCLElBQUksQ0FBQztJQUdxRCxDQUFDOzs7OztJQUV4Riw2Q0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7O0lBRUQsK0NBQWE7OztJQUFiO1FBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7OztJQUVPLG1EQUFpQjs7OztJQUF6QjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hFLENBQUM7O2dCQTFERixTQUFTLFNBQUM7b0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixRQUFRLEVBQUUsc0NBQXNDO29CQUNoRCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsZ2dDQXlCVDtpQkFDRjs7OztnQkFwREMsaUJBQWlCO2dCQVdWLGVBQWU7OzsyQkEyQ3JCLFNBQVMsU0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzBCQUV2QyxLQUFLO3dCQUNMLEtBQUs7O0lBc0JSLDhCQUFDO0NBQUEsQUEzREQsSUEyREM7U0ExQlksdUJBQXVCOzs7SUFDbEMsMkNBQXVFOztJQUV2RSwwQ0FBK0M7O0lBQy9DLHdDQUE0Qzs7SUFFNUMseUNBQWU7O0lBQ2YsOENBQWtDOztJQUNsQywyQ0FBcUM7Ozs7O0lBRXpCLHNDQUE4Qjs7Ozs7SUFBRSxrREFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56VGltZWxpbmVNb2RlIH0gZnJvbSAnLi90aW1lbGluZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZWxpbmVTZXJ2aWNlIH0gZnJvbSAnLi90aW1lbGluZS5zZXJ2aWNlJztcblxuY29uc3QgVGltZWxpbmVUaW1lRGVmYXVsdENvbG9ycyA9IFsncmVkJywgJ2JsdWUnLCAnZ3JlZW4nLCAnZ3JleScsICdncmF5J10gYXMgY29uc3Q7XG5leHBvcnQgdHlwZSBOelRpbWVsaW5lSXRlbUNvbG9yID0gdHlwZW9mIFRpbWVsaW5lVGltZURlZmF1bHRDb2xvcnNbbnVtYmVyXTtcblxuZnVuY3Rpb24gaXNEZWZhdWx0Q29sb3IoY29sb3I/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIFRpbWVsaW5lVGltZURlZmF1bHRDb2xvcnMuZmluZEluZGV4KGkgPT4gaSA9PT0gY29sb3IpICE9PSAtMTtcbn1cblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgc2VsZWN0b3I6ICduei10aW1lbGluZS1pdGVtLCBbbnotdGltZWxpbmUtaXRlbV0nLFxuICBleHBvcnRBczogJ256VGltZWxpbmVJdGVtJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3RlbXBsYXRlPlxuICAgICAgPGxpXG4gICAgICAgIGNsYXNzPVwiYW50LXRpbWVsaW5lLWl0ZW1cIlxuICAgICAgICBbY2xhc3MuYW50LXRpbWVsaW5lLWl0ZW0tcmlnaHRdPVwicG9zaXRpb24gPT09ICdyaWdodCdcIlxuICAgICAgICBbY2xhc3MuYW50LXRpbWVsaW5lLWl0ZW0tbGVmdF09XCJwb3NpdGlvbiA9PT0gJ2xlZnQnXCJcbiAgICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1pdGVtLWxhc3RdPVwiaXNMYXN0XCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtLXRhaWxcIj48L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiYW50LXRpbWVsaW5lLWl0ZW0taGVhZFwiXG4gICAgICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1pdGVtLWhlYWQtcmVkXT1cIm56Q29sb3IgPT09ICdyZWQnXCJcbiAgICAgICAgICBbY2xhc3MuYW50LXRpbWVsaW5lLWl0ZW0taGVhZC1ibHVlXT1cIm56Q29sb3IgPT09ICdibHVlJ1wiXG4gICAgICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1pdGVtLWhlYWQtZ3JlZW5dPVwibnpDb2xvciA9PT0gJ2dyZWVuJ1wiXG4gICAgICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1pdGVtLWhlYWQtZ3JheV09XCJuekNvbG9yID09PSAnZ3JheSdcIlxuICAgICAgICAgIFtjbGFzcy5hbnQtdGltZWxpbmUtaXRlbS1oZWFkLWN1c3RvbV09XCIhIW56RG90XCJcbiAgICAgICAgICBbc3R5bGUuYm9yZGVyLWNvbG9yXT1cImJvcmRlckNvbG9yXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekRvdFwiPnt7IG56RG90IH19PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXRpbWVsaW5lLWl0ZW0tY29udGVudFwiPlxuICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2xpPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpUaW1lbGluZUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKCd0ZW1wbGF0ZScsIHsgc3RhdGljOiBmYWxzZSB9KSB0ZW1wbGF0ZSE6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuXG4gIEBJbnB1dCgpIG56Q29sb3I6IE56VGltZWxpbmVJdGVtQ29sb3IgPSAnYmx1ZSc7XG4gIEBJbnB1dCgpIG56RG90Pzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG5cbiAgaXNMYXN0ID0gZmFsc2U7XG4gIGJvcmRlckNvbG9yOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgcG9zaXRpb246IE56VGltZWxpbmVNb2RlIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSB0aW1lbGluZVNlcnZpY2U6IFRpbWVsaW5lU2VydmljZSkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy50aW1lbGluZVNlcnZpY2UubWFya0ZvckNoZWNrKCk7XG4gICAgaWYgKGNoYW5nZXMubnpDb2xvcikge1xuICAgICAgdGhpcy51cGRhdGVDdXN0b21Db2xvcigpO1xuICAgIH1cbiAgfVxuXG4gIGRldGVjdENoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDdXN0b21Db2xvcigpOiB2b2lkIHtcbiAgICB0aGlzLmJvcmRlckNvbG9yID0gaXNEZWZhdWx0Q29sb3IodGhpcy5uekNvbG9yKSA/IG51bGwgOiB0aGlzLm56Q29sb3I7XG4gIH1cbn1cbiJdfQ==