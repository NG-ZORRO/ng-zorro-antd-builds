/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzTdAddOnComponent implements OnChanges {
    static ngAcceptInputType_nzShowExpand: BooleanInput;
    static ngAcceptInputType_nzShowCheckbox: BooleanInput;
    static ngAcceptInputType_nzExpand: BooleanInput;
    nzChecked: boolean;
    nzDisabled: boolean;
    nzIndeterminate: boolean;
    nzIndentSize: number;
    nzShowExpand: boolean;
    nzShowCheckbox: boolean;
    nzExpand: boolean;
    readonly nzCheckedChange: EventEmitter<boolean>;
    readonly nzExpandChange: EventEmitter<boolean>;
    private isNzShowExpandChanged;
    private isNzShowCheckboxChanged;
    onCheckedChange(checked: boolean): void;
    onExpandChange(expand: boolean): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTdAddOnComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTdAddOnComponent, "td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox]", never, { "nzChecked": "nzChecked"; "nzDisabled": "nzDisabled"; "nzIndeterminate": "nzIndeterminate"; "nzIndentSize": "nzIndentSize"; "nzShowExpand": "nzShowExpand"; "nzShowCheckbox": "nzShowCheckbox"; "nzExpand": "nzExpand"; }, { "nzCheckedChange": "nzCheckedChange"; "nzExpandChange": "nzExpandChange"; }, never, ["*"]>;
}
