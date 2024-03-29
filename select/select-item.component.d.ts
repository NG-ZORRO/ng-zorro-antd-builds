/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter, TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzSelectItemComponent {
    disabled: boolean;
    label: string | number | null | undefined;
    deletable: boolean;
    removeIcon: TemplateRef<NzSafeAny> | null;
    contentTemplateOutletContext: NzSafeAny | null;
    contentTemplateOutlet: string | TemplateRef<NzSafeAny> | null;
    readonly delete: EventEmitter<MouseEvent>;
    constructor();
    onDelete(e: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzSelectItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzSelectItemComponent, "nz-select-item", never, { "disabled": "disabled"; "label": "label"; "deletable": "deletable"; "removeIcon": "removeIcon"; "contentTemplateOutletContext": "contentTemplateOutletContext"; "contentTemplateOutlet": "contentTemplateOutlet"; }, { "delete": "delete"; }, never, never>;
}
