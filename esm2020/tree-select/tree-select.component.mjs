import { __decorate } from "tslib";
import { BACKSPACE, ESCAPE, TAB } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ContentChild, EventEmitter, forwardRef, Host, Injector, Input, Optional, Output, Self, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, of as observableOf, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { slideMotion } from 'ng-zorro-antd/core/animation';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import { NzTreeBase, NzTreeHigherOrderServiceToken } from 'ng-zorro-antd/core/tree';
import { InputBoolean, isNotNil } from 'ng-zorro-antd/core/util';
import { NzSelectSearchComponent } from 'ng-zorro-antd/select';
import { NzTreeSelectService } from './tree-select.service';
import * as i0 from "@angular/core";
import * as i1 from "./tree-select.service";
import * as i2 from "ng-zorro-antd/core/config";
import * as i3 from "@angular/cdk/bidi";
import * as i4 from "@angular/cdk/a11y";
import * as i5 from "ng-zorro-antd/core/no-animation";
import * as i6 from "ng-zorro-antd/tree";
import * as i7 from "ng-zorro-antd/empty";
import * as i8 from "ng-zorro-antd/select";
import * as i9 from "@angular/cdk/overlay";
import * as i10 from "ng-zorro-antd/core/overlay";
import * as i11 from "@angular/common";
export function higherOrderServiceFactory(injector) {
    return injector.get(NzTreeSelectService);
}
const NZ_CONFIG_MODULE_NAME = 'treeSelect';
const TREE_SELECT_DEFAULT_CLASS = 'ant-select-dropdown ant-select-tree-dropdown';
export class NzTreeSelectComponent extends NzTreeBase {
    constructor(nzTreeService, nzConfigService, renderer, cdr, elementRef, directionality, focusMonitor, noAnimation) {
        super(nzTreeService);
        this.nzConfigService = nzConfigService;
        this.renderer = renderer;
        this.cdr = cdr;
        this.elementRef = elementRef;
        this.directionality = directionality;
        this.focusMonitor = focusMonitor;
        this.noAnimation = noAnimation;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzId = null;
        this.nzAllowClear = true;
        this.nzShowExpand = true;
        this.nzShowLine = false;
        this.nzDropdownMatchSelectWidth = true;
        this.nzCheckable = false;
        this.nzHideUnMatched = false;
        this.nzShowIcon = false;
        this.nzShowSearch = false;
        this.nzDisabled = false;
        this.nzAsyncData = false;
        this.nzMultiple = false;
        this.nzDefaultExpandAll = false;
        this.nzCheckStrictly = false;
        this.nzVirtualItemSize = 28;
        this.nzVirtualMaxBufferPx = 500;
        this.nzVirtualMinBufferPx = 28;
        this.nzVirtualHeight = null;
        this.nzNodes = [];
        this.nzOpen = false;
        this.nzSize = 'default';
        this.nzPlaceHolder = '';
        this.nzDropdownStyle = null;
        this.nzBackdrop = false;
        this.nzDisplayWith = (node) => node.title;
        this.nzMaxTagPlaceholder = null;
        this.nzOpenChange = new EventEmitter();
        this.nzCleared = new EventEmitter();
        this.nzRemoved = new EventEmitter();
        this.nzExpandChange = new EventEmitter();
        this.nzTreeClick = new EventEmitter();
        this.nzTreeCheckBoxChange = new EventEmitter();
        this.dropdownClassName = TREE_SELECT_DEFAULT_CLASS;
        this.isComposing = false;
        this.isDestroy = true;
        this.isNotFound = false;
        this.focused = false;
        this.inputValue = '';
        this.dropDownPosition = 'bottom';
        this.selectedNodes = [];
        this.expandedKeys = [];
        this.value = [];
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        this.onChange = _value => { };
        this.onTouched = () => { };
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-select');
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-tree-select');
    }
    set nzExpandedKeys(value) {
        this.expandedKeys = value;
    }
    get nzExpandedKeys() {
        return this.expandedKeys;
    }
    get treeTemplate() {
        return this.nzTreeTemplate || this.nzTreeTemplateChild;
    }
    get placeHolderDisplay() {
        return this.inputValue || this.isComposing || this.selectedNodes.length ? 'none' : 'block';
    }
    get isMultiple() {
        return this.nzMultiple || this.nzCheckable;
    }
    ngOnInit() {
        this.isDestroy = false;
        this.subscribeSelectionChange();
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.focusMonitor
            .monitor(this.elementRef, true)
            .pipe(takeUntil(this.destroy$))
            .subscribe(focusOrigin => {
            if (!focusOrigin) {
                this.focused = false;
                this.cdr.markForCheck();
                Promise.resolve().then(() => {
                    this.onTouched();
                });
            }
            else {
                this.focused = true;
                this.cdr.markForCheck();
            }
        });
    }
    ngOnDestroy() {
        this.isDestroy = true;
        this.closeDropDown();
        this.destroy$.next();
        this.destroy$.complete();
    }
    isComposingChange(isComposing) {
        this.isComposing = isComposing;
    }
    setDisabledState(isDisabled) {
        this.nzDisabled = isDisabled;
        this.closeDropDown();
    }
    ngOnChanges(changes) {
        const { nzNodes, nzDropdownClassName } = changes;
        if (nzNodes) {
            this.updateSelectedNodes(true);
        }
        if (nzDropdownClassName) {
            const className = this.nzDropdownClassName && this.nzDropdownClassName.trim();
            this.dropdownClassName = className ? `${TREE_SELECT_DEFAULT_CLASS} ${className}` : TREE_SELECT_DEFAULT_CLASS;
        }
    }
    writeValue(value) {
        if (isNotNil(value)) {
            if (this.isMultiple && Array.isArray(value)) {
                this.value = value;
            }
            else {
                this.value = [value];
            }
            this.updateSelectedNodes(true);
        }
        else {
            this.value = [];
            this.selectedNodes.forEach(node => {
                this.removeSelected(node, false);
            });
            this.selectedNodes = [];
        }
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    onKeydown(event) {
        if (this.nzDisabled) {
            return;
        }
        switch (event.keyCode) {
            case ESCAPE:
                /**
                 * Skip the ESCAPE processing, it will be handled in {@link onOverlayKeyDown}.
                 */
                break;
            case TAB:
                this.closeDropDown();
                break;
            default:
                if (!this.nzOpen) {
                    this.openDropdown();
                }
        }
    }
    trigger() {
        if (this.nzDisabled || (!this.nzDisabled && this.nzOpen)) {
            this.closeDropDown();
        }
        else {
            this.openDropdown();
        }
    }
    openDropdown() {
        if (!this.nzDisabled) {
            this.nzOpen = true;
            this.nzOpenChange.emit(this.nzOpen);
            this.updateCdkConnectedOverlayStatus();
            if (this.nzShowSearch || this.isMultiple) {
                this.focusOnInput();
            }
        }
    }
    closeDropDown() {
        this.onTouched();
        this.nzOpen = false;
        this.inputValue = '';
        this.isNotFound = false;
        this.nzOpenChange.emit(this.nzOpen);
        this.cdr.markForCheck();
    }
    onKeyDownInput(e) {
        const keyCode = e.keyCode;
        const eventTarget = e.target;
        if (this.isMultiple && !eventTarget.value && keyCode === BACKSPACE) {
            e.preventDefault();
            if (this.selectedNodes.length) {
                const removeNode = this.selectedNodes[this.selectedNodes.length - 1];
                this.removeSelected(removeNode);
            }
        }
    }
    onExpandedKeysChange(value) {
        this.nzExpandChange.emit(value);
        this.expandedKeys = [...value.keys];
    }
    setInputValue(value) {
        this.inputValue = value;
        this.updatePosition();
    }
    removeSelected(node, emit = true) {
        node.isSelected = false;
        node.isChecked = false;
        if (this.nzCheckable) {
            this.nzTreeService.conduct(node, this.nzCheckStrictly);
        }
        else {
            this.nzTreeService.setSelectedNodeList(node, this.nzMultiple);
        }
        if (emit) {
            this.nzRemoved.emit(node);
        }
    }
    focusOnInput() {
        if (this.nzSelectSearchComponent) {
            this.nzSelectSearchComponent.focus();
        }
    }
    subscribeSelectionChange() {
        merge(this.nzTreeClick.pipe(tap((event) => {
            const node = event.node;
            if (this.nzCheckable && !node.isDisabled && !node.isDisableCheckbox) {
                node.isChecked = !node.isChecked;
                node.isHalfChecked = false;
                if (!this.nzCheckStrictly) {
                    this.nzTreeService.conduct(node);
                }
            }
            if (this.nzCheckable) {
                node.isSelected = false;
            }
        }), filter((event) => {
            const node = event.node;
            return this.nzCheckable ? !node.isDisabled && !node.isDisableCheckbox : !node.isDisabled && node.isSelectable;
        })), this.nzCheckable ? this.nzTreeCheckBoxChange : observableOf(), this.nzCleared, this.nzRemoved)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.updateSelectedNodes();
            const value = this.selectedNodes.map(node => node.key);
            this.value = [...value];
            if (this.nzShowSearch || this.isMultiple) {
                this.inputValue = '';
                this.isNotFound = false;
            }
            if (this.isMultiple) {
                this.onChange(value);
                this.focusOnInput();
                this.updatePosition();
            }
            else {
                this.closeDropDown();
                this.onChange(value.length ? value[0] : null);
            }
        });
    }
    updateSelectedNodes(init = false) {
        if (init) {
            const nodes = this.coerceTreeNodes(this.nzNodes);
            this.nzTreeService.isMultiple = this.isMultiple;
            this.nzTreeService.isCheckStrictly = this.nzCheckStrictly;
            this.nzTreeService.initTree(nodes);
            if (this.nzCheckable) {
                this.nzTreeService.conductCheck(this.value, this.nzCheckStrictly);
            }
            else {
                this.nzTreeService.conductSelectedKeys(this.value, this.isMultiple);
            }
        }
        this.selectedNodes = [...(this.nzCheckable ? this.getCheckedNodeList() : this.getSelectedNodeList())];
    }
    updatePosition() {
        reqAnimFrame(() => {
            this.cdkConnectedOverlay?.overlayRef?.updatePosition();
        });
    }
    onPositionChange(position) {
        this.dropDownPosition = position.connectionPair.originY;
    }
    onClearSelection() {
        this.selectedNodes.forEach(node => {
            this.removeSelected(node, false);
        });
        this.nzCleared.emit();
    }
    onClickOutside(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.closeDropDown();
        }
    }
    setSearchValues($event) {
        Promise.resolve().then(() => {
            this.isNotFound = (this.nzShowSearch || this.isMultiple) && !!this.inputValue && $event.matchedKeys.length === 0;
        });
    }
    updateCdkConnectedOverlayStatus() {
        this.triggerWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
    }
    trackValue(_index, option) {
        return option.key;
    }
}
NzTreeSelectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeSelectComponent, deps: [{ token: i1.NzTreeSelectService }, { token: i2.NzConfigService }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i3.Directionality, optional: true }, { token: i4.FocusMonitor }, { token: i5.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTreeSelectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeSelectComponent, selector: "nz-tree-select", inputs: { nzId: "nzId", nzAllowClear: "nzAllowClear", nzShowExpand: "nzShowExpand", nzShowLine: "nzShowLine", nzDropdownMatchSelectWidth: "nzDropdownMatchSelectWidth", nzCheckable: "nzCheckable", nzHideUnMatched: "nzHideUnMatched", nzShowIcon: "nzShowIcon", nzShowSearch: "nzShowSearch", nzDisabled: "nzDisabled", nzAsyncData: "nzAsyncData", nzMultiple: "nzMultiple", nzDefaultExpandAll: "nzDefaultExpandAll", nzCheckStrictly: "nzCheckStrictly", nzVirtualItemSize: "nzVirtualItemSize", nzVirtualMaxBufferPx: "nzVirtualMaxBufferPx", nzVirtualMinBufferPx: "nzVirtualMinBufferPx", nzVirtualHeight: "nzVirtualHeight", nzExpandedIcon: "nzExpandedIcon", nzNotFoundContent: "nzNotFoundContent", nzNodes: "nzNodes", nzOpen: "nzOpen", nzSize: "nzSize", nzPlaceHolder: "nzPlaceHolder", nzDropdownStyle: "nzDropdownStyle", nzDropdownClassName: "nzDropdownClassName", nzBackdrop: "nzBackdrop", nzExpandedKeys: "nzExpandedKeys", nzDisplayWith: "nzDisplayWith", nzMaxTagCount: "nzMaxTagCount", nzMaxTagPlaceholder: "nzMaxTagPlaceholder", nzTreeTemplate: "nzTreeTemplate" }, outputs: { nzOpenChange: "nzOpenChange", nzCleared: "nzCleared", nzRemoved: "nzRemoved", nzExpandChange: "nzExpandChange", nzTreeClick: "nzTreeClick", nzTreeCheckBoxChange: "nzTreeCheckBoxChange" }, host: { listeners: { "click": "trigger()", "keydown": "onKeydown($event)" }, properties: { "class.ant-select-lg": "nzSize===\"large\"", "class.ant-select-rtl": "dir===\"rtl\"", "class.ant-select-sm": "nzSize===\"small\"", "class.ant-select-disabled": "nzDisabled", "class.ant-select-single": "!isMultiple", "class.ant-select-show-arrow": "!isMultiple", "class.ant-select-show-search": "!isMultiple", "class.ant-select-multiple": "isMultiple", "class.ant-select-allow-clear": "nzAllowClear", "class.ant-select-open": "nzOpen", "class.ant-select-focused": "nzOpen || focused" }, classAttribute: "ant-select" }, providers: [
        NzTreeSelectService,
        {
            provide: NzTreeHigherOrderServiceToken,
            useFactory: higherOrderServiceFactory,
            deps: [[new Self(), Injector]]
        },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NzTreeSelectComponent),
            multi: true
        }
    ], queries: [{ propertyName: "nzTreeTemplateChild", first: true, predicate: ["nzTreeTemplate"], descendants: true, static: true }], viewQueries: [{ propertyName: "nzSelectSearchComponent", first: true, predicate: NzSelectSearchComponent, descendants: true }, { propertyName: "treeRef", first: true, predicate: ["treeRef"], descendants: true }, { propertyName: "cdkOverlayOrigin", first: true, predicate: CdkOverlayOrigin, descendants: true, static: true }, { propertyName: "cdkConnectedOverlay", first: true, predicate: CdkConnectedOverlay, descendants: true }], exportAs: ["nzTreeSelect"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="cdkOverlayOrigin"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-select-tree-dropdown'"
      [cdkConnectedOverlayMinWidth]="$any(nzDropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(nzDropdownMatchSelectWidth ? triggerWidth : null)"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="closeDropDown()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        [@slideMotion]="'enter'"
        [ngClass]="dropdownClassName"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [class.ant-select-dropdown-placement-bottomLeft]="dropDownPosition === 'bottom'"
        [class.ant-select-dropdown-placement-topLeft]="dropDownPosition === 'top'"
        [class.ant-tree-select-dropdown-rtl]="dir === 'rtl'"
        [dir]="dir"
        [ngStyle]="nzDropdownStyle"
      >
        <nz-tree
          #treeRef
          [hidden]="isNotFound"
          nzNoAnimation
          nzSelectMode
          nzBlockNode
          [nzData]="nzNodes"
          [nzMultiple]="nzMultiple"
          [nzSearchValue]="inputValue"
          [nzHideUnMatched]="nzHideUnMatched"
          [nzShowIcon]="nzShowIcon"
          [nzCheckable]="nzCheckable"
          [nzAsyncData]="nzAsyncData"
          [nzShowExpand]="nzShowExpand"
          [nzShowLine]="nzShowLine"
          [nzExpandedIcon]="nzExpandedIcon"
          [nzExpandAll]="nzDefaultExpandAll"
          [nzExpandedKeys]="expandedKeys"
          [nzCheckedKeys]="nzCheckable ? value : []"
          [nzSelectedKeys]="!nzCheckable ? value : []"
          [nzTreeTemplate]="treeTemplate"
          [nzCheckStrictly]="nzCheckStrictly"
          [nzVirtualItemSize]="nzVirtualItemSize"
          [nzVirtualMaxBufferPx]="nzVirtualMaxBufferPx"
          [nzVirtualMinBufferPx]="nzVirtualMinBufferPx"
          [nzVirtualHeight]="nzVirtualHeight"
          (nzExpandChange)="onExpandedKeysChange($event)"
          (nzClick)="nzTreeClick.emit($event)"
          (nzCheckedKeysChange)="updateSelectedNodes()"
          (nzSelectedKeysChange)="updateSelectedNodes()"
          (nzCheckBoxChange)="nzTreeCheckBoxChange.emit($event)"
          (nzSearchValueChange)="setSearchValues($event)"
        ></nz-tree>
        <span *ngIf="nzNodes.length === 0 || isNotFound" class="ant-select-not-found">
          <nz-embed-empty [nzComponentName]="'tree-select'" [specificContent]="nzNotFoundContent"></nz-embed-empty>
        </span>
      </div>
    </ng-template>

    <div cdkOverlayOrigin class="ant-select-selector">
      <ng-container *ngIf="isMultiple">
        <nz-select-item
          *ngFor="let node of selectedNodes | slice: 0:nzMaxTagCount; trackBy: trackValue"
          [deletable]="true"
          [disabled]="node.isDisabled || nzDisabled"
          [label]="nzDisplayWith(node)"
          (delete)="removeSelected(node, true)"
        ></nz-select-item>

        <nz-select-item
          *ngIf="selectedNodes.length > nzMaxTagCount"
          [contentTemplateOutlet]="nzMaxTagPlaceholder"
          [contentTemplateOutletContext]="selectedNodes | slice: nzMaxTagCount"
          [deletable]="false"
          [disabled]="false"
          [label]="'+ ' + (selectedNodes.length - nzMaxTagCount) + ' ...'"
        ></nz-select-item>
      </ng-container>

      <nz-select-search
        [nzId]="nzId"
        [showInput]="nzShowSearch"
        (keydown)="onKeyDownInput($event)"
        (isComposingChange)="isComposing = $event"
        (valueChange)="setInputValue($event)"
        [value]="inputValue"
        [mirrorSync]="isMultiple"
        [disabled]="nzDisabled"
        [focusTrigger]="nzOpen"
      ></nz-select-search>

      <nz-select-placeholder
        *ngIf="nzPlaceHolder && selectedNodes.length === 0"
        [placeholder]="nzPlaceHolder"
        [style.display]="placeHolderDisplay"
      ></nz-select-placeholder>

      <nz-select-item
        *ngIf="!isMultiple && selectedNodes.length === 1 && !isComposing && inputValue === ''"
        [deletable]="false"
        [disabled]="false"
        [label]="nzDisplayWith(selectedNodes[0])"
      ></nz-select-item>

      <nz-select-arrow *ngIf="!isMultiple"></nz-select-arrow>

      <nz-select-clear
        *ngIf="nzAllowClear && !nzDisabled && selectedNodes.length"
        (clear)="onClearSelection()"
      ></nz-select-clear>
    </div>
  `, isInline: true, components: [{ type: i6.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckBoxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }, { type: i7.NzEmbedEmptyComponent, selector: "nz-embed-empty", inputs: ["nzComponentName", "specificContent"], exportAs: ["nzEmbedEmpty"] }, { type: i8.NzSelectItemComponent, selector: "nz-select-item", inputs: ["disabled", "label", "deletable", "removeIcon", "contentTemplateOutletContext", "contentTemplateOutlet"], outputs: ["delete"] }, { type: i8.NzSelectSearchComponent, selector: "nz-select-search", inputs: ["nzId", "disabled", "mirrorSync", "showInput", "focusTrigger", "value", "autofocus"], outputs: ["valueChange", "isComposingChange"] }, { type: i8.NzSelectPlaceholderComponent, selector: "nz-select-placeholder", inputs: ["placeholder"] }, { type: i8.NzSelectArrowComponent, selector: "nz-select-arrow", inputs: ["loading", "search", "suffixIcon"] }, { type: i8.NzSelectClearComponent, selector: "nz-select-clear", inputs: ["clearIcon"], outputs: ["clear"] }], directives: [{ type: i9.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { type: i10.NzConnectedOverlayDirective, selector: "[cdkConnectedOverlay][nzConnectedOverlay]", inputs: ["nzArrowPointAtCenter"], exportAs: ["nzConnectedOverlay"] }, { type: i11.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }, { type: i3.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { type: i11.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i11.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i9.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { type: i11.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "slice": i11.SlicePipe }, animations: [slideMotion] });
__decorate([
    InputBoolean()
], NzTreeSelectComponent.prototype, "nzAllowClear", void 0);
__decorate([
    InputBoolean()
], NzTreeSelectComponent.prototype, "nzShowExpand", void 0);
__decorate([
    InputBoolean()
], NzTreeSelectComponent.prototype, "nzShowLine", void 0);
__decorate([
    InputBoolean(),
    WithConfig()
], NzTreeSelectComponent.prototype, "nzDropdownMatchSelectWidth", void 0);
__decorate([
    InputBoolean()
], NzTreeSelectComponent.prototype, "nzCheckable", void 0);
__decorate([
    InputBoolean(),
    WithConfig()
], NzTreeSelectComponent.prototype, "nzHideUnMatched", void 0);
__decorate([
    InputBoolean(),
    WithConfig()
], NzTreeSelectComponent.prototype, "nzShowIcon", void 0);
__decorate([
    InputBoolean()
], NzTreeSelectComponent.prototype, "nzShowSearch", void 0);
__decorate([
    InputBoolean()
], NzTreeSelectComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzTreeSelectComponent.prototype, "nzAsyncData", void 0);
__decorate([
    InputBoolean()
], NzTreeSelectComponent.prototype, "nzMultiple", void 0);
__decorate([
    InputBoolean()
], NzTreeSelectComponent.prototype, "nzDefaultExpandAll", void 0);
__decorate([
    InputBoolean()
], NzTreeSelectComponent.prototype, "nzCheckStrictly", void 0);
__decorate([
    WithConfig()
], NzTreeSelectComponent.prototype, "nzSize", void 0);
__decorate([
    WithConfig()
], NzTreeSelectComponent.prototype, "nzBackdrop", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeSelectComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-select',
                    exportAs: 'nzTreeSelect',
                    animations: [slideMotion],
                    template: `
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="cdkOverlayOrigin"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-select-tree-dropdown'"
      [cdkConnectedOverlayMinWidth]="$any(nzDropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(nzDropdownMatchSelectWidth ? triggerWidth : null)"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="closeDropDown()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        [@slideMotion]="'enter'"
        [ngClass]="dropdownClassName"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [class.ant-select-dropdown-placement-bottomLeft]="dropDownPosition === 'bottom'"
        [class.ant-select-dropdown-placement-topLeft]="dropDownPosition === 'top'"
        [class.ant-tree-select-dropdown-rtl]="dir === 'rtl'"
        [dir]="dir"
        [ngStyle]="nzDropdownStyle"
      >
        <nz-tree
          #treeRef
          [hidden]="isNotFound"
          nzNoAnimation
          nzSelectMode
          nzBlockNode
          [nzData]="nzNodes"
          [nzMultiple]="nzMultiple"
          [nzSearchValue]="inputValue"
          [nzHideUnMatched]="nzHideUnMatched"
          [nzShowIcon]="nzShowIcon"
          [nzCheckable]="nzCheckable"
          [nzAsyncData]="nzAsyncData"
          [nzShowExpand]="nzShowExpand"
          [nzShowLine]="nzShowLine"
          [nzExpandedIcon]="nzExpandedIcon"
          [nzExpandAll]="nzDefaultExpandAll"
          [nzExpandedKeys]="expandedKeys"
          [nzCheckedKeys]="nzCheckable ? value : []"
          [nzSelectedKeys]="!nzCheckable ? value : []"
          [nzTreeTemplate]="treeTemplate"
          [nzCheckStrictly]="nzCheckStrictly"
          [nzVirtualItemSize]="nzVirtualItemSize"
          [nzVirtualMaxBufferPx]="nzVirtualMaxBufferPx"
          [nzVirtualMinBufferPx]="nzVirtualMinBufferPx"
          [nzVirtualHeight]="nzVirtualHeight"
          (nzExpandChange)="onExpandedKeysChange($event)"
          (nzClick)="nzTreeClick.emit($event)"
          (nzCheckedKeysChange)="updateSelectedNodes()"
          (nzSelectedKeysChange)="updateSelectedNodes()"
          (nzCheckBoxChange)="nzTreeCheckBoxChange.emit($event)"
          (nzSearchValueChange)="setSearchValues($event)"
        ></nz-tree>
        <span *ngIf="nzNodes.length === 0 || isNotFound" class="ant-select-not-found">
          <nz-embed-empty [nzComponentName]="'tree-select'" [specificContent]="nzNotFoundContent"></nz-embed-empty>
        </span>
      </div>
    </ng-template>

    <div cdkOverlayOrigin class="ant-select-selector">
      <ng-container *ngIf="isMultiple">
        <nz-select-item
          *ngFor="let node of selectedNodes | slice: 0:nzMaxTagCount; trackBy: trackValue"
          [deletable]="true"
          [disabled]="node.isDisabled || nzDisabled"
          [label]="nzDisplayWith(node)"
          (delete)="removeSelected(node, true)"
        ></nz-select-item>

        <nz-select-item
          *ngIf="selectedNodes.length > nzMaxTagCount"
          [contentTemplateOutlet]="nzMaxTagPlaceholder"
          [contentTemplateOutletContext]="selectedNodes | slice: nzMaxTagCount"
          [deletable]="false"
          [disabled]="false"
          [label]="'+ ' + (selectedNodes.length - nzMaxTagCount) + ' ...'"
        ></nz-select-item>
      </ng-container>

      <nz-select-search
        [nzId]="nzId"
        [showInput]="nzShowSearch"
        (keydown)="onKeyDownInput($event)"
        (isComposingChange)="isComposing = $event"
        (valueChange)="setInputValue($event)"
        [value]="inputValue"
        [mirrorSync]="isMultiple"
        [disabled]="nzDisabled"
        [focusTrigger]="nzOpen"
      ></nz-select-search>

      <nz-select-placeholder
        *ngIf="nzPlaceHolder && selectedNodes.length === 0"
        [placeholder]="nzPlaceHolder"
        [style.display]="placeHolderDisplay"
      ></nz-select-placeholder>

      <nz-select-item
        *ngIf="!isMultiple && selectedNodes.length === 1 && !isComposing && inputValue === ''"
        [deletable]="false"
        [disabled]="false"
        [label]="nzDisplayWith(selectedNodes[0])"
      ></nz-select-item>

      <nz-select-arrow *ngIf="!isMultiple"></nz-select-arrow>

      <nz-select-clear
        *ngIf="nzAllowClear && !nzDisabled && selectedNodes.length"
        (clear)="onClearSelection()"
      ></nz-select-clear>
    </div>
  `,
                    providers: [
                        NzTreeSelectService,
                        {
                            provide: NzTreeHigherOrderServiceToken,
                            useFactory: higherOrderServiceFactory,
                            deps: [[new Self(), Injector]]
                        },
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzTreeSelectComponent),
                            multi: true
                        }
                    ],
                    host: {
                        class: 'ant-select',
                        '[class.ant-select-lg]': 'nzSize==="large"',
                        '[class.ant-select-rtl]': 'dir==="rtl"',
                        '[class.ant-select-sm]': 'nzSize==="small"',
                        '[class.ant-select-disabled]': 'nzDisabled',
                        '[class.ant-select-single]': '!isMultiple',
                        '[class.ant-select-show-arrow]': '!isMultiple',
                        '[class.ant-select-show-search]': '!isMultiple',
                        '[class.ant-select-multiple]': 'isMultiple',
                        '[class.ant-select-allow-clear]': 'nzAllowClear',
                        '[class.ant-select-open]': 'nzOpen',
                        '[class.ant-select-focused]': 'nzOpen || focused',
                        '(click)': 'trigger()',
                        '(keydown)': 'onKeydown($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzTreeSelectService }, { type: i2.NzConfigService }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i4.FocusMonitor }, { type: i5.NzNoAnimationDirective, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }]; }, propDecorators: { nzId: [{
                type: Input
            }], nzAllowClear: [{
                type: Input
            }], nzShowExpand: [{
                type: Input
            }], nzShowLine: [{
                type: Input
            }], nzDropdownMatchSelectWidth: [{
                type: Input
            }], nzCheckable: [{
                type: Input
            }], nzHideUnMatched: [{
                type: Input
            }], nzShowIcon: [{
                type: Input
            }], nzShowSearch: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzAsyncData: [{
                type: Input
            }], nzMultiple: [{
                type: Input
            }], nzDefaultExpandAll: [{
                type: Input
            }], nzCheckStrictly: [{
                type: Input
            }], nzVirtualItemSize: [{
                type: Input
            }], nzVirtualMaxBufferPx: [{
                type: Input
            }], nzVirtualMinBufferPx: [{
                type: Input
            }], nzVirtualHeight: [{
                type: Input
            }], nzExpandedIcon: [{
                type: Input
            }], nzNotFoundContent: [{
                type: Input
            }], nzNodes: [{
                type: Input
            }], nzOpen: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzPlaceHolder: [{
                type: Input
            }], nzDropdownStyle: [{
                type: Input
            }], nzDropdownClassName: [{
                type: Input
            }], nzBackdrop: [{
                type: Input
            }], nzExpandedKeys: [{
                type: Input
            }], nzDisplayWith: [{
                type: Input
            }], nzMaxTagCount: [{
                type: Input
            }], nzMaxTagPlaceholder: [{
                type: Input
            }], nzOpenChange: [{
                type: Output
            }], nzCleared: [{
                type: Output
            }], nzRemoved: [{
                type: Output
            }], nzExpandChange: [{
                type: Output
            }], nzTreeClick: [{
                type: Output
            }], nzTreeCheckBoxChange: [{
                type: Output
            }], nzSelectSearchComponent: [{
                type: ViewChild,
                args: [NzSelectSearchComponent, { static: false }]
            }], treeRef: [{
                type: ViewChild,
                args: ['treeRef', { static: false }]
            }], cdkOverlayOrigin: [{
                type: ViewChild,
                args: [CdkOverlayOrigin, { static: true }]
            }], cdkConnectedOverlay: [{
                type: ViewChild,
                args: [CdkConnectedOverlay, { static: false }]
            }], nzTreeTemplate: [{
                type: Input
            }], nzTreeTemplateChild: [{
                type: ContentChild,
                args: ['nzTreeTemplate', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlLXNlbGVjdC90cmVlLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBa0MsTUFBTSxzQkFBc0IsQ0FBQztBQUM3RyxPQUFPLEVBRUwsU0FBUyxFQUNULFlBQVksRUFFWixZQUFZLEVBQ1osVUFBVSxFQUNWLElBQUksRUFDSixRQUFRLEVBQ1IsS0FBSyxFQUlMLFFBQVEsRUFDUixNQUFNLEVBRU4sSUFBSSxFQUdKLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFnQyxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUVMLFVBQVUsRUFFViw2QkFBNkIsRUFHOUIsTUFBTSx5QkFBeUIsQ0FBQztBQUVqQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7Ozs7Ozs7O0FBRTVELE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxRQUFrQjtJQUMxRCxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUQsTUFBTSxxQkFBcUIsR0FBZ0IsWUFBWSxDQUFDO0FBQ3hELE1BQU0seUJBQXlCLEdBQUcsOENBQThDLENBQUM7QUF5SmpGLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxVQUFVO0lBc0duRCxZQUNFLGFBQWtDLEVBQzNCLGVBQWdDLEVBQy9CLFFBQW1CLEVBQ25CLEdBQXNCLEVBQ3RCLFVBQXNCLEVBQ1YsY0FBOEIsRUFDMUMsWUFBMEIsRUFDUCxXQUFvQztRQUUvRCxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFSZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzFDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ1AsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBN0d4RCxrQkFBYSxHQUFnQixxQkFBcUIsQ0FBQztRQWdCbkQsU0FBSSxHQUFrQixJQUFJLENBQUM7UUFDWCxpQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQ2QsK0JBQTBCLEdBQVksSUFBSSxDQUFDO1FBQ3pELGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQ2Ysb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUMxQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUN2Qix5QkFBb0IsR0FBRyxHQUFHLENBQUM7UUFDM0IseUJBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQzFCLG9CQUFlLEdBQWtCLElBQUksQ0FBQztRQUd0QyxZQUFPLEdBQTBDLEVBQUUsQ0FBQztRQUNwRCxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ0QsV0FBTSxHQUFrQixTQUFTLENBQUM7UUFDaEQsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsb0JBQWUsR0FBNEIsSUFBSSxDQUFDO1FBRWxDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFTakMsa0JBQWEsR0FBNkMsQ0FBQyxJQUFnQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRTNGLHdCQUFtQixHQUFvRCxJQUFJLENBQUM7UUFDbEUsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQzNDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3JDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQzNDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDdkQsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUNwRCx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQWdCaEYsc0JBQWlCLEdBQUcseUJBQXlCLENBQUM7UUFFOUMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixxQkFBZ0IsR0FBZ0MsUUFBUSxDQUFDO1FBQ3pELGtCQUFhLEdBQWlCLEVBQUUsQ0FBQztRQUNqQyxpQkFBWSxHQUFhLEVBQUUsQ0FBQztRQUM1QixVQUFLLEdBQWEsRUFBRSxDQUFDO1FBQ3JCLFFBQUcsR0FBYyxLQUFLLENBQUM7UUFFZixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUV2QyxhQUFRLEdBQWlCLE1BQU0sQ0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ3RDLGNBQVMsR0FBa0IsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBc0JsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUF4RUQsSUFDSSxjQUFjLENBQUMsS0FBZTtRQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBc0JELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDekQsQ0FBQztJQW9CRCxJQUFJLGtCQUFrQjtRQUNwQixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDN0YsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzdDLENBQUM7SUFrQkQsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBRWhDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFO1lBQzVGLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO1FBRXJDLElBQUksQ0FBQyxZQUFZO2FBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO2FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN6QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxXQUFvQjtRQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNqQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNqRCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztRQUNELElBQUksbUJBQW1CLEVBQUU7WUFDdkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM5RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLHlCQUF5QixJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQztTQUM5RztJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsS0FBd0I7UUFDakMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkIsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2FBQ3BCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFlLENBQUMsQ0FBQzthQUNoQztZQUNELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7U0FDekI7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUF5QztRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBYztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQW9CO1FBQzVCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixPQUFPO1NBQ1I7UUFDRCxRQUFRLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDckIsS0FBSyxNQUFNO2dCQUNUOzttQkFFRztnQkFDSCxNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDckIsTUFBTTtZQUNSO2dCQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNoQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3JCO1NBQ0o7SUFDSCxDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDeEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQztZQUN2QyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3JCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsY0FBYyxDQUFDLENBQWdCO1FBQzdCLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDMUIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLE1BQTBCLENBQUM7UUFDakQsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ2xFLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO2dCQUM3QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsS0FBd0I7UUFDM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBYTtRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUFnQixFQUFFLE9BQWdCLElBQUk7UUFDbkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDeEQ7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMvRDtRQUVELElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7SUFFRCx3QkFBd0I7UUFDdEIsS0FBSyxDQUNILElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUNuQixHQUFHLENBQUMsQ0FBQyxLQUF3QixFQUFFLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUssQ0FBQztZQUN6QixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUNuRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO29CQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEM7YUFDRjtZQUNELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsRUFDRixNQUFNLENBQUMsQ0FBQyxLQUF3QixFQUFFLEVBQUU7WUFDbEMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUssQ0FBQztZQUN6QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDaEgsQ0FBQyxDQUFDLENBQ0gsRUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUM3RCxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxTQUFTLENBQ2Y7YUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDM0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBSSxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzthQUN6QjtZQUNELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNwQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0M7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxPQUFnQixLQUFLO1FBQ3ZDLElBQUksSUFBSSxFQUFFO1lBQ1IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQzFELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDbkU7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNyRTtTQUNGO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hHLENBQUM7SUFFRCxjQUFjO1FBQ1osWUFBWSxDQUFDLEdBQUcsRUFBRTtZQUNoQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdCQUFnQixDQUFDLFFBQXdDO1FBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztJQUMxRCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxjQUFjLENBQUMsS0FBaUI7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVELGVBQWUsQ0FBQyxNQUF5QjtRQUN2QyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFdBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1FBQ3BILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELCtCQUErQjtRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ25HLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBYyxFQUFFLE1BQWtCO1FBQzNDLE9BQU8sTUFBTSxDQUFDLEdBQUksQ0FBQztJQUNyQixDQUFDOztrSEFoWVUscUJBQXFCO3NHQUFyQixxQkFBcUIscTNEQTlCckI7UUFDVCxtQkFBbUI7UUFDbkI7WUFDRSxPQUFPLEVBQUUsNkJBQTZCO1lBQ3RDLFVBQVUsRUFBRSx5QkFBeUI7WUFDckMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQy9CO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUM7WUFDcEQsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLG9OQWdGVSx1QkFBdUIsd0tBRXZCLGdCQUFnQixvR0FDaEIsbUJBQW1CLHdIQXBOcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0hULGcvR0FySFcsQ0FBQyxXQUFXLENBQUM7QUFzS0E7SUFBZixZQUFZLEVBQUU7MkRBQThCO0FBQzdCO0lBQWYsWUFBWSxFQUFFOzJEQUE4QjtBQUM3QjtJQUFmLFlBQVksRUFBRTt5REFBNkI7QUFDZDtJQUE3QixZQUFZLEVBQUU7SUFBRSxVQUFVLEVBQUU7eUVBQTRDO0FBQ3pEO0lBQWYsWUFBWSxFQUFFOzBEQUE4QjtBQUNmO0lBQTdCLFlBQVksRUFBRTtJQUFFLFVBQVUsRUFBRTs4REFBa0M7QUFDakM7SUFBN0IsWUFBWSxFQUFFO0lBQUUsVUFBVSxFQUFFO3lEQUE2QjtBQUMxQztJQUFmLFlBQVksRUFBRTsyREFBK0I7QUFDOUI7SUFBZixZQUFZLEVBQUU7eURBQW9CO0FBQ25CO0lBQWYsWUFBWSxFQUFFOzBEQUFxQjtBQUNwQjtJQUFmLFlBQVksRUFBRTt5REFBb0I7QUFDbkI7SUFBZixZQUFZLEVBQUU7aUVBQTRCO0FBQzNCO0lBQWYsWUFBWSxFQUFFOzhEQUF5QjtBQVMxQjtJQUFiLFVBQVUsRUFBRTtxREFBbUM7QUFJbEM7SUFBYixVQUFVLEVBQUU7eURBQW9COzJGQTNDL0IscUJBQXFCO2tCQXZKakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsY0FBYztvQkFDeEIsVUFBVSxFQUFFLENBQUMsV0FBVyxDQUFDO29CQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0hUO29CQUNELFNBQVMsRUFBRTt3QkFDVCxtQkFBbUI7d0JBQ25COzRCQUNFLE9BQU8sRUFBRSw2QkFBNkI7NEJBQ3RDLFVBQVUsRUFBRSx5QkFBeUI7NEJBQ3JDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQzt5QkFDL0I7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLENBQUM7NEJBQ3BELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsWUFBWTt3QkFDbkIsdUJBQXVCLEVBQUUsa0JBQWtCO3dCQUMzQyx3QkFBd0IsRUFBRSxhQUFhO3dCQUN2Qyx1QkFBdUIsRUFBRSxrQkFBa0I7d0JBQzNDLDZCQUE2QixFQUFFLFlBQVk7d0JBQzNDLDJCQUEyQixFQUFFLGFBQWE7d0JBQzFDLCtCQUErQixFQUFFLGFBQWE7d0JBQzlDLGdDQUFnQyxFQUFFLGFBQWE7d0JBQy9DLDZCQUE2QixFQUFFLFlBQVk7d0JBQzNDLGdDQUFnQyxFQUFFLGNBQWM7d0JBQ2hELHlCQUF5QixFQUFFLFFBQVE7d0JBQ25DLDRCQUE0QixFQUFFLG1CQUFtQjt3QkFDakQsU0FBUyxFQUFFLFdBQVc7d0JBQ3RCLFdBQVcsRUFBRSxtQkFBbUI7cUJBQ2pDO2lCQUNGOzswQkE2R0ksUUFBUTs7MEJBRVIsSUFBSTs7MEJBQUksUUFBUTs0Q0E3RlYsSUFBSTtzQkFBWixLQUFLO2dCQUNtQixZQUFZO3NCQUFwQyxLQUFLO2dCQUNtQixZQUFZO3NCQUFwQyxLQUFLO2dCQUNtQixVQUFVO3NCQUFsQyxLQUFLO2dCQUNpQywwQkFBMEI7c0JBQWhFLEtBQUs7Z0JBQ21CLFdBQVc7c0JBQW5DLEtBQUs7Z0JBQ2lDLGVBQWU7c0JBQXJELEtBQUs7Z0JBQ2lDLFVBQVU7c0JBQWhELEtBQUs7Z0JBQ21CLFlBQVk7c0JBQXBDLEtBQUs7Z0JBQ21CLFVBQVU7c0JBQWxDLEtBQUs7Z0JBQ21CLFdBQVc7c0JBQW5DLEtBQUs7Z0JBQ21CLFVBQVU7c0JBQWxDLEtBQUs7Z0JBQ21CLGtCQUFrQjtzQkFBMUMsS0FBSztnQkFDbUIsZUFBZTtzQkFBdkMsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ2lCLE1BQU07c0JBQTVCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDaUIsVUFBVTtzQkFBaEMsS0FBSztnQkFFRixjQUFjO3NCQURqQixLQUFLO2dCQVFHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBQ2EsWUFBWTtzQkFBOUIsTUFBTTtnQkFDWSxTQUFTO3NCQUEzQixNQUFNO2dCQUNZLFNBQVM7c0JBQTNCLE1BQU07Z0JBQ1ksY0FBYztzQkFBaEMsTUFBTTtnQkFDWSxXQUFXO3NCQUE3QixNQUFNO2dCQUNZLG9CQUFvQjtzQkFBdEMsTUFBTTtnQkFFZ0QsdUJBQXVCO3NCQUE3RSxTQUFTO3VCQUFDLHVCQUF1QixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFDWixPQUFPO3NCQUEvQyxTQUFTO3VCQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBQ1EsZ0JBQWdCO3NCQUE5RCxTQUFTO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDTSxtQkFBbUI7c0JBQXJFLFNBQVM7dUJBQUMsbUJBQW1CLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUV4QyxjQUFjO3NCQUF0QixLQUFLO2dCQUM0QyxtQkFBbUI7c0JBQXBFLFlBQVk7dUJBQUMsZ0JBQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IEJBQ0tTUEFDRSwgRVNDQVBFLCBUQUIgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgQ2RrQ29ubmVjdGVkT3ZlcmxheSwgQ2RrT3ZlcmxheU9yaWdpbiwgQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTZWxmLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgbWVyZ2UsIG9mIGFzIG9ic2VydmFibGVPZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgc2xpZGVNb3Rpb24gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvYW5pbWF0aW9uJztcbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IE56Tm9BbmltYXRpb25EaXJlY3RpdmUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcbmltcG9ydCB7IHJlcUFuaW1GcmFtZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9wb2x5ZmlsbCc7XG5pbXBvcnQge1xuICBOekZvcm1hdEVtaXRFdmVudCxcbiAgTnpUcmVlQmFzZSxcbiAgTnpUcmVlQmFzZVNlcnZpY2UsXG4gIE56VHJlZUhpZ2hlck9yZGVyU2VydmljZVRva2VuLFxuICBOelRyZWVOb2RlLFxuICBOelRyZWVOb2RlT3B0aW9uc1xufSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHJlZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE5nU3R5bGVJbnRlcmZhY2UsIE56U2l6ZUxEU1R5cGUsIE9uQ2hhbmdlVHlwZSwgT25Ub3VjaGVkVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIGlzTm90TmlsIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgTnpTZWxlY3RTZWFyY2hDb21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkL3NlbGVjdCc7XG5pbXBvcnQgeyBOelRyZWVDb21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkL3RyZWUnO1xuXG5pbXBvcnQgeyBOelRyZWVTZWxlY3RTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLXNlbGVjdC5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGhpZ2hlck9yZGVyU2VydmljZUZhY3RvcnkoaW5qZWN0b3I6IEluamVjdG9yKTogTnpUcmVlQmFzZVNlcnZpY2Uge1xuICByZXR1cm4gaW5qZWN0b3IuZ2V0KE56VHJlZVNlbGVjdFNlcnZpY2UpO1xufVxuXG5jb25zdCBOWl9DT05GSUdfTU9EVUxFX05BTUU6IE56Q29uZmlnS2V5ID0gJ3RyZWVTZWxlY3QnO1xuY29uc3QgVFJFRV9TRUxFQ1RfREVGQVVMVF9DTEFTUyA9ICdhbnQtc2VsZWN0LWRyb3Bkb3duIGFudC1zZWxlY3QtdHJlZS1kcm9wZG93bic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRyZWUtc2VsZWN0JyxcbiAgZXhwb3J0QXM6ICduelRyZWVTZWxlY3QnLFxuICBhbmltYXRpb25zOiBbc2xpZGVNb3Rpb25dLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxuICAgICAgbnpDb25uZWN0ZWRPdmVybGF5XG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheUhhc0JhY2tkcm9wXT1cIm56QmFja2Ryb3BcIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwiY2RrT3ZlcmxheU9yaWdpblwiXG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwibnpPcGVuXCJcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5VHJhbnNmb3JtT3JpZ2luT25dPVwiJy5hbnQtc2VsZWN0LXRyZWUtZHJvcGRvd24nXCJcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5TWluV2lkdGhdPVwiJGFueShuekRyb3Bkb3duTWF0Y2hTZWxlY3RXaWR0aCA/IG51bGwgOiB0cmlnZ2VyV2lkdGgpXCJcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5V2lkdGhdPVwiJGFueShuekRyb3Bkb3duTWF0Y2hTZWxlY3RXaWR0aCA/IHRyaWdnZXJXaWR0aCA6IG51bGwpXCJcbiAgICAgIChvdmVybGF5T3V0c2lkZUNsaWNrKT1cIm9uQ2xpY2tPdXRzaWRlKCRldmVudClcIlxuICAgICAgKGRldGFjaCk9XCJjbG9zZURyb3BEb3duKClcIlxuICAgICAgKHBvc2l0aW9uQ2hhbmdlKT1cIm9uUG9zaXRpb25DaGFuZ2UoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBbQHNsaWRlTW90aW9uXT1cIidlbnRlcidcIlxuICAgICAgICBbbmdDbGFzc109XCJkcm9wZG93bkNsYXNzTmFtZVwiXG4gICAgICAgIFtALmRpc2FibGVkXT1cIm5vQW5pbWF0aW9uPy5uek5vQW5pbWF0aW9uXCJcbiAgICAgICAgW256Tm9BbmltYXRpb25dPVwibm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb25cIlxuICAgICAgICBbY2xhc3MuYW50LXNlbGVjdC1kcm9wZG93bi1wbGFjZW1lbnQtYm90dG9tTGVmdF09XCJkcm9wRG93blBvc2l0aW9uID09PSAnYm90dG9tJ1wiXG4gICAgICAgIFtjbGFzcy5hbnQtc2VsZWN0LWRyb3Bkb3duLXBsYWNlbWVudC10b3BMZWZ0XT1cImRyb3BEb3duUG9zaXRpb24gPT09ICd0b3AnXCJcbiAgICAgICAgW2NsYXNzLmFudC10cmVlLXNlbGVjdC1kcm9wZG93bi1ydGxdPVwiZGlyID09PSAncnRsJ1wiXG4gICAgICAgIFtkaXJdPVwiZGlyXCJcbiAgICAgICAgW25nU3R5bGVdPVwibnpEcm9wZG93blN0eWxlXCJcbiAgICAgID5cbiAgICAgICAgPG56LXRyZWVcbiAgICAgICAgICAjdHJlZVJlZlxuICAgICAgICAgIFtoaWRkZW5dPVwiaXNOb3RGb3VuZFwiXG4gICAgICAgICAgbnpOb0FuaW1hdGlvblxuICAgICAgICAgIG56U2VsZWN0TW9kZVxuICAgICAgICAgIG56QmxvY2tOb2RlXG4gICAgICAgICAgW256RGF0YV09XCJuek5vZGVzXCJcbiAgICAgICAgICBbbnpNdWx0aXBsZV09XCJuek11bHRpcGxlXCJcbiAgICAgICAgICBbbnpTZWFyY2hWYWx1ZV09XCJpbnB1dFZhbHVlXCJcbiAgICAgICAgICBbbnpIaWRlVW5NYXRjaGVkXT1cIm56SGlkZVVuTWF0Y2hlZFwiXG4gICAgICAgICAgW256U2hvd0ljb25dPVwibnpTaG93SWNvblwiXG4gICAgICAgICAgW256Q2hlY2thYmxlXT1cIm56Q2hlY2thYmxlXCJcbiAgICAgICAgICBbbnpBc3luY0RhdGFdPVwibnpBc3luY0RhdGFcIlxuICAgICAgICAgIFtuelNob3dFeHBhbmRdPVwibnpTaG93RXhwYW5kXCJcbiAgICAgICAgICBbbnpTaG93TGluZV09XCJuelNob3dMaW5lXCJcbiAgICAgICAgICBbbnpFeHBhbmRlZEljb25dPVwibnpFeHBhbmRlZEljb25cIlxuICAgICAgICAgIFtuekV4cGFuZEFsbF09XCJuekRlZmF1bHRFeHBhbmRBbGxcIlxuICAgICAgICAgIFtuekV4cGFuZGVkS2V5c109XCJleHBhbmRlZEtleXNcIlxuICAgICAgICAgIFtuekNoZWNrZWRLZXlzXT1cIm56Q2hlY2thYmxlID8gdmFsdWUgOiBbXVwiXG4gICAgICAgICAgW256U2VsZWN0ZWRLZXlzXT1cIiFuekNoZWNrYWJsZSA/IHZhbHVlIDogW11cIlxuICAgICAgICAgIFtuelRyZWVUZW1wbGF0ZV09XCJ0cmVlVGVtcGxhdGVcIlxuICAgICAgICAgIFtuekNoZWNrU3RyaWN0bHldPVwibnpDaGVja1N0cmljdGx5XCJcbiAgICAgICAgICBbbnpWaXJ0dWFsSXRlbVNpemVdPVwibnpWaXJ0dWFsSXRlbVNpemVcIlxuICAgICAgICAgIFtuelZpcnR1YWxNYXhCdWZmZXJQeF09XCJuelZpcnR1YWxNYXhCdWZmZXJQeFwiXG4gICAgICAgICAgW256VmlydHVhbE1pbkJ1ZmZlclB4XT1cIm56VmlydHVhbE1pbkJ1ZmZlclB4XCJcbiAgICAgICAgICBbbnpWaXJ0dWFsSGVpZ2h0XT1cIm56VmlydHVhbEhlaWdodFwiXG4gICAgICAgICAgKG56RXhwYW5kQ2hhbmdlKT1cIm9uRXhwYW5kZWRLZXlzQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgIChuekNsaWNrKT1cIm56VHJlZUNsaWNrLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgKG56Q2hlY2tlZEtleXNDaGFuZ2UpPVwidXBkYXRlU2VsZWN0ZWROb2RlcygpXCJcbiAgICAgICAgICAobnpTZWxlY3RlZEtleXNDaGFuZ2UpPVwidXBkYXRlU2VsZWN0ZWROb2RlcygpXCJcbiAgICAgICAgICAobnpDaGVja0JveENoYW5nZSk9XCJuelRyZWVDaGVja0JveENoYW5nZS5lbWl0KCRldmVudClcIlxuICAgICAgICAgIChuelNlYXJjaFZhbHVlQ2hhbmdlKT1cInNldFNlYXJjaFZhbHVlcygkZXZlbnQpXCJcbiAgICAgICAgPjwvbnotdHJlZT5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJuek5vZGVzLmxlbmd0aCA9PT0gMCB8fCBpc05vdEZvdW5kXCIgY2xhc3M9XCJhbnQtc2VsZWN0LW5vdC1mb3VuZFwiPlxuICAgICAgICAgIDxuei1lbWJlZC1lbXB0eSBbbnpDb21wb25lbnROYW1lXT1cIid0cmVlLXNlbGVjdCdcIiBbc3BlY2lmaWNDb250ZW50XT1cIm56Tm90Rm91bmRDb250ZW50XCI+PC9uei1lbWJlZC1lbXB0eT5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxkaXYgY2RrT3ZlcmxheU9yaWdpbiBjbGFzcz1cImFudC1zZWxlY3Qtc2VsZWN0b3JcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc011bHRpcGxlXCI+XG4gICAgICAgIDxuei1zZWxlY3QtaXRlbVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBub2RlIG9mIHNlbGVjdGVkTm9kZXMgfCBzbGljZTogMDpuek1heFRhZ0NvdW50OyB0cmFja0J5OiB0cmFja1ZhbHVlXCJcbiAgICAgICAgICBbZGVsZXRhYmxlXT1cInRydWVcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJub2RlLmlzRGlzYWJsZWQgfHwgbnpEaXNhYmxlZFwiXG4gICAgICAgICAgW2xhYmVsXT1cIm56RGlzcGxheVdpdGgobm9kZSlcIlxuICAgICAgICAgIChkZWxldGUpPVwicmVtb3ZlU2VsZWN0ZWQobm9kZSwgdHJ1ZSlcIlxuICAgICAgICA+PC9uei1zZWxlY3QtaXRlbT5cblxuICAgICAgICA8bnotc2VsZWN0LWl0ZW1cbiAgICAgICAgICAqbmdJZj1cInNlbGVjdGVkTm9kZXMubGVuZ3RoID4gbnpNYXhUYWdDb3VudFwiXG4gICAgICAgICAgW2NvbnRlbnRUZW1wbGF0ZU91dGxldF09XCJuek1heFRhZ1BsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbY29udGVudFRlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJzZWxlY3RlZE5vZGVzIHwgc2xpY2U6IG56TWF4VGFnQ291bnRcIlxuICAgICAgICAgIFtkZWxldGFibGVdPVwiZmFsc2VcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJmYWxzZVwiXG4gICAgICAgICAgW2xhYmVsXT1cIicrICcgKyAoc2VsZWN0ZWROb2Rlcy5sZW5ndGggLSBuek1heFRhZ0NvdW50KSArICcgLi4uJ1wiXG4gICAgICAgID48L256LXNlbGVjdC1pdGVtPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxuei1zZWxlY3Qtc2VhcmNoXG4gICAgICAgIFtueklkXT1cIm56SWRcIlxuICAgICAgICBbc2hvd0lucHV0XT1cIm56U2hvd1NlYXJjaFwiXG4gICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bklucHV0KCRldmVudClcIlxuICAgICAgICAoaXNDb21wb3NpbmdDaGFuZ2UpPVwiaXNDb21wb3NpbmcgPSAkZXZlbnRcIlxuICAgICAgICAodmFsdWVDaGFuZ2UpPVwic2V0SW5wdXRWYWx1ZSgkZXZlbnQpXCJcbiAgICAgICAgW3ZhbHVlXT1cImlucHV0VmFsdWVcIlxuICAgICAgICBbbWlycm9yU3luY109XCJpc011bHRpcGxlXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIm56RGlzYWJsZWRcIlxuICAgICAgICBbZm9jdXNUcmlnZ2VyXT1cIm56T3BlblwiXG4gICAgICA+PC9uei1zZWxlY3Qtc2VhcmNoPlxuXG4gICAgICA8bnotc2VsZWN0LXBsYWNlaG9sZGVyXG4gICAgICAgICpuZ0lmPVwibnpQbGFjZUhvbGRlciAmJiBzZWxlY3RlZE5vZGVzLmxlbmd0aCA9PT0gMFwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJuelBsYWNlSG9sZGVyXCJcbiAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwicGxhY2VIb2xkZXJEaXNwbGF5XCJcbiAgICAgID48L256LXNlbGVjdC1wbGFjZWhvbGRlcj5cblxuICAgICAgPG56LXNlbGVjdC1pdGVtXG4gICAgICAgICpuZ0lmPVwiIWlzTXVsdGlwbGUgJiYgc2VsZWN0ZWROb2Rlcy5sZW5ndGggPT09IDEgJiYgIWlzQ29tcG9zaW5nICYmIGlucHV0VmFsdWUgPT09ICcnXCJcbiAgICAgICAgW2RlbGV0YWJsZV09XCJmYWxzZVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJmYWxzZVwiXG4gICAgICAgIFtsYWJlbF09XCJuekRpc3BsYXlXaXRoKHNlbGVjdGVkTm9kZXNbMF0pXCJcbiAgICAgID48L256LXNlbGVjdC1pdGVtPlxuXG4gICAgICA8bnotc2VsZWN0LWFycm93ICpuZ0lmPVwiIWlzTXVsdGlwbGVcIj48L256LXNlbGVjdC1hcnJvdz5cblxuICAgICAgPG56LXNlbGVjdC1jbGVhclxuICAgICAgICAqbmdJZj1cIm56QWxsb3dDbGVhciAmJiAhbnpEaXNhYmxlZCAmJiBzZWxlY3RlZE5vZGVzLmxlbmd0aFwiXG4gICAgICAgIChjbGVhcik9XCJvbkNsZWFyU2VsZWN0aW9uKClcIlxuICAgICAgPjwvbnotc2VsZWN0LWNsZWFyPlxuICAgIDwvZGl2PlxuICBgLFxuICBwcm92aWRlcnM6IFtcbiAgICBOelRyZWVTZWxlY3RTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE56VHJlZUhpZ2hlck9yZGVyU2VydmljZVRva2VuLFxuICAgICAgdXNlRmFjdG9yeTogaGlnaGVyT3JkZXJTZXJ2aWNlRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtbbmV3IFNlbGYoKSwgSW5qZWN0b3JdXVxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOelRyZWVTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF0sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1zZWxlY3QnLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC1sZ10nOiAnbnpTaXplPT09XCJsYXJnZVwiJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtcnRsXSc6ICdkaXI9PT1cInJ0bFwiJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3Qtc21dJzogJ256U2l6ZT09PVwic21hbGxcIicsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LWRpc2FibGVkXSc6ICduekRpc2FibGVkJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3Qtc2luZ2xlXSc6ICchaXNNdWx0aXBsZScsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXNob3ctYXJyb3ddJzogJyFpc011bHRpcGxlJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3Qtc2hvdy1zZWFyY2hdJzogJyFpc011bHRpcGxlJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtbXVsdGlwbGVdJzogJ2lzTXVsdGlwbGUnLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC1hbGxvdy1jbGVhcl0nOiAnbnpBbGxvd0NsZWFyJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3Qtb3Blbl0nOiAnbnpPcGVuJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtZm9jdXNlZF0nOiAnbnpPcGVuIHx8IGZvY3VzZWQnLFxuICAgICcoY2xpY2spJzogJ3RyaWdnZXIoKScsXG4gICAgJyhrZXlkb3duKSc6ICdvbktleWRvd24oJGV2ZW50KSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVTZWxlY3RDb21wb25lbnQgZXh0ZW5kcyBOelRyZWVCYXNlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpBbGxvd0NsZWFyOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dFeHBhbmQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd0xpbmU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RHJvcGRvd25NYXRjaFNlbGVjdFdpZHRoOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNoZWNrYWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpIaWRlVW5NYXRjaGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dJY29uOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dTZWFyY2g6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256QXN5bmNEYXRhOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek11bHRpcGxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRlZmF1bHRFeHBhbmRBbGw6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q2hlY2tTdHJpY3RseTogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIG56SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpBbGxvd0NsZWFyOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2hvd0V4cGFuZDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dMaW5lOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBAV2l0aENvbmZpZygpIG56RHJvcGRvd25NYXRjaFNlbGVjdFdpZHRoOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q2hlY2thYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBAV2l0aENvbmZpZygpIG56SGlkZVVuTWF0Y2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgQFdpdGhDb25maWcoKSBuelNob3dJY29uOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dTZWFyY2g6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56QXN5bmNEYXRhID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek11bHRpcGxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRlZmF1bHRFeHBhbmRBbGwgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q2hlY2tTdHJpY3RseSA9IGZhbHNlO1xuICBASW5wdXQoKSBuelZpcnR1YWxJdGVtU2l6ZSA9IDI4O1xuICBASW5wdXQoKSBuelZpcnR1YWxNYXhCdWZmZXJQeCA9IDUwMDtcbiAgQElucHV0KCkgbnpWaXJ0dWFsTWluQnVmZmVyUHggPSAyODtcbiAgQElucHV0KCkgbnpWaXJ0dWFsSGVpZ2h0OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpFeHBhbmRlZEljb24/OiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogTnpUcmVlTm9kZTsgb3JpZ2luOiBOelRyZWVOb2RlT3B0aW9ucyB9PjtcbiAgQElucHV0KCkgbnpOb3RGb3VuZENvbnRlbnQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG56Tm9kZXM6IEFycmF5PE56VHJlZU5vZGUgfCBOelRyZWVOb2RlT3B0aW9ucz4gPSBbXTtcbiAgQElucHV0KCkgbnpPcGVuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpTaXplOiBOelNpemVMRFNUeXBlID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBuelBsYWNlSG9sZGVyID0gJyc7XG4gIEBJbnB1dCgpIG56RHJvcGRvd25TdHlsZTogTmdTdHlsZUludGVyZmFjZSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekRyb3Bkb3duQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56QmFja2Ryb3AgPSBmYWxzZTtcbiAgQElucHV0KClcbiAgc2V0IG56RXhwYW5kZWRLZXlzKHZhbHVlOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuZXhwYW5kZWRLZXlzID0gdmFsdWU7XG4gIH1cbiAgZ2V0IG56RXhwYW5kZWRLZXlzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmRlZEtleXM7XG4gIH1cblxuICBASW5wdXQoKSBuekRpc3BsYXlXaXRoOiAobm9kZTogTnpUcmVlTm9kZSkgPT4gc3RyaW5nIHwgdW5kZWZpbmVkID0gKG5vZGU6IE56VHJlZU5vZGUpID0+IG5vZGUudGl0bGU7XG4gIEBJbnB1dCgpIG56TWF4VGFnQ291bnQhOiBudW1iZXI7XG4gIEBJbnB1dCgpIG56TWF4VGFnUGxhY2Vob2xkZXI6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBOelRyZWVOb2RlW10gfT4gfCBudWxsID0gbnVsbDtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q2xlYXJlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56UmVtb3ZlZCA9IG5ldyBFdmVudEVtaXR0ZXI8TnpUcmVlTm9kZT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56RXhwYW5kQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOekZvcm1hdEVtaXRFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56VHJlZUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxOekZvcm1hdEVtaXRFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56VHJlZUNoZWNrQm94Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOekZvcm1hdEVtaXRFdmVudD4oKTtcblxuICBAVmlld0NoaWxkKE56U2VsZWN0U2VhcmNoQ29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSkgbnpTZWxlY3RTZWFyY2hDb21wb25lbnQhOiBOelNlbGVjdFNlYXJjaENvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgndHJlZVJlZicsIHsgc3RhdGljOiBmYWxzZSB9KSB0cmVlUmVmITogTnpUcmVlQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKENka092ZXJsYXlPcmlnaW4sIHsgc3RhdGljOiB0cnVlIH0pIGNka092ZXJsYXlPcmlnaW4hOiBDZGtPdmVybGF5T3JpZ2luO1xuICBAVmlld0NoaWxkKENka0Nvbm5lY3RlZE92ZXJsYXksIHsgc3RhdGljOiBmYWxzZSB9KSBjZGtDb25uZWN0ZWRPdmVybGF5ITogQ2RrQ29ubmVjdGVkT3ZlcmxheTtcblxuICBASW5wdXQoKSBuelRyZWVUZW1wbGF0ZSE6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBOelRyZWVOb2RlOyBvcmlnaW46IE56VHJlZU5vZGVPcHRpb25zIH0+O1xuICBAQ29udGVudENoaWxkKCduelRyZWVUZW1wbGF0ZScsIHsgc3RhdGljOiB0cnVlIH0pIG56VHJlZVRlbXBsYXRlQ2hpbGQhOiBUZW1wbGF0ZVJlZjx7XG4gICAgJGltcGxpY2l0OiBOelRyZWVOb2RlO1xuICAgIG9yaWdpbjogTnpUcmVlTm9kZU9wdGlvbnM7XG4gIH0+O1xuICBnZXQgdHJlZVRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBOelRyZWVOb2RlOyBvcmlnaW46IE56VHJlZU5vZGVPcHRpb25zIH0+IHtcbiAgICByZXR1cm4gdGhpcy5uelRyZWVUZW1wbGF0ZSB8fCB0aGlzLm56VHJlZVRlbXBsYXRlQ2hpbGQ7XG4gIH1cblxuICBkcm9wZG93bkNsYXNzTmFtZSA9IFRSRUVfU0VMRUNUX0RFRkFVTFRfQ0xBU1M7XG4gIHRyaWdnZXJXaWR0aD86IG51bWJlcjtcbiAgaXNDb21wb3NpbmcgPSBmYWxzZTtcbiAgaXNEZXN0cm95ID0gdHJ1ZTtcbiAgaXNOb3RGb3VuZCA9IGZhbHNlO1xuICBmb2N1c2VkID0gZmFsc2U7XG4gIGlucHV0VmFsdWUgPSAnJztcbiAgZHJvcERvd25Qb3NpdGlvbjogJ3RvcCcgfCAnY2VudGVyJyB8ICdib3R0b20nID0gJ2JvdHRvbSc7XG4gIHNlbGVjdGVkTm9kZXM6IE56VHJlZU5vZGVbXSA9IFtdO1xuICBleHBhbmRlZEtleXM6IHN0cmluZ1tdID0gW107XG4gIHZhbHVlOiBzdHJpbmdbXSA9IFtdO1xuICBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIG9uQ2hhbmdlOiBPbkNoYW5nZVR5cGUgPSBfdmFsdWUgPT4ge307XG4gIG9uVG91Y2hlZDogT25Ub3VjaGVkVHlwZSA9ICgpID0+IHt9O1xuXG4gIGdldCBwbGFjZUhvbGRlckRpc3BsYXkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dFZhbHVlIHx8IHRoaXMuaXNDb21wb3NpbmcgfHwgdGhpcy5zZWxlY3RlZE5vZGVzLmxlbmd0aCA/ICdub25lJyA6ICdibG9jayc7XG4gIH1cblxuICBnZXQgaXNNdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uek11bHRpcGxlIHx8IHRoaXMubnpDaGVja2FibGU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBuelRyZWVTZXJ2aWNlOiBOelRyZWVTZWxlY3RTZXJ2aWNlLFxuICAgIHB1YmxpYyBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eSxcbiAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZVxuICApIHtcbiAgICBzdXBlcihuelRyZWVTZXJ2aWNlKTtcblxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhbnQtc2VsZWN0Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC10cmVlLXNlbGVjdCcpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pc0Rlc3Ryb3kgPSBmYWxzZTtcbiAgICB0aGlzLnN1YnNjcmliZVNlbGVjdGlvbkNoYW5nZSgpO1xuXG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG5cbiAgICB0aGlzLmZvY3VzTW9uaXRvclxuICAgICAgLm1vbml0b3IodGhpcy5lbGVtZW50UmVmLCB0cnVlKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZShmb2N1c09yaWdpbiA9PiB7XG4gICAgICAgIGlmICghZm9jdXNPcmlnaW4pIHtcbiAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzRGVzdHJveSA9IHRydWU7XG4gICAgdGhpcy5jbG9zZURyb3BEb3duKCk7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgaXNDb21wb3NpbmdDaGFuZ2UoaXNDb21wb3Npbmc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzQ29tcG9zaW5nID0gaXNDb21wb3Npbmc7XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm56RGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuY2xvc2VEcm9wRG93bigpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpOb2RlcywgbnpEcm9wZG93bkNsYXNzTmFtZSB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpOb2Rlcykge1xuICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZE5vZGVzKHRydWUpO1xuICAgIH1cbiAgICBpZiAobnpEcm9wZG93bkNsYXNzTmFtZSkge1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5uekRyb3Bkb3duQ2xhc3NOYW1lICYmIHRoaXMubnpEcm9wZG93bkNsYXNzTmFtZS50cmltKCk7XG4gICAgICB0aGlzLmRyb3Bkb3duQ2xhc3NOYW1lID0gY2xhc3NOYW1lID8gYCR7VFJFRV9TRUxFQ1RfREVGQVVMVF9DTEFTU30gJHtjbGFzc05hbWV9YCA6IFRSRUVfU0VMRUNUX0RFRkFVTFRfQ0xBU1M7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nW10gfCBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoaXNOb3ROaWwodmFsdWUpKSB7XG4gICAgICBpZiAodGhpcy5pc011bHRpcGxlICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBbdmFsdWUgYXMgc3RyaW5nXTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWROb2Rlcyh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IFtdO1xuICAgICAgdGhpcy5zZWxlY3RlZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWQobm9kZSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNlbGVjdGVkTm9kZXMgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogc3RyaW5nW10gfCBzdHJpbmcgfCBudWxsKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgRVNDQVBFOlxuICAgICAgICAvKipcbiAgICAgICAgICogU2tpcCB0aGUgRVNDQVBFIHByb2Nlc3NpbmcsIGl0IHdpbGwgYmUgaGFuZGxlZCBpbiB7QGxpbmsgb25PdmVybGF5S2V5RG93bn0uXG4gICAgICAgICAqL1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVEFCOlxuICAgICAgICB0aGlzLmNsb3NlRHJvcERvd24oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoIXRoaXMubnpPcGVuKSB7XG4gICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRyaWdnZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpEaXNhYmxlZCB8fCAoIXRoaXMubnpEaXNhYmxlZCAmJiB0aGlzLm56T3BlbikpIHtcbiAgICAgIHRoaXMuY2xvc2VEcm9wRG93bigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5Ecm9wZG93bigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgdGhpcy5uek9wZW4gPSB0cnVlO1xuICAgICAgdGhpcy5uek9wZW5DaGFuZ2UuZW1pdCh0aGlzLm56T3Blbik7XG4gICAgICB0aGlzLnVwZGF0ZUNka0Nvbm5lY3RlZE92ZXJsYXlTdGF0dXMoKTtcbiAgICAgIGlmICh0aGlzLm56U2hvd1NlYXJjaCB8fCB0aGlzLmlzTXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5mb2N1c09uSW5wdXQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbG9zZURyb3BEb3duKCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgdGhpcy5uek9wZW4gPSBmYWxzZTtcbiAgICB0aGlzLmlucHV0VmFsdWUgPSAnJztcbiAgICB0aGlzLmlzTm90Rm91bmQgPSBmYWxzZTtcbiAgICB0aGlzLm56T3BlbkNoYW5nZS5lbWl0KHRoaXMubnpPcGVuKTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG9uS2V5RG93bklucHV0KGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBrZXlDb2RlID0gZS5rZXlDb2RlO1xuICAgIGNvbnN0IGV2ZW50VGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBpZiAodGhpcy5pc011bHRpcGxlICYmICFldmVudFRhcmdldC52YWx1ZSAmJiBrZXlDb2RlID09PSBCQUNLU1BBQ0UpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHJlbW92ZU5vZGUgPSB0aGlzLnNlbGVjdGVkTm9kZXNbdGhpcy5zZWxlY3RlZE5vZGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKHJlbW92ZU5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uRXhwYW5kZWRLZXlzQ2hhbmdlKHZhbHVlOiBOekZvcm1hdEVtaXRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMubnpFeHBhbmRDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgdGhpcy5leHBhbmRlZEtleXMgPSBbLi4udmFsdWUua2V5cyFdO1xuICB9XG5cbiAgc2V0SW5wdXRWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dFZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICB9XG5cbiAgcmVtb3ZlU2VsZWN0ZWQobm9kZTogTnpUcmVlTm9kZSwgZW1pdDogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICBub2RlLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICBub2RlLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLm56Q2hlY2thYmxlKSB7XG4gICAgICB0aGlzLm56VHJlZVNlcnZpY2UuY29uZHVjdChub2RlLCB0aGlzLm56Q2hlY2tTdHJpY3RseSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubnpUcmVlU2VydmljZS5zZXRTZWxlY3RlZE5vZGVMaXN0KG5vZGUsIHRoaXMubnpNdWx0aXBsZSk7XG4gICAgfVxuXG4gICAgaWYgKGVtaXQpIHtcbiAgICAgIHRoaXMubnpSZW1vdmVkLmVtaXQobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgZm9jdXNPbklucHV0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56U2VsZWN0U2VhcmNoQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLm56U2VsZWN0U2VhcmNoQ29tcG9uZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgc3Vic2NyaWJlU2VsZWN0aW9uQ2hhbmdlKCk6IHZvaWQge1xuICAgIG1lcmdlKFxuICAgICAgdGhpcy5uelRyZWVDbGljay5waXBlKFxuICAgICAgICB0YXAoKGV2ZW50OiBOekZvcm1hdEVtaXRFdmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5vZGUgPSBldmVudC5ub2RlITtcbiAgICAgICAgICBpZiAodGhpcy5uekNoZWNrYWJsZSAmJiAhbm9kZS5pc0Rpc2FibGVkICYmICFub2RlLmlzRGlzYWJsZUNoZWNrYm94KSB7XG4gICAgICAgICAgICBub2RlLmlzQ2hlY2tlZCA9ICFub2RlLmlzQ2hlY2tlZDtcbiAgICAgICAgICAgIG5vZGUuaXNIYWxmQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLm56Q2hlY2tTdHJpY3RseSkge1xuICAgICAgICAgICAgICB0aGlzLm56VHJlZVNlcnZpY2UuY29uZHVjdChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMubnpDaGVja2FibGUpIHtcbiAgICAgICAgICAgIG5vZGUuaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGZpbHRlcigoZXZlbnQ6IE56Rm9ybWF0RW1pdEV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3Qgbm9kZSA9IGV2ZW50Lm5vZGUhO1xuICAgICAgICAgIHJldHVybiB0aGlzLm56Q2hlY2thYmxlID8gIW5vZGUuaXNEaXNhYmxlZCAmJiAhbm9kZS5pc0Rpc2FibGVDaGVja2JveCA6ICFub2RlLmlzRGlzYWJsZWQgJiYgbm9kZS5pc1NlbGVjdGFibGU7XG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdGhpcy5uekNoZWNrYWJsZSA/IHRoaXMubnpUcmVlQ2hlY2tCb3hDaGFuZ2UgOiBvYnNlcnZhYmxlT2YoKSxcbiAgICAgIHRoaXMubnpDbGVhcmVkLFxuICAgICAgdGhpcy5uelJlbW92ZWRcbiAgICApXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUua2V5ISk7XG4gICAgICAgIHRoaXMudmFsdWUgPSBbLi4udmFsdWVdO1xuICAgICAgICBpZiAodGhpcy5uelNob3dTZWFyY2ggfHwgdGhpcy5pc011bHRpcGxlKSB7XG4gICAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gJyc7XG4gICAgICAgICAgdGhpcy5pc05vdEZvdW5kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZSkge1xuICAgICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgICAgIHRoaXMuZm9jdXNPbklucHV0KCk7XG4gICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xvc2VEcm9wRG93bigpO1xuICAgICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUubGVuZ3RoID8gdmFsdWVbMF0gOiBudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICB1cGRhdGVTZWxlY3RlZE5vZGVzKGluaXQ6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmIChpbml0KSB7XG4gICAgICBjb25zdCBub2RlcyA9IHRoaXMuY29lcmNlVHJlZU5vZGVzKHRoaXMubnpOb2Rlcyk7XG4gICAgICB0aGlzLm56VHJlZVNlcnZpY2UuaXNNdWx0aXBsZSA9IHRoaXMuaXNNdWx0aXBsZTtcbiAgICAgIHRoaXMubnpUcmVlU2VydmljZS5pc0NoZWNrU3RyaWN0bHkgPSB0aGlzLm56Q2hlY2tTdHJpY3RseTtcbiAgICAgIHRoaXMubnpUcmVlU2VydmljZS5pbml0VHJlZShub2Rlcyk7XG4gICAgICBpZiAodGhpcy5uekNoZWNrYWJsZSkge1xuICAgICAgICB0aGlzLm56VHJlZVNlcnZpY2UuY29uZHVjdENoZWNrKHRoaXMudmFsdWUsIHRoaXMubnpDaGVja1N0cmljdGx5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubnpUcmVlU2VydmljZS5jb25kdWN0U2VsZWN0ZWRLZXlzKHRoaXMudmFsdWUsIHRoaXMuaXNNdWx0aXBsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZE5vZGVzID0gWy4uLih0aGlzLm56Q2hlY2thYmxlID8gdGhpcy5nZXRDaGVja2VkTm9kZUxpc3QoKSA6IHRoaXMuZ2V0U2VsZWN0ZWROb2RlTGlzdCgpKV07XG4gIH1cblxuICB1cGRhdGVQb3NpdGlvbigpOiB2b2lkIHtcbiAgICByZXFBbmltRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5jZGtDb25uZWN0ZWRPdmVybGF5Py5vdmVybGF5UmVmPy51cGRhdGVQb3NpdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgb25Qb3NpdGlvbkNoYW5nZShwb3NpdGlvbjogQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlKTogdm9pZCB7XG4gICAgdGhpcy5kcm9wRG93blBvc2l0aW9uID0gcG9zaXRpb24uY29ubmVjdGlvblBhaXIub3JpZ2luWTtcbiAgfVxuXG4gIG9uQ2xlYXJTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKG5vZGUsIGZhbHNlKTtcbiAgICB9KTtcbiAgICB0aGlzLm56Q2xlYXJlZC5lbWl0KCk7XG4gIH1cblxuICBvbkNsaWNrT3V0c2lkZShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5jbG9zZURyb3BEb3duKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0U2VhcmNoVmFsdWVzKCRldmVudDogTnpGb3JtYXRFbWl0RXZlbnQpOiB2b2lkIHtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuaXNOb3RGb3VuZCA9ICh0aGlzLm56U2hvd1NlYXJjaCB8fCB0aGlzLmlzTXVsdGlwbGUpICYmICEhdGhpcy5pbnB1dFZhbHVlICYmICRldmVudC5tYXRjaGVkS2V5cyEubGVuZ3RoID09PSAwO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlQ2RrQ29ubmVjdGVkT3ZlcmxheVN0YXR1cygpOiB2b2lkIHtcbiAgICB0aGlzLnRyaWdnZXJXaWR0aCA9IHRoaXMuY2RrT3ZlcmxheU9yaWdpbi5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIH1cblxuICB0cmFja1ZhbHVlKF9pbmRleDogbnVtYmVyLCBvcHRpb246IE56VHJlZU5vZGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBvcHRpb24ua2V5ITtcbiAgfVxufVxuIl19