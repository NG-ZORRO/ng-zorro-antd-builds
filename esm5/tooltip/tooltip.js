/**
 * @fileoverview added by tsickle
 * Generated from: tooltip.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, Directive, ElementRef, Host, Input, Optional, Renderer2, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { isTooltipEmpty, NzTooltipBaseComponent, NzTooltipBaseDirective } from './base';
var NzTooltipDirective = /** @class */ (function (_super) {
    __extends(NzTooltipDirective, _super);
    function NzTooltipDirective(elementRef, hostView, resolver, renderer, noAnimation) {
        var _this = _super.call(this, elementRef, hostView, resolver, renderer, noAnimation) || this;
        _this.componentFactory = _this.resolver.resolveComponentFactory(NzToolTipComponent);
        return _this;
    }
    NzTooltipDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nz-tooltip]',
                    exportAs: 'nzTooltip',
                    host: {
                        '[class.ant-tooltip-open]': 'visible'
                    }
                },] }
    ];
    /** @nocollapse */
    NzTooltipDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: Renderer2 },
        { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
    ]; };
    NzTooltipDirective.propDecorators = {
        specificTitle: [{ type: Input, args: ['nzTooltipTitle',] }],
        directiveNameTitle: [{ type: Input, args: ['nz-tooltip',] }],
        specificTrigger: [{ type: Input, args: ['nzTooltipTrigger',] }],
        specificPlacement: [{ type: Input, args: ['nzTooltipPlacement',] }],
        specificOrigin: [{ type: Input, args: ['nzTooltipOrigin',] }]
    };
    return NzTooltipDirective;
}(NzTooltipBaseDirective));
export { NzTooltipDirective };
if (false) {
    /** @type {?} */
    NzTooltipDirective.prototype.specificTitle;
    /** @type {?} */
    NzTooltipDirective.prototype.directiveNameTitle;
    /** @type {?} */
    NzTooltipDirective.prototype.specificTrigger;
    /** @type {?} */
    NzTooltipDirective.prototype.specificPlacement;
    /** @type {?} */
    NzTooltipDirective.prototype.specificOrigin;
    /** @type {?} */
    NzTooltipDirective.prototype.componentFactory;
}
var NzToolTipComponent = /** @class */ (function (_super) {
    __extends(NzToolTipComponent, _super);
    function NzToolTipComponent(cdr, noAnimation) {
        var _this = _super.call(this, cdr, noAnimation) || this;
        _this.noAnimation = noAnimation;
        _this.nzTitle = null;
        return _this;
    }
    /**
     * @protected
     * @return {?}
     */
    NzToolTipComponent.prototype.isEmpty = /**
     * @protected
     * @return {?}
     */
    function () {
        return isTooltipEmpty(this.nzTitle);
    };
    NzToolTipComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-tooltip',
                    exportAs: 'nzTooltipComponent',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    animations: [zoomBigMotion],
                    template: "\n    <ng-template\n      #overlay=\"cdkConnectedOverlay\"\n      cdkConnectedOverlay\n      nzConnectedOverlay\n      [cdkConnectedOverlayOrigin]=\"origin\"\n      [cdkConnectedOverlayOpen]=\"_visible\"\n      [cdkConnectedOverlayHasBackdrop]=\"_hasBackdrop\"\n      [cdkConnectedOverlayPositions]=\"_positions\"\n      (backdropClick)=\"hide()\"\n      (detach)=\"hide()\"\n      (positionChange)=\"onPositionChange($event)\"\n    >\n      <div\n        class=\"ant-tooltip\"\n        [ngClass]=\"_classMap\"\n        [ngStyle]=\"nzOverlayStyle\"\n        [@.disabled]=\"noAnimation?.nzNoAnimation\"\n        [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n        [@zoomBigMotion]=\"'active'\"\n      >\n        <div class=\"ant-tooltip-content\">\n          <div class=\"ant-tooltip-arrow\"></div>\n          <div class=\"ant-tooltip-inner\">\n            <ng-container *nzStringTemplateOutlet=\"nzTitle\">{{ nzTitle }}</ng-container>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  ",
                    preserveWhitespaces: false
                }] }
    ];
    /** @nocollapse */
    NzToolTipComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
    ]; };
    NzToolTipComponent.propDecorators = {
        nzTitle: [{ type: Input }]
    };
    return NzToolTipComponent;
}(NzTooltipBaseComponent));
export { NzToolTipComponent };
if (false) {
    /** @type {?} */
    NzToolTipComponent.prototype.nzTitle;
    /** @type {?} */
    NzToolTipComponent.prototype.noAnimation;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvdG9vbHRpcC8iLCJzb3VyY2VzIjpbInRvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCx3QkFBd0IsRUFDeEIsU0FBUyxFQUNULFVBQVUsRUFDVixJQUFJLEVBQ0osS0FBSyxFQUNMLFFBQVEsRUFDUixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFHekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0IsRUFBb0IsTUFBTSxRQUFRLENBQUM7QUFFMUc7SUFPd0Msc0NBQXNCO0lBUzVELDRCQUNFLFVBQXNCLEVBQ3RCLFFBQTBCLEVBQzFCLFFBQWtDLEVBQ2xDLFFBQW1CLEVBQ0MsV0FBb0M7UUFMMUQsWUFPRSxrQkFBTSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLFNBQzdEO1FBVkQsc0JBQWdCLEdBQXlDLEtBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7SUFVbkgsQ0FBQzs7Z0JBeEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLElBQUksRUFBRTt3QkFDSiwwQkFBMEIsRUFBRSxTQUFTO3FCQUN0QztpQkFDRjs7OztnQkFwQkMsVUFBVTtnQkFLVixnQkFBZ0I7Z0JBUGhCLHdCQUF3QjtnQkFNeEIsU0FBUztnQkFLRixzQkFBc0IsdUJBMEIxQixJQUFJLFlBQUksUUFBUTs7O2dDQWJsQixLQUFLLFNBQUMsZ0JBQWdCO3FDQUN0QixLQUFLLFNBQUMsWUFBWTtrQ0FDbEIsS0FBSyxTQUFDLGtCQUFrQjtvQ0FDeEIsS0FBSyxTQUFDLG9CQUFvQjtpQ0FDMUIsS0FBSyxTQUFDLGlCQUFpQjs7SUFhMUIseUJBQUM7Q0FBQSxBQXpCRCxDQU93QyxzQkFBc0IsR0FrQjdEO1NBbEJZLGtCQUFrQjs7O0lBQzdCLDJDQUF5RDs7SUFDekQsZ0RBQTBEOztJQUMxRCw2Q0FBOEQ7O0lBQzlELCtDQUF3RDs7SUFDeEQsNENBQW1FOztJQUVuRSw4Q0FBbUg7O0FBYXJIO0lBc0N3QyxzQ0FBc0I7SUFHNUQsNEJBQVksR0FBc0IsRUFBNkIsV0FBb0M7UUFBbkcsWUFDRSxrQkFBTSxHQUFHLEVBQUUsV0FBVyxDQUFDLFNBQ3hCO1FBRjhELGlCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUYxRixhQUFPLEdBQW9CLElBQUksQ0FBQzs7SUFJekMsQ0FBQzs7Ozs7SUFFUyxvQ0FBTzs7OztJQUFqQjtRQUNFLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDOztnQkEvQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDM0IsUUFBUSxFQUFFLG8vQkE2QlQ7b0JBQ0QsbUJBQW1CLEVBQUUsS0FBSztpQkFDM0I7Ozs7Z0JBbkZDLGlCQUFpQjtnQkFjVixzQkFBc0IsdUJBeUVRLElBQUksWUFBSSxRQUFROzs7MEJBRnBELEtBQUs7O0lBU1IseUJBQUM7Q0FBQSxBQWhERCxDQXNDd0Msc0JBQXNCLEdBVTdEO1NBVlksa0JBQWtCOzs7SUFDN0IscUNBQXlDOztJQUVMLHlDQUErRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgem9vbUJpZ01vdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpUU1R5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBpc1Rvb2x0aXBFbXB0eSwgTnpUb29sdGlwQmFzZUNvbXBvbmVudCwgTnpUb29sdGlwQmFzZURpcmVjdGl2ZSwgTnpUb29sdGlwVHJpZ2dlciB9IGZyb20gJy4vYmFzZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuei10b29sdGlwXScsXG4gIGV4cG9ydEFzOiAnbnpUb29sdGlwJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXRvb2x0aXAtb3Blbl0nOiAndmlzaWJsZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRvb2x0aXBEaXJlY3RpdmUgZXh0ZW5kcyBOelRvb2x0aXBCYXNlRGlyZWN0aXZlIHtcbiAgQElucHV0KCduelRvb2x0aXBUaXRsZScpIHNwZWNpZmljVGl0bGU/OiBOelRTVHlwZSB8IG51bGw7XG4gIEBJbnB1dCgnbnotdG9vbHRpcCcpIGRpcmVjdGl2ZU5hbWVUaXRsZT86IE56VFNUeXBlIHwgbnVsbDtcbiAgQElucHV0KCduelRvb2x0aXBUcmlnZ2VyJykgc3BlY2lmaWNUcmlnZ2VyPzogTnpUb29sdGlwVHJpZ2dlcjtcbiAgQElucHV0KCduelRvb2x0aXBQbGFjZW1lbnQnKSBzcGVjaWZpY1BsYWNlbWVudD86IHN0cmluZztcbiAgQElucHV0KCduelRvb2x0aXBPcmlnaW4nKSBzcGVjaWZpY09yaWdpbj86IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8TnpUb29sVGlwQ29tcG9uZW50PiA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTnpUb29sVGlwQ29tcG9uZW50KTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIGhvc3RWaWV3OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASG9zdCgpIEBPcHRpb25hbCgpIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZVxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBob3N0VmlldywgcmVzb2x2ZXIsIHJlbmRlcmVyLCBub0FuaW1hdGlvbik7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdG9vbHRpcCcsXG4gIGV4cG9ydEFzOiAnbnpUb29sdGlwQ29tcG9uZW50JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGFuaW1hdGlvbnM6IFt6b29tQmlnTW90aW9uXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNvdmVybGF5PVwiY2RrQ29ubmVjdGVkT3ZlcmxheVwiXG4gICAgICBjZGtDb25uZWN0ZWRPdmVybGF5XG4gICAgICBuekNvbm5lY3RlZE92ZXJsYXlcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cIm9yaWdpblwiXG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwiX3Zpc2libGVcIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlIYXNCYWNrZHJvcF09XCJfaGFzQmFja2Ryb3BcIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbnNdPVwiX3Bvc2l0aW9uc1wiXG4gICAgICAoYmFja2Ryb3BDbGljayk9XCJoaWRlKClcIlxuICAgICAgKGRldGFjaCk9XCJoaWRlKClcIlxuICAgICAgKHBvc2l0aW9uQ2hhbmdlKT1cIm9uUG9zaXRpb25DaGFuZ2UoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImFudC10b29sdGlwXCJcbiAgICAgICAgW25nQ2xhc3NdPVwiX2NsYXNzTWFwXCJcbiAgICAgICAgW25nU3R5bGVdPVwibnpPdmVybGF5U3R5bGVcIlxuICAgICAgICBbQC5kaXNhYmxlZF09XCJub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvblwiXG4gICAgICAgIFtuek5vQW5pbWF0aW9uXT1cIm5vQW5pbWF0aW9uPy5uek5vQW5pbWF0aW9uXCJcbiAgICAgICAgW0B6b29tQmlnTW90aW9uXT1cIidhY3RpdmUnXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10b29sdGlwLWNvbnRlbnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXRvb2x0aXAtYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXRvb2x0aXAtaW5uZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRpdGxlXCI+e3sgbnpUaXRsZSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE56VG9vbFRpcENvbXBvbmVudCBleHRlbmRzIE56VG9vbHRpcEJhc2VDb21wb25lbnQge1xuICBASW5wdXQoKSBuelRpdGxlOiBOelRTVHlwZSB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSkge1xuICAgIHN1cGVyKGNkciwgbm9BbmltYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVG9vbHRpcEVtcHR5KHRoaXMubnpUaXRsZSk7XG4gIH1cbn1cbiJdfQ==