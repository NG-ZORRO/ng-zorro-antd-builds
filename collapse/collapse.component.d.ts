/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { NzCollapsePanelComponent } from './collapse-panel.component';
import * as i0 from "@angular/core";
export declare class NzCollapseComponent implements OnDestroy, OnInit {
    nzConfigService: NzConfigService;
    private cdr;
    private directionality;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzAccordion: BooleanInput;
    static ngAcceptInputType_nzBordered: BooleanInput;
    static ngAcceptInputType_nzGhost: BooleanInput;
    nzAccordion: boolean;
    nzBordered: boolean;
    nzGhost: boolean;
    nzExpandIconPosition: 'left' | 'right';
    dir: Direction;
    private listOfNzCollapsePanelComponent;
    private destroy$;
    constructor(nzConfigService: NzConfigService, cdr: ChangeDetectorRef, directionality: Directionality);
    ngOnInit(): void;
    addPanel(value: NzCollapsePanelComponent): void;
    removePanel(value: NzCollapsePanelComponent): void;
    click(collapse: NzCollapsePanelComponent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzCollapseComponent, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzCollapseComponent, "nz-collapse", ["nzCollapse"], { "nzAccordion": "nzAccordion"; "nzBordered": "nzBordered"; "nzGhost": "nzGhost"; "nzExpandIconPosition": "nzExpandIconPosition"; }, {}, never, ["*"]>;
}
