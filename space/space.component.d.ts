/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterContentInit, ChangeDetectorRef, OnChanges, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzSpaceItemLegacyComponent } from './space-item.component';
import { NzSpaceAlign, NzSpaceDirection, NzSpaceSize } from './types';
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
    /**
     * @deprecated NzSpaceItemLegacyComponent will be removed on 12.0.0, use NzSpaceItemDirective instead.
     * @breaking-change 12.0.0
     */
    nzSpaceItemComponents: QueryList<NzSpaceItemLegacyComponent>;
    items: QueryList<TemplateRef<NzSafeAny>>;
    mergedAlign?: NzSpaceAlign;
    spaceSize: number;
    private destroy$;
    constructor(nzConfigService: NzConfigService, cdr: ChangeDetectorRef);
    private updateSpaceItems;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
}
