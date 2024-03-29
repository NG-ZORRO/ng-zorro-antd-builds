/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzTreeNodeCheckboxComponent {
    static ngAcceptInputType_nzDisabled: BooleanInput;
    nzChecked?: boolean;
    nzIndeterminate?: boolean;
    nzDisabled?: boolean;
    readonly nzClick: EventEmitter<MouseEvent>;
    onClick(e: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTreeNodeCheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTreeNodeCheckboxComponent, "nz-tree-node-checkbox:not([builtin])", never, { "nzChecked": "nzChecked"; "nzIndeterminate": "nzIndeterminate"; "nzDisabled": "nzDisabled"; }, { "nzClick": "nzClick"; }, never, never>;
}
