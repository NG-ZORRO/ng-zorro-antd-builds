import { __decorate } from "tslib";
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, forwardRef, Input, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "@angular/cdk/bidi";
import * as i4 from "ng-zorro-antd/core/wave";
import * as i5 from "@angular/common";
import * as i6 from "ng-zorro-antd/icon";
import * as i7 from "ng-zorro-antd/core/outlet";
const NZ_CONFIG_MODULE_NAME = 'switch';
export class NzSwitchComponent {
    constructor(nzConfigService, host, ngZone, cdr, focusMonitor, directionality) {
        this.nzConfigService = nzConfigService;
        this.host = host;
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.focusMonitor = focusMonitor;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.isChecked = false;
        this.onChange = () => { };
        this.onTouched = () => { };
        this.nzLoading = false;
        this.nzDisabled = false;
        this.nzControl = false;
        this.nzCheckedChildren = null;
        this.nzUnCheckedChildren = null;
        this.nzSize = 'default';
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    updateValue(value) {
        if (this.isChecked !== value) {
            this.isChecked = value;
            this.onChange(this.isChecked);
        }
    }
    focus() {
        this.focusMonitor.focusVia(this.switchElement.nativeElement, 'keyboard');
    }
    blur() {
        this.switchElement.nativeElement.blur();
    }
    ngOnInit() {
        this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.host.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                event.preventDefault();
                if (this.nzControl || this.nzDisabled || this.nzLoading) {
                    return;
                }
                this.ngZone.run(() => {
                    this.updateValue(!this.isChecked);
                    this.cdr.markForCheck();
                });
            });
            fromEvent(this.switchElement.nativeElement, 'keydown')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                if (this.nzControl || this.nzDisabled || this.nzLoading) {
                    return;
                }
                const { keyCode } = event;
                if (keyCode !== LEFT_ARROW && keyCode !== RIGHT_ARROW && keyCode !== SPACE && keyCode !== ENTER) {
                    return;
                }
                event.preventDefault();
                this.ngZone.run(() => {
                    if (keyCode === LEFT_ARROW) {
                        this.updateValue(false);
                    }
                    else if (keyCode === RIGHT_ARROW) {
                        this.updateValue(true);
                    }
                    else if (keyCode === SPACE || keyCode === ENTER) {
                        this.updateValue(!this.isChecked);
                    }
                    this.cdr.markForCheck();
                });
            });
        });
    }
    ngAfterViewInit() {
        this.focusMonitor
            .monitor(this.switchElement.nativeElement, true)
            .pipe(takeUntil(this.destroy$))
            .subscribe(focusOrigin => {
            if (!focusOrigin) {
                /** https://github.com/angular/angular/issues/17793 **/
                Promise.resolve().then(() => this.onTouched());
            }
        });
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.switchElement.nativeElement);
        this.destroy$.next();
        this.destroy$.complete();
    }
    writeValue(value) {
        this.isChecked = value;
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this.nzDisabled = disabled;
        this.cdr.markForCheck();
    }
}
NzSwitchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSwitchComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i2.FocusMonitor }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzSwitchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSwitchComponent, selector: "nz-switch", inputs: { nzLoading: "nzLoading", nzDisabled: "nzDisabled", nzControl: "nzControl", nzCheckedChildren: "nzCheckedChildren", nzUnCheckedChildren: "nzUnCheckedChildren", nzSize: "nzSize" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NzSwitchComponent),
            multi: true
        }
    ], viewQueries: [{ propertyName: "switchElement", first: true, predicate: ["switchElement"], descendants: true, static: true }], exportAs: ["nzSwitch"], ngImport: i0, template: `
    <button
      nz-wave
      type="button"
      class="ant-switch"
      #switchElement
      [disabled]="nzDisabled"
      [class.ant-switch-checked]="isChecked"
      [class.ant-switch-loading]="nzLoading"
      [class.ant-switch-disabled]="nzDisabled"
      [class.ant-switch-small]="nzSize === 'small'"
      [class.ant-switch-rtl]="dir === 'rtl'"
      [nzWaveExtraNode]="true"
    >
      <span class="ant-switch-handle">
        <i *ngIf="nzLoading" nz-icon nzType="loading" class="ant-switch-loading-icon"></i>
      </span>
      <span class="ant-switch-inner">
        <ng-container *ngIf="isChecked; else uncheckTemplate">
          <ng-container *nzStringTemplateOutlet="nzCheckedChildren">{{ nzCheckedChildren }}</ng-container>
        </ng-container>
        <ng-template #uncheckTemplate>
          <ng-container *nzStringTemplateOutlet="nzUnCheckedChildren">{{ nzUnCheckedChildren }}</ng-container>
        </ng-template>
      </span>
      <div class="ant-click-animating-node"></div>
    </button>
  `, isInline: true, directives: [{ type: i4.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i7.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzSwitchComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean()
], NzSwitchComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzSwitchComponent.prototype, "nzControl", void 0);
__decorate([
    WithConfig()
], NzSwitchComponent.prototype, "nzSize", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSwitchComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-switch',
                    exportAs: 'nzSwitch',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzSwitchComponent),
                            multi: true
                        }
                    ],
                    template: `
    <button
      nz-wave
      type="button"
      class="ant-switch"
      #switchElement
      [disabled]="nzDisabled"
      [class.ant-switch-checked]="isChecked"
      [class.ant-switch-loading]="nzLoading"
      [class.ant-switch-disabled]="nzDisabled"
      [class.ant-switch-small]="nzSize === 'small'"
      [class.ant-switch-rtl]="dir === 'rtl'"
      [nzWaveExtraNode]="true"
    >
      <span class="ant-switch-handle">
        <i *ngIf="nzLoading" nz-icon nzType="loading" class="ant-switch-loading-icon"></i>
      </span>
      <span class="ant-switch-inner">
        <ng-container *ngIf="isChecked; else uncheckTemplate">
          <ng-container *nzStringTemplateOutlet="nzCheckedChildren">{{ nzCheckedChildren }}</ng-container>
        </ng-container>
        <ng-template #uncheckTemplate>
          <ng-container *nzStringTemplateOutlet="nzUnCheckedChildren">{{ nzUnCheckedChildren }}</ng-container>
        </ng-template>
      </span>
      <div class="ant-click-animating-node"></div>
    </button>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i2.FocusMonitor }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { switchElement: [{
                type: ViewChild,
                args: ['switchElement', { static: true }]
            }], nzLoading: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzControl: [{
                type: Input
            }], nzCheckedChildren: [{
                type: Input
            }], nzUnCheckedChildren: [{
                type: Input
            }], nzSize: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvc3dpdGNoL3N3aXRjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RSxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxVQUFVLEVBQ1YsS0FBSyxFQUlMLFFBQVEsRUFFUixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFnQyxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7OztBQUV2RCxNQUFNLHFCQUFxQixHQUFnQixRQUFRLENBQUM7QUE0Q3BELE1BQU0sT0FBTyxpQkFBaUI7SUFxQzVCLFlBQ1MsZUFBZ0MsRUFDL0IsSUFBNkIsRUFDN0IsTUFBYyxFQUNkLEdBQXNCLEVBQ3RCLFlBQTBCLEVBQ2QsY0FBOEI7UUFMM0Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQy9CLFNBQUksR0FBSixJQUFJLENBQXlCO1FBQzdCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNkLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQTFDM0Msa0JBQWEsR0FBZ0IscUJBQXFCLENBQUM7UUFNNUQsY0FBUyxHQUFHLEtB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aUJBQWlCLENBQUMsSUFBSTtvQkFDckMsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDOzRCQUNoRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtvQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCVDtpQkFDRjs7MEJBNENJLFFBQVE7NENBakNtQyxhQUFhO3NCQUExRCxTQUFTO3VCQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQ25CLFNBQVM7c0JBQWpDLEtBQUs7Z0JBQ21CLFVBQVU7c0JBQWxDLEtBQUs7Z0JBQ21CLFNBQVM7c0JBQWpDLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDaUIsTUFBTTtzQkFBNUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBFTlRFUiwgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFNQQUNFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnpTaXplRFNUeXBlLCBPbkNoYW5nZVR5cGUsIE9uVG91Y2hlZFR5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5jb25zdCBOWl9DT05GSUdfTU9EVUxFX05BTUU6IE56Q29uZmlnS2V5ID0gJ3N3aXRjaCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXN3aXRjaCcsXG4gIGV4cG9ydEFzOiAnbnpTd2l0Y2gnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnpTd2l0Y2hDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGJ1dHRvblxuICAgICAgbnotd2F2ZVxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjbGFzcz1cImFudC1zd2l0Y2hcIlxuICAgICAgI3N3aXRjaEVsZW1lbnRcbiAgICAgIFtkaXNhYmxlZF09XCJuekRpc2FibGVkXCJcbiAgICAgIFtjbGFzcy5hbnQtc3dpdGNoLWNoZWNrZWRdPVwiaXNDaGVja2VkXCJcbiAgICAgIFtjbGFzcy5hbnQtc3dpdGNoLWxvYWRpbmddPVwibnpMb2FkaW5nXCJcbiAgICAgIFtjbGFzcy5hbnQtc3dpdGNoLWRpc2FibGVkXT1cIm56RGlzYWJsZWRcIlxuICAgICAgW2NsYXNzLmFudC1zd2l0Y2gtc21hbGxdPVwibnpTaXplID09PSAnc21hbGwnXCJcbiAgICAgIFtjbGFzcy5hbnQtc3dpdGNoLXJ0bF09XCJkaXIgPT09ICdydGwnXCJcbiAgICAgIFtueldhdmVFeHRyYU5vZGVdPVwidHJ1ZVwiXG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtc3dpdGNoLWhhbmRsZVwiPlxuICAgICAgICA8aSAqbmdJZj1cIm56TG9hZGluZ1wiIG56LWljb24gbnpUeXBlPVwibG9hZGluZ1wiIGNsYXNzPVwiYW50LXN3aXRjaC1sb2FkaW5nLWljb25cIj48L2k+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImFudC1zd2l0Y2gtaW5uZXJcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzQ2hlY2tlZDsgZWxzZSB1bmNoZWNrVGVtcGxhdGVcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpDaGVja2VkQ2hpbGRyZW5cIj57eyBuekNoZWNrZWRDaGlsZHJlbiB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICN1bmNoZWNrVGVtcGxhdGU+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56VW5DaGVja2VkQ2hpbGRyZW5cIj57eyBuelVuQ2hlY2tlZENoaWxkcmVuIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LWNsaWNrLWFuaW1hdGluZy1ub2RlXCI+PC9kaXY+XG4gICAgPC9idXR0b24+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpTd2l0Y2hDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkluaXQge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpMb2FkaW5nOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNvbnRyb2w6IEJvb2xlYW5JbnB1dDtcblxuICBpc0NoZWNrZWQgPSBmYWxzZTtcbiAgb25DaGFuZ2U6IE9uQ2hhbmdlVHlwZSA9ICgpID0+IHt9O1xuICBvblRvdWNoZWQ6IE9uVG91Y2hlZFR5cGUgPSAoKSA9PiB7fTtcbiAgQFZpZXdDaGlsZCgnc3dpdGNoRWxlbWVudCcsIHsgc3RhdGljOiB0cnVlIH0pIHN3aXRjaEVsZW1lbnQhOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56TG9hZGluZyA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpDb250cm9sID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56Q2hlY2tlZENoaWxkcmVuOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelVuQ2hlY2tlZENoaWxkcmVuOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56U2l6ZTogTnpTaXplRFNUeXBlID0gJ2RlZmF1bHQnO1xuXG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgdXBkYXRlVmFsdWUodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0NoZWNrZWQgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLmlzQ2hlY2tlZCA9IHZhbHVlO1xuICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLmlzQ2hlY2tlZCk7XG4gICAgfVxuICB9XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c01vbml0b3IuZm9jdXNWaWEodGhpcy5zd2l0Y2hFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdrZXlib2FyZCcpO1xuICB9XG5cbiAgYmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLnN3aXRjaEVsZW1lbnQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBob3N0OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG5cbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBmcm9tRXZlbnQodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsICdjbGljaycpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGlmICh0aGlzLm56Q29udHJvbCB8fCB0aGlzLm56RGlzYWJsZWQgfHwgdGhpcy5uekxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSghdGhpcy5pc0NoZWNrZWQpO1xuICAgICAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4odGhpcy5zd2l0Y2hFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdrZXlkb3duJylcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5uekNvbnRyb2wgfHwgdGhpcy5uekRpc2FibGVkIHx8IHRoaXMubnpMb2FkaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgeyBrZXlDb2RlIH0gPSBldmVudDtcbiAgICAgICAgICBpZiAoa2V5Q29kZSAhPT0gTEVGVF9BUlJPVyAmJiBrZXlDb2RlICE9PSBSSUdIVF9BUlJPVyAmJiBrZXlDb2RlICE9PSBTUEFDRSAmJiBrZXlDb2RlICE9PSBFTlRFUikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IExFRlRfQVJST1cpIHtcbiAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFJJR0hUX0FSUk9XKSB7XG4gICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFNQQUNFIHx8IGtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoIXRoaXMuaXNDaGVja2VkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNNb25pdG9yXG4gICAgICAubW9uaXRvcih0aGlzLnN3aXRjaEVsZW1lbnQhLm5hdGl2ZUVsZW1lbnQsIHRydWUpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKGZvY3VzT3JpZ2luID0+IHtcbiAgICAgICAgaWYgKCFmb2N1c09yaWdpbikge1xuICAgICAgICAgIC8qKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNzc5MyAqKi9cbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMub25Ub3VjaGVkKCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuc3dpdGNoRWxlbWVudCEubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaXNDaGVja2VkID0gdmFsdWU7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBPbkNoYW5nZVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogT25Ub3VjaGVkVHlwZSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5uekRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==