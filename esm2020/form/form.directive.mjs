import { __decorate } from "tslib";
import { Directive, Input, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/cdk/bidi";
const NZ_CONFIG_MODULE_NAME = 'form';
export const DefaultTooltipIcon = {
    type: 'question-circle',
    theme: 'outline'
};
export class NzFormDirective {
    constructor(nzConfigService, elementRef, renderer, directionality) {
        this.nzConfigService = nzConfigService;
        this.renderer = renderer;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzLayout = 'horizontal';
        this.nzNoColon = false;
        this.nzAutoTips = {};
        this.nzDisableAutoTips = false;
        this.nzTooltipIcon = DefaultTooltipIcon;
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        this.inputChanges$ = new Subject();
        this.renderer.addClass(elementRef.nativeElement, 'ant-form');
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
    }
    getInputObservable(changeType) {
        return this.inputChanges$.pipe(filter(changes => changeType in changes), map(value => value[changeType]));
    }
    ngOnChanges(changes) {
        this.inputChanges$.next(changes);
    }
    ngOnDestroy() {
        this.inputChanges$.complete();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzFormDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFormDirective, deps: [{ token: i1.NzConfigService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzFormDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzFormDirective, selector: "[nz-form]", inputs: { nzLayout: "nzLayout", nzNoColon: "nzNoColon", nzAutoTips: "nzAutoTips", nzDisableAutoTips: "nzDisableAutoTips", nzTooltipIcon: "nzTooltipIcon" }, host: { properties: { "class.ant-form-horizontal": "nzLayout === 'horizontal'", "class.ant-form-vertical": "nzLayout === 'vertical'", "class.ant-form-inline": "nzLayout === 'inline'", "class.ant-form-rtl": "dir === 'rtl'" } }, exportAs: ["nzForm"], usesOnChanges: true, ngImport: i0 });
__decorate([
    WithConfig(),
    InputBoolean()
], NzFormDirective.prototype, "nzNoColon", void 0);
__decorate([
    WithConfig()
], NzFormDirective.prototype, "nzAutoTips", void 0);
__decorate([
    InputBoolean()
], NzFormDirective.prototype, "nzDisableAutoTips", void 0);
__decorate([
    WithConfig()
], NzFormDirective.prototype, "nzTooltipIcon", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFormDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-form]',
                    exportAs: 'nzForm',
                    host: {
                        '[class.ant-form-horizontal]': `nzLayout === 'horizontal'`,
                        '[class.ant-form-vertical]': `nzLayout === 'vertical'`,
                        '[class.ant-form-inline]': `nzLayout === 'inline'`,
                        '[class.ant-form-rtl]': `dir === 'rtl'`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzLayout: [{
                type: Input
            }], nzNoColon: [{
                type: Input
            }], nzAutoTips: [{
                type: Input
            }], nzDisableAutoTips: [{
                type: Input
            }], nzTooltipIcon: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2Zvcm0vZm9ybS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUdMLFFBQVEsRUFJVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXhELE9BQU8sRUFBZ0MsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFckYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBRXZELE1BQU0scUJBQXFCLEdBQWdCLE1BQU0sQ0FBQztBQUlsRCxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRztJQUNoQyxJQUFJLEVBQUUsaUJBQWlCO0lBQ3ZCLEtBQUssRUFBRSxTQUFTO0NBQ1IsQ0FBQztBQVlYLE1BQU0sT0FBTyxlQUFlO0lBc0IxQixZQUNTLGVBQWdDLEVBQ3ZDLFVBQXNCLEVBQ2QsUUFBbUIsRUFDUCxjQUE4QjtRQUgzQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFFL0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNQLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQXpCM0Msa0JBQWEsR0FBZ0IscUJBQXFCLENBQUM7UUFJbkQsYUFBUSxHQUFxQixZQUFZLENBQUM7UUFDWixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNDLGVBQVUsR0FBMkMsRUFBRSxDQUFDO1FBQ3RELHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUM1QixrQkFBYSxHQUFnRCxrQkFBa0IsQ0FBQztRQUV2RyxRQUFHLEdBQWMsS0FBSyxDQUFDO1FBQ3ZCLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQWlCLENBQUM7UUFlbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUU3RCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFO1lBQzVGLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQW5CRCxrQkFBa0IsQ0FBdUIsVUFBYTtRQUNwRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLEVBQ3hDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFvQixDQUFDLENBQUMsQ0FDMUMsQ0FBQztJQUNKLENBQUM7SUFnQkQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7NEdBNUNVLGVBQWU7Z0dBQWYsZUFBZTtBQU1hO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTtrREFBNEI7QUFDM0M7SUFBYixVQUFVLEVBQUU7bURBQXlEO0FBQ3REO0lBQWYsWUFBWSxFQUFFOzBEQUEyQjtBQUM1QjtJQUFiLFVBQVUsRUFBRTtzREFBaUY7MkZBVDVGLGVBQWU7a0JBVjNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSxRQUFRO29CQUNsQixJQUFJLEVBQUU7d0JBQ0osNkJBQTZCLEVBQUUsMkJBQTJCO3dCQUMxRCwyQkFBMkIsRUFBRSx5QkFBeUI7d0JBQ3RELHlCQUF5QixFQUFFLHVCQUF1Qjt3QkFDbEQsc0JBQXNCLEVBQUUsZUFBZTtxQkFDeEM7aUJBQ0Y7OzBCQTJCSSxRQUFROzRDQXJCRixRQUFRO3NCQUFoQixLQUFLO2dCQUNpQyxTQUFTO3NCQUEvQyxLQUFLO2dCQUNpQixVQUFVO3NCQUFoQyxLQUFLO2dCQUNtQixpQkFBaUI7c0JBQXpDLEtBQUs7Z0JBQ2lCLGFBQWE7c0JBQW5DLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zLWFuZ3VsYXInO1xuXG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIElucHV0T2JzZXJ2YWJsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnZm9ybSc7XG5cbmV4cG9ydCB0eXBlIE56Rm9ybUxheW91dFR5cGUgPSAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnIHwgJ2lubGluZSc7XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0VG9vbHRpcEljb24gPSB7XG4gIHR5cGU6ICdxdWVzdGlvbi1jaXJjbGUnLFxuICB0aGVtZTogJ291dGxpbmUnXG59IGFzIGNvbnN0O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnotZm9ybV0nLFxuICBleHBvcnRBczogJ256Rm9ybScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1mb3JtLWhvcml6b250YWxdJzogYG56TGF5b3V0ID09PSAnaG9yaXpvbnRhbCdgLFxuICAgICdbY2xhc3MuYW50LWZvcm0tdmVydGljYWxdJzogYG56TGF5b3V0ID09PSAndmVydGljYWwnYCxcbiAgICAnW2NsYXNzLmFudC1mb3JtLWlubGluZV0nOiBgbnpMYXlvdXQgPT09ICdpbmxpbmUnYCxcbiAgICAnW2NsYXNzLmFudC1mb3JtLXJ0bF0nOiBgZGlyID09PSAncnRsJ2BcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekZvcm1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgSW5wdXRPYnNlcnZhYmxlIHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek5vQ29sb246IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlzYWJsZUF1dG9UaXBzOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgbnpMYXlvdXQ6IE56Rm9ybUxheW91dFR5cGUgPSAnaG9yaXpvbnRhbCc7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0Qm9vbGVhbigpIG56Tm9Db2xvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56QXV0b1RpcHM6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIHN0cmluZz4+ID0ge307XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpc2FibGVBdXRvVGlwcyA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56VG9vbHRpcEljb246IHN0cmluZyB8IHsgdHlwZTogc3RyaW5nOyB0aGVtZTogVGhlbWVUeXBlIH0gPSBEZWZhdWx0VG9vbHRpcEljb247XG5cbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcbiAgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIGlucHV0Q2hhbmdlcyQgPSBuZXcgU3ViamVjdDxTaW1wbGVDaGFuZ2VzPigpO1xuXG4gIGdldElucHV0T2JzZXJ2YWJsZTxLIGV4dGVuZHMga2V5b2YgdGhpcz4oY2hhbmdlVHlwZTogSyk6IE9ic2VydmFibGU8U2ltcGxlQ2hhbmdlPiB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRDaGFuZ2VzJC5waXBlKFxuICAgICAgZmlsdGVyKGNoYW5nZXMgPT4gY2hhbmdlVHlwZSBpbiBjaGFuZ2VzKSxcbiAgICAgIG1hcCh2YWx1ZSA9PiB2YWx1ZVtjaGFuZ2VUeXBlIGFzIHN0cmluZ10pXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eVxuICApIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC1mb3JtJyk7XG5cbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0Q2hhbmdlcyQubmV4dChjaGFuZ2VzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXRDaGFuZ2VzJC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19