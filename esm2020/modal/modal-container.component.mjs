import { CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Optional, ViewChild } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { nzModalAnimations } from './modal-animations';
import { BaseModalContainerComponent } from './modal-container.directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/cdk/overlay";
import * as i3 from "ng-zorro-antd/core/config";
import * as i4 from "./modal-types";
import * as i5 from "./modal-close.component";
import * as i6 from "./modal-title.component";
import * as i7 from "./modal-footer.component";
import * as i8 from "@angular/common";
import * as i9 from "@angular/cdk/portal";
import * as i10 from "ng-zorro-antd/pipes";
export class NzModalContainerComponent extends BaseModalContainerComponent {
    constructor(ngZone, host, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType) {
        super(ngZone, host, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType);
        this.config = config;
    }
    ngOnInit() {
        this.setupMouseListeners(this.modalElementRef);
    }
}
NzModalContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalContainerComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i1.FocusTrapFactory }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i2.OverlayRef }, { token: i3.NzConfigService }, { token: i4.ModalOptions }, { token: DOCUMENT, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzModalContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzModalContainerComponent, selector: "nz-modal-container", host: { attributes: { "tabindex": "-1", "role": "dialog" }, listeners: { "@modalContainer.start": "onAnimationStart($event)", "@modalContainer.done": "onAnimationDone($event)", "click": "onContainerClick($event)" }, properties: { "class": "config.nzWrapClassName ? \"ant-modal-wrap \" + config.nzWrapClassName : \"ant-modal-wrap\"", "class.ant-modal-wrap-rtl": "dir === 'rtl'", "class.ant-modal-centered": "config.nzCentered", "style.zIndex": "config.nzZIndex", "@.disabled": "config.nzNoAnimation", "@modalContainer": "state" } }, viewQueries: [{ propertyName: "portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }, { propertyName: "modalElementRef", first: true, predicate: ["modalElement"], descendants: true, static: true }], exportAs: ["nzModalContainer"], usesInheritance: true, ngImport: i0, template: `
    <div
      #modalElement
      role="document"
      class="ant-modal"
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
  `, isInline: true, components: [{ type: i5.NzModalCloseComponent, selector: "button[nz-modal-close]", exportAs: ["NzModalCloseBuiltin"] }, { type: i6.NzModalTitleComponent, selector: "div[nz-modal-title]", exportAs: ["NzModalTitleBuiltin"] }, { type: i7.NzModalFooterComponent, selector: "div[nz-modal-footer]", inputs: ["modalRef"], outputs: ["cancelTriggered", "okTriggered"], exportAs: ["NzModalFooterBuiltin"] }], directives: [{ type: i8.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i8.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i9.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], pipes: { "nzToCssUnit": i10.NzToCssUnitPipe }, animations: [nzModalAnimations.modalContainer], changeDetection: i0.ChangeDetectionStrategy.Default });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-modal-container',
                    exportAs: 'nzModalContainer',
                    template: `
    <div
      #modalElement
      role="document"
      class="ant-modal"
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
                        '[class.ant-modal-wrap-rtl]': `dir === 'rtl'`,
                        '[class.ant-modal-centered]': 'config.nzCentered',
                        '[style.zIndex]': 'config.nzZIndex',
                        '[@.disabled]': 'config.nzNoAnimation',
                        '[@modalContainer]': 'state',
                        '(@modalContainer.start)': 'onAnimationStart($event)',
                        '(@modalContainer.done)': 'onAnimationDone($event)',
                        '(click)': 'onContainerClick($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i1.FocusTrapFactory }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i2.OverlayRef }, { type: i3.NzConfigService }, { type: i4.ModalOptions }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; }, propDecorators: { portalOutlet: [{
                type: ViewChild,
                args: [CdkPortalOutlet, { static: true }]
            }], modalElementRef: [{
                type: ViewChild,
                args: ['modalElement', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULE1BQU0sRUFHTixRQUFRLEVBRVIsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBSzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7Ozs7Ozs7QUFpRDFFLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSwyQkFBMkI7SUFHeEUsWUFDRSxNQUFjLEVBQ2QsSUFBNkIsRUFDN0IsZ0JBQWtDLEVBQ2xDLEdBQXNCLEVBQ3RCLE1BQWlCLEVBQ2pCLFVBQXNCLEVBQ3RCLGVBQWdDLEVBQ2hCLE1BQW9CLEVBQ04sUUFBbUIsRUFDTixhQUFxQjtRQUVoRSxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUpqRyxXQUFNLEdBQU4sTUFBTSxDQUFjO0lBS3RDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNqRCxDQUFDOztzSEFwQlUseUJBQXlCLGlQQVlkLFFBQVEsNkJBQ1IscUJBQXFCOzBHQWJoQyx5QkFBeUIsNG5CQUN6QixlQUFlLHFPQTVDaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5QlQsdzFCQUNXLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDOzJGQWlCbkMseUJBQXlCO2tCQTlDckMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5QlQ7b0JBQ0QsVUFBVSxFQUFFLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDO29CQUM5QywwRkFBMEY7b0JBQzFGLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO29CQUNoRCxJQUFJLEVBQUU7d0JBQ0osUUFBUSxFQUFFLElBQUk7d0JBQ2QsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsU0FBUyxFQUFFLHdGQUF3Rjt3QkFDbkcsNEJBQTRCLEVBQUUsZUFBZTt3QkFDN0MsNEJBQTRCLEVBQUUsbUJBQW1CO3dCQUNqRCxnQkFBZ0IsRUFBRSxpQkFBaUI7d0JBQ25DLGNBQWMsRUFBRSxzQkFBc0I7d0JBQ3RDLG1CQUFtQixFQUFFLE9BQU87d0JBQzVCLHlCQUF5QixFQUFFLDBCQUEwQjt3QkFDckQsd0JBQXdCLEVBQUUseUJBQXlCO3dCQUNuRCxTQUFTLEVBQUUsMEJBQTBCO3FCQUN0QztpQkFDRjs7MEJBYUksUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxRQUFROzswQkFDM0IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxxQkFBcUI7NENBWlksWUFBWTtzQkFBbEUsU0FBUzt1QkFBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUNVLGVBQWU7c0JBQXBFLFNBQVM7dUJBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEZvY3VzVHJhcEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ2RrUG9ydGFsT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBOZ1pvbmUsXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQU5JTUFUSU9OX01PRFVMRV9UWVBFIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxuaW1wb3J0IHsgTnpDb25maWdTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBuek1vZGFsQW5pbWF0aW9ucyB9IGZyb20gJy4vbW9kYWwtYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBCYXNlTW9kYWxDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWNvbnRhaW5lci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTW9kYWxPcHRpb25zIH0gZnJvbSAnLi9tb2RhbC10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LW1vZGFsLWNvbnRhaW5lcicsXG4gIGV4cG9ydEFzOiAnbnpNb2RhbENvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgI21vZGFsRWxlbWVudFxuICAgICAgcm9sZT1cImRvY3VtZW50XCJcbiAgICAgIGNsYXNzPVwiYW50LW1vZGFsXCJcbiAgICAgIFtuZ0NsYXNzXT1cImNvbmZpZy5uekNsYXNzTmFtZSFcIlxuICAgICAgW25nU3R5bGVdPVwiY29uZmlnLm56U3R5bGUhXCJcbiAgICAgIFtzdHlsZS53aWR0aF09XCJjb25maWc/Lm56V2lkdGghIHwgbnpUb0Nzc1VuaXRcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtbW9kYWwtY29udGVudFwiPlxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiY29uZmlnLm56Q2xvc2FibGVcIiBuei1tb2RhbC1jbG9zZSAoY2xpY2spPVwib25DbG9zZUNsaWNrKClcIj48L2J1dHRvbj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImNvbmZpZy5uelRpdGxlXCIgbnotbW9kYWwtdGl0bGU+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtbW9kYWwtYm9keVwiIFtuZ1N0eWxlXT1cImNvbmZpZy5uekJvZHlTdHlsZSFcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgY2RrUG9ydGFsT3V0bGV0PjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImlzU3RyaW5nQ29udGVudFwiIFtpbm5lckhUTUxdPVwiY29uZmlnLm56Q29udGVudFwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICpuZ0lmPVwiY29uZmlnLm56Rm9vdGVyICE9PSBudWxsXCJcbiAgICAgICAgICBuei1tb2RhbC1mb290ZXJcbiAgICAgICAgICBbbW9kYWxSZWZdPVwibW9kYWxSZWZcIlxuICAgICAgICAgIChjYW5jZWxUcmlnZ2VyZWQpPVwib25DbG9zZUNsaWNrKClcIlxuICAgICAgICAgIChva1RyaWdnZXJlZCk9XCJvbk9rQ2xpY2soKVwiXG4gICAgICAgID48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBhbmltYXRpb25zOiBbbnpNb2RhbEFuaW1hdGlvbnMubW9kYWxDb250YWluZXJdLFxuICAvLyBVc2luZyBPblB1c2ggZm9yIG1vZGFsIGNhdXNlZCBmb290ZXIgY2FuIG5vdCB0byBkZXRlY3QgY2hhbmdlcy4gd2UgY2FuIGZpeCBpdCB3aGVuIDgueC5cbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBob3N0OiB7XG4gICAgdGFiaW5kZXg6ICctMScsXG4gICAgcm9sZTogJ2RpYWxvZycsXG4gICAgJ1tjbGFzc10nOiAnY29uZmlnLm56V3JhcENsYXNzTmFtZSA/IFwiYW50LW1vZGFsLXdyYXAgXCIgKyBjb25maWcubnpXcmFwQ2xhc3NOYW1lIDogXCJhbnQtbW9kYWwtd3JhcFwiJyxcbiAgICAnW2NsYXNzLmFudC1tb2RhbC13cmFwLXJ0bF0nOiBgZGlyID09PSAncnRsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtbW9kYWwtY2VudGVyZWRdJzogJ2NvbmZpZy5uekNlbnRlcmVkJyxcbiAgICAnW3N0eWxlLnpJbmRleF0nOiAnY29uZmlnLm56WkluZGV4JyxcbiAgICAnW0AuZGlzYWJsZWRdJzogJ2NvbmZpZy5uek5vQW5pbWF0aW9uJyxcbiAgICAnW0Btb2RhbENvbnRhaW5lcl0nOiAnc3RhdGUnLFxuICAgICcoQG1vZGFsQ29udGFpbmVyLnN0YXJ0KSc6ICdvbkFuaW1hdGlvblN0YXJ0KCRldmVudCknLFxuICAgICcoQG1vZGFsQ29udGFpbmVyLmRvbmUpJzogJ29uQW5pbWF0aW9uRG9uZSgkZXZlbnQpJyxcbiAgICAnKGNsaWNrKSc6ICdvbkNvbnRhaW5lckNsaWNrKCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpNb2RhbENvbnRhaW5lckNvbXBvbmVudCBleHRlbmRzIEJhc2VNb2RhbENvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoQ2RrUG9ydGFsT3V0bGV0LCB7IHN0YXRpYzogdHJ1ZSB9KSBvdmVycmlkZSBwb3J0YWxPdXRsZXQhOiBDZGtQb3J0YWxPdXRsZXQ7XG4gIEBWaWV3Q2hpbGQoJ21vZGFsRWxlbWVudCcsIHsgc3RhdGljOiB0cnVlIH0pIG92ZXJyaWRlIG1vZGFsRWxlbWVudFJlZiE6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuICBjb25zdHJ1Y3RvcihcbiAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICBob3N0OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBmb2N1c1RyYXBGYWN0b3J5OiBGb2N1c1RyYXBGYWN0b3J5LFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcmVuZGVyOiBSZW5kZXJlcjIsXG4gICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcbiAgICBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBwdWJsaWMgb3ZlcnJpZGUgY29uZmlnOiBNb2RhbE9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IE56U2FmZUFueSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uVHlwZTogc3RyaW5nXG4gICkge1xuICAgIHN1cGVyKG5nWm9uZSwgaG9zdCwgZm9jdXNUcmFwRmFjdG9yeSwgY2RyLCByZW5kZXIsIG92ZXJsYXlSZWYsIG56Q29uZmlnU2VydmljZSwgY29uZmlnLCBkb2N1bWVudCwgYW5pbWF0aW9uVHlwZSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldHVwTW91c2VMaXN0ZW5lcnModGhpcy5tb2RhbEVsZW1lbnRSZWYpO1xuICB9XG59XG4iXX0=