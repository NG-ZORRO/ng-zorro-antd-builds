import * as i2$1 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, Inject, EventEmitter, Directive, Input, Output, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { __decorate } from 'tslib';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isTouchEvent, ensureInBounds, InputBoolean } from 'ng-zorro-antd/core/util';
import * as i2 from '@angular/cdk/platform';

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
NzResizableService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableService, deps: [{ token: i0.NgZone }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
NzResizableService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });

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
        this.sizeCache = { ...size };
        // Re-enter the Angular zone and run the change detection only if there're any `nzResize` listeners,
        // e.g.: `<div nz-resizable (nzResize)="..."></div>`.
        if (this.nzResize.observers.length) {
            this.ngZone.run(() => {
                this.nzResize.emit({
                    ...size,
                    mouseEvent: event
                });
            });
        }
        if (this.nzPreview) {
            this.previewResize(size);
        }
    }
    endResize(event) {
        this.renderer.setStyle(document.body, 'cursor', '');
        this.renderer.setStyle(document.body, 'user-select', '');
        this.removeGhostElement();
        const size = this.sizeCache
            ? { ...this.sizeCache }
            : {
                width: this.elRect.width,
                height: this.elRect.height
            };
        // Re-enter the Angular zone and run the change detection only if there're any `nzResizeEnd` listeners,
        // e.g.: `<div nz-resizable (nzResizeEnd)="..."></div>`.
        if (this.nzResizeEnd.observers.length) {
            this.ngZone.run(() => {
                this.nzResizeEnd.emit({
                    ...size,
                    mouseEvent: event
                });
            });
        }
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
        if (!this.platform.isBrowser) {
            return;
        }
        this.el = this.elementRef.nativeElement;
        this.setPosition();
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.el, 'mouseenter')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.nzResizableService.mouseEntered$.next(true);
            });
            fromEvent(this.el, 'mouseleave')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.nzResizableService.mouseEntered$.next(false);
            });
        });
    }
    ngOnDestroy() {
        this.ghostElement = null;
        this.sizeCache = null;
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzResizableDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NzResizableService }, { token: i2.Platform }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
NzResizableDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzResizableDirective, selector: "[nz-resizable]", inputs: { nzBounds: "nzBounds", nzMaxHeight: "nzMaxHeight", nzMaxWidth: "nzMaxWidth", nzMinHeight: "nzMinHeight", nzMinWidth: "nzMinWidth", nzGridColumnCount: "nzGridColumnCount", nzMaxColumn: "nzMaxColumn", nzMinColumn: "nzMinColumn", nzLockAspectRatio: "nzLockAspectRatio", nzPreview: "nzPreview", nzDisabled: "nzDisabled" }, outputs: { nzResize: "nzResize", nzResizeEnd: "nzResizeEnd", nzResizeStart: "nzResizeStart" }, host: { properties: { "class.nz-resizable-resizing": "resizing", "class.nz-resizable-disabled": "nzDisabled" }, classAttribute: "nz-resizable" }, providers: [NzResizableService], exportAs: ["nzResizable"], ngImport: i0 });
__decorate([
    InputBoolean()
], NzResizableDirective.prototype, "nzLockAspectRatio", void 0);
__decorate([
    InputBoolean()
], NzResizableDirective.prototype, "nzPreview", void 0);
__decorate([
    InputBoolean()
], NzResizableDirective.prototype, "nzDisabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-resizable]',
                    exportAs: 'nzResizable',
                    providers: [NzResizableService],
                    host: {
                        class: 'nz-resizable',
                        '[class.nz-resizable-resizing]': 'resizing',
                        '[class.nz-resizable-disabled]': 'nzDisabled'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: NzResizableService }, { type: i2.Platform }, { type: i0.NgZone }]; }, propDecorators: { nzBounds: [{
                type: Input
            }], nzMaxHeight: [{
                type: Input
            }], nzMaxWidth: [{
                type: Input
            }], nzMinHeight: [{
                type: Input
            }], nzMinWidth: [{
                type: Input
            }], nzGridColumnCount: [{
                type: Input
            }], nzMaxColumn: [{
                type: Input
            }], nzMinColumn: [{
                type: Input
            }], nzLockAspectRatio: [{
                type: Input
            }], nzPreview: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzResize: [{
                type: Output
            }], nzResizeEnd: [{
                type: Output
            }], nzResizeStart: [{
                type: Output
            }] } });

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
    constructor(nzResizableService, renderer, elementRef) {
        this.nzResizableService = nzResizableService;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.nzDirection = 'bottomRight';
        this.nzMouseDown = new EventEmitter();
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        // Caretaker note: `mouseEntered$` subject will emit events within the `<root>` zone,
        // see `NzResizableDirective#ngAfterViewInit`. There're event listeners are added within the `<root>` zone.
        this.nzResizableService.mouseEntered$.pipe(takeUntil(this.destroy$)).subscribe(entered => {
            if (entered) {
                this.renderer.addClass(this.elementRef.nativeElement, 'nz-resizable-handle-box-hover');
            }
            else {
                this.renderer.removeClass(this.elementRef.nativeElement, 'nz-resizable-handle-box-hover');
            }
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
NzResizeHandleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeHandleComponent, deps: [{ token: NzResizableService }, { token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NzResizeHandleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzResizeHandleComponent, selector: "nz-resize-handle, [nz-resize-handle]", inputs: { nzDirection: "nzDirection" }, outputs: { nzMouseDown: "nzMouseDown" }, host: { listeners: { "mousedown": "onMousedown($event)", "touchstart": "onMousedown($event)" }, properties: { "class.nz-resizable-handle-top": "nzDirection === 'top'", "class.nz-resizable-handle-right": "nzDirection === 'right'", "class.nz-resizable-handle-bottom": "nzDirection === 'bottom'", "class.nz-resizable-handle-left": "nzDirection === 'left'", "class.nz-resizable-handle-topRight": "nzDirection === 'topRight'", "class.nz-resizable-handle-bottomRight": "nzDirection === 'bottomRight'", "class.nz-resizable-handle-bottomLeft": "nzDirection === 'bottomLeft'", "class.nz-resizable-handle-topLeft": "nzDirection === 'topLeft'" }, classAttribute: "nz-resizable-handle" }, exportAs: ["nzResizeHandle"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeHandleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-resize-handle, [nz-resize-handle]',
                    exportAs: 'nzResizeHandle',
                    template: ` <ng-content></ng-content> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'nz-resizable-handle',
                        '[class.nz-resizable-handle-top]': `nzDirection === 'top'`,
                        '[class.nz-resizable-handle-right]': `nzDirection === 'right'`,
                        '[class.nz-resizable-handle-bottom]': `nzDirection === 'bottom'`,
                        '[class.nz-resizable-handle-left]': `nzDirection === 'left'`,
                        '[class.nz-resizable-handle-topRight]': `nzDirection === 'topRight'`,
                        '[class.nz-resizable-handle-bottomRight]': `nzDirection === 'bottomRight'`,
                        '[class.nz-resizable-handle-bottomLeft]': `nzDirection === 'bottomLeft'`,
                        '[class.nz-resizable-handle-topLeft]': `nzDirection === 'topLeft'`,
                        '(mousedown)': 'onMousedown($event)',
                        '(touchstart)': 'onMousedown($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: NzResizableService }, { type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { nzDirection: [{
                type: Input
            }], nzMouseDown: [{
                type: Output
            }] } });

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
NzResizeHandlesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeHandlesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzResizeHandlesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzResizeHandlesComponent, selector: "nz-resize-handles", inputs: { nzDirections: "nzDirections" }, exportAs: ["nzResizeHandles"], usesOnChanges: true, ngImport: i0, template: ` <nz-resize-handle *ngFor="let dir of directions" [nzDirection]="dir"></nz-resize-handle> `, isInline: true, components: [{ type: NzResizeHandleComponent, selector: "nz-resize-handle, [nz-resize-handle]", inputs: ["nzDirection"], outputs: ["nzMouseDown"], exportAs: ["nzResizeHandle"] }], directives: [{ type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeHandlesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-resize-handles',
                    exportAs: 'nzResizeHandles',
                    template: ` <nz-resize-handle *ngFor="let dir of directions" [nzDirection]="dir"></nz-resize-handle> `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzDirections: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzResizableModule {
}
NzResizableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzResizableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableModule, declarations: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent], imports: [CommonModule], exports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent] });
NzResizableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent],
                    exports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DEFAULT_RESIZE_DIRECTION, NzResizableDirective, NzResizableModule, NzResizableService, NzResizeHandleComponent, NzResizeHandleMouseDownEvent, NzResizeHandlesComponent, getEventWithPoint };
//# sourceMappingURL=ng-zorro-antd-resizable.mjs.map
