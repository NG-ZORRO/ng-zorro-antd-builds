/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzDragService, NzResizeService } from 'ng-zorro-antd/core/services';
import { BooleanInput, NumberInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzCarouselContentDirective } from './carousel-content.directive';
import { NzCarouselBaseStrategy } from './strategies/base-strategy';
import { FromToInterface, NzCarouselDotPosition, NzCarouselEffects, NzCarouselStrategyRegistryItem } from './typings';
import * as i0 from "@angular/core";
export declare class NzCarouselComponent implements AfterContentInit, AfterViewInit, OnDestroy, OnChanges, OnInit {
    readonly nzConfigService: NzConfigService;
    private readonly ngZone;
    private readonly renderer;
    private readonly cdr;
    private readonly platform;
    private readonly resizeService;
    private readonly nzDragService;
    private directionality;
    private customStrategies;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzEnableSwipe: BooleanInput;
    static ngAcceptInputType_nzDots: BooleanInput;
    static ngAcceptInputType_nzAutoPlay: BooleanInput;
    static ngAcceptInputType_nzAutoPlaySpeed: NumberInput;
    static ngAcceptInputType_nzTransitionSpeed: NumberInput;
    carouselContents: QueryList<NzCarouselContentDirective>;
    slickList: ElementRef<HTMLElement>;
    slickTrack: ElementRef<HTMLElement>;
    nzDotRender?: TemplateRef<{
        $implicit: number;
    }>;
    nzEffect: NzCarouselEffects;
    nzEnableSwipe: boolean;
    nzDots: boolean;
    nzAutoPlay: boolean;
    nzAutoPlaySpeed: number;
    nzTransitionSpeed: number;
    /**
     * this property is passed directly to an NzCarouselBaseStrategy
     */
    nzStrategyOptions: NzSafeAny;
    set nzDotPosition(value: NzCarouselDotPosition);
    get nzDotPosition(): NzCarouselDotPosition;
    private _dotPosition;
    readonly nzBeforeChange: EventEmitter<FromToInterface>;
    readonly nzAfterChange: EventEmitter<number>;
    activeIndex: number;
    el: HTMLElement;
    slickListEl: HTMLElement;
    slickTrackEl: HTMLElement;
    strategy?: NzCarouselBaseStrategy;
    vertical: boolean;
    transitionInProgress: number | null;
    dir: Direction;
    private destroy$;
    private gestureRect;
    private pointerDelta;
    private isTransiting;
    private isDragging;
    constructor(elementRef: ElementRef, nzConfigService: NzConfigService, ngZone: NgZone, renderer: Renderer2, cdr: ChangeDetectorRef, platform: Platform, resizeService: NzResizeService, nzDragService: NzDragService, directionality: Directionality, customStrategies: NzCarouselStrategyRegistryItem[]);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    onLiClick: (index: number) => void;
    next(): void;
    pre(): void;
    goTo(index: number): void;
    private switchStrategy;
    private scheduleNextTransition;
    private clearScheduledTransition;
    private markContentActive;
    /**
     * Drag carousel.
     */
    pointerDown: (event: TouchEvent | MouseEvent) => void;
    layout(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzCarouselComponent, [null, null, null, null, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzCarouselComponent, "nz-carousel", ["nzCarousel"], { "nzDotRender": "nzDotRender"; "nzEffect": "nzEffect"; "nzEnableSwipe": "nzEnableSwipe"; "nzDots": "nzDots"; "nzAutoPlay": "nzAutoPlay"; "nzAutoPlaySpeed": "nzAutoPlaySpeed"; "nzTransitionSpeed": "nzTransitionSpeed"; "nzStrategyOptions": "nzStrategyOptions"; "nzDotPosition": "nzDotPosition"; }, { "nzBeforeChange": "nzBeforeChange"; "nzAfterChange": "nzAfterChange"; }, ["carouselContents"], ["*"]>;
}
