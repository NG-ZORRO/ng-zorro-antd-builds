/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, finalize, map } from 'rxjs/operators';
import { getEventPosition, isTouchEvent } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
function getPagePosition(event) {
    const e = getEventPosition(event);
    return {
        x: e.pageX,
        y: e.pageY
    };
}
/**
 * This module provide a global dragging service to other components.
 */
export class NzDragService {
    constructor(rendererFactory2) {
        this.draggingThreshold = 5;
        this.currentDraggingSequence = null;
        this.currentStartingPoint = null;
        this.handleRegistry = new Set();
        this.renderer = rendererFactory2.createRenderer(null, null);
    }
    requestDraggingSequence(event) {
        if (!this.handleRegistry.size) {
            this.registerDraggingHandler(isTouchEvent(event));
        }
        // Complete last dragging sequence if a new target is dragged.
        if (this.currentDraggingSequence) {
            this.currentDraggingSequence.complete();
        }
        this.currentStartingPoint = getPagePosition(event);
        this.currentDraggingSequence = new Subject();
        return this.currentDraggingSequence.pipe(map((e) => ({
            x: e.pageX - this.currentStartingPoint.x,
            y: e.pageY - this.currentStartingPoint.y
        })), filter((e) => Math.abs(e.x) > this.draggingThreshold || Math.abs(e.y) > this.draggingThreshold), finalize(() => this.teardownDraggingSequence()));
    }
    registerDraggingHandler(isTouch) {
        if (isTouch) {
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'touchmove', (e) => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.next(e.touches[0] || e.changedTouches[0]);
                    }
                })
            });
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'touchend', () => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.complete();
                    }
                })
            });
        }
        else {
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'mousemove', e => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.next(e);
                    }
                })
            });
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'mouseup', () => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.complete();
                    }
                })
            });
        }
    }
    teardownDraggingSequence() {
        this.currentDraggingSequence = null;
    }
}
NzDragService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDragService, deps: [{ token: i0.RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable });
NzDragService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDragService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDragService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.RendererFactory2 }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29yZS9zZXJ2aWNlcy9kcmFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQStCLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQWV6RSxTQUFTLGVBQWUsQ0FBQyxLQUE4QjtJQUNyRCxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxPQUFPO1FBQ0wsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLO1FBQ1YsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLO0tBQ1gsQ0FBQztBQUNKLENBQUM7QUFFRDs7R0FFRztBQUlILE1BQU0sT0FBTyxhQUFhO0lBT3hCLFlBQVksZ0JBQWtDO1FBTnRDLHNCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0Qiw0QkFBdUIsR0FBdUMsSUFBSSxDQUFDO1FBQ25FLHlCQUFvQixHQUFpQixJQUFJLENBQUM7UUFDMUMsbUJBQWMsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO1FBSTlDLElBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsdUJBQXVCLENBQUMsS0FBOEI7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFO1lBQzdCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNuRDtRQUVE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dEMsQ0FBQzs7MEdBdEVVLGFBQWE7OEdBQWIsYUFBYSxjQUZaLE1BQU07MkZBRVAsYUFBYTtrQkFIekIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZmluYWxpemUsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgZ2V0RXZlbnRQb3NpdGlvbiwgaXNUb3VjaEV2ZW50IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbnRlcmZhY2UgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn1cblxudHlwZSBEZWx0YSA9IFBvaW50O1xuXG5pbnRlcmZhY2UgSGFuZGxlckl0ZW0ge1xuICBoYW5kbGVyPyhlOiBFdmVudCk6IHZvaWQ7XG5cbiAgdGVhcmRvd24oKTogdm9pZDtcbn1cblxuZnVuY3Rpb24gZ2V0UGFnZVBvc2l0aW9uKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IFBvaW50IHtcbiAgY29uc3QgZSA9IGdldEV2ZW50UG9zaXRpb24oZXZlbnQpO1xuICByZXR1cm4ge1xuICAgIHg6IGUucGFnZVgsXG4gICAgeTogZS5wYWdlWVxuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGUgYSBnbG9iYWwgZHJhZ2dpbmcgc2VydmljZSB0byBvdGhlciBjb21wb25lbnRzLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOekRyYWdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBkcmFnZ2luZ1RocmVzaG9sZCA9IDU7XG4gIHByaXZhdGUgY3VycmVudERyYWdnaW5nU2VxdWVuY2U6IFN1YmplY3Q8TW91c2VFdmVudCB8IFRvdWNoPiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGN1cnJlbnRTdGFydGluZ1BvaW50OiBQb2ludCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGhhbmRsZVJlZ2lzdHJ5ID0gbmV3IFNldDxIYW5kbGVySXRlbT4oKTtcbiAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyO1xuXG4gIGNvbnN0cnVjdG9yKHJlbmRlcmVyRmFjdG9yeTI6IFJlbmRlcmVyRmFjdG9yeTIpIHtcbiAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXJGYWN0b3J5Mi5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcbiAgfVxuXG4gIHJlcXVlc3REcmFnZ2luZ1NlcXVlbmNlKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IE9ic2VydmFibGU8RGVsdGE+IHtcbiAgICBpZiAoIXRoaXMuaGFuZGxlUmVnaXN0cnkuc2l6ZSkge1xuICAgICAgdGhpcy5yZWdpc3RlckRyYWdnaW5nSGFuZGxlcihpc1RvdWNoRXZlbnQoZXZlbnQpKTtcbiAgICB9XG5cbiAgICAvLyBDb21wbGV0ZSBsYXN0IGRyYWdnaW5nIHNlcXVlbmNlIGlmIGEgbmV3IHRhcmdldCBpcyBkcmFnZ2VkLlxuICAgIGlmICh0aGlzLmN1cnJlbnREcmFnZ2luZ1NlcXVlbmNlKSB7XG4gICAgICB0aGlzLmN1cnJlbnREcmFnZ2luZ1NlcXVlbmNlLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50U3RhcnRpbmdQb2ludCA9IGdldFBhZ2VQb3NpdGlvbihldmVudCk7XG4gICAgdGhpcy5jdXJyZW50RHJhZ2dpbmdTZXF1ZW5jZSA9IG5ldyBTdWJqZWN0PE1vdXNlRXZlbnQgfCBUb3VjaD4oKTtcblxuICAgIHJldHVybiB0aGlzLmN1cnJlbnREcmFnZ2luZ1NlcXVlbmNlLnBpcGUoXG4gICAgICBtYXAoKGU6IE1vdXNlRXZlbnQgfCBUb3VjaCkgPT4gKHtcbiAgICAgICAgeDogZS5wYWdlWCAtIHRoaXMuY3VycmVudFN0YXJ0aW5nUG9pbnQhLngsXG4gICAgICAgIHk6IGUucGFnZVkgLSB0aGlzLmN1cnJlbnRTdGFydGluZ1BvaW50IS55XG4gICAgICB9KSksXG4gICAgICBmaWx0ZXIoKGU6IERlbHRhKSA9PiBNYXRoLmFicyhlLngpID4gdGhpcy5kcmFnZ2luZ1RocmVzaG9sZCB8fCBNYXRoLmFicyhlLnkpID4gdGhpcy5kcmFnZ2luZ1RocmVzaG9sZCksXG4gICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLnRlYXJkb3duRHJhZ2dpbmdTZXF1ZW5jZSgpKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyRHJhZ2dpbmdIYW5kbGVyKGlzVG91Y2g6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgdGhpcy5oYW5kbGVSZWdpc3RyeS5hZGQoe1xuICAgICAgICB0ZWFyZG93bjogdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNobW92ZScsIChlOiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudERyYWdnaW5nU2VxdWVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERyYWdnaW5nU2VxdWVuY2UubmV4dChlLnRvdWNoZXNbMF0gfHwgZS5jaGFuZ2VkVG91Y2hlc1swXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgICB0aGlzLmhhbmRsZVJlZ2lzdHJ5LmFkZCh7XG4gICAgICAgIHRlYXJkb3duOiB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2hlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudERyYWdnaW5nU2VxdWVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERyYWdnaW5nU2VxdWVuY2UuY29tcGxldGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oYW5kbGVSZWdpc3RyeS5hZGQoe1xuICAgICAgICB0ZWFyZG93bjogdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNlbW92ZScsIGUgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnREcmFnZ2luZ1NlcXVlbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREcmFnZ2luZ1NlcXVlbmNlLm5leHQoZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgICB0aGlzLmhhbmRsZVJlZ2lzdHJ5LmFkZCh7XG4gICAgICAgIHRlYXJkb3duOiB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnbW91c2V1cCcsICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50RHJhZ2dpbmdTZXF1ZW5jZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RHJhZ2dpbmdTZXF1ZW5jZS5jb21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdGVhcmRvd25EcmFnZ2luZ1NlcXVlbmNlKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudERyYWdnaW5nU2VxdWVuY2UgPSBudWxsO1xuICB9XG59XG4iXX0=