/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, ElementRef, NgZone, OnChanges } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable } from 'rxjs';
import { NzIconRenderTemplate, NzShowUploadList, NzUploadFile, NzUploadListType } from './interface';
declare type UploadListIconType = '' | 'uploading' | 'thumbnail';
interface UploadListFile extends NzUploadFile {
    isImageUrl?: boolean;
    isUploading?: boolean;
    iconType?: UploadListIconType;
    showDownload?: boolean;
}
export declare class NzUploadListComponent implements OnChanges {
    private cdr;
    private doc;
    private ngZone;
    private platform;
    private elementRef;
    list: UploadListFile[];
    private get showPic();
    locale: NzSafeAny;
    listType: NzUploadListType;
    set items(list: NzUploadFile[]);
    icons: NzShowUploadList;
    onPreview?: (file: NzUploadFile) => void;
    onRemove: (file: NzUploadFile) => void;
    onDownload?: (file: NzUploadFile) => void;
    previewFile?: (file: NzUploadFile) => Observable<string>;
    previewIsImage?: (file: NzUploadFile) => boolean;
    iconRender: NzIconRenderTemplate | null;
    dir: Direction;
    private genErr;
    private extname;
    isImageUrl(file: NzUploadFile): boolean;
    private getIconType;
    private previewImage;
    private genThumb;
    private showDownload;
    private fixData;
    handlePreview(file: NzUploadFile, e: Event): void;
    handleRemove(file: NzUploadFile, e: Event): void;
    handleDownload(file: NzUploadFile): void;
    constructor(cdr: ChangeDetectorRef, doc: NzSafeAny, ngZone: NgZone, platform: Platform, elementRef: ElementRef);
    detectChanges(): void;
    ngOnChanges(): void;
}
export {};
