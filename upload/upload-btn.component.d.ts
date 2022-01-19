import { HttpClient } from '@angular/common/http';
import { ElementRef, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzUploadFile, ZipButtonOptions } from './interface';
import * as i0 from "@angular/core";
export declare class NzUploadBtnComponent implements OnInit, OnDestroy {
    private ngZone;
    private http;
    private elementRef;
    reqs: {
        [key: string]: Subscription;
    };
    private destroy;
    private destroy$;
    file: ElementRef<HTMLInputElement>;
    options: ZipButtonOptions;
    onClick(): void;
    onFileDrop(e: DragEvent): void;
    onChange(e: Event): void;
    private traverseFileTree;
    private attrAccept;
    private attachUid;
    uploadFiles(fileList: FileList | File[]): void;
    private upload;
    private post;
    private xhr;
    private clean;
    abort(file?: NzUploadFile): void;
    constructor(ngZone: NgZone, http: HttpClient, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzUploadBtnComponent, [null, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzUploadBtnComponent, "[nz-upload-btn]", ["nzUploadBtn"], { "options": "options"; }, {}, never, ["*"]>;
}
