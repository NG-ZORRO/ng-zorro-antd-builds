/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NzBreakpointService, siderResponsiveMap } from 'ng-zorro-antd/core/services';
import { inNextTick, InputBoolean, toCssPixel } from 'ng-zorro-antd/core/util';
import { NzMenuDirective } from 'ng-zorro-antd/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class NzSiderComponent {
    constructor(platform, cdr, breakpointService, elementRef) {
        this.platform = platform;
        this.cdr = cdr;
        this.breakpointService = breakpointService;
        this.elementRef = elementRef;
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
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-layout-sider');
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
NzSiderComponent.decorators = [
    { type: Component, args: [{
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
                    '[class.ant-layout-sider-zero-width]': `nzCollapsed && nzCollapsedWidth === 0`,
                    '[class.ant-layout-sider-light]': `nzTheme === 'light'`,
                    '[class.ant-layout-sider-dark]': `nzTheme === 'dark'`,
                    '[class.ant-layout-sider-collapsed]': `nzCollapsed`,
                    '[style.flex]': 'flexSetting',
                    '[style.maxWidth]': 'widthSetting',
                    '[style.minWidth]': 'widthSetting',
                    '[style.width]': 'widthSetting'
                }
            },] }
];
NzSiderComponent.ctorParameters = () => [
    { type: Platform },
    { type: ChangeDetectorRef },
    { type: NzBreakpointService },
    { type: ElementRef }
];
NzSiderComponent.propDecorators = {
    nzMenuDirective: [{ type: ContentChild, args: [NzMenuDirective,] }],
    nzCollapsedChange: [{ type: Output }],
    nzWidth: [{ type: Input }],
    nzTheme: [{ type: Input }],
    nzCollapsedWidth: [{ type: Input }],
    nzBreakpoint: [{ type: Input }],
    nzZeroTrigger: [{ type: Input }],
    nzTrigger: [{ type: Input }],
    nzReverseArrow: [{ type: Input }],
    nzCollapsible: [{ type: Input }],
    nzCollapsed: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSiderComponent.prototype, "nzReverseArrow", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSiderComponent.prototype, "nzCollapsible", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSiderComponent.prototype, "nzCollapsed", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9sYXlvdXQvc2lkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBR04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBbUIsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV2RyxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFxQzNDLE1BQU0sT0FBTyxnQkFBZ0I7SUEyQzNCLFlBQ1UsUUFBa0IsRUFDbEIsR0FBc0IsRUFDdEIsaUJBQXNDLEVBQ3RDLFVBQXNCO1FBSHRCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFxQjtRQUN0QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBMUN4QixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNGLG9CQUFlLEdBQTJCLElBQUksQ0FBQztRQUMzRCxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELFlBQU8sR0FBb0IsR0FBRyxDQUFDO1FBQy9CLFlB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QUN0QjtJQUFmLFlBQVksRUFBRTs7cURBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOekJyZWFrcG9pbnRLZXksIE56QnJlYWtwb2ludFNlcnZpY2UsIHNpZGVyUmVzcG9uc2l2ZU1hcCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgaW5OZXh0VGljaywgSW5wdXRCb29sZWFuLCB0b0Nzc1BpeGVsIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgTnpNZW51RGlyZWN0aXZlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tZW51JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotc2lkZXInLFxuICBleHBvcnRBczogJ256U2lkZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1sYXlvdXQtc2lkZXItY2hpbGRyZW5cIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cIm56Q29sbGFwc2libGUgJiYgbnpUcmlnZ2VyICE9PSBudWxsXCJcbiAgICAgIG56LXNpZGVyLXRyaWdnZXJcbiAgICAgIFttYXRjaEJyZWFrUG9pbnRdPVwibWF0Y2hCcmVha1BvaW50XCJcbiAgICAgIFtuekNvbGxhcHNlZFdpZHRoXT1cIm56Q29sbGFwc2VkV2lkdGhcIlxuICAgICAgW256Q29sbGFwc2VkXT1cIm56Q29sbGFwc2VkXCJcbiAgICAgIFtuekJyZWFrcG9pbnRdPVwibnpCcmVha3BvaW50XCJcbiAgICAgIFtuelJldmVyc2VBcnJvd109XCJuelJldmVyc2VBcnJvd1wiXG4gICAgICBbbnpUcmlnZ2VyXT1cIm56VHJpZ2dlclwiXG4gICAgICBbbnpaZXJvVHJpZ2dlcl09XCJuelplcm9UcmlnZ2VyXCJcbiAgICAgIFtzaWRlcldpZHRoXT1cIndpZHRoU2V0dGluZ1wiXG4gICAgICAoY2xpY2spPVwic2V0Q29sbGFwc2VkKCFuekNvbGxhcHNlZClcIlxuICAgID48L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LWxheW91dC1zaWRlci16ZXJvLXdpZHRoXSc6IGBuekNvbGxhcHNlZCAmJiBuekNvbGxhcHNlZFdpZHRoID09PSAwYCxcbiAgICAnW2NsYXNzLmFudC1sYXlvdXQtc2lkZXItbGlnaHRdJzogYG56VGhlbWUgPT09ICdsaWdodCdgLFxuICAgICdbY2xhc3MuYW50LWxheW91dC1zaWRlci1kYXJrXSc6IGBuelRoZW1lID09PSAnZGFyaydgLFxuICAgICdbY2xhc3MuYW50LWxheW91dC1zaWRlci1jb2xsYXBzZWRdJzogYG56Q29sbGFwc2VkYCxcbiAgICAnW3N0eWxlLmZsZXhdJzogJ2ZsZXhTZXR0aW5nJyxcbiAgICAnW3N0eWxlLm1heFdpZHRoXSc6ICd3aWR0aFNldHRpbmcnLFxuICAgICdbc3R5bGUubWluV2lkdGhdJzogJ3dpZHRoU2V0dGluZycsXG4gICAgJ1tzdHlsZS53aWR0aF0nOiAnd2lkdGhTZXR0aW5nJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56U2lkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256UmV2ZXJzZUFycm93OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNvbGxhcHNpYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNvbGxhcHNlZDogQm9vbGVhbklucHV0O1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBAQ29udGVudENoaWxkKE56TWVudURpcmVjdGl2ZSkgbnpNZW51RGlyZWN0aXZlOiBOek1lbnVEaXJlY3RpdmUgfCBudWxsID0gbnVsbDtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q29sbGFwc2VkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSBueldpZHRoOiBzdHJpbmcgfCBudW1iZXIgPSAyMDA7XG4gIEBJbnB1dCgpIG56VGhlbWU6ICdsaWdodCcgfCAnZGFyaycgPSAnZGFyayc7XG4gIEBJbnB1dCgpIG56Q29sbGFwc2VkV2lkdGggPSA4MDtcbiAgQElucHV0KCkgbnpCcmVha3BvaW50OiBOekJyZWFrcG9pbnRLZXkgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpaZXJvVHJpZ2dlcjogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpUcmlnZ2VyOiBUZW1wbGF0ZVJlZjx2b2lkPiB8IHVuZGVmaW5lZCB8IG51bGwgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelJldmVyc2VBcnJvdyA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpDb2xsYXBzaWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpDb2xsYXBzZWQgPSBmYWxzZTtcbiAgbWF0Y2hCcmVha1BvaW50ID0gZmFsc2U7XG4gIGZsZXhTZXR0aW5nOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgd2lkdGhTZXR0aW5nOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICB1cGRhdGVTdHlsZU1hcCgpOiB2b2lkIHtcbiAgICB0aGlzLndpZHRoU2V0dGluZyA9IHRoaXMubnpDb2xsYXBzZWQgPyBgJHt0aGlzLm56Q29sbGFwc2VkV2lkdGh9cHhgIDogdG9Dc3NQaXhlbCh0aGlzLm56V2lkdGgpO1xuICAgIHRoaXMuZmxleFNldHRpbmcgPSBgMCAwICR7dGhpcy53aWR0aFNldHRpbmd9YDtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHVwZGF0ZU1lbnVJbmxpbmVDb2xsYXBzZWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpNZW51RGlyZWN0aXZlICYmIHRoaXMubnpNZW51RGlyZWN0aXZlLm56TW9kZSA9PT0gJ2lubGluZScgJiYgdGhpcy5uekNvbGxhcHNlZFdpZHRoICE9PSAwKSB7XG4gICAgICB0aGlzLm56TWVudURpcmVjdGl2ZS5zZXRJbmxpbmVDb2xsYXBzZWQodGhpcy5uekNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q29sbGFwc2VkKGNvbGxhcHNlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChjb2xsYXBzZWQgIT09IHRoaXMubnpDb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMubnpDb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XG4gICAgICB0aGlzLm56Q29sbGFwc2VkQ2hhbmdlLmVtaXQoY29sbGFwc2VkKTtcbiAgICAgIHRoaXMudXBkYXRlTWVudUlubGluZUNvbGxhcHNlZCgpO1xuICAgICAgdGhpcy51cGRhdGVTdHlsZU1hcCgpO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgYnJlYWtwb2ludFNlcnZpY2U6IE56QnJlYWtwb2ludFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICkge1xuICAgIC8vIFRPRE86IG1vdmUgdG8gaG9zdCBhZnRlciBWaWV3IEVuZ2luZSBkZXByZWNhdGlvblxuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FudC1sYXlvdXQtc2lkZXInKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlU3R5bGVNYXAoKTtcblxuICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5icmVha3BvaW50U2VydmljZVxuICAgICAgICAuc3Vic2NyaWJlKHNpZGVyUmVzcG9uc2l2ZU1hcCwgdHJ1ZSlcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKG1hcCA9PiB7XG4gICAgICAgICAgY29uc3QgYnJlYWtwb2ludCA9IHRoaXMubnpCcmVha3BvaW50O1xuICAgICAgICAgIGlmIChicmVha3BvaW50KSB7XG4gICAgICAgICAgICBpbk5leHRUaWNrKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5tYXRjaEJyZWFrUG9pbnQgPSAhbWFwW2JyZWFrcG9pbnRdO1xuICAgICAgICAgICAgICB0aGlzLnNldENvbGxhcHNlZCh0aGlzLm1hdGNoQnJlYWtQb2ludCk7XG4gICAgICAgICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuekNvbGxhcHNlZCwgbnpDb2xsYXBzZWRXaWR0aCwgbnpXaWR0aCB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpDb2xsYXBzZWQgfHwgbnpDb2xsYXBzZWRXaWR0aCB8fCBueldpZHRoKSB7XG4gICAgICB0aGlzLnVwZGF0ZVN0eWxlTWFwKCk7XG4gICAgfVxuICAgIGlmIChuekNvbGxhcHNlZCkge1xuICAgICAgdGhpcy51cGRhdGVNZW51SW5saW5lQ29sbGFwc2VkKCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlTWVudUlubGluZUNvbGxhcHNlZCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=