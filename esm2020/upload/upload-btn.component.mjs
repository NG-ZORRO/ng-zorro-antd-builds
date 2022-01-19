/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ENTER } from '@angular/cdk/keycodes';
import { HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, Input, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, Observable, of, Subject, Subscription } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { warn } from 'ng-zorro-antd/core/logger';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class NzUploadBtnComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLWJ0bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3VwbG9hZC91cGxvYWQtYnRuLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uL2NvbXBvbmVudHMvdXBsb2FkL3VwbG9hZC1idG4uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlDLE9BQU8sRUFBeUIsYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEgsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBSUwsUUFBUSxFQUNSLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDeEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0QsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7QUFvQmpELE1BQU0sT0FBTyxvQkFBb0I7SUE4Uy9CLFlBQW9CLE1BQWMsRUFBc0IsSUFBZ0IsRUFBVSxVQUFzQjtRQUFwRixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQXNCLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBN1N4RyxTQUFJLEdBQW9DLEVBQUUsQ0FBQztRQUNuQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBNFNyQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRkFBZ0YsQ0FB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SyxpQkFDWCxpQkFBaUIsQ0FBQyxJQUFJOzswQkFnVEEsUUFBUTtxRUExU1IsSUFBSTtzQkFBeEMsU0FBUzt1QkFBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUMxQixPQUFPO3NCQUFmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBFTlRFUiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXZlbnQsIEh0dHBFdmVudFR5cGUsIEh0dHBIZWFkZXJzLCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IHdhcm4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbG9nZ2VyJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IE56VXBsb2FkRmlsZSwgTnpVcGxvYWRYSFJBcmdzLCBaaXBCdXR0b25PcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbnotdXBsb2FkLWJ0bl0nLFxuICBleHBvcnRBczogJ256VXBsb2FkQnRuJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VwbG9hZC1idG4uY29tcG9uZW50Lmh0bWwnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtdXBsb2FkJyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ1wiMFwiJyxcbiAgICAnW2F0dHIucm9sZV0nOiAnXCJidXR0b25cIicsXG4gICAgJ1tjbGFzcy5hbnQtdXBsb2FkLWRpc2FibGVkXSc6ICdvcHRpb25zLmRpc2FibGVkJyxcbiAgICAnKGRyb3ApJzogJ29uRmlsZURyb3AoJGV2ZW50KScsXG4gICAgJyhkcmFnb3ZlciknOiAnb25GaWxlRHJvcCgkZXZlbnQpJ1xuICB9LFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBOelVwbG9hZEJ0bkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcmVxczogeyBba2V5OiBzdHJpbmddOiBTdWJzY3JpcHRpb24gfSA9IHt9O1xuICBwcml2YXRlIGRlc3Ryb3kgPSBmYWxzZTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIEBWaWV3Q2hpbGQoJ2ZpbGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBmaWxlITogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcbiAgQElucHV0KCkgb3B0aW9ucyE6IFppcEJ1dHRvbk9wdGlvbnM7XG5cbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVkIHx8ICF0aGlzLm9wdGlvbnMub3BlbkZpbGVEaWFsb2dPbkNsaWNrKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZmlsZS5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gIH1cblxuICAvLyBza2lwIHNhZmFyaSBidWdcbiAgb25GaWxlRHJvcChlOiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVkIHx8IGUudHlwZSA9PT0gJ2RyYWdvdmVyJykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdG9yeSkge1xuICAgICAgdGhpcy50cmF2ZXJzZUZpbGVUcmVlKGUuZGF0YVRyYW5zZmVyIS5pdGVtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVzOiBGaWxlW10gPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcbiAgICAgICAgLmNhbGwoZS5kYXRhVHJhbnNmZXIhLmZpbGVzKVxuICAgICAgICAuZmlsdGVyKChmaWxlOiBGaWxlKSA9PiB0aGlzLmF0dHJBY2NlcHQoZmlsZSwgdGhpcy5vcHRpb25zLmFjY2VwdCkpO1xuICAgICAgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnVwbG9hZEZpbGVzKGZpbGVzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBvbkNoYW5nZShlOiBFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaGllID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLnVwbG9hZEZpbGVzKGhpZS5maWxlcyEpO1xuICAgIGhpZS52YWx1ZSA9ICcnO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmF2ZXJzZUZpbGVUcmVlKGZpbGVzOiBEYXRhVHJhbnNmZXJJdGVtTGlzdCk6IHZvaWQge1xuICAgIGNvbnN0IF90cmF2ZXJzZUZpbGVUcmVlID0gKGl0ZW06IE56U2FmZUFueSwgcGF0aDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgICBpZiAoaXRlbS5pc0ZpbGUpIHtcbiAgICAgICAgaXRlbS5maWxlKChmaWxlOiBGaWxlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuYXR0ckFjY2VwdChmaWxlLCB0aGlzLm9wdGlvbnMuYWNjZXB0KSkge1xuICAgICAgICAgICAgdGhpcy51cGxvYWRGaWxlcyhbZmlsZV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uaXNEaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZGlyUmVhZGVyID0gaXRlbS5jcmVhdGVSZWFkZXIoKTtcblxuICAgICAgICBkaXJSZWFkZXIucmVhZEVudHJpZXMoKGVudHJpZXM6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgIGZvciAoY29uc3QgZW50cmllSXRlbSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICBfdHJhdmVyc2VGaWxlVHJlZShlbnRyaWVJdGVtLCBgJHtwYXRofSR7aXRlbS5uYW1lfS9gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMgYXMgTnpTYWZlQW55KSB7XG4gICAgICBfdHJhdmVyc2VGaWxlVHJlZShmaWxlLndlYmtpdEdldEFzRW50cnkoKSwgJycpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXR0ckFjY2VwdChmaWxlOiBGaWxlLCBhY2NlcHRlZEZpbGVzPzogc3RyaW5nIHwgc3RyaW5nW10pOiBib29sZWFuIHtcbiAgICBpZiAoZmlsZSAmJiBhY2NlcHRlZEZpbGVzKSB7XG4gICAgICBjb25zdCBhY2NlcHRlZEZpbGVzQXJyYXkgPSBBcnJheS5pc0FycmF5KGFjY2VwdGVkRmlsZXMpID8gYWNjZXB0ZWRGaWxlcyA6IGFjY2VwdGVkRmlsZXMuc3BsaXQoJywnKTtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gYCR7ZmlsZS5uYW1lfWA7XG4gICAgICBjb25zdCBtaW1lVHlwZSA9IGAke2ZpbGUudHlwZX1gO1xuICAgICAgY29uc3QgYmFzZU1pbWVUeXBlID0gbWltZVR5cGUucmVwbGFjZSgvXFwvLiokLywgJycpO1xuXG4gICAgICByZXR1cm4gYWNjZXB0ZWRGaWxlc0FycmF5LnNvbWUodHlwZSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbGlkVHlwZSA9IHR5cGUudHJpbSgpO1xuICAgICAgICBpZiAodmFsaWRUeXBlLmNoYXJBdCgwKSA9PT0gJy4nKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGZpbGVOYW1lXG4gICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgIC5pbmRleE9mKHZhbGlkVHlwZS50b0xvd2VyQ2FzZSgpLCBmaWxlTmFtZS50b0xvd2VyQ2FzZSgpLmxlbmd0aCAtIHZhbGlkVHlwZS50b0xvd2VyQ2FzZSgpLmxlbmd0aCkgIT09IC0xXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICgvXFwvXFwqJC8udGVzdCh2YWxpZFR5cGUpKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBzb21ldGhpbmcgbGlrZSBhIGltYWdlLyogbWltZSB0eXBlXG4gICAgICAgICAgcmV0dXJuIGJhc2VNaW1lVHlwZSA9PT0gdmFsaWRUeXBlLnJlcGxhY2UoL1xcLy4qJC8sICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWltZVR5cGUgPT09IHZhbGlkVHlwZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoVWlkKGZpbGU6IE56VXBsb2FkRmlsZSk6IE56VXBsb2FkRmlsZSB7XG4gICAgaWYgKCFmaWxlLnVpZCkge1xuICAgICAgZmlsZS51aWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMik7XG4gICAgfVxuICAgIHJldHVybiBmaWxlO1xuICB9XG5cbiAgdXBsb2FkRmlsZXMoZmlsZUxpc3Q6IEZpbGVMaXN0IHwgRmlsZVtdKTogdm9pZCB7XG4gICAgbGV0IGZpbHRlcnMkOiBPYnNlcnZhYmxlPE56VXBsb2FkRmlsZVtdPiA9IG9mKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZpbGVMaXN0KSk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5maWx0ZXJzKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZmlsdGVycy5mb3JFYWNoKGYgPT4ge1xuICAgICAgICBmaWx0ZXJzJCA9IGZpbHRlcnMkLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGxpc3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgZm5SZXMgPSBmLmZuKGxpc3QpO1xuICAgICAgICAgICAgcmV0dXJuIGZuUmVzIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSA/IGZuUmVzIDogb2YoZm5SZXMpO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZmlsdGVycyQuc3Vic2NyaWJlKFxuICAgICAgbGlzdCA9PiB7XG4gICAgICAgIGxpc3QuZm9yRWFjaCgoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiB7XG4gICAgICAgICAgdGhpcy5hdHRhY2hVaWQoZmlsZSk7XG4gICAgICAgICAgdGhpcy51cGxvYWQoZmlsZSwgbGlzdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGUgPT4ge1xuICAgICAgICB3YXJuKGBVbmhhbmRsZWQgdXBsb2FkIGZpbHRlciBlcnJvcmAsIGUpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHVwbG9hZChmaWxlOiBOelVwbG9hZEZpbGUsIGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vcHRpb25zLmJlZm9yZVVwbG9hZCkge1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChmaWxlKTtcbiAgICB9XG4gICAgY29uc3QgYmVmb3JlID0gdGhpcy5vcHRpb25zLmJlZm9yZVVwbG9hZChmaWxlLCBmaWxlTGlzdCk7XG4gICAgaWYgKGJlZm9yZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgIGJlZm9yZS5zdWJzY3JpYmUoXG4gICAgICAgIChwcm9jZXNzZWRGaWxlOiBOelVwbG9hZEZpbGUpID0+IHtcbiAgICAgICAgICBjb25zdCBwcm9jZXNzZWRGaWxlVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzZWRGaWxlKTtcbiAgICAgICAgICBpZiAocHJvY2Vzc2VkRmlsZVR5cGUgPT09ICdbb2JqZWN0IEZpbGVdJyB8fCBwcm9jZXNzZWRGaWxlVHlwZSA9PT0gJ1tvYmplY3QgQmxvYl0nKSB7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFVpZChwcm9jZXNzZWRGaWxlKTtcbiAgICAgICAgICAgIHRoaXMucG9zdChwcm9jZXNzZWRGaWxlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzZWRGaWxlID09PSAnYm9vbGVhbicgJiYgcHJvY2Vzc2VkRmlsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMucG9zdChmaWxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGUgPT4ge1xuICAgICAgICAgIHdhcm4oYFVuaGFuZGxlZCB1cGxvYWQgYmVmb3JlVXBsb2FkIGVycm9yYCwgZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChiZWZvcmUgIT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KGZpbGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcG9zdChmaWxlOiBOelVwbG9hZEZpbGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kZXN0cm95KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBwcm9jZXNzJDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBCbG9iIHwgRmlsZSB8IE56VXBsb2FkRmlsZT4gPSBvZihmaWxlKTtcbiAgICBjb25zdCBvcHQgPSB0aGlzLm9wdGlvbnM7XG4gICAgY29uc3QgeyB1aWQgfSA9IGZpbGU7XG4gICAgY29uc3QgeyBhY3Rpb24sIGRhdGEsIGhlYWRlcnMsIHRyYW5zZm9ybUZpbGUgfSA9IG9wdDtcblxuICAgIGNvbnN0IGFyZ3M6IE56VXBsb2FkWEhSQXJncyA9IHtcbiAgICAgIGFjdGlvbjogdHlwZW9mIGFjdGlvbiA9PT0gJ3N0cmluZycgPyBhY3Rpb24gOiAnJyxcbiAgICAgIG5hbWU6IG9wdC5uYW1lLFxuICAgICAgaGVhZGVycyxcbiAgICAgIGZpbGUsXG4gICAgICBwb3N0RmlsZTogZmlsZSxcbiAgICAgIGRhdGEsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IG9wdC53aXRoQ3JlZGVudGlhbHMsXG4gICAgICBvblByb2dyZXNzOiBvcHQub25Qcm9ncmVzc1xuICAgICAgICA/IGUgPT4ge1xuICAgICAgICAgICAgb3B0Lm9uUHJvZ3Jlc3MhKGUsIGZpbGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICBvblN1Y2Nlc3M6IChyZXQsIHhocikgPT4ge1xuICAgICAgICB0aGlzLmNsZWFuKHVpZCk7XG4gICAgICAgIG9wdC5vblN1Y2Nlc3MhKHJldCwgZmlsZSwgeGhyKTtcbiAgICAgIH0sXG4gICAgICBvbkVycm9yOiB4aHIgPT4ge1xuICAgICAgICB0aGlzLmNsZWFuKHVpZCk7XG4gICAgICAgIG9wdC5vbkVycm9yISh4aHIsIGZpbGUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgYWN0aW9uUmVzdWx0ID0gKGFjdGlvbiBhcyAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBzdHJpbmcgfCBPYnNlcnZhYmxlPHN0cmluZz4pKGZpbGUpO1xuICAgICAgaWYgKGFjdGlvblJlc3VsdCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgICAgcHJvY2VzcyQgPSBwcm9jZXNzJC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiBhY3Rpb25SZXN1bHQpLFxuICAgICAgICAgIG1hcChyZXMgPT4ge1xuICAgICAgICAgICAgYXJncy5hY3Rpb24gPSByZXM7XG4gICAgICAgICAgICByZXR1cm4gZmlsZTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJncy5hY3Rpb24gPSBhY3Rpb25SZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0cmFuc2Zvcm1GaWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCB0cmFuc2Zvcm1SZXN1bHQgPSB0cmFuc2Zvcm1GaWxlKGZpbGUpO1xuICAgICAgcHJvY2VzcyQgPSBwcm9jZXNzJC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gKHRyYW5zZm9ybVJlc3VsdCBpbnN0YW5jZW9mIE9ic2VydmFibGUgPyB0cmFuc2Zvcm1SZXN1bHQgOiBvZih0cmFuc2Zvcm1SZXN1bHQpKSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCBkYXRhUmVzdWx0ID0gKGRhdGEgYXMgKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4ge30gfCBPYnNlcnZhYmxlPHt9PikoZmlsZSk7XG4gICAgICBpZiAoZGF0YVJlc3VsdCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgICAgcHJvY2VzcyQgPSBwcm9jZXNzJC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiBkYXRhUmVzdWx0KSxcbiAgICAgICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICAgIGFyZ3MuZGF0YSA9IHJlcztcbiAgICAgICAgICAgIHJldHVybiBmaWxlO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcmdzLmRhdGEgPSBkYXRhUmVzdWx0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgaGVhZGVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgaGVhZGVyc1Jlc3VsdCA9IChoZWFkZXJzIGFzIChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHt9IHwgT2JzZXJ2YWJsZTx7fT4pKGZpbGUpO1xuICAgICAgaWYgKGhlYWRlcnNSZXN1bHQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICAgIHByb2Nlc3MkID0gcHJvY2VzcyQucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gaGVhZGVyc1Jlc3VsdCksXG4gICAgICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgICAgICBhcmdzLmhlYWRlcnMgPSByZXM7XG4gICAgICAgICAgICByZXR1cm4gZmlsZTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJncy5oZWFkZXJzID0gaGVhZGVyc1Jlc3VsdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzJC5zdWJzY3JpYmUobmV3RmlsZSA9PiB7XG4gICAgICBhcmdzLnBvc3RGaWxlID0gbmV3RmlsZTtcbiAgICAgIGNvbnN0IHJlcSQgPSAob3B0LmN1c3RvbVJlcXVlc3QgfHwgdGhpcy54aHIpLmNhbGwodGhpcywgYXJncyk7XG4gICAgICBpZiAoIShyZXEkIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uKSkge1xuICAgICAgICB3YXJuKGBNdXN0IHJldHVybiBTdWJzY3JpcHRpb24gdHlwZSBpbiAnW256Q3VzdG9tUmVxdWVzdF0nIHByb3BlcnR5YCk7XG4gICAgICB9XG4gICAgICB0aGlzLnJlcXNbdWlkXSA9IHJlcSQ7XG4gICAgICBvcHQub25TdGFydCEoZmlsZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHhocihhcmdzOiBOelVwbG9hZFhIUkFyZ3MpOiBTdWJzY3JpcHRpb24ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICBpZiAoYXJncy5kYXRhKSB7XG4gICAgICBPYmplY3Qua2V5cyhhcmdzLmRhdGEpLm1hcChrZXkgPT4ge1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBhcmdzLmRhdGEhW2tleV0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9ybURhdGEuYXBwZW5kKGFyZ3MubmFtZSEsIGFyZ3MucG9zdEZpbGUgYXMgTnpTYWZlQW55KTtcblxuICAgIGlmICghYXJncy5oZWFkZXJzKSB7XG4gICAgICBhcmdzLmhlYWRlcnMgPSB7fTtcbiAgICB9XG4gICAgaWYgKGFyZ3MuaGVhZGVyc1snWC1SZXF1ZXN0ZWQtV2l0aCddICE9PSBudWxsKSB7XG4gICAgICBhcmdzLmhlYWRlcnNbJ1gtUmVxdWVzdGVkLVdpdGgnXSA9IGBYTUxIdHRwUmVxdWVzdGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBhcmdzLmhlYWRlcnNbJ1gtUmVxdWVzdGVkLVdpdGgnXTtcbiAgICB9XG4gICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KCdQT1NUJywgYXJncy5hY3Rpb24hLCBmb3JtRGF0YSwge1xuICAgICAgcmVwb3J0UHJvZ3Jlc3M6IHRydWUsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IGFyZ3Mud2l0aENyZWRlbnRpYWxzLFxuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKGFyZ3MuaGVhZGVycylcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QocmVxKS5zdWJzY3JpYmUoXG4gICAgICAoZXZlbnQ6IEh0dHBFdmVudDxOelNhZmVBbnk+KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50eXBlID09PSBIdHRwRXZlbnRUeXBlLlVwbG9hZFByb2dyZXNzKSB7XG4gICAgICAgICAgaWYgKGV2ZW50LnRvdGFsISA+IDApIHtcbiAgICAgICAgICAgIChldmVudCBhcyBOelNhZmVBbnkpLnBlcmNlbnQgPSAoZXZlbnQubG9hZGVkIC8gZXZlbnQudG90YWwhKSAqIDEwMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXJncy5vblByb2dyZXNzIShldmVudCwgYXJncy5maWxlKTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgIGFyZ3Mub25TdWNjZXNzIShldmVudC5ib2R5LCBhcmdzLmZpbGUsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVyciA9PiB7XG4gICAgICAgIHRoaXMuYWJvcnQoYXJncy5maWxlKTtcbiAgICAgICAgYXJncy5vbkVycm9yIShlcnIsIGFyZ3MuZmlsZSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYW4odWlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCByZXEkID0gdGhpcy5yZXFzW3VpZF07XG4gICAgaWYgKHJlcSQgaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24pIHtcbiAgICAgIHJlcSQudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMucmVxc1t1aWRdO1xuICB9XG5cbiAgYWJvcnQoZmlsZT86IE56VXBsb2FkRmlsZSk6IHZvaWQge1xuICAgIGlmIChmaWxlKSB7XG4gICAgICB0aGlzLmNsZWFuKGZpbGUgJiYgZmlsZS51aWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLnJlcXMpLmZvckVhY2godWlkID0+IHRoaXMuY2xlYW4odWlkKSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSwgQE9wdGlvbmFsKCkgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBpZiAoIWh0dHApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IGZvdW5kICdIdHRwQ2xpZW50JywgWW91IGNhbiBpbXBvcnQgJ0h0dHBDbGllbnRNb2R1bGUnIGluIHlvdXIgcm9vdCBtb2R1bGUuYCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gQ2FyZXRha2VyIG5vdGU6IGBpbnB1dFt0eXBlPWZpbGVdLmNsaWNrKClgIHdpbGwgb3BlbiBhIG5hdGl2ZSBPUyBmaWxlIHBpY2tlcixcbiAgICAvLyBpdCBkb2Vzbid0IHJlcXVpcmUgQW5ndWxhciB0byBydW4gYEFwcGxpY2F0aW9uUmVmLnRpY2soKWAuXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgZnJvbUV2ZW50KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnY2xpY2snKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vbkNsaWNrKCkpO1xuXG4gICAgICBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdrZXlkb3duJylcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgfHwgZXZlbnQua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgICAgIHRoaXMub25DbGljaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kgPSB0cnVlO1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuYWJvcnQoKTtcbiAgfVxufVxuIiwiPGlucHV0XG4gIHR5cGU9XCJmaWxlXCJcbiAgI2ZpbGVcbiAgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCJcbiAgW2F0dHIuYWNjZXB0XT1cIm9wdGlvbnMuYWNjZXB0XCJcbiAgW2F0dHIuZGlyZWN0b3J5XT1cIm9wdGlvbnMuZGlyZWN0b3J5ID8gJ2RpcmVjdG9yeScgOiBudWxsXCJcbiAgW2F0dHIud2Via2l0ZGlyZWN0b3J5XT1cIm9wdGlvbnMuZGlyZWN0b3J5ID8gJ3dlYmtpdGRpcmVjdG9yeScgOiBudWxsXCJcbiAgW211bHRpcGxlXT1cIm9wdGlvbnMubXVsdGlwbGVcIlxuICBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIlxuLz5cbjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiJdfQ==