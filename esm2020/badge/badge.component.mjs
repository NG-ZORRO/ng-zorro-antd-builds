import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Host, Input, Optional, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { zoomBadgeMotion } from 'ng-zorro-antd/core/animation';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { badgePresetColors } from './preset-colors';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "ng-zorro-antd/core/no-animation";
import * as i4 from "./badge-sup.component";
import * as i5 from "@angular/common";
import * as i6 from "ng-zorro-antd/core/outlet";
const NZ_CONFIG_MODULE_NAME = 'badge';
export class NzBadgeComponent {
    constructor(nzConfigService, renderer, cdr, elementRef, directionality, noAnimation) {
        this.nzConfigService = nzConfigService;
        this.renderer = renderer;
        this.cdr = cdr;
        this.elementRef = elementRef;
        this.directionality = directionality;
        this.noAnimation = noAnimation;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.showSup = false;
        this.presetColor = null;
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        this.nzShowZero = false;
        this.nzShowDot = true;
        this.nzStandalone = false;
        this.nzDot = false;
        this.nzOverflowCount = 99;
        this.nzColor = undefined;
        this.nzStyle = null;
        this.nzText = null;
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.prepareBadgeForRtl();
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.prepareBadgeForRtl();
    }
    ngOnChanges(changes) {
        const { nzColor, nzShowDot, nzDot, nzCount, nzShowZero } = changes;
        if (nzColor) {
            this.presetColor = this.nzColor && badgePresetColors.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
        }
        if (nzShowDot || nzDot || nzCount || nzShowZero) {
            this.showSup = (this.nzShowDot && this.nzDot) || this.nzCount > 0 || (this.nzCount <= 0 && this.nzShowZero);
        }
    }
    prepareBadgeForRtl() {
        if (this.isRtlLayout) {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-badge-rtl');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-badge-rtl');
        }
    }
    get isRtlLayout() {
        return this.dir === 'rtl';
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzBadgeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBadgeComponent, deps: [{ token: i1.NzConfigService }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i2.Directionality, optional: true }, { token: i3.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzBadgeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzBadgeComponent, selector: "nz-badge", inputs: { nzShowZero: "nzShowZero", nzShowDot: "nzShowDot", nzStandalone: "nzStandalone", nzDot: "nzDot", nzOverflowCount: "nzOverflowCount", nzColor: "nzColor", nzStyle: "nzStyle", nzText: "nzText", nzTitle: "nzTitle", nzStatus: "nzStatus", nzCount: "nzCount", nzOffset: "nzOffset" }, host: { properties: { "class.ant-badge-status": "nzStatus", "class.ant-badge-not-a-wrapper": "!!(nzStandalone || nzStatus || nzColor)" }, classAttribute: "ant-badge" }, exportAs: ["nzBadge"], usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="nzStatus || nzColor">
      <span
        class="ant-badge-status-dot ant-badge-status-{{ nzStatus || presetColor }}"
        [style.background]="!presetColor && nzColor"
        [ngStyle]="nzStyle"
      ></span>
      <span class="ant-badge-status-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    </ng-container>
    <ng-content></ng-content>
    <ng-container *nzStringTemplateOutlet="nzCount">
      <nz-badge-sup
        *ngIf="showSup"
        [nzOffset]="nzOffset"
        [nzTitle]="nzTitle"
        [nzStyle]="nzStyle"
        [nzDot]="nzDot"
        [nzOverflowCount]="nzOverflowCount"
        [disableAnimation]="!!(nzStandalone || nzStatus || nzColor || noAnimation?.nzNoAnimation)"
        [nzCount]="nzCount"
        [noAnimation]="!!noAnimation?.nzNoAnimation"
      ></nz-badge-sup>
    </ng-container>
  `, isInline: true, components: [{ type: i4.NzBadgeSupComponent, selector: "nz-badge-sup", inputs: ["nzOffset", "nzTitle", "nzStyle", "nzDot", "nzOverflowCount", "disableAnimation", "nzCount", "noAnimation"], exportAs: ["nzBadgeSup"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i6.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], animations: [zoomBadgeMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzBadgeComponent.prototype, "nzShowZero", void 0);
__decorate([
    InputBoolean()
], NzBadgeComponent.prototype, "nzShowDot", void 0);
__decorate([
    InputBoolean()
], NzBadgeComponent.prototype, "nzStandalone", void 0);
__decorate([
    InputBoolean()
], NzBadgeComponent.prototype, "nzDot", void 0);
__decorate([
    WithConfig()
], NzBadgeComponent.prototype, "nzOverflowCount", void 0);
__decorate([
    WithConfig()
], NzBadgeComponent.prototype, "nzColor", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBadgeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-badge',
                    exportAs: 'nzBadge',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [zoomBadgeMotion],
                    template: `
    <ng-container *ngIf="nzStatus || nzColor">
      <span
        class="ant-badge-status-dot ant-badge-status-{{ nzStatus || presetColor }}"
        [style.background]="!presetColor && nzColor"
        [ngStyle]="nzStyle"
      ></span>
      <span class="ant-badge-status-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    </ng-container>
    <ng-content></ng-content>
    <ng-container *nzStringTemplateOutlet="nzCount">
      <nz-badge-sup
        *ngIf="showSup"
        [nzOffset]="nzOffset"
        [nzTitle]="nzTitle"
        [nzStyle]="nzStyle"
        [nzDot]="nzDot"
        [nzOverflowCount]="nzOverflowCount"
        [disableAnimation]="!!(nzStandalone || nzStatus || nzColor || noAnimation?.nzNoAnimation)"
        [nzCount]="nzCount"
        [noAnimation]="!!noAnimation?.nzNoAnimation"
      ></nz-badge-sup>
    </ng-container>
  `,
                    host: {
                        class: 'ant-badge',
                        '[class.ant-badge-status]': 'nzStatus',
                        '[class.ant-badge-not-a-wrapper]': '!!(nzStandalone || nzStatus || nzColor)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i3.NzNoAnimationDirective, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }]; }, propDecorators: { nzShowZero: [{
                type: Input
            }], nzShowDot: [{
                type: Input
            }], nzStandalone: [{
                type: Input
            }], nzDot: [{
                type: Input
            }], nzOverflowCount: [{
                type: Input
            }], nzColor: [{
                type: Input
            }], nzStyle: [{
                type: Input
            }], nzText: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzStatus: [{
                type: Input
            }], nzCount: [{
                type: Input
            }], nzOffset: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9iYWRnZS9iYWRnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULElBQUksRUFDSixLQUFLLEVBSUwsUUFBUSxFQUlSLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFnQyxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUdyRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7O0FBR3BELE1BQU0scUJBQXFCLEdBQWdCLE9BQU8sQ0FBQztBQXlDbkQsTUFBTSxPQUFPLGdCQUFnQjtJQXVCM0IsWUFDUyxlQUFnQyxFQUMvQixRQUFtQixFQUNuQixHQUFzQixFQUN0QixVQUFzQixFQUNWLGNBQThCLEVBQ3ZCLFdBQW9DO1FBTHhELG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUMvQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDVixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDdkIsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBNUJ4RCxrQkFBYSxHQUFnQixxQkFBcUIsQ0FBQztRQUs1RCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGdCQUFXLEdBQWtCLElBQUksQ0FBQztRQUNsQyxRQUFHLEdBQWMs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QWZ6QyxnQkFBZ0I7a0JBdkM1QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUsU0FBUztvQkFDbkIsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxVQUFVLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzdCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLFdBQVc7d0JBQ2xCLDBCQUEwQixFQUFFLFVBQVU7d0JBQ3RDLGlDQUFpQyxFQUFFLHlDQUF5QztxQkFDN0U7aUJBQ0Y7OzBCQTZCSSxRQUFROzswQkFDUixJQUFJOzswQkFBSSxRQUFROzRDQW5CTSxVQUFVO3NCQUFsQyxLQUFLO2dCQUNtQixTQUFTO3NCQUFqQyxLQUFLO2dCQUNtQixZQUFZO3NCQUFwQyxLQUFLO2dCQUNtQixLQUFLO3NCQUE3QixLQUFLO2dCQUNpQixlQUFlO3NCQUFyQyxLQUFLO2dCQUNpQixPQUFPO3NCQUE3QixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IHpvb21CYWRnZU1vdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBiYWRnZVByZXNldENvbG9ycyB9IGZyb20gJy4vcHJlc2V0LWNvbG9ycyc7XG5pbXBvcnQgeyBOekJhZGdlU3RhdHVzVHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBOWl9DT05GSUdfTU9EVUxFX05BTUU6IE56Q29uZmlnS2V5ID0gJ2JhZGdlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotYmFkZ2UnLFxuICBleHBvcnRBczogJ256QmFkZ2UnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFt6b29tQmFkZ2VNb3Rpb25dLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJuelN0YXR1cyB8fCBuekNvbG9yXCI+XG4gICAgICA8c3BhblxuICAgICAgICBjbGFzcz1cImFudC1iYWRnZS1zdGF0dXMtZG90IGFudC1iYWRnZS1zdGF0dXMte3sgbnpTdGF0dXMgfHwgcHJlc2V0Q29sb3IgfX1cIlxuICAgICAgICBbc3R5bGUuYmFja2dyb3VuZF09XCIhcHJlc2V0Q29sb3IgJiYgbnpDb2xvclwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIm56U3R5bGVcIlxuICAgICAgPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYW50LWJhZGdlLXN0YXR1cy10ZXh0XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRleHRcIj57eyBuelRleHQgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56Q291bnRcIj5cbiAgICAgIDxuei1iYWRnZS1zdXBcbiAgICAgICAgKm5nSWY9XCJzaG93U3VwXCJcbiAgICAgICAgW256T2Zmc2V0XT1cIm56T2Zmc2V0XCJcbiAgICAgICAgW256VGl0bGVdPVwibnpUaXRsZVwiXG4gICAgICAgIFtuelN0eWxlXT1cIm56U3R5bGVcIlxuICAgICAgICBbbnpEb3RdPVwibnpEb3RcIlxuICAgICAgICBbbnpPdmVyZmxvd0NvdW50XT1cIm56T3ZlcmZsb3dDb3VudFwiXG4gICAgICAgIFtkaXNhYmxlQW5pbWF0aW9uXT1cIiEhKG56U3RhbmRhbG9uZSB8fCBuelN0YXR1cyB8fCBuekNvbG9yIHx8IG5vQW5pbWF0aW9uPy5uek5vQW5pbWF0aW9uKVwiXG4gICAgICAgIFtuekNvdW50XT1cIm56Q291bnRcIlxuICAgICAgICBbbm9BbmltYXRpb25dPVwiISFub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvblwiXG4gICAgICA+PC9uei1iYWRnZS1zdXA+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1iYWRnZScsXG4gICAgJ1tjbGFzcy5hbnQtYmFkZ2Utc3RhdHVzXSc6ICduelN0YXR1cycsXG4gICAgJ1tjbGFzcy5hbnQtYmFkZ2Utbm90LWEtd3JhcHBlcl0nOiAnISEobnpTdGFuZGFsb25lIHx8IG56U3RhdHVzIHx8IG56Q29sb3IpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56QmFkZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3daZXJvOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dEb3Q6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RG90OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelN0YW5kYWxvbmU6IEJvb2xlYW5JbnB1dDtcbiAgc2hvd1N1cCA9IGZhbHNlO1xuICBwcmVzZXRDb2xvcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93WmVybzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93RG90ID0gdHJ1ZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U3RhbmRhbG9uZSA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEb3QgPSBmYWxzZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuek92ZXJmbG93Q291bnQ6IG51bWJlciA9IDk5O1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56Q29sb3I/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG56U3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpUZXh0Pzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpUaXRsZT86IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG56U3RhdHVzPzogTnpCYWRnZVN0YXR1c1R5cGUgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIG56Q291bnQ/OiBudW1iZXIgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xuICBASW5wdXQoKSBuek9mZnNldD86IFtudW1iZXIsIG51bWJlcl07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZVxuICApIHt9XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLnByZXBhcmVCYWRnZUZvclJ0bCgpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgICB0aGlzLnByZXBhcmVCYWRnZUZvclJ0bCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpDb2xvciwgbnpTaG93RG90LCBuekRvdCwgbnpDb3VudCwgbnpTaG93WmVybyB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpDb2xvcikge1xuICAgICAgdGhpcy5wcmVzZXRDb2xvciA9IHRoaXMubnpDb2xvciAmJiBiYWRnZVByZXNldENvbG9ycy5pbmRleE9mKHRoaXMubnpDb2xvcikgIT09IC0xID8gdGhpcy5uekNvbG9yIDogbnVsbDtcbiAgICB9XG4gICAgaWYgKG56U2hvd0RvdCB8fCBuekRvdCB8fCBuekNvdW50IHx8IG56U2hvd1plcm8pIHtcbiAgICAgIHRoaXMuc2hvd1N1cCA9ICh0aGlzLm56U2hvd0RvdCAmJiB0aGlzLm56RG90KSB8fCB0aGlzLm56Q291bnQhID4gMCB8fCAodGhpcy5uekNvdW50ISA8PSAwICYmIHRoaXMubnpTaG93WmVybyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlQmFkZ2VGb3JSdGwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNSdGxMYXlvdXQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhbnQtYmFkZ2UtcnRsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhbnQtYmFkZ2UtcnRsJyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpciA9PT0gJ3J0bCc7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==