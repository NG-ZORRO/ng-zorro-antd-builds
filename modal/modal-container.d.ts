/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AnimationEvent } from '@angular/animations';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import { OverlayRef } from '@angular/cdk/overlay';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, ElementRef, EmbeddedViewRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
import { NzModalRef } from './modal-ref';
import { ModalOptions } from './modal-types';
export declare function throwNzModalContentAlreadyAttachedError(): never;
export declare class BaseModalContainerComponent extends BasePortalOutlet implements OnDestroy {
    protected elementRef: ElementRef;
    protected focusTrapFactory: FocusTrapFactory;
    cdr: ChangeDetectorRef;
    protected render: Renderer2;
    protected overlayRef: OverlayRef;
    protected nzConfigService: NzConfigService;
    config: ModalOptions;
    protected animationType?: string | undefined;
    portalOutlet: CdkPortalOutlet;
    modalElementRef: ElementRef<HTMLDivElement>;
    animationStateChanged: EventEmitter<AnimationEvent>;
    containerClick: EventEmitter<void>;
    cancelTriggered: EventEmitter<void>;
    okTriggered: EventEmitter<void>;
    state: 'void' | 'enter' | 'exit';
    document: Document;
    modalRef: NzModalRef;
    isStringContent: boolean;
    dir: Direction;
    private elementFocusedBeforeModalWasOpened;
    private focusTrap;
    private mouseDown;
    private oldMaskStyle;
    protected destroy$: Subject<unknown>;
    get showMask(): boolean;
    get maskClosable(): boolean;
    constructor(elementRef: ElementRef, focusTrapFactory: FocusTrapFactory, cdr: ChangeDetectorRef, render: Renderer2, overlayRef: OverlayRef, nzConfigService: NzConfigService, config: ModalOptions, document?: NzSafeAny, animationType?: string | undefined);
    onContainerClick(e: MouseEvent): void;
    onMousedown(): void;
    onMouseup(): void;
    onCloseClick(): void;
    onOkClick(): void;
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
    attachStringContent(): void;
    getNativeElement(): HTMLElement;
    private animationDisabled;
    private setModalTransformOrigin;
    private savePreviouslyFocusedElement;
    private trapFocus;
    private restoreFocus;
    private setEnterAnimationClass;
    private setExitAnimationClass;
    private setMaskExitAnimationClass;
    private cleanAnimationClass;
    bindBackdropStyle(): void;
    updateMaskClassname(): void;
    onAnimationDone(event: AnimationEvent): void;
    onAnimationStart(event: AnimationEvent): void;
    startExitAnimation(): void;
    ngOnDestroy(): void;
}
