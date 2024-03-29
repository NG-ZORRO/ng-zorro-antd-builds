/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter, TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzSelectClearComponent {
    clearIcon: TemplateRef<NzSafeAny> | null;
    readonly clear: EventEmitter<MouseEvent>;
    constructor();
    onClick(e: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzSelectClearComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzSelectClearComponent, "nz-select-clear", never, { "clearIcon": "clearIcon"; }, { "clear": "clear"; }, never, never>;
}
