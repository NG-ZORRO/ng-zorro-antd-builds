/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzThSelectionComponent implements OnChanges {
    static ngAcceptInputType_nzShowCheckbox: BooleanInput;
    static ngAcceptInputType_nzShowRowSelection: BooleanInput;
    nzSelections: Array<{
        text: string;
        onSelect(...args: NzSafeAny[]): NzSafeAny;
    }>;
    nzChecked: boolean;
    nzDisabled: boolean;
    nzIndeterminate: boolean;
    nzShowCheckbox: boolean;
    nzShowRowSelection: boolean;
    readonly nzCheckedChange: EventEmitter<boolean>;
    private isNzShowExpandChanged;
    private isNzShowCheckboxChanged;
    constructor();
    onCheckedChange(checked: boolean): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzThSelectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzThSelectionComponent, "th[nzSelections],th[nzChecked],th[nzShowCheckbox],th[nzShowRowSelection]", never, { "nzSelections": "nzSelections"; "nzChecked": "nzChecked"; "nzDisabled": "nzDisabled"; "nzIndeterminate": "nzIndeterminate"; "nzShowCheckbox": "nzShowCheckbox"; "nzShowRowSelection": "nzShowRowSelection"; }, { "nzCheckedChange": "nzCheckedChange"; }, never, ["*"]>;
}
