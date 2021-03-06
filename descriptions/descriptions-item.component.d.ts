/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnChanges, OnDestroy, TemplateRef } from '@angular/core';
import { NumberInput } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
export declare class NzDescriptionsItemComponent implements OnChanges, OnDestroy {
    static ngAcceptInputType_nzSpan: NumberInput;
    content: TemplateRef<void>;
    nzSpan: number;
    nzTitle: string | TemplateRef<void>;
    readonly inputChange$: Subject<void>;
    ngOnChanges(): void;
    ngOnDestroy(): void;
}
