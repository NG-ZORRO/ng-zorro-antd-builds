import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, ElementRef, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { getPlacementName } from './overlay-position';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "ng-zorro-antd/core/services";
export class NzConnectedOverlayDirective {
    constructor(cdkConnectedOverlay, nzDestroyService) {
        this.cdkConnectedOverlay = cdkConnectedOverlay;
        this.nzDestroyService = nzDestroyService;
        this.nzArrowPointAtCenter = false;
        this.cdkConnectedOverlay.backdropClass = 'nz-overlay-transparent-backdrop';
        this.cdkConnectedOverlay.positionChange
            .pipe(takeUntil(this.nzDestroyService))
            .subscribe((position) => {
            if (this.nzArrowPointAtCenter) {
                this.updateArrowPosition(position);
            }
        });
    }
    updateArrowPosition(position) {
        const originRect = this.getOriginRect();
        const placement = getPlacementName(position);
        let offsetX = 0;
        let offsetY = 0;
        if (placement === 'topLeft' || placement === 'bottomLeft') {
            offsetX = originRect.width / 2 - 14;
        }
        else if (placement === 'topRight' || placement === 'bottomRight') {
            offsetX = -(originRect.width / 2 - 14);
        }
        else if (placement === 'leftTop' || placement === 'rightTop') {
            offsetY = originRect.height / 2 - 10;
        }
        else if (placement === 'leftBottom' || placement === 'rightBottom') {
            offsetY = -(originRect.height / 2 - 10);
        }
        if (this.cdkConnectedOverlay.offsetX !== offsetX || this.cdkConnectedOverlay.offsetY !== offsetY) {
            this.cdkConnectedOverlay.offsetY = offsetY;
            this.cdkConnectedOverlay.offsetX = offsetX;
            this.cdkConnectedOverlay.overlayRef.updatePosition();
        }
    }
    getFlexibleConnectedPositionStrategyOrigin() {
        if (this.cdkConnectedOverlay.origin instanceof CdkOverlayOrigin) {
            return this.cdkConnectedOverlay.origin.elementRef;
        }
        else {
            return this.cdkConnectedOverlay.origin;
        }
    }
    getOriginRect() {
        const origin = this.getFlexibleConnectedPositionStrategyOrigin();
        if (origin instanceof ElementRef) {
            return origin.nativeElement.getBoundingClientRect();
        }
        // Check for Element so SVG elements are also supported.
        if (origin instanceof Element) {
            return origin.getBoundingClientRect();
        }
        const width = origin.width || 0;
        const height = origin.height || 0;
        // If the origin is a point, return a client rect as if it was a 0x0 element at the point.
        return {
            top: origin.y,
            bottom: origin.y + height,
            left: origin.x,
            right: origin.x + width,
            height,
            width
        };
    }
}
NzConnectedOverlayDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzConnectedOverlayDirective, deps: [{ token: i1.CdkConnectedOverlay }, { token: i2.NzDestroyService }], target: i0.ɵɵFactoryTarget.Directive });
NzConnectedOverlayDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzConnectedOverlayDirective, selector: "[cdkConnectedOverlay][nzConnectedOverlay]", inputs: { nzArrowPointAtCenter: "nzArrowPointAtCenter" }, providers: [NzDestroyService], exportAs: ["nzConnectedOverlay"], ngImport: i0 });
__decorate([
    InputBoolean()
], NzConnectedOverlayDirective.prototype, "nzArrowPointAtCenter", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzConnectedOverlayDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cdkConnectedOverlay][nzConnectedOverlay]',
                    exportAs: 'nzConnectedOverlay',
                    providers: [NzDestroyService]
                }]
        }], ctorParameters: function () { return [{ type: i1.CdkConnectedOverlay }, { type: i2.NzDestroyService }]; }, propDecorators: { nzArrowPointAtCenter: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotY29ubmVjdGVkLW92ZXJsYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvcmUvb3ZlcmxheS9uei1jb25uZWN0ZWQtb3ZlcmxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUVMLGdCQUFnQixFQUdqQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7O0FBVXRELE1BQU0sT0FBTywyQkFBMkI7SUFHdEMsWUFDbUIsbUJBQXdDLEVBQ3hDLGdCQUFrQztRQURsQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFKNUIseUJBQW9CLEdBQVksS0FBSyxDQUFDO1FBTTdELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEdBQUcsaUNBQWlDLENBQUM7UUFFM0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWM7YUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUN0QyxTQUFTLENBQUMsQ0FBQyxRQUF3QyxFQUFFLEVBQUU7WUFDdEQsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNwQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLG1CQUFt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LFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2lCQUM5Qjt5SUFFMEIsb0JBQW9CO3NCQUE1QyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2RrQ29ubmVjdGVkT3ZlcmxheSxcbiAgQ2RrT3ZlcmxheU9yaWdpbixcbiAgQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlLFxuICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3lPcmlnaW5cbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOekRlc3Ryb3lTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgZ2V0UGxhY2VtZW50TmFtZSB9IGZyb20gJy4vb3ZlcmxheS1wb3NpdGlvbic7XG5cbi8qKiBFcXVpdmFsZW50IG9mIGBDbGllbnRSZWN0YCB3aXRob3V0IHNvbWUgb2YgdGhlIHByb3BlcnRpZXMgd2UgZG9uJ3QgY2FyZSBhYm91dC4gKi9cbnR5cGUgRGltZW5zaW9ucyA9IE9taXQ8Q2xpZW50UmVjdCwgJ3gnIHwgJ3knIHwgJ3RvSlNPTic+O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2RrQ29ubmVjdGVkT3ZlcmxheV1bbnpDb25uZWN0ZWRPdmVybGF5XScsXG4gIGV4cG9ydEFzOiAnbnpDb25uZWN0ZWRPdmVybGF5JyxcbiAgcHJvdmlkZXJzOiBbTnpEZXN0cm95U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTnpDb25uZWN0ZWRPdmVybGF5RGlyZWN0aXZlIHtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56QXJyb3dQb2ludEF0Q2VudGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBjZGtDb25uZWN0ZWRPdmVybGF5OiBDZGtDb25uZWN0ZWRPdmVybGF5LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbnpEZXN0cm95U2VydmljZTogTnpEZXN0cm95U2VydmljZVxuICApIHtcbiAgICB0aGlzLmNka0Nvbm5lY3RlZE92ZXJsYXkuYmFja2Ryb3BDbGFzcyA9ICduei1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wJztcblxuICAgIHRoaXMuY2RrQ29ubmVjdGVkT3ZlcmxheS5wb3NpdGlvbkNoYW5nZVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubnpEZXN0cm95U2VydmljZSkpXG4gICAgICAuc3Vic2NyaWJlKChwb3NpdGlvbjogQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm56QXJyb3dQb2ludEF0Q2VudGVyKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVBcnJvd1Bvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUFycm93UG9zaXRpb24ocG9zaXRpb246IENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSk6IHZvaWQge1xuICAgIGNvbnN0IG9yaWdpblJlY3QgPSB0aGlzLmdldE9yaWdpblJlY3QoKTtcbiAgICBjb25zdCBwbGFjZW1lbnQgPSBnZXRQbGFjZW1lbnROYW1lKHBvc2l0aW9uKTtcblxuICAgIGxldCBvZmZzZXRYOiBudW1iZXIgfCB1bmRlZmluZWQgPSAwO1xuICAgIGxldCBvZmZzZXRZOiBudW1iZXIgfCB1bmRlZmluZWQgPSAwO1xuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gJ3RvcExlZnQnIHx8IHBsYWNlbWVudCA9PT0gJ2JvdHRvbUxlZnQnKSB7XG4gICAgICBvZmZzZXRYID0gb3JpZ2luUmVjdC53aWR0aCAvIDIgLSAxNDtcbiAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PT0gJ3RvcFJpZ2h0JyB8fCBwbGFjZW1lbnQgPT09ICdib3R0b21SaWdodCcpIHtcbiAgICAgIG9mZnNldFggPSAtKG9yaWdpblJlY3Qud2lkdGggLyAyIC0gMTQpO1xuICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSAnbGVmdFRvcCcgfHwgcGxhY2VtZW50ID09PSAncmlnaHRUb3AnKSB7XG4gICAgICBvZmZzZXRZID0gb3JpZ2luUmVjdC5oZWlnaHQgLyAyIC0gMTA7XG4gICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09ICdsZWZ0Qm90dG9tJyB8fCBwbGFjZW1lbnQgPT09ICdyaWdodEJvdHRvbScpIHtcbiAgICAgIG9mZnNldFkgPSAtKG9yaWdpblJlY3QuaGVpZ2h0IC8gMiAtIDEwKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jZGtDb25uZWN0ZWRPdmVybGF5Lm9mZnNldFggIT09IG9mZnNldFggfHwgdGhpcy5jZGtDb25uZWN0ZWRPdmVybGF5Lm9mZnNldFkgIT09IG9mZnNldFkpIHtcbiAgICAgIHRoaXMuY2RrQ29ubmVjdGVkT3ZlcmxheS5vZmZzZXRZID0gb2Zmc2V0WTtcbiAgICAgIHRoaXMuY2RrQ29ubmVjdGVkT3ZlcmxheS5vZmZzZXRYID0gb2Zmc2V0WDtcbiAgICAgIHRoaXMuY2RrQ29ubmVjdGVkT3ZlcmxheS5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3lPcmlnaW4oKTogRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5T3JpZ2luIHtcbiAgICBpZiAodGhpcy5jZGtDb25uZWN0ZWRPdmVybGF5Lm9yaWdpbiBpbnN0YW5jZW9mIENka092ZXJsYXlPcmlnaW4pIHtcbiAgICAgIHJldHVybiB0aGlzLmNka0Nvbm5lY3RlZE92ZXJsYXkub3JpZ2luLmVsZW1lbnRSZWY7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNka0Nvbm5lY3RlZE92ZXJsYXkub3JpZ2luO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3JpZ2luUmVjdCgpOiBEaW1lbnNpb25zIHtcbiAgICBjb25zdCBvcmlnaW4gPSB0aGlzLmdldEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneU9yaWdpbigpO1xuXG4gICAgaWYgKG9yaWdpbiBpbnN0YW5jZW9mIEVsZW1lbnRSZWYpIHtcbiAgICAgIHJldHVybiBvcmlnaW4ubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgRWxlbWVudCBzbyBTVkcgZWxlbWVudHMgYXJlIGFsc28gc3VwcG9ydGVkLlxuICAgIGlmIChvcmlnaW4gaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICByZXR1cm4gb3JpZ2luLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cblxuICAgIGNvbnN0IHdpZHRoID0gb3JpZ2luLndpZHRoIHx8IDA7XG4gICAgY29uc3QgaGVpZ2h0ID0gb3JpZ2luLmhlaWdodCB8fCAwO1xuXG4gICAgLy8gSWYgdGhlIG9yaWdpbiBpcyBhIHBvaW50LCByZXR1cm4gYSBjbGllbnQgcmVjdCBhcyBpZiBpdCB3YXMgYSAweDAgZWxlbWVudCBhdCB0aGUgcG9pbnQuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogb3JpZ2luLnksXG4gICAgICBib3R0b206IG9yaWdpbi55ICsgaGVpZ2h0LFxuICAgICAgbGVmdDogb3JpZ2luLngsXG4gICAgICByaWdodDogb3JpZ2luLnggKyB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHdpZHRoXG4gICAgfTtcbiAgfVxufVxuIl19