/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { TemplateRef } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzDividerComponent {
    static ngAcceptInputType_nzDashed: BooleanInput;
    static ngAcceptInputType_nzPlain: BooleanInput;
    nzText?: string | TemplateRef<void>;
    nzType: 'horizontal' | 'vertical';
    nzOrientation: 'left' | 'right' | 'center';
    nzDashed: boolean;
    nzPlain: boolean;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<NzDividerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzDividerComponent, "nz-divider", ["nzDivider"], { "nzText": "nzText"; "nzType": "nzType"; "nzOrientation": "nzOrientation"; "nzDashed": "nzDashed"; "nzPlain": "nzPlain"; }, {}, never, never>;
}
