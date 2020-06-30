/**
 * @fileoverview added by tsickle
 * Generated from: tooltip.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, Directive, ElementRef, Host, Input, Optional, Renderer2, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { isTooltipEmpty, NzTooltipBaseComponent, NzTooltipBaseDirective } from './base';
export class NzTooltipDirective extends NzTooltipBaseDirective {
    /**
     * @param {?} elementRef
     * @param {?} hostView
     * @param {?} resolver
     * @param {?} renderer
     * @param {?=} noAnimation
     */
    constructor(elementRef, hostView, resolver, renderer, noAnimation) {
        super(elementRef, hostView, resolver, renderer, noAnimation);
        this.componentFactory = this.resolver.resolveComponentFactory(NzToolTipComponent);
    }
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
NzTooltipDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: Renderer2 },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
NzTooltipDirective.propDecorators = {
    specificTitle: [{ type: Input, args: ['nzTooltipTitle',] }],
    directiveNameTitle: [{ type: Input, args: ['nz-tooltip',] }],
    specificTrigger: [{ type: Input, args: ['nzTooltipTrigger',] }],
    specificPlacement: [{ type: Input, args: ['nzTooltipPlacement',] }],
    specificOrigin: [{ type: Input, args: ['nzTooltipOrigin',] }]
};
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
export class NzToolTipComponent extends NzTooltipBaseComponent {
    /**
     * @param {?} cdr
     * @param {?=} noAnimation
     */
    constructor(cdr, noAnimation) {
        super(cdr, noAnimation);
        this.noAnimation = noAnimation;
        this.nzTitle = null;
    }
    /**
     * @protected
     * @return {?}
     */
    isEmpty() {
        return isTooltipEmpty(this.nzTitle);
    }
}
NzToolTipComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tooltip',
                exportAs: 'nzTooltipComponent',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                animations: [zoomBigMotion],
                template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayHasBackdrop]="_hasBackdrop"
      [cdkConnectedOverlayPositions]="_positions"
      (backdropClick)="hide()"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="ant-tooltip"
        [ngClass]="_classMap"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-tooltip-content">
          <div class="ant-tooltip-arrow"></div>
          <div class="ant-tooltip-inner">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </div>
        </div>
      </div>
    </ng-template>
  `,
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
NzToolTipComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
NzToolTipComponent.propDecorators = {
    nzTitle: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NzToolTipComponent.prototype.nzTitle;
    /** @type {?} */
    NzToolTipComponent.prototype.noAnimation;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvdG9vbHRpcC8iLCJzb3VyY2VzIjpbInRvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsVUFBVSxFQUNWLElBQUksRUFDSixLQUFLLEVBQ0wsUUFBUSxFQUNSLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUd6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixFQUFFLHNCQUFzQixFQUFvQixNQUFNLFFBQVEsQ0FBQztBQVMxRyxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsc0JBQXNCOzs7Ozs7OztJQVM1RCxZQUNFLFVBQXNCLEVBQ3RCLFFBQTBCLEVBQzFCLFFBQWtDLEVBQ2xDLFFBQW1CLEVBQ0MsV0FBb0M7UUFFeEQsS0FBSyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQVQvRCxxQkFBZ0IsR0FBeUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBVW5ILENBQUM7OztZQXhCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixJQUFJLEVBQUU7b0JBQ0osMEJBQTBCLEVBQUUsU0FBUztpQkFDdEM7YUFDRjs7OztZQXBCQyxVQUFVO1lBS1YsZ0JBQWdCO1lBUGhCLHdCQUF3QjtZQU14QixTQUFTO1lBS0Ysc0JBQXNCLHVCQTBCMUIsSUFBSSxZQUFJLFFBQVE7Ozs0QkFibEIsS0FBSyxTQUFDLGdCQUFnQjtpQ0FDdEIsS0FBSyxTQUFDLFlBQVk7OEJBQ2xCLEtBQUssU0FBQyxrQkFBa0I7Z0NBQ3hCLEtBQUssU0FBQyxvQkFBb0I7NkJBQzFCLEtBQUssU0FBQyxpQkFBaUI7Ozs7SUFKeEIsMkNBQXlEOztJQUN6RCxnREFBMEQ7O0lBQzFELDZDQUE4RDs7SUFDOUQsK0NBQXdEOztJQUN4RCw0Q0FBbUU7O0lBRW5FLDhDQUFtSDs7QUFtRHJILE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxzQkFBc0I7Ozs7O0lBRzVELFlBQVksR0FBc0IsRUFBNkIsV0FBb0M7UUFDakcsS0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztRQURxQyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFGMUYsWUFBTyxHQUFvQixJQUFJLENBQUM7SUFJekMsQ0FBQzs7Ozs7SUFFUyxPQUFPO1FBQ2YsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7OztZQS9DRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJUO2dCQUNELG1CQUFtQixFQUFFLEtBQUs7YUFDM0I7Ozs7WUFuRkMsaUJBQWlCO1lBY1Ysc0JBQXNCLHVCQXlFUSxJQUFJLFlBQUksUUFBUTs7O3NCQUZwRCxLQUFLOzs7O0lBQU4scUNBQXlDOztJQUVMLHlDQUErRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgem9vbUJpZ01vdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpUU1R5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBpc1Rvb2x0aXBFbXB0eSwgTnpUb29sdGlwQmFzZUNvbXBvbmVudCwgTnpUb29sdGlwQmFzZURpcmVjdGl2ZSwgTnpUb29sdGlwVHJpZ2dlciB9IGZyb20gJy4vYmFzZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuei10b29sdGlwXScsXG4gIGV4cG9ydEFzOiAnbnpUb29sdGlwJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXRvb2x0aXAtb3Blbl0nOiAndmlzaWJsZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRvb2x0aXBEaXJlY3RpdmUgZXh0ZW5kcyBOelRvb2x0aXBCYXNlRGlyZWN0aXZlIHtcbiAgQElucHV0KCduelRvb2x0aXBUaXRsZScpIHNwZWNpZmljVGl0bGU/OiBOelRTVHlwZSB8IG51bGw7XG4gIEBJbnB1dCgnbnotdG9vbHRpcCcpIGRpcmVjdGl2ZU5hbWVUaXRsZT86IE56VFNUeXBlIHwgbnVsbDtcbiAgQElucHV0KCduelRvb2x0aXBUcmlnZ2VyJykgc3BlY2lmaWNUcmlnZ2VyPzogTnpUb29sdGlwVHJpZ2dlcjtcbiAgQElucHV0KCduelRvb2x0aXBQbGFjZW1lbnQnKSBzcGVjaWZpY1BsYWNlbWVudD86IHN0cmluZztcbiAgQElucHV0KCduelRvb2x0aXBPcmlnaW4nKSBzcGVjaWZpY09yaWdpbj86IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8TnpUb29sVGlwQ29tcG9uZW50PiA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTnpUb29sVGlwQ29tcG9uZW50KTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIGhvc3RWaWV3OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASG9zdCgpIEBPcHRpb25hbCgpIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZVxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBob3N0VmlldywgcmVzb2x2ZXIsIHJlbmRlcmVyLCBub0FuaW1hdGlvbik7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdG9vbHRpcCcsXG4gIGV4cG9ydEFzOiAnbnpUb29sdGlwQ29tcG9uZW50JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGFuaW1hdGlvbnM6IFt6b29tQmlnTW90aW9uXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNvdmVybGF5PVwiY2RrQ29ubmVjdGVkT3ZlcmxheVwiXG4gICAgICBjZGtDb25uZWN0ZWRPdmVybGF5XG4gICAgICBuekNvbm5lY3RlZE92ZXJsYXlcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cIm9yaWdpblwiXG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwiX3Zpc2libGVcIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlIYXNCYWNrZHJvcF09XCJfaGFzQmFja2Ryb3BcIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbnNdPVwiX3Bvc2l0aW9uc1wiXG4gICAgICAoYmFja2Ryb3BDbGljayk9XCJoaWRlKClcIlxuICAgICAgKGRldGFjaCk9XCJoaWRlKClcIlxuICAgICAgKHBvc2l0aW9uQ2hhbmdlKT1cIm9uUG9zaXRpb25DaGFuZ2UoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImFudC10b29sdGlwXCJcbiAgICAgICAgW25nQ2xhc3NdPVwiX2NsYXNzTWFwXCJcbiAgICAgICAgW25nU3R5bGVdPVwibnpPdmVybGF5U3R5bGVcIlxuICAgICAgICBbQC5kaXNhYmxlZF09XCJub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvblwiXG4gICAgICAgIFtuek5vQW5pbWF0aW9uXT1cIm5vQW5pbWF0aW9uPy5uek5vQW5pbWF0aW9uXCJcbiAgICAgICAgW0B6b29tQmlnTW90aW9uXT1cIidhY3RpdmUnXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10b29sdGlwLWNvbnRlbnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXRvb2x0aXAtYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXRvb2x0aXAtaW5uZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRpdGxlXCI+e3sgbnpUaXRsZSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE56VG9vbFRpcENvbXBvbmVudCBleHRlbmRzIE56VG9vbHRpcEJhc2VDb21wb25lbnQge1xuICBASW5wdXQoKSBuelRpdGxlOiBOelRTVHlwZSB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSkge1xuICAgIHN1cGVyKGNkciwgbm9BbmltYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVG9vbHRpcEVtcHR5KHRoaXMubnpUaXRsZSk7XG4gIH1cbn1cbiJdfQ==