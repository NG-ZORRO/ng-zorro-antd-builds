/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzTableSelectionComponent {
    listOfSelections: Array<{
        text: string;
        onSelect(...args: NzSafeAny[]): NzSafeAny;
    }>;
    checked: boolean;
    disabled: boolean;
    indeterminate: boolean;
    showCheckbox: boolean;
    showRowSelection: boolean;
    readonly checkedChange: EventEmitter<boolean>;
    constructor();
    onCheckedChange(checked: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTableSelectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTableSelectionComponent, "nz-table-selection", never, { "listOfSelections": "listOfSelections"; "checked": "checked"; "disabled": "disabled"; "indeterminate": "indeterminate"; "showCheckbox": "showCheckbox"; "showRowSelection": "showRowSelection"; }, { "checkedChange": "checkedChange"; }, never, never>;
}
