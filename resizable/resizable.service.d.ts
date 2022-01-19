import { NgZone, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzResizeHandleMouseDownEvent } from './resize-handle.component';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NzResizableService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzResizableService>;
}
