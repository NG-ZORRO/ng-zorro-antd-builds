/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Inject, Input, Optional } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import * as i0 from "@angular/core";
export class NzTabsInkBarDirective {
    constructor(elementRef, ngZone, animationMode) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.animationMode = animationMode;
        this.position = 'horizontal';
        this.animated = true;
    }
    get _animated() {
        return this.animationMode !== 'NoopAnimations' && this.animated;
    }
    alignToElement(element) {
        this.ngZone.runOutsideAngular(() => {
            reqAnimFrame(() => this.setStyles(element));
        });
    }
    setStyles(element) {
        const inkBar = this.elementRef.nativeElement;
        if (this.position === 'horizontal') {
            inkBar.style.top = '';
            inkBar.style.height = '';
            inkBar.style.left = this.getLeftPosition(element);
            inkBar.style.width = this.getElementWidth(element);
        }
        else {
            inkBar.style.left = '';
            inkBar.style.width = '';
            inkBar.style.top = this.getTopPosition(element);
            inkBar.style.height = this.getElementHeight(element);
        }
    }
    getLeftPosition(element) {
        return element ? `${element.offsetLeft || 0}px` : '0';
    }
    getElementWidth(element) {
        return element ? `${element.offsetWidth || 0}px` : '0';
    }
    getTopPosition(element) {
        return element ? `${element.offsetTop || 0}px` : '0';
    }
    getElementHeight(element) {
        return element ? `${element.offsetHeight || 0}px` : '0';
    }
}
NzTabsInkBarDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabsInkBarDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzTabsInkBarDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTabsInkBarDirective, selector: "nz-tabs-ink-bar, [nz-tabs-ink-bar]", inputs: { position: "position", animated: "animated" }, host: { properties: { "class.ant-tabs-ink-bar-animated": "_animated" }, classAttribute: "ant-tabs-ink-bar" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabsInkBarDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-tabs-ink-bar, [nz-tabs-ink-bar]',
                    host: {
                        class: 'ant-tabs-ink-bar',
                        '[class.ant-tabs-ink-bar-animated]': '_animated'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; }, propDecorators: { position: [{
                type: Input
            }], animated: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy1pbmstYmFyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdGFicy90YWJzLWluay1iYXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQWMsTUFBTSxFQUFFLEtBQUssRUFBVSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFN0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQVczRCxNQUFNLE9BQU8scUJBQXFCO0lBUWhDLFlBQ1UsVUFBbUMsRUFDbkMsTUFBYyxFQUM0QixhQUFzQjtRQUZoRSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQzRCLGtCQUFhLEdBQWIsYUFBYSxDQUFTO1FBVmpFLGFBQVEsR0FBc0IsWUFBWSxDQUFDO1FBQzNDLGFBQVEsR0FBRyxJQUFJLENBQUM7SUFVdEIsQ0FBQztJQVJKLElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsS0FBSyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2xFLENBQUM7SUFRRCxjQUFjLENBQUMsT0FBb0I7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDakMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxTQUFTLENBQUMsT0FBb0I7UUFDNUIsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBRTFELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUU7WUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDcEQ7YUFBTTtZQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUN2QixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDO0lBRUQsZUFBZSxDQUFDLE9BQW9CO1FBQ2xDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN4RCxDQUFDO0lBRUQsZUFBZSxDQUFDLE9BQW9CO1FBQ2xDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN6RCxDQUFDO0lBRUQsY0FBYyxDQUFDLE9BQW9CO1FBQ2pDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN2RCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsT0FBb0I7UUFDbkMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzFELENBQUM7O2tIQWxEVSxxQkFBcUIsa0VBV1YscUJBQXFCO3NHQVhoQyxxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFQakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0NBQW9DO29CQUM5QyxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGtCQUFrQjt3QkFDekIsbUNBQW1DLEVBQUUsV0FBVztxQkFDakQ7aUJBQ0Y7OzBCQVlJLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMscUJBQXFCOzRDQVZsQyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdCwgSW5wdXQsIE5nWm9uZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFOSU1BVElPTl9NT0RVTEVfVFlQRSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7IHJlcUFuaW1GcmFtZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9wb2x5ZmlsbCc7XG5cbmltcG9ydCB7IE56VGFiUG9zaXRpb25Nb2RlIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbnotdGFicy1pbmstYmFyLCBbbnotdGFicy1pbmstYmFyXScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC10YWJzLWluay1iYXInLFxuICAgICdbY2xhc3MuYW50LXRhYnMtaW5rLWJhci1hbmltYXRlZF0nOiAnX2FuaW1hdGVkJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VGFic0lua0JhckRpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIHBvc2l0aW9uOiBOelRhYlBvc2l0aW9uTW9kZSA9ICdob3Jpem9udGFsJztcbiAgQElucHV0KCkgYW5pbWF0ZWQgPSB0cnVlO1xuXG4gIGdldCBfYW5pbWF0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uTW9kZSAhPT0gJ05vb3BBbmltYXRpb25zJyAmJiB0aGlzLmFuaW1hdGVkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBwdWJsaWMgYW5pbWF0aW9uTW9kZT86IHN0cmluZ1xuICApIHt9XG5cbiAgYWxpZ25Ub0VsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXFBbmltRnJhbWUoKCkgPT4gdGhpcy5zZXRTdHlsZXMoZWxlbWVudCkpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0U3R5bGVzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgaW5rQmFyOiBIVE1MRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgaW5rQmFyLnN0eWxlLnRvcCA9ICcnO1xuICAgICAgaW5rQmFyLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgaW5rQmFyLnN0eWxlLmxlZnQgPSB0aGlzLmdldExlZnRQb3NpdGlvbihlbGVtZW50KTtcbiAgICAgIGlua0Jhci5zdHlsZS53aWR0aCA9IHRoaXMuZ2V0RWxlbWVudFdpZHRoKGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmtCYXIuc3R5bGUubGVmdCA9ICcnO1xuICAgICAgaW5rQmFyLnN0eWxlLndpZHRoID0gJyc7XG4gICAgICBpbmtCYXIuc3R5bGUudG9wID0gdGhpcy5nZXRUb3BQb3NpdGlvbihlbGVtZW50KTtcbiAgICAgIGlua0Jhci5zdHlsZS5oZWlnaHQgPSB0aGlzLmdldEVsZW1lbnRIZWlnaHQoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TGVmdFBvc2l0aW9uKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgICByZXR1cm4gZWxlbWVudCA/IGAke2VsZW1lbnQub2Zmc2V0TGVmdCB8fCAwfXB4YCA6ICcwJztcbiAgfVxuXG4gIGdldEVsZW1lbnRXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGVsZW1lbnQgPyBgJHtlbGVtZW50Lm9mZnNldFdpZHRoIHx8IDB9cHhgIDogJzAnO1xuICB9XG5cbiAgZ2V0VG9wUG9zaXRpb24oZWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiBlbGVtZW50ID8gYCR7ZWxlbWVudC5vZmZzZXRUb3AgfHwgMH1weGAgOiAnMCc7XG4gIH1cblxuICBnZXRFbGVtZW50SGVpZ2h0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgICByZXR1cm4gZWxlbWVudCA/IGAke2VsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IDB9cHhgIDogJzAnO1xuICB9XG59XG4iXX0=