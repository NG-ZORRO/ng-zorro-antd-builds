/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * This module provides utility functions to query DOM information or
 * set properties.
 */
import { Observable } from 'rxjs';
/**
 * Silent an event by stopping and preventing it.
 */
export declare function silentEvent(e: Event): void;
export declare function getElementOffset(elem: HTMLElement): {
    top: number;
    left: number;
};
/**
 * Investigate if an event is a `TouchEvent`.
 */
export declare function isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent;
export declare function getEventPosition(event: MouseEvent | TouchEvent): MouseEvent | Touch;
export interface MouseTouchObserverConfig {
    end: string;
    move: string;
    pluckKey: string[];
    start: string;
    end$?: Observable<Event>;
    moveResolved$?: Observable<number>;
    startPlucked$?: Observable<number>;
    filter?(e: Event): boolean;
}
