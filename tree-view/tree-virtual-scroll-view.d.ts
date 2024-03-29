/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { OnChanges, SimpleChanges, TrackByFunction } from '@angular/core';
import { NzTreeVirtualNodeData } from './node';
import { NzTreeNodeOutletDirective } from './outlet';
import { NzTreeView } from './tree';
import * as i0 from "@angular/core";
export declare class NzTreeVirtualScrollViewComponent<T> extends NzTreeView<T> implements OnChanges {
    readonly nodeOutlet: NzTreeNodeOutletDirective;
    readonly virtualScrollViewport: CdkVirtualScrollViewport;
    nzItemSize: number;
    nzMinBufferPx: number;
    nzMaxBufferPx: number;
    trackBy: TrackByFunction<T>;
    nodes: Array<NzTreeVirtualNodeData<T>>;
    innerTrackBy: TrackByFunction<NzTreeVirtualNodeData<T>>;
    ngOnChanges(changes: SimpleChanges): void;
    renderNodeChanges(data: T[] | readonly T[]): void;
    private createNode;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTreeVirtualScrollViewComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTreeVirtualScrollViewComponent<any>, "nz-tree-virtual-scroll-view", ["nzTreeVirtualScrollView"], { "nzItemSize": "nzItemSize"; "nzMinBufferPx": "nzMinBufferPx"; "nzMaxBufferPx": "nzMaxBufferPx"; "trackBy": "trackBy"; }, {}, never, never>;
}
