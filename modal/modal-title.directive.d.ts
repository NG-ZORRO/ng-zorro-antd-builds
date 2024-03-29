/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { TemplateRef } from '@angular/core';
import { NzModalRef } from './modal-ref';
import * as i0 from "@angular/core";
export declare class NzModalTitleDirective {
    private nzModalRef;
    templateRef: TemplateRef<{}>;
    constructor(nzModalRef: NzModalRef, templateRef: TemplateRef<{}>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NzModalTitleDirective, [{ optional: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzModalTitleDirective, "[nzModalTitle]", ["nzModalTitle"], {}, {}, never>;
}
