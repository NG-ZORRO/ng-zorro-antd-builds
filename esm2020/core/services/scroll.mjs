/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import * as i0 from "@angular/core";
function easeInOutCubic(t, b, c, d) {
    const cc = c - b;
    let tt = t / (d / 2);
    if (tt < 1) {
        return (cc / 2) * tt * tt * tt + b;
    }
    else {
        return (cc / 2) * ((tt -= 2) * tt * tt + 2) + b;
    }
}
export class NzScrollService {
    constructor(ngZone, doc) {
        this.ngZone = ngZone;
        this.doc = doc;
    }
    /** Set the position of the scroll bar of `el`. */
    setScrollTop(el, topValue = 0) {
        if (el === window) {
            this.doc.body.scrollTop = topValue;
            this.doc.documentElement.scrollTop = topValue;
        }
        else {
            el.scrollTop = topValue;
        }
    }
    /** Get position of `el` against window. */
    getOffset(el) {
        const ret = {
            top: 0,
            left: 0
        };
        if (!el || !el.getClientRects().length) {
            return ret;
        }
        const rect = el.getBoundingClientRect();
        if (rect.width || rect.height) {
            const doc = el.ownerDocument.documentElement;
            ret.top = rect.top - doc.clientTop;
            ret.left = rect.left - doc.clientLeft;
        }
        else {
            ret.top = rect.top;
            ret.left = rect.left;
        }
        return ret;
    }
    /** Get the position of the scoll bar of `el`. */
    // TODO: remove '| Window' as the fallback already happens here
    getScroll(target, top = true) {
        if (typeof window === 'undefined') {
            return 0;
        }
        const method = top ? 'scrollTop' : 'scrollLeft';
        let result = 0;
        if (this.isWindow(target)) {
            result = target[top ? 'pageYOffset' : 'pageXOffset'];
        }
        else if (target instanceof Document) {
            result = target.documentElement[method];
        }
        else if (target) {
            result = target[method];
        }
        if (target && !this.isWindow(target) && typeof result !== 'number') {
            result = (target.ownerDocument || target).documentElement[method];
        }
        return result;
    }
    isWindow(obj) {
        return obj !== null && obj !== undefined && obj === obj.window;
    }
    /**
     * Scroll `el` to some position with animation.
     *
     * @param containerEl container, `window` by default
     * @param y Scroll to `top`, 0 by default
     */
    scrollTo(containerEl, y = 0, options = {}) {
        const target = containerEl ? containerEl : window;
        const scrollTop = this.getScroll(target);
        const startTime = Date.now();
        const { easing, callback, duration = 450 } = options;
        const frameFunc = () => {
            const timestamp = Date.now();
            const time = timestamp - startTime;
            const nextScrollTop = (easing || easeInOutCubic)(time > duration ? duration : time, scrollTop, y, duration);
            if (this.isWindow(target)) {
                target.scrollTo(window.pageXOffset, nextScrollTop);
            }
            else if (target instanceof HTMLDocument || target.constructor.name === 'HTMLDocument') {
                target.documentElement.scrollTop = nextScrollTop;
            }
            else {
                target.scrollTop = nextScrollTop;
            }
            if (time < duration) {
                reqAnimFrame(frameFunc);
            }
            else if (typeof callback === 'function') {
                // Caretaker note: the `frameFunc` is called within the `<root>` zone, but we have to re-enter
                // the Angular zone when calling custom callback to be backwards-compatible.
                this.ngZone.run(callback);
            }
        };
        // Caretaker note: the `requestAnimationFrame` triggers change detection, but updating a `scrollTop` property or
        // calling `window.scrollTo` doesn't require Angular to run `ApplicationRef.tick()`.
        this.ngZone.runOutsideAngular(() => reqAnimFrame(frameFunc));
    }
}
NzScrollService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzScrollService, deps: [{ token: i0.NgZone }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
NzScrollService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzScrollService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzScrollService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb3JlL3NlcnZpY2VzL3Njcm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQUszRCxTQUFTLGNBQWMsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO0lBQ2hFLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3BDO1NBQU07UUFDTCxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakQ7QUFDSCxDQUFDO0FBY0QsTUFBTSxPQUFPLGVBQWU7SUFHMUIsWUFBb0IsTUFBYyxFQUFvQixHQUFjO1FBQWhELFdBQU0sR0FBTixNQUFNLENBQVE7UUFDaEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDakIsQ0FBQztJQUVELGtEQUFrRDtJQUNsRCxZQUFZLENBQUMsRUFBb0IsRUFBRSxXQUFtQixDQUFDO1FBQ3JELElBQUksRUFBRSxLQUFLLE1BQU0sRUFBRTtZ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QUNoSCxvRkFBb0Y7UUFDcEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs0R0F0R1UsZUFBZSx3Q0FHa0IsUUFBUTtnSEFIekMsZUFBZSxjQUZkLE1BQU07MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQUlzQyxNQUFNOzJCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyByZXFBbmltRnJhbWUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvcG9seWZpbGwnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgRWFzeWluZ0ZuID0gKHQ6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIsIGQ6IG51bWJlcikgPT4gbnVtYmVyO1xuXG5mdW5jdGlvbiBlYXNlSW5PdXRDdWJpYyh0OiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCBjYyA9IGMgLSBiO1xuICBsZXQgdHQgPSB0IC8gKGQgLyAyKTtcbiAgaWYgKHR0IDwgMSkge1xuICAgIHJldHVybiAoY2MgLyAyKSAqIHR0ICogdHQgKiB0dCArIGI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChjYyAvIDIpICogKCh0dCAtPSAyKSAqIHR0ICogdHQgKyAyKSArIGI7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBOelNjcm9sbFRvT3B0aW9ucyB7XG4gIC8qKiBTY3JvbGwgY29udGFpbmVyLCBkZWZhdWx0IGFzIHdpbmRvdyAqL1xuICBlYXNpbmc/OiBFYXN5aW5nRm47XG4gIC8qKiBTY3JvbGwgZW5kIGNhbGxiYWNrICovXG4gIGNhbGxiYWNrPygpOiB2b2lkO1xuICAvKiogQW5pbWF0aW9uIGR1cmF0aW9uLCBkZWZhdWx0IGFzIDQ1MCAqL1xuICBkdXJhdGlvbj86IG51bWJlcjtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTnpTY3JvbGxTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBkb2M6IERvY3VtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIEBJbmplY3QoRE9DVU1FTlQpIGRvYzogTnpTYWZlQW55KSB7XG4gICAgdGhpcy5kb2MgPSBkb2M7XG4gIH1cblxuICAvKiogU2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgc2Nyb2xsIGJhciBvZiBgZWxgLiAqL1xuICBzZXRTY3JvbGxUb3AoZWw6IEVsZW1lbnQgfCBXaW5kb3csIHRvcFZhbHVlOiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgaWYgKGVsID09PSB3aW5kb3cpIHtcbiAgICAgIHRoaXMuZG9jLmJvZHkuc2Nyb2xsVG9wID0gdG9wVmFsdWU7XG4gICAgICB0aGlzLmRvYy5kb2N1bWVudEVsZW1lbnQhLnNjcm9sbFRvcCA9IHRvcFZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAoZWwgYXMgRWxlbWVudCkuc2Nyb2xsVG9wID0gdG9wVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqIEdldCBwb3NpdGlvbiBvZiBgZWxgIGFnYWluc3Qgd2luZG93LiAqL1xuICBnZXRPZmZzZXQoZWw6IEVsZW1lbnQpOiB7IHRvcDogbnVtYmVyOyBsZWZ0OiBudW1iZXIgfSB7XG4gICAgY29uc3QgcmV0ID0ge1xuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMFxuICAgIH07XG4gICAgaWYgKCFlbCB8fCAhZWwuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChyZWN0LndpZHRoIHx8IHJlY3QuaGVpZ2h0KSB7XG4gICAgICBjb25zdCBkb2MgPSBlbC5vd25lckRvY3VtZW50IS5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICByZXQudG9wID0gcmVjdC50b3AgLSBkb2MhLmNsaWVudFRvcDtcbiAgICAgIHJldC5sZWZ0ID0gcmVjdC5sZWZ0IC0gZG9jIS5jbGllbnRMZWZ0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXQudG9wID0gcmVjdC50b3A7XG4gICAgICByZXQubGVmdCA9IHJlY3QubGVmdDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLyoqIEdldCB0aGUgcG9zaXRpb24gb2YgdGhlIHNjb2xsIGJhciBvZiBgZWxgLiAqL1xuICAvLyBUT0RPOiByZW1vdmUgJ3wgV2luZG93JyBhcyB0aGUgZmFsbGJhY2sgYWxyZWFkeSBoYXBwZW5zIGhlcmVcbiAgZ2V0U2Nyb2xsKHRhcmdldD86IEVsZW1lbnQgfCBIVE1MRWxlbWVudCB8IFdpbmRvdyB8IERvY3VtZW50IHwgbnVsbCwgdG9wOiBib29sZWFuID0gdHJ1ZSk6IG51bWJlciB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgY29uc3QgbWV0aG9kID0gdG9wID8gJ3Njcm9sbFRvcCcgOiAnc2Nyb2xsTGVmdCc7XG4gICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgaWYgKHRoaXMuaXNXaW5kb3codGFyZ2V0KSkge1xuICAgICAgcmVzdWx0ID0gKHRhcmdldCBhcyBXaW5kb3cpW3RvcCA/ICdwYWdlWU9mZnNldCcgOiAncGFnZVhPZmZzZXQnXTtcbiAgICB9IGVsc2UgaWYgKHRhcmdldCBpbnN0YW5jZW9mIERvY3VtZW50KSB7XG4gICAgICByZXN1bHQgPSB0YXJnZXQuZG9jdW1lbnRFbGVtZW50W21ldGhvZF07XG4gICAgfSBlbHNlIGlmICh0YXJnZXQpIHtcbiAgICAgIHJlc3VsdCA9ICh0YXJnZXQgYXMgSFRNTEVsZW1lbnQpW21ldGhvZF07XG4gICAgfVxuICAgIGlmICh0YXJnZXQgJiYgIXRoaXMuaXNXaW5kb3codGFyZ2V0KSAmJiB0eXBlb2YgcmVzdWx0ICE9PSAnbnVtYmVyJykge1xuICAgICAgcmVzdWx0ID0gKCh0YXJnZXQgYXMgSFRNTEVsZW1lbnQpLm93bmVyRG9jdW1lbnQgfHwgKHRhcmdldCBhcyBEb2N1bWVudCkpLmRvY3VtZW50RWxlbWVudFttZXRob2RdO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaXNXaW5kb3cob2JqOiBOelNhZmVBbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gb2JqICE9PSBudWxsICYmIG9iaiAhPT0gdW5kZWZpbmVkICYmIG9iaiA9PT0gb2JqLndpbmRvdztcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwgYGVsYCB0byBzb21lIHBvc2l0aW9uIHdpdGggYW5pbWF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gY29udGFpbmVyRWwgY29udGFpbmVyLCBgd2luZG93YCBieSBkZWZhdWx0XG4gICAqIEBwYXJhbSB5IFNjcm9sbCB0byBgdG9wYCwgMCBieSBkZWZhdWx0XG4gICAqL1xuICBzY3JvbGxUbyhcbiAgICBjb250YWluZXJFbD86IEVsZW1lbnQgfCBIVE1MRWxlbWVudCB8IFdpbmRvdyB8IERvY3VtZW50IHwgbnVsbCxcbiAgICB5OiBudW1iZXIgPSAwLFxuICAgIG9wdGlvbnM6IE56U2Nyb2xsVG9PcHRpb25zID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gY29udGFpbmVyRWwgPyBjb250YWluZXJFbCA6IHdpbmRvdztcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLmdldFNjcm9sbCh0YXJnZXQpO1xuICAgIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgY29uc3QgeyBlYXNpbmcsIGNhbGxiYWNrLCBkdXJhdGlvbiA9IDQ1MCB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBmcmFtZUZ1bmMgPSAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgdGltZSA9IHRpbWVzdGFtcCAtIHN0YXJ0VGltZTtcbiAgICAgIGNvbnN0IG5leHRTY3JvbGxUb3AgPSAoZWFzaW5nIHx8IGVhc2VJbk91dEN1YmljKSh0aW1lID4gZHVyYXRpb24gPyBkdXJhdGlvbiA6IHRpbWUsIHNjcm9sbFRvcCwgeSwgZHVyYXRpb24pO1xuICAgICAgaWYgKHRoaXMuaXNXaW5kb3codGFyZ2V0KSkge1xuICAgICAgICAodGFyZ2V0IGFzIFdpbmRvdykuc2Nyb2xsVG8od2luZG93LnBhZ2VYT2Zmc2V0LCBuZXh0U2Nyb2xsVG9wKTtcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSFRNTERvY3VtZW50IHx8IHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnSFRNTERvY3VtZW50Jykge1xuICAgICAgICAodGFyZ2V0IGFzIEhUTUxEb2N1bWVudCkuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IG5leHRTY3JvbGxUb3A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAodGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zY3JvbGxUb3AgPSBuZXh0U2Nyb2xsVG9wO1xuICAgICAgfVxuICAgICAgaWYgKHRpbWUgPCBkdXJhdGlvbikge1xuICAgICAgICByZXFBbmltRnJhbWUoZnJhbWVGdW5jKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIENhcmV0YWtlciBub3RlOiB0aGUgYGZyYW1lRnVuY2AgaXMgY2FsbGVkIHdpdGhpbiB0aGUgYDxyb290PmAgem9uZSwgYnV0IHdlIGhhdmUgdG8gcmUtZW50ZXJcbiAgICAgICAgLy8gdGhlIEFuZ3VsYXIgem9uZSB3aGVuIGNhbGxpbmcgY3VzdG9tIGNhbGxiYWNrIHRvIGJlIGJhY2t3YXJkcy1jb21wYXRpYmxlLlxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH07XG4gICAgLy8gQ2FyZXRha2VyIG5vdGU6IHRoZSBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYCB0cmlnZ2VycyBjaGFuZ2UgZGV0ZWN0aW9uLCBidXQgdXBkYXRpbmcgYSBgc2Nyb2xsVG9wYCBwcm9wZXJ0eSBvclxuICAgIC8vIGNhbGxpbmcgYHdpbmRvdy5zY3JvbGxUb2AgZG9lc24ndCByZXF1aXJlIEFuZ3VsYXIgdG8gcnVuIGBBcHBsaWNhdGlvblJlZi50aWNrKClgLlxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHJlcUFuaW1GcmFtZShmcmFtZUZ1bmMpKTtcbiAgfVxufVxuIl19