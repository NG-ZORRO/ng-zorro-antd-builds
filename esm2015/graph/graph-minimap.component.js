/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Component, ElementRef } from '@angular/core';
import { Minimap } from './core/minimap';
import { NZ_GRAPH_LAYOUT_SETTING } from './interface';
export class NzGraphMinimapComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() { }
    init(svgEle, zoomEle, zoomBehavior) {
        this.minimap = new Minimap(svgEle, zoomEle, zoomBehavior, this.elementRef.nativeElement, NZ_GRAPH_LAYOUT_SETTING.minimap.size, NZ_GRAPH_LAYOUT_SETTING.subscene.meta.labelHeight);
    }
    zoom(transform) {
        if (this.minimap) {
            this.minimap.zoom(transform);
        }
    }
    update() {
        if (this.minimap) {
            this.minimap.update();
        }
    }
}
NzGraphMinimapComponent.decorators = [
    { type: Component, args: [{
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
                host: {
                    '[class.nz-graph-minimap]': 'true'
                }
            },] }
];
NzGraphMinimapComponent.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtbWluaW1hcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2dyYXBoLyIsInNvdXJjZXMiOlsiZ3JhcGgtbWluaW1hcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFHOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQTZCdEQsTUFBTSxPQUFPLHVCQUF1QjtJQUVsQyxZQUFvQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtJQUFHLENBQUM7SUFFM0QsUUFBUSxLQUFVLENBQUM7SUFFbkIsSUFBSSxDQUFDLE1BQXFCLEVBQUUsT0FBb0IsRUFBRSxZQUFnRDtRQUNoRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUN4QixNQUFNLEVBQ04sT0FBTyxFQUNQLFlBQVksRUFDWixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFDN0IsdUJBQXVCLENBQUMsT0FBTyxDQUFDLElBQUksRUFDcEMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQ2xELENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxDQUFDLFNBQXdCO1FBQzNCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7WUF0REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLDBCQUEwQixFQUFFLE1BQU07aUJBQ25DO2FBQ0Y7OztZQWhDbUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBab29tQmVoYXZpb3IsIFpvb21UcmFuc2Zvcm0gfSBmcm9tICdkMy16b29tJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBNaW5pbWFwIH0gZnJvbSAnLi9jb3JlL21pbmltYXAnO1xuaW1wb3J0IHsgTlpfR1JBUEhfTEFZT1VUX1NFVFRJTkcgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWdyYXBoLW1pbmltYXAnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc+XG4gICAgICA8ZGVmcz5cbiAgICAgICAgPGZpbHRlciBpZD1cIm1pbmltYXBEcm9wU2hhZG93XCIgeD1cIi0yMCVcIiB5PVwiLTIwJVwiIHdpZHRoPVwiMTUwJVwiIGhlaWdodD1cIjE1MCVcIj5cbiAgICAgICAgICA8ZmVPZmZzZXQgcmVzdWx0PVwib2ZmT3V0XCIgaW49XCJTb3VyY2VHcmFwaGljXCIgZHg9XCIxXCIgZHk9XCIxXCI+PC9mZU9mZnNldD5cbiAgICAgICAgICA8ZmVDb2xvck1hdHJpeFxuICAgICAgICAgICAgcmVzdWx0PVwibWF0cml4T3V0XCJcbiAgICAgICAgICAgIGluPVwib2ZmT3V0XCJcbiAgICAgICAgICAgIHR5cGU9XCJtYXRyaXhcIlxuICAgICAgICAgICAgdmFsdWVzPVwiMC4xIDAgMCAwIDAgMCAwLjEgMCAwIDAgMCAwIDAuMSAwIDAgMCAwIDAgMC41IDBcIlxuICAgICAgICAgID48L2ZlQ29sb3JNYXRyaXg+XG4gICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHJlc3VsdD1cImJsdXJPdXRcIiBpbj1cIm1hdHJpeE91dFwiIHN0ZERldmlhdGlvbj1cIjJcIj48L2ZlR2F1c3NpYW5CbHVyPlxuICAgICAgICAgIDxmZUJsZW5kIGluPVwiU291cmNlR3JhcGhpY1wiIGluMj1cImJsdXJPdXRcIiBtb2RlPVwibm9ybWFsXCI+PC9mZUJsZW5kPlxuICAgICAgICA8L2ZpbHRlcj5cbiAgICAgIDwvZGVmcz5cbiAgICAgIDxyZWN0PjwvcmVjdD5cbiAgICA8L3N2Zz5cbiAgICA8Y2FudmFzIGNsYXNzPVwidmlld3BvcnRcIj48L2NhbnZhcz5cbiAgICA8IS0tIEFkZGl0aW9uYWwgY2FudmFzIHRvIHVzZSBhcyBidWZmZXIgdG8gYXZvaWQgZmxpY2tlcmluZyBiZXR3ZWVuIHVwZGF0ZXMgLS0+XG4gICAgPGNhbnZhcyBjbGFzcz1cImJ1ZmZlclwiPjwvY2FudmFzPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5uei1ncmFwaC1taW5pbWFwXSc6ICd0cnVlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56R3JhcGhNaW5pbWFwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgbWluaW1hcD86IE1pbmltYXA7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gIGluaXQoc3ZnRWxlOiBTVkdTVkdFbGVtZW50LCB6b29tRWxlOiBTVkdHRWxlbWVudCwgem9vbUJlaGF2aW9yOiBab29tQmVoYXZpb3I8TnpTYWZlQW55LCBOelNhZmVBbnk+KTogdm9pZCB7XG4gICAgdGhpcy5taW5pbWFwID0gbmV3IE1pbmltYXAoXG4gICAgICBzdmdFbGUsXG4gICAgICB6b29tRWxlLFxuICAgICAgem9vbUJlaGF2aW9yLFxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBOWl9HUkFQSF9MQVlPVVRfU0VUVElORy5taW5pbWFwLnNpemUsXG4gICAgICBOWl9HUkFQSF9MQVlPVVRfU0VUVElORy5zdWJzY2VuZS5tZXRhLmxhYmVsSGVpZ2h0XG4gICAgKTtcbiAgfVxuXG4gIHpvb20odHJhbnNmb3JtOiBab29tVHJhbnNmb3JtKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWluaW1hcCkge1xuICAgICAgdGhpcy5taW5pbWFwLnpvb20odHJhbnNmb3JtKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWluaW1hcCkge1xuICAgICAgdGhpcy5taW5pbWFwLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19