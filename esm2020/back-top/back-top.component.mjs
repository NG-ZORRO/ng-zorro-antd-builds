import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { fadeMotion } from 'ng-zorro-antd/core/animation';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputNumber } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "ng-zorro-antd/core/services";
import * as i3 from "@angular/cdk/platform";
import * as i4 from "@angular/cdk/bidi";
import * as i5 from "@angular/common";
import * as i6 from "ng-zorro-antd/icon";
const NZ_CONFIG_MODULE_NAME = 'backTop';
export class NzBackTopComponent {
    constructor(doc, nzConfigService, scrollSrv, platform, cd, zone, cdr, directionality) {
        this.doc = doc;
        this.nzConfigService = nzConfigService;
        this.scrollSrv = scrollSrv;
        this.platform = platform;
        this.cd = cd;
        this.zone = zone;
        this.cdr = cdr;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.scrollListenerDestroy$ = new Subject();
        this.destroy$ = new Subject();
        this.target = null;
        this.visible = false;
        this.dir = 'ltr';
        this.nzVisibilityHeight = 400;
        this.nzDuration = 450;
        this.nzClick = new EventEmitter();
        this.dir = this.directionality.value;
    }
    ngOnInit() {
        this.registerScrollEvent();
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    clickBackTop() {
        this.scrollSrv.scrollTo(this.getTarget(), 0, { duration: this.nzDuration });
        this.nzClick.emit(true);
    }
    getTarget() {
        return this.target || window;
    }
    handleScroll() {
        if (this.visible === this.scrollSrv.getScroll(this.getTarget()) > this.nzVisibilityHeight) {
            return;
        }
        this.visible = !this.visible;
        this.cd.detectChanges();
    }
    registerScrollEvent() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.scrollListenerDestroy$.next();
        this.handleScroll();
        this.zone.runOutsideAngular(() => {
            fromEvent(this.getTarget(), 'scroll')
                .pipe(debounceTime(50), takeUntil(this.scrollListenerDestroy$))
                .subscribe(() => this.handleScroll());
        });
    }
    ngOnDestroy() {
        this.scrollListenerDestroy$.next();
        this.scrollListenerDestroy$.complete();
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngOnChanges(changes) {
        const { nzTarget } = changes;
        if (nzTarget) {
            this.target = typeof this.nzTarget === 'string' ? this.doc.querySelector(this.nzTarget) : this.nzTarget;
            this.registerScrollEvent();
        }
    }
}
NzBackTopComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBackTopComponent, deps: [{ token: DOCUMENT }, { token: i1.NzConfigService }, { token: i2.NzScrollService }, { token: i3.Platform }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i4.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzBackTopComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzBackTopComponent, selector: "nz-back-top", inputs: { nzTemplate: "nzTemplate", nzVisibilityHeight: "nzVisibilityHeight", nzTarget: "nzTarget", nzDuration: "nzDuration" }, outputs: { nzClick: "nzClick" }, exportAs: ["nzBackTop"], usesOnChanges: true, ngImport: i0, template: `
    <div
      class="ant-back-top"
      [class.ant-back-top-rtl]="dir === 'rtl'"
      (click)="clickBackTop()"
      @fadeMotion
      *ngIf="visible"
    >
      <ng-template #defaultContent>
        <div class="ant-back-top-content">
          <div class="ant-back-top-icon">
            <i nz-icon nzType="vertical-align-top"></i>
          </div>
        </div>
      </ng-template>
      <ng-template [ngTemplateOutlet]="nzTemplate || defaultContent"></ng-template>
    </div>
  `, isInline: true, directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [fadeMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig(),
    InputNumber()
], NzBackTopComponent.prototype, "nzVisibilityHeight", void 0);
__decorate([
    InputNumber()
], NzBackTopComponent.prototype, "nzDuration", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBackTopComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-back-top',
                    exportAs: 'nzBackTop',
                    animations: [fadeMotion],
                    template: `
    <div
      class="ant-back-top"
      [class.ant-back-top-rtl]="dir === 'rtl'"
      (click)="clickBackTop()"
      @fadeMotion
      *ngIf="visible"
    >
      <ng-template #defaultContent>
        <div class="ant-back-top-content">
          <div class="ant-back-top-icon">
            <i nz-icon nzType="vertical-align-top"></i>
          </div>
        </div>
      </ng-template>
      <ng-template [ngTemplateOutlet]="nzTemplate || defaultContent"></ng-template>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.NzConfigService }, { type: i2.NzScrollService }, { type: i3.Platform }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i4.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzTemplate: [{
                type: Input
            }], nzVisibilityHeight: [{
                type: Input
            }], nzTarget: [{
                type: Input
            }], nzDuration: [{
                type: Input
            }], nzClick: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay10b3AuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9iYWNrLXRvcC9iYWNrLXRvcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFLTCxRQUFRLEVBQ1IsTUFBTSxFQUdOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQWdDLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR3JGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7Ozs7QUFFdEQsTUFBTSxxQkFBcUIsR0FBZ0IsU0FBUyxDQUFDO0FBNEJyRCxNQUFNLE9BQU8sa0JBQWtCO0lBa0I3QixZQUM0QixHQUFjLEVBQ2pDLGVBQWdDLEVBQy9CLFNBQTBCLEVBQzFCLFFBQWtCLEVBQ2xCLEVBQXFCLEVBQ3JCLElBQVksRUFDWixHQUFzQixFQUNWLGNBQThCO1FBUHhCLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFDakMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQy9CLGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBQzFCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ1YsbUJB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QUNoQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQzdCLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDeEcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDOzsrR0FyRlUsa0JBQWtCLGtCQW1CbkIsUUFBUTttR0FuQlAsa0JBQWtCLGtRQXRCbkI7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJULHFaQWxCVyxDQUFDLFVBQVUsQ0FBQztBQW9DYztJQUE1QixVQUFVLEVBQUU7SUFBRSxXQUFXLEVBQUU7OERBQWtDO0FBRS9DO0lBQWQsV0FBVyxFQUFFO3NEQUEwQjsyRkFmdEMsa0JBQWtCO2tCQTFCOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLG1CQUFtQixFQUFFLEtBQUs7aUJBQzNCOzswQkFvQkksTUFBTTsyQkFBQyxRQUFROzswQkFPZixRQUFROzRDQWRGLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ2dDLGtCQUFrQjtzQkFBdkQsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNrQixVQUFVO3NCQUFqQyxLQUFLO2dCQUNhLE9BQU87c0JBQXpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBmYWRlTW90aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2FuaW1hdGlvbic7XG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBOelNjcm9sbFNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvc2VydmljZXMnO1xuaW1wb3J0IHsgTnVtYmVySW5wdXQsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dE51bWJlciB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdiYWNrVG9wJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotYmFjay10b3AnLFxuICBleHBvcnRBczogJ256QmFja1RvcCcsXG4gIGFuaW1hdGlvbnM6IFtmYWRlTW90aW9uXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImFudC1iYWNrLXRvcFwiXG4gICAgICBbY2xhc3MuYW50LWJhY2stdG9wLXJ0bF09XCJkaXIgPT09ICdydGwnXCJcbiAgICAgIChjbGljayk9XCJjbGlja0JhY2tUb3AoKVwiXG4gICAgICBAZmFkZU1vdGlvblxuICAgICAgKm5nSWY9XCJ2aXNpYmxlXCJcbiAgICA+XG4gICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRDb250ZW50PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LWJhY2stdG9wLWNvbnRlbnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LWJhY2stdG9wLWljb25cIj5cbiAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwidmVydGljYWwtYWxpZ24tdG9wXCI+PC9pPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpUZW1wbGF0ZSB8fCBkZWZhdWx0Q29udGVudFwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBOekJhY2tUb3BDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelZpc2liaWxpdHlIZWlnaHQ6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEdXJhdGlvbjogTnVtYmVySW5wdXQ7XG5cbiAgcHJpdmF0ZSBzY3JvbGxMaXN0ZW5lckRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgdGFyZ2V0OiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIHZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcblxuICBASW5wdXQoKSBuelRlbXBsYXRlPzogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0TnVtYmVyKCkgbnpWaXNpYmlsaXR5SGVpZ2h0OiBudW1iZXIgPSA0MDA7XG4gIEBJbnB1dCgpIG56VGFyZ2V0Pzogc3RyaW5nIHwgSFRNTEVsZW1lbnQ7XG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG56RHVyYXRpb246IG51bWJlciA9IDQ1MDtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q2xpY2s6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogTnpTYWZlQW55LFxuICAgIHB1YmxpYyBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIHNjcm9sbFNydjogTnpTY3JvbGxTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eVxuICApIHtcbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdGVyU2Nyb2xsRXZlbnQoKTtcblxuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gIH1cblxuICBjbGlja0JhY2tUb3AoKTogdm9pZCB7XG4gICAgdGhpcy5zY3JvbGxTcnYuc2Nyb2xsVG8odGhpcy5nZXRUYXJnZXQoKSwgMCwgeyBkdXJhdGlvbjogdGhpcy5uekR1cmF0aW9uIH0pO1xuICAgIHRoaXMubnpDbGljay5lbWl0KHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUYXJnZXQoKTogSFRNTEVsZW1lbnQgfCBXaW5kb3cge1xuICAgIHJldHVybiB0aGlzLnRhcmdldCB8fCB3aW5kb3c7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVNjcm9sbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSB0aGlzLnNjcm9sbFNydi5nZXRTY3JvbGwodGhpcy5nZXRUYXJnZXQoKSkgPiB0aGlzLm56VmlzaWJpbGl0eUhlaWdodCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZpc2libGUgPSAhdGhpcy52aXNpYmxlO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlclNjcm9sbEV2ZW50KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zY3JvbGxMaXN0ZW5lckRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmhhbmRsZVNjcm9sbCgpO1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBmcm9tRXZlbnQodGhpcy5nZXRUYXJnZXQoKSwgJ3Njcm9sbCcpXG4gICAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCksIHRha2VVbnRpbCh0aGlzLnNjcm9sbExpc3RlbmVyRGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGFuZGxlU2Nyb2xsKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zY3JvbGxMaXN0ZW5lckRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLnNjcm9sbExpc3RlbmVyRGVzdHJveSQuY29tcGxldGUoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuelRhcmdldCB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpUYXJnZXQpIHtcbiAgICAgIHRoaXMudGFyZ2V0ID0gdHlwZW9mIHRoaXMubnpUYXJnZXQgPT09ICdzdHJpbmcnID8gdGhpcy5kb2MucXVlcnlTZWxlY3Rvcih0aGlzLm56VGFyZ2V0KSA6IHRoaXMubnpUYXJnZXQ7XG4gICAgICB0aGlzLnJlZ2lzdGVyU2Nyb2xsRXZlbnQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==