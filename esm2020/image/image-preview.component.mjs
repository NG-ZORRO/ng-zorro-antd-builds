import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { fadeMotion } from 'ng-zorro-antd/core/animation';
import { isNotNil } from 'ng-zorro-antd/core/util';
import { FADE_CLASS_NAME_MAP, NZ_CONFIG_MODULE_NAME } from './image-config';
import { getClientSize, getFitContentPosition, getOffset } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "./image-preview-options";
import * as i3 from "@angular/cdk/overlay";
import * as i4 from "@angular/common";
import * as i5 from "ng-zorro-antd/icon";
import * as i6 from "@angular/cdk/drag-drop";
const initialPosition = {
    x: 0,
    y: 0
};
export class NzImagePreviewComponent {
    constructor(cdr, nzConfigService, config, overlayRef) {
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
        this.position = { ...initialPosition };
        this.containerClick = new EventEmitter();
        this.closeClick = new EventEmitter();
        this.destroy$ = new Subject();
        this.zoom = this.config.nzZoom ?? 1;
        this.rotate = this.config.nzRotate ?? 0;
        this.updateZoomOutDisabled();
        this.updatePreviewImageTransform();
        this.updatePreviewImageWrapperTransform();
    }
    get animationDisabled() {
        return this.config.nzNoAnimation ?? false;
    }
    get maskClosable() {
        const defaultConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME) || {};
        return this.config.nzMaskClosable ?? defaultConfig.nzMaskClosable ?? true;
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
        this.position = { ...initialPosition };
    }
    onZoomOut() {
        if (this.zoom > 1) {
            this.zoom -= 1;
            this.updatePreviewImageTransform();
            this.updateZoomOutDisabled();
            this.position = { ...initialPosition };
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
            this.position = { ...this.position, ...fitContentPos };
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
        this.position = { ...initialPosition };
    }
}
NzImagePreviewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImagePreviewComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NzConfigService }, { token: i2.NzImagePreviewOptions }, { token: i3.OverlayRef }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NzConfigService }, { type: i2.NzImagePreviewOptions }, { type: i3.OverlayRef }]; }, propDecorators: { imageRef: [{
                type: ViewChild,
                args: ['imgRef']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtcHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2ltYWdlL2ltYWdlLXByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULFlBQVksRUFFWixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc1RSxPQUFPLEVBQUUsYUFBYSxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7Ozs7QUFTMUUsTUFBTSxlQUFlLEdBQUc7SUFDdEIsQ0FBQyxFQUFFLENBQUM7SUFDSixDQUFDLEVBQUUsQ0FBQztDQUNMLENBQUM7QUFpRkYsTUFBTSxPQUFPLHVCQUF1QjtJQXFFbEMsWUFDVSxHQUFzQixFQUN2QixlQUFnQyxFQUNoQyxNQUE2QixFQUM1QixVQUFzQjtRQUh0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN2QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFDNUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQXhFaEMsV0FBTSxHQUFjLEVBQUUsQ0FBQztRQUN2QixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsbUJBQWMsR0FBK0IsT0FBTyxDQUFDO1FBQ3JELDBCQUFxQixHQUFH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QUFFLHdCQUF3Qjt3QkFDL0Isa0NBQWtDLEVBQUUsWUFBWTt3QkFDaEQsZ0JBQWdCLEVBQUUsaUJBQWlCO3dCQUNuQyxjQUFjLEVBQUUsc0JBQXNCO3dCQUN0QyxlQUFlLEVBQUUsZ0JBQWdCO3dCQUNqQyxxQkFBcUIsRUFBRSwwQkFBMEI7d0JBQ2pELG9CQUFvQixFQUFFLHlCQUF5Qjt3QkFDL0MsU0FBUyxFQUFFLDBCQUEwQjt3QkFDckMsUUFBUSxFQUFFLElBQUk7d0JBQ2QsSUFBSSxFQUFFLFVBQVU7cUJBQ2pCO2lCQUNGO21NQXVEc0IsUUFBUTtzQkFBNUIsU0FBUzt1QkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IGZhZGVNb3Rpb24gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvYW5pbWF0aW9uJztcbmltcG9ydCB7IE56Q29uZmlnU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IGlzTm90TmlsIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBGQURFX0NMQVNTX05BTUVfTUFQLCBOWl9DT05GSUdfTU9EVUxFX05BTUUgfSBmcm9tICcuL2ltYWdlLWNvbmZpZyc7XG5pbXBvcnQgeyBOekltYWdlLCBOekltYWdlUHJldmlld09wdGlvbnMgfSBmcm9tICcuL2ltYWdlLXByZXZpZXctb3B0aW9ucyc7XG5pbXBvcnQgeyBOekltYWdlUHJldmlld1JlZiB9IGZyb20gJy4vaW1hZ2UtcHJldmlldy1yZWYnO1xuaW1wb3J0IHsgZ2V0Q2xpZW50U2l6ZSwgZ2V0Rml0Q29udGVudFBvc2l0aW9uLCBnZXRPZmZzZXQgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBOekltYWdlQ29udGFpbmVyT3BlcmF0aW9uIHtcbiAgaWNvbjogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG5cbiAgb25DbGljaygpOiB2b2lkO1xufVxuXG5jb25zdCBpbml0aWFsUG9zaXRpb24gPSB7XG4gIHg6IDAsXG4gIHk6IDBcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWltYWdlLXByZXZpZXcnLFxuICBleHBvcnRBczogJ256SW1hZ2VQcmV2aWV3JyxcbiAgYW5pbWF0aW9uczogW2ZhZGVNb3Rpb25dLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJhbnQtaW1hZ2UtcHJldmlld1wiPlxuICAgICAgPGRpdiB0YWJpbmRleD1cIjBcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBzdHlsZT1cIndpZHRoOiAwOyBoZWlnaHQ6IDA7IG92ZXJmbG93OiBoaWRkZW47IG91dGxpbmU6IG5vbmU7XCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LWltYWdlLXByZXZpZXctY29udGVudFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LWltYWdlLXByZXZpZXctYm9keVwiPlxuICAgICAgICAgIDx1bCBjbGFzcz1cImFudC1pbWFnZS1wcmV2aWV3LW9wZXJhdGlvbnNcIj5cbiAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICBjbGFzcz1cImFudC1pbWFnZS1wcmV2aWV3LW9wZXJhdGlvbnMtb3BlcmF0aW9uXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmFudC1pbWFnZS1wcmV2aWV3LW9wZXJhdGlvbnMtb3BlcmF0aW9uLWRpc2FibGVkXT1cInpvb21PdXREaXNhYmxlZCAmJiBvcHRpb24udHlwZSA9PT0gJ3pvb21PdXQnXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wdGlvbi5vbkNsaWNrKClcIlxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wZXJhdGlvbnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFudC1pbWFnZS1wcmV2aWV3LW9wZXJhdGlvbnMtaWNvblwiIG56LWljb24gW256VHlwZV09XCJvcHRpb24uaWNvblwiIG56VGhlbWU9XCJvdXRsaW5lXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiYW50LWltYWdlLXByZXZpZXctaW1nLXdyYXBwZXJcIlxuICAgICAgICAgICAgY2RrRHJhZ1xuICAgICAgICAgICAgW3N0eWxlLnRyYW5zZm9ybV09XCJwcmV2aWV3SW1hZ2VXcmFwcGVyVHJhbnNmb3JtXCJcbiAgICAgICAgICAgIFtjZGtEcmFnRnJlZURyYWdQb3NpdGlvbl09XCJwb3NpdGlvblwiXG4gICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uRHJhZ1N0YXJ0ZWQoKVwiXG4gICAgICAgICAgICAoY2RrRHJhZ1JlbGVhc2VkKT1cIm9uRHJhZ1JlbGVhc2VkKClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGltYWdlIG9mIGltYWdlczsgaW5kZXggYXMgaW1hZ2VJbmRleFwiPlxuICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgY2RrRHJhZ0hhbmRsZVxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYW50LWltYWdlLXByZXZpZXctaW1nXCJcbiAgICAgICAgICAgICAgICAjaW1nUmVmXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJpbmRleCA9PT0gaW1hZ2VJbmRleFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuc3JjXT1cImltYWdlLnNyY1wiXG4gICAgICAgICAgICAgICAgW2F0dHIuc3Jjc2V0XT1cImltYWdlLnNyY3NldFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYWx0XT1cImltYWdlLmFsdFwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cImltYWdlLndpZHRoXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUuaGVpZ2h0XT1cImltYWdlLmhlaWdodFwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLnRyYW5zZm9ybV09XCJwcmV2aWV3SW1hZ2VUcmFuc2Zvcm1cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImltYWdlcy5sZW5ndGggPiAxXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwiYW50LWltYWdlLXByZXZpZXctc3dpdGNoLWxlZnRcIlxuICAgICAgICAgICAgICBbY2xhc3MuYW50LWltYWdlLXByZXZpZXctc3dpdGNoLWxlZnQtZGlzYWJsZWRdPVwiaW5kZXggPD0gMFwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJvblN3aXRjaExlZnQoJGV2ZW50KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIG56LWljb24gbnpUeXBlPVwibGVmdFwiIG56VGhlbWU9XCJvdXRsaW5lXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwiYW50LWltYWdlLXByZXZpZXctc3dpdGNoLXJpZ2h0XCJcbiAgICAgICAgICAgICAgW2NsYXNzLmFudC1pbWFnZS1wcmV2aWV3LXN3aXRjaC1yaWdodC1kaXNhYmxlZF09XCJpbmRleCA+PSBpbWFnZXMubGVuZ3RoIC0gMVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJvblN3aXRjaFJpZ2h0KCRldmVudClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3BhbiBuei1pY29uIG56VHlwZT1cInJpZ2h0XCIgbnpUaGVtZT1cIm91dGxpbmVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgdGFiaW5kZXg9XCIwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgc3R5bGU9XCJ3aWR0aDogMDsgaGVpZ2h0OiAwOyBvdmVyZmxvdzogaGlkZGVuOyBvdXRsaW5lOiBub25lO1wiPjwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1pbWFnZS1wcmV2aWV3LXdyYXAnLFxuICAgICdbY2xhc3MuYW50LWltYWdlLXByZXZpZXctbW92aW5nXSc6ICdpc0RyYWdnaW5nJyxcbiAgICAnW3N0eWxlLnpJbmRleF0nOiAnY29uZmlnLm56WkluZGV4JyxcbiAgICAnW0AuZGlzYWJsZWRdJzogJ2NvbmZpZy5uek5vQW5pbWF0aW9uJyxcbiAgICAnW0BmYWRlTW90aW9uXSc6ICdhbmltYXRpb25TdGF0ZScsXG4gICAgJyhAZmFkZU1vdGlvbi5zdGFydCknOiAnb25BbmltYXRpb25TdGFydCgkZXZlbnQpJyxcbiAgICAnKEBmYWRlTW90aW9uLmRvbmUpJzogJ29uQW5pbWF0aW9uRG9uZSgkZXZlbnQpJyxcbiAgICAnKGNsaWNrKSc6ICdvbkNvbnRhaW5lckNsaWNrKCRldmVudCknLFxuICAgIHRhYmluZGV4OiAnLTEnLFxuICAgIHJvbGU6ICdkb2N1bWVudCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekltYWdlUHJldmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGltYWdlczogTnpJbWFnZVtdID0gW107XG4gIGluZGV4ID0gMDtcbiAgaXNEcmFnZ2luZyA9IGZhbHNlO1xuICB2aXNpYmxlID0gdHJ1ZTtcbiAgYW5pbWF0aW9uU3RhdGU6ICd2b2lkJyB8ICdlbnRlcicgfCAnbGVhdmUnID0gJ2VudGVyJztcbiAgYW5pbWF0aW9uU3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxBbmltYXRpb25FdmVudD4oKTtcblxuICBwcmV2aWV3SW1hZ2VUcmFuc2Zvcm0gPSAnJztcbiAgcHJldmlld0ltYWdlV3JhcHBlclRyYW5zZm9ybSA9ICcnO1xuICBvcGVyYXRpb25zOiBOekltYWdlQ29udGFpbmVyT3BlcmF0aW9uW10gPSBbXG4gICAge1xuICAgICAgaWNvbjogJ2Nsb3NlJyxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICB9LFxuICAgICAgdHlwZTogJ2Nsb3NlJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogJ3pvb20taW4nLFxuICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICB0aGlzLm9uWm9vbUluKCk7XG4gICAgICB9LFxuICAgICAgdHlwZTogJ3pvb21JbidcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246ICd6b29tLW91dCcsXG4gICAgICBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgIHRoaXMub25ab29tT3V0KCk7XG4gICAgICB9LFxuICAgICAgdHlwZTogJ3pvb21PdXQnXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiAncm90YXRlLXJpZ2h0JyxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgdGhpcy5vblJvdGF0ZVJpZ2h0KCk7XG4gICAgICB9LFxuICAgICAgdHlwZTogJ3JvdGF0ZVJpZ2h0J1xuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogJ3JvdGF0ZS1sZWZ0JyxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgdGhpcy5vblJvdGF0ZUxlZnQoKTtcbiAgICAgIH0sXG4gICAgICB0eXBlOiAncm90YXRlTGVmdCdcbiAgICB9XG4gIF07XG5cbiAgem9vbU91dERpc2FibGVkID0gZmFsc2U7XG4gIHBvc2l0aW9uID0geyAuLi5pbml0aWFsUG9zaXRpb24gfTtcbiAgcHJldmlld1JlZiE6IE56SW1hZ2VQcmV2aWV3UmVmO1xuICBjb250YWluZXJDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgY2xvc2VDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBAVmlld0NoaWxkKCdpbWdSZWYnKSBpbWFnZVJlZiE6IEVsZW1lbnRSZWY8SFRNTEltYWdlRWxlbWVudD47XG5cbiAgcHJpdmF0ZSB6b29tOiBudW1iZXI7XG4gIHByaXZhdGUgcm90YXRlOiBudW1iZXI7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGdldCBhbmltYXRpb25EaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcubnpOb0FuaW1hdGlvbiA/PyBmYWxzZTtcbiAgfVxuXG4gIGdldCBtYXNrQ2xvc2FibGUoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZzogTnpTYWZlQW55ID0gdGhpcy5uekNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnRm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSkgfHwge307XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm56TWFza0Nsb3NhYmxlID8/IGRlZmF1bHRDb25maWcubnpNYXNrQ2xvc2FibGUgPz8gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgcHVibGljIGNvbmZpZzogTnpJbWFnZVByZXZpZXdPcHRpb25zLFxuICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZlxuICApIHtcbiAgICB0aGlzLnpvb20gPSB0aGlzLmNvbmZpZy5uelpvb20gPz8gMTtcbiAgICB0aGlzLnJvdGF0ZSA9IHRoaXMuY29uZmlnLm56Um90YXRlID8/IDA7XG4gICAgdGhpcy51cGRhdGVab29tT3V0RGlzYWJsZWQoKTtcbiAgICB0aGlzLnVwZGF0ZVByZXZpZXdJbWFnZVRyYW5zZm9ybSgpO1xuICAgIHRoaXMudXBkYXRlUHJldmlld0ltYWdlV3JhcHBlclRyYW5zZm9ybSgpO1xuICB9XG5cbiAgc2V0SW1hZ2VzKGltYWdlczogTnpJbWFnZVtdKTogdm9pZCB7XG4gICAgdGhpcy5pbWFnZXMgPSBpbWFnZXM7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBzd2l0Y2hUbyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgbmV4dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgIHRoaXMudXBkYXRlUHJldmlld0ltYWdlVHJhbnNmb3JtKCk7XG4gICAgICB0aGlzLnVwZGF0ZVByZXZpZXdJbWFnZVdyYXBwZXJUcmFuc2Zvcm0oKTtcbiAgICAgIHRoaXMudXBkYXRlWm9vbU91dERpc2FibGVkKCk7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcmV2KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmluZGV4ID4gMCkge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgdGhpcy5pbmRleC0tO1xuICAgICAgdGhpcy51cGRhdGVQcmV2aWV3SW1hZ2VUcmFuc2Zvcm0oKTtcbiAgICAgIHRoaXMudXBkYXRlUHJldmlld0ltYWdlV3JhcHBlclRyYW5zZm9ybSgpO1xuICAgICAgdGhpcy51cGRhdGVab29tT3V0RGlzYWJsZWQoKTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG9uQ2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZUNsaWNrLmVtaXQoKTtcbiAgfVxuXG4gIG9uWm9vbUluKCk6IHZvaWQge1xuICAgIHRoaXMuem9vbSArPSAxO1xuICAgIHRoaXMudXBkYXRlUHJldmlld0ltYWdlVHJhbnNmb3JtKCk7XG4gICAgdGhpcy51cGRhdGVab29tT3V0RGlzYWJsZWQoKTtcbiAgICB0aGlzLnBvc2l0aW9uID0geyAuLi5pbml0aWFsUG9zaXRpb24gfTtcbiAgfVxuXG4gIG9uWm9vbU91dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy56b29tID4gMSkge1xuICAgICAgdGhpcy56b29tIC09IDE7XG4gICAgICB0aGlzLnVwZGF0ZVByZXZpZXdJbWFnZVRyYW5zZm9ybSgpO1xuICAgICAgdGhpcy51cGRhdGVab29tT3V0RGlzYWJsZWQoKTtcbiAgICAgIHRoaXMucG9zaXRpb24gPSB7IC4uLmluaXRpYWxQb3NpdGlvbiB9O1xuICAgIH1cbiAgfVxuXG4gIG9uUm90YXRlUmlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5yb3RhdGUgKz0gOTA7XG4gICAgdGhpcy51cGRhdGVQcmV2aWV3SW1hZ2VUcmFuc2Zvcm0oKTtcbiAgfVxuXG4gIG9uUm90YXRlTGVmdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJvdGF0ZSAtPSA5MDtcbiAgICB0aGlzLnVwZGF0ZVByZXZpZXdJbWFnZVRyYW5zZm9ybSgpO1xuICB9XG5cbiAgb25Td2l0Y2hMZWZ0KGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnByZXYoKTtcbiAgfVxuXG4gIG9uU3dpdGNoUmlnaHQoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMubmV4dCgpO1xuICB9XG5cbiAgb25Db250YWluZXJDbGljayhlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGUudGFyZ2V0ID09PSBlLmN1cnJlbnRUYXJnZXQgJiYgdGhpcy5tYXNrQ2xvc2FibGUpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyQ2xpY2suZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdlbnRlcicpIHtcbiAgICAgIHRoaXMuc2V0RW50ZXJBbmltYXRpb25DbGFzcygpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ2xlYXZlJykge1xuICAgICAgdGhpcy5zZXRMZWF2ZUFuaW1hdGlvbkNsYXNzKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XG4gIH1cblxuICBvbkFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdlbnRlcicpIHtcbiAgICAgIHRoaXMuc2V0RW50ZXJBbmltYXRpb25DbGFzcygpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ2xlYXZlJykge1xuICAgICAgdGhpcy5zZXRMZWF2ZUFuaW1hdGlvbkNsYXNzKCk7XG4gICAgfVxuICAgIHRoaXMuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgc3RhcnRMZWF2ZUFuaW1hdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gJ2xlYXZlJztcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG9uRHJhZ1N0YXJ0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgfVxuXG4gIG9uRHJhZ1JlbGVhc2VkKCk6IHZvaWQge1xuICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5pbWFnZVJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoICogdGhpcy56b29tO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuaW1hZ2VSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgKiB0aGlzLnpvb207XG4gICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IGdldE9mZnNldCh0aGlzLmltYWdlUmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGNvbnN0IHsgd2lkdGg6IGNsaWVudFdpZHRoLCBoZWlnaHQ6IGNsaWVudEhlaWdodCB9ID0gZ2V0Q2xpZW50U2l6ZSgpO1xuICAgIGNvbnN0IGlzUm90YXRlID0gdGhpcy5yb3RhdGUgJSAxODAgIT09IDA7XG4gICAgY29uc3QgZml0Q29udGVudFBhcmFtcyA9IHtcbiAgICAgIHdpZHRoOiBpc1JvdGF0ZSA/IGhlaWdodCA6IHdpZHRoLFxuICAgICAgaGVpZ2h0OiBpc1JvdGF0ZSA/IHdpZHRoIDogaGVpZ2h0LFxuICAgICAgbGVmdCxcbiAgICAgIHRvcCxcbiAgICAgIGNsaWVudFdpZHRoLFxuICAgICAgY2xpZW50SGVpZ2h0XG4gICAgfTtcbiAgICBjb25zdCBmaXRDb250ZW50UG9zID0gZ2V0Rml0Q29udGVudFBvc2l0aW9uKGZpdENvbnRlbnRQYXJhbXMpO1xuICAgIGlmIChpc05vdE5pbChmaXRDb250ZW50UG9zLngpIHx8IGlzTm90TmlsKGZpdENvbnRlbnRQb3MueSkpIHtcbiAgICAgIHRoaXMucG9zaXRpb24gPSB7IC4uLnRoaXMucG9zaXRpb24sIC4uLmZpdENvbnRlbnRQb3MgfTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVByZXZpZXdJbWFnZVRyYW5zZm9ybSgpOiB2b2lkIHtcbiAgICB0aGlzLnByZXZpZXdJbWFnZVRyYW5zZm9ybSA9IGBzY2FsZTNkKCR7dGhpcy56b29tfSwgJHt0aGlzLnpvb219LCAxKSByb3RhdGUoJHt0aGlzLnJvdGF0ZX1kZWcpYDtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUHJldmlld0ltYWdlV3JhcHBlclRyYW5zZm9ybSgpOiB2b2lkIHtcbiAgICB0aGlzLnByZXZpZXdJbWFnZVdyYXBwZXJUcmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt0aGlzLnBvc2l0aW9uLnh9cHgsICR7dGhpcy5wb3NpdGlvbi55fXB4LCAwKWA7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVpvb21PdXREaXNhYmxlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnpvb21PdXREaXNhYmxlZCA9IHRoaXMuem9vbSA8PSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRFbnRlckFuaW1hdGlvbkNsYXNzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFuaW1hdGlvbkRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGJhY2tkcm9wRWxlbWVudCA9IHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcEVsZW1lbnQ7XG4gICAgaWYgKGJhY2tkcm9wRWxlbWVudCkge1xuICAgICAgYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoRkFERV9DTEFTU19OQU1FX01BUC5lbnRlcik7XG4gICAgICBiYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChGQURFX0NMQVNTX05BTUVfTUFQLmVudGVyQWN0aXZlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldExlYXZlQW5pbWF0aW9uQ2xhc3MoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYmFja2Ryb3BFbGVtZW50ID0gdGhpcy5vdmVybGF5UmVmLmJhY2tkcm9wRWxlbWVudDtcbiAgICBpZiAoYmFja2Ryb3BFbGVtZW50KSB7XG4gICAgICBiYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChGQURFX0NMQVNTX05BTUVfTUFQLmxlYXZlKTtcbiAgICAgIGJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKEZBREVfQ0xBU1NfTkFNRV9NQVAubGVhdmVBY3RpdmUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy56b29tID0gMTtcbiAgICB0aGlzLnJvdGF0ZSA9IDA7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHsgLi4uaW5pdGlhbFBvc2l0aW9uIH07XG4gIH1cbn1cbiJdfQ==