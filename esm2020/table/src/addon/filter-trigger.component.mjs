import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzDropDownDirective } from 'ng-zorro-antd/dropdown';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "ng-zorro-antd/core/services";
import * as i3 from "ng-zorro-antd/dropdown";
const NZ_CONFIG_MODULE_NAME = 'filterTrigger';
export class NzFilterTriggerComponent {
    constructor(nzConfigService, ngZone, cdr, destroy$) {
        this.nzConfigService = nzConfigService;
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.destroy$ = destroy$;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzActive = false;
        this.nzVisible = false;
        this.nzBackdrop = false;
        this.nzVisibleChange = new EventEmitter();
    }
    onVisibleChange(visible) {
        this.nzVisible = visible;
        this.nzVisibleChange.next(visible);
    }
    hide() {
        this.nzVisible = false;
        this.cdr.markForCheck();
    }
    show() {
        this.nzVisible = true;
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.nzDropdown.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                event.stopPropagation();
            });
        });
    }
}
NzFilterTriggerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFilterTriggerComponent, deps: [{ token: i1.NzConfigService }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i2.NzDestroyService }], target: i0.ɵɵFactoryTarget.Component });
NzFilterTriggerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzFilterTriggerComponent, selector: "nz-filter-trigger", inputs: { nzActive: "nzActive", nzDropdownMenu: "nzDropdownMenu", nzVisible: "nzVisible", nzBackdrop: "nzBackdrop" }, outputs: { nzVisibleChange: "nzVisibleChange" }, providers: [NzDestroyService], viewQueries: [{ propertyName: "nzDropdown", first: true, predicate: NzDropDownDirective, descendants: true, read: ElementRef, static: true }], exportAs: ["nzFilterTrigger"], ngImport: i0, template: `
    <span
      nz-dropdown
      class="ant-table-filter-trigger"
      nzTrigger="click"
      nzPlacement="bottomRight"
      [nzBackdrop]="nzBackdrop"
      [nzClickHide]="false"
      [nzDropdownMenu]="nzDropdownMenu"
      [class.active]="nzActive"
      [class.ant-table-filter-open]="nzVisible"
      [nzVisible]="nzVisible"
      (nzVisibleChange)="onVisibleChange($event)"
    >
      <ng-content></ng-content>
    </span>
  `, isInline: true, directives: [{ type: i3.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig(),
    InputBoolean()
], NzFilterTriggerComponent.prototype, "nzBackdrop", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFilterTriggerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-filter-trigger',
                    exportAs: `nzFilterTrigger`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <span
      nz-dropdown
      class="ant-table-filter-trigger"
      nzTrigger="click"
      nzPlacement="bottomRight"
      [nzBackdrop]="nzBackdrop"
      [nzClickHide]="false"
      [nzDropdownMenu]="nzDropdownMenu"
      [class.active]="nzActive"
      [class.ant-table-filter-open]="nzVisible"
      [nzVisible]="nzVisible"
      (nzVisibleChange)="onVisibleChange($event)"
    >
      <ng-content></ng-content>
    </span>
  `,
                    providers: [NzDestroyService]
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i2.NzDestroyService }]; }, propDecorators: { nzActive: [{
                type: Input
            }], nzDropdownMenu: [{
                type: Input
            }], nzVisible: [{
                type: Input
            }], nzBackdrop: [{
                type: Input
            }], nzVisibleChange: [{
                type: Output
            }], nzDropdown: [{
                type: ViewChild,
                args: [NzDropDownDirective, { static: true, read: ElementRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXRyaWdnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy90YWJsZS9zcmMvYWRkb24vZmlsdGVyLXRyaWdnZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQWdDLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsbUJBQW1CLEVBQTJCLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0FBRXRGLE1BQU0scUJBQXFCLEdBQWdCLGVBQWUsQ0FBQztBQTJCM0QsTUFBTSxPQUFPLHdCQUF3QjtJQThCbkMsWUFDa0IsZUFBZ0MsRUFDeEMsTUFBYyxFQUNkLEdBQXNCLEVBQ3RCLFFBQTBCO1FBSGxCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUN4QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFqQzNCLGtCQUFhLEdBQWdCLHFCQUFxQixDQUFDO1FBSW5ELGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVxQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRWhELG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQXdCOUQsQ0FBQztJQXBCSixlQUFlLENBQUMsT0FBZ0I7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBU0QsUUFBUTtRQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQ2pDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7aUJBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM5QixTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2pCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7cUhBN0NVLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLG1OQUZ4QixDQUFDLGdCQUFnQixDQUFDLHNFQWVsQixtQkFBbUIsMkJBQXdCLFVBQVUsMEVBaEN0RDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCVDtBQVkrQztJQUF0QyxVQUFVLEVBQVc7SUFBRSxZQUFZLEVBQUU7NERBQW9COzJGQVR4RCx3QkFBd0I7a0JBekJwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JUO29CQUNELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2lCQUM5QjswTEFNVSxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFFMEMsVUFBVTtzQkFBekQsS0FBSztnQkFFYSxlQUFlO3NCQUFqQyxNQUFNO2dCQUU2RCxVQUFVO3NCQUE3RSxTQUFTO3VCQUFDLG1CQUFtQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgTnpEZXN0cm95U2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgTnpEcm9wRG93bkRpcmVjdGl2ZSwgTnpEcm9wZG93bk1lbnVDb21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkL2Ryb3Bkb3duJztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdmaWx0ZXJUcmlnZ2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotZmlsdGVyLXRyaWdnZXInLFxuICBleHBvcnRBczogYG56RmlsdGVyVHJpZ2dlcmAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhblxuICAgICAgbnotZHJvcGRvd25cbiAgICAgIGNsYXNzPVwiYW50LXRhYmxlLWZpbHRlci10cmlnZ2VyXCJcbiAgICAgIG56VHJpZ2dlcj1cImNsaWNrXCJcbiAgICAgIG56UGxhY2VtZW50PVwiYm90dG9tUmlnaHRcIlxuICAgICAgW256QmFja2Ryb3BdPVwibnpCYWNrZHJvcFwiXG4gICAgICBbbnpDbGlja0hpZGVdPVwiZmFsc2VcIlxuICAgICAgW256RHJvcGRvd25NZW51XT1cIm56RHJvcGRvd25NZW51XCJcbiAgICAgIFtjbGFzcy5hY3RpdmVdPVwibnpBY3RpdmVcIlxuICAgICAgW2NsYXNzLmFudC10YWJsZS1maWx0ZXItb3Blbl09XCJuelZpc2libGVcIlxuICAgICAgW256VmlzaWJsZV09XCJuelZpc2libGVcIlxuICAgICAgKG56VmlzaWJsZUNoYW5nZSk9XCJvblZpc2libGVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc3Bhbj5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbTnpEZXN0cm95U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTnpGaWx0ZXJUcmlnZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256QmFja2Ryb3A6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBuekFjdGl2ZSA9IGZhbHNlO1xuICBASW5wdXQoKSBuekRyb3Bkb3duTWVudSE6IE56RHJvcGRvd25NZW51Q29tcG9uZW50O1xuICBASW5wdXQoKSBuelZpc2libGUgPSBmYWxzZTtcblxuICBASW5wdXQoKSBAV2l0aENvbmZpZzxib29sZWFuPigpIEBJbnB1dEJvb2xlYW4oKSBuekJhY2tkcm9wID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56VmlzaWJsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBAVmlld0NoaWxkKE56RHJvcERvd25EaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlLCByZWFkOiBFbGVtZW50UmVmIH0pIG56RHJvcGRvd24hOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBvblZpc2libGVDaGFuZ2UodmlzaWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubnpWaXNpYmxlID0gdmlzaWJsZTtcbiAgICB0aGlzLm56VmlzaWJsZUNoYW5nZS5uZXh0KHZpc2libGUpO1xuICB9XG5cbiAgaGlkZSgpOiB2b2lkIHtcbiAgICB0aGlzLm56VmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgc2hvdygpOiB2b2lkIHtcbiAgICB0aGlzLm56VmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVhZG9ubHkgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBkZXN0cm95JDogTnpEZXN0cm95U2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgZnJvbUV2ZW50KHRoaXMubnpEcm9wZG93bi5uYXRpdmVFbGVtZW50LCAnY2xpY2snKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19