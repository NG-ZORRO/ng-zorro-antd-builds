/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction } from '@angular/cdk/bidi';
import { OnChanges } from '@angular/core';
import { BooleanInput, NumberInput } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export interface NzSliderTrackStyle {
    bottom?: string | null;
    height?: string | null;
    left?: string | null;
    right?: string | null;
    width?: string | null;
    visibility?: string;
}
export declare class NzSliderTrackComponent implements OnChanges {
    static ngAcceptInputType_offset: NumberInput;
    static ngAcceptInputType_length: NumberInput;
    static ngAcceptInputType_vertical: BooleanInput;
    static ngAcceptInputType_included: BooleanInput;
    static ngAcceptInputType_reverse: BooleanInput;
    offset: number;
    reverse: boolean;
    dir: Direction;
    length: number;
    vertical: boolean;
    included: boolean;
    style: NzSliderTrackStyle;
    ngOnChanges(): void;
    private getHorizontalStylePosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzSliderTrackComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzSliderTrackComponent, "nz-slider-track", ["nzSliderTrack"], { "offset": "offset"; "reverse": "reverse"; "dir": "dir"; "length": "length"; "vertical": "vertical"; "included": "included"; }, {}, never, never>;
}
