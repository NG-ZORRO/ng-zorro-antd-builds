/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NzResizableService } from './resizable.service';
import * as i0 from "@angular/core";
export declare type NzResizeDirection = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';
export declare class NzResizeHandleMouseDownEvent {
    direction: NzResizeDirection;
    mouseEvent: MouseEvent | TouchEvent;
    constructor(direction: NzResizeDirection, mouseEvent: MouseEvent | TouchEvent);
}
export declare class NzResizeHandleComponent implements OnInit, OnDestroy {
    private nzResizableService;
    private renderer;
    private elementRef;
    nzDirection: NzResizeDirection;
    readonly nzMouseDown: EventEmitter<NzResizeHandleMouseDownEvent>;
    private destroy$;
    constructor(nzResizableService: NzResizableService, renderer: Renderer2, elementRef: ElementRef);
    ngOnInit(): void;
    onMousedown(event: MouseEvent | TouchEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzResizeHandleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzResizeHandleComponent, "nz-resize-handle, [nz-resize-handle]", ["nzResizeHandle"], { "nzDirection": "nzDirection"; }, { "nzMouseDown": "nzMouseDown"; }, never, ["*"]>;
}
