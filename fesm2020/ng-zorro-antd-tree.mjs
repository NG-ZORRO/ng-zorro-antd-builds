import * as i3$1 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i5 from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import * as i7 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, Input, EventEmitter, Host, Optional, Output, Injectable, SkipSelf, forwardRef, ContentChild, ViewChild, NgModule } from '@angular/core';
import * as i4 from 'ng-zorro-antd/core/highlight';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import * as i4$1 from 'ng-zorro-antd/core/no-animation';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import * as i2 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i3 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { __decorate } from 'tslib';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i1 from 'ng-zorro-antd/core/tree';
import { NzTreeBaseService, NzTreeBase, flattenTreeData, NzTreeHigherOrderServiceToken } from 'ng-zorro-antd/core/tree';
export { NzTreeNode } from 'ng-zorro-antd/core/tree';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { treeCollapseMotion } from 'ng-zorro-antd/core/animation';
import * as i2$1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTreeDropIndicatorComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.level = 1;
        this.direction = 'ltr';
        this.style = {};
    }
    ngOnChanges(_changes) {
        this.renderIndicator(this.dropPosition, this.direction);
    }
    renderIndicator(dropPosition, direction = 'ltr') {
        const offset = 4;
        const startPosition = direction === 'ltr' ? 'left' : 'right';
        const endPosition = direction === 'ltr' ? 'right' : 'left';
        const style = {
            [startPosition]: `${offset}px`,
            [endPosition]: '0px'
        };
        switch (dropPosition) {
            case -1:
                style.top = `${-3}px`;
                break;
            case 1:
                style.bottom = `${-3}px`;
                break;
            case 0:
                // dropPosition === 0
                style.bottom = `${-3}px`;
                style[startPosition] = `${offset + 24}px`;
                break;
            default:
                style.display = 'none';
                break;
        }
        this.style = style;
        this.cdr.markForCheck();
    }
}
NzTreeDropIndicatorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeDropIndicatorComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzTreeDropIndicatorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeDropIndicatorComponent, selector: "nz-tree-drop-indicator", inputs: { dropPosition: "dropPosition", level: "level", direction: "direction" }, host: { properties: { "class.ant-tree-drop-indicator": "true", "style": "style" } }, exportAs: ["NzTreeDropIndicator"], usesOnChanges: true, ngImport: i0, template: ``, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeDropIndicatorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-drop-indicator',
                    exportAs: 'NzTreeDropIndicator',
                    template: ``,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        '[class.ant-tree-drop-indicator]': 'true',
                        '[style]': 'style'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { dropPosition: [{
                type: Input
            }], level: [{
                type: Input
            }], direction: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTreeIndentComponent {
    constructor() {
        this.nzTreeLevel = 0;
        this.nzIsStart = [];
        this.nzIsEnd = [];
        this.nzSelectMode = false;
        this.listOfUnit = [];
    }
    ngOnChanges(changes) {
        const { nzTreeLevel } = changes;
        if (nzTreeLevel) {
            this.listOfUnit = [...new Array(nzTreeLevel.currentValue || 0)];
        }
    }
}
NzTreeIndentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeIndentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTreeIndentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeIndentComponent, selector: "nz-tree-indent", inputs: { nzTreeLevel: "nzTreeLevel", nzIsStart: "nzIsStart", nzIsEnd: "nzIsEnd", nzSelectMode: "nzSelectMode" }, host: { properties: { "attr.aria-hidden": "true", "class.ant-tree-indent": "!nzSelectMode", "class.ant-select-tree-indent": "nzSelectMode" } }, exportAs: ["nzTreeIndent"], usesOnChanges: true, ngImport: i0, template: `
    <span
      [class.ant-tree-indent-unit]="!nzSelectMode"
      [class.ant-select-tree-indent-unit]="nzSelectMode"
      [class.ant-select-tree-indent-unit-start]="nzSelectMode && nzIsStart[i]"
      [class.ant-tree-indent-unit-start]="!nzSelectMode && nzIsStart[i]"
      [class.ant-select-tree-indent-unit-end]="nzSelectMode && nzIsEnd[i]"
      [class.ant-tree-indent-unit-end]="!nzSelectMode && nzIsEnd[i]"
      *ngFor="let _ of listOfUnit; let i = index"
    ></span>
  `, isInline: true, directives: [{ type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeIndentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-indent',
                    exportAs: 'nzTreeIndent',
                    template: `
    <span
      [class.ant-tree-indent-unit]="!nzSelectMode"
      [class.ant-select-tree-indent-unit]="nzSelectMode"
      [class.ant-select-tree-indent-unit-start]="nzSelectMode && nzIsStart[i]"
      [class.ant-tree-indent-unit-start]="!nzSelectMode && nzIsStart[i]"
      [class.ant-select-tree-indent-unit-end]="nzSelectMode && nzIsEnd[i]"
      [class.ant-tree-indent-unit-end]="!nzSelectMode && nzIsEnd[i]"
      *ngFor="let _ of listOfUnit; let i = index"
    ></span>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        '[attr.aria-hidden]': 'true',
                        '[class.ant-tree-indent]': '!nzSelectMode',
                        '[class.ant-select-tree-indent]': 'nzSelectMode'
                    }
                }]
        }], propDecorators: { nzTreeLevel: [{
                type: Input
            }], nzIsStart: [{
                type: Input
            }], nzIsEnd: [{
                type: Input
            }], nzSelectMode: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTreeNodeBuiltinCheckboxComponent {
    constructor() {
        this.nzSelectMode = false;
    }
}
NzTreeNodeBuiltinCheckboxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeBuiltinCheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTreeNodeBuiltinCheckboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeBuiltinCheckboxComponent, selector: "nz-tree-node-checkbox[builtin]", inputs: { nzSelectMode: "nzSelectMode", isChecked: "isChecked", isHalfChecked: "isHalfChecked", isDisabled: "isDisabled", isDisableCheckbox: "isDisableCheckbox" }, host: { properties: { "class.ant-select-tree-checkbox": "nzSelectMode", "class.ant-select-tree-checkbox-checked": "nzSelectMode && isChecked", "class.ant-select-tree-checkbox-indeterminate": "nzSelectMode && isHalfChecked", "class.ant-select-tree-checkbox-disabled": "nzSelectMode && (isDisabled || isDisableCheckbox)", "class.ant-tree-checkbox": "!nzSelectMode", "class.ant-tree-checkbox-checked": "!nzSelectMode && isChecked", "class.ant-tree-checkbox-indeterminate": "!nzSelectMode && isHalfChecked", "class.ant-tree-checkbox-disabled": "!nzSelectMode && (isDisabled || isDisableCheckbox)" } }, ngImport: i0, template: `
    <span [class.ant-tree-checkbox-inner]="!nzSelectMode" [class.ant-select-tree-checkbox-inner]="nzSelectMode"></span>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeBuiltinCheckboxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-node-checkbox[builtin]',
                    template: `
    <span [class.ant-tree-checkbox-inner]="!nzSelectMode" [class.ant-select-tree-checkbox-inner]="nzSelectMode"></span>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        '[class.ant-select-tree-checkbox]': `nzSelectMode`,
                        '[class.ant-select-tree-checkbox-checked]': `nzSelectMode && isChecked`,
                        '[class.ant-select-tree-checkbox-indeterminate]': `nzSelectMode && isHalfChecked`,
                        '[class.ant-select-tree-checkbox-disabled]': `nzSelectMode && (isDisabled || isDisableCheckbox)`,
                        '[class.ant-tree-checkbox]': `!nzSelectMode`,
                        '[class.ant-tree-checkbox-checked]': `!nzSelectMode && isChecked`,
                        '[class.ant-tree-checkbox-indeterminate]': `!nzSelectMode && isHalfChecked`,
                        '[class.ant-tree-checkbox-disabled]': `!nzSelectMode && (isDisabled || isDisableCheckbox)`
                    }
                }]
        }], propDecorators: { nzSelectMode: [{
                type: Input
            }], isChecked: [{
                type: Input
            }], isHalfChecked: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], isDisableCheckbox: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTreeNodeSwitcherComponent {
    constructor() {
        this.nzSelectMode = false;
    }
    get isShowLineIcon() {
        return !this.isLeaf && !!this.nzShowLine;
    }
    get isShowSwitchIcon() {
        return !this.isLeaf && !this.nzShowLine;
    }
    get isSwitcherOpen() {
        return !!this.isExpanded && !this.isLeaf;
    }
    get isSwitcherClose() {
        return !this.isExpanded && !this.isLeaf;
    }
}
NzTreeNodeSwitcherComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeSwitcherComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTreeNodeSwitcherComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeSwitcherComponent, selector: "nz-tree-node-switcher", inputs: { nzShowExpand: "nzShowExpand", nzShowLine: "nzShowLine", nzExpandedIcon: "nzExpandedIcon", nzSelectMode: "nzSelectMode", context: "context", isLeaf: "isLeaf", isLoading: "isLoading", isExpanded: "isExpanded" }, host: { properties: { "class.ant-select-tree-switcher": "nzSelectMode", "class.ant-select-tree-switcher-noop": "nzSelectMode && isLeaf", "class.ant-select-tree-switcher_open": "nzSelectMode && isSwitcherOpen", "class.ant-select-tree-switcher_close": "nzSelectMode && isSwitcherClose", "class.ant-tree-switcher": "!nzSelectMode", "class.ant-tree-switcher-noop": "!nzSelectMode && isLeaf", "class.ant-tree-switcher_open": "!nzSelectMode && isSwitcherOpen", "class.ant-tree-switcher_close": "!nzSelectMode && isSwitcherClose" } }, ngImport: i0, template: `
    <ng-container *ngIf="isShowSwitchIcon">
      <ng-container *ngIf="!isLoading; else loadingTemplate">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          <i
            nz-icon
            nzType="caret-down"
            [class.ant-select-tree-switcher-icon]="nzSelectMode"
            [class.ant-tree-switcher-icon]="!nzSelectMode"
          ></i>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-container *ngIf="nzShowLine">
      <ng-container *ngIf="!isLoading; else loadingTemplate">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          <i
            *ngIf="isShowLineIcon"
            nz-icon
            [nzType]="isSwitcherOpen ? 'minus-square' : 'plus-square'"
            class="ant-tree-switcher-line-icon"
          ></i>
          <i *ngIf="!isShowLineIcon" nz-icon nzType="file" class="ant-tree-switcher-line-icon"></i>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #loadingTemplate>
      <i nz-icon nzType="loading" [nzSpin]="true" class="ant-tree-switcher-loading-icon"></i>
    </ng-template>
  `, isInline: true, directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeSwitcherComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-node-switcher',
                    template: `
    <ng-container *ngIf="isShowSwitchIcon">
      <ng-container *ngIf="!isLoading; else loadingTemplate">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          <i
            nz-icon
            nzType="caret-down"
            [class.ant-select-tree-switcher-icon]="nzSelectMode"
            [class.ant-tree-switcher-icon]="!nzSelectMode"
          ></i>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-container *ngIf="nzShowLine">
      <ng-container *ngIf="!isLoading; else loadingTemplate">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          <i
            *ngIf="isShowLineIcon"
            nz-icon
            [nzType]="isSwitcherOpen ? 'minus-square' : 'plus-square'"
            class="ant-tree-switcher-line-icon"
          ></i>
          <i *ngIf="!isShowLineIcon" nz-icon nzType="file" class="ant-tree-switcher-line-icon"></i>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #loadingTemplate>
      <i nz-icon nzType="loading" [nzSpin]="true" class="ant-tree-switcher-loading-icon"></i>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        '[class.ant-select-tree-switcher]': 'nzSelectMode',
                        '[class.ant-select-tree-switcher-noop]': 'nzSelectMode && isLeaf',
                        '[class.ant-select-tree-switcher_open]': 'nzSelectMode && isSwitcherOpen',
                        '[class.ant-select-tree-switcher_close]': 'nzSelectMode && isSwitcherClose',
                        '[class.ant-tree-switcher]': '!nzSelectMode',
                        '[class.ant-tree-switcher-noop]': '!nzSelectMode && isLeaf',
                        '[class.ant-tree-switcher_open]': '!nzSelectMode && isSwitcherOpen',
                        '[class.ant-tree-switcher_close]': '!nzSelectMode && isSwitcherClose'
                    }
                }]
        }], propDecorators: { nzShowExpand: [{
                type: Input
            }], nzShowLine: [{
                type: Input
            }], nzExpandedIcon: [{
                type: Input
            }], nzSelectMode: [{
                type: Input
            }], context: [{
                type: Input
            }], isLeaf: [{
                type: Input
            }], isLoading: [{
                type: Input
            }], isExpanded: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTreeNodeTitleComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.treeTemplate = null;
        this.selectMode = false;
        // Drag indicator
        this.showIndicator = true;
    }
    get canDraggable() {
        return this.draggable && !this.isDisabled ? true : null;
    }
    get matchedValue() {
        return this.isMatched ? this.searchValue : '';
    }
    get isSwitcherOpen() {
        return this.isExpanded && !this.isLeaf;
    }
    get isSwitcherClose() {
        return !this.isExpanded && !this.isLeaf;
    }
    ngOnChanges(changes) {
        const { showIndicator, dragPosition } = changes;
        if (showIndicator || dragPosition) {
            this.cdr.markForCheck();
        }
    }
}
NzTreeNodeTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeTitleComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzTreeNodeTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeTitleComponent, selector: "nz-tree-node-title", inputs: { searchValue: "searchValue", treeTemplate: "treeTemplate", draggable: "draggable", showIcon: "showIcon", selectMode: "selectMode", context: "context", icon: "icon", title: "title", isLoading: "isLoading", isSelected: "isSelected", isDisabled: "isDisabled", isMatched: "isMatched", isExpanded: "isExpanded", isLeaf: "isLeaf", showIndicator: "showIndicator", dragPosition: "dragPosition" }, host: { properties: { "attr.title": "title", "attr.draggable": "canDraggable", "attr.aria-grabbed": "canDraggable", "class.draggable": "canDraggable", "class.ant-select-tree-node-content-wrapper": "selectMode", "class.ant-select-tree-node-content-wrapper-open": "selectMode && isSwitcherOpen", "class.ant-select-tree-node-content-wrapper-close": "selectMode && isSwitcherClose", "class.ant-select-tree-node-selected": "selectMode && isSelected", "class.ant-tree-node-content-wrapper": "!selectMode", "class.ant-tree-node-content-wrapper-open": "!selectMode && isSwitcherOpen", "class.ant-tree-node-content-wrapper-close": "!selectMode && isSwitcherClose", "class.ant-tree-node-selected": "!selectMode && isSelected" } }, usesOnChanges: true, ngImport: i0, template: `
    <ng-template
      [ngTemplateOutlet]="treeTemplate"
      [ngTemplateOutletContext]="{ $implicit: context, origin: context.origin }"
    ></ng-template>
    <ng-container *ngIf="!treeTemplate">
      <span
        *ngIf="icon && showIcon"
        [class.ant-tree-icon__open]="isSwitcherOpen"
        [class.ant-tree-icon__close]="isSwitcherClose"
        [class.ant-tree-icon_loading]="isLoading"
        [class.ant-select-tree-iconEle]="selectMode"
        [class.ant-tree-iconEle]="!selectMode"
      >
        <span
          [class.ant-select-tree-iconEle]="selectMode"
          [class.ant-select-tree-icon__customize]="selectMode"
          [class.ant-tree-iconEle]="!selectMode"
          [class.ant-tree-icon__customize]="!selectMode"
        >
          <i nz-icon *ngIf="icon" [nzType]="icon"></i>
        </span>
      </span>
      <span class="ant-tree-title" [innerHTML]="title | nzHighlight: matchedValue:'i':'font-highlight'"></span>
      <nz-tree-drop-indicator
        *ngIf="showIndicator"
        [dropPosition]="dragPosition"
        [level]="context.level"
      ></nz-tree-drop-indicator>
    </ng-container>
  `, isInline: true, components: [{ type: NzTreeDropIndicatorComponent, selector: "nz-tree-drop-indicator", inputs: ["dropPosition", "level", "direction"], exportAs: ["NzTreeDropIndicator"] }], directives: [{ type: i7.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], pipes: { "nzHighlight": i4.NzHighlightPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeTitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-node-title',
                    template: `
    <ng-template
      [ngTemplateOutlet]="treeTemplate"
      [ngTemplateOutletContext]="{ $implicit: context, origin: context.origin }"
    ></ng-template>
    <ng-container *ngIf="!treeTemplate">
      <span
        *ngIf="icon && showIcon"
        [class.ant-tree-icon__open]="isSwitcherOpen"
        [class.ant-tree-icon__close]="isSwitcherClose"
        [class.ant-tree-icon_loading]="isLoading"
        [class.ant-select-tree-iconEle]="selectMode"
        [class.ant-tree-iconEle]="!selectMode"
      >
        <span
          [class.ant-select-tree-iconEle]="selectMode"
          [class.ant-select-tree-icon__customize]="selectMode"
          [class.ant-tree-iconEle]="!selectMode"
          [class.ant-tree-icon__customize]="!selectMode"
        >
          <i nz-icon *ngIf="icon" [nzType]="icon"></i>
        </span>
      </span>
      <span class="ant-tree-title" [innerHTML]="title | nzHighlight: matchedValue:'i':'font-highlight'"></span>
      <nz-tree-drop-indicator
        *ngIf="showIndicator"
        [dropPosition]="dragPosition"
        [level]="context.level"
      ></nz-tree-drop-indicator>
    </ng-container>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        '[attr.title]': 'title',
                        '[attr.draggable]': 'canDraggable',
                        '[attr.aria-grabbed]': 'canDraggable',
                        '[class.draggable]': 'canDraggable',
                        '[class.ant-select-tree-node-content-wrapper]': `selectMode`,
                        '[class.ant-select-tree-node-content-wrapper-open]': `selectMode && isSwitcherOpen`,
                        '[class.ant-select-tree-node-content-wrapper-close]': `selectMode && isSwitcherClose`,
                        '[class.ant-select-tree-node-selected]': `selectMode && isSelected`,
                        '[class.ant-tree-node-content-wrapper]': `!selectMode`,
                        '[class.ant-tree-node-content-wrapper-open]': `!selectMode && isSwitcherOpen`,
                        '[class.ant-tree-node-content-wrapper-close]': `!selectMode && isSwitcherClose`,
                        '[class.ant-tree-node-selected]': `!selectMode && isSelected`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { searchValue: [{
                type: Input
            }], treeTemplate: [{
                type: Input
            }], draggable: [{
                type: Input
            }], showIcon: [{
                type: Input
            }], selectMode: [{
                type: Input
            }], context: [{
                type: Input
            }], icon: [{
                type: Input
            }], title: [{
                type: Input
            }], isLoading: [{
                type: Input
            }], isSelected: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], isMatched: [{
                type: Input
            }], isExpanded: [{
                type: Input
            }], isLeaf: [{
                type: Input
            }], showIndicator: [{
                type: Input
            }], dragPosition: [{
                type: Input
            }] } });

class NzTreeNodeBuiltinComponent {
    constructor(nzTreeService, ngZone, renderer, elementRef, cdr, noAnimation) {
        this.nzTreeService = nzTreeService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.noAnimation = noAnimation;
        /**
         * for global property
         */
        this.icon = '';
        this.title = '';
        this.isLoading = false;
        this.isSelected = false;
        this.isDisabled = false;
        this.isMatched = false;
        this.isStart = [];
        this.isEnd = [];
        this.nzHideUnMatched = false;
        this.nzNoAnimation = false;
        this.nzSelectMode = false;
        this.nzShowIcon = false;
        this.nzTreeTemplate = null;
        this.nzSearchValue = '';
        this.nzDraggable = false;
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
        /**
         * drag var
         */
        this.destroy$ = new Subject();
        this.dragPos = 2;
        this.dragPosClass = {
            0: 'drag-over',
            1: 'drag-over-gap-bottom',
            '-1': 'drag-over-gap-top'
        };
        this.draggingKey = null;
        this.showIndicator = false;
    }
    /**
     * default set
     */
    get displayStyle() {
        // to hide unmatched nodes
        return this.nzSearchValue && this.nzHideUnMatched && !this.isMatched && !this.isExpanded && this.canHide
            ? 'none'
            : '';
    }
    get isSwitcherOpen() {
        return this.isExpanded && !this.isLeaf;
    }
    get isSwitcherClose() {
        return !this.isExpanded && !this.isLeaf;
    }
    /**
     * collapse node
     *
     * @param event
     */
    clickExpand(event) {
        event.preventDefault();
        if (!this.isLoading && !this.isLeaf) {
            // set async state
            if (this.nzAsyncData && this.nzTreeNode.children.length === 0 && !this.isExpanded) {
                this.nzTreeNode.isLoading = true;
            }
            this.nzTreeNode.setExpanded(!this.isExpanded);
        }
        this.nzTreeService.setExpandedNodeList(this.nzTreeNode);
        const eventNext = this.nzTreeService.formatEvent('expand', this.nzTreeNode, event);
        this.nzExpandChange.emit(eventNext);
    }
    clickSelect(event) {
        event.preventDefault();
        if (this.isSelectable && !this.isDisabled) {
            this.nzTreeNode.isSelected = !this.nzTreeNode.isSelected;
        }
        this.nzTreeService.setSelectedNodeList(this.nzTreeNode);
        const eventNext = this.nzTreeService.formatEvent('click', this.nzTreeNode, event);
        this.nzClick.emit(eventNext);
    }
    dblClick(event) {
        event.preventDefault();
        const eventNext = this.nzTreeService.formatEvent('dblclick', this.nzTreeNode, event);
        this.nzDblClick.emit(eventNext);
    }
    contextMenu(event) {
        event.preventDefault();
        const eventNext = this.nzTreeService.formatEvent('contextmenu', this.nzTreeNode, event);
        this.nzContextMenu.emit(eventNext);
    }
    /**
     * check node
     *
     * @param event
     */
    clickCheckBox(event) {
        event.preventDefault();
        // return if node is disabled
        if (this.isDisabled || this.isDisableCheckbox) {
            return;
        }
        this.nzTreeNode.isChecked = !this.nzTreeNode.isChecked;
        this.nzTreeNode.isHalfChecked = false;
        this.nzTreeService.setCheckedNodeList(this.nzTreeNode);
        const eventNext = this.nzTreeService.formatEvent('check', this.nzTreeNode, event);
        this.nzCheckBoxChange.emit(eventNext);
    }
    clearDragClass() {
        const dragClass = ['drag-over-gap-top', 'drag-over-gap-bottom', 'drag-over', 'drop-target'];
        dragClass.forEach(e => {
            this.renderer.removeClass(this.elementRef.nativeElement, e);
        });
    }
    /**
     * drag event
     *
     * @param e
     */
    handleDragStart(e) {
        try {
            // ie throw error
            // firefox-need-it
            e.dataTransfer.setData('text/plain', this.nzTreeNode.key);
        }
        catch (error) {
            // empty
        }
        this.nzTreeService.setSelectedNode(this.nzTreeNode);
        this.draggingKey = this.nzTreeNode.key;
        const eventNext = this.nzTreeService.formatEvent('dragstart', this.nzTreeNode, e);
        this.nzOnDragStart.emit(eventNext);
    }
    handleDragEnter(e) {
        e.preventDefault();
        // reset position
        this.showIndicator = this.nzTreeNode.key !== this.nzTreeService.getSelectedNode()?.key;
        this.renderIndicator(2);
        this.ngZone.run(() => {
            const eventNext = this.nzTreeService.formatEvent('dragenter', this.nzTreeNode, e);
            this.nzOnDragEnter.emit(eventNext);
        });
    }
    handleDragOver(e) {
        e.preventDefault();
        const dropPosition = this.nzTreeService.calcDropPosition(e);
        if (this.dragPos !== dropPosition) {
            this.clearDragClass();
            this.renderIndicator(dropPosition);
            // leaf node will pass
            if (!(this.dragPos === 0 && this.isLeaf)) {
                this.renderer.addClass(this.elementRef.nativeElement, this.dragPosClass[this.dragPos]);
                this.renderer.addClass(this.elementRef.nativeElement, 'drop-target');
            }
        }
        const eventNext = this.nzTreeService.formatEvent('dragover', this.nzTreeNode, e);
        this.nzOnDragOver.emit(eventNext);
    }
    handleDragLeave(e) {
        e.preventDefault();
        this.renderIndicator(2);
        this.clearDragClass();
        const eventNext = this.nzTreeService.formatEvent('dragleave', this.nzTreeNode, e);
        this.nzOnDragLeave.emit(eventNext);
    }
    handleDragDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.ngZone.run(() => {
            this.showIndicator = false;
            this.clearDragClass();
            const node = this.nzTreeService.getSelectedNode();
            if (!node || (node && node.key === this.nzTreeNode.key) || (this.dragPos === 0 && this.isLeaf)) {
                return;
            }
            // pass if node is leafNo
            const dropEvent = this.nzTreeService.formatEvent('drop', this.nzTreeNode, e);
            const dragEndEvent = this.nzTreeService.formatEvent('dragend', this.nzTreeNode, e);
            if (this.nzBeforeDrop) {
                this.nzBeforeDrop({
                    dragNode: this.nzTreeService.getSelectedNode(),
                    node: this.nzTreeNode,
                    pos: this.dragPos
                }).subscribe((canDrop) => {
                    if (canDrop) {
                        this.nzTreeService.dropAndApply(this.nzTreeNode, this.dragPos);
                    }
                    this.nzOnDrop.emit(dropEvent);
                    this.nzOnDragEnd.emit(dragEndEvent);
                });
            }
            else if (this.nzTreeNode) {
                this.nzTreeService.dropAndApply(this.nzTreeNode, this.dragPos);
                this.nzOnDrop.emit(dropEvent);
            }
        });
    }
    handleDragEnd(e) {
        e.preventDefault();
        this.ngZone.run(() => {
            // if user do not custom beforeDrop
            if (!this.nzBeforeDrop) {
                // clear dragging state
                this.draggingKey = null;
                const eventNext = this.nzTreeService.formatEvent('dragend', this.nzTreeNode, e);
                this.nzOnDragEnd.emit(eventNext);
            }
        });
    }
    /**
     * Listening to dragging events.
     */
    handDragEvent() {
        this.ngZone.runOutsideAngular(() => {
            if (this.nzDraggable) {
                const nativeElement = this.elementRef.nativeElement;
                this.destroy$ = new Subject();
                fromEvent(nativeElement, 'dragstart')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((e) => this.handleDragStart(e));
                fromEvent(nativeElement, 'dragenter')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((e) => this.handleDragEnter(e));
                fromEvent(nativeElement, 'dragover')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((e) => this.handleDragOver(e));
                fromEvent(nativeElement, 'dragleave')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((e) => this.handleDragLeave(e));
                fromEvent(nativeElement, 'drop')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((e) => this.handleDragDrop(e));
                fromEvent(nativeElement, 'dragend')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((e) => this.handleDragEnd(e));
            }
            else {
                this.destroy$.next();
                this.destroy$.complete();
            }
        });
    }
    markForCheck() {
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.nzTreeNode.component = this;
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.elementRef.nativeElement, 'mousedown')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                if (this.nzSelectMode) {
                    event.preventDefault();
                }
            });
        });
    }
    ngOnChanges(changes) {
        const { nzDraggable } = changes;
        if (nzDraggable) {
            this.handDragEvent();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    renderIndicator(dropPosition) {
        this.ngZone.run(() => {
            this.showIndicator = dropPosition !== 2;
            if (this.nzTreeNode.key === this.nzTreeService.getSelectedNode()?.key || (dropPosition === 0 && this.isLeaf)) {
                return;
            }
            this.dragPos = dropPosition;
            this.cdr.markForCheck();
        });
    }
}
NzTreeNodeBuiltinComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeBuiltinComponent, deps: [{ token: i1.NzTreeBaseService }, { token: i0.NgZone }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i4$1.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTreeNodeBuiltinComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeBuiltinComponent, selector: "nz-tree-node[builtin]", inputs: { icon: "icon", title: "title", isLoading: "isLoading", isSelected: "isSelected", isDisabled: "isDisabled", isMatched: "isMatched", isExpanded: "isExpanded", isLeaf: "isLeaf", isChecked: "isChecked", isHalfChecked: "isHalfChecked", isDisableCheckbox: "isDisableCheckbox", isSelectable: "isSelectable", canHide: "canHide", isStart: "isStart", isEnd: "isEnd", nzTreeNode: "nzTreeNode", nzShowLine: "nzShowLine", nzShowExpand: "nzShowExpand", nzCheckable: "nzCheckable", nzAsyncData: "nzAsyncData", nzHideUnMatched: "nzHideUnMatched", nzNoAnimation: "nzNoAnimation", nzSelectMode: "nzSelectMode", nzShowIcon: "nzShowIcon", nzExpandedIcon: "nzExpandedIcon", nzTreeTemplate: "nzTreeTemplate", nzBeforeDrop: "nzBeforeDrop", nzSearchValue: "nzSearchValue", nzDraggable: "nzDraggable" }, outputs: { nzClick: "nzClick", nzDblClick: "nzDblClick", nzContextMenu: "nzContextMenu", nzCheckBoxChange: "nzCheckBoxChange", nzExpandChange: "nzExpandChange", nzOnDragStart: "nzOnDragStart", nzOnDragEnter: "nzOnDragEnter", nzOnDragOver: "nzOnDragOver", nzOnDragLeave: "nzOnDragLeave", nzOnDrop: "nzOnDrop", nzOnDragEnd: "nzOnDragEnd" }, host: { properties: { "class.ant-select-tree-treenode": "nzSelectMode", "class.ant-select-tree-treenode-disabled": "nzSelectMode && isDisabled", "class.ant-select-tree-treenode-switcher-open": "nzSelectMode && isSwitcherOpen", "class.ant-select-tree-treenode-switcher-close": "nzSelectMode && isSwitcherClose", "class.ant-select-tree-treenode-checkbox-checked": "nzSelectMode && isChecked", "class.ant-select-tree-treenode-checkbox-indeterminate": "nzSelectMode && isHalfChecked", "class.ant-select-tree-treenode-selected": "nzSelectMode && isSelected", "class.ant-select-tree-treenode-loading": "nzSelectMode && isLoading", "class.ant-tree-treenode": "!nzSelectMode", "class.ant-tree-treenode-disabled": "!nzSelectMode && isDisabled", "class.ant-tree-treenode-switcher-open": "!nzSelectMode && isSwitcherOpen", "class.ant-tree-treenode-switcher-close": "!nzSelectMode && isSwitcherClose", "class.ant-tree-treenode-checkbox-checked": "!nzSelectMode && isChecked", "class.ant-tree-treenode-checkbox-indeterminate": "!nzSelectMode && isHalfChecked", "class.ant-tree-treenode-selected": "!nzSelectMode && isSelected", "class.ant-tree-treenode-loading": "!nzSelectMode && isLoading", "class.dragging": "draggingKey === nzTreeNode.key", "style.display": "displayStyle" } }, exportAs: ["nzTreeBuiltinNode"], usesOnChanges: true, ngImport: i0, template: `
    <nz-tree-indent
      [nzTreeLevel]="nzTreeNode.level"
      [nzSelectMode]="nzSelectMode"
      [nzIsStart]="isStart"
      [nzIsEnd]="isEnd"
    ></nz-tree-indent>
    <nz-tree-node-switcher
      *ngIf="nzShowExpand"
      [nzShowExpand]="nzShowExpand"
      [nzShowLine]="nzShowLine"
      [nzExpandedIcon]="nzExpandedIcon"
      [nzSelectMode]="nzSelectMode"
      [context]="nzTreeNode"
      [isLeaf]="isLeaf"
      [isExpanded]="isExpanded"
      [isLoading]="isLoading"
      (click)="clickExpand($event)"
    ></nz-tree-node-switcher>
    <nz-tree-node-checkbox
      builtin
      *ngIf="nzCheckable"
      (click)="clickCheckBox($event)"
      [nzSelectMode]="nzSelectMode"
      [isChecked]="isChecked"
      [isHalfChecked]="isHalfChecked"
      [isDisabled]="isDisabled"
      [isDisableCheckbox]="isDisableCheckbox"
    ></nz-tree-node-checkbox>
    <nz-tree-node-title
      [icon]="icon"
      [title]="title"
      [isLoading]="isLoading"
      [isSelected]="isSelected"
      [isDisabled]="isDisabled"
      [isMatched]="isMatched"
      [isExpanded]="isExpanded"
      [isLeaf]="isLeaf"
      [searchValue]="nzSearchValue"
      [treeTemplate]="nzTreeTemplate"
      [draggable]="nzDraggable"
      [showIcon]="nzShowIcon"
      [selectMode]="nzSelectMode"
      [context]="nzTreeNode"
      [showIndicator]="showIndicator"
      [dragPosition]="dragPos"
      (dblclick)="dblClick($event)"
      (click)="clickSelect($event)"
      (contextmenu)="contextMenu($event)"
    ></nz-tree-node-title>
  `, isInline: true, components: [{ type: NzTreeIndentComponent, selector: "nz-tree-indent", inputs: ["nzTreeLevel", "nzIsStart", "nzIsEnd", "nzSelectMode"], exportAs: ["nzTreeIndent"] }, { type: NzTreeNodeSwitcherComponent, selector: "nz-tree-node-switcher", inputs: ["nzShowExpand", "nzShowLine", "nzExpandedIcon", "nzSelectMode", "context", "isLeaf", "isLoading", "isExpanded"] }, { type: NzTreeNodeBuiltinCheckboxComponent, selector: "nz-tree-node-checkbox[builtin]", inputs: ["nzSelectMode", "isChecked", "isHalfChecked", "isDisabled", "isDisableCheckbox"] }, { type: NzTreeNodeTitleComponent, selector: "nz-tree-node-title", inputs: ["searchValue", "treeTemplate", "draggable", "showIcon", "selectMode", "context", "icon", "title", "isLoading", "isSelected", "isDisabled", "isMatched", "isExpanded", "isLeaf", "showIndicator", "dragPosition"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    InputBoolean()
], NzTreeNodeBuiltinComponent.prototype, "nzShowLine", void 0);
__decorate([
    InputBoolean()
], NzTreeNodeBuiltinComponent.prototype, "nzShowExpand", void 0);
__decorate([
    InputBoolean()
], NzTreeNodeBuiltinComponent.prototype, "nzCheckable", void 0);
__decorate([
    InputBoolean()
], NzTreeNodeBuiltinComponent.prototype, "nzAsyncData", void 0);
__decorate([
    InputBoolean()
], NzTreeNodeBuiltinComponent.prototype, "nzHideUnMatched", void 0);
__decorate([
    InputBoolean()
], NzTreeNodeBuiltinComponent.prototype, "nzNoAnimation", void 0);
__decorate([
    InputBoolean()
], NzTreeNodeBuiltinComponent.prototype, "nzSelectMode", void 0);
__decorate([
    InputBoolean()
], NzTreeNodeBuiltinComponent.prototype, "nzShowIcon", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeBuiltinComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-node[builtin]',
                    exportAs: 'nzTreeBuiltinNode',
                    template: `
    <nz-tree-indent
      [nzTreeLevel]="nzTreeNode.level"
      [nzSelectMode]="nzSelectMode"
      [nzIsStart]="isStart"
      [nzIsEnd]="isEnd"
    ></nz-tree-indent>
    <nz-tree-node-switcher
      *ngIf="nzShowExpand"
      [nzShowExpand]="nzShowExpand"
      [nzShowLine]="nzShowLine"
      [nzExpandedIcon]="nzExpandedIcon"
      [nzSelectMode]="nzSelectMode"
      [context]="nzTreeNode"
      [isLeaf]="isLeaf"
      [isExpanded]="isExpanded"
      [isLoading]="isLoading"
      (click)="clickExpand($event)"
    ></nz-tree-node-switcher>
    <nz-tree-node-checkbox
      builtin
      *ngIf="nzCheckable"
      (click)="clickCheckBox($event)"
      [nzSelectMode]="nzSelectMode"
      [isChecked]="isChecked"
      [isHalfChecked]="isHalfChecked"
      [isDisabled]="isDisabled"
      [isDisableCheckbox]="isDisableCheckbox"
    ></nz-tree-node-checkbox>
    <nz-tree-node-title
      [icon]="icon"
      [title]="title"
      [isLoading]="isLoading"
      [isSelected]="isSelected"
      [isDisabled]="isDisabled"
      [isMatched]="isMatched"
      [isExpanded]="isExpanded"
      [isLeaf]="isLeaf"
      [searchValue]="nzSearchValue"
      [treeTemplate]="nzTreeTemplate"
      [draggable]="nzDraggable"
      [showIcon]="nzShowIcon"
      [selectMode]="nzSelectMode"
      [context]="nzTreeNode"
      [showIndicator]="showIndicator"
      [dragPosition]="dragPos"
      (dblclick)="dblClick($event)"
      (click)="clickSelect($event)"
      (contextmenu)="contextMenu($event)"
    ></nz-tree-node-title>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        '[class.ant-select-tree-treenode]': `nzSelectMode`,
                        '[class.ant-select-tree-treenode-disabled]': `nzSelectMode && isDisabled`,
                        '[class.ant-select-tree-treenode-switcher-open]': `nzSelectMode && isSwitcherOpen`,
                        '[class.ant-select-tree-treenode-switcher-close]': `nzSelectMode && isSwitcherClose`,
                        '[class.ant-select-tree-treenode-checkbox-checked]': `nzSelectMode && isChecked`,
                        '[class.ant-select-tree-treenode-checkbox-indeterminate]': `nzSelectMode && isHalfChecked`,
                        '[class.ant-select-tree-treenode-selected]': `nzSelectMode && isSelected`,
                        '[class.ant-select-tree-treenode-loading]': `nzSelectMode && isLoading`,
                        '[class.ant-tree-treenode]': `!nzSelectMode`,
                        '[class.ant-tree-treenode-disabled]': `!nzSelectMode && isDisabled`,
                        '[class.ant-tree-treenode-switcher-open]': `!nzSelectMode && isSwitcherOpen`,
                        '[class.ant-tree-treenode-switcher-close]': `!nzSelectMode && isSwitcherClose`,
                        '[class.ant-tree-treenode-checkbox-checked]': `!nzSelectMode && isChecked`,
                        '[class.ant-tree-treenode-checkbox-indeterminate]': `!nzSelectMode && isHalfChecked`,
                        '[class.ant-tree-treenode-selected]': `!nzSelectMode && isSelected`,
                        '[class.ant-tree-treenode-loading]': `!nzSelectMode && isLoading`,
                        '[class.dragging]': `draggingKey === nzTreeNode.key`,
                        '[style.display]': 'displayStyle'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzTreeBaseService }, { type: i0.NgZone }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i4$1.NzNoAnimationDirective, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }]; }, propDecorators: { icon: [{
                type: Input
            }], title: [{
                type: Input
            }], isLoading: [{
                type: Input
            }], isSelected: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], isMatched: [{
                type: Input
            }], isExpanded: [{
                type: Input
            }], isLeaf: [{
                type: Input
            }], isChecked: [{
                type: Input
            }], isHalfChecked: [{
                type: Input
            }], isDisableCheckbox: [{
                type: Input
            }], isSelectable: [{
                type: Input
            }], canHide: [{
                type: Input
            }], isStart: [{
                type: Input
            }], isEnd: [{
                type: Input
            }], nzTreeNode: [{
                type: Input
            }], nzShowLine: [{
                type: Input
            }], nzShowExpand: [{
                type: Input
            }], nzCheckable: [{
                type: Input
            }], nzAsyncData: [{
                type: Input
            }], nzHideUnMatched: [{
                type: Input
            }], nzNoAnimation: [{
                type: Input
            }], nzSelectMode: [{
                type: Input
            }], nzShowIcon: [{
                type: Input
            }], nzExpandedIcon: [{
                type: Input
            }], nzTreeTemplate: [{
                type: Input
            }], nzBeforeDrop: [{
                type: Input
            }], nzSearchValue: [{
                type: Input
            }], nzDraggable: [{
                type: Input
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

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTreeService extends NzTreeBaseService {
    constructor() {
        super();
    }
}
NzTreeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NzTreeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

function NzTreeServiceFactory(higherOrderService, treeService) {
    return higherOrderService ? higherOrderService : treeService;
}
const NZ_CONFIG_MODULE_NAME = 'tree';
class NzTreeComponent extends NzTreeBase {
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
NzTreeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeComponent, deps: [{ token: i1.NzTreeBaseService }, { token: i2$1.NzConfigService }, { token: i0.ChangeDetectorRef }, { token: i3$1.Directionality, optional: true }, { token: i4$1.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
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
  `, isInline: true, components: [{ type: i5.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { type: NzTreeNodeBuiltinComponent, selector: "nz-tree-node[builtin]", inputs: ["icon", "title", "isLoading", "isSelected", "isDisabled", "isMatched", "isExpanded", "isLeaf", "isChecked", "isHalfChecked", "isDisableCheckbox", "isSelectable", "canHide", "isStart", "isEnd", "nzTreeNode", "nzShowLine", "nzShowExpand", "nzCheckable", "nzAsyncData", "nzHideUnMatched", "nzNoAnimation", "nzSelectMode", "nzShowIcon", "nzExpandedIcon", "nzTreeTemplate", "nzBeforeDrop", "nzSearchValue", "nzDraggable"], outputs: ["nzClick", "nzDblClick", "nzContextMenu", "nzCheckBoxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTreeBuiltinNode"] }], directives: [{ type: i7.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i5.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { type: i7.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4$1.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: [treeCollapseMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
        }], ctorParameters: function () { return [{ type: i1.NzTreeBaseService }, { type: i2$1.NzConfigService }, { type: i0.ChangeDetectorRef }, { type: i3$1.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i4$1.NzNoAnimationDirective, decorators: [{
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

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTreeModule {
}
NzTreeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzTreeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeModule, declarations: [NzTreeComponent,
        NzTreeNodeBuiltinComponent,
        NzTreeIndentComponent,
        NzTreeNodeSwitcherComponent,
        NzTreeNodeBuiltinCheckboxComponent,
        NzTreeNodeTitleComponent,
        NzTreeDropIndicatorComponent], imports: [BidiModule,
        CommonModule,
        NzOutletModule,
        NzIconModule,
        NzNoAnimationModule,
        NzHighlightModule,
        ScrollingModule], exports: [NzTreeComponent, NzTreeNodeBuiltinComponent, NzTreeIndentComponent] });
NzTreeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeModule, imports: [[
            BidiModule,
            CommonModule,
            NzOutletModule,
            NzIconModule,
            NzNoAnimationModule,
            NzHighlightModule,
            ScrollingModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BidiModule,
                        CommonModule,
                        NzOutletModule,
                        NzIconModule,
                        NzNoAnimationModule,
                        NzHighlightModule,
                        ScrollingModule
                    ],
                    declarations: [
                        NzTreeComponent,
                        NzTreeNodeBuiltinComponent,
                        NzTreeIndentComponent,
                        NzTreeNodeSwitcherComponent,
                        NzTreeNodeBuiltinCheckboxComponent,
                        NzTreeNodeTitleComponent,
                        NzTreeDropIndicatorComponent
                    ],
                    exports: [NzTreeComponent, NzTreeNodeBuiltinComponent, NzTreeIndentComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzTreeComponent, NzTreeIndentComponent, NzTreeModule, NzTreeNodeBuiltinCheckboxComponent, NzTreeNodeBuiltinComponent, NzTreeNodeSwitcherComponent, NzTreeNodeTitleComponent, NzTreeService, NzTreeServiceFactory };
//# sourceMappingURL=ng-zorro-antd-tree.mjs.map
