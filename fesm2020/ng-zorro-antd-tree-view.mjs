import * as i2 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i1$2 from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, Input, Output, Host, Optional, Directive, Inject, ViewEncapsulation, ViewChild, NgModule } from '@angular/core';
import * as i1 from 'ng-zorro-antd/core/no-animation';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { __decorate } from 'tslib';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject, animationFrameScheduler, asapScheduler, merge, BehaviorSubject } from 'rxjs';
import { takeUntil, auditTime, take, map } from 'rxjs/operators';
import { CdkTreeNode, CdkTree, CdkTreeNodeToggle, CdkTreeNodeDef, CDK_TREE_NODE_OUTLET_NODE, CdkTreeNodeOutlet, CdkTreeNodePadding, CdkTreeNodeOutletContext } from '@angular/cdk/tree';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { treeCollapseMotion } from 'ng-zorro-antd/core/animation';
import { DataSource } from '@angular/cdk/collections';

class NzTreeNodeCheckboxComponent {
    constructor() {
        this.nzClick = new EventEmitter();
    }
    onClick(e) {
        if (!this.nzDisabled) {
            this.nzClick.emit(e);
        }
    }
}
NzTreeNodeCheckboxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeCheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTreeNodeCheckboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeCheckboxComponent, selector: "nz-tree-node-checkbox:not([builtin])", inputs: { nzChecked: "nzChecked", nzIndeterminate: "nzIndeterminate", nzDisabled: "nzDisabled" }, outputs: { nzClick: "nzClick" }, host: { listeners: { "click": "onClick($event)" }, properties: { "class.ant-tree-checkbox-checked": "nzChecked", "class.ant-tree-checkbox-indeterminate": "nzIndeterminate", "class.ant-tree-checkbox-disabled": "nzDisabled" }, classAttribute: "ant-tree-checkbox" }, ngImport: i0, template: ` <span class="ant-tree-checkbox-inner"></span> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    InputBoolean()
], NzTreeNodeCheckboxComponent.prototype, "nzDisabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeCheckboxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-node-checkbox:not([builtin])',
                    template: ` <span class="ant-tree-checkbox-inner"></span> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        class: 'ant-tree-checkbox',
                        '[class.ant-tree-checkbox-checked]': `nzChecked`,
                        '[class.ant-tree-checkbox-indeterminate]': `nzIndeterminate`,
                        '[class.ant-tree-checkbox-disabled]': `nzDisabled`,
                        '(click)': 'onClick($event)'
                    }
                }]
        }], propDecorators: { nzChecked: [{
                type: Input
            }], nzIndeterminate: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzClick: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const getParent = (nodes, node, getLevel) => {
    let index = nodes.indexOf(node);
    if (index < 0) {
        return null;
    }
    const level = getLevel(node);
    for (index--; index >= 0; index--) {
        const preLevel = getLevel(nodes[index]);
        if (preLevel + 1 === level) {
            return nodes[index];
        }
        if (preLevel + 1 < level) {
            return null;
        }
    }
    return null;
};
const getNextSibling = (nodes, node, getLevel, _index) => {
    let index = typeof _index !== 'undefined' ? _index : nodes.indexOf(node);
    if (index < 0) {
        return null;
    }
    const level = getLevel(node);
    for (index++; index < nodes.length; index++) {
        const nextLevel = getLevel(nodes[index]);
        if (nextLevel < level) {
            return null;
        }
        if (nextLevel === level) {
            return nodes[index];
        }
    }
    return null;
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzNodeBase extends CdkTreeNode {
}

// eslint-disable-next-line @angular-eslint/component-class-suffix
class NzTreeView extends CdkTree {
    constructor(differs, changeDetectorRef, noAnimation, directionality) {
        super(differs, changeDetectorRef);
        this.differs = differs;
        this.changeDetectorRef = changeDetectorRef;
        this.noAnimation = noAnimation;
        this.directionality = directionality;
        this.destroy$ = new Subject();
        this.dir = 'ltr';
        this._dataSourceChanged = new Subject();
        this.nzDirectoryTree = false;
        this.nzBlockNode = false;
    }
    get dataSource() {
        return super.dataSource;
    }
    set dataSource(dataSource) {
        super.dataSource = dataSource;
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.directionality) {
            this.dir = this.directionality.value;
            this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                this.dir = direction;
                this.changeDetectorRef.detectChanges();
            });
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.destroy$.next();
        this.destroy$.complete();
    }
    renderNodeChanges(data, dataDiffer, viewContainer, parentData) {
        super.renderNodeChanges(data, dataDiffer, viewContainer, parentData);
        this._dataSourceChanged.next();
    }
}
NzTreeView.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeView, deps: [{ token: i0.IterableDiffers }, { token: i0.ChangeDetectorRef }, { token: i1.NzNoAnimationDirective, host: true, optional: true }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTreeView.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeView, selector: "ng-component", inputs: { treeControl: ["nzTreeControl", "treeControl"], dataSource: ["nzDataSource", "dataSource"], nzDirectoryTree: "nzDirectoryTree", nzBlockNode: "nzBlockNode" }, usesInheritance: true, ngImport: i0, template: '', isInline: true });
__decorate([
    InputBoolean()
], NzTreeView.prototype, "nzDirectoryTree", void 0);
__decorate([
    InputBoolean()
], NzTreeView.prototype, "nzBlockNode", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeView, decorators: [{
            type: Component,
            args: [{ template: '' }]
        }], ctorParameters: function () { return [{ type: i0.IterableDiffers }, { type: i0.ChangeDetectorRef }, { type: i1.NzNoAnimationDirective, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { treeControl: [{
                type: Input,
                args: ['nzTreeControl']
            }], dataSource: [{
                type: Input,
                args: ['nzDataSource']
            }], nzDirectoryTree: [{
                type: Input
            }], nzBlockNode: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * [true, false, false, true] => 1001
 */
function booleanArrayToString(arr) {
    return arr.map(i => (i ? 1 : 0)).join('');
}
const BUILD_INDENTS_SCHEDULER = typeof requestAnimationFrame !== 'undefined' ? animationFrameScheduler : asapScheduler;
class NzTreeNodeIndentsComponent {
    constructor() {
        this.indents = [];
    }
}
NzTreeNodeIndentsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeIndentsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTreeNodeIndentsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeIndentsComponent, selector: "nz-tree-node-indents", inputs: { indents: "indents" }, host: { classAttribute: "ant-tree-indent" }, ngImport: i0, template: `
    <span class="ant-tree-indent-unit" [class.ant-tree-indent-unit-end]="!isEnd" *ngFor="let isEnd of indents"></span>
  `, isInline: true, directives: [{ type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeIndentsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-node-indents',
                    template: `
    <span class="ant-tree-indent-unit" [class.ant-tree-indent-unit-end]="!isEnd" *ngFor="let isEnd of indents"></span>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'ant-tree-indent'
                    }
                }]
        }], propDecorators: { indents: [{
                type: Input
            }] } });
class NzTreeNodeIndentLineDirective {
    constructor(treeNode, tree, cdr) {
        this.treeNode = treeNode;
        this.tree = tree;
        this.cdr = cdr;
        this.isLast = 'unset';
        this.isLeaf = false;
        this.preNodeRef = null;
        this.nextNodeRef = null;
        this.currentIndents = '';
        this.buildIndents();
        this.checkLast();
        /**
         * The dependent data (TreeControl.dataNodes) can be set after node instantiation,
         * and setting the indents can cause frame rate loss if it is set too often.
         */
        this.changeSubscription = merge(this.treeNode._dataChanges, tree._dataSourceChanged)
            .pipe(auditTime(0, BUILD_INDENTS_SCHEDULER))
            .subscribe(() => {
            this.buildIndents();
            this.checkAdjacent();
            this.cdr.markForCheck();
        });
    }
    getIndents() {
        const indents = [];
        const nodes = this.tree.treeControl.dataNodes;
        const getLevel = this.tree.treeControl.getLevel;
        let parent = getParent(nodes, this.treeNode.data, getLevel);
        while (parent) {
            const parentNextSibling = getNextSibling(nodes, parent, getLevel);
            if (parentNextSibling) {
                indents.unshift(true);
            }
            else {
                indents.unshift(false);
            }
            parent = getParent(nodes, parent, getLevel);
        }
        return indents;
    }
    buildIndents() {
        if (this.treeNode.data) {
            const indents = this.getIndents();
            const diffString = booleanArrayToString(indents);
            if (diffString !== this.currentIndents) {
                this.treeNode.setIndents(this.getIndents());
                this.currentIndents = diffString;
            }
        }
    }
    /**
     * We need to add an class name for the last child node,
     * this result can also be affected when the adjacent nodes are changed.
     */
    checkAdjacent() {
        const nodes = this.tree.treeControl.dataNodes;
        const index = nodes.indexOf(this.treeNode.data);
        const preNode = nodes[index - 1] || null;
        const nextNode = nodes[index + 1] || null;
        if (this.nextNodeRef !== nextNode || this.preNodeRef !== preNode) {
            this.checkLast(index);
        }
        this.preNodeRef = preNode;
        this.nextNodeRef = nextNode;
    }
    checkLast(index) {
        const nodes = this.tree.treeControl.dataNodes;
        this.isLeaf = this.treeNode.isLeaf;
        this.isLast = !getNextSibling(nodes, this.treeNode.data, this.tree.treeControl.getLevel, index);
    }
    ngOnDestroy() {
        this.preNodeRef = null;
        this.nextNodeRef = null;
        this.changeSubscription.unsubscribe();
    }
}
NzTreeNodeIndentLineDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeIndentLineDirective, deps: [{ token: NzNodeBase }, { token: NzTreeView }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodeIndentLineDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeIndentLineDirective, selector: "nz-tree-node[nzTreeNodeIndentLine]", host: { properties: { "class.ant-tree-treenode-leaf-last": "isLast && isLeaf" }, classAttribute: "ant-tree-show-line" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeIndentLineDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-tree-node[nzTreeNodeIndentLine]',
                    host: {
                        class: 'ant-tree-show-line',
                        '[class.ant-tree-treenode-leaf-last]': 'isLast && isLeaf'
                    }
                }]
        }], ctorParameters: function () { return [{ type: NzNodeBase }, { type: NzTreeView }, { type: i0.ChangeDetectorRef }]; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTreeNodeNoopToggleDirective {
}
NzTreeNodeNoopToggleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeNoopToggleDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodeNoopToggleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeNoopToggleDirective, selector: "nz-tree-node-toggle[nzTreeNodeNoopToggle], [nzTreeNodeNoopToggle]", host: { classAttribute: "ant-tree-switcher ant-tree-switcher-noop" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeNoopToggleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-tree-node-toggle[nzTreeNodeNoopToggle], [nzTreeNodeNoopToggle]',
                    host: {
                        class: 'ant-tree-switcher ant-tree-switcher-noop'
                    }
                }]
        }] });
class NzTreeNodeToggleDirective extends CdkTreeNodeToggle {
    get recursive() {
        return this._recursive;
    }
    set recursive(value) {
        this._recursive = coerceBooleanProperty(value);
    }
    get isExpanded() {
        return this._treeNode.isExpanded;
    }
}
NzTreeNodeToggleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeToggleDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodeToggleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeToggleDirective, selector: "nz-tree-node-toggle:not([nzTreeNodeNoopToggle]), [nzTreeNodeToggle]", inputs: { recursive: ["nzTreeNodeToggleRecursive", "recursive"] }, host: { properties: { "class.ant-tree-switcher_open": "isExpanded", "class.ant-tree-switcher_close": "!isExpanded" }, classAttribute: "ant-tree-switcher" }, providers: [{ provide: CdkTreeNodeToggle, useExisting: NzTreeNodeToggleDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeToggleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-tree-node-toggle:not([nzTreeNodeNoopToggle]), [nzTreeNodeToggle]',
                    providers: [{ provide: CdkTreeNodeToggle, useExisting: NzTreeNodeToggleDirective }],
                    host: {
                        class: 'ant-tree-switcher',
                        '[class.ant-tree-switcher_open]': 'isExpanded',
                        '[class.ant-tree-switcher_close]': '!isExpanded'
                    }
                }]
        }], propDecorators: { recursive: [{
                type: Input,
                args: ['nzTreeNodeToggleRecursive']
            }] } });
class NzTreeNodeToggleRotateIconDirective {
}
NzTreeNodeToggleRotateIconDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeToggleRotateIconDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodeToggleRotateIconDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeToggleRotateIconDirective, selector: "[nz-icon][nzTreeNodeToggleRotateIcon]", host: { classAttribute: "ant-tree-switcher-icon" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeToggleRotateIconDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-icon][nzTreeNodeToggleRotateIcon]',
                    host: {
                        class: 'ant-tree-switcher-icon'
                    }
                }]
        }] });
class NzTreeNodeToggleActiveIconDirective {
}
NzTreeNodeToggleActiveIconDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeToggleActiveIconDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodeToggleActiveIconDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeToggleActiveIconDirective, selector: "[nz-icon][nzTreeNodeToggleActiveIcon]", host: { classAttribute: "ant-tree-switcher-loading-icon" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeToggleActiveIconDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-icon][nzTreeNodeToggleActiveIcon]',
                    host: {
                        class: 'ant-tree-switcher-loading-icon'
                    }
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTreeNodeComponent extends NzNodeBase {
    constructor(elementRef, tree, renderer, cdr) {
        super(elementRef, tree);
        this.elementRef = elementRef;
        this.tree = tree;
        this.renderer = renderer;
        this.cdr = cdr;
        this.indents = [];
        this.disabled = false;
        this.selected = false;
        this.isLeaf = false;
        this._elementRef.nativeElement.classList.add('ant-tree-treenode');
    }
    ngOnInit() {
        this.isLeaf = !this.tree.treeControl.isExpandable(this.data);
    }
    disable() {
        this.disabled = true;
        this.updateDisabledClass();
    }
    enable() {
        this.disabled = false;
        this.updateDisabledClass();
    }
    select() {
        this.selected = true;
        this.updateSelectedClass();
    }
    deselect() {
        this.selected = false;
        this.updateSelectedClass();
    }
    setIndents(indents) {
        this.indents = indents;
        this.cdr.markForCheck();
    }
    updateSelectedClass() {
        if (this.selected) {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-tree-treenode-selected');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-tree-treenode-selected');
        }
    }
    updateDisabledClass() {
        if (this.disabled) {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-tree-treenode-disabled');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-tree-treenode-disabled');
        }
    }
}
NzTreeNodeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeComponent, deps: [{ token: i0.ElementRef }, { token: NzTreeView }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzTreeNodeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeComponent, selector: "nz-tree-node:not([builtin])", host: { properties: { "class.ant-tree-treenode-switcher-open": "isExpanded", "class.ant-tree-treenode-switcher-close": "!isExpanded" } }, providers: [
        { provide: CdkTreeNode, useExisting: NzTreeNodeComponent },
        { provide: NzNodeBase, useExisting: NzTreeNodeComponent }
    ], exportAs: ["nzTreeNode"], usesInheritance: true, ngImport: i0, template: `
    <nz-tree-node-indents [indents]="indents" *ngIf="indents.length"></nz-tree-node-indents>
    <ng-content select="nz-tree-node-toggle, [nz-tree-node-toggle]"></ng-content>
    <nz-tree-node-toggle class="nz-tree-leaf-line-icon" *ngIf="indents.length && isLeaf" nzTreeNodeNoopToggle>
      <span class="ant-tree-switcher-leaf-line"></span>
    </nz-tree-node-toggle>
    <ng-content select="nz-tree-node-checkbox"></ng-content>
    <ng-content select="nz-tree-node-option"></ng-content>
    <ng-content></ng-content>
  `, isInline: true, components: [{ type: NzTreeNodeIndentsComponent, selector: "nz-tree-node-indents", inputs: ["indents"] }], directives: [{ type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: NzTreeNodeNoopToggleDirective, selector: "nz-tree-node-toggle[nzTreeNodeNoopToggle], [nzTreeNodeNoopToggle]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-node:not([builtin])',
                    exportAs: 'nzTreeNode',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        { provide: CdkTreeNode, useExisting: NzTreeNodeComponent },
                        { provide: NzNodeBase, useExisting: NzTreeNodeComponent }
                    ],
                    template: `
    <nz-tree-node-indents [indents]="indents" *ngIf="indents.length"></nz-tree-node-indents>
    <ng-content select="nz-tree-node-toggle, [nz-tree-node-toggle]"></ng-content>
    <nz-tree-node-toggle class="nz-tree-leaf-line-icon" *ngIf="indents.length && isLeaf" nzTreeNodeNoopToggle>
      <span class="ant-tree-switcher-leaf-line"></span>
    </nz-tree-node-toggle>
    <ng-content select="nz-tree-node-checkbox"></ng-content>
    <ng-content select="nz-tree-node-option"></ng-content>
    <ng-content></ng-content>
  `,
                    host: {
                        '[class.ant-tree-treenode-switcher-open]': 'isExpanded',
                        '[class.ant-tree-treenode-switcher-close]': '!isExpanded'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: NzTreeView }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; } });
class NzTreeNodeDefDirective extends CdkTreeNodeDef {
}
NzTreeNodeDefDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeDefDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodeDefDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeDefDirective, selector: "[nzTreeNodeDef]", inputs: { when: ["nzTreeNodeDefWhen", "when"] }, providers: [{ provide: CdkTreeNodeDef, useExisting: NzTreeNodeDefDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeDefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzTreeNodeDef]',
                    providers: [{ provide: CdkTreeNodeDef, useExisting: NzTreeNodeDefDirective }]
                }]
        }], propDecorators: { when: [{
                type: Input,
                args: ['nzTreeNodeDefWhen']
            }] } });
class NzTreeVirtualScrollNodeOutletDirective {
    constructor(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
        this._viewRef = null;
    }
    ngOnChanges(changes) {
        const recreateView = this.shouldRecreateView(changes);
        if (recreateView) {
            const viewContainerRef = this._viewContainerRef;
            if (this._viewRef) {
                viewContainerRef.remove(viewContainerRef.indexOf(this._viewRef));
            }
            this._viewRef = this.data
                ? viewContainerRef.createEmbeddedView(this.data.nodeDef.template, this.data.context)
                : null;
            if (CdkTreeNode.mostRecentTreeNode && this._viewRef) {
                CdkTreeNode.mostRecentTreeNode.data = this.data.data;
            }
        }
        else if (this._viewRef && this.data.context) {
            this.updateExistingContext(this.data.context);
        }
    }
    shouldRecreateView(changes) {
        const ctxChange = changes.data;
        return ctxChange && this.hasContextShapeChanged(ctxChange);
    }
    hasContextShapeChanged(ctxChange) {
        const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
        const currCtxKeys = Object.keys(ctxChange.currentValue || {});
        if (prevCtxKeys.length === currCtxKeys.length) {
            for (const propName of currCtxKeys) {
                if (prevCtxKeys.indexOf(propName) === -1) {
                    return true;
                }
            }
            return ctxChange.previousValue?.data !== ctxChange.currentValue?.data;
        }
        return true;
    }
    updateExistingContext(ctx) {
        for (const propName of Object.keys(ctx)) {
            this._viewRef.context[propName] = this.data.context[propName];
        }
    }
}
NzTreeVirtualScrollNodeOutletDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeVirtualScrollNodeOutletDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
NzTreeVirtualScrollNodeOutletDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeVirtualScrollNodeOutletDirective, selector: "[nzTreeVirtualScrollNodeOutlet]", inputs: { data: "data" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeVirtualScrollNodeOutletDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzTreeVirtualScrollNodeOutlet]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { data: [{
                type: Input
            }] } });

class NzTreeNodeOptionComponent {
    constructor(treeNode) {
        this.treeNode = treeNode;
        this.nzSelected = false;
        this.nzDisabled = false;
        this.nzClick = new EventEmitter();
    }
    get isExpanded() {
        return this.treeNode.isExpanded;
    }
    onClick(e) {
        if (!this.nzDisabled) {
            this.nzClick.emit(e);
        }
    }
    ngOnChanges(changes) {
        const { nzDisabled, nzSelected } = changes;
        if (nzDisabled) {
            if (nzDisabled.currentValue) {
                this.treeNode.disable();
            }
            else {
                this.treeNode.enable();
            }
        }
        if (nzSelected) {
            if (nzSelected.currentValue) {
                this.treeNode.select();
            }
            else {
                this.treeNode.deselect();
            }
        }
    }
}
NzTreeNodeOptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeOptionComponent, deps: [{ token: NzTreeNodeComponent }], target: i0.ɵɵFactoryTarget.Component });
NzTreeNodeOptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeOptionComponent, selector: "nz-tree-node-option", inputs: { nzSelected: "nzSelected", nzDisabled: "nzDisabled" }, outputs: { nzClick: "nzClick" }, host: { listeners: { "click": "onClick($event)" }, properties: { "class.ant-tree-node-content-wrapper-open": "isExpanded", "class.ant-tree-node-selected": "nzSelected" }, classAttribute: "ant-tree-node-content-wrapper" }, usesOnChanges: true, ngImport: i0, template: ` <span class="ant-tree-title"><ng-content></ng-content></span> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    InputBoolean()
], NzTreeNodeOptionComponent.prototype, "nzSelected", void 0);
__decorate([
    InputBoolean()
], NzTreeNodeOptionComponent.prototype, "nzDisabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeOptionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-node-option',
                    template: ` <span class="ant-tree-title"><ng-content></ng-content></span> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'ant-tree-node-content-wrapper',
                        '[class.ant-tree-node-content-wrapper-open]': 'isExpanded',
                        '[class.ant-tree-node-selected]': 'nzSelected',
                        '(click)': 'onClick($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: NzTreeNodeComponent }]; }, propDecorators: { nzSelected: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzClick: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTreeNodeOutletDirective {
    constructor(viewContainer, _node) {
        this.viewContainer = viewContainer;
        this._node = _node;
    }
}
NzTreeNodeOutletDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeOutletDirective, deps: [{ token: i0.ViewContainerRef }, { token: CDK_TREE_NODE_OUTLET_NODE, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodeOutletDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeOutletDirective, selector: "[nzTreeNodeOutlet]", providers: [
        {
            provide: CdkTreeNodeOutlet,
            useExisting: NzTreeNodeOutletDirective
        }
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeOutletDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzTreeNodeOutlet]',
                    providers: [
                        {
                            provide: CdkTreeNodeOutlet,
                            useExisting: NzTreeNodeOutletDirective
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [CDK_TREE_NODE_OUTLET_NODE]
                }, {
                    type: Optional
                }] }]; } });

class NzTreeNodePaddingDirective extends CdkTreeNodePadding {
    constructor() {
        super(...arguments);
        this._indent = 24;
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this._setLevelInput(value);
    }
    get indent() {
        return this._indent;
    }
    set indent(indent) {
        this._setIndentInput(indent);
    }
}
NzTreeNodePaddingDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodePaddingDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodePaddingDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodePaddingDirective, selector: "[nzTreeNodePadding]", inputs: { level: ["nzTreeNodePadding", "level"], indent: ["nzTreeNodePaddingIndent", "indent"] }, providers: [{ provide: CdkTreeNodePadding, useExisting: NzTreeNodePaddingDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodePaddingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzTreeNodePadding]',
                    providers: [{ provide: CdkTreeNodePadding, useExisting: NzTreeNodePaddingDirective }]
                }]
        }], propDecorators: { level: [{
                type: Input,
                args: ['nzTreeNodePadding']
            }], indent: [{
                type: Input,
                args: ['nzTreeNodePaddingIndent']
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTreeViewComponent extends NzTreeView {
    constructor() {
        super(...arguments);
        this._afterViewInit = false;
    }
    ngAfterViewInit() {
        Promise.resolve().then(() => {
            this._afterViewInit = true;
            this.changeDetectorRef.markForCheck();
        });
    }
}
NzTreeViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeViewComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
NzTreeViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeViewComponent, selector: "nz-tree-view", host: { properties: { "class.ant-tree-block-node": "nzDirectoryTree || nzBlockNode", "class.ant-tree-directory": "nzDirectoryTree", "class.ant-tree-rtl": "dir === 'rtl'" }, classAttribute: "ant-tree" }, providers: [
        { provide: CdkTree, useExisting: NzTreeViewComponent },
        { provide: NzTreeView, useExisting: NzTreeViewComponent }
    ], viewQueries: [{ propertyName: "nodeOutlet", first: true, predicate: NzTreeNodeOutletDirective, descendants: true, static: true }], exportAs: ["nzTreeView"], usesInheritance: true, ngImport: i0, template: `
    <div class="ant-tree-list-holder">
      <div
        [@.disabled]="!_afterViewInit || noAnimation?.nzNoAnimation"
        [@treeCollapseMotion]="_nodeOutlet.viewContainer.length"
        class="ant-tree-list-holder-inner"
      >
        <ng-container nzTreeNodeOutlet></ng-container>
      </div>
    </div>
  `, isInline: true, directives: [{ type: NzTreeNodeOutletDirective, selector: "[nzTreeNodeOutlet]" }], animations: [treeCollapseMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-view',
                    exportAs: 'nzTreeView',
                    template: `
    <div class="ant-tree-list-holder">
      <div
        [@.disabled]="!_afterViewInit || noAnimation?.nzNoAnimation"
        [@treeCollapseMotion]="_nodeOutlet.viewContainer.length"
        class="ant-tree-list-holder-inner"
      >
        <ng-container nzTreeNodeOutlet></ng-container>
      </div>
    </div>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        { provide: CdkTree, useExisting: NzTreeViewComponent },
                        { provide: NzTreeView, useExisting: NzTreeViewComponent }
                    ],
                    host: {
                        class: 'ant-tree',
                        '[class.ant-tree-block-node]': 'nzDirectoryTree || nzBlockNode',
                        '[class.ant-tree-directory]': 'nzDirectoryTree',
                        '[class.ant-tree-rtl]': `dir === 'rtl'`
                    },
                    animations: [treeCollapseMotion]
                }]
        }], propDecorators: { nodeOutlet: [{
                type: ViewChild,
                args: [NzTreeNodeOutletDirective, { static: true }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const DEFAULT_SIZE = 28;
class NzTreeVirtualScrollViewComponent extends NzTreeView {
    constructor() {
        super(...arguments);
        this.nzItemSize = DEFAULT_SIZE;
        this.nzMinBufferPx = DEFAULT_SIZE * 5;
        this.nzMaxBufferPx = DEFAULT_SIZE * 10;
        this.nodes = [];
        this.innerTrackBy = i => i;
    }
    ngOnChanges(changes) {
        if (changes.trackBy) {
            if (typeof changes.trackBy.currentValue === 'function') {
                this.innerTrackBy = (index, n) => this.trackBy(index, n.data);
            }
            else {
                this.innerTrackBy = i => i;
            }
        }
    }
    renderNodeChanges(data) {
        this.nodes = new Array(...data).map((n, i) => this.createNode(n, i));
        this._dataSourceChanged.next();
    }
    createNode(nodeData, index) {
        const node = this._getNodeDef(nodeData, index);
        const context = new CdkTreeNodeOutletContext(nodeData);
        if (this.treeControl.getLevel) {
            context.level = this.treeControl.getLevel(nodeData);
        }
        else {
            context.level = 0;
        }
        return {
            data: nodeData,
            context,
            nodeDef: node
        };
    }
}
NzTreeVirtualScrollViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeVirtualScrollViewComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
NzTreeVirtualScrollViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeVirtualScrollViewComponent, selector: "nz-tree-virtual-scroll-view", inputs: { nzItemSize: "nzItemSize", nzMinBufferPx: "nzMinBufferPx", nzMaxBufferPx: "nzMaxBufferPx", trackBy: "trackBy" }, host: { properties: { "class.ant-tree-block-node": "nzDirectoryTree || nzBlockNode", "class.ant-tree-directory": "nzDirectoryTree", "class.ant-tree-rtl": "dir === 'rtl'" }, classAttribute: "ant-tree" }, providers: [
        { provide: NzTreeView, useExisting: NzTreeVirtualScrollViewComponent },
        { provide: CdkTree, useExisting: NzTreeVirtualScrollViewComponent }
    ], viewQueries: [{ propertyName: "nodeOutlet", first: true, predicate: NzTreeNodeOutletDirective, descendants: true, static: true }, { propertyName: "virtualScrollViewport", first: true, predicate: CdkVirtualScrollViewport, descendants: true, static: true }], exportAs: ["nzTreeVirtualScrollView"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
    <div class="ant-tree-list">
      <cdk-virtual-scroll-viewport
        class="ant-tree-list-holder"
        [itemSize]="nzItemSize"
        [minBufferPx]="nzMinBufferPx"
        [maxBufferPx]="nzMaxBufferPx"
      >
        <ng-container *cdkVirtualFor="let item of nodes; let i = index; trackBy: innerTrackBy">
          <ng-template nzTreeVirtualScrollNodeOutlet [data]="item"></ng-template>
        </ng-container>
      </cdk-virtual-scroll-viewport>
    </div>
    <ng-container nzTreeNodeOutlet></ng-container>
  `, isInline: true, components: [{ type: i1$2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }], directives: [{ type: i1$2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i1$2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { type: NzTreeVirtualScrollNodeOutletDirective, selector: "[nzTreeVirtualScrollNodeOutlet]", inputs: ["data"] }, { type: NzTreeNodeOutletDirective, selector: "[nzTreeNodeOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeVirtualScrollViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-virtual-scroll-view',
                    exportAs: 'nzTreeVirtualScrollView',
                    template: `
    <div class="ant-tree-list">
      <cdk-virtual-scroll-viewport
        class="ant-tree-list-holder"
        [itemSize]="nzItemSize"
        [minBufferPx]="nzMinBufferPx"
        [maxBufferPx]="nzMaxBufferPx"
      >
        <ng-container *cdkVirtualFor="let item of nodes; let i = index; trackBy: innerTrackBy">
          <ng-template nzTreeVirtualScrollNodeOutlet [data]="item"></ng-template>
        </ng-container>
      </cdk-virtual-scroll-viewport>
    </div>
    <ng-container nzTreeNodeOutlet></ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        { provide: NzTreeView, useExisting: NzTreeVirtualScrollViewComponent },
                        { provide: CdkTree, useExisting: NzTreeVirtualScrollViewComponent }
                    ],
                    host: {
                        class: 'ant-tree',
                        '[class.ant-tree-block-node]': 'nzDirectoryTree || nzBlockNode',
                        '[class.ant-tree-directory]': 'nzDirectoryTree',
                        '[class.ant-tree-rtl]': `dir === 'rtl'`
                    }
                }]
        }], propDecorators: { nodeOutlet: [{
                type: ViewChild,
                args: [NzTreeNodeOutletDirective, { static: true }]
            }], virtualScrollViewport: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport, { static: true }]
            }], nzItemSize: [{
                type: Input
            }], nzMinBufferPx: [{
                type: Input
            }], nzMaxBufferPx: [{
                type: Input
            }], trackBy: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const treeWithControlComponents = [
    NzTreeView,
    NzTreeNodeOutletDirective,
    NzTreeViewComponent,
    NzTreeNodeDefDirective,
    NzTreeNodeComponent,
    NzTreeNodeToggleDirective,
    NzTreeNodePaddingDirective,
    NzTreeNodeToggleRotateIconDirective,
    NzTreeNodeToggleActiveIconDirective,
    NzTreeNodeOptionComponent,
    NzTreeNodeNoopToggleDirective,
    NzTreeNodeCheckboxComponent,
    NzTreeNodeIndentsComponent,
    NzTreeVirtualScrollViewComponent,
    NzTreeVirtualScrollNodeOutletDirective,
    NzTreeNodeIndentLineDirective
];
class NzTreeViewModule {
}
NzTreeViewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeViewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzTreeViewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeViewModule, declarations: [NzTreeView,
        NzTreeNodeOutletDirective,
        NzTreeViewComponent,
        NzTreeNodeDefDirective,
        NzTreeNodeComponent,
        NzTreeNodeToggleDirective,
        NzTreeNodePaddingDirective,
        NzTreeNodeToggleRotateIconDirective,
        NzTreeNodeToggleActiveIconDirective,
        NzTreeNodeOptionComponent,
        NzTreeNodeNoopToggleDirective,
        NzTreeNodeCheckboxComponent,
        NzTreeNodeIndentsComponent,
        NzTreeVirtualScrollViewComponent,
        NzTreeVirtualScrollNodeOutletDirective,
        NzTreeNodeIndentLineDirective], imports: [BidiModule, CommonModule, NzNoAnimationModule, ScrollingModule], exports: [NzTreeView,
        NzTreeNodeOutletDirective,
        NzTreeViewComponent,
        NzTreeNodeDefDirective,
        NzTreeNodeComponent,
        NzTreeNodeToggleDirective,
        NzTreeNodePaddingDirective,
        NzTreeNodeToggleRotateIconDirective,
        NzTreeNodeToggleActiveIconDirective,
        NzTreeNodeOptionComponent,
        NzTreeNodeNoopToggleDirective,
        NzTreeNodeCheckboxComponent,
        NzTreeNodeIndentsComponent,
        NzTreeVirtualScrollViewComponent,
        NzTreeVirtualScrollNodeOutletDirective,
        NzTreeNodeIndentLineDirective] });
NzTreeViewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeViewModule, imports: [[BidiModule, CommonModule, NzNoAnimationModule, ScrollingModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeViewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, NzNoAnimationModule, ScrollingModule],
                    declarations: [treeWithControlComponents],
                    exports: [treeWithControlComponents]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTreeFlattener {
    constructor(transformFunction, getLevel, isExpandable, getChildren) {
        this.transformFunction = transformFunction;
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
        this.getChildren = getChildren;
    }
    flattenNode(node, level, resultNodes, parentMap) {
        const flatNode = this.transformFunction(node, level);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            const childrenNodes = this.getChildren(node);
            if (childrenNodes) {
                if (Array.isArray(childrenNodes)) {
                    this.flattenChildren(childrenNodes, level, resultNodes, parentMap);
                }
                else {
                    childrenNodes.pipe(take(1)).subscribe(children => {
                        this.flattenChildren(children, level, resultNodes, parentMap);
                    });
                }
            }
        }
        return resultNodes;
    }
    flattenChildren(children, level, resultNodes, parentMap) {
        children.forEach((child, index) => {
            const childParentMap = parentMap.slice();
            childParentMap.push(index !== children.length - 1);
            this.flattenNode(child, level + 1, resultNodes, childParentMap);
        });
    }
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    flattenNodes(structuredData) {
        const resultNodes = [];
        structuredData.forEach(node => this.flattenNode(node, 0, resultNodes, []));
        return resultNodes;
    }
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     */
    expandFlattenedNodes(nodes, treeControl) {
        const results = [];
        const currentExpand = [];
        currentExpand[0] = true;
        nodes.forEach(node => {
            let expand = true;
            for (let i = 0; i <= this.getLevel(node); i++) {
                expand = expand && currentExpand[i];
            }
            if (expand) {
                results.push(node);
            }
            if (this.isExpandable(node)) {
                currentExpand[this.getLevel(node) + 1] = treeControl.isExpanded(node);
            }
        });
        return results;
    }
}
class NzTreeFlatDataSource extends DataSource {
    constructor(_treeControl, _treeFlattener, initialData = []) {
        super();
        this._treeControl = _treeControl;
        this._treeFlattener = _treeFlattener;
        this._flattenedData = new BehaviorSubject([]);
        this._expandedData = new BehaviorSubject([]);
        this._data = new BehaviorSubject(initialData);
        this.flatNodes();
    }
    setData(value) {
        this._data.next(value);
        this.flatNodes();
    }
    getData() {
        return this._data.getValue();
    }
    connect(collectionViewer) {
        const changes = [collectionViewer.viewChange, this._treeControl.expansionModel.changed, this._flattenedData];
        return merge(...changes).pipe(map(() => {
            this._expandedData.next(this._treeFlattener.expandFlattenedNodes(this._flattenedData.value, this._treeControl));
            return this._expandedData.value;
        }));
    }
    disconnect() {
        // no op
    }
    flatNodes() {
        this._flattenedData.next(this._treeFlattener.flattenNodes(this.getData()));
        this._treeControl.dataNodes = this._flattenedData.value;
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzTreeFlatDataSource, NzTreeFlattener, NzTreeNodeCheckboxComponent, NzTreeNodeComponent, NzTreeNodeDefDirective, NzTreeNodeIndentLineDirective, NzTreeNodeIndentsComponent, NzTreeNodeNoopToggleDirective, NzTreeNodeOptionComponent, NzTreeNodeOutletDirective, NzTreeNodePaddingDirective, NzTreeNodeToggleActiveIconDirective, NzTreeNodeToggleDirective, NzTreeNodeToggleRotateIconDirective, NzTreeView, NzTreeViewComponent, NzTreeViewModule, NzTreeVirtualScrollNodeOutletDirective, NzTreeVirtualScrollViewComponent, getNextSibling, getParent };
//# sourceMappingURL=ng-zorro-antd-tree-view.mjs.map
