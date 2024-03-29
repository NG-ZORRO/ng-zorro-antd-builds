/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnInit, Renderer2 } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzI18nService, NzModalI18nInterface } from 'ng-zorro-antd/i18n';
import { BaseModalContainerComponent } from './modal-container.directive';
import { ModalOptions } from './modal-types';
import * as i0 from "@angular/core";
export declare class NzModalConfirmContainerComponent extends BaseModalContainerComponent implements OnInit {
    private i18n;
    config: ModalOptions;
    portalOutlet: CdkPortalOutlet;
    modalElementRef: ElementRef<HTMLDivElement>;
    readonly cancelTriggered: EventEmitter<void>;
    readonly okTriggered: EventEmitter<void>;
    locale: NzModalI18nInterface;
    constructor(ngZone: NgZone, i18n: NzI18nService, host: ElementRef<HTMLElement>, focusTrapFactory: FocusTrapFactory, cdr: ChangeDetectorRef, render: Renderer2, overlayRef: OverlayRef, nzConfigService: NzConfigService, config: ModalOptions, document: NzSafeAny, animationType: string);
    ngOnInit(): void;
    onCancel(): void;
    onOk(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzModalConfirmContainerComponent, [null, null, null, null, null, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzModalConfirmContainerComponent, "nz-modal-confirm-container", ["nzModalConfirmContainer"], {}, { "cancelTriggered": "cancelTriggered"; "okTriggered": "okTriggered"; }, never, never>;
}
