/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { AfterContentInit, ChangeDetectorRef, ElementRef, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { BooleanInput, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzInputDirective } from './input.directive';
import * as i0 from "@angular/core";
export declare class NzInputGroupWhitSuffixOrPrefixDirective {
    elementRef: ElementRef;
    constructor(elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NzInputGroupWhitSuffixOrPrefixDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzInputGroupWhitSuffixOrPrefixDirective, "nz-input-group[nzSuffix], nz-input-group[nzPrefix]", never, {}, {}, never>;
}
export declare class NzInputGroupComponent implements AfterContentInit, OnChanges, OnInit, OnDestroy {
    private focusMonitor;
    private elementRef;
    private cdr;
    private directionality;
    static ngAcceptInputType_nzSearch: BooleanInput;
    static ngAcceptInputType_nzCompact: BooleanInput;
    listOfNzInputDirective: QueryList<NzInputDirective>;
    nzAddOnBeforeIcon?: string | null;
    nzAddOnAfterIcon?: string | null;
    nzPrefixIcon?: string | null;
    nzSuffixIcon?: string | null;
    nzAddOnBefore?: string | TemplateRef<void>;
    nzAddOnAfter?: string | TemplateRef<void>;
    nzPrefix?: string | TemplateRef<void>;
    nzSuffix?: string | TemplateRef<void>;
    nzSize: NzSizeLDSType;
    nzSearch: boolean;
    nzCompact: boolean;
    isLarge: boolean;
    isSmall: boolean;
    isAffix: boolean;
    isAddOn: boolean;
    focused: boolean;
    disabled: boolean;
    dir: Direction;
    private destroy$;
    constructor(focusMonitor: FocusMonitor, elementRef: ElementRef, cdr: ChangeDetectorRef, directionality: Directionality);
    updateChildrenInputSize(): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzInputGroupComponent, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzInputGroupComponent, "nz-input-group", ["nzInputGroup"], { "nzAddOnBeforeIcon": "nzAddOnBeforeIcon"; "nzAddOnAfterIcon": "nzAddOnAfterIcon"; "nzPrefixIcon": "nzPrefixIcon"; "nzSuffixIcon": "nzSuffixIcon"; "nzAddOnBefore": "nzAddOnBefore"; "nzAddOnAfter": "nzAddOnAfter"; "nzPrefix": "nzPrefix"; "nzSuffix": "nzSuffix"; "nzSize": "nzSize"; "nzSearch": "nzSearch"; "nzCompact": "nzCompact"; }, {}, ["listOfNzInputDirective"], ["*"]>;
}
