/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { NzTreeNodeComponent } from './node';
import * as i0 from "@angular/core";
export declare class NzTreeNodeOptionComponent<T> implements OnChanges {
    private treeNode;
    static ngAcceptInputType_nzSelected: BooleanInput;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    nzSelected: boolean;
    nzDisabled: boolean;
    readonly nzClick: EventEmitter<MouseEvent>;
    constructor(treeNode: NzTreeNodeComponent<T>);
    get isExpanded(): boolean;
    onClick(e: MouseEvent): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTreeNodeOptionComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTreeNodeOptionComponent<any>, "nz-tree-node-option", never, { "nzSelected": "nzSelected"; "nzDisabled": "nzDisabled"; }, { "nzClick": "nzClick"; }, never, ["*"]>;
}
