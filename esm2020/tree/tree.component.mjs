import { __decorate } from "tslib";
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, forwardRef, Host, Input, Optional, Output, SkipSelf, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { treeCollapseMotion } from 'ng-zorro-antd/core/animation';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { flattenTreeData, NzTreeBase, NzTreeBaseService, NzTreeHigherOrderServiceToken } from 'ng-zorro-antd/core/tree';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzTreeService } from './tree.service';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/tree";
import * as i2 from "ng-zorro-antd/core/config";
import * as i3 from "@angular/cdk/bidi";
import * as i4 from "ng-zorro-antd/core/no-animation";
import * as i5 from "@angular/cdk/scrolling";
import * as i6 from "./tree-node.component";
import * as i7 from "@angular/common";
export function NzTreeServiceFactory(higherOrderService, treeService) {
    return higherOrderService ? higherOrderService : treeService;
}
const NZ_CONFIG_MODULE_NAME = 'tree';
export class NzTreeComponent extends NzTreeBase {
    // Handle emit event end
    constructor(nzTreeService, nzConfigService, cdr, directionality, noAnimation) {
        super(nzTreeService);
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.directionality = directionality;
        this.noAnimation = noAnimation;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzShowIcon = false;
        this.nzHideUnMatched = false;
        this.nzBlockNode = false;
        this.nzExpandAll = false;
        this.nzSelectMode = false;
        this.nzCheckStrictly = false;
        this.nzShowExpand = true;
        this.nzShowLine = false;
        this.nzCheckable = false;
        this.nzAsyncData = false;
        this.nzDraggable = false;
        this.nzMultiple = false;
        this.nzVirtualItemSize = 28;
        this.nzVirtualMaxBufferPx = 500;
        this.nzVirtualMinBufferPx = 28;
        this.nzVirtualHeight = null;
        this.nzData = [];
        this.nzExpandedKeys = [];
        this.nzSelectedKeys = [];
        this.nzCheckedKeys = [];
        this.nzSearchValue = '';
        this.nzFlattenNodes = [];
        this.beforeInit = true;
        this.dir = 'ltr';
        this.nzExpandedKeysChange = new EventEmitter();
        this.nzSelectedKeysChange = new EventEmitter();
        this.nzCheckedKeysChange = new EventEmitter();
        this.nzSearchValueChange = new EventEmitter();
        this.nzClick = new EventEmitter();
        this.nzDblClick = new EventEmitter();
        this.nzContextMenu = new EventEmitter();
        this.nzCheckBoxChange = new EventEmitter();
        this.nzExpandChange = new EventEmitter();
        this.nzOnDragStart = new EventEmitter();
        this.nzOnDragEnter = new EventEmitter();
        this.nzOnDragOver = new EventEmitter();
        this.nzOnDragLeave = new EventEmitter();
        this.nzOnDrop = new EventEmitter();
        this.nzOnDragEnd = new EventEmitter();
        this.HIDDEN_STYLE = {
            width: 0,
            height: 0,
            display: 'flex',
            overflow: 'hidden',
            opacity: 0,
            border: 0,
            padding: 0,
            margin: 0
        };
        this.HIDDEN_NODE_STYLE = {
            position: 'absolute',
            pointerEvents: 'none',
            visibility: 'hidden',
            height: 0,
            overflow: 'hidden'
        };
        this.destroy$ = new Subject();
        this.onChange = () => null;
        this.onTouched = () => null;
    }
    writeValue(value) {
        this.handleNzData(value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Render all properties of nzTree
     *
     * @param changes: all changes from @Input
     */
    renderTreeProperties(changes) {
        let useDefaultExpandedKeys = false;
        let expandAll = false;
        const { nzData, nzExpandedKeys, nzSelectedKeys, nzCheckedKeys, nzCheckStrictly, nzExpandAll, nzMultiple, nzSearchValue } = changes;
        if (nzExpandAll) {
            useDefaultExpandedKeys = true;
            expandAll = this.nzExpandAll;
        }
        if (nzMultiple) {
            this.nzTreeService.isMultiple = this.nzMultiple;
        }
        if (nzCheckStrictly) {
            this.nzTreeService.isCheckStrictly = this.nzCheckStrictly;
        }
        if (nzData) {
            this.handleNzData(this.nzData);
        }
        if (nzCheckedKeys) {
            this.handleCheckedKeys(this.nzCheckedKeys);
        }
        if (nzCheckStrictly) {
            this.handleCheckedKeys(null);
        }
        if (nzExpandedKeys || nzExpandAll) {
            useDefaultExpandedKeys = true;
            this.handleExpandedKeys(expandAll || this.nzExpandedKeys);
        }
        if (nzSelectedKeys) {
            this.handleSelectedKeys(this.nzSelectedKeys, this.nzMultiple);
        }
        if (nzSearchValue) {
            if (!(nzSearchValue.firstChange && !this.nzSearchValue)) {
                useDefaultExpandedKeys = false;
                this.handleSearchValue(nzSearchValue.currentValue, this.nzSearchFunc);
                this.nzSearchValueChange.emit(this.nzTreeService.formatEvent('search', null, null));
            }
        }
        // flatten data
        const currentExpandedKeys = this.getExpandedNodeList().map(v => v.key);
        const newExpandedKeys = useDefaultExpandedKeys ? expandAll || this.nzExpandedKeys : currentExpandedKeys;
        this.handleFlattenNodes(this.nzTreeService.rootNodes, newExpandedKeys);
    }
    trackByFlattenNode(_, node) {
        return node.key;
    }
    // Deal with properties
    /**
     * nzData
     *
     * @param value
     */
    handleNzData(value) {
        if (Array.isArray(value)) {
            const data = this.coerceTreeNodes(value);
            this.nzTreeService.initTree(data);
        }
    }
    handleFlattenNodes(data, expandKeys = []) {
        this.nzTreeService.flattenTreeData(data, expandKeys);
    }
    handleCheckedKeys(keys) {
        this.nzTreeService.conductCheck(keys, this.nzCheckStrictly);
    }
    handleExpandedKeys(keys = []) {
        this.nzTreeService.conductExpandedKeys(keys);
    }
    handleSelectedKeys(keys, isMulti) {
        this.nzTreeService.conductSelectedKeys(keys, isMulti);
    }
    handleSearchValue(value, searchFunc) {
        const dataList = flattenTreeData(this.nzTreeService.rootNodes, true).map(v => v.data);
        const checkIfMatched = (node) => {
            if (searchFunc) {
                return searchFunc(node.origin);
            }
            return !value || !node.title.toLowerCase().includes(value.toLowerCase()) ? false : true;
        };
        dataList.forEach(v => {
            v.isMatched = checkIfMatched(v);
            v.canHide = !v.isMatched;
            if (!v.isMatched) {
                v.setExpanded(false);
                this.nzTreeService.setExpandedNodeList(v);
            }
            else {
                // expand
                this.nzTreeService.expandNodeAllParentBySearch(v);
            }
            this.nzTreeService.setMatchedNodeList(v);
        });
    }
    /**
     * Handle emit event
     *
     * @param event
     * handle each event
     */
    eventTriggerChanged(event) {
        const node = event.node;
        switch (event.eventName) {
            case 'expand':
                this.renderTree();
                this.nzExpandChange.emit(event);
                break;
            case 'click':
                this.nzClick.emit(event);
                break;
            case 'dblclick':
                this.nzDblClick.emit(event);
                break;
            case 'contextmenu':
                this.nzContextMenu.emit(event);
                break;
            case 'check':
                // Render checked state with nodes' property `isChecked`
                this.nzTreeService.setCheckedNodeList(node);
                if (!this.nzCheckStrictly) {
                    this.nzTreeService.conduct(node);
                }
                // Cause check method will rerender list, so we need recover it and next the new event to user
                const eventNext = this.nzTreeService.formatEvent('check', node, event.event);
                this.nzCheckBoxChange.emit(eventNext);
                break;
            case 'dragstart':
                // if node is expanded
                if (node.isExpanded) {
                    node.setExpanded(!node.isExpanded);
                    this.renderTree();
                }
                this.nzOnDragStart.emit(event);
                break;
            case 'dragenter':
                const selectedNode = this.nzTreeService.getSelectedNode();
                if (selectedNode && selectedNode.key !== node.key && !node.isExpanded && !node.isLeaf) {
                    node.setExpanded(true);
                    this.renderTree();
                }
                this.nzOnDragEnter.emit(event);
                break;
            case 'dragover':
                this.nzOnDragOver.emit(event);
                break;
            case 'dragleave':
                this.nzOnDragLeave.emit(event);
                break;
            case 'dragend':
                this.nzOnDragEnd.emit(event);
                break;
            case 'drop':
                this.renderTree();
                this.nzOnDrop.emit(event);
                break;
        }
    }
    /**
     * Click expand icon
     */
    renderTree() {
        this.handleFlattenNodes(this.nzTreeService.rootNodes, this.getExpandedNodeList().map(v => v.key));
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.nzTreeService.flattenNodes$.pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.nzFlattenNodes = data;
            this.cdr.markForCheck();
        });
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
    }
    ngOnChanges(changes) {
        this.renderTreeProperties(changes);
    }
    ngAfterViewInit() {
        this.beforeInit = false;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTreeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeComponent, deps: [{ token: i1.NzTreeBaseService }, { token: i2.NzConfigService }, { token: i0.ChangeDetectorRef }, { token: i3.Directionality, optional: true }, { token: i4.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTreeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeComponent, selector: "nz-tree", inputs: { nzShowIcon: "nzShowIcon", nzHideUnMatched: "nzHideUnMatched", nzBlockNode: "nzBlockNode", nzExpandAll: "nzExpandAll", nzSelectMode: "nzSelectMode", nzCheckStrictly: "nzCheckStrictly", nzShowExpand: "nzShowExpand", nzShowLine: "nzShowLine", nzCheckable: "nzCheckable", nzAsyncData: "nzAsyncData", nzDraggable: "nzDraggable", nzMultiple: "nzMultiple", nzExpandedIcon: "nzExpandedIcon", nzVirtualItemSize: "nzVirtualItemSize", nzVirtualMaxBufferPx: "nzVirtualMaxBufferPx", nzVirtualMinBufferPx: "nzVirtualMinBufferPx", nzVirtualHeight: "nzVirtualHeight", nzTreeTemplate: "nzTreeTemplate", nzBeforeDrop: "nzBeforeDrop", nzData: "nzData", nzExpandedKeys: "nzExpandedKeys", nzSelectedKeys: "nzSelectedKeys", nzCheckedKeys: "nzCheckedKeys", nzSearchValue: "nzSearchValue", nzSearchFunc: "nzSearchFunc" }, outputs: { nzExpandedKeysChange: "nzExpandedKeysChange", nzSelectedKeysChange: "nzSelectedKeysChange", nzCheckedKeysChange: "nzCheckedKeysChange", nzSearchValueChange: "nzSearchValueChange", nzClick: "nzClick", nzDblClick: "nzDblClick", nzContextMenu: "nzContextMenu", nzCheckBoxChange: "nzCheckBoxChange", nzExpandChange: "nzExpandChange", nzOnDragStart: "nzOnDragStart", nzOnDragEnter: "nzOnDragEnter", nzOnDragOver: "nzOnDragOver", nzOnDragLeave: "nzOnDragLeave", nzOnDrop: "nzOnDrop", nzOnDragEnd: "nzOnDragEnd" }, host: { properties: { "class.ant-select-tree": "nzSelectMode", "class.ant-select-tree-show-line": "nzSelectMode && nzShowLine", "class.ant-select-tree-icon-hide": "nzSelectMode && !nzShowIcon", "class.ant-select-tree-block-node": "nzSelectMode && nzBlockNode", "class.ant-tree": "!nzSelectMode", "class.ant-tree-rtl": "dir === 'rtl'", "class.ant-tree-show-line": "!nzSelectMode && nzShowLine", "class.ant-tree-icon-hide": "!nzSelectMode && !nzShowIcon", "class.ant-tree-block-node": "!nzSelectMode && nzBlockNode", "class.draggable-tree": "nzDraggable" } }, providers: [
        NzTreeService,
        {
            provide: NzTreeBaseService,
            useFactory: NzTreeServiceFactory,
            deps: [[new SkipSelf(), new Optional(), NzTreeHigherOrderServiceToken], NzTreeService]
        },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NzTreeComponent),
            multi: true
        }
    ], queries: [{ propertyName: "nzTreeTemplateChild", first: true, predicate: ["nzTreeTemplate"], descendants: true, static: true }], viewQueries: [{ propertyName: "cdkVirtualScrollViewport", first: true, predicate: CdkVirtualScrollViewport, descendants: true, read: CdkVirtualScrollViewport }], exportAs: ["nzTree"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
    <div>
      <input [ngStyle]="HIDDEN_STYLE" />
    </div>
    <div class="ant-tree-treenode" [ngStyle]="HIDDEN_NODE_STYLE">
      <div class="ant-tree-indent">
        <div class="ant-tree-indent-unit"></div>
      </div>
    </div>
    <div class="ant-tree-list" [class.ant-select-tree-list]="nzSelectMode" style="position: relative">
      <cdk-virtual-scroll-viewport
        *ngIf="nzVirtualHeight"
        [class.ant-select-tree-list-holder-inner]="nzSelectMode"
        [class.ant-tree-list-holder-inner]="!nzSelectMode"
        [itemSize]="nzVirtualItemSize"
        [minBufferPx]="nzVirtualMinBufferPx"
        [maxBufferPx]="nzVirtualMaxBufferPx"
        [style.height]="nzVirtualHeight"
      >
        <ng-container *cdkVirtualFor="let node of nzFlattenNodes; trackBy: trackByFlattenNode">
          <ng-template [ngTemplateOutlet]="nodeTemplate" [ngTemplateOutletContext]="{ $implicit: node }"></ng-template>
        </ng-container>
      </cdk-virtual-scroll-viewport>

      <div
        *ngIf="!nzVirtualHeight"
        [class.ant-select-tree-list-holder-inner]="nzSelectMode"
        [class.ant-tree-list-holder-inner]="!nzSelectMode"
        [@.disabled]="beforeInit || noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@treeCollapseMotion]="nzFlattenNodes.length"
      >
        <ng-container *ngFor="let node of nzFlattenNodes; trackBy: trackByFlattenNode">
          <ng-template [ngTemplateOutlet]="nodeTemplate" [ngTemplateOutletContext]="{ $implicit: node }"></ng-template>
        </ng-container>
      </div>
    </div>
    <ng-template #nodeTemplate let-treeNode>
      <nz-tree-node
        builtin
        [icon]="treeNode.icon"
        [title]="treeNode.title"
        [isLoading]="treeNode.isLoading"
        [isSelected]="treeNode.isSelected"
        [isDisabled]="treeNode.isDisabled"
        [isMatched]="treeNode.isMatched"
        [isExpanded]="treeNode.isExpanded"
        [isLeaf]="treeNode.isLeaf"
        [isStart]="treeNode.isStart"
        [isEnd]="treeNode.isEnd"
        [isChecked]="treeNode.isChecked"
        [isHalfChecked]="treeNode.isHalfChecked"
        [isDisableCheckbox]="treeNode.isDisableCheckbox"
        [isSelectable]="treeNode.isSelectable"
        [canHide]="treeNode.canHide"
        [nzTreeNode]="treeNode"
        [nzSelectMode]="nzSelectMode"
        [nzShowLine]="nzShowLine"
        [nzExpandedIcon]="nzExpandedIcon"
        [nzDraggable]="nzDraggable"
        [nzCheckable]="nzCheckable"
        [nzShowExpand]="nzShowExpand"
        [nzAsyncData]="nzAsyncData"
        [nzSearchValue]="nzSearchValue"
        [nzHideUnMatched]="nzHideUnMatched"
        [nzBeforeDrop]="nzBeforeDrop"
        [nzShowIcon]="nzShowIcon"
        [nzTreeTemplate]="nzTreeTemplate || nzTreeTemplateChild"
        (nzExpandChange)="eventTriggerChanged($event)"
        (nzClick)="eventTriggerChanged($event)"
        (nzDblClick)="eventTriggerChanged($event)"
        (nzContextMenu)="eventTriggerChanged($event)"
        (nzCheckBoxChange)="eventTriggerChanged($event)"
        (nzOnDragStart)="eventTriggerChanged($event)"
        (nzOnDragEnter)="eventTriggerChanged($event)"
        (nzOnDragOver)="eventTriggerChanged($event)"
        (nzOnDragLeave)="eventTriggerChanged($event)"
        (nzOnDragEnd)="eventTriggerChanged($event)"
        (nzOnDrop)="eventTriggerChanged($event)"
      ></nz-tree-node>
    </ng-template>
  `, isInline: true, components: [{ type: i5.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { type: i6.NzTreeNodeBuiltinComponent, selector: "nz-tree-node[builtin]", inputs: ["icon", "title", "isLoading", "isSelected", "isDisabled", "isMatched", "isExpanded", "isLeaf", "isChecked", "isHalfChecked", "isDisableCheckbox", "isSelectable", "canHide", "isStart", "isEnd", "nzTreeNode", "nzShowLine", "nzShowExpand", "nzCheckable", "nzAsyncData", "nzHideUnMatched", "nzNoAnimation", "nzSelectMode", "nzShowIcon", "nzExpandedIcon", "nzTreeTemplate", "nzBeforeDrop", "nzSearchValue", "nzDraggable"], outputs: ["nzClick", "nzDblClick", "nzContextMenu", "nzCheckBoxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTreeBuiltinNode"] }], directives: [{ type: i7.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i5.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { type: i7.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: [treeCollapseMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    InputBoolean(),
    WithConfig()
], NzTreeComponent.prototype, "nzShowIcon", void 0);
__decorate([
    InputBoolean(),
    WithConfig()
], NzTreeComponent.prototype, "nzHideUnMatched", void 0);
__decorate([
    InputBoolean(),
    WithConfig()
], NzTreeComponent.prototype, "nzBlockNode", void 0);
__decorate([
    InputBoolean()
], NzTreeComponent.prototype, "nzExpandAll", void 0);
__decorate([
    InputBoolean()
], NzTreeComponent.prototype, "nzSelectMode", void 0);
__decorate([
    InputBoolean()
], NzTreeComponent.prototype, "nzCheckStrictly", void 0);
__decorate([
    InputBoolean()
], NzTreeComponent.prototype, "nzShowExpand", void 0);
__decorate([
    InputBoolean()
], NzTreeComponent.prototype, "nzShowLine", void 0);
__decorate([
    InputBoolean()
], NzTreeComponent.prototype, "nzCheckable", void 0);
__decorate([
    InputBoolean()
], NzTreeComponent.prototype, "nzAsyncData", void 0);
__decorate([
    InputBoolean()
], NzTreeComponent.prototype, "nzDraggable", void 0);
__decorate([
    InputBoolean()
], NzTreeComponent.prototype, "nzMultiple", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree',
                    exportAs: 'nzTree',
                    animations: [treeCollapseMotion],
                    template: `
    <div>
      <input [ngStyle]="HIDDEN_STYLE" />
    </div>
    <div class="ant-tree-treenode" [ngStyle]="HIDDEN_NODE_STYLE">
      <div class="ant-tree-indent">
        <div class="ant-tree-indent-unit"></div>
      </div>
    </div>
    <div class="ant-tree-list" [class.ant-select-tree-list]="nzSelectMode" style="position: relative">
      <cdk-virtual-scroll-viewport
        *ngIf="nzVirtualHeight"
        [class.ant-select-tree-list-holder-inner]="nzSelectMode"
        [class.ant-tree-list-holder-inner]="!nzSelectMode"
        [itemSize]="nzVirtualItemSize"
        [minBufferPx]="nzVirtualMinBufferPx"
        [maxBufferPx]="nzVirtualMaxBufferPx"
        [style.height]="nzVirtualHeight"
      >
        <ng-container *cdkVirtualFor="let node of nzFlattenNodes; trackBy: trackByFlattenNode">
          <ng-template [ngTemplateOutlet]="nodeTemplate" [ngTemplateOutletContext]="{ $implicit: node }"></ng-template>
        </ng-container>
      </cdk-virtual-scroll-viewport>

      <div
        *ngIf="!nzVirtualHeight"
        [class.ant-select-tree-list-holder-inner]="nzSelectMode"
        [class.ant-tree-list-holder-inner]="!nzSelectMode"
        [@.disabled]="beforeInit || noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@treeCollapseMotion]="nzFlattenNodes.length"
      >
        <ng-container *ngFor="let node of nzFlattenNodes; trackBy: trackByFlattenNode">
          <ng-template [ngTemplateOutlet]="nodeTemplate" [ngTemplateOutletContext]="{ $implicit: node }"></ng-template>
        </ng-container>
      </div>
    </div>
    <ng-template #nodeTemplate let-treeNode>
      <nz-tree-node
        builtin
        [icon]="treeNode.icon"
        [title]="treeNode.title"
        [isLoading]="treeNode.isLoading"
        [isSelected]="treeNode.isSelected"
        [isDisabled]="treeNode.isDisabled"
        [isMatched]="treeNode.isMatched"
        [isExpanded]="treeNode.isExpanded"
        [isLeaf]="treeNode.isLeaf"
        [isStart]="treeNode.isStart"
        [isEnd]="treeNode.isEnd"
        [isChecked]="treeNode.isChecked"
        [isHalfChecked]="treeNode.isHalfChecked"
        [isDisableCheckbox]="treeNode.isDisableCheckbox"
        [isSelectable]="treeNode.isSelectable"
        [canHide]="treeNode.canHide"
        [nzTreeNode]="treeNode"
        [nzSelectMode]="nzSelectMode"
        [nzShowLine]="nzShowLine"
        [nzExpandedIcon]="nzExpandedIcon"
        [nzDraggable]="nzDraggable"
        [nzCheckable]="nzCheckable"
        [nzShowExpand]="nzShowExpand"
        [nzAsyncData]="nzAsyncData"
        [nzSearchValue]="nzSearchValue"
        [nzHideUnMatched]="nzHideUnMatched"
        [nzBeforeDrop]="nzBeforeDrop"
        [nzShowIcon]="nzShowIcon"
        [nzTreeTemplate]="nzTreeTemplate || nzTreeTemplateChild"
        (nzExpandChange)="eventTriggerChanged($event)"
        (nzClick)="eventTriggerChanged($event)"
        (nzDblClick)="eventTriggerChanged($event)"
        (nzContextMenu)="eventTriggerChanged($event)"
        (nzCheckBoxChange)="eventTriggerChanged($event)"
        (nzOnDragStart)="eventTriggerChanged($event)"
        (nzOnDragEnter)="eventTriggerChanged($event)"
        (nzOnDragOver)="eventTriggerChanged($event)"
        (nzOnDragLeave)="eventTriggerChanged($event)"
        (nzOnDragEnd)="eventTriggerChanged($event)"
        (nzOnDrop)="eventTriggerChanged($event)"
      ></nz-tree-node>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        NzTreeService,
                        {
                            provide: NzTreeBaseService,
                            useFactory: NzTreeServiceFactory,
                            deps: [[new SkipSelf(), new Optional(), NzTreeHigherOrderServiceToken], NzTreeService]
                        },
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzTreeComponent),
                            multi: true
                        }
                    ],
                    host: {
                        '[class.ant-select-tree]': `nzSelectMode`,
                        '[class.ant-select-tree-show-line]': `nzSelectMode && nzShowLine`,
                        '[class.ant-select-tree-icon-hide]': `nzSelectMode && !nzShowIcon`,
                        '[class.ant-select-tree-block-node]': `nzSelectMode && nzBlockNode`,
                        '[class.ant-tree]': `!nzSelectMode`,
                        '[class.ant-tree-rtl]': `dir === 'rtl'`,
                        '[class.ant-tree-show-line]': `!nzSelectMode && nzShowLine`,
                        '[class.ant-tree-icon-hide]': `!nzSelectMode && !nzShowIcon`,
                        '[class.ant-tree-block-node]': `!nzSelectMode && nzBlockNode`,
                        '[class.draggable-tree]': `nzDraggable`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzTreeBaseService }, { type: i2.NzConfigService }, { type: i0.ChangeDetectorRef }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i4.NzNoAnimationDirective, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }]; }, propDecorators: { nzShowIcon: [{
                type: Input
            }], nzHideUnMatched: [{
                type: Input
            }], nzBlockNode: [{
                type: Input
            }], nzExpandAll: [{
                type: Input
            }], nzSelectMode: [{
                type: Input
            }], nzCheckStrictly: [{
                type: Input
            }], nzShowExpand: [{
                type: Input
            }], nzShowLine: [{
                type: Input
            }], nzCheckable: [{
                type: Input
            }], nzAsyncData: [{
                type: Input
            }], nzDraggable: [{
                type: Input
            }], nzMultiple: [{
                type: Input
            }], nzExpandedIcon: [{
                type: Input
            }], nzVirtualItemSize: [{
                type: Input
            }], nzVirtualMaxBufferPx: [{
                type: Input
            }], nzVirtualMinBufferPx: [{
                type: Input
            }], nzVirtualHeight: [{
                type: Input
            }], nzTreeTemplate: [{
                type: Input
            }], nzBeforeDrop: [{
                type: Input
            }], nzData: [{
                type: Input
            }], nzExpandedKeys: [{
                type: Input
            }], nzSelectedKeys: [{
                type: Input
            }], nzCheckedKeys: [{
                type: Input
            }], nzSearchValue: [{
                type: Input
            }], nzSearchFunc: [{
                type: Input
            }], nzTreeTemplateChild: [{
                type: ContentChild,
                args: ['nzTreeTemplate', { static: true }]
            }], cdkVirtualScrollViewport: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport, { read: CdkVirtualScrollViewport }]
            }], nzExpandedKeysChange: [{
                type: Output
            }], nzSelectedKeysChange: [{
                type: Output
            }], nzCheckedKeysChange: [{
                type: Output
            }], nzSearchValueChange: [{
                type: Output
            }], nzClick: [{
                type: Output
            }], nzDblClick: [{
                type: Output
            }], nzContextMenu: [{
                type: Output
            }], nzCheckBoxChange: [{
                type: Output
            }], nzExpandChange: [{
                type: Output
            }], nzOnDragStart: [{
                type: Output
            }], nzOnDragEnter: [{
                type: Output
            }], nzOnDragOver: [{
                type: Output
            }], nzOnDragLeave: [{
                type: Output
            }], nzOnDrop: [{
                type: Output
            }], nzOnDragEnd: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3RyZWUvdHJlZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFFTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osVUFBVSxFQUNWLElBQUksRUFDSixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFFTixRQUFRLEVBRVIsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQWdDLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXJGLE9BQU8sRUFDTCxlQUFlLEVBR2YsVUFBVSxFQUNWLGlCQUFpQixFQUNqQiw2QkFBNkIsRUFJOUIsTUFBTSx5QkFBeUIsQ0FBQztBQUVqQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7QUFFL0MsTUFBTSxVQUFVLG9CQUFvQixDQUNsQyxrQkFBcUMsRUFDckMsV0FBMEI7SUFFMUIsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztBQUMvRCxDQUFDO0FBRUQsTUFBTSxxQkFBcUIsR0FBZ0IsTUFBTSxDQUFDO0FBbUhsRCxNQUFNLE9BQU8sZUFDWCxTQUFR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dEIsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUM0QyxtQkFBbUI7c0JBQXBFLFlBQVk7dUJBQUMsZ0JBQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUtoRCx3QkFBd0I7c0JBRHZCLFNBQVM7dUJBQUMsd0JBQXdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUU7Z0JBTXBELG9CQUFvQjtzQkFBdEMsTUFBTTtnQkFDWSxvQkFBb0I7c0JBQXRDLE1BQU07Z0JBQ1ksbUJBQW1CO3NCQUFyQyxNQUFNO2dCQUNZLG1CQUFtQjtzQkFBckMsTUFBTTtnQkFDWSxPQUFPO3NCQUF6QixNQUFNO2dCQUNZLFVBQVU7c0JBQTVCLE1BQU07Z0JBQ1ksYUFBYTtzQkFBL0IsTUFBTTtnQkFDWSxnQkFBZ0I7c0JBQWxDLE1BQU07Z0JBQ1ksY0FBYztzQkFBaEMsTUFBTTtnQkFDWSxhQUFhO3NCQUEvQixNQUFNO2dCQUNZLGFBQWE7c0JBQS9CLE1BQU07Z0JBQ1ksWUFBWTtzQkFBOUIsTUFBTTtnQkFDWSxhQUFhO3NCQUEvQixNQUFNO2dCQUNZLFFBQVE7c0JBQTFCLE1BQU07Z0JBQ1ksV0FBVztzQkFBN0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2tpcFNlbGYsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IHRyZWVDb2xsYXBzZU1vdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHtcbiAgZmxhdHRlblRyZWVEYXRhLFxuICBOekZvcm1hdEJlZm9yZURyb3BFdmVudCxcbiAgTnpGb3JtYXRFbWl0RXZlbnQsXG4gIE56VHJlZUJhc2UsXG4gIE56VHJlZUJhc2VTZXJ2aWNlLFxuICBOelRyZWVIaWdoZXJPcmRlclNlcnZpY2VUb2tlbixcbiAgTnpUcmVlTm9kZSxcbiAgTnpUcmVlTm9kZUtleSxcbiAgTnpUcmVlTm9kZU9wdGlvbnNcbn0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3RyZWUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBOelRyZWVTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLnNlcnZpY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gTnpUcmVlU2VydmljZUZhY3RvcnkoXG4gIGhpZ2hlck9yZGVyU2VydmljZTogTnpUcmVlQmFzZVNlcnZpY2UsXG4gIHRyZWVTZXJ2aWNlOiBOelRyZWVTZXJ2aWNlXG4pOiBOelRyZWVCYXNlU2VydmljZSB7XG4gIHJldHVybiBoaWdoZXJPcmRlclNlcnZpY2UgPyBoaWdoZXJPcmRlclNlcnZpY2UgOiB0cmVlU2VydmljZTtcbn1cblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICd0cmVlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZScsXG4gIGV4cG9ydEFzOiAnbnpUcmVlJyxcbiAgYW5pbWF0aW9uczogW3RyZWVDb2xsYXBzZU1vdGlvbl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5cbiAgICAgIDxpbnB1dCBbbmdTdHlsZV09XCJISURERU5fU1RZTEVcIiAvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhbnQtdHJlZS10cmVlbm9kZVwiIFtuZ1N0eWxlXT1cIkhJRERFTl9OT0RFX1NUWUxFXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LXRyZWUtaW5kZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtdHJlZS1pbmRlbnQtdW5pdFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFudC10cmVlLWxpc3RcIiBbY2xhc3MuYW50LXNlbGVjdC10cmVlLWxpc3RdPVwibnpTZWxlY3RNb2RlXCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmVcIj5cbiAgICAgIDxjZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnRcbiAgICAgICAgKm5nSWY9XCJuelZpcnR1YWxIZWlnaHRcIlxuICAgICAgICBbY2xhc3MuYW50LXNlbGVjdC10cmVlLWxpc3QtaG9sZGVyLWlubmVyXT1cIm56U2VsZWN0TW9kZVwiXG4gICAgICAgIFtjbGFzcy5hbnQtdHJlZS1saXN0LWhvbGRlci1pbm5lcl09XCIhbnpTZWxlY3RNb2RlXCJcbiAgICAgICAgW2l0ZW1TaXplXT1cIm56VmlydHVhbEl0ZW1TaXplXCJcbiAgICAgICAgW21pbkJ1ZmZlclB4XT1cIm56VmlydHVhbE1pbkJ1ZmZlclB4XCJcbiAgICAgICAgW21heEJ1ZmZlclB4XT1cIm56VmlydHVhbE1heEJ1ZmZlclB4XCJcbiAgICAgICAgW3N0eWxlLmhlaWdodF09XCJuelZpcnR1YWxIZWlnaHRcIlxuICAgICAgPlxuICAgICAgICA8bmctY29udGFpbmVyICpjZGtWaXJ0dWFsRm9yPVwibGV0IG5vZGUgb2YgbnpGbGF0dGVuTm9kZXM7IHRyYWNrQnk6IHRyYWNrQnlGbGF0dGVuTm9kZVwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJub2RlVGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IG5vZGUgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQ+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nSWY9XCIhbnpWaXJ0dWFsSGVpZ2h0XCJcbiAgICAgICAgW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1saXN0LWhvbGRlci1pbm5lcl09XCJuelNlbGVjdE1vZGVcIlxuICAgICAgICBbY2xhc3MuYW50LXRyZWUtbGlzdC1ob2xkZXItaW5uZXJdPVwiIW56U2VsZWN0TW9kZVwiXG4gICAgICAgIFtALmRpc2FibGVkXT1cImJlZm9yZUluaXQgfHwgbm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb25cIlxuICAgICAgICBbbnpOb0FuaW1hdGlvbl09XCJub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvblwiXG4gICAgICAgIFtAdHJlZUNvbGxhcHNlTW90aW9uXT1cIm56RmxhdHRlbk5vZGVzLmxlbmd0aFwiXG4gICAgICA+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG5vZGUgb2YgbnpGbGF0dGVuTm9kZXM7IHRyYWNrQnk6IHRyYWNrQnlGbGF0dGVuTm9kZVwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJub2RlVGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IG5vZGUgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPG5nLXRlbXBsYXRlICNub2RlVGVtcGxhdGUgbGV0LXRyZWVOb2RlPlxuICAgICAgPG56LXRyZWUtbm9kZVxuICAgICAgICBidWlsdGluXG4gICAgICAgIFtpY29uXT1cInRyZWVOb2RlLmljb25cIlxuICAgICAgICBbdGl0bGVdPVwidHJlZU5vZGUudGl0bGVcIlxuICAgICAgICBbaXNMb2FkaW5nXT1cInRyZWVOb2RlLmlzTG9hZGluZ1wiXG4gICAgICAgIFtpc1NlbGVjdGVkXT1cInRyZWVOb2RlLmlzU2VsZWN0ZWRcIlxuICAgICAgICBbaXNEaXNhYmxlZF09XCJ0cmVlTm9kZS5pc0Rpc2FibGVkXCJcbiAgICAgICAgW2lzTWF0Y2hlZF09XCJ0cmVlTm9kZS5pc01hdGNoZWRcIlxuICAgICAgICBbaXNFeHBhbmRlZF09XCJ0cmVlTm9kZS5pc0V4cGFuZGVkXCJcbiAgICAgICAgW2lzTGVhZl09XCJ0cmVlTm9kZS5pc0xlYWZcIlxuICAgICAgICBbaXNTdGFydF09XCJ0cmVlTm9kZS5pc1N0YXJ0XCJcbiAgICAgICAgW2lzRW5kXT1cInRyZWVOb2RlLmlzRW5kXCJcbiAgICAgICAgW2lzQ2hlY2tlZF09XCJ0cmVlTm9kZS5pc0NoZWNrZWRcIlxuICAgICAgICBbaXNIYWxmQ2hlY2tlZF09XCJ0cmVlTm9kZS5pc0hhbGZDaGVja2VkXCJcbiAgICAgICAgW2lzRGlzYWJsZUNoZWNrYm94XT1cInRyZWVOb2RlLmlzRGlzYWJsZUNoZWNrYm94XCJcbiAgICAgICAgW2lzU2VsZWN0YWJsZV09XCJ0cmVlTm9kZS5pc1NlbGVjdGFibGVcIlxuICAgICAgICBbY2FuSGlkZV09XCJ0cmVlTm9kZS5jYW5IaWRlXCJcbiAgICAgICAgW256VHJlZU5vZGVdPVwidHJlZU5vZGVcIlxuICAgICAgICBbbnpTZWxlY3RNb2RlXT1cIm56U2VsZWN0TW9kZVwiXG4gICAgICAgIFtuelNob3dMaW5lXT1cIm56U2hvd0xpbmVcIlxuICAgICAgICBbbnpFeHBhbmRlZEljb25dPVwibnpFeHBhbmRlZEljb25cIlxuICAgICAgICBbbnpEcmFnZ2FibGVdPVwibnpEcmFnZ2FibGVcIlxuICAgICAgICBbbnpDaGVja2FibGVdPVwibnpDaGVja2FibGVcIlxuICAgICAgICBbbnpTaG93RXhwYW5kXT1cIm56U2hvd0V4cGFuZFwiXG4gICAgICAgIFtuekFzeW5jRGF0YV09XCJuekFzeW5jRGF0YVwiXG4gICAgICAgIFtuelNlYXJjaFZhbHVlXT1cIm56U2VhcmNoVmFsdWVcIlxuICAgICAgICBbbnpIaWRlVW5NYXRjaGVkXT1cIm56SGlkZVVuTWF0Y2hlZFwiXG4gICAgICAgIFtuekJlZm9yZURyb3BdPVwibnpCZWZvcmVEcm9wXCJcbiAgICAgICAgW256U2hvd0ljb25dPVwibnpTaG93SWNvblwiXG4gICAgICAgIFtuelRyZWVUZW1wbGF0ZV09XCJuelRyZWVUZW1wbGF0ZSB8fCBuelRyZWVUZW1wbGF0ZUNoaWxkXCJcbiAgICAgICAgKG56RXhwYW5kQ2hhbmdlKT1cImV2ZW50VHJpZ2dlckNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgIChuekNsaWNrKT1cImV2ZW50VHJpZ2dlckNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgIChuekRibENsaWNrKT1cImV2ZW50VHJpZ2dlckNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgIChuekNvbnRleHRNZW51KT1cImV2ZW50VHJpZ2dlckNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgIChuekNoZWNrQm94Q2hhbmdlKT1cImV2ZW50VHJpZ2dlckNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgIChuek9uRHJhZ1N0YXJ0KT1cImV2ZW50VHJpZ2dlckNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgIChuek9uRHJhZ0VudGVyKT1cImV2ZW50VHJpZ2dlckNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgIChuek9uRHJhZ092ZXIpPVwiZXZlbnRUcmlnZ2VyQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgKG56T25EcmFnTGVhdmUpPVwiZXZlbnRUcmlnZ2VyQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgKG56T25EcmFnRW5kKT1cImV2ZW50VHJpZ2dlckNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgIChuek9uRHJvcCk9XCJldmVudFRyaWdnZXJDaGFuZ2VkKCRldmVudClcIlxuICAgICAgPjwvbnotdHJlZS1ub2RlPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICBOelRyZWVTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE56VHJlZUJhc2VTZXJ2aWNlLFxuICAgICAgdXNlRmFjdG9yeTogTnpUcmVlU2VydmljZUZhY3RvcnksXG4gICAgICBkZXBzOiBbW25ldyBTa2lwU2VsZigpLCBuZXcgT3B0aW9uYWwoKSwgTnpUcmVlSGlnaGVyT3JkZXJTZXJ2aWNlVG9rZW5dLCBOelRyZWVTZXJ2aWNlXVxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOelRyZWVDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF0sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtdHJlZV0nOiBgbnpTZWxlY3RNb2RlYCxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1zaG93LWxpbmVdJzogYG56U2VsZWN0TW9kZSAmJiBuelNob3dMaW5lYCxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1pY29uLWhpZGVdJzogYG56U2VsZWN0TW9kZSAmJiAhbnpTaG93SWNvbmAsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtYmxvY2stbm9kZV0nOiBgbnpTZWxlY3RNb2RlICYmIG56QmxvY2tOb2RlYCxcbiAgICAnW2NsYXNzLmFudC10cmVlXSc6IGAhbnpTZWxlY3RNb2RlYCxcbiAgICAnW2NsYXNzLmFudC10cmVlLXJ0bF0nOiBgZGlyID09PSAncnRsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1zaG93LWxpbmVdJzogYCFuelNlbGVjdE1vZGUgJiYgbnpTaG93TGluZWAsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1pY29uLWhpZGVdJzogYCFuelNlbGVjdE1vZGUgJiYgIW56U2hvd0ljb25gLFxuICAgICdbY2xhc3MuYW50LXRyZWUtYmxvY2stbm9kZV0nOiBgIW56U2VsZWN0TW9kZSAmJiBuekJsb2NrTm9kZWAsXG4gICAgJ1tjbGFzcy5kcmFnZ2FibGUtdHJlZV0nOiBgbnpEcmFnZ2FibGVgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlQ29tcG9uZW50XG4gIGV4dGVuZHMgTnpUcmVlQmFzZVxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0XG57XG4gIHJlYWRvbmx5IF9uek1vZHVsZU5hbWU6IE56Q29uZmlnS2V5ID0gTlpfQ09ORklHX01PRFVMRV9OQU1FO1xuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dJY29uOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekhpZGVVbk1hdGNoZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256QmxvY2tOb2RlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekV4cGFuZEFsbDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTZWxlY3RNb2RlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNoZWNrU3RyaWN0bHk6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd0V4cGFuZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93TGluZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpDaGVja2FibGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256QXN5bmNEYXRhOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRyYWdnYWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpNdWx0aXBsZTogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBAV2l0aENvbmZpZygpIG56U2hvd0ljb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIEBXaXRoQ29uZmlnKCkgbnpIaWRlVW5NYXRjaGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBAV2l0aENvbmZpZygpIG56QmxvY2tOb2RlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekV4cGFuZEFsbCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTZWxlY3RNb2RlID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekNoZWNrU3RyaWN0bHkgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2hvd0V4cGFuZDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dMaW5lID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekNoZWNrYWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpBc3luY0RhdGEgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RHJhZ2dhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek11bHRpcGxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56RXhwYW5kZWRJY29uPzogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IE56VHJlZU5vZGU7IG9yaWdpbjogTnpUcmVlTm9kZU9wdGlvbnMgfT47XG4gIEBJbnB1dCgpIG56VmlydHVhbEl0ZW1TaXplID0gMjg7XG4gIEBJbnB1dCgpIG56VmlydHVhbE1heEJ1ZmZlclB4ID0gNTAwO1xuICBASW5wdXQoKSBuelZpcnR1YWxNaW5CdWZmZXJQeCA9IDI4O1xuICBASW5wdXQoKSBuelZpcnR1YWxIZWlnaHQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelRyZWVUZW1wbGF0ZT86IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBOelRyZWVOb2RlOyBvcmlnaW46IE56VHJlZU5vZGVPcHRpb25zIH0+O1xuICBASW5wdXQoKSBuekJlZm9yZURyb3A/OiAoY29uZmlybTogTnpGb3JtYXRCZWZvcmVEcm9wRXZlbnQpID0+IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIEBJbnB1dCgpIG56RGF0YTogTnpUcmVlTm9kZU9wdGlvbnNbXSB8IE56VHJlZU5vZGVbXSA9IFtdO1xuICBASW5wdXQoKSBuekV4cGFuZGVkS2V5czogTnpUcmVlTm9kZUtleVtdID0gW107XG4gIEBJbnB1dCgpIG56U2VsZWN0ZWRLZXlzOiBOelRyZWVOb2RlS2V5W10gPSBbXTtcbiAgQElucHV0KCkgbnpDaGVja2VkS2V5czogTnpUcmVlTm9kZUtleVtdID0gW107XG4gIEBJbnB1dCgpIG56U2VhcmNoVmFsdWU6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBuelNlYXJjaEZ1bmM/OiAobm9kZTogTnpUcmVlTm9kZU9wdGlvbnMpID0+IGJvb2xlYW47XG4gIEBDb250ZW50Q2hpbGQoJ256VHJlZVRlbXBsYXRlJywgeyBzdGF0aWM6IHRydWUgfSkgbnpUcmVlVGVtcGxhdGVDaGlsZCE6IFRlbXBsYXRlUmVmPHtcbiAgICAkaW1wbGljaXQ6IE56VHJlZU5vZGU7XG4gICAgb3JpZ2luOiBOelRyZWVOb2RlT3B0aW9ucztcbiAgfT47XG4gIEBWaWV3Q2hpbGQoQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LCB7IHJlYWQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCB9KVxuICBjZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQhOiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG4gIG56RmxhdHRlbk5vZGVzOiBOelRyZWVOb2RlW10gPSBbXTtcbiAgYmVmb3JlSW5pdCA9IHRydWU7XG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56RXhwYW5kZWRLZXlzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56U2VsZWN0ZWRLZXlzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q2hlY2tlZEtleXNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZ1tdPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpTZWFyY2hWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxOekZvcm1hdEVtaXRFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56RGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE56Rm9ybWF0RW1pdEV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDb250ZXh0TWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekNoZWNrQm94Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOekZvcm1hdEVtaXRFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56RXhwYW5kQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOekZvcm1hdEVtaXRFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25EcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE56Rm9ybWF0RW1pdEV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkRyYWdFbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uRHJhZ092ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPE56Rm9ybWF0RW1pdEV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkRyYWdMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uRHJvcCA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uRHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG5cbiAgSElEREVOX1NUWUxFID0ge1xuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMCxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgIG9wYWNpdHk6IDAsXG4gICAgYm9yZGVyOiAwLFxuICAgIHBhZGRpbmc6IDAsXG4gICAgbWFyZ2luOiAwXG4gIH07XG5cbiAgSElEREVOX05PREVfU1RZTEUgPSB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICAgIGhlaWdodDogMCxcbiAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgfTtcblxuICBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgb25DaGFuZ2U6ICh2YWx1ZTogTnpUcmVlTm9kZVtdKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcbiAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBOelRyZWVOb2RlW10pOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZU56RGF0YSh2YWx1ZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogTnpUcmVlTm9kZVtdKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciBhbGwgcHJvcGVydGllcyBvZiBuelRyZWVcbiAgICpcbiAgICogQHBhcmFtIGNoYW5nZXM6IGFsbCBjaGFuZ2VzIGZyb20gQElucHV0XG4gICAqL1xuICByZW5kZXJUcmVlUHJvcGVydGllcyhjaGFuZ2VzOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XG4gICAgbGV0IHVzZURlZmF1bHRFeHBhbmRlZEtleXMgPSBmYWxzZTtcbiAgICBsZXQgZXhwYW5kQWxsID0gZmFsc2U7XG4gICAgY29uc3Qge1xuICAgICAgbnpEYXRhLFxuICAgICAgbnpFeHBhbmRlZEtleXMsXG4gICAgICBuelNlbGVjdGVkS2V5cyxcbiAgICAgIG56Q2hlY2tlZEtleXMsXG4gICAgICBuekNoZWNrU3RyaWN0bHksXG4gICAgICBuekV4cGFuZEFsbCxcbiAgICAgIG56TXVsdGlwbGUsXG4gICAgICBuelNlYXJjaFZhbHVlXG4gICAgfSA9IGNoYW5nZXM7XG5cbiAgICBpZiAobnpFeHBhbmRBbGwpIHtcbiAgICAgIHVzZURlZmF1bHRFeHBhbmRlZEtleXMgPSB0cnVlO1xuICAgICAgZXhwYW5kQWxsID0gdGhpcy5uekV4cGFuZEFsbDtcbiAgICB9XG5cbiAgICBpZiAobnpNdWx0aXBsZSkge1xuICAgICAgdGhpcy5uelRyZWVTZXJ2aWNlLmlzTXVsdGlwbGUgPSB0aGlzLm56TXVsdGlwbGU7XG4gICAgfVxuXG4gICAgaWYgKG56Q2hlY2tTdHJpY3RseSkge1xuICAgICAgdGhpcy5uelRyZWVTZXJ2aWNlLmlzQ2hlY2tTdHJpY3RseSA9IHRoaXMubnpDaGVja1N0cmljdGx5O1xuICAgIH1cblxuICAgIGlmIChuekRhdGEpIHtcbiAgICAgIHRoaXMuaGFuZGxlTnpEYXRhKHRoaXMubnpEYXRhKTtcbiAgICB9XG5cbiAgICBpZiAobnpDaGVja2VkS2V5cykge1xuICAgICAgdGhpcy5oYW5kbGVDaGVja2VkS2V5cyh0aGlzLm56Q2hlY2tlZEtleXMpO1xuICAgIH1cblxuICAgIGlmIChuekNoZWNrU3RyaWN0bHkpIHtcbiAgICAgIHRoaXMuaGFuZGxlQ2hlY2tlZEtleXMobnVsbCk7XG4gICAgfVxuXG4gICAgaWYgKG56RXhwYW5kZWRLZXlzIHx8IG56RXhwYW5kQWxsKSB7XG4gICAgICB1c2VEZWZhdWx0RXhwYW5kZWRLZXlzID0gdHJ1ZTtcbiAgICAgIHRoaXMuaGFuZGxlRXhwYW5kZWRLZXlzKGV4cGFuZEFsbCB8fCB0aGlzLm56RXhwYW5kZWRLZXlzKTtcbiAgICB9XG5cbiAgICBpZiAobnpTZWxlY3RlZEtleXMpIHtcbiAgICAgIHRoaXMuaGFuZGxlU2VsZWN0ZWRLZXlzKHRoaXMubnpTZWxlY3RlZEtleXMsIHRoaXMubnpNdWx0aXBsZSk7XG4gICAgfVxuXG4gICAgaWYgKG56U2VhcmNoVmFsdWUpIHtcbiAgICAgIGlmICghKG56U2VhcmNoVmFsdWUuZmlyc3RDaGFuZ2UgJiYgIXRoaXMubnpTZWFyY2hWYWx1ZSkpIHtcbiAgICAgICAgdXNlRGVmYXVsdEV4cGFuZGVkS2V5cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhhbmRsZVNlYXJjaFZhbHVlKG56U2VhcmNoVmFsdWUuY3VycmVudFZhbHVlLCB0aGlzLm56U2VhcmNoRnVuYyk7XG4gICAgICAgIHRoaXMubnpTZWFyY2hWYWx1ZUNoYW5nZS5lbWl0KHRoaXMubnpUcmVlU2VydmljZS5mb3JtYXRFdmVudCgnc2VhcmNoJywgbnVsbCwgbnVsbCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZsYXR0ZW4gZGF0YVxuICAgIGNvbnN0IGN1cnJlbnRFeHBhbmRlZEtleXMgPSB0aGlzLmdldEV4cGFuZGVkTm9kZUxpc3QoKS5tYXAodiA9PiB2LmtleSk7XG4gICAgY29uc3QgbmV3RXhwYW5kZWRLZXlzID0gdXNlRGVmYXVsdEV4cGFuZGVkS2V5cyA/IGV4cGFuZEFsbCB8fCB0aGlzLm56RXhwYW5kZWRLZXlzIDogY3VycmVudEV4cGFuZGVkS2V5cztcbiAgICB0aGlzLmhhbmRsZUZsYXR0ZW5Ob2Rlcyh0aGlzLm56VHJlZVNlcnZpY2Uucm9vdE5vZGVzLCBuZXdFeHBhbmRlZEtleXMpO1xuICB9XG5cbiAgdHJhY2tCeUZsYXR0ZW5Ob2RlKF86IG51bWJlciwgbm9kZTogTnpUcmVlTm9kZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5vZGUua2V5O1xuICB9XG4gIC8vIERlYWwgd2l0aCBwcm9wZXJ0aWVzXG4gIC8qKlxuICAgKiBuekRhdGFcbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBoYW5kbGVOekRhdGEodmFsdWU6IE56U2FmZUFueVtdKTogdm9pZCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5jb2VyY2VUcmVlTm9kZXModmFsdWUpO1xuICAgICAgdGhpcy5uelRyZWVTZXJ2aWNlLmluaXRUcmVlKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZsYXR0ZW5Ob2RlcyhkYXRhOiBOelRyZWVOb2RlW10sIGV4cGFuZEtleXM6IE56VHJlZU5vZGVLZXlbXSB8IHRydWUgPSBbXSk6IHZvaWQge1xuICAgIHRoaXMubnpUcmVlU2VydmljZS5mbGF0dGVuVHJlZURhdGEoZGF0YSwgZXhwYW5kS2V5cyk7XG4gIH1cblxuICBoYW5kbGVDaGVja2VkS2V5cyhrZXlzOiBOelRyZWVOb2RlS2V5W10gfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy5uelRyZWVTZXJ2aWNlLmNvbmR1Y3RDaGVjayhrZXlzLCB0aGlzLm56Q2hlY2tTdHJpY3RseSk7XG4gIH1cblxuICBoYW5kbGVFeHBhbmRlZEtleXMoa2V5czogTnpUcmVlTm9kZUtleVtdIHwgdHJ1ZSA9IFtdKTogdm9pZCB7XG4gICAgdGhpcy5uelRyZWVTZXJ2aWNlLmNvbmR1Y3RFeHBhbmRlZEtleXMoa2V5cyk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3RlZEtleXMoa2V5czogTnpUcmVlTm9kZUtleVtdLCBpc011bHRpOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5uelRyZWVTZXJ2aWNlLmNvbmR1Y3RTZWxlY3RlZEtleXMoa2V5cywgaXNNdWx0aSk7XG4gIH1cblxuICBoYW5kbGVTZWFyY2hWYWx1ZSh2YWx1ZTogc3RyaW5nLCBzZWFyY2hGdW5jPzogKG5vZGU6IE56VHJlZU5vZGVPcHRpb25zKSA9PiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgZGF0YUxpc3QgPSBmbGF0dGVuVHJlZURhdGEodGhpcy5uelRyZWVTZXJ2aWNlLnJvb3ROb2RlcywgdHJ1ZSkubWFwKHYgPT4gdi5kYXRhKTtcbiAgICBjb25zdCBjaGVja0lmTWF0Y2hlZCA9IChub2RlOiBOelRyZWVOb2RlKTogYm9vbGVhbiA9PiB7XG4gICAgICBpZiAoc2VhcmNoRnVuYykge1xuICAgICAgICByZXR1cm4gc2VhcmNoRnVuYyhub2RlLm9yaWdpbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gIXZhbHVlIHx8ICFub2RlLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUudG9Mb3dlckNhc2UoKSkgPyBmYWxzZSA6IHRydWU7XG4gICAgfTtcbiAgICBkYXRhTGlzdC5mb3JFYWNoKHYgPT4ge1xuICAgICAgdi5pc01hdGNoZWQgPSBjaGVja0lmTWF0Y2hlZCh2KTtcbiAgICAgIHYuY2FuSGlkZSA9ICF2LmlzTWF0Y2hlZDtcbiAgICAgIGlmICghdi5pc01hdGNoZWQpIHtcbiAgICAgICAgdi5zZXRFeHBhbmRlZChmYWxzZSk7XG4gICAgICAgIHRoaXMubnpUcmVlU2VydmljZS5zZXRFeHBhbmRlZE5vZGVMaXN0KHYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZXhwYW5kXG4gICAgICAgIHRoaXMubnpUcmVlU2VydmljZS5leHBhbmROb2RlQWxsUGFyZW50QnlTZWFyY2godik7XG4gICAgICB9XG4gICAgICB0aGlzLm56VHJlZVNlcnZpY2Uuc2V0TWF0Y2hlZE5vZGVMaXN0KHYpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBlbWl0IGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBoYW5kbGUgZWFjaCBldmVudFxuICAgKi9cbiAgZXZlbnRUcmlnZ2VyQ2hhbmdlZChldmVudDogTnpGb3JtYXRFbWl0RXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBub2RlID0gZXZlbnQubm9kZSE7XG4gICAgc3dpdGNoIChldmVudC5ldmVudE5hbWUpIHtcbiAgICAgIGNhc2UgJ2V4cGFuZCc6XG4gICAgICAgIHRoaXMucmVuZGVyVHJlZSgpO1xuICAgICAgICB0aGlzLm56RXhwYW5kQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgdGhpcy5uekNsaWNrLmVtaXQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RibGNsaWNrJzpcbiAgICAgICAgdGhpcy5uekRibENsaWNrLmVtaXQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NvbnRleHRtZW51JzpcbiAgICAgICAgdGhpcy5uekNvbnRleHRNZW51LmVtaXQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NoZWNrJzpcbiAgICAgICAgLy8gUmVuZGVyIGNoZWNrZWQgc3RhdGUgd2l0aCBub2RlcycgcHJvcGVydHkgYGlzQ2hlY2tlZGBcbiAgICAgICAgdGhpcy5uelRyZWVTZXJ2aWNlLnNldENoZWNrZWROb2RlTGlzdChub2RlKTtcbiAgICAgICAgaWYgKCF0aGlzLm56Q2hlY2tTdHJpY3RseSkge1xuICAgICAgICAgIHRoaXMubnpUcmVlU2VydmljZS5jb25kdWN0KG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhdXNlIGNoZWNrIG1ldGhvZCB3aWxsIHJlcmVuZGVyIGxpc3QsIHNvIHdlIG5lZWQgcmVjb3ZlciBpdCBhbmQgbmV4dCB0aGUgbmV3IGV2ZW50IHRvIHVzZXJcbiAgICAgICAgY29uc3QgZXZlbnROZXh0ID0gdGhpcy5uelRyZWVTZXJ2aWNlLmZvcm1hdEV2ZW50KCdjaGVjaycsIG5vZGUsIGV2ZW50LmV2ZW50ISk7XG4gICAgICAgIHRoaXMubnpDaGVja0JveENoYW5nZS5lbWl0KGV2ZW50TmV4dCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZHJhZ3N0YXJ0JzpcbiAgICAgICAgLy8gaWYgbm9kZSBpcyBleHBhbmRlZFxuICAgICAgICBpZiAobm9kZS5pc0V4cGFuZGVkKSB7XG4gICAgICAgICAgbm9kZS5zZXRFeHBhbmRlZCghbm9kZS5pc0V4cGFuZGVkKTtcbiAgICAgICAgICB0aGlzLnJlbmRlclRyZWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm56T25EcmFnU3RhcnQuZW1pdChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZHJhZ2VudGVyJzpcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWROb2RlID0gdGhpcy5uelRyZWVTZXJ2aWNlLmdldFNlbGVjdGVkTm9kZSgpO1xuICAgICAgICBpZiAoc2VsZWN0ZWROb2RlICYmIHNlbGVjdGVkTm9kZS5rZXkgIT09IG5vZGUua2V5ICYmICFub2RlLmlzRXhwYW5kZWQgJiYgIW5vZGUuaXNMZWFmKSB7XG4gICAgICAgICAgbm9kZS5zZXRFeHBhbmRlZCh0cnVlKTtcbiAgICAgICAgICB0aGlzLnJlbmRlclRyZWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm56T25EcmFnRW50ZXIuZW1pdChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZHJhZ292ZXInOlxuICAgICAgICB0aGlzLm56T25EcmFnT3Zlci5lbWl0KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkcmFnbGVhdmUnOlxuICAgICAgICB0aGlzLm56T25EcmFnTGVhdmUuZW1pdChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZHJhZ2VuZCc6XG4gICAgICAgIHRoaXMubnpPbkRyYWdFbmQuZW1pdChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZHJvcCc6XG4gICAgICAgIHRoaXMucmVuZGVyVHJlZSgpO1xuICAgICAgICB0aGlzLm56T25Ecm9wLmVtaXQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xpY2sgZXhwYW5kIGljb25cbiAgICovXG4gIHJlbmRlclRyZWUoKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVGbGF0dGVuTm9kZXMoXG4gICAgICB0aGlzLm56VHJlZVNlcnZpY2Uucm9vdE5vZGVzLFxuICAgICAgdGhpcy5nZXRFeHBhbmRlZE5vZGVMaXN0KCkubWFwKHYgPT4gdi5rZXkpXG4gICAgKTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICAvLyBIYW5kbGUgZW1pdCBldmVudCBlbmRcblxuICBjb25zdHJ1Y3RvcihcbiAgICBuelRyZWVTZXJ2aWNlOiBOelRyZWVCYXNlU2VydmljZSxcbiAgICBwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZVxuICApIHtcbiAgICBzdXBlcihuelRyZWVTZXJ2aWNlKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubnpUcmVlU2VydmljZS5mbGF0dGVuTm9kZXMkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICB0aGlzLm56RmxhdHRlbk5vZGVzID0gZGF0YTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJUcmVlUHJvcGVydGllcyhjaGFuZ2VzKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmJlZm9yZUluaXQgPSBmYWxzZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19