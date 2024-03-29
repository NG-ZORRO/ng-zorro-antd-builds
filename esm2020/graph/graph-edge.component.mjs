/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { curveBasis, curveLinear, line } from 'd3-shape';
import { NzGraphEdgeType } from './interface';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NzGraphEdgeComponent {
    constructor(elementRef, ngZone, cdr) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.line = line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveLinear);
        this.el = this.elementRef.nativeElement;
    }
    get id() {
        return this.edge?.id || `${this.edge.v}--${this.edge.w}`;
    }
    ngOnInit() {
        this.initElementStyle();
    }
    ngOnChanges(changes) {
        const { edge, customTemplate, edgeType } = changes;
        if (edge) {
            this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                // Update path element if customTemplate set
                if (customTemplate) {
                    this.initElementStyle();
                }
                this.setLine();
                this.cdr.markForCheck();
            });
        }
        if (edgeType) {
            const type = this.edgeType === NzGraphEdgeType.LINE ? curveLinear : curveBasis;
            this.line = line()
                .x(d => d.x)
                .y(d => d.y)
                .curve(type);
        }
    }
    initElementStyle() {
        this.path = this.el.querySelector('path');
        this.setElementData();
    }
    setLine() {
        this.setPath(this.line(this.edge.points));
    }
    setPath(d) {
        this.path.setAttribute('d', d);
    }
    setElementData() {
        if (!this.path) {
            return;
        }
        this.path.setAttribute('id', this.id);
        this.path.setAttribute('data-edge', this.id);
        this.path.setAttribute('data-v', `${this.edge.v}`);
        this.path.setAttribute('data-w', `${this.edge.w}`);
    }
}
NzGraphEdgeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGraphEdgeComponent, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzGraphEdgeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzGraphEdgeComponent, selector: "[nz-graph-edge]", inputs: { edge: "edge", edgeType: "edgeType", customTemplate: "customTemplate" }, usesOnChanges: true, ngImport: i0, template: `
    <ng-container
      *ngIf="customTemplate"
      [ngTemplateOutlet]="customTemplate"
      [ngTemplateOutletContext]="{ $implicit: edge }"
    ></ng-container>
    <svg:g *ngIf="!customTemplate">
      <path class="nz-graph-edge-line" [attr.marker-end]="'url(#edge-end-arrow)'"></path>
      <svg:text class="nz-graph-edge-text" text-anchor="middle" dy="10" *ngIf="edge.label">
        <textPath [attr.href]="'#' + id" startOffset="50%">{{ edge.label }}</textPath>
      </svg:text>
    </svg:g>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGraphEdgeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-graph-edge]',
                    template: `
    <ng-container
      *ngIf="customTemplate"
      [ngTemplateOutlet]="customTemplate"
      [ngTemplateOutletContext]="{ $implicit: edge }"
    ></ng-container>
    <svg:g *ngIf="!customTemplate">
      <path class="nz-graph-edge-line" [attr.marker-end]="'url(#edge-end-arrow)'"></path>
      <svg:text class="nz-graph-edge-text" text-anchor="middle" dy="10" *ngIf="edge.label">
        <textPath [attr.href]="'#' + id" startOffset="50%">{{ edge.label }}</textPath>
      </svg:text>
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { edge: [{
                type: Input
            }], edgeType: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtZWRnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2dyYXBoL2dyYXBoLWVkZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULEtBQUssRUFNTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXpELE9BQU8sRUFBZSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7OztBQW1CM0QsTUFBTSxPQUFPLG9CQUFvQjtJQW1CL0IsWUFBb0IsVUFBbUMsRUFBVSxNQUFjLEVBQVUsR0FBc0I7UUFBM0YsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFMdkcsU0FBSSxHQUFHLElBQUksRUFBNEI7YUFDNUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDWCxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFHcEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUMxQyxDQUFDO0lBYkQsSUFBVyxFQUFFO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDM0QsQ0FBQztJQWFELFFBQVE7UUFDTixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNuRCxJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNoRCw0Q0FBNEM7Z0JBQzVDLElBQUksY0FBYyxFQUFFO29CQUNsQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztpQkFDekI7Z0JBRUQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELElBQUksUUFBUSxFQUFFO1lBQ1osTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsS0FBSyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUMvRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBNEI7aUJBQ3pDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDWCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEI7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxPQUFPLENBQUMsQ0FBUztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQzs7aUhBdEVVLG9CQUFvQjtxR0FBcEIsb0JBQW9CLDhKQWZyQjs7Ozs7Ozs7Ozs7O0dBWVQ7MkZBR1Usb0JBQW9CO2tCQWpCaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztHQVlUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDtzSkFFVSxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxjQUFjO3NCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGN1cnZlQmFzaXMsIGN1cnZlTGluZWFyLCBsaW5lIH0gZnJvbSAnZDMtc2hhcGUnO1xuXG5pbXBvcnQgeyBOekdyYXBoRWRnZSwgTnpHcmFwaEVkZ2VUeXBlIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbnotZ3JhcGgtZWRnZV0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICpuZ0lmPVwiY3VzdG9tVGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBlZGdlIH1cIlxuICAgID48L25nLWNvbnRhaW5lcj5cbiAgICA8c3ZnOmcgKm5nSWY9XCIhY3VzdG9tVGVtcGxhdGVcIj5cbiAgICAgIDxwYXRoIGNsYXNzPVwibnotZ3JhcGgtZWRnZS1saW5lXCIgW2F0dHIubWFya2VyLWVuZF09XCIndXJsKCNlZGdlLWVuZC1hcnJvdyknXCI+PC9wYXRoPlxuICAgICAgPHN2Zzp0ZXh0IGNsYXNzPVwibnotZ3JhcGgtZWRnZS10ZXh0XCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiBkeT1cIjEwXCIgKm5nSWY9XCJlZGdlLmxhYmVsXCI+XG4gICAgICAgIDx0ZXh0UGF0aCBbYXR0ci5ocmVmXT1cIicjJyArIGlkXCIgc3RhcnRPZmZzZXQ9XCI1MCVcIj57eyBlZGdlLmxhYmVsIH19PC90ZXh0UGF0aD5cbiAgICAgIDwvc3ZnOnRleHQ+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTnpHcmFwaEVkZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGVkZ2UhOiBOekdyYXBoRWRnZTtcbiAgQElucHV0KCkgZWRnZVR5cGU/OiBOekdyYXBoRWRnZVR5cGUgfCBzdHJpbmc7XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjx7XG4gICAgJGltcGxpY2l0OiBOekdyYXBoRWRnZTtcbiAgfT47XG5cbiAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmVkZ2U/LmlkIHx8IGAke3RoaXMuZWRnZS52fS0tJHt0aGlzLmVkZ2Uud31gO1xuICB9XG4gIHByaXZhdGUgZWwhOiBTVkdHRWxlbWVudDtcbiAgcHJpdmF0ZSBwYXRoITogU1ZHUGF0aEVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSBsaW5lID0gbGluZTx7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0+KClcbiAgICAueChkID0+IGQueClcbiAgICAueShkID0+IGQueSlcbiAgICAuY3VydmUoY3VydmVMaW5lYXIpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxTVkdHRWxlbWVudD4sIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuZWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdEVsZW1lbnRTdHlsZSgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgZWRnZSwgY3VzdG9tVGVtcGxhdGUsIGVkZ2VUeXBlIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChlZGdlKSB7XG4gICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIC8vIFVwZGF0ZSBwYXRoIGVsZW1lbnQgaWYgY3VzdG9tVGVtcGxhdGUgc2V0XG4gICAgICAgIGlmIChjdXN0b21UZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMuaW5pdEVsZW1lbnRTdHlsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRMaW5lKCk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChlZGdlVHlwZSkge1xuICAgICAgY29uc3QgdHlwZSA9IHRoaXMuZWRnZVR5cGUgPT09IE56R3JhcGhFZGdlVHlwZS5MSU5FID8gY3VydmVMaW5lYXIgOiBjdXJ2ZUJhc2lzO1xuICAgICAgdGhpcy5saW5lID0gbGluZTx7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0+KClcbiAgICAgICAgLngoZCA9PiBkLngpXG4gICAgICAgIC55KGQgPT4gZC55KVxuICAgICAgICAuY3VydmUodHlwZSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdEVsZW1lbnRTdHlsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnBhdGggPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJ3BhdGgnKSE7XG4gICAgdGhpcy5zZXRFbGVtZW50RGF0YSgpO1xuICB9XG5cbiAgc2V0TGluZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFBhdGgodGhpcy5saW5lKHRoaXMuZWRnZS5wb2ludHMpISk7XG4gIH1cblxuICBzZXRQYXRoKGQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBkKTtcbiAgfVxuXG4gIHNldEVsZW1lbnREYXRhKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wYXRoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5pZCk7XG4gICAgdGhpcy5wYXRoLnNldEF0dHJpYnV0ZSgnZGF0YS1lZGdlJywgdGhpcy5pZCk7XG4gICAgdGhpcy5wYXRoLnNldEF0dHJpYnV0ZSgnZGF0YS12JywgYCR7dGhpcy5lZGdlLnZ9YCk7XG4gICAgdGhpcy5wYXRoLnNldEF0dHJpYnV0ZSgnZGF0YS13JywgYCR7dGhpcy5lZGdlLnd9YCk7XG4gIH1cbn1cbiJdfQ==