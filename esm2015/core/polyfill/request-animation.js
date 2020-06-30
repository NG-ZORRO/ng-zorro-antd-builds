/**
 * @fileoverview added by tsickle
 * Generated from: request-animation.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable: typedef no-invalid-this
/** @type {?} */
const availablePrefixes = ['moz', 'ms', 'webkit'];
/**
 * @return {?}
 */
function requestAnimationFramePolyfill() {
    /** @type {?} */
    let lastTime = 0;
    return (/**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        /** @type {?} */
        const currTime = new Date().getTime();
        /** @type {?} */
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        /** @type {?} */
        const id = setTimeout((/**
         * @return {?}
         */
        () => {
            callback(currTime + timeToCall);
        }), timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    });
}
/**
 * @return {?}
 */
function getRequestAnimationFrame() {
    if (typeof window === 'undefined') {
        return (/**
         * @return {?}
         */
        () => 0);
    }
    if (window.requestAnimationFrame) {
        // https://github.com/vuejs/vue/issues/4465
        return window.requestAnimationFrame.bind(window);
    }
    /** @type {?} */
    const prefix = availablePrefixes.filter((/**
     * @param {?} key
     * @return {?}
     */
    key => `${key}RequestAnimationFrame` in window))[0];
    return prefix ? ((/** @type {?} */ (window)))[`${prefix}RequestAnimationFrame`] : requestAnimationFramePolyfill();
}
/**
 * @param {?} id
 * @return {?}
 */
export function cancelRequestAnimationFrame(id) {
    if (typeof window === 'undefined') {
        return null;
    }
    if (window.cancelAnimationFrame) {
        return window.cancelAnimationFrame(id);
    }
    /** @type {?} */
    const prefix = availablePrefixes.filter((/**
     * @param {?} key
     * @return {?}
     */
    key => `${key}CancelAnimationFrame` in window || `${key}CancelRequestAnimationFrame` in window))[0];
    return prefix
        ? (((/** @type {?} */ (window)))[`${prefix}CancelAnimationFrame`] || ((/** @type {?} */ (window)))[`${prefix}CancelRequestAnimationFrame`])
            // @ts-ignore
            .call(this, id)
        : clearTimeout(id);
}
/** @type {?} */
export const reqAnimFrame = getRequestAnimationFrame();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1hbmltYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkL2NvcmUvcG9seWZpbGwvIiwic291cmNlcyI6WyJyZXF1ZXN0LWFuaW1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O01BT00saUJBQWlCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQzs7OztBQUVqRCxTQUFTLDZCQUE2Qjs7UUFDaEMsUUFBUSxHQUFHLENBQUM7SUFDaEI7Ozs7SUFBTyxVQUFVLFFBQThCOztjQUN2QyxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7O2NBQy9CLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUM7O2NBQ3BELEVBQUUsR0FBRyxVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDekIsUUFBUSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQztRQUNsQyxDQUFDLEdBQUUsVUFBVSxDQUFDO1FBQ2QsUUFBUSxHQUFHLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDakMsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDLEVBQUM7QUFDSixDQUFDOzs7O0FBRUQsU0FBUyx3QkFBd0I7SUFDL0IsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDakM7OztRQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBQztLQUNoQjtJQUNELElBQUksTUFBTSxDQUFDLHFCQUFxQixFQUFFO1FBQ2hDLDJDQUEyQztRQUMzQyxPQUFPLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbEQ7O1VBRUssTUFBTSxHQUFHLGlCQUFpQixDQUFDLE1BQU07Ozs7SUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyx1QkFBdUIsSUFBSSxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFFMUYsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsTUFBTSxFQUFhLENBQUMsQ0FBQyxHQUFHLE1BQU0sdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztBQUM1RyxDQUFDOzs7OztBQUNELE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxFQUFVO0lBQ3BELElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1FBQ2pDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxJQUFJLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRTtRQUMvQixPQUFPLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN4Qzs7VUFDSyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsTUFBTTs7OztJQUNyQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxzQkFBc0IsSUFBSSxNQUFNLElBQUksR0FBRyxHQUFHLDZCQUE2QixJQUFJLE1BQU0sRUFDL0YsQ0FBQyxDQUFDLENBQUM7SUFFSixPQUFPLE1BQU07UUFDWCxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFBLE1BQU0sRUFBYSxDQUFDLENBQUMsR0FBRyxNQUFNLHNCQUFzQixDQUFDLElBQUksQ0FBQyxtQkFBQSxNQUFNLEVBQWEsQ0FBQyxDQUFDLEdBQUcsTUFBTSw2QkFBNkIsQ0FBQyxDQUFDO1lBQ3ZILGFBQWE7YUFDWixJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZCLENBQUM7O0FBRUQsTUFBTSxPQUFPLFlBQVksR0FBRyx3QkFBd0IsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTogdHlwZWRlZiBuby1pbnZhbGlkLXRoaXNcbmNvbnN0IGF2YWlsYWJsZVByZWZpeGVzID0gWydtb3onLCAnbXMnLCAnd2Via2l0J107XG5cbmZ1bmN0aW9uIHJlcXVlc3RBbmltYXRpb25GcmFtZVBvbHlmaWxsKCk6IHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUge1xuICBsZXQgbGFzdFRpbWUgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrOiBGcmFtZVJlcXVlc3RDYWxsYmFjayk6IG51bWJlciB7XG4gICAgY29uc3QgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBjb25zdCB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xuICAgIGNvbnN0IGlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpO1xuICAgIH0sIHRpbWVUb0NhbGwpO1xuICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgIHJldHVybiBpZDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVxdWVzdEFuaW1hdGlvbkZyYW1lKCk6IHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gKCkgPT4gMDtcbiAgfVxuICBpZiAod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92dWUvaXNzdWVzLzQ0NjVcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKHdpbmRvdyk7XG4gIH1cblxuICBjb25zdCBwcmVmaXggPSBhdmFpbGFibGVQcmVmaXhlcy5maWx0ZXIoa2V5ID0+IGAke2tleX1SZXF1ZXN0QW5pbWF0aW9uRnJhbWVgIGluIHdpbmRvdylbMF07XG5cbiAgcmV0dXJuIHByZWZpeCA/ICh3aW5kb3cgYXMgTnpTYWZlQW55KVtgJHtwcmVmaXh9UmVxdWVzdEFuaW1hdGlvbkZyYW1lYF0gOiByZXF1ZXN0QW5pbWF0aW9uRnJhbWVQb2x5ZmlsbCgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZShpZDogbnVtYmVyKTogTnpTYWZlQW55IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSkge1xuICAgIHJldHVybiB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICB9XG4gIGNvbnN0IHByZWZpeCA9IGF2YWlsYWJsZVByZWZpeGVzLmZpbHRlcihcbiAgICBrZXkgPT4gYCR7a2V5fUNhbmNlbEFuaW1hdGlvbkZyYW1lYCBpbiB3aW5kb3cgfHwgYCR7a2V5fUNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZWAgaW4gd2luZG93XG4gIClbMF07XG5cbiAgcmV0dXJuIHByZWZpeFxuICAgID8gKCh3aW5kb3cgYXMgTnpTYWZlQW55KVtgJHtwcmVmaXh9Q2FuY2VsQW5pbWF0aW9uRnJhbWVgXSB8fCAod2luZG93IGFzIE56U2FmZUFueSlbYCR7cHJlZml4fUNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZWBdKVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIC5jYWxsKHRoaXMsIGlkKVxuICAgIDogY2xlYXJUaW1lb3V0KGlkKTtcbn1cblxuZXhwb3J0IGNvbnN0IHJlcUFuaW1GcmFtZSA9IGdldFJlcXVlc3RBbmltYXRpb25GcmFtZSgpO1xuIl19