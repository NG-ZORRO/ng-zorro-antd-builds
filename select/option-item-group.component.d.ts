/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ElementRef, TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
export declare class NzOptionItemGroupComponent {
    private elementRef;
    nzLabel: string | number | TemplateRef<NzSafeAny> | null;
    constructor(elementRef: ElementRef);
}
