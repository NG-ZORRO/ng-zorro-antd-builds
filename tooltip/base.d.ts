/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectorRef, ComponentFactory, ComponentFactoryResolver, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzConfigService, PopConfirmConfig, PopoverConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { BooleanInput, NgClassInterface, NgStyleInterface, NzTSType } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
export interface PropertyMapping {
    [key: string]: [string, () => unknown];
}
export declare type NzTooltipTrigger = 'click' | 'focus' | 'hover' | null;
export declare abstract class NzTooltipBaseDirective implements OnChanges, OnDestroy, AfterViewInit {
    elementRef: ElementRef;
    protected hostView: ViewContainerRef;
    protected resolver: ComponentFactoryResolver;
    protected renderer: Renderer2;
    protected noAnimation?: NzNoAnimationDirective | undefined;
    protected nzConfigService?: NzConfigService | undefined;
    config?: Required<PopoverConfig | PopConfirmConfig>;
    directiveTitle?: NzTSType | null;
    directiveContent?: NzTSType | null;
    title?: NzTSType | null;
    content?: NzTSType | null;
    trigger?: NzTooltipTrigger;
    placement?: string | string[];
    origin?: ElementRef<HTMLElement>;
    visible?: boolean;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    overlayClassName?: string;
    overlayStyle?: NgStyleInterface;
    visibleChange: EventEmitter<boolean>;
    /**
     * For create tooltip dynamically. This should be override for each different component.
     */
    protected componentFactory: ComponentFactory<NzTooltipBaseComponent>;
    /**
     * This true title that would be used in other parts on this component.
     */
    protected get _title(): NzTSType | null;
    protected get _content(): NzTSType | null;
    protected get _trigger(): NzTooltipTrigger;
    protected get _placement(): string[];
    protected get _visible(): boolean;
    protected get _mouseEnterDelay(): number;
    protected get _mouseLeaveDelay(): number;
    protected get _overlayClassName(): string | null;
    protected get _overlayStyle(): NgStyleInterface | null;
    private internalVisible;
    protected getProxyPropertyMap(): PropertyMapping;
    component?: NzTooltipBaseComponent;
    protected readonly destroy$: Subject<void>;
    protected readonly triggerDisposables: Array<() => void>;
    private delayTimer?;
    constructor(elementRef: ElementRef, hostView: ViewContainerRef, resolver: ComponentFactoryResolver, renderer: Renderer2, noAnimation?: NzNoAnimationDirective | undefined, nzConfigService?: NzConfigService | undefined);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    show(): void;
    hide(): void;
    /**
     * Force the component to update its position.
     */
    updatePosition(): void;
    /**
     * Create a dynamic tooltip component. This method can be override.
     */
    protected createComponent(): void;
    protected registerTriggers(): void;
    private updatePropertiesByChanges;
    private updatePropertiesByKeys;
    private initProperties;
    private updateComponentValue;
    private delayEnterLeave;
    private removeTriggerListeners;
    private clearTogglingTimer;
}
export declare abstract class NzTooltipBaseComponent implements OnDestroy, OnInit {
    cdr: ChangeDetectorRef;
    private directionality;
    noAnimation?: NzNoAnimationDirective | undefined;
    static ngAcceptInputType_nzVisible: BooleanInput;
    overlay: CdkConnectedOverlay;
    nzTitle: NzTSType | null;
    nzContent: NzTSType | null;
    nzOverlayClassName: string;
    nzOverlayStyle: NgStyleInterface;
    nzBackdrop: boolean;
    nzMouseEnterDelay?: number;
    nzMouseLeaveDelay?: number;
    nzVisibleChange: Subject<boolean>;
    set nzVisible(value: boolean);
    get nzVisible(): boolean;
    _visible: boolean;
    set nzTrigger(value: NzTooltipTrigger);
    get nzTrigger(): NzTooltipTrigger;
    protected _trigger: NzTooltipTrigger;
    set nzPlacement(value: string[]);
    preferredPlacement: string;
    origin: CdkOverlayOrigin;
    dir: Direction;
    _classMap: NgClassInterface;
    _prefix: string;
    _positions: ConnectionPositionPair[];
    private destroy$;
    constructor(cdr: ChangeDetectorRef, directionality: Directionality, noAnimation?: NzNoAnimationDirective | undefined);
    ngOnInit(): void;
    ngOnDestroy(): void;
    show(): void;
    hide(): void;
    updateByDirective(): void;
    /**
     * Force the component to update its position.
     */
    updatePosition(): void;
    onPositionChange(position: ConnectedOverlayPositionChange): void;
    updateStyles(): void;
    setOverlayOrigin(origin: CdkOverlayOrigin): void;
    onClickOutside(event: MouseEvent): void;
    /**
     * Hide the component while the content is empty.
     */
    private updateVisibilityByTitle;
    /**
     * Empty component cannot be opened.
     */
    protected abstract isEmpty(): boolean;
}
export declare function isTooltipEmpty(value: string | TemplateRef<void> | null): boolean;
