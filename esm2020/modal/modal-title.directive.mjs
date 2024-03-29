/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Optional } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./modal-ref";
export class NzModalTitleDirective {
    constructor(nzModalRef, templateRef) {
        this.nzModalRef = nzModalRef;
        this.templateRef = templateRef;
        if (this.nzModalRef) {
            this.nzModalRef.updateConfig({
                nzTitle: this.templateRef
            });
        }
    }
}
NzModalTitleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalTitleDirective, deps: [{ token: i1.NzModalRef, optional: true }, { token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NzModalTitleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzModalTitleDirective, selector: "[nzModalTitle]", exportAs: ["nzModalTitle"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalTitleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzModalTitle]',
                    exportAs: 'nzModalTitle'
                }]
        }], ctorParameters: function () { return [{ type: i1.NzModalRef, decorators: [{
                    type: Optional
                }] }, { type: i0.TemplateRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdGl0bGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9tb2RhbC9tb2RhbC10aXRsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQWUsTUFBTSxlQUFlLENBQUM7OztBQVFqRSxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLFlBQWdDLFVBQXNCLEVBQVMsV0FBNEI7UUFBM0QsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUN6RixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7Z0JBQzNCLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVzthQUMxQixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7O2tIQVBVLHFCQUFxQjtzR0FBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBSmpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCOzswQkFFYyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBPcHRpb25hbCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpNb2RhbFJlZiB9IGZyb20gJy4vbW9kYWwtcmVmJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW256TW9kYWxUaXRsZV0nLFxuICBleHBvcnRBczogJ256TW9kYWxUaXRsZSdcbn0pXG5leHBvcnQgY2xhc3MgTnpNb2RhbFRpdGxlRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJpdmF0ZSBuek1vZGFsUmVmOiBOek1vZGFsUmVmLCBwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPHt9Pikge1xuICAgIGlmICh0aGlzLm56TW9kYWxSZWYpIHtcbiAgICAgIHRoaXMubnpNb2RhbFJlZi51cGRhdGVDb25maWcoe1xuICAgICAgICBuelRpdGxlOiB0aGlzLnRlbXBsYXRlUmVmXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==