import * as i0 from '@angular/core';
import { Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * A patch directive to select the element of a component.
 */
class NzElementPatchDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    get nativeElement() {
        return this.elementRef.nativeElement;
    }
}
NzElementPatchDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzElementPatchDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NzElementPatchDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzElementPatchDirective, selector: "[nzElement], [nz-element]", exportAs: ["nzElement"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzElementPatchDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzElement], [nz-element]',
                    exportAs: 'nzElement'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzElementPatchModule {
}
NzElementPatchModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzElementPatchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzElementPatchModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzElementPatchModule, declarations: [NzElementPatchDirective], imports: [CommonModule], exports: [NzElementPatchDirective] });
NzElementPatchModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzElementPatchModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzElementPatchModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NzElementPatchDirective],
                    exports: [NzElementPatchDirective]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzElementPatchDirective, NzElementPatchModule };
//# sourceMappingURL=ng-zorro-antd-core-element-patch.mjs.map
