/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, zoomTransform } from 'd3-zoom';
import { NZ_GRAPH_LAYOUT_SETTING } from './interface';
export class NzGraphSvgContainerComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.maxZoomLevel = 10;
        this.minZoomLevel = 0.1;
        this.zoom = 1;
        this.zoomEvent = new EventEmitter();
        this.transformEvent = new EventEmitter();
        this.transform = { x: 0, y: 0, k: 1 };
        this.transformStyle = '';
    }
    ngOnInit() {
        this.bind();
    }
    ngOnDestroy() {
        this.unbind();
    }
    bind() {
        this.svgSelect = select(this.containerElement.nativeElement);
        this.zoomController = zoom()
            .scaleExtent([this.minZoomLevel, this.maxZoomLevel])
            .on('zoom', ({ transform }) => {
            const { x, y, k } = transform;
            this.zoom = k;
            this.zoomEvent.emit(k);
            this.transform = transform;
            this.transformEvent.emit(transform);
            this.transformStyle = `translate(${x} ,${y})scale(${k})`;
            this.cdr.detectChanges();
        });
        this.svgSelect.call(this.zoomController, zoomIdentity.translate(0, 0).scale(this.zoom));
    }
    unbind() {
        var _a;
        (_a = this.svgSelect) === null || _a === void 0 ? void 0 : _a.interrupt().selectAll('*').interrupt();
        if (this.zoomController) {
            this.zoomController.on('end', null).on('zoom', null);
            this.transformEvent.complete();
        }
    }
    /**
     * Zoom to fit
     */
    fit(duration = 500, scale = 0.9) {
        const svgRect = this.containerElement.nativeElement.getBoundingClientRect();
        let sceneSize = null;
        try {
            sceneSize = this.zoomElement.nativeElement.getBBox();
            if (sceneSize.width === 0) {
                // There is no scene anymore. We have been detached from the dom.
                return;
            }
        }
        catch (e) {
            // Firefox produced NS_ERROR_FAILURE if we have been
            // detached from the dom.
            return;
        }
        const fitScale = Math.min(svgRect.width / sceneSize.width, svgRect.height / sceneSize.height, 2) * scale;
        const dx = (svgRect.width - sceneSize.width * fitScale) / 2;
        const dy = (svgRect.height - sceneSize.height * fitScale) / 2;
        const params = NZ_GRAPH_LAYOUT_SETTING.graph;
        const transform = zoomIdentity.translate(dx + params.padding.paddingLeft, dy + params.padding.paddingTop).scale(fitScale);
        this.svgSelect
            .transition()
            .duration(duration)
            .call(this.zoomController.transform, transform)
            .on('end.fitted', () => {
            // Remove the listener for the zoomend event,
            // so we don't get called at the end of regular zoom events,
            // just those that fit the graph to screen.
            this.zoomController.on('end.fitted', null);
        });
    }
    // Move node to center
    setNodeToCenter(node) {
        // Make sure this node is under SVG container
        if (!node || !this.containerElement.nativeElement.contains(node)) {
            return;
        }
        const svgRect = this.containerElement.nativeElement.getBoundingClientRect();
        const position = this.getRelativePositionInfo(node);
        const svgTransform = zoomTransform(this.containerElement.nativeElement);
        const centerX = (position.topLeft.x + position.bottomRight.x) / 2;
        const centerY = (position.topLeft.y + position.bottomRight.y) / 2;
        const dx = svgRect.left + svgRect.width / 2 - centerX;
        const dy = svgRect.top + svgRect.height / 2 - centerY;
        select(this.containerElement.nativeElement)
            .transition()
            .duration(250)
            .call(this.zoomController.translateBy, dx / svgTransform.k, dy / svgTransform.k);
    }
    getRelativePositionInfo(node) {
        const nodeBox = node.getBBox();
        const nodeCtm = node.getScreenCTM();
        let pointTL = this.containerElement.nativeElement.createSVGPoint();
        let pointBR = this.containerElement.nativeElement.createSVGPoint();
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
NzGraphSvgContainerComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-graph-svg-container',
                exportAs: 'nzGraphSvgContainer',
                template: `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" #container width="100%" height="100%">
      <rect width="100%" height="100%" fill="transparent" class="nz-graph-background"></rect>
      <g #zoom [attr.transform]="transformStyle" class="nz-graph-zoom">
        <ng-content></ng-content>
      </g>
    </svg>
  `,
                host: {
                    '[class.nz-graph-svg-container]': 'true'
                }
            },] }
];
NzGraphSvgContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NzGraphSvgContainerComponent.propDecorators = {
    containerElement: [{ type: ViewChild, args: ['container', { static: true },] }],
    zoomElement: [{ type: ViewChild, args: ['zoom', { static: true },] }],
    maxZoomLevel: [{ type: Input }],
    minZoomLevel: [{ type: Input }],
    zoom: [{ type: Input }],
    zoomEvent: [{ type: Output }],
    transformEvent: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtc3ZnLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2dyYXBoLyIsInNvdXJjZXMiOlsiZ3JhcGgtc3ZnLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQWEsTUFBTSxjQUFjLENBQUM7QUFJakQsT0FBTyxFQUFFLElBQUksRUFBZ0IsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUUxRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUE4QnRELE1BQU0sT0FBTyw0QkFBNEI7SUFjdkMsWUFBb0IsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFYakMsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsaUJBQVksR0FBRyxHQUFHLENBQUM7UUFDbkIsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUVDLGNBQVMsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRCxtQkFBYyxHQUFrQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3RGLGNBQVMsR0FBb0IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2xELG1CQUFjLEdBQUcsRUFBRSxDQUFDO0lBSXlCLENBQUM7SUFFOUMsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxFQUFFO2FBQ3pCLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ25ELEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBYSxFQUFFLEVBQUU7WUFDdkMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDO1lBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDekQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFRCxNQUFNOztRQUNKLE1BQUEsSUFBSSxDQUFDLFNBQVMsMENBQUUsU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxHQUFHO1FBQ3ZELElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsR0FBRyxDQUFDLFdBQW1CLEdBQUcsRUFBRSxRQUFnQixHQUFHO1FBQzdDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM1RSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSTtZQUNGLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyRCxJQUFJLFNBQVMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUN6QixpRUFBaUU7Z0JBQ2pFLE9BQU87YUFDUjtTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixvREFBb0Q7WUFDcEQseUJBQXlCO1lBQ3pCLE9BQU87U0FDUjtRQUNELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFFekcsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVELE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5RCxNQUFNLE1BQU0sR0FBRyx1QkFBdUIsQ0FBQyxLQUFLLENBQUM7UUFFN0MsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFILElBQUksQ0FBQyxTQUFTO2FBQ1gsVUFBVSxFQUFFO2FBQ1osUUFBUSxDQUFDLFFBQVEsQ0FBQzthQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO2FBQzlDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO1lBQ3JCLDZDQUE2QztZQUM3Qyw0REFBNEQ7WUFDNUQsMkNBQTJDO1lBQzNDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxzQkFBc0I7SUFDdEIsZUFBZSxDQUFDLElBQWlCO1FBQy9CLDZDQUE2QztRQUM3QyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEUsT0FBTztTQUNSO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzVFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXhFLE1BQU0sT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsTUFBTSxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUN0RCxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUV0RCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQzthQUN4QyxVQUFVLEVBQUU7YUFDWixRQUFRLENBQUMsR0FBRyxDQUFDO2FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxZQUFZLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVPLHVCQUF1QixDQUFDLElBQWlCO1FBQy9DLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMvQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRW5FLE9BQU8sQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN0QixPQUFPLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDdEMsT0FBTyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDdkMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsT0FBUSxDQUFDLENBQUM7UUFDNUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsT0FBUSxDQUFDLENBQUM7UUFDNUMsT0FBTztZQUNMLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFdBQVcsRUFBRSxPQUFPO1NBQ3JCLENBQUM7SUFDSixDQUFDOzs7WUEzSUYsU0FBUyxTQUFDO2dCQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7Ozs7O0dBT1Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLGdDQUFnQyxFQUFFLE1BQU07aUJBQ3pDO2FBQ0Y7OztZQTlDQyxpQkFBaUI7OzsrQkFnRGhCLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzBCQUN2QyxTQUFTLFNBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTsyQkFDbEMsS0FBSzsyQkFDTCxLQUFLO21CQUNMLEtBQUs7d0JBRUwsTUFBTTs2QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzZWxlY3QsIFNlbGVjdGlvbiB9IGZyb20gJ2QzLXNlbGVjdGlvbic7XG4vLyBOZWVkIHRvIGltcG9ydCBmb3Igc2VsZWN0XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgeyBpbnRlcnJ1cHQsIHRyYW5zaXRpb24gfSBmcm9tICdkMy10cmFuc2l0aW9uJztcbmltcG9ydCB7IHpvb20sIFpvb21CZWhhdmlvciwgem9vbUlkZW50aXR5LCB6b29tVHJhbnNmb3JtIH0gZnJvbSAnZDMtem9vbSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTlpfR1JBUEhfTEFZT1VUX1NFVFRJTkcgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnpab29tVHJhbnNmb3JtIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIGs6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWxhdGl2ZVBvc2l0aW9uSW5mbyB7XG4gIHRvcExlZnQ6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcbiAgYm90dG9tUmlnaHQ6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcbn1cblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ256LWdyYXBoLXN2Zy1jb250YWluZXInLFxuICBleHBvcnRBczogJ256R3JhcGhTdmdDb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmcgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiAjY29udGFpbmVyIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj5cbiAgICAgIDxyZWN0IHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiBmaWxsPVwidHJhbnNwYXJlbnRcIiBjbGFzcz1cIm56LWdyYXBoLWJhY2tncm91bmRcIj48L3JlY3Q+XG4gICAgICA8ZyAjem9vbSBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtU3R5bGVcIiBjbGFzcz1cIm56LWdyYXBoLXpvb21cIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9nPlxuICAgIDwvc3ZnPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5uei1ncmFwaC1zdmctY29udGFpbmVyXSc6ICd0cnVlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56R3JhcGhTdmdDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIGNvbnRhaW5lckVsZW1lbnQhOiBFbGVtZW50UmVmPFNWR1NWR0VsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCd6b29tJywgeyBzdGF0aWM6IHRydWUgfSkgem9vbUVsZW1lbnQhOiBFbGVtZW50UmVmPFNWR0FFbGVtZW50PjtcbiAgQElucHV0KCkgbWF4Wm9vbUxldmVsID0gMTA7XG4gIEBJbnB1dCgpIG1pblpvb21MZXZlbCA9IDAuMTtcbiAgQElucHV0KCkgem9vbSA9IDE7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHpvb21FdmVudDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSB0cmFuc2Zvcm1FdmVudDogRXZlbnRFbWl0dGVyPE56Wm9vbVRyYW5zZm9ybT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHRyYW5zZm9ybTogTnpab29tVHJhbnNmb3JtID0geyB4OiAwLCB5OiAwLCBrOiAxIH07XG4gIHRyYW5zZm9ybVN0eWxlID0gJyc7XG4gIHN2Z1NlbGVjdCE6IFNlbGVjdGlvbjxOelNhZmVBbnksIE56U2FmZUFueSwgTnpTYWZlQW55LCBOelNhZmVBbnk+O1xuICB6b29tQ29udHJvbGxlciE6IFpvb21CZWhhdmlvcjxOelNhZmVBbnksIE56U2FmZUFueT47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYmluZCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bmJpbmQoKTtcbiAgfVxuXG4gIGJpbmQoKTogdm9pZCB7XG4gICAgdGhpcy5zdmdTZWxlY3QgPSBzZWxlY3QodGhpcy5jb250YWluZXJFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMuem9vbUNvbnRyb2xsZXIgPSB6b29tKClcbiAgICAgIC5zY2FsZUV4dGVudChbdGhpcy5taW5ab29tTGV2ZWwsIHRoaXMubWF4Wm9vbUxldmVsXSlcbiAgICAgIC5vbignem9vbScsICh7IHRyYW5zZm9ybSB9OiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgY29uc3QgeyB4LCB5LCBrIH0gPSB0cmFuc2Zvcm07XG4gICAgICAgIHRoaXMuem9vbSA9IGs7XG4gICAgICAgIHRoaXMuem9vbUV2ZW50LmVtaXQoayk7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgICAgICB0aGlzLnRyYW5zZm9ybUV2ZW50LmVtaXQodHJhbnNmb3JtKTtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1TdHlsZSA9IGB0cmFuc2xhdGUoJHt4fSAsJHt5fSlzY2FsZSgke2t9KWA7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pO1xuICAgIHRoaXMuc3ZnU2VsZWN0LmNhbGwodGhpcy56b29tQ29udHJvbGxlciwgem9vbUlkZW50aXR5LnRyYW5zbGF0ZSgwLCAwKS5zY2FsZSh0aGlzLnpvb20pKTtcbiAgfVxuXG4gIHVuYmluZCgpOiB2b2lkIHtcbiAgICB0aGlzLnN2Z1NlbGVjdD8uaW50ZXJydXB0KCkuc2VsZWN0QWxsKCcqJykuaW50ZXJydXB0KCk7XG4gICAgaWYgKHRoaXMuem9vbUNvbnRyb2xsZXIpIHtcbiAgICAgIHRoaXMuem9vbUNvbnRyb2xsZXIub24oJ2VuZCcsIG51bGwpLm9uKCd6b29tJywgbnVsbCk7XG4gICAgICB0aGlzLnRyYW5zZm9ybUV2ZW50LmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFpvb20gdG8gZml0XG4gICAqL1xuICBmaXQoZHVyYXRpb246IG51bWJlciA9IDUwMCwgc2NhbGU6IG51bWJlciA9IDAuOSk6IHZvaWQge1xuICAgIGNvbnN0IHN2Z1JlY3QgPSB0aGlzLmNvbnRhaW5lckVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgc2NlbmVTaXplID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgc2NlbmVTaXplID0gdGhpcy56b29tRWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJCb3goKTtcbiAgICAgIGlmIChzY2VuZVNpemUud2lkdGggPT09IDApIHtcbiAgICAgICAgLy8gVGhlcmUgaXMgbm8gc2NlbmUgYW55bW9yZS4gV2UgaGF2ZSBiZWVuIGRldGFjaGVkIGZyb20gdGhlIGRvbS5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIEZpcmVmb3ggcHJvZHVjZWQgTlNfRVJST1JfRkFJTFVSRSBpZiB3ZSBoYXZlIGJlZW5cbiAgICAgIC8vIGRldGFjaGVkIGZyb20gdGhlIGRvbS5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZml0U2NhbGUgPSBNYXRoLm1pbihzdmdSZWN0LndpZHRoIC8gc2NlbmVTaXplLndpZHRoLCBzdmdSZWN0LmhlaWdodCAvIHNjZW5lU2l6ZS5oZWlnaHQsIDIpICogc2NhbGU7XG5cbiAgICBjb25zdCBkeCA9IChzdmdSZWN0LndpZHRoIC0gc2NlbmVTaXplLndpZHRoICogZml0U2NhbGUpIC8gMjtcbiAgICBjb25zdCBkeSA9IChzdmdSZWN0LmhlaWdodCAtIHNjZW5lU2l6ZS5oZWlnaHQgKiBmaXRTY2FsZSkgLyAyO1xuICAgIGNvbnN0IHBhcmFtcyA9IE5aX0dSQVBIX0xBWU9VVF9TRVRUSU5HLmdyYXBoO1xuXG4gICAgY29uc3QgdHJhbnNmb3JtID0gem9vbUlkZW50aXR5LnRyYW5zbGF0ZShkeCArIHBhcmFtcy5wYWRkaW5nLnBhZGRpbmdMZWZ0LCBkeSArIHBhcmFtcy5wYWRkaW5nLnBhZGRpbmdUb3ApLnNjYWxlKGZpdFNjYWxlKTtcbiAgICB0aGlzLnN2Z1NlbGVjdFxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKGR1cmF0aW9uKVxuICAgICAgLmNhbGwodGhpcy56b29tQ29udHJvbGxlci50cmFuc2Zvcm0sIHRyYW5zZm9ybSlcbiAgICAgIC5vbignZW5kLmZpdHRlZCcsICgpID0+IHtcbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBsaXN0ZW5lciBmb3IgdGhlIHpvb21lbmQgZXZlbnQsXG4gICAgICAgIC8vIHNvIHdlIGRvbid0IGdldCBjYWxsZWQgYXQgdGhlIGVuZCBvZiByZWd1bGFyIHpvb20gZXZlbnRzLFxuICAgICAgICAvLyBqdXN0IHRob3NlIHRoYXQgZml0IHRoZSBncmFwaCB0byBzY3JlZW4uXG4gICAgICAgIHRoaXMuem9vbUNvbnRyb2xsZXIub24oJ2VuZC5maXR0ZWQnLCBudWxsKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gTW92ZSBub2RlIHRvIGNlbnRlclxuICBzZXROb2RlVG9DZW50ZXIobm9kZTogU1ZHR0VsZW1lbnQpOiB2b2lkIHtcbiAgICAvLyBNYWtlIHN1cmUgdGhpcyBub2RlIGlzIHVuZGVyIFNWRyBjb250YWluZXJcbiAgICBpZiAoIW5vZGUgfHwgIXRoaXMuY29udGFpbmVyRWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKG5vZGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3ZnUmVjdCA9IHRoaXMuY29udGFpbmVyRWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5nZXRSZWxhdGl2ZVBvc2l0aW9uSW5mbyhub2RlKTtcbiAgICBjb25zdCBzdmdUcmFuc2Zvcm0gPSB6b29tVHJhbnNmb3JtKHRoaXMuY29udGFpbmVyRWxlbWVudC5uYXRpdmVFbGVtZW50KTtcblxuICAgIGNvbnN0IGNlbnRlclggPSAocG9zaXRpb24udG9wTGVmdC54ICsgcG9zaXRpb24uYm90dG9tUmlnaHQueCkgLyAyO1xuICAgIGNvbnN0IGNlbnRlclkgPSAocG9zaXRpb24udG9wTGVmdC55ICsgcG9zaXRpb24uYm90dG9tUmlnaHQueSkgLyAyO1xuICAgIGNvbnN0IGR4ID0gc3ZnUmVjdC5sZWZ0ICsgc3ZnUmVjdC53aWR0aCAvIDIgLSBjZW50ZXJYO1xuICAgIGNvbnN0IGR5ID0gc3ZnUmVjdC50b3AgKyBzdmdSZWN0LmhlaWdodCAvIDIgLSBjZW50ZXJZO1xuXG4gICAgc2VsZWN0KHRoaXMuY29udGFpbmVyRWxlbWVudC5uYXRpdmVFbGVtZW50KVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDI1MClcbiAgICAgIC5jYWxsKHRoaXMuem9vbUNvbnRyb2xsZXIudHJhbnNsYXRlQnksIGR4IC8gc3ZnVHJhbnNmb3JtLmssIGR5IC8gc3ZnVHJhbnNmb3JtLmspO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZWxhdGl2ZVBvc2l0aW9uSW5mbyhub2RlOiBTVkdHRWxlbWVudCk6IFJlbGF0aXZlUG9zaXRpb25JbmZvIHtcbiAgICBjb25zdCBub2RlQm94ID0gbm9kZS5nZXRCQm94KCk7XG4gICAgY29uc3Qgbm9kZUN0bSA9IG5vZGUuZ2V0U2NyZWVuQ1RNKCk7XG4gICAgbGV0IHBvaW50VEwgPSB0aGlzLmNvbnRhaW5lckVsZW1lbnQubmF0aXZlRWxlbWVudC5jcmVhdGVTVkdQb2ludCgpO1xuICAgIGxldCBwb2ludEJSID0gdGhpcy5jb250YWluZXJFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY3JlYXRlU1ZHUG9pbnQoKTtcblxuICAgIHBvaW50VEwueCA9IG5vZGVCb3gueDtcbiAgICBwb2ludFRMLnkgPSBub2RlQm94Lnk7XG4gICAgcG9pbnRCUi54ID0gbm9kZUJveC54ICsgbm9kZUJveC53aWR0aDtcbiAgICBwb2ludEJSLnkgPSBub2RlQm94LnkgKyBub2RlQm94LmhlaWdodDtcbiAgICBwb2ludFRMID0gcG9pbnRUTC5tYXRyaXhUcmFuc2Zvcm0obm9kZUN0bSEpO1xuICAgIHBvaW50QlIgPSBwb2ludEJSLm1hdHJpeFRyYW5zZm9ybShub2RlQ3RtISk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcExlZnQ6IHBvaW50VEwsXG4gICAgICBib3R0b21SaWdodDogcG9pbnRCUlxuICAgIH07XG4gIH1cbn1cbiJdfQ==