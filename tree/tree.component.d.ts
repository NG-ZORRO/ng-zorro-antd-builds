/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzFormatBeforeDropEvent, NzFormatEmitEvent, NzTreeBase, NzTreeBaseService, NzTreeNode, NzTreeNodeKey, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTreeService } from './tree.service';
import * as i0 from "@angular/core";
export declare function NzTreeServiceFactory(higherOrderService: NzTreeBaseService, treeService: NzTreeService): NzTreeBaseService;
export declare class NzTreeComponent extends NzTreeBase implements OnInit, OnDestroy, ControlValueAccessor, OnChanges, AfterViewInit {
    nzConfigService: NzConfigService;
    private cdr;
    private directionality;
    noAnimation?: NzNoAnimationDirective | undefined;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzShowIcon: BooleanInput;
    static ngAcceptInputType_nzHideUnMatched: BooleanInput;
    static ngAcceptInputType_nzBlockNode: BooleanInput;
    static ngAcceptInputType_nzExpandAll: BooleanInput;
    static ngAcceptInputType_nzSelectMode: BooleanInput;
    static ngAcceptInputType_nzCheckStrictly: BooleanInput;
    static ngAcceptInputType_nzShowExpand: BooleanInput;
    static ngAcceptInputType_nzShowLine: BooleanInput;
    static ngAcceptInputType_nzCheckable: BooleanInput;
    static ngAcceptInputType_nzAsyncData: BooleanInput;
    static ngAcceptInputType_nzDraggable: BooleanInput;
    static ngAcceptInputType_nzMultiple: BooleanInput;
    nzShowIcon: boolean;
    nzHideUnMatched: boolean;
    nzBlockNode: boolean;
    nzExpandAll: boolean;
    nzSelectMode: boolean;
    nzCheckStrictly: boolean;
    nzShowExpand: boolean;
    nzShowLine: boolean;
    nzCheckable: boolean;
    nzAsyncData: boolean;
    nzDraggable: boolean;
    nzMultiple: boolean;
    nzExpandedIcon?: TemplateRef<{
        $implicit: NzTreeNode;
        origin: NzTreeNodeOptions;
    }>;
    nzVirtualItemSize: number;
    nzVirtualMaxBufferPx: number;
    nzVirtualMinBufferPx: number;
    nzVirtualHeight: string | null;
    nzTreeTemplate?: TemplateRef<{
        $implicit: NzTreeNode;
        origin: NzTreeNodeOptions;
    }>;
    nzBeforeDrop?: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;
    nzData: NzTreeNodeOptions[] | NzTreeNode[];
    nzExpandedKeys: NzTreeNodeKey[];
    nzSelectedKeys: NzTreeNodeKey[];
    nzCheckedKeys: NzTreeNodeKey[];
    nzSearchValue: string;
    nzSearchFunc?: (node: NzTreeNodeOptions) => boolean;
    nzTreeTemplateChild: TemplateRef<{
        $implicit: NzTreeNode;
        origin: NzTreeNodeOptions;
    }>;
    cdkVirtualScrollViewport: CdkVirtualScrollViewport;
    nzFlattenNodes: NzTreeNode[];
    beforeInit: boolean;
    dir: Direction;
    readonly nzExpandedKeysChange: EventEmitter<string[]>;
    readonly nzSelectedKeysChange: EventEmitter<string[]>;
    readonly nzCheckedKeysChange: EventEmitter<string[]>;
    readonly nzSearchValueChange: EventEmitter<NzFormatEmitEvent>;
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
    HIDDEN_STYLE: {
        width: number;
        height: number;
        display: string;
        overflow: string;
        opacity: number;
        border: number;
        padding: number;
        margin: number;
    };
    HIDDEN_NODE_STYLE: {
        position: string;
        pointerEvents: string;
        visibility: string;
        height: number;
        overflow: string;
    };
    destroy$: Subject<unknown>;
    onChange: (value: NzTreeNode[]) => void;
    onTouched: () => void;
    writeValue(value: NzTreeNode[]): void;
    registerOnChange(fn: (_: NzTreeNode[]) => void): void;
    registerOnTouched(fn: () => void): void;
    /**
     * Render all properties of nzTree
     *
     * @param changes: all changes from @Input
     */
    renderTreeProperties(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    trackByFlattenNode(_: number, node: NzTreeNode): string;
    /**
     * nzData
     *
     * @param value
     */
    handleNzData(value: NzSafeAny[]): void;
    handleFlattenNodes(data: NzTreeNode[], expandKeys?: NzTreeNodeKey[] | true): void;
    handleCheckedKeys(keys: NzTreeNodeKey[] | null): void;
    handleExpandedKeys(keys?: NzTreeNodeKey[] | true): void;
    handleSelectedKeys(keys: NzTreeNodeKey[], isMulti: boolean): void;
    handleSearchValue(value: string, searchFunc?: (node: NzTreeNodeOptions) => boolean): void;
    /**
     * Handle emit event
     *
     * @param event
     * handle each event
     */
    eventTriggerChanged(event: NzFormatEmitEvent): void;
    /**
     * Click expand icon
     */
    renderTree(): void;
    constructor(nzTreeService: NzTreeBaseService, nzConfigService: NzConfigService, cdr: ChangeDetectorRef, directionality: Directionality, noAnimation?: NzNoAnimationDirective | undefined);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTreeComponent, [null, null, null, { optional: true; }, { optional: true; host: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTreeComponent, "nz-tree", ["nzTree"], { "nzShowIcon": "nzShowIcon"; "nzHideUnMatched": "nzHideUnMatched"; "nzBlockNode": "nzBlockNode"; "nzExpandAll": "nzExpandAll"; "nzSelectMode": "nzSelectMode"; "nzCheckStrictly": "nzCheckStrictly"; "nzShowExpand": "nzShowExpand"; "nzShowLine": "nzShowLine"; "nzCheckable": "nzCheckable"; "nzAsyncData": "nzAsyncData"; "nzDraggable": "nzDraggable"; "nzMultiple": "nzMultiple"; "nzExpandedIcon": "nzExpandedIcon"; "nzVirtualItemSize": "nzVirtualItemSize"; "nzVirtualMaxBufferPx": "nzVirtualMaxBufferPx"; "nzVirtualMinBufferPx": "nzVirtualMinBufferPx"; "nzVirtualHeight": "nzVirtualHeight"; "nzTreeTemplate": "nzTreeTemplate"; "nzBeforeDrop": "nzBeforeDrop"; "nzData": "nzData"; "nzExpandedKeys": "nzExpandedKeys"; "nzSelectedKeys": "nzSelectedKeys"; "nzCheckedKeys": "nzCheckedKeys"; "nzSearchValue": "nzSearchValue"; "nzSearchFunc": "nzSearchFunc"; }, { "nzExpandedKeysChange": "nzExpandedKeysChange"; "nzSelectedKeysChange": "nzSelectedKeysChange"; "nzCheckedKeysChange": "nzCheckedKeysChange"; "nzSearchValueChange": "nzSearchValueChange"; "nzClick": "nzClick"; "nzDblClick": "nzDblClick"; "nzContextMenu": "nzContextMenu"; "nzCheckBoxChange": "nzCheckBoxChange"; "nzExpandChange": "nzExpandChange"; "nzOnDragStart": "nzOnDragStart"; "nzOnDragEnter": "nzOnDragEnter"; "nzOnDragOver": "nzOnDragOver"; "nzOnDragLeave": "nzOnDragLeave"; "nzOnDrop": "nzOnDrop"; "nzOnDragEnd": "nzOnDragEnd"; }, ["nzTreeTemplateChild"], never>;
}
