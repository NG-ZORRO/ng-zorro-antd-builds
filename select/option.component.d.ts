/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnChanges, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzOptionGroupComponent } from './option-group.component';
import * as i0 from "@angular/core";
export declare class NzOptionComponent implements OnChanges, OnInit {
    private nzOptionGroupComponent;
    private destroy$;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    static ngAcceptInputType_nzHide: BooleanInput;
    static ngAcceptInputType_nzCustomContent: BooleanInput;
    changes: Subject<unknown>;
    groupLabel: string | number | TemplateRef<NzSafeAny> | null;
    template: TemplateRef<NzSafeAny>;
    nzLabel: string | number | null;
    nzValue: NzSafeAny | null;
    nzDisabled: boolean;
    nzHide: boolean;
    nzCustomContent: boolean;
    constructor(nzOptionGroupComponent: NzOptionGroupComponent, destroy$: NzDestroyService);
    ngOnInit(): void;
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzOptionComponent, [{ optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzOptionComponent, "nz-option", ["nzOption"], { "nzLabel": "nzLabel"; "nzValue": "nzValue"; "nzDisabled": "nzDisabled"; "nzHide": "nzHide"; "nzCustomContent": "nzCustomContent"; }, {}, never, ["*"]>;
}
