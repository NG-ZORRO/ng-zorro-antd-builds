/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { drag } from 'd3-drag';
import { pointer, select } from 'd3-selection';
import { zoomIdentity } from 'd3-zoom';
const FRAC_VIEWPOINT_AREA = 0.8;
export class Minimap {
    constructor(svg, zoomG, mainZoom, minimap, maxWandH, labelPadding) {
        this.svg = svg;
        this.labelPadding = labelPadding;
        this.zoomG = zoomG;
        this.mainZoom = mainZoom;
        this.maxWandH = maxWandH;
        const minimapElement = select(minimap);
        const minimapSvgElement = minimapElement.select('svg');
        const viewpointElement = minimapSvgElement.select('rect');
        this.canvas = minimapElement.select('canvas.viewport').node();
        this.canvasRect = this.canvas.getBoundingClientRect();
        const handleEvent = (event) => {
            const minimapOffset = this.minimapOffset();
            const width = Number(viewpointElement.attr('width'));
            const height = Number(viewpointElement.attr('height'));
            const clickCoords = pointer(event, minimapSvgElement.node());
            this.viewpointCoord.x = clickCoords[0] - width / 2 - minimapOffset.x;
            this.viewpointCoord.y = clickCoords[1] - height / 2 - minimapOffset.y;
            this.updateViewpoint();
        };
        this.viewpointCoord = { x: 0, y: 0 };
        const dragEvent = drag().subject(Object).on('drag', handleEvent);
        viewpointElement.datum(this.viewpointCoord).call(dragEvent);
        // Make the minimap clickable.
        minimapSvgElement.on('click', event => {
            if (event.defaultPrevented) {
                // This click was part of a drag event, so suppress it.
                return;
            }
            handleEvent(event);
        });
        this.viewpoint = viewpointElement.node();
        this.minimapSvg = minimapSvgElement.node();
        this.minimap = minimap;
        this.canvasBuffer = minimapElement.select('canvas.buffer').node();
        this.update();
    }
    minimapOffset() {
        return {
            x: (this.canvasRect.width - this.minimapSize.width) / 2,
            y: (this.canvasRect.height - this.minimapSize.height) / 2
        };
    }
    updateViewpoint() {
        // Update the coordinates of the viewpoint rectangle.
        select(this.viewpoint).attr('x', this.viewpointCoord.x).attr('y', this.viewpointCoord.y);
        // Update the translation vector of the main svg to reflect the
        // new viewpoint.
        const mainX = (-this.viewpointCoord.x * this.scaleMain) / this.scaleMinimap;
        const mainY = (-this.viewpointCoord.y * this.scaleMain) / this.scaleMinimap;
        select(this.svg).call(this.mainZoom.transform, zoomIdentity.translate(mainX, mainY).scale(this.scaleMain));
    }
    update() {
        let sceneSize = null;
        try {
            // Get the size of the entire scene.
            sceneSize = this.zoomG.getBBox();
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
        const svgSelection = select(this.svg);
        // Read all the style rules in the document and embed them into the svg.
        // The svg needs to be self contained, i.e. all the style rules need to be
        // embedded so the canvas output matches the origin.
        let stylesText = '';
        for (const k of new Array(document.styleSheets.length).keys()) {
            try {
                const cssRules = document.styleSheets[k].cssRules || document.styleSheets[k].rules;
                if (cssRules == null) {
                    continue;
                }
                for (const i of new Array(cssRules.length).keys()) {
                    // Remove tf-* selectors from the styles.
                    stylesText += cssRules[i].cssText.replace(/ ?tf-[\w-]+ ?/g, '') + '\n';
                }
            }
            catch (e) {
                if (e.name !== 'SecurityError') {
                    throw e;
                }
            }
        }
        // Temporarily add the css rules to the main svg.
        const svgStyle = svgSelection.append('style');
        svgStyle.text(stylesText);
        // Temporarily remove the zoom/pan transform from the main svg since we
        // want the minimap to show a zoomed-out and centered view.
        const zoomGSelection = select(this.zoomG);
        const zoomTransform = zoomGSelection.attr('transform');
        zoomGSelection.attr('transform', null);
        // Since we add padding, account for that here.
        sceneSize.height += this.labelPadding * 2;
        sceneSize.width += this.labelPadding * 2;
        // Temporarily assign an explicit width/height to the main svg, since
        // it doesn't have one (uses flex-box), but we need it for the canvas
        // to work.
        svgSelection.attr('width', sceneSize.width).attr('height', sceneSize.height);
        // Since the content inside the svg changed (e.g. a node was expanded),
        // the aspect ratio have also changed. Thus, we need to update the scale
        // factor of the minimap. The scale factor is determined such that both
        // the width and height of the minimap are <= maximum specified w/h.
        this.scaleMinimap = this.maxWandH / Math.max(sceneSize.width, sceneSize.height);
        this.minimapSize = {
            width: sceneSize.width * this.scaleMinimap,
            height: sceneSize.height * this.scaleMinimap
        };
        const minimapOffset = this.minimapOffset();
        // Update the size of the minimap's svg, the buffer canvas and the
        // viewpoint rect.
        select(this.minimapSvg).attr(this.minimapSize);
        select(this.canvasBuffer).attr(this.minimapSize);
        if (this.translate != null && this.zoom != null) {
            // Update the viewpoint rectangle shape since the aspect ratio of the
            // map has changed.
            requestAnimationFrame(() => this.zoom());
        }
        // Serialize the main svg to a string which will be used as the rendering
        // content for the canvas.
        const svgXml = new XMLSerializer().serializeToString(this.svg);
        // Now that the svg is serialized for rendering, remove the temporarily
        // assigned styles, explicit width and height and bring back the pan/zoom
        // transform.
        svgStyle.remove();
        svgSelection.attr('width', '100%').attr('height', '100%');
        zoomGSelection.attr('transform', zoomTransform);
        const image = new Image();
        image.onload = () => {
            // Draw the svg content onto the buffer canvas.
            const context = this.canvasBuffer.getContext('2d');
            context.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);
            context.drawImage(image, minimapOffset.x, minimapOffset.y, this.minimapSize.width, this.minimapSize.height);
            requestAnimationFrame(() => {
                // Hide the old canvas and show the new buffer canvas.
                select(this.canvasBuffer).style('display', 'block');
                select(this.canvas).style('display', 'none');
                // Swap the two canvases.
                [this.canvas, this.canvasBuffer] = [this.canvasBuffer, this.canvas];
            });
        };
        image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgXml);
    }
    /**
     * Handles changes in zooming/panning. Should be called from the main svg
     * to notify that a zoom/pan was performed and this minimap will update it's
     * viewpoint rectangle.
     * @param transform
     */
    zoom(transform) {
        if (this.scaleMinimap == null) {
            // Scene is not ready yet.
            return;
        }
        // Update the new translate and scale params, only if specified.
        if (transform) {
            this.translate = [transform.x, transform.y];
            this.scaleMain = transform.k;
        }
        // Update the location of the viewpoint rectangle.
        const svgRect = this.svg.getBoundingClientRect();
        const minimapOffset = this.minimapOffset();
        const viewpointSelection = select(this.viewpoint);
        this.viewpointCoord.x = (-this.translate[0] * this.scaleMinimap) / this.scaleMain;
        this.viewpointCoord.y = (-this.translate[1] * this.scaleMinimap) / this.scaleMain;
        const viewpointWidth = (svgRect.width * this.scaleMinimap) / this.scaleMain;
        const viewpointHeight = (svgRect.height * this.scaleMinimap) / this.scaleMain;
        viewpointSelection
            .attr('x', this.viewpointCoord.x + minimapOffset.x)
            .attr('y', this.viewpointCoord.y + minimapOffset.y)
            .attr('width', viewpointWidth)
            .attr('height', viewpointHeight);
        // Show/hide the minimap depending on the viewpoint area as fraction of the
        // whole minimap.
        const mapWidth = this.minimapSize.width;
        const mapHeight = this.minimapSize.height;
        const x = this.viewpointCoord.x;
        const y = this.viewpointCoord.y;
        const w = Math.min(Math.max(0, x + viewpointWidth), mapWidth) - Math.min(Math.max(0, x), mapWidth);
        const h = Math.min(Math.max(0, y + viewpointHeight), mapHeight) - Math.min(Math.max(0, y), mapHeight);
        const fracIntersect = (w * h) / (mapWidth * mapHeight);
        if (fracIntersect < FRAC_VIEWPOINT_AREA) {
            this.minimap.classList.remove('hidden');
        }
        else {
            this.minimap.classList.add('hidden');
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaW1hcC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvZ3JhcGgvIiwic291cmNlcyI6WyJjb3JlL21pbmltYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMvQixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMvQyxPQUFPLEVBQWdCLFlBQVksRUFBaUIsTUFBTSxTQUFTLENBQUM7QUFHcEUsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUM7QUFFaEMsTUFBTSxPQUFPLE9BQU87SUFtQmxCLFlBQ0UsR0FBa0IsRUFDbEIsS0FBa0IsRUFDbEIsUUFBNEMsRUFDNUMsT0FBb0IsRUFDcEIsUUFBZ0IsRUFDaEIsWUFBb0I7UUFFcEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsTUFBTSxpQkFBaUIsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBdUIsQ0FBQztRQUNuRixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FB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RyxTQUFTLENBQUMsQ0FBQztRQUN2RCxJQUFJLGFBQWEsR0FBRyxtQkFBbUIsRUFBRTtZQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IGRyYWcgfSBmcm9tICdkMy1kcmFnJztcbmltcG9ydCB7IHBvaW50ZXIsIHNlbGVjdCB9IGZyb20gJ2QzLXNlbGVjdGlvbic7XG5pbXBvcnQgeyBab29tQmVoYXZpb3IsIHpvb21JZGVudGl0eSwgWm9vbVRyYW5zZm9ybSB9IGZyb20gJ2QzLXpvb20nO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuY29uc3QgRlJBQ19WSUVXUE9JTlRfQVJFQSA9IDAuODtcblxuZXhwb3J0IGNsYXNzIE1pbmltYXAge1xuICBwcml2YXRlIG1pbmltYXA6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHByaXZhdGUgY2FudmFzUmVjdDogQ2xpZW50UmVjdDtcbiAgcHJpdmF0ZSBjYW52YXNCdWZmZXI6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIG1pbmltYXBTdmc6IFNWR1NWR0VsZW1lbnQ7XG4gIHByaXZhdGUgdmlld3BvaW50OiBTVkdSZWN0RWxlbWVudDtcbiAgcHJpdmF0ZSBzY2FsZU1pbmltYXAhOiBudW1iZXI7XG4gIHByaXZhdGUgc2NhbGVNYWluITogbnVtYmVyO1xuICBwcml2YXRlIG1heFdhbmRIOiBudW1iZXI7XG4gIHByaXZhdGUgdHJhbnNsYXRlITogW251bWJlciwgbnVtYmVyXTtcbiAgcHJpdmF0ZSB2aWV3cG9pbnRDb29yZDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xuICBwcml2YXRlIG1pbmltYXBTaXplITogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlciB9O1xuICBwcml2YXRlIGxhYmVsUGFkZGluZzogbnVtYmVyO1xuXG4gIHByaXZhdGUgc3ZnOiBTVkdTVkdFbGVtZW50O1xuICBwcml2YXRlIHpvb21HOiBTVkdHRWxlbWVudDtcbiAgcHJpdmF0ZSBtYWluWm9vbTogWm9vbUJlaGF2aW9yPE56U2FmZUFueSwgTnpTYWZlQW55PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzdmc6IFNWR1NWR0VsZW1lbnQsXG4gICAgem9vbUc6IFNWR0dFbGVtZW50LFxuICAgIG1haW5ab29tOiBab29tQmVoYXZpb3I8TnpTYWZlQW55LCBOelNhZmVBbnk+LFxuICAgIG1pbmltYXA6IEhUTUxFbGVtZW50LFxuICAgIG1heFdhbmRIOiBudW1iZXIsXG4gICAgbGFiZWxQYWRkaW5nOiBudW1iZXJcbiAgKSB7XG4gICAgdGhpcy5zdmcgPSBzdmc7XG4gICAgdGhpcy5sYWJlbFBhZGRpbmcgPSBsYWJlbFBhZGRpbmc7XG4gICAgdGhpcy56b29tRyA9IHpvb21HO1xuICAgIHRoaXMubWFpblpvb20gPSBtYWluWm9vbTtcbiAgICB0aGlzLm1heFdhbmRIID0gbWF4V2FuZEg7XG4gICAgY29uc3QgbWluaW1hcEVsZW1lbnQgPSBzZWxlY3QobWluaW1hcCk7XG4gICAgY29uc3QgbWluaW1hcFN2Z0VsZW1lbnQgPSBtaW5pbWFwRWxlbWVudC5zZWxlY3QoJ3N2ZycpO1xuICAgIGNvbnN0IHZpZXdwb2ludEVsZW1lbnQgPSBtaW5pbWFwU3ZnRWxlbWVudC5zZWxlY3QoJ3JlY3QnKTtcbiAgICB0aGlzLmNhbnZhcyA9IG1pbmltYXBFbGVtZW50LnNlbGVjdCgnY2FudmFzLnZpZXdwb3J0Jykubm9kZSgpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHRoaXMuY2FudmFzUmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgY29uc3QgaGFuZGxlRXZlbnQgPSAoZXZlbnQ6IE56U2FmZUFueSk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgbWluaW1hcE9mZnNldCA9IHRoaXMubWluaW1hcE9mZnNldCgpO1xuICAgICAgY29uc3Qgd2lkdGggPSBOdW1iZXIodmlld3BvaW50RWxlbWVudC5hdHRyKCd3aWR0aCcpKTtcbiAgICAgIGNvbnN0IGhlaWdodCA9IE51bWJlcih2aWV3cG9pbnRFbGVtZW50LmF0dHIoJ2hlaWdodCcpKTtcbiAgICAgIGNvbnN0IGNsaWNrQ29vcmRzID0gcG9pbnRlcihldmVudCwgbWluaW1hcFN2Z0VsZW1lbnQubm9kZSgpIGFzIE56U2FmZUFueSk7XG4gICAgICB0aGlzLnZpZXdwb2ludENvb3JkLnggPSBjbGlja0Nvb3Jkc1swXSAtIHdpZHRoIC8gMiAtIG1pbmltYXBPZmZzZXQueDtcbiAgICAgIHRoaXMudmlld3BvaW50Q29vcmQueSA9IGNsaWNrQ29vcmRzWzFdIC0gaGVpZ2h0IC8gMiAtIG1pbmltYXBPZmZzZXQueTtcbiAgICAgIHRoaXMudXBkYXRlVmlld3BvaW50KCk7XG4gICAgfTtcbiAgICB0aGlzLnZpZXdwb2ludENvb3JkID0geyB4OiAwLCB5OiAwIH07XG4gICAgY29uc3QgZHJhZ0V2ZW50ID0gZHJhZygpLnN1YmplY3QoT2JqZWN0KS5vbignZHJhZycsIGhhbmRsZUV2ZW50KTtcbiAgICB2aWV3cG9pbnRFbGVtZW50LmRhdHVtKHRoaXMudmlld3BvaW50Q29vcmQgYXMgTnpTYWZlQW55KS5jYWxsKGRyYWdFdmVudCBhcyBOelNhZmVBbnkpO1xuXG4gICAgLy8gTWFrZSB0aGUgbWluaW1hcCBjbGlja2FibGUuXG4gICAgbWluaW1hcFN2Z0VsZW1lbnQub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgaWYgKChldmVudCBhcyBFdmVudCkuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAvLyBUaGlzIGNsaWNrIHdhcyBwYXJ0IG9mIGEgZHJhZyBldmVudCwgc28gc3VwcHJlc3MgaXQuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGhhbmRsZUV2ZW50KGV2ZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLnZpZXdwb2ludCA9IHZpZXdwb2ludEVsZW1lbnQubm9kZSgpIGFzIFNWR1JlY3RFbGVtZW50O1xuICAgIHRoaXMubWluaW1hcFN2ZyA9IG1pbmltYXBTdmdFbGVtZW50Lm5vZGUoKSBhcyBTVkdTVkdFbGVtZW50O1xuICAgIHRoaXMubWluaW1hcCA9IG1pbmltYXA7XG4gICAgdGhpcy5jYW52YXNCdWZmZXIgPSBtaW5pbWFwRWxlbWVudC5zZWxlY3QoJ2NhbnZhcy5idWZmZXInKS5ub2RlKCkgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgbWluaW1hcE9mZnNldCgpOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0ge1xuICAgIHJldHVybiB7XG4gICAgICB4OiAodGhpcy5jYW52YXNSZWN0LndpZHRoIC0gdGhpcy5taW5pbWFwU2l6ZS53aWR0aCkgLyAyLFxuICAgICAgeTogKHRoaXMuY2FudmFzUmVjdC5oZWlnaHQgLSB0aGlzLm1pbmltYXBTaXplLmhlaWdodCkgLyAyXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVmlld3BvaW50KCk6IHZvaWQge1xuICAgIC8vIFVwZGF0ZSB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIHZpZXdwb2ludCByZWN0YW5nbGUuXG4gICAgc2VsZWN0KHRoaXMudmlld3BvaW50KS5hdHRyKCd4JywgdGhpcy52aWV3cG9pbnRDb29yZC54KS5hdHRyKCd5JywgdGhpcy52aWV3cG9pbnRDb29yZC55KTtcbiAgICAvLyBVcGRhdGUgdGhlIHRyYW5zbGF0aW9uIHZlY3RvciBvZiB0aGUgbWFpbiBzdmcgdG8gcmVmbGVjdCB0aGVcbiAgICAvLyBuZXcgdmlld3BvaW50LlxuICAgIGNvbnN0IG1haW5YID0gKC10aGlzLnZpZXdwb2ludENvb3JkLnggKiB0aGlzLnNjYWxlTWFpbikgLyB0aGlzLnNjYWxlTWluaW1hcDtcbiAgICBjb25zdCBtYWluWSA9ICgtdGhpcy52aWV3cG9pbnRDb29yZC55ICogdGhpcy5zY2FsZU1haW4pIC8gdGhpcy5zY2FsZU1pbmltYXA7XG4gICAgc2VsZWN0KHRoaXMuc3ZnKS5jYWxsKHRoaXMubWFpblpvb20udHJhbnNmb3JtLCB6b29tSWRlbnRpdHkudHJhbnNsYXRlKG1haW5YLCBtYWluWSkuc2NhbGUodGhpcy5zY2FsZU1haW4pKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2NlbmVTaXplID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgLy8gR2V0IHRoZSBzaXplIG9mIHRoZSBlbnRpcmUgc2NlbmUuXG4gICAgICBzY2VuZVNpemUgPSB0aGlzLnpvb21HLmdldEJCb3goKTtcbiAgICAgIGlmIChzY2VuZVNpemUud2lkdGggPT09IDApIHtcbiAgICAgICAgLy8gVGhlcmUgaXMgbm8gc2NlbmUgYW55bW9yZS4gV2UgaGF2ZSBiZWVuIGRldGFjaGVkIGZyb20gdGhlIGRvbS5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIEZpcmVmb3ggcHJvZHVjZWQgTlNfRVJST1JfRkFJTFVSRSBpZiB3ZSBoYXZlIGJlZW5cbiAgICAgIC8vIGRldGFjaGVkIGZyb20gdGhlIGRvbS5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdmdTZWxlY3Rpb24gPSBzZWxlY3QodGhpcy5zdmcpO1xuICAgIC8vIFJlYWQgYWxsIHRoZSBzdHlsZSBydWxlcyBpbiB0aGUgZG9jdW1lbnQgYW5kIGVtYmVkIHRoZW0gaW50byB0aGUgc3ZnLlxuICAgIC8vIFRoZSBzdmcgbmVlZHMgdG8gYmUgc2VsZiBjb250YWluZWQsIGkuZS4gYWxsIHRoZSBzdHlsZSBydWxlcyBuZWVkIHRvIGJlXG4gICAgLy8gZW1iZWRkZWQgc28gdGhlIGNhbnZhcyBvdXRwdXQgbWF0Y2hlcyB0aGUgb3JpZ2luLlxuICAgIGxldCBzdHlsZXNUZXh0ID0gJyc7XG5cbiAgICBmb3IgKGNvbnN0IGsgb2YgbmV3IEFycmF5KGRvY3VtZW50LnN0eWxlU2hlZXRzLmxlbmd0aCkua2V5cygpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBjc3NSdWxlcyA9IChkb2N1bWVudC5zdHlsZVNoZWV0c1trXSBhcyBOelNhZmVBbnkpLmNzc1J1bGVzIHx8IChkb2N1bWVudC5zdHlsZVNoZWV0c1trXSBhcyBOelNhZmVBbnkpLnJ1bGVzO1xuICAgICAgICBpZiAoY3NzUnVsZXMgPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgaSBvZiBuZXcgQXJyYXkoY3NzUnVsZXMubGVuZ3RoKS5rZXlzKCkpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgdGYtKiBzZWxlY3RvcnMgZnJvbSB0aGUgc3R5bGVzLlxuICAgICAgICAgIHN0eWxlc1RleHQgKz0gY3NzUnVsZXNbaV0uY3NzVGV4dC5yZXBsYWNlKC8gP3RmLVtcXHctXSsgPy9nLCAnJykgKyAnXFxuJztcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZS5uYW1lICE9PSAnU2VjdXJpdHlFcnJvcicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGVtcG9yYXJpbHkgYWRkIHRoZSBjc3MgcnVsZXMgdG8gdGhlIG1haW4gc3ZnLlxuICAgIGNvbnN0IHN2Z1N0eWxlID0gc3ZnU2VsZWN0aW9uLmFwcGVuZCgnc3R5bGUnKTtcbiAgICBzdmdTdHlsZS50ZXh0KHN0eWxlc1RleHQpO1xuXG4gICAgLy8gVGVtcG9yYXJpbHkgcmVtb3ZlIHRoZSB6b29tL3BhbiB0cmFuc2Zvcm0gZnJvbSB0aGUgbWFpbiBzdmcgc2luY2Ugd2VcbiAgICAvLyB3YW50IHRoZSBtaW5pbWFwIHRvIHNob3cgYSB6b29tZWQtb3V0IGFuZCBjZW50ZXJlZCB2aWV3LlxuICAgIGNvbnN0IHpvb21HU2VsZWN0aW9uID0gc2VsZWN0KHRoaXMuem9vbUcpO1xuICAgIGNvbnN0IHpvb21UcmFuc2Zvcm0gPSB6b29tR1NlbGVjdGlvbi5hdHRyKCd0cmFuc2Zvcm0nKTtcbiAgICB6b29tR1NlbGVjdGlvbi5hdHRyKCd0cmFuc2Zvcm0nLCBudWxsKTtcblxuICAgIC8vIFNpbmNlIHdlIGFkZCBwYWRkaW5nLCBhY2NvdW50IGZvciB0aGF0IGhlcmUuXG4gICAgc2NlbmVTaXplLmhlaWdodCArPSB0aGlzLmxhYmVsUGFkZGluZyAqIDI7XG4gICAgc2NlbmVTaXplLndpZHRoICs9IHRoaXMubGFiZWxQYWRkaW5nICogMjtcblxuICAgIC8vIFRlbXBvcmFyaWx5IGFzc2lnbiBhbiBleHBsaWNpdCB3aWR0aC9oZWlnaHQgdG8gdGhlIG1haW4gc3ZnLCBzaW5jZVxuICAgIC8vIGl0IGRvZXNuJ3QgaGF2ZSBvbmUgKHVzZXMgZmxleC1ib3gpLCBidXQgd2UgbmVlZCBpdCBmb3IgdGhlIGNhbnZhc1xuICAgIC8vIHRvIHdvcmsuXG4gICAgc3ZnU2VsZWN0aW9uLmF0dHIoJ3dpZHRoJywgc2NlbmVTaXplLndpZHRoKS5hdHRyKCdoZWlnaHQnLCBzY2VuZVNpemUuaGVpZ2h0KTtcblxuICAgIC8vIFNpbmNlIHRoZSBjb250ZW50IGluc2lkZSB0aGUgc3ZnIGNoYW5nZWQgKGUuZy4gYSBub2RlIHdhcyBleHBhbmRlZCksXG4gICAgLy8gdGhlIGFzcGVjdCByYXRpbyBoYXZlIGFsc28gY2hhbmdlZC4gVGh1cywgd2UgbmVlZCB0byB1cGRhdGUgdGhlIHNjYWxlXG4gICAgLy8gZmFjdG9yIG9mIHRoZSBtaW5pbWFwLiBUaGUgc2NhbGUgZmFjdG9yIGlzIGRldGVybWluZWQgc3VjaCB0aGF0IGJvdGhcbiAgICAvLyB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgbWluaW1hcCBhcmUgPD0gbWF4aW11bSBzcGVjaWZpZWQgdy9oLlxuICAgIHRoaXMuc2NhbGVNaW5pbWFwID0gdGhpcy5tYXhXYW5kSCAvIE1hdGgubWF4KHNjZW5lU2l6ZS53aWR0aCwgc2NlbmVTaXplLmhlaWdodCk7XG4gICAgdGhpcy5taW5pbWFwU2l6ZSA9IHtcbiAgICAgIHdpZHRoOiBzY2VuZVNpemUud2lkdGggKiB0aGlzLnNjYWxlTWluaW1hcCxcbiAgICAgIGhlaWdodDogc2NlbmVTaXplLmhlaWdodCAqIHRoaXMuc2NhbGVNaW5pbWFwXG4gICAgfTtcblxuICAgIGNvbnN0IG1pbmltYXBPZmZzZXQgPSB0aGlzLm1pbmltYXBPZmZzZXQoKTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgc2l6ZSBvZiB0aGUgbWluaW1hcCdzIHN2ZywgdGhlIGJ1ZmZlciBjYW52YXMgYW5kIHRoZVxuICAgIC8vIHZpZXdwb2ludCByZWN0LlxuICAgIHNlbGVjdCh0aGlzLm1pbmltYXBTdmcpLmF0dHIodGhpcy5taW5pbWFwU2l6ZSBhcyBOelNhZmVBbnkpO1xuICAgIHNlbGVjdCh0aGlzLmNhbnZhc0J1ZmZlcikuYXR0cih0aGlzLm1pbmltYXBTaXplIGFzIE56U2FmZUFueSk7XG5cbiAgICBpZiAodGhpcy50cmFuc2xhdGUgIT0gbnVsbCAmJiB0aGlzLnpvb20gIT0gbnVsbCkge1xuICAgICAgLy8gVXBkYXRlIHRoZSB2aWV3cG9pbnQgcmVjdGFuZ2xlIHNoYXBlIHNpbmNlIHRoZSBhc3BlY3QgcmF0aW8gb2YgdGhlXG4gICAgICAvLyBtYXAgaGFzIGNoYW5nZWQuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy56b29tKCkpO1xuICAgIH1cblxuICAgIC8vIFNlcmlhbGl6ZSB0aGUgbWFpbiBzdmcgdG8gYSBzdHJpbmcgd2hpY2ggd2lsbCBiZSB1c2VkIGFzIHRoZSByZW5kZXJpbmdcbiAgICAvLyBjb250ZW50IGZvciB0aGUgY2FudmFzLlxuICAgIGNvbnN0IHN2Z1htbCA9IG5ldyBYTUxTZXJpYWxpemVyKCkuc2VyaWFsaXplVG9TdHJpbmcodGhpcy5zdmcpO1xuXG4gICAgLy8gTm93IHRoYXQgdGhlIHN2ZyBpcyBzZXJpYWxpemVkIGZvciByZW5kZXJpbmcsIHJlbW92ZSB0aGUgdGVtcG9yYXJpbHlcbiAgICAvLyBhc3NpZ25lZCBzdHlsZXMsIGV4cGxpY2l0IHdpZHRoIGFuZCBoZWlnaHQgYW5kIGJyaW5nIGJhY2sgdGhlIHBhbi96b29tXG4gICAgLy8gdHJhbnNmb3JtLlxuICAgIHN2Z1N0eWxlLnJlbW92ZSgpO1xuICAgIHN2Z1NlbGVjdGlvbi5hdHRyKCd3aWR0aCcsICcxMDAlJykuYXR0cignaGVpZ2h0JywgJzEwMCUnKTtcblxuICAgIHpvb21HU2VsZWN0aW9uLmF0dHIoJ3RyYW5zZm9ybScsIHpvb21UcmFuc2Zvcm0pO1xuXG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAvLyBEcmF3IHRoZSBzdmcgY29udGVudCBvbnRvIHRoZSBidWZmZXIgY2FudmFzLlxuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuY2FudmFzQnVmZmVyLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjb250ZXh0IS5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNCdWZmZXIud2lkdGgsIHRoaXMuY2FudmFzQnVmZmVyLmhlaWdodCk7XG5cbiAgICAgIGNvbnRleHQhLmRyYXdJbWFnZShpbWFnZSwgbWluaW1hcE9mZnNldC54LCBtaW5pbWFwT2Zmc2V0LnksIHRoaXMubWluaW1hcFNpemUud2lkdGgsIHRoaXMubWluaW1hcFNpemUuaGVpZ2h0KTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIC8vIEhpZGUgdGhlIG9sZCBjYW52YXMgYW5kIHNob3cgdGhlIG5ldyBidWZmZXIgY2FudmFzLlxuICAgICAgICBzZWxlY3QodGhpcy5jYW52YXNCdWZmZXIpLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIHNlbGVjdCh0aGlzLmNhbnZhcykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAvLyBTd2FwIHRoZSB0d28gY2FudmFzZXMuXG4gICAgICAgIFt0aGlzLmNhbnZhcywgdGhpcy5jYW52YXNCdWZmZXJdID0gW3RoaXMuY2FudmFzQnVmZmVyLCB0aGlzLmNhbnZhc107XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGltYWdlLnNyYyA9ICdkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KHN2Z1htbCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBjaGFuZ2VzIGluIHpvb21pbmcvcGFubmluZy4gU2hvdWxkIGJlIGNhbGxlZCBmcm9tIHRoZSBtYWluIHN2Z1xuICAgKiB0byBub3RpZnkgdGhhdCBhIHpvb20vcGFuIHdhcyBwZXJmb3JtZWQgYW5kIHRoaXMgbWluaW1hcCB3aWxsIHVwZGF0ZSBpdCdzXG4gICAqIHZpZXdwb2ludCByZWN0YW5nbGUuXG4gICAqIEBwYXJhbSB0cmFuc2Zvcm1cbiAgICovXG4gIHpvb20odHJhbnNmb3JtPzogWm9vbVRyYW5zZm9ybSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNjYWxlTWluaW1hcCA9PSBudWxsKSB7XG4gICAgICAvLyBTY2VuZSBpcyBub3QgcmVhZHkgeWV0LlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBVcGRhdGUgdGhlIG5ldyB0cmFuc2xhdGUgYW5kIHNjYWxlIHBhcmFtcywgb25seSBpZiBzcGVjaWZpZWQuXG4gICAgaWYgKHRyYW5zZm9ybSkge1xuICAgICAgdGhpcy50cmFuc2xhdGUgPSBbdHJhbnNmb3JtLngsIHRyYW5zZm9ybS55XTtcbiAgICAgIHRoaXMuc2NhbGVNYWluID0gdHJhbnNmb3JtLms7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHRoZSBsb2NhdGlvbiBvZiB0aGUgdmlld3BvaW50IHJlY3RhbmdsZS5cbiAgICBjb25zdCBzdmdSZWN0ID0gdGhpcy5zdmcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgbWluaW1hcE9mZnNldCA9IHRoaXMubWluaW1hcE9mZnNldCgpO1xuICAgIGNvbnN0IHZpZXdwb2ludFNlbGVjdGlvbiA9IHNlbGVjdCh0aGlzLnZpZXdwb2ludCk7XG4gICAgdGhpcy52aWV3cG9pbnRDb29yZC54ID0gKC10aGlzLnRyYW5zbGF0ZVswXSAqIHRoaXMuc2NhbGVNaW5pbWFwKSAvIHRoaXMuc2NhbGVNYWluO1xuICAgIHRoaXMudmlld3BvaW50Q29vcmQueSA9ICgtdGhpcy50cmFuc2xhdGVbMV0gKiB0aGlzLnNjYWxlTWluaW1hcCkgLyB0aGlzLnNjYWxlTWFpbjtcbiAgICBjb25zdCB2aWV3cG9pbnRXaWR0aCA9IChzdmdSZWN0LndpZHRoICogdGhpcy5zY2FsZU1pbmltYXApIC8gdGhpcy5zY2FsZU1haW47XG4gICAgY29uc3Qgdmlld3BvaW50SGVpZ2h0ID0gKHN2Z1JlY3QuaGVpZ2h0ICogdGhpcy5zY2FsZU1pbmltYXApIC8gdGhpcy5zY2FsZU1haW47XG4gICAgdmlld3BvaW50U2VsZWN0aW9uXG4gICAgICAuYXR0cigneCcsIHRoaXMudmlld3BvaW50Q29vcmQueCArIG1pbmltYXBPZmZzZXQueClcbiAgICAgIC5hdHRyKCd5JywgdGhpcy52aWV3cG9pbnRDb29yZC55ICsgbWluaW1hcE9mZnNldC55KVxuICAgICAgLmF0dHIoJ3dpZHRoJywgdmlld3BvaW50V2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0Jywgdmlld3BvaW50SGVpZ2h0KTtcbiAgICAvLyBTaG93L2hpZGUgdGhlIG1pbmltYXAgZGVwZW5kaW5nIG9uIHRoZSB2aWV3cG9pbnQgYXJlYSBhcyBmcmFjdGlvbiBvZiB0aGVcbiAgICAvLyB3aG9sZSBtaW5pbWFwLlxuICAgIGNvbnN0IG1hcFdpZHRoID0gdGhpcy5taW5pbWFwU2l6ZS53aWR0aDtcbiAgICBjb25zdCBtYXBIZWlnaHQgPSB0aGlzLm1pbmltYXBTaXplLmhlaWdodDtcbiAgICBjb25zdCB4ID0gdGhpcy52aWV3cG9pbnRDb29yZC54O1xuICAgIGNvbnN0IHkgPSB0aGlzLnZpZXdwb2ludENvb3JkLnk7XG4gICAgY29uc3QgdyA9IE1hdGgubWluKE1hdGgubWF4KDAsIHggKyB2aWV3cG9pbnRXaWR0aCksIG1hcFdpZHRoKSAtIE1hdGgubWluKE1hdGgubWF4KDAsIHgpLCBtYXBXaWR0aCk7XG4gICAgY29uc3QgaCA9IE1hdGgubWluKE1hdGgubWF4KDAsIHkgKyB2aWV3cG9pbnRIZWlnaHQpLCBtYXBIZWlnaHQpIC0gTWF0aC5taW4oTWF0aC5tYXgoMCwgeSksIG1hcEhlaWdodCk7XG4gICAgY29uc3QgZnJhY0ludGVyc2VjdCA9ICh3ICogaCkgLyAobWFwV2lkdGggKiBtYXBIZWlnaHQpO1xuICAgIGlmIChmcmFjSW50ZXJzZWN0IDwgRlJBQ19WSUVXUE9JTlRfQVJFQSkge1xuICAgICAgdGhpcy5taW5pbWFwLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pbmltYXAuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxuICB9XG59XG4iXX0=