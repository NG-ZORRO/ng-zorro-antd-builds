/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { ChangeDetectorRef, ElementRef, EventEmitter, Injector, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzFormatEmitEvent, NzTreeBase, NzTreeBaseService, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { BooleanInput, NgStyleInterface, NzSizeLDSType, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { NzSelectSearchComponent } from 'ng-zorro-antd/select';
import { NzTreeComponent } from 'ng-zorro-antd/tree';
import { Subscription } from 'rxjs';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { NzTreeSelectService } from './tree-select.service';
export declare function higherOrderServiceFactory(injector: Injector): NzTreeBaseService;
export declare class NzTreeSelectComponent extends NzTreeBase implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    nzConfigService: NzConfigService;
    private renderer;
    private cdr;
    private elementRef;
    private directionality;
    private focusMonitor;
    noAnimation?: NzNoAnimationDirective | undefined;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzAllowClear: BooleanInput;
    static ngAcceptInputType_nzShowExpand: BooleanInput;
    static ngAcceptInputType_nzShowLine: BooleanInput;
    static ngAcceptInputType_nzDropdownMatchSelectWidth: BooleanInput;
    static ngAcceptInputType_nzCheckable: BooleanInput;
    static ngAcceptInputType_nzHideUnMatched: BooleanInput;
    static ngAcceptInputType_nzShowIcon: BooleanInput;
    static ngAcceptInputType_nzShowSearch: BooleanInput;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    static ngAcceptInputType_nzAsyncData: BooleanInput;
    static ngAcceptInputType_nzMultiple: BooleanInput;
    static ngAcceptInputType_nzDefaultExpandAll: BooleanInput;
    static ngAcceptInputType_nzCheckStrictly: BooleanInput;
    nzAllowClear: boolean;
    nzShowExpand: boolean;
    nzShowLine: boolean;
    nzDropdownMatchSelectWidth: boolean;
    nzCheckable: boolean;
    nzHideUnMatched: boolean;
    nzShowIcon: boolean;
    nzShowSearch: boolean;
    nzDisabled: boolean;
    nzAsyncData: boolean;
    nzMultiple: boolean;
    nzDefaultExpandAll: boolean;
    nzCheckStrictly: boolean;
    nzVirtualItemSize: number;
    nzVirtualMaxBufferPx: number;
    nzVirtualMinBufferPx: number;
    nzVirtualHeight: string | null;
    nzExpandedIcon?: TemplateRef<{
        $implicit: NzTreeNode;
        origin: NzTreeNodeOptions;
    }>;
    nzNotFoundContent?: string;
    nzNodes: Array<NzTreeNode | NzTreeNodeOptions>;
    nzOpen: boolean;
    nzSize: NzSizeLDSType;
    nzPlaceHolder: string;
    nzDropdownStyle: NgStyleInterface | null;
    nzDropdownClassName?: string;
    set nzExpandedKeys(value: string[]);
    get nzExpandedKeys(): string[];
    nzDisplayWith: (node: NzTreeNode) => string | undefined;
    nzMaxTagCount: number;
    nzMaxTagPlaceholder: TemplateRef<{
        $implicit: NzTreeNode[];
    }> | null;
    readonly nzOpenChange: EventEmitter<boolean>;
    readonly nzCleared: EventEmitter<void>;
    readonly nzRemoved: EventEmitter<NzTreeNode>;
    readonly nzExpandChange: EventEmitter<NzFormatEmitEvent>;
    readonly nzTreeClick: EventEmitter<NzFormatEmitEvent>;
    readonly nzTreeCheckBoxChange: EventEmitter<NzFormatEmitEvent>;
    nzSelectSearchComponent: NzSelectSearchComponent;
    treeRef: NzTreeComponent;
    cdkOverlayOrigin: CdkOverlayOrigin;
    cdkConnectedOverlay: CdkConnectedOverlay;
    nzTreeTemplate: TemplateRef<{
        $implicit: NzTreeNode;
        origin: NzTreeNodeOptions;
    }>;
    nzTreeTemplateChild: TemplateRef<{
        $implicit: NzTreeNode;
        origin: NzTreeNodeOptions;
    }>;
    get treeTemplate(): TemplateRef<{
        $implicit: NzTreeNode;
        origin: NzTreeNodeOptions;
    }>;
    dropdownClassName: string;
    triggerWidth?: number;
    isComposing: boolean;
    isDestroy: boolean;
    isNotFound: boolean;
    focused: boolean;
    inputValue: string;
    dropDownPosition: 'top' | 'center' | 'bottom';
    selectionChangeSubscription: Subscription;
    focusChangeSubscription: Subscription;
    selectedNodes: NzTreeNode[];
    expandedKeys: string[];
    value: string[];
    dir: Direction;
    private destroy$;
    onChange: OnChangeType;
    onTouched: OnTouchedType;
    get placeHolderDisplay(): string;
    get isMultiple(): boolean;
    constructor(nzTreeService: NzTreeSelectService, nzConfigService: NzConfigService, renderer: Renderer2, cdr: ChangeDetectorRef, elementRef: ElementRef, directionality: Directionality, focusMonitor: FocusMonitor, noAnimation?: NzNoAnimationDirective | undefined);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isComposingChange(isComposing: boolean): void;
    setDisabledState(isDisabled: boolean): void;
    ngOnChanges(changes: SimpleChanges): void;
    writeValue(value: string[] | string): void;
    registerOnChange(fn: (_: string[] | string | null) => void): void;
    registerOnTouched(fn: () => void): void;
    onKeydown(event: KeyboardEvent): void;
    trigger(): void;
    openDropdown(): void;
    closeDropDown(): void;
    onKeyDownInput(e: KeyboardEvent): void;
    onExpandedKeysChange(value: NzFormatEmitEvent): void;
    setInputValue(value: string): void;
    removeSelected(node: NzTreeNode, emit?: boolean): void;
    focusOnInput(): void;
    subscribeSelectionChange(): Subscription;
    updateSelectedNodes(init?: boolean): void;
    updatePosition(): void;
    onPositionChange(position: ConnectedOverlayPositionChange): void;
    onClearSelection(): void;
    onClickOutside(event: MouseEvent): void;
    setSearchValues($event: NzFormatEmitEvent): void;
    updateCdkConnectedOverlayStatus(): void;
    trackValue(_index: number, option: NzTreeNode): string;
}
