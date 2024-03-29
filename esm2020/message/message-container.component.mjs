import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { toCssPixel } from 'ng-zorro-antd/core/util';
import { NzMNContainerComponent } from './base';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "./message.component";
import * as i3 from "@angular/common";
const NZ_CONFIG_COMPONENT_NAME = 'message';
const NZ_MESSAGE_DEFAULT_CONFIG = {
    nzAnimate: true,
    nzDuration: 3000,
    nzMaxStack: 7,
    nzPauseOnHover: true,
    nzTop: 24,
    nzDirection: 'ltr'
};
export class NzMessageContainerComponent extends NzMNContainerComponent {
    constructor(cdr, nzConfigService) {
        super(cdr, nzConfigService);
        this.dir = 'ltr';
        const config = this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME);
        this.dir = config?.nzDirection || 'ltr';
    }
    subscribeConfigChange() {
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.updateConfig();
            const config = this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME);
            if (config) {
                const { nzDirection } = config;
                this.dir = nzDirection || this.dir;
            }
        });
    }
    updateConfig() {
        this.config = {
            ...NZ_MESSAGE_DEFAULT_CONFIG,
            ...this.config,
            ...this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME)
        };
        this.top = toCssPixel(this.config.nzTop);
        this.cdr.markForCheck();
    }
}
NzMessageContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMessageContainerComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NzConfigService }], target: i0.ɵɵFactoryTarget.Component });
NzMessageContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzMessageContainerComponent, selector: "nz-message-container", exportAs: ["nzMessageContainer"], usesInheritance: true, ngImport: i0, template: `
    <div class="ant-message" [class.ant-message-rtl]="dir === 'rtl'" [style.top]="top">
      <nz-message
        *ngFor="let instance of instances"
        [instance]="instance"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-message>
    </div>
  `, isInline: true, components: [{ type: i2.NzMessageComponent, selector: "nz-message", inputs: ["instance"], outputs: ["destroyed"], exportAs: ["nzMessage"] }], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMessageContainerComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-message-container',
                    exportAs: 'nzMessageContainer',
                    preserveWhitespaces: false,
                    template: `
    <div class="ant-message" [class.ant-message-rtl]="dir === 'rtl'" [style.top]="top">
      <nz-message
        *ngFor="let instance of instances"
        [instance]="instance"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-message>
    </div>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NzConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9tZXNzYWdlL21lc3NhZ2UtY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQUUsdUJBQXVCLEVBQXFCLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXJELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7Ozs7QUFFaEQsTUFBTSx3QkFBd0IsR0FBRyxTQUFTLENBQUM7QUFFM0MsTUFBTSx5QkFBeUIsR0FBNEI7SUFDekQsU0FBUyxFQUFFLElBQUk7SUFDZixVQUFVLEVBQUUsSUFBSTtJQUNoQixVQUFVLEVBQUUsQ0FBQztJQUNiLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLEtBQUssRUFBRSxFQUFFO0lBQ1QsV0FBVyxFQUFFLEtBQUs7Q0FDbkIsQ0FBQztBQWtCRixNQUFNLE9BQU8sMkJBQTRCLFNBQVEsc0JBQXNCO0lBSXJFLFlBQVksR0FBc0IsRUFBRSxlQUFnQztRQUNsRSxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBSjlCLFFBQUcsR0FBYyxLQUFLLENBQUM7UUFLckIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxFQUFFLFdBQVcsSUFBSSxLQUFLLENBQUM7SUFDMUMsQ0FBQztJQUVTLHFCQUFxQjtRQUM3QixJQUFJLENBQUMsZUFBZTthQUNqQixnQ0FBZ0MsQ0FBQyx3QkFBd0IsQ0FBQzthQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNwRixJQUFJLE1BQU0sRUFBRTtnQkFDVixNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDO2dCQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVMsWUFBWTtRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1osR0FBRyx5QkFBeUI7WUFDNUIsR0FBRyxJQUFJLENBQUMsTUFBTTtZQUNkLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyx3QkFBd0IsQ0FBQztTQUN4RSxDQUFDO1FBRUYsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7O3dIQWpDVSwyQkFBMkI7NEdBQTNCLDJCQUEyQixxSEFWNUI7Ozs7Ozs7O0dBUVQ7MkZBRVUsMkJBQTJCO2tCQWhCdkMsU0FBUzttQkFBQztvQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7R0FRVDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNZXNzYWdlQ29uZmlnLCBOekNvbmZpZ1NlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IHRvQ3NzUGl4ZWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56TU5Db250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UnO1xuXG5jb25zdCBOWl9DT05GSUdfQ09NUE9ORU5UX05BTUUgPSAnbWVzc2FnZSc7XG5cbmNvbnN0IE5aX01FU1NBR0VfREVGQVVMVF9DT05GSUc6IFJlcXVpcmVkPE1lc3NhZ2VDb25maWc+ID0ge1xuICBuekFuaW1hdGU6IHRydWUsXG4gIG56RHVyYXRpb246IDMwMDAsXG4gIG56TWF4U3RhY2s6IDcsXG4gIG56UGF1c2VPbkhvdmVyOiB0cnVlLFxuICBuelRvcDogMjQsXG4gIG56RGlyZWN0aW9uOiAnbHRyJ1xufTtcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ256LW1lc3NhZ2UtY29udGFpbmVyJyxcbiAgZXhwb3J0QXM6ICduek1lc3NhZ2VDb250YWluZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LW1lc3NhZ2VcIiBbY2xhc3MuYW50LW1lc3NhZ2UtcnRsXT1cImRpciA9PT0gJ3J0bCdcIiBbc3R5bGUudG9wXT1cInRvcFwiPlxuICAgICAgPG56LW1lc3NhZ2VcbiAgICAgICAgKm5nRm9yPVwibGV0IGluc3RhbmNlIG9mIGluc3RhbmNlc1wiXG4gICAgICAgIFtpbnN0YW5jZV09XCJpbnN0YW5jZVwiXG4gICAgICAgIChkZXN0cm95ZWQpPVwicmVtb3ZlKCRldmVudC5pZCwgJGV2ZW50LnVzZXJBY3Rpb24pXCJcbiAgICAgID48L256LW1lc3NhZ2U+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpNZXNzYWdlQ29udGFpbmVyQ29tcG9uZW50IGV4dGVuZHMgTnpNTkNvbnRhaW5lckNvbXBvbmVudCB7XG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG4gIHRvcD86IHN0cmluZyB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UpIHtcbiAgICBzdXBlcihjZHIsIG56Q29uZmlnU2VydmljZSk7XG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5uekNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnRm9yQ29tcG9uZW50KE5aX0NPTkZJR19DT01QT05FTlRfTkFNRSk7XG4gICAgdGhpcy5kaXIgPSBjb25maWc/Lm56RGlyZWN0aW9uIHx8ICdsdHInO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmliZUNvbmZpZ0NoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLm56Q29uZmlnU2VydmljZVxuICAgICAgLmdldENvbmZpZ0NoYW5nZUV2ZW50Rm9yQ29tcG9uZW50KE5aX0NPTkZJR19DT01QT05FTlRfTkFNRSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbmZpZygpO1xuICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLm56Q29uZmlnU2VydmljZS5nZXRDb25maWdGb3JDb21wb25lbnQoTlpfQ09ORklHX0NPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgaWYgKGNvbmZpZykge1xuICAgICAgICAgIGNvbnN0IHsgbnpEaXJlY3Rpb24gfSA9IGNvbmZpZztcbiAgICAgICAgICB0aGlzLmRpciA9IG56RGlyZWN0aW9uIHx8IHRoaXMuZGlyO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCB1cGRhdGVDb25maWcoKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICAuLi5OWl9NRVNTQUdFX0RFRkFVTFRfQ09ORklHLFxuICAgICAgLi4udGhpcy5jb25maWcsXG4gICAgICAuLi50aGlzLm56Q29uZmlnU2VydmljZS5nZXRDb25maWdGb3JDb21wb25lbnQoTlpfQ09ORklHX0NPTVBPTkVOVF9OQU1FKVxuICAgIH07XG5cbiAgICB0aGlzLnRvcCA9IHRvQ3NzUGl4ZWwodGhpcy5jb25maWcubnpUb3ApO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=