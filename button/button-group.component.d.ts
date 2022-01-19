/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { OnDestroy, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare type NzButtonGroupSize = 'large' | 'default' | 'small';
export declare class NzButtonGroupComponent implements OnDestroy, OnInit {
    private directionality;
    nzSize: NzButtonGroupSize;
    dir: Direction;
    private destroy$;
    constructor(directionality: Directionality);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzButtonGroupComponent, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzButtonGroupComponent, "nz-button-group", ["nzButtonGroup"], { "nzSize": "nzSize"; }, {}, never, ["*"]>;
}
