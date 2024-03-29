import { Overlay } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMentionTriggerDirective } from './mention-trigger';
import { NzMentionService } from './mention.service';
import * as i0 from "@angular/core";
export interface MentionOnSearchTypes {
    value: string;
    prefix: string;
}
export interface Mention {
    startPos: number;
    endPos: number;
    mention: string;
}
export declare type MentionPlacement = 'top' | 'bottom';
export declare class NzMentionComponent implements OnDestroy, OnInit, AfterViewInit, OnChanges {
    private ngZone;
    private ngDocument;
    private cdr;
    private overlay;
    private viewContainerRef;
    private nzMentionService;
    static ngAcceptInputType_nzLoading: BooleanInput;
    nzValueWith: (value: NzSafeAny) => string;
    nzPrefix: string | string[];
    nzLoading: boolean;
    nzNotFoundContent: string;
    nzPlacement: MentionPlacement;
    nzSuggestions: NzSafeAny[];
    readonly nzOnSelect: EventEmitter<NzSafeAny>;
    readonly nzOnSearchChange: EventEmitter<MentionOnSearchTypes>;
    trigger: NzMentionTriggerDirective;
    suggestionsTemp?: TemplateRef<void>;
    items: QueryList<ElementRef>;
    set suggestionChild(value: TemplateRef<{
        $implicit: NzSafeAny;
    }>);
    isOpen: boolean;
    filteredSuggestions: string[];
    suggestionTemplate: TemplateRef<{
        $implicit: NzSafeAny;
    }> | null;
    activeIndex: number;
    private previousValue;
    private cursorMention;
    private cursorMentionStart?;
    private cursorMentionEnd?;
    private overlayRef;
    private portal?;
    private positionStrategy;
    private overlayOutsideClickSubscription;
    private get triggerNativeElement();
    private get focusItemElement();
    constructor(ngZone: NgZone, ngDocument: NzSafeAny, cdr: ChangeDetectorRef, overlay: Overlay, viewContainerRef: ViewContainerRef, nzMentionService: NzMentionService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    closeDropdown(): void;
    openDropdown(): void;
    getMentions(): string[];
    selectSuggestion(suggestion: string | {}): void;
    private handleInput;
    private handleKeydown;
    private handleClick;
    private bindTriggerEvents;
    private suggestionsFilter;
    private resetDropdown;
    private setNextItemActive;
    private setPreviousItemActive;
    private scrollToFocusItem;
    private canOpen;
    private resetCursorMention;
    private updatePositions;
    private subscribeOverlayOutsideClick;
    private attachOverlay;
    private getOverlayConfig;
    private getOverlayPosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzMentionComponent, [null, { optional: true; }, null, null, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzMentionComponent, "nz-mention", ["nzMention"], { "nzValueWith": "nzValueWith"; "nzPrefix": "nzPrefix"; "nzLoading": "nzLoading"; "nzNotFoundContent": "nzNotFoundContent"; "nzPlacement": "nzPlacement"; "nzSuggestions": "nzSuggestions"; }, { "nzOnSelect": "nzOnSelect"; "nzOnSearchChange": "nzOnSearchChange"; }, ["suggestionChild"], ["*"]>;
}
