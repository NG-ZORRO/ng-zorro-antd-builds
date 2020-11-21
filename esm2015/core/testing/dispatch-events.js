/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { createFakeEvent, createKeyboardEvent, createMouseEvent, createTouchEvent } from './event-objects';
/** Utility to dispatch any event on a Node. */
export function dispatchEvent(node, event) {
    node.dispatchEvent(event);
    return event;
}
/** Shorthand to dispatch a fake event on a specified node. */
export function dispatchFakeEvent(node, type, canBubble) {
    return dispatchEvent(node, createFakeEvent(type, canBubble));
}
/** Shorthand to dispatch a keyboard event with a specified key code. */
export function dispatchKeyboardEvent(node, type, keyCode, target) {
    return dispatchEvent(node, createKeyboardEvent(type, keyCode, target));
}
/** Shorthand to dispatch a mouse event on the specified coordinates. */
export function dispatchMouseEvent(node, type, x = 0, y = 0, event = createMouseEvent(type, x, y)) {
    return dispatchEvent(node, event);
}
/** Shorthand to dispatch a touch event on the specified coordinates. */
export function dispatchTouchEvent(node, type, x = 0, y = 0) {
    return dispatchEvent(node, createTouchEvent(type, x, y));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2gtZXZlbnRzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9jb3JlL3Rlc3RpbmcvIiwic291cmNlcyI6WyJkaXNwYXRjaC1ldmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNHLCtDQUErQztBQUMvQyxNQUFNLFVBQVUsYUFBYSxDQUFDLElBQW1CLEVBQUUsS0FBWTtJQUM3RCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELDhEQUE4RDtBQUM5RCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsSUFBbUIsRUFBRSxJQUFZLEVBQUUsU0FBbUI7SUFDdEYsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUMvRCxDQUFDO0FBRUQsd0VBQXdFO0FBQ3hFLE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxJQUFVLEVBQUUsSUFBWSxFQUFFLE9BQWUsRUFBRSxNQUFnQjtJQUMvRixPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBa0IsQ0FBQztBQUMxRixDQUFDO0FBRUQsd0VBQXdFO0FBQ3hFLE1BQU0sVUFBVSxrQkFBa0IsQ0FDaEMsSUFBVSxFQUNWLElBQVksRUFDWixJQUFZLENBQUMsRUFDYixJQUFZLENBQUMsRUFDYixRQUFvQixnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVoRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFlLENBQUM7QUFDbEQsQ0FBQztBQUVELHdFQUF3RTtBQUN4RSxNQUFNLFVBQVUsa0JBQWtCLENBQUMsSUFBVSxFQUFFLElBQVksRUFBRSxJQUFZLENBQUMsRUFBRSxJQUFZLENBQUM7SUFDdkYsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQWUsQ0FBQztBQUN6RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IGNyZWF0ZUZha2VFdmVudCwgY3JlYXRlS2V5Ym9hcmRFdmVudCwgY3JlYXRlTW91c2VFdmVudCwgY3JlYXRlVG91Y2hFdmVudCB9IGZyb20gJy4vZXZlbnQtb2JqZWN0cyc7XG5cbi8qKiBVdGlsaXR5IHRvIGRpc3BhdGNoIGFueSBldmVudCBvbiBhIE5vZGUuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChub2RlOiBOb2RlIHwgV2luZG93LCBldmVudDogRXZlbnQpOiBFdmVudCB7XG4gIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIHJldHVybiBldmVudDtcbn1cblxuLyoqIFNob3J0aGFuZCB0byBkaXNwYXRjaCBhIGZha2UgZXZlbnQgb24gYSBzcGVjaWZpZWQgbm9kZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEZha2VFdmVudChub2RlOiBOb2RlIHwgV2luZG93LCB0eXBlOiBzdHJpbmcsIGNhbkJ1YmJsZT86IGJvb2xlYW4pOiBFdmVudCB7XG4gIHJldHVybiBkaXNwYXRjaEV2ZW50KG5vZGUsIGNyZWF0ZUZha2VFdmVudCh0eXBlLCBjYW5CdWJibGUpKTtcbn1cblxuLyoqIFNob3J0aGFuZCB0byBkaXNwYXRjaCBhIGtleWJvYXJkIGV2ZW50IHdpdGggYSBzcGVjaWZpZWQga2V5IGNvZGUuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hLZXlib2FyZEV2ZW50KG5vZGU6IE5vZGUsIHR5cGU6IHN0cmluZywga2V5Q29kZTogbnVtYmVyLCB0YXJnZXQ/OiBFbGVtZW50KTogS2V5Ym9hcmRFdmVudCB7XG4gIHJldHVybiBkaXNwYXRjaEV2ZW50KG5vZGUsIGNyZWF0ZUtleWJvYXJkRXZlbnQodHlwZSwga2V5Q29kZSwgdGFyZ2V0KSkgYXMgS2V5Ym9hcmRFdmVudDtcbn1cblxuLyoqIFNob3J0aGFuZCB0byBkaXNwYXRjaCBhIG1vdXNlIGV2ZW50IG9uIHRoZSBzcGVjaWZpZWQgY29vcmRpbmF0ZXMuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hNb3VzZUV2ZW50KFxuICBub2RlOiBOb2RlLFxuICB0eXBlOiBzdHJpbmcsXG4gIHg6IG51bWJlciA9IDAsXG4gIHk6IG51bWJlciA9IDAsXG4gIGV2ZW50OiBNb3VzZUV2ZW50ID0gY3JlYXRlTW91c2VFdmVudCh0eXBlLCB4LCB5KVxuKTogTW91c2VFdmVudCB7XG4gIHJldHVybiBkaXNwYXRjaEV2ZW50KG5vZGUsIGV2ZW50KSBhcyBNb3VzZUV2ZW50O1xufVxuXG4vKiogU2hvcnRoYW5kIHRvIGRpc3BhdGNoIGEgdG91Y2ggZXZlbnQgb24gdGhlIHNwZWNpZmllZCBjb29yZGluYXRlcy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaFRvdWNoRXZlbnQobm9kZTogTm9kZSwgdHlwZTogc3RyaW5nLCB4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKTogVG91Y2hFdmVudCB7XG4gIHJldHVybiBkaXNwYXRjaEV2ZW50KG5vZGUsIGNyZWF0ZVRvdWNoRXZlbnQodHlwZSwgeCwgeSkpIGFzIFRvdWNoRXZlbnQ7XG59XG4iXX0=