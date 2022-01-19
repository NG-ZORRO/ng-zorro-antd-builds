import { __decorate } from "tslib";
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ensureInBounds, InputBoolean } from 'ng-zorro-antd/core/util';
import { getEventWithPoint } from './resizable-utils';
import { NzResizableService } from './resizable.service';
import * as i0 from "@angular/core";
import * as i1 from "./resizable.service";
import * as i2 from "@angular/cdk/platform";
export class NzResizableDirective {
    constructor(elementRef, renderer, nzResizableService, platform, ngZone) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.nzResizableService = nzResizableService;
        this.platform = platform;
        this.ngZone = ngZone;
        this.nzBounds = 'parent';
        this.nzMinHeight = 40;
        this.nzMinWidth = 40;
        this.nzGridColumnCount = -1;
        this.nzMaxColumn = -1;
        this.nzMinColumn = -1;
        this.nzLockAspectRatio = false;
        this.nzPreview = false;
        this.nzDisabled = false;
        this.nzResize = new EventEmitter();
        this.nzResizeEnd = new EventEmitter();
        this.nzResizeStart = new EventEmitter();
        this.resizing = false;
        this.currentHandleEvent = null;
        this.ghostElement = null;
        this.sizeCache = null;
        this.destroy$ = new Subject();
        this.nzResizableService.handleMouseDown$.pipe(takeUntil(this.destroy$)).subscribe(event => {
            if (this.nzDisabled) {
                return;
            }
            this.resizing = true;
            this.nzResizableService.startResizing(event.mouseEvent);
            this.currentHandleEvent = event;
            this.setCursor();
            this.nzResizeStart.emit({
                mouseEvent: event.mouseEvent
            });
            this.elRect = this.el.getBoundingClientRect();
        });
        this.nzResizableService.documentMouseUp$.pipe(takeUntil(this.destroy$)).subscribe(event => {
            if (this.resizing) {
                this.resizing = false;
                this.nzResizableService.documentMouseUp$.next();
                this.endResize(event);
            }
        });
        this.nzResizableService.documentMouseMove$.pipe(takeUntil(this.destroy$)).subscribe(event => {
            if (this.resizing) {
                this.resize(event);
            }
        });
    }
    setPosition() {
        const position = getComputedStyle(this.el).position;
        if (position === 'static' || !position) {
            this.renderer.setStyle(this.el, 'position', 'relative');
        }
    }
    calcSize(width, height, ratio) {
        let newWidth;
        let newHeight;
        let maxWidth;
        let maxHeight;
        let col = 0;
        let spanWidth = 0;
        let minWidth = this.nzMinWidth;
        let boundWidth = Infinity;
        let boundHeight = Infinity;
        if (this.nzBounds === 'parent') {
            const parent = this.renderer.parentNode(this.el);
            if (parent instanceof HTMLElement) {
                const parentRect = parent.getBoundingClientRect();
                boundWidth = parentRect.width;
                boundHeight = parentRect.height;
            }
        }
        else if (this.nzBounds === 'window') {
            if (typeof window !== 'undefined') {
                boundWidth = window.innerWidth;
                boundHeight = window.innerHeight;
            }
        }
        else if (this.nzBounds && this.nzBounds.nativeElement && this.nzBounds.nativeElement instanceof HTMLElement) {
            const boundsRect = this.nzBounds.nativeElement.getBoundingClientRect();
            boundWidth = boundsRect.width;
            boundHeight = boundsRect.height;
        }
        maxWidth = ensureInBounds(this.nzMaxWidth, boundWidth);
        maxHeight = ensureInBounds(this.nzMaxHeight, boundHeight);
        if (this.nzGridColumnCount !== -1) {
            spanWidth = maxWidth / this.nzGridColumnCount;
            minWidth = this.nzMinColumn !== -1 ? spanWidth * this.nzMinColumn : minWidth;
            maxWidth = this.nzMaxColumn !== -1 ? spanWidth * this.nzMaxColumn : maxWidth;
        }
        if (ratio !== -1) {
            if (/(left|right)/i.test(this.currentHandleEvent.direction)) {
                newWidth = Math.min(Math.max(width, minWidth), maxWidth);
                newHeight = Math.min(Math.max(newWidth / ratio, this.nzMinHeight), maxHeight);
                if (newHeight >= maxHeight || newHeight <= this.nzMinHeight) {
                    newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
                }
            }
            else {
                newHeight = Math.min(Math.max(height, this.nzMinHeight), maxHeight);
                newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
                if (newWidth >= maxWidth || newWidth <= minWidth) {
                    newHeight = Math.min(Math.max(newWidth / ratio, this.nzMinHeight), maxHeight);
                }
            }
        }
        else {
            newWidth = Math.min(Math.max(width, minWidth), maxWidth);
            newHeight = Math.min(Math.max(height, this.nzMinHeight), maxHeight);
        }
        if (this.nzGridColumnCount !== -1) {
            col = Math.round(newWidth / spanWidth);
            newWidth = col * spanWidth;
        }
        return {
            col,
            width: newWidth,
            height: newHeight
        };
    }
    setCursor() {
        switch (this.currentHandleEvent.direction) {
            case 'left':
            case 'right':
                this.renderer.setStyle(document.body, 'cursor', 'ew-resize');
                break;
            case 'top':
            case 'bottom':
                this.renderer.setStyle(document.body, 'cursor', 'ns-resize');
                break;
            case 'topLeft':
            case 'bottomRight':
                this.renderer.setStyle(document.body, 'cursor', 'nwse-resize');
                break;
            case 'topRight':
            case 'bottomLeft':
                this.renderer.setStyle(document.body, 'cursor', 'nesw-resize');
                break;
        }
        this.renderer.setStyle(document.body, 'user-select', 'none');
    }
    resize(event) {
        const elRect = this.elRect;
        const resizeEvent = getEventWithPoint(event);
        const handleEvent = getEventWithPoint(this.currentHandleEvent.mouseEvent);
        let width = elRect.width;
        let height = elRect.height;
        const ratio = this.nzLockAspectRatio ? width / height : -1;
        switch (this.currentHandleEvent.direction) {
            case 'bottomRight':
                width = resizeEvent.clientX - elRect.left;
                height = resizeEvent.clientY - elRect.top;
                break;
            case 'bottomLeft':
                width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
                height = resizeEvent.clientY - elRect.top;
                break;
            case 'topRight':
                width = resizeEvent.clientX - elRect.left;
                height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
                break;
            case 'topLeft':
                width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
                height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
                break;
            case 'top':
                height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
                break;
            case 'right':
                width = resizeEvent.clientX - elRect.left;
                break;
            case 'bottom':
                height = resizeEvent.clientY - elRect.top;
                break;
            case 'left':
                width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
        }
        const size = this.calcSize(width, height, ratio);
        this.sizeCache = { ...size };
        // Re-enter the Angular zone and run the change detection only if there're any `nzResize` listeners,
        // e.g.: `<div nz-resizable (nzResize)="..."></div>`.
        if (this.nzResize.observers.length) {
            this.ngZone.run(() => {
                this.nzResize.emit({
                    ...size,
                    mouseEvent: event
                });
            });
        }
        if (this.nzPreview) {
            this.previewResize(size);
        }
    }
    endResize(event) {
        this.renderer.setStyle(document.body, 'cursor', '');
        this.renderer.setStyle(document.body, 'user-select', '');
        this.removeGhostElement();
        const size = this.sizeCache
            ? { ...this.sizeCache }
            : {
                width: this.elRect.width,
                height: this.elRect.height
            };
        // Re-enter the Angular zone and run the change detection only if there're any `nzResizeEnd` listeners,
        // e.g.: `<div nz-resizable (nzResizeEnd)="..."></div>`.
        if (this.nzResizeEnd.observers.length) {
            this.ngZone.run(() => {
                this.nzResizeEnd.emit({
                    ...size,
                    mouseEvent: event
                });
            });
        }
        this.sizeCache = null;
        this.currentHandleEvent = null;
    }
    previewResize({ width, height }) {
        this.createGhostElement();
        this.renderer.setStyle(this.ghostElement, 'width', `${width}px`);
        this.renderer.setStyle(this.ghostElement, 'height', `${height}px`);
    }
    createGhostElement() {
        if (!this.ghostElement) {
            this.ghostElement = this.renderer.createElement('div');
            this.renderer.setAttribute(this.ghostElement, 'class', 'nz-resizable-preview');
        }
        this.renderer.appendChild(this.el, this.ghostElement);
    }
    removeGhostElement() {
        if (this.ghostElement) {
            this.renderer.removeChild(this.el, this.ghostElement);
        }
    }
    ngAfterViewInit() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.el = this.elementRef.nativeElement;
        this.setPosition();
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.el, 'mouseenter')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.nzResizableService.mouseEntered$.next(true);
            });
            fromEvent(this.el, 'mouseleave')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.nzResizableService.mouseEntered$.next(false);
            });
        });
    }
    ngOnDestroy() {
        this.ghostElement = null;
        this.sizeCache = null;
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzResizableDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.NzResizableService }, { token: i2.Platform }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
NzResizableDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzResizableDirective, selector: "[nz-resizable]", inputs: { nzBounds: "nzBounds", nzMaxHeight: "nzMaxHeight", nzMaxWidth: "nzMaxWidth", nzMinHeight: "nzMinHeight", nzMinWidth: "nzMinWidth", nzGridColumnCount: "nzGridColumnCount", nzMaxColumn: "nzMaxColumn", nzMinColumn: "nzMinColumn", nzLockAspectRatio: "nzLockAspectRatio", nzPreview: "nzPreview", nzDisabled: "nzDisabled" }, outputs: { nzResize: "nzResize", nzResizeEnd: "nzResizeEnd", nzResizeStart: "nzResizeStart" }, host: { properties: { "class.nz-resizable-resizing": "resizing", "class.nz-resizable-disabled": "nzDisabled" }, classAttribute: "nz-resizable" }, providers: [NzResizableService], exportAs: ["nzResizable"], ngImport: i0 });
__decorate([
    InputBoolean()
], NzResizableDirective.prototype, "nzLockAspectRatio", void 0);
__decorate([
    InputBoolean()
], NzResizableDirective.prototype, "nzPreview", void 0);
__decorate([
    InputBoolean()
], NzResizableDirective.prototype, "nzDisabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-resizable]',
                    exportAs: 'nzResizable',
                    providers: [NzResizableService],
                    host: {
                        class: 'nz-resizable',
                        '[class.nz-resizable-resizing]': 'resizing',
                        '[class.nz-resizable-disabled]': 'nzDisabled'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NzResizableService }, { type: i2.Platform }, { type: i0.NgZone }]; }, propDecorators: { nzBounds: [{
                type: Input
            }], nzMaxHeight: [{
                type: Input
            }], nzMaxWidth: [{
                type: Input
            }], nzMinHeight: [{
                type: Input
            }], nzMinWidth: [{
                type: Input
            }], nzGridColumnCount: [{
                type: Input
            }], nzMaxColumn: [{
                type: Input
            }], nzMinColumn: [{
                type: Input
            }], nzLockAspectRatio: [{
                type: Input
            }], nzPreview: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzResize: [{
                type: Output
            }], nzResizeEnd: [{
                type: Output
            }], nzResizeStart: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvcmVzaXphYmxlL3Jlc2l6YWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFFTCxTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFvQnpELE1BQU0sT0FBTyxvQkFBb0I7SUE0Qi9CLFlBQ1UsVUFBbUMsRUFDbkMsUUFBbUIsRUFDbkIsa0JBQXNDLEVBQ3RDLFFBQWtCLEVBQ2xCLE1BQWM7UUFKZCxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBNUJmLGFBQVEsR0FBa0QsUUFBUSxDQUFDO1FBR25FLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsc0JBQWlCLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDL0IsZ0JBQVcsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUN6QixnQkFBVyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ1Qsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLGNB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UyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7aUhBOVJVLG9CQUFvQjtxR0FBcEIsb0JBQW9CLGttQkFQcEIsQ0FBQyxrQkFBa0IsQ0FBQztBQW9CTjtJQUFmLFlBQVksRUFBRTsrREFBb0M7QUFDbkM7SUFBZixZQUFZLEVBQUU7dURBQTRCO0FBQzNCO0lBQWYsWUFBWSxFQUFFO3dEQUE2QjsyRkFmMUMsb0JBQW9CO2tCQVZoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDL0IsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxjQUFjO3dCQUNyQiwrQkFBK0IsRUFBRSxVQUFVO3dCQUMzQywrQkFBK0IsRUFBRSxZQUFZO3FCQUM5QztpQkFDRjtzTUFNVSxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDbUIsaUJBQWlCO3NCQUF6QyxLQUFLO2dCQUNtQixTQUFTO3NCQUFqQyxLQUFLO2dCQUNtQixVQUFVO3NCQUFsQyxLQUFLO2dCQUNhLFFBQVE7c0JBQTFCLE1BQU07Z0JBQ1ksV0FBVztzQkFBN0IsTUFBTTtnQkFDWSxhQUFhO3NCQUEvQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IGVuc3VyZUluQm91bmRzLCBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IGdldEV2ZW50V2l0aFBvaW50IH0gZnJvbSAnLi9yZXNpemFibGUtdXRpbHMnO1xuaW1wb3J0IHsgTnpSZXNpemFibGVTZXJ2aWNlIH0gZnJvbSAnLi9yZXNpemFibGUuc2VydmljZSc7XG5pbXBvcnQgeyBOelJlc2l6ZUhhbmRsZU1vdXNlRG93bkV2ZW50IH0gZnJvbSAnLi9yZXNpemUtaGFuZGxlLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnpSZXNpemVFdmVudCB7XG4gIHdpZHRoPzogbnVtYmVyO1xuICBoZWlnaHQ/OiBudW1iZXI7XG4gIGNvbD86IG51bWJlcjtcbiAgbW91c2VFdmVudD86IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnotcmVzaXphYmxlXScsXG4gIGV4cG9ydEFzOiAnbnpSZXNpemFibGUnLFxuICBwcm92aWRlcnM6IFtOelJlc2l6YWJsZVNlcnZpY2VdLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICduei1yZXNpemFibGUnLFxuICAgICdbY2xhc3MubnotcmVzaXphYmxlLXJlc2l6aW5nXSc6ICdyZXNpemluZycsXG4gICAgJ1tjbGFzcy5uei1yZXNpemFibGUtZGlzYWJsZWRdJzogJ256RGlzYWJsZWQnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpSZXNpemFibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpMb2NrQXNwZWN0UmF0aW86IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256UHJldmlldzogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIG56Qm91bmRzOiAnd2luZG93JyB8ICdwYXJlbnQnIHwgRWxlbWVudFJlZjxIVE1MRWxlbWVudD4gPSAncGFyZW50JztcbiAgQElucHV0KCkgbnpNYXhIZWlnaHQ/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG56TWF4V2lkdGg/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG56TWluSGVpZ2h0OiBudW1iZXIgPSA0MDtcbiAgQElucHV0KCkgbnpNaW5XaWR0aDogbnVtYmVyID0gNDA7XG4gIEBJbnB1dCgpIG56R3JpZENvbHVtbkNvdW50OiBudW1iZXIgPSAtMTtcbiAgQElucHV0KCkgbnpNYXhDb2x1bW46IG51bWJlciA9IC0xO1xuICBASW5wdXQoKSBuek1pbkNvbHVtbjogbnVtYmVyID0gLTE7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekxvY2tBc3BlY3RSYXRpbzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpQcmV2aWV3OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuelJlc2l6ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpSZXNpemVFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56UmVzaXplRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxOelJlc2l6ZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpSZXNpemVTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TnpSZXNpemVFdmVudD4oKTtcblxuICByZXNpemluZyA9IGZhbHNlO1xuICBwcml2YXRlIGVsUmVjdCE6IENsaWVudFJlY3QgfCBET01SZWN0O1xuICBwcml2YXRlIGN1cnJlbnRIYW5kbGVFdmVudDogTnpSZXNpemVIYW5kbGVNb3VzZURvd25FdmVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGdob3N0RWxlbWVudDogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBlbCE6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIHNpemVDYWNoZTogTnpSZXNpemVFdmVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIG56UmVzaXphYmxlU2VydmljZTogTnpSZXNpemFibGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgdGhpcy5uelJlc2l6YWJsZVNlcnZpY2UuaGFuZGxlTW91c2VEb3duJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLm56RGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5yZXNpemluZyA9IHRydWU7XG4gICAgICB0aGlzLm56UmVzaXphYmxlU2VydmljZS5zdGFydFJlc2l6aW5nKGV2ZW50Lm1vdXNlRXZlbnQpO1xuICAgICAgdGhpcy5jdXJyZW50SGFuZGxlRXZlbnQgPSBldmVudDtcbiAgICAgIHRoaXMuc2V0Q3Vyc29yKCk7XG4gICAgICB0aGlzLm56UmVzaXplU3RhcnQuZW1pdCh7XG4gICAgICAgIG1vdXNlRXZlbnQ6IGV2ZW50Lm1vdXNlRXZlbnRcbiAgICAgIH0pO1xuICAgICAgdGhpcy5lbFJlY3QgPSB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5uelJlc2l6YWJsZVNlcnZpY2UuZG9jdW1lbnRNb3VzZVVwJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLnJlc2l6aW5nKSB7XG4gICAgICAgIHRoaXMucmVzaXppbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5uelJlc2l6YWJsZVNlcnZpY2UuZG9jdW1lbnRNb3VzZVVwJC5uZXh0KCk7XG4gICAgICAgIHRoaXMuZW5kUmVzaXplKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMubnpSZXNpemFibGVTZXJ2aWNlLmRvY3VtZW50TW91c2VNb3ZlJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLnJlc2l6aW5nKSB7XG4gICAgICAgIHRoaXMucmVzaXplKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsKS5wb3NpdGlvbjtcbiAgICBpZiAocG9zaXRpb24gPT09ICdzdGF0aWMnIHx8ICFwb3NpdGlvbikge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICB9XG4gIH1cblxuICBjYWxjU2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcmF0aW86IG51bWJlcik6IE56UmVzaXplRXZlbnQge1xuICAgIGxldCBuZXdXaWR0aDogbnVtYmVyO1xuICAgIGxldCBuZXdIZWlnaHQ6IG51bWJlcjtcbiAgICBsZXQgbWF4V2lkdGg6IG51bWJlcjtcbiAgICBsZXQgbWF4SGVpZ2h0OiBudW1iZXI7XG4gICAgbGV0IGNvbCA9IDA7XG4gICAgbGV0IHNwYW5XaWR0aCA9IDA7XG4gICAgbGV0IG1pbldpZHRoID0gdGhpcy5uek1pbldpZHRoO1xuICAgIGxldCBib3VuZFdpZHRoID0gSW5maW5pdHk7XG4gICAgbGV0IGJvdW5kSGVpZ2h0ID0gSW5maW5pdHk7XG4gICAgaWYgKHRoaXMubnpCb3VuZHMgPT09ICdwYXJlbnQnKSB7XG4gICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbCk7XG4gICAgICBpZiAocGFyZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgcGFyZW50UmVjdCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgYm91bmRXaWR0aCA9IHBhcmVudFJlY3Qud2lkdGg7XG4gICAgICAgIGJvdW5kSGVpZ2h0ID0gcGFyZW50UmVjdC5oZWlnaHQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm56Qm91bmRzID09PSAnd2luZG93Jykge1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGJvdW5kV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgYm91bmRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm56Qm91bmRzICYmIHRoaXMubnpCb3VuZHMubmF0aXZlRWxlbWVudCAmJiB0aGlzLm56Qm91bmRzLm5hdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgY29uc3QgYm91bmRzUmVjdCA9IHRoaXMubnpCb3VuZHMubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGJvdW5kV2lkdGggPSBib3VuZHNSZWN0LndpZHRoO1xuICAgICAgYm91bmRIZWlnaHQgPSBib3VuZHNSZWN0LmhlaWdodDtcbiAgICB9XG5cbiAgICBtYXhXaWR0aCA9IGVuc3VyZUluQm91bmRzKHRoaXMubnpNYXhXaWR0aCEsIGJvdW5kV2lkdGgpO1xuICAgIG1heEhlaWdodCA9IGVuc3VyZUluQm91bmRzKHRoaXMubnpNYXhIZWlnaHQhLCBib3VuZEhlaWdodCk7XG5cbiAgICBpZiAodGhpcy5uekdyaWRDb2x1bW5Db3VudCAhPT0gLTEpIHtcbiAgICAgIHNwYW5XaWR0aCA9IG1heFdpZHRoIC8gdGhpcy5uekdyaWRDb2x1bW5Db3VudDtcbiAgICAgIG1pbldpZHRoID0gdGhpcy5uek1pbkNvbHVtbiAhPT0gLTEgPyBzcGFuV2lkdGggKiB0aGlzLm56TWluQ29sdW1uIDogbWluV2lkdGg7XG4gICAgICBtYXhXaWR0aCA9IHRoaXMubnpNYXhDb2x1bW4gIT09IC0xID8gc3BhbldpZHRoICogdGhpcy5uek1heENvbHVtbiA6IG1heFdpZHRoO1xuICAgIH1cblxuICAgIGlmIChyYXRpbyAhPT0gLTEpIHtcbiAgICAgIGlmICgvKGxlZnR8cmlnaHQpL2kudGVzdCh0aGlzLmN1cnJlbnRIYW5kbGVFdmVudCEuZGlyZWN0aW9uKSkge1xuICAgICAgICBuZXdXaWR0aCA9IE1hdGgubWluKE1hdGgubWF4KHdpZHRoLCBtaW5XaWR0aCksIG1heFdpZHRoKTtcbiAgICAgICAgbmV3SGVpZ2h0ID0gTWF0aC5taW4oTWF0aC5tYXgobmV3V2lkdGggLyByYXRpbywgdGhpcy5uek1pbkhlaWdodCksIG1heEhlaWdodCk7XG4gICAgICAgIGlmIChuZXdIZWlnaHQgPj0gbWF4SGVpZ2h0IHx8IG5ld0hlaWdodCA8PSB0aGlzLm56TWluSGVpZ2h0KSB7XG4gICAgICAgICAgbmV3V2lkdGggPSBNYXRoLm1pbihNYXRoLm1heChuZXdIZWlnaHQgKiByYXRpbywgbWluV2lkdGgpLCBtYXhXaWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0hlaWdodCA9IE1hdGgubWluKE1hdGgubWF4KGhlaWdodCwgdGhpcy5uek1pbkhlaWdodCksIG1heEhlaWdodCk7XG4gICAgICAgIG5ld1dpZHRoID0gTWF0aC5taW4oTWF0aC5tYXgobmV3SGVpZ2h0ICogcmF0aW8sIG1pbldpZHRoKSwgbWF4V2lkdGgpO1xuICAgICAgICBpZiAobmV3V2lkdGggPj0gbWF4V2lkdGggfHwgbmV3V2lkdGggPD0gbWluV2lkdGgpIHtcbiAgICAgICAgICBuZXdIZWlnaHQgPSBNYXRoLm1pbihNYXRoLm1heChuZXdXaWR0aCAvIHJhdGlvLCB0aGlzLm56TWluSGVpZ2h0KSwgbWF4SGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdXaWR0aCA9IE1hdGgubWluKE1hdGgubWF4KHdpZHRoLCBtaW5XaWR0aCksIG1heFdpZHRoKTtcbiAgICAgIG5ld0hlaWdodCA9IE1hdGgubWluKE1hdGgubWF4KGhlaWdodCwgdGhpcy5uek1pbkhlaWdodCksIG1heEhlaWdodCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubnpHcmlkQ29sdW1uQ291bnQgIT09IC0xKSB7XG4gICAgICBjb2wgPSBNYXRoLnJvdW5kKG5ld1dpZHRoIC8gc3BhbldpZHRoKTtcbiAgICAgIG5ld1dpZHRoID0gY29sICogc3BhbldpZHRoO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBjb2wsXG4gICAgICB3aWR0aDogbmV3V2lkdGgsXG4gICAgICBoZWlnaHQ6IG5ld0hlaWdodFxuICAgIH07XG4gIH1cblxuICBzZXRDdXJzb3IoKTogdm9pZCB7XG4gICAgc3dpdGNoICh0aGlzLmN1cnJlbnRIYW5kbGVFdmVudCEuZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShkb2N1bWVudC5ib2R5LCAnY3Vyc29yJywgJ2V3LXJlc2l6ZScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGRvY3VtZW50LmJvZHksICdjdXJzb3InLCAnbnMtcmVzaXplJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wTGVmdCc6XG4gICAgICBjYXNlICdib3R0b21SaWdodCc6XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZG9jdW1lbnQuYm9keSwgJ2N1cnNvcicsICdud3NlLXJlc2l6ZScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcFJpZ2h0JzpcbiAgICAgIGNhc2UgJ2JvdHRvbUxlZnQnOlxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGRvY3VtZW50LmJvZHksICdjdXJzb3InLCAnbmVzdy1yZXNpemUnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZG9jdW1lbnQuYm9keSwgJ3VzZXItc2VsZWN0JywgJ25vbmUnKTtcbiAgfVxuXG4gIHJlc2l6ZShldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbFJlY3QgPSB0aGlzLmVsUmVjdDtcbiAgICBjb25zdCByZXNpemVFdmVudCA9IGdldEV2ZW50V2l0aFBvaW50KGV2ZW50KTtcbiAgICBjb25zdCBoYW5kbGVFdmVudCA9IGdldEV2ZW50V2l0aFBvaW50KHRoaXMuY3VycmVudEhhbmRsZUV2ZW50IS5tb3VzZUV2ZW50KTtcbiAgICBsZXQgd2lkdGggPSBlbFJlY3Qud2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IGVsUmVjdC5oZWlnaHQ7XG4gICAgY29uc3QgcmF0aW8gPSB0aGlzLm56TG9ja0FzcGVjdFJhdGlvID8gd2lkdGggLyBoZWlnaHQgOiAtMTtcbiAgICBzd2l0Y2ggKHRoaXMuY3VycmVudEhhbmRsZUV2ZW50IS5kaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgJ2JvdHRvbVJpZ2h0JzpcbiAgICAgICAgd2lkdGggPSByZXNpemVFdmVudC5jbGllbnRYIC0gZWxSZWN0LmxlZnQ7XG4gICAgICAgIGhlaWdodCA9IHJlc2l6ZUV2ZW50LmNsaWVudFkgLSBlbFJlY3QudG9wO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbUxlZnQnOlxuICAgICAgICB3aWR0aCA9IGVsUmVjdC53aWR0aCArIGhhbmRsZUV2ZW50LmNsaWVudFggLSByZXNpemVFdmVudC5jbGllbnRYO1xuICAgICAgICBoZWlnaHQgPSByZXNpemVFdmVudC5jbGllbnRZIC0gZWxSZWN0LnRvcDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b3BSaWdodCc6XG4gICAgICAgIHdpZHRoID0gcmVzaXplRXZlbnQuY2xpZW50WCAtIGVsUmVjdC5sZWZ0O1xuICAgICAgICBoZWlnaHQgPSBlbFJlY3QuaGVpZ2h0ICsgaGFuZGxlRXZlbnQuY2xpZW50WSAtIHJlc2l6ZUV2ZW50LmNsaWVudFk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wTGVmdCc6XG4gICAgICAgIHdpZHRoID0gZWxSZWN0LndpZHRoICsgaGFuZGxlRXZlbnQuY2xpZW50WCAtIHJlc2l6ZUV2ZW50LmNsaWVudFg7XG4gICAgICAgIGhlaWdodCA9IGVsUmVjdC5oZWlnaHQgKyBoYW5kbGVFdmVudC5jbGllbnRZIC0gcmVzaXplRXZlbnQuY2xpZW50WTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICBoZWlnaHQgPSBlbFJlY3QuaGVpZ2h0ICsgaGFuZGxlRXZlbnQuY2xpZW50WSAtIHJlc2l6ZUV2ZW50LmNsaWVudFk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICB3aWR0aCA9IHJlc2l6ZUV2ZW50LmNsaWVudFggLSBlbFJlY3QubGVmdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICBoZWlnaHQgPSByZXNpemVFdmVudC5jbGllbnRZIC0gZWxSZWN0LnRvcDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgd2lkdGggPSBlbFJlY3Qud2lkdGggKyBoYW5kbGVFdmVudC5jbGllbnRYIC0gcmVzaXplRXZlbnQuY2xpZW50WDtcbiAgICB9XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuY2FsY1NpemUod2lkdGgsIGhlaWdodCwgcmF0aW8pO1xuICAgIHRoaXMuc2l6ZUNhY2hlID0geyAuLi5zaXplIH07XG4gICAgLy8gUmUtZW50ZXIgdGhlIEFuZ3VsYXIgem9uZSBhbmQgcnVuIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIG9ubHkgaWYgdGhlcmUncmUgYW55IGBuelJlc2l6ZWAgbGlzdGVuZXJzLFxuICAgIC8vIGUuZy46IGA8ZGl2IG56LXJlc2l6YWJsZSAobnpSZXNpemUpPVwiLi4uXCI+PC9kaXY+YC5cbiAgICBpZiAodGhpcy5uelJlc2l6ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICB0aGlzLm56UmVzaXplLmVtaXQoe1xuICAgICAgICAgIC4uLnNpemUsXG4gICAgICAgICAgbW91c2VFdmVudDogZXZlbnRcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMubnpQcmV2aWV3KSB7XG4gICAgICB0aGlzLnByZXZpZXdSZXNpemUoc2l6ZSk7XG4gICAgfVxuICB9XG5cbiAgZW5kUmVzaXplKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZG9jdW1lbnQuYm9keSwgJ2N1cnNvcicsICcnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGRvY3VtZW50LmJvZHksICd1c2VyLXNlbGVjdCcsICcnKTtcbiAgICB0aGlzLnJlbW92ZUdob3N0RWxlbWVudCgpO1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLnNpemVDYWNoZVxuICAgICAgPyB7IC4uLnRoaXMuc2l6ZUNhY2hlIH1cbiAgICAgIDoge1xuICAgICAgICAgIHdpZHRoOiB0aGlzLmVsUmVjdC53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMuZWxSZWN0LmhlaWdodFxuICAgICAgICB9O1xuICAgIC8vIFJlLWVudGVyIHRoZSBBbmd1bGFyIHpvbmUgYW5kIHJ1biB0aGUgY2hhbmdlIGRldGVjdGlvbiBvbmx5IGlmIHRoZXJlJ3JlIGFueSBgbnpSZXNpemVFbmRgIGxpc3RlbmVycyxcbiAgICAvLyBlLmcuOiBgPGRpdiBuei1yZXNpemFibGUgKG56UmVzaXplRW5kKT1cIi4uLlwiPjwvZGl2PmAuXG4gICAgaWYgKHRoaXMubnpSZXNpemVFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5uelJlc2l6ZUVuZC5lbWl0KHtcbiAgICAgICAgICAuLi5zaXplLFxuICAgICAgICAgIG1vdXNlRXZlbnQ6IGV2ZW50XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuc2l6ZUNhY2hlID0gbnVsbDtcbiAgICB0aGlzLmN1cnJlbnRIYW5kbGVFdmVudCA9IG51bGw7XG4gIH1cblxuICBwcmV2aWV3UmVzaXplKHsgd2lkdGgsIGhlaWdodCB9OiBOelJlc2l6ZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5jcmVhdGVHaG9zdEVsZW1lbnQoKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ2hvc3RFbGVtZW50LCAnd2lkdGgnLCBgJHt3aWR0aH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5naG9zdEVsZW1lbnQsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcbiAgfVxuXG4gIGNyZWF0ZUdob3N0RWxlbWVudCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZ2hvc3RFbGVtZW50KSB7XG4gICAgICB0aGlzLmdob3N0RWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmdob3N0RWxlbWVudCwgJ2NsYXNzJywgJ256LXJlc2l6YWJsZS1wcmV2aWV3Jyk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbCwgdGhpcy5naG9zdEVsZW1lbnQpO1xuICB9XG5cbiAgcmVtb3ZlR2hvc3RFbGVtZW50KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmdob3N0RWxlbWVudCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmVsLCB0aGlzLmdob3N0RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5zZXRQb3NpdGlvbigpO1xuXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgZnJvbUV2ZW50KHRoaXMuZWwsICdtb3VzZWVudGVyJylcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLm56UmVzaXphYmxlU2VydmljZS5tb3VzZUVudGVyZWQkLm5leHQodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICBmcm9tRXZlbnQodGhpcy5lbCwgJ21vdXNlbGVhdmUnKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubnpSZXNpemFibGVTZXJ2aWNlLm1vdXNlRW50ZXJlZCQubmV4dChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5naG9zdEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuc2l6ZUNhY2hlID0gbnVsbDtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==