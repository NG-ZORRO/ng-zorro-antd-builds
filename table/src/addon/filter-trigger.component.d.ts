/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnInit } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import * as i0 from "@angular/core";
export declare class NzFilterTriggerComponent implements OnInit {
    readonly nzConfigService: NzConfigService;
    private ngZone;
    private cdr;
    private destroy$;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzBackdrop: BooleanInput;
    nzActive: boolean;
    nzDropdownMenu: NzDropdownMenuComponent;
    nzVisible: boolean;
    nzBackdrop: boolean;
    readonly nzVisibleChange: EventEmitter<boolean>;
    nzDropdown: ElementRef<HTMLElement>;
    onVisibleChange(visible: boolean): void;
    hide(): void;
    show(): void;
    constructor(nzConfigService: NzConfigService, ngZone: NgZone, cdr: ChangeDetectorRef, destroy$: NzDestroyService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzFilterTriggerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzFilterTriggerComponent, "nz-filter-trigger", ["nzFilterTrigger"], { "nzActive": "nzActive"; "nzDropdownMenu": "nzDropdownMenu"; "nzVisible": "nzVisible"; "nzBackdrop": "nzBackdrop"; }, { "nzVisibleChange": "nzVisibleChange"; }, never, ["*"]>;
}
