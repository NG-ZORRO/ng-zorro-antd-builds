/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzPageHeaderBreadcrumbDirective, NzPageHeaderFooterDirective } from './page-header-cells';
import * as i0 from "@angular/core";
export declare class NzPageHeaderComponent implements AfterViewInit, OnDestroy, OnInit {
    private location;
    nzConfigService: NzConfigService;
    private elementRef;
    private nzResizeObserver;
    private cdr;
    private directionality;
    readonly _nzModuleName: NzConfigKey;
    nzBackIcon: string | TemplateRef<void> | null;
    nzTitle?: string | TemplateRef<void>;
    nzSubtitle?: string | TemplateRef<void>;
    nzGhost: boolean;
    readonly nzBack: EventEmitter<void>;
    nzPageHeaderFooter?: ElementRef<NzPageHeaderFooterDirective>;
    nzPageHeaderBreadcrumb?: ElementRef<NzPageHeaderBreadcrumbDirective>;
    compact: boolean;
    destroy$: Subject<void>;
    dir: Direction;
    constructor(location: Location, nzConfigService: NzConfigService, elementRef: ElementRef, nzResizeObserver: NzResizeObserver, cdr: ChangeDetectorRef, directionality: Directionality);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onBack(): void;
    ngOnDestroy(): void;
    getBackIcon(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzPageHeaderComponent, [{ optional: true; }, null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzPageHeaderComponent, "nz-page-header", ["nzPageHeader"], { "nzBackIcon": "nzBackIcon"; "nzTitle": "nzTitle"; "nzSubtitle": "nzSubtitle"; "nzGhost": "nzGhost"; }, { "nzBack": "nzBack"; }, ["nzPageHeaderFooter", "nzPageHeaderBreadcrumb"], ["nz-breadcrumb[nz-page-header-breadcrumb]", "nz-avatar[nz-page-header-avatar]", "nz-page-header-title, [nz-page-header-title]", "nz-page-header-subtitle, [nz-page-header-subtitle]", "nz-page-header-tags, [nz-page-header-tags]", "nz-page-header-extra, [nz-page-header-extra]", "nz-page-header-content, [nz-page-header-content]", "nz-page-header-footer, [nz-page-header-footer]"]>;
}
