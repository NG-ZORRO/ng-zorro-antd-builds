/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, NgZone, OnChanges, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NzListItemExtraComponent {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<NzListItemExtraComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzListItemExtraComponent, "nz-list-item-extra, [nz-list-item-extra]", ["nzListItemExtra"], {}, {}, never, ["*"]>;
}
export declare class NzListItemActionComponent {
    templateRef?: TemplateRef<void>;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<NzListItemActionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzListItemActionComponent, "nz-list-item-action", ["nzListItemAction"], {}, {}, never, ["*"]>;
}
export declare class NzListItemActionsComponent implements OnChanges, OnDestroy {
    private ngZone;
    private cdr;
    nzActions: Array<TemplateRef<void>>;
    nzListItemActions: QueryList<NzListItemActionComponent>;
    actions: Array<TemplateRef<void>>;
    private destroy$;
    private inputActionChanges$;
    private contentChildrenChanges$;
    constructor(ngZone: NgZone, cdr: ChangeDetectorRef);
    ngOnChanges(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzListItemActionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzListItemActionsComponent, "ul[nz-list-item-actions]", ["nzListItemActions"], { "nzActions": "nzActions"; }, {}, ["nzListItemActions"], never>;
}
