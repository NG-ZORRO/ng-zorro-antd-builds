import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, NgModule } from '@angular/core';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTransButtonDirective {
}
NzTransButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTransButtonDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzTransButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTransButtonDirective, selector: "button[nz-trans-button]", host: { properties: { "style.border": "\"0\"", "style.background": "\"transparent\"", "style.padding": "\"0\"", "style.line-height": "\"inherit\"" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTransButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[nz-trans-button]',
                    host: {
                        '[style.border]': '"0"',
                        '[style.background]': '"transparent"',
                        '[style.padding]': '"0"',
                        '[style.line-height]': '"inherit"'
                    }
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTransButtonModule {
}
NzTransButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTransButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzTransButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTransButtonModule, declarations: [NzTransButtonDirective], imports: [CommonModule], exports: [NzTransButtonDirective] });
NzTransButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTransButtonModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTransButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzTransButtonDirective],
                    exports: [NzTransButtonDirective],
                    imports: [CommonModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzTransButtonDirective, NzTransButtonModule };
//# sourceMappingURL=ng-zorro-antd-core-trans-button.mjs.map
