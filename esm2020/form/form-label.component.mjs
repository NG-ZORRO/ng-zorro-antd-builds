import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, Optional, SkipSelf, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { InputBoolean, toBoolean } from 'ng-zorro-antd/core/util';
import { DefaultTooltipIcon } from './form.directive';
import * as i0 from "@angular/core";
import * as i1 from "./form.directive";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/tooltip";
import * as i4 from "ng-zorro-antd/core/outlet";
import * as i5 from "ng-zorro-antd/icon";
function toTooltipIcon(value) {
    const icon = typeof value === 'string' ? { type: value } : value;
    return { ...DefaultTooltipIcon, ...icon };
}
export class NzFormLabelComponent {
    constructor(elementRef, renderer, cdr, nzFormDirective) {
        this.cdr = cdr;
        this.nzFormDirective = nzFormDirective;
        this.nzRequired = false;
        this.noColon = 'default';
        this._tooltipIcon = 'default';
        this.destroy$ = new Subject();
        renderer.addClass(elementRef.nativeElement, 'ant-form-item-label');
        if (this.nzFormDirective) {
            this.nzFormDirective
                .getInputObservable('nzNoColon')
                .pipe(filter(() => this.noColon === 'default'), takeUntil(this.destroy$))
                .subscribe(() => this.cdr.markForCheck());
            this.nzFormDirective
                .getInputObservable('nzTooltipIcon')
                .pipe(filter(() => this._tooltipIcon === 'default'), takeUntil(this.destroy$))
                .subscribe(() => this.cdr.markForCheck());
        }
    }
    set nzNoColon(value) {
        this.noColon = toBoolean(value);
    }
    get nzNoColon() {
        return this.noColon !== 'default' ? this.noColon : this.nzFormDirective?.nzNoColon;
    }
    set nzTooltipIcon(value) {
        this._tooltipIcon = toTooltipIcon(value);
    }
    // due to 'get' and 'set' accessor must have the same type, so it was renamed to `tooltipIcon`
    get tooltipIcon() {
        return this._tooltipIcon !== 'default'
            ? this._tooltipIcon
            : toTooltipIcon(this.nzFormDirective?.nzTooltipIcon || DefaultTooltipIcon);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzFormLabelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFormLabelComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i1.NzFormDirective, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.Component });
NzFormLabelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzFormLabelComponent, selector: "nz-form-label", inputs: { nzFor: "nzFor", nzRequired: "nzRequired", nzNoColon: "nzNoColon", nzTooltipTitle: "nzTooltipTitle", nzTooltipIcon: "nzTooltipIcon" }, exportAs: ["nzFormLabel"], ngImport: i0, template: `
    <label [attr.for]="nzFor" [class.ant-form-item-no-colon]="nzNoColon" [class.ant-form-item-required]="nzRequired">
      <ng-content></ng-content>
      <span *ngIf="nzTooltipTitle" class="ant-form-item-tooltip" nz-tooltip [nzTooltipTitle]="nzTooltipTitle">
        <ng-container *nzStringTemplateOutlet="tooltipIcon.type; let tooltipIconType">
          <i nz-icon [nzType]="tooltipIconType" [nzTheme]="tooltipIcon.theme"></i>
        </ng-container>
      </span>
    </label>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { type: i4.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i5.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzFormLabelComponent.prototype, "nzRequired", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFormLabelComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-form-label',
                    exportAs: 'nzFormLabel',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <label [attr.for]="nzFor" [class.ant-form-item-no-colon]="nzNoColon" [class.ant-form-item-required]="nzRequired">
      <ng-content></ng-content>
      <span *ngIf="nzTooltipTitle" class="ant-form-item-tooltip" nz-tooltip [nzTooltipTitle]="nzTooltipTitle">
        <ng-container *nzStringTemplateOutlet="tooltipIcon.type; let tooltipIconType">
          <i nz-icon [nzType]="tooltipIconType" [nzTheme]="tooltipIcon.theme"></i>
        </ng-container>
      </span>
    </label>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i1.NzFormDirective, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }]; }, propDecorators: { nzFor: [{
                type: Input
            }], nzRequired: [{
                type: Input
            }], nzNoColon: [{
                type: Input
            }], nzTooltipTitle: [{
                type: Input
            }], nzTooltipIcon: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2Zvcm0vZm9ybS1sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULEtBQUssRUFFTCxRQUFRLEVBRVIsUUFBUSxFQUNSLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQW1CLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7QUFPdkUsU0FBUyxhQUFhLENBQUMsS0FBaUM7SUFDdEQsTUFBTSxJQUFJLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2pFLE9BQU8sRUFBRSxHQUFHLGtCQUFrQixFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDNUMsQ0FBQztBQW1CRCxNQUFNLE9BQU8sb0JBQW9CO0lBK0IvQixZQUNFLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ1gsR0FBc0IsRUFDRSxlQUFnQztRQUR4RCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUNFLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQTlCekMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQVNwQyxZQUFPLEdBQXdCLFNBQVMsQ0FBQztRQWF6QyxpQkFBWSxHQUFrQyxTQUFTLENBQUM7UUFFeEQsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFRL0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFFbkUsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxlQUFlO2lCQUNqQixrQkFBa0IsQ0FBQyxXQUFXLENBQUM7aUJBQy9CLElBQUksQ0FDSCxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsRUFDeEMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDekI7aUJBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUU1QyxJQUFJLENBQUMsZUFBZTtpQkFDakIsa0JBQWtCLENBQUMsZUFBZSxDQUFDO2lCQUNuQyxJQUFJLENBQ0gsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDLEVBQzdDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ3pCO2lCQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBbERELElBQ0ksU0FBUyxDQUFDLEtBQWM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDO0lBQ3JGLENBQUM7SUFLRCxJQUNJLGFBQWEsQ0FBQyxLQUFpQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0QsOEZBQThGO0lBQzlGLElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTO1lBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWTtZQUNuQixDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsYUFBYSxJQUFJLGtCQUFrQixDQUFDLENBQUM7SUFDL0UsQ0FBQztJQWdDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7O2lIQTdEVSxvQkFBb0I7cUdBQXBCLG9CQUFvQixnT0FYckI7Ozs7Ozs7OztHQVNUO0FBT3dCO0lBQWYsWUFBWSxFQUFFO3dEQUFvQjsyRkFMakMsb0JBQW9CO2tCQWpCaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDtpQkFDRjs7MEJBb0NJLFFBQVE7OzBCQUFJLFFBQVE7NENBL0JkLEtBQUs7c0JBQWIsS0FBSztnQkFDbUIsVUFBVTtzQkFBbEMsS0FBSztnQkFFRixTQUFTO3NCQURaLEtBQUs7Z0JBVUcsY0FBYztzQkFBdEIsS0FBSztnQkFFRixhQUFhO3NCQURoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFNraXBTZWxmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucy1hbmd1bGFyJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelRTVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIHRvQm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgRGVmYXVsdFRvb2x0aXBJY29uLCBOekZvcm1EaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0uZGlyZWN0aXZlJztcblxuZXhwb3J0IGludGVyZmFjZSBOekZvcm1Ub29sdGlwSWNvbiB7XG4gIHR5cGU6IE56VFNUeXBlO1xuICB0aGVtZTogVGhlbWVUeXBlO1xufVxuXG5mdW5jdGlvbiB0b1Rvb2x0aXBJY29uKHZhbHVlOiBzdHJpbmcgfCBOekZvcm1Ub29sdGlwSWNvbik6IFJlcXVpcmVkPE56Rm9ybVRvb2x0aXBJY29uPiB7XG4gIGNvbnN0IGljb24gPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8geyB0eXBlOiB2YWx1ZSB9IDogdmFsdWU7XG4gIHJldHVybiB7IC4uLkRlZmF1bHRUb29sdGlwSWNvbiwgLi4uaWNvbiB9O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1mb3JtLWxhYmVsJyxcbiAgZXhwb3J0QXM6ICduekZvcm1MYWJlbCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGFiZWwgW2F0dHIuZm9yXT1cIm56Rm9yXCIgW2NsYXNzLmFudC1mb3JtLWl0ZW0tbm8tY29sb25dPVwibnpOb0NvbG9uXCIgW2NsYXNzLmFudC1mb3JtLWl0ZW0tcmVxdWlyZWRdPVwibnpSZXF1aXJlZFwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPHNwYW4gKm5nSWY9XCJuelRvb2x0aXBUaXRsZVwiIGNsYXNzPVwiYW50LWZvcm0taXRlbS10b29sdGlwXCIgbnotdG9vbHRpcCBbbnpUb29sdGlwVGl0bGVdPVwibnpUb29sdGlwVGl0bGVcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cInRvb2x0aXBJY29uLnR5cGU7IGxldCB0b29sdGlwSWNvblR5cGVcIj5cbiAgICAgICAgICA8aSBuei1pY29uIFtuelR5cGVdPVwidG9vbHRpcEljb25UeXBlXCIgW256VGhlbWVdPVwidG9vbHRpcEljb24udGhlbWVcIj48L2k+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbGFiZWw+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpGb3JtTGFiZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpSZXF1aXJlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpOb0NvbG9uOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgbnpGb3I/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelJlcXVpcmVkID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHNldCBuek5vQ29sb24odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLm5vQ29sb24gPSB0b0Jvb2xlYW4odmFsdWUpO1xuICB9XG4gIGdldCBuek5vQ29sb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubm9Db2xvbiAhPT0gJ2RlZmF1bHQnID8gdGhpcy5ub0NvbG9uIDogdGhpcy5uekZvcm1EaXJlY3RpdmU/Lm56Tm9Db2xvbjtcbiAgfVxuXG4gIHByaXZhdGUgbm9Db2xvbjogYm9vbGVhbiB8ICdkZWZhdWx0JyA9ICdkZWZhdWx0JztcblxuICBASW5wdXQoKSBuelRvb2x0aXBUaXRsZT86IE56VFNUeXBlO1xuICBASW5wdXQoKVxuICBzZXQgbnpUb29sdGlwSWNvbih2YWx1ZTogc3RyaW5nIHwgTnpGb3JtVG9vbHRpcEljb24pIHtcbiAgICB0aGlzLl90b29sdGlwSWNvbiA9IHRvVG9vbHRpcEljb24odmFsdWUpO1xuICB9XG4gIC8vIGR1ZSB0byAnZ2V0JyBhbmQgJ3NldCcgYWNjZXNzb3IgbXVzdCBoYXZlIHRoZSBzYW1lIHR5cGUsIHNvIGl0IHdhcyByZW5hbWVkIHRvIGB0b29sdGlwSWNvbmBcbiAgZ2V0IHRvb2x0aXBJY29uKCk6IE56Rm9ybVRvb2x0aXBJY29uIHtcbiAgICByZXR1cm4gdGhpcy5fdG9vbHRpcEljb24gIT09ICdkZWZhdWx0J1xuICAgICAgPyB0aGlzLl90b29sdGlwSWNvblxuICAgICAgOiB0b1Rvb2x0aXBJY29uKHRoaXMubnpGb3JtRGlyZWN0aXZlPy5uelRvb2x0aXBJY29uIHx8IERlZmF1bHRUb29sdGlwSWNvbik7XG4gIH1cbiAgcHJpdmF0ZSBfdG9vbHRpcEljb246IE56Rm9ybVRvb2x0aXBJY29uIHwgJ2RlZmF1bHQnID0gJ2RlZmF1bHQnO1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcHJpdmF0ZSBuekZvcm1EaXJlY3RpdmU6IE56Rm9ybURpcmVjdGl2ZVxuICApIHtcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhbnQtZm9ybS1pdGVtLWxhYmVsJyk7XG5cbiAgICBpZiAodGhpcy5uekZvcm1EaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMubnpGb3JtRGlyZWN0aXZlXG4gICAgICAgIC5nZXRJbnB1dE9ic2VydmFibGUoJ256Tm9Db2xvbicpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLm5vQ29sb24gPT09ICdkZWZhdWx0JyksXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKSk7XG5cbiAgICAgIHRoaXMubnpGb3JtRGlyZWN0aXZlXG4gICAgICAgIC5nZXRJbnB1dE9ic2VydmFibGUoJ256VG9vbHRpcEljb24nKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5fdG9vbHRpcEljb24gPT09ICdkZWZhdWx0JyksXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=