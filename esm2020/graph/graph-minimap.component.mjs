/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Minimap } from './core/minimap';
import * as i0 from "@angular/core";
export class NzGraphMinimapComponent {
    constructor(elementRef, ngZone) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
    }
    ngOnDestroy() {
        this.minimap?.destroy();
    }
    init(containerEle, zoomBehavior) {
        const svgEle = containerEle.nativeElement.querySelector('svg');
        const zoomEle = containerEle.nativeElement.querySelector('svg > g');
        this.minimap = new Minimap(this.ngZone, svgEle, zoomEle, zoomBehavior, this.elementRef.nativeElement, 150, 0);
    }
    zoom(transform) {
        this.minimap?.zoom(transform);
    }
    update() {
        this.minimap?.update();
    }
}
NzGraphMinimapComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGraphMinimapComponent, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
NzGraphMinimapComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzGraphMinimapComponent, selector: "nz-graph-minimap", host: { properties: { "class.nz-graph-minimap": "true" } }, ngImport: i0, template: `
    <svg>
      <defs>
        <filter id="minimapDropShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feOffset result="offOut" in="SourceGraphic" dx="1" dy="1"></feOffset>
          <feColorMatrix
            result="matrixOut"
            in="offOut"
            type="matrix"
            values="0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.5 0"
          ></feColorMatrix>
          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
        </filter>
      </defs>
      <rect></rect>
    </svg>
    <canvas class="viewport"></canvas>
    <!-- Additional canvas to use as buffer to avoid flickering between updates -->
    <canvas class="buffer"></canvas>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGraphMinimapComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-graph-minimap',
                    template: `
    <svg>
      <defs>
        <filter id="minimapDropShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feOffset result="offOut" in="SourceGraphic" dx="1" dy="1"></feOffset>
          <feColorMatrix
            result="matrixOut"
            in="offOut"
            type="matrix"
            values="0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.5 0"
          ></feColorMatrix>
          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
        </filter>
      </defs>
      <rect></rect>
    </svg>
    <canvas class="viewport"></canvas>
    <!-- Additional canvas to use as buffer to avoid flickering between updates -->
    <canvas class="buffer"></canvas>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.nz-graph-minimap]': 'true'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtbWluaW1hcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2dyYXBoL2dyYXBoLW1pbmltYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQWlDLE1BQU0sZUFBZSxDQUFDO0FBTWxHLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUErQnpDLE1BQU0sT0FBTyx1QkFBdUI7SUFFbEMsWUFBb0IsVUFBbUMsRUFBVSxNQUFjO1FBQTNELGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7SUFFbkYsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksQ0FBQyxZQUF3QixFQUFFLFlBQWdEO1FBQzdFLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9ELE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEgsQ0FBQztJQUVELElBQUksQ0FBQyxTQUEwQjtRQUM3QixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7b0hBcEJVLHVCQUF1Qjt3R0FBdkIsdUJBQXVCLG9IQTFCeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUOzJGQU1VLHVCQUF1QjtrQkE1Qm5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsSUFBSSxFQUFFO3dCQUNKLDBCQUEwQixFQUFFLE1BQU07cUJBQ25DO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgTmdab25lLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWm9vbUJlaGF2aW9yIH0gZnJvbSAnZDMtem9vbSc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IE1pbmltYXAgfSBmcm9tICcuL2NvcmUvbWluaW1hcCc7XG5pbXBvcnQgeyBOelpvb21UcmFuc2Zvcm0gfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWdyYXBoLW1pbmltYXAnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc+XG4gICAgICA8ZGVmcz5cbiAgICAgICAgPGZpbHRlciBpZD1cIm1pbmltYXBEcm9wU2hhZG93XCIgeD1cIi0yMCVcIiB5PVwiLTIwJVwiIHdpZHRoPVwiMTUwJVwiIGhlaWdodD1cIjE1MCVcIj5cbiAgICAgICAgICA8ZmVPZmZzZXQgcmVzdWx0PVwib2ZmT3V0XCIgaW49XCJTb3VyY2VHcmFwaGljXCIgZHg9XCIxXCIgZHk9XCIxXCI+PC9mZU9mZnNldD5cbiAgICAgICAgICA8ZmVDb2xvck1hdHJpeFxuICAgICAgICAgICAgcmVzdWx0PVwibWF0cml4T3V0XCJcbiAgICAgICAgICAgIGluPVwib2ZmT3V0XCJcbiAgICAgICAgICAgIHR5cGU9XCJtYXRyaXhcIlxuICAgICAgICAgICAgdmFsdWVzPVwiMC4xIDAgMCAwIDAgMCAwLjEgMCAwIDAgMCAwIDAuMSAwIDAgMCAwIDAgMC41IDBcIlxuICAgICAgICAgID48L2ZlQ29sb3JNYXRyaXg+XG4gICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHJlc3VsdD1cImJsdXJPdXRcIiBpbj1cIm1hdHJpeE91dFwiIHN0ZERldmlhdGlvbj1cIjJcIj48L2ZlR2F1c3NpYW5CbHVyPlxuICAgICAgICAgIDxmZUJsZW5kIGluPVwiU291cmNlR3JhcGhpY1wiIGluMj1cImJsdXJPdXRcIiBtb2RlPVwibm9ybWFsXCI+PC9mZUJsZW5kPlxuICAgICAgICA8L2ZpbHRlcj5cbiAgICAgIDwvZGVmcz5cbiAgICAgIDxyZWN0PjwvcmVjdD5cbiAgICA8L3N2Zz5cbiAgICA8Y2FudmFzIGNsYXNzPVwidmlld3BvcnRcIj48L2NhbnZhcz5cbiAgICA8IS0tIEFkZGl0aW9uYWwgY2FudmFzIHRvIHVzZSBhcyBidWZmZXIgdG8gYXZvaWQgZmxpY2tlcmluZyBiZXR3ZWVuIHVwZGF0ZXMgLS0+XG4gICAgPGNhbnZhcyBjbGFzcz1cImJ1ZmZlclwiPjwvY2FudmFzPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubnotZ3JhcGgtbWluaW1hcF0nOiAndHJ1ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekdyYXBoTWluaW1hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIG1pbmltYXA/OiBNaW5pbWFwO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7fVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubWluaW1hcD8uZGVzdHJveSgpO1xuICB9XG5cbiAgaW5pdChjb250YWluZXJFbGU6IEVsZW1lbnRSZWYsIHpvb21CZWhhdmlvcjogWm9vbUJlaGF2aW9yPE56U2FmZUFueSwgTnpTYWZlQW55Pik6IHZvaWQge1xuICAgIGNvbnN0IHN2Z0VsZSA9IGNvbnRhaW5lckVsZS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuICAgIGNvbnN0IHpvb21FbGUgPSBjb250YWluZXJFbGUubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdzdmcgPiBnJyk7XG4gICAgdGhpcy5taW5pbWFwID0gbmV3IE1pbmltYXAodGhpcy5uZ1pvbmUsIHN2Z0VsZSwgem9vbUVsZSwgem9vbUJlaGF2aW9yLCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgMTUwLCAwKTtcbiAgfVxuXG4gIHpvb20odHJhbnNmb3JtOiBOelpvb21UcmFuc2Zvcm0pOiB2b2lkIHtcbiAgICB0aGlzLm1pbmltYXA/Lnpvb20odHJhbnNmb3JtKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLm1pbmltYXA/LnVwZGF0ZSgpO1xuICB9XG59XG4iXX0=