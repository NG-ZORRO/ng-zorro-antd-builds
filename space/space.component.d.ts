/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterContentInit, ChangeDetectorRef, OnChanges, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzSpaceAlign, NzSpaceDirection, NzSpaceSize } from './types';
import * as i0 from "@angular/core";
export declare class NzSpaceComponent implements OnChanges, OnDestroy, AfterContentInit {
    nzConfigService: NzConfigService;
    private cdr;
    static ngAcceptInputType_nzWrap: BooleanInput;
    readonly _nzModuleName: NzConfigKey;
    nzDirection: NzSpaceDirection;
    nzAlign?: NzSpaceAlign;
    nzSplit: TemplateRef<{
        $implicit: number;
    }> | null;
    nzWrap: boolean;
    nzSize: NzSpaceSize;
    items: QueryList<TemplateRef<NzSafeAny>>;
    mergedAlign?: NzSpaceAlign;
    spaceSize: number;
    private destroy$;
    constructor(nzConfigService: NzConfigService, cdr: ChangeDetectorRef);
    private updateSpaceItems;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzSpaceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzSpaceComponent, "nz-space, [nz-space]", ["NzSpace"], { "nzDirection": "nzDirection"; "nzAlign": "nzAlign"; "nzSplit": "nzSplit"; "nzWrap": "nzWrap"; "nzSize": "nzSize"; }, {}, ["items"], ["*"]>;
}
