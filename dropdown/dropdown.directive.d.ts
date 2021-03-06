/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Overlay } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { BooleanInput, IndexableObject } from 'ng-zorro-antd/core/types';
import { NzDropdownMenuComponent, NzPlacementType } from './dropdown-menu.component';
export declare class NzDropDownDirective implements AfterViewInit, OnDestroy, OnChanges, OnInit {
    elementRef: ElementRef;
    private overlay;
    private renderer;
    private viewContainerRef;
    private platform;
    static ngAcceptInputType_nzBackdrop: BooleanInput;
    static ngAcceptInputType_nzHasBackdrop: BooleanInput;
    static ngAcceptInputType_nzClickHide: BooleanInput;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    static ngAcceptInputType_nzVisible: BooleanInput;
    private portal?;
    private overlayRef;
    private destroy$;
    private positionStrategy;
    private inputVisible$;
    private nzTrigger$;
    private overlayClose$;
    nzDropdownMenu: NzDropdownMenuComponent | null;
    nzTrigger: 'click' | 'hover';
    nzMatchWidthElement: ElementRef | null;
    /**
     * @deprecated Not supported, use `nzHasBackDrop` instead.
     * @breaking-change 12.0.0
     */
    nzBackdrop: boolean;
    nzHasBackdrop: boolean;
    nzClickHide: boolean;
    nzDisabled: boolean;
    nzVisible: boolean;
    nzOverlayClassName: string;
    nzOverlayStyle: IndexableObject;
    nzPlacement: NzPlacementType;
    readonly nzVisibleChange: EventEmitter<boolean>;
    setDropdownMenuValue<T extends keyof NzDropdownMenuComponent>(key: T, value: NzDropdownMenuComponent[T]): void;
    constructor(elementRef: ElementRef, overlay: Overlay, renderer: Renderer2, viewContainerRef: ViewContainerRef, platform: Platform);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
