/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directionality } from '@angular/cdk/bidi';
import { ViewportRuler } from '@angular/cdk/overlay';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { NzResizeObserver } from 'ng-zorro-antd/core/resize-observers';
import { NumberInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTabPositionMode, NzTabScrollEvent, NzTabScrollListOffsetEvent } from './interfaces';
import { NzTabAddButtonComponent } from './tab-add-button.component';
import { NzTabNavItemDirective } from './tab-nav-item.directive';
import { NzTabNavOperationComponent } from './tab-nav-operation.component';
import { NzTabsInkBarDirective } from './tabs-ink-bar.directive';
export declare class NzTabNavBarComponent implements OnInit, AfterViewInit, AfterContentChecked, OnDestroy, OnChanges {
    private cdr;
    private ngZone;
    private viewportRuler;
    private nzResizeObserver;
    private dir;
    static ngAcceptInputType_selectedIndex: NumberInput;
    readonly indexFocused: EventEmitter<number>;
    readonly selectFocusedIndex: EventEmitter<number>;
    readonly addClicked: EventEmitter<void>;
    readonly tabScroll: EventEmitter<NzTabScrollEvent>;
    position: NzTabPositionMode;
    addable: boolean;
    hideBar: boolean;
    addIcon: string | TemplateRef<NzSafeAny>;
    inkBarAnimated: boolean;
    extraTemplate?: TemplateRef<void>;
    get selectedIndex(): number;
    set selectedIndex(value: number);
    navWarpRef: ElementRef<HTMLElement>;
    navListRef: ElementRef<HTMLElement>;
    operationRef: NzTabNavOperationComponent;
    addBtnRef: NzTabAddButtonComponent;
    inkBar: NzTabsInkBarDirective;
    items: QueryList<NzTabNavItemDirective>;
    /** Tracks which element has focus; used for keyboard navigation */
    get focusIndex(): number;
    /** When the focus index is set, we must manually send focus to the correct label */
    set focusIndex(value: number);
    get showAddButton(): boolean;
    translate: null | string;
    transformX: number;
    transformY: number;
    pingLeft: boolean;
    pingRight: boolean;
    pingTop: boolean;
    pingBottom: boolean;
    hiddenItems: NzTabNavItemDirective[];
    private keyManager;
    private destroy$;
    private _selectedIndex;
    private wrapperWidth;
    private wrapperHeight;
    private scrollListWidth;
    private scrollListHeight;
    private operationWidth;
    private operationHeight;
    private addButtonWidth;
    private addButtonHeight;
    private selectedIndexChanged;
    private lockAnimationTimeoutId;
    private cssTransformTimeWaitingId;
    constructor(cdr: ChangeDetectorRef, ngZone: NgZone, viewportRuler: ViewportRuler, nzResizeObserver: NzResizeObserver, dir: Directionality);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    onSelectedFromMenu(tab: NzTabNavItemDirective): void;
    onOffsetChange(e: NzTabScrollListOffsetEvent): void;
    handleKeydown(event: KeyboardEvent): void;
    private isValidIndex;
    private scrollToTab;
    private lockAnimation;
    private setTransform;
    private clampTransformX;
    private clampTransformY;
    private updateScrollListPosition;
    private resetSizes;
    private alignInkBarToSelectedTab;
    private setPingStatus;
    private setVisibleRange;
    private getLayoutDirection;
    private setTabFocus;
    ngOnChanges(changes: SimpleChanges): void;
}
