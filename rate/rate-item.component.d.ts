/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter, TemplateRef } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzRateItemComponent {
    static ngAcceptInputType_allowHalf: BooleanInput;
    character: TemplateRef<void>;
    index: number;
    allowHalf: boolean;
    readonly itemHover: EventEmitter<boolean>;
    readonly itemClick: EventEmitter<boolean>;
    hoverRate(isHalf: boolean): void;
    clickRate(isHalf: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzRateItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzRateItemComponent, "[nz-rate-item]", ["nzRateItem"], { "character": "character"; "index": "index"; "allowHalf": "allowHalf"; }, { "itemHover": "itemHover"; "itemClick": "itemClick"; }, never, never>;
}
