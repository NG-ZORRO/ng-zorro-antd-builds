/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTableSortOrder } from '../table.types';
import * as i0 from "@angular/core";
export declare class NzTableSortersComponent implements OnChanges {
    sortDirections: NzTableSortOrder[];
    sortOrder: NzTableSortOrder;
    contentTemplate: TemplateRef<NzSafeAny> | null;
    isUp: boolean;
    isDown: boolean;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTableSortersComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTableSortersComponent, "nz-table-sorters", never, { "sortDirections": "sortDirections"; "sortOrder": "sortOrder"; "contentTemplate": "contentTemplate"; }, {}, never, never>;
}
