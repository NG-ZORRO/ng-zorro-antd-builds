/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NzTreeVirtualNodeData } from './node';
import { NzTreeNodeOutletDirective } from './outlet';
import { NzTreeView } from './tree';
export declare class NzTreeVirtualScrollViewComponent<T> extends NzTreeView<T> {
    readonly nodeOutlet: NzTreeNodeOutletDirective;
    readonly virtualScrollViewport: CdkVirtualScrollViewport;
    nzNodeWidth: number;
    nzMinBufferPx: number;
    nzMaxBufferPx: number;
    nodes: Array<NzTreeVirtualNodeData<T>>;
    renderNodeChanges(data: T[] | ReadonlyArray<T>): void;
    private createNode;
}