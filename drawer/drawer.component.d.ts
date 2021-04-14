/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayKeyboardDispatcher, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, EventEmitter, Injector, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { BooleanInput, NgStyleInterface, NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDrawerOptionsOfComponent, NzDrawerPlacement } from './drawer-options';
import { NzDrawerRef } from './drawer-ref';
export declare const DRAWER_ANIMATE_DURATION = 300;
export declare class NzDrawerComponent<T = NzSafeAny, R = NzSafeAny, D = NzSafeAny> extends NzDrawerRef<T, R> implements OnInit, OnDestroy, AfterViewInit, OnChanges, AfterContentInit, NzDrawerOptionsOfComponent {
    private cdr;
    private document;
    nzConfigService: NzConfigService;
    private renderer;
    private overlay;
    private injector;
    private changeDetectorRef;
    private focusTrapFactory;
    private viewContainerRef;
    private overlayKeyboardDispatcher;
    private directionality;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzClosable: BooleanInput;
    static ngAcceptInputType_nzMaskClosable: BooleanInput;
    static ngAcceptInputType_nzMask: BooleanInput;
    static ngAcceptInputType_nzNoAnimation: BooleanInput;
    static ngAcceptInputType_nzKeyboard: BooleanInput;
    static ngAcceptInputType_nzCloseOnNavigation: BooleanInput;
    nzContent: TemplateRef<{
        $implicit: D;
        drawerRef: NzDrawerRef<R>;
    }> | Type<T>;
    nzCloseIcon: string | TemplateRef<void>;
    nzClosable: boolean;
    nzMaskClosable: boolean;
    nzMask: boolean;
    nzCloseOnNavigation: boolean;
    nzNoAnimation: boolean;
    nzKeyboard: boolean;
    nzTitle?: string | TemplateRef<{}>;
    nzFooter?: string | TemplateRef<{}>;
    nzPlacement: NzDrawerPlacement;
    nzMaskStyle: NgStyleInterface;
    nzBodyStyle: NgStyleInterface;
    nzWrapClassName?: string;
    nzWidth: number | string;
    nzHeight: number | string;
    nzZIndex: number;
    nzOffsetX: number;
    nzOffsetY: number;
    private componentInstance;
    set nzVisible(value: boolean);
    get nzVisible(): boolean;
    readonly nzOnViewInit: EventEmitter<void>;
    readonly nzOnClose: EventEmitter<MouseEvent>;
    readonly nzVisibleChange: EventEmitter<boolean>;
    drawerTemplate: TemplateRef<void>;
    bodyPortalOutlet?: CdkPortalOutlet;
    contentFromContentChild?: TemplateRef<NzSafeAny>;
    private destroy$;
    previouslyFocusedElement?: HTMLElement;
    placementChanging: boolean;
    placementChangeTimeoutId: number;
    nzContentParams?: D;
    overlayRef?: OverlayRef | null;
    portal?: TemplatePortal;
    focusTrap?: FocusTrap;
    isOpen: boolean;
    inAnimation: boolean;
    templateContext: {
        $implicit: D | undefined;
        drawerRef: NzDrawerRef<R>;
    };
    get offsetTransform(): string | null;
    get transform(): string | null;
    get width(): string | null;
    get height(): string | null;
    get isLeftOrRight(): boolean;
    nzAfterOpen: Subject<void>;
    nzAfterClose: Subject<R>;
    get afterOpen(): Observable<void>;
    get afterClose(): Observable<R>;
    isTemplateRef(value: {}): boolean;
    nzDirection?: Direction;
    dir: Direction;
    constructor(cdr: ChangeDetectorRef, document: NzSafeAny, nzConfigService: NzConfigService, renderer: Renderer2, overlay: Overlay, injector: Injector, changeDetectorRef: ChangeDetectorRef, focusTrapFactory: FocusTrapFactory, viewContainerRef: ViewContainerRef, overlayKeyboardDispatcher: OverlayKeyboardDispatcher, directionality: Directionality);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private getAnimationDuration;
    private triggerPlacementChangeCycleOnce;
    close(result?: R): void;
    open(): void;
    getContentComponent(): T | null;
    closeClick(): void;
    maskClick(): void;
    private attachBodyContent;
    private attachOverlay;
    private disposeOverlay;
    private getOverlayConfig;
    private updateOverlayStyle;
    private updateBodyOverflow;
    savePreviouslyFocusedElement(): void;
    private trapFocus;
    private restoreFocus;
}
