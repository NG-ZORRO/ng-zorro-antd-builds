/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { curveBasis, line } from 'd3-shape';
import { take } from 'rxjs/operators';
export class NzGraphEdgeDirective {
    constructor(elementRef, ngZone) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.line = line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveBasis);
        this.el = this.elementRef.nativeElement;
    }
    get id() {
        var _a;
        return ((_a = this.edge) === null || _a === void 0 ? void 0 : _a.id) || `${this.edge.v}--${this.edge.w}`;
    }
    ngOnInit() {
        this.setElementData();
    }
    setLine() {
        const adjoiningPath = this.getAdjoiningEdgeElement();
        if (adjoiningPath) {
            const adjoiningPoint = adjoiningPath
                .getPointAtLength(this.edge.inbound ? adjoiningPath.getTotalLength() : 0)
                .matrixTransform(adjoiningPath.getCTM())
                .matrixTransform(this.el.getCTM().inverse());
            const points = [...this.edge.points];
            const index = this.edge.inbound ? 0 : points.length - 1;
            points[index].x = adjoiningPoint.x;
            points[index].y = adjoiningPoint.y;
            this.setPath(this.line(points));
        }
        else {
            this.setPath(this.line(this.edge.points));
        }
    }
    setPath(d) {
        this.el.setAttribute('d', d);
    }
    setElementData() {
        this.el.setAttribute('data-edge', `${this.edge.v}--${this.edge.w}`);
        this.el.setAttribute('data-v', `${this.edge.v}`);
        this.el.setAttribute('data-w', `${this.edge.w}`);
    }
    getAdjoiningEdgeElement() {
        const adjoiningEdge = this.edge.adjoiningEdge;
        if (adjoiningEdge) {
            return document.querySelector(`path[data-edge="${adjoiningEdge.v}--${adjoiningEdge.w}"]`);
        }
        else {
            return null;
        }
    }
    ngOnChanges(_changes) {
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            this.setLine();
        });
    }
}
NzGraphEdgeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'svg:path[nz-graph-edge]',
                host: {
                    '[class.nz-graph-edge-line]': 'true',
                    '[id]': 'id'
                }
            },] }
];
NzGraphEdgeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
NzGraphEdgeDirective.propDecorators = {
    edge: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtZWRnZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2dyYXBoLyIsInNvdXJjZXMiOlsiZ3JhcGgtZWRnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFDdkcsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDNUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBVXRDLE1BQU0sT0FBTyxvQkFBb0I7SUFhL0IsWUFBb0IsVUFBc0MsRUFBVSxNQUFjO1FBQTlELGVBQVUsR0FBVixVQUFVLENBQTRCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUxqRSxTQUFJLEdBQUcsSUFBSSxFQUE0QjthQUNyRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNYLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUduQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQzFDLENBQUM7SUFaRCxJQUFXLEVBQUU7O1FBQ1gsT0FBTyxPQUFBLElBQUksQ0FBQyxJQUFJLDBDQUFFLEVBQUUsS0FBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDM0QsQ0FBQztJQVlELFFBQVE7UUFDTixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELE9BQU87UUFDTCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUVyRCxJQUFJLGFBQWEsRUFBRTtZQUNqQixNQUFNLGNBQWMsR0FBRyxhQUFhO2lCQUNqQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hFLGVBQWUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFHLENBQUM7aUJBQ3hDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDaEQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBQztTQUNsQzthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFRCxPQUFPLENBQUMsQ0FBUztRQUNmLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCx1QkFBdUI7UUFDckIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUMsSUFBSSxhQUFhLEVBQUU7WUFDakIsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixhQUFhLENBQUMsQ0FBQyxLQUFLLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBbUIsQ0FBQztTQUM3RzthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsUUFBdUI7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDaEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBckVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxJQUFJLEVBQUU7b0JBQ0osNEJBQTRCLEVBQUUsTUFBTTtvQkFDcEMsTUFBTSxFQUFFLElBQUk7aUJBQ2I7YUFDRjs7O1lBWG1CLFVBQVU7WUFBUyxNQUFNOzs7bUJBYTFDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBOZ1pvbmUsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjdXJ2ZUJhc2lzLCBsaW5lIH0gZnJvbSAnZDMtc2hhcGUnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE56R3JhcGhFZGdlIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdzdmc6cGF0aFtuei1ncmFwaC1lZGdlXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm56LWdyYXBoLWVkZ2UtbGluZV0nOiAndHJ1ZScsXG4gICAgJ1tpZF0nOiAnaWQnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpHcmFwaEVkZ2VEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGVkZ2UhOiBOekdyYXBoRWRnZTtcblxuICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZWRnZT8uaWQgfHwgYCR7dGhpcy5lZGdlLnZ9LS0ke3RoaXMuZWRnZS53fWA7XG4gIH1cblxuICBwcml2YXRlIHJlYWRvbmx5IGVsITogU1ZHUGF0aEVsZW1lbnQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgbGluZSA9IGxpbmU8eyB4OiBudW1iZXI7IHk6IG51bWJlciB9PigpXG4gICAgLngoZCA9PiBkLngpXG4gICAgLnkoZCA9PiBkLnkpXG4gICAgLmN1cnZlKGN1cnZlQmFzaXMpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxTVkdQYXRoRWxlbWVudD4sIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLmVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldEVsZW1lbnREYXRhKCk7XG4gIH1cblxuICBzZXRMaW5lKCk6IHZvaWQge1xuICAgIGNvbnN0IGFkam9pbmluZ1BhdGggPSB0aGlzLmdldEFkam9pbmluZ0VkZ2VFbGVtZW50KCk7XG5cbiAgICBpZiAoYWRqb2luaW5nUGF0aCkge1xuICAgICAgY29uc3QgYWRqb2luaW5nUG9pbnQgPSBhZGpvaW5pbmdQYXRoXG4gICAgICAgIC5nZXRQb2ludEF0TGVuZ3RoKHRoaXMuZWRnZS5pbmJvdW5kID8gYWRqb2luaW5nUGF0aC5nZXRUb3RhbExlbmd0aCgpIDogMClcbiAgICAgICAgLm1hdHJpeFRyYW5zZm9ybShhZGpvaW5pbmdQYXRoLmdldENUTSgpISlcbiAgICAgICAgLm1hdHJpeFRyYW5zZm9ybSh0aGlzLmVsLmdldENUTSgpIS5pbnZlcnNlKCkpO1xuICAgICAgY29uc3QgcG9pbnRzID0gWy4uLnRoaXMuZWRnZS5wb2ludHNdO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmVkZ2UuaW5ib3VuZCA/IDAgOiBwb2ludHMubGVuZ3RoIC0gMTtcbiAgICAgIHBvaW50c1tpbmRleF0ueCA9IGFkam9pbmluZ1BvaW50Lng7XG4gICAgICBwb2ludHNbaW5kZXhdLnkgPSBhZGpvaW5pbmdQb2ludC55O1xuICAgICAgdGhpcy5zZXRQYXRoKHRoaXMubGluZShwb2ludHMpISk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0UGF0aCh0aGlzLmxpbmUodGhpcy5lZGdlLnBvaW50cykhKTtcbiAgICB9XG4gIH1cblxuICBzZXRQYXRoKGQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkJywgZCk7XG4gIH1cblxuICBzZXRFbGVtZW50RGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZGF0YS1lZGdlJywgYCR7dGhpcy5lZGdlLnZ9LS0ke3RoaXMuZWRnZS53fWApO1xuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkYXRhLXYnLCBgJHt0aGlzLmVkZ2Uudn1gKTtcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZGF0YS13JywgYCR7dGhpcy5lZGdlLnd9YCk7XG4gIH1cblxuICBnZXRBZGpvaW5pbmdFZGdlRWxlbWVudCgpOiBTVkdQYXRoRWxlbWVudCB8IG51bGwge1xuICAgIGNvbnN0IGFkam9pbmluZ0VkZ2UgPSB0aGlzLmVkZ2UuYWRqb2luaW5nRWRnZTtcbiAgICBpZiAoYWRqb2luaW5nRWRnZSkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHBhdGhbZGF0YS1lZGdlPVwiJHthZGpvaW5pbmdFZGdlLnZ9LS0ke2Fkam9pbmluZ0VkZ2Uud31cIl1gKSBhcyBTVkdQYXRoRWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoX2NoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLm5nWm9uZS5vblN0YWJsZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnNldExpbmUoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19