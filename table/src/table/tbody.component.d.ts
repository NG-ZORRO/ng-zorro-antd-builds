/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnDestroy, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NzTableStyleService } from '../table-style.service';
import * as i0 from "@angular/core";
export declare class NzTbodyComponent implements OnDestroy {
    private nzTableStyleService;
    isInsideTable: boolean;
    showEmpty$: BehaviorSubject<boolean>;
    noResult$: BehaviorSubject<string | TemplateRef<any> | undefined>;
    listOfMeasureColumn$: BehaviorSubject<readonly string[]>;
    private destroy$;
    constructor(nzTableStyleService: NzTableStyleService);
    onListOfAutoWidthChange(listOfAutoWidth: number[]): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTbodyComponent, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTbodyComponent, "tbody", never, {}, {}, never, ["*"]>;
}
