import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { InputBoolean, InputNumber, toBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/i18n";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "./upload-list.component";
import * as i4 from "./upload-btn.component";
import * as i5 from "@angular/common";
export class NzUploadComponent {
    // #endregion
    constructor(cdr, i18n, directionality) {
        this.cdr = cdr;
        this.i18n = i18n;
        this.directionality = directionality;
        this.destroy$ = new Subject();
        this.dir = 'ltr';
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
        this.onStart = (file) => {
            if (!this.nzFileList) {
                this.nzFileList = [];
            }
            const targetItem = this.fileToObject(file);
            targetItem.status = 'uploading';
            this.nzFileList = this.nzFileList.concat(targetItem);
            this.nzFileListChange.emit(this.nzFileList);
            this.nzChange.emit({ file: targetItem, fileList: this.nzFileList, type: 'start' });
            this.detectChangesList();
        };
        this.onProgress = (e, file) => {
            const fileList = this.nzFileList;
            const targetItem = this.getFileItem(file, fileList);
            targetItem.percent = e.percent;
            this.nzChange.emit({
                event: e,
                file: { ...targetItem },
                fileList: this.nzFileList,
                type: 'progress'
            });
            this.detectChangesList();
        };
        this.onSuccess = (res, file) => {
            const fileList = this.nzFileList;
            const targetItem = this.getFileItem(file, fileList);
            targetItem.status = 'done';
            targetItem.response = res;
            this.nzChange.emit({
                file: { ...targetItem },
                fileList,
                type: 'success'
            });
            this.detectChangesList();
        };
        this.onError = (err, file) => {
            const fileList = this.nzFileList;
            const targetItem = this.getFileItem(file, fileList);
            targetItem.error = err;
            targetItem.status = 'error';
            this.nzChange.emit({
                file: { ...targetItem },
                fileList,
                type: 'error'
            });
            this.detectChangesList();
        };
        this.onRemove = (file) => {
            this.uploadComp.abort(file);
            file.status = 'removed';
            const fnRes = typeof this.nzRemove === 'function' ? this.nzRemove(file) : this.nzRemove == null ? true : this.nzRemove;
            (fnRes instanceof Observable ? fnRes : of(fnRes)).pipe(filter((res) => res)).subscribe(() => {
                this.nzFileList = this.removeFileItem(file, this.nzFileList);
                this.nzChange.emit({
                    file,
                    fileList: this.nzFileList,
                    type: 'removed'
                });
                this.nzFileListChange.emit(this.nzFileList);
                this.cdr.detectChanges();
            });
        };
        // #endregion
        // #region styles
        this.prefixCls = 'ant-upload';
        this.classList = [];
    }
    set nzShowUploadList(value) {
        this._showUploadList = typeof value === 'boolean' ? toBoolean(value) : value;
    }
    get nzShowUploadList() {
        return this._showUploadList;
    }
    zipOptions() {
        if (typeof this.nzShowUploadList === 'boolean' && this.nzShowUploadList) {
            this.nzShowUploadList = {
                showPreviewIcon: true,
                showRemoveIcon: true,
                showDownloadIcon: true
            };
        }
        // filters
        const filters = this.nzFilter.slice();
        if (this.nzMultiple && this.nzLimit > 0 && filters.findIndex(w => w.name === 'limit') === -1) {
            filters.push({
                name: 'limit',
                fn: (fileList) => fileList.slice(-this.nzLimit)
            });
        }
        if (this.nzSize > 0 && filters.findIndex(w => w.name === 'size') === -1) {
            filters.push({
                name: 'size',
                fn: (fileList) => fileList.filter(w => w.size / 1024 <= this.nzSize)
            });
        }
        if (this.nzFileType && this.nzFileType.length > 0 && filters.findIndex(w => w.name === 'type') === -1) {
            const types = this.nzFileType.split(',');
            filters.push({
                name: 'type',
                fn: (fileList) => fileList.filter(w => ~types.indexOf(w.type))
            });
        }
        this._btnOptions = {
            disabled: this.nzDisabled,
            accept: this.nzAccept,
            action: this.nzAction,
            directory: this.nzDirectory,
            openFileDialogOnClick: this.nzOpenFileDialogOnClick,
            beforeUpload: this.nzBeforeUpload,
            customRequest: this.nzCustomRequest,
            data: this.nzData,
            headers: this.nzHeaders,
            name: this.nzName,
            multiple: this.nzMultiple,
            withCredentials: this.nzWithCredentials,
            filters,
            transformFile: this.nzTransformFile,
            onStart: this.onStart,
            onProgress: this.onProgress,
            onSuccess: this.onSuccess,
            onError: this.onError
        };
        return this;
    }
    // #region upload
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
            originFileObj: file
        };
    }
    getFileItem(file, fileList) {
        return fileList.filter(item => item.uid === file.uid)[0];
    }
    removeFileItem(file, fileList) {
        return fileList.filter(item => item.uid !== file.uid);
    }
    // skip safari bug
    fileDrop(e) {
        if (e.type === this.dragState) {
            return;
        }
        this.dragState = e.type;
        this.setClassMap();
    }
    // #endregion
    // #region list
    detectChangesList() {
        this.cdr.detectChanges();
        this.listComp?.detectChanges();
    }
    setClassMap() {
        let subCls = [];
        if (this.nzType === 'drag') {
            if (this.nzFileList.some(file => file.status === 'uploading')) {
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
            (this.nzDisabled && `${this.prefixCls}-disabled`) || '',
            (this.dir === 'rtl' && `${this.prefixCls}-rtl`) || ''
        ].filter(item => !!item);
        this.cdr.detectChanges();
    }
    // #endregion
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.setClassMap();
            this.cdr.detectChanges();
        });
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Upload');
            this.detectChangesList();
        });
    }
    ngOnChanges() {
        this.zipOptions().setClassMap();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzUploadComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NzI18nService }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzUploadComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzUploadComponent, selector: "nz-upload", inputs: { nzType: "nzType", nzLimit: "nzLimit", nzSize: "nzSize", nzFileType: "nzFileType", nzAccept: "nzAccept", nzAction: "nzAction", nzDirectory: "nzDirectory", nzOpenFileDialogOnClick: "nzOpenFileDialogOnClick", nzBeforeUpload: "nzBeforeUpload", nzCustomRequest: "nzCustomRequest", nzData: "nzData", nzFilter: "nzFilter", nzFileList: "nzFileList", nzDisabled: "nzDisabled", nzHeaders: "nzHeaders", nzListType: "nzListType", nzMultiple: "nzMultiple", nzName: "nzName", nzShowUploadList: "nzShowUploadList", nzShowButton: "nzShowButton", nzWithCredentials: "nzWithCredentials", nzRemove: "nzRemove", nzPreview: "nzPreview", nzPreviewFile: "nzPreviewFile", nzPreviewIsImage: "nzPreviewIsImage", nzTransformFile: "nzTransformFile", nzDownload: "nzDownload", nzIconRender: "nzIconRender", nzFileListRender: "nzFileListRender" }, outputs: { nzChange: "nzChange", nzFileListChange: "nzFileListChange" }, host: { properties: { "class.ant-upload-picture-card-wrapper": "nzListType === \"picture-card\"" } }, viewQueries: [{ propertyName: "uploadComp", first: true, predicate: ["uploadComp"], descendants: true }, { propertyName: "listComp", first: true, predicate: ["listComp"], descendants: true }], exportAs: ["nzUpload"], usesOnChanges: true, ngImport: i0, template: "<ng-template #list>\n  <nz-upload-list\n    *ngIf=\"locale && !nzFileListRender\"\n    #listComp\n    [style.display]=\"nzShowUploadList ? '' : 'none'\"\n    [locale]=\"locale\"\n    [listType]=\"nzListType\"\n    [items]=\"nzFileList || []\"\n    [icons]=\"$any(nzShowUploadList)\"\n    [iconRender]=\"nzIconRender\"\n    [previewFile]=\"nzPreviewFile\"\n    [previewIsImage]=\"nzPreviewIsImage\"\n    [onPreview]=\"nzPreview\"\n    [onRemove]=\"onRemove\"\n    [onDownload]=\"nzDownload\"\n    [dir]=\"dir\"\n  ></nz-upload-list>\n  <ng-container *ngIf=\"nzFileListRender\">\n    <ng-container *ngTemplateOutlet=\"nzFileListRender; context: { $implicit: nzFileList }\"></ng-container>\n  </ng-container>\n</ng-template>\n<ng-template #con><ng-content></ng-content></ng-template>\n<ng-template #btn>\n  <div [ngClass]=\"classList\" [style.display]=\"nzShowButton ? '' : 'none'\">\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\">\n      <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\n    </div>\n  </div>\n</ng-template>\n<ng-container *ngIf=\"nzType === 'drag'; else select\">\n  <div [ngClass]=\"classList\" (drop)=\"fileDrop($event)\" (dragover)=\"fileDrop($event)\" (dragleave)=\"fileDrop($event)\">\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\" class=\"ant-upload-btn\">\n      <div class=\"ant-upload-drag-container\">\n        <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\n      </div>\n    </div>\n  </div>\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n</ng-container>\n<ng-template #select>\n  <ng-container *ngIf=\"nzListType === 'picture-card'; else pic\">\n    <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n    <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\n  </ng-container>\n</ng-template>\n<ng-template #pic>\n  <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n</ng-template>\n", components: [{ type: i3.NzUploadListComponent, selector: "nz-upload-list", inputs: ["locale", "listType", "items", "icons", "onPreview", "onRemove", "onDownload", "previewFile", "previewIsImage", "iconRender", "dir"], exportAs: ["nzUploadList"] }, { type: i4.NzUploadBtnComponent, selector: "[nz-upload-btn]", inputs: ["options"], exportAs: ["nzUploadBtn"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputNumber()
], NzUploadComponent.prototype, "nzLimit", void 0);
__decorate([
    InputNumber()
], NzUploadComponent.prototype, "nzSize", void 0);
__decorate([
    InputBoolean()
], NzUploadComponent.prototype, "nzDirectory", void 0);
__decorate([
    InputBoolean()
], NzUploadComponent.prototype, "nzOpenFileDialogOnClick", void 0);
__decorate([
    InputBoolean()
], NzUploadComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzUploadComponent.prototype, "nzMultiple", void 0);
__decorate([
    InputBoolean()
], NzUploadComponent.prototype, "nzShowButton", void 0);
__decorate([
    InputBoolean()
], NzUploadComponent.prototype, "nzWithCredentials", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nz-upload', exportAs: 'nzUpload', preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.ant-upload-picture-card-wrapper]': 'nzListType === "picture-card"'
                    }, template: "<ng-template #list>\n  <nz-upload-list\n    *ngIf=\"locale && !nzFileListRender\"\n    #listComp\n    [style.display]=\"nzShowUploadList ? '' : 'none'\"\n    [locale]=\"locale\"\n    [listType]=\"nzListType\"\n    [items]=\"nzFileList || []\"\n    [icons]=\"$any(nzShowUploadList)\"\n    [iconRender]=\"nzIconRender\"\n    [previewFile]=\"nzPreviewFile\"\n    [previewIsImage]=\"nzPreviewIsImage\"\n    [onPreview]=\"nzPreview\"\n    [onRemove]=\"onRemove\"\n    [onDownload]=\"nzDownload\"\n    [dir]=\"dir\"\n  ></nz-upload-list>\n  <ng-container *ngIf=\"nzFileListRender\">\n    <ng-container *ngTemplateOutlet=\"nzFileListRender; context: { $implicit: nzFileList }\"></ng-container>\n  </ng-container>\n</ng-template>\n<ng-template #con><ng-content></ng-content></ng-template>\n<ng-template #btn>\n  <div [ngClass]=\"classList\" [style.display]=\"nzShowButton ? '' : 'none'\">\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\">\n      <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\n    </div>\n  </div>\n</ng-template>\n<ng-container *ngIf=\"nzType === 'drag'; else select\">\n  <div [ngClass]=\"classList\" (drop)=\"fileDrop($event)\" (dragover)=\"fileDrop($event)\" (dragleave)=\"fileDrop($event)\">\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\" class=\"ant-upload-btn\">\n      <div class=\"ant-upload-drag-container\">\n        <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\n      </div>\n    </div>\n  </div>\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n</ng-container>\n<ng-template #select>\n  <ng-container *ngIf=\"nzListType === 'picture-card'; else pic\">\n    <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n    <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\n  </ng-container>\n</ng-template>\n<ng-template #pic>\n  <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NzI18nService }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { uploadComp: [{
                type: ViewChild,
                args: ['uploadComp', { static: false }]
            }], listComp: [{
                type: ViewChild,
                args: ['listComp', { static: false }]
            }], nzType: [{
                type: Input
            }], nzLimit: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzFileType: [{
                type: Input
            }], nzAccept: [{
                type: Input
            }], nzAction: [{
                type: Input
            }], nzDirectory: [{
                type: Input
            }], nzOpenFileDialogOnClick: [{
                type: Input
            }], nzBeforeUpload: [{
                type: Input
            }], nzCustomRequest: [{
                type: Input
            }], nzData: [{
                type: Input
            }], nzFilter: [{
                type: Input
            }], nzFileList: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzHeaders: [{
                type: Input
            }], nzListType: [{
                type: Input
            }], nzMultiple: [{
                type: Input
            }], nzName: [{
                type: Input
            }], nzShowUploadList: [{
                type: Input
            }], nzShowButton: [{
                type: Input
            }], nzWithCredentials: [{
                type: Input
            }], nzRemove: [{
                type: Input
            }], nzPreview: [{
                type: Input
            }], nzPreviewFile: [{
                type: Input
            }], nzPreviewIsImage: [{
                type: Input
            }], nzTransformFile: [{
                type: Input
            }], nzDownload: [{
                type: Input
            }], nzIconRender: [{
                type: Input
            }], nzFileListRender: [{
                type: Input
            }], nzChange: [{
                type: Output
            }], nzFileListChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdXBsb2FkL3VwbG9hZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi9jb21wb25lbnRzL3VwbG9hZC91cGxvYWQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFFTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUduRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7OztBQTZCL0UsTUFBTSxPQUFPLGlCQUFpQjtJQXdINUIsYUFBYTtJQUViLFlBQ1UsR0FBc0IsRUFDdEIsSUFBbUIsRUFDUCxjQUE4QjtRQUYxQyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixTQUFJLEdBQUosSUFBSSxDQUFlO1FBQ1AsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBbEg1QyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUt2QyxRQUFHLEdBQWMsS0FBSyxDQUFDO1FBRXZCLGlCQUFpQjtRQUVSLFdBQU0sR0FBaUIsUUFBUSxDQUFDO1FBQ2pCLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBS1YsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsNEJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBSS9DLGFBQVEsR0FBbUIsRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBbUIs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Q0FBQztnQkFDWCxJQUFJLEVBQUUsT0FBTztnQkFDYixFQUFFLEVBQUUsQ0FBQyxRQUF3QixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUNoRSxDQUFDLENBQUM7U0FDSjtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDWCxJQUFJLEVBQUUsTUFBTTtnQkFDWixFQUFFLEVBQUUsQ0FBQyxRQUF3QixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUssR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUN0RixDQUFDLENBQUM7U0FDSjtRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDckcsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDWCxJQUFJLEVBQUUsTUFBTTtnQkFDWixFQUFFLEVBQUUsQ0FBQyxRQUF3QixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFLLENBQUMsQ0FBQzthQUNoRixDQUFDLENBQUM7U0FDSjtRQUNELElBQUks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RSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBQ0EsUUFBUTtzQkFBakQsU0FBUzt1QkFBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQU8vQixNQUFNO3NCQUFkLEtBQUs7Z0JBQ2tCLE9BQU87c0JBQTlCLEtBQUs7Z0JBQ2tCLE1BQU07c0JBQTdCLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ21CLFdBQVc7c0JBQW5DLEtBQUs7Z0JBQ21CLHVCQUF1QjtzQkFBL0MsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDbUIsVUFBVTtzQkFBbEMsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ21CLFVBQVU7c0JBQWxDLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUtGLGdCQUFnQjtzQkFEbkIsS0FBSztnQkFTbUIsWUFBWTtzQkFBcEMsS0FBSztnQkFDbUIsaUJBQWlCO3NCQUF6QyxLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBRWEsUUFBUTtzQkFBMUIsTUFBTTtnQkFDWSxnQkFBZ0I7c0JBQWxDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnVtYmVySW5wdXQsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIElucHV0TnVtYmVyLCB0b0Jvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBOekkxOG5TZXJ2aWNlLCBOelVwbG9hZEkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuXG5pbXBvcnQge1xuICBOekljb25SZW5kZXJUZW1wbGF0ZSxcbiAgTnpTaG93VXBsb2FkTGlzdCxcbiAgTnpVcGxvYWRDaGFuZ2VQYXJhbSxcbiAgTnpVcGxvYWRGaWxlLFxuICBOelVwbG9hZExpc3RUeXBlLFxuICBOelVwbG9hZFRyYW5zZm9ybUZpbGVUeXBlLFxuICBOelVwbG9hZFR5cGUsXG4gIE56VXBsb2FkWEhSQXJncyxcbiAgVXBsb2FkRmlsdGVyLFxuICBaaXBCdXR0b25PcHRpb25zXG59IGZyb20gJy4vaW50ZXJmYWNlJztcbmltcG9ydCB7IE56VXBsb2FkQnRuQ29tcG9uZW50IH0gZnJvbSAnLi91cGxvYWQtYnRuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelVwbG9hZExpc3RDb21wb25lbnQgfSBmcm9tICcuL3VwbG9hZC1saXN0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXVwbG9hZCcsXG4gIGV4cG9ydEFzOiAnbnpVcGxvYWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vdXBsb2FkLmNvbXBvbmVudC5odG1sJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdXBsb2FkLXBpY3R1cmUtY2FyZC13cmFwcGVyXSc6ICduekxpc3RUeXBlID09PSBcInBpY3R1cmUtY2FyZFwiJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VXBsb2FkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekxpbWl0OiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2l6ZTogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpcmVjdG9yeTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpPcGVuRmlsZURpYWxvZ09uQ2xpY2s6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TXVsdGlwbGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd1VwbG9hZExpc3Q6IEJvb2xlYW5JbnB1dCB8IE56U2hvd1VwbG9hZExpc3Q7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dCdXR0b246IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256V2l0aENyZWRlbnRpYWxzOiBCb29sZWFuSW5wdXQ7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIEBWaWV3Q2hpbGQoJ3VwbG9hZENvbXAnLCB7IHN0YXRpYzogZmFsc2UgfSkgdXBsb2FkQ29tcCE6IE56VXBsb2FkQnRuQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdsaXN0Q29tcCcsIHsgc3RhdGljOiBmYWxzZSB9KSBsaXN0Q29tcCE6IE56VXBsb2FkTGlzdENvbXBvbmVudDtcblxuICBsb2NhbGUhOiBOelVwbG9hZEkxOG5JbnRlcmZhY2U7XG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG5cbiAgLy8gI3JlZ2lvbiBmaWVsZHNcblxuICBASW5wdXQoKSBuelR5cGU6IE56VXBsb2FkVHlwZSA9ICdzZWxlY3QnO1xuICBASW5wdXQoKSBASW5wdXROdW1iZXIoKSBuekxpbWl0ID0gMDtcbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgbnpTaXplID0gMDtcblxuICBASW5wdXQoKSBuekZpbGVUeXBlPzogc3RyaW5nO1xuICBASW5wdXQoKSBuekFjY2VwdD86IHN0cmluZyB8IHN0cmluZ1tdO1xuICBASW5wdXQoKSBuekFjdGlvbj86IHN0cmluZyB8ICgoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBzdHJpbmcgfCBPYnNlcnZhYmxlPHN0cmluZz4pO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXJlY3RvcnkgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56T3BlbkZpbGVEaWFsb2dPbkNsaWNrID0gdHJ1ZTtcbiAgQElucHV0KCkgbnpCZWZvcmVVcGxvYWQ/OiAoZmlsZTogTnpVcGxvYWRGaWxlLCBmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pID0+IGJvb2xlYW4gfCBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBASW5wdXQoKSBuekN1c3RvbVJlcXVlc3Q/OiAoaXRlbTogTnpVcGxvYWRYSFJBcmdzKSA9PiBTdWJzY3JpcHRpb247XG4gIEBJbnB1dCgpIG56RGF0YT86IHt9IHwgKChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHt9IHwgT2JzZXJ2YWJsZTx7fT4pO1xuICBASW5wdXQoKSBuekZpbHRlcjogVXBsb2FkRmlsdGVyW10gPSBbXTtcbiAgQElucHV0KCkgbnpGaWxlTGlzdDogTnpVcGxvYWRGaWxlW10gPSBbXTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpIZWFkZXJzPzoge30gfCAoKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4ge30gfCBPYnNlcnZhYmxlPHt9Pik7XG4gIEBJbnB1dCgpIG56TGlzdFR5cGU6IE56VXBsb2FkTGlzdFR5cGUgPSAndGV4dCc7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek11bHRpcGxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56TmFtZSA9ICdmaWxlJztcblxuICBwcml2YXRlIF9zaG93VXBsb2FkTGlzdDogYm9vbGVhbiB8IE56U2hvd1VwbG9hZExpc3QgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuelNob3dVcGxvYWRMaXN0KHZhbHVlOiBib29sZWFuIHwgTnpTaG93VXBsb2FkTGlzdCkge1xuICAgIHRoaXMuX3Nob3dVcGxvYWRMaXN0ID0gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgPyB0b0Jvb2xlYW4odmFsdWUpIDogdmFsdWU7XG4gIH1cblxuICBnZXQgbnpTaG93VXBsb2FkTGlzdCgpOiBib29sZWFuIHwgTnpTaG93VXBsb2FkTGlzdCB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dVcGxvYWRMaXN0O1xuICB9XG5cbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2hvd0J1dHRvbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBueldpdGhDcmVkZW50aWFscyA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIG56UmVtb3ZlPzogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gYm9vbGVhbiB8IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIEBJbnB1dCgpIG56UHJldmlldz86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIG56UHJldmlld0ZpbGU/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIEBJbnB1dCgpIG56UHJldmlld0lzSW1hZ2U/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBib29sZWFuO1xuICBASW5wdXQoKSBuelRyYW5zZm9ybUZpbGU/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBOelVwbG9hZFRyYW5zZm9ybUZpbGVUeXBlO1xuICBASW5wdXQoKSBuekRvd25sb2FkPzogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gdm9pZDtcbiAgQElucHV0KCkgbnpJY29uUmVuZGVyOiBOekljb25SZW5kZXJUZW1wbGF0ZSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekZpbGVMaXN0UmVuZGVyOiBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBuekNoYW5nZTogRXZlbnRFbWl0dGVyPE56VXBsb2FkQ2hhbmdlUGFyYW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxOelVwbG9hZENoYW5nZVBhcmFtPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpGaWxlTGlzdENoYW5nZTogRXZlbnRFbWl0dGVyPE56VXBsb2FkRmlsZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8TnpVcGxvYWRGaWxlW10+KCk7XG5cbiAgX2J0bk9wdGlvbnM/OiBaaXBCdXR0b25PcHRpb25zO1xuXG4gIHByaXZhdGUgemlwT3B0aW9ucygpOiB0aGlzIHtcbiAgICBpZiAodHlwZW9mIHRoaXMubnpTaG93VXBsb2FkTGlzdCA9PT0gJ2Jvb2xlYW4nICYmIHRoaXMubnpTaG93VXBsb2FkTGlzdCkge1xuICAgICAgdGhpcy5uelNob3dVcGxvYWRMaXN0ID0ge1xuICAgICAgICBzaG93UHJldmlld0ljb246IHRydWUsXG4gICAgICAgIHNob3dSZW1vdmVJY29uOiB0cnVlLFxuICAgICAgICBzaG93RG93bmxvYWRJY29uOiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBmaWx0ZXJzXG4gICAgY29uc3QgZmlsdGVyczogVXBsb2FkRmlsdGVyW10gPSB0aGlzLm56RmlsdGVyLnNsaWNlKCk7XG4gICAgaWYgKHRoaXMubnpNdWx0aXBsZSAmJiB0aGlzLm56TGltaXQgPiAwICYmIGZpbHRlcnMuZmluZEluZGV4KHcgPT4gdy5uYW1lID09PSAnbGltaXQnKSA9PT0gLTEpIHtcbiAgICAgIGZpbHRlcnMucHVzaCh7XG4gICAgICAgIG5hbWU6ICdsaW1pdCcsXG4gICAgICAgIGZuOiAoZmlsZUxpc3Q6IE56VXBsb2FkRmlsZVtdKSA9PiBmaWxlTGlzdC5zbGljZSgtdGhpcy5uekxpbWl0KVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm56U2l6ZSA+IDAgJiYgZmlsdGVycy5maW5kSW5kZXgodyA9PiB3Lm5hbWUgPT09ICdzaXplJykgPT09IC0xKSB7XG4gICAgICBmaWx0ZXJzLnB1c2goe1xuICAgICAgICBuYW1lOiAnc2l6ZScsXG4gICAgICAgIGZuOiAoZmlsZUxpc3Q6IE56VXBsb2FkRmlsZVtdKSA9PiBmaWxlTGlzdC5maWx0ZXIodyA9PiB3LnNpemUhIC8gMTAyNCA8PSB0aGlzLm56U2l6ZSlcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5uekZpbGVUeXBlICYmIHRoaXMubnpGaWxlVHlwZS5sZW5ndGggPiAwICYmIGZpbHRlcnMuZmluZEluZGV4KHcgPT4gdy5uYW1lID09PSAndHlwZScpID09PSAtMSkge1xuICAgICAgY29uc3QgdHlwZXMgPSB0aGlzLm56RmlsZVR5cGUuc3BsaXQoJywnKTtcbiAgICAgIGZpbHRlcnMucHVzaCh7XG4gICAgICAgIG5hbWU6ICd0eXBlJyxcbiAgICAgICAgZm46IChmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pID0+IGZpbGVMaXN0LmZpbHRlcih3ID0+IH50eXBlcy5pbmRleE9mKHcudHlwZSEpKVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2J0bk9wdGlvbnMgPSB7XG4gICAgICBkaXNhYmxlZDogdGhpcy5uekRpc2FibGVkLFxuICAgICAgYWNjZXB0OiB0aGlzLm56QWNjZXB0LFxuICAgICAgYWN0aW9uOiB0aGlzLm56QWN0aW9uLFxuICAgICAgZGlyZWN0b3J5OiB0aGlzLm56RGlyZWN0b3J5LFxuICAgICAgb3BlbkZpbGVEaWFsb2dPbkNsaWNrOiB0aGlzLm56T3BlbkZpbGVEaWFsb2dPbkNsaWNrLFxuICAgICAgYmVmb3JlVXBsb2FkOiB0aGlzLm56QmVmb3JlVXBsb2FkLFxuICAgICAgY3VzdG9tUmVxdWVzdDogdGhpcy5uekN1c3RvbVJlcXVlc3QsXG4gICAgICBkYXRhOiB0aGlzLm56RGF0YSxcbiAgICAgIGhlYWRlcnM6IHRoaXMubnpIZWFkZXJzLFxuICAgICAgbmFtZTogdGhpcy5uek5hbWUsXG4gICAgICBtdWx0aXBsZTogdGhpcy5uek11bHRpcGxlLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLm56V2l0aENyZWRlbnRpYWxzLFxuICAgICAgZmlsdGVycyxcbiAgICAgIHRyYW5zZm9ybUZpbGU6IHRoaXMubnpUcmFuc2Zvcm1GaWxlLFxuICAgICAgb25TdGFydDogdGhpcy5vblN0YXJ0LFxuICAgICAgb25Qcm9ncmVzczogdGhpcy5vblByb2dyZXNzLFxuICAgICAgb25TdWNjZXNzOiB0aGlzLm9uU3VjY2VzcyxcbiAgICAgIG9uRXJyb3I6IHRoaXMub25FcnJvclxuICAgIH07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgaTE4bjogTnpJMThuU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eVxuICApIHt9XG5cbiAgLy8gI3JlZ2lvbiB1cGxvYWRcblxuICBwcml2YXRlIGZpbGVUb09iamVjdChmaWxlOiBOelVwbG9hZEZpbGUpOiBOelVwbG9hZEZpbGUge1xuICAgIHJldHVybiB7XG4gICAgICBsYXN0TW9kaWZpZWQ6IGZpbGUubGFzdE1vZGlmaWVkLFxuICAgICAgbGFzdE1vZGlmaWVkRGF0ZTogZmlsZS5sYXN0TW9kaWZpZWREYXRlLFxuICAgICAgbmFtZTogZmlsZS5maWxlbmFtZSB8fCBmaWxlLm5hbWUsXG4gICAgICBzaXplOiBmaWxlLnNpemUsXG4gICAgICB0eXBlOiBmaWxlLnR5cGUsXG4gICAgICB1aWQ6IGZpbGUudWlkLFxuICAgICAgcmVzcG9uc2U6IGZpbGUucmVzcG9uc2UsXG4gICAgICBlcnJvcjogZmlsZS5lcnJvcixcbiAgICAgIHBlcmNlbnQ6IDAsXG4gICAgICBvcmlnaW5GaWxlT2JqOiBmaWxlIGFzIE56U2FmZUFueVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldEZpbGVJdGVtKGZpbGU6IE56VXBsb2FkRmlsZSwgZmlsZUxpc3Q6IE56VXBsb2FkRmlsZVtdKTogTnpVcGxvYWRGaWxlIHtcbiAgICByZXR1cm4gZmlsZUxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS51aWQgPT09IGZpbGUudWlkKVswXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlRmlsZUl0ZW0oZmlsZTogTnpVcGxvYWRGaWxlLCBmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pOiBOelVwbG9hZEZpbGVbXSB7XG4gICAgcmV0dXJuIGZpbGVMaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0udWlkICE9PSBmaWxlLnVpZCk7XG4gIH1cblxuICBwcml2YXRlIG9uU3RhcnQgPSAoZmlsZTogTnpVcGxvYWRGaWxlKTogdm9pZCA9PiB7XG4gICAgaWYgKCF0aGlzLm56RmlsZUxpc3QpIHtcbiAgICAgIHRoaXMubnpGaWxlTGlzdCA9IFtdO1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXRJdGVtID0gdGhpcy5maWxlVG9PYmplY3QoZmlsZSk7XG4gICAgdGFyZ2V0SXRlbS5zdGF0dXMgPSAndXBsb2FkaW5nJztcbiAgICB0aGlzLm56RmlsZUxpc3QgPSB0aGlzLm56RmlsZUxpc3QuY29uY2F0KHRhcmdldEl0ZW0pO1xuICAgIHRoaXMubnpGaWxlTGlzdENoYW5nZS5lbWl0KHRoaXMubnpGaWxlTGlzdCk7XG4gICAgdGhpcy5uekNoYW5nZS5lbWl0KHsgZmlsZTogdGFyZ2V0SXRlbSwgZmlsZUxpc3Q6IHRoaXMubnpGaWxlTGlzdCwgdHlwZTogJ3N0YXJ0JyB9KTtcbiAgICB0aGlzLmRldGVjdENoYW5nZXNMaXN0KCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBvblByb2dyZXNzID0gKGU6IHsgcGVyY2VudDogbnVtYmVyIH0sIGZpbGU6IE56VXBsb2FkRmlsZSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGZpbGVMaXN0ID0gdGhpcy5uekZpbGVMaXN0O1xuICAgIGNvbnN0IHRhcmdldEl0ZW0gPSB0aGlzLmdldEZpbGVJdGVtKGZpbGUsIGZpbGVMaXN0KTtcbiAgICB0YXJnZXRJdGVtLnBlcmNlbnQgPSBlLnBlcmNlbnQ7XG4gICAgdGhpcy5uekNoYW5nZS5lbWl0KHtcbiAgICAgIGV2ZW50OiBlLFxuICAgICAgZmlsZTogeyAuLi50YXJnZXRJdGVtIH0sXG4gICAgICBmaWxlTGlzdDogdGhpcy5uekZpbGVMaXN0LFxuICAgICAgdHlwZTogJ3Byb2dyZXNzJ1xuICAgIH0pO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc0xpc3QoKTtcbiAgfTtcblxuICBwcml2YXRlIG9uU3VjY2VzcyA9IChyZXM6IHt9LCBmaWxlOiBOelVwbG9hZEZpbGUpOiB2b2lkID0+IHtcbiAgICBjb25zdCBmaWxlTGlzdCA9IHRoaXMubnpGaWxlTGlzdDtcbiAgICBjb25zdCB0YXJnZXRJdGVtID0gdGhpcy5nZXRGaWxlSXRlbShmaWxlLCBmaWxlTGlzdCk7XG4gICAgdGFyZ2V0SXRlbS5zdGF0dXMgPSAnZG9uZSc7XG4gICAgdGFyZ2V0SXRlbS5yZXNwb25zZSA9IHJlcztcbiAgICB0aGlzLm56Q2hhbmdlLmVtaXQoe1xuICAgICAgZmlsZTogeyAuLi50YXJnZXRJdGVtIH0sXG4gICAgICBmaWxlTGlzdCxcbiAgICAgIHR5cGU6ICdzdWNjZXNzJ1xuICAgIH0pO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc0xpc3QoKTtcbiAgfTtcblxuICBwcml2YXRlIG9uRXJyb3IgPSAoZXJyOiB7fSwgZmlsZTogTnpVcGxvYWRGaWxlKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZmlsZUxpc3QgPSB0aGlzLm56RmlsZUxpc3Q7XG4gICAgY29uc3QgdGFyZ2V0SXRlbSA9IHRoaXMuZ2V0RmlsZUl0ZW0oZmlsZSwgZmlsZUxpc3QpO1xuICAgIHRhcmdldEl0ZW0uZXJyb3IgPSBlcnI7XG4gICAgdGFyZ2V0SXRlbS5zdGF0dXMgPSAnZXJyb3InO1xuICAgIHRoaXMubnpDaGFuZ2UuZW1pdCh7XG4gICAgICBmaWxlOiB7IC4uLnRhcmdldEl0ZW0gfSxcbiAgICAgIGZpbGVMaXN0LFxuICAgICAgdHlwZTogJ2Vycm9yJ1xuICAgIH0pO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc0xpc3QoKTtcbiAgfTtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBkcmFnXG5cbiAgcHJpdmF0ZSBkcmFnU3RhdGU/OiBzdHJpbmc7XG5cbiAgLy8gc2tpcCBzYWZhcmkgYnVnXG4gIGZpbGVEcm9wKGU6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGlmIChlLnR5cGUgPT09IHRoaXMuZHJhZ1N0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZHJhZ1N0YXRlID0gZS50eXBlO1xuICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIGxpc3RcblxuICBwcml2YXRlIGRldGVjdENoYW5nZXNMaXN0KCk6IHZvaWQge1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLmxpc3RDb21wPy5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBvblJlbW92ZSA9IChmaWxlOiBOelVwbG9hZEZpbGUpOiB2b2lkID0+IHtcbiAgICB0aGlzLnVwbG9hZENvbXAuYWJvcnQoZmlsZSk7XG4gICAgZmlsZS5zdGF0dXMgPSAncmVtb3ZlZCc7XG4gICAgY29uc3QgZm5SZXMgPVxuICAgICAgdHlwZW9mIHRoaXMubnpSZW1vdmUgPT09ICdmdW5jdGlvbicgPyB0aGlzLm56UmVtb3ZlKGZpbGUpIDogdGhpcy5uelJlbW92ZSA9PSBudWxsID8gdHJ1ZSA6IHRoaXMubnpSZW1vdmU7XG4gICAgKGZuUmVzIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSA/IGZuUmVzIDogb2YoZm5SZXMpKS5waXBlKGZpbHRlcigocmVzOiBib29sZWFuKSA9PiByZXMpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5uekZpbGVMaXN0ID0gdGhpcy5yZW1vdmVGaWxlSXRlbShmaWxlLCB0aGlzLm56RmlsZUxpc3QpO1xuICAgICAgdGhpcy5uekNoYW5nZS5lbWl0KHtcbiAgICAgICAgZmlsZSxcbiAgICAgICAgZmlsZUxpc3Q6IHRoaXMubnpGaWxlTGlzdCxcbiAgICAgICAgdHlwZTogJ3JlbW92ZWQnXG4gICAgICB9KTtcbiAgICAgIHRoaXMubnpGaWxlTGlzdENoYW5nZS5lbWl0KHRoaXMubnpGaWxlTGlzdCk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gc3R5bGVzXG5cbiAgcHJpdmF0ZSBwcmVmaXhDbHMgPSAnYW50LXVwbG9hZCc7XG4gIGNsYXNzTGlzdDogc3RyaW5nW10gPSBbXTtcblxuICBwcml2YXRlIHNldENsYXNzTWFwKCk6IHZvaWQge1xuICAgIGxldCBzdWJDbHM6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKHRoaXMubnpUeXBlID09PSAnZHJhZycpIHtcbiAgICAgIGlmICh0aGlzLm56RmlsZUxpc3Quc29tZShmaWxlID0+IGZpbGUuc3RhdHVzID09PSAndXBsb2FkaW5nJykpIHtcbiAgICAgICAgc3ViQ2xzLnB1c2goYCR7dGhpcy5wcmVmaXhDbHN9LWRyYWctdXBsb2FkaW5nYCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kcmFnU3RhdGUgPT09ICdkcmFnb3ZlcicpIHtcbiAgICAgICAgc3ViQ2xzLnB1c2goYCR7dGhpcy5wcmVmaXhDbHN9LWRyYWctaG92ZXJgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3ViQ2xzID0gW2Ake3RoaXMucHJlZml4Q2xzfS1zZWxlY3QtJHt0aGlzLm56TGlzdFR5cGV9YF07XG4gICAgfVxuXG4gICAgdGhpcy5jbGFzc0xpc3QgPSBbXG4gICAgICB0aGlzLnByZWZpeENscyxcbiAgICAgIGAke3RoaXMucHJlZml4Q2xzfS0ke3RoaXMubnpUeXBlfWAsXG4gICAgICAuLi5zdWJDbHMsXG4gICAgICAodGhpcy5uekRpc2FibGVkICYmIGAke3RoaXMucHJlZml4Q2xzfS1kaXNhYmxlZGApIHx8ICcnLFxuICAgICAgKHRoaXMuZGlyID09PSAncnRsJyAmJiBgJHt0aGlzLnByZWZpeENsc30tcnRsYCkgfHwgJydcbiAgICBdLmZpbHRlcihpdGVtID0+ICEhaXRlbSk7XG5cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmkxOG4ubG9jYWxlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5sb2NhbGUgPSB0aGlzLmkxOG4uZ2V0TG9jYWxlRGF0YSgnVXBsb2FkJyk7XG4gICAgICB0aGlzLmRldGVjdENoYW5nZXNMaXN0KCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLnppcE9wdGlvbnMoKS5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iLCI8bmctdGVtcGxhdGUgI2xpc3Q+XG4gIDxuei11cGxvYWQtbGlzdFxuICAgICpuZ0lmPVwibG9jYWxlICYmICFuekZpbGVMaXN0UmVuZGVyXCJcbiAgICAjbGlzdENvbXBcbiAgICBbc3R5bGUuZGlzcGxheV09XCJuelNob3dVcGxvYWRMaXN0ID8gJycgOiAnbm9uZSdcIlxuICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICBbbGlzdFR5cGVdPVwibnpMaXN0VHlwZVwiXG4gICAgW2l0ZW1zXT1cIm56RmlsZUxpc3QgfHwgW11cIlxuICAgIFtpY29uc109XCIkYW55KG56U2hvd1VwbG9hZExpc3QpXCJcbiAgICBbaWNvblJlbmRlcl09XCJuekljb25SZW5kZXJcIlxuICAgIFtwcmV2aWV3RmlsZV09XCJuelByZXZpZXdGaWxlXCJcbiAgICBbcHJldmlld0lzSW1hZ2VdPVwibnpQcmV2aWV3SXNJbWFnZVwiXG4gICAgW29uUHJldmlld109XCJuelByZXZpZXdcIlxuICAgIFtvblJlbW92ZV09XCJvblJlbW92ZVwiXG4gICAgW29uRG93bmxvYWRdPVwibnpEb3dubG9hZFwiXG4gICAgW2Rpcl09XCJkaXJcIlxuICA+PC9uei11cGxvYWQtbGlzdD5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56RmlsZUxpc3RSZW5kZXJcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibnpGaWxlTGlzdFJlbmRlcjsgY29udGV4dDogeyAkaW1wbGljaXQ6IG56RmlsZUxpc3QgfVwiPjwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG48bmctdGVtcGxhdGUgI2Nvbj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9uZy10ZW1wbGF0ZT5cbjxuZy10ZW1wbGF0ZSAjYnRuPlxuICA8ZGl2IFtuZ0NsYXNzXT1cImNsYXNzTGlzdFwiIFtzdHlsZS5kaXNwbGF5XT1cIm56U2hvd0J1dHRvbiA/ICcnIDogJ25vbmUnXCI+XG4gICAgPGRpdiBuei11cGxvYWQtYnRuICN1cGxvYWRDb21wIFtvcHRpb25zXT1cIl9idG5PcHRpb25zIVwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvblwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJuelR5cGUgPT09ICdkcmFnJzsgZWxzZSBzZWxlY3RcIj5cbiAgPGRpdiBbbmdDbGFzc109XCJjbGFzc0xpc3RcIiAoZHJvcCk9XCJmaWxlRHJvcCgkZXZlbnQpXCIgKGRyYWdvdmVyKT1cImZpbGVEcm9wKCRldmVudClcIiAoZHJhZ2xlYXZlKT1cImZpbGVEcm9wKCRldmVudClcIj5cbiAgICA8ZGl2IG56LXVwbG9hZC1idG4gI3VwbG9hZENvbXAgW29wdGlvbnNdPVwiX2J0bk9wdGlvbnMhXCIgY2xhc3M9XCJhbnQtdXBsb2FkLWJ0blwiPlxuICAgICAgPGRpdiBjbGFzcz1cImFudC11cGxvYWQtZHJhZy1jb250YWluZXJcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvblwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJsaXN0XCI+PC9uZy10ZW1wbGF0ZT5cbjwvbmctY29udGFpbmVyPlxuPG5nLXRlbXBsYXRlICNzZWxlY3Q+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJuekxpc3RUeXBlID09PSAncGljdHVyZS1jYXJkJzsgZWxzZSBwaWNcIj5cbiAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibGlzdFwiPjwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImJ0blwiPjwvbmctdGVtcGxhdGU+XG4gIDwvbmctY29udGFpbmVyPlxuPC9uZy10ZW1wbGF0ZT5cbjxuZy10ZW1wbGF0ZSAjcGljPlxuICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiYnRuXCI+PC9uZy10ZW1wbGF0ZT5cbiAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxpc3RcIj48L25nLXRlbXBsYXRlPlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==