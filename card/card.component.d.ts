/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, OnDestroy, OnInit, QueryList, TemplateRef } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { BooleanInput, NgStyleInterface, NzSizeDSType } from 'ng-zorro-antd/core/types';
import { NzCardGridDirective } from './card-grid.directive';
import { NzCardTabComponent } from './card-tab.component';
import * as i0 from "@angular/core";
export declare class NzCardComponent implements OnDestroy, OnInit {
    nzConfigService: NzConfigService;
    private cdr;
    private directionality;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzBordered: BooleanInput;
    static ngAcceptInputType_nzBorderless: BooleanInput;
    static ngAcceptInputType_nzLoading: BooleanInput;
    static ngAcceptInputType_nzHoverable: BooleanInput;
    nzBordered: boolean;
    nzBorderless: boolean;
    nzLoading: boolean;
    nzHoverable: boolean;
    nzBodyStyle: NgStyleInterface | null;
    nzCover?: TemplateRef<void>;
    nzActions: Array<TemplateRef<void>>;
    nzType: string | 'inner' | null;
    nzSize: NzSizeDSType;
    nzTitle?: string | TemplateRef<void>;
    nzExtra?: string | TemplateRef<void>;
    listOfNzCardTabComponent?: NzCardTabComponent;
    listOfNzCardGridDirective: QueryList<NzCardGridDirective>;
    dir: Direction;
    private destroy$;
    constructor(nzConfigService: NzConfigService, cdr: ChangeDetectorRef, directionality: Directionality);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzCardComponent, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzCardComponent, "nz-card", ["nzCard"], { "nzBordered": "nzBordered"; "nzBorderless": "nzBorderless"; "nzLoading": "nzLoading"; "nzHoverable": "nzHoverable"; "nzBodyStyle": "nzBodyStyle"; "nzCover": "nzCover"; "nzActions": "nzActions"; "nzType": "nzType"; "nzSize": "nzSize"; "nzTitle": "nzTitle"; "nzExtra": "nzExtra"; }, {}, ["listOfNzCardTabComponent", "listOfNzCardGridDirective"], ["*"]>;
}
