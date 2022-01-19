import { NzTableStyleService } from '../table-style.service';
import * as i0 from "@angular/core";
export declare class NzTableCellDirective {
    isInsideTable: boolean;
    constructor(nzTableStyleService: NzTableStyleService);
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTableCellDirective, [{ optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzTableCellDirective, "th:not(.nz-disable-th):not([mat-cell]), td:not(.nz-disable-td):not([mat-cell])", never, {}, {}, never>;
}
