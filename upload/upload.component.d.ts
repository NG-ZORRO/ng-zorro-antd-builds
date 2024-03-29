/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BooleanInput, NumberInput } from 'ng-zorro-antd/core/types';
import { NzI18nService, NzUploadI18nInterface } from 'ng-zorro-antd/i18n';
import { NzIconRenderTemplate, NzShowUploadList, NzUploadChangeParam, NzUploadFile, NzUploadListType, NzUploadTransformFileType, NzUploadType, NzUploadXHRArgs, UploadFilter, ZipButtonOptions } from './interface';
import { NzUploadBtnComponent } from './upload-btn.component';
import { NzUploadListComponent } from './upload-list.component';
import * as i0 from "@angular/core";
export declare class NzUploadComponent implements OnInit, OnChanges, OnDestroy {
    private cdr;
    private i18n;
    private directionality;
    static ngAcceptInputType_nzLimit: NumberInput;
    static ngAcceptInputType_nzSize: NumberInput;
    static ngAcceptInputType_nzDirectory: BooleanInput;
    static ngAcceptInputType_nzOpenFileDialogOnClick: BooleanInput;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    static ngAcceptInputType_nzMultiple: BooleanInput;
    static ngAcceptInputType_nzShowUploadList: BooleanInput | NzShowUploadList;
    static ngAcceptInputType_nzShowButton: BooleanInput;
    static ngAcceptInputType_nzWithCredentials: BooleanInput;
    private destroy$;
    uploadComp: NzUploadBtnComponent;
    listComp: NzUploadListComponent;
    locale: NzUploadI18nInterface;
    dir: Direction;
    nzType: NzUploadType;
    nzLimit: number;
    nzSize: number;
    nzFileType?: string;
    nzAccept?: string | string[];
    nzAction?: string | ((file: NzUploadFile) => string | Observable<string>);
    nzDirectory: boolean;
    nzOpenFileDialogOnClick: boolean;
    nzBeforeUpload?: (file: NzUploadFile, fileList: NzUploadFile[]) => boolean | Observable<boolean>;
    nzCustomRequest?: (item: NzUploadXHRArgs) => Subscription;
    nzData?: {} | ((file: NzUploadFile) => {} | Observable<{}>);
    nzFilter: UploadFilter[];
    nzFileList: NzUploadFile[];
    nzDisabled: boolean;
    nzHeaders?: {} | ((file: NzUploadFile) => {} | Observable<{}>);
    nzListType: NzUploadListType;
    nzMultiple: boolean;
    nzName: string;
    private _showUploadList;
    set nzShowUploadList(value: boolean | NzShowUploadList);
    get nzShowUploadList(): boolean | NzShowUploadList;
    nzShowButton: boolean;
    nzWithCredentials: boolean;
    nzRemove?: (file: NzUploadFile) => boolean | Observable<boolean>;
    nzPreview?: (file: NzUploadFile) => void;
    nzPreviewFile?: (file: NzUploadFile) => Observable<string>;
    nzPreviewIsImage?: (file: NzUploadFile) => boolean;
    nzTransformFile?: (file: NzUploadFile) => NzUploadTransformFileType;
    nzDownload?: (file: NzUploadFile) => void;
    nzIconRender: NzIconRenderTemplate | null;
    nzFileListRender: TemplateRef<void> | null;
    readonly nzChange: EventEmitter<NzUploadChangeParam>;
    readonly nzFileListChange: EventEmitter<NzUploadFile[]>;
    _btnOptions?: ZipButtonOptions;
    private zipOptions;
    constructor(cdr: ChangeDetectorRef, i18n: NzI18nService, directionality: Directionality);
    private fileToObject;
    private getFileItem;
    private removeFileItem;
    private onStart;
    private onProgress;
    private onSuccess;
    private onError;
    private dragState?;
    fileDrop(e: DragEvent): void;
    private detectChangesList;
    onRemove: (file: NzUploadFile) => void;
    private prefixCls;
    classList: string[];
    private setClassMap;
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzUploadComponent, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzUploadComponent, "nz-upload", ["nzUpload"], { "nzType": "nzType"; "nzLimit": "nzLimit"; "nzSize": "nzSize"; "nzFileType": "nzFileType"; "nzAccept": "nzAccept"; "nzAction": "nzAction"; "nzDirectory": "nzDirectory"; "nzOpenFileDialogOnClick": "nzOpenFileDialogOnClick"; "nzBeforeUpload": "nzBeforeUpload"; "nzCustomRequest": "nzCustomRequest"; "nzData": "nzData"; "nzFilter": "nzFilter"; "nzFileList": "nzFileList"; "nzDisabled": "nzDisabled"; "nzHeaders": "nzHeaders"; "nzListType": "nzListType"; "nzMultiple": "nzMultiple"; "nzName": "nzName"; "nzShowUploadList": "nzShowUploadList"; "nzShowButton": "nzShowButton"; "nzWithCredentials": "nzWithCredentials"; "nzRemove": "nzRemove"; "nzPreview": "nzPreview"; "nzPreviewFile": "nzPreviewFile"; "nzPreviewIsImage": "nzPreviewIsImage"; "nzTransformFile": "nzTransformFile"; "nzDownload": "nzDownload"; "nzIconRender": "nzIconRender"; "nzFileListRender": "nzFileListRender"; }, { "nzChange": "nzChange"; "nzFileListChange": "nzFileListChange"; }, never, ["*"]>;
}
