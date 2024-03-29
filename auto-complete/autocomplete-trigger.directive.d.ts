import { Overlay } from '@angular/cdk/overlay';
import { AfterViewInit, ElementRef, ExistingProvider, OnDestroy, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NzSafeAny, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { NzInputGroupWhitSuffixOrPrefixDirective } from 'ng-zorro-antd/input';
import { NzAutocompleteOptionComponent } from './autocomplete-option.component';
import { NzAutocompleteComponent } from './autocomplete.component';
import * as i0 from "@angular/core";
export declare const NZ_AUTOCOMPLETE_VALUE_ACCESSOR: ExistingProvider;
export declare function getNzAutocompleteMissingPanelError(): Error;
export declare class NzAutocompleteTriggerDirective implements AfterViewInit, ControlValueAccessor, OnDestroy {
    private elementRef;
    private overlay;
    private viewContainerRef;
    private nzInputGroupWhitSuffixOrPrefixDirective;
    private document;
    /** Bind nzAutocomplete component */
    nzAutocomplete: NzAutocompleteComponent;
    onChange: OnChangeType;
    onTouched: OnTouchedType;
    panelOpen: boolean;
    /** Current active option */
    get activeOption(): NzAutocompleteOptionComponent | null;
    private destroy$;
    private overlayRef;
    private portal;
    private positionStrategy;
    private previousValue;
    private selectionChangeSubscription;
    private optionsChangeSubscription;
    private overlayOutsideClickSubscription;
    constructor(elementRef: ElementRef, overlay: Overlay, viewContainerRef: ViewContainerRef, nzInputGroupWhitSuffixOrPrefixDirective: NzInputGroupWhitSuffixOrPrefixDirective, document: NzSafeAny);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    writeValue(value: NzSafeAny): void;
    registerOnChange(fn: (value: {}) => {}): void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(isDisabled: boolean): void;
    openPanel(): void;
    closePanel(): void;
    handleKeydown(event: KeyboardEvent): void;
    handleInput(event: KeyboardEvent): void;
    handleFocus(): void;
    handleBlur(): void;
    /**
     * Subscription data source changes event
     */
    private subscribeOptionsChange;
    /**
     * Subscription option changes event and set the value
     */
    private subscribeSelectionChange;
    private subscribeOverlayOutsideClick;
    private attachOverlay;
    private updateStatus;
    private destroyPanel;
    private getOverlayConfig;
    private getConnectedElement;
    private getHostWidth;
    private getOverlayPosition;
    private resetActiveItem;
    private setValueAndClose;
    private setTriggerValue;
    private doBackfill;
    private canOpen;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzAutocompleteTriggerDirective, [null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzAutocompleteTriggerDirective, "input[nzAutocomplete], textarea[nzAutocomplete]", ["nzAutocompleteTrigger"], { "nzAutocomplete": "nzAutocomplete"; }, {}, never>;
}
