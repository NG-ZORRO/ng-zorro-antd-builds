/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { AfterViewInit, ElementRef, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { NzRowDirective } from './row.directive';
import * as i0 from "@angular/core";
export interface EmbeddedProperty {
    span?: number;
    pull?: number;
    push?: number;
    offset?: number;
    order?: number;
}
export declare class NzColDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    private elementRef;
    nzRowDirective: NzRowDirective;
    renderer: Renderer2;
    private directionality;
    private classMap;
    private destroy$;
    hostFlexStyle: string | null;
    dir: Direction;
    nzFlex: string | number | null;
    nzSpan: string | number | null;
    nzOrder: string | number | null;
    nzOffset: string | number | null;
    nzPush: string | number | null;
    nzPull: string | number | null;
    nzXs: string | number | EmbeddedProperty | null;
    nzSm: string | number | EmbeddedProperty | null;
    nzMd: string | number | EmbeddedProperty | null;
    nzLg: string | number | EmbeddedProperty | null;
    nzXl: string | number | EmbeddedProperty | null;
    nzXXl: string | number | EmbeddedProperty | null;
    setHostClassMap(): void;
    setHostFlexStyle(): void;
    parseFlex(flex: number | string | null): string | null;
    generateClass(): object;
    constructor(elementRef: ElementRef, nzRowDirective: NzRowDirective, renderer: Renderer2, directionality: Directionality);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzColDirective, [null, { optional: true; host: true; }, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzColDirective, "[nz-col],nz-col,nz-form-control,nz-form-label", ["nzCol"], { "nzFlex": "nzFlex"; "nzSpan": "nzSpan"; "nzOrder": "nzOrder"; "nzOffset": "nzOffset"; "nzPush": "nzPush"; "nzPull": "nzPull"; "nzXs": "nzXs"; "nzSm": "nzSm"; "nzMd": "nzMd"; "nzLg": "nzLg"; "nzXl": "nzXl"; "nzXXl": "nzXXl"; }, {}, never>;
}
