import { __decorate } from 'tslib';
import * as i4 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, Injector, Injectable, Optional, Directive, Inject, Input, NgModule } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { isNotNil, InputBoolean } from 'ng-zorro-antd/core/util';
import * as i3 from '@angular/cdk/overlay';
import { OverlayRef, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { fadeMotion } from 'ng-zorro-antd/core/animation';
import * as i5 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i6 from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as i3$1 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const FADE_CLASS_NAME_MAP = {
    enter: 'ant-fade-enter',
    enterActive: 'ant-fade-enter-active',
    leave: 'ant-fade-leave',
    leaveActive: 'ant-fade-leave-active'
};
const IMAGE_PREVIEW_MASK_CLASS_NAME = 'ant-image-preview-mask';
const NZ_CONFIG_MODULE_NAME$1 = 'image';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzImagePreviewOptions {
    constructor() {
        this.nzKeyboard = true;
        this.nzNoAnimation = false;
        this.nzMaskClosable = true;
        this.nzCloseOnNavigation = true;
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzImagePreviewRef {
    constructor(previewInstance, config, overlayRef) {
        this.previewInstance = previewInstance;
        this.config = config;
        this.overlayRef = overlayRef;
        this.destroy$ = new Subject();
        overlayRef
            .keydownEvents()
            .pipe(filter(event => this.config.nzKeyboard && event.keyCode === ESCAPE && !hasModifierKey(event)))
            .subscribe(event => {
            event.preventDefault();
            this.close();
        });
        overlayRef.detachments().subscribe(() => {
            this.overlayRef.dispose();
        });
        previewInstance.containerClick.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
            this.close();
        });
        previewInstance.closeClick.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
            this.close();
        });
        previewInstance.animationStateChanged
            .pipe(filter(event => event.phaseName === 'done' && event.toState === 'leave'), take(1))
            .subscribe(() => {
            this.dispose();
        });
    }
    switchTo(index) {
        this.previewInstance.switchTo(index);
    }
    next() {
        this.previewInstance.next();
    }
    prev() {
        this.previewInstance.prev();
    }
    close() {
        this.previewInstance.startLeaveAnimation();
    }
    dispose() {
        this.destroy$.next();
        this.overlayRef.dispose();
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * fit content details: https://github.com/NG-ZORRO/ng-zorro-antd/pull/6154#issuecomment-745025554
 *
 * calc position x,y point
 *
 * CASE (width <= clientWidth && height <= clientHeight):
 *
 * ------------- clientWidth -------------
 * |                                     |
 * |        ------ width ------          |
 * |        |                 |          |
 * |        |                 |          |
 * client   height            |          |
 * Height   |                 |          |
 * |        |                 |          |
 * |        -------------------          |
 * |                                     |
 * |                                     |
 * ---------------------------------------
 * fixedPosition = { x: 0, y: 0 }
 *
 *
 *
 * CASE (width > clientWidth || height > clientHeight):
 *
 * ------------- clientWidth -------------
 * |        |                            |
 * |        top                          |
 * |        |                            |
 * |--left--|--------------- width -----------------
 * |        |                                      |
 * client   |                                      |
 * Height   |                                      |
 * |        |                                      |
 * |        |                                      |
 * |        height                                 |
 * |        |                                      |
 * ---------|                                      |
 *          |                                      |
 *          |                                      |
 *          |                                      |
 *          ----------------------------------------
 *
 *
 * - left || top > 0
 *   left -> 0 || top -> 0
 *
 * - (left + width) < clientWidth || (top + height) < clientHeight
 * - left | top + width | height < clientWidth | clientHeight -> Back left | top + width | height === clientWidth | clientHeight
 *
 * DEFAULT:
 * - hold position
 *
 */
function getFitContentPosition(params) {
    let fixPos = {};
    if (params.width <= params.clientWidth && params.height <= params.clientHeight) {
        fixPos = {
            x: 0,
            y: 0
        };
    }
    if (params.width > params.clientWidth || params.height > params.clientHeight) {
        fixPos = {
            x: fitPoint(params.left, params.width, params.clientWidth),
            y: fitPoint(params.top, params.height, params.clientHeight)
        };
    }
    return fixPos;
}
function getOffset(node) {
    const box = node.getBoundingClientRect();
    const docElem = document.documentElement;
    // use docElem.scrollLeft to support IE
    return {
        left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
        top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
    };
}
function getClientSize() {
    const width = document.documentElement.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight;
    return {
        width,
        height
    };
}
function fitPoint(start, size, clientSize) {
    const startAddSize = start + size;
    const offsetStart = (size - clientSize) / 2;
    let distance = null;
    if (size > clientSize) {
        if (start > 0) {
            distance = offsetStart;
        }
        if (start < 0 && startAddSize < clientSize) {
            distance = -offsetStart;
        }
    }
    else {
        if (start < 0 || startAddSize > clientSize) {
            distance = start < 0 ? offsetStart : -offsetStart;
        }
    }
    return distance;
}

const initialPosition = {
    x: 0,
    y: 0
};
class NzImagePreviewComponent {
    constructor(cdr, nzConfigService, config, overlayRef) {
        var _a, _b;
        this.cdr = cdr;
        this.nzConfigService = nzConfigService;
        this.config = config;
        this.overlayRef = overlayRef;
        this.images = [];
        this.index = 0;
        this.isDragging = false;
        this.visible = true;
        this.animationState = 'enter';
        this.animationStateChanged = new EventEmitter();
        this.previewImageTransform = '';
        this.previewImageWrapperTransform = '';
        this.operations = [
            {
                icon: 'close',
                onClick: () => {
                    this.onClose();
                },
                type: 'close'
            },
            {
                icon: 'zoom-in',
                onClick: () => {
                    this.onZoomIn();
                },
                type: 'zoomIn'
            },
            {
                icon: 'zoom-out',
                onClick: () => {
                    this.onZoomOut();
                },
                type: 'zoomOut'
            },
            {
                icon: 'rotate-right',
                onClick: () => {
                    this.onRotateRight();
                },
                type: 'rotateRight'
            },
            {
                icon: 'rotate-left',
                onClick: () => {
                    this.onRotateLeft();
                },
                type: 'rotateLeft'
            }
        ];
        this.zoomOutDisabled = false;
        this.position = Object.assign({}, initialPosition);
        this.containerClick = new EventEmitter();
        this.closeClick = new EventEmitter();
        this.destroy$ = new Subject();
        this.zoom = (_a = this.config.nzZoom) !== null && _a !== void 0 ? _a : 1;
        this.rotate = (_b = this.config.nzRotate) !== null && _b !== void 0 ? _b : 0;
        this.updateZoomOutDisabled();
        this.updatePreviewImageTransform();
        this.updatePreviewImageWrapperTransform();
    }
    get animationDisabled() {
        var _a;
        return (_a = this.config.nzNoAnimation) !== null && _a !== void 0 ? _a : false;
    }
    get maskClosable() {
        var _a, _b;
        const defaultConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME$1) || {};
        return (_b = (_a = this.config.nzMaskClosable) !== null && _a !== void 0 ? _a : defaultConfig.nzMaskClosable) !== null && _b !== void 0 ? _b : true;
    }
    setImages(images) {
        this.images = images;
        this.cdr.markForCheck();
    }
    switchTo(index) {
        this.index = index;
        this.cdr.markForCheck();
    }
    next() {
        if (this.index < this.images.length - 1) {
            this.reset();
            this.index++;
            this.updatePreviewImageTransform();
            this.updatePreviewImageWrapperTransform();
            this.updateZoomOutDisabled();
            this.cdr.markForCheck();
        }
    }
    prev() {
        if (this.index > 0) {
            this.reset();
            this.index--;
            this.updatePreviewImageTransform();
            this.updatePreviewImageWrapperTransform();
            this.updateZoomOutDisabled();
            this.cdr.markForCheck();
        }
    }
    markForCheck() {
        this.cdr.markForCheck();
    }
    onClose() {
        this.closeClick.emit();
    }
    onZoomIn() {
        this.zoom += 1;
        this.updatePreviewImageTransform();
        this.updateZoomOutDisabled();
        this.position = Object.assign({}, initialPosition);
    }
    onZoomOut() {
        if (this.zoom > 1) {
            this.zoom -= 1;
            this.updatePreviewImageTransform();
            this.updateZoomOutDisabled();
            this.position = Object.assign({}, initialPosition);
        }
    }
    onRotateRight() {
        this.rotate += 90;
        this.updatePreviewImageTransform();
    }
    onRotateLeft() {
        this.rotate -= 90;
        this.updatePreviewImageTransform();
    }
    onSwitchLeft(event) {
        event.preventDefault();
        event.stopPropagation();
        this.prev();
    }
    onSwitchRight(event) {
        event.preventDefault();
        event.stopPropagation();
        this.next();
    }
    onContainerClick(e) {
        if (e.target === e.currentTarget && this.maskClosable) {
            this.containerClick.emit();
        }
    }
    onAnimationStart(event) {
        if (event.toState === 'enter') {
            this.setEnterAnimationClass();
        }
        else if (event.toState === 'leave') {
            this.setLeaveAnimationClass();
        }
        this.animationStateChanged.emit(event);
    }
    onAnimationDone(event) {
        if (event.toState === 'enter') {
            this.setEnterAnimationClass();
        }
        else if (event.toState === 'leave') {
            this.setLeaveAnimationClass();
        }
        this.animationStateChanged.emit(event);
    }
    startLeaveAnimation() {
        this.animationState = 'leave';
        this.cdr.markForCheck();
    }
    onDragStarted() {
        this.isDragging = true;
    }
    onDragReleased() {
        this.isDragging = false;
        const width = this.imageRef.nativeElement.offsetWidth * this.zoom;
        const height = this.imageRef.nativeElement.offsetHeight * this.zoom;
        const { left, top } = getOffset(this.imageRef.nativeElement);
        const { width: clientWidth, height: clientHeight } = getClientSize();
        const isRotate = this.rotate % 180 !== 0;
        const fitContentParams = {
            width: isRotate ? height : width,
            height: isRotate ? width : height,
            left,
            top,
            clientWidth,
            clientHeight
        };
        const fitContentPos = getFitContentPosition(fitContentParams);
        if (isNotNil(fitContentPos.x) || isNotNil(fitContentPos.y)) {
            this.position = Object.assign(Object.assign({}, this.position), fitContentPos);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    updatePreviewImageTransform() {
        this.previewImageTransform = `scale3d(${this.zoom}, ${this.zoom}, 1) rotate(${this.rotate}deg)`;
    }
    updatePreviewImageWrapperTransform() {
        this.previewImageWrapperTransform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
    }
    updateZoomOutDisabled() {
        this.zoomOutDisabled = this.zoom <= 1;
    }
    setEnterAnimationClass() {
        if (this.animationDisabled) {
            return;
        }
        const backdropElement = this.overlayRef.backdropElement;
        if (backdropElement) {
            backdropElement.classList.add(FADE_CLASS_NAME_MAP.enter);
            backdropElement.classList.add(FADE_CLASS_NAME_MAP.enterActive);
        }
    }
    setLeaveAnimationClass() {
        if (this.animationDisabled) {
            return;
        }
        const backdropElement = this.overlayRef.backdropElement;
        if (backdropElement) {
            backdropElement.classList.add(FADE_CLASS_NAME_MAP.leave);
            backdropElement.classList.add(FADE_CLASS_NAME_MAP.leaveActive);
        }
    }
    reset() {
        this.zoom = 1;
        this.rotate = 0;
        this.position = Object.assign({}, initialPosition);
    }
}
NzImagePreviewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImagePreviewComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NzConfigService }, { token: NzImagePreviewOptions }, { token: i3.OverlayRef }], target: i0.ɵɵFactoryTarget.Component });
NzImagePreviewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzImagePreviewComponent, selector: "nz-image-preview", host: { attributes: { "tabindex": "-1", "role": "document" }, listeners: { "@fadeMotion.start": "onAnimationStart($event)", "@fadeMotion.done": "onAnimationDone($event)", "click": "onContainerClick($event)" }, properties: { "class.ant-image-preview-moving": "isDragging", "style.zIndex": "config.nzZIndex", "@.disabled": "config.nzNoAnimation", "@fadeMotion": "animationState" }, classAttribute: "ant-image-preview-wrap" }, viewQueries: [{ propertyName: "imageRef", first: true, predicate: ["imgRef"], descendants: true }], exportAs: ["nzImagePreview"], ngImport: i0, template: `
    <div class="ant-image-preview">
      <div tabindex="0" aria-hidden="true" style="width: 0; height: 0; overflow: hidden; outline: none;"></div>
      <div class="ant-image-preview-content">
        <div class="ant-image-preview-body">
          <ul class="ant-image-preview-operations">
            <li
              class="ant-image-preview-operations-operation"
              [class.ant-image-preview-operations-operation-disabled]="zoomOutDisabled && option.type === 'zoomOut'"
              (click)="option.onClick()"
              *ngFor="let option of operations"
            >
              <span class="ant-image-preview-operations-icon" nz-icon [nzType]="option.icon" nzTheme="outline"></span>
            </li>
          </ul>
          <div
            class="ant-image-preview-img-wrapper"
            cdkDrag
            [style.transform]="previewImageWrapperTransform"
            [cdkDragFreeDragPosition]="position"
            (mousedown)="onDragStarted()"
            (cdkDragReleased)="onDragReleased()"
          >
            <ng-container *ngFor="let image of images; index as imageIndex">
              <img
                cdkDragHandle
                class="ant-image-preview-img"
                #imgRef
                *ngIf="index === imageIndex"
                [attr.src]="image.src"
                [attr.srcset]="image.srcset"
                [attr.alt]="image.alt"
                [style.width]="image.width"
                [style.height]="image.height"
                [style.transform]="previewImageTransform"
              />
            </ng-container>
          </div>
          <ng-container *ngIf="images.length > 1">
            <div
              class="ant-image-preview-switch-left"
              [class.ant-image-preview-switch-left-disabled]="index <= 0"
              (click)="onSwitchLeft($event)"
            >
              <span nz-icon nzType="left" nzTheme="outline"></span>
            </div>
            <div
              class="ant-image-preview-switch-right"
              [class.ant-image-preview-switch-right-disabled]="index >= images.length - 1"
              (click)="onSwitchRight($event)"
            >
              <span nz-icon nzType="right" nzTheme="outline"></span>
            </div>
          </ng-container>
        </div>
      </div>
      <div tabindex="0" aria-hidden="true" style="width: 0; height: 0; overflow: hidden; outline: none;"></div>
    </div>
  `, isInline: true, directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i6.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }], animations: [fadeMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImagePreviewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-image-preview',
                    exportAs: 'nzImagePreview',
                    animations: [fadeMotion],
                    template: `
    <div class="ant-image-preview">
      <div tabindex="0" aria-hidden="true" style="width: 0; height: 0; overflow: hidden; outline: none;"></div>
      <div class="ant-image-preview-content">
        <div class="ant-image-preview-body">
          <ul class="ant-image-preview-operations">
            <li
              class="ant-image-preview-operations-operation"
              [class.ant-image-preview-operations-operation-disabled]="zoomOutDisabled && option.type === 'zoomOut'"
              (click)="option.onClick()"
              *ngFor="let option of operations"
            >
              <span class="ant-image-preview-operations-icon" nz-icon [nzType]="option.icon" nzTheme="outline"></span>
            </li>
          </ul>
          <div
            class="ant-image-preview-img-wrapper"
            cdkDrag
            [style.transform]="previewImageWrapperTransform"
            [cdkDragFreeDragPosition]="position"
            (mousedown)="onDragStarted()"
            (cdkDragReleased)="onDragReleased()"
          >
            <ng-container *ngFor="let image of images; index as imageIndex">
              <img
                cdkDragHandle
                class="ant-image-preview-img"
                #imgRef
                *ngIf="index === imageIndex"
                [attr.src]="image.src"
                [attr.srcset]="image.srcset"
                [attr.alt]="image.alt"
                [style.width]="image.width"
                [style.height]="image.height"
                [style.transform]="previewImageTransform"
              />
            </ng-container>
          </div>
          <ng-container *ngIf="images.length > 1">
            <div
              class="ant-image-preview-switch-left"
              [class.ant-image-preview-switch-left-disabled]="index <= 0"
              (click)="onSwitchLeft($event)"
            >
              <span nz-icon nzType="left" nzTheme="outline"></span>
            </div>
            <div
              class="ant-image-preview-switch-right"
              [class.ant-image-preview-switch-right-disabled]="index >= images.length - 1"
              (click)="onSwitchRight($event)"
            >
              <span nz-icon nzType="right" nzTheme="outline"></span>
            </div>
          </ng-container>
        </div>
      </div>
      <div tabindex="0" aria-hidden="true" style="width: 0; height: 0; overflow: hidden; outline: none;"></div>
    </div>
  `,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'ant-image-preview-wrap',
                        '[class.ant-image-preview-moving]': 'isDragging',
                        '[style.zIndex]': 'config.nzZIndex',
                        '[@.disabled]': 'config.nzNoAnimation',
                        '[@fadeMotion]': 'animationState',
                        '(@fadeMotion.start)': 'onAnimationStart($event)',
                        '(@fadeMotion.done)': 'onAnimationDone($event)',
                        '(click)': 'onContainerClick($event)',
                        tabindex: '-1',
                        role: 'document'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NzConfigService }, { type: NzImagePreviewOptions }, { type: i3.OverlayRef }]; }, propDecorators: { imageRef: [{
                type: ViewChild,
                args: ['imgRef']
            }] } });

class NzImageService {
    constructor(overlay, injector, nzConfigService, directionality) {
        this.overlay = overlay;
        this.injector = injector;
        this.nzConfigService = nzConfigService;
        this.directionality = directionality;
    }
    preview(images, options) {
        return this.display(images, options);
    }
    display(images, config) {
        const configMerged = Object.assign(Object.assign({}, new NzImagePreviewOptions()), (config !== null && config !== void 0 ? config : {}));
        const overlayRef = this.createOverlay(configMerged);
        const previewComponent = this.attachPreviewComponent(overlayRef, configMerged);
        previewComponent.setImages(images);
        const previewRef = new NzImagePreviewRef(previewComponent, configMerged, overlayRef);
        previewComponent.previewRef = previewRef;
        return previewRef;
    }
    attachPreviewComponent(overlayRef, config) {
        const injector = Injector.create({
            parent: this.injector,
            providers: [
                { provide: OverlayRef, useValue: overlayRef },
                { provide: NzImagePreviewOptions, useValue: config }
            ]
        });
        const containerPortal = new ComponentPortal(NzImagePreviewComponent, null, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    createOverlay(config) {
        var _a, _b;
        const globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME$1) || {};
        const overLayConfig = new OverlayConfig({
            hasBackdrop: true,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position().global(),
            disposeOnNavigation: (_b = (_a = config.nzCloseOnNavigation) !== null && _a !== void 0 ? _a : globalConfig.nzCloseOnNavigation) !== null && _b !== void 0 ? _b : true,
            backdropClass: IMAGE_PREVIEW_MASK_CLASS_NAME,
            direction: config.nzDirection || globalConfig.nzDirection || this.directionality.value
        });
        return this.overlay.create(overLayConfig);
    }
}
NzImageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageService, deps: [{ token: i3.Overlay }, { token: i0.Injector }, { token: i1.NzConfigService }, { token: i3$1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
NzImageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageService, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: i3.Overlay }, { type: i0.Injector }, { type: i1.NzConfigService }, { type: i3$1.Directionality, decorators: [{
                        type: Optional
                    }] }];
    } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzImageGroupComponent {
    constructor() {
        this.images = [];
    }
    addImage(image) {
        this.images.push(image);
    }
}
NzImageGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzImageGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzImageGroupComponent, selector: "nz-image-group", exportAs: ["nzImageGroup"], ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-image-group',
                    exportAs: 'nzImageGroup',
                    template: '<ng-content></ng-content>',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }] });

const NZ_CONFIG_MODULE_NAME = 'image';
class NzImageDirective {
    constructor(document, nzConfigService, elementRef, nzImageService, cdr, parentGroup, directionality) {
        this.document = document;
        this.nzConfigService = nzConfigService;
        this.elementRef = elementRef;
        this.nzImageService = nzImageService;
        this.cdr = cdr;
        this.parentGroup = parentGroup;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzSrc = '';
        this.nzSrcset = '';
        this.nzDisablePreview = false;
        this.nzFallback = null;
        this.nzPlaceholder = null;
        this.status = 'normal';
        this.backLoadDestroy$ = new Subject();
        this.destroy$ = new Subject();
    }
    get previewable() {
        return !this.nzDisablePreview && this.status !== 'error';
    }
    ngOnInit() {
        var _a;
        this.backLoad();
        if (this.parentGroup) {
            this.parentGroup.addImage(this);
        }
        if (this.directionality) {
            (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                this.dir = direction;
                this.cdr.detectChanges();
            });
            this.dir = this.directionality.value;
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    onPreview() {
        if (!this.previewable) {
            return;
        }
        if (this.parentGroup) {
            // preview inside image group
            const previewAbleImages = this.parentGroup.images.filter(e => e.previewable);
            const previewImages = previewAbleImages.map(e => ({ src: e.nzSrc, srcset: e.nzSrcset }));
            const previewIndex = previewAbleImages.findIndex(el => this === el);
            const previewRef = this.nzImageService.preview(previewImages, { nzDirection: this.dir });
            previewRef.switchTo(previewIndex);
        }
        else {
            // preview not inside image group
            const previewImages = [{ src: this.nzSrc, srcset: this.nzSrcset }];
            this.nzImageService.preview(previewImages, { nzDirection: this.dir });
        }
    }
    getElement() {
        return this.elementRef;
    }
    ngOnChanges(changes) {
        const { nzSrc } = changes;
        if (nzSrc) {
            this.getElement().nativeElement.src = nzSrc.currentValue;
            this.backLoad();
        }
    }
    /**
     * use internal Image object handle fallback & placeholder
     *
     * @private
     */
    backLoad() {
        this.backLoadImage = this.document.createElement('img');
        this.backLoadImage.src = this.nzSrc;
        this.backLoadImage.srcset = this.nzSrcset;
        this.status = 'loading';
        // unsubscribe last backLoad
        this.backLoadDestroy$.next();
        this.backLoadDestroy$.complete();
        this.backLoadDestroy$ = new Subject();
        if (this.backLoadImage.complete) {
            this.status = 'normal';
            this.getElement().nativeElement.src = this.nzSrc;
            this.getElement().nativeElement.srcset = this.nzSrcset;
        }
        else {
            if (this.nzPlaceholder) {
                this.getElement().nativeElement.src = this.nzPlaceholder;
                this.getElement().nativeElement.srcset = '';
            }
            else {
                this.getElement().nativeElement.src = this.nzSrc;
                this.getElement().nativeElement.srcset = this.nzSrcset;
            }
            // The `nz-image` directive can be destroyed before the `load` or `error` event is dispatched,
            // so there's no sense to keep capturing `this`.
            fromEvent(this.backLoadImage, 'load')
                .pipe(takeUntil(this.backLoadDestroy$), takeUntil(this.destroy$))
                .subscribe(() => {
                this.status = 'normal';
                this.getElement().nativeElement.src = this.nzSrc;
                this.getElement().nativeElement.srcset = this.nzSrcset;
            });
            fromEvent(this.backLoadImage, 'error')
                .pipe(takeUntil(this.backLoadDestroy$), takeUntil(this.destroy$))
                .subscribe(() => {
                this.status = 'error';
                if (this.nzFallback) {
                    this.getElement().nativeElement.src = this.nzFallback;
                    this.getElement().nativeElement.srcset = '';
                }
            });
        }
    }
}
NzImageDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageDirective, deps: [{ token: DOCUMENT }, { token: i1.NzConfigService }, { token: i0.ElementRef }, { token: NzImageService }, { token: i0.ChangeDetectorRef }, { token: NzImageGroupComponent, optional: true }, { token: i3$1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzImageDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzImageDirective, selector: "img[nz-image]", inputs: { nzSrc: "nzSrc", nzSrcset: "nzSrcset", nzDisablePreview: "nzDisablePreview", nzFallback: "nzFallback", nzPlaceholder: "nzPlaceholder" }, host: { listeners: { "click": "onPreview()" } }, exportAs: ["nzImage"], usesOnChanges: true, ngImport: i0 });
__decorate([
    InputBoolean(),
    WithConfig()
], NzImageDirective.prototype, "nzDisablePreview", void 0);
__decorate([
    WithConfig()
], NzImageDirective.prototype, "nzFallback", void 0);
__decorate([
    WithConfig()
], NzImageDirective.prototype, "nzPlaceholder", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'img[nz-image]',
                    exportAs: 'nzImage',
                    host: {
                        '(click)': 'onPreview()'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: i1.NzConfigService }, { type: i0.ElementRef }, { type: NzImageService }, { type: i0.ChangeDetectorRef }, { type: NzImageGroupComponent, decorators: [{
                        type: Optional
                    }] }, { type: i3$1.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzSrc: [{
                type: Input
            }], nzSrcset: [{
                type: Input
            }], nzDisablePreview: [{
                type: Input
            }], nzFallback: [{
                type: Input
            }], nzPlaceholder: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzImageModule {
}
NzImageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzImageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, declarations: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent], imports: [BidiModule, OverlayModule, PortalModule, DragDropModule, CommonModule, NzIconModule, NzPipesModule], exports: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent] });
NzImageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, providers: [NzImageService], imports: [[BidiModule, OverlayModule, PortalModule, DragDropModule, CommonModule, NzIconModule, NzPipesModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, OverlayModule, PortalModule, DragDropModule, CommonModule, NzIconModule, NzPipesModule],
                    exports: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent],
                    providers: [NzImageService],
                    entryComponents: [NzImagePreviewComponent],
                    declarations: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FADE_CLASS_NAME_MAP, IMAGE_PREVIEW_MASK_CLASS_NAME, NZ_CONFIG_MODULE_NAME$1 as NZ_CONFIG_MODULE_NAME, NzImageDirective, NzImageGroupComponent, NzImageModule, NzImagePreviewComponent, NzImagePreviewOptions, NzImagePreviewRef, NzImageService, getClientSize, getFitContentPosition, getOffset };
//# sourceMappingURL=ng-zorro-antd-image.mjs.map
