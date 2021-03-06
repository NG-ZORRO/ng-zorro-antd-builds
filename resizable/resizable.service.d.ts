/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NgZone, OnDestroy } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
import { NzResizeHandleMouseDownEvent } from './resize-handle.component';
export declare class NzResizableService implements OnDestroy {
    private ngZone;
    private document;
    private listeners;
    handleMouseDown$: Subject<NzResizeHandleMouseDownEvent>;
    documentMouseUp$: Subject<MouseEvent | TouchEvent>;
    documentMouseMove$: Subject<MouseEvent | TouchEvent>;
    mouseEntered$: Subject<boolean>;
    constructor(ngZone: NgZone, document: NzSafeAny);
    startResizing(event: MouseEvent | TouchEvent): void;
    private clearListeners;
    ngOnDestroy(): void;
}
