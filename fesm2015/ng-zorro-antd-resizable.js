import { DOCUMENT, CommonModule } from '@angular/common';
import { Injectable, NgZone, Inject, EventEmitter, Directive, ElementRef, Renderer2, Input, Output, Component, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { __decorate, __metadata } from 'tslib';
import { Platform } from '@angular/cdk/platform';
import { isTouchEvent, ensureInBounds, InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function getEventWithPoint(event) {
    return isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzResizableService {
    constructor(ngZone, document) {
        this.ngZone = ngZone;
        this.listeners = new Map();
        this.handleMouseDown$ = new Subject();
        this.documentMouseUp$ = new Subject();
        this.documentMouseMove$ = new Subject();
        this.mouseEntered$ = new Subject();
        this.document = document;
    }
    startResizing(event) {
        const _isTouchEvent = isTouchEvent(event);
        this.clearListeners();
        const moveEvent = _isTouchEvent ? 'touchmove' : 'mousemove';
        const upEvent = _isTouchEvent ? 'touchend' : 'mouseup';
        const moveEventHandler = (e) => {
            this.documentMouseMove$.next(e);
        };
        const upEventHandler = (e) => {
            this.documentMouseUp$.next(e);
            this.clearListeners();
        };
        this.listeners.set(moveEvent, moveEventHandler);
        this.listeners.set(upEvent, upEventHandler);
        this.ngZone.runOutsideAngular(() => {
            this.listeners.forEach((handler, name) => {
                this.document.addEventListener(name, handler);
            });
        });
    }
    clearListeners() {
        this.listeners.forEach((handler, name) => {
            this.document.removeEventListener(name, handler);
        });
        this.listeners.clear();
    }
    ngOnDestroy() {
        this.handleMouseDown$.complete();
        this.documentMouseUp$.complete();
        this.documentMouseMove$.complete();
        this.mouseEntered$.complete();
        this.clearListeners();
    }
}
NzResizableService.decorators = [
    { type: Injectable }
];
NzResizableService.ctorParameters = () => [
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzResizableDirective {
    constructor(elementRef, renderer, nzResizableService, platform, ngZone) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.nzResizableService = nzResizableService;
        this.platform = platform;
        this.ngZone = ngZone;
        this.nzBounds = 'parent';
        this.nzMinHeight = 40;
        this.nzMinWidth = 40;
        this.nzGridColumnCount = -1;
        this.nzMaxColumn = -1;
        this.nzMinColumn = -1;
        this.nzLockAspectRatio = false;
        this.nzPreview = false;
        this.nzDisabled = false;
        this.nzResize = new EventEmitter();
        this.nzResizeEnd = new EventEmitter();
        this.nzResizeStart = new EventEmitter();
        this.resizing = false;
        this.currentHandleEvent = null;
        this.ghostElement = null;
        this.sizeCache = null;
        this.destroy$ = new Subject();
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('nz-resizable');
        this.nzResizableService.handleMouseDown$.pipe(takeUntil(this.destroy$)).subscribe(event => {
            if (this.nzDisabled) {
                return;
            }
            this.resizing = true;
            this.nzResizableService.startResizing(event.mouseEvent);
            this.currentHandleEvent = event;
            this.setCursor();
            this.nzResizeStart.emit({
                mouseEvent: event.mouseEvent
            });
            this.elRect = this.el.getBoundingClientRect();
        });
        this.nzResizableService.documentMouseUp$.pipe(takeUntil(this.destroy$)).subscribe(event => {
            if (this.resizing) {
                this.resizing = false;
                this.nzResizableService.documentMouseUp$.next();
                this.endResize(event);
            }
        });
        this.nzResizableService.documentMouseMove$.pipe(takeUntil(this.destroy$)).subscribe(event => {
            if (this.resizing) {
                this.resize(event);
            }
        });
    }
    onMouseenter() {
        this.nzResizableService.mouseEntered$.next(true);
    }
    onMouseleave() {
        this.nzResizableService.mouseEntered$.next(false);
    }
    setPosition() {
        const position = getComputedStyle(this.el).position;
        if (position === 'static' || !position) {
            this.renderer.setStyle(this.el, 'position', 'relative');
        }
    }
    calcSize(width, height, ratio) {
        let newWidth;
        let newHeight;
        let maxWidth;
        let maxHeight;
        let col = 0;
        let spanWidth = 0;
        let minWidth = this.nzMinWidth;
        let boundWidth = Infinity;
        let boundHeight = Infinity;
        if (this.nzBounds === 'parent') {
            const parent = this.renderer.parentNode(this.el);
            if (parent instanceof HTMLElement) {
                const parentRect = parent.getBoundingClientRect();
                boundWidth = parentRect.width;
                boundHeight = parentRect.height;
            }
        }
        else if (this.nzBounds === 'window') {
            if (typeof window !== 'undefined') {
                boundWidth = window.innerWidth;
                boundHeight = window.innerHeight;
            }
        }
        else if (this.nzBounds && this.nzBounds.nativeElement && this.nzBounds.nativeElement instanceof HTMLElement) {
            const boundsRect = this.nzBounds.nativeElement.getBoundingClientRect();
            boundWidth = boundsRect.width;
            boundHeight = boundsRect.height;
        }
        maxWidth = ensureInBounds(this.nzMaxWidth, boundWidth);
        maxHeight = ensureInBounds(this.nzMaxHeight, boundHeight);
        if (this.nzGridColumnCount !== -1) {
            spanWidth = maxWidth / this.nzGridColumnCount;
            minWidth = this.nzMinColumn !== -1 ? spanWidth * this.nzMinColumn : minWidth;
            maxWidth = this.nzMaxColumn !== -1 ? spanWidth * this.nzMaxColumn : maxWidth;
        }
        if (ratio !== -1) {
            if (/(left|right)/i.test(this.currentHandleEvent.direction)) {
                newWidth = Math.min(Math.max(width, minWidth), maxWidth);
                newHeight = Math.min(Math.max(newWidth / ratio, this.nzMinHeight), maxHeight);
                if (newHeight >= maxHeight || newHeight <= this.nzMinHeight) {
                    newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
                }
            }
            else {
                newHeight = Math.min(Math.max(height, this.nzMinHeight), maxHeight);
                newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
                if (newWidth >= maxWidth || newWidth <= minWidth) {
                    newHeight = Math.min(Math.max(newWidth / ratio, this.nzMinHeight), maxHeight);
                }
            }
        }
        else {
            newWidth = Math.min(Math.max(width, minWidth), maxWidth);
            newHeight = Math.min(Math.max(height, this.nzMinHeight), maxHeight);
        }
        if (this.nzGridColumnCount !== -1) {
            col = Math.round(newWidth / spanWidth);
            newWidth = col * spanWidth;
        }
        return {
            col,
            width: newWidth,
            height: newHeight
        };
    }
    setCursor() {
        switch (this.currentHandleEvent.direction) {
            case 'left':
            case 'right':
                this.renderer.setStyle(document.body, 'cursor', 'ew-resize');
                break;
            case 'top':
            case 'bottom':
                this.renderer.setStyle(document.body, 'cursor', 'ns-resize');
                break;
            case 'topLeft':
            case 'bottomRight':
                this.renderer.setStyle(document.body, 'cursor', 'nwse-resize');
                break;
            case 'topRight':
            case 'bottomLeft':
                this.renderer.setStyle(document.body, 'cursor', 'nesw-resize');
                break;
        }
        this.renderer.setStyle(document.body, 'user-select', 'none');
    }
    resize(event) {
        const elRect = this.elRect;
        const resizeEvent = getEventWithPoint(event);
        const handleEvent = getEventWithPoint(this.currentHandleEvent.mouseEvent);
        let width = elRect.width;
        let height = elRect.height;
        const ratio = this.nzLockAspectRatio ? width / height : -1;
        switch (this.currentHandleEvent.direction) {
            case 'bottomRight':
                width = resizeEvent.clientX - elRect.left;
                height = resizeEvent.clientY - elRect.top;
                break;
            case 'bottomLeft':
                width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
                height = resizeEvent.clientY - elRect.top;
                break;
            case 'topRight':
                width = resizeEvent.clientX - elRect.left;
                height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
                break;
            case 'topLeft':
                width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
                height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
                break;
            case 'top':
                height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
                break;
            case 'right':
                width = resizeEvent.clientX - elRect.left;
                break;
            case 'bottom':
                height = resizeEvent.clientY - elRect.top;
                break;
            case 'left':
                width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
        }
        const size = this.calcSize(width, height, ratio);
        this.sizeCache = Object.assign({}, size);
        this.ngZone.run(() => {
            this.nzResize.emit(Object.assign(Object.assign({}, size), { mouseEvent: event }));
        });
        if (this.nzPreview) {
            this.previewResize(size);
        }
    }
    endResize(event) {
        this.renderer.setStyle(document.body, 'cursor', '');
        this.renderer.setStyle(document.body, 'user-select', '');
        this.removeGhostElement();
        const size = this.sizeCache
            ? Object.assign({}, this.sizeCache) : {
            width: this.elRect.width,
            height: this.elRect.height
        };
        this.ngZone.run(() => {
            this.nzResizeEnd.emit(Object.assign(Object.assign({}, size), { mouseEvent: event }));
        });
        this.sizeCache = null;
        this.currentHandleEvent = null;
    }
    previewResize({ width, height }) {
        this.createGhostElement();
        this.renderer.setStyle(this.ghostElement, 'width', `${width}px`);
        this.renderer.setStyle(this.ghostElement, 'height', `${height}px`);
    }
    createGhostElement() {
        if (!this.ghostElement) {
            this.ghostElement = this.renderer.createElement('div');
            this.renderer.setAttribute(this.ghostElement, 'class', 'nz-resizable-preview');
        }
        this.renderer.appendChild(this.el, this.ghostElement);
    }
    removeGhostElement() {
        if (this.ghostElement) {
            this.renderer.removeChild(this.el, this.ghostElement);
        }
    }
    ngAfterViewInit() {
        if (this.platform.isBrowser) {
            this.el = this.elementRef.nativeElement;
            this.setPosition();
        }
    }
    ngOnDestroy() {
        this.ghostElement = null;
        this.sizeCache = null;
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzResizableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-resizable]',
                exportAs: 'nzResizable',
                providers: [NzResizableService],
                host: {
                    '[class.nz-resizable-resizing]': 'resizing',
                    '[class.nz-resizable-disabled]': 'nzDisabled',
                    '(mouseenter)': 'onMouseenter()',
                    '(mouseleave)': 'onMouseleave()'
                }
            },] }
];
NzResizableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NzResizableService },
    { type: Platform },
    { type: NgZone }
];
NzResizableDirective.propDecorators = {
    nzBounds: [{ type: Input }],
    nzMaxHeight: [{ type: Input }],
    nzMaxWidth: [{ type: Input }],
    nzMinHeight: [{ type: Input }],
    nzMinWidth: [{ type: Input }],
    nzGridColumnCount: [{ type: Input }],
    nzMaxColumn: [{ type: Input }],
    nzMinColumn: [{ type: Input }],
    nzLockAspectRatio: [{ type: Input }],
    nzPreview: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzResize: [{ type: Output }],
    nzResizeEnd: [{ type: Output }],
    nzResizeStart: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzResizableDirective.prototype, "nzLockAspectRatio", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzResizableDirective.prototype, "nzPreview", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzResizableDirective.prototype, "nzDisabled", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzResizeHandleMouseDownEvent {
    constructor(direction, mouseEvent) {
        this.direction = direction;
        this.mouseEvent = mouseEvent;
    }
}
class NzResizeHandleComponent {
    constructor(nzResizableService, cdr, elementRef) {
        this.nzResizableService = nzResizableService;
        this.cdr = cdr;
        this.elementRef = elementRef;
        this.nzDirection = 'bottomRight';
        this.nzMouseDown = new EventEmitter();
        this.entered = false;
        this.destroy$ = new Subject();
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('nz-resizable-handle');
    }
    ngOnInit() {
        this.nzResizableService.mouseEntered$.pipe(takeUntil(this.destroy$)).subscribe(entered => {
            this.entered = entered;
            this.cdr.markForCheck();
        });
    }
    onMousedown(event) {
        this.nzResizableService.handleMouseDown$.next(new NzResizeHandleMouseDownEvent(this.nzDirection, event));
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzResizeHandleComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-resize-handle, [nz-resize-handle]',
                exportAs: 'nzResizeHandle',
                template: `
    <ng-content></ng-content>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.nz-resizable-handle-top]': `nzDirection === 'top'`,
                    '[class.nz-resizable-handle-right]': `nzDirection === 'right'`,
                    '[class.nz-resizable-handle-bottom]': `nzDirection === 'bottom'`,
                    '[class.nz-resizable-handle-left]': `nzDirection === 'left'`,
                    '[class.nz-resizable-handle-topRight]': `nzDirection === 'topRight'`,
                    '[class.nz-resizable-handle-bottomRight]': `nzDirection === 'bottomRight'`,
                    '[class.nz-resizable-handle-bottomLeft]': `nzDirection === 'bottomLeft'`,
                    '[class.nz-resizable-handle-topLeft]': `nzDirection === 'topLeft'`,
                    '[class.nz-resizable-handle-box-hover]': 'entered',
                    '(mousedown)': 'onMousedown($event)',
                    '(touchstart)': 'onMousedown($event)'
                }
            },] }
];
NzResizeHandleComponent.ctorParameters = () => [
    { type: NzResizableService },
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
NzResizeHandleComponent.propDecorators = {
    nzDirection: [{ type: Input }],
    nzMouseDown: [{ type: Output }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const DEFAULT_RESIZE_DIRECTION = [
    'bottomRight',
    'topRight',
    'bottomLeft',
    'topLeft',
    'bottom',
    'right',
    'top',
    'left'
];
class NzResizeHandlesComponent {
    constructor() {
        this.nzDirections = DEFAULT_RESIZE_DIRECTION;
        this.directions = new Set(this.nzDirections);
    }
    ngOnChanges(changes) {
        if (changes.nzDirections) {
            this.directions = new Set(changes.nzDirections.currentValue);
        }
    }
}
NzResizeHandlesComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-resize-handles',
                exportAs: 'nzResizeHandles',
                template: ` <nz-resize-handle *ngFor="let dir of directions" [nzDirection]="dir"></nz-resize-handle> `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NzResizeHandlesComponent.ctorParameters = () => [];
NzResizeHandlesComponent.propDecorators = {
    nzDirections: [{ type: Input }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzResizableModule {
}
NzResizableModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent],
                exports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DEFAULT_RESIZE_DIRECTION, NzResizableDirective, NzResizableModule, NzResizableService, NzResizeHandleComponent, NzResizeHandleMouseDownEvent, NzResizeHandlesComponent, getEventWithPoint };
//# sourceMappingURL=ng-zorro-antd-resizable.js.map
