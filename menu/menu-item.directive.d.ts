/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { AfterContentInit, ChangeDetectorRef, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { Subject } from 'rxjs';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { MenuService } from './menu.service';
import { NzSubmenuService } from './submenu.service';
import * as i0 from "@angular/core";
export declare class NzMenuItemDirective implements OnInit, OnChanges, OnDestroy, AfterContentInit {
    private nzMenuService;
    private cdr;
    private nzSubmenuService;
    isMenuInsideDropDown: boolean;
    private directionality;
    private routerLink?;
    private routerLinkWithHref?;
    private router?;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    static ngAcceptInputType_nzSelected: BooleanInput;
    static ngAcceptInputType_nzDanger: BooleanInput;
    static ngAcceptInputType_nzMatchRouterExact: BooleanInput;
    static ngAcceptInputType_nzMatchRouter: BooleanInput;
    private destroy$;
    level: number;
    selected$: Subject<boolean>;
    inlinePaddingLeft: number | null;
    dir: Direction;
    nzPaddingLeft?: number;
    nzDisabled: boolean;
    nzSelected: boolean;
    nzDanger: boolean;
    nzMatchRouterExact: boolean;
    nzMatchRouter: boolean;
    listOfRouterLink: QueryList<RouterLink>;
    listOfRouterLinkWithHref: QueryList<RouterLinkWithHref>;
    /** clear all item selected status except this */
    clickMenuItem(e: MouseEvent): void;
    setSelectedState(value: boolean): void;
    private updateRouterActive;
    private hasActiveLinks;
    private isLinkActive;
    constructor(nzMenuService: MenuService, cdr: ChangeDetectorRef, nzSubmenuService: NzSubmenuService, isMenuInsideDropDown: boolean, directionality: Directionality, routerLink?: RouterLink | undefined, routerLinkWithHref?: RouterLinkWithHref | undefined, router?: Router | undefined);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzMenuItemDirective, [null, null, { optional: true; }, null, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzMenuItemDirective, "[nz-menu-item]", ["nzMenuItem"], { "nzPaddingLeft": "nzPaddingLeft"; "nzDisabled": "nzDisabled"; "nzSelected": "nzSelected"; "nzDanger": "nzDanger"; "nzMatchRouterExact": "nzMatchRouterExact"; "nzMatchRouter": "nzMatchRouter"; }, {}, ["listOfRouterLink", "listOfRouterLinkWithHref"]>;
}
