/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Directive, Input } from '@angular/core';
import { animationFrameScheduler, asapScheduler, merge } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { getNextSibling, getParent } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./node-base";
import * as i3 from "./tree";
/**
 * [true, false, false, true] => 1001
 */
function booleanArrayToString(arr) {
    return arr.map(i => (i ? 1 : 0)).join('');
}
const BUILD_INDENTS_SCHEDULER = typeof requestAnimationFrame !== 'undefined' ? animationFrameScheduler : asapScheduler;
export class NzTreeNodeIndentsComponent {
    constructor() {
        this.indents = [];
    }
}
NzTreeNodeIndentsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeIndentsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTreeNodeIndentsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeIndentsComponent, selector: "nz-tree-node-indents", inputs: { indents: "indents" }, host: { classAttribute: "ant-tree-indent" }, ngImport: i0, template: `
    <span class="ant-tree-indent-unit" [class.ant-tree-indent-unit-end]="!isEnd" *ngFor="let isEnd of indents"></span>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
export class NzTreeNodeIndentLineDirective {
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
NzTreeNodeIndentLineDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeIndentLineDirective, deps: [{ token: i2.NzNodeBase }, { token: i3.NzTreeView }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
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
        }], ctorParameters: function () { return [{ type: i2.NzNodeBase }, { type: i3.NzTreeView }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlLXZpZXcvaW5kZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBcUIsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUkzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7QUFFcEQ7O0dBRUc7QUFDSCxTQUFTLG9CQUFvQixDQUFDLEdBQWM7SUFDMUMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVELE1BQU0sdUJBQXVCLEdBQUcsT0FBTyxxQkFBcUIsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7QUFZdkgsTUFBTSxPQUFPLDBCQUEwQjtJQVZ2QztRQVdXLFlBQU8sR0FBYyxFQUFFLENBQUM7S0FDbEM7O3VIQUZZLDBCQUEwQjsyR0FBMUIsMEJBQTBCLHlJQVIzQjs7R0FFVDsyRkFNVSwwQkFBMEI7a0JBVnRDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFOztHQUVUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGlC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QUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDMUMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLE9BQU8sRUFBRTtZQUNoRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVPLFNBQVMsQ0FBQyxLQUFjO1FBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDOzswSEEvRVUsNkJBQTZCOzhHQUE3Qiw2QkFBNkI7MkZBQTdCLDZCQUE2QjtrQkFQekMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0NBQW9DO29CQUM5QyxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLG9CQUFvQjt3QkFDM0IscUNBQXFDLEVBQUUsa0JBQWtCO3FCQUMxRDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBEaXJlY3RpdmUsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyLCBhc2FwU2NoZWR1bGVyLCBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBhdWRpdFRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56Tm9kZUJhc2UgfSBmcm9tICcuL25vZGUtYmFzZSc7XG5pbXBvcnQgeyBOelRyZWVWaWV3IH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7IGdldE5leHRTaWJsaW5nLCBnZXRQYXJlbnQgfSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBbdHJ1ZSwgZmFsc2UsIGZhbHNlLCB0cnVlXSA9PiAxMDAxXG4gKi9cbmZ1bmN0aW9uIGJvb2xlYW5BcnJheVRvU3RyaW5nKGFycjogYm9vbGVhbltdKTogc3RyaW5nIHtcbiAgcmV0dXJuIGFyci5tYXAoaSA9PiAoaSA/IDEgOiAwKSkuam9pbignJyk7XG59XG5cbmNvbnN0IEJVSUxEX0lOREVOVFNfU0NIRURVTEVSID0gdHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSAhPT0gJ3VuZGVmaW5lZCcgPyBhbmltYXRpb25GcmFtZVNjaGVkdWxlciA6IGFzYXBTY2hlZHVsZXI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRyZWUtbm9kZS1pbmRlbnRzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiBjbGFzcz1cImFudC10cmVlLWluZGVudC11bml0XCIgW2NsYXNzLmFudC10cmVlLWluZGVudC11bml0LWVuZF09XCIhaXNFbmRcIiAqbmdGb3I9XCJsZXQgaXNFbmQgb2YgaW5kZW50c1wiPjwvc3Bhbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC10cmVlLWluZGVudCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVOb2RlSW5kZW50c0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGluZGVudHM6IGJvb2xlYW5bXSA9IFtdO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduei10cmVlLW5vZGVbbnpUcmVlTm9kZUluZGVudExpbmVdJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXRyZWUtc2hvdy1saW5lJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLXRyZWVub2RlLWxlYWYtbGFzdF0nOiAnaXNMYXN0ICYmIGlzTGVhZidcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVOb2RlSW5kZW50TGluZURpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGlzTGFzdDogYm9vbGVhbiB8ICd1bnNldCcgPSAndW5zZXQnO1xuICBpc0xlYWYgPSBmYWxzZTtcbiAgcHJpdmF0ZSBwcmVOb2RlUmVmOiBUIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbmV4dE5vZGVSZWY6IFQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBjdXJyZW50SW5kZW50czogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgY2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmVlTm9kZTogTnpOb2RlQmFzZTxUPiwgcHJpdmF0ZSB0cmVlOiBOelRyZWVWaWV3PFQ+LCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmJ1aWxkSW5kZW50cygpO1xuICAgIHRoaXMuY2hlY2tMYXN0KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZGVwZW5kZW50IGRhdGEgKFRyZWVDb250cm9sLmRhdGFOb2RlcykgY2FuIGJlIHNldCBhZnRlciBub2RlIGluc3RhbnRpYXRpb24sXG4gICAgICogYW5kIHNldHRpbmcgdGhlIGluZGVudHMgY2FuIGNhdXNlIGZyYW1lIHJhdGUgbG9zcyBpZiBpdCBpcyBzZXQgdG9vIG9mdGVuLlxuICAgICAqL1xuICAgIHRoaXMuY2hhbmdlU3Vic2NyaXB0aW9uID0gbWVyZ2UodGhpcy50cmVlTm9kZS5fZGF0YUNoYW5nZXMsIHRyZWUuX2RhdGFTb3VyY2VDaGFuZ2VkKVxuICAgICAgLnBpcGUoYXVkaXRUaW1lKDAsIEJVSUxEX0lOREVOVFNfU0NIRURVTEVSKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmJ1aWxkSW5kZW50cygpO1xuICAgICAgICB0aGlzLmNoZWNrQWRqYWNlbnQoKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW5kZW50cygpOiBib29sZWFuW10ge1xuICAgIGNvbnN0IGluZGVudHMgPSBbXTtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMudHJlZS50cmVlQ29udHJvbC5kYXRhTm9kZXM7XG4gICAgY29uc3QgZ2V0TGV2ZWwgPSB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0TGV2ZWw7XG4gICAgbGV0IHBhcmVudCA9IGdldFBhcmVudChub2RlcywgdGhpcy50cmVlTm9kZS5kYXRhLCBnZXRMZXZlbCk7XG4gICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgY29uc3QgcGFyZW50TmV4dFNpYmxpbmcgPSBnZXROZXh0U2libGluZyhub2RlcywgcGFyZW50LCBnZXRMZXZlbCk7XG4gICAgICBpZiAocGFyZW50TmV4dFNpYmxpbmcpIHtcbiAgICAgICAgaW5kZW50cy51bnNoaWZ0KHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZW50cy51bnNoaWZ0KGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHBhcmVudCA9IGdldFBhcmVudChub2RlcywgcGFyZW50LCBnZXRMZXZlbCk7XG4gICAgfVxuICAgIHJldHVybiBpbmRlbnRzO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZEluZGVudHMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudHJlZU5vZGUuZGF0YSkge1xuICAgICAgY29uc3QgaW5kZW50cyA9IHRoaXMuZ2V0SW5kZW50cygpO1xuICAgICAgY29uc3QgZGlmZlN0cmluZyA9IGJvb2xlYW5BcnJheVRvU3RyaW5nKGluZGVudHMpO1xuICAgICAgaWYgKGRpZmZTdHJpbmcgIT09IHRoaXMuY3VycmVudEluZGVudHMpIHtcbiAgICAgICAgdGhpcy50cmVlTm9kZS5zZXRJbmRlbnRzKHRoaXMuZ2V0SW5kZW50cygpKTtcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZW50cyA9IGRpZmZTdHJpbmc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdlIG5lZWQgdG8gYWRkIGFuIGNsYXNzIG5hbWUgZm9yIHRoZSBsYXN0IGNoaWxkIG5vZGUsXG4gICAqIHRoaXMgcmVzdWx0IGNhbiBhbHNvIGJlIGFmZmVjdGVkIHdoZW4gdGhlIGFkamFjZW50IG5vZGVzIGFyZSBjaGFuZ2VkLlxuICAgKi9cbiAgcHJpdmF0ZSBjaGVja0FkamFjZW50KCk6IHZvaWQge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy50cmVlLnRyZWVDb250cm9sLmRhdGFOb2RlcztcbiAgICBjb25zdCBpbmRleCA9IG5vZGVzLmluZGV4T2YodGhpcy50cmVlTm9kZS5kYXRhKTtcbiAgICBjb25zdCBwcmVOb2RlID0gbm9kZXNbaW5kZXggLSAxXSB8fCBudWxsO1xuICAgIGNvbnN0IG5leHROb2RlID0gbm9kZXNbaW5kZXggKyAxXSB8fCBudWxsO1xuICAgIGlmICh0aGlzLm5leHROb2RlUmVmICE9PSBuZXh0Tm9kZSB8fCB0aGlzLnByZU5vZGVSZWYgIT09IHByZU5vZGUpIHtcbiAgICAgIHRoaXMuY2hlY2tMYXN0KGluZGV4KTtcbiAgICB9XG4gICAgdGhpcy5wcmVOb2RlUmVmID0gcHJlTm9kZTtcbiAgICB0aGlzLm5leHROb2RlUmVmID0gbmV4dE5vZGU7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrTGFzdChpbmRleD86IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy50cmVlLnRyZWVDb250cm9sLmRhdGFOb2RlcztcbiAgICB0aGlzLmlzTGVhZiA9IHRoaXMudHJlZU5vZGUuaXNMZWFmO1xuICAgIHRoaXMuaXNMYXN0ID0gIWdldE5leHRTaWJsaW5nKG5vZGVzLCB0aGlzLnRyZWVOb2RlLmRhdGEsIHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRMZXZlbCwgaW5kZXgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5wcmVOb2RlUmVmID0gbnVsbDtcbiAgICB0aGlzLm5leHROb2RlUmVmID0gbnVsbDtcbiAgICB0aGlzLmNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=