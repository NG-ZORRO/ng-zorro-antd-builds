/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Silent an event by stopping and preventing it.
 */
export function silentEvent(e) {
    e.stopPropagation();
    e.preventDefault();
}
export function getElementOffset(elem) {
    if (!elem.getClientRects().length) {
        return { top: 0, left: 0 };
    }
    const rect = elem.getBoundingClientRect();
    const win = elem.ownerDocument.defaultView;
    return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
    };
}
/**
 * Investigate if an event is a `TouchEvent`.
 */
export function isTouchEvent(event) {
    return event.type.startsWith('touch');
}
export function getEventPosition(event) {
    return isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb3JlL3V0aWwvZG9tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQVNIOztHQUVHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxDQUFRO0lBQ2xDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDckIsQ0FBQztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxJQUFpQjtJQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sRUFBRTtRQUNqQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FDNUI7SUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUMxQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYyxDQUFDLFdBQVcsQ0FBQztJQUM1QyxPQUFPO1FBQ0wsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBSSxDQUFDLFdBQVc7UUFDaEMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBSSxDQUFDLFdBQVc7S0FDbkMsQ0FBQztBQUNKLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsS0FBOEI7SUFDekQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEtBQThCO0lBQzdELE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNuRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuLyoqXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyB1dGlsaXR5IGZ1bmN0aW9ucyB0byBxdWVyeSBET00gaW5mb3JtYXRpb24gb3JcbiAqIHNldCBwcm9wZXJ0aWVzLlxuICovXG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBTaWxlbnQgYW4gZXZlbnQgYnkgc3RvcHBpbmcgYW5kIHByZXZlbnRpbmcgaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaWxlbnRFdmVudChlOiBFdmVudCk6IHZvaWQge1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50T2Zmc2V0KGVsZW06IEhUTUxFbGVtZW50KTogeyB0b3A6IG51bWJlcjsgbGVmdDogbnVtYmVyIH0ge1xuICBpZiAoIWVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpIHtcbiAgICByZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgfVxuXG4gIGNvbnN0IHJlY3QgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCB3aW4gPSBlbGVtLm93bmVyRG9jdW1lbnQhLmRlZmF1bHRWaWV3O1xuICByZXR1cm4ge1xuICAgIHRvcDogcmVjdC50b3AgKyB3aW4hLnBhZ2VZT2Zmc2V0LFxuICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbiEucGFnZVhPZmZzZXRcbiAgfTtcbn1cblxuLyoqXG4gKiBJbnZlc3RpZ2F0ZSBpZiBhbiBldmVudCBpcyBhIGBUb3VjaEV2ZW50YC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVG91Y2hFdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiBldmVudCBpcyBUb3VjaEV2ZW50IHtcbiAgcmV0dXJuIGV2ZW50LnR5cGUuc3RhcnRzV2l0aCgndG91Y2gnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEV2ZW50UG9zaXRpb24oZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogTW91c2VFdmVudCB8IFRvdWNoIHtcbiAgcmV0dXJuIGlzVG91Y2hFdmVudChldmVudCkgPyBldmVudC50b3VjaGVzWzBdIHx8IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdIDogZXZlbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW91c2VUb3VjaE9ic2VydmVyQ29uZmlnIHtcbiAgZW5kOiBzdHJpbmc7XG4gIG1vdmU6IHN0cmluZztcbiAgcGx1Y2tLZXk6IHN0cmluZ1tdO1xuICBzdGFydDogc3RyaW5nO1xuXG4gIGVuZCQ/OiBPYnNlcnZhYmxlPEV2ZW50PjtcbiAgbW92ZVJlc29sdmVkJD86IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgc3RhcnRQbHVja2VkJD86IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBmaWx0ZXI/KGU6IEV2ZW50KTogYm9vbGVhbjtcbn1cbiJdfQ==