/**
 * @fileoverview added by tsickle
 * Generated from: upload.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __decorate, __metadata, __read, __spread } from "tslib";
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
var NzUploadComponent = /** @class */ (function () {
    // #endregion
    function NzUploadComponent(cdr, i18n) {
        var _this = this;
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
        function (file) {
            if (!_this.nzFileList) {
                _this.nzFileList = [];
            }
            /** @type {?} */
            var targetItem = _this.fileToObject(file);
            targetItem.status = 'uploading';
            _this.nzFileList = _this.nzFileList.concat(targetItem);
            _this.nzFileListChange.emit(_this.nzFileList);
            _this.nzChange.emit({ file: targetItem, fileList: _this.nzFileList, type: 'start' });
            _this.detectChangesList();
        });
        this.onProgress = (/**
         * @param {?} e
         * @param {?} file
         * @return {?}
         */
        function (e, file) {
            /** @type {?} */
            var fileList = _this.nzFileList;
            /** @type {?} */
            var targetItem = _this.getFileItem(file, fileList);
            targetItem.percent = e.percent;
            _this.nzChange.emit({
                event: e,
                file: __assign({}, targetItem),
                fileList: _this.nzFileList,
                type: 'progress'
            });
            _this.detectChangesList();
        });
        this.onSuccess = (/**
         * @param {?} res
         * @param {?} file
         * @return {?}
         */
        function (res, file) {
            /** @type {?} */
            var fileList = _this.nzFileList;
            /** @type {?} */
            var targetItem = _this.getFileItem(file, fileList);
            targetItem.status = 'done';
            targetItem.response = res;
            _this.nzChange.emit({
                file: __assign({}, targetItem),
                fileList: fileList,
                type: 'success'
            });
            _this.detectChangesList();
        });
        this.onError = (/**
         * @param {?} err
         * @param {?} file
         * @return {?}
         */
        function (err, file) {
            /** @type {?} */
            var fileList = _this.nzFileList;
            /** @type {?} */
            var targetItem = _this.getFileItem(file, fileList);
            targetItem.error = err;
            targetItem.status = 'error';
            _this.nzChange.emit({
                file: __assign({}, targetItem),
                fileList: fileList,
                type: 'error'
            });
            _this.detectChangesList();
        });
        this.onRemove = (/**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            _this.uploadComp.abort(file);
            file.status = 'removed';
            /** @type {?} */
            var fnRes = typeof _this.nzRemove === 'function' ? _this.nzRemove(file) : _this.nzRemove == null ? true : _this.nzRemove;
            (fnRes instanceof Observable ? fnRes : of(fnRes)).pipe(filter((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return res; }))).subscribe((/**
             * @return {?}
             */
            function () {
                _this.nzFileList = _this.removeFileItem(file, _this.nzFileList);
                _this.nzChange.emit({
                    file: file,
                    fileList: _this.nzFileList,
                    type: 'removed'
                });
                _this.nzFileListChange.emit(_this.nzFileList);
                _this.cdr.detectChanges();
            }));
        });
        // #endregion
        // #region styles
        this.prefixCls = 'ant-upload';
        this.classList = [];
    }
    Object.defineProperty(NzUploadComponent.prototype, "nzShowUploadList", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showUploadList;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showUploadList = typeof value === 'boolean' ? toBoolean(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    NzUploadComponent.prototype.zipOptions = /**
     * @private
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    function () {
        var _this = this;
        if (typeof (/** @type {?} */ (this)).nzShowUploadList === 'boolean' && (/** @type {?} */ (this)).nzShowUploadList) {
            (/** @type {?} */ (this)).nzShowUploadList = {
                showPreviewIcon: true,
                showRemoveIcon: true,
                showDownloadIcon: true
            };
        }
        // filters
        /** @type {?} */
        var filters = (/** @type {?} */ (this)).nzFilter.slice();
        if ((/** @type {?} */ (this)).nzMultiple && (/** @type {?} */ (this)).nzLimit > 0 && filters.findIndex((/**
         * @param {?} w
         * @return {?}
         */
        function (w) { return w.name === 'limit'; })) === -1) {
            filters.push({
                name: 'limit',
                fn: (/**
                 * @param {?} fileList
                 * @return {?}
                 */
                function (fileList) { return fileList.slice(-(/** @type {?} */ (_this)).nzLimit); })
            });
        }
        if ((/** @type {?} */ (this)).nzSize > 0 && filters.findIndex((/**
         * @param {?} w
         * @return {?}
         */
        function (w) { return w.name === 'size'; })) === -1) {
            filters.push({
                name: 'size',
                fn: (/**
                 * @param {?} fileList
                 * @return {?}
                 */
                function (fileList) { return fileList.filter((/**
                 * @param {?} w
                 * @return {?}
                 */
                function (w) { return (/** @type {?} */ (w.size)) / 1024 <= (/** @type {?} */ (_this)).nzSize; })); })
            });
        }
        if ((/** @type {?} */ (this)).nzFileType && (/** @type {?} */ (this)).nzFileType.length > 0 && filters.findIndex((/**
         * @param {?} w
         * @return {?}
         */
        function (w) { return w.name === 'type'; })) === -1) {
            /** @type {?} */
            var types_1 = (/** @type {?} */ (this)).nzFileType.split(',');
            filters.push({
                name: 'type',
                fn: (/**
                 * @param {?} fileList
                 * @return {?}
                 */
                function (fileList) { return fileList.filter((/**
                 * @param {?} w
                 * @return {?}
                 */
                function (w) { return ~types_1.indexOf((/** @type {?} */ (w.type))); })); })
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
            filters: filters,
            transformFile: (/** @type {?} */ (this)).nzTransformFile,
            onStart: (/** @type {?} */ (this)).onStart,
            onProgress: (/** @type {?} */ (this)).onProgress,
            onSuccess: (/** @type {?} */ (this)).onSuccess,
            onError: (/** @type {?} */ (this)).onError
        };
        return (/** @type {?} */ (this));
    };
    // #region upload
    // #region upload
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    NzUploadComponent.prototype.fileToObject = 
    // #region upload
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
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
    };
    /**
     * @private
     * @param {?} file
     * @param {?} fileList
     * @return {?}
     */
    NzUploadComponent.prototype.getFileItem = /**
     * @private
     * @param {?} file
     * @param {?} fileList
     * @return {?}
     */
    function (file, fileList) {
        return fileList.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.uid === file.uid; }))[0];
    };
    /**
     * @private
     * @param {?} file
     * @param {?} fileList
     * @return {?}
     */
    NzUploadComponent.prototype.removeFileItem = /**
     * @private
     * @param {?} file
     * @param {?} fileList
     * @return {?}
     */
    function (file, fileList) {
        return fileList.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.uid !== file.uid; }));
    };
    // skip safari bug
    // skip safari bug
    /**
     * @param {?} e
     * @return {?}
     */
    NzUploadComponent.prototype.fileDrop = 
    // skip safari bug
    /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e.type === this.dragState) {
            return;
        }
        this.dragState = e.type;
        this.setClassMap();
    };
    // #endregion
    // #region list
    // #endregion
    // #region list
    /**
     * @private
     * @return {?}
     */
    NzUploadComponent.prototype.detectChangesList = 
    // #endregion
    // #region list
    /**
     * @private
     * @return {?}
     */
    function () {
        var _a;
        this.cdr.detectChanges();
        (_a = this.listComp) === null || _a === void 0 ? void 0 : _a.detectChanges();
    };
    /**
     * @private
     * @return {?}
     */
    NzUploadComponent.prototype.setClassMap = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var subCls = [];
        if (this.nzType === 'drag') {
            if (this.nzFileList.some((/**
             * @param {?} file
             * @return {?}
             */
            function (file) { return file.status === 'uploading'; }))) {
                subCls.push(this.prefixCls + "-drag-uploading");
            }
            if (this.dragState === 'dragover') {
                subCls.push(this.prefixCls + "-drag-hover");
            }
        }
        else {
            subCls = [this.prefixCls + "-select-" + this.nzListType];
        }
        this.classList = __spread([
            this.prefixCls,
            this.prefixCls + "-" + this.nzType
        ], subCls, [
            (this.nzDisabled && this.prefixCls + "-disabled") || ''
        ]).filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return !!item; }));
        this.cdr.detectChanges();
    };
    // #endregion
    // #endregion
    /**
     * @return {?}
     */
    NzUploadComponent.prototype.ngOnInit = 
    // #endregion
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.i18n$ = this.i18n.localeChange.subscribe((/**
         * @return {?}
         */
        function () {
            _this.locale = _this.i18n.getLocaleData('Upload');
            _this.detectChangesList();
        }));
    };
    /**
     * @return {?}
     */
    NzUploadComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.zipOptions().setClassMap();
    };
    /**
     * @return {?}
     */
    NzUploadComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.i18n$.unsubscribe();
    };
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
    NzUploadComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NzI18nService }
    ]; };
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
    return NzUploadComponent;
}());
export { NzUploadComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvdXBsb2FkLyIsInNvdXJjZXMiOlsidXBsb2FkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRSxPQUFPLEVBQUUsYUFBYSxFQUF5QixNQUFNLG9CQUFvQixDQUFDO0FBYTFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWhFO0lBaUlFLGFBQWE7SUFFYiwyQkFBb0IsR0FBc0IsRUFBVSxJQUFtQjtRQUF2RSxpQkFBMkU7UUFBdkQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFlOztRQXJHOUQsV0FBTSxHQUFpQixRQUFRLENBQUM7UUFDakIsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFLVixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQiw0QkFBdUIsR0FBRyxJQUFJLENBQUM7UUFJL0MsYUFBUSxHQUFtQixFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFtQixFQUFFLENBQUM7UUFDaEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUVuQyxlQUFVLEdB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eUM7O0lBQ3pDLHVDQUE0Qzs7SUFDNUMsc0NBQXdFOztJQUN4RSx1Q0FBK0M7O0lBQy9DLHVDQUE0Qzs7SUFDNUMsbUNBQXlCOzs7OztJQUV6Qiw0Q0FBMkQ7O0lBVzNELHlDQUE2Qzs7SUFDN0MsOENBQW1EOztJQUVuRCxxQ0FBMEU7O0lBQzFFLHNDQUFrRDs7SUFDbEQsMENBQW9FOztJQUNwRSw0Q0FBNkU7O0lBQzdFLHVDQUFtRDs7SUFDbkQseUNBQTREOztJQUM1RCw2Q0FBMkQ7O0lBRTNELHFDQUF5Rzs7SUFDekcsNkNBQXVHOztJQUV2Ryx3Q0FBK0I7Ozs7O0lBbUYvQixvQ0FVRTs7Ozs7SUFFRix1Q0FXRTs7Ozs7SUFFRixzQ0FXRTs7Ozs7SUFFRixvQ0FXRTs7Ozs7SUFNRixzQ0FBMkI7O0lBb0IzQixxQ0FjRTs7Ozs7SUFNRixzQ0FBaUM7O0lBQ2pDLHNDQUF5Qjs7Ozs7SUEzSGIsZ0NBQThCOzs7OztJQUFFLGlDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOdW1iZXJJbnB1dCwgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSW5wdXRCb29sZWFuLCBJbnB1dE51bWJlciwgdG9Cb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgTnpJMThuU2VydmljZSwgTnpVcGxvYWRJMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcblxuaW1wb3J0IHtcbiAgTnpTaG93VXBsb2FkTGlzdCxcbiAgTnpVcGxvYWRDaGFuZ2VQYXJhbSxcbiAgTnpVcGxvYWRGaWxlLFxuICBOelVwbG9hZExpc3RUeXBlLFxuICBOelVwbG9hZFRyYW5zZm9ybUZpbGVUeXBlLFxuICBOelVwbG9hZFR5cGUsXG4gIE56VXBsb2FkWEhSQXJncyxcbiAgVXBsb2FkRmlsdGVyLFxuICBaaXBCdXR0b25PcHRpb25zXG59IGZyb20gJy4vaW50ZXJmYWNlJztcbmltcG9ydCB7IE56VXBsb2FkQnRuQ29tcG9uZW50IH0gZnJvbSAnLi91cGxvYWQtYnRuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelVwbG9hZExpc3RDb21wb25lbnQgfSBmcm9tICcuL3VwbG9hZC1saXN0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXVwbG9hZCcsXG4gIGV4cG9ydEFzOiAnbnpVcGxvYWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vdXBsb2FkLmNvbXBvbmVudC5odG1sJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdXBsb2FkLXBpY3R1cmUtY2FyZC13cmFwcGVyXSc6ICduekxpc3RUeXBlID09PSBcInBpY3R1cmUtY2FyZFwiJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VXBsb2FkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekxpbWl0OiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2l6ZTogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpcmVjdG9yeTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpPcGVuRmlsZURpYWxvZ09uQ2xpY2s6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TXVsdGlwbGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd1VwbG9hZExpc3Q6IEJvb2xlYW5JbnB1dCB8IE56U2hvd1VwbG9hZExpc3QgfCB1bmRlZmluZWQgfCBudWxsO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93QnV0dG9uOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9ueldpdGhDcmVkZW50aWFsczogQm9vbGVhbklucHV0O1xuXG4gIHByaXZhdGUgaTE4biQhOiBTdWJzY3JpcHRpb247XG4gIEBWaWV3Q2hpbGQoJ3VwbG9hZENvbXAnLCB7IHN0YXRpYzogZmFsc2UgfSkgdXBsb2FkQ29tcCE6IE56VXBsb2FkQnRuQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdsaXN0Q29tcCcsIHsgc3RhdGljOiBmYWxzZSB9KSBsaXN0Q29tcCE6IE56VXBsb2FkTGlzdENvbXBvbmVudDtcblxuICBsb2NhbGUhOiBOelVwbG9hZEkxOG5JbnRlcmZhY2U7XG5cbiAgLy8gI3JlZ2lvbiBmaWVsZHNcblxuICBASW5wdXQoKSBuelR5cGU6IE56VXBsb2FkVHlwZSA9ICdzZWxlY3QnO1xuICBASW5wdXQoKSBASW5wdXROdW1iZXIoKSBuekxpbWl0ID0gMDtcbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgbnpTaXplID0gMDtcblxuICBASW5wdXQoKSBuekZpbGVUeXBlPzogc3RyaW5nO1xuICBASW5wdXQoKSBuekFjY2VwdD86IHN0cmluZyB8IHN0cmluZ1tdO1xuICBASW5wdXQoKSBuekFjdGlvbj86IHN0cmluZyB8ICgoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBzdHJpbmcgfCBPYnNlcnZhYmxlPHN0cmluZz4pO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXJlY3RvcnkgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56T3BlbkZpbGVEaWFsb2dPbkNsaWNrID0gdHJ1ZTtcbiAgQElucHV0KCkgbnpCZWZvcmVVcGxvYWQ/OiAoZmlsZTogTnpVcGxvYWRGaWxlLCBmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pID0+IGJvb2xlYW4gfCBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBASW5wdXQoKSBuekN1c3RvbVJlcXVlc3Q/OiAoaXRlbTogTnpVcGxvYWRYSFJBcmdzKSA9PiBTdWJzY3JpcHRpb247XG4gIEBJbnB1dCgpIG56RGF0YT86IHt9IHwgKChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHt9IHwgT2JzZXJ2YWJsZTx7fT4pO1xuICBASW5wdXQoKSBuekZpbHRlcjogVXBsb2FkRmlsdGVyW10gPSBbXTtcbiAgQElucHV0KCkgbnpGaWxlTGlzdDogTnpVcGxvYWRGaWxlW10gPSBbXTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpIZWFkZXJzPzoge30gfCAoKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4ge30gfCBPYnNlcnZhYmxlPHt9Pik7XG4gIEBJbnB1dCgpIG56TGlzdFR5cGU6IE56VXBsb2FkTGlzdFR5cGUgPSAndGV4dCc7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek11bHRpcGxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56TmFtZSA9ICdmaWxlJztcblxuICBwcml2YXRlIF9zaG93VXBsb2FkTGlzdDogYm9vbGVhbiB8IE56U2hvd1VwbG9hZExpc3QgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuelNob3dVcGxvYWRMaXN0KHZhbHVlOiBib29sZWFuIHwgTnpTaG93VXBsb2FkTGlzdCkge1xuICAgIHRoaXMuX3Nob3dVcGxvYWRMaXN0ID0gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgPyB0b0Jvb2xlYW4odmFsdWUpIDogdmFsdWU7XG4gIH1cblxuICBnZXQgbnpTaG93VXBsb2FkTGlzdCgpOiBib29sZWFuIHwgTnpTaG93VXBsb2FkTGlzdCB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dVcGxvYWRMaXN0O1xuICB9XG5cbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2hvd0J1dHRvbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBueldpdGhDcmVkZW50aWFscyA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIG56UmVtb3ZlPzogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gYm9vbGVhbiB8IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIEBJbnB1dCgpIG56UHJldmlldz86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIG56UHJldmlld0ZpbGU/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIEBJbnB1dCgpIG56VHJhbnNmb3JtRmlsZT86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IE56VXBsb2FkVHJhbnNmb3JtRmlsZVR5cGU7XG4gIEBJbnB1dCgpIG56RG93bmxvYWQ/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiB2b2lkO1xuICBASW5wdXQoKSBuekljb25SZW5kZXI6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpGaWxlTGlzdFJlbmRlcjogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDaGFuZ2U6IEV2ZW50RW1pdHRlcjxOelVwbG9hZENoYW5nZVBhcmFtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TnpVcGxvYWRDaGFuZ2VQYXJhbT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56RmlsZUxpc3RDaGFuZ2U6IEV2ZW50RW1pdHRlcjxOelVwbG9hZEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPE56VXBsb2FkRmlsZVtdPigpO1xuXG4gIF9idG5PcHRpb25zPzogWmlwQnV0dG9uT3B0aW9ucztcblxuICBwcml2YXRlIHppcE9wdGlvbnMoKTogdGhpcyB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm56U2hvd1VwbG9hZExpc3QgPT09ICdib29sZWFuJyAmJiB0aGlzLm56U2hvd1VwbG9hZExpc3QpIHtcbiAgICAgIHRoaXMubnpTaG93VXBsb2FkTGlzdCA9IHtcbiAgICAgICAgc2hvd1ByZXZpZXdJY29uOiB0cnVlLFxuICAgICAgICBzaG93UmVtb3ZlSWNvbjogdHJ1ZSxcbiAgICAgICAgc2hvd0Rvd25sb2FkSWNvbjogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gZmlsdGVyc1xuICAgIGNvbnN0IGZpbHRlcnM6IFVwbG9hZEZpbHRlcltdID0gdGhpcy5uekZpbHRlci5zbGljZSgpO1xuICAgIGlmICh0aGlzLm56TXVsdGlwbGUgJiYgdGhpcy5uekxpbWl0ID4gMCAmJiBmaWx0ZXJzLmZpbmRJbmRleCh3ID0+IHcubmFtZSA9PT0gJ2xpbWl0JykgPT09IC0xKSB7XG4gICAgICBmaWx0ZXJzLnB1c2goe1xuICAgICAgICBuYW1lOiAnbGltaXQnLFxuICAgICAgICBmbjogKGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSkgPT4gZmlsZUxpc3Quc2xpY2UoLXRoaXMubnpMaW1pdClcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5uelNpemUgPiAwICYmIGZpbHRlcnMuZmluZEluZGV4KHcgPT4gdy5uYW1lID09PSAnc2l6ZScpID09PSAtMSkge1xuICAgICAgZmlsdGVycy5wdXNoKHtcbiAgICAgICAgbmFtZTogJ3NpemUnLFxuICAgICAgICBmbjogKGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSkgPT4gZmlsZUxpc3QuZmlsdGVyKHcgPT4gdy5zaXplISAvIDEwMjQgPD0gdGhpcy5uelNpemUpXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMubnpGaWxlVHlwZSAmJiB0aGlzLm56RmlsZVR5cGUubGVuZ3RoID4gMCAmJiBmaWx0ZXJzLmZpbmRJbmRleCh3ID0+IHcubmFtZSA9PT0gJ3R5cGUnKSA9PT0gLTEpIHtcbiAgICAgIGNvbnN0IHR5cGVzID0gdGhpcy5uekZpbGVUeXBlLnNwbGl0KCcsJyk7XG4gICAgICBmaWx0ZXJzLnB1c2goe1xuICAgICAgICBuYW1lOiAndHlwZScsXG4gICAgICAgIGZuOiAoZmlsZUxpc3Q6IE56VXBsb2FkRmlsZVtdKSA9PiBmaWxlTGlzdC5maWx0ZXIodyA9PiB+dHlwZXMuaW5kZXhPZih3LnR5cGUhKSlcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9idG5PcHRpb25zID0ge1xuICAgICAgZGlzYWJsZWQ6IHRoaXMubnpEaXNhYmxlZCxcbiAgICAgIGFjY2VwdDogdGhpcy5uekFjY2VwdCxcbiAgICAgIGFjdGlvbjogdGhpcy5uekFjdGlvbixcbiAgICAgIGRpcmVjdG9yeTogdGhpcy5uekRpcmVjdG9yeSxcbiAgICAgIG9wZW5GaWxlRGlhbG9nT25DbGljazogdGhpcy5uek9wZW5GaWxlRGlhbG9nT25DbGljayxcbiAgICAgIGJlZm9yZVVwbG9hZDogdGhpcy5uekJlZm9yZVVwbG9hZCxcbiAgICAgIGN1c3RvbVJlcXVlc3Q6IHRoaXMubnpDdXN0b21SZXF1ZXN0LFxuICAgICAgZGF0YTogdGhpcy5uekRhdGEsXG4gICAgICBoZWFkZXJzOiB0aGlzLm56SGVhZGVycyxcbiAgICAgIG5hbWU6IHRoaXMubnpOYW1lLFxuICAgICAgbXVsdGlwbGU6IHRoaXMubnpNdWx0aXBsZSxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy5ueldpdGhDcmVkZW50aWFscyxcbiAgICAgIGZpbHRlcnMsXG4gICAgICB0cmFuc2Zvcm1GaWxlOiB0aGlzLm56VHJhbnNmb3JtRmlsZSxcbiAgICAgIG9uU3RhcnQ6IHRoaXMub25TdGFydCxcbiAgICAgIG9uUHJvZ3Jlc3M6IHRoaXMub25Qcm9ncmVzcyxcbiAgICAgIG9uU3VjY2VzczogdGhpcy5vblN1Y2Nlc3MsXG4gICAgICBvbkVycm9yOiB0aGlzLm9uRXJyb3JcbiAgICB9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBpMThuOiBOekkxOG5TZXJ2aWNlKSB7fVxuXG4gIC8vICNyZWdpb24gdXBsb2FkXG5cbiAgcHJpdmF0ZSBmaWxlVG9PYmplY3QoZmlsZTogTnpVcGxvYWRGaWxlKTogTnpVcGxvYWRGaWxlIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGFzdE1vZGlmaWVkOiBmaWxlLmxhc3RNb2RpZmllZCxcbiAgICAgIGxhc3RNb2RpZmllZERhdGU6IGZpbGUubGFzdE1vZGlmaWVkRGF0ZSxcbiAgICAgIG5hbWU6IGZpbGUuZmlsZW5hbWUgfHwgZmlsZS5uYW1lLFxuICAgICAgc2l6ZTogZmlsZS5zaXplLFxuICAgICAgdHlwZTogZmlsZS50eXBlLFxuICAgICAgdWlkOiBmaWxlLnVpZCxcbiAgICAgIHJlc3BvbnNlOiBmaWxlLnJlc3BvbnNlLFxuICAgICAgZXJyb3I6IGZpbGUuZXJyb3IsXG4gICAgICBwZXJjZW50OiAwLFxuICAgICAgb3JpZ2luRmlsZU9iajogZmlsZSBhcyBOelNhZmVBbnlcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaWxlSXRlbShmaWxlOiBOelVwbG9hZEZpbGUsIGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSk6IE56VXBsb2FkRmlsZSB7XG4gICAgcmV0dXJuIGZpbGVMaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0udWlkID09PSBmaWxlLnVpZClbMF07XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUZpbGVJdGVtKGZpbGU6IE56VXBsb2FkRmlsZSwgZmlsZUxpc3Q6IE56VXBsb2FkRmlsZVtdKTogTnpVcGxvYWRGaWxlW10ge1xuICAgIHJldHVybiBmaWxlTGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLnVpZCAhPT0gZmlsZS51aWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblN0YXJ0ID0gKGZpbGU6IE56VXBsb2FkRmlsZSk6IHZvaWQgPT4ge1xuICAgIGlmICghdGhpcy5uekZpbGVMaXN0KSB7XG4gICAgICB0aGlzLm56RmlsZUxpc3QgPSBbXTtcbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0SXRlbSA9IHRoaXMuZmlsZVRvT2JqZWN0KGZpbGUpO1xuICAgIHRhcmdldEl0ZW0uc3RhdHVzID0gJ3VwbG9hZGluZyc7XG4gICAgdGhpcy5uekZpbGVMaXN0ID0gdGhpcy5uekZpbGVMaXN0LmNvbmNhdCh0YXJnZXRJdGVtKTtcbiAgICB0aGlzLm56RmlsZUxpc3RDaGFuZ2UuZW1pdCh0aGlzLm56RmlsZUxpc3QpO1xuICAgIHRoaXMubnpDaGFuZ2UuZW1pdCh7IGZpbGU6IHRhcmdldEl0ZW0sIGZpbGVMaXN0OiB0aGlzLm56RmlsZUxpc3QsIHR5cGU6ICdzdGFydCcgfSk7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzTGlzdCgpO1xuICB9O1xuXG4gIHByaXZhdGUgb25Qcm9ncmVzcyA9IChlOiB7IHBlcmNlbnQ6IG51bWJlciB9LCBmaWxlOiBOelVwbG9hZEZpbGUpOiB2b2lkID0+IHtcbiAgICBjb25zdCBmaWxlTGlzdCA9IHRoaXMubnpGaWxlTGlzdDtcbiAgICBjb25zdCB0YXJnZXRJdGVtID0gdGhpcy5nZXRGaWxlSXRlbShmaWxlLCBmaWxlTGlzdCk7XG4gICAgdGFyZ2V0SXRlbS5wZXJjZW50ID0gZS5wZXJjZW50O1xuICAgIHRoaXMubnpDaGFuZ2UuZW1pdCh7XG4gICAgICBldmVudDogZSxcbiAgICAgIGZpbGU6IHsgLi4udGFyZ2V0SXRlbSB9LFxuICAgICAgZmlsZUxpc3Q6IHRoaXMubnpGaWxlTGlzdCxcbiAgICAgIHR5cGU6ICdwcm9ncmVzcydcbiAgICB9KTtcbiAgICB0aGlzLmRldGVjdENoYW5nZXNMaXN0KCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBvblN1Y2Nlc3MgPSAocmVzOiB7fSwgZmlsZTogTnpVcGxvYWRGaWxlKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZmlsZUxpc3QgPSB0aGlzLm56RmlsZUxpc3Q7XG4gICAgY29uc3QgdGFyZ2V0SXRlbSA9IHRoaXMuZ2V0RmlsZUl0ZW0oZmlsZSwgZmlsZUxpc3QpO1xuICAgIHRhcmdldEl0ZW0uc3RhdHVzID0gJ2RvbmUnO1xuICAgIHRhcmdldEl0ZW0ucmVzcG9uc2UgPSByZXM7XG4gICAgdGhpcy5uekNoYW5nZS5lbWl0KHtcbiAgICAgIGZpbGU6IHsgLi4udGFyZ2V0SXRlbSB9LFxuICAgICAgZmlsZUxpc3QsXG4gICAgICB0eXBlOiAnc3VjY2VzcydcbiAgICB9KTtcbiAgICB0aGlzLmRldGVjdENoYW5nZXNMaXN0KCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBvbkVycm9yID0gKGVycjoge30sIGZpbGU6IE56VXBsb2FkRmlsZSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGZpbGVMaXN0ID0gdGhpcy5uekZpbGVMaXN0O1xuICAgIGNvbnN0IHRhcmdldEl0ZW0gPSB0aGlzLmdldEZpbGVJdGVtKGZpbGUsIGZpbGVMaXN0KTtcbiAgICB0YXJnZXRJdGVtLmVycm9yID0gZXJyO1xuICAgIHRhcmdldEl0ZW0uc3RhdHVzID0gJ2Vycm9yJztcbiAgICB0aGlzLm56Q2hhbmdlLmVtaXQoe1xuICAgICAgZmlsZTogeyAuLi50YXJnZXRJdGVtIH0sXG4gICAgICBmaWxlTGlzdCxcbiAgICAgIHR5cGU6ICdlcnJvcidcbiAgICB9KTtcbiAgICB0aGlzLmRldGVjdENoYW5nZXNMaXN0KCk7XG4gIH07XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gZHJhZ1xuXG4gIHByaXZhdGUgZHJhZ1N0YXRlPzogc3RyaW5nO1xuXG4gIC8vIHNraXAgc2FmYXJpIGJ1Z1xuICBmaWxlRHJvcChlOiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZS50eXBlID09PSB0aGlzLmRyYWdTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRyYWdTdGF0ZSA9IGUudHlwZTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBsaXN0XG5cbiAgcHJpdmF0ZSBkZXRlY3RDaGFuZ2VzTGlzdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5saXN0Q29tcD8uZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgb25SZW1vdmUgPSAoZmlsZTogTnpVcGxvYWRGaWxlKTogdm9pZCA9PiB7XG4gICAgdGhpcy51cGxvYWRDb21wLmFib3J0KGZpbGUpO1xuICAgIGZpbGUuc3RhdHVzID0gJ3JlbW92ZWQnO1xuICAgIGNvbnN0IGZuUmVzID0gdHlwZW9mIHRoaXMubnpSZW1vdmUgPT09ICdmdW5jdGlvbicgPyB0aGlzLm56UmVtb3ZlKGZpbGUpIDogdGhpcy5uelJlbW92ZSA9PSBudWxsID8gdHJ1ZSA6IHRoaXMubnpSZW1vdmU7XG4gICAgKGZuUmVzIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSA/IGZuUmVzIDogb2YoZm5SZXMpKS5waXBlKGZpbHRlcigocmVzOiBib29sZWFuKSA9PiByZXMpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5uekZpbGVMaXN0ID0gdGhpcy5yZW1vdmVGaWxlSXRlbShmaWxlLCB0aGlzLm56RmlsZUxpc3QpO1xuICAgICAgdGhpcy5uekNoYW5nZS5lbWl0KHtcbiAgICAgICAgZmlsZSxcbiAgICAgICAgZmlsZUxpc3Q6IHRoaXMubnpGaWxlTGlzdCxcbiAgICAgICAgdHlwZTogJ3JlbW92ZWQnXG4gICAgICB9KTtcbiAgICAgIHRoaXMubnpGaWxlTGlzdENoYW5nZS5lbWl0KHRoaXMubnpGaWxlTGlzdCk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gc3R5bGVzXG5cbiAgcHJpdmF0ZSBwcmVmaXhDbHMgPSAnYW50LXVwbG9hZCc7XG4gIGNsYXNzTGlzdDogc3RyaW5nW10gPSBbXTtcblxuICBwcml2YXRlIHNldENsYXNzTWFwKCk6IHZvaWQge1xuICAgIGxldCBzdWJDbHM6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKHRoaXMubnpUeXBlID09PSAnZHJhZycpIHtcbiAgICAgIGlmICh0aGlzLm56RmlsZUxpc3Quc29tZShmaWxlID0+IGZpbGUuc3RhdHVzID09PSAndXBsb2FkaW5nJykpIHtcbiAgICAgICAgc3ViQ2xzLnB1c2goYCR7dGhpcy5wcmVmaXhDbHN9LWRyYWctdXBsb2FkaW5nYCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kcmFnU3RhdGUgPT09ICdkcmFnb3ZlcicpIHtcbiAgICAgICAgc3ViQ2xzLnB1c2goYCR7dGhpcy5wcmVmaXhDbHN9LWRyYWctaG92ZXJgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3ViQ2xzID0gW2Ake3RoaXMucHJlZml4Q2xzfS1zZWxlY3QtJHt0aGlzLm56TGlzdFR5cGV9YF07XG4gICAgfVxuXG4gICAgdGhpcy5jbGFzc0xpc3QgPSBbXG4gICAgICB0aGlzLnByZWZpeENscyxcbiAgICAgIGAke3RoaXMucHJlZml4Q2xzfS0ke3RoaXMubnpUeXBlfWAsXG4gICAgICAuLi5zdWJDbHMsXG4gICAgICAodGhpcy5uekRpc2FibGVkICYmIGAke3RoaXMucHJlZml4Q2xzfS1kaXNhYmxlZGApIHx8ICcnXG4gICAgXS5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0pO1xuXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaTE4biQgPSB0aGlzLmkxOG4ubG9jYWxlQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmxvY2FsZSA9IHRoaXMuaTE4bi5nZXRMb2NhbGVEYXRhKCdVcGxvYWQnKTtcbiAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc0xpc3QoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuemlwT3B0aW9ucygpLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmkxOG4kLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==