/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnChanges, OnDestroy, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NumberInput } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzDescriptionsItemComponent implements OnChanges, OnDestroy {
    static ngAcceptInputType_nzSpan: NumberInput;
    content: TemplateRef<void>;
    nzSpan: number;
    nzTitle: string | TemplateRef<void>;
    readonly inputChange$: Subject<void>;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzDescriptionsItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzDescriptionsItemComponent, "nz-descriptions-item", ["nzDescriptionsItem"], { "nzSpan": "nzSpan"; "nzTitle": "nzTitle"; }, {}, never, ["*"]>;
}
