/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Platform } from '@angular/cdk/platform';
import { AfterContentInit, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NzBreakpointKey, NzBreakpointService } from 'ng-zorro-antd/core/services';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { NzMenuDirective } from 'ng-zorro-antd/menu';
import * as i0 from "@angular/core";
export declare class NzSiderComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit {
    private platform;
    private cdr;
    private breakpointService;
    static ngAcceptInputType_nzReverseArrow: BooleanInput;
    static ngAcceptInputType_nzCollapsible: BooleanInput;
    static ngAcceptInputType_nzCollapsed: BooleanInput;
    private destroy$;
    nzMenuDirective: NzMenuDirective | null;
    readonly nzCollapsedChange: EventEmitter<any>;
    nzWidth: string | number;
    nzTheme: 'light' | 'dark';
    nzCollapsedWidth: number;
    nzBreakpoint: NzBreakpointKey | null;
    nzZeroTrigger: TemplateRef<void> | null;
    nzTrigger: TemplateRef<void> | undefined | null;
    nzReverseArrow: boolean;
    nzCollapsible: boolean;
    nzCollapsed: boolean;
    matchBreakPoint: boolean;
    flexSetting: string | null;
    widthSetting: string | null;
    updateStyleMap(): void;
    updateMenuInlineCollapsed(): void;
    setCollapsed(collapsed: boolean): void;
    constructor(platform: Platform, cdr: ChangeDetectorRef, breakpointService: NzBreakpointService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzSiderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzSiderComponent, "nz-sider", ["nzSider"], { "nzWidth": "nzWidth"; "nzTheme": "nzTheme"; "nzCollapsedWidth": "nzCollapsedWidth"; "nzBreakpoint": "nzBreakpoint"; "nzZeroTrigger": "nzZeroTrigger"; "nzTrigger": "nzTrigger"; "nzReverseArrow": "nzReverseArrow"; "nzCollapsible": "nzCollapsible"; "nzCollapsed": "nzCollapsed"; }, { "nzCollapsedChange": "nzCollapsedChange"; }, ["nzMenuDirective"], ["*"]>;
}
