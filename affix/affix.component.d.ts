/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzScrollService } from 'ng-zorro-antd/core/services';
import { NumberInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { SimpleRect } from './utils';
import * as i0 from "@angular/core";
export declare class NzAffixComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {
    nzConfigService: NzConfigService;
    private scrollSrv;
    private ngZone;
    private platform;
    private renderer;
    private nzResizeObserver;
    private cdr;
    private directionality;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzOffsetTop: NumberInput;
    static ngAcceptInputType_nzOffsetBottom: NumberInput;
    private fixedEl;
    nzTarget?: string | Element | Window;
    nzOffsetTop?: null | number;
    nzOffsetBottom?: null | number;
    readonly nzChange: EventEmitter<boolean>;
    dir: Direction;
    private readonly placeholderNode;
    private affixStyle?;
    private placeholderStyle?;
    private positionChangeSubscription;
    private offsetChanged$;
    private destroy$;
    private timeout?;
    private document;
    private get target();
    constructor(el: ElementRef, doc: NzSafeAny, nzConfigService: NzConfigService, scrollSrv: NzScrollService, ngZone: NgZone, platform: Platform, renderer: Renderer2, nzResizeObserver: NzResizeObserver, cdr: ChangeDetectorRef, directionality: Directionality);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private registerListeners;
    private removeListeners;
    getOffset(element: Element, target: Element | Window | undefined): SimpleRect;
    private setAffixStyle;
    private setPlaceholderStyle;
    private syncPlaceholderStyle;
    updatePosition(e: Event): void;
    private updateRtlClass;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzAffixComponent, [null, null, null, null, null, null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzAffixComponent, "nz-affix", ["nzAffix"], { "nzTarget": "nzTarget"; "nzOffsetTop": "nzOffsetTop"; "nzOffsetBottom": "nzOffsetBottom"; }, { "nzChange": "nzChange"; }, never, ["*"]>;
}
