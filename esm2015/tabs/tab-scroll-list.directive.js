/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, ElementRef, EventEmitter, NgZone, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
const MIN_SWIPE_DISTANCE = 0.1;
const STOP_SWIPE_DISTANCE = 0.01;
const REFRESH_INTERVAL = 20;
const SPEED_OFF_MULTIPLE = Math.pow(0.995, REFRESH_INTERVAL);
export class NzTabScrollListDirective {
    constructor(ngZone, elementRef) {
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.lastWheelDirection = null;
        this.lastWheelTimestamp = 0;
        this.lastTimestamp = 0;
        this.lastTimeDiff = 0;
        this.lastMixedWheel = 0;
        this.lastWheelPrevent = false;
        this.touchPosition = null;
        this.lastOffset = null;
        this.motion = -1;
        this.unsubscribe = () => void 0;
        this.offsetChange = new EventEmitter();
        this.tabScroll = new EventEmitter();
        this.onTouchEnd = (e) => {
            if (!this.touchPosition) {
                return;
            }
            const lastOffset = this.lastOffset;
            const lastTimeDiff = this.lastTimeDiff;
            this.lastOffset = this.touchPosition = null;
            if (lastOffset) {
                const distanceX = lastOffset.x / lastTimeDiff;
                const distanceY = lastOffset.y / lastTimeDiff;
                const absX = Math.abs(distanceX);
                const absY = Math.abs(distanceY);
                // Skip swipe if low distance
                if (Math.max(absX, absY) < MIN_SWIPE_DISTANCE) {
                    return;
                }
                let currentX = distanceX;
                let currentY = distanceY;
                this.motion = window.setInterval(() => {
                    if (Math.abs(currentX) < STOP_SWIPE_DISTANCE && Math.abs(currentY) < STOP_SWIPE_DISTANCE) {
                        window.clearInterval(this.motion);
                        return;
                    }
                    currentX *= SPEED_OFF_MULTIPLE;
                    currentY *= SPEED_OFF_MULTIPLE;
                    this.onOffset(currentX * REFRESH_INTERVAL, currentY * REFRESH_INTERVAL, e);
                }, REFRESH_INTERVAL);
            }
        };
        this.onTouchMove = (e) => {
            if (!this.touchPosition) {
                return;
            }
            e.preventDefault();
            const { screenX, screenY } = e.touches[0];
            const offsetX = screenX - this.touchPosition.x;
            const offsetY = screenY - this.touchPosition.y;
            this.onOffset(offsetX, offsetY, e);
            const now = Date.now();
            this.lastTimeDiff = now - this.lastTimestamp;
            this.lastTimestamp = now;
            this.lastOffset = { x: offsetX, y: offsetY };
            this.touchPosition = { x: screenX, y: screenY };
        };
        this.onTouchStart = (e) => {
            const { screenX, screenY } = e.touches[0];
            this.touchPosition = { x: screenX, y: screenY };
            window.clearInterval(this.motion);
        };
        this.onWheel = (e) => {
            const { deltaX, deltaY } = e;
            let mixed;
            const absX = Math.abs(deltaX);
            const absY = Math.abs(deltaY);
            if (absX === absY) {
                mixed = this.lastWheelDirection === 'x' ? deltaX : deltaY;
            }
            else if (absX > absY) {
                mixed = deltaX;
                this.lastWheelDirection = 'x';
            }
            else {
                mixed = deltaY;
                this.lastWheelDirection = 'y';
            }
            // Optimize mac touch scroll
            const now = Date.now();
            const absMixed = Math.abs(mixed);
            if (now - this.lastWheelTimestamp > 100 || absMixed - this.lastMixedWheel > 10) {
                this.lastWheelPrevent = false;
            }
            this.onOffset(-mixed, -mixed, e);
            if (e.defaultPrevented || this.lastWheelPrevent) {
                this.lastWheelPrevent = true;
            }
            this.lastWheelTimestamp = now;
            this.lastMixedWheel = absMixed;
        };
    }
    ngOnInit() {
        this.unsubscribe = this.ngZone.runOutsideAngular(() => {
            const el = this.elementRef.nativeElement;
            const wheel$ = fromEvent(el, 'wheel');
            const touchstart$ = fromEvent(el, 'touchstart');
            const touchmove$ = fromEvent(el, 'touchmove');
            const touchend$ = fromEvent(el, 'touchend');
            const subscription = new Subscription();
            subscription.add(this.subscribeWrap('wheel', wheel$, this.onWheel));
            subscription.add(this.subscribeWrap('touchstart', touchstart$, this.onTouchStart));
            subscription.add(this.subscribeWrap('touchmove', touchmove$, this.onTouchMove));
            subscription.add(this.subscribeWrap('touchend', touchend$, this.onTouchEnd));
            return () => {
                subscription.unsubscribe();
            };
        });
    }
    subscribeWrap(type, observable, handler) {
        return observable.subscribe(event => {
            this.tabScroll.emit({
                type,
                event
            });
            if (!event.defaultPrevented) {
                handler(event);
            }
        });
    }
    onOffset(x, y, event) {
        this.ngZone.run(() => {
            this.offsetChange.emit({
                x,
                y,
                event
            });
        });
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
}
NzTabScrollListDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nzTabScrollList]'
            },] }
];
NzTabScrollListDirective.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef }
];
NzTabScrollListDirective.propDecorators = {
    offsetChange: [{ type: Output }],
    tabScroll: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLXNjcm9sbC1saXN0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdGFicy90YWItc2Nyb2xsLWxpc3QuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RyxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUkzRCxNQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQztBQUMvQixNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQztBQUNqQyxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUM1QixNQUFNLGtCQUFrQixHQUFHLFNBQUEsS0FBSyxFQUFJLGdCQUFnQixDQUFBLENBQUM7QUFLckQsTUFBTSxPQUFPLHdCQUF3QjtJQWdCbkMsWUFBb0IsTUFBYyxFQUFVLFVBQW1DO1FBQTNELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQWYvRSx1QkFBa0IsR0FBcUIsSUFBSSxDQUFDO1FBQzVDLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUN2QixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsa0JBQWEsR0FBaUMsSUFBSSxDQUFDO1FBQ25ELGVBQVUsR0FBaUMsSUFBSSxDQUFDO1FBQ2hELFdBQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVaLGdCQUFXLEdBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFcEIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBOEIsQ0FBQztRQUM5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VCxRQUFRLEVBQUUsbUJBQW1CO2FBQzlCOzs7WUFiNkMsTUFBTTtZQUFoQyxVQUFVOzs7MkJBMkIzQixNQUFNO3dCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgTmdab25lLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE56VGFiU2Nyb2xsRXZlbnQsIE56VGFiU2Nyb2xsRXZlbnRIYW5kbGVyRnVuLCBOelRhYlNjcm9sbExpc3RPZmZzZXQsIE56VGFiU2Nyb2xsTGlzdE9mZnNldEV2ZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuY29uc3QgTUlOX1NXSVBFX0RJU1RBTkNFID0gMC4xO1xuY29uc3QgU1RPUF9TV0lQRV9ESVNUQU5DRSA9IDAuMDE7XG5jb25zdCBSRUZSRVNIX0lOVEVSVkFMID0gMjA7XG5jb25zdCBTUEVFRF9PRkZfTVVMVElQTEUgPSAwLjk5NSAqKiBSRUZSRVNIX0lOVEVSVkFMO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnpUYWJTY3JvbGxMaXN0XSdcbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJTY3JvbGxMaXN0RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBsYXN0V2hlZWxEaXJlY3Rpb246ICd4JyB8ICd5JyB8IG51bGwgPSBudWxsO1xuICBsYXN0V2hlZWxUaW1lc3RhbXAgPSAwO1xuICBsYXN0VGltZXN0YW1wID0gMDtcbiAgbGFzdFRpbWVEaWZmID0gMDtcbiAgbGFzdE1peGVkV2hlZWwgPSAwO1xuICBsYXN0V2hlZWxQcmV2ZW50ID0gZmFsc2U7XG4gIHRvdWNoUG9zaXRpb246IE56VGFiU2Nyb2xsTGlzdE9mZnNldCB8IG51bGwgPSBudWxsO1xuICBsYXN0T2Zmc2V0OiBOelRhYlNjcm9sbExpc3RPZmZzZXQgfCBudWxsID0gbnVsbDtcbiAgbW90aW9uID0gLTE7XG5cbiAgdW5zdWJzY3JpYmU6ICgpID0+IHZvaWQgPSAoKSA9PiB2b2lkIDA7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9mZnNldENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpUYWJTY3JvbGxMaXN0T2Zmc2V0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSB0YWJTY3JvbGwgPSBuZXcgRXZlbnRFbWl0dGVyPE56VGFiU2Nyb2xsRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlID0gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3QgZWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgY29uc3Qgd2hlZWwkID0gZnJvbUV2ZW50PFdoZWVsRXZlbnQ+KGVsLCAnd2hlZWwnKTtcbiAgICAgIGNvbnN0IHRvdWNoc3RhcnQkID0gZnJvbUV2ZW50PFRvdWNoRXZlbnQ+KGVsLCAndG91Y2hzdGFydCcpO1xuICAgICAgY29uc3QgdG91Y2htb3ZlJCA9IGZyb21FdmVudDxUb3VjaEV2ZW50PihlbCwgJ3RvdWNobW92ZScpO1xuICAgICAgY29uc3QgdG91Y2hlbmQkID0gZnJvbUV2ZW50PFRvdWNoRXZlbnQ+KGVsLCAndG91Y2hlbmQnKTtcblxuICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnN1YnNjcmliZVdyYXAoJ3doZWVsJywgd2hlZWwkLCB0aGlzLm9uV2hlZWwpKTtcbiAgICAgIHN1YnNjcmlwdGlvbi5hZGQodGhpcy5zdWJzY3JpYmVXcmFwKCd0b3VjaHN0YXJ0JywgdG91Y2hzdGFydCQsIHRoaXMub25Ub3VjaFN0YXJ0KSk7XG4gICAgICBzdWJzY3JpcHRpb24uYWRkKHRoaXMuc3Vic2NyaWJlV3JhcCgndG91Y2htb3ZlJywgdG91Y2htb3ZlJCwgdGhpcy5vblRvdWNoTW92ZSkpO1xuICAgICAgc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnN1YnNjcmliZVdyYXAoJ3RvdWNoZW5kJywgdG91Y2hlbmQkLCB0aGlzLm9uVG91Y2hFbmQpKTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgc3Vic2NyaWJlV3JhcDxUIGV4dGVuZHMgTnpUYWJTY3JvbGxFdmVudFsnZXZlbnQnXT4oXG4gICAgdHlwZTogTnpUYWJTY3JvbGxFdmVudFsndHlwZSddLFxuICAgIG9ic2VydmFibGU6IE9ic2VydmFibGU8VD4sXG4gICAgaGFuZGxlcjogTnpUYWJTY3JvbGxFdmVudEhhbmRsZXJGdW48VD5cbiAgKTogU3Vic2NyaXB0aW9uIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgdGhpcy50YWJTY3JvbGwuZW1pdCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGV2ZW50XG4gICAgICB9IGFzIE56VGFiU2Nyb2xsRXZlbnQpO1xuICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIGhhbmRsZXIoZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25Ub3VjaEVuZCA9IChlOiBUb3VjaEV2ZW50KTogdm9pZCA9PiB7XG4gICAgaWYgKCF0aGlzLnRvdWNoUG9zaXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbGFzdE9mZnNldCA9IHRoaXMubGFzdE9mZnNldDtcbiAgICBjb25zdCBsYXN0VGltZURpZmYgPSB0aGlzLmxhc3RUaW1lRGlmZjtcblxuICAgIHRoaXMubGFzdE9mZnNldCA9IHRoaXMudG91Y2hQb3NpdGlvbiA9IG51bGw7XG5cbiAgICBpZiAobGFzdE9mZnNldCkge1xuICAgICAgY29uc3QgZGlzdGFuY2VYID0gbGFzdE9mZnNldC54IC8gbGFzdFRpbWVEaWZmO1xuICAgICAgY29uc3QgZGlzdGFuY2VZID0gbGFzdE9mZnNldC55IC8gbGFzdFRpbWVEaWZmO1xuICAgICAgY29uc3QgYWJzWCA9IE1hdGguYWJzKGRpc3RhbmNlWCk7XG4gICAgICBjb25zdCBhYnNZID0gTWF0aC5hYnMoZGlzdGFuY2VZKTtcblxuICAgICAgLy8gU2tpcCBzd2lwZSBpZiBsb3cgZGlzdGFuY2VcbiAgICAgIGlmIChNYXRoLm1heChhYnNYLCBhYnNZKSA8IE1JTl9TV0lQRV9ESVNUQU5DRSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBjdXJyZW50WCA9IGRpc3RhbmNlWDtcbiAgICAgIGxldCBjdXJyZW50WSA9IGRpc3RhbmNlWTtcblxuICAgICAgdGhpcy5tb3Rpb24gPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAoTWF0aC5hYnMoY3VycmVudFgpIDwgU1RPUF9TV0lQRV9ESVNUQU5DRSAmJiBNYXRoLmFicyhjdXJyZW50WSkgPCBTVE9QX1NXSVBFX0RJU1RBTkNFKSB7XG4gICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5tb3Rpb24pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRYICo9IFNQRUVEX09GRl9NVUxUSVBMRTtcbiAgICAgICAgY3VycmVudFkgKj0gU1BFRURfT0ZGX01VTFRJUExFO1xuICAgICAgICB0aGlzLm9uT2Zmc2V0KGN1cnJlbnRYICogUkVGUkVTSF9JTlRFUlZBTCwgY3VycmVudFkgKiBSRUZSRVNIX0lOVEVSVkFMLCBlKTtcbiAgICAgIH0sIFJFRlJFU0hfSU5URVJWQUwpO1xuICAgIH1cbiAgfTtcblxuICBvblRvdWNoTW92ZSA9IChlOiBUb3VjaEV2ZW50KTogdm9pZCA9PiB7XG4gICAgaWYgKCF0aGlzLnRvdWNoUG9zaXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgeyBzY3JlZW5YLCBzY3JlZW5ZIH0gPSBlLnRvdWNoZXNbMF07XG5cbiAgICBjb25zdCBvZmZzZXRYID0gc2NyZWVuWCAtIHRoaXMudG91Y2hQb3NpdGlvbi54O1xuICAgIGNvbnN0IG9mZnNldFkgPSBzY3JlZW5ZIC0gdGhpcy50b3VjaFBvc2l0aW9uLnk7XG4gICAgdGhpcy5vbk9mZnNldChvZmZzZXRYLCBvZmZzZXRZLCBlKTtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXG4gICAgdGhpcy5sYXN0VGltZURpZmYgPSBub3cgLSB0aGlzLmxhc3RUaW1lc3RhbXA7XG4gICAgdGhpcy5sYXN0VGltZXN0YW1wID0gbm93O1xuICAgIHRoaXMubGFzdE9mZnNldCA9IHsgeDogb2Zmc2V0WCwgeTogb2Zmc2V0WSB9O1xuICAgIHRoaXMudG91Y2hQb3NpdGlvbiA9IHsgeDogc2NyZWVuWCwgeTogc2NyZWVuWSB9O1xuICB9O1xuXG4gIG9uVG91Y2hTdGFydCA9IChlOiBUb3VjaEV2ZW50KTogdm9pZCA9PiB7XG4gICAgY29uc3QgeyBzY3JlZW5YLCBzY3JlZW5ZIH0gPSBlLnRvdWNoZXNbMF07XG4gICAgdGhpcy50b3VjaFBvc2l0aW9uID0geyB4OiBzY3JlZW5YLCB5OiBzY3JlZW5ZIH07XG4gICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5tb3Rpb24pO1xuICB9O1xuXG4gIG9uV2hlZWwgPSAoZTogV2hlZWxFdmVudCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHsgZGVsdGFYLCBkZWx0YVkgfSA9IGU7XG4gICAgbGV0IG1peGVkOiBudW1iZXI7XG4gICAgY29uc3QgYWJzWCA9IE1hdGguYWJzKGRlbHRhWCk7XG4gICAgY29uc3QgYWJzWSA9IE1hdGguYWJzKGRlbHRhWSk7XG5cbiAgICBpZiAoYWJzWCA9PT0gYWJzWSkge1xuICAgICAgbWl4ZWQgPSB0aGlzLmxhc3RXaGVlbERpcmVjdGlvbiA9PT0gJ3gnID8gZGVsdGFYIDogZGVsdGFZO1xuICAgIH0gZWxzZSBpZiAoYWJzWCA+IGFic1kpIHtcbiAgICAgIG1peGVkID0gZGVsdGFYO1xuICAgICAgdGhpcy5sYXN0V2hlZWxEaXJlY3Rpb24gPSAneCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1peGVkID0gZGVsdGFZO1xuICAgICAgdGhpcy5sYXN0V2hlZWxEaXJlY3Rpb24gPSAneSc7XG4gICAgfVxuXG4gICAgLy8gT3B0aW1pemUgbWFjIHRvdWNoIHNjcm9sbFxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgYWJzTWl4ZWQgPSBNYXRoLmFicyhtaXhlZCk7XG5cbiAgICBpZiAobm93IC0gdGhpcy5sYXN0V2hlZWxUaW1lc3RhbXAgPiAxMDAgfHwgYWJzTWl4ZWQgLSB0aGlzLmxhc3RNaXhlZFdoZWVsID4gMTApIHtcbiAgICAgIHRoaXMubGFzdFdoZWVsUHJldmVudCA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLm9uT2Zmc2V0KC1taXhlZCwgLW1peGVkLCBlKTtcbiAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkIHx8IHRoaXMubGFzdFdoZWVsUHJldmVudCkge1xuICAgICAgdGhpcy5sYXN0V2hlZWxQcmV2ZW50ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmxhc3RXaGVlbFRpbWVzdGFtcCA9IG5vdztcbiAgICB0aGlzLmxhc3RNaXhlZFdoZWVsID0gYWJzTWl4ZWQ7XG4gIH07XG5cbiAgb25PZmZzZXQoeDogbnVtYmVyLCB5OiBudW1iZXIsIGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLm9mZnNldENoYW5nZS5lbWl0KHtcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgZXZlbnRcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=