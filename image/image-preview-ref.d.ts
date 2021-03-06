import { OverlayRef } from '@angular/cdk/overlay';
import { NzImagePreviewOptions } from './image-preview-options';
import { NzImagePreviewComponent } from './image-preview.component';
export declare class NzImagePreviewRef {
    previewInstance: NzImagePreviewComponent;
    private config;
    private overlayRef;
    constructor(previewInstance: NzImagePreviewComponent, config: NzImagePreviewOptions, overlayRef: OverlayRef);
    switchTo(index: number): void;
    next(): void;
    prev(): void;
    close(): void;
    private dispose;
}
