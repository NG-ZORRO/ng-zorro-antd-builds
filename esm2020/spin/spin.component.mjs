import { __decorate } from "tslib";
import { Component, Input, Optional, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, timer } from 'rxjs';
import { debounce, distinctUntilChanged, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "@angular/common";
const NZ_CONFIG_MODULE_NAME = 'spin';
export class NzSpinComponent {
    constructor(nzConfigService, cdr, directionality) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzIndicator = null;
        this.nzSize = 'default';
        this.nzTip = null;
        this.nzDelay = 0;
        this.nzSimple = false;
        this.nzSpinning = true;
        this.destroy$ = new Subject();
        this.spinning$ = new BehaviorSubject(this.nzSpinning);
        this.delay$ = new ReplaySubject(1);
        this.isLoading = false;
        this.dir = 'ltr';
    }
    ngOnInit() {
        const loading$ = this.delay$.pipe(startWith(this.nzDelay), distinctUntilChanged(), switchMap(delay => {
            if (delay === 0) {
                return this.spinning$;
            }
            return this.spinning$.pipe(debounce(spinning => timer(spinning ? delay : 0)));
        }), takeUntil(this.destroy$));
        loading$.subscribe(loading => {
            this.isLoading = loading;
            this.cdr.markForCheck();
        });
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.cdr.markForCheck());
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngOnChanges(changes) {
        const { nzSpinning, nzDelay } = changes;
        if (nzSpinning) {
            this.spinning$.next(this.nzSpinning);
        }
        if (nzDelay) {
            this.delay$.next(this.nzDelay);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzSpinComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSpinComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ChangeDetectorRef }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzSpinComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSpinComponent, selector: "nz-spin", inputs: { nzIndicator: "nzIndicator", nzSize: "nzSize", nzTip: "nzTip", nzDelay: "nzDelay", nzSimple: "nzSimple", nzSpinning: "nzSpinning" }, host: { properties: { "class.ant-spin-nested-loading": "!nzSimple" } }, exportAs: ["nzSpin"], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #defaultTemplate>
      <span class="ant-spin-dot ant-spin-dot-spin">
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
      </span>
    </ng-template>
    <div *ngIf="isLoading">
      <div
        class="ant-spin"
        [class.ant-spin-rtl]="dir === 'rtl'"
        [class.ant-spin-spinning]="isLoading"
        [class.ant-spin-lg]="nzSize === 'large'"
        [class.ant-spin-sm]="nzSize === 'small'"
        [class.ant-spin-show-text]="nzTip"
      >
        <ng-template [ngTemplateOutlet]="nzIndicator || defaultTemplate"></ng-template>
        <div class="ant-spin-text" *ngIf="nzTip">{{ nzTip }}</div>
      </div>
    </div>
    <div *ngIf="!nzSimple" class="ant-spin-container" [class.ant-spin-blur]="isLoading">
      <ng-content></ng-content>
    </div>
  `, isInline: true, directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig()
], NzSpinComponent.prototype, "nzIndicator", void 0);
__decorate([
    InputNumber()
], NzSpinComponent.prototype, "nzDelay", void 0);
__decorate([
    InputBoolean()
], NzSpinComponent.prototype, "nzSimple", void 0);
__decorate([
    InputBoolean()
], NzSpinComponent.prototype, "nzSpinning", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSpinComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-spin',
                    exportAs: 'nzSpin',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-template #defaultTemplate>
      <span class="ant-spin-dot ant-spin-dot-spin">
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
      </span>
    </ng-template>
    <div *ngIf="isLoading">
      <div
        class="ant-spin"
        [class.ant-spin-rtl]="dir === 'rtl'"
        [class.ant-spin-spinning]="isLoading"
        [class.ant-spin-lg]="nzSize === 'large'"
        [class.ant-spin-sm]="nzSize === 'small'"
        [class.ant-spin-show-text]="nzTip"
      >
        <ng-template [ngTemplateOutlet]="nzIndicator || defaultTemplate"></ng-template>
        <div class="ant-spin-text" *ngIf="nzTip">{{ nzTip }}</div>
      </div>
    </div>
    <div *ngIf="!nzSimple" class="ant-spin-container" [class.ant-spin-blur]="isLoading">
      <ng-content></ng-content>
    </div>
  `,
                    host: {
                        '[class.ant-spin-nested-loading]': '!nzSimple'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ChangeDetectorRef }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzIndicator: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzTip: [{
                type: Input
            }], nzDelay: [{
                type: Input
            }], nzSimple: [{
                type: Input
            }], nzSpinning: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3NwaW4vc3Bpbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFFTCxTQUFTLEVBQ1QsS0FBSyxFQUlMLFFBQVEsRUFHUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RSxPQUFPLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakcsT0FBTyxFQUFnQyxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRixPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7OztBQUVwRSxNQUFNLHFCQUFxQixHQUFnQixNQUFNLENBQUM7QUFxQ2xELE1BQU0sT0FBTyxlQUFlO0lBbUIxQixZQUNTLGVBQWdDLEVBQy9CLEdBQXNCLEVBQ1YsY0FBOEI7UUFGM0Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQy9CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBckIzQyxrQkFBYSxHQUFnQixxQkFBcUIsQ0FBQztRQU1yQyxnQkFBVyxHQUFrQyxJQUFJLENBQUM7UUFDaEUsV0FBTSxHQUFrQixTQUFTLENBQUM7UUFDbEMsVUFBSyxHQUFrQixJQUFJLENBQUM7UUFDYixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ25DLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQy9CLGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FB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QUk7b0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osaUNBQWlDLEVBQUUsV0FBVztxQkFDL0M7aUJBQ0Y7OzBCQXVCSSxRQUFROzRDQWZZLFdBQVc7c0JBQWpDLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDa0IsT0FBTztzQkFBOUIsS0FBSztnQkFDbUIsUUFBUTtzQkFBaEMsS0FBSztnQkFDbUIsVUFBVTtzQkFBbEMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgUmVwbGF5U3ViamVjdCwgU3ViamVjdCwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOdW1iZXJJbnB1dCwgTnpTYWZlQW55LCBOelNpemVMRFNUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiwgSW5wdXROdW1iZXIgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnc3Bpbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXNwaW4nLFxuICBleHBvcnRBczogJ256U3BpbicsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtc3Bpbi1kb3QgYW50LXNwaW4tZG90LXNwaW5cIj5cbiAgICAgICAgPGkgY2xhc3M9XCJhbnQtc3Bpbi1kb3QtaXRlbVwiPjwvaT5cbiAgICAgICAgPGkgY2xhc3M9XCJhbnQtc3Bpbi1kb3QtaXRlbVwiPjwvaT5cbiAgICAgICAgPGkgY2xhc3M9XCJhbnQtc3Bpbi1kb3QtaXRlbVwiPjwvaT5cbiAgICAgICAgPGkgY2xhc3M9XCJhbnQtc3Bpbi1kb3QtaXRlbVwiPjwvaT5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxkaXYgKm5nSWY9XCJpc0xvYWRpbmdcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJhbnQtc3BpblwiXG4gICAgICAgIFtjbGFzcy5hbnQtc3Bpbi1ydGxdPVwiZGlyID09PSAncnRsJ1wiXG4gICAgICAgIFtjbGFzcy5hbnQtc3Bpbi1zcGlubmluZ109XCJpc0xvYWRpbmdcIlxuICAgICAgICBbY2xhc3MuYW50LXNwaW4tbGddPVwibnpTaXplID09PSAnbGFyZ2UnXCJcbiAgICAgICAgW2NsYXNzLmFudC1zcGluLXNtXT1cIm56U2l6ZSA9PT0gJ3NtYWxsJ1wiXG4gICAgICAgIFtjbGFzcy5hbnQtc3Bpbi1zaG93LXRleHRdPVwibnpUaXBcIlxuICAgICAgPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpJbmRpY2F0b3IgfHwgZGVmYXVsdFRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC1zcGluLXRleHRcIiAqbmdJZj1cIm56VGlwXCI+e3sgbnpUaXAgfX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCIhbnpTaW1wbGVcIiBjbGFzcz1cImFudC1zcGluLWNvbnRhaW5lclwiIFtjbGFzcy5hbnQtc3Bpbi1ibHVyXT1cImlzTG9hZGluZ1wiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtc3Bpbi1uZXN0ZWQtbG9hZGluZ10nOiAnIW56U2ltcGxlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56U3BpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEZWxheTogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNpbXBsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTcGlubmluZzogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpJbmRpY2F0b3I6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpTaXplOiBOelNpemVMRFNUeXBlID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBuelRpcDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG56RGVsYXkgPSAwO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaW1wbGUgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U3Bpbm5pbmcgPSB0cnVlO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBzcGlubmluZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRoaXMubnpTcGlubmluZyk7XG4gIHByaXZhdGUgZGVsYXkkID0gbmV3IFJlcGxheVN1YmplY3Q8bnVtYmVyPigxKTtcbiAgaXNMb2FkaW5nID0gZmFsc2U7XG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgbG9hZGluZyQgPSB0aGlzLmRlbGF5JC5waXBlKFxuICAgICAgc3RhcnRXaXRoKHRoaXMubnpEZWxheSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgc3dpdGNoTWFwKGRlbGF5ID0+IHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc3Bpbm5pbmckO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc3Bpbm5pbmckLnBpcGUoZGVib3VuY2Uoc3Bpbm5pbmcgPT4gdGltZXIoc3Bpbm5pbmcgPyBkZWxheSA6IDApKSk7XG4gICAgICB9KSxcbiAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICk7XG4gICAgbG9hZGluZyQuc3Vic2NyaWJlKGxvYWRpbmcgPT4ge1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gICAgdGhpcy5uekNvbmZpZ1NlcnZpY2VcbiAgICAgIC5nZXRDb25maWdDaGFuZ2VFdmVudEZvckNvbXBvbmVudChOWl9DT05GSUdfTU9EVUxFX05BTUUpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpKTtcblxuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuelNwaW5uaW5nLCBuekRlbGF5IH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuelNwaW5uaW5nKSB7XG4gICAgICB0aGlzLnNwaW5uaW5nJC5uZXh0KHRoaXMubnpTcGlubmluZyk7XG4gICAgfVxuICAgIGlmIChuekRlbGF5KSB7XG4gICAgICB0aGlzLmRlbGF5JC5uZXh0KHRoaXMubnpEZWxheSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=