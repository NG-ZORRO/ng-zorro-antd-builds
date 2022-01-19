/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit } from '@angular/core';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzAutocompleteOptgroupComponent } from './autocomplete-optgroup.component';
import * as i0 from "@angular/core";
export declare class NzOptionSelectionChange {
    source: NzAutocompleteOptionComponent;
    isUserInput: boolean;
    constructor(source: NzAutocompleteOptionComponent, isUserInput?: boolean);
}
export declare class NzAutocompleteOptionComponent implements OnInit, OnDestroy {
    private ngZone;
    private changeDetectorRef;
    private element;
    nzAutocompleteOptgroupComponent: NzAutocompleteOptgroupComponent;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    nzValue: NzSafeAny;
    nzLabel?: string;
    nzDisabled: boolean;
    readonly selectionChange: EventEmitter<NzOptionSelectionChange>;
    readonly mouseEntered: EventEmitter<NzAutocompleteOptionComponent>;
    active: boolean;
    selected: boolean;
    private destroy$;
    constructor(ngZone: NgZone, changeDetectorRef: ChangeDetectorRef, element: ElementRef<HTMLElement>, nzAutocompleteOptgroupComponent: NzAutocompleteOptgroupComponent);
    ngOnInit(): void;
    ngOnDestroy(): void;
    select(emit?: boolean): void;
    deselect(): void;
    /** Git display label */
    getLabel(): string;
    /** Set active (only styles) */
    setActiveStyles(): void;
    /** Unset active (only styles) */
    setInactiveStyles(): void;
    scrollIntoViewIfNeeded(): void;
    selectViaInteraction(): void;
    private emitSelectionChangeEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzAutocompleteOptionComponent, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzAutocompleteOptionComponent, "nz-auto-option", ["nzAutoOption"], { "nzValue": "nzValue"; "nzLabel": "nzLabel"; "nzDisabled": "nzDisabled"; }, { "selectionChange": "selectionChange"; "mouseEntered": "mouseEntered"; }, never, ["*"]>;
}
