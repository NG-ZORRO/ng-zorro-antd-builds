/**
 * @fileoverview added by tsickle
 * Generated from: upload.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __decorate, __metadata } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { InputBoolean, InputNumber, toBoolean } from 'ng-zorro-antd/core/util';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzUploadBtnComponent } from './upload-btn.component';
import { NzUploadListComponent } from './upload-list.component';
export class NzUploadComponent {
    // #endregion
    /**
     * @param {?} cdr
     * @param {?} i18n
     */
    constructor(cdr, i18n) {
        this.cdr = cdr;
        this.i18n = i18n;
        // #region fields
        this.nzType = 'select';
        this.nzLimit = 0;
        this.nzSize = 0;
        this.nzDirectory = false;
        this.nzOpenFileDialogOnClick = true;
        this.nzFilter = [];
        this.nzFileList = [];
        this.nzDisabled = false;
        this.nzListType = 'text';
        this.nzMultiple = false;
        this.nzName = 'file';
        this._showUploadList = true;
        this.nzShowButton = true;
        this.nzWithCredentials = false;
        this.nzIconRender = null;
        this.nzFileListRender = null;
        this.nzChange = new EventEmitter();
        this.nzFileListChange = new EventEmitter();
        this.onStart = (/**
         * @param {?} file
         * @return {?}
         */
        (file) => {
            if (!this.nzFileList) {
                this.nzFileList = [];
            }
            /** @type {?} */
            const targetItem = this.fileToObject(file);
            targetItem.status = 'uploading';
            this.nzFileList = this.nzFileList.concat(targetItem);
            this.nzFileListChange.emit(this.nzFileList);
            this.nzChange.emit({ file: targetItem, fileList: this.nzFileList, type: 'start' });
            this.detectChangesList();
        });
        this.onProgress = (/**
         * @param {?} e
         * @param {?} file
         * @return {?}
         */
        (e, file) => {
            /** @type {?} */
            const fileList = this.nzFileList;
            /** @type {?} */
            const targetItem = this.getFileItem(file, fileList);
            targetItem.percent = e.percent;
            this.nzChange.emit({
                event: e,
                file: Object.assign({}, targetItem),
                fileList: this.nzFileList,
                type: 'progress'
            });
            this.detectChangesList();
        });
        this.onSuccess = (/**
         * @param {?} res
         * @param {?} file
         * @return {?}
         */
        (res, file) => {
            /** @type {?} */
            const fileList = this.nzFileList;
            /** @type {?} */
            const targetItem = this.getFileItem(file, fileList);
            targetItem.status = 'done';
            targetItem.response = res;
            this.nzChange.emit({
                file: Object.assign({}, targetItem),
                fileList,
                type: 'success'
            });
            this.detectChangesList();
        });
        this.onError = (/**
         * @param {?} err
         * @param {?} file
         * @return {?}
         */
        (err, file) => {
            /** @type {?} */
            const fileList = this.nzFileList;
            /** @type {?} */
            const targetItem = this.getFileItem(file, fileList);
            targetItem.error = err;
            targetItem.status = 'error';
            this.nzChange.emit({
                file: Object.assign({}, targetItem),
                fileList,
                type: 'error'
            });
            this.detectChangesList();
        });
        this.onRemove = (/**
         * @param {?} file
         * @return {?}
         */
        (file) => {
            this.uploadComp.abort(file);
            file.status = 'removed';
            /** @type {?} */
            const fnRes = typeof this.nzRemove === 'function' ? this.nzRemove(file) : this.nzRemove == null ? true : this.nzRemove;
            (fnRes instanceof Observable ? fnRes : of(fnRes)).pipe(filter((/**
             * @param {?} res
             * @return {?}
             */
            (res) => res))).subscribe((/**
             * @return {?}
             */
            () => {
                this.nzFileList = this.removeFileItem(file, this.nzFileList);
                this.nzChange.emit({
                    file,
                    fileList: this.nzFileList,
                    type: 'removed'
                });
                this.nzFileListChange.emit(this.nzFileList);
                this.cdr.detectChanges();
            }));
        });
        // #endregion
        // #region styles
        this.prefixCls = 'ant-upload';
        this.classList = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzShowUploadList(value) {
        this._showUploadList = typeof value === 'boolean' ? toBoolean(value) : value;
    }
    /**
     * @return {?}
     */
    get nzShowUploadList() {
        return this._showUploadList;
    }
    /**
     * @private
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    zipOptions() {
        if (typeof (/** @type {?} */ (this)).nzShowUploadList === 'boolean' && (/** @type {?} */ (this)).nzShowUploadList) {
            (/** @type {?} */ (this)).nzShowUploadList = {
                showPreviewIcon: true,
                showRemoveIcon: true,
                showDownloadIcon: true
            };
        }
        // filters
        /** @type {?} */
        const filters = (/** @type {?} */ (this)).nzFilter.slice();
        if ((/** @type {?} */ (this)).nzMultiple && (/** @type {?} */ (this)).nzLimit > 0 && filters.findIndex((/**
         * @param {?} w
         * @return {?}
         */
        w => w.name === 'limit')) === -1) {
            filters.push({
                name: 'limit',
                fn: (/**
                 * @param {?} fileList
                 * @return {?}
                 */
                (fileList) => fileList.slice(-(/** @type {?} */ (this)).nzLimit))
            });
        }
        if ((/** @type {?} */ (this)).nzSize > 0 && filters.findIndex((/**
         * @param {?} w
         * @return {?}
         */
        w => w.name === 'size')) === -1) {
            filters.push({
                name: 'size',
                fn: (/**
                 * @param {?} fileList
                 * @return {?}
                 */
                (fileList) => fileList.filter((/**
                 * @param {?} w
                 * @return {?}
                 */
                w => (/** @type {?} */ (w.size)) / 1024 <= (/** @type {?} */ (this)).nzSize)))
            });
        }
        if ((/** @type {?} */ (this)).nzFileType && (/** @type {?} */ (this)).nzFileType.length > 0 && filters.findIndex((/**
         * @param {?} w
         * @return {?}
         */
        w => w.name === 'type')) === -1) {
            /** @type {?} */
            const types = (/** @type {?} */ (this)).nzFileType.split(',');
            filters.push({
                name: 'type',
                fn: (/**
                 * @param {?} fileList
                 * @return {?}
                 */
                (fileList) => fileList.filter((/**
                 * @param {?} w
                 * @return {?}
                 */
                w => ~types.indexOf((/** @type {?} */ (w.type))))))
            });
        }
        (/** @type {?} */ (this))._btnOptions = {
            disabled: (/** @type {?} */ (this)).nzDisabled,
            accept: (/** @type {?} */ (this)).nzAccept,
            action: (/** @type {?} */ (this)).nzAction,
            directory: (/** @type {?} */ (this)).nzDirectory,
            openFileDialogOnClick: (/** @type {?} */ (this)).nzOpenFileDialogOnClick,
            beforeUpload: (/** @type {?} */ (this)).nzBeforeUpload,
            customRequest: (/** @type {?} */ (this)).nzCustomRequest,
            data: (/** @type {?} */ (this)).nzData,
            headers: (/** @type {?} */ (this)).nzHeaders,
            name: (/** @type {?} */ (this)).nzName,
            multiple: (/** @type {?} */ (this)).nzMultiple,
            withCredentials: (/** @type {?} */ (this)).nzWithCredentials,
            filters,
            transformFile: (/** @type {?} */ (this)).nzTransformFile,
            onStart: (/** @type {?} */ (this)).onStart,
            onProgress: (/** @type {?} */ (this)).onProgress,
            onSuccess: (/** @type {?} */ (this)).onSuccess,
            onError: (/** @type {?} */ (this)).onError
        };
        return (/** @type {?} */ (this));
    }
    // #region upload
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    fileToObject(file) {
        return {
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            name: file.filename || file.name,
            size: file.size,
            type: file.type,
            uid: file.uid,
            response: file.response,
            error: file.error,
            percent: 0,
            originFileObj: (/** @type {?} */ (file))
        };
    }
    /**
     * @private
     * @param {?} file
     * @param {?} fileList
     * @return {?}
     */
    getFileItem(file, fileList) {
        return fileList.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => item.uid === file.uid))[0];
    }
    /**
     * @private
     * @param {?} file
     * @param {?} fileList
     * @return {?}
     */
    removeFileItem(file, fileList) {
        return fileList.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => item.uid !== file.uid));
    }
    // skip safari bug
    /**
     * @param {?} e
     * @return {?}
     */
    fileDrop(e) {
        if (e.type === this.dragState) {
            return;
        }
        this.dragState = e.type;
        this.setClassMap();
    }
    // #endregion
    // #region list
    /**
     * @private
     * @return {?}
     */
    detectChangesList() {
        var _a;
        this.cdr.detectChanges();
        (_a = this.listComp) === null || _a === void 0 ? void 0 : _a.detectChanges();
    }
    /**
     * @private
     * @return {?}
     */
    setClassMap() {
        /** @type {?} */
        let subCls = [];
        if (this.nzType === 'drag') {
            if (this.nzFileList.some((/**
             * @param {?} file
             * @return {?}
             */
            file => file.status === 'uploading'))) {
                subCls.push(`${this.prefixCls}-drag-uploading`);
            }
            if (this.dragState === 'dragover') {
                subCls.push(`${this.prefixCls}-drag-hover`);
            }
        }
        else {
            subCls = [`${this.prefixCls}-select-${this.nzListType}`];
        }
        this.classList = [
            this.prefixCls,
            `${this.prefixCls}-${this.nzType}`,
            ...subCls,
            (this.nzDisabled && `${this.prefixCls}-disabled`) || ''
        ].filter((/**
         * @param {?} item
         * @return {?}
         */
        item => !!item));
        this.cdr.detectChanges();
    }
    // #endregion
    /**
     * @return {?}
     */
    ngOnInit() {
        this.i18n$ = this.i18n.localeChange.subscribe((/**
         * @return {?}
         */
        () => {
            this.locale = this.i18n.getLocaleData('Upload');
            this.detectChangesList();
        }));
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.zipOptions().setClassMap();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.i18n$.unsubscribe();
    }
}
NzUploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-upload',
                exportAs: 'nzUpload',
                template: "<ng-template #list>\n  <nz-upload-list\n    *ngIf=\"locale && !nzFileListRender\"\n    #listComp\n    [style.display]=\"nzShowUploadList ? '' : 'none'\"\n    [locale]=\"locale\"\n    [listType]=\"nzListType\"\n    [items]=\"nzFileList || []\"\n    [icons]=\"$any(nzShowUploadList)\"\n    [iconRender]=\"nzIconRender\"\n    [previewFile]=\"nzPreviewFile\"\n    [onPreview]=\"nzPreview\"\n    [onRemove]=\"onRemove\"\n    [onDownload]=\"nzDownload\"\n  ></nz-upload-list>\n  <ng-container *ngIf=\"nzFileListRender\">\n    <ng-container\n      *ngTemplateOutlet=\"nzFileListRender; context: { $implicit: nzFileList }\"\n    ></ng-container>\n  </ng-container>\n</ng-template>\n<ng-template #con><ng-content></ng-content></ng-template>\n<ng-template #btn>\n  <div [ngClass]=\"classList\" [style.display]=\"nzShowButton ? '' : 'none'\">\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\">\n      <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\n    </div>\n  </div>\n</ng-template>\n<ng-container *ngIf=\"nzType === 'drag'; else select\">\n  <div\n    [ngClass]=\"classList\"\n    (drop)=\"fileDrop($event)\"\n    (dragover)=\"fileDrop($event)\"\n    (dragleave)=\"fileDrop($event)\"\n  >\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\" class=\"ant-upload-btn\">\n      <div class=\"ant-upload-drag-container\">\n        <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\n      </div>\n    </div>\n  </div>\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n</ng-container>\n<ng-template #select>\n  <ng-container *ngIf=\"nzListType === 'picture-card'; else pic\">\n    <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n    <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\n  </ng-container>\n</ng-template>\n<ng-template #pic>\n  <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n</ng-template>\n",
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.ant-upload-picture-card-wrapper]': 'nzListType === "picture-card"'
                }
            }] }
];
/** @nocollapse */
NzUploadComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzI18nService }
];
NzUploadComponent.propDecorators = {
    uploadComp: [{ type: ViewChild, args: ['uploadComp', { static: false },] }],
    listComp: [{ type: ViewChild, args: ['listComp', { static: false },] }],
    nzType: [{ type: Input }],
    nzLimit: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzFileType: [{ type: Input }],
    nzAccept: [{ type: Input }],
    nzAction: [{ type: Input }],
    nzDirectory: [{ type: Input }],
    nzOpenFileDialogOnClick: [{ type: Input }],
    nzBeforeUpload: [{ type: Input }],
    nzCustomRequest: [{ type: Input }],
    nzData: [{ type: Input }],
    nzFilter: [{ type: Input }],
    nzFileList: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzHeaders: [{ type: Input }],
    nzListType: [{ type: Input }],
    nzMultiple: [{ type: Input }],
    nzName: [{ type: Input }],
    nzShowUploadList: [{ type: Input }],
    nzShowButton: [{ type: Input }],
    nzWithCredentials: [{ type: Input }],
    nzRemove: [{ type: Input }],
    nzPreview: [{ type: Input }],
    nzPreviewFile: [{ type: Input }],
    nzTransformFile: [{ type: Input }],
    nzDownload: [{ type: Input }],
    nzIconRender: [{ type: Input }],
    nzFileListRender: [{ type: Input }],
    nzChange: [{ type: Output }],
    nzFileListChange: [{ type: Output }]
};
__decorate([
    InputNumber(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzLimit", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzSize", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzDirectory", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzOpenFileDialogOnClick", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzMultiple", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzShowButton", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzWithCredentials", void 0);
if (false) {
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzLimit;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzSize;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzDirectory;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzOpenFileDialogOnClick;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzDisabled;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzMultiple;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzShowUploadList;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzShowButton;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzWithCredentials;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.i18n$;
    /** @type {?} */
    NzUploadComponent.prototype.uploadComp;
    /** @type {?} */
    NzUploadComponent.prototype.listComp;
    /** @type {?} */
    NzUploadComponent.prototype.locale;
    /** @type {?} */
    NzUploadComponent.prototype.nzType;
    /** @type {?} */
    NzUploadComponent.prototype.nzLimit;
    /** @type {?} */
    NzUploadComponent.prototype.nzSize;
    /** @type {?} */
    NzUploadComponent.prototype.nzFileType;
    /** @type {?} */
    NzUploadComponent.prototype.nzAccept;
    /** @type {?} */
    NzUploadComponent.prototype.nzAction;
    /** @type {?} */
    NzUploadComponent.prototype.nzDirectory;
    /** @type {?} */
    NzUploadComponent.prototype.nzOpenFileDialogOnClick;
    /** @type {?} */
    NzUploadComponent.prototype.nzBeforeUpload;
    /** @type {?} */
    NzUploadComponent.prototype.nzCustomRequest;
    /** @type {?} */
    NzUploadComponent.prototype.nzData;
    /** @type {?} */
    NzUploadComponent.prototype.nzFilter;
    /** @type {?} */
    NzUploadComponent.prototype.nzFileList;
    /** @type {?} */
    NzUploadComponent.prototype.nzDisabled;
    /** @type {?} */
    NzUploadComponent.prototype.nzHeaders;
    /** @type {?} */
    NzUploadComponent.prototype.nzListType;
    /** @type {?} */
    NzUploadComponent.prototype.nzMultiple;
    /** @type {?} */
    NzUploadComponent.prototype.nzName;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype._showUploadList;
    /** @type {?} */
    NzUploadComponent.prototype.nzShowButton;
    /** @type {?} */
    NzUploadComponent.prototype.nzWithCredentials;
    /** @type {?} */
    NzUploadComponent.prototype.nzRemove;
    /** @type {?} */
    NzUploadComponent.prototype.nzPreview;
    /** @type {?} */
    NzUploadComponent.prototype.nzPreviewFile;
    /** @type {?} */
    NzUploadComponent.prototype.nzTransformFile;
    /** @type {?} */
    NzUploadComponent.prototype.nzDownload;
    /** @type {?} */
    NzUploadComponent.prototype.nzIconRender;
    /** @type {?} */
    NzUploadComponent.prototype.nzFileListRender;
    /** @type {?} */
    NzUploadComponent.prototype.nzChange;
    /** @type {?} */
    NzUploadComponent.prototype.nzFileListChange;
    /** @type {?} */
    NzUploadComponent.prototype._btnOptions;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.onStart;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.onProgress;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.onSuccess;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.onError;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.dragState;
    /** @type {?} */
    NzUploadComponent.prototype.onRemove;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.prefixCls;
    /** @type {?} */
    NzUploadComponent.prototype.classList;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.i18n;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvdXBsb2FkLyIsInNvdXJjZXMiOlsidXBsb2FkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRSxPQUFPLEVBQUUsYUFBYSxFQUF5QixNQUFNLG9CQUFvQixDQUFDO0FBYTFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBYWhFLE1BQU0sT0FBTyxpQkFBaUI7Ozs7OztJQXdINUIsWUFBb0IsR0FBc0IsRUFBVSxJQUFtQjtRQUFuRCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQWU7O1FBckc5RCxXQUFNLEdBQWlCLFFBQVEsQ0FBQztRQUNqQixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osV0FBTSxHQUFHLENBQUMsQ0FBQztRQUtWLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLDRCQUF1QixHQUFHLElBQUksQ0FBQztRQUkvQyxhQUFRLEdBQW1CLEVBQUUsQ0FBQztRQUM5QixlQUFVLEdBQW1CLEVBQUUsQ0FBQztRQUNoQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRW5DLGVBQVUsR0FB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VUU7Ozs7O0lBRUYsdUNBV0U7Ozs7O0lBRUYsc0NBV0U7Ozs7O0lBRUYsb0NBV0U7Ozs7O0lBTUYsc0NBQTJCOztJQW9CM0IscUNBY0U7Ozs7O0lBTUYsc0NBQWlDOztJQUNqQyxzQ0FBeUI7Ozs7O0lBM0hiLGdDQUE4Qjs7Ozs7SUFBRSxpQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnVtYmVySW5wdXQsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IElucHV0Qm9vbGVhbiwgSW5wdXROdW1iZXIsIHRvQm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UsIE56VXBsb2FkSTE4bkludGVyZmFjZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5cbmltcG9ydCB7XG4gIE56U2hvd1VwbG9hZExpc3QsXG4gIE56VXBsb2FkQ2hhbmdlUGFyYW0sXG4gIE56VXBsb2FkRmlsZSxcbiAgTnpVcGxvYWRMaXN0VHlwZSxcbiAgTnpVcGxvYWRUcmFuc2Zvcm1GaWxlVHlwZSxcbiAgTnpVcGxvYWRUeXBlLFxuICBOelVwbG9hZFhIUkFyZ3MsXG4gIFVwbG9hZEZpbHRlcixcbiAgWmlwQnV0dG9uT3B0aW9uc1xufSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBOelVwbG9hZEJ0bkNvbXBvbmVudCB9IGZyb20gJy4vdXBsb2FkLWJ0bi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpVcGxvYWRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi91cGxvYWQtbGlzdC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei11cGxvYWQnLFxuICBleHBvcnRBczogJ256VXBsb2FkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VwbG9hZC5jb21wb25lbnQuaHRtbCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXVwbG9hZC1waWN0dXJlLWNhcmQtd3JhcHBlcl0nOiAnbnpMaXN0VHlwZSA9PT0gXCJwaWN0dXJlLWNhcmRcIidcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelVwbG9hZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpMaW1pdDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNpemU6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXJlY3Rvcnk6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256T3BlbkZpbGVEaWFsb2dPbkNsaWNrOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek11bHRpcGxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dVcGxvYWRMaXN0OiBCb29sZWFuSW5wdXQgfCBOelNob3dVcGxvYWRMaXN0IHwgdW5kZWZpbmVkIHwgbnVsbDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd0J1dHRvbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpXaXRoQ3JlZGVudGlhbHM6IEJvb2xlYW5JbnB1dDtcblxuICBwcml2YXRlIGkxOG4kITogU3Vic2NyaXB0aW9uO1xuICBAVmlld0NoaWxkKCd1cGxvYWRDb21wJywgeyBzdGF0aWM6IGZhbHNlIH0pIHVwbG9hZENvbXAhOiBOelVwbG9hZEJ0bkNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgnbGlzdENvbXAnLCB7IHN0YXRpYzogZmFsc2UgfSkgbGlzdENvbXAhOiBOelVwbG9hZExpc3RDb21wb25lbnQ7XG5cbiAgbG9jYWxlITogTnpVcGxvYWRJMThuSW50ZXJmYWNlO1xuXG4gIC8vICNyZWdpb24gZmllbGRzXG5cbiAgQElucHV0KCkgbnpUeXBlOiBOelVwbG9hZFR5cGUgPSAnc2VsZWN0JztcbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgbnpMaW1pdCA9IDA7XG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG56U2l6ZSA9IDA7XG5cbiAgQElucHV0KCkgbnpGaWxlVHlwZT86IHN0cmluZztcbiAgQElucHV0KCkgbnpBY2NlcHQ/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgQElucHV0KCkgbnpBY3Rpb24/OiBzdHJpbmcgfCAoKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gc3RyaW5nIHwgT2JzZXJ2YWJsZTxzdHJpbmc+KTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlyZWN0b3J5ID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek9wZW5GaWxlRGlhbG9nT25DbGljayA9IHRydWU7XG4gIEBJbnB1dCgpIG56QmVmb3JlVXBsb2FkPzogKGZpbGU6IE56VXBsb2FkRmlsZSwgZmlsZUxpc3Q6IE56VXBsb2FkRmlsZVtdKSA9PiBib29sZWFuIHwgT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgQElucHV0KCkgbnpDdXN0b21SZXF1ZXN0PzogKGl0ZW06IE56VXBsb2FkWEhSQXJncykgPT4gU3Vic2NyaXB0aW9uO1xuICBASW5wdXQoKSBuekRhdGE/OiB7fSB8ICgoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiB7fSB8IE9ic2VydmFibGU8e30+KTtcbiAgQElucHV0KCkgbnpGaWx0ZXI6IFVwbG9hZEZpbHRlcltdID0gW107XG4gIEBJbnB1dCgpIG56RmlsZUxpc3Q6IE56VXBsb2FkRmlsZVtdID0gW107XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56SGVhZGVycz86IHt9IHwgKChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHt9IHwgT2JzZXJ2YWJsZTx7fT4pO1xuICBASW5wdXQoKSBuekxpc3RUeXBlOiBOelVwbG9hZExpc3RUeXBlID0gJ3RleHQnO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpNdWx0aXBsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBuek5hbWUgPSAnZmlsZSc7XG5cbiAgcHJpdmF0ZSBfc2hvd1VwbG9hZExpc3Q6IGJvb2xlYW4gfCBOelNob3dVcGxvYWRMaXN0ID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgbnpTaG93VXBsb2FkTGlzdCh2YWx1ZTogYm9vbGVhbiB8IE56U2hvd1VwbG9hZExpc3QpIHtcbiAgICB0aGlzLl9zaG93VXBsb2FkTGlzdCA9IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nID8gdG9Cb29sZWFuKHZhbHVlKSA6IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG56U2hvd1VwbG9hZExpc3QoKTogYm9vbGVhbiB8IE56U2hvd1VwbG9hZExpc3Qge1xuICAgIHJldHVybiB0aGlzLl9zaG93VXBsb2FkTGlzdDtcbiAgfVxuXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dCdXR0b24gPSB0cnVlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpXaXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcblxuICBASW5wdXQoKSBuelJlbW92ZT86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IGJvb2xlYW4gfCBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBASW5wdXQoKSBuelByZXZpZXc/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiB2b2lkO1xuICBASW5wdXQoKSBuelByZXZpZXdGaWxlPzogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICBASW5wdXQoKSBuelRyYW5zZm9ybUZpbGU/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBOelVwbG9hZFRyYW5zZm9ybUZpbGVUeXBlO1xuICBASW5wdXQoKSBuekRvd25sb2FkPzogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gdm9pZDtcbiAgQElucHV0KCkgbnpJY29uUmVuZGVyOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56RmlsZUxpc3RSZW5kZXI6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q2hhbmdlOiBFdmVudEVtaXR0ZXI8TnpVcGxvYWRDaGFuZ2VQYXJhbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE56VXBsb2FkQ2hhbmdlUGFyYW0+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekZpbGVMaXN0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8TnpVcGxvYWRGaWxlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxOelVwbG9hZEZpbGVbXT4oKTtcblxuICBfYnRuT3B0aW9ucz86IFppcEJ1dHRvbk9wdGlvbnM7XG5cbiAgcHJpdmF0ZSB6aXBPcHRpb25zKCk6IHRoaXMge1xuICAgIGlmICh0eXBlb2YgdGhpcy5uelNob3dVcGxvYWRMaXN0ID09PSAnYm9vbGVhbicgJiYgdGhpcy5uelNob3dVcGxvYWRMaXN0KSB7XG4gICAgICB0aGlzLm56U2hvd1VwbG9hZExpc3QgPSB7XG4gICAgICAgIHNob3dQcmV2aWV3SWNvbjogdHJ1ZSxcbiAgICAgICAgc2hvd1JlbW92ZUljb246IHRydWUsXG4gICAgICAgIHNob3dEb3dubG9hZEljb246IHRydWVcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGZpbHRlcnNcbiAgICBjb25zdCBmaWx0ZXJzOiBVcGxvYWRGaWx0ZXJbXSA9IHRoaXMubnpGaWx0ZXIuc2xpY2UoKTtcbiAgICBpZiAodGhpcy5uek11bHRpcGxlICYmIHRoaXMubnpMaW1pdCA+IDAgJiYgZmlsdGVycy5maW5kSW5kZXgodyA9PiB3Lm5hbWUgPT09ICdsaW1pdCcpID09PSAtMSkge1xuICAgICAgZmlsdGVycy5wdXNoKHtcbiAgICAgICAgbmFtZTogJ2xpbWl0JyxcbiAgICAgICAgZm46IChmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pID0+IGZpbGVMaXN0LnNsaWNlKC10aGlzLm56TGltaXQpXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMubnpTaXplID4gMCAmJiBmaWx0ZXJzLmZpbmRJbmRleCh3ID0+IHcubmFtZSA9PT0gJ3NpemUnKSA9PT0gLTEpIHtcbiAgICAgIGZpbHRlcnMucHVzaCh7XG4gICAgICAgIG5hbWU6ICdzaXplJyxcbiAgICAgICAgZm46IChmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pID0+IGZpbGVMaXN0LmZpbHRlcih3ID0+IHcuc2l6ZSEgLyAxMDI0IDw9IHRoaXMubnpTaXplKVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm56RmlsZVR5cGUgJiYgdGhpcy5uekZpbGVUeXBlLmxlbmd0aCA+IDAgJiYgZmlsdGVycy5maW5kSW5kZXgodyA9PiB3Lm5hbWUgPT09ICd0eXBlJykgPT09IC0xKSB7XG4gICAgICBjb25zdCB0eXBlcyA9IHRoaXMubnpGaWxlVHlwZS5zcGxpdCgnLCcpO1xuICAgICAgZmlsdGVycy5wdXNoKHtcbiAgICAgICAgbmFtZTogJ3R5cGUnLFxuICAgICAgICBmbjogKGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSkgPT4gZmlsZUxpc3QuZmlsdGVyKHcgPT4gfnR5cGVzLmluZGV4T2Yody50eXBlISkpXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fYnRuT3B0aW9ucyA9IHtcbiAgICAgIGRpc2FibGVkOiB0aGlzLm56RGlzYWJsZWQsXG4gICAgICBhY2NlcHQ6IHRoaXMubnpBY2NlcHQsXG4gICAgICBhY3Rpb246IHRoaXMubnpBY3Rpb24sXG4gICAgICBkaXJlY3Rvcnk6IHRoaXMubnpEaXJlY3RvcnksXG4gICAgICBvcGVuRmlsZURpYWxvZ09uQ2xpY2s6IHRoaXMubnpPcGVuRmlsZURpYWxvZ09uQ2xpY2ssXG4gICAgICBiZWZvcmVVcGxvYWQ6IHRoaXMubnpCZWZvcmVVcGxvYWQsXG4gICAgICBjdXN0b21SZXF1ZXN0OiB0aGlzLm56Q3VzdG9tUmVxdWVzdCxcbiAgICAgIGRhdGE6IHRoaXMubnpEYXRhLFxuICAgICAgaGVhZGVyczogdGhpcy5uekhlYWRlcnMsXG4gICAgICBuYW1lOiB0aGlzLm56TmFtZSxcbiAgICAgIG11bHRpcGxlOiB0aGlzLm56TXVsdGlwbGUsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMubnpXaXRoQ3JlZGVudGlhbHMsXG4gICAgICBmaWx0ZXJzLFxuICAgICAgdHJhbnNmb3JtRmlsZTogdGhpcy5uelRyYW5zZm9ybUZpbGUsXG4gICAgICBvblN0YXJ0OiB0aGlzLm9uU3RhcnQsXG4gICAgICBvblByb2dyZXNzOiB0aGlzLm9uUHJvZ3Jlc3MsXG4gICAgICBvblN1Y2Nlc3M6IHRoaXMub25TdWNjZXNzLFxuICAgICAgb25FcnJvcjogdGhpcy5vbkVycm9yXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgaTE4bjogTnpJMThuU2VydmljZSkge31cblxuICAvLyAjcmVnaW9uIHVwbG9hZFxuXG4gIHByaXZhdGUgZmlsZVRvT2JqZWN0KGZpbGU6IE56VXBsb2FkRmlsZSk6IE56VXBsb2FkRmlsZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhc3RNb2RpZmllZDogZmlsZS5sYXN0TW9kaWZpZWQsXG4gICAgICBsYXN0TW9kaWZpZWREYXRlOiBmaWxlLmxhc3RNb2RpZmllZERhdGUsXG4gICAgICBuYW1lOiBmaWxlLmZpbGVuYW1lIHx8IGZpbGUubmFtZSxcbiAgICAgIHNpemU6IGZpbGUuc2l6ZSxcbiAgICAgIHR5cGU6IGZpbGUudHlwZSxcbiAgICAgIHVpZDogZmlsZS51aWQsXG4gICAgICByZXNwb25zZTogZmlsZS5yZXNwb25zZSxcbiAgICAgIGVycm9yOiBmaWxlLmVycm9yLFxuICAgICAgcGVyY2VudDogMCxcbiAgICAgIG9yaWdpbkZpbGVPYmo6IGZpbGUgYXMgTnpTYWZlQW55XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsZUl0ZW0oZmlsZTogTnpVcGxvYWRGaWxlLCBmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pOiBOelVwbG9hZEZpbGUge1xuICAgIHJldHVybiBmaWxlTGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLnVpZCA9PT0gZmlsZS51aWQpWzBdO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVGaWxlSXRlbShmaWxlOiBOelVwbG9hZEZpbGUsIGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSk6IE56VXBsb2FkRmlsZVtdIHtcbiAgICByZXR1cm4gZmlsZUxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS51aWQgIT09IGZpbGUudWlkKTtcbiAgfVxuXG4gIHByaXZhdGUgb25TdGFydCA9IChmaWxlOiBOelVwbG9hZEZpbGUpOiB2b2lkID0+IHtcbiAgICBpZiAoIXRoaXMubnpGaWxlTGlzdCkge1xuICAgICAgdGhpcy5uekZpbGVMaXN0ID0gW107XG4gICAgfVxuICAgIGNvbnN0IHRhcmdldEl0ZW0gPSB0aGlzLmZpbGVUb09iamVjdChmaWxlKTtcbiAgICB0YXJnZXRJdGVtLnN0YXR1cyA9ICd1cGxvYWRpbmcnO1xuICAgIHRoaXMubnpGaWxlTGlzdCA9IHRoaXMubnpGaWxlTGlzdC5jb25jYXQodGFyZ2V0SXRlbSk7XG4gICAgdGhpcy5uekZpbGVMaXN0Q2hhbmdlLmVtaXQodGhpcy5uekZpbGVMaXN0KTtcbiAgICB0aGlzLm56Q2hhbmdlLmVtaXQoeyBmaWxlOiB0YXJnZXRJdGVtLCBmaWxlTGlzdDogdGhpcy5uekZpbGVMaXN0LCB0eXBlOiAnc3RhcnQnIH0pO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc0xpc3QoKTtcbiAgfTtcblxuICBwcml2YXRlIG9uUHJvZ3Jlc3MgPSAoZTogeyBwZXJjZW50OiBudW1iZXIgfSwgZmlsZTogTnpVcGxvYWRGaWxlKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZmlsZUxpc3QgPSB0aGlzLm56RmlsZUxpc3Q7XG4gICAgY29uc3QgdGFyZ2V0SXRlbSA9IHRoaXMuZ2V0RmlsZUl0ZW0oZmlsZSwgZmlsZUxpc3QpO1xuICAgIHRhcmdldEl0ZW0ucGVyY2VudCA9IGUucGVyY2VudDtcbiAgICB0aGlzLm56Q2hhbmdlLmVtaXQoe1xuICAgICAgZXZlbnQ6IGUsXG4gICAgICBmaWxlOiB7IC4uLnRhcmdldEl0ZW0gfSxcbiAgICAgIGZpbGVMaXN0OiB0aGlzLm56RmlsZUxpc3QsXG4gICAgICB0eXBlOiAncHJvZ3Jlc3MnXG4gICAgfSk7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzTGlzdCgpO1xuICB9O1xuXG4gIHByaXZhdGUgb25TdWNjZXNzID0gKHJlczoge30sIGZpbGU6IE56VXBsb2FkRmlsZSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGZpbGVMaXN0ID0gdGhpcy5uekZpbGVMaXN0O1xuICAgIGNvbnN0IHRhcmdldEl0ZW0gPSB0aGlzLmdldEZpbGVJdGVtKGZpbGUsIGZpbGVMaXN0KTtcbiAgICB0YXJnZXRJdGVtLnN0YXR1cyA9ICdkb25lJztcbiAgICB0YXJnZXRJdGVtLnJlc3BvbnNlID0gcmVzO1xuICAgIHRoaXMubnpDaGFuZ2UuZW1pdCh7XG4gICAgICBmaWxlOiB7IC4uLnRhcmdldEl0ZW0gfSxcbiAgICAgIGZpbGVMaXN0LFxuICAgICAgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgfSk7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzTGlzdCgpO1xuICB9O1xuXG4gIHByaXZhdGUgb25FcnJvciA9IChlcnI6IHt9LCBmaWxlOiBOelVwbG9hZEZpbGUpOiB2b2lkID0+IHtcbiAgICBjb25zdCBmaWxlTGlzdCA9IHRoaXMubnpGaWxlTGlzdDtcbiAgICBjb25zdCB0YXJnZXRJdGVtID0gdGhpcy5nZXRGaWxlSXRlbShmaWxlLCBmaWxlTGlzdCk7XG4gICAgdGFyZ2V0SXRlbS5lcnJvciA9IGVycjtcbiAgICB0YXJnZXRJdGVtLnN0YXR1cyA9ICdlcnJvcic7XG4gICAgdGhpcy5uekNoYW5nZS5lbWl0KHtcbiAgICAgIGZpbGU6IHsgLi4udGFyZ2V0SXRlbSB9LFxuICAgICAgZmlsZUxpc3QsXG4gICAgICB0eXBlOiAnZXJyb3InXG4gICAgfSk7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzTGlzdCgpO1xuICB9O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIGRyYWdcblxuICBwcml2YXRlIGRyYWdTdGF0ZT86IHN0cmluZztcblxuICAvLyBza2lwIHNhZmFyaSBidWdcbiAgZmlsZURyb3AoZTogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKGUudHlwZSA9PT0gdGhpcy5kcmFnU3RhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kcmFnU3RhdGUgPSBlLnR5cGU7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gbGlzdFxuXG4gIHByaXZhdGUgZGV0ZWN0Q2hhbmdlc0xpc3QoKTogdm9pZCB7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMubGlzdENvbXA/LmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG9uUmVtb3ZlID0gKGZpbGU6IE56VXBsb2FkRmlsZSk6IHZvaWQgPT4ge1xuICAgIHRoaXMudXBsb2FkQ29tcC5hYm9ydChmaWxlKTtcbiAgICBmaWxlLnN0YXR1cyA9ICdyZW1vdmVkJztcbiAgICBjb25zdCBmblJlcyA9IHR5cGVvZiB0aGlzLm56UmVtb3ZlID09PSAnZnVuY3Rpb24nID8gdGhpcy5uelJlbW92ZShmaWxlKSA6IHRoaXMubnpSZW1vdmUgPT0gbnVsbCA/IHRydWUgOiB0aGlzLm56UmVtb3ZlO1xuICAgIChmblJlcyBpbnN0YW5jZW9mIE9ic2VydmFibGUgPyBmblJlcyA6IG9mKGZuUmVzKSkucGlwZShmaWx0ZXIoKHJlczogYm9vbGVhbikgPT4gcmVzKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubnpGaWxlTGlzdCA9IHRoaXMucmVtb3ZlRmlsZUl0ZW0oZmlsZSwgdGhpcy5uekZpbGVMaXN0KTtcbiAgICAgIHRoaXMubnpDaGFuZ2UuZW1pdCh7XG4gICAgICAgIGZpbGUsXG4gICAgICAgIGZpbGVMaXN0OiB0aGlzLm56RmlsZUxpc3QsXG4gICAgICAgIHR5cGU6ICdyZW1vdmVkJ1xuICAgICAgfSk7XG4gICAgICB0aGlzLm56RmlsZUxpc3RDaGFuZ2UuZW1pdCh0aGlzLm56RmlsZUxpc3QpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHN0eWxlc1xuXG4gIHByaXZhdGUgcHJlZml4Q2xzID0gJ2FudC11cGxvYWQnO1xuICBjbGFzc0xpc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgcHJpdmF0ZSBzZXRDbGFzc01hcCgpOiB2b2lkIHtcbiAgICBsZXQgc3ViQ2xzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGlmICh0aGlzLm56VHlwZSA9PT0gJ2RyYWcnKSB7XG4gICAgICBpZiAodGhpcy5uekZpbGVMaXN0LnNvbWUoZmlsZSA9PiBmaWxlLnN0YXR1cyA9PT0gJ3VwbG9hZGluZycpKSB7XG4gICAgICAgIHN1YkNscy5wdXNoKGAke3RoaXMucHJlZml4Q2xzfS1kcmFnLXVwbG9hZGluZ2ApO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZHJhZ1N0YXRlID09PSAnZHJhZ292ZXInKSB7XG4gICAgICAgIHN1YkNscy5wdXNoKGAke3RoaXMucHJlZml4Q2xzfS1kcmFnLWhvdmVyYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1YkNscyA9IFtgJHt0aGlzLnByZWZpeENsc30tc2VsZWN0LSR7dGhpcy5uekxpc3RUeXBlfWBdO1xuICAgIH1cblxuICAgIHRoaXMuY2xhc3NMaXN0ID0gW1xuICAgICAgdGhpcy5wcmVmaXhDbHMsXG4gICAgICBgJHt0aGlzLnByZWZpeENsc30tJHt0aGlzLm56VHlwZX1gLFxuICAgICAgLi4uc3ViQ2xzLFxuICAgICAgKHRoaXMubnpEaXNhYmxlZCAmJiBgJHt0aGlzLnByZWZpeENsc30tZGlzYWJsZWRgKSB8fCAnJ1xuICAgIF0uZmlsdGVyKGl0ZW0gPT4gISFpdGVtKTtcblxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmkxOG4kID0gdGhpcy5pMThuLmxvY2FsZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5sb2NhbGUgPSB0aGlzLmkxOG4uZ2V0TG9jYWxlRGF0YSgnVXBsb2FkJyk7XG4gICAgICB0aGlzLmRldGVjdENoYW5nZXNMaXN0KCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLnppcE9wdGlvbnMoKS5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5pMThuJC51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=