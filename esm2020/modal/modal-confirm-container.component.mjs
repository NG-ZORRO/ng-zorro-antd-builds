import { CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Optional, Output, ViewChild } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { takeUntil } from 'rxjs/operators';
import { nzModalAnimations } from './modal-animations';
import { BaseModalContainerComponent } from './modal-container.directive';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/i18n";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "@angular/cdk/overlay";
import * as i4 from "ng-zorro-antd/core/config";
import * as i5 from "./modal-types";
import * as i6 from "./modal-close.component";
import * as i7 from "ng-zorro-antd/button";
import * as i8 from "@angular/common";
import * as i9 from "ng-zorro-antd/core/transition-patch";
import * as i10 from "ng-zorro-antd/icon";
import * as i11 from "ng-zorro-antd/core/outlet";
import * as i12 from "@angular/cdk/portal";
import * as i13 from "ng-zorro-antd/core/wave";
import * as i14 from "ng-zorro-antd/pipes";
export class NzModalConfirmContainerComponent extends BaseModalContainerComponent {
    constructor(ngZone, i18n, host, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType) {
        super(ngZone, host, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType);
        this.i18n = i18n;
        this.config = config;
        this.cancelTriggered = new EventEmitter();
        this.okTriggered = new EventEmitter();
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Modal');
        });
    }
    ngOnInit() {
        this.setupMouseListeners(this.modalElementRef);
    }
    onCancel() {
        this.cancelTriggered.emit();
    }
    onOk() {
        this.okTriggered.emit();
    }
}
NzModalConfirmContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalConfirmContainerComponent, deps: [{ token: i0.NgZone }, { token: i1.NzI18nService }, { token: i0.ElementRef }, { token: i2.FocusTrapFactory }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i3.OverlayRef }, { token: i4.NzConfigService }, { token: i5.ModalOptions }, { token: DOCUMENT, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzModalConfirmContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzModalConfirmContainerComponent, selector: "nz-modal-confirm-container", outputs: { cancelTriggered: "cancelTriggered", okTriggered: "okTriggered" }, host: { attributes: { "tabindex": "-1", "role": "dialog" }, listeners: { "@modalContainer.start": "onAnimationStart($event)", "@modalContainer.done": "onAnimationDone($event)", "click": "onContainerClick($event)" }, properties: { "class": "config.nzWrapClassName ? \"ant-modal-wrap \" + config.nzWrapClassName : \"ant-modal-wrap\"", "class.ant-modal-wrap-rtl": "dir === 'rtl'", "class.ant-modal-centered": "config.nzCentered", "style.zIndex": "config.nzZIndex", "@.disabled": "config.nzNoAnimation", "@modalContainer": "state" } }, viewQueries: [{ propertyName: "portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }, { propertyName: "modalElementRef", first: true, predicate: ["modalElement"], descendants: true, static: true }], exportAs: ["nzModalConfirmContainer"], usesInheritance: true, ngImport: i0, template: `
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
        <div class="ant-modal-body" [ngStyle]="config.nzBodyStyle!">
          <div class="ant-modal-confirm-body-wrapper">
            <div class="ant-modal-confirm-body">
              <i nz-icon [nzType]="config.nzIconType!"></i>
              <span class="ant-modal-confirm-title">
                <ng-container *nzStringTemplateOutlet="config.nzTitle">
                  <span [innerHTML]="config.nzTitle"></span>
                </ng-container>
              </span>
              <div class="ant-modal-confirm-content">
                <ng-template cdkPortalOutlet></ng-template>
                <div *ngIf="isStringContent" [innerHTML]="config.nzContent"></div>
              </div>
            </div>
            <div class="ant-modal-confirm-btns">
              <button
                *ngIf="config.nzCancelText !== null"
                [attr.cdkFocusInitial]="config.nzAutofocus === 'cancel' || null"
                nz-button
                (click)="onCancel()"
                [nzLoading]="!!config.nzCancelLoading"
                [disabled]="config.nzCancelDisabled"
              >
                {{ config.nzCancelText || locale.cancelText }}
              </button>
              <button
                *ngIf="config.nzOkText !== null"
                [attr.cdkFocusInitial]="config.nzAutofocus === 'ok' || null"
                nz-button
                [nzType]="config.nzOkType!"
                (click)="onOk()"
                [nzLoading]="!!config.nzOkLoading"
                [disabled]="config.nzOkDisabled"
                [nzDanger]="config.nzOkDanger"
              >
                {{ config.nzOkText || locale.okText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, isInline: true, components: [{ type: i6.NzModalCloseComponent, selector: "button[nz-modal-close]", exportAs: ["NzModalCloseBuiltin"] }, { type: i7.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }], directives: [{ type: i8.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i8.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i9.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i10.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i11.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i12.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }, { type: i13.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }], pipes: { "nzToCssUnit": i14.NzToCssUnitPipe }, animations: [nzModalAnimations.modalContainer], changeDetection: i0.ChangeDetectionStrategy.Default });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalConfirmContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-modal-confirm-container',
                    exportAs: 'nzModalConfirmContainer',
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
        <div class="ant-modal-body" [ngStyle]="config.nzBodyStyle!">
          <div class="ant-modal-confirm-body-wrapper">
            <div class="ant-modal-confirm-body">
              <i nz-icon [nzType]="config.nzIconType!"></i>
              <span class="ant-modal-confirm-title">
                <ng-container *nzStringTemplateOutlet="config.nzTitle">
                  <span [innerHTML]="config.nzTitle"></span>
                </ng-container>
              </span>
              <div class="ant-modal-confirm-content">
                <ng-template cdkPortalOutlet></ng-template>
                <div *ngIf="isStringContent" [innerHTML]="config.nzContent"></div>
              </div>
            </div>
            <div class="ant-modal-confirm-btns">
              <button
                *ngIf="config.nzCancelText !== null"
                [attr.cdkFocusInitial]="config.nzAutofocus === 'cancel' || null"
                nz-button
                (click)="onCancel()"
                [nzLoading]="!!config.nzCancelLoading"
                [disabled]="config.nzCancelDisabled"
              >
                {{ config.nzCancelText || locale.cancelText }}
              </button>
              <button
                *ngIf="config.nzOkText !== null"
                [attr.cdkFocusInitial]="config.nzAutofocus === 'ok' || null"
                nz-button
                [nzType]="config.nzOkType!"
                (click)="onOk()"
                [nzLoading]="!!config.nzOkLoading"
                [disabled]="config.nzOkDisabled"
                [nzDanger]="config.nzOkDanger"
              >
                {{ config.nzOkText || locale.okText }}
              </button>
            </div>
          </div>
        </div>
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
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i1.NzI18nService }, { type: i0.ElementRef }, { type: i2.FocusTrapFactory }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i3.OverlayRef }, { type: i4.NzConfigService }, { type: i5.ModalOptions }, { type: undefined, decorators: [{
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
            }], cancelTriggered: [{
                type: Output
            }], okTriggered: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29uZmlybS1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9tb2RhbC9tb2RhbC1jb25maXJtLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBRU4sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU0zQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQTZFMUUsTUFBTSxPQUFPLGdDQUFpQyxTQUFRLDJCQUEyQjtJQU8vRSxZQUNFLE1BQWMsRUFDTixJQUFtQixFQUMzQixJQUE2QixFQUM3QixnQkFBa0MsRUFDbEMsR0FBc0IsRUFDdEIsTUFBaUIsRUFDakIsVUFBc0IsRUFDdEIsZUFBZ0MsRUFDaEIsTUFBb0IsRUFDTixRQUFtQixFQUNOLGFBQXFCO1FBRWhFLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBWHpHLFNBQUksR0FBSixJQUFJLENBQWU7UUFPWCxXQUFNLEdBQU4sTUFBTSxDQUFjO1FBYlYsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzNDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQWtCakUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ25FLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs2SEFyQ1UsZ0NBQWdDLDhRQWlCckIsUUFBUSw2QkFDUixxQkFBcUI7aUhBbEJoQyxnQ0FBZ0MsaXRCQUNoQyxlQUFlLDRPQXhFaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcURULDYvQ0FDVyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQzsyRkFpQm5DLGdDQUFnQztrQkExRTVDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFEVDtvQkFDRCxVQUFVLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUM7b0JBQzlDLDBGQUEwRjtvQkFDMUYsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87b0JBQ2hELElBQUksRUFBRTt3QkFDSixRQUFRLEVBQUUsSUFBSTt3QkFDZCxJQUFJLEVBQUUsUUFBUTt3QkFDZCxTQUFTLEVBQUUsd0ZBQXdGO3dCQUNuRyw0QkFBNEIsRUFBRSxlQUFlO3dCQUM3Qyw0QkFBNEIsRUFBRSxtQkFBbUI7d0JBQ2pELGdCQUFnQixFQUFFLGlCQUFpQjt3QkFDbkMsY0FBYyxFQUFFLHNCQUFzQjt3QkFDdEMsbUJBQW1CLEVBQUUsT0FBTzt3QkFDNUIseUJBQXlCLEVBQUUsMEJBQTBCO3dCQUNyRCx3QkFBd0IsRUFBRSx5QkFBeUI7d0JBQ25ELFNBQVMsRUFBRSwwQkFBMEI7cUJBQ3RDO2lCQUNGOzswQkFrQkksUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxRQUFROzswQkFDM0IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxxQkFBcUI7NENBakJZLFlBQVk7c0JBQWxFLFNBQVM7dUJBQUMsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDVSxlQUFlO3NCQUFwRSxTQUFTO3VCQUFDLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQ2YsZUFBZTtzQkFBMUMsTUFBTTtnQkFDcUIsV0FBVztzQkFBdEMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEZvY3VzVHJhcEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ2RrUG9ydGFsT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFOSU1BVElPTl9NT0RVTEVfVFlQRSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56Q29uZmlnU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UsIE56TW9kYWxJMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcblxuaW1wb3J0IHsgbnpNb2RhbEFuaW1hdGlvbnMgfSBmcm9tICcuL21vZGFsLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQmFzZU1vZGFsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1jb250YWluZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1vZGFsT3B0aW9ucyB9IGZyb20gJy4vbW9kYWwtdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1tb2RhbC1jb25maXJtLWNvbnRhaW5lcicsXG4gIGV4cG9ydEFzOiAnbnpNb2RhbENvbmZpcm1Db250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgICNtb2RhbEVsZW1lbnRcbiAgICAgIHJvbGU9XCJkb2N1bWVudFwiXG4gICAgICBjbGFzcz1cImFudC1tb2RhbFwiXG4gICAgICBbbmdDbGFzc109XCJjb25maWcubnpDbGFzc05hbWUhXCJcbiAgICAgIFtuZ1N0eWxlXT1cImNvbmZpZy5uelN0eWxlIVwiXG4gICAgICBbc3R5bGUud2lkdGhdPVwiY29uZmlnPy5ueldpZHRoISB8IG56VG9Dc3NVbml0XCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LW1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImNvbmZpZy5uekNsb3NhYmxlXCIgbnotbW9kYWwtY2xvc2UgKGNsaWNrKT1cIm9uQ2xvc2VDbGljaygpXCI+PC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtbW9kYWwtYm9keVwiIFtuZ1N0eWxlXT1cImNvbmZpZy5uekJvZHlTdHlsZSFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LW1vZGFsLWNvbmZpcm0tYm9keS13cmFwcGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LW1vZGFsLWNvbmZpcm0tYm9keVwiPlxuICAgICAgICAgICAgICA8aSBuei1pY29uIFtuelR5cGVdPVwiY29uZmlnLm56SWNvblR5cGUhXCI+PC9pPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFudC1tb2RhbC1jb25maXJtLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cImNvbmZpZy5uelRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImNvbmZpZy5uelRpdGxlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtbW9kYWwtY29uZmlybS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIGNka1BvcnRhbE91dGxldD48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc1N0cmluZ0NvbnRlbnRcIiBbaW5uZXJIVE1MXT1cImNvbmZpZy5uekNvbnRlbnRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtbW9kYWwtY29uZmlybS1idG5zXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5uekNhbmNlbFRleHQgIT09IG51bGxcIlxuICAgICAgICAgICAgICAgIFthdHRyLmNka0ZvY3VzSW5pdGlhbF09XCJjb25maWcubnpBdXRvZm9jdXMgPT09ICdjYW5jZWwnIHx8IG51bGxcIlxuICAgICAgICAgICAgICAgIG56LWJ1dHRvblxuICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNhbmNlbCgpXCJcbiAgICAgICAgICAgICAgICBbbnpMb2FkaW5nXT1cIiEhY29uZmlnLm56Q2FuY2VsTG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbmZpZy5uekNhbmNlbERpc2FibGVkXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt7IGNvbmZpZy5uekNhbmNlbFRleHQgfHwgbG9jYWxlLmNhbmNlbFRleHQgfX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5uek9rVGV4dCAhPT0gbnVsbFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuY2RrRm9jdXNJbml0aWFsXT1cImNvbmZpZy5uekF1dG9mb2N1cyA9PT0gJ29rJyB8fCBudWxsXCJcbiAgICAgICAgICAgICAgICBuei1idXR0b25cbiAgICAgICAgICAgICAgICBbbnpUeXBlXT1cImNvbmZpZy5uek9rVHlwZSFcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJvbk9rKClcIlxuICAgICAgICAgICAgICAgIFtuekxvYWRpbmddPVwiISFjb25maWcubnpPa0xvYWRpbmdcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb25maWcubnpPa0Rpc2FibGVkXCJcbiAgICAgICAgICAgICAgICBbbnpEYW5nZXJdPVwiY29uZmlnLm56T2tEYW5nZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3sgY29uZmlnLm56T2tUZXh0IHx8IGxvY2FsZS5va1RleHQgfX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgYW5pbWF0aW9uczogW256TW9kYWxBbmltYXRpb25zLm1vZGFsQ29udGFpbmVyXSxcbiAgLy8gVXNpbmcgT25QdXNoIGZvciBtb2RhbCBjYXVzZWQgZm9vdGVyIGNhbiBub3QgdG8gZGV0ZWN0IGNoYW5nZXMuIHdlIGNhbiBmaXggaXQgd2hlbiA4LnguXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgaG9zdDoge1xuICAgIHRhYmluZGV4OiAnLTEnLFxuICAgIHJvbGU6ICdkaWFsb2cnLFxuICAgICdbY2xhc3NdJzogJ2NvbmZpZy5ueldyYXBDbGFzc05hbWUgPyBcImFudC1tb2RhbC13cmFwIFwiICsgY29uZmlnLm56V3JhcENsYXNzTmFtZSA6IFwiYW50LW1vZGFsLXdyYXBcIicsXG4gICAgJ1tjbGFzcy5hbnQtbW9kYWwtd3JhcC1ydGxdJzogYGRpciA9PT0gJ3J0bCdgLFxuICAgICdbY2xhc3MuYW50LW1vZGFsLWNlbnRlcmVkXSc6ICdjb25maWcubnpDZW50ZXJlZCcsXG4gICAgJ1tzdHlsZS56SW5kZXhdJzogJ2NvbmZpZy5uelpJbmRleCcsXG4gICAgJ1tALmRpc2FibGVkXSc6ICdjb25maWcubnpOb0FuaW1hdGlvbicsXG4gICAgJ1tAbW9kYWxDb250YWluZXJdJzogJ3N0YXRlJyxcbiAgICAnKEBtb2RhbENvbnRhaW5lci5zdGFydCknOiAnb25BbmltYXRpb25TdGFydCgkZXZlbnQpJyxcbiAgICAnKEBtb2RhbENvbnRhaW5lci5kb25lKSc6ICdvbkFuaW1hdGlvbkRvbmUoJGV2ZW50KScsXG4gICAgJyhjbGljayknOiAnb25Db250YWluZXJDbGljaygkZXZlbnQpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TW9kYWxDb25maXJtQ29udGFpbmVyQ29tcG9uZW50IGV4dGVuZHMgQmFzZU1vZGFsQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChDZGtQb3J0YWxPdXRsZXQsIHsgc3RhdGljOiB0cnVlIH0pIG92ZXJyaWRlIHBvcnRhbE91dGxldCE6IENka1BvcnRhbE91dGxldDtcbiAgQFZpZXdDaGlsZCgnbW9kYWxFbGVtZW50JywgeyBzdGF0aWM6IHRydWUgfSkgb3ZlcnJpZGUgbW9kYWxFbGVtZW50UmVmITogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG4gIEBPdXRwdXQoKSBvdmVycmlkZSByZWFkb25seSBjYW5jZWxUcmlnZ2VyZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBvdmVycmlkZSByZWFkb25seSBva1RyaWdnZXJlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgbG9jYWxlITogTnpNb2RhbEkxOG5JbnRlcmZhY2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBpMThuOiBOekkxOG5TZXJ2aWNlLFxuICAgIGhvc3Q6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIGZvY3VzVHJhcEZhY3Rvcnk6IEZvY3VzVHJhcEZhY3RvcnksXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICByZW5kZXI6IFJlbmRlcmVyMixcbiAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmLFxuICAgIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHB1YmxpYyBvdmVycmlkZSBjb25maWc6IE1vZGFsT3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogTnpTYWZlQW55LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25UeXBlOiBzdHJpbmdcbiAgKSB7XG4gICAgc3VwZXIobmdab25lLCBob3N0LCBmb2N1c1RyYXBGYWN0b3J5LCBjZHIsIHJlbmRlciwgb3ZlcmxheVJlZiwgbnpDb25maWdTZXJ2aWNlLCBjb25maWcsIGRvY3VtZW50LCBhbmltYXRpb25UeXBlKTtcblxuICAgIHRoaXMuaTE4bi5sb2NhbGVDaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmxvY2FsZSA9IHRoaXMuaTE4bi5nZXRMb2NhbGVEYXRhKCdNb2RhbCcpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXR1cE1vdXNlTGlzdGVuZXJzKHRoaXMubW9kYWxFbGVtZW50UmVmKTtcbiAgfVxuXG4gIG9uQ2FuY2VsKCk6IHZvaWQge1xuICAgIHRoaXMuY2FuY2VsVHJpZ2dlcmVkLmVtaXQoKTtcbiAgfVxuXG4gIG9uT2soKTogdm9pZCB7XG4gICAgdGhpcy5va1RyaWdnZXJlZC5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==