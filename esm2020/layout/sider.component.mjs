import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { siderResponsiveMap } from 'ng-zorro-antd/core/services';
import { inNextTick, InputBoolean, toCssPixel } from 'ng-zorro-antd/core/util';
import { NzMenuDirective } from 'ng-zorro-antd/menu';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
import * as i2 from "ng-zorro-antd/core/services";
import * as i3 from "./sider-trigger.component";
import * as i4 from "@angular/common";
export class NzSiderComponent {
    constructor(platform, cdr, breakpointService) {
        this.platform = platform;
        this.cdr = cdr;
        this.breakpointService = breakpointService;
        this.destroy$ = new Subject();
        this.nzMenuDirective = null;
        this.nzCollapsedChange = new EventEmitter();
        this.nzWidth = 200;
        this.nzTheme = 'dark';
        this.nzCollapsedWidth = 80;
        this.nzBreakpoint = null;
        this.nzZeroTrigger = null;
        this.nzTrigger = undefined;
        this.nzReverseArrow = false;
        this.nzCollapsible = false;
        this.nzCollapsed = false;
        this.matchBreakPoint = false;
        this.flexSetting = null;
        this.widthSetting = null;
    }
    updateStyleMap() {
        this.widthSetting = this.nzCollapsed ? `${this.nzCollapsedWidth}px` : toCssPixel(this.nzWidth);
        this.flexSetting = `0 0 ${this.widthSetting}`;
        this.cdr.markForCheck();
    }
    updateMenuInlineCollapsed() {
        if (this.nzMenuDirective && this.nzMenuDirective.nzMode === 'inline' && this.nzCollapsedWidth !== 0) {
            this.nzMenuDirective.setInlineCollapsed(this.nzCollapsed);
        }
    }
    setCollapsed(collapsed) {
        if (collapsed !== this.nzCollapsed) {
            this.nzCollapsed = collapsed;
            this.nzCollapsedChange.emit(collapsed);
            this.updateMenuInlineCollapsed();
            this.updateStyleMap();
            this.cdr.markForCheck();
        }
    }
    ngOnInit() {
        this.updateStyleMap();
        if (this.platform.isBrowser) {
            this.breakpointService
                .subscribe(siderResponsiveMap, true)
                .pipe(takeUntil(this.destroy$))
                .subscribe(map => {
                const breakpoint = this.nzBreakpoint;
                if (breakpoint) {
                    inNextTick().subscribe(() => {
                        this.matchBreakPoint = !map[breakpoint];
                        this.setCollapsed(this.matchBreakPoint);
                        this.cdr.markForCheck();
                    });
                }
            });
        }
    }
    ngOnChanges(changes) {
        const { nzCollapsed, nzCollapsedWidth, nzWidth } = changes;
        if (nzCollapsed || nzCollapsedWidth || nzWidth) {
            this.updateStyleMap();
        }
        if (nzCollapsed) {
            this.updateMenuInlineCollapsed();
        }
    }
    ngAfterContentInit() {
        this.updateMenuInlineCollapsed();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzSiderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSiderComponent, deps: [{ token: i1.Platform }, { token: i0.ChangeDetectorRef }, { token: i2.NzBreakpointService }], target: i0.ɵɵFactoryTarget.Component });
NzSiderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSiderComponent, selector: "nz-sider", inputs: { nzWidth: "nzWidth", nzTheme: "nzTheme", nzCollapsedWidth: "nzCollapsedWidth", nzBreakpoint: "nzBreakpoint", nzZeroTrigger: "nzZeroTrigger", nzTrigger: "nzTrigger", nzReverseArrow: "nzReverseArrow", nzCollapsible: "nzCollapsible", nzCollapsed: "nzCollapsed" }, outputs: { nzCollapsedChange: "nzCollapsedChange" }, host: { properties: { "class.ant-layout-sider-zero-width": "nzCollapsed && nzCollapsedWidth === 0", "class.ant-layout-sider-light": "nzTheme === 'light'", "class.ant-layout-sider-dark": "nzTheme === 'dark'", "class.ant-layout-sider-collapsed": "nzCollapsed", "class.ant-layout-sider-has-trigger": "nzCollapsible && nzTrigger !== null", "style.flex": "flexSetting", "style.maxWidth": "widthSetting", "style.minWidth": "widthSetting", "style.width": "widthSetting" }, classAttribute: "ant-layout-sider" }, queries: [{ propertyName: "nzMenuDirective", first: true, predicate: NzMenuDirective, descendants: true }], exportAs: ["nzSider"], usesOnChanges: true, ngImport: i0, template: `
    <div class="ant-layout-sider-children">
      <ng-content></ng-content>
    </div>
    <div
      *ngIf="nzCollapsible && nzTrigger !== null"
      nz-sider-trigger
      [matchBreakPoint]="matchBreakPoint"
      [nzCollapsedWidth]="nzCollapsedWidth"
      [nzCollapsed]="nzCollapsed"
      [nzBreakpoint]="nzBreakpoint"
      [nzReverseArrow]="nzReverseArrow"
      [nzTrigger]="nzTrigger"
      [nzZeroTrigger]="nzZeroTrigger"
      [siderWidth]="widthSetting"
      (click)="setCollapsed(!nzCollapsed)"
    ></div>
  `, isInline: true, components: [{ type: i3.NzSiderTriggerComponent, selector: "[nz-sider-trigger]", inputs: ["nzCollapsed", "nzReverseArrow", "nzZeroTrigger", "nzTrigger", "matchBreakPoint", "nzCollapsedWidth", "siderWidth", "nzBreakpoint"], exportAs: ["nzSiderTrigger"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzSiderComponent.prototype, "nzReverseArrow", void 0);
__decorate([
    InputBoolean()
], NzSiderComponent.prototype, "nzCollapsible", void 0);
__decorate([
    InputBoolean()
], NzSiderComponent.prototype, "nzCollapsed", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSiderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-sider',
                    exportAs: 'nzSider',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div class="ant-layout-sider-children">
      <ng-content></ng-content>
    </div>
    <div
      *ngIf="nzCollapsible && nzTrigger !== null"
      nz-sider-trigger
      [matchBreakPoint]="matchBreakPoint"
      [nzCollapsedWidth]="nzCollapsedWidth"
      [nzCollapsed]="nzCollapsed"
      [nzBreakpoint]="nzBreakpoint"
      [nzReverseArrow]="nzReverseArrow"
      [nzTrigger]="nzTrigger"
      [nzZeroTrigger]="nzZeroTrigger"
      [siderWidth]="widthSetting"
      (click)="setCollapsed(!nzCollapsed)"
    ></div>
  `,
                    host: {
                        class: 'ant-layout-sider',
                        '[class.ant-layout-sider-zero-width]': `nzCollapsed && nzCollapsedWidth === 0`,
                        '[class.ant-layout-sider-light]': `nzTheme === 'light'`,
                        '[class.ant-layout-sider-dark]': `nzTheme === 'dark'`,
                        '[class.ant-layout-sider-collapsed]': `nzCollapsed`,
                        '[class.ant-layout-sider-has-trigger]': `nzCollapsible && nzTrigger !== null`,
                        '[style.flex]': 'flexSetting',
                        '[style.maxWidth]': 'widthSetting',
                        '[style.minWidth]': 'widthSetting',
                        '[style.width]': 'widthSetting'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.Platform }, { type: i0.ChangeDetectorRef }, { type: i2.NzBreakpointService }]; }, propDecorators: { nzMenuDirective: [{
                type: ContentChild,
                args: [NzMenuDirective]
            }], nzCollapsedChange: [{
                type: Output
            }], nzWidth: [{
                type: Input
            }], nzTheme: [{
                type: Input
            }], nzCollapsedWidth: [{
                type: Input
            }], nzBreakpoint: [{
                type: Input
            }], nzZeroTrigger: [{
                type: Input
            }], nzTrigger: [{
                type: Input
            }], nzReverseArrow: [{
                type: Input
            }], nzCollapsible: [{
                type: Input
            }], nzCollapsed: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9sYXlvdXQvc2lkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBR04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBd0Msa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV2RyxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztBQXVDckQsTUFBTSxPQUFPLGdCQUFnQjtJQTJDM0IsWUFDVSxRQUFrQixFQUNsQixHQUFzQixFQUN0QixpQkFBc0M7UUFGdEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQXFCO1FBekN4QyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNGLG9CQUFlLEdBQTJCLElBQUksQ0FBQztRQUMzRCxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELFlBQU8sR0FBb0IsR0FBRyxDQUFDO1FBQy9CLFlBQU8sR0FBcUIsTUFBTSxDQUFDO1FBQ25DLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixpQkFBWSxHQUEyQixJQUFJLENBQUM7UUFDNUMsa0JBQWEsR0FBNkIsSUFBSSxDQUFDO1FBQy9DLGNBQVMsR0FBeUMsU0FB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YUFBYTtzQkFBckMsS0FBSztnQkFDbUIsV0FBVztzQkFBbkMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOekJyZWFrcG9pbnRLZXksIE56QnJlYWtwb2ludFNlcnZpY2UsIHNpZGVyUmVzcG9uc2l2ZU1hcCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgaW5OZXh0VGljaywgSW5wdXRCb29sZWFuLCB0b0Nzc1BpeGVsIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgTnpNZW51RGlyZWN0aXZlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tZW51JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotc2lkZXInLFxuICBleHBvcnRBczogJ256U2lkZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1sYXlvdXQtc2lkZXItY2hpbGRyZW5cIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cIm56Q29sbGFwc2libGUgJiYgbnpUcmlnZ2VyICE9PSBudWxsXCJcbiAgICAgIG56LXNpZGVyLXRyaWdnZXJcbiAgICAgIFttYXRjaEJyZWFrUG9pbnRdPVwibWF0Y2hCcmVha1BvaW50XCJcbiAgICAgIFtuekNvbGxhcHNlZFdpZHRoXT1cIm56Q29sbGFwc2VkV2lkdGhcIlxuICAgICAgW256Q29sbGFwc2VkXT1cIm56Q29sbGFwc2VkXCJcbiAgICAgIFtuekJyZWFrcG9pbnRdPVwibnpCcmVha3BvaW50XCJcbiAgICAgIFtuelJldmVyc2VBcnJvd109XCJuelJldmVyc2VBcnJvd1wiXG4gICAgICBbbnpUcmlnZ2VyXT1cIm56VHJpZ2dlclwiXG4gICAgICBbbnpaZXJvVHJpZ2dlcl09XCJuelplcm9UcmlnZ2VyXCJcbiAgICAgIFtzaWRlcldpZHRoXT1cIndpZHRoU2V0dGluZ1wiXG4gICAgICAoY2xpY2spPVwic2V0Q29sbGFwc2VkKCFuekNvbGxhcHNlZClcIlxuICAgID48L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LWxheW91dC1zaWRlcicsXG4gICAgJ1tjbGFzcy5hbnQtbGF5b3V0LXNpZGVyLXplcm8td2lkdGhdJzogYG56Q29sbGFwc2VkICYmIG56Q29sbGFwc2VkV2lkdGggPT09IDBgLFxuICAgICdbY2xhc3MuYW50LWxheW91dC1zaWRlci1saWdodF0nOiBgbnpUaGVtZSA9PT0gJ2xpZ2h0J2AsXG4gICAgJ1tjbGFzcy5hbnQtbGF5b3V0LXNpZGVyLWRhcmtdJzogYG56VGhlbWUgPT09ICdkYXJrJ2AsXG4gICAgJ1tjbGFzcy5hbnQtbGF5b3V0LXNpZGVyLWNvbGxhcHNlZF0nOiBgbnpDb2xsYXBzZWRgLFxuICAgICdbY2xhc3MuYW50LWxheW91dC1zaWRlci1oYXMtdHJpZ2dlcl0nOiBgbnpDb2xsYXBzaWJsZSAmJiBuelRyaWdnZXIgIT09IG51bGxgLFxuICAgICdbc3R5bGUuZmxleF0nOiAnZmxleFNldHRpbmcnLFxuICAgICdbc3R5bGUubWF4V2lkdGhdJzogJ3dpZHRoU2V0dGluZycsXG4gICAgJ1tzdHlsZS5taW5XaWR0aF0nOiAnd2lkdGhTZXR0aW5nJyxcbiAgICAnW3N0eWxlLndpZHRoXSc6ICd3aWR0aFNldHRpbmcnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpTaWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpSZXZlcnNlQXJyb3c6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q29sbGFwc2libGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q29sbGFwc2VkOiBCb29sZWFuSW5wdXQ7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG4gIEBDb250ZW50Q2hpbGQoTnpNZW51RGlyZWN0aXZlKSBuek1lbnVEaXJlY3RpdmU6IE56TWVudURpcmVjdGl2ZSB8IG51bGwgPSBudWxsO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDb2xsYXBzZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgpIG56V2lkdGg6IHN0cmluZyB8IG51bWJlciA9IDIwMDtcbiAgQElucHV0KCkgbnpUaGVtZTogJ2xpZ2h0JyB8ICdkYXJrJyA9ICdkYXJrJztcbiAgQElucHV0KCkgbnpDb2xsYXBzZWRXaWR0aCA9IDgwO1xuICBASW5wdXQoKSBuekJyZWFrcG9pbnQ6IE56QnJlYWtwb2ludEtleSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelplcm9UcmlnZ2VyOiBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelRyaWdnZXI6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgdW5kZWZpbmVkIHwgbnVsbCA9IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56UmV2ZXJzZUFycm93ID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekNvbGxhcHNpYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekNvbGxhcHNlZCA9IGZhbHNlO1xuICBtYXRjaEJyZWFrUG9pbnQgPSBmYWxzZTtcbiAgZmxleFNldHRpbmc6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICB3aWR0aFNldHRpbmc6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIHVwZGF0ZVN0eWxlTWFwKCk6IHZvaWQge1xuICAgIHRoaXMud2lkdGhTZXR0aW5nID0gdGhpcy5uekNvbGxhcHNlZCA/IGAke3RoaXMubnpDb2xsYXBzZWRXaWR0aH1weGAgOiB0b0Nzc1BpeGVsKHRoaXMubnpXaWR0aCk7XG4gICAgdGhpcy5mbGV4U2V0dGluZyA9IGAwIDAgJHt0aGlzLndpZHRoU2V0dGluZ31gO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgdXBkYXRlTWVudUlubGluZUNvbGxhcHNlZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uek1lbnVEaXJlY3RpdmUgJiYgdGhpcy5uek1lbnVEaXJlY3RpdmUubnpNb2RlID09PSAnaW5saW5lJyAmJiB0aGlzLm56Q29sbGFwc2VkV2lkdGggIT09IDApIHtcbiAgICAgIHRoaXMubnpNZW51RGlyZWN0aXZlLnNldElubGluZUNvbGxhcHNlZCh0aGlzLm56Q29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBzZXRDb2xsYXBzZWQoY29sbGFwc2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGNvbGxhcHNlZCAhPT0gdGhpcy5uekNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5uekNvbGxhcHNlZCA9IGNvbGxhcHNlZDtcbiAgICAgIHRoaXMubnpDb2xsYXBzZWRDaGFuZ2UuZW1pdChjb2xsYXBzZWQpO1xuICAgICAgdGhpcy51cGRhdGVNZW51SW5saW5lQ29sbGFwc2VkKCk7XG4gICAgICB0aGlzLnVwZGF0ZVN0eWxlTWFwKCk7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBicmVha3BvaW50U2VydmljZTogTnpCcmVha3BvaW50U2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVTdHlsZU1hcCgpO1xuXG4gICAgaWYgKHRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLmJyZWFrcG9pbnRTZXJ2aWNlXG4gICAgICAgIC5zdWJzY3JpYmUoc2lkZXJSZXNwb25zaXZlTWFwLCB0cnVlKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUobWFwID0+IHtcbiAgICAgICAgICBjb25zdCBicmVha3BvaW50ID0gdGhpcy5uekJyZWFrcG9pbnQ7XG4gICAgICAgICAgaWYgKGJyZWFrcG9pbnQpIHtcbiAgICAgICAgICAgIGluTmV4dFRpY2soKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm1hdGNoQnJlYWtQb2ludCA9ICFtYXBbYnJlYWtwb2ludF07XG4gICAgICAgICAgICAgIHRoaXMuc2V0Q29sbGFwc2VkKHRoaXMubWF0Y2hCcmVha1BvaW50KTtcbiAgICAgICAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56Q29sbGFwc2VkLCBuekNvbGxhcHNlZFdpZHRoLCBueldpZHRoIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuekNvbGxhcHNlZCB8fCBuekNvbGxhcHNlZFdpZHRoIHx8IG56V2lkdGgpIHtcbiAgICAgIHRoaXMudXBkYXRlU3R5bGVNYXAoKTtcbiAgICB9XG4gICAgaWYgKG56Q29sbGFwc2VkKSB7XG4gICAgICB0aGlzLnVwZGF0ZU1lbnVJbmxpbmVDb2xsYXBzZWQoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVNZW51SW5saW5lQ29sbGFwc2VkKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==