/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTableLayout } from '../table.types';
import * as i0 from "@angular/core";
export declare class NzTableInnerDefaultComponent {
    tableLayout: NzTableLayout;
    listOfColWidth: ReadonlyArray<string | null>;
    theadTemplate: TemplateRef<NzSafeAny> | null;
    contentTemplate: TemplateRef<NzSafeAny> | null;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTableInnerDefaultComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTableInnerDefaultComponent, "nz-table-inner-default", never, { "tableLayout": "tableLayout"; "listOfColWidth": "listOfColWidth"; "theadTemplate": "theadTemplate"; "contentTemplate": "contentTemplate"; }, {}, never, never>;
}
