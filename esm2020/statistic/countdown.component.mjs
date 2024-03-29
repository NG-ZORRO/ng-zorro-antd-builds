import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { interval } from 'rxjs';
import { NzStatisticComponent } from './statistic.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "./statistic.component";
import * as i4 from "ng-zorro-antd/core/pipe";
const REFRESH_INTERVAL = 1000 / 30;
export class NzCountdownComponent extends NzStatisticComponent {
    constructor(cdr, ngZone, platform, directionality) {
        super(cdr, directionality);
        this.ngZone = ngZone;
        this.platform = platform;
        this.nzFormat = 'HH:mm:ss';
        this.nzCountdownFinish = new EventEmitter();
        this.target = 0;
    }
    ngOnChanges(changes) {
        if (changes.nzValue) {
            this.target = Number(changes.nzValue.currentValue);
            if (!changes.nzValue.isFirstChange()) {
                this.syncTimer();
            }
        }
    }
    ngOnInit() {
        super.ngOnInit();
        this.syncTimer();
    }
    ngOnDestroy() {
        this.stopTimer();
    }
    syncTimer() {
        if (this.target >= Date.now()) {
            this.startTimer();
        }
        else {
            this.stopTimer();
        }
    }
    startTimer() {
        if (this.platform.isBrowser) {
            this.ngZone.runOutsideAngular(() => {
                this.stopTimer();
                this.updater_ = interval(REFRESH_INTERVAL).subscribe(() => {
                    this.updateValue();
                    this.cdr.detectChanges();
                });
            });
        }
    }
    stopTimer() {
        if (this.updater_) {
            this.updater_.unsubscribe();
            this.updater_ = null;
        }
    }
    /**
     * Update time that should be displayed on the screen.
     */
    updateValue() {
        this.diff = Math.max(this.target - Date.now(), 0);
        if (this.diff === 0) {
            this.stopTimer();
            if (this.nzCountdownFinish.observers.length) {
                this.ngZone.run(() => this.nzCountdownFinish.emit());
            }
        }
    }
}
NzCountdownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCountdownComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i1.Platform }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzCountdownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCountdownComponent, selector: "nz-countdown", inputs: { nzFormat: "nzFormat" }, outputs: { nzCountdownFinish: "nzCountdownFinish" }, exportAs: ["nzCountdown"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
    <nz-statistic
      [nzValue]="diff"
      [nzValueStyle]="nzValueStyle"
      [nzValueTemplate]="nzValueTemplate || countDownTpl"
      [nzTitle]="nzTitle"
      [nzPrefix]="nzPrefix"
      [nzSuffix]="nzSuffix"
    ></nz-statistic>

    <ng-template #countDownTpl>{{ diff | nzTimeRange: nzFormat }}</ng-template>
  `, isInline: true, components: [{ type: i3.NzStatisticComponent, selector: "nz-statistic", inputs: ["nzPrefix", "nzSuffix", "nzTitle", "nzValue", "nzValueStyle", "nzValueTemplate"], exportAs: ["nzStatistic"] }], pipes: { "nzTimeRange": i4.NzTimeRangePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCountdownComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-countdown',
                    exportAs: 'nzCountdown',
                    template: `
    <nz-statistic
      [nzValue]="diff"
      [nzValueStyle]="nzValueStyle"
      [nzValueTemplate]="nzValueTemplate || countDownTpl"
      [nzTitle]="nzTitle"
      [nzPrefix]="nzPrefix"
      [nzSuffix]="nzSuffix"
    ></nz-statistic>

    <ng-template #countDownTpl>{{ diff | nzTimeRange: nzFormat }}</ng-template>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i1.Platform }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzFormat: [{
                type: Input
            }], nzCountdownFinish: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvc3RhdGlzdGljL2NvdW50ZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFLTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUU5QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7O0FBRTdELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQW9CbkMsTUFBTSxPQUFPLG9CQUFxQixTQUFRLG9CQUFvQjtJQVM1RCxZQUNFLEdBQXNCLEVBQ2QsTUFBYyxFQUNkLFFBQWtCLEVBQ2QsY0FBOEI7UUFFMUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUpuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVhuQixhQUFRLEdBQVcsVUFBVSxDQUFDO1FBQ3BCLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFJeEQsV0FBTSxHQUFXLENBQUMsQ0FBQztJQVUzQixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7U0FDRjtJQUNILENBQUM7SUFFUSxRQUFRO1FBQ2YsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRVEsV0FBVztRQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtvQkFDeEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMzQixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ08sV0FBVztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbEQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFakIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7YUFDdEQ7U0FDRjtJQUNILENBQUM7O2lIQTVFVSxvQkFBb0I7cUdBQXBCLG9CQUFvQixrTkFickI7Ozs7Ozs7Ozs7O0dBV1Q7MkZBRVUsb0JBQW9CO2tCQWxCaEMsU0FBUzttQkFBQztvQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7OztHQVdUO2lCQUNGOzswQkFjSSxRQUFROzRDQVpGLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ2EsaUJBQWlCO3NCQUFuQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGludGVydmFsLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTnpTdGF0aXN0aWNDb21wb25lbnQgfSBmcm9tICcuL3N0YXRpc3RpYy5jb21wb25lbnQnO1xuXG5jb25zdCBSRUZSRVNIX0lOVEVSVkFMID0gMTAwMCAvIDMwO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotY291bnRkb3duJyxcbiAgZXhwb3J0QXM6ICduekNvdW50ZG93bicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG56LXN0YXRpc3RpY1xuICAgICAgW256VmFsdWVdPVwiZGlmZlwiXG4gICAgICBbbnpWYWx1ZVN0eWxlXT1cIm56VmFsdWVTdHlsZVwiXG4gICAgICBbbnpWYWx1ZVRlbXBsYXRlXT1cIm56VmFsdWVUZW1wbGF0ZSB8fCBjb3VudERvd25UcGxcIlxuICAgICAgW256VGl0bGVdPVwibnpUaXRsZVwiXG4gICAgICBbbnpQcmVmaXhdPVwibnpQcmVmaXhcIlxuICAgICAgW256U3VmZml4XT1cIm56U3VmZml4XCJcbiAgICA+PC9uei1zdGF0aXN0aWM+XG5cbiAgICA8bmctdGVtcGxhdGUgI2NvdW50RG93blRwbD57eyBkaWZmIHwgbnpUaW1lUmFuZ2U6IG56Rm9ybWF0IH19PC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOekNvdW50ZG93bkNvbXBvbmVudCBleHRlbmRzIE56U3RhdGlzdGljQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG56Rm9ybWF0OiBzdHJpbmcgPSAnSEg6bW06c3MnO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDb3VudGRvd25GaW5pc2ggPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgZGlmZiE6IG51bWJlcjtcblxuICBwcml2YXRlIHRhcmdldDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSB1cGRhdGVyXz86IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIEBPcHRpb25hbCgpIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eVxuICApIHtcbiAgICBzdXBlcihjZHIsIGRpcmVjdGlvbmFsaXR5KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5uelZhbHVlKSB7XG4gICAgICB0aGlzLnRhcmdldCA9IE51bWJlcihjaGFuZ2VzLm56VmFsdWUuY3VycmVudFZhbHVlKTtcbiAgICAgIGlmICghY2hhbmdlcy5uelZhbHVlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgICB0aGlzLnN5bmNUaW1lcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5zeW5jVGltZXIoKTtcbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gIH1cblxuICBzeW5jVGltZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGFyZ2V0ID49IERhdGUubm93KCkpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0VGltZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgICAgIHRoaXMudXBkYXRlcl8gPSBpbnRlcnZhbChSRUZSRVNIX0lOVEVSVkFMKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoKTtcbiAgICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFRpbWVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnVwZGF0ZXJfKSB7XG4gICAgICB0aGlzLnVwZGF0ZXJfLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnVwZGF0ZXJfID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRpbWUgdGhhdCBzaG91bGQgYmUgZGlzcGxheWVkIG9uIHRoZSBzY3JlZW4uXG4gICAqL1xuICBwcm90ZWN0ZWQgdXBkYXRlVmFsdWUoKTogdm9pZCB7XG4gICAgdGhpcy5kaWZmID0gTWF0aC5tYXgodGhpcy50YXJnZXQgLSBEYXRlLm5vdygpLCAwKTtcblxuICAgIGlmICh0aGlzLmRpZmYgPT09IDApIHtcbiAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG5cbiAgICAgIGlmICh0aGlzLm56Q291bnRkb3duRmluaXNoLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMubnpDb3VudGRvd25GaW5pc2guZW1pdCgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==