/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChange, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzFormatBeforeDropEvent, NzFormatEmitEvent, NzTreeBaseService, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzTreeNodeBuiltinComponent implements OnInit, OnChanges, OnDestroy {
    nzTreeService: NzTreeBaseService;
    private ngZone;
    private renderer;
    private elementRef;
    private cdr;
    noAnimation?: NzNoAnimationDirective | undefined;
    static ngAcceptInputType_nzShowLine: BooleanInput;
    static ngAcceptInputType_nzShowExpand: BooleanInput;
    static ngAcceptInputType_nzCheckable: BooleanInput;
    static ngAcceptInputType_nzAsyncData: BooleanInput;
    static ngAcceptInputType_nzHideUnMatched: BooleanInput;
    static ngAcceptInputType_nzNoAnimation: BooleanInput;
    static ngAcceptInputType_nzSelectMode: BooleanInput;
    static ngAcceptInputType_nzShowIcon: BooleanInput;
    /**
     * for global property
     */
    icon: string;
    title: string;
    isLoading: boolean;
    isSelected: boolean;
    isDisabled: boolean;
    isMatched: boolean;
    isExpanded: boolean;
    isLeaf: boolean;
    isChecked?: boolean;
    isHalfChecked?: boolean;
    isDisableCheckbox?: boolean;
    isSelectable?: boolean;
    canHide?: boolean;
    isStart: boolean[];
    isEnd: boolean[];
    nzTreeNode: NzTreeNode;
    nzShowLine?: boolean;
    nzShowExpand?: boolean;
    nzCheckable?: boolean;
    nzAsyncData?: boolean;
    nzHideUnMatched: boolean;
    nzNoAnimation: boolean;
    nzSelectMode: boolean;
    nzShowIcon: boolean;
    nzExpandedIcon?: TemplateRef<{
        $implicit: NzTreeNode;
        origin: NzTreeNodeOptions;
    }>;
    nzTreeTemplate: TemplateRef<{
        $implicit: NzTreeNode;
        origin: NzTreeNodeOptions;
    }> | null;
    nzBeforeDrop?: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;
    nzSearchValue: string;
    nzDraggable: boolean;
    readonly nzClick: EventEmitter<NzFormatEmitEvent>;
    readonly nzDblClick: EventEmitter<NzFormatEmitEvent>;
    readonly nzContextMenu: EventEmitter<NzFormatEmitEvent>;
    readonly nzCheckBoxChange: EventEmitter<NzFormatEmitEvent>;
    readonly nzExpandChange: EventEmitter<NzFormatEmitEvent>;
    readonly nzOnDragStart: EventEmitter<NzFormatEmitEvent>;
    readonly nzOnDragEnter: EventEmitter<NzFormatEmitEvent>;
    readonly nzOnDragOver: EventEmitter<NzFormatEmitEvent>;
    readonly nzOnDragLeave: EventEmitter<NzFormatEmitEvent>;
    readonly nzOnDrop: EventEmitter<NzFormatEmitEvent>;
    readonly nzOnDragEnd: EventEmitter<NzFormatEmitEvent>;
    /**
     * drag var
     */
    destroy$: Subject<unknown>;
    dragPos: number;
    dragPosClass: {
        [key: string]: string;
    };
    draggingKey: string | null;
    showIndicator: boolean;
    /**
     * default set
     */
    get displayStyle(): string;
    get isSwitcherOpen(): boolean;
    get isSwitcherClose(): boolean;
    /**
     * collapse node
     *
     * @param event
     */
    clickExpand(event: MouseEvent): void;
    clickSelect(event: MouseEvent): void;
    dblClick(event: MouseEvent): void;
    contextMenu(event: MouseEvent): void;
    /**
     * check node
     *
     * @param event
     */
    clickCheckBox(event: MouseEvent): void;
    clearDragClass(): void;
    /**
     * drag event
     *
     * @param e
     */
    handleDragStart(e: DragEvent): void;
    handleDragEnter(e: DragEvent): void;
    handleDragOver(e: DragEvent): void;
    handleDragLeave(e: DragEvent): void;
    handleDragDrop(e: DragEvent): void;
    handleDragEnd(e: DragEvent): void;
    /**
     * Listening to dragging events.
     */
    handDragEvent(): void;
    markForCheck(): void;
    constructor(nzTreeService: NzTreeBaseService, ngZone: NgZone, renderer: Renderer2, elementRef: ElementRef<HTMLElement>, cdr: ChangeDetectorRef, noAnimation?: NzNoAnimationDirective | undefined);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    private renderIndicator;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTreeNodeBuiltinComponent, [null, null, null, null, null, { optional: true; host: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTreeNodeBuiltinComponent, "nz-tree-node[builtin]", ["nzTreeBuiltinNode"], { "icon": "icon"; "title": "title"; "isLoading": "isLoading"; "isSelected": "isSelected"; "isDisabled": "isDisabled"; "isMatched": "isMatched"; "isExpanded": "isExpanded"; "isLeaf": "isLeaf"; "isChecked": "isChecked"; "isHalfChecked": "isHalfChecked"; "isDisableCheckbox": "isDisableCheckbox"; "isSelectable": "isSelectable"; "canHide": "canHide"; "isStart": "isStart"; "isEnd": "isEnd"; "nzTreeNode": "nzTreeNode"; "nzShowLine": "nzShowLine"; "nzShowExpand": "nzShowExpand"; "nzCheckable": "nzCheckable"; "nzAsyncData": "nzAsyncData"; "nzHideUnMatched": "nzHideUnMatched"; "nzNoAnimation": "nzNoAnimation"; "nzSelectMode": "nzSelectMode"; "nzShowIcon": "nzShowIcon"; "nzExpandedIcon": "nzExpandedIcon"; "nzTreeTemplate": "nzTreeTemplate"; "nzBeforeDrop": "nzBeforeDrop"; "nzSearchValue": "nzSearchValue"; "nzDraggable": "nzDraggable"; }, { "nzClick": "nzClick"; "nzDblClick": "nzDblClick"; "nzContextMenu": "nzContextMenu"; "nzCheckBoxChange": "nzCheckBoxChange"; "nzExpandChange": "nzExpandChange"; "nzOnDragStart": "nzOnDragStart"; "nzOnDragEnter": "nzOnDragEnter"; "nzOnDragOver": "nzOnDragOver"; "nzOnDragLeave": "nzOnDragLeave"; "nzOnDrop": "nzOnDrop"; "nzOnDragEnd": "nzOnDragEnd"; }, never, never>;
}
