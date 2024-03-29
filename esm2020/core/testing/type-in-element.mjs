/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { dispatchFakeEvent } from './dispatch-events';
/**
 * Focuses an input, sets its value and dispatches
 * the `input` event, simulating the user typing.
 *
 * @param value Value to be set on the input.
 * @param element Element onto which to set the value.
 */
export function typeInElement(value, element) {
    element.focus();
    element.value = value;
    dispatchFakeEvent(element, 'input');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS1pbi1lbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb3JlL3Rlc3RpbmcvdHlwZS1pbi1lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXREOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQUMsS0FBYSxFQUFFLE9BQStDO0lBQzFGLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQixPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN0QixpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IGRpc3BhdGNoRmFrZUV2ZW50IH0gZnJvbSAnLi9kaXNwYXRjaC1ldmVudHMnO1xuXG4vKipcbiAqIEZvY3VzZXMgYW4gaW5wdXQsIHNldHMgaXRzIHZhbHVlIGFuZCBkaXNwYXRjaGVzXG4gKiB0aGUgYGlucHV0YCBldmVudCwgc2ltdWxhdGluZyB0aGUgdXNlciB0eXBpbmcuXG4gKlxuICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIGJlIHNldCBvbiB0aGUgaW5wdXQuXG4gKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IG9udG8gd2hpY2ggdG8gc2V0IHRoZSB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHR5cGVJbkVsZW1lbnQodmFsdWU6IHN0cmluZywgZWxlbWVudDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQpOiB2b2lkIHtcbiAgZWxlbWVudC5mb2N1cygpO1xuICBlbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gIGRpc3BhdGNoRmFrZUV2ZW50KGVsZW1lbnQsICdpbnB1dCcpO1xufVxuIl19