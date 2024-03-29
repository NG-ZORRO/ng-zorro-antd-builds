/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzBadgeSupComponent implements OnInit, OnChanges {
    nzOffset?: [number, number];
    nzTitle?: string | null | undefined;
    nzStyle: {
        [key: string]: string;
    } | null;
    nzDot: boolean;
    nzOverflowCount: number;
    disableAnimation: boolean;
    nzCount?: number | TemplateRef<NzSafeAny>;
    noAnimation: boolean;
    maxNumberArray: string[];
    countArray: number[];
    count: number;
    countSingleArray: number[];
    constructor();
    generateMaxNumberArray(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzBadgeSupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzBadgeSupComponent, "nz-badge-sup", ["nzBadgeSup"], { "nzOffset": "nzOffset"; "nzTitle": "nzTitle"; "nzStyle": "nzStyle"; "nzDot": "nzDot"; "nzOverflowCount": "nzOverflowCount"; "disableAnimation": "disableAnimation"; "nzCount": "nzCount"; "noAnimation": "noAnimation"; }, {}, never, never>;
}
