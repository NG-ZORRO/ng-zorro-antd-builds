/**
 * @fileoverview added by tsickle
 * Generated from: timeline.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzTimelineItemComponent } from './timeline-item.component';
import { TimelineService } from './timeline.service';
/** @type {?} */
var TimelineModes = (/** @type {?} */ (['left', 'alternate', 'right']));
var NzTimelineComponent = /** @class */ (function () {
    function NzTimelineComponent(cdr, timelineService) {
        this.cdr = cdr;
        this.timelineService = timelineService;
        this.nzReverse = false;
        this.isPendingBoolean = false;
        this.timelineItems = [];
        this.destroy$ = new Subject();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NzTimelineComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var nzMode = changes.nzMode, nzReverse = changes.nzReverse, nzPending = changes.nzPending;
        if (simpleChangeActivated(nzMode) || simpleChangeActivated(nzReverse)) {
            this.updateChildren();
        }
        if (nzPending) {
            this.isPendingBoolean = nzPending.currentValue === true;
        }
    };
    /**
     * @return {?}
     */
    NzTimelineComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.timelineService.check$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.cdr.markForCheck();
        }));
    };
    /**
     * @return {?}
     */
    NzTimelineComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.updateChildren();
        this.listOfItems.changes.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.updateChildren();
        }));
    };
    /**
     * @return {?}
     */
    NzTimelineComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    /**
     * @private
     * @return {?}
     */
    NzTimelineComponent.prototype.updateChildren = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.listOfItems && this.listOfItems.length) {
            /** @type {?} */
            var length_1 = this.listOfItems.length;
            this.listOfItems.forEach((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            function (item, index) {
                item.isLast = !_this.nzReverse ? index === length_1 - 1 : index === 0;
                item.position =
                    _this.nzMode === 'left' || !_this.nzMode
                        ? undefined
                        : _this.nzMode === 'right'
                            ? 'right'
                            : _this.nzMode === 'alternate' && index % 2 === 0
                                ? 'left'
                                : 'right';
                item.detectChanges();
            }));
            this.timelineItems = this.nzReverse ? this.listOfItems.toArray().reverse() : this.listOfItems.toArray();
        }
        this.cdr.markForCheck();
    };
    NzTimelineComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    selector: 'nz-timeline',
                    providers: [TimelineService],
                    exportAs: 'nzTimeline',
                    template: "\n    <ul\n      class=\"ant-timeline\"\n      [class.ant-timeline-right]=\"nzMode === 'right'\"\n      [class.ant-timeline-alternate]=\"nzMode === 'alternate'\"\n      [class.ant-timeline-pending]=\"!!nzPending\"\n      [class.ant-timeline-reverse]=\"nzReverse\"\n    >\n      <!-- User inserted timeline dots. -->\n      <ng-container *ngIf=\"nzReverse\" [ngTemplateOutlet]=\"pendingTemplate\"></ng-container>\n      <ng-container *ngFor=\"let item of timelineItems\">\n        <ng-template [ngTemplateOutlet]=\"item.template\"></ng-template>\n      </ng-container>\n      <ng-container *ngIf=\"!nzReverse\" [ngTemplateOutlet]=\"pendingTemplate\"></ng-container>\n      <!-- Pending dot. -->\n    </ul>\n    <ng-template #pendingTemplate>\n      <li *ngIf=\"nzPending\" class=\"ant-timeline-item ant-timeline-item-pending\">\n        <div class=\"ant-timeline-item-tail\"></div>\n        <div class=\"ant-timeline-item-head ant-timeline-item-head-custom ant-timeline-item-head-blue\">\n          <ng-container *nzStringTemplateOutlet=\"nzPendingDot\">\n            {{ nzPendingDot }}<i *ngIf=\"!nzPendingDot\" nz-icon nzType=\"loading\"></i>\n          </ng-container>\n        </div>\n        <div class=\"ant-timeline-item-content\">\n          <ng-container *nzStringTemplateOutlet=\"nzPending\">\n            {{ isPendingBoolean ? '' : nzPending }}\n          </ng-container>\n        </div>\n      </li>\n    </ng-template>\n    <!-- Grasp items -->\n    <ng-content></ng-content>\n  "
                }] }
    ];
    /** @nocollapse */
    NzTimelineComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: TimelineService }
    ]; };
    NzTimelineComponent.propDecorators = {
        listOfItems: [{ type: ContentChildren, args: [NzTimelineItemComponent,] }],
        nzMode: [{ type: Input }],
        nzPending: [{ type: Input }],
        nzPendingDot: [{ type: Input }],
        nzReverse: [{ type: Input }]
    };
    return NzTimelineComponent;
}());
export { NzTimelineComponent };
if (false) {
    /** @type {?} */
    NzTimelineComponent.prototype.listOfItems;
    /** @type {?} */
    NzTimelineComponent.prototype.nzMode;
    /** @type {?} */
    NzTimelineComponent.prototype.nzPending;
    /** @type {?} */
    NzTimelineComponent.prototype.nzPendingDot;
    /** @type {?} */
    NzTimelineComponent.prototype.nzReverse;
    /** @type {?} */
    NzTimelineComponent.prototype.isPendingBoolean;
    /** @type {?} */
    NzTimelineComponent.prototype.timelineItems;
    /**
     * @type {?}
     * @private
     */
    NzTimelineComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzTimelineComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzTimelineComponent.prototype.timelineService;
}
/**
 * @param {?=} simpleChange
 * @return {?}
 */
function simpleChangeActivated(simpleChange) {
    return !!(simpleChange && (simpleChange.previousValue !== simpleChange.currentValue || simpleChange.isFirstChange()));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC90aW1lbGluZS8iLCJzb3VyY2VzIjpbInRpbWVsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLEtBQUssRUFJTCxTQUFTLEVBSVQsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7SUFFL0MsYUFBYSxHQUFHLG1CQUFBLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsRUFBUztBQUc3RDtJQXVERSw2QkFBb0IsR0FBc0IsRUFBVSxlQUFnQztRQUFoRSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVAzRSxjQUFTLEdBQVksS0FBSyxDQUFDO1FBRXBDLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxrQkFBYSxHQUE4QixFQUFFLENBQUM7UUFFdEMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFFZ0QsQ0FBQzs7Ozs7SUFFeEYseUNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ3hCLElBQUEsdUJBQU0sRUFBRSw2QkFBUyxFQUFFLDZCQUFTO1FBRXBDLElBQUkscUJBQXFCLENBQUMsTUFBTSxDQUFDLElBQUkscUJBQXFCLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDckUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZCO1FBRUQs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LEtBQUs7O0lBMERSLDBCQUFDO0NBQUEsQUExR0QsSUEwR0M7U0FoRVksbUJBQW1COzs7SUFDOUIsMENBQTJGOztJQUUzRixxQ0FBaUM7O0lBQ2pDLHdDQUEwRDs7SUFDMUQsMkNBQW1EOztJQUNuRCx3Q0FBb0M7O0lBRXBDLCtDQUFrQzs7SUFDbEMsNENBQThDOzs7OztJQUU5Qyx1Q0FBdUM7Ozs7O0lBRTNCLGtDQUE4Qjs7Ozs7SUFBRSw4Q0FBd0M7Ozs7OztBQXFEdEYsU0FBUyxxQkFBcUIsQ0FBQyxZQUEyQjtJQUN4RCxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEtBQUssWUFBWSxDQUFDLFlBQVksSUFBSSxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpUaW1lbGluZUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3RpbWVsaW5lLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVsaW5lU2VydmljZSB9IGZyb20gJy4vdGltZWxpbmUuc2VydmljZSc7XG5cbmNvbnN0IFRpbWVsaW5lTW9kZXMgPSBbJ2xlZnQnLCAnYWx0ZXJuYXRlJywgJ3JpZ2h0J10gYXMgY29uc3Q7XG5leHBvcnQgdHlwZSBOelRpbWVsaW5lTW9kZSA9IHR5cGVvZiBUaW1lbGluZU1vZGVzW251bWJlcl07XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHNlbGVjdG9yOiAnbnotdGltZWxpbmUnLFxuICBwcm92aWRlcnM6IFtUaW1lbGluZVNlcnZpY2VdLFxuICBleHBvcnRBczogJ256VGltZWxpbmUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx1bFxuICAgICAgY2xhc3M9XCJhbnQtdGltZWxpbmVcIlxuICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1yaWdodF09XCJuek1vZGUgPT09ICdyaWdodCdcIlxuICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1hbHRlcm5hdGVdPVwibnpNb2RlID09PSAnYWx0ZXJuYXRlJ1wiXG4gICAgICBbY2xhc3MuYW50LXRpbWVsaW5lLXBlbmRpbmddPVwiISFuelBlbmRpbmdcIlxuICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1yZXZlcnNlXT1cIm56UmV2ZXJzZVwiXG4gICAgPlxuICAgICAgPCEtLSBVc2VyIGluc2VydGVkIHRpbWVsaW5lIGRvdHMuIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56UmV2ZXJzZVwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBlbmRpbmdUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiB0aW1lbGluZUl0ZW1zXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtLnRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFuelJldmVyc2VcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJwZW5kaW5nVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwhLS0gUGVuZGluZyBkb3QuIC0tPlxuICAgIDwvdWw+XG4gICAgPG5nLXRlbXBsYXRlICNwZW5kaW5nVGVtcGxhdGU+XG4gICAgICA8bGkgKm5nSWY9XCJuelBlbmRpbmdcIiBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtIGFudC10aW1lbGluZS1pdGVtLXBlbmRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtLXRhaWxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtLWhlYWQgYW50LXRpbWVsaW5lLWl0ZW0taGVhZC1jdXN0b20gYW50LXRpbWVsaW5lLWl0ZW0taGVhZC1ibHVlXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56UGVuZGluZ0RvdFwiPlxuICAgICAgICAgICAge3sgbnpQZW5kaW5nRG90IH19PGkgKm5nSWY9XCIhbnpQZW5kaW5nRG90XCIgbnotaWNvbiBuelR5cGU9XCJsb2FkaW5nXCI+PC9pPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtLWNvbnRlbnRcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpQZW5kaW5nXCI+XG4gICAgICAgICAgICB7eyBpc1BlbmRpbmdCb29sZWFuID8gJycgOiBuelBlbmRpbmcgfX1cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2xpPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPCEtLSBHcmFzcCBpdGVtcyAtLT5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpUaW1lbGluZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQge1xuICBAQ29udGVudENoaWxkcmVuKE56VGltZWxpbmVJdGVtQ29tcG9uZW50KSBsaXN0T2ZJdGVtcyE6IFF1ZXJ5TGlzdDxOelRpbWVsaW5lSXRlbUNvbXBvbmVudD47XG5cbiAgQElucHV0KCkgbnpNb2RlPzogTnpUaW1lbGluZU1vZGU7XG4gIEBJbnB1dCgpIG56UGVuZGluZz86IHN0cmluZyB8IGJvb2xlYW4gfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpQZW5kaW5nRG90Pzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56UmV2ZXJzZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGlzUGVuZGluZ0Jvb2xlYW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgdGltZWxpbmVJdGVtczogTnpUaW1lbGluZUl0ZW1Db21wb25lbnRbXSA9IFtdO1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSB0aW1lbGluZVNlcnZpY2U6IFRpbWVsaW5lU2VydmljZSkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuek1vZGUsIG56UmV2ZXJzZSwgbnpQZW5kaW5nIH0gPSBjaGFuZ2VzO1xuXG4gICAgaWYgKHNpbXBsZUNoYW5nZUFjdGl2YXRlZChuek1vZGUpIHx8IHNpbXBsZUNoYW5nZUFjdGl2YXRlZChuelJldmVyc2UpKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNoaWxkcmVuKCk7XG4gICAgfVxuXG4gICAgaWYgKG56UGVuZGluZykge1xuICAgICAgdGhpcy5pc1BlbmRpbmdCb29sZWFuID0gbnpQZW5kaW5nLmN1cnJlbnRWYWx1ZSA9PT0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy50aW1lbGluZVNlcnZpY2UuY2hlY2skLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVDaGlsZHJlbigpO1xuXG4gICAgdGhpcy5saXN0T2ZJdGVtcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVDaGlsZHJlbigpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDaGlsZHJlbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0T2ZJdGVtcyAmJiB0aGlzLmxpc3RPZkl0ZW1zLmxlbmd0aCkge1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5saXN0T2ZJdGVtcy5sZW5ndGg7XG4gICAgICB0aGlzLmxpc3RPZkl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGl0ZW0uaXNMYXN0ID0gIXRoaXMubnpSZXZlcnNlID8gaW5kZXggPT09IGxlbmd0aCAtIDEgOiBpbmRleCA9PT0gMDtcbiAgICAgICAgaXRlbS5wb3NpdGlvbiA9XG4gICAgICAgICAgdGhpcy5uek1vZGUgPT09ICdsZWZ0JyB8fCAhdGhpcy5uek1vZGVcbiAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICA6IHRoaXMubnpNb2RlID09PSAncmlnaHQnXG4gICAgICAgICAgICA/ICdyaWdodCdcbiAgICAgICAgICAgIDogdGhpcy5uek1vZGUgPT09ICdhbHRlcm5hdGUnICYmIGluZGV4ICUgMiA9PT0gMFxuICAgICAgICAgICAgPyAnbGVmdCdcbiAgICAgICAgICAgIDogJ3JpZ2h0JztcbiAgICAgICAgaXRlbS5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMudGltZWxpbmVJdGVtcyA9IHRoaXMubnpSZXZlcnNlID8gdGhpcy5saXN0T2ZJdGVtcy50b0FycmF5KCkucmV2ZXJzZSgpIDogdGhpcy5saXN0T2ZJdGVtcy50b0FycmF5KCk7XG4gICAgfVxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNpbXBsZUNoYW5nZUFjdGl2YXRlZChzaW1wbGVDaGFuZ2U/OiBTaW1wbGVDaGFuZ2UpOiBib29sZWFuIHtcbiAgcmV0dXJuICEhKHNpbXBsZUNoYW5nZSAmJiAoc2ltcGxlQ2hhbmdlLnByZXZpb3VzVmFsdWUgIT09IHNpbXBsZUNoYW5nZS5jdXJyZW50VmFsdWUgfHwgc2ltcGxlQ2hhbmdlLmlzRmlyc3RDaGFuZ2UoKSkpO1xufVxuIl19