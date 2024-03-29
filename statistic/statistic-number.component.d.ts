import { OnChanges, TemplateRef } from '@angular/core';
import { NzStatisticValueType } from './typings';
import * as i0 from "@angular/core";
export declare class NzStatisticNumberComponent implements OnChanges {
    private locale_id;
    nzValue?: NzStatisticValueType;
    nzValueTemplate?: TemplateRef<{
        $implicit: NzStatisticValueType;
    }>;
    displayInt: string;
    displayDecimal: string;
    constructor(locale_id: string);
    ngOnChanges(): void;
    private formatNumber;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzStatisticNumberComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzStatisticNumberComponent, "nz-statistic-number", ["nzStatisticNumber"], { "nzValue": "nzValue"; "nzValueTemplate": "nzValueTemplate"; }, {}, never, never>;
}
