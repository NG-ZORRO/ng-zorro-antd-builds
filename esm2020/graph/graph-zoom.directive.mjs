/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { select } from 'd3-selection';
import { transition as d3Transition } from 'd3-transition';
import { zoom, zoomIdentity, zoomTransform } from 'd3-zoom';
import { calculateTransform } from './core/utils';
import * as i0 from "@angular/core";
Selection.bind('transition', d3Transition);
export class NzGraphZoomDirective {
    constructor(element, cdr) {
        this.element = element;
        this.cdr = cdr;
        this.nzMinZoom = 0.1;
        this.nzMaxZoom = 10;
        this.nzTransformEvent = new EventEmitter();
        this.nzZoomChange = new EventEmitter();
        this.destroy$ = new Subject();
    }
    ngAfterViewInit() {
        this.bind();
    }
    ngOnDestroy() {
        this.unbind();
        this.destroy$.next();
        this.destroy$.complete();
    }
    bind() {
        this.svgElement = this.element.nativeElement.querySelector('svg');
        this.gZoomElement = this.element.nativeElement.querySelector('svg > g');
        const { width, height } = this.element.nativeElement.getBoundingClientRect();
        this.svgSelection = select(this.svgElement);
        this.zoomBehavior = zoom()
            .extent([
            [0, 0],
            [width, height]
        ])
            .scaleExtent([this.nzMinZoom, this.nzMaxZoom])
            .on('zoom', e => {
            this.zoomed(e);
        });
        this.svgSelection.call(this.zoomBehavior, zoomIdentity.translate(0, 0).scale(this.nzZoom || 1));
        // Init with nzZoom
        this.reScale(0, this.nzZoom);
    }
    unbind() {
        // Destroy listener
        this.svgSelection?.interrupt().selectAll('*').interrupt();
        if (this.zoomBehavior) {
            this.zoomBehavior.on('end', null).on('zoom', null);
        }
    }
    // Methods
    fitCenter(duration = 0) {
        this.reScale(duration);
    }
    focus(id, duration = 0) {
        // Make sure this node is under SVG container
        if (!this.svgElement.getElementById(`${id}`)) {
            return;
        }
        const node = this.svgElement.getElementById(`${id}`);
        const svgRect = this.svgElement.getBoundingClientRect();
        const position = this.getRelativePositionInfo(node);
        const svgTransform = zoomTransform(this.svgElement);
        const centerX = (position.topLeft.x + position.bottomRight.x) / 2;
        const centerY = (position.topLeft.y + position.bottomRight.y) / 2;
        const dx = svgRect.left + svgRect.width / 2 - centerX;
        const dy = svgRect.top + svgRect.height / 2 - centerY;
        this.svgSelection
            .transition()
            .duration(duration)
            .call(this.zoomBehavior.translateBy, dx / svgTransform.k, dy / svgTransform.k);
    }
    /**
     * Handle zoom event
     *
     * @param transform
     */
    zoomed({ transform }) {
        const { x, y, k } = transform;
        // Update g element transform
        this.gZoomElement.setAttribute('transform', `translate(${x}, ${y})scale(${k})`);
        this.nzZoom = k;
        this.nzZoomChange.emit(this.nzZoom);
        this.nzTransformEvent.emit(transform);
        this.cdr.markForCheck();
    }
    /**
     * Scale with zoom and duration
     *
     * @param duration
     * @param scale
     * @private
     */
    reScale(duration, scale) {
        const transform = calculateTransform(this.svgElement, this.gZoomElement, scale);
        if (!transform) {
            return;
        }
        const { x, y, k } = transform;
        const zTransform = zoomIdentity.translate(x, y).scale(Math.max(k, this.nzMinZoom));
        this.svgSelection
            .transition()
            .duration(duration)
            .call(this.zoomBehavior.transform, zTransform)
            .on('end.fitted', () => {
            this.zoomBehavior.on('end.fitted', null);
        });
    }
    getRelativePositionInfo(node) {
        const nodeBox = node.getBBox();
        const nodeCtm = node.getScreenCTM();
        let pointTL = this.svgElement.createSVGPoint();
        let pointBR = this.svgElement.createSVGPoint();
        pointTL.x = nodeBox.x;
        pointTL.y = nodeBox.y;
        pointBR.x = nodeBox.x + nodeBox.width;
        pointBR.y = nodeBox.y + nodeBox.height;
        pointTL = pointTL.matrixTransform(nodeCtm);
        pointBR = pointBR.matrixTransform(nodeCtm);
        return {
            topLeft: pointTL,
            bottomRight: pointBR
        };
    }
}
NzGraphZoomDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGraphZoomDirective, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
NzGraphZoomDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzGraphZoomDirective, selector: "[nz-graph-zoom]", inputs: { nzZoom: "nzZoom", nzMinZoom: "nzMinZoom", nzMaxZoom: "nzMaxZoom" }, outputs: { nzTransformEvent: "nzTransformEvent", nzZoomChange: "nzZoomChange" }, exportAs: ["nzGraphZoom"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGraphZoomDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-graph-zoom]',
                    exportAs: 'nzGraphZoom'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { nzZoom: [{
                type: Input
            }], nzMinZoom: [{
                type: Input
            }], nzMaxZoom: [{
                type: Input
            }], nzTransformEvent: [{
                type: Output
            }], nzZoomChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtem9vbS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2dyYXBoL2dyYXBoLXpvb20uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFHTCxTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsTUFBTSxFQUFhLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxVQUFVLElBQUksWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBRSxJQUFJLEVBQWdCLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFJMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDOztBQUVsRCxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztBQU0zQyxNQUFNLE9BQU8sb0JBQW9CO0lBa0IvQixZQUFvQixPQUFtQixFQUFVLEdBQXNCO1FBQW5ELFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWhCOUQsY0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNoQixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRUwscUJBQWdCLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckUsaUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVVuRSxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUVtQyxDQUFDO0lBRTNFLGVBQWU7UUFDYixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElB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QUFLLENBQUM7UUFDdEMsT0FBTyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDdkMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsT0FBUSxDQUFDLENBQUM7UUFDNUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsT0FBUSxDQUFDLENBQUM7UUFDNUMsT0FBTztZQUNMLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFdBQVcsRUFBRSxPQUFPO1NBQ3JCLENBQUM7SUFDSixDQUFDOztpSEExSVUsb0JBQW9CO3FHQUFwQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFKaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsYUFBYTtpQkFDeEI7aUlBRVUsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFFYSxnQkFBZ0I7c0JBQWxDLE1BQU07Z0JBQ1ksWUFBWTtzQkFBOUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBzZWxlY3QsIFNlbGVjdGlvbiB9IGZyb20gJ2QzLXNlbGVjdGlvbic7XG5pbXBvcnQgeyB0cmFuc2l0aW9uIGFzIGQzVHJhbnNpdGlvbiB9IGZyb20gJ2QzLXRyYW5zaXRpb24nO1xuaW1wb3J0IHsgem9vbSwgWm9vbUJlaGF2aW9yLCB6b29tSWRlbnRpdHksIHpvb21UcmFuc2Zvcm0gfSBmcm9tICdkMy16b29tJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgY2FsY3VsYXRlVHJhbnNmb3JtIH0gZnJvbSAnLi9jb3JlL3V0aWxzJztcbmltcG9ydCB7IE56Wm9vbVRyYW5zZm9ybSwgUmVsYXRpdmVQb3NpdGlvbkluZm8gfSBmcm9tICcuL2ludGVyZmFjZSc7XG5TZWxlY3Rpb24uYmluZCgndHJhbnNpdGlvbicsIGQzVHJhbnNpdGlvbik7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuei1ncmFwaC16b29tXScsXG4gIGV4cG9ydEFzOiAnbnpHcmFwaFpvb20nXG59KVxuZXhwb3J0IGNsYXNzIE56R3JhcGhab29tRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgbnpab29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBuek1pblpvb20gPSAwLjE7XG4gIEBJbnB1dCgpIG56TWF4Wm9vbSA9IDEwO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBuelRyYW5zZm9ybUV2ZW50OiBFdmVudEVtaXR0ZXI8Tnpab29tVHJhbnNmb3JtPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Wm9vbUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgc3ZnU2VsZWN0aW9uITogU2VsZWN0aW9uPE56U2FmZUFueSwgTnpTYWZlQW55LCBOelNhZmVBbnksIE56U2FmZUFueT47XG4gIHpvb21CZWhhdmlvciE6IFpvb21CZWhhdmlvcjxOelNhZmVBbnksIE56U2FmZUFueT47XG5cbiAgLy8gVE9ET1xuICAvLyBTdXBwb3J0IHN2ZyBlbGVtZW50IG9ubHkgbm93XG4gIHN2Z0VsZW1lbnQhOiBTVkdTVkdFbGVtZW50O1xuICBnWm9vbUVsZW1lbnQhOiBTVkdHRWxlbWVudDtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5iaW5kKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuYmluZCgpO1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIGJpbmQoKTogdm9pZCB7XG4gICAgdGhpcy5zdmdFbGVtZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignc3ZnJykgYXMgU1ZHU1ZHRWxlbWVudDtcbiAgICB0aGlzLmdab29tRWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N2ZyA+IGcnKSBhcyBTVkdHRWxlbWVudDtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMuc3ZnU2VsZWN0aW9uID0gc2VsZWN0KHRoaXMuc3ZnRWxlbWVudCk7XG4gICAgdGhpcy56b29tQmVoYXZpb3IgPSB6b29tKClcbiAgICAgIC5leHRlbnQoW1xuICAgICAgICBbMCwgMF0sXG4gICAgICAgIFt3aWR0aCwgaGVpZ2h0XVxuICAgICAgXSlcbiAgICAgIC5zY2FsZUV4dGVudChbdGhpcy5uek1pblpvb20sIHRoaXMubnpNYXhab29tXSlcbiAgICAgIC5vbignem9vbScsIGUgPT4ge1xuICAgICAgICB0aGlzLnpvb21lZChlKTtcbiAgICAgIH0pO1xuICAgIHRoaXMuc3ZnU2VsZWN0aW9uLmNhbGwodGhpcy56b29tQmVoYXZpb3IsIHpvb21JZGVudGl0eS50cmFuc2xhdGUoMCwgMCkuc2NhbGUodGhpcy5uelpvb20gfHwgMSkpO1xuICAgIC8vIEluaXQgd2l0aCBuelpvb21cbiAgICB0aGlzLnJlU2NhbGUoMCwgdGhpcy5uelpvb20pO1xuICB9XG5cbiAgdW5iaW5kKCk6IHZvaWQge1xuICAgIC8vIERlc3Ryb3kgbGlzdGVuZXJcbiAgICB0aGlzLnN2Z1NlbGVjdGlvbj8uaW50ZXJydXB0KCkuc2VsZWN0QWxsKCcqJykuaW50ZXJydXB0KCk7XG4gICAgaWYgKHRoaXMuem9vbUJlaGF2aW9yKSB7XG4gICAgICB0aGlzLnpvb21CZWhhdmlvci5vbignZW5kJywgbnVsbCkub24oJ3pvb20nLCBudWxsKTtcbiAgICB9XG4gIH1cblxuICAvLyBNZXRob2RzXG4gIGZpdENlbnRlcihkdXJhdGlvbjogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgIHRoaXMucmVTY2FsZShkdXJhdGlvbik7XG4gIH1cblxuICBmb2N1cyhpZDogTnpTYWZlQW55LCBkdXJhdGlvbjogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgIC8vIE1ha2Ugc3VyZSB0aGlzIG5vZGUgaXMgdW5kZXIgU1ZHIGNvbnRhaW5lclxuICAgIGlmICghdGhpcy5zdmdFbGVtZW50LmdldEVsZW1lbnRCeUlkKGAke2lkfWApKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuc3ZnRWxlbWVudC5nZXRFbGVtZW50QnlJZChgJHtpZH1gKSBhcyBTVkdHRWxlbWVudDtcbiAgICBjb25zdCBzdmdSZWN0ID0gdGhpcy5zdmdFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5nZXRSZWxhdGl2ZVBvc2l0aW9uSW5mbyhub2RlKTtcbiAgICBjb25zdCBzdmdUcmFuc2Zvcm0gPSB6b29tVHJhbnNmb3JtKHRoaXMuc3ZnRWxlbWVudCk7XG5cbiAgICBjb25zdCBjZW50ZXJYID0gKHBvc2l0aW9uLnRvcExlZnQueCArIHBvc2l0aW9uLmJvdHRvbVJpZ2h0LngpIC8gMjtcbiAgICBjb25zdCBjZW50ZXJZID0gKHBvc2l0aW9uLnRvcExlZnQueSArIHBvc2l0aW9uLmJvdHRvbVJpZ2h0LnkpIC8gMjtcbiAgICBjb25zdCBkeCA9IHN2Z1JlY3QubGVmdCArIHN2Z1JlY3Qud2lkdGggLyAyIC0gY2VudGVyWDtcbiAgICBjb25zdCBkeSA9IHN2Z1JlY3QudG9wICsgc3ZnUmVjdC5oZWlnaHQgLyAyIC0gY2VudGVyWTtcblxuICAgIHRoaXMuc3ZnU2VsZWN0aW9uXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oZHVyYXRpb24pXG4gICAgICAuY2FsbCh0aGlzLnpvb21CZWhhdmlvci50cmFuc2xhdGVCeSwgZHggLyBzdmdUcmFuc2Zvcm0uaywgZHkgLyBzdmdUcmFuc2Zvcm0uayk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIHpvb20gZXZlbnRcbiAgICpcbiAgICogQHBhcmFtIHRyYW5zZm9ybVxuICAgKi9cbiAgcHJpdmF0ZSB6b29tZWQoeyB0cmFuc2Zvcm0gfTogTnpTYWZlQW55KTogdm9pZCB7XG4gICAgY29uc3QgeyB4LCB5LCBrIH0gPSB0cmFuc2Zvcm07XG4gICAgLy8gVXBkYXRlIGcgZWxlbWVudCB0cmFuc2Zvcm1cbiAgICAodGhpcy5nWm9vbUVsZW1lbnQgYXMgU1ZHR0VsZW1lbnQpLnNldEF0dHJpYnV0ZSgndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke3h9LCAke3l9KXNjYWxlKCR7a30pYCk7XG4gICAgdGhpcy5uelpvb20gPSBrO1xuICAgIHRoaXMubnpab29tQ2hhbmdlLmVtaXQodGhpcy5uelpvb20pO1xuICAgIHRoaXMubnpUcmFuc2Zvcm1FdmVudC5lbWl0KHRyYW5zZm9ybSk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogU2NhbGUgd2l0aCB6b29tIGFuZCBkdXJhdGlvblxuICAgKlxuICAgKiBAcGFyYW0gZHVyYXRpb25cbiAgICogQHBhcmFtIHNjYWxlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIHJlU2NhbGUoZHVyYXRpb246IG51bWJlciwgc2NhbGU/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBjYWxjdWxhdGVUcmFuc2Zvcm0odGhpcy5zdmdFbGVtZW50LCB0aGlzLmdab29tRWxlbWVudCwgc2NhbGUpO1xuICAgIGlmICghdHJhbnNmb3JtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgeCwgeSwgayB9ID0gdHJhbnNmb3JtO1xuICAgIGNvbnN0IHpUcmFuc2Zvcm0gPSB6b29tSWRlbnRpdHkudHJhbnNsYXRlKHgsIHkpLnNjYWxlKE1hdGgubWF4KGssIHRoaXMubnpNaW5ab29tKSk7XG4gICAgdGhpcy5zdmdTZWxlY3Rpb25cbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbihkdXJhdGlvbilcbiAgICAgIC5jYWxsKHRoaXMuem9vbUJlaGF2aW9yLnRyYW5zZm9ybSwgelRyYW5zZm9ybSlcbiAgICAgIC5vbignZW5kLmZpdHRlZCcsICgpID0+IHtcbiAgICAgICAgdGhpcy56b29tQmVoYXZpb3Iub24oJ2VuZC5maXR0ZWQnLCBudWxsKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZWxhdGl2ZVBvc2l0aW9uSW5mbyhub2RlOiBTVkdHRWxlbWVudCk6IFJlbGF0aXZlUG9zaXRpb25JbmZvIHtcbiAgICBjb25zdCBub2RlQm94ID0gbm9kZS5nZXRCQm94KCk7XG4gICAgY29uc3Qgbm9kZUN0bSA9IG5vZGUuZ2V0U2NyZWVuQ1RNKCk7XG4gICAgbGV0IHBvaW50VEwgPSB0aGlzLnN2Z0VsZW1lbnQuY3JlYXRlU1ZHUG9pbnQoKTtcbiAgICBsZXQgcG9pbnRCUiA9IHRoaXMuc3ZnRWxlbWVudC5jcmVhdGVTVkdQb2ludCgpO1xuXG4gICAgcG9pbnRUTC54ID0gbm9kZUJveC54O1xuICAgIHBvaW50VEwueSA9IG5vZGVCb3gueTtcbiAgICBwb2ludEJSLnggPSBub2RlQm94LnggKyBub2RlQm94LndpZHRoO1xuICAgIHBvaW50QlIueSA9IG5vZGVCb3gueSArIG5vZGVCb3guaGVpZ2h0O1xuICAgIHBvaW50VEwgPSBwb2ludFRMLm1hdHJpeFRyYW5zZm9ybShub2RlQ3RtISk7XG4gICAgcG9pbnRCUiA9IHBvaW50QlIubWF0cml4VHJhbnNmb3JtKG5vZGVDdG0hKTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9wTGVmdDogcG9pbnRUTCxcbiAgICAgIGJvdHRvbVJpZ2h0OiBwb2ludEJSXG4gICAgfTtcbiAgfVxufVxuIl19