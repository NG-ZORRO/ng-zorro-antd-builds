/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, NgZone, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare type NzButtonType = 'primary' | 'default' | 'dashed' | 'link' | 'text' | null;
export declare type NzButtonShape = 'circle' | 'round' | null;
export declare type NzButtonSize = 'large' | 'default' | 'small';
export declare class NzButtonComponent implements OnDestroy, OnChanges, AfterViewInit, AfterContentInit, OnInit {
    private ngZone;
    private elementRef;
    private cdr;
    private renderer;
    nzConfigService: NzConfigService;
    private directionality;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzBlock: BooleanInput;
    static ngAcceptInputType_nzGhost: BooleanInput;
    static ngAcceptInputType_nzSearch: BooleanInput;
    static ngAcceptInputType_nzLoading: BooleanInput;
    static ngAcceptInputType_nzDanger: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    nzIconDirectiveElement: ElementRef;
    nzBlock: boolean;
    nzGhost: boolean;
    nzSearch: boolean;
    nzLoading: boolean;
    nzDanger: boolean;
    disabled: boolean;
    tabIndex: number | string | null;
    nzType: NzButtonType;
    nzShape: NzButtonShape;
    nzSize: NzButtonSize;
    dir: Direction;
    private destroy$;
    private loading$;
    insertSpan(nodes: NodeList, renderer: Renderer2): void;
    assertIconOnly(element: HTMLButtonElement, renderer: Renderer2): void;
    constructor(ngZone: NgZone, elementRef: ElementRef, cdr: ChangeDetectorRef, renderer: Renderer2, nzConfigService: NzConfigService, directionality: Directionality);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzButtonComponent, [null, null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzButtonComponent, "button[nz-button], a[nz-button]", ["nzButton"], { "nzBlock": "nzBlock"; "nzGhost": "nzGhost"; "nzSearch": "nzSearch"; "nzLoading": "nzLoading"; "nzDanger": "nzDanger"; "disabled": "disabled"; "tabIndex": "tabIndex"; "nzType": "nzType"; "nzShape": "nzShape"; "nzSize": "nzSize"; }, {}, ["nzIconDirectiveElement"], ["*"]>;
}
