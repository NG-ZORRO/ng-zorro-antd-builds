import { Directive, Input, Optional } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { gridResponsiveMap } from 'ng-zorro-antd/core/services';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/layout";
import * as i2 from "@angular/cdk/platform";
import * as i3 from "ng-zorro-antd/core/services";
import * as i4 from "@angular/cdk/bidi";
export class NzRowDirective {
    constructor(elementRef, renderer, mediaMatcher, ngZone, platform, breakpointService, directionality) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.mediaMatcher = mediaMatcher;
        this.ngZone = ngZone;
        this.platform = platform;
        this.breakpointService = breakpointService;
        this.directionality = directionality;
        this.nzAlign = null;
        this.nzJustify = null;
        this.nzGutter = null;
        this.actualGutter$ = new ReplaySubject(1);
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    getGutter() {
        const results = [null, null];
        const gutter = this.nzGutter || 0;
        const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, null];
        normalizedGutter.forEach((g, index) => {
            if (typeof g === 'object' && g !== null) {
                results[index] = null;
                Object.keys(gridResponsiveMap).map((screen) => {
                    const bp = screen;
                    if (this.mediaMatcher.matchMedia(gridResponsiveMap[bp]).matches && g[bp]) {
                        results[index] = g[bp];
                    }
                });
            }
            else {
                results[index] = Number(g) || null;
            }
        });
        return results;
    }
    setGutterStyle() {
        const [horizontalGutter, verticalGutter] = this.getGutter();
        this.actualGutter$.next([horizontalGutter, verticalGutter]);
        const renderGutter = (name, gutter) => {
            const nativeElement = this.elementRef.nativeElement;
            if (gutter !== null) {
                this.renderer.setStyle(nativeElement, name, `-${gutter / 2}px`);
            }
        };
        renderGutter('margin-left', horizontalGutter);
        renderGutter('margin-right', horizontalGutter);
        renderGutter('margin-top', verticalGutter);
        renderGutter('margin-bottom', verticalGutter);
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
        this.setGutterStyle();
    }
    ngOnChanges(changes) {
        if (changes.nzGutter) {
            this.setGutterStyle();
        }
    }
    ngAfterViewInit() {
        if (this.platform.isBrowser) {
            this.breakpointService
                .subscribe(gridResponsiveMap)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.setGutterStyle();
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzRowDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRowDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.MediaMatcher }, { token: i0.NgZone }, { token: i2.Platform }, { token: i3.NzBreakpointService }, { token: i4.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzRowDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: { nzAlign: "nzAlign", nzJustify: "nzJustify", nzGutter: "nzGutter" }, host: { properties: { "class.ant-row-top": "nzAlign === 'top'", "class.ant-row-middle": "nzAlign === 'middle'", "class.ant-row-bottom": "nzAlign === 'bottom'", "class.ant-row-start": "nzJustify === 'start'", "class.ant-row-end": "nzJustify === 'end'", "class.ant-row-center": "nzJustify === 'center'", "class.ant-row-space-around": "nzJustify === 'space-around'", "class.ant-row-space-between": "nzJustify === 'space-between'", "class.ant-row-rtl": "dir === \"rtl\"" }, classAttribute: "ant-row" }, exportAs: ["nzRow"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRowDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-row],nz-row,nz-form-item',
                    exportAs: 'nzRow',
                    host: {
                        class: 'ant-row',
                        '[class.ant-row-top]': `nzAlign === 'top'`,
                        '[class.ant-row-middle]': `nzAlign === 'middle'`,
                        '[class.ant-row-bottom]': `nzAlign === 'bottom'`,
                        '[class.ant-row-start]': `nzJustify === 'start'`,
                        '[class.ant-row-end]': `nzJustify === 'end'`,
                        '[class.ant-row-center]': `nzJustify === 'center'`,
                        '[class.ant-row-space-around]': `nzJustify === 'space-around'`,
                        '[class.ant-row-space-between]': `nzJustify === 'space-between'`,
                        '[class.ant-row-rtl]': `dir === "rtl"`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.MediaMatcher }, { type: i0.NgZone }, { type: i2.Platform }, { type: i3.NzBreakpointService }, { type: i4.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzAlign: [{
                type: Input
            }], nzJustify: [{
                type: Input
            }], nzGutter: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvZ3JpZC9yb3cuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFFTCxTQUFTLEVBRVQsS0FBSyxFQUtMLFFBQVEsRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGlCQUFpQixFQUF3QyxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7QUFzQnRHLE1BQU0sT0FBTyxjQUFjO0lBNkN6QixZQUNTLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLFlBQTBCLEVBQzFCLE1BQWMsRUFDZCxRQUFrQixFQUNqQixpQkFBc0MsRUFDMUIsY0FBOEI7UUFOM0MsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2pCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBcUI7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBbkQzQyxZQUFPLEdBQW1CLElBQUksQ0FBQztRQUMvQixjQUFTLEdBQXFCLElBQUksQ0FBQztRQUNuQyxhQUFRLEdBQ2YsSUFBSSxDQUFDO1FBRUUsa0JBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBaUMsQ0FBQyxDQUFDLENBQUM7UUFFOUUsUUFBRyxHQUFjLEtBQUssQ0FBQztRQUNOLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBNEN2QyxDQUFDO0lBMUNKLFNBQVM7UUFDUCxNQUFNLE9BQU8sR0FBbUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENB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UyxDQUFDLGlCQUFpQixDQUFDO2lCQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDOUIsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OzJHQXBGVSxjQUFjOytGQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFoQjFCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsUUFBUSxFQUFFLE9BQU87b0JBQ2pCLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsU0FBUzt3QkFDaEIscUJBQXFCLEVBQUUsbUJBQW1CO3dCQUMxQyx3QkFBd0IsRUFBRSxzQkFBc0I7d0JBQ2hELHdCQUF3QixFQUFFLHNCQUFzQjt3QkFDaEQsdUJBQXVCLEVBQUUsdUJBQXVCO3dCQUNoRCxxQkFBcUIsRUFBRSxxQkFBcUI7d0JBQzVDLHdCQUF3QixFQUFFLHdCQUF3Qjt3QkFDbEQsOEJBQThCLEVBQUUsOEJBQThCO3dCQUM5RCwrQkFBK0IsRUFBRSwrQkFBK0I7d0JBQ2hFLHFCQUFxQixFQUFFLGVBQWU7cUJBQ3ZDO2lCQUNGOzswQkFxREksUUFBUTs0Q0FuREYsT0FBTztzQkFBZixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBNZWRpYU1hdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgZ3JpZFJlc3BvbnNpdmVNYXAsIE56QnJlYWtwb2ludEtleSwgTnpCcmVha3BvaW50U2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBJbmRleGFibGVPYmplY3QgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBOekp1c3RpZnkgPSAnc3RhcnQnIHwgJ2VuZCcgfCAnY2VudGVyJyB8ICdzcGFjZS1hcm91bmQnIHwgJ3NwYWNlLWJldHdlZW4nO1xuZXhwb3J0IHR5cGUgTnpBbGlnbiA9ICd0b3AnIHwgJ21pZGRsZScgfCAnYm90dG9tJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW256LXJvd10sbnotcm93LG56LWZvcm0taXRlbScsXG4gIGV4cG9ydEFzOiAnbnpSb3cnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtcm93JyxcbiAgICAnW2NsYXNzLmFudC1yb3ctdG9wXSc6IGBuekFsaWduID09PSAndG9wJ2AsXG4gICAgJ1tjbGFzcy5hbnQtcm93LW1pZGRsZV0nOiBgbnpBbGlnbiA9PT0gJ21pZGRsZSdgLFxuICAgICdbY2xhc3MuYW50LXJvdy1ib3R0b21dJzogYG56QWxpZ24gPT09ICdib3R0b20nYCxcbiAgICAnW2NsYXNzLmFudC1yb3ctc3RhcnRdJzogYG56SnVzdGlmeSA9PT0gJ3N0YXJ0J2AsXG4gICAgJ1tjbGFzcy5hbnQtcm93LWVuZF0nOiBgbnpKdXN0aWZ5ID09PSAnZW5kJ2AsXG4gICAgJ1tjbGFzcy5hbnQtcm93LWNlbnRlcl0nOiBgbnpKdXN0aWZ5ID09PSAnY2VudGVyJ2AsXG4gICAgJ1tjbGFzcy5hbnQtcm93LXNwYWNlLWFyb3VuZF0nOiBgbnpKdXN0aWZ5ID09PSAnc3BhY2UtYXJvdW5kJ2AsXG4gICAgJ1tjbGFzcy5hbnQtcm93LXNwYWNlLWJldHdlZW5dJzogYG56SnVzdGlmeSA9PT0gJ3NwYWNlLWJldHdlZW4nYCxcbiAgICAnW2NsYXNzLmFudC1yb3ctcnRsXSc6IGBkaXIgPT09IFwicnRsXCJgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpSb3dEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgbnpBbGlnbjogTnpBbGlnbiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekp1c3RpZnk6IE56SnVzdGlmeSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekd1dHRlcjogc3RyaW5nIHwgbnVtYmVyIHwgSW5kZXhhYmxlT2JqZWN0IHwgW251bWJlciwgbnVtYmVyXSB8IFtJbmRleGFibGVPYmplY3QsIEluZGV4YWJsZU9iamVjdF0gfCBudWxsID1cbiAgICBudWxsO1xuXG4gIHJlYWRvbmx5IGFjdHVhbEd1dHRlciQgPSBuZXcgUmVwbGF5U3ViamVjdDxbbnVtYmVyIHwgbnVsbCwgbnVtYmVyIHwgbnVsbF0+KDEpO1xuXG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGdldEd1dHRlcigpOiBbbnVtYmVyIHwgbnVsbCwgbnVtYmVyIHwgbnVsbF0ge1xuICAgIGNvbnN0IHJlc3VsdHM6IFtudW1iZXIgfCBudWxsLCBudW1iZXIgfCBudWxsXSA9IFtudWxsLCBudWxsXTtcbiAgICBjb25zdCBndXR0ZXIgPSB0aGlzLm56R3V0dGVyIHx8IDA7XG4gICAgY29uc3Qgbm9ybWFsaXplZEd1dHRlciA9IEFycmF5LmlzQXJyYXkoZ3V0dGVyKSA/IGd1dHRlciA6IFtndXR0ZXIsIG51bGxdO1xuICAgIG5vcm1hbGl6ZWRHdXR0ZXIuZm9yRWFjaCgoZywgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZyA9PT0gJ29iamVjdCcgJiYgZyAhPT0gbnVsbCkge1xuICAgICAgICByZXN1bHRzW2luZGV4XSA9IG51bGw7XG4gICAgICAgIE9iamVjdC5rZXlzKGdyaWRSZXNwb25zaXZlTWFwKS5tYXAoKHNjcmVlbjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgYnAgPSBzY3JlZW4gYXMgTnpCcmVha3BvaW50S2V5O1xuICAgICAgICAgIGlmICh0aGlzLm1lZGlhTWF0Y2hlci5tYXRjaE1lZGlhKGdyaWRSZXNwb25zaXZlTWFwW2JwXSkubWF0Y2hlcyAmJiBnW2JwXSkge1xuICAgICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSBnIVticF0gYXMgbnVtYmVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRzW2luZGV4XSA9IE51bWJlcihnKSB8fCBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgc2V0R3V0dGVyU3R5bGUoKTogdm9pZCB7XG4gICAgY29uc3QgW2hvcml6b250YWxHdXR0ZXIsIHZlcnRpY2FsR3V0dGVyXSA9IHRoaXMuZ2V0R3V0dGVyKCk7XG4gICAgdGhpcy5hY3R1YWxHdXR0ZXIkLm5leHQoW2hvcml6b250YWxHdXR0ZXIsIHZlcnRpY2FsR3V0dGVyXSk7XG4gICAgY29uc3QgcmVuZGVyR3V0dGVyID0gKG5hbWU6IHN0cmluZywgZ3V0dGVyOiBudW1iZXIgfCBudWxsKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBpZiAoZ3V0dGVyICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobmF0aXZlRWxlbWVudCwgbmFtZSwgYC0ke2d1dHRlciAvIDJ9cHhgKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJlbmRlckd1dHRlcignbWFyZ2luLWxlZnQnLCBob3Jpem9udGFsR3V0dGVyKTtcbiAgICByZW5kZXJHdXR0ZXIoJ21hcmdpbi1yaWdodCcsIGhvcml6b250YWxHdXR0ZXIpO1xuICAgIHJlbmRlckd1dHRlcignbWFyZ2luLXRvcCcsIHZlcnRpY2FsR3V0dGVyKTtcbiAgICByZW5kZXJHdXR0ZXIoJ21hcmdpbi1ib3R0b20nLCB2ZXJ0aWNhbEd1dHRlcik7XG4gIH1cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHVibGljIG1lZGlhTWF0Y2hlcjogTWVkaWFNYXRjaGVyLFxuICAgIHB1YmxpYyBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwdWJsaWMgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByaXZhdGUgYnJlYWtwb2ludFNlcnZpY2U6IE56QnJlYWtwb2ludFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHlcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZT8ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZXRHdXR0ZXJTdHlsZSgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLm56R3V0dGVyKSB7XG4gICAgICB0aGlzLnNldEd1dHRlclN0eWxlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5icmVha3BvaW50U2VydmljZVxuICAgICAgICAuc3Vic2NyaWJlKGdyaWRSZXNwb25zaXZlTWFwKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0R3V0dGVyU3R5bGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=