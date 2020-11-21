/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Optional, Renderer2, ViewChild } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { nzModalAnimations } from './modal-animations';
import { BaseModalContainerComponent } from './modal-container';
import { ModalOptions } from './modal-types';
export class NzModalContainerComponent extends BaseModalContainerComponent {
    constructor(elementRef, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType) {
        super(elementRef, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType);
        this.config = config;
    }
}
NzModalContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-modal-container',
                exportAs: 'nzModalContainer',
                template: `
    <div
      #modalElement
      role="document"
      class="ant-modal"
      (mousedown)="onMousedown()"
      [ngClass]="config.nzClassName!"
      [ngStyle]="config.nzStyle!"
      [style.width]="config?.nzWidth! | nzToCssUnit"
    >
      <div class="ant-modal-content">
        <button *ngIf="config.nzClosable" nz-modal-close (click)="onCloseClick()"></button>
        <div *ngIf="config.nzTitle" nz-modal-title></div>
        <div class="ant-modal-body" [ngStyle]="config.nzBodyStyle!">
          <ng-template cdkPortalOutlet></ng-template>
          <div *ngIf="isStringContent" [innerHTML]="config.nzContent"></div>
        </div>
        <div
          *ngIf="config.nzFooter !== null"
          nz-modal-footer
          [modalRef]="modalRef"
          (cancelTriggered)="onCloseClick()"
          (okTriggered)="onOkClick()"
        ></div>
      </div>
    </div>
  `,
                animations: [nzModalAnimations.modalContainer],
                // Using OnPush for modal caused footer can not to detect changes. we can fix it when 8.x.
                changeDetection: ChangeDetectionStrategy.Default,
                host: {
                    tabindex: '-1',
                    role: 'dialog',
                    '[class]': 'config.nzWrapClassName ? "ant-modal-wrap " + config.nzWrapClassName : "ant-modal-wrap"',
                    '[style.zIndex]': 'config.nzZIndex',
                    '[@.disabled]': 'config.nzNoAnimation',
                    '[@modalContainer]': 'state',
                    '(@modalContainer.start)': 'onAnimationStart($event)',
                    '(@modalContainer.done)': 'onAnimationDone($event)',
                    '(click)': 'onContainerClick($event)',
                    '(mouseup)': 'onMouseup()'
                }
            },] }
];
NzModalContainerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusTrapFactory },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: OverlayRef },
    { type: NzConfigService },
    { type: ModalOptions },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
NzModalContainerComponent.propDecorators = {
    portalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: true },] }],
    modalElementRef: [{ type: ViewChild, args: ['modalElement', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvbW9kYWwvIiwic291cmNlcyI6WyJtb2RhbC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxSSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWdEN0MsTUFBTSxPQUFPLHlCQUEwQixTQUFRLDJCQUEyQjtJQUd4RSxZQUNFLFVBQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxHQUFzQixFQUN0QixNQUFpQixFQUNqQixVQUFzQixFQUN0QixlQUFnQyxFQUN6QixNQUFvQixFQUNHLFFBQW1CLEVBQ04sYUFBcUI7UUFFaEUsS0FBSyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUp4RyxXQUFNLEdBQU4sTUFBTSxDQUFjO0lBSzdCLENBQUM7OztZQTdERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCVDtnQkFDRCxVQUFVLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUM7Z0JBQzlDLDBGQUEwRjtnQkFDMUYsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87Z0JBQ2hELElBQUksRUFBRTtvQkFDSixRQUFRLEVBQUUsSUFBSTtvQkFDZCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxTQUFTLEVBQUUsd0ZBQXdGO29CQUNuRyxnQkFBZ0IsRUFBRSxpQkFBaUI7b0JBQ25DLGNBQWMsRUFBRSxzQkFBc0I7b0JBQ3RDLG1CQUFtQixFQUFFLE9BQU87b0JBQzVCLHlCQUF5QixFQUFFLDBCQUEwQjtvQkFDckQsd0JBQXdCLEVBQUUseUJBQXlCO29CQUNuRCxTQUFTLEVBQUUsMEJBQTBCO29CQUNyQyxXQUFXLEVBQUUsYUFBYTtpQkFDM0I7YUFDRjs7O1lBdEQrRCxVQUFVO1lBSmpFLGdCQUFnQjtZQUlTLGlCQUFpQjtZQUEyQyxTQUFTO1lBSDlGLFVBQVU7WUFLVixlQUFlO1lBS2YsWUFBWTs0Q0EyRGhCLFFBQVEsWUFBSSxNQUFNLFNBQUMsUUFBUTt5Q0FDM0IsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7OzsyQkFYMUMsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7OEJBQzNDLFNBQVMsU0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRm9jdXNUcmFwRmFjdG9yeSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDZGtQb3J0YWxPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbmplY3QsIE9wdGlvbmFsLCBSZW5kZXJlcjIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQU5JTUFUSU9OX01PRFVMRV9UWVBFIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IE56Q29uZmlnU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgbnpNb2RhbEFuaW1hdGlvbnMgfSBmcm9tICcuL21vZGFsLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQmFzZU1vZGFsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1jb250YWluZXInO1xuaW1wb3J0IHsgTW9kYWxPcHRpb25zIH0gZnJvbSAnLi9tb2RhbC10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LW1vZGFsLWNvbnRhaW5lcicsXG4gIGV4cG9ydEFzOiAnbnpNb2RhbENvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgI21vZGFsRWxlbWVudFxuICAgICAgcm9sZT1cImRvY3VtZW50XCJcbiAgICAgIGNsYXNzPVwiYW50LW1vZGFsXCJcbiAgICAgIChtb3VzZWRvd24pPVwib25Nb3VzZWRvd24oKVwiXG4gICAgICBbbmdDbGFzc109XCJjb25maWcubnpDbGFzc05hbWUhXCJcbiAgICAgIFtuZ1N0eWxlXT1cImNvbmZpZy5uelN0eWxlIVwiXG4gICAgICBbc3R5bGUud2lkdGhdPVwiY29uZmlnPy5ueldpZHRoISB8IG56VG9Dc3NVbml0XCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LW1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImNvbmZpZy5uekNsb3NhYmxlXCIgbnotbW9kYWwtY2xvc2UgKGNsaWNrKT1cIm9uQ2xvc2VDbGljaygpXCI+PC9idXR0b24+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJjb25maWcubnpUaXRsZVwiIG56LW1vZGFsLXRpdGxlPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LW1vZGFsLWJvZHlcIiBbbmdTdHlsZV09XCJjb25maWcubnpCb2R5U3R5bGUhXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIGNka1BvcnRhbE91dGxldD48L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc1N0cmluZ0NvbnRlbnRcIiBbaW5uZXJIVE1MXT1cImNvbmZpZy5uekNvbnRlbnRcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAqbmdJZj1cImNvbmZpZy5uekZvb3RlciAhPT0gbnVsbFwiXG4gICAgICAgICAgbnotbW9kYWwtZm9vdGVyXG4gICAgICAgICAgW21vZGFsUmVmXT1cIm1vZGFsUmVmXCJcbiAgICAgICAgICAoY2FuY2VsVHJpZ2dlcmVkKT1cIm9uQ2xvc2VDbGljaygpXCJcbiAgICAgICAgICAob2tUcmlnZ2VyZWQpPVwib25Pa0NsaWNrKClcIlxuICAgICAgICA+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgYW5pbWF0aW9uczogW256TW9kYWxBbmltYXRpb25zLm1vZGFsQ29udGFpbmVyXSxcbiAgLy8gVXNpbmcgT25QdXNoIGZvciBtb2RhbCBjYXVzZWQgZm9vdGVyIGNhbiBub3QgdG8gZGV0ZWN0IGNoYW5nZXMuIHdlIGNhbiBmaXggaXQgd2hlbiA4LnguXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgaG9zdDoge1xuICAgIHRhYmluZGV4OiAnLTEnLFxuICAgIHJvbGU6ICdkaWFsb2cnLFxuICAgICdbY2xhc3NdJzogJ2NvbmZpZy5ueldyYXBDbGFzc05hbWUgPyBcImFudC1tb2RhbC13cmFwIFwiICsgY29uZmlnLm56V3JhcENsYXNzTmFtZSA6IFwiYW50LW1vZGFsLXdyYXBcIicsXG4gICAgJ1tzdHlsZS56SW5kZXhdJzogJ2NvbmZpZy5uelpJbmRleCcsXG4gICAgJ1tALmRpc2FibGVkXSc6ICdjb25maWcubnpOb0FuaW1hdGlvbicsXG4gICAgJ1tAbW9kYWxDb250YWluZXJdJzogJ3N0YXRlJyxcbiAgICAnKEBtb2RhbENvbnRhaW5lci5zdGFydCknOiAnb25BbmltYXRpb25TdGFydCgkZXZlbnQpJyxcbiAgICAnKEBtb2RhbENvbnRhaW5lci5kb25lKSc6ICdvbkFuaW1hdGlvbkRvbmUoJGV2ZW50KScsXG4gICAgJyhjbGljayknOiAnb25Db250YWluZXJDbGljaygkZXZlbnQpJyxcbiAgICAnKG1vdXNldXApJzogJ29uTW91c2V1cCgpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TW9kYWxDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlTW9kYWxDb250YWluZXJDb21wb25lbnQge1xuICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwgeyBzdGF0aWM6IHRydWUgfSkgcG9ydGFsT3V0bGV0ITogQ2RrUG9ydGFsT3V0bGV0O1xuICBAVmlld0NoaWxkKCdtb2RhbEVsZW1lbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBtb2RhbEVsZW1lbnRSZWYhOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBmb2N1c1RyYXBGYWN0b3J5OiBGb2N1c1RyYXBGYWN0b3J5LFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcmVuZGVyOiBSZW5kZXJlcjIsXG4gICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcbiAgICBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBwdWJsaWMgY29uZmlnOiBNb2RhbE9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IE56U2FmZUFueSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uVHlwZTogc3RyaW5nXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIGZvY3VzVHJhcEZhY3RvcnksIGNkciwgcmVuZGVyLCBvdmVybGF5UmVmLCBuekNvbmZpZ1NlcnZpY2UsIGNvbmZpZywgZG9jdW1lbnQsIGFuaW1hdGlvblR5cGUpO1xuICB9XG59XG4iXX0=