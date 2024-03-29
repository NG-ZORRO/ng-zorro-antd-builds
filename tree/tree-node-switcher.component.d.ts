/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { TemplateRef } from '@angular/core';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import * as i0 from "@angular/core";
export declare class NzTreeNodeSwitcherComponent {
    nzShowExpand?: boolean;
    nzShowLine?: boolean;
    nzExpandedIcon?: TemplateRef<{
        $implicit: NzTreeNode;
        origin: NzTreeNodeOptions;
    }>;
    nzSelectMode: boolean;
    context: NzTreeNode;
    isLeaf?: boolean;
    isLoading?: boolean;
    isExpanded?: boolean;
    get isShowLineIcon(): boolean;
    get isShowSwitchIcon(): boolean;
    get isSwitcherOpen(): boolean;
    get isSwitcherClose(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTreeNodeSwitcherComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTreeNodeSwitcherComponent, "nz-tree-node-switcher", never, { "nzShowExpand": "nzShowExpand"; "nzShowLine": "nzShowLine"; "nzExpandedIcon": "nzExpandedIcon"; "nzSelectMode": "nzSelectMode"; "context": "context"; "isLeaf": "isLeaf"; "isLoading": "isLoading"; "isExpanded": "isExpanded"; }, {}, never, never>;
}
