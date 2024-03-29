/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ElementRef, NgZone, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { BooleanInput, NgClassType } from 'ng-zorro-antd/core/types';
import { NzProgressFormatter } from 'ng-zorro-antd/progress';
import * as i0 from "@angular/core";
export declare class NzStepComponent implements OnInit {
    private cdr;
    private ngZone;
    private destroy$;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    processDotTemplate?: TemplateRef<void>;
    itemContainer: ElementRef<HTMLElement>;
    nzTitle?: string | TemplateRef<void>;
    nzSubtitle?: string | TemplateRef<void>;
    nzDescription?: string | TemplateRef<void>;
    nzDisabled: boolean;
    nzPercentage: number | null;
    get nzStatus(): string;
    set nzStatus(status: string);
    isCustomStatus: boolean;
    private _status;
    get nzIcon(): NgClassType | TemplateRef<void> | undefined;
    set nzIcon(value: NgClassType | TemplateRef<void> | undefined);
    oldAPIIcon: boolean;
    private _icon?;
    customProcessTemplate?: TemplateRef<{
        $implicit: TemplateRef<void>;
        status: string;
        index: number;
    }>;
    direction: string;
    index: number;
    last: boolean;
    outStatus: string;
    showProcessDot: boolean;
    clickable: boolean;
    clickOutsideAngular$: Subject<number>;
    readonly nullProcessFormat: NzProgressFormatter;
    get showProgress(): boolean;
    get currentIndex(): number;
    set currentIndex(current: number);
    private _currentIndex;
    constructor(cdr: ChangeDetectorRef, ngZone: NgZone, destroy$: NzDestroyService);
    ngOnInit(): void;
    enable(): void;
    disable(): void;
    markForCheck(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzStepComponent, "nz-step", ["nzStep"], { "nzTitle": "nzTitle"; "nzSubtitle": "nzSubtitle"; "nzDescription": "nzDescription"; "nzDisabled": "nzDisabled"; "nzPercentage": "nzPercentage"; "nzStatus": "nzStatus"; "nzIcon": "nzIcon"; }, {}, never, never>;
}
