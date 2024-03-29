import { ENTER } from '@angular/cdk/keycodes';
import * as i1 from '@angular/common/http';
import { HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, Optional, ViewChild, Input, ChangeDetectionStrategy, Inject, EventEmitter, Output, NgModule } from '@angular/core';
import { Subject, of, Observable, Subscription, fromEvent } from 'rxjs';
import { switchMap, map, takeUntil, filter } from 'rxjs/operators';
import { warn } from 'ng-zorro-antd/core/logger';
import { trigger, transition, style, animate } from '@angular/animations';
import * as i4 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i1$1 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i2 from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as i3 from 'ng-zorro-antd/progress';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import * as i5 from 'ng-zorro-antd/tooltip';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import * as i6 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i7 from 'ng-zorro-antd/core/transition-patch';
import { __decorate } from 'tslib';
import { toBoolean, InputNumber, InputBoolean } from 'ng-zorro-antd/core/util';
import * as i1$2 from 'ng-zorro-antd/i18n';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import * as i2$1 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import { FormsModule } from '@angular/forms';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzUploadBtnComponent {
    constructor(ngZone, http, elementRef) {
        this.ngZone = ngZone;
        this.http = http;
        this.elementRef = elementRef;
        this.reqs = {};
        this.destroy = false;
        this.destroy$ = new Subject();
        if (!http) {
            throw new Error(`Not found 'HttpClient', You can import 'HttpClientModule' in your root module.`);
        }
    }
    onClick() {
        if (this.options.disabled || !this.options.openFileDialogOnClick) {
            return;
        }
        this.file.nativeElement.click();
    }
    // skip safari bug
    onFileDrop(e) {
        if (this.options.disabled || e.type === 'dragover') {
            e.preventDefault();
            return;
        }
        if (this.options.directory) {
            this.traverseFileTree(e.dataTransfer.items);
        }
        else {
            const files = Array.prototype.slice
                .call(e.dataTransfer.files)
                .filter((file) => this.attrAccept(file, this.options.accept));
            if (files.length) {
                this.uploadFiles(files);
            }
        }
        e.preventDefault();
    }
    onChange(e) {
        if (this.options.disabled) {
            return;
        }
        const hie = e.target;
        this.uploadFiles(hie.files);
        hie.value = '';
    }
    traverseFileTree(files) {
        const _traverseFileTree = (item, path) => {
            if (item.isFile) {
                item.file((file) => {
                    if (this.attrAccept(file, this.options.accept)) {
                        this.uploadFiles([file]);
                    }
                });
            }
            else if (item.isDirectory) {
                const dirReader = item.createReader();
                dirReader.readEntries((entries) => {
                    for (const entrieItem of entries) {
                        _traverseFileTree(entrieItem, `${path}${item.name}/`);
                    }
                });
            }
        };
        for (const file of files) {
            _traverseFileTree(file.webkitGetAsEntry(), '');
        }
    }
    attrAccept(file, acceptedFiles) {
        if (file && acceptedFiles) {
            const acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
            const fileName = `${file.name}`;
            const mimeType = `${file.type}`;
            const baseMimeType = mimeType.replace(/\/.*$/, '');
            return acceptedFilesArray.some(type => {
                const validType = type.trim();
                if (validType.charAt(0) === '.') {
                    return (fileName
                        .toLowerCase()
                        .indexOf(validType.toLowerCase(), fileName.toLowerCase().length - validType.toLowerCase().length) !== -1);
                }
                else if (/\/\*$/.test(validType)) {
                    // This is something like a image/* mime type
                    return baseMimeType === validType.replace(/\/.*$/, '');
                }
                return mimeType === validType;
            });
        }
        return true;
    }
    attachUid(file) {
        if (!file.uid) {
            file.uid = Math.random().toString(36).substring(2);
        }
        return file;
    }
    uploadFiles(fileList) {
        let filters$ = of(Array.prototype.slice.call(fileList));
        if (this.options.filters) {
            this.options.filters.forEach(f => {
                filters$ = filters$.pipe(switchMap(list => {
                    const fnRes = f.fn(list);
                    return fnRes instanceof Observable ? fnRes : of(fnRes);
                }));
            });
        }
        filters$.subscribe(list => {
            list.forEach((file) => {
                this.attachUid(file);
                this.upload(file, list);
            });
        }, e => {
            warn(`Unhandled upload filter error`, e);
        });
    }
    upload(file, fileList) {
        if (!this.options.beforeUpload) {
            return this.post(file);
        }
        const before = this.options.beforeUpload(file, fileList);
        if (before instanceof Observable) {
            before.subscribe((processedFile) => {
                const processedFileType = Object.prototype.toString.call(processedFile);
                if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
                    this.attachUid(processedFile);
                    this.post(processedFile);
                }
                else if (typeof processedFile === 'boolean' && processedFile !== false) {
                    this.post(file);
                }
            }, e => {
                warn(`Unhandled upload beforeUpload error`, e);
            });
        }
        else if (before !== false) {
            return this.post(file);
        }
    }
    post(file) {
        if (this.destroy) {
            return;
        }
        let process$ = of(file);
        const opt = this.options;
        const { uid } = file;
        const { action, data, headers, transformFile } = opt;
        const args = {
            action: typeof action === 'string' ? action : '',
            name: opt.name,
            headers,
            file,
            postFile: file,
            data,
            withCredentials: opt.withCredentials,
            onProgress: opt.onProgress
                ? e => {
                    opt.onProgress(e, file);
                }
                : undefined,
            onSuccess: (ret, xhr) => {
                this.clean(uid);
                opt.onSuccess(ret, file, xhr);
            },
            onError: xhr => {
                this.clean(uid);
                opt.onError(xhr, file);
            }
        };
        if (typeof action === 'function') {
            const actionResult = action(file);
            if (actionResult instanceof Observable) {
                process$ = process$.pipe(switchMap(() => actionResult), map(res => {
                    args.action = res;
                    return file;
                }));
            }
            else {
                args.action = actionResult;
            }
        }
        if (typeof transformFile === 'function') {
            const transformResult = transformFile(file);
            process$ = process$.pipe(switchMap(() => (transformResult instanceof Observable ? transformResult : of(transformResult))));
        }
        if (typeof data === 'function') {
            const dataResult = data(file);
            if (dataResult instanceof Observable) {
                process$ = process$.pipe(switchMap(() => dataResult), map(res => {
                    args.data = res;
                    return file;
                }));
            }
            else {
                args.data = dataResult;
            }
        }
        if (typeof headers === 'function') {
            const headersResult = headers(file);
            if (headersResult instanceof Observable) {
                process$ = process$.pipe(switchMap(() => headersResult), map(res => {
                    args.headers = res;
                    return file;
                }));
            }
            else {
                args.headers = headersResult;
            }
        }
        process$.subscribe(newFile => {
            args.postFile = newFile;
            const req$ = (opt.customRequest || this.xhr).call(this, args);
            if (!(req$ instanceof Subscription)) {
                warn(`Must return Subscription type in '[nzCustomRequest]' property`);
            }
            this.reqs[uid] = req$;
            opt.onStart(file);
        });
    }
    xhr(args) {
        const formData = new FormData();
        if (args.data) {
            Object.keys(args.data).map(key => {
                formData.append(key, args.data[key]);
            });
        }
        formData.append(args.name, args.postFile);
        if (!args.headers) {
            args.headers = {};
        }
        if (args.headers['X-Requested-With'] !== null) {
            args.headers['X-Requested-With'] = `XMLHttpRequest`;
        }
        else {
            delete args.headers['X-Requested-With'];
        }
        const req = new HttpRequest('POST', args.action, formData, {
            reportProgress: true,
            withCredentials: args.withCredentials,
            headers: new HttpHeaders(args.headers)
        });
        return this.http.request(req).subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
                if (event.total > 0) {
                    event.percent = (event.loaded / event.total) * 100;
                }
                args.onProgress(event, args.file);
            }
            else if (event instanceof HttpResponse) {
                args.onSuccess(event.body, args.file, event);
            }
        }, err => {
            this.abort(args.file);
            args.onError(err, args.file);
        });
    }
    clean(uid) {
        const req$ = this.reqs[uid];
        if (req$ instanceof Subscription) {
            req$.unsubscribe();
        }
        delete this.reqs[uid];
    }
    abort(file) {
        if (file) {
            this.clean(file && file.uid);
        }
        else {
            Object.keys(this.reqs).forEach(uid => this.clean(uid));
        }
    }
    ngOnInit() {
        // Caretaker note: `input[type=file].click()` will open a native OS file picker,
        // it doesn't require Angular to run `ApplicationRef.tick()`.
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.elementRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.onClick());
            fromEvent(this.elementRef.nativeElement, 'keydown')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                if (this.options.disabled) {
                    return;
                }
                if (event.key === 'Enter' || event.keyCode === ENTER) {
                    this.onClick();
                }
            });
        });
    }
    ngOnDestroy() {
        this.destroy = true;
        this.destroy$.next();
        this.abort();
    }
}
NzUploadBtnComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadBtnComponent, deps: [{ token: i0.NgZone }, { token: i1.HttpClient, optional: true }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NzUploadBtnComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzUploadBtnComponent, selector: "[nz-upload-btn]", inputs: { options: "options" }, host: { listeners: { "drop": "onFileDrop($event)", "dragover": "onFileDrop($event)" }, properties: { "attr.tabindex": "\"0\"", "attr.role": "\"button\"", "class.ant-upload-disabled": "options.disabled" }, classAttribute: "ant-upload" }, viewQueries: [{ propertyName: "file", first: true, predicate: ["file"], descendants: true, static: true }], exportAs: ["nzUploadBtn"], ngImport: i0, template: "<input\n  type=\"file\"\n  #file\n  (change)=\"onChange($event)\"\n  [attr.accept]=\"options.accept\"\n  [attr.directory]=\"options.directory ? 'directory' : null\"\n  [attr.webkitdirectory]=\"options.directory ? 'webkitdirectory' : null\"\n  [multiple]=\"options.multiple\"\n  style=\"display: none\"\n/>\n<ng-content></ng-content>\n", encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadBtnComponent, decorators: [{
            type: Component,
            args: [{ selector: '[nz-upload-btn]', exportAs: 'nzUploadBtn', host: {
                        class: 'ant-upload',
                        '[attr.tabindex]': '"0"',
                        '[attr.role]': '"button"',
                        '[class.ant-upload-disabled]': 'options.disabled',
                        '(drop)': 'onFileDrop($event)',
                        '(dragover)': 'onFileDrop($event)'
                    }, preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, template: "<input\n  type=\"file\"\n  #file\n  (change)=\"onChange($event)\"\n  [attr.accept]=\"options.accept\"\n  [attr.directory]=\"options.directory ? 'directory' : null\"\n  [attr.webkitdirectory]=\"options.directory ? 'webkitdirectory' : null\"\n  [multiple]=\"options.multiple\"\n  style=\"display: none\"\n/>\n<ng-content></ng-content>\n" }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i1.HttpClient, decorators: [{
                    type: Optional
                }] }, { type: i0.ElementRef }]; }, propDecorators: { file: [{
                type: ViewChild,
                args: ['file', { static: true }]
            }], options: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const isImageFileType = (type) => !!type && type.indexOf('image/') === 0;
const MEASURE_SIZE = 200;
class NzUploadListComponent {
    // #endregion
    constructor(cdr, doc, ngZone, platform) {
        this.cdr = cdr;
        this.doc = doc;
        this.ngZone = ngZone;
        this.platform = platform;
        this.list = [];
        this.locale = {};
        this.iconRender = null;
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    get showPic() {
        return this.listType === 'picture' || this.listType === 'picture-card';
    }
    set items(list) {
        this.list = list;
    }
    genErr(file) {
        if (file.response && typeof file.response === 'string') {
            return file.response;
        }
        return (file.error && file.error.statusText) || this.locale.uploadError;
    }
    extname(url) {
        const temp = url.split('/');
        const filename = temp[temp.length - 1];
        const filenameWithoutSuffix = filename.split(/#|\?/)[0];
        return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
    }
    isImageUrl(file) {
        if (isImageFileType(file.type)) {
            return true;
        }
        const url = (file.thumbUrl || file.url || '');
        if (!url) {
            return false;
        }
        const extension = this.extname(url);
        if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg)$/i.test(extension)) {
            return true;
        }
        else if (/^data:/.test(url)) {
            // other file types of base64
            return false;
        }
        else if (extension) {
            // other file types which have extension
            return false;
        }
        return true;
    }
    getIconType(file) {
        if (!this.showPic) {
            return '';
        }
        if (file.isUploading || (!file.thumbUrl && !file.url)) {
            return 'uploading';
        }
        else {
            return 'thumbnail';
        }
    }
    previewImage(file) {
        if (!isImageFileType(file.type) || !this.platform.isBrowser) {
            return of('');
        }
        const canvas = this.doc.createElement('canvas');
        canvas.width = MEASURE_SIZE;
        canvas.height = MEASURE_SIZE;
        canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE}px; height: ${MEASURE_SIZE}px; z-index: 9999; display: none;`;
        this.doc.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;
        return fromEvent(img, 'load').pipe(map(() => {
            const { width, height } = img;
            let drawWidth = MEASURE_SIZE;
            let drawHeight = MEASURE_SIZE;
            let offsetX = 0;
            let offsetY = 0;
            if (width < height) {
                drawHeight = height * (MEASURE_SIZE / width);
                offsetY = -(drawHeight - drawWidth) / 2;
            }
            else {
                drawWidth = width * (MEASURE_SIZE / height);
                offsetX = -(drawWidth - drawHeight) / 2;
            }
            try {
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
            catch { }
            const dataURL = canvas.toDataURL();
            this.doc.body.removeChild(canvas);
            URL.revokeObjectURL(objectUrl);
            return dataURL;
        }));
    }
    genThumb() {
        if (!this.platform.isBrowser) {
            return;
        }
        const win = window;
        if (!this.showPic ||
            typeof document === 'undefined' ||
            typeof win === 'undefined' ||
            !win.FileReader ||
            !win.File) {
            return;
        }
        this.list
            .filter(file => file.originFileObj instanceof File && file.thumbUrl === undefined)
            .forEach(file => {
            file.thumbUrl = '';
            // Caretaker note: we shouldn't use promises here since they're not cancellable.
            // A promise microtask can be resolved after the view is destroyed. Thus running `detectChanges()`
            // will cause a runtime exception (`detectChanges()` cannot be run on destroyed views).
            const dataUrl$ = (this.previewFile ? this.previewFile(file) : this.previewImage(file.originFileObj)).pipe(takeUntil(this.destroy$));
            this.ngZone.runOutsideAngular(() => {
                dataUrl$.subscribe(dataUrl => {
                    this.ngZone.run(() => {
                        file.thumbUrl = dataUrl;
                        this.detectChanges();
                    });
                });
            });
        });
    }
    showDownload(file) {
        return !!(this.icons.showDownloadIcon && file.status === 'done');
    }
    fixData() {
        this.list.forEach(file => {
            file.isUploading = file.status === 'uploading';
            file.message = this.genErr(file);
            file.linkProps = typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
            file.isImageUrl = this.previewIsImage ? this.previewIsImage(file) : this.isImageUrl(file);
            file.iconType = this.getIconType(file);
            file.showDownload = this.showDownload(file);
        });
    }
    handlePreview(file, e) {
        if (!this.onPreview) {
            return;
        }
        e.preventDefault();
        return this.onPreview(file);
    }
    handleRemove(file, e) {
        e.preventDefault();
        if (this.onRemove) {
            this.onRemove(file);
        }
        return;
    }
    handleDownload(file) {
        if (typeof this.onDownload === 'function') {
            this.onDownload(file);
        }
        else if (file.url) {
            window.open(file.url);
        }
    }
    detectChanges() {
        this.fixData();
        this.cdr.detectChanges();
    }
    ngOnChanges() {
        this.fixData();
        this.genThumb();
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
}
NzUploadListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadListComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: DOCUMENT }, { token: i0.NgZone }, { token: i1$1.Platform }], target: i0.ɵɵFactoryTarget.Component });
NzUploadListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzUploadListComponent, selector: "nz-upload-list", inputs: { locale: "locale", listType: "listType", items: "items", icons: "icons", onPreview: "onPreview", onRemove: "onRemove", onDownload: "onDownload", previewFile: "previewFile", previewIsImage: "previewIsImage", iconRender: "iconRender", dir: "dir" }, host: { properties: { "class.ant-upload-list-rtl": "dir === 'rtl'", "class.ant-upload-list-text": "listType === 'text'", "class.ant-upload-list-picture": "listType === 'picture'", "class.ant-upload-list-picture-card": "listType === 'picture-card'" }, classAttribute: "ant-upload-list" }, exportAs: ["nzUploadList"], usesOnChanges: true, ngImport: i0, template: "<div *ngFor=\"let file of list\" class=\"ant-upload-list-{{ listType }}-container\">\n  <div\n    class=\"ant-upload-list-item ant-upload-list-item-{{ file.status }} ant-upload-list-item-list-type-{{ listType }}\"\n    [attr.data-key]=\"file.key\"\n    @itemState\n    nz-tooltip\n    [nzTooltipTitle]=\"file.status === 'error' ? file.message : null\"\n  >\n    <ng-template #icon>\n      <ng-container [ngSwitch]=\"file.iconType\">\n        <div\n          *ngSwitchCase=\"'uploading'\"\n          class=\"ant-upload-list-item-thumbnail\"\n          [class.ant-upload-list-item-file]=\"!file.isUploading\"\n        >\n          <ng-template [ngTemplateOutlet]=\"iconNode\" [ngTemplateOutletContext]=\"{ $implicit: file }\"></ng-template>\n        </div>\n        <a\n          *ngSwitchCase=\"'thumbnail'\"\n          class=\"ant-upload-list-item-thumbnail\"\n          [class.ant-upload-list-item-file]=\"!file.isImageUrl\"\n          target=\"_blank\"\n          rel=\"noopener noreferrer\"\n          [href]=\"file.url || file.thumbUrl\"\n          (click)=\"handlePreview(file, $event)\"\n        >\n          <img\n            *ngIf=\"file.isImageUrl; else noImageThumbTpl\"\n            class=\"ant-upload-list-item-image\"\n            [src]=\"file.thumbUrl || file.url\"\n            [attr.alt]=\"file.name\"\n          />\n        </a>\n        <div *ngSwitchDefault class=\"ant-upload-text-icon\">\n          <ng-template [ngTemplateOutlet]=\"iconNode\" [ngTemplateOutletContext]=\"{ $implicit: file }\"></ng-template>\n        </div>\n      </ng-container>\n      <ng-template #noImageThumbTpl>\n        <ng-template [ngTemplateOutlet]=\"iconNode\" [ngTemplateOutletContext]=\"{ $implicit: file }\"></ng-template>\n      </ng-template>\n    </ng-template>\n    <ng-template #iconNode let-file>\n      <ng-container *ngIf=\"!iconRender; else customIconRender\">\n        <ng-container [ngSwitch]=\"listType\">\n          <ng-container *ngSwitchCase=\"'picture'\">\n            <ng-container *ngIf=\"file.isUploading; else iconNodeFileIcon\">\n              <i nz-icon nzType=\"loading\"></i>\n            </ng-container>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'picture-card'\">\n            <ng-container *ngIf=\"file.isUploading; else iconNodeFileIcon\">\n              {{ locale.uploading }}\n            </ng-container>\n          </ng-container>\n          <i *ngSwitchDefault nz-icon [nzType]=\"file.isUploading ? 'loading' : 'paper-clip'\"></i>\n        </ng-container>\n      </ng-container>\n      <ng-template\n        #customIconRender\n        [ngTemplateOutlet]=\"iconRender\"\n        [ngTemplateOutletContext]=\"{ $implicit: file }\"\n      ></ng-template>\n      <ng-template #iconNodeFileIcon>\n        <i nz-icon [nzType]=\"file.isImageUrl ? 'picture' : 'file'\" nzTheme=\"twotone\"></i>\n      </ng-template>\n    </ng-template>\n    <ng-template #removeIcon>\n      <button\n        *ngIf=\"icons.showRemoveIcon\"\n        type=\"button\"\n        nz-button\n        nzType=\"text\"\n        nzSize=\"small\"\n        (click)=\"handleRemove(file, $event)\"\n        [attr.title]=\"locale.removeFile\"\n        class=\"ant-upload-list-item-card-actions-btn\"\n      >\n        <i nz-icon nzType=\"delete\"></i>\n      </button>\n    </ng-template>\n    <ng-template #downloadIcon>\n      <button\n        *ngIf=\"file.showDownload\"\n        type=\"button\"\n        nz-button\n        nzType=\"text\"\n        nzSize=\"small\"\n        (click)=\"handleDownload(file)\"\n        [attr.title]=\"locale.downloadFile\"\n        class=\"ant-upload-list-item-card-actions-btn\"\n      >\n        <i nz-icon nzType=\"download\"></i>\n      </button>\n    </ng-template>\n    <ng-template #downloadOrDelete>\n      <span\n        *ngIf=\"listType !== 'picture-card'\"\n        class=\"ant-upload-list-item-card-actions {{ listType === 'picture' ? 'picture' : '' }}\"\n      >\n        <ng-template [ngTemplateOutlet]=\"downloadIcon\"></ng-template>\n        <ng-template [ngTemplateOutlet]=\"removeIcon\"></ng-template>\n      </span>\n    </ng-template>\n    <ng-template #preview>\n      <a\n        *ngIf=\"file.url\"\n        target=\"_blank\"\n        rel=\"noopener noreferrer\"\n        class=\"ant-upload-list-item-name\"\n        [attr.title]=\"file.name\"\n        [href]=\"file.url\"\n        [attr.download]=\"file.linkProps && file.linkProps.download\"\n        (click)=\"handlePreview(file, $event)\"\n      >\n        {{ file.name }}\n      </a>\n      <span\n        *ngIf=\"!file.url\"\n        class=\"ant-upload-list-item-name\"\n        [attr.title]=\"file.name\"\n        (click)=\"handlePreview(file, $event)\"\n      >\n        {{ file.name }}\n      </span>\n      <ng-template [ngTemplateOutlet]=\"downloadOrDelete\"></ng-template>\n    </ng-template>\n    <div class=\"ant-upload-list-item-info\">\n      <span class=\"ant-upload-span\">\n        <ng-template [ngTemplateOutlet]=\"icon\"></ng-template>\n        <ng-template [ngTemplateOutlet]=\"preview\"></ng-template>\n      </span>\n    </div>\n    <span *ngIf=\"listType === 'picture-card' && !file.isUploading\" class=\"ant-upload-list-item-actions\">\n      <a\n        *ngIf=\"icons.showPreviewIcon\"\n        [href]=\"file.url || file.thumbUrl\"\n        target=\"_blank\"\n        rel=\"noopener noreferrer\"\n        [attr.title]=\"locale.previewFile\"\n        [ngStyle]=\"!(file.url || file.thumbUrl) ? { opacity: 0.5, 'pointer-events': 'none' } : null\"\n        (click)=\"handlePreview(file, $event)\"\n      >\n        <i nz-icon nzType=\"eye\"></i>\n      </a>\n      <ng-container *ngIf=\"file.status === 'done'\">\n        <ng-template [ngTemplateOutlet]=\"downloadIcon\"></ng-template>\n      </ng-container>\n      <ng-template [ngTemplateOutlet]=\"removeIcon\"></ng-template>\n    </span>\n    <div *ngIf=\"file.isUploading\" class=\"ant-upload-list-item-progress\">\n      <nz-progress [nzPercent]=\"file.percent!\" nzType=\"line\" [nzShowInfo]=\"false\" [nzStrokeWidth]=\"2\"></nz-progress>\n    </div>\n  </div>\n</div>\n", components: [{ type: i2.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }, { type: i3.NzProgressComponent, selector: "nz-progress", inputs: ["nzShowInfo", "nzWidth", "nzStrokeColor", "nzSize", "nzFormat", "nzSuccessPercent", "nzPercent", "nzStrokeWidth", "nzGapDegree", "nzStatus", "nzType", "nzGapPosition", "nzStrokeLinecap", "nzSteps"], exportAs: ["nzProgress"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i7.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
        trigger('itemState', [
            transition(':enter', [
                style({ height: '0', width: '0', opacity: 0 }),
                animate(150, style({ height: '*', width: '*', opacity: 1 }))
            ]),
            transition(':leave', [animate(150, style({ height: '0', width: '0', opacity: 0 }))])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nz-upload-list', exportAs: 'nzUploadList', animations: [
                        trigger('itemState', [
                            transition(':enter', [
                                style({ height: '0', width: '0', opacity: 0 }),
                                animate(150, style({ height: '*', width: '*', opacity: 1 }))
                            ]),
                            transition(':leave', [animate(150, style({ height: '0', width: '0', opacity: 0 }))])
                        ])
                    ], host: {
                        class: 'ant-upload-list',
                        '[class.ant-upload-list-rtl]': `dir === 'rtl'`,
                        '[class.ant-upload-list-text]': `listType === 'text'`,
                        '[class.ant-upload-list-picture]': `listType === 'picture'`,
                        '[class.ant-upload-list-picture-card]': `listType === 'picture-card'`
                    }, preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngFor=\"let file of list\" class=\"ant-upload-list-{{ listType }}-container\">\n  <div\n    class=\"ant-upload-list-item ant-upload-list-item-{{ file.status }} ant-upload-list-item-list-type-{{ listType }}\"\n    [attr.data-key]=\"file.key\"\n    @itemState\n    nz-tooltip\n    [nzTooltipTitle]=\"file.status === 'error' ? file.message : null\"\n  >\n    <ng-template #icon>\n      <ng-container [ngSwitch]=\"file.iconType\">\n        <div\n          *ngSwitchCase=\"'uploading'\"\n          class=\"ant-upload-list-item-thumbnail\"\n          [class.ant-upload-list-item-file]=\"!file.isUploading\"\n        >\n          <ng-template [ngTemplateOutlet]=\"iconNode\" [ngTemplateOutletContext]=\"{ $implicit: file }\"></ng-template>\n        </div>\n        <a\n          *ngSwitchCase=\"'thumbnail'\"\n          class=\"ant-upload-list-item-thumbnail\"\n          [class.ant-upload-list-item-file]=\"!file.isImageUrl\"\n          target=\"_blank\"\n          rel=\"noopener noreferrer\"\n          [href]=\"file.url || file.thumbUrl\"\n          (click)=\"handlePreview(file, $event)\"\n        >\n          <img\n            *ngIf=\"file.isImageUrl; else noImageThumbTpl\"\n            class=\"ant-upload-list-item-image\"\n            [src]=\"file.thumbUrl || file.url\"\n            [attr.alt]=\"file.name\"\n          />\n        </a>\n        <div *ngSwitchDefault class=\"ant-upload-text-icon\">\n          <ng-template [ngTemplateOutlet]=\"iconNode\" [ngTemplateOutletContext]=\"{ $implicit: file }\"></ng-template>\n        </div>\n      </ng-container>\n      <ng-template #noImageThumbTpl>\n        <ng-template [ngTemplateOutlet]=\"iconNode\" [ngTemplateOutletContext]=\"{ $implicit: file }\"></ng-template>\n      </ng-template>\n    </ng-template>\n    <ng-template #iconNode let-file>\n      <ng-container *ngIf=\"!iconRender; else customIconRender\">\n        <ng-container [ngSwitch]=\"listType\">\n          <ng-container *ngSwitchCase=\"'picture'\">\n            <ng-container *ngIf=\"file.isUploading; else iconNodeFileIcon\">\n              <i nz-icon nzType=\"loading\"></i>\n            </ng-container>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'picture-card'\">\n            <ng-container *ngIf=\"file.isUploading; else iconNodeFileIcon\">\n              {{ locale.uploading }}\n            </ng-container>\n          </ng-container>\n          <i *ngSwitchDefault nz-icon [nzType]=\"file.isUploading ? 'loading' : 'paper-clip'\"></i>\n        </ng-container>\n      </ng-container>\n      <ng-template\n        #customIconRender\n        [ngTemplateOutlet]=\"iconRender\"\n        [ngTemplateOutletContext]=\"{ $implicit: file }\"\n      ></ng-template>\n      <ng-template #iconNodeFileIcon>\n        <i nz-icon [nzType]=\"file.isImageUrl ? 'picture' : 'file'\" nzTheme=\"twotone\"></i>\n      </ng-template>\n    </ng-template>\n    <ng-template #removeIcon>\n      <button\n        *ngIf=\"icons.showRemoveIcon\"\n        type=\"button\"\n        nz-button\n        nzType=\"text\"\n        nzSize=\"small\"\n        (click)=\"handleRemove(file, $event)\"\n        [attr.title]=\"locale.removeFile\"\n        class=\"ant-upload-list-item-card-actions-btn\"\n      >\n        <i nz-icon nzType=\"delete\"></i>\n      </button>\n    </ng-template>\n    <ng-template #downloadIcon>\n      <button\n        *ngIf=\"file.showDownload\"\n        type=\"button\"\n        nz-button\n        nzType=\"text\"\n        nzSize=\"small\"\n        (click)=\"handleDownload(file)\"\n        [attr.title]=\"locale.downloadFile\"\n        class=\"ant-upload-list-item-card-actions-btn\"\n      >\n        <i nz-icon nzType=\"download\"></i>\n      </button>\n    </ng-template>\n    <ng-template #downloadOrDelete>\n      <span\n        *ngIf=\"listType !== 'picture-card'\"\n        class=\"ant-upload-list-item-card-actions {{ listType === 'picture' ? 'picture' : '' }}\"\n      >\n        <ng-template [ngTemplateOutlet]=\"downloadIcon\"></ng-template>\n        <ng-template [ngTemplateOutlet]=\"removeIcon\"></ng-template>\n      </span>\n    </ng-template>\n    <ng-template #preview>\n      <a\n        *ngIf=\"file.url\"\n        target=\"_blank\"\n        rel=\"noopener noreferrer\"\n        class=\"ant-upload-list-item-name\"\n        [attr.title]=\"file.name\"\n        [href]=\"file.url\"\n        [attr.download]=\"file.linkProps && file.linkProps.download\"\n        (click)=\"handlePreview(file, $event)\"\n      >\n        {{ file.name }}\n      </a>\n      <span\n        *ngIf=\"!file.url\"\n        class=\"ant-upload-list-item-name\"\n        [attr.title]=\"file.name\"\n        (click)=\"handlePreview(file, $event)\"\n      >\n        {{ file.name }}\n      </span>\n      <ng-template [ngTemplateOutlet]=\"downloadOrDelete\"></ng-template>\n    </ng-template>\n    <div class=\"ant-upload-list-item-info\">\n      <span class=\"ant-upload-span\">\n        <ng-template [ngTemplateOutlet]=\"icon\"></ng-template>\n        <ng-template [ngTemplateOutlet]=\"preview\"></ng-template>\n      </span>\n    </div>\n    <span *ngIf=\"listType === 'picture-card' && !file.isUploading\" class=\"ant-upload-list-item-actions\">\n      <a\n        *ngIf=\"icons.showPreviewIcon\"\n        [href]=\"file.url || file.thumbUrl\"\n        target=\"_blank\"\n        rel=\"noopener noreferrer\"\n        [attr.title]=\"locale.previewFile\"\n        [ngStyle]=\"!(file.url || file.thumbUrl) ? { opacity: 0.5, 'pointer-events': 'none' } : null\"\n        (click)=\"handlePreview(file, $event)\"\n      >\n        <i nz-icon nzType=\"eye\"></i>\n      </a>\n      <ng-container *ngIf=\"file.status === 'done'\">\n        <ng-template [ngTemplateOutlet]=\"downloadIcon\"></ng-template>\n      </ng-container>\n      <ng-template [ngTemplateOutlet]=\"removeIcon\"></ng-template>\n    </span>\n    <div *ngIf=\"file.isUploading\" class=\"ant-upload-list-item-progress\">\n      <nz-progress [nzPercent]=\"file.percent!\" nzType=\"line\" [nzShowInfo]=\"false\" [nzStrokeWidth]=\"2\"></nz-progress>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.NgZone }, { type: i1$1.Platform }]; }, propDecorators: { locale: [{
                type: Input
            }], listType: [{
                type: Input
            }], items: [{
                type: Input
            }], icons: [{
                type: Input
            }], onPreview: [{
                type: Input
            }], onRemove: [{
                type: Input
            }], onDownload: [{
                type: Input
            }], previewFile: [{
                type: Input
            }], previewIsImage: [{
                type: Input
            }], iconRender: [{
                type: Input
            }], dir: [{
                type: Input
            }] } });

class NzUploadComponent {
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
NzUploadComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$2.NzI18nService }, { token: i2$1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzUploadComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzUploadComponent, selector: "nz-upload", inputs: { nzType: "nzType", nzLimit: "nzLimit", nzSize: "nzSize", nzFileType: "nzFileType", nzAccept: "nzAccept", nzAction: "nzAction", nzDirectory: "nzDirectory", nzOpenFileDialogOnClick: "nzOpenFileDialogOnClick", nzBeforeUpload: "nzBeforeUpload", nzCustomRequest: "nzCustomRequest", nzData: "nzData", nzFilter: "nzFilter", nzFileList: "nzFileList", nzDisabled: "nzDisabled", nzHeaders: "nzHeaders", nzListType: "nzListType", nzMultiple: "nzMultiple", nzName: "nzName", nzShowUploadList: "nzShowUploadList", nzShowButton: "nzShowButton", nzWithCredentials: "nzWithCredentials", nzRemove: "nzRemove", nzPreview: "nzPreview", nzPreviewFile: "nzPreviewFile", nzPreviewIsImage: "nzPreviewIsImage", nzTransformFile: "nzTransformFile", nzDownload: "nzDownload", nzIconRender: "nzIconRender", nzFileListRender: "nzFileListRender" }, outputs: { nzChange: "nzChange", nzFileListChange: "nzFileListChange" }, host: { properties: { "class.ant-upload-picture-card-wrapper": "nzListType === \"picture-card\"" } }, viewQueries: [{ propertyName: "uploadComp", first: true, predicate: ["uploadComp"], descendants: true }, { propertyName: "listComp", first: true, predicate: ["listComp"], descendants: true }], exportAs: ["nzUpload"], usesOnChanges: true, ngImport: i0, template: "<ng-template #list>\n  <nz-upload-list\n    *ngIf=\"locale && !nzFileListRender\"\n    #listComp\n    [style.display]=\"nzShowUploadList ? '' : 'none'\"\n    [locale]=\"locale\"\n    [listType]=\"nzListType\"\n    [items]=\"nzFileList || []\"\n    [icons]=\"$any(nzShowUploadList)\"\n    [iconRender]=\"nzIconRender\"\n    [previewFile]=\"nzPreviewFile\"\n    [previewIsImage]=\"nzPreviewIsImage\"\n    [onPreview]=\"nzPreview\"\n    [onRemove]=\"onRemove\"\n    [onDownload]=\"nzDownload\"\n    [dir]=\"dir\"\n  ></nz-upload-list>\n  <ng-container *ngIf=\"nzFileListRender\">\n    <ng-container *ngTemplateOutlet=\"nzFileListRender; context: { $implicit: nzFileList }\"></ng-container>\n  </ng-container>\n</ng-template>\n<ng-template #con><ng-content></ng-content></ng-template>\n<ng-template #btn>\n  <div [ngClass]=\"classList\" [style.display]=\"nzShowButton ? '' : 'none'\">\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\">\n      <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\n    </div>\n  </div>\n</ng-template>\n<ng-container *ngIf=\"nzType === 'drag'; else select\">\n  <div [ngClass]=\"classList\" (drop)=\"fileDrop($event)\" (dragover)=\"fileDrop($event)\" (dragleave)=\"fileDrop($event)\">\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\" class=\"ant-upload-btn\">\n      <div class=\"ant-upload-drag-container\">\n        <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\n      </div>\n    </div>\n  </div>\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n</ng-container>\n<ng-template #select>\n  <ng-container *ngIf=\"nzListType === 'picture-card'; else pic\">\n    <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n    <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\n  </ng-container>\n</ng-template>\n<ng-template #pic>\n  <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n</ng-template>\n", components: [{ type: NzUploadListComponent, selector: "nz-upload-list", inputs: ["locale", "listType", "items", "icons", "onPreview", "onRemove", "onDownload", "previewFile", "previewIsImage", "iconRender", "dir"], exportAs: ["nzUploadList"] }, { type: NzUploadBtnComponent, selector: "[nz-upload-btn]", inputs: ["options"], exportAs: ["nzUploadBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2$1.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
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
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1$2.NzI18nService }, { type: i2$1.Directionality, decorators: [{
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

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzUploadModule {
}
NzUploadModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzUploadModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadModule, declarations: [NzUploadComponent, NzUploadBtnComponent, NzUploadListComponent], imports: [BidiModule,
        CommonModule,
        FormsModule,
        PlatformModule,
        NzToolTipModule,
        NzProgressModule,
        NzI18nModule,
        NzIconModule,
        NzButtonModule], exports: [NzUploadComponent] });
NzUploadModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadModule, imports: [[
            BidiModule,
            CommonModule,
            FormsModule,
            PlatformModule,
            NzToolTipModule,
            NzProgressModule,
            NzI18nModule,
            NzIconModule,
            NzButtonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BidiModule,
                        CommonModule,
                        FormsModule,
                        PlatformModule,
                        NzToolTipModule,
                        NzProgressModule,
                        NzI18nModule,
                        NzIconModule,
                        NzButtonModule
                    ],
                    declarations: [NzUploadComponent, NzUploadBtnComponent, NzUploadListComponent],
                    exports: [NzUploadComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzUploadBtnComponent, NzUploadComponent, NzUploadListComponent, NzUploadModule };
//# sourceMappingURL=ng-zorro-antd-upload.mjs.map
