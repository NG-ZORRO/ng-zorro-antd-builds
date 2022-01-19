import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Host, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { collapseMotion } from 'ng-zorro-antd/core/animation';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "./collapse.component";
import * as i3 from "ng-zorro-antd/core/no-animation";
import * as i4 from "@angular/common";
import * as i5 from "ng-zorro-antd/core/outlet";
import * as i6 from "ng-zorro-antd/icon";
const NZ_CONFIG_MODULE_NAME = 'collapsePanel';
export class NzCollapsePanelComponent {
    constructor(nzConfigService, cdr, nzCollapseComponent, noAnimation) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.nzCollapseComponent = nzCollapseComponent;
        this.noAnimation = noAnimation;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzActive = false;
        this.nzDisabled = false;
        this.nzShowArrow = true;
        this.nzActiveChange = new EventEmitter();
        this.destroy$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    clickHeader() {
        if (!this.nzDisabled) {
            this.nzCollapseComponent.click(this);
        }
    }
    markForCheck() {
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.nzCollapseComponent.addPanel(this);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.nzCollapseComponent.removePanel(this);
    }
}
NzCollapsePanelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCollapsePanelComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ChangeDetectorRef }, { token: i2.NzCollapseComponent, host: true }, { token: i3.NzNoAnimationDirective, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzCollapsePanelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCollapsePanelComponent, selector: "nz-collapse-panel", inputs: { nzActive: "nzActive", nzDisabled: "nzDisabled", nzShowArrow: "nzShowArrow", nzExtra: "nzExtra", nzHeader: "nzHeader", nzExpandedIcon: "nzExpandedIcon" }, outputs: { nzActiveChange: "nzActiveChange" }, host: { properties: { "class.ant-collapse-no-arrow": "!nzShowArrow", "class.ant-collapse-item-active": "nzActive", "class.ant-collapse-item-disabled": "nzDisabled" }, classAttribute: "ant-collapse-item" }, exportAs: ["nzCollapsePanel"], ngImport: i0, template: `
    <div role="button" [attr.aria-expanded]="nzActive" class="ant-collapse-header" (click)="clickHeader()">
      <div *ngIf="nzShowArrow">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; let expandedIcon">
          <i nz-icon [nzType]="expandedIcon || 'right'" class="ant-collapse-arrow" [nzRotate]="nzActive ? 90 : 0"></i>
        </ng-container>
      </div>
      <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
      <div class="ant-collapse-extra" *ngIf="nzExtra">
        <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
      </div>
    </div>
    <div
      class="ant-collapse-content"
      [class.ant-collapse-content-active]="nzActive"
      [@.disabled]="noAnimation?.nzNoAnimation"
      [@collapseMotion]="nzActive ? 'expanded' : 'hidden'"
    >
      <div class="ant-collapse-content-box">
        <ng-content></ng-content>
      </div>
    </div>
  `, isInline: true, directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], animations: [collapseMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzCollapsePanelComponent.prototype, "nzActive", void 0);
__decorate([
    InputBoolean()
], NzCollapsePanelComponent.prototype, "nzDisabled", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzCollapsePanelComponent.prototype, "nzShowArrow", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCollapsePanelComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-collapse-panel',
                    exportAs: 'nzCollapsePanel',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    animations: [collapseMotion],
                    template: `
    <div role="button" [attr.aria-expanded]="nzActive" class="ant-collapse-header" (click)="clickHeader()">
      <div *ngIf="nzShowArrow">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; let expandedIcon">
          <i nz-icon [nzType]="expandedIcon || 'right'" class="ant-collapse-arrow" [nzRotate]="nzActive ? 90 : 0"></i>
        </ng-container>
      </div>
      <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
      <div class="ant-collapse-extra" *ngIf="nzExtra">
        <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
      </div>
    </div>
    <div
      class="ant-collapse-content"
      [class.ant-collapse-content-active]="nzActive"
      [@.disabled]="noAnimation?.nzNoAnimation"
      [@collapseMotion]="nzActive ? 'expanded' : 'hidden'"
    >
      <div class="ant-collapse-content-box">
        <ng-content></ng-content>
      </div>
    </div>
  `,
                    host: {
                        class: 'ant-collapse-item',
                        '[class.ant-collapse-no-arrow]': '!nzShowArrow',
                        '[class.ant-collapse-item-active]': 'nzActive',
                        '[class.ant-collapse-item-disabled]': 'nzDisabled'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ChangeDetectorRef }, { type: i2.NzCollapseComponent, decorators: [{
                    type: Host
                }] }, { type: i3.NzNoAnimationDirective, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzActive: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzShowArrow: [{
                type: Input
            }], nzExtra: [{
                type: Input
            }], nzHeader: [{
                type: Input
            }], nzExpandedIcon: [{
                type: Input
            }], nzActiveChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UtcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9jb2xsYXBzZS9jb2xsYXBzZS1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixJQUFJLEVBQ0osS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBRU4saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQWdDLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR3JGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7Ozs7QUFJdkQsTUFBTSxxQkFBcUIsR0FBZ0IsZUFBZSxDQUFDO0FBdUMzRCxNQUFNLE9BQU8sd0JBQXdCO0lBd0JuQyxZQUNTLGVBQWdDLEVBQy9CLEdBQXNCLEVBQ2QsbUJBQXdDLEVBQ3JDLFdBQW9DO1FBSGhELG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUMvQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUNkLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDckMsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBM0JoRCxrQkFBYSxHQUFnQixxQkFBcUIsQ0FBQztRQUtuQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDTCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUloRCxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDeEQsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFpQi9CLElBQUksQ0FBQyxlQUFlO2FBQ2pCLGdDQUFnQyxDQUFDLHFCQUFxQixDQUFDO2FBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXRCRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBZ0JELFFBQVE7UUFDTixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7cUhBOUNVLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLHlmQS9CekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQlQsNGRBdkJXLENBQUMsY0FBYyxDQUFDO0FBc0NIO0lBQWYsWUFBWSxFQUFFOzBEQUFrQjtBQUNqQjtJQUFmLFlBQVksRUFBRTs0REFBb0I7QUFDTDtJQUE3QixVQUFVLEVBQUU7SUFBRSxZQUFZLEVBQUU7NkRBQTZCOzJGQVJ4RCx3QkFBd0I7a0JBckNwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsVUFBVSxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQlQ7b0JBRUQsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxtQkFBbUI7d0JBQzFCLCtCQUErQixFQUFFLGNBQWM7d0JBQy9DLGtDQUFrQyxFQUFFLFVBQVU7d0JBQzlDLG9DQUFvQyxFQUFFLFlBQVk7cUJBQ25EO2lCQUNGOzswQkE0QkksSUFBSTs7MEJBQ0osUUFBUTs0Q0F0QmMsUUFBUTtzQkFBaEMsS0FBSztnQkFDbUIsVUFBVTtzQkFBbEMsS0FBSztnQkFDaUMsV0FBVztzQkFBakQsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNhLGNBQWM7c0JBQWhDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgY29sbGFwc2VNb3Rpb24gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvYW5pbWF0aW9uJztcbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IE56Tm9BbmltYXRpb25EaXJlY3RpdmUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56Q29sbGFwc2VDb21wb25lbnQgfSBmcm9tICcuL2NvbGxhcHNlLmNvbXBvbmVudCc7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnY29sbGFwc2VQYW5lbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWNvbGxhcHNlLXBhbmVsJyxcbiAgZXhwb3J0QXM6ICduekNvbGxhcHNlUGFuZWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgYW5pbWF0aW9uczogW2NvbGxhcHNlTW90aW9uXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IHJvbGU9XCJidXR0b25cIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIm56QWN0aXZlXCIgY2xhc3M9XCJhbnQtY29sbGFwc2UtaGVhZGVyXCIgKGNsaWNrKT1cImNsaWNrSGVhZGVyKClcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCJuelNob3dBcnJvd1wiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpFeHBhbmRlZEljb247IGxldCBleHBhbmRlZEljb25cIj5cbiAgICAgICAgICA8aSBuei1pY29uIFtuelR5cGVdPVwiZXhwYW5kZWRJY29uIHx8ICdyaWdodCdcIiBjbGFzcz1cImFudC1jb2xsYXBzZS1hcnJvd1wiIFtuelJvdGF0ZV09XCJuekFjdGl2ZSA/IDkwIDogMFwiPjwvaT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekhlYWRlclwiPnt7IG56SGVhZGVyIH19PC9uZy1jb250YWluZXI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LWNvbGxhcHNlLWV4dHJhXCIgKm5nSWY9XCJuekV4dHJhXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekV4dHJhXCI+e3sgbnpFeHRyYSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJhbnQtY29sbGFwc2UtY29udGVudFwiXG4gICAgICBbY2xhc3MuYW50LWNvbGxhcHNlLWNvbnRlbnQtYWN0aXZlXT1cIm56QWN0aXZlXCJcbiAgICAgIFtALmRpc2FibGVkXT1cIm5vQW5pbWF0aW9uPy5uek5vQW5pbWF0aW9uXCJcbiAgICAgIFtAY29sbGFwc2VNb3Rpb25dPVwibnpBY3RpdmUgPyAnZXhwYW5kZWQnIDogJ2hpZGRlbidcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtY29sbGFwc2UtY29udGVudC1ib3hcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG5cbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LWNvbGxhcHNlLWl0ZW0nLFxuICAgICdbY2xhc3MuYW50LWNvbGxhcHNlLW5vLWFycm93XSc6ICchbnpTaG93QXJyb3cnLFxuICAgICdbY2xhc3MuYW50LWNvbGxhcHNlLWl0ZW0tYWN0aXZlXSc6ICduekFjdGl2ZScsXG4gICAgJ1tjbGFzcy5hbnQtY29sbGFwc2UtaXRlbS1kaXNhYmxlZF0nOiAnbnpEaXNhYmxlZCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekNvbGxhcHNlUGFuZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHJlYWRvbmx5IF9uek1vZHVsZU5hbWU6IE56Q29uZmlnS2V5ID0gTlpfQ09ORklHX01PRFVMRV9OQU1FO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpBY3RpdmU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd0Fycm93OiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56QWN0aXZlID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0Qm9vbGVhbigpIG56U2hvd0Fycm93OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgbnpFeHRyYT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuekhlYWRlcj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuekV4cGFuZGVkSWNvbj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpBY3RpdmVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBjbGlja0hlYWRlcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgdGhpcy5uekNvbGxhcHNlQ29tcG9uZW50LmNsaWNrKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEhvc3QoKSBwcml2YXRlIG56Q29sbGFwc2VDb21wb25lbnQ6IE56Q29sbGFwc2VDb21wb25lbnQsXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZVxuICApIHtcbiAgICB0aGlzLm56Q29uZmlnU2VydmljZVxuICAgICAgLmdldENvbmZpZ0NoYW5nZUV2ZW50Rm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uekNvbGxhcHNlQ29tcG9uZW50LmFkZFBhbmVsKHRoaXMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIHRoaXMubnpDb2xsYXBzZUNvbXBvbmVudC5yZW1vdmVQYW5lbCh0aGlzKTtcbiAgfVxufVxuIl19